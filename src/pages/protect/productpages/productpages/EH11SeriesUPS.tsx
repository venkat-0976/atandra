import React, { useState, useEffect } from 'react';
import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, BarChart3, ArrowRight, FileText } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';

// Enhanced mobile table styles - same design as web but mobile optimized
const customStyles = `
  .specs-table-container {
    position: relative;
    width: 100%;
    background: white;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .specs-table-scroll {
    overflow-x: auto;
    overflow-y: visible;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: thin;
    scrollbar-color: #3b82f6 #f1f5f9;
  }

  .specs-table-scroll::-webkit-scrollbar {
    height: 12px;
  }

  .specs-table-scroll::-webkit-scrollbar-track {
    background: #f1f5f9;
    border-radius: 6px;
    margin: 0 4px;
  }

  .specs-table-scroll::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #3b82f6, #2563eb);
    border-radius: 6px;
    border: 2px solid #f1f5f9;
  }

  .specs-table-scroll::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #2563eb, #1d4ed8);
  }

  .specs-table-scroll::-webkit-scrollbar-thumb:active {
    background: linear-gradient(90deg, #1d4ed8, #1e40af);
  }

  .specs-table {
    width: 100%;
    min-width: 1000px;
    border-collapse: separate;
    border-spacing: 0;
    background: white;
  }

  .specs-header-cell {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    font-weight: bold;
    text-align: left;
    padding: 16px 12px;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    position: sticky;
    top: 0;
    z-index: 20;
  }

  .specs-data-cell {
    padding: 12px;
    border-bottom: 1px solid #e5e7eb;
    font-size: 14px;
    font-weight: 500;
    color: #000000;
    background: white;
    transition: background-color 0.2s ease;
  }

  .specs-data-cell:hover {
    background: #f8fafc;
  }

  .specs-category-cell {
    background: #f8fafc;
    font-weight: 600;
    color: #000000;
    border-left: 4px solid #3b82f6;
    padding: 12px 16px;
  }

  .sticky-header-mobile {
    position: sticky;
    left: 0;
    z-index: 30;
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
  }

  .sticky-cell-mobile {
    position: sticky;
    left: 0;
    z-index: 10;
    border-right: 2px solid #e5e7eb;
  }

  @media (max-width: 768px) {
    .specs-table-scroll {
      padding-bottom: 8px;
    }

    .specs-table-scroll::-webkit-scrollbar {
      height: 14px;
    }

    .specs-table-scroll::-webkit-scrollbar-track {
      background: #e2e8f0;
      border-radius: 7px;
      margin: 0 8px;
    }

    .specs-table-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #3b82f6, #2563eb);
      border-radius: 7px;
      border: 3px solid #e2e8f0;
      min-width: 40px;
    }

    .specs-table {
      min-width: 800px;
      font-size: 13px;
    }

    .specs-header-cell {
      padding: 12px 8px;
      font-size: 11px;
    }

    .specs-data-cell {
      padding: 10px 8px;
      font-size: 12px;
    }

    .specs-category-cell {
      padding: 10px 12px;
      font-size: 12px;
    }
  }

  @media (max-width: 640px) {
    .specs-table-scroll {
      padding-bottom: 10px;
    }

    .specs-table-scroll::-webkit-scrollbar {
      height: 16px;
    }

    .specs-table-scroll::-webkit-scrollbar-track {
      background: #cbd5e1;
      border-radius: 8px;
      margin: 0 10px;
    }

    .specs-table-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #3b82f6, #1e40af);
      border-radius: 8px;
      border: 4px solid #cbd5e1;
      min-width: 50px;
    }

    .specs-table {
      min-width: 700px;
      font-size: 12px;
    }

    .specs-header-cell {
      padding: 10px 6px;
      font-size: 10px;
    }

    .specs-data-cell {
      padding: 8px 6px;
      font-size: 11px;
    }

    .specs-category-cell {
      padding: 8px 10px;
      font-size: 11px;
    }
  }

  /* Additional mobile scroll indicators and enhanced scrollbar */
  @media (max-width: 768px) {
    .specs-table-container {
      position: relative;
    }

    .specs-table-container::after {
      content: '';
      position: absolute;
      top: 0;
      right: 0;
      width: 20px;
      height: 100%;
      background: linear-gradient(to left, rgba(255,255,255,0.9), transparent);
      pointer-events: none;
      z-index: 10;
    }

    .specs-table-container::before {
      content: '→';
      position: absolute;
      top: 50%;
      right: 8px;
      transform: translateY(-50%);
      color: #3b82f6;
      font-size: 16px;
      font-weight: bold;
      z-index: 15;
      animation: scrollHint 2s ease-in-out infinite;
    }

    /* Force scrollbar visibility on mobile */
    .specs-table-scroll {
      scrollbar-width: auto !important;
      -webkit-overflow-scrolling: touch;
      overflow-x: scroll !important;
      padding-bottom: 20px;
    }

    .specs-table-scroll::-webkit-scrollbar {
      height: 18px !important;
      background: #f1f5f9;
      border-radius: 9px;
    }

    .specs-table-scroll::-webkit-scrollbar-thumb {
      background: linear-gradient(90deg, #3b82f6, #1e40af) !important;
      border-radius: 9px;
      border: 3px solid #f1f5f9;
      min-width: 60px;
    }

    .specs-table-scroll::-webkit-scrollbar-track {
      background: #e2e8f0;
      border-radius: 9px;
      margin: 0 10px;
    }
  }

  @keyframes scrollHint {
    0%, 100% { opacity: 0.7; transform: translateY(-50%) translateX(0); }
    50% { opacity: 1; transform: translateY(-50%) translateX(3px); }
  }
`;

