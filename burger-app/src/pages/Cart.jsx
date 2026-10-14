import { Link } from "react-router-dom";
import './Cart.css'

function Cart({ items, onRemove, onDecrease, onAdd }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="page-content page-content--offset">
        <div className="empty-cart">
          <p>Your cart is empty.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content page-content--offset">
      <h2>Your Cart</h2>
      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <div className="cart-item-top">
            <span className="name">{item.name}</span>
            <span className="cart-item-subtotal">${(item.price * item.quantity).toFixed(2)}</span>
          </div>
          <div className="cart-item-bottom">
            <span className="unit-price">${item.price} each</span>
            <div className="cart-item-controls">
              <button onClick={() => onDecrease(item.id)}>−</button>
              <span className="quantity">{item.quantity}</span>
              <button onClick={() => onAdd(item)}>+</button>
              <button className="remove-btn" onClick={() => onRemove(item.id)}>Remove</button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="total-line">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <Link to="/checkout" className="checkout-btn">Proceed to Checkout</Link>
      </div>
    </div>
  );
}

export default Cart;