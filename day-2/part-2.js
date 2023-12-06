async function fileLines() {
  const fileContents = Bun.file('input.txt');
  const text = await fileContents.text();
  return text.trim().split('\n');
}

const input = await fileLines();

function part2() {
  const powerNumbers = [];

  // Games Loop
  for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const gameSets = game
      .split(':')[1]
      .trim()
      .split(';')
      .map((v) => v.trim());
    const minCubeValuesMap = new Map();

    // Game Sets Loop
    for (let j = 0; j < gameSets.length; j++) {
      const gameSet = gameSets[j];
      const gameSetCubeColors = gameSet.match(/[a-z]+/g);
      const gameSetCubeValues = gameSet.match(/\d+/g);

      // Cubes Loop
      for (let k = 0; k < gameSetCubeColors.length; k++) {
        const cubeColor = gameSetCubeColors[k];
        const cubeValue = Number(gameSetCubeValues[k]);
        if (cubeValue > 1) {
          if (!minCubeValuesMap.has(cubeColor) || minCubeValuesMap.get(cubeColor) < cubeValue) {
            minCubeValuesMap.set(cubeColor, cubeValue);
          }
        }
      }
    }

    const power = Array.from(minCubeValuesMap.values()).reduce((a, b) => a * b, 1);
    powerNumbers.push(power);
  }

  const total = powerNumbers.reduce((a, b) => a + b, 0);
  console.log(total);
}

part2();
