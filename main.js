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

function enableSelectors() {
  addFundsSelector.removeAttribute("disabled");
  subtractFundsSelector.removeAttribute("disabled");
}

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

function addFundsShow() {
  event.preventDefault();
  // Control Visible Elements //
  addFundsLabel.removeAttribute("hidden");
  addedFunds.removeAttribute("hidden");
  addedDate.removeAttribute("hidden");
  memoLabel.removeAttribute("hidden");
  transactionMessage.removeAttribute("hidden");
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

function subFundsShow() {
  event.preventDefault();
  // Control Visible Elements //
  subFundsLabel.removeAttribute("hidden");
  subtractedFunds.removeAttribute("hidden");
  subtractedDate.removeAttribute("hidden");
  memoLabel.removeAttribute("hidden");
  transactionMessage.removeAttribute("hidden");
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

function submitTransaction() {
  // ADD LOGIC FOR TRANSACTIONS //
  if (checkingSelector.checked && addedFunds.required) {
    event.preventDefault();

    // Changes addedFunds value to a number data type //
    const fundsToAdd = parseFloat(addedFunds.value);
    if (!isNaN(fundsToAdd) && fundsToAdd > 0) {
      previousChecking = checkingAccount;
      checkingAccount += fundsToAdd;
      transactionArray.unshift(
        `[CHECKING DEPOSIT] [Previous Balance: $${previousChecking}] [Deposited: $${addedFunds.value}] [New Balance: $${checkingAccount}] [Memo: ${transactionMessage.value}] [Date: ${addedDate.value}]`
      );
      updateDisplay();
      addedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    } else {
      alert("Please enter a valid amount.");
    }
  } else if (checkingSelector.checked && subtractedFunds.required) {
    event.preventDefault();

    // Changes addedFunds value to a number data type //
    const fundsToSubtract = parseFloat(subtractedFunds.value);
    if (!isNaN(fundsToSubtract) && fundsToSubtract > 0) {
      previousChecking = checkingAccount;
      checkingAccount -= fundsToSubtract;
      transactionArray.unshift(
        `[CHECKING WITHDRAWAL] [Previous Balance: $${previousChecking}] [Withdrawn: $${subtractedFunds.value}] [New Balance: $${checkingAccount}] [Memo: ${transactionMessage.value}] [Date: ${subtractedDate.value}]`
      );
      updateDisplay();
      subtractedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    } else {
      alert("Please enter a valid amount.");
    }
  } else if (savingsSelector.checked && addedFunds.required) {
    const fundsToAdd = parseFloat(addedFunds.value);

    if (!isNaN(fundsToAdd) && fundsToAdd > 0) {
      previousSaving = savingsAccount;
      savingsAccount += fundsToAdd;
      transactionArray.unshift(
        `[SAVINGS DEPOSIT] [Previous Balance: $${previousSaving}] [Deposited: $${addedFunds.value}] [New Balance: $${savingsAccount}] [Memo: ${transactionMessage.value}] [Date: ${addedDate.value}]`
      );
      updateDisplay();
      addedFunds.value = "";
      transactionMessage.value = "";
      finalize.setAttribute("disabled", true);
    } else {
      alert("Please enter a valid amount.");
    }
  } else if (savingsSelector.checked && subtractedFunds.required) {
    const fundsToSubtract = parseFloat(subtractedFunds.value);
    if (!isNaN(fundsToSubtract) && fundsToSubtract > 0) {
      previousSaving = savingsAccount;
      savingsAccount -= fundsToSubtract;
      transactionArray.unshift(
        `[SAVINGS WITHDRAWAL] [Previous Balance: $${previousSaving}] [Withdrawn: $${subtractedFunds.value}] [New Balance: $${savingsAccount}] [Memo: ${transactionMessage.value}] [Date: ${subtractedDate.value}]`
      );
      updateDisplay();
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

// FIND A WAY TO SHOW FULL NUMBER //
// EX. 25.50 SHOWS UP AS 25.5 //