const ProductSpecification = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [hoveredModel, setHoveredModel] = useState(null);

  // Add custom styles to document head for mobile scrolling
  useEffect(() => {
    const styleElement = document.createElement('style');
    styleElement.textContent = customStyles;
    document.head.appendChild(styleElement);

    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'benefits', label: 'Benefits' }
  ];

  const featuresList = [
    { title: 'Wide input voltage range (115 - 280 VAC)', desc: 'Protects against unstable input' },
    { title: 'DSP technology for flexible operation', desc: '' },
    { title: 'Scalable footprint design', desc: '' },
    { title: 'Complete tool-free maintenance with zero function downtime for easy access on site during', desc: '' },
    { title: 'Frequency range (40 - 70 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Battery connectivity', desc: '' },
    { title: 'Modular configurable control', desc: '' },
    { title: 'Parallel capability & high-tier load capacity', desc: '' },
    { title: 'Online Double conversion with Advanced dual-core DSP control technology', desc: 'Full Digital control for highest performance' },
    { title: 'Self protecting with 3 level design', desc: '' },
    { title: 'Advanced Battery Management', desc: 'Automatic battery test including deep discharge protection' },
    { title: 'Software compatibility with connectivity', desc: '' },
    { title: 'CSA/special protection requirements with temperature compensation', desc: '' },
    { title: 'Complete solutions for unmatched application', desc: '' },
    { title: 'Transformerless Design', desc: '' },
    { title: 'Advanced Power Factor Correction (> 0.99) for PF', desc: '' },
    { title: 'Low Technical Load', desc: '' },
    { title: 'Compact internal layout', desc: '' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Single, extended Battery Set', desc: '' },
    { title: 'Current Generator Overload due to starting inrush currents', desc: '' },
    { title: 'Advanced backfeed protection options', desc: '' },
    { title: 'On-line double Conversion & full Digital Frequency Converter', desc: 'Complete emergency coverage mode. Output stable frequency irrespective of input (220V / 230V / 240V)' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes access diverse' },
    { title: 'Power protection concept (with regenerating capability for critical loads)', desc: 'Including wide power sensor under varying load conditions with adjustable response' },
    { title: 'Output frequency freely selectable', desc: 'For sensitive loads and industrial equipment' },
    { title: 'Built-in DC fuses', desc: 'Advance Battery based analyzer function' },
    { title: 'Built-in internal battery life extender and capacity for redundancy & load stability', desc: '' },
    { title: 'Short circuit limitation', desc: '' },
    { title: 'Enhanced bypass fix', desc: '' },
    { title: 'Protection against Short-Circuit, Overload, Over temperature, Surge protection, Voltage, Var control & Output for Safety', desc: '' },
    { title: 'Low Operating Cost', desc: 'High Efficiency - Upto 95% in offline mode, 93% in online mode' },
    { title: 'Reduction in carbon footprint', desc: 'Smaller sizes than legacy systems' },
    { title: 'Maximum utilization of UPS capacity', desc: '' },
    { title: 'Better efficiency related to lower heat, saving up to 40%', desc: '' },
    { title: 'Convenient floor space', desc: '' }
  ];

  const benefitsList = [
    {
      title: 'High Uptime / Availability',
      desc: 'Ensures your critical systems remain operational with minimal to zero interruption, delivering maximum operational continuity.'
    },
    {
      title: 'High Flexibility',
      desc: 'Adapts to various configurations and settings, supporting a wide range of devices and operational environments.'
    },
    {
      title: 'High Reliability',
      desc: 'Engineered with premium components and advanced protection systems to ensure consistent and dependable performance.'
    },
    {
      title: 'Low Total Cost of Ownership (TCO)',
      desc: 'Combines energy efficiency, extended lifespan, and reduced maintenance requirements to minimize long-term costs.'
    }
  ];

  const specifications = [
    { category: 'MODEL', model1: 'EH 11 - 6K', model2: 'EH 11 - 10K' },
    { category: 'Rated Capacity', model1: '6 kVA / 6 kW', model2: '10 kVA / 10 kW' },
    { category: 'INPUT', model1: '', model2: '' },
    { category: 'Phase', model1: 'Single phase (single-wire)', model2: 'Single phase (single-wire)' },
    { category: 'Rated Voltage', model1: '220 / 230 / 240 VAC', model2: '220 / 230 / 240 VAC' },
    { category: 'Voltage Range', model1: '115 ~ 175 VAC (linear de-rating between 50% to 100% load); 175 ~ 280 VAC (no de-rating)', model2: '115 ~ 175 VAC (linear de-rating between 50% to 100% load); 175 ~ 280 VAC (no de-rating)' },
    { category: 'Rated Frequency', model1: '50 / 60 Hz (auto-sensing)', model2: '50 / 60 Hz (auto-sensing)' },
    { category: 'Frequency Range', model1: '40 ~ 70 Hz', model2: '40 ~ 70 Hz' },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99' },
    { category: 'Bypass Voltage Range', model1: '-40% ~ +15% (adjustable)', model2: '-40% ~ +15% (adjustable)' },
    { category: 'Current Harmonic Distortion (THDi)', model1: '< 3%', model2: '< 3%' },
    { category: 'OUTPUT', model1: '', model2: '' },
    { category: 'Output Wiring', model1: 'Single phase (three-wire) (1Ph + N + PE)', model2: 'Single phase (three-wire) (1Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '220 / 230 / 240 VAC (configurable via LCD)', model2: '220 / 230 / 240 VAC (configurable via LCD)' },
    { category: 'Voltage Regulation', model1: '±1%', model2: '±1%' },
    { category: 'Frequency', model1: 'Synchronized with bypass in mains mode; 50/60 Hz ±0.1% in battery mode', model2: 'Synchronized with bypass in mains mode; 50/60 Hz ±0.1% in battery mode' },
    { category: 'Waveform', model1: 'Sinusoidal', model2: 'Sinusoidal' },
    { category: 'Power Factor', model1: '1', model2: '1' },
    { category: 'Total Harmonic Distortion (THDv)', model1: '< 1% (linear load), < 5% (non-linear load)', model2: '< 1% (linear load), < 5% (non-linear load)' },
    { category: 'Crest Factor', model1: '3:1', model2: '3:1' },
    { category: 'Overload', model1: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model2: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec' },
    { category: 'BATTERIES', model1: '', model2: '' },
    { category: 'DC Voltage', model1: '192 VDC (16x 12V sealed)', model2: '240 VDC (20x 12V sealed)' },
    { category: 'No. of Batteries', model1: '16 pcs (12V)', model2: '20 pcs (12V)' },
    { category: 'Charging Current', model1: '1A (adjustable)', model2: '1A (adjustable)' },
    { category: 'Recharge Time', model1: '8 hrs (depends on capacity of battery)', model2: '8 hrs (depends on capacity of battery)' },
    { category: 'DISPLAY', model1: '', model2: '' },
    { category: 'LCD Function', model1: 'Load level, Battery level, Input voltage, Output voltage, Operation mode', model2: 'Load level, Battery level, Input voltage, Output voltage, Operation mode' },
    { category: 'Protection', model1: 'Short circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage & Fan failure', model2: 'Short circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage & Fan failure' },
    { category: 'Max. no. of Parallel Connections', model1: 'RS-232 (standard) + Dry / AS400 / dry contact / SNMP / battery temperature compensation (optional)', model2: 'RS-232 (standard) + Dry / AS400 / dry contact / SNMP / battery temperature compensation (optional)' },
    { category: 'Communications', model1: 'LED / LCD', model2: 'LED / LCD' },
    { category: 'Display', model1: 'LED / LCD', model2: 'LED / LCD' },
    { category: 'OTHERS', model1: '', model2: '' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)' },
    { category: 'Relative Humidity', model1: '0% ~ 95% (non-condensing)', model2: '0% ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000 m, derating 1% for each additional 100 m', model2: '< 1000 m, derating 1% for each additional 100 m' },
    { category: 'IP rating', model1: 'IP 20', model2: 'IP 20' },
    { category: 'Noise level at 1 m', model1: '< 55 dB', model2: '< 58 dB' },
    { category: 'Dimensions (W × D × H) (mm)', model1: '190 × 468 × 720', model2: '231 × 640 × 750' },
    { category: 'Net Weight (kg)', model1: '53', model2: '83' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {featuresList.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-1.5 sm:p-2 rounded-full">
                    <Check size={16} className="text-blue-600 sm:hidden" />
                    <Check size={18} className="text-blue-600 hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="font-bold text-responsive-base text-blue-600 mb-1 sm:mb-2">{feature.title}</h4>
                    {feature.desc && <p className="text-responsive-sm text-blue-600">{feature.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'advantages':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {advantagesList.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white p-3 sm:p-4 md:p-5 rounded-xl border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-600 to-blue-400"></div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-1.5 sm:p-2 rounded-full">
                    <ArrowUpRight size={16} className="text-blue-600 sm:hidden" />
                    <ArrowUpRight size={18} className="text-blue-600 hidden sm:block" />
                  </div>
                  <div>
                    <h4 className="font-bold text-responsive-base text-blue-600 mb-1 sm:mb-2">{advantage.title}</h4>
                    {advantage.desc && <p className="text-responsive-sm text-blue-600">{advantage.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'benefits':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-5">
            {benefitsList.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-4 sm:p-5 md:p-6 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -3,
                  boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1)"
                }}
              >
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-2 sm:mb-3">
                    <div className="text-blue-600 bg-blue-50 p-2 sm:p-2.5 md:p-3 rounded-full">
                      <Award size={18} className="text-blue-600 sm:hidden" />
                      <Award size={20} className="text-blue-600 hidden sm:block md:hidden" />
                      <Award size={24} className="text-blue-600 hidden md:block" />
                    </div>
                    <h3 className="font-bold text-responsive-lg text-blue-600">{benefit.title}</h3>
                  </div>

                  <p className="text-responsive-sm pl-8 sm:pl-10 md:pl-12 text-blue-600">{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";



  const ProductSpecContent = () => (
    <div className="w-full mx-auto relative" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Hero Section with Image on Left and Content on Right */}
      <section className="py-2 sm:py-3 md:py-4 relative overflow-hidden">
        {/* Background decorative elements - responsive */}
        <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 md:w-64 h-24 sm:h-32 md:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 sm:w-40 md:w-80 h-32 sm:h-40 md:h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

        <div className="relative z-10 px-2 sm:px-3 md:px-4 max-w-7xl mx-auto">
          <motion.div
            className="text-blue-800 p-2 sm:p-3 md:p-4 overflow-hidden relative mb-2 sm:mb-3 md:mb-4 text-center"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10 max-w-4xl mx-auto px-1 sm:px-2">
              <motion.h1
                className="text-responsive-2xl font-extrabold tracking-tight mb-1 sm:mb-2 md:mb-3 text-blue-800 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                KRYKARD EH 11 SERIES <span className="text-blue-600 block sm:inline">1/1 UPS</span>
              </motion.h1>

              <motion.p
                className="text-responsive-base font-medium mb-1 sm:mb-2 md:mb-3 text-black mx-auto max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                6 kVA & 10 kVA - Robust backup solutions with compact footprint
              </motion.p>

              <motion.div
                className="bg-gradient-to-r from-blue-50 to-blue-100 text-black font-bold py-2 px-3 sm:py-2.5 sm:px-4 md:py-3 md:px-6 rounded-full inline-block shadow-sm transform hover:scale-105 transition-transform duration-300 border border-blue-200 text-responsive-sm text-center max-w-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                <span className="block sm:inline">SMALLER FOOTPRINT WITH</span>
                <span className="block sm:inline sm:ml-1">ROBUST BACKUP SOLUTIONS</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Content Area - Image left, Content right (Mobile: stacked) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 lg:gap-8 items-center justify-center mb-2 sm:mb-3 md:mb-4 min-h-0">
            {/* UPS Image - Left side on desktop, first on mobile */}
            <motion.div
              className="relative flex justify-center items-center order-1 h-full min-h-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              {/* Product image with simple up-down animation */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[300px]"
                style={{ background: 'none', borderRadius: 0, boxShadow: 'none' }}
              >
                <img
                  src="/UPS/SB4_-_2-removebg-preview.png"
                  alt="EH 11 Series UPS Units"
                  className="w-full h-auto object-contain"
                  style={{ background: 'none', borderRadius: 0, boxShadow: 'none' }}
                />
              </motion.div>
            </motion.div>

            {/* Content - Right side on desktop, second on mobile */}
            <motion.div
              className="order-2 px-1 sm:px-2 lg:px-0"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-responsive-lg font-bold text-blue-900 mb-0.5 sm:mb-1 leading-tight">
                  Enterprise-Grade Power Protection
                </h2>
                <div className="h-1 w-8 sm:w-10 md:w-12 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-1 sm:mb-2"></div>
                <p className="text-responsive-xs text-black leading-relaxed">
                  The KRYKARD EH 11 Series UPS delivers reliable power protection for your mission-critical equipment with its double conversion technology, ensuring continuous operation during power disturbances with advanced technology and robust engineering.
                </p>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-1 sm:gap-2 mt-2 sm:mt-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="/contact/sales"
                  className="touch-target border-2 border-blue-600 font-bold text-black hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-1 text-responsive-xs min-h-[32px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Request Quote</span>
                  <ArrowRight size={20} className="flex-shrink-0" />
                </motion.a>

                <motion.button
                  className="touch-target border-2 border-blue-600 font-bold text-black hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700 px-3 py-2 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-1 text-responsive-xs min-h-[32px]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(pdfUrl, "_blank")}
                >
                  <FileText size={20} className="flex-shrink-0" />
                  <span>View Brochure</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section - Mobile-optimized design */}
      <div className="mb-12 sm:mb-16 md:mb-20 relative">
        {/* Background decorative elements - responsive */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <motion.div
          className="text-center mb-6 sm:mb-8 md:mb-10 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-xl font-bold text-blue-900 mb-2 sm:mb-3 inline-block relative">
              Key Features
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          <motion.p
            className="mt-3 sm:mt-4 text-responsive-base max-w-2xl mx-auto font-medium text-black px-3 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Core capabilities that define our UPS solutions
          </motion.p>
        </motion.div>

        {/* Enhanced Feature Cards - Mobile-first grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10 px-3 sm:px-4">
          {[
            {
              icon: <Zap size={24} className="sm:w-7 sm:h-7" />,
              title: "Double Conversion",
              description: "Pure sine wave output with zero transfer time ensures complete protection for critical equipment"
            },
            {
              icon: <Shield size={24} className="sm:w-7 sm:h-7" />,
              title: "ECO Mode Efficiency",
              description: "Energy-saving mode reduces operational costs while maintaining essential protection"
            },
            {
              icon: <Clock size={24} className="sm:w-7 sm:h-7" />,
              title: "Continuous Protection",
              description: "Reliable power protection that safeguards your equipment around the clock"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 sm:p-6 border border-blue-100 group relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient accent line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600"></div>

              {/* Background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="relative z-10">
                {/* Icon and Title beside each other */}
                <div className="flex items-center gap-3 mb-2 sm:mb-3">
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white shadow-md"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-responsive-base font-bold text-blue-900 leading-tight">
                    {feature.title}
                  </h3>
                </div>
                {/* Description */}
                <p className="text-responsive-sm text-black leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modern Tabs Section with Enhanced Blue Background Design */}
      <section className="max-w-7xl mx-auto px-4 mb-12 relative">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-xl font-bold text-blue-900 mb-2 sm:mb-3 inline-block relative">
              Product Information
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
        </motion.div>

        {/* Modern Glassmorphism Tab Buttons */}
        <div className="flex flex-wrap justify-center mb-6 sm:mb-8 relative z-10">
          <motion.div
            className="inline-flex flex-wrap justify-center gap-2 bg-white p-2 rounded-xl shadow-lg border border-blue-200 mb-4 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >

            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                className={`touch-target relative py-3 sm:py-4 px-4 sm:px-6 md:px-8 font-medium text-responsive-base transition-all duration-300 rounded-xl z-10 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                    : 'hover:bg-blue-50 text-black'
                }`}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.4)"
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 200
                }}
              >
                {/* Icon indicators for each tab */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {tab.id === 'features' && (
                    <Check size={16} className={`${activeTab === tab.id ? "text-white" : "text-blue-600"} sm:hidden`} />
                  )}
                  {tab.id === 'advantages' && (
                    <ArrowUpRight size={16} className={`${activeTab === tab.id ? "text-white" : "text-blue-600"} sm:hidden`} />
                  )}
                  {tab.id === 'benefits' && (
                    <Award size={16} className={`${activeTab === tab.id ? "text-white" : "text-blue-600"} sm:hidden`} />
                  )}
                  <span className={activeTab === tab.id ? 'text-white' : 'text-black'}>{tab.label}</span>
                </div>

                {/* Active indicator dot */}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    layoutId="activeTabIndicator"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Enhanced Tab Content Container */}
        <motion.div
          className="p-4 sm:p-6 md:p-8 bg-white rounded-2xl shadow-lg border border-blue-200 overflow-hidden relative"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Content with page transition */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{
              duration: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="relative z-10"
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </section>

      {/* Enhanced Specifications Table Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12 relative">
        <motion.div
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-responsive-xl font-bold text-blue-900 mb-2 sm:mb-3 inline-block relative">
              Technical Specifications
              <motion.div
                className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          <motion.p
            className="mt-3 sm:mt-4 text-responsive-base max-w-2xl mx-auto font-medium text-black px-3 sm:px-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Comprehensive technical details for the EH 11 Series UPS line
          </motion.p>
        </motion.div>

        {/* Professional Model Selection Tabs */}
        <motion.div
          className="relative z-10 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center flex-wrap">
            <div className="inline-flex flex-wrap justify-center gap-2 bg-white p-1.5 rounded-xl shadow-lg border border-blue-200 mb-4">
              {['All Models', 'EH 11 - 6K', 'EH 11 - 10K'].map((model, index) => {
                const modelKey = index === 0 ? null : `model${index}`;
                const isActive = hoveredModel === modelKey || (index === 0 && hoveredModel === null);

                return (
                  <motion.button
                    key={index}
                    className={`touch-target relative py-3 sm:py-4 px-4 sm:px-6 font-medium text-responsive-base rounded-lg transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                        : 'hover:bg-blue-50 text-black'
                    }`}
                    onClick={() => setHoveredModel(index === 0 ? null : `model${index}`)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-1 sm:gap-2">
                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                        >
                          <Check size={14} className="text-white sm:hidden" />
                          <Check size={16} className="text-white hidden sm:block" />
                        </motion.div>
                      )}
                      <span className={isActive ? 'text-white' : 'text-black'}>{model}</span>
                    </div>

                    {/* Active indicator line */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                        layoutId="activeModelIndicator"
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Enhanced Interactive Table with Professional Design - Same as ELB Mobile Design */}
        <motion.div
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          {/* Table header decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500"></div>
          <div className="absolute top-0 left-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-br-2xl sm:rounded-br-3xl"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 sm:w-16 sm:h-16 bg-blue-50 rounded-tl-2xl sm:rounded-tl-3xl"></div>

          {/* Specifications Table - Same Design as Web View with Mobile Optimization */}
          <div className="w-full">
            <div className="text-sm mb-4 p-4 md:hidden bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg text-center font-medium border border-blue-200" style={{ color: '#000000' }}>
              <span style={{ color: '#000000' }}>📱 Swipe horizontally to view all model specifications →</span>
            </div>
            <div className="specs-table-container">
              <div className="specs-table-scroll overflow-x-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-blue-100">
                <table className="specs-table">
                  <thead>
                    <tr className="bg-gradient-to-r from-blue-800 to-blue-900">
                      <th className="sticky-header-mobile py-3 px-3 text-left" style={{ minWidth: '140px' }}>
                        <div className="font-bold text-white text-xs">SPECIFICATIONS</div>
                      </th>
                      {specifications[0].model1 && (
                        <th className={`py-3 px-2 text-center ${hoveredModel === 'model1' || hoveredModel === null ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`} style={{ minWidth: '90px' }}>
                          <div className="font-bold text-white text-xs relative">
                            {specifications[0].model1}
                            {(hoveredModel === 'model1' || hoveredModel === null) && (
                              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white" />
                            )}
                          </div>
                        </th>
                      )}
                      {specifications[0].model2 && (
                        <th className={`py-3 px-2 text-center ${hoveredModel === 'model2' || hoveredModel === null ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`} style={{ minWidth: '90px' }}>
                          <div className="font-bold text-white text-xs relative">
                            {specifications[0].model2}
                            {(hoveredModel === 'model2' || hoveredModel === null) && (
                              <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white" />
                            )}
                          </div>
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.slice(1).map((spec, index) => {
                      const isHeader = spec.category.includes('INPUT') ||
                                       spec.category.includes('OUTPUT') ||
                                       spec.category.includes('BATTERY') ||
                                       spec.category.includes('DISPLAY') ||
                                       spec.category.includes('OTHERS');

                      return (
                        <tr
                          key={index}
                          className={`border-b ${isHeader ? 'border-blue-200' : 'border-gray-100'} hover:bg-blue-50/30 transition-colors duration-200`}
                        >
                          <td className={`sticky-cell-mobile py-2 px-3 ${
                            isHeader
                              ? 'bg-gradient-to-r from-blue-100 to-blue-50'
                              : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}>
                            <div className={`${
                              isHeader
                                ? 'font-bold text-xs sm:text-sm md:text-base'
                                : 'font-medium text-xs sm:text-sm md:text-base'
                            } ${isHeader ? 'pl-0' : 'pl-2 sm:pl-3 md:pl-4'}`}
                            style={{ color: '#000000' }}>
                              {isHeader ? (
                                <div className="flex items-center">
                                  <div className="w-1 sm:w-1.5 md:w-2 h-6 sm:h-7 md:h-8 bg-blue-600 rounded-r-md mr-2 sm:mr-3"></div>
                                  <span className="uppercase tracking-wide text-xs sm:text-sm" style={{ color: '#000000' }}>{spec.category}</span>
                                </div>
                              ) : spec.category}
                            </div>
                          </td>
                          {spec.model1 !== undefined && (
                            <td className={`py-2 px-3 font-medium text-xs sm:text-sm md:text-base ${
                              hoveredModel === 'model1' || hoveredModel === null ? 'bg-blue-50/50' : 'bg-white'
                            } ${index % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                            style={{ color: '#000000' }}>
                              <div className="text-center">{spec.model1}</div>
                            </td>
                          )}
                          {spec.model2 !== undefined && (
                            <td className={`py-2 px-3 font-medium text-xs sm:text-sm md:text-base ${
                              hoveredModel === 'model2' || hoveredModel === null ? 'bg-blue-50/50' : 'bg-white'
                            } ${index % 2 === 0 ? '' : 'bg-gray-50/50'}`}
                            style={{ color: '#000000' }}>
                              <div className="text-center">{spec.model2}</div>
                            </td>
                          )}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Features Highlight Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12 relative">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>Key Highlights</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
            Standout features that make the EH 11 Series exceptional
          </p>
        </motion.div>

        {/* Enhanced Feature Cards with 3D effects */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 relative z-10">
          {[
            {
              icon: <Zap size={28} />,
              value: "Unity",
              suffix: "",
              title: "Power Factor",
              description: "1.0 power factor ensures that the kVA rating equals the kW rating, maximizing the efficiency of your power protection investment",
              color: "from-blue-500 to-blue-600",
              bgGlow: "from-blue-400/20 via-blue-500/10 to-transparent"
            },
            {
              icon: <Shield size={28} />,
              value: "115-280",
              suffix: "VAC",
              title: "Input Voltage Range",
              description: "Operates in environments with unstable power conditions without switching to battery mode, extending battery life",
              color: "from-green-500 to-blue-500",
              bgGlow: "from-green-400/20 via-blue-500/10 to-transparent"
            },
            {
              icon: <Clock size={28} />,
              value: "Compact",
              suffix: "",
              title: "Form Factor",
              description: "Smaller footprint than traditional tower UPS systems of similar capacity, ideal for space-constrained environments",
              color: "from-blue-600 to-indigo-600",
              bgGlow: "from-blue-500/20 via-indigo-500/10 to-transparent"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-2xl shadow-xl relative overflow-hidden group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, margin: "-100px" }}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
            >
              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>

              {/* Background glow effect */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}></div>

              {/* Content */}
              <div className="p-4 sm:p-6 md:p-8 relative z-10">
                {/* Icon with gradient background */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-3 sm:mb-4 md:mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  {React.cloneElement(feature.icon, {
                    size: typeof window !== 'undefined' && window.innerWidth < 640 ? 18 :
                           typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 24
                  })}
                </div>

                {/* Feature title */}
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-blue-600 mb-1 sm:mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h3>

                {/* Feature value with animated counting effect */}
                {feature.value && (
                  <motion.div
                    className="mb-2 sm:mb-3 md:mb-4"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="flex items-center">
                      <motion.span
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
                        viewport={{ once: true }}
                        style={{ color: '#000000' }}
                      >
                        {feature.value}
                      </motion.span>
                      <motion.span
                        className="text-lg sm:text-xl md:text-2xl font-bold ml-1"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.7 + index * 0.2 }}
                        viewport={{ once: true }}
                        style={{ color: '#000000' }}
                      >
                        {feature.suffix}
                      </motion.span>
                    </div>
                  </motion.div>
                )}

                {/* Feature description */}
                <p className="text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>Advanced Battery Management</h3>
            <p className="mb-4" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
              The sophisticated battery management system performs automatic tests and deep discharge protection, extending battery life while ensuring optimal backup performance when needed most.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
                <div className="font-bold" style={{ color: '#000000' }}>Battery Configuration</div>
                <div style={{ color: '#000000' }}>EH 11 - 6K: 192 VDC (16x 12V)</div>
                <div style={{ color: '#000000' }}>EH 11 - 10K: 240 VDC (20x 12V)</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>Dimensions & Form Factor</h3>
            <p className="mb-4" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
              The EH 11 Series offers a smaller footprint than traditional tower UPS systems of similar capacity, making it ideal for environments where space is at a premium while still providing robust power protection.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
                <div className="font-bold" style={{ color: '#000000' }}>Dimensions (W×D×H)</div>
                <div style={{ color: '#000000' }}>EH 11 - 6K: 190 × 468 × 720 mm</div>
                <div style={{ color: '#000000' }}>EH 11 - 10K: 231 × 640 × 750 mm</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-3 inline-block relative" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Ideal Applications
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}
          >
            Perfect solutions for these critical environments
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🏢", text: "Financial Services" },
            { icon: "🏥", text: "Medical Facilities" },
            { icon: "💻", text: "Network Infrastructure" },
            { icon: "🏭", text: "Industrial Control" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-blue-50 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-100/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -3 }}
            >
              <div className="text-2xl mb-3 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center bg-white rounded-full mx-auto">
                {item.icon}
              </div>
              <p className="font-medium text-center" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>{item.text}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>Financial Services</h3>
            <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
              Protects critical financial systems like ATMs, trading workstations, and branch office servers with reliable backup power.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>Medical Facilities</h3>
            <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
              Provides reliable power for diagnostic equipment, administration systems, and clinical workstations in healthcare environments.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-blue-600 mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>Network Infrastructure</h3>
            <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
              Ensures continuous operation of servers, switches, routers, and network attached storage devices with clean, reliable power during outages.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modern EH 11 Series Comparison */}
      <section className="max-w-7xl mx-auto px-4 mb-12 relative">
        <motion.div
          className="text-center mb-8 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-blue-600 mb-3 inline-block relative" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Why Choose EH 11 Series
              <motion.div
                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
                initial={{ scaleX: 0, opacity: 0 }}
                whileInView={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              />
            </h2>
          </motion.div>
          <motion.p
            className="mt-4 text-lg max-w-2xl mx-auto font-medium"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            viewport={{ once: true }}
            style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}
          >
            Compelling reasons to select our premium UPS solution
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {/* Technical Advantages Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            initial={{ opacity: 0, x: -50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -3 }}
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-5 relative overflow-hidden">
              <div className="flex items-center relative z-10">
                <motion.div
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg mr-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <Shield className="h-7 w-7 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Open Sans, sans-serif' }}>Technical Advantages</h3>
                  <p className="text-blue-100" style={{ fontFamily: 'Open Sans, sans-serif' }}>Superior engineering features</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "Unity power factor (1.0) provides full rated power capacity",
                  "Advanced DSP technology enables flexible operation and superior control",
                  "Wide input voltage range (115-280 VAC) handles unstable power conditions",
                  "Tool-free maintenance simplifies service and reduces downtime",
                  "Three-level design with self-protection improves reliability"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Check size={12} />
                    </motion.div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Business Benefits Card */}
          <motion.div
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
            initial={{ opacity: 0, x: 50, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3
            }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -3 }}
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-5 relative overflow-hidden">
              <div className="flex items-center relative z-10">
                <motion.div
                  className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg mr-4"
                  whileHover={{ rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  <BarChart3 className="h-7 w-7 text-blue-600" />
                </motion.div>
                <div>
                  <h3 className="text-xl font-bold text-white" style={{ fontFamily: 'Open Sans, sans-serif' }}>Business Benefits</h3>
                  <p className="text-blue-100" style={{ fontFamily: 'Open Sans, sans-serif' }}>Operational advantages</p>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="p-5">
              <ul className="space-y-3">
                {[
                  "Smaller footprint saves valuable floor space in crowded IT environments",
                  "Lower total cost of ownership through high efficiency operation (up to 95%)",
                  "Reduced energy consumption and heat output saves on cooling costs",
                  "Scalable design allows for future expansion as power needs grow",
                  "Advanced protection features safeguard critical equipment investments"
                ].map((feature, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    viewport={{ once: true }}
                  >
                    <motion.div
                      className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <Check size={12} />
                    </motion.div>
                    <span style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Installation and Setup */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-600 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>Easy Installation and Setup</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg max-w-2xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
            Simple steps to get your UPS up and running quickly
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl py-8 px-6">
          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white mb-4 font-bold text-lg shadow-md">1</div>
              <h3 className="text-lg font-bold text-blue-600 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>Placement</h3>
              <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
                Install in a clean, stable environment with adequate ventilation, at least 20cm from walls or other equipment.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white mb-4 font-bold text-lg shadow-md">2</div>
              <h3 className="text-lg font-bold text-blue-600 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>Connection</h3>
              <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
                Connect input power and equipment loads using appropriate gauge cables, ensuring proper grounding for safety.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ y: -3, boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.1)" }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center text-white mb-4 font-bold text-lg shadow-md">3</div>
              <h3 className="text-lg font-bold text-blue-600 mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>Configuration</h3>
              <p style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}>
                Use the LCD display to set voltage, frequency, and operation mode preferences for your specific power environment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Need More Information Section */}
      <section className="max-w-7xl mx-auto px-4 mb-12">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-blue-50 rounded-xl p-8 text-center shadow-sm overflow-hidden">
            <div className="relative z-10">
              <motion.h2
                className="text-3xl font-bold mb-4 text-blue-600"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
              >
                Need More Information?
              </motion.h2>

              <motion.p
                className="text-lg mb-6 max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
                style={{ fontFamily: 'Open Sans, sans-serif', color: '#000000' }}
              >
                Our team of experts is ready to help you with product specifications, custom solutions, pricing, and
                any other details you need about the KRYKARD UPS systems.
              </motion.p>

              <motion.div
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="/contact/sales"
                  className="bg-blue-600 text-white hover:bg-blue-700 shadow-md transition-all duration-300 text-base px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span style={{ color: 'white' }}>Contact Our Experts</span>
                </motion.a>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );

  // Return PageLayout component with the product specification content inside
  return (
    <PageLayout
      title="KRYKARD EH 11 Series UPS"
      subtitle="Smaller footprint with robust backup solutions"
      category="protect"
      image="/background_images/ups_layout.png"
    >
      {/* Add responsive CSS classes and blue grid pattern effects */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Responsive text sizing classes */
          .text-responsive-xs { font-size: 0.75rem; }
          .text-responsive-sm { font-size: 0.875rem; }
          .text-responsive-base { font-size: 1rem; }
          .text-responsive-lg { font-size: 1.125rem; }
          .text-responsive-xl { font-size: 1.25rem; }
          .text-responsive-2xl { font-size: 1.5rem; }

          @media (min-width: 640px) {
            .text-responsive-xs { font-size: 0.875rem; }
            .text-responsive-sm { font-size: 1rem; }
            .text-responsive-base { font-size: 1.125rem; }
            .text-responsive-lg { font-size: 1.25rem; }
            .text-responsive-xl { font-size: 1.5rem; }
            .text-responsive-2xl { font-size: 1.875rem; }
          }

          @media (min-width: 768px) {
            .text-responsive-xs { font-size: 1rem; }
            .text-responsive-sm { font-size: 1.125rem; }
            .text-responsive-base { font-size: 1.25rem; }
            .text-responsive-lg { font-size: 1.5rem; }
            .text-responsive-xl { font-size: 1.875rem; }
            .text-responsive-2xl { font-size: 2.25rem; }
          }

          @media (min-width: 1024px) {
            .text-responsive-xs { font-size: 1.125rem; }
            .text-responsive-sm { font-size: 1.25rem; }
            .text-responsive-base { font-size: 1.5rem; }
            .text-responsive-lg { font-size: 1.875rem; }
            .text-responsive-xl { font-size: 2.25rem; }
            .text-responsive-2xl { font-size: 3rem; }
          }

          /* Responsive spacing classes */
          .spacing-responsive-sm { margin-bottom: 1rem; }
          .spacing-responsive-md { margin-bottom: 1.5rem; }
          .spacing-responsive-lg { margin-bottom: 2rem; }

          @media (min-width: 640px) {
            .spacing-responsive-sm { margin-bottom: 1.5rem; }
            .spacing-responsive-md { margin-bottom: 2rem; }
            .spacing-responsive-lg { margin-bottom: 2.5rem; }
          }

          @media (min-width: 768px) {
            .spacing-responsive-sm { margin-bottom: 2rem; }
            .spacing-responsive-md { margin-bottom: 2.5rem; }
            .spacing-responsive-lg { margin-bottom: 3rem; }
          }

          /* Touch target for mobile */
          .touch-target {
            min-height: 44px;
            min-width: 44px;
          }

          .bg-grid-pattern {
            background-image:
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }

          .text-shadow-blue {
            text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
          }

          .shadow-blue {
            box-shadow: 0 0 30px rgba(59, 130, 246, 0.3);
          }

          .watermark {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='24' fill='rgba(59, 130, 246, 0.08)' transform='rotate(-45, 100, 100)'%3EKRYKARD%3C/text%3E%3C/svg%3E");
            background-repeat: repeat;
            background-size: 200px 200px;
            pointer-events: none;
            z-index: -1;
          }

          /* Prevent icon overlapping in mobile view */
          @media (max-width: 768px) {
            .mobile-icon-container {
              display: flex;
              align-items: center;
              gap: 12px;
              margin-bottom: 12px;
              padding: 8px 0;
            }

            .mobile-icon {
              flex-shrink: 0;
              width: 32px;
              height: 32px;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(59, 130, 246, 0.1);
              border-radius: 8px;
            }

            .mobile-text {
              flex: 1;
              min-width: 0;
              word-wrap: break-word;
              line-height: 1.4;
            }

            /* Ensure proper spacing for feature cards */
            .feature-card-mobile {
              margin-bottom: 16px;
              padding: 16px;
            }

            .feature-card-mobile .icon-wrapper {
              margin-right: 12px;
              margin-bottom: 8px;
            }
          }
        `
      }} />
      <ProductSpecContent />
    </PageLayout>
  );
};

export default ProductSpecification; 