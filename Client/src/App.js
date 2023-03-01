import "./App.css";
import WeatherTable from "./components/weatherTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            marginLeft: "20px",
          }}
        >
          Rekrut
        </h1>
      </header>
      <WeatherTable />
    </div>
  );
}

export default App;
