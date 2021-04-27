// All transactions
let transactions = [
	{
		id: 1,
		text: 'Salary',
		amount: 3000,
	},
	{
		id: 2,
		text: 'Given To GF',
		amount: -500,
	},
	{
		id: 3,
		text: 'Online Shopping',
		amount: -200,
	},
	{
		id: 4,
		text: 'Grocery',
		amount: -100,
	},
	{
		id: 5,
		text: 'GF Given Back',
		amount: 500,
	},
];

const history = document.getElementById('history-list');
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const newTransText = document.getElementById('trans-name');
const newTransAmt = document.getElementById('trans-amount');
const addBtn = document.getElementById('addBtn');
const helpBtn = document.getElementById('help');
const helpModal = document.getElementById('help-modal');

//update on load
updateDOM();

function updateDOM() {
	updateHistory();
}

function updateHistory() {
	//clearing the history
	history.innerHTML = '';

	//update history
	transactions.forEach((transaction) => {
		const newTrans = document.createElement('li');

		newTrans.classList.add('money');
		newTrans.classList.add(transaction.amount > 0 ? 'plus' : 'minus');

		newTrans.innerHTML = `<h4>${transaction.text}</h4><span>&#8377;${Math.abs(
			transaction.amount,
		)}`;

		history.appendChild(newTrans);
	});

	calBalance();
}

function calBalance() {
	//total balance
	const balanceAmt = transactions.reduce(
		(acc, trans) => (acc += trans.amount),
		0,
	);

	//total income
	const incomeAmt = transactions
		.filter((trans) => {
			return trans.amount > 0;
		})
		.reduce((acc, trans) => (acc += trans.amount), 0);

	//total expense
	const expenseAmt = transactions
		.filter((trans) => {
			return trans.amount < 0;
		})
		.reduce((acc, trans) => (acc += trans.amount), 0);

	balance.innerHTML = `&#8377;${balanceAmt.toFixed(2)}`;
	income.innerHTML = `+&#8377;${incomeAmt.toFixed(2)}`;
	expense.innerHTML = `-&#8377;${Math.abs(expenseAmt).toFixed(2)}`;
}

function addNewTransaction(e) {
	if (newTransText.value == '' || newTransAmt.value == '') {
		alert('Please Enter Correct Values');
	} else {
		//generating a random Id
		let randomId = Math.floor(Math.random() * 10000);
		console.log(randomId);

		//new transaction
		const newTrans = {
			id: randomId,
			text: newTransText.value,
			amount: +newTransAmt.value,
		};

		//add it to transaction history
		transactions.push(newTrans);

		//clearing input field
		newTransText.value = '';
		newTransAmt.value = '';

		updateDOM();
	}
	e.preventDefault();
}

function deleteTransaction(e) {
	// console.log(e.target.parentElement.firstChild.innerText);

	let item = e.target.parentElement.firstChild.innerText;

	transactions = transactions.filter((transaction) => {
		return transaction.text != item;
	});

	updateDOM();
}

addBtn.addEventListener('click', addNewTransaction);
history.addEventListener('dblclick', deleteTransaction);
helpBtn.addEventListener('click', () => {
	helpModal.classList.toggle('show');
	helpBtn.innerHTML = helpModal.classList.contains('show') ? 'X' : '?';
});
