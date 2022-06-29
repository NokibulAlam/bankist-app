
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

///////////////////////////////////////////////

// SLICE method
let arr = ['a', 'b', 'c', 'd', 'e'];
console.log(arr.slice(2));
console.log(arr.slice(-2));
console.log(arr.slice(1, 4));
console.log(arr.slice(-1));

// SPLICE method
console.log(arr.splice(1));
console.log(arr);

// REVERSE 
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);


// CONCAT 
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

// /************* forOf and forEach Loop with Maps and Sets **************/

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


/************* Coding Challange - 01 **************/

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



/************* Map Method **************/

// MAP method return a new array with new eliments

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const euroToUsd = 1.1;

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



/************* FILTER METHOD **************/

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
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

console.log(movements);

const balance = movements.reduce(function(acc, cur,i){
  console.log(`Iteration ${i}: ${acc}`);
  return acc + cur;
}, 0);

/* Arrow Function */ 
const balnc = movements.reduce((accu, curn) => accu + curn, 0);

console.log(balnc);

console.log(balance);