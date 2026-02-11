import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText, ChevronDown, ChevronUp, Star } from 'lucide-react';
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

const CompactDesignIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 21H21M5 21V7L12 3L19 7V21M9 12H15M9 16H15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="8" r="1" fill="white" />
    </svg>
  </BlueRoundedIcon>
);

const HighEfficiencyIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </BlueRoundedIcon>
);

const ParallelCapabilityIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4V20M10 4V20M14 4V20M18 4V20" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 8H8M4 12H8M4 16H8M12 8H16M12 12H16M12 16H16M16 8H20M16 12H20M16 16H20" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const AdvancedControlIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V13C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 13V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </BlueRoundedIcon>
);

const ProductSpecification = () => {
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
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

  const allFeatures = [
    "Wide input voltage range (304-478 VAC) protects against unstable input and extends battery life",
    "Compact footprint - smallest design for single and three phase UPS applications",
    "Front access maintenance for easier installation and service operations",
    "Frequency range (45-55 Hz) immune to unstable power sources",
    "Dual feed capability provides redundant configuration options",
    "Parallel capability ideal for high-tier load applications",
    "Online double conversion with advanced dual core DSP control for full digital performance",
    "Self-diagnostics with built-in electronic protection systems",
    "Advanced battery management with automatic testing and deep discharge protection",
    "Extensive software & connectivity options for complete advanced applications",
    "Transformerless design optimizes power factor to 0.9 or higher",
    "Power factor correction greater than 0.99 for maximum efficiency"
  ];

  const allAdvantages = [
    "Maintenance bypass switch with inbuilt battery cabinet for continuous operation",
    "Generator overload protection prevents starting inrush current issues",
    "Online double conversion with full digital frequency converter technology",
    "Built-in system protection diagnostic with SNMP/USB compatibility",
    "Advanced backfeed protection circuit design with various operating modes",
    "Power operation function delivering high efficiency and reliability",
    "Voltage sensor protection against under/over voltage conditions",
    "Automatic bypass for fault clearing and system protection",
    "Built-in DC fuses with advanced battery monitoring display",
    "0% to 100% step load change capability without bypass transfer",
    "Multifunction LCD display with ECO mode operation",
    "Programmable alarm system for comprehensive warning notifications"
  ];

  const ProductSpecContent = () => {
    return (
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
                  KRYKARD EH 33 SMALL SERIES 3/3 UPS
                </motion.h1>

                {/* Subtitle */}
                <motion.p
                  className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  10 kVA to 60 kVA - Midrange three-phase power protection with high-frequency design delivering superior efficiency for your business-critical applications.
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
                    Reliable Power Protection
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
                  <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 md:mb-6">Midrange Three-Phase Power Protection</h2>
                  <p className="text-base text-gray-700 leading-relaxed">
                    The KRYKARD EH 33 Small Series delivers reliable three-phase power protection in a compact footprint, perfect for midsize data centers, manufacturing equipment, and business-critical applications requiring high-frequency design efficiency.
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
                    src="/UPS/6-removebg-preview.png"
                    alt="KRYKARD EH-33 Small Series 10-60 kVA Online UPS for Data Centers"
                    className="max-w-full max-h-full object-contain"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Key Features & Advantages Section - Container Layout */}
        <section className="py-8 md:py-12 relative overflow-hidden">
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
                Core capabilities and advantages of our midrange UPS solutions
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
              Comprehensive technical details for the EH 33 Small Series UPS line
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

        {/* Key Features Highlight Section */}
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
              Standout features that make the EH 33 Small Series exceptional
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Compact Design",
                description: "Smallest footprint for single and three-phase UPS applications, maximizing available space without compromising on power or performance.",
                icon: CompactDesignIcon
              },
              {
                title: "High Efficiency Operation",
                description: "Achieves up to 95% efficiency in online mode with transformerless design, reducing operational costs and environmental impact.",
                icon: HighEfficiencyIcon
              },
              {
                title: "Advanced Parallel Capability",
                description: "Connect up to 4 units in parallel for increased capacity or redundancy configuration, providing scalable power solutions.",
                icon: ParallelCapabilityIcon
              },
              {
                title: "Advanced DSP Control",
                description: "Online double conversion with advanced dual core DSP control delivers full digital control for highest performance and reliability.",
                icon: AdvancedControlIcon
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

        {/* Application Areas Section */}
        <section className="container mx-auto px-4 mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 py-16 rounded-3xl">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#1e3a8a] mb-6">Ideal Applications</h2>
            <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
              Perfect solutions for these critical environments
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Manufacturing",
                description: "Ensures continuous operation of manufacturing equipment, control systems, and automation processes in industrial environments.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                )
              },
              {
                title: "Server Rooms",
                description: "Protects critical IT infrastructure, servers, and network equipment in data centers and server rooms.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                  </svg>
                )
              },
              {
                title: "Healthcare",
                description: "Delivers reliable power for diagnostic systems, lab equipment, and critical medical instruments in healthcare facilities.",
                icon: (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                )
              }
            ].map((application, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col items-center text-center hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1e3a8a] to-[#1e40af] rounded-full flex items-center justify-center text-white mb-6 shadow-lg">
                  {application.icon}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#1e3a8a] mb-4">{application.title}</h3>
                <p className="text-base text-gray-700 leading-relaxed">
                  {application.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="container mx-auto px-4 mb-16">
          <motion.div
            className="bg-gradient-to-r from-[#1e3a8a] to-[#1e40af] rounded-xl overflow-hidden shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="py-12 md:py-16 px-8 md:px-12 text-center relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-10 -left-10 w-40 h-40 bg-white opacity-10 rounded-full blur-xl"></div>
                <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-white opacity-5 rounded-full blur-2xl"></div>
              </div>

              <div className="relative z-10">
                <motion.h2
                  className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-white"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  viewport={{ once: true }}
                >
                  Need More Information?
                </motion.h2>

                <motion.p
                  className="text-white/90 mb-8 md:mb-10 max-w-4xl mx-auto text-base md:text-lg leading-relaxed"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  Our team of experts is ready to help you with product specifications, custom solutions, pricing, and
                  any other details you need about the KRYKARD EH 33 Small Series UPS systems.
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link
                      to="/contact/sales"
                      className="bg-white text-[#1e3a8a] hover:bg-gray-50 shadow-lg transition-all duration-300 px-8 md:px-10 py-4 md:py-5 rounded-lg font-semibold flex items-center justify-center gap-3 text-base md:text-lg min-w-[200px]"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      <span>Contact Our Experts</span>
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer  nofollow"
                      className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#1e3a8a] px-8 md:px-10 py-4 md:py-5 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 font-semibold text-base md:text-lg min-w-[200px]"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>Download Brochure</span>
                    </a>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    );
  };

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EH-33 Small Series Online UPS",
    "description": "EH-33 Small Series 10–60 kVA three-phase UPS with parallel operation, SNMP communication and advanced cooling for data centers.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "EH-33 Small Series",
    "image": "https://atandra.in/UPS/6-removebg-preview.png",
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

  return (
    <>
      <SeoHead
        title="EH-33 Small Series 10–60 kVA 3-Phase Online UPS"
        description="EH-33 Small Series 10–60 kVA three-phase UPS with parallel operation, SNMP communication and advanced cooling for data centers."
        keywords="EH-33 small series UPS, 10 kVA UPS, 60 kVA UPS, three-phase UPS, high-frequency UPS, data center UPS, parallel operation UPS, SNMP UPS, server farm UPS, cloud infrastructure UPS"
        canonical="https://atandra.in/protect/ups/product/eh-33-small-series"
        ogImage="/UPS/6-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/UPS/6-removebg-preview.png"
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
