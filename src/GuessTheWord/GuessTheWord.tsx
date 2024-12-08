import "./styles.css";
import WordCol from "./WordCol";

export default function GuessTheWord() {
  return (
    <div className="wordguess__wrapper">
      <h1>Guess The Word Quiz</h1>
      <WordCol />
    </div>
  );
}
