import "./sass/app.scss";
import Navbar from "./components/navbar";
import ConverterForm from "./components/converterForm";

function App() {
  return (
    <div className="App app-bg-image">
      <Navbar />
      <section className="container px-3">
        <div className="mx-auto text-align-center">
          <ConverterForm />
        </div>
      </section>
    </div>
  );
}

export default App;
