import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Footer() {
  const { data } = usePortfolio();
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div className="shell footer-row">
        <span>
          © {currentYear} {data.name}. Made with intention.
        </span>

        <div className="footer-links">
          <a href="#work">Work</a>
          <a href="#services">Services</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </footer>
  );
}
