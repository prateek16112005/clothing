import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './ProductCard.css'

export default function ProductCard({ product, onAddToCart }) {
  const [hovered, setHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState(null)
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.preventDefault()
    if (!selectedSize) return
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null

  return (
    <div
      className="product-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="card-image-wrap">
        <img
          src={hovered && product.imageBack ? product.imageBack : product.image}
          alt={product.name}
          className="card-image"
        />
        {product.tag && (
          <span className="card-tag">{product.tag}</span>
        )}
        {discount && (
          <span className="card-discount">-{discount}%</span>
        )}
        {product.isNew && !product.tag && (
          <span className="card-tag">NEW</span>
        )}
      </Link>

      <div className="card-body">
        <div className="card-meta">
          <span className="card-cat">{product.category === 'tshirts' ? 'T-SHIRT' : 'LOWER'}</span>
          <span className="card-color-dot" style={{ background: product.color }}></span>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="card-name">{product.name}</h3>
        </Link>

        <div className="card-price">
          <span className="price-current">₹{product.price}</span>
          {product.originalPrice && (
            <span className="price-original">₹{product.originalPrice}</span>
          )}
        </div>

        {/* Quick size select */}
        <div className="card-sizes">
          {product.sizes.slice(0, 5).map(s => (
            <button
              key={s}
              className={`size-chip ${selectedSize === s ? 'active' : ''}`}
              onClick={() => setSelectedSize(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <button
          className={`card-add-btn ${!selectedSize ? 'disabled' : ''} ${added ? 'added' : ''}`}
          onClick={handleAdd}
        >
          {added ? '✓ ADDED' : selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
        </button>
      </div>
    </div>
  )
}
