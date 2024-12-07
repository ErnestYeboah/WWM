import { useEffect, useRef } from "react";
import { useTriviaContext } from "../context/TriviaContext";

export default function Timer() {
  const {
    setIsGameOver,
    setTimeLimit,
    timeLimit,
    setShowScores,
    currentIndex,
    setCanReset,
    isRunning,
  } = useTriviaContext();
  const timer = useRef<number>();

  useEffect(() => {
    if (isRunning) {
      timer.current = setInterval(() => {
        setTimeLimit((t) => t - 1);
      }, 1000);

      if (timeLimit === 0) {
        setCanReset(true);

        if (currentIndex === 0) {
          setIsGameOver(true);
        } else if (currentIndex > 0) {
          setShowScores(true);
        }
      }
    } else {
      clearInterval(timer.current);
    }

    return () => {
      clearInterval(timer.current);
    };
  }, [timeLimit, isRunning]);

  return (
    <div className="timer">
      <h1>{timeLimit}</h1>
    </div>
  );
}
