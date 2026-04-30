import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './Navbar.css'

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <>
      <div className="ticker">
        <div className="ticker-inner">
          {Array(8).fill(null).map((_, i) => (
            <span key={i}>
              &nbsp;FREE SHIPPING ABOVE ₹999 &nbsp;·&nbsp; NEW DROP IS LIVE &nbsp;·&nbsp; COD AVAILABLE &nbsp;·&nbsp; DESIGN YOUR OWN TEE &nbsp;·&nbsp; MIL JAYEGA &nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/" className="nav-logo">MJ<span>.</span></Link>

          <ul className="nav-links">
            <li><Link to="/"        className={location.pathname === '/'         ? 'active' : ''}>Home</Link></li>
            <li><Link to="/shop"    className={location.pathname === '/shop'      ? 'active' : ''}>Shop</Link></li>
            <li><Link to="/shop?cat=tshirts">T-Shirts</Link></li>
            <li><Link to="/shop?cat=lowers">Lowers</Link></li>
            <li><Link to="/customize" className={location.pathname === '/customize' ? 'active' : ''}>Customize</Link></li>
            <li><Link to="/about"   className={location.pathname === '/about'     ? 'active' : ''}>About</Link></li>
          </ul>

          <div className="nav-right">
            <Link to="/cart" className="nav-icon-btn">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                <line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 01-8 0"/>
              </svg>
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              <span className={menuOpen ? 'open' : ''}></span>
              <span className={menuOpen ? 'open' : ''}></span>
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/shop">Shop</Link></li>
          <li><Link to="/shop?cat=tshirts">T-Shirts</Link></li>
          <li><Link to="/shop?cat=lowers">Lowers</Link></li>
          <li><Link to="/customize">Customize</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        <div className="mobile-footer-tag">MIL JAYEGA © 2025</div>
      </div>
    </>
  )
}
