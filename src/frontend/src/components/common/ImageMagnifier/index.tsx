import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ImageMagnifierProps, ImagePosition } from './interfaces';
import { Tooltip } from '../Tooltip';
import { ImageMagnifierTooltipText } from './messages';
import Plus from '../../../assets/plus.svg';
import Minus from '../../../assets/minus.svg';
import Close from '../../../assets/close.svg';

const ImageMagnifier = ({ src, alt }: ImageMagnifierProps) => {
  // State declarations for modal visibility, zoom level, image position, and drag status
  const [modalOpen, setModalOpen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [position, setPosition] = useState<ImagePosition>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startDragPosition, setStartDragPosition] = useState<ImagePosition>({
    x: 0,
    y: 0,
  });

  // Refs for the container and image elements
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Ref for tracking the drag position
  const dragPosition = useRef({ x: 0, y: 0 });

  // useCallback to update the position of the image within the bounds of the container
  const updatePositionWithinBounds = useCallback(
    (newX: number, newY: number) => {
      // Ensure refs are current before calculating bounds
      if (containerRef.current && imageRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const imageRect = imageRef.current.getBoundingClientRect();

        // Adjust the bounds based on the zoom level
        const scaledWidth = imageRect.width * zoomLevel;
        const scaledHeight = imageRect.height * zoomLevel;

        // Calculate the maximum movement allowed (taking zoom into account)
        const maxX = Math.max(0, (scaledWidth - containerRect.width) / 6);
        const maxY = Math.max(0, (scaledHeight - containerRect.height) / 6);

        // Apply the bounds to ensure image stays within the container
        const boundedX = Math.min(maxX, Math.max(-maxX, newX));
        const boundedY = Math.min(maxY, Math.max(-maxY, newY));

        // Update the local drag position
        dragPosition.current = { x: boundedX, y: boundedY };
      }
    },
    [zoomLevel],
  );

  // Functions to handle modal open and close actions
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

  // Functions to handle zoom in and zoom out actions
  const zoomIn = () => {
    setZoomLevel((prevZoom) => Math.min(prevZoom * 1.1, 5));
  };

  const zoomOut = () => {
    setZoomLevel((prevZoom) => {
      const newZoomLevel = Math.max(prevZoom * 0.9, 1);
      // Reset position and drag position if zoomed out completely
      if (newZoomLevel === 1) {
        setPosition({ x: 0, y: 0 });
        dragPosition.current = { x: 0, y: 0 };
      }
      return newZoomLevel;
    });
  };

  // Handle scroll events for zoom adjustments
  const handleScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const zoomAdjustment = e.deltaY * 0.01;
    const newZoomLevel = zoomAdjustment < 0 ? zoomLevel * 1.1 : zoomLevel * 0.9;
    setZoomLevel(Math.min(Math.max(newZoomLevel, 1), 5));
  };

  const handleMouseUp = () => {
    // End dragging and update the position state
    setIsDragging(false);
    setPosition(dragPosition.current);
  };

  // Handlers for mouse down, move, up, and leave events to manage image dragging
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

      // Apply transformation to the image element
      if (imageRef.current) {
        imageRef.current.style.transform = `scale(${zoomLevel}) translate(${dragPosition.current.x}px, ${dragPosition.current.y}px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    // Stop dragging if the mouse leaves the container
    if (isDragging) {
      setIsDragging(false);
    }
  };

  // Function to open the modal when the image is clicked using the keyboard
  const handleImageKeyDown = (event: React.KeyboardEvent<HTMLImageElement>) => {
    if (event.key === 'Enter') {
      openModal();
    }
  };

  // useEffect to reset the body overflow when the component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // useEffect to handle keyboard interactions
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Calculate new position based on arrow key presses
      let offsetX = position.x;
      let offsetY = position.y;
      const movementAmount = 10; // Amount to move the image per key press
      const zoomAmount = 0.1; // Zoom factor per key press

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
          return; // Ignore other keys
      }

      if (event.shiftKey) {
        // Adjust zoom level with shift + arrow keys
        const newZoomLevel =
          event.key === 'ArrowUp'
            ? Math.min(zoomLevel + zoomAmount, 5)
            : Math.max(zoomLevel - zoomAmount, 1);

        // Reset position if zoom is completely out
        if (newZoomLevel === 1 && event.key === 'ArrowDown') {
          setPosition({ x: 0, y: 0 });
          dragPosition.current = { x: 0, y: 0 };
        }

        setZoomLevel(newZoomLevel);
      } else {
        // Update position within bounds
        updatePositionWithinBounds(offsetX, offsetY);
        setPosition(dragPosition.current);
      }
    };

    // Add and remove the event listener based on the modal state
    if (modalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [modalOpen, zoomLevel, position, updatePositionWithinBounds]);

  // Render the image and modal with control buttons
  return (
    <>
      <img
        className="rounded mx-auto d-block infographic-diagram"
        src={src}
        alt={alt}
        onClick={openModal}
        tabIndex={0}
        onKeyDown={handleImageKeyDown}
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
            {/* Toolbar with zoom and close buttons */}
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
              <div className="nextSteps-tooltip-close">
                <div className="nextSteps-tooltip">
                  <Tooltip
                    content={ImageMagnifierTooltipText}
                    direction="bottom"
                    showIcon={true}
                    color="#ffffff"
                    size="lg"
                  />
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
            </div>
            {/* Image container for the magnified image */}
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
