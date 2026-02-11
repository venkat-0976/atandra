import React, { useState, useEffect, useRef } from 'react';
import { Zap, TrendingUp, Shield, Award, Users, Monitor, BarChart3, Leaf, Settings, CheckCircle, ArrowRight, Sparkles, Target, Star, Hexagon, Circle, Globe, ChevronDown } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useAnimation, useInView, useScroll, useTransform, AnimatePresence, useSpring } from 'framer-motion';
import PageLayout from "@/components/layout/PageLayout";
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

// Animated Particle Background Component
const AnimatedParticles = ({ count = 50, color = "green" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-${color}-400/30`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Geometric Shapes Component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Hexagon shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`hex-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          <Hexagon className="w-8 h-8 text-green-300/20" />
        </motion.div>
      ))}

      {/* Star shapes */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, -360],
            scale: [0.5, 1, 0.5],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 20 + Math.random() * 5,
            repeat: Infinity,
            delay: i * 3,
            ease: "easeInOut",
          }}
        >
          <Star className="w-6 h-6 text-emerald-300/25" />
        </motion.div>
      ))}

      {/* Circle shapes */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={`circle-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [0.3, 1.5, 0.3],
            opacity: [0.1, 0.4, 0.1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12 + Math.random() * 8,
            repeat: Infinity,
            delay: i * 1.5,
            ease: "easeInOut",
          }}
        >
          <Circle className="w-4 h-4 text-teal-300/20" />
        </motion.div>
      ))}
    </div>
  );
};

// Magnetic Button Component
const MagneticButton = ({ children, className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    setMousePosition({ x: deltaX, y: deltaY });
  };

  return (
    <motion.div
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      animate={{
        x: mousePosition.x,
        y: mousePosition.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Ripple effect */}
      <motion.div
        className="absolute inset-0 bg-white/20 rounded-full"
        initial={{ scale: 0, opacity: 0 }}
        animate={isHovered ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
      {children}
    </motion.div>
  );
};

const OnPremiseSystemsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [countsStarted, setCountsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'Customers Served', value: '300+', displayValue: '300+', countTo: 300, icon: Users, color: 'from-green-500 to-emerald-600' },
    { label: 'Devices Connected', value: '20,000+', displayValue: '20,000+', countTo: 20000, icon: Monitor, color: 'from-emerald-500 to-teal-600' },
    { label: 'Typical Energy Savings', value: '8-15%', displayValue: '8-15%', icon: TrendingUp, color: 'from-teal-500 to-green-600' },
    { label: 'Payback Period', value: '1.5 - 2 Years', displayValue: '1.5 - 2 Years', icon: Award, color: 'from-green-600 to-emerald-700' }
  ];

  // Count-up animation state
  const [customersCount, setCustomersCount] = useState(0);
  const [devicesCount, setDevicesCount] = useState(0);

  // Intersection Observer for triggering count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countsStarted) {
          setCountsStarted(true);

          // Animate customers count
          const customersTarget = 300;
          const customersDuration = 2000;
          const customersStartTime = Date.now();

          const animateCustomers = () => {
            const elapsed = Date.now() - customersStartTime;
            const progress = Math.min(elapsed / customersDuration, 1);
            const current = Math.floor(progress * customersTarget);
            setCustomersCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateCustomers);
            }
          };

          // Animate devices count
          const devicesTarget = 20000;
          const devicesDuration = 2500;
          const devicesStartTime = Date.now();

          const animateDevices = () => {
            const elapsed = Date.now() - devicesStartTime;
            const progress = Math.min(elapsed / devicesDuration, 1);
            const current = Math.floor(progress * devicesTarget);
            setDevicesCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateDevices);
            }
          };

          // Start animations
          requestAnimationFrame(animateCustomers);
          requestAnimationFrame(animateDevices);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countsStarted]);

  const powerfulFeatures = [
    {
      title: 'Comprehensive Monitoring & Analysis',
      description: 'Real-time energy monitoring and advanced analytics capabilities',
      icon: Monitor,
      features: [
        'Real-Time Energy Monitoring – Capture consumption data as it happens',
        'Multi-Utility Support – Water, air, gas, electricity, steam, and fuels in one platform',
        'Advanced Analytics – Transform raw data into actionable business intelligence',
        'Historical Data Analysis – Identify trends and patterns over time'
      ]
    },
    {
      title: 'Intelligent Management Tools',
      description: 'AI/ML-powered insights and proactive management capabilities',
      icon: Settings,
      features: [
        'AI/ML-Powered Insights – Leverage predictive analytics for proactive management',
        'Anomaly Detection – Receive instant alerts when systems deviate from normal patterns',
        'Benchmarking – Compare performance against industry standards and internal goals',
        'Demand Side Management – Optimize consumption during peak periods'
      ]
    },
    {
      title: 'Enterprise Integration',
      description: 'Seamless connectivity and comprehensive reporting solutions',
      icon: Globe,
      features: [
        'Seamless Interoperability – Connect with existing plant and infrastructure',
        'Customizable Reporting – Generate tailored reports for different stakeholders',
        'Multi-Level Access Control – Ensure data security while enabling collaboration',
        'Mobile & Web Applications – Access critical information anytime, anywhere'
      ]
    }
  ];

  const addOnModules = [
    {
      title: 'PQ Module',
      description: 'Seamlessly integrate with Power Quality meters to monitor electrical performance',
      icon: Zap,
      features: ['Real-time Waveform monitoring', 'Sags, Swells, RVC, Transients, Harmonics', 'COMTRADE & PQDiff formats', 'ITIC, SEMI and SARFI curves', 'PQ Event alerts']
    },
    {
      title: 'Demand Management',
      description: 'Optimize energy use during peak demand periods',
      icon: BarChart3,
      features: ['Peak demand forecasting', 'Load shifting strategies', 'Cost optimization']
    },
    {
      title: 'Utility Equipment Management',
      description: 'Maximize performance & drive energy efficiency of critical utility assets',
      icon: Settings,
      features: ['Equipment asset health monitoring', 'Performance optimization', 'Energy conservation tracking', 'Maintenance scheduling']
    },
    {
      title: 'ISO 50001 Compliance',
      description: 'Meet the requirements of international energy management standards',
      icon: Shield,
      features: ['Compliance documentation', 'Audit trail management', 'Standard reporting', 'Certification support']
    },
    {
      title: 'ESG & Sustainability',
      description: 'Perform end-to-end ESG management in compliance with national and international standards',
      icon: Leaf,
      features: ['Centralized data repository for structured ESG metrics', 'Auto-generated regulatory-compliant reports (GHG, BRSR, GRI, CSRD)', 'Real-time dashboards & visualizations', 'Built-in alerts, benchmarking, and audit trails']
    },
    {
      title: 'Asset Management',
      description: 'Proactively maintain assets with predictive and planned strategies',
      icon: Monitor,
      features: ['Predictive Maintenance', 'Asset lifecycle tracking', 'Maintenance scheduling', 'Performance analytics']
    }
  ];

  const coreFeatures = [
    { title: 'Real-time Monitoring', description: 'Live data streaming with instant alerts', icon: Monitor },
    { title: 'AI Intelligence', description: 'AI-powered predictive intelligence for actionable insights', icon: Sparkles },
    { title: 'Energy Optimization', description: 'Automated optimization of all utility resources', icon: TrendingUp },
    { title: 'WAGES Management', description: 'Unified management for Water, Air, Gas, Energy & Steam', icon: Globe },
    { title: 'BI Dashboards & Reporting', description: 'Comprehensive, user customizable BI dashboards & reporting', icon: BarChart3 },
    { title: 'Multi-site Management', description: 'Centralized management capabilities for multiple locations', icon: Globe },
    { title: 'Mobile Access', description: 'Convenient mobile and web-based platform access', icon: Settings },
    { title: 'System Integration', description: 'Seamlessly integrates with existing IT/OT systems', icon: CheckCircle },
    { title: 'Custom Alerts', description: 'Smart, customizable alerts and notification system', icon: Shield }
  ];

  const benefits = [
    { title: 'Cost Reduction', description: '8-15% reduction in energy costs through intelligent optimization', icon: TrendingUp },
    { title: 'Quick ROI', description: 'Payback period of just 1.5-2 years with immediate savings', icon: Award },
    { title: 'Sustainability', description: 'Reduce carbon footprint and meet environmental goals', icon: Leaf },
    { title: 'Compliance', description: 'Meet international energy management standards', icon: Shield }
  ];

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ALENSOFT Smart Energy Management System",
    "description": "ALENSOFT Smart Energy Management System (EnMS) delivers real-time energy monitoring, predictive analytics, and intelligent automation. Achieve 8–15% energy savings with 1.5–2 year ROI and global standards compliance.",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      // "priceCurrency": "INR",
      // "price": "0"
    },
    "provider": {
      "@type": "Organization",
      "name": "Atandra Energy Pvt Ltd"
    }
  };

  return (
    <>
      <SeoHead
        title="Energy Management Systems – On-Premise EnMS Solutions"
        description="ALENSOFT Smart Energy Management System delivers real-time energy monitoring and analytics,had 8–15% energy savings with 1.5–2 year ROI"
        keywords="energy management system, EnMS, on-premise energy management, smart energy management, energy monitoring, energy analytics, energy automation, industrial energy management, energy efficiency, energy conservation"
        canonical="https://atandra.in/conserve/on-premise-systems"
        ogImage="/background_images/conserve.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/conserve.png"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 w-full overflow-x-hidden">
        <PageLayout
          hideHero={true}
          hideBreadcrumbs={true}
        >
          <style>{`
          .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(-2deg); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite;
          }
        `}</style>
          {/* Main Title Section with 3D/Blurred Background Elements */}
          <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
            {/* Hero Background Elements (matching powerquality style) */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-green-50 rounded-bl-[100px] transform -skew-x-12"></div>
              <div className="absolute bottom-20 left-0 w-64 h-64 bg-green-400 rounded-full opacity-10"></div>
            </div>
            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-20">
              <h1 className="typography-h1 font-bold text-green-900 mb-4 leading-tight">
                Smart Energy Management (EnMS)
              </h1>
              <p className="typography-h3 text-emerald-800 max-w-3xl mx-auto font-semibold mb-3">
                Real-time, AI-powered, and fully integrated for your enterprise
              </p>
              <p className="typography-body text-green-900 max-w-2xl mx-auto leading-relaxed font-medium">
                ALENSOFT EnMS empowers organizations to optimize energy consumption, reduce costs, and achieve sustainability goals.
              </p>
            </div>
          </div>
          {/* Enhanced Modern Hero Section with Advanced Animations */}
          <motion.div
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
          >
            {/* Animated Gradient Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
              animate={{
                background: [
                  "linear-gradient(135deg, rgb(240 253 244) 0%, rgb(236 253 245) 50%, rgb(240 253 250) 100%)",
                  "linear-gradient(135deg, rgb(236 253 245) 0%, rgb(240 253 250) 50%, rgb(240 253 244) 100%)",
                  "linear-gradient(135deg, rgb(240 253 250) 0%, rgb(240 253 244) 50%, rgb(236 253 245) 100%)",
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Floating Geometric Shapes */}
            <FloatingShapes />

            {/* Animated Particles */}
            <AnimatedParticles count={30} color="green" />

            {/* Enhanced Organic Floating Elements with Physics */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-3xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  x: [0, 50, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-emerald-200/25 to-teal-300/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 0.8, 1.1, 1],
                  opacity: [0.25, 0.5, 0.25],
                  x: [0, -40, 0],
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
              />
              <motion.div
                className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-200/20 to-green-300/15 rounded-full blur-xl"
                animate={{
                  scale: [0.8, 1.3, 0.8],
                  opacity: [0.2, 0.4, 0.2],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 4
                }}
              />
            </div>

            {/* Dynamic Grid Pattern with Animation */}
            <motion.div
              className="absolute inset-0 opacity-[0.02]"
              animate={{
                opacity: [0.02, 0.05, 0.02]
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23059669' stroke-width='1'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </motion.div>

            <div className="relative px-2 xs:px-4 sm:px-8 lg:px-12 py-10 xs:py-14 sm:py-20 lg:py-28">
              <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xs:gap-12 lg:gap-20 items-center">
                  {/* Left Content - 7 columns with Staggered Animations */}
                  <motion.div
                    className="lg:col-span-7 text-center lg:text-left space-y-10"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Floating Badge with Enhanced Animation */}
                    <motion.div
                      className="inline-flex items-center px-6 xs:px-8 py-3 xs:py-4 rounded-full bg-white/80 backdrop-blur-sm border border-green-200/50 shadow-lg"
                      initial={{ opacity: 0, y: -20, scale: 0.8 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        duration: 0.6,
                        delay: 0.4,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{
                        scale: 1.05,
                        boxShadow: "0 20px 40px rgba(34, 197, 94, 0.2)"
                      }}
                    >
                      <motion.div
                        className="w-2 h-2 bg-green-500 rounded-full mr-3"
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [1, 0.5, 1]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <span className="typography-body font-bold text-green-700 tracking-wide">Next-Gen Energy Solutions</span>
                    </motion.div>

                    {/* Main Heading with Staggered Text Animation */}
                    <div className="space-y-4 xs:space-y-6">
                      <motion.h2
                        className="typography-h1 font-black leading-tight"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                      >
                        <motion.span
                          className="text-gray-900 block"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                        >
                          ALENSOFT
                        </motion.span>
                        <motion.span
                          className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent block relative typography-h3 whitespace-nowrap"
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 1.0 }}
                        >
                          SMART ENERGY MANAGEMENT SYSTEM (EnMS)
                          {/* Enhanced Glow Effect with Animation */}
                          <motion.span
                            className="absolute inset-0 bg-gradient-to-r from-green-600/20 via-emerald-600/20 to-teal-600/20 blur-sm -z-10"
                            animate={{
                              opacity: [0.2, 0.5, 0.2]
                            }}
                            transition={{
                              duration: 3,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          />
                        </motion.span>
                      </motion.h2>

                      {/* Enhanced Decorative Elements with Physics Animation */}
                      <motion.div
                        className="flex justify-center lg:justify-start items-center space-x-3 hidden"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 1.4,
                          type: "spring",
                          stiffness: 150
                        }}
                      >
                        <motion.div
                          className="w-16 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                          animate={{
                            scaleX: [1, 1.2, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="w-2 h-2 bg-green-500 rounded-full"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [1, 0.5, 1]
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />
                        <motion.div
                          className="w-8 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          animate={{
                            scaleX: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{
                            duration: 2.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                        />
                      </motion.div>
                    </div>

                    {/* Description with Animated Text */}
                    <motion.p
                      className="typography-h4 text-gray-800 font-semibold max-w-2xl mx-auto lg:mx-0 px-2 xs:px-4 sm:px-0"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                    >
                      Unlock energy savings from day one with predictive intelligence and real-time analytics.
                      For industries striving to stay ahead, ALENSOFT transforms energy data into actionable
                      insight using the latest AI technologies — driving productivity, cost savings & sustainability.
                    </motion.p>
                  </motion.div>

                  {/* Right Content - 5 columns with Advanced Animations */}
                  <motion.div
                    className="lg:col-span-5 relative mt-8 lg:mt-0"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    <motion.div
                      className="relative group"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    >
                      {/* Floating Orbs around Image */}
                      <div className="absolute -inset-6 xs:-inset-10 pointer-events-none">
                        {Array.from({ length: 6 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-3 xs:w-4 h-3 xs:h-4 bg-green-400/30 rounded-full blur-sm"
                            style={{
                              left: `${20 + (i * 15)}%`,
                              top: `${10 + (i * 12)}%`,
                            }}
                            animate={{
                              y: [0, -20, 0],
                              opacity: [0.3, 0.8, 0.3],
                              scale: [0.8, 1.2, 0.8],
                            }}
                            transition={{
                              duration: 4 + i,
                              repeat: Infinity,
                              delay: i * 0.5,
                              ease: "easeInOut"
                            }}
                          />
                        ))}
                      </div>

                      {/* Main Image with Enhanced Effects */}
                      <motion.div
                        className="relative overflow-hidden rounded-2xl xs:rounded-3xl shadow-2xl border border-green-100"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{
                          duration: 0.8,
                          delay: 0.6,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <motion.img
                          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&auto=format"
                          alt="ALENSOFT Smart Energy Management System"
                          className="w-full h-auto object-cover max-h-56 xs:max-h-72 sm:max-h-96 lg:max-h-none"
                          loading="eager"
                          // fetchpriority="high"
                          decoding="async"
                          width={800}
                          height={600}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.7, ease: "easeOut" }}
                        />

                        {/* Animated Gradient Overlay */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"
                          animate={{
                            background: [
                              "linear-gradient(to top, rgba(20, 83, 45, 0.2) 0%, transparent 50%, transparent 100%)",
                              "linear-gradient(to top, rgba(5, 150, 105, 0.15) 0%, transparent 60%, transparent 100%)",
                              "linear-gradient(to top, rgba(20, 83, 45, 0.2) 0%, transparent 50%, transparent 100%)",
                            ]
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        />

                        {/* Floating Tech Elements */}
                        <div className="absolute inset-0 pointer-events-none">
                          <motion.div
                            className="absolute top-4 right-4 bg-green-600/90 backdrop-blur-sm text-white p-2 rounded-lg shadow-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.2, type: "spring" }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="flex items-center space-x-2">
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                              <span className="typography-body font-bold">AI-Powered</span>
                            </div>
                          </motion.div>

                          <motion.div
                            className="absolute bottom-4 left-4 bg-emerald-600/90 backdrop-blur-sm text-white p-2 rounded-lg shadow-xl"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1.4, type: "spring" }}
                            whileHover={{ scale: 1.1 }}
                          >
                            <div className="flex items-center space-x-2">
                              <motion.div
                                animate={{
                                  scale: [1, 1.2, 1],
                                  opacity: [1, 0.7, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  ease: "easeInOut"
                                }}
                              >
                                <TrendingUp className="w-4 h-4" />
                              </motion.div>
                              <span className="typography-body font-bold">Real-time</span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section - Mobile Optimized */}
          <div ref={statsRef} className="py-8 sm:py-12 bg-white relative overflow-hidden">
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="typography-h2 font-bold text-black mb-4">
                  Proven Performance
                </h2>
                <p className="typography-h3 text-black max-w-2xl mx-auto">
                  Savings right out of the box
                </p>
              </div>
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border border-green-100 overflow-hidden max-w-4xl mx-auto">
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-green-100">
                  {stats.map((stat, index) => (
                    <div key={index} className="p-4 sm:p-6 text-center group hover:bg-green-50 transition-all duration-300">
                      <h3 className="typography-h4 font-semibold text-black mb-3">
                        {stat.label}
                      </h3>
                      <div className="typography-h3 font-bold text-green-700 group-hover:text-green-800 transition-colors">
                        {stat.displayValue}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Powerful Features Section */}
          <div className="py-10 sm:py-12 lg:py-16 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="typography-h1 font-bold text-black mb-6">
                  POWERFUL FEATURES THAT DRIVE RESULTS
                </h2>
              </div>

              {/* Alternating Feature Rows with Carousel Images */}
              <div className="space-y-16">
                {[0, 1, 2].map((index) => {
                  const feature = powerfulFeatures[index];
                  const IconComponent = feature.icon;
                  // Use custom images for the first and second features, default for the third
                  const images = index === 0
                    ? [
                      '/conserve_pics/Website Pics/G1-1.jpg',
                      '/conserve_pics/Website Pics/G1-2.jpg',
                      '/conserve_pics/Website Pics/G1-3.jpg',
                    ]
                    : index === 1
                      ? [
                        '/conserve_pics/Website Pics/g2-1.jpg',
                        '/conserve_pics/Website Pics/g2-2.jpg',
                        '/conserve_pics/Website Pics/g2-3.jpg',
                      ]
                      : [
                        '/conserve_pics/Website Pics/g2-2.jpg',
                        '/conserve_pics/Website Pics/G1-2.jpg',

                      ];
                  // Always: content left, image right
                  return (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
                      {/* Content Left */}
                      <div className="order-1 space-y-6 text-left">
                        {/* Fixed Icon and Title Alignment - Mobile Specific */}
                        <div className="flex items-start sm:items-center space-x-3 sm:space-x-4 mb-4">
                          <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-2 rounded-lg shadow-md flex-shrink-0 flex items-center justify-center min-w-[36px] min-h-[36px] sm:min-w-[40px] sm:min-h-[40px]">
                            <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
                          </div>
                          <h3 className="typography-h3 font-semibold text-black leading-tight flex-1">
                            {feature.title}
                          </h3>
                        </div>

                        <p className="typography-h4 text-black mb-6">{feature.description}</p>

                        {/* Fixed Bullet Points - Mobile Optimized Layout */}
                        <ul className="space-y-2 sm:space-y-3">
                          {feature.features.map((item, featureIndex) => (
                            <li key={featureIndex} className="flex items-start typography-body text-black">
                              <span className="text-green-600 typography-body mr-2 sm:mr-3 flex-shrink-0 leading-6">•</span>
                              <span className="flex-1 leading-6">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Image Right - Carousel with Arrow Buttons Only */}
                      <div className="order-2 flex justify-center items-center w-full">
                        <div className="relative w-full max-w-lg md:max-w-xl lg:max-w-2xl overflow-hidden shadow-2xl border-4 border-green-200 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 rounded-3xl">
                          <div className="carousel-container">
                            <Carousel
                              images={images}
                              className="w-full h-full [&_.embla__slide]:h-full [&_.embla__slide_img]:object-cover [&_.embla__slide_img]:w-full [&_.embla__slide_img]:h-full"
                            />
                          </div>

                          {/* Carousel Styling - Arrow Buttons Only, No Dot Indicators on Mobile */}
                          <style>{`
                  /* Hide dot indicators/buttons on mobile, keep arrow buttons */
                  .carousel-container .embla__dots {
                    display: none !important;
                  }
                  
                  .carousel-container .embla__dot {
                    display: none !important;
                  }
                  
                  /* Style arrow buttons for all screen sizes */
                  .carousel-container .embla__button {
                    width: 20px !important;
                    height: 20px !important;
                    border-radius: 3px !important;
                    background: rgba(255, 255, 255, 0.9) !important;
                    border: 1px solid rgba(5, 150, 105, 0.2) !important;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    color: #059669 !important;
                    transition: all 0.2s ease !important;
                    padding: 0 !important;
                    font-weight: 900 !important;
                    line-height: 1 !important;
                    opacity: 0.9 !important;
                    cursor: pointer !important;
                  }

                  .carousel-container .embla__button:before {
                    content: '' !important;
                  }
                  
                  .carousel-container .embla__button--prev:after {
                    content: '‹' !important;
                    font-size: 14px !important;
                    font-weight: 900 !important;
                    line-height: 1 !important;
                  }
                  
                  .carousel-container .embla__button--next:after {
                    content: '›' !important;
                    font-size: 14px !important;
                    font-weight: 900 !important;
                    line-height: 1 !important;
                  }
                  
                  .carousel-container .embla__button:hover {
                    background: rgba(255, 255, 255, 1) !important;
                    opacity: 1 !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15) !important;
                  }
                  
                  .carousel-container .embla__button--prev {
                    left: 6px !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                    position: absolute !important;
                    z-index: 10 !important;
                  }
                  
                  .carousel-container .embla__button--next {
                    right: 6px !important;
                    top: 50% !important;
                    transform: translateY(-50%) !important;
                    position: absolute !important;
                    z-index: 10 !important;
                  }
                  
                  /* Medium arrow buttons for tablet */
                  @media (min-width: 640px) {
                    .carousel-container .embla__button {
                      width: 24px !important;
                      height: 24px !important;
                      border-radius: 4px !important;
                    }
                    
                    .carousel-container .embla__button--prev:after,
                    .carousel-container .embla__button--next:after {
                      font-size: 16px !important;
                    }
                    
                    .carousel-container .embla__button--prev {
                      left: 8px !important;
                    }
                    
                    .carousel-container .embla__button--next {
                      right: 8px !important;
                    }
                  }
                  
                  /* Larger arrow buttons for desktop */
                  @media (min-width: 768px) {
                    .carousel-container .embla__button {
                      width: 32px !important;
                      height: 32px !important;
                      border-radius: 6px !important;
                    }
                    
                    .carousel-container .embla__button--prev:after,
                    .carousel-container .embla__button--next:after {
                      font-size: 18px !important;
                    }
                    
                    .carousel-container .embla__button--prev {
                      left: 12px !important;
                    }
                    
                    .carousel-container .embla__button--next {
                      right: 12px !important;
                    }
                  }
                  
                  /* Disable any other carousel navigation elements */
                  .carousel-container .embla__pagination,
                  .carousel-container .embla__indicators,
                  .carousel-container .embla__nav {
                    display: none !important;
                  }
                `}</style>

                          {/* Decorative overlay for attractiveness */}
                          <div className="absolute inset-0 pointer-events-none rounded-3xl">
                            <div className="absolute top-0 left-0 w-24 h-24 bg-green-400/10 rounded-full blur-2xl animate-float" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl animate-float-delayed" />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Product Overview Tabs */}
          <div className="py-10 sm:py-12 lg:py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="typography-h1 font-bold text-black mb-6 sm:mb-8">
                  Comprehensive Energy Management Solution
                </h2>
                <p className="typography-body text-gray-700 max-w-4xl mx-auto font-medium">
                  Transform how you monitor, manage, and optimize energy resources across your entire operations with our
                  <span className="text-green-600 font-bold"> AI-powered platform</span>
                </p>
              </div>

              {/* Enhanced Tab Navigation with Advanced Animations - Mobile Optimized */}
              <motion.div
                className="flex flex-wrap justify-center mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl max-w-4xl mx-auto border border-green-100/50 overflow-x-auto scrollbar-thin scrollbar-thumb-green-200 scrollbar-track-transparent"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex flex-nowrap md:flex-wrap w-full justify-start md:justify-center gap-2 sm:gap-3 px-2 py-2">
                  {[
                    { id: 'overview', label: 'Why Choose ALENSOFT EnMS', icon: Target },
                    { id: 'features', label: 'Features', icon: Settings },
                    { id: 'benefits', label: 'Benefits', icon: Award },
                    { id: 'modules', label: 'Add-on Modules', icon: Globe }
                  ].map((tab, index) => {
                    const TabIcon = tab.icon;
                    return (
                      <motion.button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium typography-body transition-all duration-300 whitespace-nowrap flex-shrink-0 min-w-[100px] sm:min-w-[120px] ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'text-black hover:text-green-600 hover:bg-green-50/80'
                          }`}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: 0.1 + (index * 0.1),
                          type: "spring",
                          stiffness: 200
                        }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {/* Active Tab Background Animation */}
                        {activeTab === tab.id && (
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-green-600 to-emerald-600"
                            layoutId="activeTab"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}

                        {/* Ripple Effect */}
                        <motion.div
                          className="absolute inset-0 bg-white/20 rounded-lg sm:rounded-xl"
                          initial={{ scale: 0, opacity: 0 }}
                          whileTap={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.2 }}
                        />

                        <motion.div
                          className="relative z-10"
                          animate={activeTab === tab.id ? { rotate: [0, 360] } : {}}
                          transition={{ duration: 0.6, ease: "easeInOut" }}
                        >
                          <TabIcon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-all ${activeTab === tab.id ? 'text-green-200' : 'text-gray-500 group-hover:text-green-500'
                            }`} />
                        </motion.div>

                        <span className="relative z-10 typography-body">{tab.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {/* Enhanced Tab Content with Smooth Transitions - Mobile Optimized */}
              <motion.div
                className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-green-100/50 relative overflow-hidden"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {/* Background Animation */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-green-50/50 via-emerald-50/30 to-teal-50/50"
                  animate={{
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />

                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="space-y-8 sm:space-y-10">
                        {/* Why Choose Alensoft EnMS? Question - At the Top */}
                        <div className="text-center mb-8 sm:mb-10">
                          <h3 className="typography-h2 font-bold text-black mb-6">
                            Why Choose Alensoft EnMS?
                          </h3>
                          <p className="typography-h4 text-black max-w-32l mx-auto">
                            ALENSOFT EnMS is a comprehensive, scalable platform that integrates hardware and
                            operational controls to advanced AI analytics.
                            <span className="text-emerald-700 font-black"> Optimize and manage your enterprise&
                              energy, utility & sustainability performance with a unified, future-proof solution.</span>
                          </p>
                        </div>

                        {/* Key Points - Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {/* Cost Optimization */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-green-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="typography-h4 font-semibold text-black">Cost Optimization</h4>
                            </div>
                            <p className="typography-body text-black">Reduce energy costs by 8-15% through intelligent monitoring and optimization strategies.</p>
                          </div>

                          {/* Sustainability Goals */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <Leaf className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="typography-h4 font-semibold text-black">Sustainability Goals</h4>
                            </div>
                            <p className="typography-body text-black">Meet environmental targets with comprehensive carbon footprint management.</p>
                          </div>

                          {/* Compliance Ready */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl sm:rounded-2xl border border-teal-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-teal-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="font-semibold text-black typography-h4">Compliance Ready</h4>
                            </div>
                            <p className="typography-body text-black">Built-in support for ISO 50001 and international energy standards.</p>
                          </div>

                          {/* Competitive Edge */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl border border-green-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-green-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="typography-h4 font-semibold text-black">Competitive Edge</h4>
                            </div>
                            <p className="typography-body text-black">Gain strategic advantages through data-driven insights and predictive analytics.</p>
                          </div>

                          {/* Resource Optimization */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl sm:rounded-2xl border border-emerald-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-emerald-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="typography-h4 font-semibold text-black">Resource Optimization</h4>
                            </div>
                            <p className="typography-body text-black">Transform how you monitor, manage, and optimize resources with AI-powered intelligence.</p>
                          </div>

                          {/* Operational Excellence */}
                          <div className="group p-4 sm:p-6 bg-gradient-to-br from-teal-50 to-green-50 rounded-xl sm:rounded-2xl border border-teal-100 hover:shadow-lg transition-all h-full">
                            <div className="flex items-center mb-4">
                              <div className="bg-teal-600 p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0">
                                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                              </div>
                              <h4 className="typography-h4 font-semibold text-black">Operational Excellence</h4>
                            </div>
                            <p className="typography-body text-black">Achieve peak performance through comprehensive monitoring and predictive maintenance.</p>
                          </div>
                        </div>


                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'features' && (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="space-y-8 sm:space-y-10">
                        <div className="text-center">
                          <h3 className="typography-h2 font-semibold text-black mb-6">
                            Core Features
                          </h3>
                          <p className="typography-h4 text-black max-w-2xl mx-auto">
                            Comprehensive energy management capabilities designed for modern industrial operations
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                          {coreFeatures.map((feature, index) => {
                            const IconComponent = feature.icon;
                            const gradients = [
                              'from-green-500 to-emerald-600',
                              'from-emerald-500 to-teal-600',
                              'from-teal-500 to-green-600',
                              'from-green-600 to-emerald-700',
                              'from-emerald-600 to-teal-700',
                              'from-teal-600 to-green-700',
                              'from-green-700 to-emerald-800',
                              'from-emerald-700 to-teal-800'
                            ];
                            return (
                              <div key={index} className="group">
                                <div className="bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:border-green-300 transition-all duration-500 transform hover:-translate-y-2">
                                  {/* Icon and Title on Same Line */}
                                  <div className="flex items-center mb-4">
                                    <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0`}>
                                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-black typography-h4">{feature.title}</h4>
                                  </div>

                                  {/* Description Text Below */}
                                  <p className="typography-body text-black font-normal leading-relaxed">{feature.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'benefits' && (
                    <motion.div
                      key="benefits"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="space-y-8 sm:space-y-10">
                        <div className="text-center">
                          <h3 className="typography-h2 font-semibold text-black mb-6">
                            Key Benefits
                          </h3>
                          <p className="typography-h4 text-black max-w-2xl mx-auto">
                            Discover the transformative advantages of our energy management solution
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                          {benefits.map((benefit, index) => {
                            const IconComponent = benefit.icon;
                            const gradients = [
                              'from-green-500 to-emerald-600',
                              'from-emerald-500 to-teal-600',
                              'from-teal-500 to-green-600',
                              'from-green-600 to-emerald-700'
                            ];
                            return (
                              <div key={index} className="group">
                                <div className="bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:border-green-300 transition-all duration-500 transform hover:-translate-y-2">
                                  {/* Icon and Title on Same Line */}
                                  <div className="flex items-center mb-4">
                                    <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-2 sm:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-3 sm:mr-4 flex-shrink-0`}>
                                      <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-black typography-h4">{benefit.title}</h4>
                                  </div>

                                  {/* Description Text Below */}
                                  <p className="typography-body text-black font-normal leading-relaxed">{benefit.description}</p>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'modules' && (
                    <motion.div
                      key="modules"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10"
                    >
                      <div className="space-y-8 sm:space-y-10">
                        <div className="text-center">
                          <h3 className="typography-h2 font-semibold text-black mb-6">
                            Specialized Add-on Modules
                          </h3>
                          <p className="typography-h4 text-black max-w-2xl mx-auto">
                            Extend your energy management capabilities with powerful specialized modules
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                          {addOnModules.map((module, index) => {
                            const IconComponent = module.icon;
                            const gradients = [
                              'from-green-500 to-emerald-600',
                              'from-emerald-500 to-teal-600',
                              'from-teal-500 to-green-600',
                              'from-green-600 to-emerald-700',
                              'from-emerald-600 to-teal-700',
                              'from-teal-600 to-green-700'
                            ];
                            return (
                              <div key={index} className="group">
                                <div
                                  className="bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:border-green-300 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                                  onClick={() => setSelectedModule(selectedModule === index ? null : index)}
                                >
                                  {/* Icon, Title, and Arrow on Same Line */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center">
                                      <div className={`bg-gradient-to-br ${gradients[index % gradients.length]} p-1.5 sm:p-2 md:p-3 rounded-lg sm:rounded-xl group-hover:scale-110 transition-transform mr-2 sm:mr-3 md:mr-4 flex-shrink-0`}>
                                        <IconComponent className="w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6 text-white" />
                                      </div>
                                      <h4 className="font-semibold text-black typography-h4">{module.title}</h4>
                                    </div>
                                    {/* Arrow Icon */}
                                    <motion.div
                                      className="flex-shrink-0"
                                      animate={{ rotate: selectedModule === index ? 180 : 0 }}
                                      transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                      <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-600 group-hover:text-green-700 transition-colors" />
                                    </motion.div>
                                  </div>

                                  {/* Description Text Below */}
                                  <p className="typography-body text-gray-800 font-semibold mb-4">{module.description}</p>

                                  {/* Features List - Animated Expand/Collapse */}
                                  <AnimatePresence>
                                    {selectedModule === index && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                      >
                                        <ul className="list-disc pl-5 space-y-2 text-left mb-4">
                                          {module.features.map((f, i) => (
                                            <motion.li
                                              key={i}
                                              className="typography-body text-gray-700 font-semibold"
                                              initial={{ opacity: 0, x: -10 }}
                                              animate={{ opacity: 1, x: 0 }}
                                              transition={{ duration: 0.3, delay: i * 0.1 }}
                                            >
                                              {f}
                                            </motion.li>
                                          ))}
                                        </ul>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>

          {/* Partner Section - Separate & Distinct */}
          <div className="mt-10 sm:mt-16 py-10 sm:py-16 bg-gradient-to-br from-green-100 via-green-50 to-emerald-50 border-t-4 border-green-200">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Heading */}
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="typography-h2 font-bold text-black mb-6 sm:mb-8">
                  PARTNER WITH THE ENERGY MANAGEMENT EXPERTS
                </h2>
              </div>
              {/* Two Column Layout - Mobile First */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                {/* First Column - Image (appears first on mobile) */}
                <div className="relative order-1 lg:order-2">
                  <div className="relative group">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop&auto=format"
                      alt="Energy Management Experts"
                      className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl group-hover:scale-105 transition-all duration-500 border-2 sm:border-4 border-green-100"
                      loading="lazy"
                      width={1920}
                      height={1080}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-600/30 via-transparent to-transparent rounded-xl sm:rounded-2xl"></div>
                  </div>
                  {/* Floating Elements */}
                  <div className="absolute -top-3 sm:-top-4 -right-3 sm:-right-4 bg-green-600 text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl shadow-xl">
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="font-bold typography-body">Expert Support</span>
                    </div>
                  </div>
                </div>
                {/* Second Column - Content (appears second on mobile) */}
                <div className="space-y-6 sm:space-y-8 order-2 lg:order-1 mt-8 lg:mt-0">
                  <p className="typography-body text-gray-800 font-semibold leading-relaxed">
                    At Atandra, we understand that effective energy management requires more than just technology—it demands
                    expertise, support, and a commitment to your success. Our team of specialists works alongside you to ensure
                    you achieve maximum value from your EnMS implementation.
                  </p>
                  <p className="typography-body text-gray-800 font-semibold leading-relaxed">
                    Contact us today to schedule a personalized demonstration and discover how ALENSOFT EnMS can transform
                    your approach to energy and resource management.
                  </p>
                  {/* Enhanced Contact Support Button with Magnetic Effect */}
                  <div className="pt-4 sm:pt-6 flex justify-center lg:justify-start">
                    <Link to="/contact/sales" className="inline-block">
                      <MagneticButton
                        className="inline-flex items-center px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-bold typography-body rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 relative"
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                          className="mr-3 sm:mr-4"
                        >
                          <Users className="w-6 h-6 sm:w-7 sm:h-7" />
                        </motion.div>
                        <span>Contact Our Experts</span>
                        {/* Sparkle Effects */}
                        <div className="absolute inset-0 pointer-events-none">
                          {Array.from({ length: 4 }).map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-white rounded-full"
                              style={{
                                left: `${20 + i * 20}%`,
                                top: `${30 + i * 15}%`,
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scale: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                delay: i * 0.3,
                                ease: 'easeInOut'
                              }}
                            />
                          ))}
                        </div>
                      </MagneticButton>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Custom Animations and Effects */}
          <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(-2deg); }
          }
          @keyframes shimmer {
            0% { background-position: -200% 0; }
            100% { background-position: 200% 0; }
          }
          @keyframes pulse-glow {
            0%, 100% {
              box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
              transform: scale(1);
            }
            50% {
              box-shadow: 0 0 40px rgba(34, 197, 94, 0.6);
              transform: scale(1.02);
            }
          }
          @keyframes morphing-gradient {
            0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
            25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
            50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; }
            75% { border-radius: 60% 40% 60% 30% / 70% 30% 60% 70%; }
            100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          }
          @keyframes particle-float {
            0% {
              transform: translateY(100vh) translateX(0px) rotate(0deg);
              opacity: 0;
            }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% {
              transform: translateY(-100px) translateX(100px) rotate(360deg);
              opacity: 0;
            }
          }

          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite;
          }
          .animate-shimmer {
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
            background-size: 200% 100%;
            animation: shimmer 2s infinite;
          }
          .animate-pulse-glow {
            animation: pulse-glow 3s ease-in-out infinite;
          }
          .animate-morphing {
            animation: morphing-gradient 8s ease-in-out infinite;
          }
          .animate-particle-float {
            animation: particle-float 8s linear infinite;
          }

          /* Glassmorphism effects */
          .glass-effect {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
          }

          /* Magnetic hover effect */
          .magnetic-hover {
            transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }
          ::-webkit-scrollbar-track {
            background: rgba(34, 197, 94, 0.1);
          }
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #22c55e, #10b981);
            border-radius: 4px;
          }
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #16a34a, #059669);
          }
        `}</style>
        </PageLayout>
      </div>
    </>
  );
};

export default OnPremiseSystemsPage;
