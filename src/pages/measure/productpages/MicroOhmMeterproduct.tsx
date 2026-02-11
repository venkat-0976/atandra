import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Download,
  Mail,
  Phone,
  Zap,
  Monitor,
  Database,
  Wifi,
  Battery,
  Thermometer,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Shield,
  Gauge,
  BarChart
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

const MicroOhmMeterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Complete product data with individual brochure URLs
  const productData = {
    ca6240: {
      id: 'ca6240',
      model: 'CA 6240',
      subtitle: '10A Micro-Ohmmeter',
      image: '/Ohm meters/CA 6240.png',
      images: [
        '/Ohm meters/CA 6240.png'
      ],
      voltage: 'CAT III 600V',
      measurement: '10A Testing',
      accuracy: '±0.25% ± 2 counts',
      price: 'Contact for pricing',
      brochureUrl: '/CA6240p.pdf', // Individual brochure URL
      description: 'The CA 6240 is a precision micro-ohmmeter designed for accurate measurement of very low resistances. Perfect for testing circuit breakers, transformer windings, and motor connections with exceptional reliability.',
      keyFeatures: [
        'Large backlit LCD display for clear readings',
        'Auto measurement mode for ease of use',
        'Automatic recording mode with manual override',
        'Auto power-off function to preserve battery',
        'Memory storage for 100 measurements',
        'Optical/USB communication interface',
        'Complete PC interface software included',
        'Portable and rugged design for field use',
        'Temperature compensation capability',
        'Multiple test current settings'
      ],
      technicalSpecs: {
        'Measurement range': '5 µΩ to 400 Ω',
        'Test current': 'Up to 10 A',
        'Max resolution': '1 µΩ',
        'Automatic power off': 'Yes',
        'Power supply': 'NiMH rechargeable battery',
        'Storage': '100 measurements',
        'Communication': 'USB optical link',
        'Data export software': 'Yes',
        'Protection': 'IP53',
        'Electrical safety': 'IEC 61010-1 CAT III 50 V',
        'Dimensions': '273 x 247 x 280 mm',
        'Weight': '5 kg'

      },
      applications: [
        'Circuit breaker contact resistance testing',
        'Transformer winding resistance measurement',
        'Motor and generator winding testing',
        'Cable and conductor resistance verification',
        'Welding quality control testing',
        'Electrical connection integrity checks'
      ],

    },
    ca6255: {
      id: 'ca6255',
      model: 'CA 6255',
      subtitle: '10A Advanced Micro-Ohmmeter',
      image: '/Ohm meters/CA 6255.png',
      images: [
        '/Ohm meters/CA 6255.png'
      ],
      voltage: 'CAT III 700V',
      measurement: '10A Testing',
      accuracy: '±0.25% ± 2 counts',
      //price: 'Contact for pricing',
      brochureUrl: '/CA6255p.pdf', // Individual brochure URL
      description: 'The CA 6255 represents the next generation of micro-ohmmeters with enhanced features including automatic discharge system and expanded memory capacity for professional testing applications.',
      keyFeatures: [
        'Large backlit LCD display with enhanced visibility',
        'Auto measurement mode with intelligent detection',
        'Automatic discharge system for safety',
        'Auto power-off with configurable timing',
        'Extended memory for 1,500 measurements',
        'RS 232 communication interface',
        'Advanced PC interface software',
        'Enhanced safety features and protection',
        'Multiple test current options',
        'Temperature measurement capability'
      ],
      technicalSpecs: {
        'Measurement range': '1 µΩ to 2500 Ω (7 ranges)',
        'Resolution': '0.1 µΩ to 100 mΩ (range dependent)',
        'Accuracy': '±(0.05–0.15% + offset, range dependent)',
        'Test current': '10 A, 1 A, 100 mA, 10 mA, 1 mA (range dependent)',
        'Voltage drop': '50 mV to 2500 mV (range dependent)',
        'Temperature measurement': '3-wire 100 Ω RTD, ±0.5 °C accuracy, 0.1 °C resolution',
        'Selectable metal type': 'Copper, Aluminum, or custom',
        'Test modes': 'Resistive (instantaneous), Inductive (continuous), Auto (repetitive)',
        'Alarms': 'High/low triggers',
        'Memory': '1500 tests, DataView software included for download & reporting',
        'Battery': '6 V, 8.5 Ah NiMH rechargeable; ≥5000 tests at 10 A per charge',
        'Charger': '120/240 V AC ±20%, 45–400 Hz',
        'Overload protection': '250 V rms',
        'Protection': 'IP64 (cover closed) / IP53 (cover open)',
        'Safety': 'IEC/EN 61010-1, 50 V CAT III, Pollution 2',
        'Dimensions / Weight': '272 × 248 × 182 mm / 3.69 kg'

      },
      applications: [
        'Power system maintenance and testing',
        'Industrial equipment quality control',
        'Electrical installation verification',
        'Preventive maintenance programs',
        'Research and development testing',
        'Educational and training applications'
      ],

    },
    ca6292: {
      id: 'ca6292',
      model: 'CA 6292',
      subtitle: '200A High-Current Micro-Ohmmeter',
      image: '/Ohm meters/CA 6292.png',
      images: [
        '/Ohm meters/CA 6292.png'
      ],
      voltage: 'CAT III 1000V',
      measurement: '200A Testing',
      accuracy: '±1%',
      price: 'Contact for pricing',
      brochureUrl: '/CA6292p.pdf', // Individual brochure URL
      description: 'The CA 6292 is a high-current micro-ohmmeter designed for heavy-duty applications requiring up to 200A test current. Features advanced cooling system and comprehensive protection for industrial environments.',
      keyFeatures: [
        'Backlit LCD screen with 4 lines x 20 characters',
        'Internal cooling system for continuous operation',
        'Normal and BSG (Both Sides Grounded) test modes',
        'Advanced protection against surges and overheating',
        'Massive memory capacity for 8,000 measurements',
        'USB communication for fast data transfer',
        'Comprehensive PC interface software',
        'High-current capability up to 200A',
        'Thermal protection system',
        'Professional cable management system'
      ],
      technicalSpecs: {
        'Test current': '5–200 A (true DC)',
        'Resistance range': '0.1 µΩ–1 Ω (three sub-ranges)',
        'Accuracy': '±1% of reading (50 µΩ–1 Ω)',
        'Resolution': '0.1 µΩ to 1 mΩ (range dependent)',
        'Output voltage': '4.2 V @ 200 A (100 VAC input), 8.6 V @ 200 A (220 VAC input)',
        'Max. load resistance': '20 mΩ @ 200 A (100 VAC), 42 mΩ @ 200 A (220 VAC)',
        'Measurement method': 'Four-terminal Kelvin type',
        'Test modes': 'Normal or Both Sides Grounded (BSG)',
        'Adjustable test time': 'Unlimited for ≤100 A; 5–120 s for >100 A',
        'Memory': '8000 measurements; automatic storage of results',
        'Interface': 'USB 2.0; DataView software included for download & reporting',
        'Power supply': '100–240 V AC, 50/60 Hz',
        'Protection': 'IP54 (cover closed)',
        'Safety': 'IEC 61010-1',
        'Dimensions / Weight': '502 × 394 × 190 mm / 11 kg'

      },
      applications: [
        'Heavy industrial equipment testing',
        'Power plant maintenance operations',
        'High-current electrical system testing',
        'Large transformer testing',
        'Generator and motor testing',
        'Critical infrastructure maintenance'
      ],
      advantages: [
        'Ultra-high current capability',
        'Advanced cooling system',
        'Dual test modes (Normal/BSG)',
        'Massive data storage',
        'Comprehensive protection',
        'Professional-grade construction'
      ]
    }
  };

  const product = productData[productId as keyof typeof productData];
  const productList = Object.values(productData);

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ca6240': {
      title: "KRYKARD CA6240 | Micro-Ohmmeter",
      description: "KRYKARD CA 6240 10A micro-ohmmeter with USB communication for accurate low-resistance measurement and testing",
      keywords: "ca6240, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6240"
    },
    'ca6255': {
      title: "KRYKARD CA6255 | Micro-Ohmmeter",
      description: "KRYKARD CA 6255 - 10A Advanced Micro-Ohmmeter with Automatic Discharge System — advanced 10 A micro‑ohmmeter with automatic discharge.",
      keywords: "ca6255, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6255"
    },
    'ca6292': {
      title: "KRYKARD CA6292 | Micro-Ohmmeter",
      description: "KRYKARD CA 6292 200A high-current micro-ohmmeter provides accurate resistance measurement for heavy industrial and high-current testing.",
      keywords: "ca6292, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6292"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/micro-ohmmeters');
    }
  }, [product, navigate]);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `${product.model} - ${product.subtitle} | Micro-Ohmmeter`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "micro ohmmeters, electrical testing, low resistance measurement",
    slug: product.id
  };

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.model,
    "description": product.description || product.subtitle,
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": product.model,
    "image": `https://atandra.in${product.image}`,
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

  // Feature icon logic
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('recording')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('communication') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('rs 232') || feature.toLowerCase().includes('optical')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('power') || feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('auto power')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('cooling') || feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('current') || feature.toLowerCase().includes('test') || feature.toLowerCase().includes('measurement')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('protection') || feature.toLowerCase().includes('discharge')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('mode') || feature.toLowerCase().includes('auto') || feature.toLowerCase().includes('manual')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('software') || feature.toLowerCase().includes('interface') || feature.toLowerCase().includes('pc')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/micro-ohmmeters/${product.id}`}
        ogImage={`https://atandra.in${product.image}`}
        jsonLd={jsonLd}
        preloadImage={product.image}
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {/* Hide Breadcrumbs and Remove Top Padding */}
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        <div className="min-h-screen bg-yellow-50" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {/* Main Title Section */}
          <div className="py-8" style={{ background: '#F5C842' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              {/* Title always at top in mobile, center in desktop */}
              <div className="text-center mb-4 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">
                  Micro-Ohmmeters
                </h2>
                <p className="text-xl text-black font-medium">
                  Precision Resistance Measurement Solutions
                </p>
              </div>
              {/* Responsive flex container for dropdown and back button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
                {/* Dropdown first on mobile, right on desktop */}
                <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:block dropdown-container">
                  <div className="relative w-full md:w-auto group">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-white border border-yellow-400 text-black font-bold py-3 px-6 rounded-xl shadow-md flex items-center space-x-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200 focus:outline-none hover:bg-yellow-50"
                      style={{ fontWeight: 700, fontSize: '1.25rem' }}
                    >
                      <span>{product.model}</span>
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 md:right-auto md:w-80 mt-2 bg-white border border-yellow-400 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                        {productList.map((prod) => (
                          <button
                            key={prod.id}
                            onClick={() => {
                              setDropdownOpen(false);
                              navigate(`/measure/micro-ohmmeters/${prod.id}`);
                            }}
                            className={`w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${prod.id === product.id ? 'bg-yellow-50 font-bold' : ''
                              }`}
                          >
                            <div className="font-bold text-black">{prod.model}</div>
                            <div className="text-sm text-gray-600">{prod.subtitle}</div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* Back button second on mobile, left on desktop */}
                <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
                  <button
                    onClick={() => navigate('/measure/micro-ohmmeters')}
                    className="bg-white border border-yellow-400 text-black font-bold py-2 px-4 rounded-xl shadow-md hover:bg-yellow-50 transition-all duration-200 flex items-center space-x-2 w-full md:w-auto justify-center text-center"
                  >
                    <span>&larr;</span>
                    <span>Back to Products</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Hero Section */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-stretch gap-6 md:gap-8">
                {/* Content Left (on desktop) */}
                <div className="w-full md:w-1/2 max-w-2xl order-2 md:order-1 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 order-1 lg:order-1"
                  >
                    <div className="inline-block px-3 py-1.5 rounded-full text-black font-bold text-xs mb-3" style={{ backgroundColor: '#F5C842' }}>
                      {product.measurement}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
                      {product.model}
                    </h1>
                    <p className="text-lg text-yellow-700 font-semibold mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-base text-black leading-relaxed mb-6">
                      {product.description}
                    </p>
                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Safety Rating</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.voltage}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Accuracy</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.accuracy}</p>
                      </div>
                      {/* <div className="bg-white p-3 rounded-xl shadow-md col-span-2">
                      <h4 className="font-semibold text-black mb-1">Price</h4>
                      <p className="font-bold" style={{ color: '#B8860B' }}>{product.price}</p>
                    </div> */}
                    </div>
                    {/* Action Buttons at Bottom */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button onClick={() => navigate('/contact/sales')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
                        <Phone className="h-5 w-5" />
                        <span>Request Demo</span>
                      </button>
                      <button onClick={() => window.open(product.brochureUrl, '_blank')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
                        <Download className="h-5 w-5" />
                        <span>View Brochure</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full max-w-xs">
                    {product.images && product.images.length > 1 ? (
                      <Carousel
                        images={product.images}
                        className="w-full"
                        theme="yellow"
                      />
                    ) : (
                      <img
                        src={product.image}
                        alt={`KRYKARD ${product.model} - ${product.subtitle} - Micro-Ohmmeter for ${product.measurement} Measurement`}
                        className="w-full h-auto object-contain"
                        style={{
                          maxHeight: '200px',
                          maxWidth: '200px',
                          background: 'transparent',
                          mixBlendMode: 'multiply',
                          filter: 'brightness(1.1) contrast(1.1)',
                          opacity: '0.95'
                        }}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Applications Section - Side by Side */}
          <div className="py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Key Features Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 flex flex-col">
                    <div className="px-6 pb-6 space-y-4 flex-1">
                      {product.keyFeatures.slice(0, 6).map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FeatureIcon feature={feature} />
                          </div>
                          <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Expandable Features */}
                    {product.keyFeatures.length > 6 && (
                      <AnimatePresence>
                        {featuresExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                              {product.keyFeatures.slice(6).map((feature, index) => (
                                <motion.div
                                  key={index + 6}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: index * 0.05 }}
                                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <FeatureIcon feature={feature} />
                                  </div>
                                  <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Show More/Less Button */}
                  {product.keyFeatures.length > 6 && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4 mt-auto">
                      <button
                        onClick={() => setFeaturesExpanded(!featuresExpanded)}
                        className="w-full py-3 px-4 text-black hover:text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 rounded-lg hover:bg-yellow-50 border border-yellow-200 hover:border-yellow-300"
                        style={{ backgroundColor: '#F5C842' }}
                      >
                        {featuresExpanded ? (
                          <>
                            <span>Show Less</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>Show {product.keyFeatures.length - 6} More Features</span>
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* Applications Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                  </div>
                  <div className="px-6 pb-6 flex-1">
                    <div className="space-y-4">
                      {product.applications.map((application, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{application}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section - Centered Below */}
          <div className="py-8 md:py-12 bg-gradient-to-br from-yellow-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
                </div>

                {/* Content */}
                <div className="px-8 pb-8">
                  <div className="space-y-7">
                    {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-2 h-2 mt-2.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <div className="text-[16px] leading-relaxed">
                          <span className="font-semibold text-gray-800">{key}</span>
                          <span className="mx-2 text-gray-800">:</span>
                          <span className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>{value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="py-12 md:py-16 mb-16 md:mb-24 bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-2 border-yellow-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Ready to Experience Precision?
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-10 font-medium">
                  Contact our experts for personalized recommendations and demonstrations
                </p>
                <button
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-base mx-auto"
                  onClick={() => navigate('/contact/sales')}
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Sales</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default MicroOhmMeterProduct;