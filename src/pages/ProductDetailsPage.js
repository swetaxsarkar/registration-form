import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

function ProductDetailsPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching product details:", err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <h4>Loading product details...</h4>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mt-5 text-center">
        <h4>Product not found!</h4>
        <Link className="btn btn-secondary mt-3" to="/products">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <Link to="/products" className="btn btn-secondary mb-3">
        ⬅ Back to Products
      </Link>

      <div className="card shadow p-4">
        <div className="row">
          <div className="col-md-4 text-center">
            <img
              src={product.image}
              alt={product.title}
              style={{ height: "300px", objectFit: "contain" }}
              className="img-fluid"
            />
          </div>

          <div className="col-md-8">
            <h3>{product.title}</h3>
            <p className="text-muted">{product.category}</p>

            <h4 className="fw-bold">₹ {product.price}</h4>

            <p className="mt-3">{product.description}</p>

            <p className="mt-2">
              ⭐ {product.rating?.rate} ({product.rating?.count} reviews)
            </p>

            <button className="btn btn-success mt-3">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
