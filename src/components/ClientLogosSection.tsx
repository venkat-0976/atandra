import React, { useEffect, useMemo, useCallback, useState } from "react";
import { motion, useAnimation } from "framer-motion";

// Enhanced type definitions
interface ClientLogosSectionProps {
  isInView?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

interface ClientLogo {
  readonly name: string;
  readonly logo: string;
  readonly alt?: string;
}

interface CarouselRowProps {
  logos: readonly ClientLogo[];
  direction: 'left' | 'right';
  rowIndex: number;
  pauseOnHover: boolean;
  speed: number;
}

// Custom hook for intersection observer
const useIntersectionObserver = (threshold = 0.1) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return { ref, isVisible };
};

// Custom hook for animation controls
const useAnimationControls = (isInView: boolean) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);

  return controls;
};

// Compact logo component with original colors
const LogoItem = React.memo<{
  client: ClientLogo;
  index: number;
  rowIndex: number;
  isDuplicate?: boolean;
}>(({ client, index, rowIndex, isDuplicate = false }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = useCallback(() => {
    setImageLoaded(true);
  }, []);

  const handleImageError = useCallback(() => {
    setImageError(true);
  }, []);

  return (
    <div className="logo-item">
      <div className="logo-container">
        {!imageError ? (
          <img
            src={client.logo}
            alt={client.alt || client.name}
            className={`logo-image ${imageLoaded ? 'loaded' : 'loading'}`}
            loading="lazy"
            width={160}
            height={80}
            onLoad={handleImageLoad}
            onError={handleImageError}
            decoding="async"
          />
        ) : (
          <div className="logo-fallback">
            {client.name}
          </div>
        )}
      </div>
    </div>
  );
});

LogoItem.displayName = 'LogoItem';

// Compact carousel with original logo colors
const CarouselRow = React.memo<CarouselRowProps>(({
  logos,
  direction,
  rowIndex,
  pauseOnHover,
  speed
}) => {
  return (
    <div className="carousel-row">
      <div
        className={`carousel-track ${direction}`}
        style={{
          '--speed': `${speed}s`
        } as React.CSSProperties}
      >
        <div className="logos-strip">
          {/* First set */}
          {logos.map((client, index) => (
            <LogoItem
              key={`${rowIndex}-${index}`}
              client={client}
              index={index}
              rowIndex={rowIndex}
            />
          ))}
          {/* Duplicate for seamless loop */}
          {logos.map((client, index) => (
            <LogoItem
              key={`${rowIndex}-dup-${index}`}
              client={client}
              index={index}
              rowIndex={rowIndex}
              isDuplicate
            />
          ))}
        </div>
      </div>
    </div>
  );
});

CarouselRow.displayName = 'CarouselRow';

