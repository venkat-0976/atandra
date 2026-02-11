// import React, { useState, useEffect } from 'react';
// import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, ArrowRight, FileText } from 'lucide-react';
// import PageLayout from '@/components/layout/PageLayout';
// import { motion } from 'framer-motion';

// const ELBSeriesUPS: React.FC = () => {
//   const [activeTab, setActiveTab] = useState('features');
//   const [isHeaderVisible, setIsHeaderVisible] = useState(false);
//   const [showSpec, setShowSpec] = useState(false);
//   const [hoveredModel, setHoveredModel] = useState(null);
//   const [scrollPosition, setScrollPosition] = useState(0);

//   // Custom tab change handler with scroll position preservation
//   const handleTabChange = (tabId: string) => {
//     // Store current scroll position
//     setScrollPosition(window.scrollY);
//     // Update active tab
//     setActiveTab(tabId);
//   };

//   // Custom model selection handler with scroll position preservation
//   const handleModelChange = (modelKey: string | null) => {
//     // Store current scroll position
//     setScrollPosition(window.scrollY);
//     // Update hovered model
//     setHoveredModel(modelKey);
//   };

//   useEffect(() => {
//     setIsHeaderVisible(true);

//     // Show specification section after a delay
//     const timer = setTimeout(() => {
//       setShowSpec(true);
//     }, 800);

//     return () => clearTimeout(timer);
//   }, []);

//   // Prevent scroll reset on mouse wheel
//   useEffect(() => {
//     const handleWheel = (e: WheelEvent) => {
//       // Prevent default only if needed
//       if ((e.target as Element).closest('.overflow-x-auto')) {
//         // Allow natural scrolling in tables with horizontal scroll
//         return;
//       }
//     };

//     window.addEventListener('wheel', handleWheel, { passive: true });
//     return () => window.removeEventListener('wheel', handleWheel);
//   }, []);

//   // Prevent default behavior on all buttons to avoid page reloads
//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       const target = e.target as Element;
//       if (target.closest('button') && !target.closest('a')) {
//         // This prevents any button from triggering a form submission or page reload
//         // But allows anchor tags to work normally
//         e.preventDefault();
//       }
//     };

//     window.addEventListener('click', handleClick, { capture: true });
//     return () => window.removeEventListener('click', handleClick, { capture: true });
//   }, []);

//   // Restore scroll position after tab or model changes
//   useEffect(() => {
//     // Small delay to ensure DOM has updated
//     const timer = setTimeout(() => {
//       if (scrollPosition > 0) {
//         window.scrollTo({
//           top: scrollPosition,
//           behavior: 'auto' // Use 'auto' instead of 'smooth' to prevent animation
//         });
//       }
//     }, 10);

//     return () => clearTimeout(timer);
//   }, [activeTab, hoveredModel, scrollPosition]);

//   const tabs = [
//     { id: 'features', label: 'Features' },
//     { id: 'advantages', label: 'Advantages' },
//     { id: 'benefits', label: 'Benefits' }
//   ];

//   const featuresList = [
//     { title: 'Wide input voltage range (120 - 280 VAC)', desc: 'Protects against unstable input' },
//     { title: 'Extended runtime with multiple unit expansion (N+X)', desc: 'Customizable to your needs' },
//     { title: 'Scalable internal design & footprint with fast recovery', desc: 'Easy installation and service' },
//     { title: 'Frequency range (50 - 70 Hz)', desc: 'Immune to unstable sources' },
//     { title: 'Dual feed capability', desc: 'Provides redundant configuration' },
//     { title: 'Parallel capability & high-tier load capacity', desc: 'Scales with your requirements' },
//     { title: 'Online Double conversion with Advanced dual-core DSP control', desc: 'Full Digital control for highest performance' },
//     { title: 'Remote controlling through IGBT', desc: 'Built-in electronic protection' },
//     { title: 'Advanced battery management', desc: 'Automatic battery test including deep discharge protection' },
//     { title: 'Compact footprint for unmatched applications', desc: 'Space-efficient design' },
//     { title: 'Transformerless Design', desc: 'Enhanced efficiency' },
//     { title: 'Advanced Power Factor Correction (0.99) for PF', desc: 'Optimized electrical efficiency' },
//     { title: 'Low Technical Load', desc: 'Maximum usable power' }
//   ];

//   const advantagesList = [
//     { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
//     { title: 'Current Generator Overload protection', desc: 'Prevents issues due to starting inrush currents' },
//     { title: 'Ideal for sensitive medical equipment', desc: 'Reliable clean power' },
//     { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Complete emergency coverage mode' },
//     { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
//     { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes access diverse' },
//     { title: 'Power protection concept with regenerating capability', desc: 'Adjustable response under varying load conditions' },
//     { title: 'Output frequency freely selectable', desc: 'For sensitive loads and industrial equipment' },
//     { title: 'Built-in DC fuses', desc: 'Advance Battery based voltage and analyzer function' },
//     { title: 'Built-in internal battery life extender', desc: 'Redundancy & load stability' },
//     { title: 'Enhanced bypass fix', desc: 'Multiple operational modes for your needs' },
//     { title: 'Low Operating Cost', desc: 'High Efficiency - Up to 95+% in offline mode, 93% in online mode' },
//     { title: 'Reduction in carbon footprint', desc: 'Smaller sizes than legacy systems' },
//     { title: 'Maximum utilization of UPS capacity', desc: 'Optimized power usage' },
//     { title: 'Better efficiency with lower heat', desc: 'Saving up to 40% on energy costs' },
//     { title: 'Convenient floor space', desc: 'Compact design' }
//   ];

