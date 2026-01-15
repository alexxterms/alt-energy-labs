import Reveal from '../Reveal.jsx';

function Contact() {
  return (
    <section className="section section--cta" id="contact">
      <Reveal className="cta">
        <div>
          <p className="eyebrow">Partner with Alt Energy Labs</p>
          <h2>Let’s design perpetual power for your mission.</h2>
          <p>
            We collaborate with space agencies, defense programs, medical device leaders, and industrial OEMs to
            integrate long-duration nuclear power safely and effectively.
          </p>
        </div>
        <div className="cta__panel">
          <div>
            <h3>Engage with us</h3>
            <p>Share your mission profile and we will build the power roadmap together.</p>
          </div>
          <a className="button primary" href="mailto:partners@altenergylabs.com">
            partners@altenergylabs.com
          </a>
          <a className="button ghost" href="mailto:research@altenergylabs.com">
            Request technical documentation
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export default Contact;
