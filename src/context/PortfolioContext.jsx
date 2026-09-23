import React, { createContext, useContext, useState, useEffect } from 'react';
import { defaultData } from '../data/defaultData';

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [data, setData] = useState(defaultData);

  const [activeModal, setActiveModal] = useState({
    isOpen: false,
    title: '',
    meta: '',
    text: '',
    video: '',
    orientation: 'horizontal'
  });

  const [toastMessage, setToastMessage] = useState({ visible: false, text: '' });

  // Update document title dynamically
  useEffect(() => {
    document.title = `${data.name} — ${data.role || 'Video Editor'}`;
  }, [data.name, data.role]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeModal.isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeModal.isOpen]);

  // Handle ESC key globally
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeVideoModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const showToast = (text) => {
    setToastMessage({ visible: true, text });
    setTimeout(() => {
      setToastMessage({ visible: false, text: '' });
    }, 2500);
  };

  const openVideoModal = ({ title, meta, text, video, orientation = 'horizontal' }) => {
    setActiveModal({
      isOpen: true,
      title: title || 'Project Film',
      meta: meta || '',
      text: text || '',
      video: video || '',
      orientation
    });
  };

  const closeVideoModal = () => {
    setActiveModal(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <PortfolioContext.Provider
      value={{
        data,
        activeModal,
        openVideoModal,
        closeVideoModal,
        toastMessage,
        showToast
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}
