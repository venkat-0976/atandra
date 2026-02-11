import React, { useState, useEffect } from 'react';
import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, BarChart3, ArrowRight, FileText } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';


const ProductSpecification = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [hoveredModel, setHoveredModel] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

  useEffect(() => {

    // Add mobile table CSS with Open Sans font and blue theme
    const mobileCSS = `
      <style>
        * {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .specs-table-container {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          border-radius: 8px;
          box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
        }

        .specs-table-scroll {
          min-width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .specs-table {
          width: 100%;
          min-width: 800px;
          border-collapse: collapse;
          background: white;
          font-size: 14px;
          font-family: 'Open Sans', sans-serif;
        }

        .specs-table th,
        .specs-table td {
          padding: 10px 8px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
          white-space: nowrap;
          font-family: 'Open Sans', sans-serif;
        }

        .specs-table th {
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          color: white;
          font-weight: 600;
          position: sticky;
          top: 0;
          z-index: 10;
        }

        .specs-table th:first-child {
          position: sticky;
          left: 0;
          z-index: 20;
          min-width: 200px;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        }

        .specs-table td:first-child {
          position: sticky;
          left: 0;
          background: white;
          font-weight: 600;
          z-index: 15;
          min-width: 200px;
          border-right: 2px solid #e5e7eb;
          color: #000000;
        }

        .specs-table tr:nth-child(even) {
          background-color: #f9fafb;
        }

        .specs-table tr:nth-child(even) td:first-child {
          background-color: #f9fafb;
        }

        .specs-table tr:hover {
          background-color: #f3f4f6;
        }

        .specs-table tr:hover td:first-child {
          background-color: #f3f4f6;
        }

        /* Header row styling */
        .specs-table .header-row {
          background-color: #2563eb !important;
          color: white;
          font-weight: bold;
        }

        .specs-table .header-row td {
          background-color: #2563eb !important;
          color: white;
          font-weight: bold;
          text-align: center;
          padding: 12px 8px;
        }

        .specs-table .header-row:hover {
          background-color: #2563eb !important;
        }

        .specs-table .header-row:hover td {
          background-color: #2563eb !important;
        }

        /* Mobile responsive */
        @media (max-width: 768px) {
          .specs-table {
            font-size: 12px;
            min-width: 700px;
          }

          .specs-table th,
          .specs-table td {
            padding: 8px 6px;
          }

          .specs-table th:first-child,
          .specs-table td:first-child {
            min-width: 150px;
          }
        }

        /* Sticky mobile classes */
        .sticky-header-mobile {
          position: sticky;
          top: 0;
          background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
          z-index: 10;
        }

        .sticky-cell-mobile {
          position: sticky;
          left: 0;
          background: white;
          z-index: 5;
        }

        /* Custom scrollbar with blue theme */
        .specs-table-container::-webkit-scrollbar {
          height: 8px;
        }

        .specs-table-container::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 4px;
        }

        .specs-table-container::-webkit-scrollbar-thumb {
          background: #2563eb;
          border-radius: 4px;
        }

        .specs-table-container::-webkit-scrollbar-thumb:hover {
          background: #1d4ed8;
        }

        /* Tab navigation mobile responsive */
        @media (max-width: 640px) {
          .tab-navigation {
            flex-direction: column;
            gap: 8px;
          }

          .tab-button {
            width: 100%;
            text-align: center;
            padding: 12px 16px;
            font-size: 14px;
          }
        }

        @media (max-width: 480px) {
          .tab-button {
            padding: 10px 12px;
            font-size: 13px;
          }
        }
      </style>
    `;

    // Inject CSS into document head
    const styleElement = document.createElement('div');
    styleElement.innerHTML = mobileCSS;
    document.head.appendChild(styleElement.firstElementChild);

    return () => {
      // Clean up CSS when component unmounts
      const injectedStyle = document.head.querySelector('style');
      if (injectedStyle && injectedStyle.textContent.includes('.specs-table-container')) {
        document.head.removeChild(injectedStyle);
      }
    };
  }, []);

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'benefits', label: 'Benefits' }
  ];

  const featuresList = [
    { title: 'Wide input voltage range (304 - 478 VAC)', desc: 'Protects against unstable input and extends battery life' },
    { title: 'Compact footprint', desc: 'Smallest design for single and three phase UPS' },
    { title: 'Front access maintenance', desc: 'Easier installation and service' },
    { title: 'Frequency range (45 - 55 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Dual feed capability', desc: 'Provides redundant configuration' },
    { title: 'Parallel capability', desc: 'Ideal for high-tier load applications' },
    { title: 'Online Double conversion with Advanced dual core DSP control', desc: 'Full Digital control for highest performance' },
    { title: 'Self-diagnostics', desc: 'Built-in electronic protection' },
    { title: 'Advanced battery management', desc: 'Automatic battery test including deep discharge protection' },
    { title: 'Extensive software & connectivity options', desc: 'Complete solution for advanced applications' },
    { title: 'Transformerless Design', desc: 'Optimizes the Power Factor to 0.9 or higher' },
    { title: 'Power Factor Correction (> 0.99)', desc: 'Up to PF 0.99' },
    { title: 'Low Harmonic Load', desc: '< 3% THDi' },
    { title: 'Zero Technical Load' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Current Generator Overload due to starting inrush currents', desc: 'Sensitive medical equipment' },
    { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Lower total harmonic distortion (< 3%)' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes' },
    { title: 'Power operation function', desc: 'High Efficiency/High Reliability' },
    { title: 'Including voltage sensor under voltage load', desc: 'Overvoltage protection (optional)' },
    { title: 'Automatic bypass', desc: 'Bypass for fault clearing' },
    { title: 'Built-in DC fuses', desc: 'Advance Battery monitoring in graphic display (Optional)' },
    { title: '0% to 100% step load change without transfer to Bypass', desc: 'Ideal for powerhungry for redundancy & load stability' },
    { title: 'Multifunction LCD Display', desc: 'ECO mode operation (AC-Power Quality Like Bridge)' },
    { title: 'Programmable alarm for warning', desc: 'Better protection through advance FW Control Quality Line Bridge' },
    { title: 'Low Operating Cost', desc: 'High Efficiency - Upto 95% or better' },
    { title: 'Reduction in carbon footprint', desc: 'Smaller size than legacy systems' },
    { title: 'Increase in IT floor space', desc: 'Lower cost of AC Power' },
    { title: 'Better efficiency related to lower heat, saving up to 40%', desc: 'No transformer required' },
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
    { category: 'MODEL', model1: 'EH - 10', model2: 'EH - 20', model3: 'EH - 30', model4: 'EH - 40', model5: 'EH - 60' },
    { category: 'Rated Capacity', model1: '10 kVA / 10 kW', model2: '20 kVA / 20 kW', model3: '30 kVA / 30 kW', model4: '40 kVA / 40 kW', model5: '60 kVA / 60 kW' },
    { category: 'INPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Phase', model1: 'Three Phase', model2: 'Three Phase', model3: 'Three Phase', model4: 'Three Phase', model5: 'Three Phase' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC', model2: '380 / 400 / 415 VAC', model3: '380 / 400 / 415 VAC', model4: '380 / 400 / 415 VAC', model5: '380 / 400 / 415 VAC' },
    { category: 'Voltage Range', model1: '304 ~ 478 VAC (load = 100%), 228 ~ 304 VAC (load decreases linearly with min phase voltage)', model2: '304 ~ 478 VAC (load = 100%), 228 ~ 304 VAC (load decreases linearly with min phase voltage)', model3: '304 ~ 478 VAC (load = 100%), 228 ~ 304 VAC (load decreases linearly with min phase voltage)', model4: '304 ~ 478 VAC (load = 100%), 228 ~ 304 VAC (load decreases linearly with min phase voltage)', model5: '304 ~ 478 VAC (load = 100%), 228 ~ 304 VAC (load decreases linearly with min phase voltage)' },
    { category: 'Frequency Range', model1: '40 ~ 70 Hz', model2: '40 ~ 70 Hz', model3: '40 ~ 70 Hz', model4: '40 ~ 70 Hz', model5: '40 ~ 70 Hz' },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99', model3: '≥ 0.99', model4: '≥ 0.99', model5: '≥ 0.99' },
    { category: 'Bypass Voltage Range', model1: 'Upp.limit:+10%,+15%,+20% or +25%; Low.limit:-10%,-15%,-20%,-30% or -40%', model2: 'Upp.limit:+10%,+15%,+20% or +25%; Low.limit:-10%,-15%,-20%,-30% or -40%', model3: 'Upp.limit:+10%,+15%,+20% or +25%; Low.limit:-10%,-15%,-20%,-30% or -40%', model4: 'Upp.limit:+10%,+15%,+20% or +25%; Low.limit:-10%,-15%,-20%,-30% or -40%', model5: 'Upp.limit:+10%,+15%,+20% or +25%; Low.limit:-10%,-15%,-20%,-30% or -40%' },
    { category: 'Current Harmonic Distortion (THDi)', model1: '< 3% (linear load)', model2: '< 3% (linear load)', model3: '< 3% (linear load)', model4: '< 3% (linear load)', model5: '< 3% (linear load)' },
    { category: 'OUTPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Output Wiring', model1: 'Three-phase five-wire (3Ph + N + PE)', model2: 'Three-phase five-wire (3Ph + N + PE)', model3: 'Three-phase five-wire (3Ph + N + PE)', model4: 'Three-phase five-wire (3Ph + N + PE)', model5: 'Three-phase five-wire (3Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '380/400/415 VAC', model2: '380/400/415 VAC', model3: '380/400/415 VAC', model4: '380/400/415 VAC', model5: '380/400/415 VAC' },
    { category: 'Frequency', model1: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model2: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model3: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model4: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model5: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode' },
    { category: 'Power Factor', model1: '1', model2: '1', model3: '1', model4: '1', model5: '1' },
    { category: 'Total Harmonic Distortion (THDv)', model1: '< 1% (linear load), < 5% (non-linear load)', model2: '< 1% (linear load), < 5% (non-linear load)', model3: '< 1% (linear load), < 5% (non-linear load)', model4: '< 1% (linear load), < 5% (non-linear load)', model5: '< 1% (linear load), < 5% (non-linear load)' },
    { category: 'Overload', model1: '110% for 60 min, 125% for 10 min, 150% for 1 min, >150% for 200ms', model2: '110% for 60 min, 125% for 10 min, 150% for 1 min, >150% for 200ms', model3: '110% for 60 min, 125% for 10 min, 150% for 1 min, >150% for 200ms', model4: '110% for 60 min, 125% for 10 min, 150% for 1 min, >150% for 200ms', model5: '110% for 60 min, 125% for 10 min, 150% for 1 min, >150% for 200ms' },
    { category: 'DC VOLTAGE', model1: '±240 VDC', model2: '±240 VDC', model3: '±240 VDC', model4: '±240 VDC', model5: '±240 VDC' },
    { category: 'BATTERY', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'No. of Batteries', model1: '40 (20+20) 12V', model2: '40 (20+20) 12V', model3: '40 (20+20) 12V', model4: '40 (20+20) 12V', model5: '40 (20+20) 12V' },
    { category: 'Charging Current (max)', model1: '1 A (standard)', model2: '1 A (standard)', model3: '1 A (standard)', model4: '2 A (standard)', model5: '3 A (max)' },
    { category: 'Backup Time', model1: '≥ 30 mins (depends on the capacity of battery)', model2: '≥ 30 mins (depends on the capacity of battery)', model3: '≥ 30 mins (depends on the capacity of battery)', model4: '≥ 30 mins (depends on the capacity of battery)', model5: '≥ 30 mins (depends on the capacity of battery)' },
    { category: 'DISPLAY', model1: 'Operational data: Load level, Load percentage, Battery level, Input voltage, Input frequency, Output voltage, Output frequency, Ambient temperature', model2: 'Operational data: Load level, Load percentage, Battery level, Input voltage, Input frequency, Output voltage, Output frequency, Ambient temperature', model3: 'Operational data: Load level, Load percentage, Battery level, Input voltage, Input frequency, Output voltage, Output frequency, Ambient temperature', model4: 'Operational data: Load level, Load percentage, Battery level, Input voltage, Input frequency, Output voltage, Output frequency, Ambient temperature', model5: 'Operational data: Load level, Load percentage, Battery level, Input voltage, Input frequency, Output voltage, Output frequency, Ambient temperature' },
    { category: 'Protection', model1: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model2: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model3: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model4: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model5: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure' },
    { category: 'Max. no. of parallel connections', model1: '4', model2: '4', model3: '4', model4: '4', model5: '4' },
    { category: 'Communications', model1: 'Standard configuration: RS232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, RS485 card', model2: 'Standard configuration: RS232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, RS485 card', model3: 'Standard configuration: RS232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, RS485 card', model4: 'Standard configuration: RS232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, RS485 card', model5: 'Standard configuration: RS232, USB, EPO, Intelligent slot; Optional: SNMP card, AS400 card, Dry contact, RS485 card' },
    { category: 'Alarms', model1: 'LED / LCD', model2: 'LED / LCD', model3: 'LED / LCD', model4: 'LED / LCD', model5: 'LED / LCD' },
    { category: 'Noise Level (at 1 meter)', model1: '< 55 dB', model2: '< 58 dB', model3: '< 60 dB', model4: '< 60 dB', model5: '< 65 dB' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C', model3: '0°C ~ 40°C', model4: '0°C ~ 40°C', model5: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C', model2: '-25°C ~ 55°C', model3: '-25°C ~ 55°C', model4: '-25°C ~ 55°C', model5: '-25°C ~ 55°C' },
    { category: 'Relative Humidity', model1: '0 ~ 95% (non-condensing)', model2: '0 ~ 95% (non-condensing)', model3: '0 ~ 95% (non-condensing)', model4: '0 ~ 95% (non-condensing)', model5: '0 ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000m, derate 1% per 100m between 1000m-2000m', model2: '< 1000m, derate 1% per 100m between 1000m-2000m', model3: '< 1000m, derate 1% per 100m between 1000m-2000m', model4: '< 1000m, derate 1% per 100m between 1000m-2000m', model5: '< 1000m, derate 1% per 100m between 1000m-2000m' },
    { category: 'PHYSICAL', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Tower Model (W × D × H) (mm)', model1: '250 × 640 × 830', model2: '250 × 640 × 830', model3: '250 x 800 x 1000', model4: '350 × 800 × 1000', model5: '350 × 815 × 1050' },
    { category: 'Net Weight (kg)', model1: '81', model2: '82', model3: '84', model4: '115', model5: '119' }
  ];

  const renderContent = () => {
    switch(activeTab) {
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuresList.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 md:p-3 rounded-full flex-shrink-0">
                    <Check size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-blue-600 mb-2 md:mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h4>
                    {feature.desc && <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'advantages':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {advantagesList.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 md:p-3 rounded-full flex-shrink-0">
                    <ArrowUpRight size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-blue-600 mb-2 md:mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.title}</h4>
                    {advantage.desc && <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'benefits':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {benefitsList.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
                    <div className="text-blue-600 bg-blue-50 p-3 md:p-4 rounded-lg w-fit">
                      <Award size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.title}</h3>
                  </div>

                  <p className="text-black text-sm md:text-base mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  // Stats for Key Features Section
  const keyStats = [
    { value: "95", suffix: "%", title: "Max Efficiency", icon: <Zap size={24} /> },
    { value: "0", suffix: "ms", title: "Transfer Time", icon: <Clock size={24} /> },
    { value: "1.0", suffix: "", title: "Power Factor", icon: <Shield size={24} /> },
    { value: "3", suffix: "Ph", title: "Three Phase", icon: <BarChart3 size={24} /> }
  ];

  // PDF Viewer Modal
  const PdfViewer = () => {
    const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

    // Function to directly download the PDF without any dialog
    const handleDownloadPdf = () => {
      // Create a hidden anchor element
      const a = document.createElement('a');

      // Set direct download attributes
      a.style.display = 'none';
      a.href = pdfUrl;
      a.setAttribute('download', 'KRYKARD-EH33-Small-Series-Brochure.pdf');

      // Append to body
      document.body.appendChild(a);

      // Trigger click programmatically
      a.click();

      // Remove element after download is triggered
      document.body.removeChild(a);

      // Force a download by opening in a new window as backup
      if (navigator.userAgent.indexOf('MSIE') !== -1 || navigator.userAgent.indexOf('Trident/') !== -1) {
        window.open(pdfUrl, '_blank');
      }
    };

    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center ${showPdfViewer ? '' : 'hidden'}`}>
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
            <h3 className="text-xl font-bold text-black">KSX4080 EH 33 Small Series Brochure</h3>
            <button
              onClick={handleDownloadPdf}
              className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </button>
          </div>

          <div className="w-full h-[70vh]">
            {/* Direct PDF embedding */}
            <object
              data={pdfUrl}
              type="application/pdf"
              className="w-full h-full"
            >
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-8 text-center">
                <p className="text-gray-600 mb-4">
                  PDF preview is not available in your browser.
                </p>
                <button
                  onClick={handleDownloadPdf}
                  className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-md transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </object>
          </div>
        </div>
      </div>
    );
  };
  const ProductSpecContent = () => (
    <div className="w-full mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Hero Section with Proper Spacing */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        <div className="relative z-10 px-4 max-w-7xl mx-auto">
          {/* Centered Main Title */}
          <motion.div
            className="text-center p-6 md:p-8 overflow-hidden relative mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-blue-600"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                KRYKARD EH 33 SERIES <span className="text-blue-600">3/3 UPS</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-black"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                10 kVA to 60 kVA - High-frequency design for maximum efficiency
              </motion.p>

              <motion.div
                className="bg-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg inline-block shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                THREE-PHASE POWER PROTECTION FOR BUSINESS-CRITICAL APPLICATIONS
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Content Area with Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Left side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center order-2 lg:order-1"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean UPS image */}
                <img
                  src="/UPS/6-removebg-preview.png"
                  alt="EH 33 Series UPS Models"
                  className="max-w-full max-h-full object-contain"
                />
              </div>
            </motion.div>

            {/* Right side: Enhanced Content */}
            <motion.div
              className="space-y-6 md:space-y-8 order-1 lg:order-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Midrange Three-Phase UPS Solution</h2>
                <div className="h-1 w-24 bg-blue-600 rounded-full mb-4 md:mb-6"></div>
                <p className="text-base md:text-lg text-black leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  The KRYKARD EH 33 Small Series UPS delivers reliable three-phase power protection in a compact footprint, perfect for midsize data centers, manufacturing equipment, and business-critical applications.
                </p>
              </motion.div>

              <motion.div
                className="mt-4 md:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Perfect for:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Medium-Sized Businesses",
                    "Manufacturing & Automation",
                    "Server Rooms & Network Centers",
                    "Commercial Buildings",
                    "Laboratory Equipment"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-black font-medium text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        • {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="/contact/sales"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 sm:w-1/2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Request Quote</span>
                  <ArrowRight size={18} />
                </motion.a>

                <motion.a
                  href="/Krykard Online UPS January 2025. (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-1/2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText size={18} />
                  <span>View Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Key Features Section with Proper Spacing */}
          <div className="mb-16 md:mb-20">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
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
              <motion.p
                className="text-base md:text-lg text-black max-w-3xl mx-auto"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Advanced capabilities that define our midrange UPS solutions
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {keyStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-white p-6 md:p-8 rounded-lg shadow-lg relative overflow-hidden group min-h-[200px] md:min-h-[240px]"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{
                    y: -8,
                    boxShadow: "0 15px 30px -5px rgba(0, 0, 0, 0.15)",
                    scale: 1.02
                  }}
                >
                  {/* Decorative elements */}
                  <div className="absolute top-0 left-0 w-full h-2 bg-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>

                  <div className="flex flex-col items-center text-center relative z-10 h-full">
                    <div className="bg-blue-50 p-3 md:p-4 rounded-lg shadow-sm mb-4 md:mb-6 transform group-hover:scale-110 transition-all duration-300">
                      {React.cloneElement(stat.icon, { className: "text-blue-600 h-6 w-6 md:h-8 md:w-8" })}
                    </div>

                    <div className="mb-3 md:mb-4 flex items-baseline justify-center">
                      <motion.span
                        className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600"
                        style={{ fontFamily: 'Open Sans, sans-serif' }}
                        initial={{ scale: 1 }}
                        whileInView={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        {stat.value}
                      </motion.span>
                      <span className="text-xl md:text-2xl font-bold text-blue-600 ml-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>{stat.suffix}</span>
                    </div>

                    <h3 className="text-base md:text-lg font-bold text-black mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>{stat.title}</h3>
                  </div>
                </motion.div>
              ))}
            </div>


          </div>
        </div>
      </section>

      {/* Tabs Section with Proper Spacing */}
      <section className="container mx-auto px-4 mb-16 md:mb-20">
        {/* Tab Buttons with Better Spacing */}
        <div className="flex flex-col items-center mb-12 md:mb-16">
          <motion.div
            className="bg-white rounded-full shadow-lg p-2 flex flex-wrap justify-center mb-2 w-full overflow-hidden tab-navigation"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {tabs.map(tab => (
              <motion.button
                key={tab.id}
                className={`relative py-3 md:py-4 px-6 md:px-8 font-medium text-sm md:text-base lg:text-lg transition-all duration-300 rounded-full m-1 tab-button ${
                  activeTab === tab.id
                    ? 'text-white bg-blue-600 shadow-md'
                    : 'text-black hover:bg-gray-50'
                }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {tab.label}
              </motion.button>
            ))}
          </motion.div>

          <motion.div
            className="h-1 bg-black rounded-full w-32 sm:w-48 mb-8"
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 192, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Tab Content Container with Better Spacing */}
        <motion.div
          className="p-8 md:p-12 bg-white rounded-lg shadow-lg border border-blue-100 overflow-hidden relative min-h-[400px]"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="relative z-10"
          >
            {renderContent()}
          </motion.div>
        </motion.div>
      </section>

      {/* Technical Specifications Section with Proper Spacing */}
      <section className="w-full mb-20 md:mb-24 px-4 md:px-8 lg:px-12 overflow-hidden">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Technical Specifications
          </motion.h2>
          <motion.div
            className="h-1 w-32 bg-blue-600 mx-auto rounded-full mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />

          <motion.p
            className="text-base md:text-lg text-black max-w-3xl mx-auto text-center"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Comprehensive technical details for the EH 33 Small Series UPS line
          </motion.p>
        </motion.div>

        {/* Model Selection Tabs with Better Spacing */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {['All Models', 'EH - 10', 'EH - 20', 'EH - 30', 'EH - 40', 'EH - 60'].map((model, index) => (
            <motion.button
              key={index}
              className={`py-2 md:py-3 px-4 md:px-6 rounded-lg text-sm md:text-base font-medium transition-all duration-300 ${
                hoveredModel === (index === 0 ? null : `model${index}`) || (index === 0 && hoveredModel === null)
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md'
                  : 'bg-white text-blue-800 border border-blue-200 hover:border-blue-400'
              }`}
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              onClick={() => setHoveredModel(index === 0 ? null : `model${index}`)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {model}
            </motion.button>
          ))}
        </motion.div>

        {/* Simplified Table Design */}
        <motion.div
          className="bg-white rounded-lg shadow-lg overflow-hidden border border-blue-100 relative w-full"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {/* Mobile notice */}
          <div className="md:hidden p-3 bg-gray-50 text-black text-sm font-medium text-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Swipe horizontally to view all specifications
            <div className="flex justify-center mt-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="specs-table-container">
            <div className="specs-table-scroll">
              <table className="specs-table">
                <thead>
                  <tr>
                    <th className="sticky-header-mobile">SPECIFICATIONS</th>
                    {specifications[0].model1 && (
                      <th
                        className={`cursor-pointer transition-all duration-200 ${
                          hoveredModel && hoveredModel !== 'model1' ? 'opacity-70' : ''
                        } ${hoveredModel === 'model1' ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => setHoveredModel('model1')}
                        onMouseLeave={() => setHoveredModel(null)}
                      >
                        <div className={`transition-all duration-200 ${hoveredModel === 'model1' ? 'underline' : ''}`}>
                          {specifications[0].model1}
                        </div>
                      </th>
                    )}
                    {specifications[0].model2 && (
                      <th
                        className={`cursor-pointer transition-all duration-200 ${
                          hoveredModel && hoveredModel !== 'model2' ? 'opacity-70' : ''
                        } ${hoveredModel === 'model2' ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => setHoveredModel('model2')}
                        onMouseLeave={() => setHoveredModel(null)}
                      >
                        <div className={`transition-all duration-200 ${hoveredModel === 'model2' ? 'underline' : ''}`}>
                          {specifications[0].model2}
                        </div>
                      </th>
                    )}
                    {specifications[0].model3 && (
                      <th
                        className={`cursor-pointer transition-all duration-200 ${
                          hoveredModel && hoveredModel !== 'model3' ? 'opacity-70' : ''
                        } ${hoveredModel === 'model3' ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => setHoveredModel('model3')}
                        onMouseLeave={() => setHoveredModel(null)}
                      >
                        <div className={`transition-all duration-200 ${hoveredModel === 'model3' ? 'underline' : ''}`}>
                          {specifications[0].model3}
                        </div>
                      </th>
                    )}
                    {specifications[0].model4 && (
                      <th
                        className={`cursor-pointer transition-all duration-200 ${
                          hoveredModel && hoveredModel !== 'model4' ? 'opacity-70' : ''
                        } ${hoveredModel === 'model4' ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => setHoveredModel('model4')}
                        onMouseLeave={() => setHoveredModel(null)}
                      >
                        <div className={`transition-all duration-200 ${hoveredModel === 'model4' ? 'underline' : ''}`}>
                          {specifications[0].model4}
                        </div>
                      </th>
                    )}
                    {specifications[0].model5 && (
                      <th
                        className={`cursor-pointer transition-all duration-200 ${
                          hoveredModel && hoveredModel !== 'model5' ? 'opacity-70' : ''
                        } ${hoveredModel === 'model5' ? 'bg-gray-100' : ''}`}
                        onMouseEnter={() => setHoveredModel('model5')}
                        onMouseLeave={() => setHoveredModel(null)}
                      >
                        <div className={`transition-all duration-200 ${hoveredModel === 'model5' ? 'underline' : ''}`}>
                          {specifications[0].model5}
                        </div>
                      </th>
                    )}
                </tr>
              </thead>
                <tbody>
                  {specifications.slice(1).map((spec, index) => {
                    const isHeaderRow = spec.category.includes('INPUT') ||
                                      spec.category.includes('OUTPUT') ||
                                      spec.category.includes('BATTERY') ||
                                      spec.category.includes('DISPLAY') ||
                                      spec.category.includes('OTHERS');

                    return (
                      <tr
                        key={index}
                        className={isHeaderRow ? 'header-row' : ''}
                      >
                        <td className={isHeaderRow ? '' : 'sticky-cell-mobile'}>
                          {spec.category}
                        </td>
                        {spec.model1 !== undefined && (
                          <td className={`${
                            hoveredModel === 'model1' ? 'bg-gray-100 text-black font-bold' :
                            hoveredModel && hoveredModel !== 'model1' ? 'opacity-90 text-black' : 'text-black'
                          }`}>
                            {spec.model1}
                          </td>
                        )}
                        {spec.model2 !== undefined && (
                          <td className={`${
                            hoveredModel === 'model2' ? 'bg-gray-100 text-black font-bold' :
                            hoveredModel && hoveredModel !== 'model2' ? 'opacity-90 text-black' : 'text-black'
                          }`}>
                            {spec.model2}
                          </td>
                        )}
                        {spec.model3 !== undefined && (
                          <td className={`${
                            hoveredModel === 'model3' ? 'bg-gray-100 text-black font-bold' :
                            hoveredModel && hoveredModel !== 'model3' ? 'opacity-90 text-black' : 'text-black'
                          }`}>
                            {spec.model3}
                          </td>
                        )}
                        {spec.model4 !== undefined && (
                          <td className={`${
                            hoveredModel === 'model4' ? 'bg-gray-100 text-black font-bold' :
                            hoveredModel && hoveredModel !== 'model4' ? 'opacity-90 text-black' : 'text-black'
                          }`}>
                            {spec.model4}
                          </td>
                        )}
                        {spec.model5 !== undefined && (
                          <td className={`${
                            hoveredModel === 'model5' ? 'bg-gray-100 text-black font-bold' :
                            hoveredModel && hoveredModel !== 'model5' ? 'opacity-90 text-black' : 'text-black'
                          }`}>
                            {spec.model5}
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Key Features Highlight Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-black mb-2 sm:mb-3">Key Highlights</h2>
          <div className="h-1.5 w-24 sm:w-32 bg-black mx-auto rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-black max-w-2xl mx-auto">
            Standout features that make the EH 33 Small Series exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-gray-200 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-black"></div>

            <h3 className="text-lg sm:text-xl font-bold text-black mb-2 sm:mb-4">Compact Design</h3>
            <p className="text-sm sm:text-base text-black mb-3 sm:mb-4">
              With a smaller footprint than traditional tower UPS systems, the EH 33 Small Series maximizes available space without compromising on power or performance.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-gray-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xs sm:text-sm text-black mb-2 sm:mb-0">
                <div className="font-bold">Dimensions (W×D×H)</div>
                <div>EH-10/20: 250 × 640 × 830 mm</div>
                <div>EH-60: 350 × 815 × 1050 mm</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Wide Input Voltage Range</h3>
            <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
              With an input voltage range of 304-478 VAC, the EH 33 Small Series can operate in environments with unstable power conditions without switching to battery mode, extending battery life.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-0">
                <div className="font-bold">Voltage Range</div>
                <div>304 ~ 478 VAC (100% load)</div>
                <div>228 ~ 304 VAC (decreasing load)</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Unity Power Factor</h3>
            <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
              The EH 33 Small Series provides a power factor of 1.0, ensuring that the kVA rating equals the kW rating. This means you get the full power capability you're paying for.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-0">
                <div className="font-bold">Power Rating</div>
                <div>10 kVA = 10 kW</div>
                <div>Up to 60 kVA = 60 kW</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Parallel Capability</h3>
            <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
              Connect up to four units in parallel for increased capacity or redundancy, providing a scalable power solution that grows with your business needs.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-0">
                <div className="font-bold">Parallel Configuration</div>
                <div>Up to 4 units in parallel</div>
                <div>For N+1 redundancy</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Advanced Battery Management</h3>
            <p className="text-sm sm:text-base text-blue-700 mb-3 sm:mb-4">
              Sophisticated battery management systems extend battery life through intelligent charging, automatic testing, and deep discharge protection, maximizing your investment.
            </p>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-blue-50 p-3 sm:p-4 rounded-lg">
              <div className="text-xs sm:text-sm text-blue-600 mb-2 sm:mb-0">
                <div className="font-bold">Battery Configuration</div>
                <div>40 (20+20) 12V batteries</div>
                <div>≥ 30 mins typical backup time</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full self-start sm:self-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="container mx-auto px-4 mb-16 bg-blue-50 py-16 rounded-3xl">
        <motion.div
          className="text-center mb-6 sm:mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-2 sm:mb-3">Ideal Applications</h2>
          <div className="h-1.5 w-20 sm:w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-3 sm:mt-4 text-sm sm:text-lg text-blue-700 max-w-2xl mx-auto">
            Perfect solutions for these critical environments
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-8">
          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Manufacturing</h3>
            <p className="text-sm sm:text-base text-blue-700">
              Ensures continuous operation of manufacturing equipment, control systems, and automation processes in industrial environments.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Server Rooms</h3>
            <p className="text-sm sm:text-base text-blue-700">
              Provides clean, reliable power for midsize data centers, server rooms, and network infrastructure in business environments.
            </p>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-8 rounded-xl shadow-lg border border-blue-100 flex flex-col items-center text-center"
            whileHover={{ scale: 1.05, backgroundColor: "#f0f9ff" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white mb-4 sm:mb-6 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 sm:h-10 sm:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-blue-800 mb-2 sm:mb-4">Medical Equipment</h3>
            <p className="text-sm sm:text-base text-blue-700">
              Delivers reliable power for diagnostic systems, lab equipment, and critical medical instruments in healthcare facilities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Section - Modern Design */}
      <section className="container mx-auto px-4 mb-20 relative">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-0 w-64 h-64 bg-blue-50 opacity-30 rounded-full transform translate-x-20 -translate-y-20 z-0"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-50 opacity-30 rounded-full transform -translate-x-20 translate-y-20 z-0"></div>

        <motion.div
          className="text-center mb-12 relative z-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="h-1 w-6 sm:w-10 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-950">Why Choose EH 33 Small Series</h2>
            <motion.div
              className="h-1 w-6 sm:w-10 bg-blue-500 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 24 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.p
            className="text-sm sm:text-lg md:text-xl text-blue-800 max-w-2xl mx-auto text-center font-medium"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Discover the advantages that make our solution stand out
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-10 relative z-10">
          {/* Technical Advantages Card */}
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-8 rounded-2xl shadow-xl border border-blue-100 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Card decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-100 opacity-20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>

            <div className="flex items-center mb-4 sm:mb-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center mr-3 sm:mr-5 shadow-lg transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500">
                <Shield className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Technical Advantages</h3>
            </div>

            <ul className="space-y-3 sm:space-y-5 relative z-10">
              {[
                "Unity power factor (1.0) provides full rated power capacity",
                "Wide input voltage range handles unstable power conditions",
                "Front access maintenance simplifies service operations",
                "Advanced DSP technology for superior control and performance",
                "Excellent THDi performance (<3%) for clean power environments"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start bg-white p-3 sm:p-4 rounded-lg shadow-sm group/item hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="shrink-0 mt-1 mr-3 sm:mr-4 text-white bg-gradient-to-br from-blue-500 to-blue-700 p-1.5 rounded-full shadow-sm group-hover/item:shadow-md transition-all duration-300">
                    <Check size={14} className="sm:hidden" />
                    <Check size={16} className="hidden sm:block" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm sm:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Business Benefits Card */}
          <motion.div
            className="bg-gradient-to-br from-white to-blue-50 p-4 sm:p-8 rounded-2xl shadow-xl border border-blue-100 relative overflow-hidden group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{
              y: -8,
              boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.25)",
              transition: { duration: 0.3 }
            }}
          >
            {/* Card decorative elements */}
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-600 to-blue-400"></div>
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-blue-100 opacity-20 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-700"></div>

            <div className="flex items-center mb-4 sm:mb-8">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mr-3 sm:mr-5 shadow-lg transform group-hover:rotate-3 group-hover:scale-110 transition-all duration-500">
                <BarChart3 className="h-5 w-5 sm:h-7 sm:w-7 text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Business Benefits</h3>
            </div>

            <ul className="space-y-3 sm:space-y-5 relative z-10">
              {[
                "Lower total cost of ownership through high efficiency operation",
                "Compact design saves valuable floor space in facility environments",
                "Step load capability ensures stable operation with dynamic loads",
                "Parallel capability allows for scalable system expansion",
                "Reduced energy consumption with ECO mode operations"
              ].map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-start bg-white p-3 sm:p-4 rounded-lg shadow-sm group/item hover:shadow-md transition-all duration-300"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="shrink-0 mt-1 mr-3 sm:mr-4 text-white bg-gradient-to-br from-blue-600 to-blue-400 p-1.5 rounded-full shadow-sm group-hover/item:shadow-md transition-all duration-300">
                    <Check size={14} className="sm:hidden" />
                    <Check size={16} className="hidden sm:block" />
                  </div>
                  <span className="text-gray-800 font-medium text-sm sm:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>


      </section>

      {/* Contact Section with Proper Spacing */}
      <section className="container mx-auto px-4 mb-16 md:mb-20">
        <motion.div
          className="bg-blue-50 rounded-xl overflow-hidden shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="py-12 md:py-16 px-8 md:px-12 text-center">
            <motion.h2
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 text-blue-600"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              viewport={{ once: true }}
            >
              Need More Information?
            </motion.h2>

            <motion.p
              className="text-black mb-8 md:mb-10 max-w-4xl mx-auto text-base md:text-lg"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Our team of experts is ready to help you with product specifications, custom solutions, pricing, and
              any other details you need about the KRYKARD UPS systems.
            </motion.p>

            <motion.div
              className="flex justify-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.a
                href="/contact/sales"
                className="bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all duration-300 px-8 md:px-10 py-4 md:py-5 rounded-lg font-medium flex items-center justify-center gap-3 text-base md:text-lg"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                whileHover={{ scale: 1.03, boxShadow: "0 15px 25px -5px rgba(59, 130, 246, 0.4)" }}
                whileTap={{ scale: 0.98 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Contact Our Experts</span>
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* PDF Viewer Modal */}
      <PdfViewer />
    </div>
  );

  // Return PageLayout component with the product specification content inside
  return (
    <PageLayout
      title="KRYKARD EH 33 Small Series UPS"
      subtitle="High-frequency design for maximum efficiency"
      category="protect"
      image="/background_images/ups_layout.png"
    >
      <ProductSpecContent />
    </PageLayout>
  );
};

export default ProductSpecification;