import { useParams, Link } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const p = products.find((x) => x.id === id);

  if (!p) return <h2>Product not found</h2>;

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <img
        src={p.image}
        alt={p.title}
        style={{ width: "100%", borderRadius: 10 }}
      />

      <div>
        <h2>{p.title}</h2>
        <h3>₹ {p.price}</h3>
        <p>{p.description}</p>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => addToCart(p)}>Add to Cart</button>
          <Link to="/cart">Go to Cart</Link>
        </div>
      </div>
    </div>
  );
}
