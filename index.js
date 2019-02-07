const parseRoll = function(rollQuery) {
  let roll = false;
  const backslashD = /(\d+)d(\d+)/g;
  const diceMatch = backslashD.exec(rollQuery);

  if (diceMatch) {
    roll = [Number(diceMatch[1]), Number(diceMatch[2])];
    if (roll[0] < 1 || roll[1] < 2) {
      return false;
    }
  }

  return roll;
};

const rollDice = function(roll) {
  // console.log({roll});
  let sides = roll[1];
  let throws = roll[0];
  let results = [];
  while (throws > 0) {
    results.push(Math.floor(Math.random() * (sides - 1)) + 1);
    throws--;
  }
  return results;
};

const processRequest = function(input) {
  let roll = parseRoll(input);
  if (!roll) {
    roll = [1, 6];
  }

  let nice = '';
  let results = rollDice(roll);
  let totalResults = results.length;

  if (totalResults == 1) {
    nice = results[0];
  } else {

    nice = results.reduce((acc, result, index) => {
      if ((index+1) < totalResults) {
        acc += `${result} `;
      } else {
        acc += `and ${result}`;
      }
      return acc
    }, '')
  }

  return `rolling ${roll[0]}, ${roll[1]}-sided ${roll[0]?'die':'dice'}: ${nice}.`;
}

module.exports = {
  parseRoll,
  rollDice,
  processRequest
}
