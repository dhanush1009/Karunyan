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
            ? {
                width: 'min(440px, 92vw, calc((88vh - 70px) * 9 / 16))',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#080c14',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                position: 'relative'
              }
            : {
                width: 'min(940px, 95vw, calc((82vh - 70px) * 16 / 9))',
                maxHeight: '92vh',
                display: 'flex',
                flexDirection: 'column',
                background: '#080c14',
                border: '1px solid rgba(255, 255, 255, 0.14)',
                position: 'relative'
              }
        }
      >
        {/* Floating Top-Right Close Button */}
        <button
          type="button"
          className="modal-close-corner-btn"
          onClick={closeVideoModal}
          aria-label="Close modal"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#ffffff',
            fontSize: '15px',
            lineHeight: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: 0
          }}
        >
          ✕
        </button>

        {directVideo ? (
          <div
            className="modal-player"
            style={{
              width: '100%',
              aspectRatio: isVertical ? '9/16' : '16/9',
              background: '#000000',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}
          >
            <video
              src={activeModal.video ? encodeURI(activeModal.video) : undefined}
              controls
              autoPlay
              playsInline
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                backgroundColor: '#000000',
                display: 'block'
              }}
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

        <div
          className="modal-bottom"
          style={{
            background: '#0c111a',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            padding: isVertical ? '14px 16px' : '16px 22px',
            display: 'flex',
            flexDirection: isVertical ? 'column' : 'row',
            alignItems: isVertical ? 'stretch' : 'center',
            justifyContent: 'space-between',
            gap: isVertical ? '12px' : '16px'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', minWidth: 0 }}>
            <span
              style={{
                color: '#ffffff',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '-0.01em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {activeModal.title || 'Selected film'}
            </span>
            <span
              style={{
                color: 'rgba(255, 255, 255, 0.65)',
                fontSize: '12px',
                fontWeight: 500,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {activeModal.meta || 'Selected project'}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              gap: '10px',
              flexShrink: 0,
              width: isVertical ? '100%' : 'auto'
            }}
          >
            <button
              ref={closeButtonRef}
              type="button"
              className="modal-action-btn modal-btn-close"
              onClick={closeVideoModal}
              style={{
                flex: isVertical ? 1 : 'none',
                padding: '10px 18px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none'
              }}
            >
              Close
            </button>
            {activeModal.video && (
              <a
                className="modal-action-btn modal-btn-open"
                href={encodeURI(activeModal.video)}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: isVertical ? 1 : 'none',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  background: 'var(--accent, #87e64b)',
                  border: '1px solid var(--accent, #87e64b)',
                  color: '#080c14',
                  fontSize: '13px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  textDecoration: 'none'
                }}
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
