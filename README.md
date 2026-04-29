# Mil Jayega — Gen Z Clothing Brand Website

A clean, bold streetwear e-commerce site built with React + Vite.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure

```
mil-jayega/
├── public/                   # Static assets (favicon etc.)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Top navigation + ticker
│   │   ├── Navbar.css
│   │   ├── ProductCard.jsx   # Reusable product card
│   │   ├── ProductCard.css
│   │   ├── Footer.jsx        # Footer with newsletter
│   │   └── Footer.css
│   ├── pages/
│   │   ├── Home.jsx          # Landing page (hero, categories, products)
│   │   ├── Home.css
│   │   ├── Shop.jsx          # All products with filter/sort
│   │   ├── Shop.css
│   │   ├── ProductDetail.jsx # Single product page
│   │   ├── ProductDetail.css
│   │   ├── Cart.jsx          # Shopping cart
│   │   ├── Cart.css
│   │   ├── About.jsx         # About the brand
│   │   └── About.css
│   ├── data/
│   │   └── products.js       # ← EDIT THIS to add/change products
│   ├── App.jsx               # Routes + cart state
│   ├── index.css             # Global styles + CSS variables
│   └── main.jsx              # Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## 🛠 How to Customize

### Add/Edit Products
Open `src/data/products.js` — each product looks like:

```js
{
  id: 1,
  name: "Chaos Theory Tee",
  category: "tshirts",       // "tshirts" or "lowers"
  price: 699,
  originalPrice: 999,        // null if no discount
  tag: "BESTSELLER",         // null for no tag
  color: "#1a1a1a",          // hex color dot in card
  colorName: "Washed Black",
  sizes: ["XS", "S", "M", "L", "XL", "XXL"],
  image: "YOUR_IMAGE_URL",
  imageBack: "YOUR_BACK_IMAGE_URL",
  description: "...",
  isNew: false,
  inStock: true,
}
```

### Change Brand Colors
Edit CSS variables in `src/index.css`:

```css
:root {
  --acid: #c8ff00;    /* main accent (green-yellow) */
  --orange: #ff4d1c;  /* secondary accent */
  --black: #0a0a0a;   /* background */
  --white: #f5f0e8;   /* text color */
}
```

### Add Real Images
Replace placeholder URLs in `src/data/products.js` with your actual product image URLs or local paths like `/images/tee-front.jpg` (put images in `public/images/`).

---

## 📦 Build for Production

```bash
npm run build
```

Output is in the `dist/` folder — deploy to Vercel, Netlify, etc.

---

## 🎨 Design System

| Token | Value | Use |
|-------|-------|-----|
| `--acid` | `#c8ff00` | Primary CTAs, prices, accents |
| `--orange` | `#ff4d1c` | Secondary badges, sale tags |
| `--font-display` | Bebas Neue | Big headings |
| `--font-mono` | Space Mono | Tags, labels, buttons |
| `--font-body` | DM Sans | Body text |
