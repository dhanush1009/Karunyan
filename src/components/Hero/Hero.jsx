import React, { useState, useRef } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import defaultProfileImg from '../../assets/karunyan-cutout.png';

export default function Hero() {
  const { data } = usePortfolio();
  const profileImage = data.profileImage || defaultProfileImg;
  const stageRef = useRef(null);

  const [tilt, setTilt] = useState({ x: 0, y: 0, active: false });

  const handleMouseMove = (e) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // -12 to 12 deg tilt
    const rotateX = -((y - centerY) / centerY) * 14;
    const rotateY = ((x - centerX) / centerX) * 14;
    setTilt({ x: rotateX, y: rotateY, active: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, active: false });
  };

  return (
    <section className="hero">
      <div className="shell hero-grid">
        <div className="hero-copy">
          <span className="eyebrow mono">CREATIVE VIDEO EDITOR</span>
          <h1>
            Karunyan
            <br />
          </h1>
          <h2>
            <em>Video Editor</em>
          </h2>
          <div className="mono role-line"></div>
          <p>{data.intro}</p>

          <div className="hero-cta">
            <a className="button button-ghost" href="#work">
              Explore selected work <span>↓</span>
            </a>
          </div>

          <div className="scroll-line mono">
            <i></i> Scroll to explore
          </div>
        </div>

        

            {/* Freestanding 3D Cutout Image (No Box Frame!) */}
            <div className="hero-3d-img-wrap">
              <img
                src={profileImage}
                alt={data.name || 'Karunyan'}
                className="hero-3d-img"
              />
            </div>
      </div>
    </section>
  );
}
