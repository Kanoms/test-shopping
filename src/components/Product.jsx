import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../context/UseCart";

const Product = ({ product }) => {
  const { addToCart } = useCart();
  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative w-[316px] h-[300px]">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
          <div className="overlay">
            <span className="text-white text-lg">View Details</span>
          </div>
        </div>
      </Link>
      <div className="product-info">
        <h2 className="product-title">{product.title}</h2>
        <div className="flex items-center justify-between">
          <p className="product-price">${product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="text-2xl bg-red-700 p-2 rounded-full flex items-center"
          >
            <CiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
};

export default Product;
