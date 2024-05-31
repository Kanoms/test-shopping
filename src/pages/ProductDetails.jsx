import { useContext, useEffect, useState } from "react";
import { useCart } from "../context/UseCart";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const selectedProduct = products.find((item) => item.id === parseInt(id));
    setProduct(selectedProduct);
  }, [id, products]);

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="product-details h-[75vh] flex items-center gap-5 justify-center">
      <img
        src={product.image}
        alt={product.title}
        className="product-details-image"
      />
      <div className="product-details-info">
        <h1 className="product-details-title">{product.title}</h1>
        <h2 className="bg-red-600 text-white p-2">{product.category}</h2>
        <p className="product-details-description">{product.description}</p>
        <p className="product-details-price">${product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-red-600 text-white p-2 rounded"
        >
          ADD TO CART
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
