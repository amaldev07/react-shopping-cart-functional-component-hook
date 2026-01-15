import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductCard({ p }) {
  const { addToCart } = useCart();

  return (
    <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
      <img
        src={p.image}
        alt={p.title}
        style={{ width: "100%", height: 160, objectFit: "cover" }}
      />

      <h3>{p.title}</h3>
      <p>₹ {p.price}</p>

      <div style={{ display: "flex", gap: 10 }}>
        <Link to={`/product/${p.id}`}>View</Link>
        <button onClick={() => addToCart(p)}>Add to Cart</button>
      </div>
    </div>
  );
}
