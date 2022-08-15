'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP
 

// Data
// const account1 = {
//   owner: 'Nokibul Alam',
//   movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
//   interestRate: 1.2, // %
//   pin: 1111,
// };

// const account2 = {
//   owner: 'Jannate Dil Afroj',
//   movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
//   interestRate: 1.5,
//   pin: 2222,
// };

// const account3 = {
//   owner: 'Istiak Himel',
//   movements: [200, -200, 340, -300, -20, 50, 400, -460],
//   interestRate: 0.7,
//   pin: 3333,
// };

// const account4 = {
//   owner: 'Nafis Al Moin',
//   movements: [430, 1000, 700, 50, 90],
//   interestRate: 1,
//   pin: 4444,
// };

// const accounts = [account1, account2, account3, account4];


const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];


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
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${account.balance.toFixed(2)}€`;
}


const calcDisplaySummary = function(account) {
  const incomes = account.movements.filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = account.movements.filter(mov => mov < 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = account.movements.filter(mov => mov > 0)
  .map(deposit => (deposit * account.interestRate) / 100)
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
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

    if(currentAccount?.pin === +(inputLoginPin.value)){
      
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

  const amount = +(inputTransferAmount.value);
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
  
  if(inputCloseUsername.value === currentAccount.username && +inputClosePin.value === currentAccount.pin) {
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

  const amount = Math.floor(inputLoanAmount.value);

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



//////////////////////////////////// LECTURE ///////////////////////////////////


//////////////////**********************Converting and Checking Numbers ******************////////////////////

// Base 10 - 0 to 9
// Binary base 2 - 0 1

console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3);

console.log(Number('23'));

// Type coersion
console.log(+'23');


/// Parsing
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e30px', 10));

console.log(Number.parseFloat('2.56rem'));
console.log(Number.parseInt('2.56rem'));


console.log(Number.isNaN(20));
console.log(Number.isNaN('20'));
console.log(Number.isNaN(+'20X'));
console.log(Number.isNaN(23 / 0));


// Checking if value is Number
console.log(Number.isFinite(20));
console.log(Number.isFinite('20'));
console.log(Number.isFinite(+'20X'));
console.log(Number.isFinite(23 / 0));



//////////////////**********************Math & Rounding******************////////////////////

console.log(Math.sqrt(25));
console.log(25 ** (1 / 2));
console.log(8 ** (1 / 3));


console.log(Math.max(1, 2, 3, 4, 5, 6));
console.log(Math.max(1, 2, 3, 4, 5, 6, '7'));
console.log(Math.max(1, 2, 3, 4, 5, 6, '7px')); // Parsing Do Not Work

console.log(Math.min(1, 2, 3, 4, 5, 6, '7')); // Parsing Do Not Work


const randomInt = (min, max) => {
  Math.floor(Math.random() * (max - min) + 1) + min;
};
// 0...1 -> 0...(max - min) -> min...max
console.log(randomInt(10, 20)); 


// Rounding integers
console.log(Math.round(23.3));
console.log(Math.round(23.9));

/* floor and Ceil mathod is type coersion to number */
console.log(Math.ceil(23.9));
console.log(Math.floor(23.9));
console.log(Math.floor('23.9'));

// Rounding Decimals
console.log((2.7).toFixed(0));
console.log((2.7).toFixed(3));
console.log((2.7).toFixed(2));
console.log(+(2.7).toFixed(1));


//////////////////**********************The Reminder Operator******************////////////////////

console.log(5 % 2);
