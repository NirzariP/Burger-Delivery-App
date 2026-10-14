import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import './Navbar.css'


function Navbar({searchTerm, onSearchChanges, cartCount}) {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isHome = location.pathname === "/";
    
    // Transparent Navbar on hero
    useEffect(() => {
        function handleScroll(){
            setScrolled(window.scrollY > 50);
        }
        window.addEventListener("scroll", handleScroll);
        return() => window.removeEventListener("scroll", handleScroll);
    }, []);

    const transparent = isHome && !scrolled;

    return (
        <nav className={`navbar ${transparent ? "" : "navbar-scrolled"}`}>
            <Link to="/" className="logo">Burger Barn</Link>
            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/menu">Menu</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/orders">Your Orders</Link>
            </div>
            <input 
                type="text" 
                placeholder="Search Burgers..." 
                value={searchTerm}
                onChange={(e) => onSearchChanges(e.target.value)}
                className="search-input">
            </input>
            <Link to="/cart" className="cart-icon">
                🛒 <span className="cart-badge">{cartCount}</span>
            </Link>
            <Link to="/login" className="login-btn">Login</Link>
        </nav>
    );
}


export default Navbar;