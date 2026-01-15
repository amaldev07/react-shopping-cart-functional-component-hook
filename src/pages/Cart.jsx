import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, totalPrice, incQty, decQty, removeFromCart, clearCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div>
        <h2>Your cart is empty</h2>
        <Link to="/">Go shopping →</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Your Cart</h2>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((i) => (
          <div
            key={i.id}
            style={{
              display: "flex",
              gap: 12,
              alignItems: "center",
              border: "1px solid #eee",
              padding: 12,
              borderRadius: 8,
            }}
          >
            <img
              src={i.image}
              alt={i.title}
              style={{ width: 90, height: 70, objectFit: "cover" }}
            />

            <div style={{ flex: 1 }}>
              <h3 style={{ margin: 0 }}>{i.title}</h3>
              <p style={{ margin: "6px 0" }}>₹ {i.price}</p>

              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <button onClick={() => decQty(i.id)}>-</button>
                <b>{i.qty}</b>
                <button onClick={() => incQty(i.id)}>+</button>

                <button
                  onClick={() => removeFromCart(i.id)}
                  style={{ marginLeft: 10 }}
                >
                  Remove
                </button>
              </div>
            </div>

            <div>
              <b>₹ {i.qty * i.price}</b>
            </div>
          </div>
        ))}
      </div>

      <hr style={{ margin: "16px 0" }} />

      <h3>Total: ₹ {totalPrice}</h3>

      <div style={{ display: "flex", gap: 12 }}>
        <button onClick={clearCart}>Clear cart</button>
        <button
          onClick={() => alert("Checkout is not implemented in this demo 😄")}
        >
          Checkout
        </button>
      </div>
    </div>
  );
}
