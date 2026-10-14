import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from '../utils/orderStatus'

import { ChefHat, Truck, PackageCheck } from 'lucide-react'
import './OrderStatusBanner.css'



function OrderStatusBanner({order}) {
    const [status, setStatus] = useState(getOrderStatus(order.placedAt));

    useEffect(() => {
        setStatus(getOrderStatus(order.placedAt));
        const interval = setInterval(() => {
            setStatus(getOrderStatus(order.placedAt));
        }, 5000);
        return () => clearInterval(interval);
    }, [order.placedAt]);

    if (status === "Delivered") return null;
    const statusSteps = [
        { label: "Cooking", icon: ChefHat },
        { label: "Out for Delivery", icon: Truck },
        { label: "Delivered", icon: PackageCheck },
    ];
    const currentStep = statusSteps.findIndex((step) => step.label === status);

    return (
        <div className="page-content">
            <div className="order-banner">
                <div className="order-banner-top">
                    <div className="order-banner-spinner"></div>
                    <div className="order-banner-text">
                    <strong>Order #{order.id}</strong>
                    <span className="status-label">{status}...</span>
                    </div>
                    <Link to="/orders" className="view-orders-link">View Orders →</Link>
                </div>

                <div className="order-banner-progress">
                    {statusSteps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                        <div key={step.label} className={`progress-step ${index <= currentStep ? "active" : ""}`}>
                            <div className="progress-icon">
                            <Icon size={40} />
                            </div>
                            <span>{step.label}</span>
                        </div>
                        );
                    })}
                </div>

                <div className="order-banner-details">
                    <span><strong>Name:</strong> {order.name}</span>
                    <span><strong>Address:</strong> {order.address}</span>
                </div>
            </div>
        </div>
    );
}


export default OrderStatusBanner;