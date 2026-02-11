import { useState, useEffect } from 'react';
import { Info, Award, Clock, ArrowRight, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
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

const IndustrialIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V7L12 3L19 7V21M9 12H15M9 16H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="1" fill="white" />
    </svg>
  </BlueRoundedIcon>
);

const RegenerativeIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinejoin="round" />
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

const HarmonicControlIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12C3 12 5.5 8 12 8S21 12 21 12S18.5 16 12 16S3 12 3 12Z" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
      <path d="M8 6L16 18M16 6L8 18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const IsolationTransformerIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 3L13 21M11 3L11 21M8 7L8 17M16 7L16 17M5 10L5 14M19 10L19 14" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 12L15 12" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const HighEfficiencyIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  </BlueRoundedIcon>
);

const AdvancedProtectionIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V13C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 13V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </BlueRoundedIcon>
);

const FlexibleConfigurationIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2V8M12 16V22M8 12H16" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <circle cx="12" cy="12" r="3" stroke="white" strokeWidth="2" />
      <path d="M4 4L8 8M20 4L16 8M4 20L8 16M20 20L16 16" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);


const ProductSpecification = () => {
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [showAllFeatures, setShowAllFeatures] = useState(false);
  const [showAllAdvantages, setShowAllAdvantages] = useState(false);

  // Mobile CSS for table functionality with Open Sans font and blue theme
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const style = document.createElement('style');
    style.textContent = `
      /* Universal font family */
      * {
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Mobile Table CSS */
      .specs-table-container {
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
        background: white;
        border: 1px solid #e5e7eb;
      }

      .specs-table-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: #1e3a8a #f3f4f6;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 8px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: #1e3a8a;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb:hover {
        background: #1e40af;
      }

      .specs-table {
        width: 100%;
        min-width: 800px;
        border-collapse: collapse;
        background: white;
      }

      .specs-table th {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        color: white;
        font-weight: 700;
        text-align: left;
        padding: 12px 10px;
        font-size: 14px;
        border-bottom: 2px solid #1e40af;
        white-space: nowrap;
        position: relative;
      }

      .specs-table th:first-child {
        position: sticky;
        left: 0;
        z-index: 10;
        min-width: 200px;
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        box-shadow: 2px 0 4px rgba(30, 58, 138, 0.1);
      }

      .specs-table td {
        padding: 10px 8px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 14px;
        color: #000000;
        white-space: nowrap;
      }

      .specs-table td:first-child {
        position: sticky;
        left: 0;
        z-index: 5;
        background: inherit;
        font-weight: 600;
        color: #000000;
        box-shadow: 2px 0 4px rgba(30, 58, 138, 0.05);
      }

      .specs-table tbody tr:nth-child(even) {
        background-color: #f9fafb;
      }

      .specs-table tbody tr:nth-child(even) td:first-child {
        background-color: #f9fafb;
      }

      .specs-table tbody tr:nth-child(odd) td:first-child {
        background-color: white;
      }

      .specs-table tbody tr:hover {
        background-color: #f3f4f6;
      }

      .specs-table tbody tr:hover td:first-child {
        background-color: #f3f4f6;
      }

      /* Header row styling */
      .specs-table tbody tr.header-row {
        background-color: #1e3a8a !important;
      }

      .specs-table tbody tr.header-row td {
        font-weight: 700;
        color: white;
        background-color: #1e3a8a !important;
        border-top: 2px solid #1e40af;
        border-bottom: 2px solid #1e40af;
      }

      .specs-table tbody tr.header-row td:first-child {
        background-color: #1e3a8a !important;
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
        .specs-table th {
          padding: 12px 8px;
          font-size: 12px;
        }

        .specs-table td {
          padding: 10px 8px;
          font-size: 12px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 150px;
        }

        .tab-navigation {
          flex-direction: column;
          align-items: stretch;
        }

        .tab-button {
          text-align: center;
          margin: 2px 0;
        }
      }

      @media (max-width: 480px) {
        .specs-table {
          min-width: 600px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 120px;
        }

        .specs-table th {
          padding: 10px 6px;
          font-size: 11px;
        }

        .specs-table td {
          padding: 8px 6px;
          font-size: 11px;
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

  const ProductSpecContent = () => (
    <div className="w-full mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Title Section - Enhanced Design */}
      <section className="relative overflow-hidden bg-gradient-to-r from-[#1e3a8a] via-[#1e40af] to-[#1d4ed8]">
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
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                KRYKARD HX SERIES 3/3 UPS
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                40 kVA to 300 kVA - Industrial-grade three-phase power protection with inbuilt isolation transformer designed for challenging and regenerative loads.
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
                <span className="text-white/90 text-sm font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Industrial Power Protection Leader
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
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Get Quote
                  </Link>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer  nofollow"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e3a8a] px-6 md:px-8 py-3 md:py-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 font-semibold text-sm md:text-base min-w-[160px]"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Brochure
                  </a>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Hero Content Section */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="relative z-10 px-4 max-w-7xl mx-auto">
          {/* Hero Content Area with Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Left side: Enhanced Content */}
            <motion.div
              className="space-y-6 md:space-y-8 px-4 md:px-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 md:mb-6">Industrial-Grade Power Protection</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  The KRYKARD HX Series is engineered for the most demanding industrial environments, delivering uncompromising three-phase power protection with inbuilt isolation transformer designed to handle challenging and regenerative loads.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:w-1/2">
                  <Link
                    to="/contact/sales"
                    className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] hover:from-[#1e40af] hover:to-[#1d4ed8] text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 w-full text-base"
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>

                <motion.a
                  href={pdfUrl}
                  className="border-2 border-[#1e3a8a] text-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-1/2 text-base"
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer  nofollow"
                >
                  <FileText size={18} />
                  <span>UPS Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>
            {/* Right side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center px-4 md:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean UPS image */}
                <motion.img
                  src="/UPS/1-removebg-preview.png"
                  alt="KRYKARD HX Series 40-300 kVA Industrial Online UPS for Heavy Manufacturing"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Key Features & Advantages Section - Container Layout */}
          <div className="container mx-auto px-4 mb-16 md:mb-20 relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-32 md:w-64 h-32 md:h-64 bg-[#1e3a8a]/20 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 w-40 md:w-80 h-40 md:h-80 bg-[#1e40af]/20 rounded-full opacity-20 blur-3xl"></div>
            </div>

            <motion.div
              className="text-center mb-12 md:mb-16 relative z-10"
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
                Core capabilities and advantages of our industrial-grade UPS solutions
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
                      "Online double conversion with advanced dual core DSP control",
                      "Inbuilt isolation transformer for complete electrical isolation",
                      "Wide input voltage range (304-480 VAC) for unstable power conditions",
                      "High efficiency operation - up to 98% in ECO mode, 96% in online mode",
                      "Parallel capability - connect up to 8 units for redundancy",
                      "Industrial grade design with high MTBF >250,000 hours",
                      "Advanced battery management with configurable testing",
                      "Tool-free maintenance for easy installation and service",
                      "Frequency range (40-70 Hz) immune to unstable sources",
                      "Regenerative load capability for challenging applications",
                      "Built-in electronic protection through IGBT control",
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
                      "Maintenance bypass switch with inbuilt battery cabinet",
                      "Generator overload protection prevents starting inrush currents",
                      "Phase isolation technology for high THD environments",
                      "Full digital frequency converter with emergency coverage mode",
                      "Built-in system protection diagnostic with SNMP/USB compatibility",
                      "Advanced backfeed protection circuit with various operating modes",
                      "Separate isolation transformer access for enhanced protection",
                      "Power protection with regenerating capability for critical loads",
                      "Output frequency freely selectable for sensitive equipment",
                      "Built-in DC fuses with advanced battery monitoring display",
                      "Internal battery life extender with redundancy capability",
                      "Comprehensive protection against overvoltage, surge, and lightning"
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

      {/* Technical Specifications Section - Simple Brochure Link Only */}
      <section className="max-w-7xl mx-auto px-4 mb-16">
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
            Comprehensive technical details for the HX Series UPS line
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

      {/* Key Features Highlight Section - Clean and Simple */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">Key Highlights</h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
            Standout features that make the HX Series exceptional for industrial applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Industrial-Grade Design",
              description: "Built to withstand harsh industrial environments with robust construction, high MTBF >250,000 hours, and tool-free maintenance.",
              icon: IndustrialIcon
            },
            {
              title: "Regenerative Load Capability",
              description: "Specifically designed to handle challenging regenerative loads and variable frequency drives common in industrial applications.",
              icon: RegenerativeIcon
            },
            {
              title: "Advanced Parallel Capability",
              description: "Connect up to 8 units in parallel for increased capacity or N+X redundancy configuration, providing scalable power solutions.",
              icon: ParallelIcon
            },
            {
              title: "Superior Harmonic Control",
              description: "Advanced harmonic filtering and control technology ensures clean power output even in high THD environments.",
              icon: HarmonicControlIcon
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

      {/* Inbuilt Isolation Transformer Advantages - Clean and Simple */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">
            Inbuilt Isolation Transformer Advantages
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Enhanced protection for your critical industrial equipment with superior electrical isolation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Isolation Transformer",
              description: "Complete electrical isolation between input and output circuits, eliminating common mode noise and improving overall system reliability.",
              icon: IsolationTransformerIcon
            },
            {
              title: "High Efficiency",
              description: "Superior efficiency ratings up to 98% in ECO mode and 96% in online mode, reducing operational costs and environmental impact.",
              icon: HighEfficiencyIcon
            },
            {
              title: "Advanced Protection",
              description: "Superior protection against voltage spikes, surges, and electrical noise, making it ideal for sensitive industrial equipment.",
              icon: AdvancedProtectionIcon
            },
            {
              title: "Flexible Configuration",
              description: "Adaptable to various industrial configurations with selectable output frequency and multiple operating modes for different applications.",
              icon: FlexibleConfigurationIcon
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

      {/* Application Areas */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-4 md:mb-6">Ideal Applications</h2>
          <p className="mt-6 text-base md:text-lg text-gray-600 max-w-3xl mx-auto">
            Perfect solutions for these demanding industrial environments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 md:px-0">
          {[
            { icon: "🏭", text: "Heavy Manufacturing" },
            { icon: "🔧", text: "Oil & Gas Facilities" },
            { icon: "🔬", text: "Research Labs" },
            { icon: "🏗️", text: "Infrastructure" },
            { icon: "🔐", text: "Defense & Security" },
            { icon: "⚡", text: "Power Utilities" },
            { icon: "🏢", text: "Processing Plants" },
            { icon: "🖥️", text: "Industrial Control" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-[#1e3a8a]/5 border border-[#1e3a8a]/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl mb-3"
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
                {item.icon}
              </motion.div>
              <h3 className="text-sm md:text-base font-medium text-[#1e3a8a]">{item.text}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF Viewer Modal */}
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
              <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">KHX Series UPS Brochure</h3>
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
              {/* Direct PDF embedding */}
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-8 text-center">
                  <p className="typography-body text-gray-600 mb-4">
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

      {/* Call-to-Action Section - Compact Design */}
      <section className="max-w-3xl mx-auto px-4 mb-12">
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
                Ready for Industrial Power Protection?
              </h2>

              <p className="text-sm md:text-base text-white mb-4 md:mb-6 max-w-2xl mx-auto">
                Get in touch with our experts to find the perfect industrial UPS
                solution for your demanding applications.
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
    "name": "HX Series Industrial Online UPS",
    "description": "HX Series 40–300 kVA industrial online UPS with harmonic control, N+1 redundancy and rugged construction for heavy manufacturing.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "HX Series",
    "image": "https://atandra.in/UPS/1-removebg-preview.png",
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
        title="HX Series 40–300 kVA Industrial Online UPS"
        description="HX Series 40–300 kVA industrial online UPS with harmonic control, N+1 redundancy and rugged construction for heavy manufacturing."
        keywords="HX series UPS, 40 kVA UPS, 300 kVA UPS, industrial UPS, heavy manufacturing UPS, mining UPS, regenerative load UPS, isolation transformer UPS, steel production UPS, chemical processing UPS"
        canonical="https://atandra.in/protect/ups/product/hx-series"
        ogImage="/UPS/1-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/UPS/1-removebg-preview.png"
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