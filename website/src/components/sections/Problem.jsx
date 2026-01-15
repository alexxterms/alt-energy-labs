import Reveal from '../Reveal.jsx';

const painPoints = [
  {
    title: 'Remote systems fail when batteries die',
    description:
      'Space probes, arctic sensors, and deep-ocean devices are engineered around battery swaps, solar access, or mission end-of-life events.',
  },
  {
    title: 'Maintenance cost destroys scale',
    description:
      'Swapping or recharging trillions of IoT devices is economically impossible. Logistics, safety, and downtime make it unsustainable.',
  },
  {
    title: 'Critical hardware can’t tolerate gaps',
    description:
      'Medical implants and defense systems need uninterrupted energy. Every battery replacement introduces risk and regulatory friction.',
  },
];

function Problem() {
  return (
    <section className="section section--dark" id="impact">
      <Reveal className="section__header">
        <p className="eyebrow">Why it matters</p>
        <h2>Battery limitations are the biggest blocker to autonomous infrastructure.</h2>
        <p>
          Traditional chemical cells are consumables. When they degrade, the system goes offline. Alt Energy Labs
          removes this dependency by making power a permanent property of the device.
        </p>
      </Reveal>
      <Reveal className="grid grid--three" delay={0.1}>
        {painPoints.map((point) => (
          <article key={point.title} className="card">
            <h3>{point.title}</h3>
            <p>{point.description}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export default Problem;
