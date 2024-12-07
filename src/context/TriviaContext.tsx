/* eslint-disable react-refresh/only-export-components */
import React, {
  createContext,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  Money,
  moneyFiguresData,
  Quiz,
  quizData,
} from "../dataExports/quizData";

type ChildrenProps = {
  children: React.ReactNode;
};

type Exports = {
  moneyFigures: Money[];
  currentMoney: number;
  currentIndex: number;
  setCurrentMoney: React.Dispatch<SetStateAction<number>>;
  setCurrentIndex: React.Dispatch<SetStateAction<number>>;
  setShowScores: React.Dispatch<SetStateAction<boolean>>;
  setIsGameOver: React.Dispatch<SetStateAction<boolean>>;
  setCanReset: React.Dispatch<SetStateAction<boolean>>;
  setIsRunning: React.Dispatch<SetStateAction<boolean>>;
  setScores: React.Dispatch<SetStateAction<number>>;
  setTimeLimit: React.Dispatch<SetStateAction<number>>;
  scores: number;
  isGameOver: boolean;
  showScores: boolean;
  timeLimit: number;
  canReset: boolean;
  triviaQuestions: Quiz[];
  isRunning: boolean;
};

const TriviaContext = createContext<Exports | null>(null);

export const Time_Limit = 30;

export const useTriviaContext = () => {
  const object = useContext(TriviaContext);

  if (!object) throw new Error("Please provide a provider");
  return object;
};

export default function TriviaGlobalState({ children }: ChildrenProps) {
  const [moneyFigures] = useState(moneyFiguresData);
  const [currentMoney, setCurrentMoney] = useState(moneyFigures.length - 1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [triviaQuestions] = useState(quizData);
  const [showScores, setShowScores] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [scores, setScores] = useState(0);
  const [timeLimit, setTimeLimit] = useState(Time_Limit);
  const [canReset, setCanReset] = useState(false);
  const [isRunning, setIsRunning] = useState(true);

  return (
    <TriviaContext.Provider
      value={{
        moneyFigures,
        currentMoney,
        setCurrentMoney,
        currentIndex,
        setCurrentIndex,
        triviaQuestions,
        showScores,
        isGameOver,
        setIsGameOver,
        setShowScores,
        scores,
        setScores,
        setTimeLimit,
        timeLimit,
        canReset,
        setCanReset,
        isRunning,
        setIsRunning,
      }}
    >
      {children}
    </TriviaContext.Provider>
  );
}
