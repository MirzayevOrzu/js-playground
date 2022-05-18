const { Buffer } = require('node:buffer');

// Buffer is created from string using utf8 encoding.
// Size of the buffer is calculated by function itself.
const buff1 = Buffer.from('12345678', 'utf8');

console.log(buff1); // => <Buffer 31 32 33 34 35 36 37 38>

// We can know the byte size of buffer
// by using the length property
// or by using the byteLength property of Buffer.
console.log(Buffer.byteLength(buff1)); // => 8
console.log(buff1.length); // => 8

const buff2 = Buffer.from([111, 114, 122, 117], 'hex');

console.log(buff2); // => <Buffer 6f 72 7a 75>

// We can conver buffer to string using toString() method
console.log(buff2.toString('utf8')); // => orzu
