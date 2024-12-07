import { Time_Limit, useTriviaContext } from "../context/TriviaContext";

export default function AfterQuizModal() {
  const {
    triviaQuestions,
    scores,
    showScores,
    isGameOver,
    moneyFigures,
    currentMoney,
    setCurrentMoney,
    setShowScores,
    setIsGameOver,
    setTimeLimit,
    setCurrentIndex,
    setCanReset,
    setScores,
    setIsRunning,
  } = useTriviaContext();

  const restartQuiz = () => {
    setShowScores(false);
    setIsGameOver(false);
    setCurrentMoney(moneyFigures.length - 1);
    setTimeLimit(Time_Limit);
    setCurrentIndex(0);
    setCanReset(true);
    setScores(0);
    setIsRunning(true);
  };

  return (
    <>
      <div
        className={
          isGameOver || showScores ? "quiz__modal active " : "quiz__modal"
        }
      >
        {isGameOver && (
          <div>
            <h1>Game Over!</h1>
          </div>
        )}
        {showScores && (
          <div className="scores__table">
            <p>
              {scores === triviaQuestions.length
                ? "Congratulations"
                : "You can do better next time"}
            </p>
            <p>
              You scored {scores} out of {triviaQuestions.length}
            </p>
            <p>
              You earned $
              {
                moneyFigures.find(
                  (item) => item.id === moneyFigures.length - currentMoney - 1
                )?.money
              }
            </p>
          </div>
        )}

        <button onClick={restartQuiz}>Restart</button>
      </div>
    </>
  );
}
