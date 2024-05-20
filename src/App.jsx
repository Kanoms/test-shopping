import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import { ProductContext } from "./context/ProductContext";
const App = () => {
  return (
    <div>
      <ProductContext.Provider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
          <Footer />
        </Router>
      </ProductContext.Provider>
    </div>
  );
};

export default App;
