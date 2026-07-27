// ===== Formatting helpers =====
const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2
});

function formatDate(date) {
  return new Intl.DateTimeFormat("en-CA", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

// Keeps at most one decimal point and two decimals, and groups the integer part.
function maskCurrency(raw) {
  const cleaned = raw.replace(/[^0-9.]/g, "");
  const firstDot = cleaned.indexOf(".");
  let intPart = firstDot === -1 ? cleaned : cleaned.slice(0, firstDot);
  let decPart = firstDot === -1 ? null : cleaned.slice(firstDot + 1).replace(/\./g, "").slice(0, 2);

  intPart = intPart.replace(/^0+(?=\d)/, "");
  const grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (decPart === null) return grouped;
  return (grouped || "0") + "." + decPart;
}

function parseCurrencyString(str) {
  if (!str) return 0;
  const value = parseFloat(str.replace(/[^0-9.]/g, "").replace(/(\..*?)\./g, "$1"));
  return Number.isFinite(value) ? value : 0;
}

function countSignificant(str, upTo) {
  let n = 0;
  for (let i = 0; i < upTo; i++) {
    if (/[0-9.]/.test(str[i])) n++;
  }
  return n;
}

// Restores the caret to the same logical position after re-masking.
function caretAfter(formatted, significant) {
  let seen = 0;
  for (let i = 0; i < formatted.length; i++) {
    if (/[0-9.]/.test(formatted[i])) seen++;
    if (seen >= significant) return i + 1;
  }
  return formatted.length;
}

// ===== BC statutory holidays (used for rescission deadlines) =====
const BC_HOLIDAYS = new Set([
  "2025-01-01", "2025-02-17", "2025-04-18", "2025-05-19", "2025-07-01", "2025-08-04",
  "2025-09-01", "2025-09-30", "2025-10-13", "2025-11-11", "2025-12-25",
  "2026-01-01", "2026-02-16", "2026-04-03", "2026-05-18", "2026-07-01", "2026-08-03",
  "2026-09-07", "2026-09-30", "2026-10-12", "2026-11-11", "2026-12-25",
  "2027-01-01", "2027-02-15", "2027-03-26", "2027-05-24", "2027-07-01", "2027-08-02",
  "2027-09-06", "2027-09-30", "2027-10-11", "2027-11-11", "2027-12-27"
]);

const LAST_HOLIDAY_YEAR = 2027;

function isoDate(date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + m + "-" + d;
}

function isBusinessDay(date) {
  const day = date.getDay();
  if (day === 0 || day === 6) return false;
  return !BC_HOLIDAYS.has(isoDate(date));
}

function addBusinessDays(startDate, days) {
  const current = new Date(startDate.getTime());
  let added = 0;
  while (added < days) {
    current.setDate(current.getDate() + 1);
    if (isBusinessDay(current)) added++;
  }
  return current;
}

// ===== Shared input behaviour =====
let lastPriceDigits = "";

function clearSuggestion(input) {
  if (!input.classList.contains("suggested")) return;
  input.classList.remove("suggested");
  input.value = "";
}

function acceptSuggestion(input) {
  input.classList.remove("suggested");
}

function attachCurrencyFormatting(input) {
  input.addEventListener("beforeinput", () => {
    // Any real edit ends the ghost state so the mask can run normally.
    if (input.classList.contains("suggested")) {
      input.classList.remove("suggested");
      input.value = "";
    }
  });

  input.addEventListener("input", () => {
    const before = input.value;
    const significant = countSignificant(before, input.selectionStart ?? before.length);
    const formatted = maskCurrency(before);
    if (formatted !== before) {
      input.value = formatted;
      const pos = caretAfter(formatted, significant);
      input.setSelectionRange(pos, pos);
    }
    if (input.dataset.suggestPrice === "true") {
      lastPriceDigits = formatted.replace(/,/g, "");
    }
  });
}

function attachSuggestionBehavior(input) {
  input.addEventListener("focus", () => {
    if (!lastPriceDigits) return;
    if (input.value.trim() !== "") return;
    input.value = maskCurrency(lastPriceDigits);
    input.classList.add("suggested");
  });

  input.addEventListener("blur", () => clearSuggestion(input));

  input.addEventListener("keydown", (e) => {
    if (!input.classList.contains("suggested")) return;

    // Tab or Enter accepts the suggestion.
    if (e.key === "Tab" || e.key === "Enter") {
      acceptSuggestion(input);
      return;
    }

    if (e.key === " ") {
      e.preventDefault();
      acceptSuggestion(input);
      const len = input.value.length;
      input.setSelectionRange(len, len);
      return;
    }

    if (e.key === "Escape" || e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      clearSuggestion(input);
    }
    // Typing a character is handled by the beforeinput listener above.
  });
}

document.querySelectorAll(".currency-input").forEach((input) => {
  attachCurrencyFormatting(input);
  if (input.dataset.suggestPrice === "true") {
    attachSuggestionBehavior(input);
  }
});

// Reads a money field, treating an unaccepted suggestion as empty.
function readMoney(input) {
  if (input.classList.contains("suggested")) return 0;
  return parseCurrencyString(input.value);
}

function rememberPrice(value) {
  lastPriceDigits = value.toFixed(2).replace(/\.00$/, "");
}

function setSigned(el, value) {
  el.textContent = currency.format(value);
  el.classList.toggle("negative", value < 0);
}

// ===== Accordion =====
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    const item = header.closest(".accordion-item");
    const open = item.classList.toggle("open");
    header.setAttribute("aria-expanded", String(open));
  });
});

