import "./App.css";
import Menu from "./Menu";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div
          className="dummy-nav"
          style={{ backgroundColor: "green", userSelect: "none" }}
        >
          {"McPizza <)"}
        </div>
        <div
          className="dummy-nav"
          style={{ backgroundColor: "black", userSelect: "none" }}
        >
          Menu Cart My Orders About Us Staff Login
        </div>
        {/*<Menu />*/}
      </header>
    </div>
  );
}

export default App;
