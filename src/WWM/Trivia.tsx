/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef, useState } from "react";
import { useTriviaContext } from "../context/TriviaContext";
import correct from "/audios/correct.mp3";
import wrong from "/audios/wrong.mp3";
import suspense from "/audios/suspense.mp3";
import { useSound } from "use-sound";

import Timer from "./Timer";
const DELAY = 2000;
const ADDITIONAL_TIME = 5;

export default function Trivia() {
  const {
    currentIndex,
    setCurrentIndex,
    setCurrentMoney,
    moneyFigures,
    currentMoney,
    triviaQuestions,
    setShowScores,
    setIsGameOver,
    setScores,
    setTimeLimit,
    canReset,
    isGameOver,
    showScores,
    setIsRunning,
  } = useTriviaContext();

  const currentQuestion = triviaQuestions[currentIndex];
  const [isChecking, setIsChecking] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [showNextBtn, setShowNextBtn] = useState(false);
  const [playCorrect] = useSound(correct);
  const [playWrong] = useSound(wrong);
  const [playSuspense] = useSound(suspense);
  //Answers Buttons
  const btn1 = useRef<HTMLButtonElement | null>(null);
  const btn2 = useRef<HTMLButtonElement | null>(null);
  const btn3 = useRef<HTMLButtonElement | null>(null);
  const btn4 = useRef<HTMLButtonElement | null>(null);
  const btnsEl = [btn1, btn2, btn3, btn4];

  function handleSelectAnswer(
    e: React.MouseEvent<HTMLButtonElement>,
    selectedAnswer: string
  ) {
    const selectedBtn = e.currentTarget;
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isChecking) {
      selectedBtn.classList.add("checking");
    }
    setTimeout(() => {
      if (isCorrect) {
        selectedBtn.classList.add("correct");
        setCurrentMoney((m) => m - 1);
        setScores((s) => s + 1);
        playCorrect();
        setTimeLimit((t) => t + ADDITIONAL_TIME);
      } else {
        selectedBtn.classList.add("incorrect");
        setCurrentMoney((m) => m + 1);
        playWrong();
        showCorrectAnswer();
      }
    }, DELAY);

    setIsLocked(true);
  }

  function showCorrectAnswer() {
    btnsEl.map((item) => {
      const btn = item.current as HTMLButtonElement;

      if (btn.dataset.answer === currentQuestion.correctAnswer) {
        btn.classList.add("correct");
      }
    });
  }

  useEffect(() => {
    setTimeout(() => {
      playSuspense();
    }, DELAY);
  }, [isGameOver, showScores]);

  function removeButtonClassLists() {
    btnsEl.map((item) =>
      item.current!.classList.remove("correct", "incorrect", "checking")
    );
  }

  //for gameOver
  useEffect(() => {
    if (currentMoney === moneyFigures.length) {
      setTimeout(() => {
        setIsGameOver(true);
      }, DELAY / 2 - 600);
    }
  }, [currentMoney]);

  useEffect(() => {
    if (canReset) {
      removeButtonClassLists();
      setShowNextBtn(false);
      setIsLocked(false);
    }
  }, [canReset]);

  //For answer buttons disbaled
  useEffect(() => {
    if (isLocked) {
      btnsEl.map((item) => (item.current!.disabled = true));
    } else {
      btnsEl.map((item) => (item.current!.disabled = false));
    }
  }, [isLocked]);

  //For checking of the answer
  useEffect(() => {
    setIsChecking(true);
  }, [handleSelectAnswer]);

  //for showing the next btn
  useEffect(() => {
    if (isLocked) {
      setTimeout(() => {
        setShowNextBtn(true);
      }, DELAY);
    } else {
      setShowNextBtn(false);
    }
  }, [isLocked]);

  //for resetting the game when gameOver
  useEffect(() => {
    if (currentMoney > moneyFigures.length - 1) {
      setTimeout(() => {
        removeButtonClassLists();
      }, DELAY);
      setIsLocked(false);
    }
  }, [currentMoney]);

  function nextQuestion() {
    setCurrentIndex((c) => c + 1);
    setIsLocked(false);
    removeButtonClassLists();

    if (currentIndex >= triviaQuestions.length - 1) {
      endOfQuiz();
    }
  }

  function endOfQuiz() {
    setCurrentIndex(0);
    setIsLocked(false);
    removeButtonClassLists();
    setIsRunning(false);

    setShowScores(true);
  }

  return (
    <>
      <Timer />
      <div className="trivia__sec">
        <h2 className="question">{currentQuestion.question}</h2>

        <div className="answers__sec">
          <button
            ref={btn1}
            data-answer={currentQuestion.answers[0]}
            onClick={(e) => handleSelectAnswer(e, currentQuestion.answers[0])}
          >
            {currentQuestion.answers[0]}
          </button>
          <button
            ref={btn2}
            data-answer={currentQuestion.answers[1]}
            onClick={(e) => handleSelectAnswer(e, currentQuestion.answers[1])}
          >
            {currentQuestion.answers[1]}
          </button>
          <button
            ref={btn3}
            data-answer={currentQuestion.answers[2]}
            onClick={(e) => handleSelectAnswer(e, currentQuestion.answers[2])}
          >
            {currentQuestion.answers[2]}
          </button>
          <button
            ref={btn4}
            data-answer={currentQuestion.answers[3]}
            onClick={(e) => handleSelectAnswer(e, currentQuestion.answers[3])}
          >
            {currentQuestion.answers[3]}
          </button>
        </div>
        <button
          className={showNextBtn ? "next__btn active" : "next__btn"}
          onClick={nextQuestion}
        >
          Next
        </button>
      </div>
    </>
  );
}
