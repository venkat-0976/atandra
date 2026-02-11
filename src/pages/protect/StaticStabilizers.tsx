import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
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
                STATIC VOLTAGE REGULATOR
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
    title: "DSP Based PWM Control",
    icon: <Zap className="h-6 w-6" />,
    description: "Advanced 20kHz DSP control for precise voltage regulation",
    items: [
      {
        icon: <Zap className="h-5 w-5" />,
        title: "20kHz Switching",
        description: "High-frequency PWM control for fast cycle-by-cycle correction",
      },
      {
        icon: <BarChart3 className="h-5 w-5" />,
        title: "Digital Display",
        description: "LCD display for all performance parameters",
      },
    ],
  },
  {
    title: "IGBT Technology",
    icon: <Shield className="h-6 w-6" />,
    description: "Rugged and reliable IGBT power modules for enhanced performance",
    items: [
      {
        icon: <Shield className="h-5 w-5" />,
        title: "Direct AC-AC",
        description: "Conversion improves efficiency & reliability",
      },
      {
        icon: <Zap className="h-5 w-5" />,
        title: "No Moving Parts",
        description: "No wear & tear, therefore low maintenance",
      },
    ],
  },
  {
    title: "Comprehensive Protection",
    icon: <PlusCircle className="h-6 w-6" />,
    description: "Complete protection from all electrical faults",
    items: [
      {
        icon: <Plus className="h-5 w-5" />,
        title: "Multi-Protection",
        description: "Over/Under Voltage, Overload, Single Phasing, Phase Reversal & Short Circuit",
      },
    ],
  },
  {
    title: "Advanced Features",
    icon: <Headphones className="h-6 w-6" />,
    description: "Premium features for optimal performance",
    items: [
      {
        icon: <Globe className="h-5 w-5" />,
        title: "Silent Operation",
        description: "Noise-free operation",
      },
      {
        icon: <Clock className="h-5 w-5" />,
        title: "Automatic Bypass",
        description: "In case of failure for continuous operation",
      },
      {
        icon: <ShieldCheck className="h-5 w-5" />,
        title: "±1% Regulation",
        description: "Precise output voltage regulation",
      },
    ],
  },
];

const productTypes = [
  {
    id: "three-phase-static-voltage-regulator",
    title: "Three Phase SVR",
    description: "High-performance three-phase static voltage regulator for industrial applications requiring reliable power conditioning.",
    features: [
      "Input range: 340-460V AC three phase",
      "Output: 400V ±1%",
      "DSP controlled IGBT technology",
      "20kHz switching frequency",
      "Available capacity: 10kVA to 1000kVA",
      "Independent phase control"
    ],
    accentColor: "from-blue-400 to-cyan-600",
    textColor: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
    imageUrl: "/Static_stabilizers/W_5-removebg-preview.png",
    altText: "Three Phase Static Voltage Regulator",
    path: "/protect/static-stabilizers/product/three-phase-static-voltage-regulator"
  },
  {
    title: "Industrial SVR",
    description: "Rugged industrial-grade static voltage regulator designed for harsh environments and continuous operation with zero maintenance.",
    features: [
      "High overload capacity: 150% for 30 sec",
      "Enhanced surge protection: 6kV",
      "IP54 protection available",
      "Operating temperature: 0-55°C",
      "Remote monitoring capability",
      "Parallel operation capable"
    ],
    accentColor: "from-blue-500 to-indigo-600",
    textColor: "text-blue-700",
    bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
    imageUrl: "/Static_stabilizers/B_3-removebg-preview.png",
    altText: "Industrial Static Voltage Regulator"
  }
];

