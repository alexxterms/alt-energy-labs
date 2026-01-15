import Reveal from '../Reveal.jsx';

const applications = [
  {
    sector: 'Space & planetary missions',
    detail:
      'Power deep-space probes, lunar assets, and satellites that operate through long night cycles and radiation exposure.',
  },
  {
    sector: 'Defense & surveillance',
    detail:
      'Enable unmanned systems that persist in contested environments without human maintenance.',
  },
  {
    sector: 'Medical implants',
    detail:
      'Reduce surgical battery replacement cycles for pacemakers and critical implants.',
  },
  {
    sector: 'Industrial IoT at scale',
    detail:
      'Deploy sensors in remote pipelines, arctic stations, and infrastructure with no recharge logistics.',
  },
];

function Applications() {
  return (
    <section className="section section--fade" id="applications">
      <Reveal className="section__header">
        <p className="eyebrow">Applications</p>
        <h2>Where perpetual power changes the economics.</h2>
        <p>
          When maintenance disappears, new mission profiles become possible and total operating costs collapse.
        </p>
      </Reveal>
      <Reveal className="grid grid--two" delay={0.1}>
        {applications.map((app) => (
          <article key={app.sector} className="card card--border">
            <h3>{app.sector}</h3>
            <p>{app.detail}</p>
          </article>
        ))}
      </Reveal>
    </section>
  );
}

export default Applications;
