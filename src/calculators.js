/**
 * Pure calculation logic for the Spot Group Deal Calculator.
 *
 * These functions are DOM-free so they can be unit tested in Node and reused
 * by calculator1.html in the browser. In the browser the module attaches
 * itself to `window.Calculators`; in Node it is available via `require`.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  } else {
    root.Calculators = api;
  }
})(typeof self !== "undefined" ? self : this, function () {
  "use strict";

  /** Insert thousands separators into a string of digits. */
  function formatDigitsWithCommas(digits) {
    return String(digits).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  /**
   * Parse a user-entered currency string into a number.
   * Strips everything except digits and dots. Returns 0 for empty/invalid.
   */
  function parseCurrencyString(str) {
    if (!str) return 0;
    const cleaned = String(str).replace(/[^0-9.]/g, "");
    if (!cleaned) return 0;
    const value = parseFloat(cleaned);
    return isNaN(value) ? 0 : value;
  }

  /**
   * Add `days` business days (Mon–Fri) to a start Date, skipping weekends.
   * Does not mutate the input date.
   */
  function addBusinessDays(startDate, days) {
    const current = new Date(startDate.getTime());
    let added = 0;
    while (added < days) {
      current.setDate(current.getDate() + 1);
      const day = current.getDay(); // 0 Sun, 6 Sat
      if (day !== 0 && day !== 6) {
        added++;
      }
    }
    return current;
  }

  /** Rescission fee: 0.25% of the purchase price (HBRP). */
  function calcRescissionFee(price) {
    return price * 0.0025;
  }

  /**
   * BC Property Transfer Tax (simple): 1% on the first $200,000,
   * 2% on the balance. Returns the component amounts and total.
   */
  function calcPTT(price) {
    const firstPortion = Math.min(price, 200000);
    const balancePortion = Math.max(price - 200000, 0);
    const first = firstPortion * 0.01;
    const balance = balancePortion * 0.02;
    return { first, balance, total: first + balance };
  }

  /**
   * Listing-side commission rates = total minus buyer, floored at 0.
   * Rates are percentages.
   */
  function computeListingRates(totalFirst, buyerFirst, totalRest, buyerRest) {
    return {
      listingFirst: Math.max((totalFirst || 0) - (buyerFirst || 0), 0),
      listingRest: Math.max((totalRest || 0) - (buyerRest || 0), 0),
    };
  }

  /**
   * Tiered commission split. First $100,000 uses the "first" rates, the
   * balance uses the "rest" rates. Rates are percentages. Optionally applies
   * 5% GST to the total.
   */
  function computeCommission(params) {
    const {
      price,
      totalFirstRate = 0,
      buyerFirstRate = 0,
      totalRestRate = 0,
      buyerRestRate = 0,
      applyGst = false,
    } = params;

    const FIRST_TIER_CAP = 100000;
    const firstPortion = Math.min(price, FIRST_TIER_CAP);
    const restPortion = Math.max(price - FIRST_TIER_CAP, 0);

    const total =
      firstPortion * (totalFirstRate / 100) +
      restPortion * (totalRestRate / 100);
    const buyer =
      firstPortion * (buyerFirstRate / 100) +
      restPortion * (buyerRestRate / 100);
    const listing = total - buyer;

    const result = { total, buyer, listing };
    if (applyGst) {
      result.gstTotal = total * 0.05;
      result.totalWithGst = total + result.gstTotal;
    }
    return result;
  }

  /** Seller net sheet: net = sale - (mortgage + commission + other). */
  function calcSellerNet(sale, mortgage, commission, other) {
    const deductions = (mortgage || 0) + (commission || 0) + (other || 0);
    return { deductions, net: sale - deductions };
  }

  /**
   * Standard amortized mortgage payment.
   * `frequency` is "monthly" (12/yr) or "biweekly" (26/yr).
   * `rate` is the annual interest rate as a percent.
   */
  function calcMortgagePayment(loan, rate, years, frequency) {
    const paymentsPerYear = frequency === "biweekly" ? 26 : 12;
    const n = years * paymentsPerYear;
    const r = rate / 100 / paymentsPerYear;

    let payment;
    if (r === 0) {
      payment = loan / n;
    } else {
      payment = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }
    const totalPaid = payment * n;
    return {
      payment,
      paymentsPerYear,
      totalInterest: totalPaid - loan,
    };
  }

  /**
   * Flip / investment profit.
   * totalCost = purchase + reno + holding + other; profit = sale - totalCost;
   * roi is a percentage (profit / totalCost * 100), 0 when totalCost <= 0.
   */
  function calcFlip(purchase, reno, holding, other, sale) {
    const totalCost =
      (purchase || 0) + (reno || 0) + (holding || 0) + (other || 0);
    const profit = sale - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;
    return { totalCost, profit, roi };
  }

  return {
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
  };
});
