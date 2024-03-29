


///////////////////////////////////////////////// // Arrays  /////////////////////////////////////////////////

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////

// // SLICE method
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(-2));
console.log(arr.slice(1, 4));
console.log(arr.slice(-1));

// // SPLICE method
console.log(arr.splice(1));
console.log(arr);

// // REVERSE 
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);


// // CONCAT 
const letters = arr.concat(arr2);
console.log(letters);
console.log([...arr, ...arr2]);

// JOIN
console.log(letters.join('-'));

// /************* forOf and forEach Loop **************/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for(const [i, movement] of movements.entries()) {
  if(movement > 0) console.log(`Movement ${i + 1}: You deposited ${movement}`);
  else console.log(`Movement ${i + 1}: You withdrew ${movement}`)
}

/*
There is no way we can BREAK or CONTINUE ForEach Loop
 */
movements.forEach(function(mov, i, arr){
  if(mov > 0) console.log(`Movement ${i + 1}: You deposited ${mov}`);
  else console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
});

// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

// // /************* forOf and forEach Loop with Maps and Sets **************/

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});

// SET

const currenciesUnique = new Set(['USD', 'EURO', 'GBP', 'USD', 'EURO', 'GBP']);
console.log(currenciesUnique);
currenciesUnique.forEach(function(value, key, map){
  console.log(`${key}: ${value}`);
});


// /************* Coding Challange - 01 **************/

const dogsJulia = [3, 5, 2, 12, 7];
const dogsKate = [4, 1, 15, 8, 3];

dogsJulia.splice(-2);
// console.log(dogsJulia);

const checkDogs = function(dogsJ, dogsK) {
  ages = dogsJ.concat(dogsK);

  ages.forEach(function(age, i, arr) {
    age > 3 ? console.log(`Dog number ${i + 1} is an adult, and is ${age} years old`) : console.log(`Dog number ${i + 1} is a puppy, and is ${age} years old`)
  });
}

checkDogs(dogsJulia, dogsKate);



// /************* Map Method **************/

// MAP method return a new array with new eliments

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];



const movementsUsd = movements.map(function(mov) {
  return mov * euroToUsd;
});

// /* Arrow Function */ 
// const movementsUsd = movements.map(mov => 
//    mov * euroToUsd
// );

console.log(movements);
console.log(movementsUsd);

const movementsUsdFor = [];
for (const mov of movements) {
  movementsUsdFor.push(mov * euroToUsd);
}
console.log(movementsUsdFor);

/* Arrow Function */ 
const movDes = movements.map((mov, i) => 
// {
  `Movement ${i + 1}: You ${mov > 0 ? 'deposite' : 'withdraw'} ${Math.abs(mov)}`

  // if(mov > 0) return`Movement ${i + 1}: Deposite ${mov}`;
  // else return `Movement ${i + 1}: withdraw ${Math.abs(mov)}`;
// }
);

console.log(movDes);



// /************* FILTER METHOD **************/

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const dep = movements.filter(function(mov) {
  return mov > 0;
});
console.log(dep);

/* Arrow Functions */
const deposit = movements.filter(mov =>  mov > 0);
console.log(deposit);

const withdrawal = movements.filter(mov => mov < 0);
console.log(withdrawal);


/************* REDUCE METHOD **************/
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

const balance = movements.reduce(function(acc, cur,i){
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

/* Arrow Function */ 
const balnc = movements.reduce((accu, curn) => accu + curn, 0);

console.log(balnc);

console.log(balance);

// Maximum Value
const max = movements.reduce((acc, cur) => {
  if(acc > cur) return acc;
  else return cur;
}, movements[0]);
console.log(max);


/************* Coding Challange - 02 **************/

const array = [5, 2, 4, 1, 15, 8, 3];
const array2 = [16, 6, 10, 5, 6, 1, 4];

caclAverageHumanAge = (ages) => {
  const humanAges = ages.map(age => (age <= 2 ? 2 * age : 16 + age * 4));
  console.log(humanAges);
  
  const adultDogs = humanAges.filter(age => (age > 18));
  console.log(adultDogs);

  const adultAvg = adultDogs.reduce((acc, cur) => acc += cur, 0) / adultDogs.length;
  return adultAvg;
};

const avg1 = caclAverageHumanAge(arr);
const avg2 = caclAverageHumanAge(arr2);

console.log(avg1, avg2);


// /************ The Magic of Chaining Methods *************/
const euroToUsd = 1.1;


// PIPELINES
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

/************* Coding Challange - 03 **************/



calcAverageHumanAge = (ages) => {
  const avg = ages.map((age) =>
    (age <= 2 ? 2 * age : 16 + age * 4)
  ).filter((mov) => console.log(mov)).filter((age) => `${age > 18}`)
  // console.log(avg);
};
console.log(calcAverageHumanAge(arr));


/************* FIND METHOD **************/

// Can retrive a element of an Array based on a condition

// Filter Method return a New array, while find method return just a element itself

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const firstWithdrawal = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawal);


const account = accounts.find(acc => acc.owner === 'Nokibul Alam');
console.log(account);

const owner = [];
for(const [name, key] of accounts.entries(accounts)) {
  if(key.owner === 'Nokibul Alam') console.log(key);
}


/*************** SOME & EVERY METHOD ****************/

console.log(movements);

// Equality
console.log(movements.includes(-130));

// CONDITION
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);

// EVERY METHOD
console.log(account4.movements.every(mov => mov > 0));

// Seperate Callback
const deposit2 = mov => mov > 0;
console.log(movements.every(deposit));
console.log(movements.some(deposit));
console.log(movements.filter(deposit));


/*************** FLAT & FLATMAP ****************/
const n = [[1, 2, 3], 4, 5, [6, 7, 8], 9];
console.log(n.flat());

const arrDeep = [[1, 2, [3, 4], 5], 6, 7, [8, 9]];
console.log(arrDeep.flat(2));


/*************** Sorting Arrays ****************/

const owners = ['Nokibul', 'Himel', 'Afroje', 'Nafis'];
console.log(owners.sort());

// Numbers

// Ascending Order
// movements.sort((a, b) => {
//   if(a > b) return 1;
//   if(a < b) return -1;
// });
movements.sort((a, b) => a - b);
console.log(movements);

// Descending order
// movements.sort((a, b) => {
//   if(a > b) return -1;
//   if(a < b) return 1;
// });
movements.sort((a, b) => b - a);
console.log(movements);



/*************** Creating and Filling Arrays ****************/
const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

const x = new Array(7);
console.log(x);

x.fill(1, 3, 5);
console.log(x);

arr3.fill(23, 2, 6);
console.log(arr3);

// Array.from
const y = Array.from({ length: 7}, () => 1);
console.log(y);

const z = Array.from({ length: 7}, (_, i) => i + 1);
console.log(z);

const rollDice = Array.from({ length: 100}, (_, i) => Math.trunc(Math.random(i)));
console.log(rollDice);




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








///////////////////////////////////////////////// // Numbers  /////////////////////////////////////////////////