import AfterQuizModal from "./AfterQuizModal";
import MoneyScreen from "./MoneyScreen";
import Trivia from "./Trivia";
import "./wwm.css";
export default function MainHall() {
  return (
    <div className="main__hall">
      <Trivia />
      <MoneyScreen />
      <AfterQuizModal />
    </div>
  );
}
