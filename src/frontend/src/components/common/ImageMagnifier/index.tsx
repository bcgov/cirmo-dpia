import React, { useState, useEffect } from 'react';
import { ImageMagnifierProps, ImagePosition } from './interfaces';
import Plus from '../../../assets/plus.svg';
import Minus from '../../../assets/minus.svg';
import Close from '../../../assets/close.svg';

const ImageMagnifier = ({ src, alt }: ImageMagnifierProps) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
  });

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setZoomLevel(1);
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

  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomAdjustment = e.deltaY * 0.01;
    const newZoomLevel = zoomAdjustment < 0 ? zoomLevel * 1.1 : zoomLevel * 0.9;
    setZoomLevel(Math.min(Math.max(newZoomLevel, 1), 5));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    setIsDragging(true);
    setStartDragPosition({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - startDragPosition.x,
        y: e.clientY - startDragPosition.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let offsetX = position.x;
      let offsetY = position.y;
      const movementAmount = 10; // Adjust as needed for panning speed
      const zoomAmount = 0.1; // Adjust as needed for zoom speed

      switch (event.key) {
        case 'ArrowUp':
          if (event.shiftKey) {
            // Zoom in
            setZoomLevel((prevZoom) => Math.min(prevZoom + zoomAmount, 5));
          } else {
            // Pan up
            offsetY += movementAmount;
          }
          break;
        case 'ArrowDown':
          if (event.shiftKey) {
            // Zoom out
            setZoomLevel((prevZoom) => Math.max(prevZoom - zoomAmount, 1));
          } else {
            // Pan down
            offsetY -= movementAmount;
          }
          break;
        case 'ArrowLeft':
          // Pan left
          offsetX += movementAmount;
          break;
        case 'ArrowRight':
          // Pan right
          offsetX -= movementAmount;
          break;
        default:
          break;
      }

      setPosition({ x: offsetX, y: offsetY });
    };

    window.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomLevel, position]);

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
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onWheel={handleScroll}
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
                    title="Zoom Out"
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
                    title="Zoom In"
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
                  title="Close"
                />
              </button>
            </div>
            <div className="nextSteps-image-container">
              <img
                className="nextSteps-zoomable-image"
                src={src}
                alt={alt}
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  transition: 'transform 0.2s',
                  transformOrigin: 'center',
                  userSelect: 'none',
                  pointerEvents: isDragging ? 'none' : 'auto',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageMagnifier;