// ===== Rescission =====
(function () {
  const form = document.getElementById("form-rescission");
  const priceInput = document.getElementById("resc-price");
  const dateInput = document.getElementById("resc-date");
  const errorDiv = document.getElementById("resc-error");
  const resultsBox = document.getElementById("resc-results");
  const resultPrice = document.getElementById("resc-result-price");
  const resultFee = document.getElementById("resc-result-fee");
  const resultDeadline = document.getElementById("resc-result-deadline");
  const deadlineLine = document.getElementById("resc-deadline-line");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.textContent = "";
    resultsBox.style.display = "none";

    const price = readMoney(priceInput);
    if (!(price > 0)) {
      errorDiv.textContent = "Enter a purchase price above zero.";
      return;
    }

    rememberPrice(price);
    resultPrice.textContent = currency.format(price);
    resultFee.textContent = currency.format(price * 0.0025);

    deadlineLine.style.display = "none";
    if (dateInput.value) {
      const accepted = new Date(dateInput.value + "T12:00:00");
      if (!isNaN(accepted.getTime())) {
        if (accepted.getFullYear() > LAST_HOLIDAY_YEAR) {
          errorDiv.textContent =
            "Holiday data only runs through " + LAST_HOLIDAY_YEAR + " – the deadline is not shown for later dates.";
        } else {
          deadlineLine.style.display = "flex";
          resultDeadline.textContent = formatDate(addBusinessDays(accepted, 3)) + " (end of day)";
        }
      }
    }

    resultsBox.style.display = "block";
  });
})();