//   const benefitsList = [
//     {
//       title: 'High Uptime / Availability',
//       desc: 'Ensures your critical systems remain operational with minimal to zero interruption, delivering maximum operational continuity.'
//     },
//     {
//       title: 'High Flexibility',
//       desc: 'Adapts to various configurations and settings, supporting a wide range of devices and operational environments.'
//     },
//     {
//       title: 'High Reliability',
//       desc: 'Engineered with premium components and advanced protection systems to ensure consistent and dependable performance.'
//     },
//     {
//       title: 'Low Total Cost of Ownership (TCO)',
//       desc: 'Combines energy efficiency, extended lifespan, and reduced maintenance requirements to minimize long-term costs.'
//     }
//   ];

//   const specifications = [
//     { category: 'MODEL', model1: 'EL - 1K', model2: 'EL - 2K', model3: 'ELB - 1K', model4: 'ELB - 2K', model5: 'ELB - 3K' },
//     { category: 'Rated Capacity', model1: '1 kVA / 1 kW', model2: '2 kVA / 2 kW', model3: '1 kVA / 0.9 kW', model4: '2 kVA / 1.8 kW', model5: '3 kVA / 2.7 kW' },
//     { category: 'INPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
//     { category: 'Phase', model1: 'Single (1Ph+N+PE)', model2: 'Single (1Ph+N+PE)', model3: 'Single (1Ph+N+PE)', model4: 'Single (1Ph+N+PE)', model5: 'Single (1Ph+N+PE)' },
//     { category: 'Rated Voltage', model1: '208 / 220 / 230 / 240 VAC', model2: '208 / 220 / 230 / 240 VAC', model3: '208 / 220 / 230 / 240 VAC', model4: '208 / 220 / 230 / 240 VAC', model5: '208 / 220 / 230 / 240 VAC' },
//     { category: 'Voltage Range', model1: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model2: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model3: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model4: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)', model5: '175 ~ 175 VAC (linear de-rating between 80% and 100% load); 120 ~ 175 VAC (load up to 80%)' },
//     { category: 'Frequency', model1: '40 / 70 Hz (auto-sensing)', model2: '40 / 70 Hz (auto-sensing)', model3: '40 / 70 Hz (auto-sensing)', model4: '40 / 70 Hz (auto-sensing)', model5: '40 / 70 Hz (auto-sensing)' },
//     { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99', model3: '≥ 0.99', model4: '≥ 0.99', model5: '≥ 0.99' },
//     { category: 'Bypass Voltage Range', model1: '±10% (Adjustable)', model2: '±10% (Adjustable)', model3: '±10% (Adjustable)', model4: '±10% (Adjustable)', model5: '±10% (Adjustable)' },
//     { category: 'Total Harmonic Distortion (THDi)', model1: '< 3%', model2: '< 3%', model3: '< 3%', model4: '< 3%', model5: '< 3%' },
//     { category: 'OUTPUT', model1: '', model2: '', model3: '', model4: '', model5: '' },
//     { category: 'Output Wiring', model1: 'Single-phase (1Ph + N + PE)', model2: 'Single-phase (1Ph + N + PE)', model3: 'Single-phase (1Ph + N + PE)', model4: 'Single-phase (1Ph + N + PE)', model5: 'Single-phase (1Ph + N + PE)' },
//     { category: 'Rated Voltage', model1: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model2: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model3: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model4: '208 / 220 / 230 / 240 VAC (configurable via LCD)', model5: '208 / 220 / 230 / 240 VAC (configurable via LCD)' },
//     { category: 'Voltage Regulation', model1: '±1%', model2: '±1%', model3: '±1%', model4: '±1%', model5: '±1%' },
//     { category: 'Frequency', model1: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model2: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model3: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model4: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)', model5: '47 ~ 53Hz or 57 ~ 63Hz (Synchronized with utility); 50/60 Hz ±0.1Hz (Battery mode)' },
//     { category: 'Waveform', model1: 'Sinusoidal', model2: 'Sinusoidal', model3: 'Sinusoidal', model4: 'Sinusoidal', model5: 'Sinusoidal' },
//     { category: 'Power Factor', model1: '1.0', model2: '1.0', model3: '0.9', model4: '0.9', model5: '0.9' },
//     { category: 'Total Harmonic Distortion (THDv)', model1: '< 2%', model2: '< 2%', model3: '< 2%', model4: '< 2%', model5: '< 2%' },
//     { category: 'Crest Factor', model1: '3:1', model2: '3:1', model3: '3:1', model4: '3:1', model5: '3:1' },
//     { category: 'Overload', model1: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model2: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model3: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model4: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec', model5: '100% ~ 110% for 30 min, 110% ~ 130% for 5 min, 130% ~ 140% for 10 sec, >140% for 1 sec' },
//     { category: 'BATTERIES', model1: '', model2: '', model3: '', model4: '', model5: '' },
//     { category: 'DC Voltage', model1: '36 V', model2: '72 V', model3: '36 V', model4: '72 V', model5: '96 V' },
//     { category: 'No. of Batteries', model1: '3 pcs', model2: '6 pcs', model3: '3 pcs', model4: '6 pcs', model5: '8 pcs' },
//     { category: 'Charging Current (max)', model1: '1A (1.5A for standard)', model2: '1A (1.5A for standard)', model3: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)', model4: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)', model5: 'Based on charger rating installed in a tower or cabinet format (depends on the battery rating)' },
//     { category: 'DISPLAY', model1: '', model2: '', model3: '', model4: '', model5: '' },
//     { category: 'Efficiency', model1: '> 91% (Online mode), > 98% (ECO mode)', model2: '> 91% (Online mode), > 98% (ECO mode)', model3: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)', model4: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)', model5: '> 92% (Online mode), > 98% (ECO mode), > 93% (Battery mode)' },
//     { category: 'Transfer Time', model1: 'Mains mode to Battery mode: 0 ms', model2: 'Mains mode to Battery mode: 0 ms', model3: 'Mains mode to Battery mode: 0 ms', model4: 'Mains mode to Battery mode: 0 ms', model5: 'Mains mode to Battery mode: 0 ms' },
//     { category: 'Protection', model1: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model2: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model3: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model4: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection', model5: 'Short-circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure protection' },
//     { category: 'Display', model1: 'LCD + LED', model2: 'LCD + LED', model3: 'LCD + LED', model4: 'LCD + LED', model5: 'LCD + LED' },
//     { category: 'OTHERS', model1: '', model2: '', model3: '', model4: '', model5: '' },
//     { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C', model3: '0°C ~ 40°C', model4: '0°C ~ 40°C', model5: '0°C ~ 40°C' },
//     { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)', model3: '-25°C ~ 55°C (without battery)', model4: '-25°C ~ 55°C (without battery)', model5: '-25°C ~ 55°C (without battery)' },
//     { category: 'Relative Humidity', model1: '0% ~ 95% (non-condensing)', model2: '0% ~ 95% (non-condensing)', model3: '0% ~ 95% (non-condensing)', model4: '0% ~ 95% (non-condensing)', model5: '0% ~ 95% (non-condensing)' },
//     { category: 'Altitude', model1: '< 1000 m, derating 1% for each additional 100 m', model2: '< 1000 m, derating 1% for each additional 100 m', model3: '< 1000 m, derating 1% for each additional 100 m', model4: '< 1000 m, derating 1% for each additional 100 m', model5: '< 1000 m, derating 1% for each additional 100 m' },
//     { category: 'Noise Level at 1m', model1: '≤ 50 dB', model2: '≤ 50 dB', model3: '≤ 50 dB', model4: '≤ 50 dB', model5: '≤ 50 dB' },
//     { category: 'Dimensions (W × D × H) (mm)', model1: '144 × 353 × 220', model2: '189 × 399 × 318', model3: '144 × 377 × 216', model4: '144 × 377 × 216', model5: '190 × 410 × 325' },
//     { category: 'Net Weight (kg)', model1: '13', model2: '25', model3: '8.4', model4: '15', model5: '26.5' }
//   ];

