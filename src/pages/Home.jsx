import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import './Home.css'

const SLIDES = [
  {
    headline: ["MIL", "JAYEGA"],
    sub: "The fit will hit. Trust the drop.",
    tag: "SS'25 COLLECTION",
    cta: "Shop Now",
    ctaLink: "/shop",
    accent: "#c8ff00",
  },
  {
    headline: ["NEW", "CARGO"],
    sub: "Load up. Cargo season is officially here.",
    tag: "LOWERS DROP",
    cta: "Shop Lowers",
    ctaLink: "/shop?cat=lowers",
    accent: "#ff4d1c",
  },
]

export default function Home({ onAddToCart }) {
  const [slide, setSlide] = useState(0)
  const [animating, setAnimating] = useState(false)

  // Featured products (first 4)
  const featured = products.slice(0, 4)
  const newDrops = products.filter(p => p.isNew).slice(0, 3)

  useEffect(() => {
    const t = setInterval(() => {
      setAnimating(true)
      setTimeout(() => {
        setSlide(s => (s + 1) % SLIDES.length)
        setAnimating(false)
      }, 400)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const current = SLIDES[slide]

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-noise"></div>
        <div className={`hero-content ${animating ? 'fade-out' : 'fade-in'}`}>
          <span className="hero-tag" style={{ color: current.accent }}>
            ★ {current.tag}
          </span>
          <h1 className="hero-headline">
            <span>{current.headline[0]}</span>
            <span className="hero-outline" style={{ WebkitTextStrokeColor: current.accent }}>
              {current.headline[1]}
            </span>
          </h1>
          <p className="hero-sub">{current.sub}</p>
          <div className="hero-ctas">
            <Link to={current.ctaLink} className="btn-primary" style={{ background: current.accent, color: '#0a0a0a' }}>
              {current.cta}
            </Link>
            <Link to="/about" className="btn-ghost">Our Story →</Link>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button
              key={i}
              className={`hero-dot ${i === slide ? 'active' : ''}`}
              onClick={() => setSlide(i)}
              style={i === slide ? { background: current.accent } : {}}
            />
          ))}
        </div>

        {/* Scrolling side text */}
        <div className="hero-side-text">
          <span>GEN Z CLOTHING ✦ DESI DRIP ✦ MADE IN INDIA ✦ GEN Z CLOTHING ✦ DESI DRIP ✦</span>
        </div>
      </section>

      {/* Category tiles */}
      <section className="categories container">
        <div className="section-header">
          <span className="tag">// SHOP BY</span>
          <h2>Pick your vibe</h2>
        </div>
        <div className="cat-grid">
          <Link to="/shop?cat=tshirts" className="cat-tile cat-tshirt">
            <div className="cat-tile-inner">
              <span className="cat-label">T-SHIRTS</span>
              <span className="cat-count">{products.filter(p => p.category === 'tshirts').length} STYLES</span>
              <div className="cat-arrow">→</div>
            </div>
            <div className="cat-bg-text">TEE</div>
          </Link>
          <Link to="/shop?cat=lowers" className="cat-tile cat-lower">
            <div className="cat-tile-inner">
              <span className="cat-label">LOWERS</span>
              <span className="cat-count">{products.filter(p => p.category === 'lowers').length} STYLES</span>
              <div className="cat-arrow">→</div>
            </div>
            <div className="cat-bg-text">FIT</div>
          </Link>
        </div>
      </section>

      {/* New drops */}
      {newDrops.length > 0 && (
        <section className="section container">
          <div className="section-header">
            <span className="tag">// JUST DROPPED</span>
            <h2>Fresh off the press</h2>
            <Link to="/shop" className="section-link">View all →</Link>
          </div>
          <div className="products-grid products-grid-3">
            {newDrops.map(p => (
              <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
      )}

      {/* Brand strip */}
      <section className="brand-strip">
        <div className="brand-strip-inner">
          {['OVERSIZED FITS', 'DESI DRIP', 'LIMITED DROPS', 'FREE SHIPPING ₹999+', 'GEN Z ONLY', 'MIL JAYEGA'].map((t, i) => (
            <span key={i}>{t} <span className="strip-dot">★</span></span>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="section container">
        <div className="section-header">
          <span className="tag">// BESTSELLERS</span>
          <h2>Everyone's copping</h2>
          <Link to="/shop" className="section-link">View all →</Link>
        </div>
        <div className="products-grid">
          {featured.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* About teaser */}
      <section className="about-teaser container">
        <div className="about-teaser-inner">
          <div className="about-teaser-text">
            <span className="tag">// WHO ARE WE</span>
            <h2>Born from chaos,<br />dressed for the streets.</h2>
            <p>Mil Jayega isn't just a brand. It's a feeling. The feeling when the fit hits and you know you're locked in. We make clothes for the ones who don't care about trends — they set them.</p>
            <Link to="/about" className="btn-ghost">Read our story →</Link>
          </div>
          <div className="about-teaser-stat-grid">
            {[
              { num: '10K+', label: 'Happy Customers' },
              { num: '50+', label: 'Unique Designs' },
              { num: '100%', label: 'Indian Made' },
              { num: '0%', label: 'F*cks Given' },
            ].map((s, i) => (
              <div key={i} className="stat-box">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
