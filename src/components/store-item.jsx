import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useShoppingCart } from "../context/shopping-cart-context";
import { formatCurrency } from "../utils/currency-format";

export default function StoreItem(props) {
    const { id, name, price, imgUrl } = props;
    const { getItemQuantity, incraseCartQuantity, decraseCartQuantity, removeFromCart } =
        useShoppingCart();

    const quantity = getItemQuantity(id);

    const controlls = (
        <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
            <div
                className="d-flex align-items-center justift-content-center"
                style={{ gap: ".5rem" }}
            >
                <Button
                    onClick={() => incraseCartQuantity(id)}
                    className="px-3 font-weight-bold"
                    variant="primary"
                >
                    +
                </Button>
                <div>
                    <span className="fs-3">{quantity}</span> in cart
                </div>
                <Button
                    onClick={() => decraseCartQuantity(id)}
                    className="px-3 font-weight-bold"
                    variant="primary"
                >
                    -
                </Button>
            </div>
            <Button onClick={() => removeFromCart(id)} variant="danger">
                Remove
            </Button>
        </div>
    );

    return (
        <Card className="h-100">
            <Card.Img variant="top" src={imgUrl} height="200px" style={{ objectFit: "cover" }} />
            <Card.Body className="d-flex flex-column">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                    <span className="fs-2">{name}</span>
                    <span className="ms-2 text-muted">{formatCurrency(price)}</span>
                </Card.Title>
                <div className="mt-auto">
                    {quantity === 0 ? (
                        <Button onClick={() => incraseCartQuantity(id)} className="w-100">
                            + Add To Cart
                        </Button>
                    ) : (
                        controlls
                    )}
                </div>
            </Card.Body>
        </Card>
    );
}
