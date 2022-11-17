import React from "react";
import { Navbar as NavBS, Nav, Container, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useShoppingCart } from "../context/shopping-cart-context";

export default function Navbar() {
    const { openCart, cartQuantity } = useShoppingCart();

    return (
        <NavBS sticky="top" className="bg-white shadow-sm mb-3 ">
            <Container>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/">
                        Home
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/store">
                        Store
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/about">
                        About
                    </Nav.Link>
                </Nav>
                {/* {cartQuantity > 0 && ( */}
                <Button
                    onClick={openCart}
                    variant="outline-primary"
                    className="rounded-circle shopping-cart-button"
                >
                    <AiOutlineShoppingCart className="shopping-cart-icon" />
                    {cartQuantity > 0 && (
                        <div className="counter rounded-circle bg-danger d-flex justify-content-center alignt-items-center">
                            {cartQuantity}
                        </div>
                    )}
                </Button>
                {/* )} */}
            </Container>
        </NavBS>
    );
}
