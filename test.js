var _ = require('lodash');

// var characters = [
//   { name: 'barney', age: 36, blocked: false },
//   { name: 'fred',   age: 40, blocked: true },
//   { name: 'mad',   age: 36, blocked: true },
  
// ];

// var r = _.filter(characters, { age: 36, name : 'mad' });
// console.log('{2 filter}>', r)

// r = _.filter(characters, {});
// console.log('{}>', r)

// r = _.filter(characters, null);
// console.log('null>', r)


var a1 = [
	{ name : 'vasa'},
	{ name : 'peta' } 
]

var a2 = [
	{ name : 'gala'},
	{ name : 'ola' } 
]


var r = a1.concat(a2);

console.log('a1>', a1);
console.log('a2>', a2);
console.log('r>', r);