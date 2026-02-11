import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView, useScroll, useTransform } from "framer-motion";
import { useLocation, Link } from "react-router-dom";
import Layout from "./Layout";

interface PageLayoutProps {
  children: React.ReactNode;
  title?: string;
  tITLE2?: string;
  subtitle?: string;
  subtitle2?: string;
  category?: "measure" | "protect" | "conserve" | "about" | "contact";
  image?: string;
  textColor?: string;
  hideHero?: boolean; // New prop to hide the hero section
  hideBreadcrumbs?: boolean; // New prop to hide breadcrumbs
}

/* -----------------------------------------------
   Hook to handle navbar spacing dynamically
------------------------------------------------- */
const useNavbarSpacing = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return; // Skip during SSR

    const addNavbarSpacing = () => {
      // Find the navbar element using multiple selectors
      const navbar = document.querySelector('nav') ||
        document.querySelector('.navbar') ||
        document.querySelector('[class*="navbar"]') ||
        document.querySelector('header nav') ||
        document.querySelector('[role="navigation"]');

      if (navbar) {
        // Get the actual navbar height
        const navbarHeight = navbar.getBoundingClientRect().height;

        // Apply padding to body to push content below navbar
        document.body.style.paddingTop = `${navbarHeight}px`;

        console.log(`Navbar spacing applied: ${navbarHeight}px`);
      } else {
        // Fallback if navbar not found
        document.body.style.paddingTop = '80px';
        console.log('Navbar not found - applied default 80px spacing');
      }
    };

    // Run immediately
    addNavbarSpacing();

    // Also run after a short delay to ensure navbar is fully rendered
    const timer = setTimeout(addNavbarSpacing, 100);

    // Handle window resize
    const handleResize = () => {
      addNavbarSpacing();
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      // Reset body padding when component unmounts
      if (typeof document !== 'undefined') {
        document.body.style.paddingTop = '0px';
      }
    };
  }, []);
};

/* -----------------------------------------------
   Creative Animated Particle Background
------------------------------------------------- */
const ParticleBackground = ({ theme = "blue" }: { theme?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);

    const particles: Array<{
      x: number;
      y: number;
      z: number;
      size: number;
      speed: number;
      angle: number;
      rotationSpeed: number;
      opacity: number;
    }> = [];

    const colorMap: Record<string, string> = {
      measure: "rgba(59, 130, 246, 0.7)",
      protect: "rgba(16, 185, 129, 0.7)",
      conserve: "rgba(245, 158, 11, 0.7)",
      about: "rgba(139, 92, 246, 0.7)",
      contact: "rgba(79, 70, 229, 0.7)",
      blue: "rgba(59, 130, 246, 0.7)"
    };

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        z: Math.random() * 1500 + 500,
        size: Math.random() * 3 + 1,
        speed: Math.random() * 0.7 + 0.3,
        angle: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.5 + 0.5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.z -= p.speed;
        p.angle += p.rotationSpeed;
        if (p.z < 1) {
          p.z = 2000;
          p.x = Math.random() * canvas.width;
          p.y = Math.random() * canvas.height;
          p.opacity = Math.random() * 0.5 + 0.5;
        }
        // Repulsion from mouse
        const dx = p.x - mousePos.x;
        const dy = p.y - mousePos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const force = (300 - dist) / 3000;
          p.x += dx * force;
          p.y += dy * force;
        }
        const scale = 2000 / p.z;
        const x2d = p.x * scale + canvas.width / 2;
        const y2d = p.y * scale + canvas.height / 2;
        if (x2d > 0 && x2d < canvas.width && y2d > 0 && y2d < canvas.height) {
          ctx.save();
          ctx.translate(x2d, y2d);
          ctx.rotate(p.angle);
          ctx.beginPath();
          ctx.arc(0, 0, p.size * scale, 0, Math.PI * 2);
          ctx.fillStyle = colorMap[theme] || colorMap.blue;
          ctx.globalAlpha = p.opacity * scale * 0.005;
          ctx.fill();
          ctx.restore();
        }
      });
      requestAnimationFrame(animate);
    };

    animate();
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [theme, mousePos]);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