// ===== PTT =====
(function () {
  const form = document.getElementById("form-ptt");
  const priceInput = document.getElementById("ptt-price");
  const residentialInput = document.getElementById("ptt-residential");
  const foreignInput = document.getElementById("ptt-foreign");
  const errorDiv = document.getElementById("ptt-error");
  const resultsBox = document.getElementById("ptt-results");
  const resultPrice = document.getElementById("ptt-result-price");
  const resultT1 = document.getElementById("ptt-result-t1");
  const resultT2 = document.getElementById("ptt-result-t2");
  const resultT3 = document.getElementById("ptt-result-t3");
  const resultT4 = document.getElementById("ptt-result-t4");
  const resultForeign = document.getElementById("ptt-result-foreign");
  const resultTotal = document.getElementById("ptt-result-total");
  const t3Line = document.getElementById("ptt-t3-line");
  const t4Line = document.getElementById("ptt-t4-line");
  const foreignLine = document.getElementById("ptt-foreign-line");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.textContent = "";
    resultsBox.style.display = "none";

    const price = readMoney(priceInput);
    if (!(price > 0)) {
      errorDiv.textContent = "Enter a purchase price above zero.";
      return;
    }

    rememberPrice(price);

    const t1 = Math.min(price, 200000) * 0.01;
    const t2 = Math.max(Math.min(price, 2000000) - 200000, 0) * 0.02;
    const t3 = Math.max(price - 2000000, 0) * 0.03;
    const t4 = residentialInput.checked ? Math.max(price - 3000000, 0) * 0.02 : 0;
    const foreign = foreignInput.checked ? price * 0.2 : 0;

    resultPrice.textContent = currency.format(price);
    resultT1.textContent = currency.format(t1);
    resultT2.textContent = currency.format(t2);
    resultT3.textContent = currency.format(t3);
    resultT4.textContent = currency.format(t4);
    resultForeign.textContent = currency.format(foreign);
    resultTotal.textContent = currency.format(t1 + t2 + t3 + t4 + foreign);

    t3Line.style.display = t3 > 0 ? "flex" : "none";
    t4Line.style.display = t4 > 0 ? "flex" : "none";
    foreignLine.style.display = foreign > 0 ? "flex" : "none";

    resultsBox.style.display = "block";
  });
})();

// ===== Commission =====
(function () {
  const form = document.getElementById("form-commission");
  const priceInput = document.getElementById("comm-price");
  const totalFirstInput = document.getElementById("comm-total-first-rate");
  const buyerFirstInput = document.getElementById("comm-buyer-first-rate");
  const listingFirstInput = document.getElementById("comm-listing-first-rate");
  const totalRestInput = document.getElementById("comm-total-rest-rate");
  const buyerRestInput = document.getElementById("comm-buyer-rest-rate");
  const listingRestInput = document.getElementById("comm-listing-rest-rate");
  const gstCheckbox = document.getElementById("comm-apply-gst");
  const errorDiv = document.getElementById("comm-error");

  const resultsBox = document.getElementById("comm-results");
  const resultTotal = document.getElementById("comm-result-total");
  const resultBuyer = document.getElementById("comm-result-buyer");
  const resultListing = document.getElementById("comm-result-listing");
  const totalLabel = document.getElementById("comm-total-label");
  const buyerGstLine = document.getElementById("comm-buyer-gst-line");
  const listingGstLine = document.getElementById("comm-listing-gst-line");
  const gstTotalLine = document.getElementById("comm-gst-total-line");
  const resultBuyerGst = document.getElementById("comm-result-buyer-gst");
  const resultListingGst = document.getElementById("comm-result-listing-gst");
  const resultGstTotal = document.getElementById("comm-result-gst-total");

  const FIRST_TIER_CAP = 100000;
  const GST_RATE = 0.05;

  function rate(input) {
    const value = parseFloat(input.value);
    return Number.isFinite(value) ? value : 0;
  }

  function trimRate(value) {
    return String(parseFloat(value.toFixed(4)));
  }

  function listingRates() {
    return {
      first: rate(totalFirstInput) - rate(buyerFirstInput),
      rest: rate(totalRestInput) - rate(buyerRestInput)
    };
  }

  function updateListingRates() {
    const listing = listingRates();
    listingFirstInput.value = trimRate(listing.first);
    listingRestInput.value = trimRate(listing.rest);
  }

  [totalFirstInput, buyerFirstInput, totalRestInput, buyerRestInput].forEach((input) => {
    input.addEventListener("input", updateListingRates);
  });
  updateListingRates();

  function computeAndRender() {
    errorDiv.textContent = "";
    resultsBox.style.display = "none";

    const price = readMoney(priceInput);
    if (!(price > 0)) {
      errorDiv.textContent = "Enter a sale price above zero.";
      return;
    }

    const listing = listingRates();
    if (listing.first < 0 || listing.rest < 0) {
      errorDiv.textContent = "The buyer rate cannot exceed the total rate.";
      return;
    }

    rememberPrice(price);

    const firstPortion = Math.min(price, FIRST_TIER_CAP);
    const restPortion = Math.max(price - FIRST_TIER_CAP, 0);
    const apply = (first, rest) => firstPortion * (first / 100) + restPortion * (rest / 100);

    const buyerComm = apply(rate(buyerFirstInput), rate(buyerRestInput));
    const listingComm = apply(listing.first, listing.rest);
    const totalComm = buyerComm + listingComm;

    resultBuyer.textContent = currency.format(buyerComm);
    resultListing.textContent = currency.format(listingComm);

    const gstOn = gstCheckbox.checked;
    buyerGstLine.style.display = gstOn ? "flex" : "none";
    listingGstLine.style.display = gstOn ? "flex" : "none";
    gstTotalLine.style.display = gstOn ? "flex" : "none";

    if (gstOn) {
      resultBuyerGst.textContent = currency.format(buyerComm * (1 + GST_RATE));
      resultListingGst.textContent = currency.format(listingComm * (1 + GST_RATE));
      resultGstTotal.textContent = currency.format(totalComm * GST_RATE);
    }

    totalLabel.textContent = gstOn ? "Total incl. GST" : "Total Commission";
    resultTotal.textContent = currency.format(gstOn ? totalComm * (1 + GST_RATE) : totalComm);

    resultsBox.style.display = "block";
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    computeAndRender();
  });

  gstCheckbox.addEventListener("change", function () {
    if (priceInput.value.trim()) computeAndRender();
  });
})();

