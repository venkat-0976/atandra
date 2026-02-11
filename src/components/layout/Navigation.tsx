import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ChevronDown,
  Menu,
  X,
  Zap,
  Shield,
  Leaf,
  MessageCircle,
  Building2,
  Briefcase,
  ChevronRight
} from "lucide-react";

interface NavigationProps {
  scrollY: number;
}

// Custom hook for responsive breakpoints
const useResponsiveBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint('mobile');
      } else if (width < 1024) {
        setBreakpoint('tablet');
      } else {
        setBreakpoint('desktop');
      }
    };

    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  return breakpoint;
};

// Colorful Top Border Component for Navigation
const ColorfulTopBorder = () => (
  <div className="fixed top-0 left-0 w-full h-1 sm:h-1.5 md:h-2 flex z-[120]">
    <div className="flex-1" style={{ backgroundColor: '#FFD700' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#FF4500' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#000000' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#808080' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#008000' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#00BFFF' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#FFD700' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#800000' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#FF4500' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#000000' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#808080' }}></div>
    <div className="flex-1" style={{ backgroundColor: '#008000' }}></div>
  </div>
);

// Modern Attractive Dropdown Design
const MegaDropdown = ({
  items,
  isOpen,
  color,
  category,
  onItemClick
}: {
  items: { name: string; path: string }[],
  isOpen: boolean,
  color: string,
  category: string,
  onItemClick?: () => void
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const breakpoint = useResponsiveBreakpoint();


  useEffect(() => {
    if (isOpen) {
      setShouldShow(true);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    } else {
      timeoutRef.current = setTimeout(() => {
        setShouldShow(false);
        setIsHovered(false);
      }, 150);
    }


    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, isHovered]);

  if (!shouldShow || breakpoint === 'mobile') return null;

  const getColorConfig = () => {
    switch (color) {
      case 'measure':
        return {
          bg: 'bg-yellow-500',
          lightBg: 'bg-yellow-50',
          text: 'text-yellow-600',
          border: 'border-yellow-200',
          hover: 'hover:bg-yellow-50'
        };
      case 'protect':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-50'
        };
      case 'conserve':
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-50',
          text: 'text-emerald-600',
          border: 'border-emerald-200',
          hover: 'hover:bg-emerald-50'
        };
      case 'about':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-50'
        };
      case 'faqs':
        return {
          bg: 'bg-purple-500',
          lightBg: 'bg-purple-50',
          text: 'text-purple-600',
          border: 'border-purple-200',
          hover: 'hover:bg-purple-50'
        };
      case 'contact':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-50'
        };
      case 'careers':
        return {
          bg: 'bg-emerald-500',
          lightBg: 'bg-emerald-50',
          text: 'text-emerald-600',
          border: 'border-emerald-200',
          hover: 'hover:bg-emerald-50'
        };
      case 'blogs':
        return {
          bg: 'bg-blue-500',
          lightBg: 'bg-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-200',
          hover: 'hover:bg-blue-50'
        };
      default:
        return {
          bg: 'bg-gray-500',
          lightBg: 'bg-gray-50',
          text: 'text-gray-600',
          border: 'border-gray-200',
          hover: 'hover:bg-gray-50'
        };
    }
  };

  const colorConfig = getColorConfig();
  const isTwoColumnCategory = category === 'measure';

  return (
    <motion.div
      className={cn(
        "absolute top-full left-1/2 transform -translate-x-1/2 mt-2",
        "bg-white border border-gray-200 rounded-2xl shadow-xl",
        "overflow-hidden z-[120]",
        isTwoColumnCategory ? "w-[480px]" : "w-[320px]"
      )}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
      onMouseEnter={() => {
        setIsHovered(true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
    >
      {/* Clean Header */}
      <div className={cn("px-4 py-3 border-b", colorConfig.lightBg, colorConfig.border)}>
        <h3 className={cn("typography-h5", colorConfig.text)}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </h3>
        {(category === 'measure' || category === 'protect') && (
          <p className="typography-extra-small text-gray-500 mt-0.5">Choose your product</p>
        )}
      </div>

      {/* Menu Items */}
      <div className="py-2">
        <div className={isTwoColumnCategory ? "grid grid-cols-2" : ""}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1, delay: index * 0.02 }}
            >
              {item.path.startsWith('http') ? (
                <a
                  href={item.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg",
                    "text-gray-900  font-medium",
                    "transition-all duration-200 group",
                    colorConfig.hover,
                    "border-b border-gray-50 last:border-b-0"
                  )}
                  onClick={onItemClick}
                >
                  <span className="typography-small flex-1 pr-2 text-gray-900 font-medium">
                    {item.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </a>
              ) : (
                <Link
                  to={item.path}
                  className={cn(
                    "w-full flex items-center justify-between px-4 py-3 rounded-lg",
                    "text-gray-900  font-medium",
                    "transition-all duration-200 group",
                    colorConfig.hover,
                    "border-b border-gray-50 last:border-b-0"
                  )}
                  onClick={onItemClick}
                >
                  <span className="typography-small flex-1 pr-2 text-gray-900 font-medium">
                    {item.name}
                  </span>
                  <ChevronRight className="w-4 h-4 text-gray-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
                </Link>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Button - For measure, protect, and conserve categories */}
      {/* (Removed View All Products button and its container) */}
    </motion.div>
  );
};

const Navigation: React.FC<NavigationProps> = ({ scrollY }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const breakpoint = useResponsiveBreakpoint();

  const isScrolled = scrollY > 20;

  // Close mobile menu when resizing to desktop
  useEffect(() => {
    if (typeof window === 'undefined') return; // Skip during SSR

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close dropdown when switching to mobile
  useEffect(() => {
    if (breakpoint === 'mobile') {
      setActiveDropdown(null);
    }
  }, [breakpoint]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return; // Skip during SSR

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMouseEnter = (dropdown: string) => {
    if (breakpoint !== 'mobile') {
      setActiveDropdown(dropdown);
    }
  };

  const handleMouseLeave = () => {
    if (breakpoint !== 'mobile') {
      setActiveDropdown(null);
    }
  };

  // Handle main category navigation
  const handleCategoryClick = (key: string) => {
    // Only toggle dropdown for measure, protect, and conserve (no navigation)
    if (key === 'measure' || key === 'protect' || key === 'conserve') {
      setActiveDropdown(activeDropdown === key ? null : key);
    } else {
      // For categories without main pages (like contact), just toggle dropdown
      setActiveDropdown(activeDropdown === key ? null : key);
    }
  };

  // Enhanced menu categories with modern structure
  const menuCategories = {
    measure: {
      name: "Measure",
      icon: Zap,
      items: [
        { name: "Power Quality Analyzers", path: "/measure/power-quality-analyzers" },
        { name: "Thermal Imagers", path: "/measure/thermal-imagers" },
        { name: "Insulation Testers", path: "/measure/insulation-testers" },
        { name: "Oscilloscopes", path: "/measure/oscilloscopes" },
        { name: "Earth Testers", path: "/measure/earth-testers" },
        { name: "Earth Loop Testers", path: "/measure/earth-loop-testers" },
        { name: "Clamp Meters", path: "/measure/clamp-meters" },
        { name: "Digital Multimeters", path: "/measure/digital-multimeters" },
        { name: "Micro-Ohm Meters", path: "/measure/micro-ohmmeters" },
        { name: "Installation Testers", path: "/measure/installation-testers" },
        { name: "Multi Function Meters", path: "/measure/multi-functional-meters" },
      ]
    },
    protect: {
      name: "Protect",
      icon: Shield,
      items: [
        { name: "Online UPS", path: "/protect/ups" },
        { name: "Servo Stabilizers", path: "/protect/servo-stabilizers" },
        { name: "Static Stabilizers", path: "/protect/static-stabilizers" },
        { name: "Isolation Transformers", path: "/protect/isolation-transformers" },
      ]
    },
    conserve: {
      name: "Conserve",
      icon: Leaf,
      items: [
        { name: "Smart Energy Management System", path: "/conserve/on-premise-systems" },
        { name: "Smart Factory Solution", path: "/conserve/smart-factory-solution" },
        { name: "Tenant Billing Solution", path: "/conserve/tenant-billing-solution" },
        { name: "Enterprise ESG Reporting", path: "/conserve/enterprise-esg-reporting" },
      ]
    },
    about: {
      name: "About Us",
      icon: Building2,
      items: [
        { name: "Company", path: "/about/company" },
        { name: "Certificates", path: "/about/certificates" },
        { name: "Events", path: "/about/events" },
        { name: "Our Leadership", path: "/about/our-leadership" }
      ]
    },
    faqs: {
      name: "FAQs",
      icon: MessageCircle,
      items: [
        { name: "FAQs", path: "/faqs" }
      ]
    },
    blogs: {
      name: "Blogs",
      icon: MessageCircle,
      items: [
        { name: "Blogs", path: "/blogs" }
      ]
    },
    careers: {
      name: "Careers",
      icon: Briefcase,
      items: [
        { name: "Careers", path: "/about/careers" }
      ]
    },
    contact: {
      name: "Contact",
      icon: MessageCircle,
      items: [
        { name: "Contact Sales", path: "/contact/sales" },
        { name: "Contact Service", path: "http://krykardcare.in/support/#/main" },
      ]
    }
  };

  return (
    <>
      {/* Colorful Top Border */}
      <ColorfulTopBorder />

      {/* Main Header */}
      <header
        className={cn(
          "fixed left-0 right-0 z-[100] transition-all duration-500 font-['Open_Sans'] bg-white/95 shadow-lg rounded-b-2xl border-b border-gray-100/50 backdrop-blur-lg",
          isScrolled ? "" : ""
        )}
        style={{
          top: '4px',
          minHeight: '48px',
          boxShadow: '0 2px 16px 0 rgba(0,0,0,0.06)',
        }}
      >
        <div className="w-full max-w-[1400px] mx-auto px-2 sm:px-4 lg:px-8">
          <nav className="flex items-center justify-between py-2 sm:py-3 lg:py-3 min-h-[72px] sm:min-h-[102px]">
            {/* Logo - Left */}
            <div className="flex items-center mr-8 lg:mr-12 xl:mr-16">
              <Link to="/" className="block">
                <img
                  src="/logo.png"
                  alt="KRYKARD"
                  className="object-contain filter drop-shadow-sm h-12 lg:h-16 w-auto"
                  width={360}
                  height={120}
                />
              </Link>
            </div>

            {/* Hamburger Menu - Right Corner (Mobile Only) */}
            <motion.button
              className="lg:hidden flex items-center justify-center p-3 rounded-xl bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-all duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-blue-600" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-blue-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Desktop Navigation - Center-right side */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2 ml-auto mr-8">
              {Object.entries(menuCategories).map(([key, category]) => (
                <div
                  key={key}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(key)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    type="button"
                    className={cn(
                      "group flex items-center typography-h6 transition-all duration-200 relative px-3 xl:px-4 py-2.5 rounded-xl whitespace-nowrap",
                      "hover:shadow-lg hover:shadow-black/5 backdrop-blur-sm",
                      "border border-transparent hover:border-gray-200",
                      key === 'measure' ? 'text-black hover:bg-yellow-100 hover:text-yellow-800' :
                        key === 'protect' ? 'text-black hover:bg-blue-100 hover:text-blue-800' :
                          key === 'conserve' ? 'text-black hover:bg-emerald-100 hover:text-emerald-800' :
                            key === 'faqs' ? 'text-black hover:bg-purple-100 hover:text-purple-800' :
                              key === 'about' ? 'text-black hover:bg-blue-100 hover:text-blue-800' :
                                key === 'careers' ? 'text-black hover:bg-emerald-100 hover:text-emerald-800' :
                                  key === 'blogs' ? 'text-black hover:bg-blue-100 hover:text-blue-800' :
                                    key === 'contact' ? 'text-black hover:bg-blue-100 hover:text-blue-800' :
                                      'text-black hover:bg-gray-100 hover:text-gray-900'
                    )}
                    onClick={() => handleCategoryClick(key)}
                    aria-haspopup="true"
                    aria-expanded={activeDropdown === key}
                  >
                    <span className="relative z-10 whitespace-nowrap">{category.name}</span>
                    <ChevronDown className={cn(
                      "ml-2 h-4 w-4 transition-transform duration-200",
                      activeDropdown === key ? "rotate-180" : ""
                    )} />
                  </button>
                  <MegaDropdown
                    items={category.items}
                    isOpen={activeDropdown === key}
                    color={key}
                    category={key}
                    onItemClick={() => setActiveDropdown(null)}
                  />
                </div>
              ))}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[90] bg-black/20 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-[95] w-full max-w-sm bg-white lg:hidden overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-100">
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                  <img src="/unnamed.png" alt="KRYKARD" className="h-10 w-auto" width={180} height={60} />
                </Link>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <X className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {Object.entries(menuCategories).map(([key, category]) => (
                  <div key={key} className="mb-6">
                    {key === 'contact' ? (
                      <button
                        type="button"
                        className={cn(
                          "block typography-h5 mb-3 pb-2 border-b-2 transition-colors",
                          'text-black border-blue-200 hover:text-blue-700'
                        )}
                        onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === key}
                      >
                        {category.name}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className={cn(
                          "block typography-h5 mb-3 pb-2 border-b-2 transition-colors",
                          key === 'measure' ? 'text-black border-yellow-200 hover:text-yellow-600' :
                            key === 'protect' ? 'text-black border-blue-200 hover:text-blue-700' :
                              key === 'conserve' ? 'text-black border-emerald-200 hover:text-emerald-700' :
                                key === 'about' ? 'text-black border-blue-200 hover:text-blue-700' :
                                  key === 'faqs' ? 'text-black border-purple-200 hover:text-purple-700' :
                                    key === 'contact' ? 'text-black border-blue-200 hover:text-blue-700' :
                                      'text-black border-gray-200 hover:text-gray-700'
                        )}
                        onClick={() => setActiveDropdown(activeDropdown === key ? null : key)}
                        aria-haspopup="true"
                        aria-expanded={activeDropdown === key}
                      >
                        {category.name}
                      </button>
                    )}
                    <div className="space-y-2 ml-2">
                      {category.items.map((item, idx) => (
                        item.path.startsWith('http') ? (
                          <a
                            key={idx}
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-gray-800 hover:text-black font-medium transition-colors py-1 typography-small"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={item.path}
                            className="block text-gray-800 hover:text-black font-medium transition-colors py-1 typography-small"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {item.name}
                          </Link>
                        )
                      ))}
                    </div>
                  </div>
                ))}
              </nav>

              {/* Logo Footer */}
              <div className="p-4 border-t border-gray-100 mt-auto">
                <div className="flex flex-col items-center justify-center space-y-3">
                  <img
                    src="/background_images/logo.png"
                    alt="Partner Logo 1"
                    className="h-6 w-auto object-contain filter drop-shadow-md"
                    width={160}
                    height={80}
                    style={{ opacity: 1, filter: 'contrast(1.1) brightness(1)' }}
                    onError={(e) => console.log('Logo 1 failed to load:', e)}
                    onLoad={() => console.log('Logo 1 loaded successfully')}
                  />
                  <img
                    src="/background_images/alensoft.png"
                    alt="Partner Logo 2"
                    className="h-8 w-auto object-contain filter drop-shadow-md"
                    width={160}
                    height={80}
                    style={{ opacity: 1, filter: 'contrast(1.2) brightness(1.1) saturate(1.2)' }}
                    onError={(e) => console.log('Logo 2 failed to load:', e)}
                    onLoad={() => console.log('Logo 2 loaded successfully')}
                  />
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;