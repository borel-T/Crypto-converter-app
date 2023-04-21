import "./sass/app.scss";
import Navbar from "./components/navbar";
import ConverterForm from "./components/converterForm";

function App() {
  return (
    <div className="App">
      <Navbar />
      <ConverterForm />
    </div>
  );
}

export default App;
