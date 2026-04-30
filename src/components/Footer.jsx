import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top container">
        <div className="footer-brand">
          <div className="footer-logo">MJ.</div>
          <p>Desi roots. Gen Z fits.<br/>The right fit will find you.</p>
          <div className="footer-social">
            <a href="#" aria-label="Instagram">IG</a>
            <a href="#" aria-label="Twitter">TW</a>
            <a href="#" aria-label="YouTube">YT</a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Shop</h4>
          <ul>
            <li><Link to="/shop">All Drops</Link></li>
            <li><Link to="/shop?cat=tshirts">T-Shirts</Link></li>
            <li><Link to="/shop?cat=lowers">Lowers</Link></li>
            <li><Link to="/customize">Customize Tee</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Brand</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><a href="#">Size Guide</a></li>
            <li><a href="#">Lookbook</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Help</h4>
          <ul>
            <li><a href="#">Shipping</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Drop Alerts</h4>
          <p>First to know about new drops. No spam.</p>
          <div className="nl-form">
            <input type="email" placeholder="your@email.com" />
            <button>→</button>
          </div>
        </div>
      </div>

      <div className="footer-bottom container">
        <span>© 2025 Mil Jayega. All rights reserved.</span>
        <span className="footer-made">MADE WITH ♥ IN INDIA</span>
      </div>
    </footer>
  )
}
