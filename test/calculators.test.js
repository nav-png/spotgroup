"use strict";

const test = require("node:test");
const assert = require("node:assert/strict");

const {
  formatDigitsWithCommas,
  parseCurrencyString,
  addBusinessDays,
  calcRescissionFee,
  calcPTT,
  computeListingRates,
  computeCommission,
  calcSellerNet,
  calcMortgagePayment,
  calcFlip,
} = require("../src/calculators");

const closeTo = (actual, expected, epsilon = 1e-6) =>
  assert.ok(
    Math.abs(actual - expected) < epsilon,
    `expected ${actual} to be close to ${expected}`
  );

test("formatDigitsWithCommas", async (t) => {
  await t.test("adds thousands separators", () => {
    assert.equal(formatDigitsWithCommas("880000"), "880,000");
    assert.equal(formatDigitsWithCommas("1000000"), "1,000,000");
  });
  await t.test("leaves short numbers untouched", () => {
    assert.equal(formatDigitsWithCommas("100"), "100");
    assert.equal(formatDigitsWithCommas("1"), "1");
  });
  await t.test("handles numeric input", () => {
    assert.equal(formatDigitsWithCommas(1234567), "1,234,567");
  });
  await t.test("handles empty string", () => {
    assert.equal(formatDigitsWithCommas(""), "");
  });
});

test("parseCurrencyString", async (t) => {
  await t.test("strips commas and currency symbols", () => {
    assert.equal(parseCurrencyString("$880,000"), 880000);
    assert.equal(parseCurrencyString("1,100,000"), 1100000);
  });
  await t.test("keeps decimals", () => {
    closeTo(parseCurrencyString("1,234.56"), 1234.56);
  });
  await t.test("returns 0 for empty / null / non-numeric", () => {
    assert.equal(parseCurrencyString(""), 0);
    assert.equal(parseCurrencyString(null), 0);
    assert.equal(parseCurrencyString(undefined), 0);
    assert.equal(parseCurrencyString("abc"), 0);
  });
  await t.test("accepts numeric input", () => {
    assert.equal(parseCurrencyString("42"), 42);
  });
});

test("addBusinessDays", async (t) => {
  await t.test("skips the weekend (Fri + 3 => Wed)", () => {
    const friday = new Date("2024-01-05T12:00:00"); // Friday
    const result = addBusinessDays(friday, 3);
    assert.equal(result.getFullYear(), 2024);
    assert.equal(result.getMonth(), 0);
    assert.equal(result.getDate(), 10); // Wednesday
    assert.equal(result.getDay(), 3);
  });
  await t.test("Monday + 3 => Thursday", () => {
    const monday = new Date("2024-01-08T12:00:00");
    const result = addBusinessDays(monday, 3);
    assert.equal(result.getDate(), 11); // Thursday
  });
  await t.test("does not mutate the input date", () => {
    const start = new Date("2024-01-05T12:00:00");
    const before = start.getTime();
    addBusinessDays(start, 5);
    assert.equal(start.getTime(), before);
  });
  await t.test("zero days returns an equal date", () => {
    const start = new Date("2024-01-05T12:00:00");
    const result = addBusinessDays(start, 0);
    assert.equal(result.getTime(), start.getTime());
  });
});

test("calcRescissionFee", async (t) => {
  await t.test("is 0.25% of price", () => {
    closeTo(calcRescissionFee(880000), 2200);
    closeTo(calcRescissionFee(1000000), 2500);
  });
  await t.test("zero price => zero fee", () => {
    assert.equal(calcRescissionFee(0), 0);
  });
});

test("calcPTT", async (t) => {
  await t.test("price below the $200k threshold (1% only)", () => {
    const r = calcPTT(150000);
    closeTo(r.first, 1500);
    closeTo(r.balance, 0);
    closeTo(r.total, 1500);
  });
  await t.test("price above the threshold (1% + 2%)", () => {
    const r = calcPTT(880000);
    closeTo(r.first, 2000); // 1% of 200,000
    closeTo(r.balance, 13600); // 2% of 680,000
    closeTo(r.total, 15600);
  });
  await t.test("exactly at the threshold", () => {
    const r = calcPTT(200000);
    closeTo(r.first, 2000);
    closeTo(r.balance, 0);
    closeTo(r.total, 2000);
  });
});

test("computeListingRates", async (t) => {
  await t.test("listing = total - buyer", () => {
    const r = computeListingRates(7, 3.22, 4, 1.15);
    closeTo(r.listingFirst, 3.78);
    closeTo(r.listingRest, 2.85);
  });
  await t.test("floors negative results at 0", () => {
    const r = computeListingRates(2, 5, 1, 3);
    assert.equal(r.listingFirst, 0);
    assert.equal(r.listingRest, 0);
  });
  await t.test("treats missing values as 0", () => {
    const r = computeListingRates(undefined, undefined, undefined, undefined);
    assert.equal(r.listingFirst, 0);
    assert.equal(r.listingRest, 0);
  });
});

