

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

const isEven = n => n % 2 === 0;

console.log(isEven(2));
console.log(isEven(5));
console.log(isEven(514));


labelBalance.addEventListener('click', function(){
  [...document.querySelectorAll('.movements__row')].forEach((row, i) => {
    if (i % 2 === 0) row.style.backgroundColor = 'blue';
  });
});


//////////////////**********************Working with BigInt******************////////////////////

console.log(4315487451798421544894512144989412n);
console.log(BigInt(54985497987));


// Operations
console.log(10000n + 10000n);
console.log(3245323435565231389685973n * 1000000n);

const huge = 203894964008487986098n;
const num = 23;
console.log(huge * BigInt(num));

// Exceptions
console.log(20n > 15);
console.log(20n === 20);
console.log(typeof 20n);
console.log(20n == '20');


// Divisions

console.log(10n / 3n);
console.log(10n / 3n);


//////////////////**********************Creating Dates******************////////////////////

// Create a Date
const now = new Date();
console.log(now);

console.log(new Date('Tue Aug 16 2022 13:19:26'));
console.log(new Date('December 31, 2021'));
console.log(account1.movementsDates[0]);

console.log(new Date(2037, 10, 19, 23, 57, 5));
console.log(new Date(2037, 10, 33));

const future = new Date(2037, 7, 18, 15, 23);
console.log(future);
console.log(future.getFullYear());
console.log(future.getMonth());
console.log(future.getMonth().toString());
console.log(future.getDate());
console.log(future.getDay());
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());


//////////////////**********************Operations With Dates******************////////////////////

const future2 = new Date(2037, 2, 14);
console.log(+future2);

const number = 654796218.45;

const option = {
  style: 'currency',
  unit: 'celsius',
  currency: 'EUR',
}

console.log(new Intl.NumberFormat('en-US').format(number));
console.log(new Intl.NumberFormat('de-DE').format(number));
console.log(navigator.language, new Intl.NumberFormat(navigator.language, option).format(number));



//////////////////********************** Timers_ setTimeout and setInterval ******************////////////////////

const ingredients = ['Sausage', 'Spinach'];
const pizzaTimer = setTimeout((inc1, inc2) => console.log(`Here is your Pizza with ${inc1} and ${inc2}`), 4000, ...ingredients);
console.log('Waiting...');
if(ingredients.includes('Spinach')) clearTimeout(pizzaTimer);