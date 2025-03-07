import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./styles.css";

const plants = [
  { id: 1, name: "Aloe Vera", price: 10, description: "Air purifying plant", category: "Air Purifying", image: "/aloe.jpg" },
  { id: 2, name: "Lavender", price: 15, description: "Aromatic plant", category: "Aromatic", image: "lavender.jpg" },
];

const LandingPage = () => (
  <div className="landing-page">
    <h1>Paradise Nursery</h1>
    <p>Your one-stop shop for beautiful houseplants.</p>
    <p>welcome to Paradise Nursery, Where green meets serenity!
      At Paradise Nursery, we are passionate about bringing nature closer to you. 
      Our mission is to provide a wide range of high-quality plants that not only 
      enhance the beauty of your surroundings but also contribute to a healthier
      and more sustainable lifestyle.
    </p>
   
    <Link to="/products" className="btn">Get Started</Link>
  </div>
);
const ProductListing = ({ cart, setCart }) => {
  const addToCart = (plant) => {
    setCart([...cart, { ...plant, quantity: 1 }]);
  };

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">Paradise Nursery</Link>
        <div className="header-right">
          <span>Houseplants for every space</span>
          <Link to="/cart" className="cart-icon">
            <FaShoppingCart size={24} />
            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
          </Link>
        </div>
      </header>
      <div className="grid">
        {plants.map((plant) => (
          <div key={plant.id} className="card">
            <img src={plant.image} alt={plant.name} className="card-img" />
            <h2>{plant.name}</h2>
            <p>${plant.price}</p>
            <p>{plant.description}</p>
            <button
              className="btn"
              onClick={() => addToCart(plant)}
              disabled={cart.some((item) => item.id === plant.id)}
            >
              {cart.some((item) => item.id === plant.id) ? "Added to Cart" : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const ShoppingCart = ({ cart, setCart }) => {
  const updateQuantity = (id, amount) => {
    const newCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + amount, 0) } : item
    ).filter(item => item.quantity > 0);
    setCart(newCart);
  };

  const totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container">
      <header className="header">
        <Link to="/" className="logo">Paradise Nursery</Link>
        <Link to="/products" className="back-link">Back to Products</Link>
      </header>
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : (
        <div>
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
                <div className="quantity-control">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
              </div>
              <p>Subtotal: ${item.price * item.quantity}</p>
            </div>
          ))}
          <h3>Total: ${totalCost}</h3>
          <button className="btn">Checkout</button>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [cart, setCart] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductListing cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<ShoppingCart cart={cart} setCart={setCart} />} />
      </Routes>
    </Router>
  );
};

export default App;
