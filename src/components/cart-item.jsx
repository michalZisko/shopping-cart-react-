import React from "react";
import { Stack, Button } from "react-bootstrap";
import { useShoppingCart } from "../context/shopping-cart-context";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utils/currency-format";

export default function CartItem({ id, quantity }) {
    const { removeFromCart, incraseCartQuantity, decraseCartQuantity } = useShoppingCart();
    const item = storeItems.find((i) => i.id === id);
    if (item == null) return null;

    return (
        <Stack direction="horizontal" gap={2} className="d-flex align-items-center">
            <img
                alt="image"
                src={item.imgUrl}
                style={{ width: "100px", height: "50px", objectFit: "cover" }}
            />
            <div className="me-auto">
                <div>
                    {item.name}
                    {quantity > 1 && (
                        <span className="text-muted" style={{ fontSize: ".5rem" }}>
                            x{quantity}
                        </span>
                    )}
                </div>
                <div className="text-muted" style={{ fontSize: ".5rem" }}>
                    {formatCurrency(item.price)}
                </div>
            </div>
            <div> {formatCurrency(item.price * quantity)}</div>

            <div className="actions">
                <Stack direction="vertical" gap={1}>
                    <Button onClick={() => incraseCartQuantity(item.id)} variant="primary">
                        +
                    </Button>
                    <Button onClick={() => decraseCartQuantity(item.id)} variant="outline-danger">
                        -
                    </Button>
                </Stack>
                <Button variant="danger" size="sm" onClick={() => removeFromCart(item.id)}>
                    &times;
                </Button>
            </div>
        </Stack>
    );
}