//   const renderContent = () => {
//     switch(activeTab) {
//       case 'features':
//         return (
//           <div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//               {featuresList.slice(0, 6).map((feature, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 md:p-6 flex items-start gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
//                     <Check size={18} className="sm:w-5 sm:h-5" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h4 className="font-bold text-responsive-base text-blue-800 mb-1 sm:mb-2 leading-tight">{feature.title}</h4>
//                     {feature.desc && (
//                       <p className="text-gray-700 leading-relaxed text-responsive-sm">{feature.desc}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'advantages':
//         return (
//           <div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//               {advantagesList.slice(0, 6).map((advantage, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 md:p-6 flex items-start gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
//                     <ArrowUpRight size={18} className="sm:w-5 sm:h-5" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h4 className="font-bold text-responsive-base text-blue-800 mb-1 sm:mb-2 leading-tight">{advantage.title}</h4>
//                     {advantage.desc && (
//                       <p className="text-gray-700 leading-relaxed text-responsive-sm">{advantage.desc}</p>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       case 'benefits':
//         return (
//           <div>
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
//               {benefitsList.slice(0, 6).map((benefit, index) => (
//                 <div
//                   key={index}
//                   className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 md:p-6 flex items-start gap-3 sm:gap-4 shadow-sm hover:shadow-md transition-shadow duration-200"
//                 >
//                   <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 bg-blue-600 rounded-lg flex items-center justify-center text-white">
//                     <Award size={18} className="sm:w-5 sm:h-5" />
//                   </div>
//                   <div className="min-w-0 flex-1">
//                     <h4 className="font-bold text-responsive-base text-blue-800 mb-1 sm:mb-2 leading-tight">{benefit.title}</h4>
//                     <p className="text-gray-700 leading-relaxed text-responsive-sm">{benefit.desc}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         );

//       default:
//         return null;
//     }
//   };



//   // PDF URL for brochure
//   const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

