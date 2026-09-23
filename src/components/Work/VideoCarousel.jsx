import React, { useRef, useState, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { isDirectVideo, toEmbed } from '../../utils/videoUtils';

export default function VideoCarousel({
  videos = [],
  variant = 'horizontal',
  label = '',
  description = ''
}) {
  const { openVideoModal } = usePortfolio();
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isVertical = variant === 'vertical';

  const checkScroll = () => {
    if (trackRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = trackRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

      // Estimate current card index
      const cardWidth = isVertical ? 320 + 24 : clientWidth * 0.9;
      const index = Math.min(
        videos.length - 1,
        Math.max(0, Math.round(scrollLeft / cardWidth))
      );
      setCurrentIndex(index);
    }
  };

  useEffect(() => {
    checkScroll();
    const track = trackRef.current;
    if (track) {
      track.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
      return () => {
        track.removeEventListener('scroll', checkScroll);
        window.removeEventListener('resize', checkScroll);
      };
    }
  }, [videos, isVertical]);

  const scroll = (direction) => {
    if (trackRef.current) {
      const scrollAmount = isVertical
        ? trackRef.current.clientWidth * 0.75
        : trackRef.current.clientWidth * 0.95;
      trackRef.current.scrollBy({
        left: direction === 'next' ? scrollAmount : -scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleCardClick = (item) => {
    const videoUrl = item.video;
    const isEmbeddable = Boolean(toEmbed(videoUrl));
    const directVideo = isDirectVideo(videoUrl);

    openVideoModal({
      title: item.title,
      meta: [item.type, item.year].filter(Boolean).join(' · ') || item.title,
      text: videoUrl
        ? directVideo || isEmbeddable
          ? ''
          : 'This external film opens in a new tab.'
        : 'Add a video URL to play this project.',
      video: videoUrl,
      orientation: isVertical ? 'vertical' : 'horizontal'
    });
  };

  return (
    <div className={`carousel-section ${isVertical ? 'vertical-carousel' : 'horizontal-carousel'}`}>
      {/* Header bar with title and navigation chevrons */}
      <div className="carousel-top-bar">
        <div>
          {label && <span className="mono line-label">{label}</span>}
          {description && <p className="carousel-subtext">{description}</p>}
        </div>

        <div className="carousel-controls">
          <span className="carousel-counter mono">
            {String(currentIndex + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
          </span>
          <button
            className={`carousel-nav-btn ${!canScrollLeft ? 'disabled' : ''}`}
            onClick={() => scroll('prev')}
            disabled={!canScrollLeft}
            aria-label="Previous videos"
          >
            ‹
          </button>
          <button
            className={`carousel-nav-btn ${!canScrollRight ? 'disabled' : ''}`}
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
            aria-label="Next videos"
          >
            ›
          </button>
        </div>
      </div>

      {/* Scrollable Track */}
      <div
        ref={trackRef}
        className={`carousel-track ${isVertical ? 'vertical-track' : 'horizontal-track'}`}
      >
        {videos.map((item, idx) => (
          <CarouselCard
            key={item.id || idx}
            item={item}
            isVertical={isVertical}
            onClick={() => handleCardClick(item)}
          />
        ))}
      </div>
    </div>
  );
}

function CarouselCard({ item, isVertical, onClick }) {
  const videoRef = useRef(null);
  const directVideo = isDirectVideo(item.video);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <article
      className={`carousel-card ${isVertical ? 'card-vertical' : 'card-horizontal'}`}
      tabIndex={0}
      role="button"
      aria-label={`Play: ${item.title}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {/* Video Preview */}
      {directVideo ? (
        <video
          ref={videoRef}
          src={item.video ? encodeURI(item.video) : undefined}
          muted
          loop
          playsInline
          preload="metadata"
          poster={item.image}
          className="carousel-video-media"
        />
      ) : (
        <div
          className="carousel-image-media"
          style={{ backgroundImage: `url("${item.image}")` }}
        />
      )}

      {/* Centered Glowing Play Indicator */}
      <div className="play-indicator-badge">▶</div>

      {/* Bottom Info Overlay */}
      <div className="carousel-card-content">
        <div>
          {(item.type || item.year) && (
            <div className="project-meta">
              {[item.type, item.year].filter(Boolean).join(' · ')}
            </div>
          )}
          <h3 className="project-title">{item.title}</h3>
        </div>
        <button
          className="project-arrow"
          aria-label={`Play ${item.title}`}
          tabIndex={-1}
        >
          ↗
        </button>
      </div>
    </article>
  );
}
