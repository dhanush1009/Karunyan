import React, { useRef, useEffect } from 'react';
import { usePortfolio } from '../../context/PortfolioContext';
import { toEmbed, isDirectVideo } from '../../utils/videoUtils';

export default function VideoModal() {
  const { activeModal, closeVideoModal } = usePortfolio();
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (activeModal.isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [activeModal.isOpen]);

  if (!activeModal.isOpen) return null;

  const directVideo = isDirectVideo(activeModal.video);
  const embedUrl = !directVideo ? toEmbed(activeModal.video) : null;
  const isVertical = activeModal.orientation === 'vertical';

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeVideoModal();
    }
  };

  return (
    <div
      className="modal open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={handleBackdropClick}
    >
      <div
        className="modal-card"
        style={
          isVertical
            ? { width: 'min(480px, 92vw)', maxHeight: '92vh', display: 'flex', flexDirection: 'column' }
            : { width: 'min(860px, 95vw)' }
        }
      >
        {directVideo ? (
          <div
            className="modal-player"
            style={{
              aspectRatio: isVertical ? '9/16' : '16/9',
              maxHeight: isVertical ? '72vh' : '65vh',
              background: '#050608',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <video
              src={activeModal.video ? encodeURI(activeModal.video) : undefined}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        ) : embedUrl ? (
          <div className="modal-player">
            <iframe
              src={embedUrl}
              title={activeModal.title}
              allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="modal-video">
            <div>
              <div className="play-ring">▶</div>
              <h3 id="modalTitle">{activeModal.title || 'Your film goes here.'}</h3>
              <p>{activeModal.text || 'Add a Vimeo or YouTube link to make this project playable.'}</p>
            </div>
          </div>
        )}

        <div className="modal-bottom">
          <span>{activeModal.meta || 'Selected project'}</span>
          <div style={{ display: 'flex', gap: '9px' }}>
            <button
              ref={closeButtonRef}
              className="button button-ghost"
              onClick={closeVideoModal}
            >
              Close
            </button>
            {activeModal.video && (
              <a
                className="button button-primary"
                href={encodeURI(activeModal.video)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open film ↗
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
