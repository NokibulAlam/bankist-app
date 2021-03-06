'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP


// Data
const account1 = {
  owner: 'Nokibul Alam',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jannate Dil Afroj',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Istiak Himel',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Nafis Al Moin',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];


// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';
  // .textContent = 0;

  // Sorting the movements with a copy of a Movements array
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__value">${mov}???</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance}???`;
}


const calcDisplaySummary = function(account) {
  const incomes = account.movements.filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes}???`;

  const out = account.movements.filter(mov => mov < 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}???`;

  const interest = account.movements.filter(mov => mov > 0)
  .map(deposit => (deposit * account.interestRate) / 100)
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}???`;
};


const createUsernames = function(accs) {
  accs.forEach(function(name){
    name.username = name.owner
    .toLowerCase()
    .split(' ')
    .map(word => word[0])
    .join('');
  });
};
createUsernames(accounts);

const updateUI = function(account) {
  // Display movments
  displayMovements(account.movements);
      
  // Display Balance
  calcDisplayBalance(account);

  // Display Summary
  calcDisplaySummary(account);
}

// Event Handler
let currentAccount;
btnLogin.addEventListener('click', function(e) {
  e.preventDefault();
  currentAccount = accounts.find(acc =>
    acc.username === inputLoginUsername.value
    );
    console.log(currentAccount);

    if(currentAccount?.pin === Number(inputLoginPin.value)){
      
      // Display UI and message
      labelWelcome.textContent = `Welcome Back, ${currentAccount.owner.split(' ')[0]}`;
      containerApp.style.opacity = 100;

      // Clear Input field
      inputLoginUsername.value =  inputLoginPin.value = '';
      inputLoginPin.blur();
      
      // Update UI
      updateUI(currentAccount);
    }
});

btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const reciverAccount = accounts.find(acc => acc.username === inputTransferTo.value);

  // Clear the field
  inputTransferAmount.value = inputTransferTo.value = '';

  if(amount > 0 && reciverAccount && currentAccount.balance >= amount && 
    reciverAccount?.username !== currentAccount.username) {
      // Doing the Transfer
      currentAccount.movements.push(-amount);
      reciverAccount.movements.push(amount);

      // Update UI
      updateUI(currentAccount);
    }
});

btnClose.addEventListener('click', function(e) {
  e.preventDefault();
  
  if(inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin) {
    // Finding the matched account INDEX
    const index = accounts.findIndex(account => account.username === currentAccount.username);
    
    //Deleteing that Index
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value =  inputClosePin.value = '';
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  // If Any Deposit is 10% than the requested loan amount
  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * .01)) {
    // Add Movements
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

/* Sorted Variable for making sort TRUE or FALSE */
let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});


// 1.
/* Same Work */
// const bankDepositSum = accounts.map(acc => acc.movements).flat();
const bankDepositSum = accounts.flatMap(acc => acc.movements).filter(mov => mov > 0).reduce((sum, cur) => sum + cur, 0);
console.log(bankDepositSum);

// 2.
// const numDeposit1000 = accounts.flatMap(acc => acc.movements).filter(mov => mov > 1000).length;
const numDeposit1000 = accounts.flatMap(acc => acc.movements).reduce((count, cur) => (cur >= 1000 ? ++count : count), 0);
console.log(numDeposit1000);

// Reduced ++ prefix
let a = 10;
console.log(++a);
console.log(a);

const numWithdraw1000 = accounts.flatMap(acc => acc < 1000).reduce((count, cur) => (cur < 1000 ? ++count : count), 0);
console.log(numWithdraw1000);