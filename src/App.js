import "./sass/app.scss";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import CryptoAnalytics from "./pages/cryptoAnalytics";
import { Routes, Route } from "react-router-dom";
import Footer from "./components/footer";

function App() {
  return (
    <div className="App">
      {/* header */}
      <header>
        <Navbar />
      </header>
      {/* content */}
      <main className="container px-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="data" element={<CryptoAnalytics />} />
        </Routes>
      </main>
      {/* footer */}
      <Footer />
    </div>
  );
}

export default App;
