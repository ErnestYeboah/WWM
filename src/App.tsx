import TriviaGlobalState from "./context/TriviaContext";
import MainHall from "./WWM/MainHall";

function App() {
  return (
    <>
      <TriviaGlobalState>
        <MainHall />
      </TriviaGlobalState>
    </>
  );
}

export default App;