const specifications = [
  {
    category: "Input",
    items: [
      { label: "Voltage Range", value: "340-460V AC" },
      { label: "Frequency", value: "47-53 Hz" },
      { label: "Phase Options", value: "3φ" }
    ]
  },
  {
    category: "Output",
    items: [
      { label: "Regulation", value: "±1%" },
      { label: "Correction Speed", value: "20,000 V/Sec" },
      { label: "Efficiency", value: ">95%" }
    ]
  },
  {
    category: "Protection",
    items: [
      { label: "Overload Trip", value: "110% to 150%" },
      { label: "Surge Protection", value: "6kV" },
      { label: "Control", value: "DSP PWM" }
    ]
  }
];

// FAQ Data
const faqs = [
  {
    question: "What is a static voltage regulator?",
    answer: "Static Voltage Regulator is a solid-state voltage regulation system that uses IGBT-based advanced power electronics to deliver stable output voltage with very fast response, making it ideal for dynamic and sensitive loads."
  },
  {
    question: "How does static voltage regulator work?",
    answer: "Static voltage regulators continuously monitor the output voltage using high-speed digital control. When a deviation is detected, solid-state switching devices instantly correct the voltage without any mechanical movement."
  },
  {
    question: "What are the key advantages of Krykard static voltage regulators?",
    answer: "Krykard static voltage regulators offer: Ultra-fast response time, No moving parts, Compact design, and Stable output for rapidly fluctuating supply conditions."
  },
  {
    question: "Where are Krykard static voltage regulators typically used?",
    answer: "They are ideal for: CNC & VMC machines, Welding Robots, Plasma Welding Machine, Laser Cutting Machine, Semiconductor & electronics manufacturing, Medical imaging equipment, Data centres & IT infrastructure, and Precision automation systems."
  },
  {
    question: "What output voltage accuracy do Krykard static voltage regulators provide?",
    answer: "Krykard static voltage regulators typically provide ±1% output voltage regulation, suitable for highly sensitive electronic loads."
  },
  {
    question: "How fast is the response time of Krykard static voltage regulators?",
    answer: "Krykard static voltage regulators correct any voltage variation within its input voltage range within milliseconds, ensuring excellent protection against sudden voltage dips, surges, and transients."
  },
  {
    question: "Are Krykard static voltage regulators suitable for nonlinear and dynamic loads?",
    answer: "Yes. Krykard static voltage regulators are well suited for nonlinear, rapidly varying loads such as VFD-driven systems and electronic power supplies."
  },
  {
    question: "Can Krykard static voltage regulators be used for residential applications?",
    answer: "Yes. Krykard static voltage regulators can be used for residential applications. They provide stable voltage output to protect home appliances such as ACs, refrigerators, TVs, washing machines, and home UPS systems. They offer low maintenance requirements, silent operation, and high efficiency."
  },
  {
    question: "Do Krykard static voltage regulators generate harmonics?",
    answer: "Krykard static voltage regulators are designed with advanced filtering and control algorithms to minimize harmonic impact and meet applicable EMC requirements."
  },
  {
    question: "What is the efficiency of Krykard static voltage regulators?",
    answer: "Krykard static voltage regulators are engineered for high operating efficiency, typically above 96–98%, depending on rating and operating conditions."
  },
  {
    question: "Can Krykard static voltage regulators handle frequent voltage fluctuations?",
    answer: "Yes. Krykard static voltage regulators are specifically designed for high-frequency voltage variations commonly seen in modern industrial power systems."
  },
  {
    question: "Are Krykard static voltage regulators available in three-phase versions?",
    answer: "Yes. Krykard static voltage regulators are available in single-phase, three-phase balanced, and three-phase unbalanced configurations."
  },
  {
    question: "Can Krykard static voltage regulators operate with DG sets and UPS systems?",
    answer: "Yes. Krykard static voltage regulators are compatible with DG sets and UPS-backed power systems, helping maintain stable voltage during load transitions."
  },
  {
    question: "What protection features are provided in Krykard static voltage regulators?",
    answer: "Standard protections include: Over-voltage and under-voltage protection, Overload and short-circuit protection, Phase failure and phase sequence protection (3-phase), Surge & Spike protection, and Thermal protection for the IGBTs."
  },
  {
    question: "What kind of control and sensing is used in Krykard static voltage regulators?",
    answer: "Krykard static voltage regulators use 20 kHz high-speed digital controllers with True RMS sensing, ensuring accurate voltage regulation under distorted waveforms."
  },
  {
    question: "What maintenance is required for Krykard static voltage regulators?",
    answer: "Krykard static voltage regulators don't require routine maintenance due to the absence of mechanical components."
  },
  {
    question: "What is the expected service life of Krykard static voltage regulators?",
    answer: "With proper design and operating conditions, Krykard static voltage regulators provide long, reliable service life in industrial applications of 15 - 20 years."
  },
  {
    question: "Are Krykard static voltage regulators suitable for clean-room or noise-sensitive environments?",
    answer: "Yes. Krykard static voltage regulators operate silently and are well suited for clean-room applications such as hospitals, research laboratories and noise-sensitive environments."
  },
  {
    question: "What are the key industrial applications of IGBT-based Krykard Static Voltage Stabilizers?",
    answer: "Key applications include: Industrial (CNC machines, Robotics & automation lines, Injection moulding machines, PLC / SCADA systems, Textile, printing, and packaging machines), Medical (MRI, CT Scan, X-ray machines, Diagnostic and laboratory equipment, Operation theatre power systems), Commercial & IT (Data centres & server rooms, Semiconductor manufacturing, R&D laboratories), and Infrastructure & Utilities."
  },
  {
    question: "Are Krykard static voltage regulators BIS compliant?",
    answer: "There is no specific BIS/IS Standard currently published exclusively for static voltage regulators. Krykard will comply with them as and when they are published. In general, Krykard static voltage regulators are compliant as per the requirements of electrical voltage regulators as per IS 9815 that is applicable to servo voltage stabilisers."
  },
  {
    question: "Are Krykard static voltage regulators CE compliant?",
    answer: "Yes. Krykard static voltage regulators are CE compliant, meeting applicable European safety and EMC directives."
  },
  {
    question: "Is Krykard an ISO certified manufacturer of static voltage regulators?",
    answer: "Yes. Krykard operates under an ISO 9001:2015 certified Quality Management System, ensuring consistent product quality, traceability, and continuous improvement. Our factory is also ISO 14001:2015 and ISO 45001:2018 compliant."
  },
  {
    question: "Do Krykard static voltage regulators meet EMC and electrical safety standards?",
    answer: "Yes. Krykard static voltage regulators are designed to meet applicable EMC, insulation, earthing, and electrical safety norms for industrial equipment."
  },
  {
    question: "Can Krykard provide test reports and compliance documentation?",
    answer: "Yes. Krykard can provide routine test reports, compliance declarations, and supporting documentation for projects, exports, and tenders."
  }
];

