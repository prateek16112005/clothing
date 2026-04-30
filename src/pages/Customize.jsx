import React, { useState } from 'react'
import './Customize.css'

const TEE_COLORS = [
  { id: 'white',   label: 'Pure White',    hex: '#FAFAF8', textColor: '#18181A' },
  { id: 'cream',   label: 'Cream',         hex: '#F0E8D4', textColor: '#18181A' },
  { id: 'black',   label: 'Jet Black',     hex: '#18181A', textColor: '#FAFAF8' },
  { id: 'gray',    label: 'Ash Grey',      hex: '#9A9890', textColor: '#FAFAF8' },
  { id: 'olive',   label: 'Olive',         hex: '#6B7A5A', textColor: '#FAFAF8' },
  { id: 'orange',  label: 'Brick Orange',  hex: '#E8430E', textColor: '#FAFAF8' },
  { id: 'acid',    label: 'Acid Green',    hex: '#B5D400', textColor: '#18181A' },
  { id: 'navy',    label: 'Navy',          hex: '#1E2A4A', textColor: '#FAFAF8' },
]

const GRAPHICS = [
  { id: 'none',    label: 'No Graphic',  symbol: '∅' },
  { id: 'star',    label: 'Star',        symbol: '★' },
  { id: 'cross',   label: 'Cross',       symbol: '✝' },
  { id: 'smiley',  label: 'Smiley',      symbol: '☺' },
  { id: 'peace',   label: 'Peace',       symbol: '☮' },
  { id: 'fire',    label: 'Fire',        symbol: '🔥' },
  { id: 'mj',      label: 'MJ Logo',     symbol: 'MJ' },
  { id: 'chaos',   label: 'Chaos',       symbol: '∞' },
]

const FITS = ['Oversized', 'Regular', 'Slim']
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
const PLACEMENTS = ['Chest Left', 'Chest Center', 'Back Center', 'Sleeve']

