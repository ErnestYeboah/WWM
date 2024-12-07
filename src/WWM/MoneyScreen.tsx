import { useTriviaContext } from "../context/TriviaContext";

export default function MoneyScreen() {
  const { moneyFigures, currentMoney } = useTriviaContext();

  return (
    <div className="money__screen">
      {moneyFigures.map((item, index) => (
        <h2 className={index === currentMoney ? "earned" : ""} key={index}>
          {" "}
          <span>{item.id}. </span> ${item.money}
        </h2>
      ))}
    </div>
  );
}
