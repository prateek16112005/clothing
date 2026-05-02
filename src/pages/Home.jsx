import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products } from '../data/products'
import { IMAGES } from '../data/images'
import './Home.css'

const SLIDES = [
  {
    tag: "SS'26 Collection",
    headline: ["THE FIT", "IS HERE."],
    sub: "Premium streetwear, desi roots. Mil jayega — always.",
    cta: "Shop Now",
    ctaLink: "/shop",
    
    
    img: IMAGES.hero.slide1,
  },
  
]

export default function Home({ onAddToCart }) {
  const [slide, setSlide] = useState(0)
  const [fading, setFading] = useState(false)

  const featured = products.slice(0, 4)
  const newDrops  = products.filter(p => p.isNew).slice(0, 3)

  useEffect(() => {
    const t = setInterval(() => {
      setFading(true)
      setTimeout(() => { setSlide(s => (s + 1) % SLIDES.length); setFading(false) }, 350)
    }, 6000)
    return () => clearInterval(t)
  }, [])

  const s = SLIDES[slide]

  return (
    <main className="home">

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-img-wrap">
          <img src={s.img} alt="Hero" className="hero-img" loading="eager" />
          <div className="hero-img-overlay" />
        </div>

        <div className={`hero-content container ${fading ? 'fade-out' : 'fade-in'}`}>
          <span className="hero-tag tag">{s.tag}</span>
          <h1 className="hero-hl">
            {s.headline.map((line, i) => <span key={i}>{line}</span>)}
          </h1>
          <p className="hero-sub">{s.sub}</p>
          <div className="hero-ctas">
            <Link to={s.ctaLink} className="btn-primary">{s.cta} →</Link>
            <Link to={s.cta2Link} className="btn-outline">{s.cta2}</Link>
          </div>
        </div>

        {/* Slide dots */}
        <div className="hero-dots">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hero-dot ${i === slide ? 'active' : ''}`} onClick={() => setSlide(i)} />
          ))}
        </div>

        {/* Scroll hint */}
        <div className="hero-scroll">
          <span className="tag">Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* ── TICKER STRIP ── */}
      <div className="strip">
        <div className="strip-inner">
          {['Premium Cotton', 'Desi Drip', 'Limited Drops', 'Free Shipping ₹999+', 'Gen Z Only', 'Mil Jayega', 'COD Available', 'Made In India'].map((t, i) => (
            <span key={i}>{t} <span className="strip-star">★</span></span>
          ))}
          {['Premium Cotton', 'Desi Drip', 'Limited Drops', 'Free Shipping ₹999+', 'Gen Z Only', 'Mil Jayega', 'COD Available', 'Made In India'].map((t, i) => (
            <span key={`b${i}`}>{t} <span className="strip-star">★</span></span>
          ))}
        </div>
      </div>

      {/* ── CATEGORIES ── */}
      <section className="section container">
        <div className="section-hd">
          <span className="tag">// Shop By </span>
          <h2 style={{ marginTop: '20px' }}>Pick Your Vibe</h2>
        </div>
        <div className="cat-grid">
          <Link to="/shop?cat=tshirts" className="cat-tile">
            <img src={IMAGES.categories.tshirts} alt="T-Shirts" loading="lazy" />
            <div className="cat-overlay">
              <span className="cat-name">T-Shirts</span>
              <span className="cat-count">{products.filter(p => p.category === 'tshirts').length} styles</span>
              <span className="cat-arrow">→</span>
            </div>
          </Link>
          
          <Link to="/shop?cat=sweatshirts" className="cat-tile">
            <img src={IMAGES.categories.tshirts} alt="Sweatshirts" loading="lazy" />
            <div className="cat-overlay">
              <span className="cat-name">Sweatshirts</span>
              <span className="cat-count">{products.filter(p => p.category === "sweatshirts").length} styles</span>
              <span className="cat-arrow">→</span>
            </div>
          </Link>
          <Link to="/customize" className="cat-tile cat-tile-accent">
            <div className="cat-custom-inner">
              <div className="cat-custom-icon">✦</div>
              <span className="cat-name">Design Your Tee</span>
              <span className="cat-count">Customize from scratch</span>
              <span className="cat-arrow cat-arrow-dark">→</span>
            </div>
          </Link>
        </div>
      </section>

      {/* ── NEW DROPS ── */}
      {newDrops.length > 0 && (
        <section className="section container">
          <div className="section-hd">
            <span className="tag">// Just Dropped</span>
            <h2>Fresh Off The Press</h2>
            <Link to="/shop" className="section-link">View all →</Link>
          </div>
          <div className="pg-3">
            {newDrops.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
          </div>
        </section>
      )}

      {/* ── BESTSELLERS ── */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-hd">
            <span className="tag">// Bestsellers</span>
            <h2>Everyone's Copping</h2>
            <Link to="/shop" className="section-link">View all →</Link>
          </div>
          <div className="pg-4">
            {featured.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
          </div>
        </div>
      </section>

      {/* ── CUSTOMIZE BANNER ── */}
      <section className="section container">
        <div className="custom-banner">
          <div className="custom-banner-text">
            <span className="tag">// New Feature</span>
            <h2>Design Your Own Tee</h2>
            <p>Pick your color, add your text, choose your graphic. Your tee, your rules — we'll print and ship it.</p>
            <Link to="/customize" className="btn-primary">Start Designing →</Link>
          </div>
          <div className="custom-banner-preview">
            <div className="tee-mockup">
              <div className="tee-shape">
                <div className="tee-text-preview">YOUR<br/>DESIGN<br/>HERE</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT TEASER ── */}
      <section className="section container">
        <div className="about-strip">
          <div className="about-strip-text">
            <span className="tag">// Who Are We</span>
            <h2>Born From Chaos,<br/>Dressed For Streets.</h2>
            <p>Mil Jayega isn't just a brand. It's a feeling — when the fit hits and you know you're locked in. We make clothes for the ones who don't follow trends. They set them.</p>
            <Link to="/about" className="btn-outline">Our Story →</Link>
          </div>
          <div className="about-strip-stats">
            {[
              { num: '10K+', label: 'Happy Customers' },
              { num: '50+',  label: 'Unique Designs' },
              { num: '100%', label: 'Indian Made' },
              { num: '0%',   label: 'F*cks Given' },
            ].map(s => (
              <div key={s.num} className="stat-card">
                <div className="stat-n">{s.num}</div>
                <div className="stat-l">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