//   return (
//     <PageLayout
//       title="KRYKARD EL/ELB Series UPS"
//       subtitle="Reliable power solutions for uninterrupted performance"
//       category="protect"
//       image="/background_images/ups_layout.png"
//     >
//       {/* Hero Section with Image on Right and Content on Left */}
//       <section className="py-4 sm:py-6 md:py-8 relative overflow-hidden">
//         {/* Background decorative elements - responsive */}
//         <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-24 sm:w-32 md:w-64 h-24 sm:h-32 md:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//         <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-32 sm:w-40 md:w-80 h-32 sm:h-40 md:h-80 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>

//         <div className="relative z-10 px-3 sm:px-4 md:px-6 max-w-7xl mx-auto">
//           <motion.div
//             className="text-blue-800 p-3 sm:p-4 md:p-6 overflow-hidden relative mb-4 sm:mb-6 md:mb-8 text-center"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7 }}
//           >
//             <div className="relative z-10 max-w-4xl mx-auto px-2 sm:px-4">
//               <motion.h1
//                 className="text-responsive-2xl font-extrabold tracking-tight mb-2 sm:mb-3 md:mb-4 text-blue-800 bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent leading-tight"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.2 }}
//               >
//                 KRYKARD EL / ELB <span className="text-blue-600 block sm:inline">1/1 UPS</span>
//               </motion.h1>

//               <motion.p
//                 className="text-responsive-base font-medium mb-3 sm:mb-4 md:mb-6 text-black mx-auto max-w-2xl leading-relaxed"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.3 }}
//               >
//                 Reliable power solutions for uninterrupted performance
//               </motion.p>

//               <motion.div
//                 className="bg-gradient-to-r from-blue-50 to-blue-100 text-black font-bold py-3 px-4 sm:py-4 sm:px-6 md:py-4 md:px-8 rounded-full inline-block shadow-sm transform hover:scale-105 transition-transform duration-300 border border-blue-200 text-responsive-sm text-center max-w-full"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.4 }}
//               >
//                 <span className="block sm:inline">RELIABLE POWER SOLUTIONS</span>
//                 <span className="block sm:inline sm:ml-1">FOR CRITICAL APPLICATIONS</span>
//               </motion.div>
//             </div>
//           </motion.div>{/* Hero Content Area - Image left, Content right (Mobile: stacked) */}
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-12 lg:gap-16 items-center mb-8 sm:mb-12 md:mb-16">
//             {/* UPS Image - Left side on desktop, first on mobile */}
//             <motion.div
//               className="relative flex justify-center order-1"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.8 }}
//             >
//               {/* Product image with simple up-down animation */}
//               <motion.div
//                 animate={{
//                   y: [0, -15, 0]
//                 }}
//                 transition={{
//                   duration: 4,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   ease: "easeInOut"
//                 }}
//                 className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
//               >
//                 <img
//                   src="/UPS/SB_6-removebg-preview.png"
//                   alt="EL/ELB Series UPS Units"
//                   className="w-full h-auto object-contain"
//                 />
//               </motion.div>
//             </motion.div>

//             {/* Content - Right side on desktop, second on mobile */}
//             <motion.div
//               className="spacing-responsive-md order-2 px-3 sm:px-4 lg:px-0"
//               initial={{ opacity: 0, x: 30 }}
//               animate={{ opacity: 1, x: 0 }}
//               transition={{ duration: 0.8 }}
//             >
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6 }}
//               >
//                 <h2 className="text-responsive-xl font-bold text-blue-900 mb-2 sm:mb-3 leading-tight">
//                   Enterprise-Grade Power Protection
//                 </h2>
//                 <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full mb-3 sm:mb-4"></div>
//                 <p className="text-responsive-base text-black leading-relaxed">
//                   The KRYKARD EL/ELB 1/1 UPS delivers reliable power protection for your mission-critical equipment, ensuring continuous operation during power disturbances with advanced technology and robust engineering.
//                 </p>
//               </motion.div>

//               <motion.div
//                 className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8"
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.6, delay: 0.4 }}
//               >
//                 <motion.a
//                   href="/contact/sales"
//                   className="touch-target border-2 border-blue-600 font-bold text-black hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700 px-6 py-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-responsive-base min-h-[48px]"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                 >
//                   <span>Request Quote</span>
//                   <ArrowRight size={20} className="flex-shrink-0" />
//                 </motion.a>

//                 <motion.button
//                   className="touch-target border-2 border-blue-600 font-bold text-black hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700 px-6 py-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-responsive-base min-h-[48px]"
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => window.open(pdfUrl, "_blank")}
//                 >
//                   <FileText size={20} className="flex-shrink-0" />
//                   <span>View Brochure</span>
//                 </motion.button>
//               </motion.div>
//             </motion.div>
//           </div>

//           {/* Key Features Section - Mobile-optimized design */}
//           <div className="mb-12 sm:mb-16 md:mb-20 relative">
//             {/* Background decorative elements - responsive */}
//             <div className="absolute inset-0 overflow-hidden pointer-events-none">
//               <div className="absolute -top-10 sm:-top-20 -left-10 sm:-left-20 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//               <div className="absolute -bottom-10 sm:-bottom-20 -right-10 sm:-right-20 w-40 sm:w-80 h-40 sm:h-80 bg-blue-300 rounded-full opacity-20 blur-3xl"></div>
//               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-20 sm:h-40 bg-gradient-to-r from-blue-200 to-blue-300 opacity-10 blur-3xl"></div>
//             </div>

