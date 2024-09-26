// Element Variables
const checkingSelector = document.getElementById("checking-selector");
const savingsSelector = document.getElementById("savings-selector");
const addFundsSelector = document.getElementById("add-funds-selector");
const subtractFundsSelector = document.getElementById(
  "subtract-funds-selector"
);
const addedFunds = document.getElementById("add-funds");
const subtractedFunds = document.getElementById("subtract-funds");
const addedDate = document.getElementById("addition-date");
const subtractedDate = document.getElementById("subtraction-date");
const transactionMessage = document.getElementById("memo");
const transactionList = document.getElementById("transaction-list");
const accountsDisplay = document.getElementById("accounts-display");
const finalize = document.getElementById("submit-transaction");
const addFundsLabel = document.getElementById("add-funds-label");
const subFundsLabel = document.getElementById("sub-funds-label");
const memoLabel = document.getElementById("memo-label");

// Scripting Variables
let transactionArray = [];
let checkingAccount = 0;
let savingsAccount = 0;
let previousChecking = 0;
let previousSaving = 0;
updateDisplay();

// Functions

// Updates Top Display With Current Balances //
function updateDisplay() {
  const checkingTotal = "Checking: $" + checkingAccount;
  const savingsTotal = "Savings: $" + savingsAccount;
  accountsDisplay.textContent = `Account Totals: [${checkingTotal}] [${savingsTotal}]`;
  if (transactionArray.length > 50) {
    transactionArray.pop();
  }
  transactionList.innerHTML = "";
  transactionArray.forEach((transaction) => {
    transactionList.innerHTML += "<li>" + transaction + "</li>";
  });
}

// Enables Selectors For Adding Or Subtracting //
function enableSelectors() {
  addFundsSelector.removeAttribute("disabled");
  subtractFundsSelector.removeAttribute("disabled");
}

// Checks Inputs To Activate Submit Button //
function checkInputs() {
  if (
    addedFunds.value != "" &&
    addedDate.value != "" &&
    transactionMessage.value != ""
  ) {
    finalize.removeAttribute("disabled");
  } else if (
    subtractedFunds.value != "" &&
    subtractedDate.value != "" &&
    transactionMessage.value != ""
  ) {
    finalize.removeAttribute("disabled");
  } else {
    finalize.setAttribute("disabled", true);
  }
}

// Reveals Elements Related To Adding Funds //
function addFundsShow() {
  // Stops Form From Resetting //
  event.preventDefault();

  // Control Visible Elements //
  addFundsLabel.removeAttribute("hidden");
  addedFunds.removeAttribute("hidden");
  addedDate.removeAttribute("hidden");
  memoLabel.removeAttribute("hidden");
  transactionMessage.removeAttribute("hidden");
  finalize.removeAttribute("hidden");
  addedFunds.setAttribute("required", true);
  addedDate.setAttribute("required", true);
  transactionMessage.setAttribute("required", true);

  // Control Hidden Elements //
  subFundsLabel.setAttribute("hidden", true);
  subtractedFunds.setAttribute("hidden", true);
  subtractedDate.setAttribute("hidden", true);
  subtractedFunds.removeAttribute("required");
  subtractedDate.removeAttribute("required");
}

// Reveals Elements Related To Subtracting Funds //
function subFundsShow() {
  // Stops Form From Resetting //
  event.preventDefault();

  // Control Visible Elements //
  subFundsLabel.removeAttribute("hidden");
  subtractedFunds.removeAttribute("hidden");
  subtractedDate.removeAttribute("hidden");
  memoLabel.removeAttribute("hidden");
  transactionMessage.removeAttribute("hidden");
  finalize.removeAttribute("hidden");
  subtractedFunds.setAttribute("required", true);
  subtractedDate.setAttribute("required", true);
  transactionMessage.setAttribute("required", true);

  // Control Hidden Elements //
  addFundsLabel.setAttribute("hidden", true);
  addedFunds.setAttribute("hidden", true);
  addedDate.setAttribute("hidden", true);
  addedFunds.removeAttribute("required");
  addedDate.removeAttribute("required");
}

