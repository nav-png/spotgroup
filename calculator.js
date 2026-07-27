// ===== Shared utilities =====
const currency = new Intl.NumberFormat("en-CA", {
  style: "currency",
  currency: "CAD",
  maximumFractionDigits: 2
});

const dateFormatter = new Intl.DateTimeFormat("en-CA", {
  weekday: "short",
  year: "numeric",
  month: "short",
  day: "numeric"
});

const $ = (id) => document.getElementById(id);

function formatDigitsWithCommas(digits) {
  return digits.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function parseCurrencyString(str) {
  if (!str) return 0;
  const cleaned = str.replace(/[^0-9.]/g, "");
  if (!cleaned) return 0;
  return parseFloat(cleaned);
}

function readCurrency(id) {
  return parseCurrencyString($(id).value);
}

function readNumber(id) {
  return parseFloat($(id).value) || 0;
}

// Splits an amount into the portion below a tier cap and the remainder.
function splitAtCap(amount, cap) {
  return {
    first: Math.min(amount, cap),
    rest: Math.max(amount - cap, 0)
  };
}

function addBusinessDays(startDate, days) {
  let current = new Date(startDate.getTime());
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

function formatDate(date) {
  return dateFormatter.format(date);
}

// Remember last main price typed so we can suggest it in other tabs
let lastPriceDigits = "";

function rememberPrice(amount) {
  lastPriceDigits = String(Math.round(amount));
}

function setDisplay(el, visible, mode) {
  el.style.display = visible ? (mode || "flex") : "none";
}

/**
 * Wires a form to a compute function, handling the boilerplate shared by
 * every calculator: reset, validation errors, rendering and visibility.
 *
 * compute() returns either { error } or { results, lines }, where results
 * maps element ids to values (numbers are formatted as currency) and lines
 * maps ids of optional result lines to their visibility.
 */
function createCalculator({ formId, errorId, resultsId, optionalLines = [], compute }) {
  const form = $(formId);
  const errorDiv = $(errorId);
  const resultsBox = $(resultsId);

  function run() {
    errorDiv.textContent = "";
    setDisplay(resultsBox, false);
    optionalLines.forEach((id) => setDisplay($(id), false));

    const outcome = compute();
    if (outcome.error) {
      errorDiv.textContent = outcome.error;
      return false;
    }

    Object.entries(outcome.results).forEach(([id, value]) => {
      $(id).textContent = typeof value === "number" ? currency.format(value) : value;
    });
    Object.entries(outcome.lines || {}).forEach(([id, visible]) => {
      setDisplay($(id), visible);
    });

    setDisplay(resultsBox, true, "block");
    return true;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    run();
  });

  return { run };
}

// ===== Currency input behaviour =====
function attachCurrencyFormatting(input) {
  input.addEventListener("input", () => {
    if (input.classList.contains("suggested")) return;

    const digits = input.value.replace(/\D/g, "");
    if (!digits) {
      input.value = "";
      return;
    }
    const formatted = formatDigitsWithCommas(digits);
    input.value = formatted;
    const len = formatted.length;
    input.setSelectionRange(len, len);

    if (input.dataset.suggestPrice === "true") {
      lastPriceDigits = digits;
    }
  });
}

function attachSuggestionBehavior(input) {
  input.addEventListener("focus", () => {
    if (!lastPriceDigits) return;
    if (input.value.trim() !== "") return;
    const formatted = formatDigitsWithCommas(lastPriceDigits);
    input.value = formatted;
    input.classList.add("suggested");
  });

  input.addEventListener("keydown", (e) => {
    if (!input.classList.contains("suggested")) return;

    // Space = accept suggestion
    if (e.key === " ") {
      e.preventDefault();
      input.classList.remove("suggested");
      const len = input.value.length;
      input.setSelectionRange(len, len);
      return;
    }

    // Number key = replace suggestion with that digit
    if (e.key >= "0" && e.key <= "9") {
      e.preventDefault();
      input.classList.remove("suggested");
      const formatted = formatDigitsWithCommas(e.key);
      input.value = formatted;
      const len = formatted.length;
      input.setSelectionRange(len, len);
      return;
    }

    // Backspace/Delete = clear
    if (e.key === "Backspace" || e.key === "Delete") {
      e.preventDefault();
      input.classList.remove("suggested");
      input.value = "";
      return;
    }
    // Other keys (Tab, arrows, etc.) pass through
  });
}

// Attach currency behaviour to all money fields
document.querySelectorAll(".currency-input").forEach((input) => {
  attachCurrencyFormatting(input);
  if (input.dataset.suggestPrice === "true") {
    attachSuggestionBehavior(input);
  }
});

// ===== Accordion behaviour (each tab independent) =====
document.querySelectorAll(".accordion-header").forEach((header) => {
  header.addEventListener("click", () => {
    header.parentElement.classList.toggle("open");
  });
});

// ===== Rescission Calculator =====
createCalculator({
  formId: "form-rescission",
  errorId: "resc-error",
  resultsId: "resc-results",
  optionalLines: ["resc-deadline-line"],
  compute() {
    const price = readCurrency("resc-price");
    if (!price || price <= 0) {
      return { error: "Please enter a valid purchase price above zero." };
    }
    rememberPrice(price);

    const results = {
      "resc-result-price": price,
      "resc-result-fee": price * 0.0025
    };

    const dateStr = $("resc-date").value;
    const acceptedDate = dateStr ? new Date(dateStr + "T12:00:00") : null;
    const hasDeadline = Boolean(acceptedDate) && !isNaN(acceptedDate.getTime());
    if (hasDeadline) {
      results["resc-result-deadline"] =
        formatDate(addBusinessDays(acceptedDate, 3)) + " (end of day)";
    }

    return { results, lines: { "resc-deadline-line": hasDeadline } };
  }
});

// ===== PTT Calculator =====
createCalculator({
  formId: "form-ptt",
  errorId: "ptt-error",
  resultsId: "ptt-results",
  compute() {
    const price = readCurrency("ptt-price");
    if (!price || price <= 0) {
      return { error: "Please enter a valid purchase price above zero." };
    }
    rememberPrice(price);

    const { first, rest } = splitAtCap(price, 200000);
    const pttFirst = first * 0.01;
    const pttBalance = rest * 0.02;

    return {
      results: {
        "ptt-result-price": price,
        "ptt-result-first": pttFirst,
        "ptt-result-balance": pttBalance,
        "ptt-result-total": pttFirst + pttBalance
      }
    };
  }
});

// ===== Commission Calculator =====
(function () {
  const FIRST_TIER_CAP = 100000;
  const rateInputIds = [
    "comm-total-first-rate",
    "comm-buyer-first-rate",
    "comm-total-rest-rate",
    "comm-buyer-rest-rate"
  ];

  function formatRate(rate) {
    return Math.max(rate, 0).toFixed(2).replace(/\.00$/, "");
  }

  function updateListingRates() {
    $("comm-listing-first-rate").value =
      formatRate(readNumber("comm-total-first-rate") - readNumber("comm-buyer-first-rate"));
    $("comm-listing-rest-rate").value =
      formatRate(readNumber("comm-total-rest-rate") - readNumber("comm-buyer-rest-rate"));
  }

  rateInputIds.forEach((id) => $(id).addEventListener("input", updateListingRates));
  updateListingRates();

  const gstCheckbox = $("comm-apply-gst");
  const priceInput = $("comm-price");

  const calculator = createCalculator({
    formId: "form-commission",
    errorId: "comm-error",
    resultsId: "comm-results",
    optionalLines: ["comm-gst-total-line", "comm-total-with-gst-line"],
    compute() {
      const price = parseCurrencyString(priceInput.value);
      if (!price || price <= 0) {
        return { error: "Please enter a valid sale price." };
      }
      rememberPrice(price);

      const { first, rest } = splitAtCap(price, FIRST_TIER_CAP);
      const commissionFor = (firstRateId, restRateId) =>
        first * (readNumber(firstRateId) / 100) + rest * (readNumber(restRateId) / 100);

      const totalComm = commissionFor("comm-total-first-rate", "comm-total-rest-rate");
      const buyerComm = commissionFor("comm-buyer-first-rate", "comm-buyer-rest-rate");

      const results = {
        "comm-result-total": totalComm,
        "comm-result-buyer": buyerComm,
        "comm-result-listing": totalComm - buyerComm
      };

      const applyGst = gstCheckbox.checked;
      if (applyGst) {
        const gstTotal = totalComm * 0.05;
        results["comm-result-gst-total"] = gstTotal;
        results["comm-result-total-with-gst"] = totalComm + gstTotal;
      }

      return {
        results,
        lines: {
          "comm-gst-total-line": applyGst,
          "comm-total-with-gst-line": applyGst
        }
      };
    }
  });

  gstCheckbox.addEventListener("change", () => {
    if (priceInput.value.trim()) {
      calculator.run();
    }
  });
})();

// ===== Seller Net Sheet =====
createCalculator({
  formId: "form-net",
  errorId: "net-error",
  resultsId: "net-results",
  compute() {
    const sale = readCurrency("net-sale-price");
    if (!sale || sale <= 0) {
      return { error: "Please enter a valid sale price." };
    }
    rememberPrice(sale);

    const deductions =
      readCurrency("net-mortgage") + readCurrency("net-commission") + readCurrency("net-other");

    return {
      results: {
        "net-result-sale": sale,
        "net-result-deductions": deductions,
        "net-result-net": sale - deductions
      }
    };
  }
});

// ===== Mortgage Payment =====
createCalculator({
  formId: "form-mortgage",
  errorId: "mort-error",
  resultsId: "mort-results",
  compute() {
    const loan = readCurrency("mort-loan");
    const rate = readNumber("mort-rate");
    const years = parseInt($("mort-years").value, 10);

    if (!loan || loan <= 0) {
      return { error: "Please enter a valid loan amount." };
    }
    if (!rate || rate <= 0 || !years || years <= 0) {
      return { error: "Please enter a valid rate and amortization." };
    }
    rememberPrice(loan);

    const paymentsPerYear = $("mort-frequency").value === "biweekly" ? 26 : 12;
    const n = years * paymentsPerYear;
    const r = rate / 100 / paymentsPerYear;

    const payment = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    return {
      results: {
        "mort-result-loan": loan,
        "mort-result-payment": payment,
        "mort-result-peryear": paymentsPerYear.toString(),
        "mort-result-interest": payment * n - loan
      }
    };
  }
});

// ===== Flip / Investment Profit =====
createCalculator({
  formId: "form-flip",
  errorId: "flip-error",
  resultsId: "flip-results",
  compute() {
    const purchase = readCurrency("flip-purchase");
    const sale = readCurrency("flip-sale");

    if (!purchase || purchase <= 0 || !sale || sale <= 0) {
      return { error: "Please enter both purchase and resale prices." };
    }
    rememberPrice(sale);

    const totalCost =
      purchase + readCurrency("flip-reno") + readCurrency("flip-holding") + readCurrency("flip-other");
    const profit = sale - totalCost;
    const roi = totalCost > 0 ? (profit / totalCost) * 100 : 0;

    return {
      results: {
        "flip-result-cost": totalCost,
        "flip-result-profit": profit,
        "flip-result-roi": roi.toFixed(1) + " %"
      }
    };
  }
});
