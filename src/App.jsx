import React, { useState, useEffect, useRef } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import About from './pages/About'

export default function App() {
  const [cart, setCart] = useState([])
  const cursorRef = useRef(null)

  // Custom cursor
  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    const enterHover = () => cursor.classList.add('hovering')
    const leaveHover = () => cursor.classList.remove('hovering')

    window.addEventListener('mousemove', move)

    const addListeners = () => {
      document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', enterHover)
        el.addEventListener('mouseleave', leaveHover)
      })
    }

    addListeners()
    const observer = new MutationObserver(addListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      observer.disconnect()
    }
  }, [])

  // Cart handlers
  const addToCart = (product, size) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === size)
      if (exists) {
        return prev.map(i =>
          i.id === product.id && i.size === size
            ? { ...i, qty: i.qty + 1 }
            : i
        )
      }
      return [...prev, { ...product, size, qty: 1 }]
    })
  }

  const removeFromCart = (id, size) => {
    setCart(prev => prev.filter(i => !(i.id === id && i.size === size)))
  }

  const updateQty = (id, size, qty) => {
    if (qty <= 0) {
      removeFromCart(id, size)
      return
    }
    setCart(prev =>
      prev.map(i => i.id === id && i.size === size ? { ...i, qty } : i)
    )
  }

  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0)

  return (
    <>
      <div className="cursor" ref={cursorRef}></div>
      <Navbar cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
        <Route path="/product/:id" element={<ProductDetail onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart cart={cart} onRemove={removeFromCart} onUpdateQty={updateQty} />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  )
}