// ===== Seller Net Sheet =====
(function () {
  const form = document.getElementById("form-net");
  const saleInput = document.getElementById("net-sale-price");
  const mortInput = document.getElementById("net-mortgage");
  const commInput = document.getElementById("net-commission");
  const otherInput = document.getElementById("net-other");
  const errorDiv = document.getElementById("net-error");
  const resultsBox = document.getElementById("net-results");
  const resultSale = document.getElementById("net-result-sale");
  const resultDeductions = document.getElementById("net-result-deductions");
  const resultNet = document.getElementById("net-result-net");
  const resultLabel = document.getElementById("net-result-label");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.textContent = "";
    resultsBox.style.display = "none";

    const sale = readMoney(saleInput);
    if (!(sale > 0)) {
      errorDiv.textContent = "Enter a sale price above zero.";
      return;
    }

    rememberPrice(sale);

    const deductions = readMoney(mortInput) + readMoney(commInput) + readMoney(otherInput);
    const net = sale - deductions;

    resultSale.textContent = currency.format(sale);
    resultDeductions.textContent = currency.format(deductions);
    resultLabel.textContent = net < 0 ? "Estimated Shortfall" : "Estimated Net to Seller";
    setSigned(resultNet, net);

    resultsBox.style.display = "block";
  });
})();

