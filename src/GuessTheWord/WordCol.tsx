import React, { useEffect, useMemo, useState } from "react";
import { wordGuess, characters } from "../dataExports/wordGuessData";
const MAX_ATTEMPTS = 3;

export default function WordCol() {
  const randomNumber = Math.floor(Math.random() * wordGuess.length);
  const [currentIndex, setCurrentIndex] = useState(randomNumber);
  const [isGameOver, setIsGameOver] = useState(false);

  const currentGuess = wordGuess[currentIndex];
  const currentGuessWord = currentGuess.word;
  const currentWordDescription = currentGuess.description;

  const currentWordCharacters = useMemo(
    () => [...currentGuessWord],
    [currentGuessWord]
  );
  const [chosenLetters, setChosenLetters] = useState<string[]>([]);
  const [hasFoundWord, setHasFoundWord] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(MAX_ATTEMPTS);
  const charactersBtns = document.querySelectorAll(".characters > * ");

  function removeClassLists() {
    charactersBtns.forEach((btn) =>
      btn.classList.remove("correct", "incorrect")
    );
  }

  function getSelectedLetter(
    letter: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) {
    const cpyChosenLetter = [...chosenLetters];
    const selectedBtn = e.currentTarget;

    if (currentGuessWord.includes(letter)) {
      cpyChosenLetter.push(letter);
      selectedBtn.classList.add("correct");
    } else {
      setWrongAttempts((t) => t - 1);
      selectedBtn.classList.add("incorrect");
    }

    setChosenLetters(cpyChosenLetter);
  }

  useEffect(() => {
    if (wrongAttempts === 0) setIsGameOver(true);
  }, [wrongAttempts]);

  useEffect(() => {
    const wordFound = currentWordCharacters.every((char) =>
      chosenLetters.includes(char)
    );
    if (wordFound) {
      setHasFoundWord(true);
    }
  }, [chosenLetters, currentWordCharacters]);

  function nextGuess() {
    setCurrentIndex(randomNumber);
    setWrongAttempts(MAX_ATTEMPTS);
    setChosenLetters([]);
    removeClassLists();
    setHasFoundWord(false);
  }

  function removeCharacter() {
    const cpyChosenLetter = [...chosenLetters];
    cpyChosenLetter.splice(0, 1);
    setChosenLetters(cpyChosenLetter);
    removeClassLists();
  }

  function tryAgain() {
    setIsGameOver(false);
    setCurrentIndex(randomNumber);
    setWrongAttempts(MAX_ATTEMPTS);
    removeClassLists();
  }

  return (
    <div className="word">
      <p className="attempts"> Attempts Remaining : {wrongAttempts}</p>
      <div className="guess__container">
        {currentWordCharacters.map((character, index) => (
          <h1 key={index} className="char">
            {chosenLetters.includes(character) ? character : ""}
          </h1>
        ))}
      </div>
      <p>{currentWordDescription}</p>
      <p className={hasFoundWord ? "result__text active " : "result__text"}>
        You guessed right : The word was{" "}
        <span style={{ color: "limegreen" }}>{currentGuessWord}</span>
      </p>

      <button style={{ color: "white" }} onClick={removeCharacter}>
        Remove Letter
      </button>
      <div className="characters">
        {characters.map((letter, index) => (
          <button onClick={(e) => getSelectedLetter(letter, e)} key={index}>
            {letter}
          </button>
        ))}
      </div>

      <button
        className={hasFoundWord ? "next active" : "next"}
        onClick={nextGuess}
      >
        Next
      </button>

      <div
        className={
          isGameOver ? "game__over-screen active" : "game__over-screen"
        }
      >
        <h1>Game Over </h1>
        <button onClick={tryAgain}>Try Again</button>
      </div>
    </div>
  );
}
