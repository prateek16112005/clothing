import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

export default function ProductDetail({ onAddToCart }) {
  const { id } = useParams()
  const product = products.find(p => p.id === Number(id))
  const [selectedSize, setSelectedSize] = useState(null)
  const [showBack, setShowBack] = useState(false)
  const [added, setAdded] = useState(false)

  if (!product) {
    return (
      <main className="pd-404 container">
        <h1>Product not found</h1>
        <Link to="/shop" className="btn-outline" style={{ marginTop: '24px', display: 'inline-flex' }}>← Back to shop</Link>
      </main>
    )
  }

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const handleAdd = () => {
    if (!selectedSize) return
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <main className="product-detail">
      <div className="pd-container container">
        <div className="pd-breadcrumb">
          <Link to="/shop">Shop</Link>
          <span>›</span>
          <Link to={`/shop?cat=${product.category}`}>{product.category === 'tshirts' ? 'T-Shirts' : 'Lowers'}</Link>
          <span>›</span>
          <span>{product.name}</span>
        </div>

        <div className="pd-main">
          {/* Images */}
          <div className="pd-images">
            <div className="pd-main-image" onClick={() => setShowBack(b => !b)}>
              <img
                src={showBack ? product.imageBack : product.image}
                alt={product.name}
                loading="eager"
              />
              <button className="pd-toggle-btn">
                {showBack ? '← Front' : 'Back →'}
              </button>
              {product.tag && <span className="pd-tag">{product.tag}</span>}
            </div>
          </div>

          {/* Info */}
          <div className="pd-info">
            <div className="pd-info-top">
              <span className="tag">{product.category === 'tshirts' ? 'T-Shirt' : 'Lower'} · {product.colorName}</span>
              {product.isNew && <span className="pd-new-badge">NEW DROP</span>}
            </div>

            <h1 className="pd-name">{product.name}</h1>

            <div className="pd-pricing">
              <span className="pd-price">₹{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="pd-original">₹{product.originalPrice}</span>
                  <span className="pd-save">Save {discount}%</span>
                </>
              )}
            </div>

            <p className="pd-desc">{product.description}</p>

            <div className="pd-size-section">
              <div className="pd-size-header">
                <span className="tag">Select Size</span>
                <a href="#" className="size-guide-link tag">Size Guide →</a>
              </div>
              <div className="pd-sizes">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`pd-size-btn ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >{s}</button>
                ))}
              </div>
              {!selectedSize && <p className="size-hint">← Select a size to continue</p>}
            </div>

            <button
              className={`pd-add-btn ${!selectedSize ? 'disabled' : ''} ${added ? 'added' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added to Cart' : selectedSize ? `Add to Cart — ₹${product.price}` : 'Select a Size First'}
            </button>

            <div className="pd-badges">
              {['Free shipping ₹999+', 'COD available', '7-day easy return', '100% original'].map(b => (
                <span key={b} className="pd-badge">✓ {b}</span>
              ))}
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="pd-related">
            <div className="pd-section-hd">
              <span className="tag">// You May Also Like</span>
              <h2>More Fits</h2>
            </div>
            <div className="pd-related-grid">
              {related.map(p => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
