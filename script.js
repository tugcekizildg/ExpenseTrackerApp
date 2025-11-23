//Variables
let allTransactions = [];

//Selecting Elements
const addTransactionForm = document.getElementById('transactionForm');
const transactionList = document.getElementById('transactionList');

const totalBalance = document.getElementById('totalBalance');
const totalIncome = document.getElementById('totalIncome');
const totalExpense = document.getElementById('totalExpense');

//Event Listeners
addTransactionForm.addEventListener('submit', addTransaction);

//Functions
//Add Transaction
function addTransaction(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const type = formData.get('type').trim().toLowerCase();
  const amount = Number(formData.get('amount'));
  const date = formData.get('date');
  const rawCategory = formData.get('category') || '';
  const category =
    rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1).toLowerCase();

  updateList(type, amount, date, category);
  // adding transaction to array first place
  allTransactions.unshift({ type, amount, date, category });

  updateBalance();

  addTransactionForm.reset();
}

//Remove Transaction (used only on each delete button)
function removeTransaction(e) {
  const deleteBtn = e.target.closest('.transaction-delete');
  if (!deleteBtn) return;

  const itemEl = deleteBtn.closest('.transaction-item');
  if (!itemEl) return;

  const index = Array.from(transactionList.children).indexOf(itemEl);
  if (index === -1) return;

  // deletes targeted transaction from the array
  allTransactions.splice(index, 1);
  updateBalance();
  itemEl.remove();
}

//Update List(rendering transactions)
function updateList(type, amount, date, category) {
  const itemEl = document.createElement('li');
  const iconEl = document.createElement('div');
  const detailsEl = document.createElement('div');
  const nameEl = document.createElement('div');
  const dateEl = document.createElement('div');
  const amountEl = document.createElement('div');
  const deleteEl = document.createElement('button');

  //Adding Classes
  itemEl.classList.add('transaction-item');
  iconEl.classList.add('transaction-icon');
  detailsEl.classList.add('transaction-details');
  nameEl.classList.add('transaction-name');
  dateEl.classList.add('transaction-date');
  amountEl.classList.add('transaction-amount');
  deleteEl.classList.add('transaction-delete');

  iconEl.innerText = type === 'income' ? '↑' : '↓';
  iconEl.classList.add(type === 'income' ? 'income' : 'expense');
  nameEl.innerText = category;
  dateEl.innerText = new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  amountEl.innerText = (type === 'income' ? '+' : '-') + '$' + amount;
  amountEl.classList.add(type === 'income' ? 'income' : 'expense');

  deleteEl.innerText = 'X';
  deleteEl.addEventListener('click', removeTransaction);

  detailsEl.appendChild(nameEl);
  detailsEl.appendChild(dateEl);
  itemEl.appendChild(iconEl);
  itemEl.appendChild(detailsEl);
  itemEl.appendChild(amountEl);
  itemEl.appendChild(deleteEl);

  transactionList.prepend(itemEl);
}

//Update Balance
function updateBalance() {
  let income = 0;
  let expense = 0;
  let balance = 0;

  allTransactions.forEach((transaction) => {
    if (transaction.type === 'income') {
      income += Number(transaction.amount);
      balance += Number(transaction.amount);
    } else {
      expense += Number(transaction.amount);
      balance -= Number(transaction.amount);
    }
  });

  totalBalance.innerText = '$' + balance;
  totalIncome.innerText = '$' + income;
  totalExpense.innerText = '$' + expense;
}
