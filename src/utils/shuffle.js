function *shuffle(array) {
  let clone = array.slice(0);
  let index = clone.length;

  while (index--) {
    yield clone.splice(Math.floor(Math.random() * (index + 1)), 1)[0];
  }
}

export { shuffle };
