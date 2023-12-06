async function fileLines() {
  const fileContents = Bun.file('input.txt');
  const text = await fileContents.text();
  return text.trim().split('\n');
}

const input = await fileLines();

function part2() {
  const spelledNumbers = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  const numbers = [];

  for (let i = 0; i < input.length; i++) {
    const word = input[i];
    let abort = false;

    // First Digit
    let firstDigit = undefined;
    let firstDigitAcc = '';
    for (let j = 0; j < word.length && !abort; j++) {
      if (!Number.isNaN(Number(word[j]))) {
        firstDigit = word[j];
        abort = true;
      } else {
        firstDigitAcc += word[j];
        for (let key of Object.keys(spelledNumbers)) {
          if (firstDigitAcc.includes(key)) {
            firstDigit = spelledNumbers[key];
            abort = true;
          }
        }
      }
    }

    abort = false;

    // Second Digit
    let secondDigit = undefined;
    let secondDigitAcc = '';
    for (let j = word.length - 1; j >= 0 && !abort; j--) {
      if (!Number.isNaN(Number(word[j]))) {
        secondDigit = word[j];
        abort = true;
      } else {
        secondDigitAcc += word[j];
        for (let key of Object.keys(spelledNumbers)) {
          if (secondDigitAcc.includes(key.split('').reverse().join(''))) {
            secondDigit = spelledNumbers[key];
            abort = true;
          }
        }
      }
    }
    numbers.push(Number(`${firstDigit}${secondDigit}`));
  }

  const total = numbers.reduce((a, b) => a + b, 0);
  console.log(total);
}

part2();
