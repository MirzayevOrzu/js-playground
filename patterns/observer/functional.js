let subscibers = [];

function subscibe(fn) {
  subscibers.push(fn);
}

function unsubscribe(fn) {
  subscibers = subscibers.filter((item) => item !== fn);
}

function fire(data) {
  for (let i = 0; i < subscibers.length; i++) {
    subscibers[i](data);
  }
}

const multiplyBy2 = (n) => console.log(n * 2);
const divideBy2 = (n) => console.log(n / 2);

subscibe(multiplyBy2);
subscibe(divideBy2);

fire(4);

unsubscribe(divideBy2);

fire(10);
