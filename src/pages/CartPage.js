import { useDispatch, useSelector } from "react-redux";
import {
  incrementQty,
  decrementQty,
  removeFromCart
} from "../store/cartSlice";

function CartPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  if (cartItems.length === 0) {
    return <h4 className="text-center mt-5">Cart is empty</h4>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id}
          className="d-flex justify-content-between align-items-center border p-3 mb-3"
        >
          <div>
            <h6>{item.title}</h6>
            <p>₹ {item.price}</p>
          </div>

          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-secondary"
              onClick={() => dispatch(decrementQty(item.id))}
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              className="btn btn-secondary"
              onClick={() => dispatch(incrementQty(item.id))}
            >
              +
            </button>
          </div>

          <button
            className="btn btn-danger"
            onClick={() => dispatch(removeFromCart(item.id))}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}

export default CartPage;
