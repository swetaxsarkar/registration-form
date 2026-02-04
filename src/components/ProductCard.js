function ProductCard({ product, onAddToCart }) {
  const imageUrl =
    product.image || "https://via.placeholder.com/200?text=No+Image";

  return (
    <div className="card h-100">
      <img
        src={imageUrl}
        alt={product.title}
        className="card-img-top"
        style={{ height: "200px", objectFit: "contain" }}
      />

      <div className="card-body d-flex flex-column">
        <h6 className="flex-grow-1">{product.title}</h6>
        <p className="fw-bold">₹ {product.price}</p>

        <button className="btn btn-primary w-100" onClick={onAddToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
