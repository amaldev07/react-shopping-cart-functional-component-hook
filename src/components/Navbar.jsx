import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
    const { totalItems } = useCart();

    return (
        <div
            style={{
                padding: 16,
                borderBottom: "1px solid #eee",
                display: "flex",
                justifyContent: "space-between",
            }}
        >
            <Link to="/" style={{ textDecoration: "none" }}>
                <b>🛒 ShopKart</b>
            </Link>

            <div style={{ display: "flex", gap: 12 }}>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/cart">Cart ({totalItems})</NavLink>
            </div>
        </div>
    );
}
