const navLinks = [
  { label: 'Technology', href: '#technology' },
  { label: 'Impact', href: '#impact' },
  { label: 'Applications', href: '#applications' },
  { label: 'Advantage', href: '#advantage' },
  { label: 'Vision', href: '#vision' },
];

function Navigation() {
  return (
    <header className="nav">
      <div className="nav__brand">
        <span className="nav__logo">AE</span>
        <div>
          <p className="nav__name">Alt Energy Labs</p>
          <p className="nav__tag">Perpetual Power Systems</p>
        </div>
      </div>
      <nav className="nav__links">
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className="nav__link">
            {link.label}
          </a>
        ))}
      </nav>
      <a className="nav__cta" href="#contact">
        Partner with us
      </a>
    </header>
  );
}

export default Navigation;
