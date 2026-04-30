import React from 'react'
import { Link } from 'react-router-dom'
import { IMAGES } from '../data/images'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <section className="about-hero">
        <div className="container about-hero-inner">
          <div className="about-hero-img">
            <img src={IMAGES.about} alt="Mil Jayega Brand" loading="lazy" />
          </div>
          <div>
            <span className="tag">// Our Story</span>
            <h1 className="about-headline">
              <span>BORN</span>
              <span className="about-outline">HERE.</span>
            </h1>
            <p style={{ color: 'var(--text-2)', fontSize: '15px', lineHeight: '1.8', marginTop: '20px', maxWidth: '400px' }}>
              Mil Jayega started with one question — why does good streetwear have to come from abroad? We're from here. Same food, same dust, same beat.
            </p>
          </div>
        </div>
      </section>

      <section className="about-body">
        <div className="container about-grid">
          <div className="about-text">
            <h2>What even is Mil Jayega?</h2>
            <p>
              The name says it all — "it will be found." The right fit, the right vibe, the right energy. It always mil jayega.
            </p>
            <p>
              Every piece is designed in-house, printed on quality Indian-made fabric, and shipped straight from our studio. No middlemen, no corporate BS — just straight fits.
            </p>
            <p>
              We're building something for the generation that grew up on both Bollywood and streetwear drops. Desi at heart, global in taste.
            </p>
            <div style={{ marginTop: '28px' }}>
              <Link to="/shop" className="btn-primary">Shop the Collection →</Link>
            </div>
          </div>

          <div className="about-values">
            {[
              { num: '01', title: 'Quality First',  desc: 'Minimum 220 GSM cotton on everything. No compromise on fabric, ever.' },
              { num: '02', title: 'Desi Made',      desc: '100% designed and manufactured in India. Proud of every stitch.' },
              { num: '03', title: 'Limited Runs',   desc: "Most drops are limited. Once it's gone, it's gone for good." },
              { num: '04', title: 'Real Prices',    desc: 'Gen Z money. Gen Z prices. No overpriced hype tax here.' },
            ].map(v => (
              <div key={v.num} className="value-card">
                <span className="value-num">{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-manifesto">
        <div className="container manifesto-inner">
          <blockquote>
            "We don't chase trends.<br />
            We wear what feels right.<br />
            <span>Mil jayega — always.</span>"
          </blockquote>
        </div>
      </section>
    </main>
  )
}
