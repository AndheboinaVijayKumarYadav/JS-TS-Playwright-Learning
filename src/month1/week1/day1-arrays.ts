// Array methods

// 1. push() - adds an element to the end of the array
let arr1: number[] = [1, 2, 3];
console.log(arr1.push(4)); // returns the new length of the array
console.log(arr1); // arr1 is now [1, 2, 3, 4]

// 2. pop() - removes the last element from the array
let arr2: number[] = [1, 2, 3, 4];
console.log(arr2.pop()); // returns the removed element
console.log(arr2); // arr2 is now [1, 2, 3]

// 3. shift() - removes the first element from the array
let arr3: number[] = [1, 2, 3, 4];
console.log(arr3.shift()); // returns the removed element
console.log(arr3); // arr3 is now [2, 3, 4]

// 4. unshift() - adds an element to the beginning of the array
let arr4: number[] = [2, 3, 4];
console.log(arr4.unshift(1)); // returns the new length of the array
console.log(arr4); // arr4 is now [1, 2, 3, 4]

// 5. splice() - adds or removes elements from the array
let arr5: number[] = [1, 2, 3, 4];
console.log(arr5.splice(1, 2)); // returns the removed elements
console.log(arr5); // arr5 is now [1, 4]
console.log(arr5.splice(1, 0, 2, 3)); // returns an empty array
console.log(arr5); // arr5 is now [1, 2, 3, 4]

// 6. slice() - returns a shallow copy of a portion of the array
let arr6: number[] = [1, 2, 3, 4];
console.log(arr6.slice(1, 3)); // returns [2, 3]
console.log(arr6); // arr6 is still [1, 2, 3, 4]

// 7. indexOf() - returns the first index of the specified element
let arr7: number[] = [1, 2, 3, 4];
console.log(arr7.indexOf(3)); // returns 2
console.log(arr7.indexOf(5)); // returns -1 (not found) 

// 8. includes() - checks if the array contains a specified element
let arr8: number[] = [1, 2, 3, 4];
console.log(arr8.includes(3)); // returns true
console.log(arr8.includes(5)); // returns false

// 9. map() - creates a new array with the results of calling a provided function on every element in the array
let arr9: number[] = [1, 2, 3, 4];
let mappedArr = arr9.map(x => x * 2);
console.log(mappedArr); // returns [2, 4, 6, 8] 
console.log(arr9); // arr9 is still [1, 2, 3, 4]

// 10. filter() - creates a new array with all elements that pass the test implemented by the provided function
let arr10: number[] = [1, 2, 3, 4];
let filteredArr = arr10.filter(x => x % 2 === 0);
console.log(filteredArr); // returns [2, 4]
console.log(arr10); // arr10 is still [1, 2, 3, 4]

// 11. reduce() - executes a reducer function on each element of the array, resulting in a single output value
let arr11: number[] = [1, 2, 3, 4];
let sum = arr11.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // returns 10
console.log(arr11); // arr11 is still [1, 2, 3, 4]  

// 12. find() - returns the value of the first element in the array that satisfies the provided testing function
let arr12: number[] = [1, 2, 3, 4];
let found = arr12.find(x => x > 2);
console.log(found); // returns 3
console.log(arr12); // arr12 is still [1, 2, 3, 4]  

// 13. some() - tests whether at least one element in the array passes the test implemented by the provided function
let arr13: number[] = [1, 2, 3, 4];
console.log(arr13.some(x => x > 3)); // returns true
console.log(arr13.some(x => x > 4)); // returns false   

// 14. every() - tests whether all elements in the array pass the test implemented by the provided function
let arr14: number[] = [1, 2, 3, 4];
console.log(arr14.every(x => x > 0)); // returns true
console.log(arr14.every(x => x > 2)); // returns false

// 15. forEach() - executes a provided function once for each array element
let arr15: number[] = [1, 2, 3, 4];
arr15.forEach(x => console.log(x)); // logs 1, 2, 3, 4 to the console
console.log(arr15); // arr15 is still [1, 2, 3, 4]

// Playwright connection:
// filter locked users before data-driven tests
// map usernames for parameterised tests
// find specific user for a test scenario
// reduce — count total failed assertions
// some   — check if ANY product is out of stock
// every  — verify ALL items in cart have price > 0