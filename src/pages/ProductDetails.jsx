import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

const ProductDetails = () => {
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
    <div className="product-details">
      <img
        src={product.image}
        alt={product.title}
        className="product-details-image"
      />
      <div className="product-details-info">
        <h1 className="product-details-title">{product.title}</h1>
        <p className="product-details-description">{product.description}</p>
        <p className="product-details-price">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductDetails;
