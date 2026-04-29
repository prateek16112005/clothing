import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">MJ.</div>
          <p className="footer-tagline">Desi roots. Gen Z fits.<br />Mil jayega — the right fit will find you.</p>
        </div>

        <div className="footer-links-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Drops</Link></li>
            <li><Link to="/shop?cat=tshirts">T-Shirts</Link></li>
            <li><Link to="/shop?cat=lowers">Lowers</Link></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Brand</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Lookbook</a></li>
          </ul>
        </div>

        <div className="footer-links-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Drop alerts</h4>
          <p>Be first for new drops. No spam, just fits.</p>
          <div className="newsletter-form">
            <input type="email" placeholder="your@email.com" />
            <button>→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2025 Mil Jayega. All rights reserved.</span>
        <span className="footer-mono">MADE WITH ♥ IN INDIA</span>
        <div className="footer-social">
          <a href="#">IG</a>
          <a href="#">TW</a>
          <a href="#">YT</a>
        </div>
      </div>
    </footer>
  )
}
