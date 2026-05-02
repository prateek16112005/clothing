import React, { useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Auth.css'

export default function Auth() {
  const [mode, setMode]       = useState('login')   // 'login' | 'signup'
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [password, setPass]   = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)

  const { login, signup } = useAuth()
  const navigate          = useNavigate()
  const location          = useLocation()
  const from              = location.state?.from || '/'

  const handle = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(email, password)
      } else {
        if (!name.trim()) { setError('Enter your name'); setLoading(false); return }
        await signup(name, email, password)
      }
      navigate(from, { replace: true })
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="auth-page">
      <div className="auth-card">
        <div className="auth-brand">
          <Link to="/" className="auth-logo">MJ<span>.</span></Link>
          <p className="auth-brand-sub">Mil Jayega</p>
        </div>

        <div className="auth-tabs">
          <button className={mode === 'login'  ? 'active' : ''} onClick={() => { setMode('login');  setError('') }}>Login</button>
          <button className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setError('') }}>Sign Up</button>
        </div>

        {mode === 'signup' && (
          <div className="auth-first-offer">
            <span className="offer-icon">🎁</span>
            <div>
              <strong>First Order Offer</strong>
              <p>Sign up and get <span className="offer-highlight">10% OFF</span> your first order. Code auto-applied at checkout.</p>
            </div>
          </div>
        )}

        <form className="auth-form" onSubmit={handle}>
          {mode === 'signup' && (
            <div className="auth-field">
              <label>Your Name</label>
              <input
                type="text"
                placeholder="What do your people call you?"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="auth-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="auth-field">
            <label>Password</label>
            <input
              type="password"
              placeholder={mode === 'signup' ? 'Min 6 characters' : 'Your password'}
              value={password}
              onChange={e => setPass(e.target.value)}
              minLength={6}
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? 'Please wait…' : mode === 'login' ? 'Login →' : 'Create Account →'}
          </button>
        </form>

        {mode === 'login' && (
          <p className="auth-switch">
            No account? <button onClick={() => setMode('signup')}>Sign up</button> — get 10% off your first order.
          </p>
        )}
      </div>
    </main>
  )
}
