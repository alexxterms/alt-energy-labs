import Reveal from '../Reveal.jsx';

const roadmap = [
  {
    phase: 'Now',
    focus: 'Deploy in space, defense, and critical infrastructure to validate extreme-environment performance.',
  },
  {
    phase: 'Next',
    focus: 'Scale diamond wafer procurement and manufacturing to unlock medical-grade reliability.',
  },
  {
    phase: 'Future',
    focus: 'Power trillions of IoT devices with sealed, zero-maintenance energy autonomy.',
  },
];

function Vision() {
  return (
    <section className="section section--dark" id="vision">
      <Reveal className="section__header">
        <p className="eyebrow">10-year vision</p>
        <h2>Make “recharge” obsolete for the next generation of machines.</h2>
        <p>
          We are building a distributed energy utility for autonomous systems—starting with the highest-stakes
          missions and expanding into the infrastructure that powers daily life.
        </p>
      </Reveal>
      <Reveal className="timeline" delay={0.1}>
        {roadmap.map((item) => (
          <div key={item.phase} className="timeline__item">
            <h3>{item.phase}</h3>
            <p>{item.focus}</p>
          </div>
        ))}
      </Reveal>
    </section>
  );
}

export default Vision;
