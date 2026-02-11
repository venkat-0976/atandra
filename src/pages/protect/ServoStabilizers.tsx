import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import EnhancedPageTitle from "@/components/ui/EnhancedPageTitle";
import SeoHead from '@/seo/SeoHead';
import {
  Zap,
  Shield,
  Plus,
  PlusCircle,
  Globe,
  Clock,
  ShieldCheck,
  ShieldCheckIcon,
  GaugeIcon,
  ZapIcon,
  Headphones,
  HelpCircle,
  BarChart3,
  ArrowRight,
  FileText,
  Mail
} from "lucide-react";



// Watermark Component
const Watermark = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center overflow-hidden">
      <div className="absolute w-full h-full">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="watermark" patternUnits="userSpaceOnUse" width="600" height="600">
              <text
                x="300"
                y="300"
                fontSize="60"
                fontWeight="bold"
                fill="rgba(59, 130, 246, 0.03)"
                textAnchor="middle"
                dominantBaseline="middle"
                transform="rotate(-45, 300, 300)"
              >
                SERVO STABILIZER
              </text>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#watermark)" />
        </svg>
      </div>
    </div>
  );
};

// CountUp Animation Component
const CountUp = ({ to, from = 0, duration = 2, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [count, setCount] = useState(from);

  useEffect(() => {
    const element = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  useEffect(() => {
    let frame;
    let startTime;

    if (isInView) {
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

        setCount(Math.floor(from + (to - from) * progress));

        if (progress < 1) {
          frame = requestAnimationFrame(animate);
        }
      };

      setTimeout(() => {
        frame = requestAnimationFrame(animate);
      }, delay * 1000);
    }

    return () => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, [isInView, from, to, duration, delay]);

  return <span ref={ref} className={className}>{count}</span>;
};

// Feature data
const features = [
  {
    title: "True RMS Correction",
    icon: <Zap className="h-6 w-6 text-white" />,
    description: "Advanced measurement and correction technology",
    items: [
      {
        icon: <Zap className="h-5 w-5 text-white" />,
        title: "Microprocessor",
        description: "Based control system for measurement and correction",
      },
      {
        icon: <BarChart3 className="h-5 w-5 text-white" />,
        title: "Digital Voltage, Current",
        description: "& Frequency display",
      },
    ],
  },
  {
    title: "Comprehensive Protection",
    icon: <Shield className="h-6 w-6 text-white" />,
    description: "Multiple layers of protection for your equipment",
    items: [
      {
        icon: <Shield className="h-5 w-5 text-white" />,
        title: "Standard Protection",
        description:
          "Optional LOW / HIGH / Low voltage & frequency, Overload, Single Phasing, High / ± Voltage.",
      },
      {
        icon: <Zap className="h-5 w-5 text-white" />,
        title: "Electronic Output Overload",
        description:
          "Trip uses a unique current sensing circuit - SCPT/OC to detect-and-trip based Overload protection",
      },
    ],
  },
  {
    title: "Optional Protection",
    icon: <PlusCircle className="h-6 w-6 text-white" />,
    description: "Additional protection features for specialized needs",
    items: [
      {
        icon: <Plus className="h-5 w-5 text-white" />,
        title: "Optional Protection",
        description:
          "Features: Offline 3-in-1 High Voltage surge Phase Neutral Spike Filter, ELCB / RCCB, Type 2 Surge Suppressor",
      },
    ],
  },
  {
    title: "After Sales Support",
    icon: <Headphones className="h-6 w-6 text-white" />,
    description: "Comprehensive service network and guarantees",
    items: [
      {
        icon: <Globe className="h-5 w-5 text-white" />,
        title: "Wide",
        description: "Service network",
      },
      {
        icon: <Clock className="h-5 w-5 text-white" />,
        title: "Service Response Within",
        description:
          "8 hours in Service towns and within 24 hours in the same State",
      },
      {
        icon: <ShieldCheck className="h-5 w-5 text-white" />,
        title: "Comprehensive AMC",
        description:
          "Regardless of the age of the Stab'lizer",
      },
    ],
  },
  {
    title: "CE Certified & CPRI Tested",
    icon: <ShieldCheck className="h-6 w-6 text-white" />,
    description: "Certified for global standards and tested for reliability.",
    items: [
      {
        icon: <ShieldCheck className="h-5 w-5 text-white" />,
        title: "CE Certified",
        description: "Meets European safety and quality standards.",
      },
      {
        icon: <BarChart3 className="h-5 w-5 text-white" />,
        title: "Type Tested at CPRI Bengaluru",
        description: "Ensures performance and safety as per Indian standards.",
      },
      {
        icon: <Headphones className="h-5 w-5 text-white" />,
        title: "Pan India Service Support",
        description: "Company operated service centres across India.",
      },
    ],
  },
];



const productTypes = [
  {
    id: "single-phase-servo-stabilizer",
    title: "1 Phase Stabilizers",
    description: "Perfect for homes and small businesses. Protects sensitive electronics from voltage fluctuations.",
    features: [
      "Digital control for precise regulation",
      "Fast response time (<40ms)",
      "High efficiency design",
      "Compact and noise-free operation",
      "Comprehensive surge protection",
      "Wide input voltage window"
    ], accentColor: "from-blue-400 to-cyan-600",
    textColor: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    imageUrl: "/Servo_stabilizers/SS_28_AUIT_-_1-removebg-preview.png",
    altText: "1 Phase Home Servo Stabilizer",
    path: "/protect/servo-stabilizers/product/single-phase-servo-stabilizer"
  },
  {
    id: "three-phase-servo-stabilizer",
    title: "3 Phase Stabilizers",
    description: "Ideal for industrial applications and heavy machinery. Ensures consistent power across all phases.",
    features: [
      "Microprocessor controlled digital design",
      "High-speed correction",
      "Three independent control circuits",
      "LCD display for all parameters",
      "Wide input voltage range",
      "High overload capacity"
    ],
    accentColor: "from-blue-500 to-indigo-600",
    textColor: "text-blue-700",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    imageUrl: "/Servo_stabilizers/SS_28_-1-removebg-preview.png",
    altText: "3 Phase Industrial Servo Stabilizer",
    path: "/protect/servo-stabilizers/product/three-phase-servo-stabilizer"
  },

];

const specifications = [
  {
    category: "Input",
    items: [
      { label: "Voltage Range", value: "170-280V AC" },
      { label: "Frequency", value: "47-53 Hz" },
      { label: "Phase Options", value: "1φ and 3φ" }
    ]
  },
  {
    category: "Output",
    items: [
      { label: "Regulation", value: "±1%" },
      { label: "Correction Rate", value: "<20ms" },
      { label: "Efficiency", value: ">98%" }
    ]
  },
  {
    category: "Protection",
    items: [
      { label: "Overload Trip", value: "110% to 150%" },
      { label: "Surge Protection", value: "Class III" },
      { label: "EMI/RFI Filter", value: "Optional" }
    ]
  }
];





const ServoStabilizers = () => {
  const navigate = useNavigate();

  // Function to open brochure PDF
  const openBrochure = () => {
    // URL to your PDF file
    const pdfUrl = "/Krykard PCE January 2025.pdf";

    // Open PDF directly in a new tab
    window.open(pdfUrl, '_blank');
  };

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KRYKARD Servo Voltage Stabilizers",
    "description": "Advanced servo voltage stabilizers with ±1% accuracy, microprocessor control and >98% efficiency for residential & industrial protection.",
    "url": "https://atandra.in/protect/servo-stabilizers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": productTypes.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "description": product.description,
          "brand": {
            "@type": "Brand",
            "name": "KRYKARD"
          },
          "model": product.title,
          "url": product.title === "1 Phase Stabilizers"
            ? "https://atandra.in/protect/servo-stabilizers/product/single-phase-servo-stabilizer"
            : "https://atandra.in/protect/servo-stabilizers/product/three-phase-servo-stabilizer",
          "image": `https://atandra.in${product.imageUrl}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="Servo Voltage Stabilizers for Precise Voltage Control"
        description="Advanced servo voltage stabilizers with ±1% accuracy, microprocessor control and >98% efficiency for residential & industrial protection."
        keywords="servo stabilizer, voltage stabilizer, voltage regulator, voltage correction, automatic voltage regulator, AVR, voltage regulation, power stabilizer, electrical stabilizer, industrial stabilizer, residential stabilizer"
        canonical="https://atandra.in/protect/servo-stabilizers"
        ogImage="/background_images/servo stabilizers.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/servo stabilizers.png"
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >
        {/* Global Attractive Background Design */}
        <div className="fixed inset-0 -z-50 overflow-hidden">
          {/* Primary gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20"></div>

          {/* Animated floating orbs */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-indigo-400/8 rounded-full blur-3xl animate-pulse-slow-reverse"></div>
          <div className="absolute bottom-40 left-1/4 w-80 h-80 bg-cyan-400/6 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-purple-400/8 rounded-full blur-3xl animate-float-reverse"></div>

          {/* Geometric patterns */}
          <div className="absolute top-0 left-0 w-full h-full opacity-5">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-300 rounded-full animate-spin-slow"></div>
            <div className="absolute top-3/4 right-1/4 w-24 h-24 border border-indigo-300 rounded-full animate-spin-slow-reverse"></div>
            <div className="absolute top-1/2 left-1/2 w-40 h-40 border border-cyan-300 rounded-full animate-pulse"></div>
          </div>

          {/* Subtle grid pattern */}
          <div className="absolute inset-0 opacity-3" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59,130,246,0.15) 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Enhanced CSS Animations */}
        <style>
          {`
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.05); }
          }
          @keyframes pulse-slow-reverse {
            0%, 100% { opacity: 0.08; transform: scale(1.05); }
            50% { opacity: 0.15; transform: scale(1); }
          }
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(10px) rotate(240deg); }
          }
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(360deg); }
            33% { transform: translateY(15px) rotate(240deg); }
            66% { transform: translateY(-10px) rotate(120deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-pulse-slow { animation: pulse-slow 8s ease-in-out infinite; }
          .animate-pulse-slow-reverse { animation: pulse-slow-reverse 10s ease-in-out infinite; }
          .animate-float { animation: float 15s ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse 12s ease-in-out infinite; }
          .animate-spin-slow { animation: spin-slow 20s linear infinite; }
          .animate-spin-slow-reverse { animation: spin-slow-reverse 25s linear infinite; }
        `}
        </style>

        {/* Watermark */}
        <Watermark />



        {/* Hero Section - Updated to match UPS page structure and spacing */}
        <div className="relative py-4 md:py-6 overflow-hidden font-['Open_Sans']">
          {/* Hero Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-50 rounded-bl-[100px] transform -skew-x-12"></div>
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10"></div>
          </div>
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[10%_90%] gap-0 items-center">
              {/* Left Spacer for 10% on large screens */}
              <div className="hidden lg:block"></div>
              {/* Content and Image Side by Side */}
              <div className="lg:flex lg:flex-row lg:items-center lg:gap-4">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 text-center lg:text-left lg:w-1/2"
                >
                  <div className="inline-block bg-blue-400 py-1 px-3 rounded-full mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Servo Stabilizers</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                    SERVO STABILIZERS
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                    Advanced Voltage Regulation for Critical Equipment Protection. KRYKARD Servo Stabilizers provide precise voltage control with ±1% accuracy, ensuring optimal performance and longevity of sensitive electronic equipment.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center space-x-2 font-['Open_Sans']"
                      onClick={() => navigate('/contact/sales')}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg shadow-sm transition duration-300 hover:bg-blue-50 flex items-center space-x-2 font-['Open_Sans']"
                      onClick={openBrochure}
                    >
                      <span>View Brochure</span>
                      <FileText className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </motion.div>
                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center items-stretch lg:justify-center lg:w-1/2 lg:pl-8"
                >
                  <div className="relative w-full flex items-center justify-center h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px]">
                    <img
                      src="/Servo_stabilizers/SS_12_-_1-removebg-preview.png"
                      alt="KRYKARD Servo Voltage Stabilizers for Residential and Industrial Protection"
                      className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[720px]
                                  max-h-[260px] md:max-h-[340px] lg:max-h-[420px] xl:max-h-[480px]
                                h-auto object-contain"
                      // style={{ aspectRatio: '3/4', minHeight: 0 }}
                      width={520}
                      height={780}
                      loading="eager"
                      decoding="async"
                      // fetchpriority="high"
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/180x240/3B82F6/FFFFFF?text=Servo+Stabilizers';
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>


        {/* Simple Navigation Bar */}
        <section className="py-2 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
          <div className="container mx-auto px-0 sm:px-4">
            <div className="flex justify-center">
              <nav className="flex overflow-x-auto no-scrollbar space-x-2 sm:space-x-6 w-full sm:w-auto px-1 sm:px-0 items-center justify-center">
                <a href="#products" className="min-w-max px-4 py-2 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium font-['Open_Sans'] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">Products</a>
                <a href="#overview" className="min-w-max px-4 py-2 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium font-['Open_Sans'] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">Overview</a>
                <a href="#specifications" className="min-w-max px-4 py-2 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium font-['Open_Sans'] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">Specifications</a>
                <a href="#features" className="min-w-max px-4 py-2 rounded-lg text-blue-600 hover:text-white hover:bg-blue-600 font-medium font-['Open_Sans'] transition-colors text-base focus:outline-none focus:ring-2 focus:ring-blue-400 whitespace-nowrap">Features</a>
              </nav>
            </div>
          </div>
        </section>

        {/* Product Section - Updated to match UPS page structure */}
        <div id="products" className="relative py-8 md:py-12 overflow-hidden bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 font-['Open_Sans']"
            >
              {/* Main Heading */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
              >
                Our <span className="text-gray-900 relative">
                  Servo Stabilizer Range
                </span>
              </motion.h2>
              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                From residential applications to industrial installations, we offer comprehensive voltage regulation solutions designed for precision and reliability across all sectors
              </motion.p>
            </motion.div>
            {/* Simple Product Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto items-stretch">
              {productTypes.map((product, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-blue-100/50 dark:border-blue-900/30 h-full flex flex-col"
                >
                  {/* Product Image - Consistent Height */}
                  <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-700" style={{ height: "320px" }}>
                    <img
                      src={product.imageUrl}
                      alt={`KRYKARD ${product.title} Servo Stabilizer for ${product.id === "single-phase-servo-stabilizer" ? "Residential Applications" : "Industrial Applications"}`}
                      className="max-h-72 object-contain"
                      loading="lazy"
                      width={320}
                      height={240}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Open_Sans']">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-4 font-['Open_Sans']">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md font-medium py-2 rounded-lg transition-all duration-300 font-['Open_Sans'] text-base"
                        onClick={() => {
                          if (product.path) {
                            navigate(product.path);
                          } else {
                            navigate('/contact/sales');
                          }
                        }}
                      >
                        {product.path ? "View Details" : "Request Custom Solution"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use Cases Overview Section - Updated to match UPS page structure */}
        <div id="overview" className="relative py-12 md:py-16 bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 font-['Open_Sans']"
            >
              {/* Main Title with Enhanced Animation */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-['Open_Sans'] leading-tight"
              >
                Top <span className="text-gray-900">Servo Stabilizer Applications</span>
                <br className="hidden sm:block" />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Across Industries</span>
              </motion.h2>

              {/* Enhanced Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Discover how KRYKARD Servo Stabilizers provide critical voltage regulation across diverse industries,
                ensuring equipment protection and operational efficiency in challenging power environments.
              </motion.p>
            </motion.div>

            {/* Use Cases Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Healthcare & Medical */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Healthcare & Medical</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> MRI machines, CT scanners, dialysis units, ventilators</p>
                  <p><strong>Critical Need:</strong> ±1% voltage regulation for patient safety</p>
                  <p><strong>Benefits:</strong> Prevents equipment damage, ensures accurate diagnostics</p>
                  <p><strong>Installations:</strong> 500+ hospitals, 1000+ clinics</p>
                </div>
              </div>

              {/* Manufacturing & Industrial */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Industrial</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> CNC machines, robotic arms, conveyor systems, PLCs</p>
                  <p><strong>Critical Need:</strong> Consistent power for precision manufacturing</p>
                  <p><strong>Benefits:</strong> Reduces downtime, improves product quality</p>
                  <p><strong>Installations:</strong> 2000+ factories, 15+ countries</p>
                </div>
              </div>

              {/* Data Centers & IT */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Data Centers & IT</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Servers, storage systems, network equipment, cooling systems</p>
                  <p><strong>Critical Need:</strong> 24/7 stable power for uptime guarantee</p>
                  <p><strong>Benefits:</strong> 99.9% uptime, prevents data loss</p>
                  <p><strong>Installations:</strong> 300+ data centers, cloud providers</p>
                </div>
              </div>

              {/* Textile & Garment */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Textile & Garment</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Weaving machines, dyeing units, embroidery machines</p>
                  <p><strong>Critical Need:</strong> Stable power for consistent fabric quality</p>
                  <p><strong>Benefits:</strong> Uniform dyeing, precise stitching patterns</p>
                  <p><strong>Installations:</strong> 800+ textile mills, export units</p>
                </div>
              </div>

              {/* Automotive */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-red-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Automotive</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Welding robots, paint booths, assembly lines, testing equipment</p>
                  <p><strong>Critical Need:</strong> Precise voltage for quality control</p>
                  <p><strong>Benefits:</strong> Consistent weld quality, perfect paint finish</p>
                  <p><strong>Installations:</strong> 200+ auto plants, tier-1 suppliers</p>
                </div>
              </div>

              {/* Pharmaceuticals */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-teal-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 font-['Open_Sans']">Pharmaceuticals</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Tablet presses, packaging machines, clean room systems</p>
                  <p><strong>Critical Need:</strong> FDA compliance, contamination prevention</p>
                  <p><strong>Benefits:</strong> Consistent dosage, sterile environment</p>
                  <p><strong>Installations:</strong> 150+ pharma companies, research labs</p>
                </div>
              </div>

            </div>

            {/* Simple & Attractive Summary Stats with Count-Up */}
            <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
              {/* Stats background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-indigo-50/20 dark:from-blue-900/10 dark:to-indigo-900/10"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center relative z-10">
                <div className="group">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white font-['Open_Sans'] mb-2">
                    <CountUp to={500000} duration={2.5} delay={0.2} />+
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Total Installations</div>
                  <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white font-['Open_Sans'] mb-2">
                    <CountUp to={50} duration={2} delay={0.4} />+
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Industries Served</div>
                  <div className="w-12 h-1 bg-green-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white font-['Open_Sans'] mb-2">
                    <CountUp to={99} duration={2} delay={0.6} />.9%
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Reliability Rate</div>
                  <div className="w-12 h-1 bg-purple-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white font-['Open_Sans'] mb-2">
                    <CountUp to={40} duration={2} delay={0.8} />+
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Years Experience</div>
                  <div className="w-12 h-1 bg-orange-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section - Updated to match UPS page structure */}
        <div id="specifications" className="relative py-8 md:py-12 overflow-hidden bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 font-['Open_Sans']"
            >
              {/* Main Heading */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
              >
                Technical <span className="text-gray-900 relative">
                  Specifications
                </span>
              </motion.h2>
              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Engineered for optimal performance across a wide range of applications with industry-leading precision and reliability
              </motion.p>
            </motion.div>

            {/* Mobile-First Specification Cards with Touch Optimization */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 lg:gap-6 max-w-6xl mx-auto">
              {specifications.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 60
                  }}
                  whileHover={{
                    y: -2,
                    scale: 1.01,
                    transition: {
                      type: "spring",
                      stiffness: 120,
                      damping: 20
                    }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className="group relative touch-manipulation"
                >
                  {/* Card glow effect on hover - Minimal for mobile */}
                  <div className="absolute -inset-0.5 sm:-inset-1 bg-gradient-to-r from-blue-500/10 sm:from-blue-500/20 md:from-blue-500/30 via-indigo-500/10 sm:via-indigo-500/20 md:via-indigo-500/30 to-purple-500/10 sm:to-purple-500/20 md:to-purple-500/30 rounded-lg sm:rounded-xl md:rounded-2xl blur-sm sm:blur-md md:blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Main card with glass morphism */}
                  <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg md:shadow-xl overflow-hidden border-2 border-blue-200/70 dark:border-blue-700/50 relative z-10 h-full transform transition-all duration-300 group-hover:shadow-2xl group-active:shadow-lg">
                    {/* Decorative top bar with gradient */}
                    <div className="h-2 sm:h-2.5 md:h-3 w-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                    <div className="p-2.5 sm:p-3 md:p-4 lg:p-6">
                      {/* Category heading with icon - Optimized for mobile */}
                      <div className="flex items-center mb-3 sm:mb-4 md:mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-1.5 sm:p-2 md:p-3 rounded-md sm:rounded-lg md:rounded-xl mr-2 sm:mr-3 shadow-md sm:shadow-lg transform transition-transform duration-300 group-hover:scale-105 group-hover:rotate-2 flex-shrink-0">
                          {index === 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : index === 1 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-2.5 w-2.5 sm:h-3 sm:w-3 md:h-4 md:w-4 lg:h-5 lg:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-700 dark:group-hover:text-indigo-400 transition-colors duration-300 font-['Open_Sans']">
                          {spec.category}
                        </h3>
                      </div>

                      {/* Animated specs list - Mobile-optimized spacing and layout */}
                      <div className="space-y-1.5 sm:space-y-2 md:space-y-3">
                        {spec.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -10 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: 0.1 + (itemIndex * 0.05) }}
                            className="relative"
                          >
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center p-2 sm:p-2.5 md:p-3 rounded-md sm:rounded-lg bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/50 dark:to-indigo-900/50 border-2 border-blue-200/70 dark:border-blue-700/50 transform transition-all duration-200 hover:translate-y-[-1px] sm:hover:translate-y-[-2px] hover:shadow-sm motion-safe touch-manipulation">
                              <div className="flex items-center mb-1 sm:mb-0">
                                <div className="w-1.5 sm:w-2 md:w-2.5 h-1.5 sm:h-2 md:h-2.5 rounded-full bg-blue-600 mr-1.5 sm:mr-2 flex-shrink-0 shadow-sm"></div>
                                <span className="text-gray-900 dark:text-gray-200 font-semibold text-sm sm:text-base md:text-lg font-['Open_Sans'] break-words leading-tight">{item.label}</span>
                              </div>
                              <motion.div
                                className="font-bold text-indigo-700 dark:text-indigo-400 bg-indigo-100/80 dark:bg-indigo-900/50 px-2 sm:px-2.5 py-1 sm:py-1.5 rounded text-sm sm:text-base md:text-lg font-['Open_Sans'] self-start sm:self-auto mt-1 sm:mt-0 whitespace-nowrap border border-indigo-200/60 dark:border-indigo-700/40 shadow-sm"
                                whileHover={{
                                  scale: 1.02,
                                  backgroundColor: "rgba(79, 70, 229, 0.15)"
                                }}
                                whileTap={{
                                  scale: 0.98
                                }}
                              >
                                {item.value}
                              </motion.div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Interactive 3D corner accent - Hidden on mobile for performance */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 md:-bottom-3 md:-right-3 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 border-r-2 border-b-2 border-blue-500/70 rounded-br-md sm:rounded-br-lg md:rounded-br-xl hidden sm:block"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)"
                        }}
                      />

                      {/* Simplified particle effect - Only on larger screens */}
                      {Array.from({ length: 2 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-0.5 h-0.5 sm:w-1 sm:h-1 md:w-1.5 md:h-1.5 rounded-full bg-blue-500/40 motion-safe hidden sm:block"
                          style={{
                            top: `${30 + i * 40}%`,
                            left: `${20 + i * 60}%`,
                            zIndex: 20
                          }}
                          animate={{
                            opacity: [0.4, 0.1, 0.4],
                            scale: [1, 1.2, 1],
                          }}
                          transition={{
                            duration: 3 + i,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Mobile-Optimized Summary Cards with Touch Feedback */}
            <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 md:gap-4 max-w-4xl mx-auto"
              >
                {/* Key Performance Indicators */}
                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 shadow-md sm:shadow-lg border-2 border-blue-200/70 dark:border-blue-700/50 text-center touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 font-['Open_Sans']">
                    ±1%
                  </div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold font-['Open_Sans'] leading-tight">
                    Voltage Regulation
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 shadow-md sm:shadow-lg border-2 border-green-200/70 dark:border-green-700/50 text-center touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 font-['Open_Sans']">
                    &lt;20ms
                  </div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold font-['Open_Sans'] leading-tight">
                    Response Time
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 shadow-md sm:shadow-lg border-2 border-purple-200/70 dark:border-purple-700/50 text-center touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 font-['Open_Sans']">
                    &gt;98%
                  </div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold font-['Open_Sans'] leading-tight">
                    Efficiency
                  </div>
                </motion.div>

                <motion.div
                  className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-md sm:rounded-lg md:rounded-xl p-2 sm:p-3 md:p-4 shadow-md sm:shadow-lg border-2 border-orange-200/70 dark:border-orange-700/50 text-center touch-manipulation"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-bold text-gray-900 dark:text-white mb-0.5 sm:mb-1 font-['Open_Sans']">
                    170-280V
                  </div>
                  <div className="text-sm sm:text-sm md:text-base text-gray-800 dark:text-gray-200 font-semibold font-['Open_Sans'] leading-tight">
                    Input Range
                  </div>
                </motion.div>
              </motion.div>
            </div>

          </div>
        </div>

        {/* Premium Features Section - Completely Redesigned for All Devices */}
        <section id="features" className="py-6 sm:py-8 lg:py-12 bg-gradient-to-br from-cyan-50/40 via-white to-blue-50/40 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-cyan-900/20 relative overflow-hidden">
          {/* Enhanced Background Elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 sm:top-16 right-10 sm:right-16 w-60 sm:w-80 h-60 sm:h-80 bg-cyan-300/8 rounded-full blur-2xl sm:blur-3xl animate-float"></div>
            <div className="absolute bottom-10 sm:bottom-16 left-10 sm:left-16 w-48 sm:w-64 h-48 sm:h-64 bg-blue-300/8 rounded-full blur-2xl sm:blur-3xl animate-float-reverse"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/5 rounded-full blur-3xl animate-pulse-slow"></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
            {/* Enhanced Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-8 sm:mb-12"
            >
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Advanced <span className="text-gray-900 relative">
                  Features & Benefits
                </span>
              </motion.h2>

              <motion.p
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Cutting-edge technology and intelligent protection systems designed for maximum reliability and performance across all applications
              </motion.p>
            </motion.div>

            {/* Redesigned Feature Cards - Mobile-First Grid - All 5 Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 80
                  }}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 150,
                      damping: 15
                    }
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 }
                  }}
                  className={`group relative touch-manipulation ${index >= 3 ? 'sm:col-span-2 lg:col-span-1' : ''}`}
                >
                  {/* Card Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                  {/* Main Card */}
                  <div className="bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm rounded-2xl shadow-lg sm:shadow-xl overflow-hidden border-2 border-blue-200/60 dark:border-blue-700/40 relative z-10 h-full transform transition-all duration-300 group-hover:shadow-2xl group-active:shadow-lg">
                    {/* Gradient Top Bar */}
                    <div className="h-3 w-full bg-gradient-to-r from-blue-600 to-indigo-700"></div>

                    <div className="p-4 sm:p-6 lg:p-8">
                      {/* Enhanced Header with Icon */}
                      <div className="flex items-start mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-3 sm:p-4 rounded-xl mr-4 shadow-lg transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 flex-shrink-0">
                          <div className="w-6 h-6 sm:w-7 sm:h-7 text-white">
                            {feature.icon}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Open_Sans'] leading-tight">
                            {feature.title}
                          </h3>
                          <p className="text-gray-700 dark:text-gray-200 text-sm sm:text-base font-semibold font-['Open_Sans'] leading-relaxed">
                            {feature.description}
                          </p>
                        </div>
                      </div>

                      {/* Enhanced Feature Items */}
                      <div className="space-y-3 sm:space-y-4">
                        {feature.items.slice(0, 3).map((item, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.2 + (i * 0.1) }}
                            className="relative"
                          >
                            <div className="flex items-start p-3 sm:p-4 rounded-xl bg-gradient-to-r from-blue-100/80 to-indigo-100/80 dark:from-blue-900/50 dark:to-indigo-900/50 border-2 border-blue-200/70 dark:border-blue-700/50 transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-md motion-safe">
                              <div className="bg-blue-600 text-white rounded-full p-1.5 sm:p-2 mr-3 mt-0.5 flex-shrink-0 shadow-md">
                                <div className="w-4 h-4 sm:w-5 sm:h-5 text-white">
                                  {item.icon}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-gray-900 dark:text-white text-sm sm:text-base mb-1 font-['Open_Sans'] leading-tight">
                                  {item.title}
                                </h4>
                                <p className="text-gray-700 dark:text-gray-200 text-xs sm:text-sm font-medium font-['Open_Sans'] leading-relaxed">
                                  {item.description}
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      {/* Interactive Corner Accent */}
                      <motion.div
                        className="absolute -bottom-2 -right-2 w-16 h-16 border-r-2 border-b-2 border-blue-500/70 rounded-br-xl hidden sm:block"
                        animate={{
                          opacity: [0.4, 0.7, 0.4],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          repeatType: "reverse"
                        }}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: "perspective(1000px) rotateX(10deg) rotateY(-10deg)"
                        }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Bottom Decorative Element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-12 sm:mt-16 text-center"
            >
              <div className="inline-flex items-center justify-center">
                <div className="h-px w-12 sm:w-16 bg-blue-300 dark:bg-blue-700"></div>
                <div className="mx-4 sm:mx-6 text-blue-500 dark:text-blue-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div className="h-px w-12 sm:w-16 bg-blue-300 dark:bg-blue-700"></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Information Section - Simple, Wide, Responsive */}
        <section className="py-8 relative overflow-hidden bg-gradient-to-br from-blue-50/40 via-white to-indigo-50/40 dark:from-gray-900/60 dark:via-gray-800/60 dark:to-blue-900/20">
          {/* Section background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 left-1/4 w-48 h-48 bg-blue-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
            <div className="absolute bottom-10 right-1/4 w-56 h-56 bg-indigo-300/10 rounded-full blur-2xl animate-pulse-slow-reverse"></div>
          </div>
          <div className="container mx-auto px-2 sm:px-4 max-w-full relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-lg bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border border-blue-200/40 dark:border-blue-700/30 p-3 sm:p-6 md:p-8 relative overflow-hidden mx-auto shadow-none"
            >
              <div className="text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2 font-['Open_Sans']"
                >
                  Need More Information?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-gray-800 dark:text-gray-200 max-w-2xl mx-auto mb-4 text-sm sm:text-base font-normal font-['Open_Sans'] leading-relaxed"
                >
                  Our team of experts is ready to help you with product specifications, custom solutions, pricing, and any other details you need about the KRYKARD Servo Stabilizer systems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <Button
                    className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white px-5 sm:px-7 py-2 sm:py-2.5 rounded-md flex items-center gap-2 mx-auto shadow-none hover:shadow-blue-400/20 transition-all duration-300 font-['Open_Sans'] text-sm sm:text-base font-semibold focus:outline-none focus:ring-2 focus:ring-blue-200/40"
                    onClick={() => navigate('/contact/sales')}
                  >
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="font-semibold text-sm sm:text-base">Get a quote</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>


      </PageLayout>
    </>
  );
};

export default ServoStabilizers;