import React, { useState, useEffect } from 'react';
import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, ArrowRight, FileText, ShieldCheckIcon, GaugeIcon, ZapIcon } from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import EnhancedPageTitle from '@/components/ui/EnhancedPageTitle';
import { motion } from 'framer-motion';
import SeoHead from '@/seo/SeoHead';
import { Link } from "react-router-dom";
const MotionLink = motion(Link);

const ELBSeriesUPS: React.FC = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [showSpec, setShowSpec] = useState(false);
  const [hoveredModel, setHoveredModel] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Custom tab change handler with scroll position preservation
  const handleTabChange = (tabId: string) => {
    // Store current scroll position
    setScrollPosition(window.scrollY);
    // Update active tab
    setActiveTab(tabId);
  };

  // Custom model selection handler with scroll position preservation
  const handleModelChange = (modelKey: string | null) => {
    // Store current scroll position
    setScrollPosition(window.scrollY);
    // Update hovered model
    setHoveredModel(modelKey);
  };

  useEffect(() => {
    setIsHeaderVisible(true);

    // Show specification section after a delay
    const timer = setTimeout(() => {
      setShowSpec(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Prevent scroll reset on mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Prevent default only if needed
      if ((e.target as Element).closest('.overflow-x-auto')) {
        // Allow natural scrolling in tables with horizontal scroll
        return;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  // Prevent default behavior on all buttons to avoid page reloads
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element;
      if (target.closest('button') && !target.closest('a')) {
        // This prevents any button from triggering a form submission or page reload
        // But allows anchor tags to work normally
        e.preventDefault();
      }
    };

    window.addEventListener('click', handleClick, { capture: true });
    return () => window.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // Restore scroll position after tab or model changes
  useEffect(() => {
    // Small delay to ensure DOM has updated
    const timer = setTimeout(() => {
      if (scrollPosition > 0) {
        window.scrollTo({
          top: scrollPosition,
          behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent animation
        });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, [activeTab, hoveredModel, scrollPosition]);

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'benefits', label: 'Benefits' }
  ];

  const featuresList = [
    { title: 'Wide input voltage range (120 - 280 VAC)', desc: 'Protects against unstable input' },
    { title: 'Extended runtime with multiple unit expansion (N+X)', desc: 'Customizable to your needs' },
    { title: 'Scalable internal design & footprint with fast recovery', desc: 'Easy installation and service' },
    { title: 'Frequency range (50 - 70 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Dual feed capability', desc: 'Provides redundant configuration' },
    { title: 'Parallel capability & high-tier load capacity', desc: 'Scales with your requirements' },
    { title: 'Online Double conversion with Advanced dual-core DSP control', desc: 'Full Digital control for highest performance' },
    { title: 'Remote controlling through IGBT', desc: 'Built-in electronic protection' },
    { title: 'Advanced battery management', desc: 'Automatic battery test including deep discharge protection' },
    { title: 'Compact footprint for unmatched applications', desc: 'Space-efficient design' },
    { title: 'Transformerless Design', desc: 'Enhanced efficiency' },
    { title: 'Advanced Power Factor Correction (0.99) for PF', desc: 'Optimized electrical efficiency' },
    { title: 'Low Technical Load', desc: 'Maximum usable power' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Current Generator Overload protection', desc: 'Prevents issues due to starting inrush currents' },
    { title: 'Ideal for sensitive medical equipment', desc: 'Reliable clean power' },
    { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Complete emergency coverage mode' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes access diverse' },
    { title: 'Power protection concept with regenerating capability', desc: 'Adjustable response under varying load conditions' },
    { title: 'Output frequency freely selectable', desc: 'For sensitive loads and industrial equipment' },
    { title: 'Built-in DC fuses', desc: 'Advance Battery based voltage and analyzer function' },
    { title: 'Built-in internal battery life extender', desc: 'Redundancy & load stability' },
    { title: 'Enhanced bypass fix', desc: 'Multiple operational modes for your needs' },
    { title: 'Low Operating Cost', desc: 'High Efficiency - Up to 95+% in offline mode, 93% in online mode' },
    { title: 'Reduction in carbon footprint', desc: 'Smaller sizes than legacy systems' },
    { title: 'Maximum utilization of UPS capacity', desc: 'Optimized power usage' },
    { title: 'Better efficiency with lower heat', desc: 'Saving up to 40% on energy costs' },
    { title: 'Convenient floor space', desc: 'Compact design' }
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
    { category: 'MODEL', model1: 'EL - 1K', model2: 'EL - 2K', model3: 'ELB - 1K', model4: 'ELB - 2K', model5: 'ELB - 3K' },
    { category: 'Rated Capacity', model1: '1 kVA / 1 kW', model2: '2 kVA / 2 kW', model3: '1 kVA / 0.9 kW', model4: '2 kVA / 1.8 kW', model5: '3 kVA / 2.7 kW' },
    { category: 'INPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Phase', model1: 'Single (1Ph+N+PE)', model2: 'Single (1Ph+N+PE)', model3: 'Single (1Ph+N+PE)', model4: 'Single (1Ph+N+PE)', model5: 'Single (1Ph+N+PE)' },
    { category: 'Rated Voltage', model1: '208 / 220 / 230 / 240 VAC', model2: '208 / 220 / 230 / 240 VAC', model3: '208 / 220 / 230 / 240 VAC', model4: '208 / 220 / 230 / 240 VAC', model5: '208 / 220 / 230 / 240 VAC' },
    { category: 'Voltage Range', model1: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model2: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model3: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model4: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model5: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)' },
    { category: 'Frequency', model1: '40 / 70 Hz (auto-sensing)', model2: '40 / 70 Hz (auto-sensing)', model3: '40 / 70 Hz (auto-sensing)', model4: '40 / 70 Hz (auto-sensing)', model5: '40 / 70 Hz (auto-sensing)' },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99', model3: '≥ 0.99', model4: '≥ 0.99', model5: '≥ 0.99' },
    { category: 'Bypass Voltage Range', model1: '±10% (Adjustable)', model2: '±10% (Adjustable)', model3: '±10% (Adjustable)', model4: '±10% (Adjustable)', model5: '±10% (Adjustable)' },
    { category: 'Total Harmonic Distortion (THDi)', model1: '< 3%', model2: '< 3%', model3: '< 3%', model4: '< 3%', model5: '< 3%' },
    { category: 'OUTPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Output Wiring', model1: 'Single-phase (1Ph + N + PE)', model2: 'Single-phase (1Ph + N + PE)', model3: 'Single-phase (1Ph + N + PE)', model4: 'Single-phase (1Ph + N + PE)', model5: 'Single-phase (1Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model2: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model3: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model4: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model5: '208 / 220 / 230 / 240 VAC (configurable via LCD)' },
    { category: 'Voltage Regulation', model1: '±1%', model2: '±1%', model3: '±1%', model4: '±1%', model5: '±1%' },
    { category: 'Frequency', model1: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model2: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model3: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model4: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model5: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)' },
    { category: 'Waveform', model1: 'Sinusoidal', model2: 'Sinusoidal', model3: 'Sinusoidal', model4: 'Sinusoidal', model5: 'Sinusoidal' },
    { category: 'Power Factor', model1: '1.0', model2: '1.0', model3: '0.9', model4: '0.9', model5: '0.9' },
    { category: 'Total Harmonic Distortion (THDv)', model1: '< 2%', model2: '< 2%', model3: '< 2%', model4: '< 2%', model5: '< 2%' },
    { category: 'Crest Factor', model1: '3:1', model2: '3:1', model3: '3:1', model4: '3:1', model5: '3:1' },
    { category: 'Overload', model1: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model2: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model3: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model4: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model5: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec' },
    { category: 'BATTERIES', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'DC Voltage', model1: '36 V', model2: '72 V', model3: '36 V', model4: '72 V', model5: '96 V' },
    { category: 'No. of Batteries', model1: '3 pcs', model2: '6 pcs', model3: '3 pcs', model4: '6 pcs', model5: '8 pcs' },
    { category: 'Charging Current (max)', model1: '1A (1.5A for standard)', model2: '1A (1.5A for standard)', model3: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)', model4: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)', model5: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)' },
    { category: 'DISPLAY', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Efficiency', model1: '> 91% (Online mode), > 98% (ECO mode)', model2: '> 91% (Online mode), > 98% (ECO mode)', model3: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)', model4: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)', model5: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)' },
    { category: 'Transfer Time', model1: 'Mains mode to Battery mode: 0 ms', model2: 'Mains mode to Battery mode: 0 ms', model3: 'Mains mode to Battery mode: 0 ms', model4: 'Mains mode to Battery mode: 0 ms', model5: 'Mains mode to Battery mode: 0 ms' },
    { category: 'Protection', model1: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model2: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model3: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model4: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model5: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection' },
    { category: 'Display', model1: 'LCD + LED', model2: 'LCD + LED', model3: 'LCD + LED', model4: 'LCD + LED', model5: 'LCD + LED' },
    { category: 'OTHERS', model1: '', model2: '', model3: '', model4: '', model5: '' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C', model3: '0°C ~ 40°C', model4: '0°C ~ 40°C', model5: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)', model3: '-25°C ~ 55°C (without battery)', model4: '-25°C ~ 55°C (without battery)', model5: '-25°C ~ 55°C (without battery)' },
    { category: 'Relative Humidity', model1: '0% ~ 95% (non-condensing)', model2: '0% ~ 95% (non-condensing)', model3: '0% ~ 95% (non-condensing)', model4: '0% ~ 95% (non-condensing)', model5: '0% ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000 m, derating 1% for each additional 100 m', model2: '< 1000 m, derating 1% for each additional 100 m', model3: '< 1000 m, derating 1% for each additional 100 m', model4: '< 1000 m, derating 1% for each additional 100 m', model5: '< 1000 m, derating 1% for each additional 100 m' },
    { category: 'Noise Level at 1m', model1: '≤ 50 dB', model2: '≤ 50 dB', model3: '≤ 50 dB', model4: '≤ 50 dB', model5: '≤ 50 dB' },
    { category: 'Dimensions (W × D × H) (mm)', model1: '144 × 353 × 220', model2: '189 × 399 × 318', model3: '144 × 377 × 216', model4: '144 × 377 × 216', model5: '190 × 410 × 325' },
    { category: 'Net Weight (kg)', model1: '13', model2: '25', model3: '8.4', model4: '15', model5: '26.5' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'features':
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuresList.slice(0, 6).map((feature, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-100 rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Check size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-lg text-blue-800 mb-2 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h4>
                    {feature.desc && (
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'advantages':
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {advantagesList.slice(0, 6).map((advantage, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-100 rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <ArrowUpRight size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-lg text-blue-800 mb-2 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.title}</h4>
                    {advantage.desc && (
                      <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.desc}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'benefits':
        return (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {benefitsList.slice(0, 6).map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white border border-blue-100 rounded-xl p-6 flex items-start gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                    <Award size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-lg text-blue-800 mb-2 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.title}</h4>
                    <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };



  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

  // Main content component following SX series pattern
  const ProductSpecContent = () => (
    <div>
      {/* Title Section - Matching SX Series with Background */}

      <section className="py-6 md:py-10 relative overflow-hidden bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="relative z-10 px-4 max-w-3xl mx-auto">
          <motion.div
            className="text-center p-6 md:p-8 overflow-hidden relative mb-10 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-white"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                KRYKARD EL / ELB <span className="text-blue-100">1/1 UPS</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-blue-100"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                Reliable power solutions for uninterrupted performance
              </motion.p>

              <motion.div
                className="bg-white text-blue-600 font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg inline-block shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
              >
                RELIABLE POWER SOLUTIONS FOR CRITICAL APPLICATIONS
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero Section - Following SX Series Pattern Exactly - Mobile Compatible */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="relative z-10 px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 md:mb-16">
            {/* Left side: Content */}
            <motion.div
              className="order-2 lg:order-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-3 sm:mb-4 md:mb-6 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>Enterprise-Grade Power Protection</h2>
                <div className="h-1 w-16 sm:w-20 md:w-24 bg-blue-600 rounded-full mb-3 sm:mb-4 md:mb-6"></div>
                <p className="text-sm sm:text-base md:text-lg text-black leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  The KRYKARD EL/ELB 1/1 UPS delivers reliable power protection for your mission-critical equipment, ensuring continuous operation during power disturbances with advanced technology and robust engineering.
                </p>
              </motion.div>

              <motion.div
                className="mt-3 sm:mt-4 md:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 md:mb-6 text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Perfect for:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
                  {[
                    "Small Office Environments",
                    "Workstations & PCs",
                    "Network Equipment",
                    "Critical IT Infrastructure",
                    "Medical Equipment"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-black font-medium text-xs sm:text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        • {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:w-1/2">
                  <Link
                    to="/contact/sales"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 w-full text-xs sm:text-sm md:text-base font-medium min-h-[44px]"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </Link>
                </motion.div>

                <motion.a
                  href={pdfUrl}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-4 sm:px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-1/2 text-xs sm:text-sm md:text-base font-medium min-h-[44px]"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer  nofollow"
                >
                  <FileText size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span>UPS Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>
            {/* Right side: UPS Image with Proper Height - Mobile Compatible */}
            <motion.div
              className="relative flex justify-center px-2 sm:px-4 md:px-0 order-1 lg:order-2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-xs sm:max-w-sm md:max-w-lg h-auto sm:h-[300px] md:h-[400px] lg:h-[450px] flex items-center justify-center py-2 sm:py-4 md:py-8">
                {/* Clean UPS image */}
                <motion.img
                  src="/UPS/SB_6-removebg-preview.png"
                  alt="KRYKARD EL/ELB Series 1-3 kVA Online UPS with Zero Transfer Time and Pure Sine Wave Output"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section - Following SX Series Pattern */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Key Features
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Advanced capabilities that define our premium UPS solutions
            </p>
          </motion.div>

          {/* Professional Feature Cards with Better Spacing - Mobile Compatible */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {[
              {
                icon: <Zap size={24} className="sm:w-7 sm:h-7" />,
                value: "98",
                suffix: "%",
                title: "Max Efficiency",
                description: "Achieves up to 98% efficiency in ECO mode, reducing operational costs and environmental impact"
              },
              {
                icon: <Shield size={24} className="sm:w-7 sm:h-7" />,
                value: "280",
                suffix: "V",
                title: "Input Voltage Range",
                description: "Wide input voltage range (120-280 VAC) handles unstable power conditions without switching to battery mode"
              },
              {
                icon: <Clock size={24} className="sm:w-7 sm:h-7" />,
                value: "0.99",
                suffix: "",
                title: "Power Factor",
                description: "High power factor ensures efficient power delivery to connected equipment with minimal wasted capacity"
              },
              {
                icon: <Award size={24} className="sm:w-7 sm:h-7" />,
                value: "0",
                suffix: "ms",
                title: "Transfer Time",
                description: "Zero transfer time from mains to battery mode provides seamless protection for critical loads"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-4 sm:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-100 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-50px" }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-blue-600 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-blue-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {feature.title}
                  </h3>
                </div>
                <div className="mb-3">
                  <span className="text-2xl sm:text-3xl font-bold text-blue-800" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {feature.value}
                  </span>
                  <span className="text-base sm:text-lg font-semibold text-blue-600 ml-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {feature.suffix}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Tabs Section - Following SX Series Pattern - Mobile Compatible */}
      <section className="py-6 sm:py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Product Information
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Explore the comprehensive details of our UPS solutions
            </p>
          </motion.div>

          {/* Modern Tab Navigation - Mobile Compatible */}
          <div className="mb-8 sm:mb-10 md:mb-12">
            <div className="flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 bg-blue-50 p-2 sm:p-2.5 rounded-xl shadow-md max-w-full">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`py-3 sm:py-4 px-4 sm:px-6 md:px-8 font-medium rounded-lg border-2 border-transparent transition-all duration-200 ease-in-out text-xs sm:text-sm md:text-base min-h-[44px] flex items-center justify-center
                      ${activeTab === tab.id
                        ? 'bg-blue-500 text-white border-blue-700 shadow-sm scale-105'
                        : 'text-black bg-white hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700'}
                    `}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTabChange(tab.id);
                    }}
                    type="button"
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="bg-white rounded-2xl shadow-xl p-8 overflow-hidden">
            <div className="absolute top-0 left-0 w-16 h-16 bg-blue-50 rounded-br-3xl"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 bg-blue-50 rounded-tl-3xl"></div>

            <div className="relative min-h-[400px]">
              <div className="relative z-10 w-full">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Section - Following SX Series Pattern */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Technical Specifications
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Comprehensive technical details for the EL/ELB Series UPS line
            </p>
          </div>

          {/* Model Selection Tabs */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {['All Models', 'EL - 1K', 'EL - 2K', 'ELB - 1K', 'ELB - 2K', 'ELB - 3K'].map((model, index) => {
                const modelKey = index === 0 ? null : `model${index}`;
                return (
                  <button
                    key={index}
                    className={`px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${hoveredModel === modelKey || (index === 0 && hoveredModel === null)
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                      }`}
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleModelChange(modelKey);
                    }}
                    type="button"
                  >
                    {model}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Model Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {(() => {
              const modelSpecs = [
                {
                  key: 'model1',
                  name: 'EL - 1K',
                  points: [
                    { label: 'Rated Capacity', value: '1 kVA / 1 kW' },
                    { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
                    { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 1.0' },
                    { label: 'Efficiency', value: '> 91% (Online mode), Up to 98% (ECO mode)' },
                  ]
                },
                {
                  key: 'model2',
                  name: 'EL - 2K',
                  points: [
                    { label: 'Rated Capacity', value: '2 kVA / 2 kW' },
                    { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
                    { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 1.0' },
                    { label: 'Efficiency', value: '> 91% (Online mode), Up to 98% (ECO mode)' },
                  ]
                },
                {
                  key: 'model3',
                  name: 'ELB - 1K',
                  points: [
                    { label: 'Rated Capacity', value: '1 kVA / 0.9 kW' },
                    { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
                    { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
                    { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode)' },
                  ]
                },
                {
                  key: 'model4',
                  name: 'ELB - 2K',
                  points: [
                    { label: 'Rated Capacity', value: '2 kVA / 1.8 kW' },
                    { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
                    { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
                    { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode)' },
                  ]
                },
                {
                  key: 'model5',
                  name: 'ELB - 3K',
                  points: [
                    { label: 'Rated Capacity', value: '3 kVA / 2.7 kW' },
                    { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
                    { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
                    { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode)' },
                  ]
                },
              ];
              const showAll = hoveredModel === null;
              return modelSpecs.filter(m => showAll || hoveredModel === m.key).map(model => (
                <div key={model.key} className="bg-white border border-blue-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-200">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-bold text-blue-600 bg-blue-50 py-3 px-6 rounded-lg inline-block" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {model.name}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {model.points.map((pt, idx) => (
                      <div key={idx} className="border-b border-gray-100 pb-3 last:border-b-0">
                        <div className="font-semibold text-gray-800 mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>{pt.label}</div>
                        <div className="text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{pt.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>

          {/* Brochure Link */}
          <div className="text-center">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium shadow-lg hover:shadow-xl"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
            >
              <FileText size={20} className="mr-3" />
              View Complete Technical Specifications
            </a>
          </div>
        </div>
      </section>

      {/* EL vs ELB Series Comparison - Following SX Series Pattern */}
      <section className="py-8 md:py-12 lg:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-100"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-30">
          <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-blue-300 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            className="text-center mb-12 md:mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6 leading-tight" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              EL vs ELB Series Comparison
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full mb-6"></div>
            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Understand the key differences between our product lines
            </p>
          </motion.div>

          {/* Comparison Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* EL Series Card */}
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-extrabold text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>EL</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>EL Series</h3>
                  <p className="text-blue-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>Standard UPS Solution</p>
                </div>
              </div>

              <p className="text-blue-700 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Designed for standard applications requiring reliable power protection with excellent efficiency and compact form factor.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  '1.0 power factor for maximum efficiency',
                  'Compact tower form factor',
                  'Available in 1kVA and 2kVA capacities',
                  'Ideal for small office environments',
                  'Standard battery configuration',
                  'Online Double conversion technology',
                  '> 91% efficiency in Online mode'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </span>
                    <span className="text-gray-700 font-medium leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ideal For:</h4>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>Small offices, workstations, and environments with stable power conditions</p>
              </div>
            </motion.div>

            {/* ELB Series Card */}
            <motion.div
              className="bg-white p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
              whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>

              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mr-4">
                  <span className="text-2xl font-extrabold text-blue-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>ELB</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800 mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>ELB Series</h3>
                  <p className="text-blue-700" style={{ fontFamily: 'Open Sans, sans-serif' }}>Advanced UPS Solution</p>
                </div>
              </div>

              <p className="text-blue-700 mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                Advanced UPS solution with enhanced battery management and extended runtime capabilities for critical applications.
              </p>

              <ul className="space-y-3 mb-6">
                {[
                  '0.9 power factor for optimal performance',
                  'Extended battery options available',
                  'Available in 1kVA, 2kVA, 3kVA capacities',
                  'Customizable battery configuration',
                  'Higher efficiency in battery mode (93%)',
                  'Advanced battery management system',
                  'Comprehensive protection features'
                ].map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 mt-1 mr-3 w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
                      <Check size={14} />
                    </span>
                    <span className="text-gray-700 font-medium leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <h4 className="font-bold text-blue-800 mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ideal For:</h4>
                <p className="text-gray-700 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>Critical equipment, server rooms, and environments with unstable power conditions</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information Section - Smaller and More Attractive with Proper Spacing */}
      <section className="py-6 md:py-8 mb-8 md:mb-12 lg:mb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-700"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
              animate={{ rotate: 360 }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            >
              ⚡
            </motion.div>

            <h3 className="text-xl md:text-2xl font-bold mb-3 text-white" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Need More Information?
            </h3>

            <p className="text-blue-100 text-sm md:text-base max-w-2xl mx-auto mb-6 leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
              Get expert assistance with specifications, pricing, and custom solutions for KRYKARD UPS systems.
            </p>
            <MotionLink
              to="/contact/sales"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-blue-600 font-medium py-3 px-6 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-sm md:text-base"
              style={{ fontFamily: 'Open Sans, sans-serif' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <span>Get a Quote</span>
            </MotionLink>
          </motion.div>
        </div>
      </section>
    </div>
  );

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "EL/ELB Series Online UPS",
    "description": "EL/ELB Series 1 kVA to 3 kVA true online UPS with zero transfer time, pure sine wave output, compact design and wide voltage input for office power protection.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "EL/ELB Series",
    "image": "https://atandra.in/UPS/SB_6-removebg-preview.png",
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
        title="EL/ELB Series 1–3 kVA Online UPS for Offices"
        description="EL/ELB Series 1–3 kVA true online UPS with zero transfer time, pure sine wave output, compact design and wide voltage input for office protection."
        keywords="EL series UPS, ELB series UPS, small office UPS, 1 kVA UPS, 2 kVA UPS, 3 kVA UPS, online UPS, double conversion UPS, home office UPS, desktop UPS, workstation UPS, small business UPS"
        canonical="https://atandra.in/protect/ups/product/el-series"
        ogImage="/UPS/SB_6-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/UPS/SB_6-removebg-preview.png"
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

export default ELBSeriesUPS;