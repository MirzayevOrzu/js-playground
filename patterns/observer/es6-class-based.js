class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);
  }

  unsubscribe(fn) {
    this.subscribers = this.subscribers.filter((item) => item !== fn);
  }

  fire(data) {
    for (let i = 0; i < this.subscribers.length; i++) {
      this.subscribers[i](data);
    }
  }
}

const observer = new Observable();

const multiplyBy2 = (n) => console.log(n * 2);
const divideBy2 = (n) => console.log(n / 2);

observer.subscribe(multiplyBy2);
observer.subscribe(divideBy2);

observer.fire(4);

observer.unsubscribe(divideBy2);

observer.fire(10);
