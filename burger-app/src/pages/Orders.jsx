import { Link } from 'react-router-dom'
import { ChefHat, Truck, PackageCheck } from 'lucide-react'
import { getOrderStatus } from '../utils/orderStatus'
import './Orders.css'

const statusIcons = {
  "Cooking": ChefHat,
  "Out for Delivery": Truck,
  "Delivered": PackageCheck,
};

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <div className="page-content page-content--offset">
        <div className="empty-cart">
          <p>You haven't placed any orders yet.</p>
          <Link to="/menu">Browse the menu</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-content page-content--offset orders-page">
      <h2>Your Orders</h2>
      <p className="orders-count">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>

      {orders.map((order) => {
        const status = getOrderStatus(order.placedAt);
        const StatusIcon = statusIcons[status];
        const statusClass = status.toLowerCase().replace(/\s/g, "-");

        return (
          <div className="order-history-card" key={order.id}>
            <div className={`order-status-strip ${statusClass}`}></div>

            <div className="order-history-content">
              <div className="order-history-top">
                <div>
                  <strong className="order-id">Order #{order.id}</strong>
                  <span className="order-date">{formatDate(order.placedAt)}</span>
                </div>
                <span className={`status-badge ${statusClass}`}>
                  <StatusIcon size={14} />
                  {status}
                </span>
              </div>

              <div className="order-history-items">
                {order.items.map((item) => (
                  <span key={item.id} className="item-chip">
                    {item.name} × {item.quantity}
                  </span>
                ))}
              </div>

              <div className="order-history-bottom">
                <span className="order-address">{order.name} — {order.address}</span>
                <strong className="order-total">${order.total.toFixed(2)}</strong>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Orders;