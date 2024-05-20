import { useContext, useEffect, useMemo, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import Product from "../components/Product";

const Home = () => {
  const { products } = useContext(ProductContext);

  const uniqueCategories = useMemo(
    () => [
      ...new Set(
        products.map((product) =>
          typeof product.category === "object"
            ? product.category.name
            : product.category
        )
      ),
    ],
    [products]
  );

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Set the selected category to null to show all products by default
    setSelectedCategory(null);
  }, []);

  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Filter by search term
    if (searchTerm) {
      const searchRegex = new RegExp(searchTerm, "i");
      filtered = filtered.filter((product) => searchRegex.test(product.title));
    }

    return filtered;
  }, [products, selectedCategory, searchTerm]);

  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory((prevCategory) =>
      prevCategory === categoryName ? null : categoryName
    );
    setCurrentPage(1); // Reset page when changing the category
  };

  const handleAllProductsClick = () => {
    setSelectedCategory(null);
    setCurrentPage(1); // Reset page when changing to all products
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset page when changing the search term
  };

  return (
    <main className="homepage">
      home
      <div>
        <div className="category_buttons">
          <div className="cat_btns">
            <button
              key="allProducts"
              onClick={handleAllProductsClick}
              className={`px-3 py-2 text-sm border rounded capitalize ${
                selectedCategory === null
                  ? "bg-red-500 text-white"
                  : "bg-transparent"
              } border-gray-300`}
            >
              All Products
            </button>
            {uniqueCategories.map((categoryName) => (
              <button
                key={categoryName}
                onClick={() => handleCategoryClick(categoryName)}
                className={`mr-2 px-4 py-2 text-sm border rounded capitalize transition ${
                  categoryName === selectedCategory
                    ? "bg-red-500 text-white"
                    : "bg-transparent border-gray-300"
                }`}
              >
                {categoryName}
              </button>
            ))}
          </div>

          <div className="search-container">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
        <div className="product_list">
          {currentProducts.length === 0 ? (
            <p className="not-available-text">Product not available</p>
          ) : (
            currentProducts.map((product) => (
              <Product key={product.id} product={product} />
            ))
          )}
        </div>
        {/* Pagination */}
        <div className="pagination">
          <button onClick={handlePrevClick} disabled={currentPage === 1}>
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNextClick}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;
