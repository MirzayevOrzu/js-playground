const promise = new Promise((resolve, reject) => {
  setTimeout(() => resolve('Incredible'), 2000);
});

module.exports = promise;