//             <motion.div
//               className="text-center mb-8 sm:mb-10 md:mb-12 relative z-10 px-3 sm:px-4"
//               initial={{ opacity: 0, y: -20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.7 }}
//               viewport={{ once: true, margin: "-50px" }}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 whileInView={{ scale: 1, opacity: 1 }}
//                 transition={{ duration: 0.5, delay: 0.2 }}
//                 viewport={{ once: true }}
//               >
//                 <h2 className="text-responsive-2xl font-bold text-blue-900 mb-3 sm:mb-4 inline-block relative leading-tight">
//                   Key Features
//                   <motion.div
//                     className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
//                     initial={{ scaleX: 0, opacity: 0 }}
//                     whileInView={{ scaleX: 1, opacity: 1 }}
//                     transition={{ duration: 0.8, delay: 0.4 }}
//                     viewport={{ once: true }}
//                   />
//                 </h2>
//               </motion.div>
//               <motion.p
//                 className="mt-4 sm:mt-6 text-responsive-lg text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed"
//                 initial={{ opacity: 0, y: 20 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.7, delay: 0.3 }}
//                 viewport={{ once: true }}
//               >
//                 Advanced capabilities that define our premium UPS solutions
//               </motion.p>
//             </motion.div>

//             {/* Enhanced Feature Cards - Mobile-first grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 relative z-10 px-3 sm:px-4">
//               {[
//                 {
//                   icon: <Zap size={24} className="sm:w-7 sm:h-7" />,
//                   title: "Double Conversion",
//                   description: "Pure sine wave output with zero transfer time ensures complete protection for critical equipment"
//                 },
//                 {
//                   icon: <Shield size={24} className="sm:w-7 sm:h-7" />,
//                   title: "ECO Mode Efficiency",
//                   description: "Energy-saving mode reduces operational costs while maintaining essential protection"
//                 },
//                 {
//                   icon: <Clock size={24} className="sm:w-7 sm:h-7" />,
//                   title: "Continuous Protection",
//                   description: "Reliable power protection that safeguards your equipment around the clock"
//                 }
//               ].map((feature, index) => (
//                 <motion.div
//                   key={index}
//                   className="bg-white border border-blue-100 rounded-2xl p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
//                   initial={{ opacity: 0, y: 20 }}
//                   whileInView={{ opacity: 1, y: 0 }}
//                   transition={{ duration: 0.5, delay: index * 0.1 }}
//                   viewport={{ once: true, margin: "-50px" }}
//                 >
//                   <div className="flex flex-col sm:flex-row sm:items-center mb-3 sm:mb-4 text-center sm:text-left">
//                     <div className="flex justify-center sm:justify-start mb-2 sm:mb-0 sm:mr-3">
//                       <div className="text-blue-600">{feature.icon}</div>
//                     </div>
//                     <h3 className="text-responsive-lg font-bold text-blue-800 leading-tight">{feature.title}</h3>
//                   </div>
//                   <p className="text-responsive-base text-gray-700 text-center sm:text-left leading-relaxed">{feature.description}</p>
//                 </motion.div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Tabs Section - Mobile-optimized */}
//       <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-10 sm:mb-16 md:mb-20 relative">
//         {/* Background decorative elements - responsive */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 sm:-top-40 left-1/4 w-36 sm:w-72 h-36 sm:h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
//           <div className="absolute -bottom-10 sm:-bottom-20 right-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//         </div>

//         <motion.div
//           className="text-center mb-8 sm:mb-10 md:mb-12 relative z-10"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           <motion.h2
//             className="text-responsive-2xl font-bold text-blue-900 mb-3 sm:mb-4 leading-tight"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             Product Details
//           </motion.h2>
//           <motion.div
//             className="h-0.5 sm:h-1 w-16 sm:w-24 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"
//             initial={{ width: 0, opacity: 0 }}
//             whileInView={{ width: "6rem", opacity: 1 }}
//             transition={{ duration: 0.8, delay: 0.2 }}
//             viewport={{ once: true }}
//           ></motion.div>
//           <motion.p
//             className="mt-4 sm:mt-6 text-responsive-lg text-gray-700 max-w-2xl mx-auto leading-relaxed"
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 0.5, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             Explore the comprehensive details of our UPS solutions
//           </motion.p>
//         </motion.div>

//         {/* Modern Tab Navigation - Mobile-first */}
//         <div className="relative z-10 mb-8 sm:mb-10 md:mb-12">
//           <div className="flex justify-center">
//             <div className="inline-flex flex-wrap justify-center gap-2 sm:gap-3 bg-blue-50 p-2 sm:p-2.5 rounded-xl shadow-md max-w-full">
//               {tabs.map((tab) => (
//                 <button
//                   key={tab.id}
//                   className={`touch-target relative py-3 sm:py-4 px-4 sm:px-6 md:px-8 lg:px-10 font-medium text-responsive-base rounded-lg border-2 border-transparent transition-all duration-200 ease-in-out min-h-[44px] flex items-center justify-center
//                     ${activeTab === tab.id
//                       ? 'bg-blue-500 text-white border-blue-700 shadow-sm scale-105'
//                       : 'text-black bg-white hover:bg-blue-100 hover:border-blue-800 hover:text-blue-700'}
//                   `}
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     handleTabChange(tab.id);
//                   }}
//                   type="button"
//                 >
//                   {tab.label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Tab Content Container - Mobile-optimized */}
//         <div className="relative z-10 bg-white rounded-xl sm:rounded-2xl shadow-lg sm:shadow-xl p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
//           {/* Decorative corner accents - responsive */}
//           <div className="absolute top-0 left-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-blue-50 rounded-br-2xl sm:rounded-br-3xl"></div>
//           <div className="absolute bottom-0 right-0 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-blue-50 rounded-tl-2xl sm:rounded-tl-3xl"></div>

