import { use, useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { coupons} from '../data/coupons'
import CouponCard from "../components/CouponCard";
import './Checkout.css'


function Checkout({cart, addOrder}){
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [couponInput, setCouponInput] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState(null);
    const [couponError, setCouponError] = useState("");
    const navigate = useNavigate();

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


    function calculateDiscount(coupon, subtotal) {
        if (coupon.minTotal && subtotal < coupon.minTotal) return 0;

        let discount = coupon.type === "percent" ? subtotal * (coupon.value / 100) : coupon.value;
        if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
        
        return discount;
    }


    function applyCoupon(code) {
        const coupon = coupons.find((c) => c.code === code.toUpperCase());

        if (!coupon) {
        setCouponError("Invalid coupon code");
        setAppliedCoupon(null);
        return;
        }
        if (coupon.minTotal && subtotal < coupon.minTotal) {
        setCouponError(`Requires a minimum order of $${coupon.minTotal}`);
        setAppliedCoupon(null);
        return;
        }
        setAppliedCoupon(coupon);
        setCouponError("");
    }

    const discount = appliedCoupon ? calculateDiscount(appliedCoupon, subtotal) : 0;
    const total = subtotal - discount;

    function handleSubmit() {
        if (!name || !address) {
            alert("Please fill in your name and address");
            return;
        }
        const orderPayload = {
            name,
            address,
            items: cart.map((item) => ({
                id: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
            })),
            total,
        }

        fetch("http://localhost:8000/orders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(orderPayload),
        })
            .then((response) => {
            if (!response.ok) throw new Error("Failed to place order");
            return response.json();
            })
            .then((savedOrder) => {
            addOrder(savedOrder);
            navigate("/");
            })
            .catch((err) => {
            alert(`Error: ${err.message}`);
            });
    }

    const order = {
        name,
        address,
        items: cart.map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
        })),
        total,
    }

    // fetch("http://localhost:8000/orders", {
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(order),
    // })
    // .then((response) => {
    //     if(!response) throw new Error("Failed to place order");
    //     return response.json();
    // })
    // .then((data) => {
    //     alert(`Order placed! Thank you, ${name}.`)
    // })
    // .catch((err) => {
    //   alert(`Error: ${err.message}`);
    // });

    
    return (
        <div className="page-content page-content--offset">
            {/* Coupons Section */}
            <div className="coupon-section-checkout">
                <h3>Available Coupons</h3>
                <div className="coupon-grid">
                {coupons.map((coupon) => (
                    <CouponCard
                    key={coupon.code}
                    coupon={coupon}
                    onApply={applyCoupon}
                    isApplied={appliedCoupon?.code === coupon.code}
                    showDescription={false}
                    />
                ))}
                </div>
                {/* Input For Coupons */}
                <div className="coupon-input-row">
                <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                />
                <button onClick={() => applyCoupon(couponInput)}>Apply</button>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
            </div>

            <h2>Checkout</h2>
            <div className="order-items">
                {cart.map((item) => (
                    <div className="order-item-row" key={item.id}>
                    <span>{item.name} × {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                ))}
            </div>
            

            <div className="order-summary">
                <p>Subtotal: ${subtotal.toFixed(2)}</p>
                {appliedCoupon && <p>Discount ({appliedCoupon.code}): -${discount.toFixed(2)}</p>}
                <p className="total-line">Total: ${total.toFixed(2)}</p>
            </div>

      
            <div>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                </label>
                <label>
                    Address:
                    <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}/>
                </label>
            </div>
            <div className="place-order-row">
                <button onClick={handleSubmit} className="place-order-btn">Place Order</button>
            </div>
        </div>
    );
}

export default Checkout;