test("computeCommission", async (t) => {
  await t.test("tiered split on the default rate structure", () => {
    const r = computeCommission({
      price: 1100000,
      totalFirstRate: 7,
      buyerFirstRate: 3.22,
      totalRestRate: 4,
      buyerRestRate: 1.15,
    });
    // total: 100k*7% + 1,000k*4% = 7,000 + 40,000 = 47,000
    closeTo(r.total, 47000);
    // buyer: 100k*3.22% + 1,000k*1.15% = 3,220 + 11,500 = 14,720
    closeTo(r.buyer, 14720);
    closeTo(r.listing, 47000 - 14720);
    assert.equal(r.gstTotal, undefined);
    assert.equal(r.totalWithGst, undefined);
  });
  await t.test("price below the first-tier cap uses first rates only", () => {
    const r = computeCommission({
      price: 80000,
      totalFirstRate: 7,
      buyerFirstRate: 3,
      totalRestRate: 4,
      buyerRestRate: 1,
    });
    closeTo(r.total, 80000 * 0.07);
    closeTo(r.buyer, 80000 * 0.03);
  });
  await t.test("applies 5% GST when requested", () => {
    const r = computeCommission({
      price: 1100000,
      totalFirstRate: 7,
      buyerFirstRate: 3.22,
      totalRestRate: 4,
      buyerRestRate: 1.15,
      applyGst: true,
    });
    closeTo(r.gstTotal, 47000 * 0.05);
    closeTo(r.totalWithGst, 47000 * 1.05);
  });
  await t.test("defaults rates to 0 when omitted", () => {
    const r = computeCommission({ price: 500000 });
    assert.equal(r.total, 0);
    assert.equal(r.buyer, 0);
    assert.equal(r.listing, 0);
  });
});

test("calcSellerNet", async (t) => {
  await t.test("net = sale - (mortgage + commission + other)", () => {
    const r = calcSellerNet(1100000, 650000, 35000, 4500);
    closeTo(r.deductions, 689500);
    closeTo(r.net, 410500);
  });
  await t.test("treats missing deductions as 0", () => {
    const r = calcSellerNet(500000);
    closeTo(r.deductions, 0);
    closeTo(r.net, 500000);
  });
  await t.test("net can be negative", () => {
    const r = calcSellerNet(100000, 200000, 0, 0);
    closeTo(r.net, -100000);
  });
});

test("calcMortgagePayment", async (t) => {
  await t.test("standard monthly amortized payment", () => {
    const r = calcMortgagePayment(700000, 5.5, 25, "monthly");
    assert.equal(r.paymentsPerYear, 12);
    closeTo(r.payment, 4298.6124, 0.01);
    closeTo(r.totalInterest, r.payment * 300 - 700000, 0.01);
  });
  await t.test("biweekly uses 26 payments per year", () => {
    const r = calcMortgagePayment(700000, 5.5, 25, "biweekly");
    assert.equal(r.paymentsPerYear, 26);
  });
  await t.test("defaults to monthly for unknown frequency", () => {
    const r = calcMortgagePayment(700000, 5.5, 25, "weekly");
    assert.equal(r.paymentsPerYear, 12);
  });
  await t.test("zero interest rate => straight-line payment", () => {
    const r = calcMortgagePayment(120000, 0, 10, "monthly");
    closeTo(r.payment, 1000);
    closeTo(r.totalInterest, 0);
  });
});

test("calcFlip", async (t) => {
  await t.test("profit and ROI on a profitable flip", () => {
    const r = calcFlip(900000, 80000, 18000, 40000, 1200000);
    closeTo(r.totalCost, 1038000);
    closeTo(r.profit, 162000);
    closeTo(r.roi, (162000 / 1038000) * 100);
  });
  await t.test("loss produces negative profit and ROI", () => {
    const r = calcFlip(900000, 0, 0, 0, 800000);
    closeTo(r.profit, -100000);
    assert.ok(r.roi < 0);
  });
  await t.test("zero total cost yields 0 ROI (no divide by zero)", () => {
    const r = calcFlip(0, 0, 0, 0, 500000);
    assert.equal(r.totalCost, 0);
    assert.equal(r.roi, 0);
    closeTo(r.profit, 500000);
  });
  await t.test("treats missing cost inputs as 0", () => {
    const r = calcFlip(900000, undefined, undefined, undefined, 1000000);
    closeTo(r.totalCost, 900000);
    closeTo(r.profit, 100000);
  });
});
