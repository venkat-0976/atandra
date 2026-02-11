import React, { useEffect } from 'react';
import { Clock, ArrowRight, FileText, Star, Zap, Shield, BarChart3 } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import SeoHead from '@/seo/SeoHead';

const ProductSpecification = () => {
  // Enhanced mobile table styles with Open Sans font and improved spacing
  const customStyles = `
    * {
      font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    .specs-table-container {
      position: relative;
      width: 100%;
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
      margin-bottom: 16px;
    }

    .specs-table-scroll {
      overflow-x: auto;
      overflow-y: visible;
      -webkit-overflow-scrolling: touch;
      scrollbar-width: thin;
      scrollbar-color: #000000 #f1f5f9;
    }

    .specs-table-scroll::-webkit-scrollbar {
      height: 10px;
    }

    .specs-table-scroll::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 5px;
      margin: 0 4px;
    }

    .specs-table-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #000000, #333333);
      border-radius: 5px;
      border: 2px solid #f1f5f9;
    }

    .specs-table-scroll::-webkit-scrollbar-thumb:hover {
      background: linear-gradient(90deg, #333333, #555555);
    }

    .specs-table-scroll::-webkit-scrollbar-thumb:active {
      background: linear-gradient(90deg, #555555, #777777);
    }

    .specs-table {
      width: 100%;
      min-width: 1000px;
      border-collapse: separate;
      border-spacing: 0;
      background: white;
      font-family: 'Open Sans', sans-serif;
    }

    .specs-header-cell {
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
      color: white;
      font-weight: 600;
      text-align: left;
      padding: 12px 10px;
      font-size: 13px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      position: sticky;
      top: 0;
      z-index: 20;
      font-family: 'Open Sans', sans-serif;
    }

    .specs-data-cell {
      padding: 8px 10px;
      border-bottom: 1px solid #e5e7eb;
      font-size: 13px;
      font-weight: 500;
      color: #000000;
      background: white;
      transition: background-color 0.2s ease;
      font-family: 'Open Sans', sans-serif;
    }

    .specs-data-cell:hover {
      background: #f8fafc;
    }

    .specs-category-cell {
      background: #f8fafc;
      font-weight: 600;
      color: #000000;
      border-left: 3px solid #000000;
      padding: 8px 12px;
      font-family: 'Open Sans', sans-serif;
    }

    .sticky-header-mobile {
      position: sticky;
      left: 0;
      z-index: 30;
      background: linear-gradient(135deg, #000000 0%, #333333 100%);
    }

    .sticky-cell-mobile {
      position: sticky;
      left: 0;
      z-index: 10;
      border-right: 2px solid #e5e7eb;
    }

    @media (max-width: 768px) {
      .specs-table-scroll {
        padding-bottom: 6px;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 12px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #e2e8f0;
        border-radius: 6px;
        margin: 0 6px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, #000000, #333333);
        border-radius: 6px;
        border: 2px solid #e2e8f0;
        min-width: 35px;
      }

      .specs-table {
        min-width: 800px;
        font-size: 12px;
      }

      .specs-header-cell {
        padding: 8px 6px;
        font-size: 10px;
      }

      .specs-data-cell {
        padding: 6px 6px;
        font-size: 11px;
      }

      .specs-category-cell {
        padding: 6px 8px;
        font-size: 11px;
      }
    }

    @media (max-width: 640px) {
      .specs-table-scroll {
        padding-bottom: 8px;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 14px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #cbd5e1;
        border-radius: 7px;
        margin: 0 8px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, #000000, #333333);
        border-radius: 7px;
        border: 3px solid #cbd5e1;
        min-width: 40px;
      }

      .specs-table {
        min-width: 700px;
        font-size: 11px;
      }

      .specs-header-cell {
        padding: 6px 4px;
        font-size: 9px;
      }

      .specs-data-cell {
        padding: 5px 4px;
        font-size: 10px;
      }

      .specs-category-cell {
        padding: 5px 6px;
        font-size: 10px;
      }
    }

    /* Simplified mobile scroll indicators */
    @media (max-width: 768px) {
      .specs-table-container {
        position: relative;
      }

      .specs-table-container::after {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        width: 16px;
        height: 100%;
        background: linear-gradient(to left, rgba(255,255,255,0.8), transparent);
        pointer-events: none;
        z-index: 10;
      }

      .specs-table-container::before {
        content: '→';
        position: absolute;
        top: 50%;
        right: 6px;
        transform: translateY(-50%);
        color: #000000;
        font-size: 14px;
        font-weight: 600;
        z-index: 15;
        animation: scrollHint 2s ease-in-out infinite;
      }

      /* Optimized scrollbar for mobile */
      .specs-table-scroll {
        scrollbar-width: auto !important;
        -webkit-overflow-scrolling: touch;
        overflow-x: scroll !important;
        padding-bottom: 16px;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 14px !important;
        background: #f1f5f9;
        border-radius: 7px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: linear-gradient(90deg, #000000, #333333) !important;
        border-radius: 7px;
        border: 2px solid #f1f5f9;
        min-width: 50px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #e2e8f0;
        border-radius: 7px;
        margin: 0 8px;
      }
    }

    @keyframes scrollHint {
      0%, 100% { opacity: 0.6; transform: translateY(-50%) translateX(0); }
      50% { opacity: 1; transform: translateY(-50%) translateX(2px); }
    }

    .mobile-swipe-instruction {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border: 1px solid #dee2e6;
      border-radius: 6px;
      padding: 8px;
      margin-bottom: 12px;
      text-align: center;
      font-weight: 500;
      color: #000000;
      box-shadow: 0 1px 3px rgba(0,0,0,0.08);
      font-family: 'Open Sans', sans-serif;
    }

    @media (min-width: 769px) {
      .mobile-swipe-instruction {
        display: none;
      }
    }

    .table-responsive-wrapper {
      position: relative;
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }

    .gradient-overlay-left {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 20px;
      background: linear-gradient(to right, rgba(255,255,255,0.9), transparent);
      pointer-events: none;
      z-index: 2;
    }

    .gradient-overlay-right {
      position: absolute;
      right: 0;
      top: 0;
      bottom: 0;
      width: 30px;
      background: linear-gradient(to left, rgba(255,255,255,0.9), transparent);
      pointer-events: none;
      z-index: 5;
    }

    /* Enhanced sticky column behavior */
    .specs-table th:first-child,
    .specs-table td:first-child {
      position: sticky;
      left: 0;
      z-index: 15;
      background: inherit;
    }

    .specs-table thead th:first-child {
      background: linear-gradient(135deg, #000000 0%, #1f2937 100%) !important;
      z-index: 20;
    }

    .specs-table tbody tr:nth-child(even) td:first-child {
      background: #f9fafb !important;
    }

    .specs-table tbody tr:nth-child(odd) td:first-child {
      background: white !important;
    }

    /* Header row styling for sticky first column */
    .specs-table tbody tr.header-row td:first-child {
      background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%) !important;
      font-weight: bold;
      z-index: 15;
    }

    /* Touch-friendly scrolling improvements */
    .specs-table-container {
      touch-action: pan-x;
    }

    /* Improved visual feedback for mobile */
    @media (max-width: 768px) {
      .specs-table-container {
        position: relative;
      }

      .specs-table-container::before {
        content: '';
        position: absolute;
        top: 0;
        left: 150px;
        width: 2px;
        height: 100%;
        background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.1), transparent);
        z-index: 10;
        pointer-events: none;
      }
    }
  `;

  // Inject styles into document head
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);
  const featuresList = [
    { title: 'Wide input voltage range (120 - 480 VAC)', desc: 'Protects against unstable input and extends battery life' },
    { title: 'Compact footprint', desc: 'Smallest design for single and three phase UPS' },
    { title: 'Front access maintenance', desc: 'Easier installation and service' },
    { title: 'Frequency range (45 - 55 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Dual feed capability', desc: 'Provides redundant configuration' },
    { title: 'Parallel capability', desc: 'Ideal for high-tier load applications' },
    { title: 'Super powerful DSP microcontroller', desc: 'Best controller with a faster process' },
    { title: 'Full digital control', desc: 'For highest performance' },
    { title: 'DC voltage and current limitation', desc: 'Latest techniques for full protection' },
    { title: 'Overload capability', desc: 'Built-in overload and short circuit protection' },
    { title: 'Control with HMI touchpad', desc: 'Quick and simple access to configuration' },
    { title: 'Transformerless Design', desc: 'Optimizes the Power Factor to 0.9 or higher' },
    { title: 'Higher Power Factor Correction (0.99)', desc: 'Up to 0.99' },
    { title: '≥95% Efficiency' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Current Generator Overload due to starting inrush currents', desc: 'Sensitive medical equipment' },
    { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Lower total harmonic distortion (< 3%)' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes' },
    { title: 'Power operation function', desc: 'Higher efficiency (up to 98% in ECO mode)' },
    { title: 'Overvoltage protection (optional)', desc: 'Including voltage sensor under voltage load' },
    { title: 'Automatic bypass', desc: 'Bypass for fault clearing' },
    { title: 'Built-in DC fuses', desc: 'Automatic battery protection available in Power Vision' },
    { title: '0% to 100% step load change without transfer to Bypass', desc: 'Ideal for powerhungry for redundancy & load changes' },
    { title: 'Multifunction LCD Display', desc: 'Different languages (user-selectable)' },
    { title: 'Robust construction', desc: 'Compact size with maximum performance' },
    { title: 'Low Operating Cost', desc: 'High Efficiency - Upto 95% or better' },
    { title: 'Reduction in carbon footprint', desc: 'Full UPS capacity' },
    { title: 'Increase in IT floor space', desc: 'No transformer required' },
    { title: 'Better ability to match to load', desc: 'Savings of up to 40%' },
    { title: 'Reduction floor space' }
  ];

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
                KRYKARD EH 31 SERIES 3/1 UPS
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                10 kVA & 20 kVA - Enterprise-grade three-phase input, single-phase output delivering superior protection for your mission-critical equipment.
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
                  Guardian of Your Critical Systems
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
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 md:mb-6">Enterprise-Grade Power Protection</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  The KRYKARD EH 31 Series is designed for critical applications requiring robust three-phase input and single-phase output power protection. Its enterprise-grade design delivers superior protection for your mission-critical equipment.
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
                  src="/UPS/5-removebg-preview.png"
                  alt="KRYKARD EH-31 Series 10-20 kVA 3-Phase Online UPS with ECO Mode and Smart Battery Management"
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
                Core capabilities and advantages of our premium UPS solutions
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
                  {featuresList.slice(0, 8).map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-[#1e3a8a] rounded-full mt-2 sm:mt-3"></div>
                      <p className="text-base text-gray-700 leading-relaxed">{feature.title}</p>
                    </motion.div>
                  ))}
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
                  {advantagesList.slice(0, 8).map((advantage, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true, margin: "-50px" }}
                    >
                      <div className="flex-shrink-0 w-2 h-2 bg-[#1e3a8a] rounded-full mt-2 sm:mt-3"></div>
                      <p className="text-base text-gray-700 leading-relaxed">{advantage.title}</p>
                    </motion.div>
                  ))}
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
            Comprehensive technical details for the EH 31 Series UPS line
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
            Standout features that make the EH 31 Series exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Wide Input Voltage Range",
              description: "Operates with input voltage range of 120-480 VAC, providing protection against unstable power conditions without switching to battery mode.",
              icon: <Shield size={24} className="text-white" />
            },
            {
              title: "Compact Footprint Design",
              description: "Smallest design for single and three phase UPS with front access maintenance for easier installation and service.",
              icon: <BarChart3 size={24} className="text-white" />
            },
            {
              title: "Advanced Parallel Capability",
              description: "Connect up to 4 units in parallel for increased capacity or redundancy configuration, providing scalable power solutions.",
              icon: <Clock size={24} className="text-white" />
            },
            {
              title: "High Efficiency Operation",
              description: "Achieves up to 95% efficiency with transformerless design and power factor correction up to 0.99 for optimal performance.",
              icon: <Zap size={24} className="text-white" />
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
                <div className="w-8 h-8 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-lg flex items-center justify-center shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">{feature.title}</h3>
              </div>
              <p className="text-base text-gray-700 leading-relaxed">{feature.description}</p>
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
            Perfect solutions for these critical environments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 md:px-0">
          {[
            { icon: "🏢", text: "Industrial Control" },
            { icon: "🏥", text: "Medical Facilities" },
            { icon: "💻", text: "Data Centers" },
            { icon: "📡", text: "Telecom Infrastructure" },
            { icon: "🔬", text: "Research Labs" },
            { icon: "🏭", text: "Manufacturing" },
            { icon: "🖥️", text: "Server Rooms" },
            { icon: "⚡", text: "Critical Systems" }
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
                Ready for Reliable Power Protection?
              </h2>

              <p className="text-sm md:text-base text-white mb-4 md:mb-6 max-w-2xl mx-auto">
                Get in touch with our experts to find the perfect three-phase to single-phase UPS
                solution for your critical power protection needs.
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
    "name": "EH-31 Series Online UPS",
    "description": "EH-31 Series 10 kVA & 20 kVA three-phase input online UPS with ECO mode, smart battery management and advanced protection for enterprises.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "EH-31 Series",
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
        title="EH-31 Series 10–20 kVA 3-Phase Input Online UPS"
        description="EH-31 Series 10 kVA & 20 kVA three-phase input online UPS with ECO mode, smart battery management and advanced protection for enterprises."
        keywords="EH-31 series UPS, 10 kVA UPS, 20 kVA UPS, three-phase input UPS, enterprise UPS, data center UPS, ECO mode UPS, medium business UPS, server room UPS, manufacturing UPS"
        canonical="https://atandra.in/protect/ups/product/eh-31-series"
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




