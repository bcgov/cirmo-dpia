import React, { useState } from 'react';
import { ImageMagnifierProps } from './interfaces';

const ImageMagnifier = ({ src, alt }: ImageMagnifierProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handleScroll = (e: React.WheelEvent<HTMLImageElement>) => {
    const zoomAdjustment = e.deltaY * -0.01;
    setZoomLevel((prevZoom) =>
      Math.min(Math.max(prevZoom + zoomAdjustment, 1), 3),
    );
  };

  return (
    <>
      <img
        className="rounded mx-auto d-block infographic-diagram"
        src={src}
        alt={alt}
        onClick={openModal}
      />
      {modalOpen && (
        <div className="nextSteps-modal-overlay" onClick={closeModal}>
          <div
            className="nextSteps-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="nextSteps-close-button" onClick={closeModal}>
              X
            </button>
            <img
              className="nextSteps-zoomable-image"
              src={src}
              alt={alt}
              onWheel={handleScroll}
              style={{ transform: `scale(${zoomLevel})` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageMagnifier;
