import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('drip_user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch {}
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    // MOCK — replace with real fetch('/api/auth/login', ...)
    await new Promise(r => setTimeout(r, 700))
    if (password.length < 6) throw new Error('Invalid credentials')
    const mockUser = { id: 'usr_' + Math.random().toString(36).slice(2), email, name: email.split('@')[0], isFirstPurchase: true }
    localStorage.setItem('drip_user', JSON.stringify(mockUser))
    setUser(mockUser)
    return mockUser
  }

  const signup = async (name, email, password) => {
    // MOCK — replace with real fetch('/api/auth/signup', ...)
    await new Promise(r => setTimeout(r, 800))
    const mockUser = { id: 'usr_' + Math.random().toString(36).slice(2), name, email, isFirstPurchase: true }
    localStorage.setItem('drip_user', JSON.stringify(mockUser))
    setUser(mockUser)
    return mockUser
  }

  const logout = () => {
    localStorage.removeItem('drip_user')
    localStorage.removeItem('drip_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
