import { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

function cartReducer(state, action) {
    switch (action.type) {
        case "ADD": {
            const item = action.payload;
            const exists = state.items.find((i) => i.id === item.id);

            const items = exists
                ? state.items.map((i) =>
                    i.id === item.id ? { ...i, qty: i.qty + 1 } : i
                )
                : [...state.items, { ...item, qty: 1 }];

            return { ...state, items };
        }

        case "REMOVE": {
            const id = action.payload;
            return { ...state, items: state.items.filter((i) => i.id !== id) };
        }

        case "INC": {
            const id = action.payload;
            return {
                ...state,
                items: state.items.map((i) =>
                    i.id === id ? { ...i, qty: i.qty + 1 } : i
                ),
            };
        }

        case "DEC": {
            const id = action.payload;
            const items = state.items
                .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
                .filter((i) => i.qty > 0);

            return { ...state, items };
        }

        case "CLEAR":
            return { items: [] };

        default:
            return state;
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(cartReducer, { items: [] });

    const totalItems = state.items.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = state.items.reduce((sum, i) => sum + i.qty * i.price, 0);

    const value = useMemo(
        () => ({
            items: state.items,
            totalItems,
            totalPrice,
            addToCart: (product) => dispatch({ type: "ADD", payload: product }),
            removeFromCart: (id) => dispatch({ type: "REMOVE", payload: id }),
            incQty: (id) => dispatch({ type: "INC", payload: id }),
            decQty: (id) => dispatch({ type: "DEC", payload: id }),
            clearCart: () => dispatch({ type: "CLEAR" }),
        }),
        [state.items, totalItems, totalPrice]
    );

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error("useCart must be used inside CartProvider");
    return ctx;
}
