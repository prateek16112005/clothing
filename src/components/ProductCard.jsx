import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

const BADGE_COLORS = {
  'BESTSELLER':  { bg: '#c8ff00', text: '#0d0d0d' },
  'NEW ARRIVAL': { bg: '#0066ff', text: '#fff' },
  'LIMITED':     { bg: '#ff4d1c', text: '#fff' },
  'DESI DROP':   { bg: '#ff9500', text: '#0d0d0d' },
}

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered]         = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded]             = useState(false)

  const isOut = product.stockOut

  const handleAdd = (e) => {
    e.preventDefault()
    if (!selectedSize || isOut) return
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  const badgeStyle = product.badge && BADGE_COLORS[product.badge]
    ? { background: BADGE_COLORS[product.badge].bg, color: BADGE_COLORS[product.badge].text }
    : {}

  return (
    <div className={`product-card ${isOut ? 'stock-out' : ''}`} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <Link to={`/product/${product.id}`} className="card-image-wrap">
        <img
          src={hovered && product.imageBack ? product.imageBack : product.image}
          alt={product.name}
          className="card-image"
          loading="lazy"
        />
        <div className="card-badges">
          {product.badge && (
            <span className="card-tag" style={badgeStyle}>{product.badge}</span>
          )}
          {discount && !isOut && <span className="card-discount">−{discount}%</span>}
          {isOut && <span className="card-tag stock-out-badge">SOLD OUT</span>}
        </div>
        {!isOut && (
          <div className="card-hover-overlay"><span>Quick View</span></div>
        )}
      </Link>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-cat">{product.category === 'tshirts' ? 'T-Shirt' : product.category === 'sweatshirts' ? 'Sweatshirt' : product.category}</span>
          <span className="card-color" style={{ background: product.color }} title={product.colorName}></span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>

        <div className="card-price-row">
          <span className={`price-now ${isOut ? 'price-muted' : ''}`}>₹{product.price}</span>
          {product.originalPrice && <span className="price-was">₹{product.originalPrice}</span>}
        </div>

        {!isOut ? (
          <>
            <div className="card-sizes">
              {product.sizes.slice(0, 5).map(s => (
                <button
                  key={s}
                  className={`size-chip ${selectedSize === s ? 'active' : ''}`}
                  onClick={() => setSelectedSize(s)}
                >{s}</button>
              ))}
            </div>
            <button
              className={`card-cta ${!selectedSize ? 'muted' : ''} ${added ? 'done' : ''}`}
              onClick={handleAdd}
            >
              {added ? '✓ Added' : selectedSize ? 'Add to Cart' : 'Select Size'}
            </button>
          </>
        ) : (
          <button className="card-cta muted" disabled>Sold Out</button>
        )}
      </div>
    </div>
  )
}
