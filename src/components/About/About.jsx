import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function About() {
  const { data } = usePortfolio();

  const details = data.aboutDetails || [
    { label: 'Experience', value: '2.5+ years' },
    { label: 'Projects', value: '500+ videos' },
    { label: 'Tools', value: 'Premiere Pro & After Effects' },
    { label: 'Based in', value: 'Tamil Nadu · Remote' }
  ];

  return (
    <section className="section" id="about">
      <div className="shell">
        <div className="about">
          <div>
            <span className="eyebrow mono">A little about me</span>
            <h2>
              Good edits
              <br />
              leave a <em>trace.</em>
            </h2>
            <div className="about-copy">
              <p>
                Hi, I’m <strong>Karunyan</strong>, a passionate Video Editor &amp; Motion Designer with <strong>2.5+ years</strong> of professional experience in creating engaging and impactful visual content.
              </p>
              <p>
                Over the years, I’ve worked on <strong>500+ videos</strong>, covering short-form content, social media videos, promotional videos, podcasts, brand content, and motion graphics. I focus on turning raw footage and ideas into polished videos that capture attention and communicate the message clearly.
              </p>
              <p>
                I primarily work with <strong>Adobe Premiere Pro</strong> and <strong>After Effects</strong>, combining creative editing, motion graphics, sound design, transitions, and visual storytelling to create content that stands out.
              </p>
              <p>
                I’m always looking to learn, experiment, and create better visual experiences with every project.
              </p>
            </div>
          </div>

          <div className="about-details">
            {details.map((item, index) => (
              <div className="detail" key={index}>
                <span className="mono">{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
