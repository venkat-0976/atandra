import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, Star, ChevronDown, ChevronUp } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SeoHead from '@/seo/SeoHead';

// Custom Blue Rounded Icons
const BlueRoundedIcon = ({ children, className = "" }) => (
  <div className={`w-8 h-8 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-lg flex items-center justify-center shadow-md ${className}`}>
    {children}
  </div>
);

const TransformerIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3L13 21M11 3L11 21M8 7L8 17M16 7L16 17M5 10L5 14M19 10L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 12L15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const IndustrialIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V7L12 3L19 7V21M9 12H15M9 16H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="1" fill="white" />
    </svg>
  </BlueRoundedIcon>
);

const ParallelIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4V20M10 4V20M14 4V20M18 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8H8M4 12H8M4 16H8M12 8H16M12 12H16M12 16H16M16 8H20M16 12H20M16 16H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const BatteryManagementIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="16" height="8" rx="2" stroke="white" strokeWidth="2" />
      <path d="M19 10V14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 12H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M10 9V15" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const ElectricalIsolationIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12L16 12M12 8L12 16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="8" stroke="white" strokeWidth="2" />
      <path d="M4 4L8 8M20 4L16 8M4 20L8 16M20 20L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const EnhancedProtectionIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V13C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 13V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </BlueRoundedIcon>
);

const PhaseShiftIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12H21M7 8L3 12L7 16M17 8L21 12L17 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const GroundIsolationIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V8M12 16V22M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
      <path d="M6 18L18 6M6 6L18 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const ProductSpecification = () => {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllAdvantages, setShowAllAdvantages] = useState(false);

  // Mobile CSS for table functionality with Open Sans font and blue theme
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Universal font family */
      * {
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Enhanced styling with blue theme */
      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 16px;
      }

      @media (min-width: 768px) {
        .container {
          padding: 0 24px;
        }
      }

      @media (min-width: 1024px) {
        .container {
          padding: 0 32px;
        }
      }

      /* Mobile responsive navigation */
      .tab-navigation {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        padding: 12px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
      }

      .tab-button {
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s;
        border: none;
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .tab-navigation {
          flex-direction: column;
          align-items: stretch;
        }

        .tab-button {
          text-align: center;
          margin: 2px 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";





  // Specifications data for EH33 Large Series
  // PDF URL for brochure
  // const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

  const ProductSpecContent = () => (
    <div className="w-full mx-auto space-y-8 md:space-y-12">
      {/* Hero Section - Following SX Series Pattern */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8] mb-12 md:mb-16">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-5 rounded-full blur-2xl"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-white opacity-5 rounded-full blur-lg"></div>
        </div>

        <div className="relative z-10 px-4 py-8 md:py-10 lg:py-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Main Title */}
              <motion.h1
                className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 md:mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                KRYKARD EH 33 LARGE SERIES UPS
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                100 kVA to 200 kVA - High-power transformer-less UPS systems delivering maximum efficiency and reliability for large-scale industrial and commercial applications.
              </motion.p>

              {/* Star Rating */}
              <motion.div
                className="flex items-center justify-center gap-2 mb-4 md:mb-6"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/90 text-sm font-medium">
                  Maximum Efficiency & Reliability
                </span>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/contact/sales"
                    className="bg-white text-[#1e3a8a] hover:bg-gray-50 px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm md:text-base min-w-[160px]"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get Quote
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <button
                    onClick={() => setShowPdfViewer(true)}
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e3a8a] px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm md:text-base min-w-[160px]"
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Brochure
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Product Overview Section - Following SX Series Pattern */}
      <section className="container mx-auto px-4 py-12 md:py-16 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side: Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">
                Large-Scale Power Protection
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                The KRYKARD EH 33 Large Series is engineered for high-power applications requiring robust three-phase power protection. Its transformer-less design delivers maximum efficiency and reliability for large-scale industrial and commercial installations.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact/sales"
                  className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                >
                  <span>Request Quote</span>
                  <ArrowRight size={16} />
                </Link>
              </motion.div>

              <motion.button
                onClick={() => setShowPdfViewer(true)}
                className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white px-6 py-3 rounded-lg shadow-md transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FileText size={16} />
                <span>View Brochure</span>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right side: UPS Image */}
          <motion.div
            className="relative flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="w-full max-w-xs h-auto flex items-center justify-center">
              <motion.img
                src="/UPS/5-removebg-preview.png"
                alt="KRYKARD EH-33 Large Series 80-200 kVA Online UPS for Data Centers"
                className="max-w-full max-h-full object-contain"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features & Advantages Section - Exact SX Series Pattern */}
      <section className="container mx-auto px-4 py-16 md:py-20 mb-12 md:mb-16">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-32 md:w-64 h-32 md:h-64 bg-[#1e3a8a]/20 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-[#1e40af]/20 rounded-full opacity-20 blur-3xl"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            {/* Section Header */}
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4 md:mb-6">
                  Key Features & Advantages
                </h2>
              </motion.div>
              <motion.p
                className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Core capabilities and advantages of our large-scale UPS solutions
              </motion.p>
            </motion.div>

            {/* Two Column Layout - Key Features & Advantages */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 relative z-10">

              {/* Left Column - Key Features */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#1e3a8a] mb-6 md:mb-8 text-center">Key Features</h3>
                <div className="space-y-4 md:space-y-6">
                  {(() => {
                    const allFeatures = [
                      "Transformer-less design with advanced dual core DSP control",
                      "Wide input voltage range (304-478 VAC) for unstable power conditions",
                      "High efficiency operation - up to 95% in online mode",
                      "N+X parallel capability - connect multiple units for redundancy",
                      "Industrial grade design with high MTBF >300,000 hours",
                      "Advanced battery management with intelligent charging algorithms",
                      "Three-phase input with three-phase output configuration",
                      "Front-access maintenance for easy installation and service",
                      "Frequency range (45-55 Hz) immune to unstable sources",
                      "Scalable system module providing redundant configuration",
                      "Built-in electronic protection through advanced control",
                      "Universal communications interface with various connectivity options"
                    ];

                    const displayFeatures = showAllFeatures ? allFeatures : allFeatures.slice(0, 5);

                    return displayFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-[#1e3a8a] rounded-full mt-2 sm:mt-3"></div>
                        <p className="text-base text-gray-700 leading-relaxed">{feature}</p>
                      </motion.div>
                    ));
                  })()}
                </div>

                {/* View More Button for Features */}
                <div className="text-center mt-6">
                  <motion.button
                    onClick={() => setShowAllFeatures(!showAllFeatures)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-all duration-300 text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{showAllFeatures ? 'View Less' : 'View More'}</span>
                    {showAllFeatures ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </motion.button>
                </div>
              </motion.div>

              {/* Right Column - Advantages */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-lg md:text-xl font-semibold text-[#1e3a8a] mb-6 md:mb-8 text-center">Advantages</h3>
                <div className="space-y-4 md:space-y-6">
                  {(() => {
                    const allAdvantages = [
                      "Maximum efficiency reduces operational costs and environmental impact",
                      "Compact footprint ideal for installations with limited floor space",
                      "Reduced maintenance requirements with fewer components",
                      "Enhanced power quality with superior power conditioning",
                      "Scalable architecture allows for easy capacity expansion",
                      "Extended battery life through intelligent charging algorithms",
                      "Wide operating range handles unstable input conditions",
                      "Front access maintenance reduces service time and costs",
                      "Industrial-grade protection for demanding environments",
                      "Advanced monitoring and diagnostics for proactive maintenance",
                      "Parallel redundancy capability for critical applications",
                      "Comprehensive protection against power disturbances"
                    ];

                    const displayAdvantages = showAllAdvantages ? allAdvantages : allAdvantages.slice(0, 5);

                    return displayAdvantages.map((advantage, index) => (
                      <motion.div
                        key={index}
                        className="flex items-start gap-3"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        viewport={{ once: true, margin: "-50px" }}
                      >
                        <div className="flex-shrink-0 w-2 h-2 bg-[#1e3a8a] rounded-full mt-2 sm:mt-3"></div>
                        <p className="text-base text-gray-700 leading-relaxed">{advantage}</p>
                      </motion.div>
                    ));
                  })()}
                </div>

                {/* View More Button for Advantages */}
                <div className="text-center mt-6">
                  <motion.button
                    onClick={() => setShowAllAdvantages(!showAllAdvantages)}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-all duration-300 text-base font-medium"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>{showAllAdvantages ? 'View Less' : 'View More'}</span>
                    {showAllAdvantages ? (
                      <ChevronUp size={18} />
                    ) : (
                      <ChevronDown size={18} />
                    )}
                  </motion.button>
                </div>
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      {/* Applications Section - Following SX Series Pattern */}
      <section className="container mx-auto px-4 py-20 md:py-24 mb-16 md:mb-20 mt-16 md:mt-20">
        <motion.div
          className="text-center mb-8 md:mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-[#1e3a8a] mb-4">
            Ideal Applications
          </h2>
          <div className="h-1 w-16 bg-[#1e3a8a] mx-auto rounded-full mb-4"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Perfect solutions for large-scale industrial and commercial environments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {[
            {
              icon: "🏭",
              title: "Industrial Facilities",
              description: "Manufacturing plants, production lines, and heavy industrial equipment requiring robust power protection"
            },
            {
              icon: "🏢",
              title: "Commercial Buildings",
              description: "Large office complexes, shopping centers, and commercial facilities with high power demands"
            },
            {
              icon: "🏥",
              title: "Healthcare Facilities",
              description: "Hospitals, medical centers, and healthcare facilities requiring uninterrupted power for critical equipment"
            },
            {
              icon: "💻",
              title: "Data Centers",
              description: "Large-scale data centers and server farms requiring maximum uptime and power reliability"
            }
          ].map((application, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-4xl mb-4"
                animate={{
                  y: [0, -5, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {application.icon}
              </motion.div>
              <h3 className="text-lg font-bold text-[#1e3a8a] mb-3">
                {application.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {application.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Specifications Section - Exact SX Series Pattern */}
      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20 mb-12 md:mb-16">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
            Technical Specifications
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Comprehensive technical details for the EH 33 Large Series UPS line
          </p>
        </motion.div>

        {/* Brochure Link */}
        <div className="text-center">
          <a
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer  nofollow"
            className="inline-flex items-center px-6 py-3 bg-[#1e3a8a] text-white rounded-lg hover:bg-[#1e40af] transition-colors duration-200 text-base"
          >
            <FileText size={20} className="mr-2" />
            View Complete Technical Specifications
          </a>
        </div>
      </section>

      {/* Key Features Highlight Section - Following SX Series Pattern */}
      <section className="container mx-auto px-4 py-16 md:py-20 mb-12 md:mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">Key Highlights</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Standout features that make the EH 33 Large Series exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Transformer-less Design",
              description: "Advanced transformer-less technology for maximum efficiency and compact footprint, reducing operational costs and space requirements.",
              icon: TransformerIcon
            },
            {
              title: "Industrial-Grade Protection",
              description: "Built to withstand demanding industrial environments with robust construction, high MTBF, and comprehensive protection features.",
              icon: IndustrialIcon
            },
            {
              title: "N+X Redundancy Capability",
              description: "Scalable parallel operation supporting multiple units for enhanced reliability and load sharing in critical applications.",
              icon: ParallelIcon
            },
            {
              title: "Advanced Battery Management",
              description: "Intelligent battery charging and monitoring system that maximizes battery life and provides comprehensive battery health information.",
              icon: BatteryManagementIcon
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <feature.icon />
                <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">{feature.title}</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Transformer-less Technology Advantages - Following SX Series Pattern */}
      <section className="container mx-auto px-4 py-16 md:py-20 mb-12 md:mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
            Transformer-less Technology Advantages
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Enhanced efficiency and performance with advanced transformer-less design
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Maximum Efficiency",
              description: "Up to 95% efficiency reduces operational costs and environmental impact while minimizing heat generation and cooling requirements.",
              icon: ElectricalIsolationIcon
            },
            {
              title: "Compact Footprint",
              description: "Space-saving design ideal for installations with limited floor space, providing more room for other critical equipment.",
              icon: EnhancedProtectionIcon
            },
            {
              title: "Reduced Maintenance",
              description: "Fewer components mean lower maintenance requirements and higher reliability, reducing total cost of ownership.",
              icon: PhaseShiftIcon
            },
            {
              title: "Enhanced Power Quality",
              description: "Superior power conditioning and filtering capabilities ensure clean, stable power for sensitive equipment and critical loads.",
              icon: GroundIsolationIcon
            }
          ].map((advantage, index) => (
            <motion.div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-3">
                <advantage.icon />
                <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">{advantage.title}</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF Viewer Modal - Following SX Series Pattern */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setShowPdfViewer(false)}></div>
          <div className="relative bg-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPdfViewer(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">EH 33 Large Series UPS Brochure</h3>
              <a
                href={pdfUrl}
                download="KRYKARD-UPS-Brochure.pdf"
                className="flex items-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white py-2 px-4 rounded-md transition-colors shadow-md"
                target="_blank"
                rel="noopener noreferrer  nofollow"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>

            <div className="w-full h-[70vh]">
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">
                    PDF preview is not available in your browser.
                  </p>
                  <a
                    href={pdfUrl}
                    download="KRYKARD-UPS-Brochure.pdf"
                    className="flex items-center gap-2 bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white py-2 px-4 rounded-md transition-colors shadow-md"
                    target="_blank"
                    rel="noopener noreferrer  nofollow"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download UPS Brochure
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* Call-to-Action Section - Exact SX Series Pattern */}
      <section className="max-w-3xl mx-auto px-4 py-16 md:py-20 mb-16 md:mb-20">
        <motion.div
          className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-2xl shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="p-4 md:p-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4">
                Ready for Large-Scale Power Protection?
              </h2>

              <p className="text-sm md:text-base text-white mb-4 md:mb-6 max-w-2xl mx-auto">
                Get in touch with our experts to find the perfect high-power UPS solution for your industrial and commercial needs.
              </p>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-block"
              >
                <Link
                  to="/contact/sales"
                  className="bg-white text-[#1e3a8a] hover:bg-gray-50 shadow-md transition-all duration-300 px-6 md:px-8 py-3 md:py-4 rounded-lg text-sm md:text-base flex items-center justify-center gap-2 font-semibold"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>Contact Expert</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EH-33 Large Series Online UPS",
    "description": "EH-33 Large Series 80–200 kVA online UPS with transformer-less design, N+X redundancy and low THDi for large data centers & industries.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "EH-33 Large Series",
    "image": "https://atandra.in/UPS/5-removebg-preview.png",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      // "priceCurrency": "INR",
      // "price": "0",
      // "priceValidUntil": "2025-12-31"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "KRYKARD"
    }
  };

  // Return PageLayout component with the product specification content inside
  return (
    <>
      <SeoHead
        title="EH-33 Large Series 80–200 kVA Enterprise UPS"
        description="EH-33 Large Series 80–200 kVA online UPS with transformer-less design, N+X redundancy and low THDi for large data centers & industries."
        keywords="EH-33 large series UPS, 80 kVA UPS, 200 kVA UPS, enterprise UPS, transformer-less UPS, N+X redundancy UPS, large data center UPS, industrial UPS, hospital UPS, government facility UPS"
        canonical="https://atandra.in/protect/ups/product/eh-33-large-series"
        ogImage="/UPS/5-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/UPS/5-removebg-preview.png"
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >
        <ProductSpecContent />
      </PageLayout>
    </>
  );

};

export default ProductSpecification;