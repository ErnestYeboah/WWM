import { createContext, useContext, useState } from "react";
import { wordGuess } from "../dataExports/wordGuessData";

const WordGuessContext = createContext<Exports | null>(null);

type ChildrenProps = {
  children: React.ReactNode;
};

type Exports = {
  currentIndex: number;
  renderRandomWord(): void;
};

// eslint-disable-next-line react-refresh/only-export-components
export function useGuessWordContext() {
  const object = useContext(WordGuessContext);
  if (!object) throw new Error("Please provide a provider");
  return object;
}

export default function WordGuessGlobalState({ children }: ChildrenProps) {
  return (
    <WordGuessContext.Provider value={{ currentIndex, renderRandomWord }}>
      {children}
    </WordGuessContext.Provider>
  );
}
