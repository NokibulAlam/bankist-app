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
    '2022-07-27T17:01:17.194Z',
    '2022-08-14T23:36:17.929Z',
    '2022-08-17T10:51:36.790Z',
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


const formatMovementDate = function(date, locale) {
  const countDays = (date1, date2) => Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = countDays(new Date(), date);

  if(daysPassed === 0) return 'Today';
  if(daysPassed === 1) return 'Yesterday';
  if(daysPassed <= 7) return `${daysPassed} days ago`;

  return new Intl.DateTimeFormat(locale).format(date);
}


const formatCur = function(value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
}


const displayMovements = function(account, sort = false) {
  containerMovements.innerHTML = '';

  // Sorting the movements with a copy of a Movements array
  const movs = sort ? account.movements.slice().sort((a, b) => a - b) : account.movements;
  
  movs.forEach(function(mov, i){
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const displayDate = formatMovementDate(new Date(account.movementsDates[i]), account.locale);

    const formatedMov = formatCur(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};



const calcDisplayBalance = function(account) {
  account.balance = account.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = formatCur(account.balance, account.locale, account.currency);
}


const calcDisplaySummary = function(account) {
  const incomes = account.movements.filter(mov => mov > 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = formatCur(incomes, account.locale, account.currency);

  const out = account.movements.filter(mov => mov < 0)
  .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = formatCur(out, account.locale, account.currency);

  const interest = account.movements.filter(mov => mov > 0)
  .map(deposit => (deposit * account.interestRate) / 100)
  .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, account.locale, account.currency);
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
  displayMovements(account);
      
  // Display Balance
  calcDisplayBalance(account);

  // Display Summary
  calcDisplaySummary(account);
}


const setLogOutTimer = function() {
  const tick = function() {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

     // In each caa, print the remaining time to UI
     labelTimer.textContent = `${min}:${sec}`;

     if(time === 0){
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    time--;
  };

  // Set time to 5 minutes
  let time = 30;

  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
}


// Event Handler
let currentAccount, timer;

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

      // Create current date & time
      const now = new Date();
      const option = {
        hour: 'numeric',
        minute: 'numeric',
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
        // weekday: 'long',
      }

      const locale = navigator.language;
      labelDate.textContent = new Intl.DateTimeFormat(currentAccount.locale, option).format(now);

      if(timer) clearInterval(timer);
      timer = setLogOutTimer();

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

      // Add Transfer Date
      currentAccount.movementsDates.push(new Date().toISOString());
      reciverAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      clearInterval(timer);
      timer = setLogOutTimer();
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

    // Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    clearInterval(timer);
    timer = setLogOutTimer();
  }
  inputLoanAmount.value = '';
});



/* Sorted Variable for making sort TRUE or FALSE */
let sorted = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

