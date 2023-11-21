import React, { useState, useEffect } from 'react';
import { ImageMagnifierProps } from './interfaces';
import Plus from '../../../assets/plus.svg';
import Minus from '../../../assets/minus.svg';
import Close from '../../../assets/close.svg';

const ImageMagnifier = ({ src, alt }: ImageMagnifierProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setModalOpen(false);
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom * 1.1, 5));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => Math.max(prevZoom * 0.9, 1));
  };

  const handleScroll = (e: React.WheelEvent<HTMLImageElement>) => {
    e.preventDefault();
    const zoomAdjustment = e.deltaY * 0.01;
    const newZoomLevel = zoomAdjustment < 0 ? zoomLevel * 1.1 : zoomLevel * 0.9;
    setZoomLevel(Math.min(Math.max(newZoomLevel, 1), 5));
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
            <div className="nextSteps-toolbar">
              <div className="nextSteps-toolbar-zoom">
                <button
                  className="nextSteps-zoom-out"
                  onClick={zoomOut}
                  aria-label="Zoom Out"
                >
                  <img
                    className="nextSteps-toolbar-button"
                    src={Minus}
                    alt="Zoom Out"
                  />
                </button>
                <button
                  className="nextSteps-zoom-in"
                  onClick={zoomIn}
                  aria-label="Zoom In"
                >
                  <img
                    className="nextSteps-toolbar-button"
                    src={Plus}
                    alt="Zoom In"
                  />
                </button>
              </div>
              <button
                className="nextSteps-close-button"
                onClick={closeModal}
                aria-label="Close Modal"
              >
                <img
                  className="nextSteps-toolbar-button"
                  src={Close}
                  alt="Close"
                />
              </button>
            </div>
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
