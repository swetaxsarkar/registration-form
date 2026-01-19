import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Load More paging
  const [visibleCount, setVisibleCount] = useState(8);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setLoading(false);
      });
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading products...</h4>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Products</h2>

      {/* ✅ Products Grid */}
      <div className="row g-4">
        {products.slice(0, visibleCount).map((product) => (
          <div className="col-md-3" key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* ✅ Load More Button */}
      <div className="text-center mt-4 mb-4">
        {visibleCount < products.length ? (
          <button className="btn btn-primary" onClick={handleLoadMore}>
            Load More
          </button>
        ) : (
          <p className="fw-bold text-success">✅ All products loaded</p>
        )}
      </div>
    </div>
  );
}

export default ProductsPage;
