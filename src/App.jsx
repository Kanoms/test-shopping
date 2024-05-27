import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductProvider from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";

const App = () => {
  return (
    <div>
      <ProductProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products/:id" element={<ProductDetails />} />
          </Routes>
          <Footer />
        </Router>
      </ProductProvider>
    </div>
  );
};

export default App;
