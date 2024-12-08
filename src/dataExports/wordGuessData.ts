class GuessData {
  constructor(
    public id: number,
    public word: string,
    public description: string
  ) {}
}

const firstWord = new GuessData(
  1,
  "PENDRIVE",
  "A storage device used for transferring and storing data."
);
const secondWord = new GuessData(
  2,
  "JAVASCRIPT",
  "The most hated language in the world but essential for every developer"
);
const thirdWord = new GuessData(
  3,
  "REACT",
  "A javascript language which make life easier"
);

export const wordGuess: GuessData[] = [firstWord, secondWord, thirdWord];

export const characters = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
