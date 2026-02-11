import { useState, useEffect } from 'react';
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

const DoubleConversionIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 12L21 12M7 8L3 12L7 16M17 8L21 12L17 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 6V18" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  </BlueRoundedIcon>
);

const CompactDesignIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="white" strokeWidth="2" />
      <path d="M7 10H17M7 14H13" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="14" r="1" fill="white" />
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

const AdvancedProtectionIcon = () => (
  <BlueRoundedIcon>
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V13C3 17.55 6.84 21.74 12 23C17.16 21.74 21 17.55 21 13V7L12 2Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M9 12L11 14L15 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
                KRYKARD EH 11 SERIES 1/1 UPS
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-base md:text-lg text-white/90 mb-4 md:mb-6 max-w-3xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                6 kVA & 10 kVA - Compact single-phase UPS solutions delivering reliable power protection with advanced DSP technology and robust backup capabilities.
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
            {/* Left side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center px-4 md:px-0 order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean UPS image */}
                <motion.img
                  src="/UPS/SB4_-_2-removebg-preview.png"
                  alt="KRYKARD EH-11 Series 6-10 kVA Online UPS for Small Businesses"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>

            {/* Right side: Enhanced Content */}
            <motion.div
              className="space-y-6 md:space-y-8 px-4 md:px-0 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#1e3a8a] mb-4 md:mb-6">Compact Power Protection</h2>
                <p className="text-base text-gray-700 leading-relaxed">
                  The KRYKARD EH 11 Series delivers reliable single-phase power protection with advanced DSP technology. Designed for small to medium applications requiring robust backup solutions with a compact footprint.
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
                Core capabilities and advantages of our compact UPS solutions
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
                      "Wide input voltage range (115-280 VAC) for unstable power conditions",
                      "Online double conversion with advanced dual-core DSP control technology",
                      "Compact footprint design ideal for space-constrained environments",
                      "Advanced power factor correction (>0.99) for maximum efficiency",
                      "Tool-free maintenance with zero function downtime",
                      "Frequency range (40-70 Hz) immune to unstable sources",
                      "Parallel capability for high-tier load applications",
                      "Advanced battery management with automatic testing",
                      "Transformerless design for reduced size and weight",
                      "Complete solutions for unmatched application flexibility",
                      "Software compatibility with multiple connectivity options",
                      "Self-protecting with 3-level design architecture"
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
                      "Online double conversion with full digital frequency converter",
                      "Built-in system protection diagnostic with SNMP/USB compatibility",
                      "Advanced backfeed protection circuit with various operating modes",
                      "Power protection with regenerating capability for critical loads",
                      "Output frequency freely selectable for sensitive equipment",
                      "Built-in DC fuses with advanced battery monitoring",
                      "Internal battery life extender with redundancy capability",
                      "High efficiency - up to 95% in offline mode, 93% in online mode",
                      "Reduction in carbon footprint with smaller sizes than legacy systems",
                      "Maximum utilization of UPS capacity with better efficiency"
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
            Comprehensive technical details for the EH 11 Series UPS line
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
            Standout features that make the EH 11 Series exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Double Conversion Technology",
              description: "Online double conversion with advanced dual-core DSP control ensures pure sine wave output with zero transfer time for complete protection.",
              icon: DoubleConversionIcon
            },
            {
              title: "Compact Design",
              description: "Smaller footprint than traditional UPS systems of similar capacity, ideal for space-constrained environments with robust backup solutions.",
              icon: CompactDesignIcon
            },
            {
              title: "Advanced Battery Management",
              description: "Sophisticated battery management with automatic testing, deep discharge protection, and temperature compensation for maximum battery life.",
              icon: BatteryManagementIcon
            },
            {
              title: "Advanced Protection",
              description: "Comprehensive protection against short circuit, overload, over temperature, surge protection, and voltage variations for complete safety.",
              icon: AdvancedProtectionIcon
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
            { icon: "🏢", text: "Small Offices" },
            { icon: "🏥", text: "Medical Equipment" },
            { icon: "💻", text: "Network Equipment" },
            { icon: "🏭", text: "Industrial Control" },
            { icon: "🔬", text: "Laboratory Equipment" },
            { icon: "🏗️", text: "Manufacturing" },
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
              <h3 className="text-base md:text-lg font-semibold text-[#1e3a8a]">EH 11 Series UPS Brochure</h3>
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
                Ready for Reliable Power Protection?
              </h2>

              <p className="text-sm md:text-base text-white mb-4 md:mb-6 max-w-2xl mx-auto">
                Get in touch with our experts to find the perfect single-phase UPS solution for your critical power protection needs.
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
    "name": "EH-11 Series Online UPS",
    "description": "EH-11 Series 6 kVA & 10 kVA online UPS with LCD display, smart battery management and energy-efficient performance for small and mid-size businesses.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "EH-11 Series",
    "image": "https://atandra.in/UPS/SB4_-_2-removebg-preview.png",
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
        title="EH-11 Series 6–10 kVA Online UPS for SMBs"
        description="EH-11 Series 6 kVA & 10 kVA online UPS with LCD display, smart battery management and energy-efficient performance for small and mid-size businesses."
        keywords="EH-11 series UPS, 6 kVA UPS, 10 kVA UPS, small medium business UPS, compact UPS, LCD display UPS, battery management UPS, server room UPS, network infrastructure UPS"
        canonical="https://atandra.in/protect/ups/product/eh-11-series"
        ogImage="/UPS/SB4_-_2-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/UPS/SB4_-_2-removebg-preview.png"
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >
        {/* Hide Breadcrumbs and Add Custom Title */}
        <style>{`
          nav.mb-10 { display: none !important; }
          .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
        `}</style>

        <ProductSpecContent />
      </PageLayout>
    </>
  );
};

export default ProductSpecification; 