//           {/* Content without animations - responsive min-height */}
//           <div className="relative min-h-[300px] sm:min-h-[350px] md:min-h-[400px]">
//             <div className="relative z-10 w-full">
//               {renderContent()}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Technical Specifications Section - Mobile-optimized */}
//       <section className="w-full mb-12 sm:mb-16 md:mb-20 px-3 sm:px-4 md:px-6 lg:px-8 overflow-hidden relative">
//         {/* Background decorative elements - responsive */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 sm:-top-40 right-1/4 w-36 sm:w-72 h-36 sm:h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
//           <div className="absolute -bottom-10 sm:-bottom-20 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//         </div>

//         <motion.div
//           className="text-center mb-8 sm:mb-10 md:mb-12 relative z-10"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-responsive-2xl font-bold text-blue-950 mb-3 sm:mb-4 inline-block relative leading-tight">
//               Technical Specifications
//               <motion.div
//                 className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
//                 initial={{ scaleX: 0, opacity: 0 }}
//                 whileInView={{ scaleX: 1, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 viewport={{ once: true }}
//               />
//             </h2>
//           </motion.div>
//           <motion.p
//             className="mt-4 sm:mt-6 text-responsive-lg text-gray-800 max-w-2xl mx-auto font-medium leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             Comprehensive technical details for the EL/ELB Series UPS line
//           </motion.p>
//         </motion.div>

//         {/* Model Selection Tabs - Mobile-optimized */}
//         <div className="relative z-10 mb-6 sm:mb-8">
//           <div className="flex justify-center">
//             <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2 bg-blue-50 p-2 sm:p-2.5 rounded-xl shadow-md mb-4 sm:mb-6 max-w-full">
//               {['All Models', 'EL - 1K', 'EL - 2K', 'ELB - 1K', 'ELB - 2K', 'ELB - 3K'].map((model, index) => {
//                 const modelKey = index === 0 ? null : `model${index}`;
//                 return (
//                   <button
//                     key={index}
//                     className={`touch-target relative py-2 sm:py-3 px-2 sm:px-3 md:px-4 font-medium text-xs sm:text-sm md:text-base rounded-lg transition-all duration-200 min-h-[40px] sm:min-h-[44px] flex items-center justify-center ${
//                       hoveredModel === modelKey || (index === 0 && hoveredModel === null)
//                         ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm'
//                         : 'text-blue-700 hover:text-blue-900 hover:bg-blue-100 bg-white'
//                     }`}
//                     onClick={(e) => {
//                       // Prevent any default behavior
//                       e.preventDefault();
//                       e.stopPropagation();
//                       // Use custom handler to preserve scroll position
//                       handleModelChange(modelKey);
//                     }}
//                     type="button" // Explicitly set button type to prevent form submission behavior
//                   >
//                     {/* Model label - responsive text */}
//                     <span className="whitespace-nowrap">{model}</span>
//                   </button>
//                 );
//               })}
//             </div>
//           </div>
//         </div>

