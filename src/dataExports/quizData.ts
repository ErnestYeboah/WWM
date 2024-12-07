export class Quiz {
  constructor(
    public question: string,
    public answers: string[],
    public correctAnswer: string
  ) {}
}

const q1 = new Quiz(
  "Rolex is a company that specializes in what type of product",
  ["Food", "Watches", "Cosmetic", "Shoes"],
  "Watches"
);
const q2 = new Quiz(
  "Who pulled the sword from the rock when no one could",
  ["Samson", "Goliath", "Alexander The Great", "Hercules"],
  "Alexander The Great"
);
const q3 = new Quiz(
  "Who got Gold Coast our Independence",
  ["David", "Mahama", "Kwame Nkrumah", "Akuffo Addo"],
  "Kwame Nkrumah"
);

export const quizData: Quiz[] = [q1, q2, q3];

export class Money {
  constructor(public id: number, public money: number) {}
}

const m1 = new Money(1, 100);
const m2 = new Money(2, 200);
const m3 = new Money(3, 300);
const m4 = new Money(4, 400);
const m5 = new Money(5, 600);
const m6 = new Money(6, 800);
const m7 = new Money(7, 1000);
const m8 = new Money(8, 1200);
const m9 = new Money(9, 1400);
const m10 = new Money(10, 1800);
const m11 = new Money(11, 2000);
const m12 = new Money(12, 4000);
const m13 = new Money(13, 8000);
const m14 = new Money(14, 75000);
const m15 = new Money(15, 100000);

export const moneyFiguresData: Money[] = [
  m15,
  m14,
  m13,
  m12,
  m11,
  m10,
  m9,
  m8,
  m7,
  m6,
  m5,
  m4,
  m3,
  m2,
  m1,
];
