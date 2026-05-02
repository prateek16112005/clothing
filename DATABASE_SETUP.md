# 🗄️ Database Setup Guide — Drip Drop (Mil Jayega)

## Overview

The frontend uses a mock auth in `src/contexts/AuthContext.jsx`. To make login/signup real, you need:

1. A database (PostgreSQL recommended)
2. A backend API (Node.js/Express or Next.js)
3. JWT tokens for sessions

---

## Option A — Supabase (Easiest, Free Tier)

Supabase gives you Postgres + Auth + API out of the box. Best for quick setup.

### Step 1: Create a Supabase project

1. Go to [https://supabase.com](https://supabase.com) → New Project
2. Note your `Project URL` and `anon public key`

### Step 2: Create the users table (already handled by Supabase Auth)

Supabase Auth creates a `auth.users` table automatically.  
Create a custom `profiles` table for extra user data:

```sql
-- Run this in the Supabase SQL Editor
create table public.profiles (
  id          uuid references auth.users(id) on delete cascade primary key,
  name        text,
  email       text unique not null,
  is_first_purchase boolean default true,
  created_at  timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Step 3: Install Supabase client

```bash
npm install @supabase/supabase-js
```

### Step 4: Create `src/lib/supabase.js`

```js
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

### Step 5: Add to `.env.local`

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 6: Replace mock in `AuthContext.jsx`

Replace the `login` function:

```js
import { supabase } from '../lib/supabase'

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw new Error(error.message)

  // Fetch profile (for isFirstPurchase)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  const userObj = { ...data.user, ...profile }
  setUser(userObj)
  return userObj
}

const signup = async (name, email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } }
  })
  if (error) throw new Error(error.message)
  const userObj = { ...data.user, name, isFirstPurchase: true }
  setUser(userObj)
  return userObj
}

const logout = async () => {
  await supabase.auth.signOut()
  setUser(null)
}
```

---

## Option B — Custom Node.js + PostgreSQL

Use this if you want full control or already have a server.

### Step 1: Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# Mac
brew install postgresql
brew services start postgresql
```

### Step 2: Create database and table

```bash
psql -U postgres
```

```sql
CREATE DATABASE dripdrop;
\c dripdrop

CREATE TABLE users (
  id                SERIAL PRIMARY KEY,
  name              VARCHAR(100) NOT NULL,
  email             VARCHAR(255) UNIQUE NOT NULL,
  password_hash     VARCHAR(255) NOT NULL,
  is_first_purchase BOOLEAN DEFAULT TRUE,
  created_at        TIMESTAMPTZ DEFAULT NOW()
);

-- Track which order used the first-purchase discount
CREATE TABLE orders (
  id         SERIAL PRIMARY KEY,
  user_id    INT REFERENCES users(id),
  total      INT NOT NULL,
  discount   INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Step 3: Create backend (Node.js/Express)

```bash
mkdir backend && cd backend
npm init -y
npm install express pg bcryptjs jsonwebtoken cors dotenv
```

Create `backend/index.js`:

```js
import express from 'express'
import bcrypt  from 'bcryptjs'
import jwt     from 'jsonwebtoken'
import pg      from 'pg'
import cors    from 'cors'
import 'dotenv/config'

const app = express()
const db  = new pg.Pool({ connectionString: process.env.DATABASE_URL })

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

// SIGNUP
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const hash = await bcrypt.hash(password, 10)
    const { rows } = await db.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1,$2,$3) RETURNING id, name, email, is_first_purchase',
      [name, email, hash]
    )
    const user  = rows[0]
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (err) {
    res.status(400).json({ message: err.detail || 'Email already registered' })
  }
})

// LOGIN
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body
  try {
    const { rows } = await db.query('SELECT * FROM users WHERE email=$1', [email])
    const user = rows[0]
    if (!user || !(await bcrypt.compare(password, user.password_hash)))
      return res.status(401).json({ message: 'Invalid credentials' })
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user.id, name: user.name, email: user.email, isFirstPurchase: user.is_first_purchase } })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
})

// Mark first purchase as used (call this after successful payment)
app.post('/api/orders/complete', async (req, res) => {
  const { userId } = req.body  // get from JWT middleware in production
  await db.query('UPDATE users SET is_first_purchase=false WHERE id=$1', [userId])
  res.json({ ok: true })
})

app.listen(3001, () => console.log('API running on http://localhost:3001'))
```

### Step 4: `.env` for backend

```
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/dripdrop
JWT_SECRET=pick_a_long_random_string_here
PORT=3001
```

### Step 5: Replace mock in `AuthContext.jsx`

```js
const login = async (email, password) => {
  const res  = await fetch('http://localhost:3001/api/auth/login', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  localStorage.setItem('drip_token', data.token)
  localStorage.setItem('drip_user',  JSON.stringify(data.user))
  setUser(data.user)
  return data.user
}

const signup = async (name, email, password) => {
  const res  = await fetch('http://localhost:3001/api/auth/signup', {
    method:  'POST',
    headers: { 'Content-Type': 'application/json' },
    body:    JSON.stringify({ name, email, password })
  })
  const data = await res.json()
  if (!res.ok) throw new Error(data.message)
  localStorage.setItem('drip_token', data.token)
  localStorage.setItem('drip_user',  JSON.stringify(data.user))
  setUser(data.user)
  return data.user
}
```

---

## First Purchase Discount Flow

1. User signs up → `isFirstPurchase: true` in DB
2. Cart page reads `user.isFirstPurchase` → shows 10% OFF banner
3. On checkout/payment success → call `POST /api/orders/complete` with userId
4. Backend sets `is_first_purchase = false`
5. Next visit to cart — no more discount shown

---

## Quick Reference

| What                    | File to Edit                              |
|-------------------------|-------------------------------------------|
| Add/remove products     | `src/data/products.js`                    |
| Mark stock out          | Set `stockOut: true` on any product       |
| Set badge               | Set `badge: "NEW ARRIVAL"` etc.           |
| Change discount %       | `FIRST_ORDER_DISCOUNT` in `Cart.jsx`      |
| Swap mock auth for real | `src/contexts/AuthContext.jsx`            |
| Add new category        | Add to `categories[]` in `products.js`    |

---

## Badge Options (in products.js)

```js
badge: "BESTSELLER"    // yellow-green
badge: "NEW ARRIVAL"   // blue
badge: "LIMITED"       // orange-red
badge: "DESI DROP"     // orange
badge: null            // no badge
stockOut: true         // grey overlay + "Sold Out" button
```
