import React, { useState, useEffect } from 'react';
import { Check, ArrowUpRight, Award, Zap, Shield, Clock, BarChart3, ArrowRight, FileText } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';

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
  const [activeTab, setActiveTab] = useState('features');
  const [hoveredModel, setHoveredModel] = useState(null);

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'benefits', label: 'Benefits' }
  ];

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
    { category: 'MODEL', model1: 'EH 31 - 10', model2: 'EH 31 - 20' },
    { category: 'Rated Capacity', model1: '10 kVA / 10 kW', model2: '20 kVA / 20 kW' },
    { category: 'INPUT', model1: '', model2: '' },
    { category: 'Phase', model1: 'Three Phase', model2: 'Three Phase' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC (three phase)', model2: '380 / 400 / 415 VAC (three phase)' },
    { category: 'Voltage Range', model1: '-40% to +20% (220~476V@100%, 120~220V@70% load)', model2: '-40% to +20% (220~476V@100%, 120~220V@70% load)' },
    { category: 'Rated Frequency', model1: '50 / 60 Hz (auto-sensing)', model2: '50 / 60 Hz (auto-sensing)' },
    { category: 'Frequency Range', model1: '45 ~ 55 Hz', model2: '45 ~ 55 Hz' },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99' },
    { category: 'Bypass Voltage Range', model1: '-40% ~ +15% (adjustable)', model2: '-40% ~ +15% (adjustable)' },
    { category: 'Current Harmonic Distortion (THDi)', model1: '< 3%', model2: '< 3%' },
    { category: 'OUTPUT', model1: '', model2: '' },
    { category: 'Phase', model1: 'Single phase', model2: 'Single phase' },
    { category: 'Output Wiring', model1: 'Single phase three wires (Ph + N + PE)', model2: 'Single phase three wires (Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '220 / 230 / 240 VAC', model2: '220 / 230 / 240 VAC' },
    { category: 'Voltage Regulation', model1: '±1%', model2: '±1%' },
    { category: 'Waveform', model1: 'Sinusoidal (THD < 3% linear or < 5% non-linear load)', model2: 'Sinusoidal (THD < 3% linear or < 5% non-linear load)' },
    { category: 'Power Factor', model1: '1.0', model2: '1.0' },
    { category: 'Voltage Harmonic Distortion (THDv)', model1: '< 1% (linear load), < 5% (non-linear load)', model2: '< 1% (linear load), < 5% (non-linear load)' },
    { category: 'Crest Factor', model1: '3:1', model2: '3:1' },
    { category: 'Overload', model1: '100% ~ 110% for 10 min, 110% ~ 130% for 1 min, >130% for 3s', model2: '100% ~ 110% for 10 min, 110% ~ 130% for 1 min, >130% for 3s' },
    { category: 'Efficiency', model1: '≥ 93%', model2: '≥ 93%' },
    { category: 'DC VOLTAGE', model1: '192 VDC (16x 12V sealed)', model2: '192 VDC (16x 12V sealed)' },
    { category: 'BATTERY', model1: '', model2: '' },
    { category: 'Charging Time (Typical)', model1: '7 hours to 90% capacity', model2: '7 hours to 90% capacity' },
    { category: 'Backup Time', model1: '8 hrs (depends on capacity of battery)', model2: '8 hrs (depends on capacity of battery)' },
    { category: 'DISPLAY', model1: 'LCD + LED, showing input/output voltage & frequency, load level, battery level & UPS status', model2: 'LCD + LED, showing input/output voltage & frequency, load level, battery level & UPS status' },
    { category: 'Protection', model1: 'Overload, Over Temp, Short circuit, Battery low voltage, Over voltage, Under voltage & Fan failure', model2: 'Overload, Over Temp, Short circuit, Battery low voltage, Over voltage, Under voltage & Fan failure' },
    { category: 'Max. no. of parallel connections', model1: '4', model2: '4' },
    { category: 'Communication', model1: 'Standard configuration: RS-232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, battery temperature sensor', model2: 'Standard configuration: RS-232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, battery temperature sensor' },
    { category: 'Alarms', model1: 'LED / LCD', model2: 'LED / LCD' },
    { category: 'Noise Level (at 1 meter)', model1: '< 55 dB', model2: '< 55 dB' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)' },
    { category: 'Relative Humidity', model1: '0 ~ 95% (non-condensing)', model2: '0 ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000m, derate 1% per 100m between 1000m-3000m', model2: '< 1000m, derate 1% per 100m between 1000m-3000m' },
    { category: 'PHYSICAL', model1: '', model2: '' },
    { category: 'Tower Model (W × D × H)', model1: '250 × 660 × 550', model2: '250 × 890 × 715' },
    { category: 'Dimensions (mm)', model1: '', model2: '' },
    { category: 'Net Weight (kg)', model1: '75', model2: '120' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'features':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
            {featuresList.map((feature, index) => {
              return (
                <motion.div
                  key={index}
                  className="group bg-white p-6 md:p-8 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: index * 0.05
                  }}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  {/* Blue accent */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

                  <div className="flex flex-col items-center text-center relative z-10 h-full">
                    <motion.div
                      className="mb-4 md:mb-6 p-3 rounded-full bg-blue-50 text-blue-600 shadow-sm"
                      whileHover={{
                        scale: 1.1,
                        transition: { type: "spring", stiffness: 400 }
                      }}
                    >
                      <Check size={22} className="text-blue-600" />
                    </motion.div>

                    <h4 className="font-bold text-lg md:text-xl text-blue-600 mb-3 md:mb-4 break-words" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h4>

                    {feature.desc && (
                      <p className="text-black text-sm md:text-base mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {feature.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        );

      case 'advantages':
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {advantagesList.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 12,
                  delay: index * 0.05
                }}
                whileHover={{
                  y: -5
                }}
              >
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 relative z-10 h-full">
                  <div className="flex-shrink-0 mt-1 mb-2 sm:mb-0">
                    <motion.div
                      className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-md"
                      whileHover={{
                        scale: 1.1
                      }}
                    >
                      <ArrowUpRight size={20} />
                    </motion.div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-bold text-lg md:text-xl text-blue-600 mb-3 md:mb-4 break-words" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.title}</h4>
                    {advantage.desc && (
                      <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {advantage.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );

      case 'benefits':
        return (
          <div>
            {/* Introduction text with proper spacing */}
            <motion.div
              className="text-center mb-10 md:mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-black text-base md:text-lg max-w-4xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                The EH 31 Series UPS delivers exceptional value through these key benefits, ensuring your critical systems remain protected and operational.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
              {benefitsList.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-xl border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[200px]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                    delay: index * 0.1
                  }}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 400, damping: 10 }
                  }}
                >
                  <div className="relative z-10 h-full flex flex-col">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-4 md:mb-6">
                      <motion.div
                        className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center bg-blue-600 text-white rounded-xl shadow-md mb-2 sm:mb-0"
                        whileHover={{
                          scale: 1.1
                        }}
                      >
                        <Award size={24} className="md:w-7 md:h-7" />
                      </motion.div>

                      <h3 className="font-bold text-xl md:text-2xl text-blue-600 break-words" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.title}</h3>
                    </div>

                    <div className="pl-0 sm:pl-0 md:pl-0 lg:pl-16 mt-auto">
                      <p className="text-black text-sm md:text-base leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        {benefit.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  // Stats for Key Features Section
  const keyStats = [
    { value: "95", suffix: "%", title: "Max Efficiency", icon: <Zap size={24} /> },
    { value: "480", suffix: "V", title: "Input Voltage Range", icon: <Shield size={24} /> },
    { value: "1.0", suffix: "", title: "Power Factor", icon: <BarChart3 size={24} /> },
    { value: "4", suffix: "", title: "Parallel Units", icon: <Clock size={24} /> }
  ];

  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

  const ProductSpecContent = () => (
    <div className="w-full mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Hero Section with Proper Spacing */}
      <section className="py-8 md:py-12 relative">
        <div className="px-4 max-w-7xl mx-auto">
          <motion.div
            className="text-center mb-10 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 text-blue-600"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              KRYKARD EH 31 SERIES <span className="text-blue-600">3/1 UPS</span>
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-black"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              10 kVA & 20 kVA - Enterprise-grade three-phase input, single-phase output
            </motion.p>

            <motion.div
              className="bg-blue-600 text-white font-semibold py-3 px-6 md:px-8 rounded-lg inline-block shadow-md hover:shadow-lg transition-shadow duration-300 text-sm md:text-base"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              UNMATCHED PERFORMANCE FOR CRITICAL POWER NEEDS
            </motion.div>
          </motion.div>

          {/* Hero Content Area with Proper Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Left side: Content with Better Spacing */}
            <motion.div
              className="space-y-6 md:space-y-8"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Enterprise-Grade Power Protection</h2>
                <div className="h-1 w-20 bg-blue-600 rounded-full mb-4 md:mb-6"></div>
                <p className="text-base md:text-lg text-black leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  The KRYKARD EH 31 Series delivers superior protection for mission-critical equipment requiring three-phase input with single-phase output.
                </p>
              </motion.div>

              <motion.div
                className="bg-gray-50 p-4 md:p-6 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ideal Applications:</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    "Industrial Control",
                    "Medical Facilities",
                    "Data Centers",
                    "Telecom Infrastructure"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-2 p-2 rounded"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.05 }}
                    >
                      <span className="text-sm md:text-base text-black font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>• {item}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="/contact/sales"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-3 rounded-lg flex items-center gap-2 transition-all duration-300 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Request Quote</span>
                  <ArrowRight size={18} />
                </motion.a>

                <motion.a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText size={18} />
                  <span>View Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>

            {/* Right side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean, simple UPS image with proper sizing */}
                <motion.img
                  src="/UPS/5-removebg-preview.png"
                  alt="EH 31 Series UPS Models"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Key Features Section with Proper Spacing */}
          <div className="mb-16 md:mb-20">

            <motion.div
              className="text-center mb-12 md:mb-16 relative z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <motion.h2
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  Key Features
                </motion.h2>
                <motion.div
                  className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-6"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  viewport={{ once: true }}
                />
              </motion.div>
              <motion.p
                className="text-base md:text-lg text-black max-w-2xl mx-auto"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                Advanced technology meets reliability in every aspect of the EH 31 Series
              </motion.p>
            </motion.div>

            {/* Professional Card Layout with Better Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {keyStats.map((stat, index) => {
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 100,
                      damping: 12,
                      delay: index * 0.1
                    }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -8,
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                  >

                    {/* Card content with proper spacing */}
                    <div className="relative bg-white rounded-xl p-6 md:p-8 h-full border border-blue-100 shadow-lg group-hover:shadow-xl transition-all duration-300 min-h-[200px] md:min-h-[240px]">
                      <div className="flex flex-col items-center text-center h-full">
                        <motion.div
                          className="mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-gradient-to-br from-blue-50 to-blue-100"
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.3 }
                          }}
                        >
                          <motion.div>
                            {React.cloneElement(stat.icon, { className: "text-blue-600", size: 24 })}
                          </motion.div>
                        </motion.div>

                        <motion.div
                          className="mb-3 md:mb-4"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{
                            duration: 0.5,
                            delay: 0.3 + index * 0.1,
                            type: "spring"
                          }}
                          viewport={{ once: true }}
                        >
                          <motion.span
                            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                          >
                            {stat.value}
                          </motion.span>
                          <motion.span
                            className="text-xl md:text-2xl font-bold text-blue-600"
                            style={{ fontFamily: 'Open Sans, sans-serif' }}
                          >
                            {stat.suffix}
                          </motion.span>
                        </motion.div>

                        <motion.h3
                          className="text-base md:text-lg font-bold text-black mb-3 break-words"
                          style={{ fontFamily: 'Open Sans, sans-serif' }}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          {stat.title}
                        </motion.h3>

                        <motion.div
                          className="h-1 bg-blue-600 mx-auto opacity-60 mt-auto"
                          initial={{ width: 0 }}
                          whileInView={{ width: 40 }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 0.6,
                            delay: 0.5 + index * 0.1
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-24">
        {/* Section Title with Better Spacing */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6 inline-block relative"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
          >
            Product Highlights
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p
            className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Explore the comprehensive features, advantages, and benefits of our EH 31 Series UPS
          </motion.p>
        </motion.div>

        {/* Tab Buttons with Better Spacing */}
        <div className="flex flex-wrap justify-center mb-10 md:mb-12 relative px-4">
          {/* Tab buttons - Mobile responsive */}
          <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg border border-gray-200 flex flex-col sm:flex-row w-full sm:w-auto max-w-md sm:max-w-none">
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                className={`relative py-3 px-6 md:px-8 font-medium text-sm md:text-base lg:text-lg transition-all duration-300 rounded-full mb-1 sm:mb-0 ${
                  activeTab === tab.id
                    ? 'text-white shadow-md'
                    : 'text-black hover:text-gray-700'
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: activeTab === tab.id ? 1 : 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full"
                    layoutId="activeTabBackground"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tab Content Container with Proper Spacing */}
        <motion.div
          className="p-8 md:p-12 bg-white rounded-2xl shadow-xl border border-blue-100 overflow-hidden relative min-h-[400px]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Tab content with animation */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </section>

      {/* Technical Specifications Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-24 relative">
        {/* Section Header with Better Spacing */}
        <motion.div
          className="text-center mb-12 md:mb-16 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6 inline-block relative"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              Technical Specifications
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                whileInView={{ width: 160, opacity: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
            </motion.h2>
          </motion.div>
          <motion.p
            className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Comprehensive technical details for the EH 31 Series UPS line
          </motion.p>
        </motion.div>

        {/* Simplified Interactive Table */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 relative z-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileHover={{ boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.1)" }}
        >
          {/* Specifications Table with Open Sans font */}
          <div className="w-full">
            <div className="text-sm text-black mb-3 p-3 md:hidden bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg text-center font-medium border border-gray-200" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              <span>📱 Swipe horizontally to view all model specifications →</span>
            </div>
            <div className="specs-table-container">
              <div className="specs-table-scroll overflow-x-auto scrollbar-thin scrollbar-thumb-black scrollbar-track-gray-100">
                <table className="specs-table">
                <thead>
                    <tr className="bg-gradient-to-r from-black to-gray-800">
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
                          className={`border-b ${isHeader ? 'border-gray-200' : 'border-gray-100'} hover:bg-gray-50/30 transition-colors duration-200`}
                        >
                          <td className={`sticky-cell-mobile py-2 px-3 ${
                            isHeader
                              ? 'bg-gradient-to-r from-gray-100 to-gray-50'
                              : index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                          }`}>
                            <div className={`${
                              isHeader
                                ? 'font-bold text-black text-xs sm:text-sm md:text-base'
                                : 'font-medium text-black text-xs sm:text-sm md:text-base'
                            } ${isHeader ? 'pl-0' : 'pl-2 sm:pl-3 md:pl-4'}`}>
                              {isHeader ? (
                                <div className="flex items-center">
                                  <div className="w-1 h-4 bg-black rounded-full mr-2"></div>
                                  <span className="text-black font-bold">{spec.category}</span>
                                </div>
                              ) : (
                                <span className="text-black">{spec.category}</span>
                              )}
                            </div>
                          </td>
                          {spec.model1 !== undefined && (
                            <td className={`py-2 px-2 text-center text-xs sm:text-sm ${
                              isHeader
                                ? 'bg-gradient-to-r from-gray-100 to-gray-50 font-bold text-black'
                                : index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-50 text-black'
                            } ${hoveredModel === 'model1' || hoveredModel === null ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`}>
                              <div className="font-medium">{spec.model1}</div>
                            </td>
                          )}
                          {spec.model2 !== undefined && (
                            <td className={`py-2 px-2 text-center text-xs sm:text-sm ${
                              isHeader
                                ? 'bg-gradient-to-r from-gray-100 to-gray-50 font-bold text-black'
                                : index % 2 === 0 ? 'bg-white text-black' : 'bg-gray-50 text-black'
                            } ${hoveredModel === 'model2' || hoveredModel === null ? 'opacity-100' : 'opacity-70'} transition-opacity duration-300`}>
                              <div className="font-medium">{spec.model2}</div>
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

          {/* Bottom accent */}
          <div className="h-1 w-full bg-blue-600"></div>
        </motion.div>


      </section>

      {/* Key Features Highlight Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Key Highlights</h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Standout features that make the EH 31 Series exceptional
          </p>
        </motion.div>

        {/* Feature Cards with Proper Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
          {[
            {
              icon: <Zap size={24} />,
              value: "Unity",
              suffix: "",
              title: "Power Factor",
              description: "1.0 power factor ensures that the kVA rating equals the kW rating, maximizing efficiency"
            },
            {
              icon: <Shield size={24} />,
              value: "120-480",
              suffix: "VAC",
              title: "Input Voltage Range",
              description: "Operates in environments with unstable three-phase power conditions without switching to battery mode"
            },
            {
              icon: <Clock size={24} />,
              value: "4",
              suffix: "",
              title: "Parallel Units",
              description: "Connect up to 4 units in parallel to increase capacity or add redundancy"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              {/* Card content with proper height */}
              <div className="relative bg-white rounded-xl p-6 md:p-8 h-full border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 min-h-[280px] md:min-h-[320px]">
                <div className="flex flex-col h-full">
                  {/* Icon */}
                  <div className="mb-4 md:mb-6 flex justify-center">
                    <div className="p-3 md:p-4 rounded-full bg-blue-50">
                      {React.cloneElement(feature.icon, { className: "text-blue-600" })}
                    </div>
                  </div>

                  {/* Title and value */}
                  <div className="mb-4 md:mb-6 text-center">
                    <div className="mb-2">
                      <span className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.value}</span>
                      <span className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.suffix}</span>
                    </div>
                    <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 break-words" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h3>
                  </div>

                  {/* Description */}
                  <p className="text-black text-sm md:text-base text-center mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <motion.div
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden min-h-[200px]"
            whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Front Access Maintenance</h3>
            <p className="text-black text-sm md:text-base mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              The EH 31 Series features a user-friendly design with front-access maintenance, making installation and service easier and faster.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between bg-blue-50 p-4 md:p-6 rounded-lg">
              <div className="text-sm md:text-base text-blue-600 mb-3 sm:mb-0" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="font-bold">Easy Maintenance</div>
                <div>Front access design</div>
                <div>Simplified service and support</div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full self-center sm:self-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden min-h-[200px]"
            whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.2)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>

            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Dimensions & Form Factor</h3>
            <p className="text-black text-sm md:text-base mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              The EH 31 Series offers a compact footprint compared to traditional UPS systems of similar capacity.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between bg-blue-50 p-4 md:p-6 rounded-lg">
              <div className="text-sm md:text-base text-blue-600 mb-3 sm:mb-0" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                <div className="font-bold">Dimensions (W×D×H)</div>
                <div>EH 31 - 10: 250 × 660 × 550 mm</div>
                <div>EH 31 - 20: 250 × 890 × 715 mm</div>
              </div>
              <div className="bg-blue-100 p-3 rounded-full self-center sm:self-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Areas with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-24">
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
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6 inline-block relative" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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
          <p className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Perfect solutions for these critical environments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {[
            { icon: "🏭", text: "Industrial Settings" },
            { icon: "🏥", text: "Medical Environments" },
            { icon: "💻", text: "Data Centers" },
            { icon: "🔌", text: "Telecom Infrastructure" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-blue-50 rounded-xl p-3 md:p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-100/50"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-2xl md:text-3xl mb-2 md:mb-3"
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
              <h3 className="font-bold text-sm md:text-base text-blue-800">{item.text}</h3>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 md:mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            className="bg-white p-5 md:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4">Industrial Settings</h3>
            <p className="text-blue-700 text-sm md:text-base">
              Provides reliable three-phase power protection for manufacturing equipment, industrial controls, and automation systems in factories and plants.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-5 md:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4">Medical Environments</h3>
            <p className="text-blue-700 text-sm md:text-base">
              Ensures continuous operation of critical medical equipment, diagnostic systems, and healthcare IT infrastructure with clean, stable power.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-5 md:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.02, y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 md:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-bold text-blue-800 mb-3 md:mb-4">Data Centers</h3>
            <p className="text-blue-700 text-sm md:text-base">
              Protects mission-critical servers, networking equipment, and storage systems where three-phase power input is available but single-phase output is needed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-20 md:mb-24">
        <motion.div
          className="text-center mb-12 md:mb-16 relative z-10"
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
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6 inline-block relative" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Why Choose EH 31 Series
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
            className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            The EH 31 Series offers a comprehensive set of features and benefits designed for mission-critical applications
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5 }}
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-4 md:p-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-blue-700/20 to-transparent"></div>

              <h3 className="text-xl md:text-2xl font-bold text-white relative z-10 flex items-center">
                <Shield className="mr-2 md:mr-3" size={20} />
                <span className="break-words">Technical Advantages</span>
              </h3>
            </div>

            {/* Features List */}
            <div className="p-4 md:p-6">
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Three-phase input with single-phase output flexibility",
                  "Wide input voltage range (120-480 VAC) handles unstable power",
                  "DSP microcontroller for superior performance and control",
                  "Unity power factor (1.0) delivers full rated power capacity",
                  "Parallel capability for up to 4 units for expanded capacity"
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
                      className="mt-1 mr-2 md:mr-3 text-blue-600 bg-blue-100 p-1 rounded-full flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={14} />
                    </motion.div>
                    <span className="text-blue-800 font-medium text-sm md:text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            whileHover={{ y: -5 }}
          >
            {/* Top gradient bar */}
            <div className="h-2 bg-gradient-to-r from-blue-600 to-blue-800"></div>

            {/* Header */}
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-4 md:p-6 relative overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white opacity-10 rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-r from-blue-800/20 to-transparent"></div>

              <h3 className="text-xl md:text-2xl font-bold text-white relative z-10 flex items-center">
                <BarChart3 className="mr-2 md:mr-3" size={20} />
                <span className="break-words">Business Benefits</span>
              </h3>
            </div>

            {/* Features List */}
            <div className="p-4 md:p-6">
              <ul className="space-y-3 md:space-y-4">
                {[
                  "Front access maintenance design reduces service time and cost",
                  "High efficiency (≥93%) lowers operational expenses",
                  "Transformerless design reduces size and installation complexity",
                  "Step load capability handles power-hungry equipment startup",
                  "Complete protection features safeguard critical investments"
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
                      className="mt-1 mr-2 md:mr-3 text-blue-600 bg-blue-100 p-1 rounded-full flex-shrink-0"
                      whileHover={{ scale: 1.2, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Check size={14} />
                    </motion.div>
                    <span className="text-blue-800 font-medium text-sm md:text-base">{feature}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>



      {/* Contact Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-16 md:mb-20">
        <motion.div
          className="bg-blue-50 rounded-xl p-8 md:p-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <motion.h2
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 md:mb-6"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Need More Information?
          </motion.h2>

          <motion.p
            className="text-black text-base md:text-lg max-w-4xl mx-auto mb-8 md:mb-10"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our team of experts is ready to help you with product specifications, custom solutions, pricing, and
            any other details you need about the KRYKARD UPS systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.a
              href="/contact/sales"
              className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-lg transition-colors duration-300 text-base md:text-lg font-medium"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Contact Our Experts</span>
            </motion.a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );

  // Return PageLayout component with the product specification content inside
  return (
    <PageLayout
      title="KRYKARD EH 31 Series UPS"
      subtitle="Unmatched performance for critical power needs"
      category="protect"
      image="/background_images/ups_layout.png"
    >
      <ProductSpecContent />
    </PageLayout>
  );
};

export default ProductSpecification;