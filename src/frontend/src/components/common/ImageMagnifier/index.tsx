import React, { useState, useEffect, useRef, useCallback } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const dragPosition = useRef({ x: 0, y: 0 });

  const updatePositionWithinBounds = useCallback(
    (newX: number, newY: number) => {
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();

        // Adjust the bounds based on the zoom level
        const scaledWidth = imageRect.width * zoomLevel;
        const scaledHeight = imageRect.height * zoomLevel;

        // Calculate the maximum movement allowed (taking zoom into account)
        const maxX = Math.max(0, (scaledWidth - containerRect.width) / 6);
        const maxY = Math.max(0, (scaledHeight - containerRect.height) / 6);

        // Apply the bounds
        const boundedX = Math.min(maxX, Math.max(-maxX, newX));
        const boundedY = Math.min(maxY, Math.max(-maxY, newY));

        // Update the local drag position
        dragPosition.current = { x: boundedX, y: boundedY };
      }
    },
    [zoomLevel],
  );

  const openModal = () => {
    document.body.style.overflow = 'hidden';
    setModalOpen(true);
  };

  const closeModal = () => {
    document.body.style.overflow = 'unset';
    setZoomLevel(1);
    setPosition({ x: 0, y: 0 });
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
    setZoomLevel((prevZoom) => {
      const newZoomLevel = Math.max(prevZoom * 0.9, 1);
      if (newZoomLevel === 1) {
        setPosition({ x: 0, y: 0 });
        dragPosition.current = { x: 0, y: 0 };
      }
      return newZoomLevel;
    });
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

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (isDragging) {
      const newX = event.clientX - startDragPosition.x;
      const newY = event.clientY - startDragPosition.y;
      updatePositionWithinBounds(newX, newY);

      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${zoomLevel}) translate(${dragPosition.current.x}px, ${dragPosition.current.y}px)`;
      }
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setPosition(dragPosition.current);
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
      const movementAmount = 10;
      const zoomAmount = 0.1;

      switch (event.key) {
        case 'ArrowUp':
          offsetY += event.shiftKey ? 0 : movementAmount;
          break;
        case 'ArrowDown':
          offsetY -= event.shiftKey ? 0 : movementAmount;
          break;
        case 'ArrowLeft':
          offsetX += movementAmount;
          break;
        case 'ArrowRight':
          offsetX -= movementAmount;
          break;
        default:
          return;
      }

      if (event.shiftKey) {
        // Zoom in or out
        const newZoomLevel =
          event.key === 'ArrowUp'
            ? Math.min(zoomLevel + zoomAmount, 5)
            : Math.max(zoomLevel - zoomAmount, 1);
        setZoomLevel(newZoomLevel);
      } else {
        // Update position within bounds
        updatePositionWithinBounds(offsetX, offsetY);
        setPosition(dragPosition.current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [zoomLevel, position, updatePositionWithinBounds]);

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
            ref={containerRef}
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
                  className="nextSteps-zoom-out-button"
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
                  className="nextSteps-zoom-in-button"
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
                ref={imageRef}
                className="nextSteps-zoomable-image"
                src={src}
                alt={alt}
                style={{
                  cursor: isDragging ? 'grabbing' : 'grab',
                  transform: `scale(${zoomLevel}) translate(${position.x}px, ${position.y}px)`,
                  transition: isDragging ? 'none' : 'transform 0.2s',
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
