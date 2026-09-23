import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import VideoCarousel from './VideoCarousel';

export default function Work() {
  const { data } = usePortfolio();

  const horizontalVideos = data.horizontalVideos || [];
  const verticalVideos = data.verticalVideos || [];

  return (
    <section className="section" id="work">
      <div className="shell">
        <div className="section-head">
          <div>
            <span className="eyebrow mono">Selected work</span>
            <h2>
              Frames with
              <br />
              <em>something to say.</em>
            </h2>
          </div>
          <p>
            Explore cinematic edits across horizontal narrative films and
            high-impact vertical reels. All videos browse smoothly in carousel mode.
          </p>
        </div>

        {/* LINE 1: Horizontal Video Carousel (16:9 Widescreen) */}
        <div className="work-carousel-line">
          <VideoCarousel
            videos={horizontalVideos}
            variant="horizontal"
            label="Line 01 — Horizontal Films & Commercials (16:9)"
            description="Cinematic widescreen cuts, real estate showcases, brand narratives, and motion design."
          />
        </div>

        {/* LINE 2: Vertical Video Carousel (9:16 Mobile & Reels) */}
        <div className="work-carousel-line" style={{ marginTop: '70px' }}>
          <VideoCarousel
            videos={verticalVideos}
            variant="vertical"
            label="Line 02 — Vertical Reels & Shorts (9:16)"
            description="High-impact mobile stories, apparel promos, lifestyle lookbooks, and ad campaigns."
          />
        </div>
      </div>
    </section>
  );
}
