"use client"
import React, { useState, useEffect } from 'react'

export default function ProductGallery({ images, productName, fallbackLink }: any) {
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const count = images?.length || 0;

  // How much bigger the image gets when zoomed in the popup
  const ZOOM_LEVEL = 2.5;

  // While the popup is open: Escape closes it, left/right arrow keys change
  // the image, and the page behind it can't scroll.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
      if (e.key === 'ArrowLeft' && count > 1) setIndex(i => (i - 1 + count) % count);
      if (e.key === 'ArrowRight' && count > 1) setIndex(i => (i + 1) % count);
    };
    window.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, count]);

  // Zoom resets whenever the image changes or the popup opens/closes
  useEffect(() => {
    setZoomed(false);
    setOrigin({ x: 50, y: 50 });
  }, [index, isOpen]);

  if (!images || images.length === 0) return <div className="p-10 bg-gray-50 rounded-2xl">No Image</div>;

  const activeImage = images[index];
  const activeLink = (activeImage.amazonLink && activeImage.amazonLink !== "") 
    ? activeImage.amazonLink 
    : fallbackLink;

  const mainSrc = `/images/${activeImage.url.replace(/^\//, '')}`;

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex(i => (i + 1) % images.length);
  };

  // Works out which spot of the image the mouse or finger is over, so the
  // zoom follows it
  const updateOrigin = (clientX: number, clientY: number, el: HTMLElement) => {
    const rect = el.getBoundingClientRect();
    const x = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    const y = Math.min(100, Math.max(0, ((clientY - rect.top) / rect.height) * 100));
    setOrigin({ x, y });
  };

  const handleZoomClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (zoomed) {
      setZoomed(false);
    } else {
      updateOrigin(e.clientX, e.clientY, e.currentTarget);
      setZoomed(true);
    }
  };

  const handleZoomMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (zoomed) updateOrigin(e.clientX, e.clientY, e.currentTarget);
  };

  const handleZoomTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (zoomed && e.touches[0]) {
      updateOrigin(e.touches[0].clientX, e.touches[0].clientY, e.currentTarget);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="group relative aspect-[2/3] w-full overflow-hidden rounded-3xl border border-pink-50 bg-gray-50 shadow-2xl">
        {/* Clicking the main image opens the enlarged popup */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Enlarge image"
          className="block w-full h-full cursor-zoom-in"
        >
          <img 
            src={mainSrc} 
            alt={activeImage.alt || productName} 
            className="w-full h-full object-contain transition-transform duration-700 ease-in-out group-hover:scale-105"
          />
        </button>

        {/* Magnifying glass icon so shoppers (especially on phones) know they can enlarge */}
        <div className="pointer-events-none absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center bg-white/80 rounded-full shadow-md border border-pink-100">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
               stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
               className="w-5 h-5">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
            <line x1="11" y1="8" x2="11" y2="14" />
            <line x1="8" y1="11" x2="14" y2="11" />
          </svg>
        </div>

        {/* Amazon link now lives on the "Shop on Amazon" badge itself */}
        {activeLink && (
          <a
            href={activeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 px-4 py-2 rounded-full shadow-lg"
          >
            <span className="text-black text-xs font-bold uppercase tracking-widest">Shop on Amazon</span>
          </a>
        )}

        {/* Prev / Next arrows — only render when there's more than one image */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         bg-white/80 hover:bg-white
                         rounded-full shadow-md
                         transition-all duration-200 hover:scale-110
                         border border-pink-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-5 h-5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10
                         w-10 h-10 flex items-center justify-center
                         bg-white/80 hover:bg-white
                         rounded-full shadow-md
                         transition-all duration-200 hover:scale-110
                         border border-pink-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                   stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                   className="w-5 h-5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
              {images.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIndex(i); }}
                  aria-label={`Go to image ${i + 1}`}
                  className={`rounded-full transition-all duration-200 ${
                    i === index
                      ? 'w-5 h-2 bg-[#db2777]'
                      : 'w-2 h-2 bg-white/70 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {images.map((img: any, i: number) => {
          const thumbSrc = `/images/${img.url.replace(/^\//, '')}`;
          return (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden border-2 transition-all ${
                index === i ? 'border-[#db2777] ring-4 ring-pink-50' : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={thumbSrc} alt={img.alt || productName} className="w-full h-full object-cover" />
            </button>
          );
        })}
      </div>

      {/* ─── Enlarged image popup ─────────────────────────────────────────── */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${productName} images`}
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-12"
        >
          {/* Zoom (magnifying glass) button, next to the X */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setOrigin({ x: 50, y: 50 }); setZoomed(z => !z); }}
            aria-label={zoomed ? "Zoom out" : "Zoom in"}
            className="absolute top-4 right-20 z-10 w-12 h-12 flex items-center justify-center
                       bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                 className="w-6 h-6">
              <circle cx="11" cy="11" r="7" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
              <line x1="8" y1="11" x2="14" y2="11" />
              {!zoomed && <line x1="11" y1="8" x2="11" y2="14" />}
            </svg>
          </button>

          {/* Close (X) button */}
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setIsOpen(false); }}
            aria-label="Close"
            className="absolute top-4 right-4 z-10 w-12 h-12 flex items-center justify-center
                       bg-white/90 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                 stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                 className="w-6 h-6">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* The enlarged image. Click to zoom in at that spot, move to look
              around, click again to zoom back out. */}
          <div
            onClick={handleZoomClick}
            onMouseMove={handleZoomMove}
            onTouchMove={handleZoomTouchMove}
            className={`relative overflow-hidden rounded-lg ${zoomed ? 'cursor-zoom-out touch-none' : 'cursor-zoom-in'}`}
          >
            <img
              src={mainSrc}
              alt={activeImage.alt || productName}
              draggable={false}
              style={{
                transform: zoomed ? `scale(${ZOOM_LEVEL})` : 'scale(1)',
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              className="block object-contain select-none transition-transform duration-300
                         max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]
                         md:max-w-[calc(100vw-6rem)] md:max-h-[calc(100vh-6rem)]"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                aria-label="Previous image"
                className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-10
                           w-12 h-12 flex items-center justify-center
                           bg-white/90 hover:bg-white rounded-full shadow-lg
                           transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                     className="w-6 h-6">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={next}
                aria-label="Next image"
                className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-10
                           w-12 h-12 flex items-center justify-center
                           bg-white/90 hover:bg-white rounded-full shadow-lg
                           transition-all duration-200 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                     stroke="#db2777" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                     className="w-6 h-6">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Image counter, e.g. "2 / 5" */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm font-bold tracking-widest">
                {index + 1} / {images.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
