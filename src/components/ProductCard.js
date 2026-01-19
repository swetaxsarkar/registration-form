import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div className="card h-100 shadow-sm">
      <img
        src={product.image}
        className="card-img-top p-3"
        alt={product.title}
        style={{ height: "220px", objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="card-title">{product.title}</h6>
        <p className="fw-bold mb-2">₹ {product.price}</p>

        <Link
          to={`/products/${product.id}`}
          className="btn btn-primary mt-auto"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
