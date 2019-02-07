const {parseRoll, rollDice, processRequest} = require('./index.js');

describe('parseRoll',() => {
  it('should process 1d6 to [1,6]', () => {
    expect(parseRoll('1d6')).toEqual([1, 6]);
  });

  it('should process empty string to false', () => {
    expect(parseRoll('')).toEqual(false);
  });

  it('should process zzz to false', () => {
    expect(parseRoll('zzz')).toEqual(false);
  });

  it('should process 6,4 string to false', () => {
    expect(parseRoll('6,4')).toEqual(false);
  });
  it('should process 6d4 string to false', () => {
    expect(parseRoll('6d4')).toEqual([6,4]);
  });
  it('should process 0d4 string to false', () => {
    expect(parseRoll('0d4')).toEqual(false);
  });
  it('should process 4d0 string to false', () => {
    expect(parseRoll('4d0')).toEqual(false);
  });

  it('should process empty string to false', () => {
    let count = 0;
    while(count < 3) {
      let dice = Math.floor(Math.random() * 10) + 1; // throw at least one die
      let sides = Math.floor(Math.random() * 10) + 2; // with at least 2 sides
      expect(parseRoll(`${dice}d${sides}`)).toEqual([dice, sides]);
      count++;
    }
  });
})

describe('processRequest',() => {
  it('should processRequest', () => {
    processRequest()
    console.log('processRequest', processRequest('1d6'))
    console.log('processRequest', processRequest('1d10'))
    console.log('processRequest', processRequest('1d100'))
    console.log('processRequest', processRequest('1d1000'))
    console.log('processRequest', processRequest('2d6'))
    // console.log('processRequest', processRequest('12d10'))
    // console.log('processRequest', processRequest('32d100'))
    // console.log('processRequest', processRequest('42d1000'))
  })
});

describe('rollDice',() => {
  it('should know some things about 1d6 rolls', () => {
    let count = 0;
    while(count < 10) {
      rollDice([1, 6]).forEach((result) => {
        expect(result).not.toBeLessThan(1);
        expect(result).not.toBeGreaterThan(6);
      });
      count ++;
    };
  });

  it('should know some things about 1d6 rolls', () => {
    let count = 0;
    while(count < 10) {
      rollDice([1, 6]).forEach((result) => {
        expect(result).not.toBeLessThan(1);
        expect(result).not.toBeGreaterThan(6);
      });
      count ++;
    };
  });

  it('should know some things about other rolls', () => {
    let count = 0;
    let stats = [];
    while(count < 10000) {
      rollDice([1, 6]).forEach((result) => {
        if (!stats[result]) {
          stats[result] = 1;
        } else {
          stats[result]++;
        }
      });
      count ++;
    };
    stats.forEach((stat) => {
      expect(stat).toBeGreaterThan(1000);
      expect(stat).toBeLessThan(3000);
    })
  });
})
