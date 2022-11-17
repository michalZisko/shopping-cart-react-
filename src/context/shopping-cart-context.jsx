import React, { createContext, useContext, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import ShoppingCart from "../components/shopping-cart";
import items from "../data/items.json";

const shoppingCartContext = createContext({});

export function useShoppingCart() {
    return useContext(shoppingCartContext);
}

export default function ShoppingCartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    const cartQuantity = cartItems.reduce((quantity, item) => item.quantity + quantity, 0);

    function getItemQuantity(id) {
        return cartItems.find((item) => item.id === id)?.quantity || 0;
    }

    function incraseCartQuantity(id) {
        setCartItems((currentItems) => {
            if (currentItems.find((currItem) => currItem.id === id) == null) {
                return [...currentItems, { id, quantity: 1 }];
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity + 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
        const product = items.find((item) => item.id == id);
        const { name } = product;
        toast.success(`1 ${name} added successfuly`);
    }

    function decraseCartQuantity(id) {
        setCartItems((currentItems) => {
            if (currentItems.find((currItem) => currItem.id === id)?.quantity === 1) {
                return currentItems.filter((item) => item.id !== id);
            } else {
                return currentItems.map((item) => {
                    if (item.id === id) {
                        return { ...item, quantity: item.quantity - 1 };
                    } else {
                        return item;
                    }
                });
            }
        });
        const product = items.find((item) => item.id == id);
        const { name } = product;
        toast.success(`1 ${name} removed successfuly`);
    }

    function removeFromCart(id) {
        setCartItems((currentItems) => {
            return currentItems.filter((item) => item.id !== id);
        });
        const product = items.find((item) => item.id == id);
        const { name } = product;
        toast.success(`All ${name.toLowerCase()}s removed from cart successfuly`);
    }

    function openCart() {
        setIsOpen(true);
    }

    function closeCart() {
        setIsOpen(false);
    }

    return (
        <shoppingCartContext.Provider
            value={{
                getItemQuantity,
                incraseCartQuantity,
                decraseCartQuantity,
                removeFromCart,
                openCart,
                closeCart,
                cartQuantity,
                cartItems,
            }}
        >
            <Toaster position="top-left" reverseOrder={false} />
            {children}
            <ShoppingCart open={isOpen} />
        </shoppingCartContext.Provider>
    );
}
