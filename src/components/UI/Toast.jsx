import React from 'react';
import { usePortfolio } from '../../context/PortfolioContext';

export default function Toast() {
  const { toastMessage } = usePortfolio();

  return (
    <div
      className={`toast ${toastMessage.visible ? 'show' : ''}`}
      role="status"
      aria-live="polite"
    >
      {toastMessage.text}
    </div>
  );
}
