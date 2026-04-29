import React from 'react'
import './About.css'

export default function About() {
  return (
    <main className="about">
      <div className="about-hero">
        <div className="container">
          <span className="tag">// OUR STORY</span>
          <h1 className="about-headline">
            <span>BORN</span>
            <span className="about-outline">HERE.</span>
          </h1>
        </div>
      </div>

      <section className="about-body container">
        <div className="about-grid">
          <div className="about-text-col">
            <h2>What even is Mil Jayega?</h2>
            <p>
              Mil Jayega started with one question — why does good streetwear have to come from abroad?
              We're from here. We eat the same food, breathe the same dust, and vibe to the same beat.
              So we made clothes that feel like us.
            </p>
            <p>
              The name says it all — "it will be found." The right fit, the right vibe, the right energy.
              It always mil jayega.
            </p>
            <p>
              Every piece is designed in-house, printed on quality Indian-made fabric, and shipped straight
              from our small studio. No middlemen, no corporate BS — just straight fits.
            </p>
          </div>

          <div className="about-values">
            {[
              { num: '01', title: 'Quality First', desc: 'Minimum 220 GSM cotton on everything. No compromise.' },
              { num: '02', title: 'Desi Made', desc: '100% designed and manufactured in India. Proud of it.' },
              { num: '03', title: 'Limited Runs', desc: 'Most drops are limited. Once it\'s gone, it\'s gone.' },
              { num: '04', title: 'Real Prices', desc: 'Gen Z money. Gen Z prices. No overpriced hype.' },
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
        <div className="manifesto-inner container">
          <blockquote>
            "We don't chase trends.<br />We wear what feels right.<br />Mil jayega — always."
          </blockquote>
        </div>
      </section>
    </main>
  )
}