export default function Customize({ onAddToCart }) {
  const [color,     setColor]     = useState(TEE_COLORS[0])
  const [text,      setText]      = useState('')
  const [graphic,   setGraphic]   = useState(GRAPHICS[0])
  const [fit,       setFit]       = useState('Oversized')
  const [size,      setSize]      = useState(null)
  const [placement, setPlacement] = useState('Chest Center')
  const [textColor, setTextColor] = useState('#18181A')
  const [added,     setAdded]     = useState(false)
  const [step,      setStep]      = useState(1)

  const price = 999 + (graphic.id !== 'none' ? 150 : 0) + (text ? 100 : 0)

  const handleOrder = () => {
    if (!size) return
    const customProduct = {
      id: `custom-${Date.now()}`,
      name: `Custom Tee — ${color.label}`,
      category: 'tshirts',
      price,
      colorName: color.label,
      image: null,
    }
    onAddToCart(customProduct, size)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <main className="customize">
      <div className="cz-header container">
        <span className="tag">// Customize</span>
        <h1 className="cz-title">Design Your Tee</h1>
        <p className="cz-subtitle">Your color. Your text. Your graphic. We print, we ship.</p>
      </div>

      <div className="cz-body container">
        {/* Left — Preview */}
        <div className="cz-preview-col">
          <div className="cz-preview-wrap">
            <div className="cz-tee-preview" style={{ background: color.hex }}>
              {/* Tee shape via CSS */}
              <div className="cz-tee-sleeve cz-tee-sleeve-l" style={{ background: color.hex }} />
              <div className="cz-tee-sleeve cz-tee-sleeve-r" style={{ background: color.hex }} />
              <div className="cz-tee-body" style={{ background: color.hex }}>
                {/* Graphic */}
                {graphic.id !== 'none' && (
                  <div className="cz-graphic" style={{ color: textColor }}>
                    <span className="cz-graphic-symbol">{graphic.symbol}</span>
                    <span className="cz-graphic-label">{graphic.label}</span>
                  </div>
                )}
                {/* Text */}
                {text && (
                  <div className="cz-text-preview" style={{ color: textColor }}>
                    {text}
                  </div>
                )}
                {!text && graphic.id === 'none' && (
                  <div className="cz-empty-hint" style={{ color: color.textColor, opacity: 0.2 }}>
                    Your design<br/>appears here
                  </div>
                )}
              </div>
              {/* Collar */}
              <div className="cz-collar" style={{ borderColor: color.hex, background: 'transparent' }} />
            </div>

            <div className="cz-preview-info">
              <span className="tag">Live Preview</span>
              <div className="cz-preview-details">
                <span>{color.label}</span>
                <span>·</span>
                <span>{fit}</span>
                {size && <><span>·</span><span>Size {size}</span></>}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="cz-price-box">
            <div className="cz-price-breakdown">
              <div className="cz-price-row"><span>Base Tee (240 GSM)</span><span>₹999</span></div>
              {graphic.id !== 'none' && <div className="cz-price-row"><span>Graphic Print</span><span>+₹150</span></div>}
              {text && <div className="cz-price-row"><span>Custom Text</span><span>+₹100</span></div>}
            </div>
            <div className="cz-price-total">
              <span>Total</span>
              <span className="cz-total-num">₹{price}</span>
            </div>
          </div>
        </div>

        {/* Right — Controls */}
        <div className="cz-controls-col">
          {/* Step 1 — Color */}
          <div className={`cz-step ${step >= 1 ? 'active' : ''}`}>
            <button className="cz-step-header" onClick={() => setStep(1)}>
              <span className="cz-step-num">01</span>
              <span className="cz-step-title">Choose Color</span>
              <span className="cz-step-value">{color.label}</span>
              <span className="cz-step-chevron">{step === 1 ? '▲' : '▼'}</span>
            </button>
            {step === 1 && (
              <div className="cz-step-body">
                <div className="color-grid">
                  {TEE_COLORS.map(c => (
                    <button
                      key={c.id}
                      className={`color-swatch ${color.id === c.id ? 'selected' : ''}`}
                      style={{ background: c.hex }}
                      onClick={() => setColor(c)}
                      title={c.label}
                    >
                      {color.id === c.id && <span className="swatch-check" style={{ color: c.textColor }}>✓</span>}
                    </button>
                  ))}
                </div>
                <div className="color-label-row">
                  {TEE_COLORS.map(c => (
                    <span key={c.id} className={`color-chip-label ${color.id === c.id ? 'active' : ''}`}
                      onClick={() => setColor(c)}>{c.label}</span>
                  ))}
                </div>
                <button className="cz-next-btn" onClick={() => setStep(2)}>Next: Choose Fit →</button>
              </div>
            )}
          </div>

          {/* Step 2 — Fit */}
          <div className={`cz-step ${step >= 2 ? 'active' : ''}`}>
            <button className="cz-step-header" onClick={() => step >= 2 && setStep(2)}>
              <span className="cz-step-num">02</span>
              <span className="cz-step-title">Choose Fit</span>
              <span className="cz-step-value">{fit}</span>
              <span className="cz-step-chevron">{step === 2 ? '▲' : '▼'}</span>
            </button>
            {step === 2 && (
              <div className="cz-step-body">
                <div className="fit-options">
                  {FITS.map(f => (
                    <button key={f} className={`fit-btn ${fit === f ? 'active' : ''}`} onClick={() => setFit(f)}>
                      <span className="fit-name">{f}</span>
                      <span className="fit-desc">
                        {f === 'Oversized' ? 'Boxy, dropped shoulders' : f === 'Regular' ? 'Classic comfortable cut' : 'Tailored, body-hugging'}
                      </span>
                    </button>
                  ))}
                </div>
                <button className="cz-next-btn" onClick={() => setStep(3)}>Next: Add Graphic →</button>
              </div>
            )}
          </div>

          {/* Step 3 — Graphic */}
          <div className={`cz-step ${step >= 3 ? 'active' : ''}`}>
            <button className="cz-step-header" onClick={() => step >= 3 && setStep(3)}>
              <span className="cz-step-num">03</span>
              <span className="cz-step-title">Add Graphic</span>
              <span className="cz-step-value">{graphic.label}</span>
              <span className="cz-step-chevron">{step === 3 ? '▲' : '▼'}</span>
            </button>
            {step === 3 && (
              <div className="cz-step-body">
                <div className="graphic-grid">
                  {GRAPHICS.map(g => (
                    <button key={g.id} className={`graphic-btn ${graphic.id === g.id ? 'active' : ''}`}
                      onClick={() => setGraphic(g)}>
                      <span className="graphic-sym">{g.symbol}</span>
                      <span className="graphic-name">{g.label}</span>
                    </button>
                  ))}
                </div>
                <button className="cz-next-btn" onClick={() => setStep(4)}>Next: Add Text →</button>
              </div>
            )}
          </div>

          {/* Step 4 — Text */}
          <div className={`cz-step ${step >= 4 ? 'active' : ''}`}>
            <button className="cz-step-header" onClick={() => step >= 4 && setStep(4)}>
              <span className="cz-step-num">04</span>
              <span className="cz-step-title">Add Text</span>
              <span className="cz-step-value">{text || 'Optional'}</span>
              <span className="cz-step-chevron">{step === 4 ? '▲' : '▼'}</span>
            </button>
            {step === 4 && (
              <div className="cz-step-body">
                <div className="text-input-wrap">
                  <input
                    type="text"
                    className="cz-text-input"
                    placeholder="Enter your text (max 20 chars)"
                    maxLength={20}
                    value={text}
                    onChange={e => setText(e.target.value)}
                  />
                  <span className="char-count">{text.length}/20</span>
                </div>
                <div className="placement-row">
                  <span className="tag">Placement</span>
                  <div className="placement-opts">
                    {PLACEMENTS.map(p => (
                      <button key={p} className={`placement-btn ${placement === p ? 'active' : ''}`}
                        onClick={() => setPlacement(p)}>{p}</button>
                    ))}
                  </div>
                </div>
                <div className="text-color-row">
                  <span className="tag">Print Color</span>
                  <div className="text-color-opts">
                    {['#18181A', '#FAFAF8', '#B5D400', '#E8430E', '#1E2A4A'].map(c => (
                      <button key={c} className={`text-color-swatch ${textColor === c ? 'selected' : ''}`}
                        style={{ background: c }}
                        onClick={() => setTextColor(c)} />
                    ))}
                  </div>
                </div>
                <button className="cz-next-btn" onClick={() => setStep(5)}>Next: Select Size →</button>
              </div>
            )}
          </div>

          {/* Step 5 — Size */}
          <div className={`cz-step ${step >= 5 ? 'active' : ''}`}>
            <button className="cz-step-header" onClick={() => step >= 5 && setStep(5)}>
              <span className="cz-step-num">05</span>
              <span className="cz-step-title">Select Size</span>
              <span className="cz-step-value">{size || 'Pick one'}</span>
              <span className="cz-step-chevron">{step === 5 ? '▲' : '▼'}</span>
            </button>
            {step === 5 && (
              <div className="cz-step-body">
                <div className="size-row">
                  {SIZES.map(s => (
                    <button key={s} className={`cz-size-btn ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
                <a href="#" className="size-guide-link tag">View Size Guide →</a>
              </div>
            )}
          </div>

          {/* Add to cart */}
          <button
            className={`cz-order-btn ${!size ? 'disabled' : ''} ${added ? 'done' : ''}`}
            onClick={handleOrder}
          >
            {added
              ? '✓ Added to Cart!'
              : size
              ? `Add Custom Tee to Cart — ₹${price}`
              : 'Select a size to order'}
          </button>

          <div className="cz-assurances">
            {['Print & ship in 5–7 days', '100% cotton 240 GSM', 'COD available', 'Easy returns'].map(a => (
              <span key={a} className="cz-assurance">✓ {a}</span>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
