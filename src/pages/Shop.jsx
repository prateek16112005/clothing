import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import './Shop.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'new', label: 'Newest First' },
]

export default function Shop({ onAddToCart }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [sort, setSort] = useState('default')

  const activeCat = searchParams.get('cat') || 'all'

  const setCategory = (cat) => {
    if (cat === 'all') {
      searchParams.delete('cat')
    } else {
      searchParams.set('cat', cat)
    }
    setSearchParams(searchParams)
  }

  let filtered = activeCat === 'all'
    ? products
    : products.filter(p => p.category === activeCat)

  if (sort === 'price-asc') filtered = [...filtered].sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') filtered = [...filtered].sort((a, b) => b.price - a.price)
  if (sort === 'new') filtered = [...filtered].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))

  return (
    <main className="shop">
      {/* Header */}
      <div className="shop-header">
        <div className="shop-header-inner container">
          <div>
            <span className="tag">// SHOP</span>
            <h1 className="shop-title">
              {activeCat === 'all' ? 'All Drops' : activeCat === 'tshirts' ? 'T-Shirts' : 'Lowers'}
            </h1>
          </div>
          <span className="shop-count">{filtered.length} pieces</span>
        </div>
      </div>

      <div className="shop-body container">
        {/* Filter bar */}
        <div className="filter-bar">
          <div className="filter-cats">
            {categories.map(c => (
              <button
                key={c.id}
                className={`filter-btn ${activeCat === c.id ? 'active' : ''}`}
                onClick={() => setCategory(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div className="filter-sort">
            <label className="tag">SORT:</label>
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="sort-select"
            >
              {SORT_OPTIONS.map(o => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="shop-grid">
          {filtered.map(p => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="empty-state">
            <span className="tag">NOTHING HERE YET</span>
            <p>This collection is coming soon. Drop alerts are open.</p>
          </div>
        )}
      </div>
    </main>
  )
}
