import { Link } from 'react-router-dom'
import { coupons } from '../data/coupons'
import { testimonials } from '../data/testimonials'

import BurgerCard from '../components/BurgerCard'
import Card from '../components/Card'
import CouponCard from '../components/CouponCard'
import TestimonialCard from '../components/TestimonialCard'
import StepCard from '../components/StepCard'

import fastDeliveryImg from '../assets/images/fast-delivery.jpg'
import freshIngredientsImg from '../assets/images/fresh-ingredients.jpg'
import CustomOrdersImg from '../assets/images/custom-orders.jpg'

import './Home.css'
import OrderStatusBanner from '../components/OrderStatusBanner'

function Home({ specials, cart, onAdd, onDecrease, orders}) {
  const latestOrder  = orders[0];

  return (
    <>
      <div className="hero">
        <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=1600" alt="Burger" className="hero-image" />
        <div className="hero-overlay">
          <h1>Handcrafted Burgers, <span className='color-change'>Delivered Hot!</span></h1>
          <Link to="/menu" className="hero-cta">Order Now</Link>
        </div>
      </div>

      <div className='page-content'>
        {latestOrder && <OrderStatusBanner order={latestOrder} />}
      </div>
    
    {/* Service Card Sections */}
    <section className="services-section">
        <div className="services-grid">
          <Card title="Fast Delivery" description="Hot burgers at your door in 30 minutes" image={fastDeliveryImg} />
          <Card title="Fresh Ingredients" description="Locally sourced, never frozen" image={freshIngredientsImg} />
          <Card title="Custom Orders" description="Build your burger exactly how you want it" image={CustomOrdersImg} />
        </div>
      </section>

      {/* Specials Menu Section */}
      <div className="page-content">
        <section className="specials-section">
          <h2>This Week's Specials</h2>
          <ul className="menu-grid">
            {specials.map((burger) => (
              <BurgerCard key={burger.id} burger={burger} cart={cart} onAdd={onAdd} onDecrease={onDecrease} />
            ))}
          </ul>
        </section>
        {/* Coupons Section */}
        <section className="coupons-section">
          <h2>Current Offers</h2>
          <div className="coupon-grid">
            {coupons.map((coupon) => (
              <CouponCard key={coupon.code} coupon={coupon} onApply={() => {}} isApplied={false} />
            ))}
          </div>
          <p className="coupon-hint">Apply these at checkout</p>
        </section>
      </div>

      {/* Testimonial Section */}
      <div className="page-content">
        <section className="testimonials-section">
          <h2>What Our Customers Say</h2>
          <div className="testimonials-grid">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} testimonial={t} />
            ))}
          </div>
        </section>
      </div>

      {/* Step Card */}
      <div className="page-content">
        <section className="how-it-works-section">
          <h2>How It Works</h2>
          <div className="steps-grid">
            <StepCard number="1" icon="🍔" title="Choose Your Burger" description="Browse the menu and pick your favorites" />
            <StepCard number="2" icon="🔥" title="We Cook It Fresh" description="Made to order, never sitting around" />
            <StepCard number="3" icon="🚚" title="Delivered to Your Door" description="Hot and fresh, right when you want it" />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;