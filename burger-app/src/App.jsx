import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import './App.css'
import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart'
import Checkout from './pages/Checkout';
import Navbar from './components/Navbar';
import Footer from './components/Footer'
import Contact from './pages/Contact';
import Orders from './pages/Orders'
import Login from './pages/Login'
import Signup from './pages/Signup'


function App() {
  const [burgers, setBurgers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
  });
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem("orders");
    return saved ? JSON.parse(saved) : [];
  });
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });
  // const [category, setCategory] = useState("all");
  // const filteredBurgers = category === "all"
  //   ? burgers
  //   : burgers.filter((burger) => burger.category === category)
  
  const specials = burgers.filter((burger) => burger.special);
  useEffect(() => {
    fetch("http://localhost:8000/burgers")
    .then((response) => {
      if(!response.ok) throw new Error("Failed to fetch burgers");
      return response.json(); 
    })
    .then((data) => {
      setBurgers(data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err.message);
      setLoading(false);
    });
  }, []);

  // Only re-run when cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // Only re-run when order changes
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  function addToCart(burger){
    const existing = cart.find((item) => item.id === burger.id);
    if (existing) {
      setCart(
        cart.map((item) =>
          item.id === burger.id
          ? {...item, quantity: item.quantity + 1}
          : item
        )
      );
    } else {
      setCart([...cart, {...burger, quantity:1}]);
    }
  }


  function removeFromCart(burgerId) {
    setCart(cart.filter((item) => item.id !== burgerId));
  }


  function decreaseQuantity(burgerId) {
    setCart(
      cart.map((item) =>
        item.id === burgerId
        ? {...item, quantity: item.quantity - 1}
        : item
      ).filter((item) => item.quantity > 0)
    );
  }

  function addOrder(order) {
    setOrders([order, ...orders]);
  }

  function handleLogin(userData) {
    setUser(userData);
  }

  function handleLogout() {
    setUser(null);
  }
  
  if (loading) return <p>Loading menu...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="app">
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
      />
      <Routes>
        <Route path="/" element={<Home specials={specials} cart={cart} onAdd={addToCart} onDecrease={decreaseQuantity} orders={orders} />} />
        <Route path="/menu" element={<Menu burgers={burgers} cart={cart} onAdd={addToCart} onDecrease={decreaseQuantity} />} />
        <Route path="/cart" element={<Cart items={cart} onRemove={removeFromCart} onDecrease={decreaseQuantity} onAdd={addToCart} />} />
        <Route path="/checkout" element={<Checkout cart={cart} addOrder={addOrder} />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<p>Login page coming soon</p>} />
        <Route path="/orders" element={<Orders orders={orders} />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App