//         {/* Model-wise Technical Highlights Cards - Mobile-optimized */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
//           {(() => {
//             const modelSpecs = [
//               {
//                 key: 'model1',
//                 name: 'EL - 1K',
//                 points: [
//                   { label: 'Rated Capacity', value: '1 kVA / 1 kW' },
//                   { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
//                   { label: 'Frequency', value: '40 / 70 Hz (auto-sensing), 50/60 Hz ±0.1Hz (Battery mode)' },
//                   { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 1.0' },
//                   { label: 'Efficiency', value: '> 91% (Online mode), Up to 98% (ECO mode)' },
//                   { label: 'Protection Features', value: 'Short-circuit, Overload, Over temperature, Battery low voltage, Over/Under voltage, Fan failure' },
//                 ]
//               },
//               {
//                 key: 'model2',
//                 name: 'EL - 2K',
//                 points: [
//                   { label: 'Rated Capacity', value: '2 kVA / 2 kW' },
//                   { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
//                   { label: 'Frequency', value: '40 / 70 Hz (auto-sensing), 50/60 Hz ±0.1Hz (Battery mode)' },
//                   { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 1.0' },
//                   { label: 'Efficiency', value: '> 91% (Online mode), Up to 98% (ECO mode)' },
//                   { label: 'Protection Features', value: 'Short-circuit, Overload, Over temperature, Battery low voltage, Over/Under voltage, Fan failure' },
//                 ]
//               },
//               {
//                 key: 'model3',
//                 name: 'ELB - 1K',
//                 points: [
//                   { label: 'Rated Capacity', value: '1 kVA / 0.9 kW' },
//                   { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
//                   { label: 'Frequency', value: '40 / 70 Hz (auto-sensing), 50/60 Hz ±0.1Hz (Battery mode)' },
//                   { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
//                   { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode), > 93% (Battery mode)' },
//                   { label: 'Protection Features', value: 'Short-circuit, Overload, Over temperature, Battery low voltage, Over/Under voltage, Fan failure' },
//                 ]
//               },
//               {
//                 key: 'model4',
//                 name: 'ELB - 2K',
//                 points: [
//                   { label: 'Rated Capacity', value: '2 kVA / 1.8 kW' },
//                   { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
//                   { label: 'Frequency', value: '40 / 70 Hz (auto-sensing), 50/60 Hz ±0.1Hz (Battery mode)' },
//                   { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
//                   { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode), > 93% (Battery mode)' },
//                   { label: 'Protection Features', value: 'Short-circuit, Overload, Over temperature, Battery low voltage, Over/Under voltage, Fan failure' },
//                 ]
//               },
//               {
//                 key: 'model5',
//                 name: 'ELB - 3K',
//                 points: [
//                   { label: 'Rated Capacity', value: '3 kVA / 2.7 kW' },
//                   { label: 'Input Voltage Range', value: '120 ~ 280 VAC' },
//                   { label: 'Frequency', value: '40 / 70 Hz (auto-sensing), 50/60 Hz ±0.1Hz (Battery mode)' },
//                   { label: 'Power Factor', value: 'Input: ≥ 0.99, Output: 0.9' },
//                   { label: 'Efficiency', value: '> 92% (Online mode), Up to 98% (ECO mode), > 93% (Battery mode)' },
//                   { label: 'Protection Features', value: 'Short-circuit, Overload, Over temperature, Battery low voltage, Over/Under voltage, Fan failure' },
//                 ]
//               },
//             ];
//             const showAll = hoveredModel === null;
//             return modelSpecs.filter(m => showAll || hoveredModel === m.key).map(model => (
//               <div key={model.key} className="bg-white border border-blue-100 rounded-xl p-4 sm:p-5 md:p-6 transition-all duration-200 hover:shadow-lg hover:scale-[1.02] shadow-sm">
//                 <div className="flex justify-center mb-3 sm:mb-4">
//                   <span className="inline-block px-4 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-md bg-gradient-to-r from-blue-600 to-blue-400 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold tracking-wide uppercase transition-all duration-200 group-hover:from-blue-800 group-hover:to-blue-600 hover:from-blue-800 hover:to-blue-600">
//                     {model.name}
//                   </span>
//                 </div>
//                 <ul className="space-y-2 sm:space-y-3">
//                   {model.points.map((pt, idx) => (
//                     <li key={idx} className="flex flex-col sm:flex-row sm:items-start">
//                       <span className="font-bold text-black mb-1 sm:mb-0 sm:mr-2 text-responsive-sm flex-shrink-0">{pt.label}:</span>
//                       <span className="text-gray-700 text-responsive-sm leading-relaxed break-words">{pt.value}</span>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ));
//           })()}
//         </div>
//         {/* Dynamic Brochure Link Below Model Cards - Mobile-optimized */}
//         <div className="flex justify-center mb-6 sm:mb-8 px-3 sm:px-4">
//           <a
//             href={pdfUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="touch-target text-blue-700 hover:text-blue-900 underline text-responsive-base font-semibold transition-colors duration-200 text-center leading-relaxed min-h-[44px] flex items-center justify-center px-4 py-2"
//           >
//             To view the complete technical specifications, click here.
//           </a>
//         </div>
//       </section>

//       {/* Modern EL vs ELB Series Comparison - Mobile-optimized */}
//       <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-12 sm:mb-16 md:mb-20 relative">
//         {/* Background decorative elements - responsive */}
//         <div className="absolute inset-0 overflow-hidden pointer-events-none">
//           <div className="absolute -top-20 sm:-top-40 left-1/3 w-36 sm:w-72 h-36 sm:h-72 bg-blue-100 rounded-full opacity-30 blur-3xl"></div>
//           <div className="absolute -bottom-10 sm:-bottom-20 right-1/3 w-32 sm:w-64 h-32 sm:h-64 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
//         </div>

//         <motion.div
//           className="text-center mb-8 sm:mb-10 md:mb-12 relative z-10"
//           initial={{ opacity: 0, y: -20 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             whileInView={{ scale: 1, opacity: 1 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             <h2 className="text-responsive-2xl font-bold text-blue-900 mb-3 sm:mb-4 inline-block relative leading-tight">
//               EL vs ELB Series Comparison
//               <motion.div
//                 className="absolute -bottom-1 sm:-bottom-2 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400"
//                 initial={{ scaleX: 0, opacity: 0 }}
//                 whileInView={{ scaleX: 1, opacity: 1 }}
//                 transition={{ duration: 0.8, delay: 0.2 }}
//                 viewport={{ once: true }}
//               />
//             </h2>
//           </motion.div>
//           <motion.p
//             className="mt-4 sm:mt-6 text-responsive-lg text-gray-700 max-w-2xl mx-auto font-medium leading-relaxed"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.7, delay: 0.3 }}
//             viewport={{ once: true }}
//           >
//             Understand the key differences between our product lines
//           </motion.p>
//         </motion.div>