// Main compact component
const ClientLogosSection: React.FC<ClientLogosSectionProps> = ({
  isInView: externalIsInView,
  className = "",
  pauseOnHover = true
}) => {
  const { ref, isVisible } = useIntersectionObserver(0.1);
  const finalIsInView = externalIsInView ?? isVisible;
  const controls = useAnimationControls(finalIsInView);

  // Compact unique client logos - NO repetition
  const clientsData: readonly ClientLogo[][] = useMemo(() => {
    const allLogos: ClientLogo[] = [
      // Row 1 - Technology & Innovation
      { name: "Google", logo: "/logos/google_PNG19644.png" },
      { name: "Wipro", logo: "/logos/1200px-Wipro_Primary_Logo_Color_RGB.svg.png" },
      { name: "HCL", logo: "/logos/HCL_Technologies-Logo.wine.png" },
      { name: "ISRO", logo: "/logos/1200px-Indian_Space_Research_Organisation_Logo.svg.png" },
      { name: "Fujifilm", logo: "/logos/Fujifilm-logo.png" },
      { name: "Honda", logo: "/logos/honda.png" },
      { name: "Volvo", logo: "/logos/volvo.png" },
      { name: "Michelin", logo: "/logos/Michelin_Logo_1997.png" },
      { name: "Saint-Gobain", logo: "/logos/2560px-Saint-Gobain_logo.svg.png" },
      { name: "Blue Star", logo: "/logos/blue-star-limited-logo-vector.png" },
      { name: "Autoprint", logo: "/logos/autoprint-logo-high-res-520.png" },
      { name: "Newlord", logo: "/logos/Newlord_Logo.png" },
      { name: "TTK", logo: "/logos/logo_ttk.png" },
      { name: "Zepto", logo: "/logos/64a285c0af324ae978642deb_Zepto.png" },

      // Row 2 - Banking & Infrastructure
      { name: "Axis Bank", logo: "/logos/2560px-Axis_Bank_logo.svg.png" },
      { name: "ICICI", logo: "/logos/icic.png" },
      { name: "Kotak", logo: "/logos/kotak_mahindra_bank.png" },
      { name: "RBL Bank", logo: "/logos/RBL.NS-5c0ffcf8.png" },
      { name: "Adani", logo: "/logos/1024px-Adani_2012_logo.png" },
      { name: "JSW Steel", logo: "/logos/jsw-steel-vector-logo.png" },
      { name: "L&T", logo: "/logos/Larsen__Toubro_png.jpg" },
      { name: "BHEL", logo: "/logos/2492px-BHEL_logo.svg.png" },
      { name: "Indian Oil", logo: "/logos/Indian_Oil_Corporation-Logo.wine.png" },
      { name: "Escorts Group", logo: "/logos/1200px-Escorts_Group.svg.png" },
      { name: "Godrej", logo: "/logos/2560px-Godrej_Logo.svg.png" },
      { name: "K-Oil Engines", logo: "/logos/k-oil-engines-logo.png" },
      { name: "KCP Sugar", logo: "/logos/kcp-sugar-and-indust--600.png" },
      { name: "Asian Paints", logo: "/logos/asian-paints-1.png" },

      // Row 3 - Consumer & Automotive
      { name: "Amul", logo: "/logos/1200px-Amul_official_logo.svg.png" },
      { name: "Britannia", logo: "/logos/britannia-logo-brandlogos.net_.png" },
      { name: "Aavin", logo: "/logos/800px-Aavin_dairy_logo.svg.png" },
      { name: "Tata Coffee", logo: "/logos/tata-coffee.png" },
      { name: "ITC", logo: "/logos/itc.png" },
      { name: "KFC", logo: "/logos/Kfc_logo.png" },
      { name: "Jubilant FoodWorks", logo: "/logos/Jubilant_FoodWorks.png" },
      { name: "Lifestyle", logo: "/logos/Lifestyle_Stores_-_New.jpg" },
      { name: "V-Mart", logo: "/logos/v-mart.png" },
      { name: "TVS Motor", logo: "/logos/logo-tvs-motor-.png" },
      { name: "Tata Motors", logo: "/logos/tata-motors.png" },
      { name: "Bajaj", logo: "/logos/Bajaj-Logo.png" },
      { name: "Mahindra", logo: "/logos/mahindra.png" },
      { name: "MRF", logo: "/logos/mrf.png" }
    ];

    return [
      allLogos.slice(0, 14),  // Row 1: 14 logos
      allLogos.slice(14, 28), // Row 2: 14 logos  
      allLogos.slice(28, 42)  // Row 3: 14 logos
    ];
  }, []);

  // Slower desktop, faster mobile speeds
  const rowConfigs = useMemo(() => [
    { direction: 'right' as const, speed: 180 }, // Slower desktop
    { direction: 'left' as const, speed: 200 },  // Slower desktop
    { direction: 'right' as const, speed: 160 }  // Slower desktop
  ], []);

  return (
    <section
      ref={ref}
      className={`relative py-12 sm:py-16 lg:py-20 overflow-hidden font-['Open_Sans'] bg-white ${className}`}
    >
      {/* Compact Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={finalIsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        className="header"
      >
        <motion.h2
          className="title"
          variants={{
            hidden: { opacity: 0, scale: 0.95 },
            visible: { opacity: 1, scale: 1 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5 }}
        >
          <span className="title-main">Your Success,</span>
          <span className="title-accent"> Our Clients</span>
        </motion.h2>

        <motion.p
          className="subtitle"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 }
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Delivering Excellence to Leading Organizations
        </motion.p>
      </motion.div>

      {/* Compact Carousel */}
      <div className="carousel-wrapper">
        {clientsData.map((logos, index) => (
          <CarouselRow
            key={`row-${index}`}
            logos={logos}
            direction={rowConfigs[index].direction}
            rowIndex={index}
            pauseOnHover={pauseOnHover}
            speed={rowConfigs[index].speed}
          />
        ))}
      </div>

      {/* Compact CSS with original logo colors */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .clients-section {
          padding: 2rem 0;
          width: 100%;
          background: transparent;
          overflow: hidden;
        }

        @media (min-width: 768px) {
          .clients-section {
            padding: 2.5rem 0;
          }
        }

        /* Compact Header */
        .header {
          text-align: center;
          margin-bottom: 1.5rem;
          padding: 0 1rem;
        }

        @media (min-width: 768px) {
          .header {
            margin-bottom: 2rem;
          }
        }

        .title {
          font-size: 1.75rem;
          font-weight: 700;
          line-height: 1.2;
          margin-bottom: 0.75rem;
          font-family: 'Inter', sans-serif;
        }

        @media (min-width: 768px) {
          .title {
            font-size: 2.25rem;
            margin-bottom: 1rem;
          }
        }

        .title-main {
          background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .title-accent {
          background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .subtitle {
          font-size: 0.875rem;
          color: #64748b;
          font-weight: 500;
          max-width: 32rem;
          margin: 0 auto;
          line-height: 1.4;
        }

        @media (min-width: 768px) {
          .subtitle {
            font-size: 1rem;
          }
        }

        /* Compact Carousel */
        .carousel-wrapper {
          position: relative;
          width: 100%;
          mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 3%,
            black 97%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to right,
            transparent 0%,
            black 3%,
            black 97%,
            transparent 100%
          );
        }

        .carousel-row {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        @media (min-width: 768px) {
          .carousel-row {
            margin-bottom: 1.5rem;
          }
        }

        .carousel-track {
          position: relative;
          width: 100%;
        }

        .logos-strip {
          display: flex;
          align-items: center;
          width: max-content;
          animation-duration: var(--speed);
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          animation-fill-mode: both;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          will-change: transform;
        }

        /* Animation directions */
        .carousel-track.right .logos-strip {
          animation-name: scroll-right;
        }

        .carousel-track.left .logos-strip {
          animation-name: scroll-left;
        }

        @keyframes scroll-right {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-50%, 0, 0);
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0, 0, 0);
          }
        }

        /* FASTER MOBILE ANIMATIONS */
        @media (max-width: 767px) {
          .carousel-track.right .logos-strip {
            animation-duration: 30s !important;
          }

          .carousel-track.left .logos-strip {
            animation-duration: 25s !important;
          }
        }

        /* Compact Logo Item - NO BACKGROUND */
        .logo-item {
          flex-shrink: 0;
          padding: 0 0.5rem;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
        }

        @media (min-width: 768px) {
          .logo-item {
            padding: 0 0.75rem;
          }
        }

        /* Even Larger Logo Container Size - COMPLETELY TRANSPARENT */
        .logo-container {
          width: 6rem;
          height: 5rem;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        @media (min-width: 640px) {
          .logo-container {
            width: 7rem;
            height: 5.75rem;
          }
        }

        @media (min-width: 768px) {
          .logo-container {
            width: 8rem;
            height: 6.5rem;
          }
        }

        @media (min-width: 1024px) {
          .logo-container {
            width: 9rem;
            height: 7rem;
          }
        }

        .logo-container:hover {
          transform: scale(1.1);
        }

        /* Logo Image - ORIGINAL COLORS */
        .logo-image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
          object-fit: contain;
          object-position: center;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          /* KEEP ORIGINAL COLORS - NO FILTERS */
        }

        .logo-image.loaded {
          opacity: 0.9;
        }

        .logo-container:hover .logo-image {
          opacity: 1;
        }

        /* Compact Text Fallback */
        .logo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: #64748b;
          font-size: 0.625rem;
          font-weight: 600;
          line-height: 1.2;
          word-break: break-word;
          padding: 0.125rem;
        }

        @media (min-width: 640px) {
          .logo-fallback {
            font-size: 0.75rem;
          }
        }

        /* Pause on hover */
        ${pauseOnHover ? `
          @media (hover: hover) {
            .carousel-row:hover .logos-strip {
              animation-play-state: paused;
            }
          }
        ` : ''}

        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .logos-strip {
            animation: none !important;
          }
          
          .logo-container {
            transition: none !important;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .subtitle {
            color: #000;
          }
          
          .logo-fallback {
            color: #000;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .subtitle {
            color: #94a3b8;
          }
          
          .logo-fallback {
            color: #94a3b8;
          }
        }

        /* Focus states */
        .logo-container:focus-visible {
          outline: 2px solid #3b82f6;
          outline-offset: 2px;
          border-radius: 0.25rem;
        }

        /* Mobile optimizations */
        @media (max-width: 767px) {
          .logos-strip {
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
          }
          
          .logo-item,
          .logo-container {
            -webkit-transform: translateZ(0);
            transform: translateZ(0);
          }
          
          .carousel-row {
            -webkit-overflow-scrolling: touch;
            overscroll-behavior: contain;
          }
        }

        /* Extra small mobile - increased by 1 point */
        @media (max-width: 480px) {
          .logo-container {
            width: 5.5rem;
            height: 4.75rem;
          }
          
          .logo-item {
            padding: 0 0.375rem;
          }
        }

        /* iOS Safari fixes */
        @supports (-webkit-appearance: none) {
          .logos-strip {
            -webkit-animation-fill-mode: both;
            animation-fill-mode: both;
          }
        }
      `}} />
    </section>
  );
};

ClientLogosSection.displayName = 'ClientLogosSection';

// Error boundary
class ClientLogosSectionErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ClientLogosSection Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '2rem 1rem', textAlign: 'center' }}>
          <h2 style={{
            fontSize: '1.75rem',
            marginBottom: '0.75rem',
            background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Your Success, Our Clients
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem' }}>
            Client logos are temporarily unavailable. Please refresh the page.
          </p>
        </div>
      );
    }

    return this.props.children;
  }
}

const ClientLogosSectionWithErrorBoundary: React.FC<ClientLogosSectionProps> = (props) => (
  <ClientLogosSectionErrorBoundary>
    <ClientLogosSection {...props} />
  </ClientLogosSectionErrorBoundary>
);

ClientLogosSectionWithErrorBoundary.displayName = 'ClientLogosSectionWithErrorBoundary';

export default ClientLogosSectionWithErrorBoundary;
export { ClientLogosSection as ClientLogosSectionBase };
export type { ClientLogosSectionProps, ClientLogo };