/* -----------------------------------------------
   Floating Creative Shapes for Depth
------------------------------------------------- */
const FloatingShapes = ({ theme = "blue" }: { theme?: string }) => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const onMove = (e: MouseEvent) => {
      // Use requestAnimationFrame to optimize performance
      requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const getStyle = (depth: number) => {
    const x = (mouse.x - 0.5) * depth;
    const y = (mouse.y - 0.5) * depth;
    return { transform: `translate(${x * 80}px, ${y * 80}px)` };
  };

  const shapes = [
    { className: "w-32 h-32 rounded-full bg-white/30 blur-3xl", depth: -20 },
    { className: "w-24 h-24 bg-white/20", depth: -40 },
    { className: "w-40 h-40 rounded-lg bg-white/10 blur-xl", depth: -10 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {shapes.map((shape, idx) => (
        <motion.div
          key={idx}
          className={shape.className + " absolute"}
          style={getStyle(shape.depth)}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      ))}
    </div>
  );
};

/* -----------------------------------------------
   Animated 3D Text Component
------------------------------------------------- */
const AnimatedText = ({
  children,
  delay = 0,
  className = "",
  perspective = true,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  perspective?: boolean;
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [controls, inView]);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    // Throttle mouse move events to improve performance
    let rafId: number;
    let lastUpdate = 0;
    const throttleMs = 50; // Only update every 50ms

    const onMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdate < throttleMs) return;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
        lastUpdate = now;
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);
  // Improved word splitting to preserve spacing between words
  const words = String(children).split(" ");
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: delay },
    },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 20, rotateX: perspective ? 45 : 0 },
    visible: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.8 } },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className + (perspective ? " perspective-1000" : "")}
      style={perspective ? {
        transform: `rotateX(${mouse.y * 5}deg) rotateY(${mouse.x * 5}deg)`,
        transformStyle: "preserve-3d",
      } : {}}
    >
      {words.map((word, idx) => (
        <React.Fragment key={idx}>
          <motion.span variants={childVariants} className="inline-block">
            {word}
          </motion.span>
          {idx < words.length - 1 && (
            <span className="inline-block mx-1.5">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

/* -----------------------------------------------
   3D Card Component (No Global Container)
------------------------------------------------- */
const Card3D = ({
  children,
  className = "",
  intensity = 10,
}: {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * intensity * -1;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * intensity;
    setRotate({ x, y });
  };

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.3s ease-out",
      }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};

/* -----------------------------------------------
   Parallax Section (Individual Content Effect)
------------------------------------------------- */
const ParallaxSection = ({
  children,
  depth = 0.2,
  className = "",
}: {
  children: React.ReactNode;
  depth?: number;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [depth * 100, -depth * 100]);
  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

/* -----------------------------------------------
   Simple Breadcrumb Navigation
------------------------------------------------- */
const SimpleBreadcrumbNavigation = ({ currentTitle, category }: {
  currentTitle?: string;
  category?: string;
}) => {
  return (
    <nav className="mb-10 text-sm text-gray-700">
      <ol className="flex items-center space-x-2">
        <li>
          <Link to="/" className="hover:underline transition-colors duration-200 hover:text-blue-600">
            Home
          </Link>
        </li>
        {category && (
          <>
            <li className="mx-2">/</li>
            <li>
              <Link to={`/${category}`} className="hover:underline transition-colors duration-200 hover:text-blue-600">
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Link>
            </li>
          </>
        )}
        {currentTitle && (
          <>
            <li className="mx-2">/</li>
            <li className="font-medium text-gray-900">{currentTitle}</li>
          </>
        )}
      </ol>
    </nav>
  );
};

/* -----------------------------------------------
   Multicolored Line Component (From Layout)
------------------------------------------------- */
const MulticoloredLine = () => {
  return (
    <div className="h-1.5 w-full relative overflow-hidden">
      <div className="absolute inset-0 flex w-full h-full">
        {/* Exact colors from the Layout component */}
        <div className="h-full bg-yellow-400" style={{ width: "10%" }}></div>
        <div className="h-full bg-red-600" style={{ width: "10%" }}></div>
        <div className="h-full bg-gray-800" style={{ width: "10%" }}></div>
        <div className="h-full bg-gray-500" style={{ width: "10%" }}></div>
        <div className="h-full bg-green-500" style={{ width: "10%" }}></div>
        <div className="h-full bg-blue-500" style={{ width: "10%" }}></div>
        <div className="h-full bg-yellow-400" style={{ width: "10%" }}></div>
        <div className="h-full bg-red-600" style={{ width: "10%" }}></div>
        <div className="h-full bg-gray-800" style={{ width: "10%" }}></div>
        <div className="h-full bg-gray-500" style={{ width: "10%" }}></div>
      </div>
    </div>
  );
};

/* -----------------------------------------------
   Theme Styles (Based on Category)
------------------------------------------------- */
const getThemeStyles = (category?: string) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const themes: Record<string, any> = {
    measure: {
      bg: "from-yellow-100 to-yellow-50",
      accent: "bg-yellow-600",
      text: "text-yellow-900",
      gradient: "from-yellow-500 to-yellow-700",
    },
    protect: {
      bg: "from-emerald-100 to-emerald-50",
      accent: "bg-emerald-600",
      text: "text-emerald-900",
      gradient: "from-emerald-500 to-emerald-700",
    },
    conserve: {
      bg: "from-amber-100 to-amber-50",
      accent: "bg-amber-600",
      text: "text-amber-900",
      gradient: "from-amber-500 to-amber-700",
    },
    about: {
      bg: "from-purple-100 to-purple-50",
      accent: "bg-purple-600",
      text: "text-purple-900",
      gradient: "from-purple-500 to-purple-700",
    },
    contact: {
      bg: "from-indigo-100 to-indigo-50",
      accent: "bg-indigo-600",
      text: "text-indigo-900",
      gradient: "from-indigo-500 to-indigo-700",
    },
    default: {
      bg: "from-slate-100 to-slate-50",
      accent: "bg-slate-600",
      text: "text-slate-900",
      gradient: "from-slate-500 to-slate-700",
    },
  };
  return themes[category || "default"];
};

/* -----------------------------------------------
   Page Image Management - UPDATED to match Navigation.tsx structure
------------------------------------------------- */
const getPageImage = (path: string, category?: string, providedImage?: string) => {
  // If an image is explicitly provided, use it
  if (providedImage && providedImage !== "/api/placeholder/1920/1080") {
    return providedImage;
  }

  // Normalize path: remove trailing slash and lowercase
  const normalizedPath = path.replace(/\/$/, '').toLowerCase();

  // Map of paths to their corresponding images
  const pageImages: Record<string, string> = {
    // Main category pages
    "/measure": "/background_images/Measure.png",
    "/protect": "/background_images/Protect.png",
    "/conserve": "/background_images/conserve.png",
    "/about": "/background_images/krykard.jpg",
    "/contact": "/background_images/contact.png",

    // Contact subpages
    "/contact/sales": "/background_images/contact.png",
    "/contact/service": "/background_images/contact.png",

    // Measure subpages - UPDATED to match Navigation.tsx
    "/measure/power-quality-analyzers": "/background_images/Power_quality.png",
    "/measure/thermal-imagers": "/background_images/thermal_imagers.jpeg",
    "/measure/insulation-testers": "/background_images/insulation_testers.png",
    "/measure/oscilloscopes": "/background_images/oscilloscope.png",
    "/measure/earth-testers": "/background_images/insulation_testers.png",
    "/measure/earth-loop-testers": "/background_images/loop_testers.png",
    "/measure/clamp-meters": "/background_images/clamp_meter.png",
    "/measure/digital-multimeters": "/background_images/multimeter.png",
    "/measure/micro-ohmmeters": "/background_images/ohm meters BG.png",
    "/measure/installation-testers": "/background_images/installation_testers.png",
    "/measure/multi-functional-meters": "/background_images/multifuntion.png",

    // Protect subpages - UPDATED to match Navigation.tsx
    "/protect/ups": "/background_images/ups_layout.png",
    "/protect/servo-stabilizers": "/background_images/servo stabilizers.png",
    "/protect/static-stabilizers": "/background_images/StaticVoltageRegulator.jpg",
    "/protect/isolation-transformers": "/background_images/isolation_trasformers.png",

    // Conserve subpages - UPDATED to match Navigation.tsx
    "/conserve/on-premise-systems": "/background_images/On-premises-system.png",
    "/conserve/smart-factory-solution": "/background_images/cloud.png",
    "/conserve/tenant-billing-solution": "/background_images/lighimg energy server.png",
    "/conserve/enterprise-esg-reporting": "/background_images/images.jpeg",

    // About subpages - UPDATED to match Navigation.tsx
    "/about/company": "/background_images/aboutmain.png",
    "/about/sustainability": "/background_images/sustainability.jpeg",
    "/about/events": "/background_images/events.png",
  };

  // Debug log to help diagnose image issues
  const selectedImage = pageImages[normalizedPath] || (category === 'protect' ? '/SVR-WebsiteBanner-1300x600px.jpg' : '/banner-inside-2-1.png');
  console.log('PageLayout getPageImage:', { path, normalizedPath, selectedImage });

  // Try to find an exact match for the current path (case-insensitive, no trailing slash)
  if (pageImages[normalizedPath]) {
    return pageImages[normalizedPath];
  }
  // If not found, use the category default image
  if (category === 'protect') {
    return '/SVR-WebsiteBanner-1300x600px.jpg';
  }

  // Default fallback image
  return '/banner-inside-2-1.png';
};

/* -----------------------------------------------
   PageLayout Component - WITH NAVBAR SPACING FIX
------------------------------------------------- */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  tITLE2,
  subtitle,
  subtitle2,
  category,
  image,
  textColor,
  hideHero = false, // Default to false to maintain existing behavior
  hideBreadcrumbs = false, // Default to false to maintain existing behavior
}) => {
  const location = useLocation();
  const theme = getThemeStyles(category);
  const heroRef = useRef<HTMLDivElement>(null);

  useNavbarSpacing();

  // SSR-safe scroll hooks - provide fallback values during SSR
  const isSSR = typeof window === 'undefined';

  // Always call useScroll unconditionally (React rules)
  // Call both hooks in the same order every render
  const windowScroll = isSSR
    ? { scrollYProgress: { get: () => 0 } } as any
    : useScroll();

  // Always call this hook too (React rules) - even if hideHero is true
  // useScroll should handle null refs gracefully
  const elementScroll = isSSR || hideHero
    ? { scrollYProgress: { get: () => 0 } } as any
    : useScroll({
      target: heroRef,
      offset: ["start start", "end start"] as ["start start", "end start"],
      smooth: 0.1,
      layoutEffect: false
    });

  // Use element scroll when hero is visible, otherwise use window scroll
  // When hideHero is true, always use windowScroll (elementScroll won't work without a ref)
  // Safety check: ensure scrollYProgress has .get() method
  const selectedScroll = (!isSSR && !hideHero)
    ? elementScroll.scrollYProgress
    : windowScroll.scrollYProgress;

  // Ensure we always have a valid motion value with .get() method
  const scrollYProgress = selectedScroll && typeof selectedScroll.get === 'function'
    ? selectedScroll
    : { get: () => 0 } as any;

  // MODIFIED: Changed animation values to make title more visible and reduce scroll sensitivity
  // Always call useTransform (React rules) - it will work with window scroll or element scroll
  const heroYTransform = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const titleScaleTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0.98]);
  const titleOpacityTransform = useTransform(scrollYProgress, [0, 0.8], [1, 0.95]);

  // Use transformed values only when hero is visible, otherwise use static values
  const heroY = (!isSSR && !hideHero) ? heroYTransform : 0;
  const titleScale = (!isSSR && !hideHero) ? titleScaleTransform : 1;
  const titleOpacity = (!isSSR && !hideHero) ? titleOpacityTransform : 1;

  // Get the appropriate image for this page
  const pageImage = getPageImage(location.pathname, category, image);

  return (
    <Layout>
      {/* Conditionally render hero section */}
      {!hideHero && (
        <div
          ref={heroRef}
          className="relative min-h-[50vh] sm:min-h-[85vh] flex flex-col justify-center px-2 xs:px-4 sm:px-6 overflow-hidden pt-24 sm:pt-0"
        >
          {/* Background Image with full opacity */}
          <motion.div className="absolute inset-0">
            <img
              src={pageImage}
              alt={title ? `${title} Banner Image` : "Banner Image"}
              className="absolute inset-0 object-cover object-center w-full h-full"
            />
            {/* MODIFIED: Increased overlay opacity for better text readability */}
            <div className="absolute inset-0 bg-black bg-opacity-50 sm:bg-opacity-40"></div>
          </motion.div>

          {/* Title and content container */}
          <motion.div
            className="relative z-20 text-center flex flex-col items-center w-full max-w-full mx-auto px-2 xs:px-4 sm:px-0"
            style={{ y: heroY }}
          >
            {/* Add a semi-transparent background for text on mobile for better readability */}
            {/* Removed black overlay for mobile readability as per request */}
            {/* Main title */}
            {title && (
              <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="inline-block w-full px-1 xs:px-2 sm:px-0"
              >
                <AnimatedText className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold tracking-wider text-white drop-shadow-xl leading-tight break-words text-center max-w-full whitespace-pre-line" >
                  {title}
                </AnimatedText>
              </motion.div>
            )}

            {/* Secondary title */}
            {tITLE2 && (
              <motion.div
                style={{ scale: titleScale, opacity: titleOpacity }}
                className="inline-block mt-3 xs:mt-4"
              >
                <AnimatedText className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold tracking-wider text-white drop-shadow-xl whitespace-pre-line">
                  {tITLE2}
                </AnimatedText>
              </motion.div>
            )}

            {/* Secondary subtitle */}
            {subtitle2 && (
              <AnimatedText
                className={`text-base xs:text-lg md:text-2xl max-w-3xl mx-auto mt-3 xs:mt-4 text-gray-100 drop-shadow-lg whitespace-pre-line`}
                delay={0.2}
                perspective={false}
              >
                {subtitle2}
              </AnimatedText>
            )}

            {/* Main subtitle */}
            {subtitle && (
              <AnimatedText
                className={`text-sm xs:text-base md:text-xl max-w-3xl mx-auto ${(title || tITLE2) ? 'mt-4 xs:mt-6' : ''} text-gray-100 drop-shadow-lg whitespace-pre-line`}
                delay={0.3}
                perspective={false}
              >
                {subtitle}
              </AnimatedText>
            )}
          </motion.div>

          {/* Scroll down indicator */}
          <motion.div
            className="absolute bottom-8 xs:bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs xs:text-sm text-white mb-1 xs:mb-2">Scroll Down</span>
            <svg width="24" height="24" fill="none" className="text-white opacity-70">
              <path d="M12 5v14M12 19l5-5M12 19l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
      )}

      {/* Multicolored Line as a separate element below the hero section - only show if hero is visible */}
      {!hideHero && (
        <div className="relative w-full">
          <MulticoloredLine />
        </div>
      )}

      {/* Content Sections */}
      <div className={`${hideHero ? '' : 'py-16 xs:py-20 sm:py-24'} px-2 xs:px-4 sm:px-6 bg-white relative overflow-hidden`}>
        {/* Simple Breadcrumb Navigation - conditionally rendered */}
        {!hideBreadcrumbs && (
          <SimpleBreadcrumbNavigation
            currentTitle={title}
            category={category}
          />
        )}

        {/* Content Container */}
        <div className="relative">
          {children}
        </div>
      </div>
    </Layout>
  );
};

export default PageLayout;