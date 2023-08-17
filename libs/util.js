export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getRandomElement(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

export function sleep(ms = 1000) {
  setTimeout(() => {
    Promise.resolve(true);
  }, ms);
}
