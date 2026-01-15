import Reveal from '../Reveal.jsx';

function Hero() {
  return (
    <section className="hero">
      <Reveal className="hero__content">
        <p className="eyebrow">Alt Energy Labs</p>
        <h1>
          Power that lasts longer than the mission.
          <span> Decades-long energy, sealed inside a chip.</span>
        </h1>
        <p className="hero__lead">
          We build diamond-based nuclear batteries that turn atomic decay into steady electricity for 50+ years,
          enabling autonomous systems that never plug in, recharge, or fail during critical operations.
        </p>
        <div className="hero__actions">
          <a className="button primary" href="#contact">
            Start a collaboration
          </a>
          <a className="button ghost" href="#technology">
            Explore the platform
          </a>
        </div>
        <div className="hero__stats">
          <div>
            <h3>50+ yrs</h3>
            <p>Continuous output in extreme environments</p>
          </div>
          <div>
            <h3>-60°C</h3>
            <p>Validated performance in deep cold</p>
          </div>
          <div>
            <h3>Zero maintenance</h3>
            <p>Sealed systems with no recharge cycles</p>
          </div>
        </div>
        <a className="scroll-cue" href="#impact" aria-label="Scroll to explore">
          <span className="scroll-cue__mouse">
            <span className="scroll-cue__wheel" />
          </span>
          <span>Scroll to explore</span>
        </a>
      </Reveal>
      <Reveal className="hero__visual" delay={0.15}>
        <div className="orbital-card">
          <p className="orbital-card__label">Power Architecture</p>
          <h2>Solid-state betavoltaic core</h2>
          <p>
            Diamond semiconductors pair with safe radioisotopes to deliver constant energy density—without moving
            parts or mechanical degradation.
          </p>
          <div className="orbital-card__grid">
            <div>
              <span>50+</span>
              <p>years of supply</p>
            </div>
            <div>
              <span>1st</span>
              <p>domestic capability</p>
            </div>
          </div>
        </div>
        <div className="hero__glow" />
      </Reveal>
    </section>
  );
}

export default Hero;
