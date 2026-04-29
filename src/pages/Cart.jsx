import React from 'react'
import { Link } from 'react-router-dom'
import './Cart.css'

export default function Cart({ cart, onRemove, onUpdateQty }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0)
  const shipping = total >= 999 ? 0 : 99

  if (cart.length === 0) {
    return (
      <main className="cart cart-empty">
        <div className="container">
          <span className="tag">// YOUR BAG</span>
          <h1>Nothing here yet.</h1>
          <p>Your bag is empty. Go cop something.</p>
          <Link to="/shop" className="btn-primary" style={{ background: 'var(--acid)', color: 'var(--black)', display: 'inline-block', marginTop: '24px', padding: '14px 32px', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.1em' }}>
            SHOP NOW
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cart">
      <div className="cart-container container">
        <div className="cart-header">
          <span className="tag">// YOUR BAG</span>
          <h1 className="cart-title">Your Bag ({cart.length})</h1>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />
                <div className="cart-item-info">
                  <div className="cart-item-top">
                    <div>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <span className="cart-item-size tag">SIZE: {item.size} • {item.colorName}</span>
                    </div>
                    <button className="cart-remove" onClick={() => onRemove(item.id, item.size)}>✕</button>
                  </div>
                  <div className="cart-item-bottom">
                    <div className="cart-qty">
                      <button onClick={() => onUpdateQty(item.id, item.size, item.qty - 1)}>-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => onUpdateQty(item.id, item.size, item.qty + 1)}>+</button>
                    </div>
                    <span className="cart-item-price">₹{item.price * item.qty}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2 className="summary-title">Order Summary</h2>

            <div className="summary-rows">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span style={{color:'var(--acid)'}}>FREE</span> : `₹${shipping}`}</span>
              </div>
              {shipping > 0 && (
                <p className="shipping-hint">Add ₹{999 - total} more for free shipping</p>
              )}
              <div className="summary-row summary-total">
                <span>Total</span>
                <span>₹{total + shipping}</span>
              </div>
            </div>

            <button className="checkout-btn">
              PROCEED TO CHECKOUT →
            </button>

            <Link to="/shop" className="continue-link">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
