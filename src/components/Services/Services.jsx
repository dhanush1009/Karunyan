import React, { useState, useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

const SERVICE_EXTRAS = [
  {
    badge: 'Visual FX & Motion',
    stats: '3D Camera · Keyframe Precision',
    deliverables: ['Kinetic Typography', '3D Camera Tracking', 'Custom Lower Thirds', 'Speed Ramping'],
    tools: ['After Effects', 'Cinema 4D'],
    timeline: [
      { name: 'Camera Null 3D', width: '65%', color: '#818cf8' },
      { name: 'Kinetic Type Pass', width: '85%', color: '#87e64b' },
      { name: 'Particle & Glow', width: '45%', color: '#f43f5e' },
      { name: 'Audio Hit Sync', width: '92%', color: '#34d399' },
    ],
    videoPreview: 'https://karunyan-portfolio-695100306138-ap-south-1-an.s3.ap-south-1.amazonaws.com/aws2/doted+intro.mp4'
  },
  {
    badge: 'Narrative Arc',
    stats: 'Retention Boost +45%',
    deliverables: ['Story Structure', 'Retention Curve', 'Emotional Peaks', 'Call-to-Action Flow'],
    tools: ['Script-to-Screen', 'Storyboarding'],
    timeline: [
      { name: '0-3s Hook', width: '30%', color: '#f59e0b' },
      { name: 'Plot Build-up', width: '60%', color: '#87e64b' },
      { name: 'Peak Climax', width: '85%', color: '#38bdf8' },
      { name: 'CTA & Resolution', width: '100%', color: '#ec4899' },
    ],
    videoPreview: 'https://karunyan-portfolio-695100306138-ap-south-1-an.s3.ap-south-1.amazonaws.com/aws2/Nishanth+Narayanan.mp4'
  },
  {
    badge: 'Commercial & B2B',
    stats: '4K Master · Pro Sound',
    deliverables: ['Brand Storytelling', 'Multi-Cam Interviews', 'Color Grading', 'Sound Design'],
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    timeline: [
      { name: 'B-Roll Overlay', width: '70%', color: '#38bdf8' },
      { name: 'A-Roll Interview', width: '95%', color: '#87e64b' },
      { name: 'Voiceover EQ', width: '90%', color: '#a855f7' },
      { name: 'Brand Stinger', width: '40%', color: '#fb923c' },
    ],
    videoPreview: 'https://karunyan-portfolio-695100306138-ap-south-1-an.s3.ap-south-1.amazonaws.com/aws2/Muthu.mp4'
  },
  {
    badge: 'Property Showcase',
    stats: 'Drone 4K · HDR Grade',
    deliverables: ['Cinematic Walkthrough', 'Drone Flow', 'Feature Callouts', 'Interior Grade'],
    tools: ['DaVinci Resolve', 'Premiere Pro'],
    timeline: [
      { name: 'Drone Flythrough', width: '80%', color: '#34d399' },
      { name: 'Interior Walk', width: '92%', color: '#87e64b' },
      { name: 'Property Titles', width: '60%', color: '#fbbf24' },
      { name: 'Ambient Audio', width: '88%', color: '#60a5fa' },
    ],
    videoPreview: 'https://karunyan-portfolio-695100306138-ap-south-1-an.s3.ap-south-1.amazonaws.com/aws2/VIP+housing+Realestate.mp4'
  },
  {
    badge: 'Event Highlights',
    stats: 'High Energy · Beat Sync',
    deliverables: ['Dynamic Recap', 'Beat-Sync Cuts', 'Speed Ramps', 'Crowd Energy SFX'],
    tools: ['Premiere Pro', 'After Effects'],
    timeline: [
      { name: 'Speed Ramp Pass', width: '85%', color: '#f43f5e' },
      { name: 'Key Highlights', width: '96%', color: '#87e64b' },
      { name: 'Bass Drop Sync', width: '75%', color: '#818cf8' },
      { name: 'Outro & Credits', width: '90%', color: '#06b6d4' },
    ],
    videoPreview: 'https://karunyan-portfolio-695100306138-ap-south-1-an.s3.ap-south-1.amazonaws.com/aws2/vikram+chennai+hackthon.mp4'
  }
];

export default function Services() {
  const { data } = usePortfolio();
  const [activeIndex, setActiveIndex] = useState(0);
  const [timecode, setTimecode] = useState('00:01:24:18');
  const videoRef = useRef(null);

  const services = (data.services && data.services.length > 0)
    ? data.services
    : [
        { number: '01', title: 'Video editing', description: 'Long-form, short-form, social, and everything in between.' },
        { number: '02', title: 'Story & structure', description: 'Finding the narrative thread inside your footage.' },
        { number: '03', title: 'Motion & type', description: 'Titles, transitions, and movement with a reason.' },
        { number: '04', title: 'Color & finishing', description: 'Building a visual world that feels like yours.' }
      ];

  const currentExtra = SERVICE_EXTRAS[activeIndex] || SERVICE_EXTRAS[0];
  const activeService = services[activeIndex] || services[0];

  // Dynamic timecode simulation for authentic NLE feel
  useEffect(() => {
    const timer = setInterval(() => {
      const frames = Math.floor(Math.random() * 24).toString().padStart(2, '0');
      const secs = (10 + (activeIndex * 8) + Math.floor(Math.random() * 5)).toString().padStart(2, '0');
      setTimecode(`00:01:${secs}:${frames}`);
    }, 450);
    return () => clearInterval(timer);
  }, [activeIndex]);

  // Restart video playback when active tab changes
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  }, [activeIndex]);

  return (
    <section className="section services-cinematic-section" id="services">
      <div className="shell">
        {/* Section Intro */}
        <div className="section-head services-header-compact">
          <div>
            <span className="eyebrow mono">
              <span className="live-dot" /> What I do &amp; craft
            </span>
            <h2>
              From first cut
              <br />
              to final <em>feeling.</em>
            </h2>
          </div>
          <p>
            Every edit starts with a question: what should this make someone feel?
            I build from there — finding the pace, the pause, and the details that make every frame resonate.
          </p>
        </div>

        {/* Split Cinematic Interactive System */}
        <div className="services-cinematic-split">
          
          {/* Left Column: Interactive Service Selector */}
          <div className="services-selector-pane">
            {services.map((service, index) => {
              const isActive = index === activeIndex;
              const extra = SERVICE_EXTRAS[index] || SERVICE_EXTRAS[0];

              return (
                <div
                  key={service.number || index}
                  className={`service-interactive-card ${isActive ? 'is-active' : ''}`}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isActive}
                  aria-label={`Select service: ${service.title}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveIndex(index);
                    }
                  }}
                >
                  <div className="service-card-top">
                    <span className="service-num-badge mono">{service.number}</span>
                    <span className="service-status-chip mono">
                      {isActive ? '● ACTIVE WORKSPACE' : extra.badge}
                    </span>
                  </div>

                  <div className="service-card-body">
                    <div className="service-title-row">
                      <h3 className="service-title">{service.title}</h3>
                      <span className="service-expand-icon">
                        {isActive ? '●' : '↗'}
                      </span>
                    </div>
                    <p className="service-description">{service.description}</p>
                  </div>

                  {/* Active Deliverables Chips */}
                  <div className="service-deliverables-pills">
                    {extra.deliverables.map((item, dIdx) => (
                      <span key={dIdx} className="deliverable-tag">
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* Active Indicator Bar */}
                  <div className="service-progress-indicator" />
                </div>
              );
            })}
          </div>

          {/* Right Column: High-Tech Video Suite Monitor */}
          <div className="services-monitor-pane">
            <div className="nle-monitor-chassis">
              
              {/* Monitor Top Status Bar */}
              <div className="nle-monitor-header">
                <div className="nle-header-left">
                  <span className="nle-traffic-dot red" />
                  <span className="nle-traffic-dot yellow" />
                  <span className="nle-traffic-dot green" />
                  <span className="nle-project-name mono">
                    PR_TIMELINE // {activeService.title.toUpperCase()}
                  </span>
                </div>
                <div className="nle-header-right mono">
                  <span className="nle-fps-pill">{currentExtra.stats}</span>
                  <span className="nle-timecode-badge">{timecode}</span>
                </div>
              </div>

              {/* Main Viewport Screen */}
              <div className="nle-viewport">
                {/* Background Video Ambience */}
                <video
                  ref={videoRef}
                  src={encodeURI(currentExtra.videoPreview)}
                  muted
                  loop
                  playsInline
                  autoPlay
                  className="nle-bg-video"
                />
                
                {/* Overlay Vignette and Grid Lines */}
                <div className="nle-screen-grid" />
                <div className="nle-corner-cross top-left" />
                <div className="nle-corner-cross top-right" />
                <div className="nle-corner-cross bottom-left" />
                <div className="nle-corner-cross bottom-right" />



                {/* Safe Frame Guides */}
                <div className="nle-safe-action-box" />
              </div>

              {/* Multi-Track NLE Timeline Visualizer */}
              <div className="nle-timeline-deck">
                <div className="nle-timeline-topbar mono">
                  <span>TIMELINE TRACKS</span>
                  <span>SNAPPING: ON · 23.976 FPS</span>
                </div>

                <div className="nle-tracks-container">
                  {currentExtra.timeline.map((track, tIdx) => (
                    <div key={tIdx} className="nle-track-row">
                      <span className="nle-track-label mono">{track.name}</span>
                      <div className="nle-track-channel">
                        <div
                          className="nle-track-clip"
                          style={{
                            width: track.width,
                            backgroundColor: track.color
                          }}
                        >
                          <span className="nle-clip-hash mono">///</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  {/* Dynamic Playhead Scrubber */}
                  <div className="nle-playhead-line" />
                </div>
              </div>

              {/* Monitor Footer with Audio Meters & Action */}
              <div className="nle-monitor-footer">
                <div className="nle-audio-meters">
                  <span className="mono nle-vu-label">L</span>
                  <div className="nle-vu-bar">
                    <div className="nle-vu-level l-level" />
                  </div>
                  <span className="mono nle-vu-label">R</span>
                  <div className="nle-vu-bar">
                    <div className="nle-vu-level r-level" />
                  </div>
                </div>

                <a href="#work" className="nle-cta-btn mono">
                  <span>View Selected Work</span>
                  <span>↓</span>
                </a>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
