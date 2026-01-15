import Reveal from '../Reveal.jsx';

const techSteps = [
  {
    title: 'Diamond semiconductor lattice',
    description:
      'Radiation-hardened diamond provides a stable bandgap, resisting performance decay where silicon fails.',
  },
  {
    title: 'Isotope bonding process',
    description:
      'Our proprietary process integrates radioisotopes into the lattice, creating an always-on energy source.',
  },
  {
    title: 'Solid-state power conditioning',
    description:
      'Custom power electronics deliver predictable voltage to mission payloads without thermal drift.',
  },
];

function Technology() {
  return (
    <section className="section" id="technology">
      <Reveal className="section__header">
        <p className="eyebrow">Core technology</p>
        <h2>Betavoltaic energy, engineered for manufacturability.</h2>
        <p>
          We merge nuclear physics with semiconductor manufacturing to deliver a safe, sealed power system that
          operates continuously for half a century.
        </p>
      </Reveal>
      <Reveal className="grid grid--three" delay={0.1}>
        {techSteps.map((step) => (
          <article key={step.title} className="card card--glass">
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </Reveal>
      <Reveal className="callout" delay={0.2}>
        <div>
          <h3>Designed for cold, radiation, and zero maintenance</h3>
          <p>
            Diamond semiconductors retain structural integrity under radiation exposure and extreme temperature
            swings, ensuring predictable output where silicon-based systems degrade.
          </p>
        </div>
        <a className="button primary" href="#contact">
          Request technical brief
        </a>
      </Reveal>
    </section>
  );
}

export default Technology;