// FAQ Accordion Component
const FAQAccordion = () => {
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [expandedIndices, setExpandedIndices] = useState<Set<number>>(new Set());

  const toggleSingleFAQ = (index: number) => {
    const newSet = new Set(expandedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setExpandedIndices(newSet);
  };

  return (
    <section className="py-8 md:py-12 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/50 dark:from-gray-900 dark:via-gray-800/50 dark:to-blue-900/10 relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
        {/* FAQ Header Button */}
        <div className="max-w-4xl mx-auto">
          <motion.button
            onClick={() => setIsFAQOpen(!isFAQOpen)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="w-full bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50 dark:border-blue-900/30 overflow-hidden"
          >
            <div className="px-4 md:px-6 py-4 md:py-6 flex items-center justify-between text-left hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white font-['Open_Sans']">
                Frequently Asked <span className="text-blue-600">Questions</span>
              </h2>
              <motion.svg
                animate={{ rotate: isFAQOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="w-6 h-6 md:w-8 md:h-8 text-blue-600 dark:text-blue-400 flex-shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </motion.svg>
            </div>
          </motion.button>

          {/* FAQ Items - Collapsible Section */}
          {/* <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isFAQOpen ? "auto" : 0,
              opacity: isFAQOpen ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          > */}
          {/* FAQ Items - Collapsible Section */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isFAQOpen ? "auto" : 0,
              opacity: isFAQOpen ? 1 : 0
            }}
            transition={{ duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  className="bg-white dark:bg-slate-800 rounded-lg md:rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-blue-100/50 dark:border-blue-900/30 overflow-hidden"
                >
                  <button
                    onClick={() => toggleSingleFAQ(index)}
                    className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between text-left hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-gray-900 dark:text-white font-['Open_Sans'] pr-4">
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <motion.svg
                        animate={{ rotate: expandedIndices.has(index) ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-5 h-5 md:w-6 md:h-6 text-blue-600 dark:text-blue-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </motion.svg>
                    </div>
                  </button>

                  {/* Answer Section */}
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{
                      height: expandedIndices.has(index) ? "auto" : 0,
                      opacity: expandedIndices.has(index) ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 md:px-6 py-4 md:py-5 border-t border-blue-100/50 dark:border-blue-900/30 bg-blue-50/30 dark:bg-blue-900/10">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-['Open_Sans'] text-base">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StaticStabilizers = () => {
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
    "name": "KRYKARD Static Voltage Stabilizers",
    "description": "DSP-controlled static voltage stabilizers with IGBT technology offering ultra-fast correction, ±1% accuracy and high efficiency.",
    "url": "https://atandra.in/protect/static-stabilizers",
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
          "url": product.title === "Three Phase SVR"
            ? "https://atandra.in/protect/static-stabilizers/product/three-phase-static-voltage-regulator"
            : "https://atandra.in/protect/static-stabilizers/product/industrial-static-voltage-regulator",
          "image": `https://atandra.in${product.imageUrl}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="Static Voltage Stabilizers with DSP IGBT Technology"
        description="DSP-controlled static voltage stabilizers with IGBT technology offering ultra-fast correction, ±1% accuracy and high efficiency."
        keywords="static stabilizer, static voltage regulator, SVR, IGBT stabilizer, DSP controlled stabilizer, PWM voltage regulator, static voltage control, industrial stabilizer, precision voltage regulator"
        canonical="https://atandra.in/protect/static-stabilizers"
        ogImage="/background_images/static stabilizers.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/static stabilizers.png"
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
        <div className="relative pt-0 pb-4 md:pt-0 md:pb-6 overflow-hidden font-['Open_Sans'] min-h-0 h-auto">
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
                    <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Static Voltage Regulators</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                    STATIC STABILIZERS
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                    Advanced DSP-Controlled Voltage Regulation for Precision Applications. KRYKARD Static Voltage Regulators provide instantaneous voltage correction with ±1% accuracy using IGBT technology and PWM control for sensitive equipment protection.
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
                  className="flex justify-center lg:justify-center lg:w-1/2 lg:pl-8"
                >
                  <div className="relative w-full flex items-center justify-center h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px]">
                    <img
                      src="/Static_stabilizers/G_2-removebg-preview.png"
                      alt="KRYKARD Static Voltage Stabilizers with DSP IGBT Technology for Industrial Power Protection"
                      className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[720px] max-h-[260px] md:max-h-[340px] lg:max-h-[420px] xl:max-h-[480px] h-auto object-contain"
                      // style={{ aspectRatio: '3/4', minHeight: 0 }}
                      width={720}
                      height={540}
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=Static+Voltage+Regulator';
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
        <div className="relative py-4 md:py-6 overflow-hidden font-['Open_Sans']">
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
                  Static Voltage Regulator Range
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
                From precision manufacturing to critical medical equipment, we offer advanced DSP-controlled voltage regulation solutions designed for instantaneous correction and maximum reliability
              </motion.p>
            </motion.div>
            {/* Simple Product Cards - 2 columns layout */}
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
                      alt={product.altText || `KRYKARD ${product.title} - Static Voltage Regulator`}
                      className="max-h-72 object-contain"
                      loading="lazy"
                      width={320}
                      height={240}
                    />
                  </div>
                  {/* Product Info */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2 font-['Open_Sans']">
                      {product.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-base mb-4 font-['Open_Sans']">
                      {product.description}
                    </p>
                    <div className="mt-auto">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white shadow-md font-medium py-2 rounded-lg transition-all duration-300 font-['Open_Sans'] text-base"
                        onClick={() => {
                          // Explicit check: Three Phase SVR should always go to product details
                          if (product.id === "three-phase-static-voltage-regulator") {
                            navigate("/protect/static-stabilizers/product/three-phase-static-voltage-regulator");
                          } else if (product.path) {
                            navigate(product.path);
                          } else {
                            navigate('/contact/sales');
                          }
                        }}
                      >
                        {product.path || product.id === "three-phase-static-voltage-regulator" ? "View Details" : "Request Custom Solution"}
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
                Top <span className="text-gray-900">Static Voltage Regulator Applications</span>
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
                Discover how KRYKARD Static Voltage Regulators provide critical instantaneous voltage correction across diverse industries,
                ensuring equipment protection and operational precision in the most demanding applications.
              </motion.p>
            </motion.div>

            {/* Use Cases Grid */}
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

              {/* Precision Manufacturing */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-4 border border-blue-100 dark:border-blue-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-blue-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-blue-600 font-['Open_Sans']">Precision Manufacturing</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> CNC machines, laser cutting, injection molding, precision tools</p>
                  <p><strong>Critical Need:</strong> Instantaneous correction for voltage-sensitive operations</p>
                  <p><strong>Benefits:</strong> Eliminates production defects, maintains tight tolerances</p>
                  <p><strong>Installations:</strong> 1500+ manufacturing units, precision workshops</p>
                </div>
              </div>

              {/* Medical & Laboratory Equipment */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-4 border border-green-100 dark:border-green-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-green-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-green-600 font-['Open_Sans']">Medical & Laboratory</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> MRI scanners, CT machines, X-ray systems, lab analyzers</p>
                  <p><strong>Critical Need:</strong> Ultra-stable power for accurate diagnostics</p>
                  <p><strong>Benefits:</strong> Prevents image distortion, ensures diagnostic accuracy</p>
                  <p><strong>Installations:</strong> 800+ hospitals, diagnostic centers</p>
                </div>
              </div>

              {/* Semiconductor & Electronics */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl p-4 border border-purple-100 dark:border-purple-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-purple-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-purple-600 font-['Open_Sans']">Electrical & Electronics</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Wafer fabrication, chip testing, PCB assembly, clean rooms</p>
                  <p><strong>Critical Need:</strong> Ultra-precise voltage for nanometer processes</p>
                  <p><strong>Benefits:</strong> Prevents chip defects, maintains yield rates</p>
                  <p><strong>Installations:</strong> 200+ semiconductor fabs, electronics plants</p>
                </div>
              </div>

              {/* Research & Testing Labs */}
              <div className="bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl p-4 border border-orange-100 dark:border-orange-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-orange-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-orange-600 font-['Open_Sans']">Research & Testing Labs</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Electron microscopes, spectrometers, calibration equipment</p>
                  <p><strong>Critical Need:</strong> Stable voltage for accurate measurements</p>
                  <p><strong>Benefits:</strong> Reliable test results, precise calibration</p>
                  <p><strong>Installations:</strong> 500+ R&D labs, testing facilities</p>
                </div>
              </div>

              {/* Printing & Packaging */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 rounded-xl p-4 border border-red-100 dark:border-red-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-red-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-red-600 font-['Open_Sans']">Printing & Packaging</h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Digital printers, offset presses, packaging machines</p>
                  <p><strong>Critical Need:</strong> Consistent voltage for color accuracy</p>
                  <p><strong>Benefits:</strong> Perfect color reproduction, precise registration</p>
                  <p><strong>Installations:</strong> 600+ printing houses, packaging units</p>
                </div>
              </div>

              {/* Data Centers & IT Infrastructure */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-xl p-4 border border-teal-100 dark:border-teal-800/30">
                <div className="flex items-center mb-2">
                  <div className="bg-teal-500 text-white p-2 rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-base font-bold text-teal-600 font-['Open_Sans']">Data Centers & IT </h3>
                </div>
                <div className="space-y-2 text-base text-gray-700 dark:text-gray-300 font-['Open_Sans']">
                  <p><strong>Equipment:</strong> Servers, storage arrays, network switches, cooling systems</p>
                  <p><strong>Critical Need:</strong> 24/7 stable power for maximum uptime</p>
                  <p><strong>Benefits:</strong> Prevents data corruption, ensures service availability</p>
                  <p><strong>Installations:</strong> 400+ data centers, cloud facilities</p>
                </div>
              </div>

            </div>

            {/* Simple & Attractive Summary Stats with Count-Up */}
            <div className="mt-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-gray-200/50 dark:border-gray-700/50 relative overflow-hidden">
              {/* Stats background decoration */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-50/20 via-transparent to-indigo-50/20 dark:from-blue-900/10 dark:to-indigo-900/10"></div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center relative z-10">
                <div className="group">
                  <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 font-['Open_Sans'] mb-2">
                    <CountUp to={50000} duration={2.5} delay={0.2} />+
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">SVR Installations</div>
                  <div className="w-12 h-1 bg-blue-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 font-['Open_Sans'] mb-2">
                    <CountUp to={20000} duration={2} delay={0.4} />
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">V/Sec Correction Speed</div>
                  <div className="w-12 h-1 bg-green-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 font-['Open_Sans'] mb-2">
                    ±<CountUp to={1} duration={2} delay={0.6} />%
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Voltage Regulation</div>
                  <div className="w-12 h-1 bg-purple-500 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 font-['Open_Sans'] mb-2">
                    <CountUp to={98} duration={2} delay={0.8} />%
                  </div>
                  <div className="text-base text-gray-700 dark:text-gray-300 font-medium font-['Open_Sans']">Efficiency Rating</div>
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
                Engineered for optimal performance across all applications with industry-leading precision and instantaneous voltage correction
              </motion.p>
            </motion.div>

            {/* Mobile-First Responsive Specifications */}
            <div className="max-w-6xl mx-auto">
              {/* Mobile Layout: Single Column */}
              <div className="block md:hidden space-y-4">
                {specifications.map((spec, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-blue-100/50 dark:border-blue-900/30 overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-2 rounded-lg mr-3">
                          {index === 0 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : index === 1 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white font-['Open_Sans']">{spec.category}</h3>
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="p-4 space-y-3">
                      {spec.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col space-y-2 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/30 border border-blue-100/50 dark:border-blue-800/30">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-800 dark:text-gray-200 font-medium text-sm font-['Open_Sans']">{item.label}</span>
                          </div>
                          <div className="ml-5">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-md text-sm font-['Open_Sans']">
                              {item.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tablet Layout: Two Columns */}
              <div className="hidden md:block lg:hidden grid grid-cols-2 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-blue-100/50 dark:border-blue-900/30 overflow-hidden">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-2 rounded-lg mr-3">
                          {index === 0 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : index === 1 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white font-['Open_Sans']">{spec.category}</h3>
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="p-4 space-y-3">
                      {spec.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex flex-col space-y-2 p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/30 border border-blue-100/50 dark:border-blue-800/30">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-800 dark:text-gray-200 font-medium text-sm font-['Open_Sans']">{item.label}</span>
                          </div>
                          <div className="ml-5">
                            <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-md text-sm font-['Open_Sans']">
                              {item.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Layout: Three Columns */}
              <div className="hidden lg:grid grid-cols-3 gap-6">
                {specifications.map((spec, index) => (
                  <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-blue-100/50 dark:border-blue-900/30 overflow-hidden hover:shadow-xl transition-all duration-300">
                    {/* Category Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-3 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                          {index === 0 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : index === 1 ? (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ) : (
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c-.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg font-bold text-white font-['Open_Sans']">
                          {spec.category}
                        </h3>
                      </div>
                    </div>

                    {/* Specifications List */}
                    <div className="p-6 space-y-4">
                      {spec.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex justify-between items-center p-3 rounded-lg bg-blue-50/70 dark:bg-blue-900/30 border border-blue-100/50 dark:border-blue-800/30 hover:bg-blue-100/80 dark:hover:bg-blue-900/50 transition-colors duration-200">
                          <div className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-3"></div>
                            <span className="text-gray-800 dark:text-gray-200 font-medium text-base font-['Open_Sans']">{item.label}</span>
                          </div>
                          <span className="font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-3 py-1 rounded-md text-base font-['Open_Sans']">
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Completely Redesigned Premium Features Section - Mobile Optimized */}
        <section id="features" className="relative py-6 sm:py-8 bg-gradient-to-br from-slate-50 via-blue-50/40 to-indigo-100/60 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/30">
          {/* Simplified Background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/60 via-indigo-50/80 to-purple-100/60 dark:from-blue-900/30 dark:via-indigo-900/30 dark:to-purple-900/30"></div>
            <div className="absolute top-20 left-[10%] w-64 h-64 sm:w-96 sm:h-96 rounded-full bg-blue-300/10 blur-3xl"></div>
            <div className="absolute bottom-20 right-[15%] w-56 h-56 sm:w-80 sm:h-80 rounded-full bg-indigo-300/10 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 relative z-10">
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
                Advanced <span className="text-gray-900 relative">
                  Features & Benefits
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
                Experience cutting-edge technology with our advanced DSP control, IGBT power modules, and comprehensive protection systems designed for maximum reliability
              </motion.p>
            </motion.div>

            {/* Mobile-First Responsive Features */}
            <div className="max-w-7xl mx-auto">
              {/* Mobile Layout: Single Column */}
              <div className="block md:hidden space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-lg sm:rounded-xl shadow-md sm:shadow-lg border border-gray-200 overflow-hidden"
                  >
                    {/* Feature Header - Larger Mobile */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-3 sm:p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-1.5 sm:p-2 rounded-lg mr-2 sm:mr-3">
                          <div className="w-4 h-4 sm:w-5 sm:h-5">
                            {feature.icon}
                          </div>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-white font-['Open_Sans']">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Feature Description - Larger Mobile */}
                    <div className="p-3 sm:p-4 border-b border-gray-100">
                      <p className="text-black text-sm sm:text-base font-['Open_Sans'] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Feature Items - Larger Mobile */}
                    <div className="p-3 sm:p-4 space-y-2 sm:space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + (itemIndex * 0.1) }}
                          className="flex items-start space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-1.5 sm:p-2 rounded-lg flex-shrink-0 shadow-md">
                            <div className="w-3 h-3 sm:w-4 sm:h-4">
                              {item.icon}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm sm:text-base font-semibold text-black font-['Open_Sans'] mb-0.5 sm:mb-1">
                              {item.title}
                            </h4>
                            <p className="text-black text-sm font-['Open_Sans'] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tablet Layout: Two Columns */}
              <div className="hidden md:block lg:hidden grid grid-cols-2 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden h-full"
                  >
                    {/* Feature Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-2 rounded-lg mr-3">
                          {feature.icon}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-white font-['Open_Sans']">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-black text-base font-['Open_Sans'] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Feature Items */}
                    <div className="p-4 space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + (itemIndex * 0.1) }}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200"
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg flex-shrink-0 shadow-md">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-black font-['Open_Sans'] mb-1">
                              {item.title}
                            </h4>
                            <p className="text-black text-sm font-['Open_Sans'] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Desktop Layout: Four Columns */}
              <div className="hidden lg:grid grid-cols-4 gap-4 sm:gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 h-full"
                  >
                    {/* Feature Header */}
                    <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4">
                      <div className="flex items-center">
                        <div className="bg-white/20 text-white p-3 rounded-lg mr-3 group-hover:scale-110 transition-transform duration-300">
                          {feature.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white font-['Open_Sans']">
                          {feature.title}
                        </h3>
                      </div>
                    </div>

                    {/* Feature Description */}
                    <div className="p-4 border-b border-gray-100">
                      <p className="text-black text-base font-['Open_Sans'] leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Feature Items */}
                    <div className="p-4 space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <motion.div
                          key={itemIndex}
                          initial={{ opacity: 0, x: -15 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: 0.1 + (itemIndex * 0.1) }}
                          className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg flex-shrink-0 shadow-md">
                            {item.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-base font-semibold text-black font-['Open_Sans'] mb-1">
                              {item.title}
                            </h4>
                            <p className="text-black text-sm font-['Open_Sans'] leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Feature Summary Stats - Larger Text */}
            <div className="mt-6 sm:mt-8 bg-white/80 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 shadow-lg sm:shadow-xl border border-gray-200/50">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-center">
                <div className="group">
                  <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-blue-600 font-['Open_Sans'] mb-1">
                    <CountUp to={20} duration={2} delay={0.2} />kHz
                  </div>
                  <div className="text-sm sm:text-base text-black font-medium font-['Open_Sans']">Switching Frequency</div>
                  <div className="w-6 sm:w-8 h-0.5 bg-blue-500 mx-auto mt-1 sm:mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-green-600 font-['Open_Sans'] mb-1">
                    ±<CountUp to={1} duration={2} delay={0.4} />%
                  </div>
                  <div className="text-sm sm:text-base text-black font-medium font-['Open_Sans']">Voltage Regulation</div>
                  <div className="w-6 sm:w-8 h-0.5 bg-green-500 mx-auto mt-1 sm:mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-purple-600 font-['Open_Sans'] mb-1">
                    <CountUp to={95} duration={2} delay={0.6} />%
                  </div>
                  <div className="text-sm sm:text-base text-black font-medium font-['Open_Sans']">Efficiency</div>
                  <div className="w-6 sm:w-8 h-0.5 bg-purple-500 mx-auto mt-1 sm:mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="group">
                  <div className="text-xl sm:text-3xl lg:text-4xl font-bold text-orange-600 font-['Open_Sans'] mb-1">
                    <CountUp to={6} duration={2} delay={0.8} />kV
                  </div>
                  <div className="text-sm sm:text-base text-black font-medium font-['Open_Sans']">Surge Protection</div>
                  <div className="w-6 sm:w-8 h-0.5 bg-orange-500 mx-auto mt-1 sm:mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQAccordion />

        {/* Contact Section */}
        <section id="contact-section" className="py-8 bg-gradient-to-br from-blue-50/30 via-white to-indigo-50/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-blue-900/10 relative overflow-hidden">
          <div className="container mx-auto px-2 sm:px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="bg-blue-50/80 dark:bg-blue-900/20 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-xl border border-blue-100/50 dark:border-blue-800/30">
                <div className="text-center">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2 sm:mb-4 font-['Open_Sans']">
                    Get Expert Consultation
                  </h2>
                  <p className="text-gray-800 dark:text-gray-200 mb-4 sm:mb-6 text-base font-medium leading-relaxed font-['Open_Sans']">
                    Need help selecting the right Static Voltage Regulator for your application? Our experts are here to help you find the perfect solution.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center w-full">
                    <Button
                      className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all duration-300 flex items-center justify-center gap-2 text-base font-semibold font-['Open_Sans']"
                      onClick={() => navigate('/contact/sales')}
                    >
                      <Mail className="h-5 w-5" />
                      <span>Get a Quote</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default StaticStabilizers;