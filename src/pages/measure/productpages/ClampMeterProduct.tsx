import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Download,
  Phone,
  Zap,
  Monitor,
  Database,
  Wifi,
  Battery,
  Thermometer,
  ChevronDown,
  Gauge,
  Shield,
  BarChart,
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

const ClampMeterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'f205-f404-f604', model: 'F205/F404/F604', subtitle: 'Power Clamp Meter' },
    { id: 'f406-f606', model: 'F406/F606', subtitle: 'Solar Clamp Meter' },
    { id: 'f407-f607', model: 'F407/F607', subtitle: 'Power & Harmonics Clamp Meter' }
  ];

  // Complete product data
  const productData = {
    'f205-f404-f604': {
      id: 'f205-f404-f604',
      model: 'F205/F404/F604',
      subtitle: 'Power Clamp Meter',
      image: '/clammeter/F205.png',
      images: [
        '/clammeter/F205.png',
        '/clammeter/F404.png',
        '/clammeter/F404 -2.png',
        '/clammeter/F604.png'
      ],
      voltage: 'Up to 1,200V AC/1,700V DC',
      measurement: 'Power & Energy',
      accuracy: '1% + 3 counts',
      price: 'Contact for pricing',
      description: 'The Power Clamp Meter series offers professional-grade, true RMS measurement for both AC and DC, with advanced power analysis and robust safety features for industrial and commercial use.',
      keyFeatures: [
        'True RMS reading on AC and AC+DC',
        'AC and DC voltage up to 1,000 V',
        'Current: up to 2,000 A AC / 3,000 A DC',
        'Measures kW, kVAr, kVA & PF',
        'Auto range, Hold & Auto power off',
        'IP 40 (F205), IP 54 (F404 & F604)',
        'Digital display with backlight',
        'Data hold and memory functions',
        'Temperature measurement capability',
        'Compact ergonomic design'
      ],
      technicalSpecs: {
        "Clamping diameter": "48 mm",
        "Current": "1,000 A AC / 1,500 A DC",
        "Voltage": "Up to 1,200 VAC / 1,700 VDC",
        "Resistance and continuity": "Resistance and audible continuity",
        "Temperature": "Temperature measurement",
        "AC/DC detection": "Automatic AC/DC detection",
        "TrueInrush": "TrueInrush current measurement",
        "Hold_Min_Max": "Hold, Min, MAX",
        "Measurements": "Relative (ΔX) and differential (ΔX/X) measurements",
        "Adapter function": "Adapter function",
        "Safety rating": "CAT IV 1,000 V / CAT III 1,500 V",
        "Protection": "IP54 protection rating"
      },
      applications: [
        'Electrical installation testing',
        'Industrial maintenance',
        'Power quality analysis',
        'Panel diagnostics',
        'Energy audits',
        'Motor testing and diagnostics'
      ],

    },
    'f406-f606': {
      id: 'f406-f606',
      model: 'F406/F606',
      subtitle: 'Solar Clamp Meter',
      image: '/clammeter/F406.png',
      images: [
        '/clammeter/F406.png',
        '/clammeter/f406_2-01.png',
        '/clammeter/F606.png',
        '/clammeter/f606_1-01.png'
      ],
      voltage: 'Up to 1,200V AC/1,700V DC',
      measurement: 'Solar Power & Energy',
      accuracy: '1% + 3 counts',
      price: 'Contact for pricing',
      description: 'The Solar Clamp Meter series is designed for photovoltaic and renewable energy applications, supporting high DC voltages and advanced power measurements for solar professionals.',
      keyFeatures: [
        'Specially designed for Photo voltaic applications',
        'True RMS reading on AC and AC+DC',
        'AC and DC voltage up to 1,700 V DC',
        'Current: up to 2,000 A AC / 3,000 A DC',
        'Measures kW, kVAr, kVA & PF',
        'PV specific features',
        'High DC voltage capability',
        'Solar panel testing functions',
        'Environmental resistant design',
        'Professional grade accuracy'
      ],
      technicalSpecs: {
        "Clamping diameter": "48 mm",
        "Current": "1,000 A AC / 1,500 A DC",
        "Voltage": "Up to 1,200 VAC / 1,700 VDC",
        "Resistance and continuity": "Resistance and audible continuity",
        "Power values": "W, VAr, VA, PF and Harmonic Distortion",
        "Phase rotation": "\"2-wire\" phase rotation",
        "Measurements": "Relative (ΔX) and Differential (ΔX/X) measurements",
        "Diode test": "Diode test",
        "AC/DC detection": "Automatic AC/DC detection",
        "TrueInrush": "True-inrush current measurement",
        "Hold_Min_Max_Peak": "Hold, Min, MAX, Peak+ / Peak-",
        "Safety rating": "CAT IV 1,000 V / CAT III 1,500 V",
        "Protection": "IP54 protection rating"
      },
      applications: [
        'Solar power system monitoring',
        'Renewable energy troubleshooting',
        'PV installation verification',
        'High-voltage DC measurement',
        'Energy audits',
        'Solar farm maintenance'
      ],

    },
    'f407-f607': {
      id: 'f407-f607',
      model: 'F407/F607',
      subtitle: 'Power & Harmonics Clamp Meter',
      image: '/clammeter/F407.png',
      images: [
        '/clammeter/F407.png',
        '/clammeter/f407_f962_1-01.png',
        '/clammeter/F607.png'
      ],
      voltage: 'Up to 1,000V',
      measurement: 'Power & Harmonics',
      accuracy: '1% + 3 counts',
      price: 'Contact for pricing',
      description: 'The Power & Harmonics Clamp Meter series provides advanced harmonic analysis, Bluetooth communication, and data logging for in-depth power quality troubleshooting.',
      keyFeatures: [
        'True RMS reading on AC and AC+DC',
        'Harmonics up to 25th order',
        'Bluetooth Communication',
        'Data recording & PC interface',
        'Measures kW, kVAr, kVA, PF & DPF',
        'Auto range, Hold & Auto power off',
        'Advanced harmonic analysis',
        'Power quality assessment',
        'Wireless data transfer',
        'Professional reporting software'
      ],
      technicalSpecs: {
        'Current': '1,000 AAC / 1,500 ADC',
        'Voltage': 'AC and DC voltage up to 1,000 V',
        'Power values': 'W / VA / var, PF & DPF',
        'Harmonic Distortion': 'Yes',
        'Harmonics': 'Up to 25th order',
        'Resistance and continuity': 'Resistance and audible continuity',
        'Analysis': 'Analysis of Min, Max and Peak± on all functions',
        'TrueInrush current measurement': 'Yes',
        'Data recording': 'Yes',
        'Communication': 'Bluetooth interface and PC software'
      },
      applications: [
        'Power quality analysis',
        'Industrial equipment monitoring',
        'Harmonic troubleshooting',
        'Data logging and analysis',
        'Panel diagnostics',
        'Motor drive testing',
        'UPS system analysis'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'f205-f404-f604': {
      title: "KRYKARD F205/F404/F604 | Clamp Meters",
      description: "KRYKARD F205/F404/F604 - Power Clamp Meter with True RMS Measurement — clamp meter delivering accurate non‑intrusive current measurement.",
      keywords: "power, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "f205-f404-f604"
    },
    'f406-f606': {
      title: "KRYKARD F406/F606 | Clamp Meters",
      description: "KRYKARD F406/F606 solar clamp meters for photovoltaic applications deliver accurate non-intrusive current measurement and advanced power analysis.",
      keywords: "solar, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "f406-f606"
    },
    'f407-f607': {
      title: "KRYKARD F407/F607 | Clamp Meters",
      description: "KRYKARD F407/F607 power and harmonics clamp meters with Bluetooth connectivity deliver accurate non-intrusive current measurement.",
      keywords: "harmonics, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "f407-f607"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/clamp-meters');
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
    title: `${product.model} - ${product.subtitle} | Clamp Meters`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "clamp meters, electrical testing, current measurement",
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

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Get fallback image
  const getFallbackImage = () => {
    return 'https://via.placeholder.com/300x200/FFD700/000000?text=No+Image';
  };

  // Feature icon logic similar to OscilloscopeProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data') || feature.toLowerCase().includes('logging')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('bluetooth')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power') && !feature.toLowerCase().includes('measurement')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('channels')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('bandwidth') || feature.toLowerCase().includes('sample') || feature.toLowerCase().includes('harmonics') || feature.toLowerCase().includes('measurement')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('isolated') || feature.toLowerCase().includes('ip')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('triggering') || feature.toLowerCase().includes('waveform') || feature.toLowerCase().includes('pv') || feature.toLowerCase().includes('solar')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/clamp-meters/product/${product.id}`}
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
                <h2 className="typography-h1 text-black mb-2">
                  Clamp Meters
                </h2>
                <p className="typography-h4 text-black">
                  Professional Clamp Meter Solutions
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
                              navigate(`/measure/clamp-meters/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/clamp-meters')}
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
                        <h4 className="font-semibold text-black mb-1">Voltage Range</h4>
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
                      <button onClick={() => window.open('/F_Clamp_Seriesp.PDF', '_blank')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
                        <Download className="h-5 w-5" />
                        <span>View Brochure</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full" style={{ maxWidth: '400px' }}>
                    {product.images && product.images.length > 1 ? (
                      <Carousel
                        images={product.images}
                        className="w-full h-full"
                        theme="yellow"
                      />
                    ) : (
                      <img
                        src={imageError ? getFallbackImage() : product.image}
                        alt={`KRYKARD ${product.model} - ${product.subtitle} - Clamp Meter for ${product.measurement} Measurement`}
                        className="w-full object-contain"
                        style={{
                          maxHeight: '400px',
                          width: 'auto',
                          height: 'auto',
                          background: 'transparent',
                          mixBlendMode: imageError ? 'normal' : 'multiply',
                          filter: imageError ? 'none' : 'brightness(1.1) contrast(1.1)',
                          opacity: '0.95',
                          margin: '0 auto' // center
                        }}
                        onError={handleImageError}
                        onLoad={() => setImageError(false)}
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
                  Need Expert Advice?
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-10 font-medium">
                  Our specialists provide comprehensive guidance on clamp meter solutions
                </p>
                <button
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-base mx-auto"
                  onClick={() => navigate('/contact/sales')}
                >
                  <Phone className="h-5 w-5" />
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

export default ClampMeterProduct;