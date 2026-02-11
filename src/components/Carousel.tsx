import React, { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';

interface CarouselProps {
  images: string[];
  className?: string;
  theme?: 'green' | 'yellow';

}

const Carousel: React.FC<PropsWithChildren<CarouselProps>> = ({ images, className = '', theme = 'green' }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set());

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Theme colors
  const themeColors = {
    green: {
      arrow: '#059669',
      border: 'border-green-200',
      dotActive: 'bg-green-600',
      dotInactive: 'bg-green-200'
    },
    yellow: {
      arrow: '#D97706',
      border: 'border-yellow-200',
      dotActive: 'bg-yellow-600',
      dotInactive: 'bg-yellow-200'
    }
  };

  const colors = themeColors[theme];

  // Handle image loading errors
  const handleImageError = useCallback((index: number) => {
    setImageErrors(prev => new Set(prev).add(index));
  }, []);

  // Get fallback image based on theme
  const getFallbackImage = useCallback(() => {
    const color = theme === 'yellow' ? 'FFD700' : '10B981';
    return `https://via.placeholder.com/300x200/${color}/000000?text=No+Image`;
  }, [theme]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); };
  }, [emblaApi]);

  // Auto-scroll every 10 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      const nextIndex = (selectedIndex + 1) % images.length;
      emblaApi.scrollTo(nextIndex);
    }, 10000); // 10 seconds
    return () => clearInterval(interval);
  }, [emblaApi, selectedIndex, images.length]);

  return (
    <div className={`embla ${className} relative`}>
      {/* Arrow Buttons - Outside the image */}
      {images.length > 1 && (
        <>
          <button
            className={`absolute -left-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border ${colors.border} flex items-center justify-center transition-all duration-200`}
            style={{ minWidth: 40, minHeight: 40 }}
            onClick={scrollPrev}
            aria-label="Previous slide"
            type="button"
          >
            {/* Left Arrow SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 15L8 10L13 5" stroke={colors.arrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            className={`absolute -right-8 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg border ${colors.border} flex items-center justify-center transition-all duration-200`}
            style={{ minWidth: 40, minHeight: 40 }}
            onClick={scrollNext}
            aria-label="Next slide"
            type="button"
          >
            {/* Right Arrow SVG */}
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 5L12 10L7 15" stroke={colors.arrow} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {images.map((src, idx) => (
            <div className="embla__slide flex items-center justify-center" key={idx}>
              <img
                src={src}
                alt={`carousel slide ${idx + 1}`}
                width={1920}
                height={1080}
                loading={idx === 0 ? "eager" : "lazy"}
                decoding="async"
                className="w-auto h-auto object-contain mx-auto"
                style={{
                  maxHeight: '400px',
                  background: 'transparent',
                  mixBlendMode: 'multiply',
                  filter: 'brightness(1.1) contrast(1.1)',
                  opacity: '0.95'
                }}
                onError={() => handleImageError(idx)}
                onLoad={() => {
                  // Remove from error set if image loads successfully after error
                  if (imageErrors.has(idx)) {
                    setImageErrors(prev => {
                      const newSet = new Set(prev);
                      newSet.delete(idx);
                      return newSet;
                    });
                  }
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            className={`
              w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-colors duration-200
              ${selectedIndex === idx ? colors.dotActive : colors.dotInactive}
            `}
            onClick={() => scrollTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
      <style>{`
        .embla { position: relative; height: 100%; }
        .embla__viewport { overflow: hidden; width: 100%; height: 100%; }
        .embla__container { display: flex; height: 100%; align-items: center; }
        .embla__slide { flex: 0 0 100%; min-width: 0; height: 100%; display: flex; align-items: center; justify-content: center; padding: 0 2rem; }
      `}</style>
    </div>
  );
};

export default Carousel;
