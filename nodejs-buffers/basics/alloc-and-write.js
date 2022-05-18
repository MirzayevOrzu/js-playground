const { Buffer } = require('node:buffer');

// Allocate a buffer of size 8 bytes
const buff1 = Buffer.alloc(8);

// Write the string "12345678" to the buffer using utf8 encoding
buff1.write('12345678', 'utf-8');

// "12345678" is decoded using utf8 encoding
// and written to the buffer using base16 numeral system
// char | utf8 | base16 or hex
// -----|-------|------------
//  1   |  49   |  31
//  2   |  50   |  32
//  3   |  51   |  33
//  4   |  52   |  34
//  5   |  53   |  35
//  6   |  54   |  36
//  7   |  55   |  37
//  8   |  56   |  38
console.log(buff1); // => <Buffer 31 32 33 34 35 36 37 38>

// buff1.toJSON() returns a JSON representation of the buffer
console.log(buff1.toJSON()); // =>  { type: 'Buffer', data: [ 49, 50, 51, 52, 53, 54, 55, 56 ] }

// Different encoding methods return different string representations of the buffer
console.log(buff1.toString('utf-8')); // => 12345678
console.log(buff1.toString('utf16le')); // => ㈱㐳㘵㠷

const buff2 = Buffer.alloc(4);

// overflowed bytes are ignored
buff2.write('orzubek', 'utf-8');
console.log(buff2.toString('utf-8')); // => orzu