// ===== Mortgage =====
(function () {
  const form = document.getElementById("form-mortgage");
  const loanInput = document.getElementById("mort-loan");
  const rateInput = document.getElementById("mort-rate");
  const yearsInput = document.getElementById("mort-years");
  const freqSelect = document.getElementById("mort-frequency");
  const errorDiv = document.getElementById("mort-error");
  const resultsBox = document.getElementById("mort-results");
  const resultLoan = document.getElementById("mort-result-loan");
  const resultPayment = document.getElementById("mort-result-payment");
  const resultPerYear = document.getElementById("mort-result-peryear");
  const resultInterest = document.getElementById("mort-result-interest");
  const payoffLine = document.getElementById("mort-payoff-line");
  const resultPayoff = document.getElementById("mort-result-payoff");

  const PERIODS = { monthly: 12, biweekly: 26, "accelerated-biweekly": 26, weekly: 52 };

  // Canadian fixed mortgages compound semi-annually, not per payment period.
  function periodicRate(annualPercent, paymentsPerYear) {
    return Math.pow(1 + annualPercent / 100 / 2, 2 / paymentsPerYear) - 1;
  }

  function amortize(loan, payment, r) {
    if (r === 0) return loan / payment;
    if (payment <= loan * r) return null; // payment never covers the interest
    return Math.log(payment / (payment - loan * r)) / Math.log(1 + r);
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.textContent = "";
    resultsBox.style.display = "none";
    payoffLine.style.display = "none";

    const loan = readMoney(loanInput);
    const annualRate = parseFloat(rateInput.value);
    const years = parseFloat(yearsInput.value);
    const freq = freqSelect.value;

    if (!(loan > 0)) {
      errorDiv.textContent = "Enter a loan amount above zero.";
      return;
    }
    if (!Number.isFinite(annualRate) || annualRate < 0) {
      errorDiv.textContent = "Enter an interest rate of zero or more.";
      return;
    }
    if (!Number.isFinite(years) || years <= 0) {
      errorDiv.textContent = "Enter an amortization above zero.";
      return;
    }

    const accelerated = freq === "accelerated-biweekly";
    const paymentsPerYear = PERIODS[freq];
    const n = years * paymentsPerYear;

    let payment;
    if (accelerated) {
      const monthlyRate = periodicRate(annualRate, 12);
      const monthlyN = years * 12;
      const monthly = monthlyRate === 0
        ? loan / monthlyN
        : (loan * monthlyRate * Math.pow(1 + monthlyRate, monthlyN)) / (Math.pow(1 + monthlyRate, monthlyN) - 1);
      payment = monthly / 2;
    } else {
      const r = periodicRate(annualRate, paymentsPerYear);
      payment = r === 0 ? loan / n : (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const r = periodicRate(annualRate, paymentsPerYear);
    const actualPeriods = accelerated ? amortize(loan, payment, r) : n;

    if (actualPeriods === null) {
      errorDiv.textContent = "This payment never pays off the loan at that rate.";
      return;
    }

    resultLoan.textContent = currency.format(loan);
    resultPayment.textContent = currency.format(payment);
    resultPerYear.textContent = String(paymentsPerYear);
    resultInterest.textContent = currency.format(payment * actualPeriods - loan);

    if (accelerated) {
      payoffLine.style.display = "flex";
      resultPayoff.textContent = (actualPeriods / paymentsPerYear).toFixed(1) + " years";
    }

    resultsBox.style.display = "block";
  });
})();

// ===== Flip =====
(function () {
  const form = document.getElementById("form-flip");
  const purchaseInput = document.getElementById("flip-purchase");
  const renoInput = document.getElementById("flip-reno");
  const holdingInput = document.getElementById("flip-holding");
  const otherInput = document.getElementById("flip-other");
  const saleInput = document.getElementById("flip-sale");
  const errorDiv = document.getElementById("flip-error");
  const resultsBox = document.getElementById("flip-results");
  const resultCost = document.getElementById("flip-result-cost");
  const resultProfit = document.getElementById("flip-result-profit");
  const resultRoi = document.getElementById("flip-result-roi");
  const resultLabel = document.getElementById("flip-result-label");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    errorDiv.textContent = "";
    resultsBox.style.display = "none";

    const purchase = readMoney(purchaseInput);
    const sale = readMoney(saleInput);

    if (!(purchase > 0) || !(sale > 0)) {
      errorDiv.textContent = "Enter both a purchase price and a resale price.";
      return;
    }

    const totalCost = purchase + readMoney(renoInput) + readMoney(holdingInput) + readMoney(otherInput);
    const profit = sale - totalCost;

    resultCost.textContent = currency.format(totalCost);
    resultRoi.textContent = ((profit / totalCost) * 100).toFixed(1) + " %";
    resultLabel.textContent = profit < 0 ? "Loss" : "Profit";
    setSigned(resultProfit, profit);

    resultsBox.style.display = "block";
  });
})();