// Processes Transaction //
function submitTransaction() {
  if (checkingSelector.checked && addedFunds.required) {
    // Stops Form From Resetting //
    event.preventDefault();

    // Changes fundsToAdd To A Number From String //
    const fundsToAdd = parseFloat(addedFunds.value);

    // Checks That fundsToAdd Is A Number & Is > 0 //
    if (!isNaN(fundsToAdd) && fundsToAdd > 0) {
      previousChecking = checkingAccount; // Updates Previous Balance //
      checkingAccount += fundsToAdd; // Updates Current Balance //
      transactionArray.unshift(
        `[CHECKING DEPOSIT] [Previous Balance: $${previousChecking}] [Deposited: $${addedFunds.value}] [New Balance: $${checkingAccount}] [Memo: ${transactionMessage.value}] [Date: ${addedDate.value}]`
      ); // Adds Transaction To An Array For Display //
      updateDisplay();

      // Resets Input Areas //
      addedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    }
  } else if (checkingSelector.checked && subtractedFunds.required) {
    // Stops Form From Resetting //
    event.preventDefault();

    // Changes fundsToAdd To A Number From String //
    const fundsToSubtract = parseFloat(subtractedFunds.value);

    // Checks That fundsToSubtract Is A Number & Is > 0 //
    if (!isNaN(fundsToSubtract) && fundsToSubtract > 0) {
      previousChecking = checkingAccount; // Updates Previous Balance //
      checkingAccount -= fundsToSubtract; // Updates Current Balance //
      transactionArray.unshift(
        `[CHECKING WITHDRAWAL] [Previous Balance: $${previousChecking}] [Withdrawn: $${subtractedFunds.value}] [New Balance: $${checkingAccount}] [Memo: ${transactionMessage.value}] [Date: ${subtractedDate.value}]`
      ); // Adds Transaction To An Array For Display //
      updateDisplay();

      // Resets Input Areas //
      subtractedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    }
  } else if (savingsSelector.checked && addedFunds.required) {
    // Changes fundsToAdd To A Number From String //
    const fundsToAdd = parseFloat(addedFunds.value);

    // Checks That fundsToAdd Is A Number & Is > 0 //
    if (!isNaN(fundsToAdd) && fundsToAdd > 0) {
      previousSaving = savingsAccount; // Updates Previous Balance //
      savingsAccount += fundsToAdd; // Updates Current Balance //
      transactionArray.unshift(
        `[SAVINGS DEPOSIT] [Previous Balance: $${previousSaving}] [Deposited: $${addedFunds.value}] [New Balance: $${savingsAccount}] [Memo: ${transactionMessage.value}] [Date: ${addedDate.value}]`
      ); // Adds Transaction To An Array For Display //
      updateDisplay();

      // Resets Input Areas //
      addedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    }
  } else if (savingsSelector.checked && subtractedFunds.required) {
    // Changes fundsToAdd To A Number From String //
    const fundsToSubtract = parseFloat(subtractedFunds.value);

    // Checks That fundsToSubtract Is A Number & Is > 0 //
    if (!isNaN(fundsToSubtract) && fundsToSubtract > 0) {
      previousSaving = savingsAccount; // Updates Previous Balance //
      savingsAccount -= fundsToSubtract; // Updates Current Balance //
      transactionArray.unshift(
        `[SAVINGS WITHDRAWAL] [Previous Balance: $${previousSaving}] [Withdrawn: $${subtractedFunds.value}] [New Balance: $${savingsAccount}] [Memo: ${transactionMessage.value}] [Date: ${subtractedDate.value}]`
      ); // Adds Transaction To An Array For Display //
      updateDisplay();

      // Resets Input Areas //
      subtractedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled".true);
    }
  }
}

// Event Listeners //
const radioButtons = document.querySelectorAll('input[name="account"]');
radioButtons.forEach((radio) => {
  radio.addEventListener("change", enableSelectors);
  4;
});
finalize.addEventListener("click", submitTransaction);
addedFunds.addEventListener("input", checkInputs);
addedDate.addEventListener("input", checkInputs);
subtractedFunds.addEventListener("input", checkInputs);
subtractedDate.addEventListener("input", checkInputs);
transactionMessage.addEventListener("input", checkInputs);
addFundsSelector.addEventListener("click", addFundsShow);
subtractFundsSelector.addEventListener("click", subFundsShow);
