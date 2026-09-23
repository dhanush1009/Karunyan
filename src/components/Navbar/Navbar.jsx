import React, { useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Navbar() {
  const { data } = usePortfolio();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const brandMark = (data.name?.trim()[0] || 'K').toUpperCase();

  // Scrollspy to set active section
  useEffect(() => {
    const sectionIds = ['work', 'services', 'about', 'contact'];
    const handleScroll = () => {
      const scrollY = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollY >= top && scrollY < top + height) {
            setActiveSection(id);
            return;
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobile = () => setIsMobileMenuOpen(false);

  return (
    <header className="topbar">
      <div className="shell nav">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">{brandMark}</span>
          <span>{data.name}</span>
        </a>

        <nav className={`nav-links ${isMobileMenuOpen ? 'open' : ''}`} id="navLinks">
          <a
            href="#work"
            className={activeSection === 'work' ? 'active' : ''}
            onClick={closeMobile}
          >
            Work
          </a>
          <a
            href="#services"
            className={activeSection === 'services' ? 'active' : ''}
            onClick={closeMobile}
          >
            What I do
          </a>
          <a
            href="#about"
            className={activeSection === 'about' ? 'active' : ''}
            onClick={closeMobile}
          >
            About
          </a>
          <a
            href="#contact"
            className={activeSection === 'contact' ? 'active' : ''}
            onClick={closeMobile}
          >
            Contact
          </a>
        </nav>

        <div className="nav-actions">
          <a className="button button-ghost" href="#contact">
            Let's talk <span>↗</span>
          </a>
          <button
            className="mobile-menu"
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>
    </header>
  );
}
