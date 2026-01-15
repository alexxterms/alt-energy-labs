import Reveal from '../Reveal.jsx';

const advantages = [
  {
    title: 'Decades of output, not cycles',
    description:
      'We deliver generation—not storage—so the device is its own power plant for 50+ years.',
  },
  {
    title: 'Regulatory tailwinds in India',
    description:
      'New policy enables private nuclear materials, unlocking a domestic supply chain for critical industries.',
  },
  {
    title: 'Hard-tech moat',
    description:
      'Process IP for bonding isotopes to diamond lattices is difficult to replicate and protected by licensing complexity.',
  },
];

function Advantage() {
  return (
    <section className="section" id="advantage">
      <Reveal className="section__header">
        <p className="eyebrow">Why we win</p>
        <h2>Category-defining power systems with an enduring moat.</h2>
        <p>
          Alt Energy Labs pairs deep manufacturing expertise with regulatory readiness to create the first domestic
          capability for long-duration nuclear batteries.
        </p>
      </Reveal>
      <Reveal className="grid grid--three" delay={0.1}>
        {advantages.map((advantage) => (
          <article key={advantage.title} className="card card--highlight">
            <h3>{advantage.title}</h3>
            <p>{advantage.description}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export default Advantage;
