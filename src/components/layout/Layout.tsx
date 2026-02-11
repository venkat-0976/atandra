import React, { useEffect, useState, useCallback } from "react";
import Navigation from "./Navigation";
// import FloatingVoiceWidget from "../FloatingVoiceWidget";
import { motion, useScroll, useTransform, MotionValue, useMotionValue } from "framer-motion";
import { useLocation } from "react-router-dom";
import ModernFooter from "../layout/FooterComponents";

interface LayoutProps {
  children: React.ReactNode;
}

// Clean page transition - SSR-safe (starts hidden during SSR, fades in then out on client)
const PageTransition = () => {
  const isSSR = typeof window === 'undefined';

  return (
    <motion.div
      initial={{ opacity: isSSR ? 0 : 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-50 pointer-events-none bg-slate-900"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <img
            src="/footer-logo.png"
            alt="KRYKARD Logo"
            className="h-20 w-auto object-contain"
            style={{ filter: 'brightness(0) saturate(100%) invert(1)' }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Clean scroll progress indicator - memoized to prevent unnecessary re-renders
const ScrollProgress = React.memo(({ scaleX }: { scaleX: MotionValue<number> }) => (
  <div className="fixed top-0 left-0 right-0 z-50">
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="h-1 bg-blue-600 shadow-sm"
    />
  </div>
));

// Scroll to top button positioned above chatbot
// const ScrollToTop = () => {
//   const [isVisible, setIsVisible] = useState(false);
//
//   useEffect(() => {
//     const toggleVisibility = () => {
//       setIsVisible(window.pageYOffset > 300);
//     };
//
//     window.addEventListener('scroll', toggleVisibility);
//     return () => window.removeEventListener('scroll', toggleVisibility);
//   }, []);
//
//   const scrollToTop = () => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };
//
//   return (
//     <motion.button
//       className={`fixed bottom-32 right-6 z-40 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-300 ${
//         isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
//       }`}
//       onClick={scrollToTop}
//       whileHover={{ scale: 1.05 }}
//       whileTap={{ scale: 0.95 }}
//       aria-label="Scroll to top"
//     >
//       <svg className="w-5 h-5 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
//       </svg>
//     </motion.button>
//   );
// };

// Performance optimized layout component
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const isSSR = typeof window === 'undefined';
  const [scrollY, setScrollY] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isVoiceOpen, setIsVoiceOpen] = useState(false);

  // Memoize callbacks to prevent child components from re-rendering unnecessarily
  const handleChatStateChange = useCallback((isOpen: boolean) => {
    setIsChatOpen(isOpen);
  }, []);

  const handleVoiceStateChange = useCallback((isOpen: boolean) => {
    setIsVoiceOpen(isOpen);
  }, []);

  // SSR-safe scroll hooks - provide fallback values during SSR
  const scrollResult = isSSR
    ? { scrollYProgress: { get: () => 0 } } as any
    : useScroll();

  // Extract scrollYProgress from the result object
  const scrollYProgress = scrollResult.scrollYProgress || { get: () => 0 };

  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Always call useMotionValue unconditionally (React rules)
  // This creates a stable MotionValue that persists across renders
  const scaleXStatic = useMotionValue(0);

  // Transform scroll progress - only works on client-side
  // useTransform returns a stable MotionValue reference, so this is safe
  const scaleXTransform = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Use static value during SSR, transformed value on client
  // MotionValues are stable references, so no need for useMemo
  const scaleX = isSSR ? scaleXStatic : scaleXTransform;

  // Optimized scroll handler with throttling - skip during SSR
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Preload critical resources - skip during SSR
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const preloadImages = [
      "/footer-logo.png",
      "/unnamed.png"
    ];

    preloadImages.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="relative bg-white text-gray-900 font-sans">
      {/* Clean page transition - Temporarily disabled to fix duplicate issue */}
      {/* <PageTransition /> */}

      {/* Scroll progress indicator */}
      {!isHomePage && <ScrollProgress scaleX={scaleX} />}

      {/* Navigation */}
      <Navigation scrollY={scrollY} />

      {/* Main content */}
      <main className="relative font-sans">
        {children}
      </main>

      {/* Scroll to top button - positioned above chatbot */}
      {/* <ScrollToTop /> */}

      {/* Chat Bot - only show when voice widget is not open */}


      {/* Voice Widget - only show when chatbot is not open */}
      {/* {!isChatOpen && (
        <FloatingVoiceWidget onVoiceStateChange={handleVoiceStateChange} />
      )} */}

      {/* Professional Footer Component */}
      <ModernFooter />
    </div>
  );
};

export default Layout;