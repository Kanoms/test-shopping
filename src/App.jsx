import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductProvider from "./context/ProductContext";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import CartProvider from "./context/CartContext";

const App = () => {
  return (
    <div>
      <ProductProvider>
        <CartProvider>
          <Router>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
            <Footer />
          </Router>
        </CartProvider>
      </ProductProvider>
    </div>
  );
};

export default App;
