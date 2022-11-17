import React from "react";
import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/shopping-cart-context";
import { formatCurrency } from "../utils/currency-format";
import CartItem from "./cart-item";
import storeItems from "../data/items.json";

export default function ShoppingCart(props) {
    const { closeCart, cartItems } = useShoppingCart();

    return (
        <Offcanvas onHide={closeCart} show={props.open} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Stack gap={3}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} {...item} />
                    ))}
                    <div className="ms-auto fw-bold fs-5">
                        Total
                        {formatCurrency(
                            cartItems.reduce((total, cartItem) => {
                                const item = storeItems.find((i) => i.id === cartItem.id);
                                return total + (item?.price || 0) * cartItem.quantity;
                            }, 0)
                        )}
                    </div>
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
