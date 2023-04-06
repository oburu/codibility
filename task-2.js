function momentsBulbShines(arr) {
  const bulbsChain = Array(arr.length).fill(false); // Initial Array of swithed off bulbs [false, false, false, false, false]

  const count = arr.reduce((count, moment) => {
    const position = moment - 1;
    bulbsChain[position] = true;
    const chainSlice = bulbsChain.slice(0, moment);

    if (!chainSlice.includes(false)) {
      count++;
    }

    return count;
  }, 0);

  return count;
}

console.log(momentsBulbShines([2, 1, 3, 5, 4])); // [2, 1, 3, 5, 4] should return 3
console.log(momentsBulbShines([2, 3, 4, 1, 5])); // [2, 3, 4, 1, 5] should return 2
console.log(momentsBulbShines([1, 3, 4, 2, 5])); // [1, 3, 4, 2, 5] should return 3
