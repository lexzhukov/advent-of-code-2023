async function fileLines() {
  const fileContents = Bun.file('input.txt');
  const text = await fileContents.text();
  return text.trim().split('\n');
}

const input = await fileLines();

function part1() {
  const numbers = [];

  for (let i = 0; i < input.length; i++) {
    const word = input[i];

    // First Digit
    let firstDigit = undefined;
    for (let j = 0; j < word.length; j++) {
      if (!Number.isNaN(Number(word[j]))) {
        firstDigit = word[j];
        break;
      }
    }

    // Second Digit
    let secondDigit = undefined;
    for (let j = word.length; j >= 0; j--) {
      if (!Number.isNaN(Number(word[j]))) {
        secondDigit = word[j];
        break;
      }
    }
    numbers.push(Number(`${firstDigit}${secondDigit}`));
  }

  const total = numbers.reduce((a, b) => a + b, 0);
  console.log(total);
}

part1();
