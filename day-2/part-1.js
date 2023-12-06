async function fileLines() {
  const fileContents = Bun.file('input.txt');
  const text = await fileContents.text();
  return text.trim().split('\n');
}

const input = await fileLines();

function part1() {
  const maxCubeValues = {
    red: 12,
    green: 13,
    blue: 14,
  };
  const possibleGameIds = [];

  // Games Loop
  for (let i = 0; i < input.length; i++) {
    const game = input[i];
    const gameId = game.match(/\d+/g)[0];
    const gameSets = game
      .split(':')[1]
      .trim()
      .split(';')
      .map((v) => v.trim());
    let abort = false;

    // Game Sets Loop
    for (let j = 0; j < gameSets.length && !abort; j++) {
      const gameSet = gameSets[j];
      const gameSetCubeColors = gameSet.match(/[a-z]+/g);
      const gameSetCubeValues = gameSet.match(/\d+/g);

      // Cubes Loop
      for (let k = 0; k < gameSetCubeColors.length; k++) {
        const cubeColor = gameSetCubeColors[k];
        const cubeValue = Number(gameSetCubeValues[k]);
        if (cubeValue > maxCubeValues[cubeColor]) {
          abort = true;
        }
      }
    }

    if (!abort) {
      possibleGameIds.push(Number(gameId));
    }
  }

  const total = possibleGameIds.reduce((a, b) => a + b, 0);
  console.log(total);
}

part1();
