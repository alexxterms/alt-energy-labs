const quickLinks = [
  { label: 'Technology', href: '#technology' },
  { label: 'Use cases', href: '#applications' },
  { label: 'Vision', href: '#vision' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer__brand">
          <span>Alt Energy Labs</span>
          <p>Diamond-based nuclear power for the next 50 years of autonomy.</p>
        </div>
        <p className="footer__note">
          Based in India • Built for mission-critical autonomy across space, defense, medical, and industrial systems.
        </p>
      </div>
      <div className="footer__links">
        <p className="footer__heading">Explore</p>
        {quickLinks.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </div>
      <div className="footer__links">
        <p className="footer__heading">Connect</p>
        <a href="mailto:partners@altenergylabs.com">partners@altenergylabs.com</a>
        <a href="mailto:research@altenergylabs.com">research@altenergylabs.com</a>
      </div>
    </footer>
  );
}

export default Footer;