//         {/* Comparison Cards - Mobile-optimized */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 relative z-10">
//           {/* EL Series Card */}
//           <motion.div
//             className="bg-white border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             viewport={{ once: true, margin: "-50px" }}
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
//                 <span className="text-xl sm:text-2xl font-extrabold text-blue-600">EL</span>
//               </div>
//               <div className="text-center sm:text-left">
//                 <h3 className="text-responsive-xl font-bold text-blue-800 mb-1">EL Series</h3>
//                 <p className="text-responsive-base text-blue-700">Standard UPS Solution</p>
//               </div>
//             </div>
//             <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
//               {[
//                 'power factor for maximum efficiency',
//                 'Compact tower form factor',
//                 'Available in 1kVA and 2kVA capacities',
//                 'Ideal for small office environments',
//                 'Standard battery configuration',
//                 'Online Double conversion technology',
//                 '> 91% efficiency in Online mode'
//               ].map((feature, index) => (
//                 <li key={index} className="flex items-start">
//                   <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3 w-5 h-5 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
//                     <Check size={12} className="sm:w-3.5 sm:h-3.5" />
//                   </span>
//                   <span className="text-gray-700 text-responsive-sm font-medium leading-relaxed">{feature}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
//               <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-responsive-base">Ideal For:</h4>
//               <p className="text-gray-700 text-responsive-sm leading-relaxed">Small offices, workstations, and environments with stable power conditions</p>
//             </div>
//           </motion.div>

//           {/* ELB Series Card */}
//           <motion.div
//             className="bg-white border border-blue-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow duration-200"
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5, delay: 0.1 }}
//             viewport={{ once: true, margin: "-50px" }}
//           >
//             <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
//               <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-100 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-0 sm:mr-4 mx-auto sm:mx-0">
//                 <span className="text-xl sm:text-2xl font-extrabold text-blue-700">ELB</span>
//               </div>
//               <div className="text-center sm:text-left">
//                 <h3 className="text-responsive-xl font-bold text-blue-800 mb-1">ELB Series</h3>
//                 <p className="text-responsive-base text-blue-700">Advanced UPS Solution</p>
//               </div>
//             </div>
//             <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
//               {[
//                 'power factor for optimal performance',
//                 'Extended battery options available',
//                 'Available in 1kVA, 2kVA, 3kVA capacities',
//                 'Customizable battery configuration',
//                 'Higher efficiency in battery mode (93%)',
//                 'Advanced battery management system',
//                 'Comprehensive protection features'
//               ].map((feature, index) => (
//                 <li key={index} className="flex items-start">
//                   <span className="flex-shrink-0 mt-1 mr-2 sm:mr-3 w-5 h-5 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center">
//                     <Check size={12} className="sm:w-3.5 sm:h-3.5" />
//                   </span>
//                   <span className="text-gray-700 text-responsive-sm font-medium leading-relaxed">{feature}</span>
//                 </li>
//               ))}
//             </ul>
//             <div className="bg-blue-50 p-3 sm:p-4 rounded-lg border border-blue-100">
//               <h4 className="font-bold text-blue-800 mb-1 sm:mb-2 text-responsive-base">Ideal For:</h4>
//               <p className="text-gray-700 text-responsive-sm leading-relaxed">Critical equipment, server rooms, and environments with unstable power conditions</p>
//             </div>
//           </motion.div>
//         </div>


//       </section>

//       {/* Contact Information Section - Mobile-optimized */}
//       <section className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 mb-12 sm:mb-16 md:mb-20">
//         <motion.div
//           className="bg-blue-100 rounded-xl sm:rounded-2xl overflow-hidden"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.7 }}
//           viewport={{ once: true, margin: "-50px" }}
//         >
//           <div className="py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 text-center">
//             <motion.h2
//               className="text-responsive-2xl font-bold text-blue-700 mb-3 sm:mb-4 md:mb-6 leading-tight"
//               initial={{ opacity: 0, y: -10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.2 }}
//               viewport={{ once: true }}
//             >
//               Need More Information?
//             </motion.h2>

//             <motion.p
//               className="text-black-50 max-w-3xl mx-auto mb-6 sm:mb-8 text-responsive-base leading-relaxed"
//               initial={{ opacity: 0, y: 10 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5, delay: 0.3 }}
//               viewport={{ once: true }}
//             >
//               Our team of experts is ready to help you with product specifications, custom solutions, pricing, and
//               any other details you need about the KRYKARD UPS systems.
//             </motion.p>

//             <motion.div
//               className="flex justify-center"
//               initial={{ opacity: 0, scale: 0.9 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 0.5, delay: 0.4 }}
//               viewport={{ once: true }}
//             >
//               <a
//                 href="/contact/sales"
//                 className="touch-target inline-flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-6 sm:px-8 rounded-lg transition-colors duration-300 text-responsive-base min-h-[48px] shadow-lg hover:shadow-xl"
//               >
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
//                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                 </svg>
//                 <span>Get a Quote</span>
//               </a>
//             </motion.div>
//           </div>
//         </motion.div>
//       </section>
//     </PageLayout>
//   );
// };

// export default ELBSeriesUPS;