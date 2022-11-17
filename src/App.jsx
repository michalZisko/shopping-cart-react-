import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Home from "./pages/home";
import Store from "./pages/store";
import About from "./pages/about";
import Navbar from "./components/navbar";
import React from "react";
import "./App.css";
import ShoppingCartProvider from "./context/shopping-cart-context";

function App() {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/store" element={<Store />}></Route>
                    <Route path="/about" element={<About />}></Route>
                </Routes>
            </Container>
        </ShoppingCartProvider>
    );
}

export default App;
