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

const EarthLoopTesterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'ca6417', model: 'CA 6417', subtitle: 'Clamp-On Earth Loop Tester' },
    { id: 'ca6418', model: 'CA 6418', subtitle: 'Advanced Clamp-On Earth Tester' }
  ];

  // Complete product data
  const productData = {
    'ca6417': {
      id: 'ca6417',
      model: 'CA 6417',
      subtitle: 'Clamp-On Earth Loop Tester',
      image: '/earth_loop_testers/CA 6417.png',
      images: [
        '/earth_loop_testers/CA 6417.png'
      ],
      voltage: 'CAT III 300V',
      measurement: 'Earth Loop Testing',
      accuracy: '0.01Ω to 1200Ω',
      price: 'Contact for pricing',
      description: 'Non-invasive clamp-on tester for fast, safe earth resistance measurement without disconnecting the ground system. Advanced technology for reliable testing.',
      keyFeatures: [
        'Clamp-on measurement for non-invasive testing',
        'Automatic self-calibration',
        'Large LCD display with backlight',
        'Measures earth resistance and leakage current',
        'Memory for up to 300 measurements',
        'Alarm function for threshold monitoring',
        'Robust, portable design',
        'Data hold and min/max functions',
        'Auto power-off feature',
        'Weather-resistant construction'
      ],
      technicalSpecs: {
        "Loop resistance": "0.01 Ω to 1,500 Ω",
        "Loop inductance": "10 μH to 500 μH",
        "Leakage current measurement": "0.2 mA to 40 A",
        "Ground voltage measurement": "0.1 V to 75 V",
        "Frequency": "Measurement at 2,083 Hz, transposition at 50/60/128/2083 Hz",
        "Display": "OLED, 48 × 39 mm active area, 152 segments, wide viewing angle",
        "Jaw opening": "Ø 35 mm",
        "Memory": "2,000 measurements with time/date stamping",
        "Communication": "Bluetooth (class 2), compatible with DataView® software",
        "Alarms": "Programmable on resistance (Ω), current (A), and voltage (V)",
        "Safety": "IEC 61010, 600 V CAT IV",
        "Protection": "IP40",
        "Power supply": "4 × AA (LR6) alkaline or NiMH batteries",
        "Battery life": "~1,440 measurements (30 s each)",
        "Dimensions / Weight": "262 × 95 × 55 mm / ~935 g (with batteries)"
      },
      applications: [
        'Ground system verification',
        'Industrial plant maintenance',
        'Lightning protection system testing',
        'Utility and substation testing',
        'Electrical installation verification',
        'Equipment grounding assessment'
      ],

    },
    'ca6418': {
      id: 'ca6418',
      model: 'CA 6418',
      subtitle: 'Advanced Clamp-On Earth Tester',
      image: '/earth_loop_testers/CA 6418.png',
      images: [
        '/earth_loop_testers/CA 6418.png'
      ],
      voltage: 'CAT III 300V',
      measurement: 'Advanced Earth Testing',
      accuracy: '0.01Ω to 2000Ω',
      price: 'Contact for pricing',
      description: 'Advanced clamp-on earth tester with Bluetooth communication and extended measurement range for professional applications requiring enhanced connectivity.',
      keyFeatures: [
        'Bluetooth communication for data transfer',
        'Extended measurement range up to 2000Ω',
        'Automatic self-calibration',
        'Large LCD display with advanced features',
        'Measures earth resistance and leakage current',
        'Enhanced alarm and memory functions',
        'Rugged, ergonomic design',
        'PC software compatibility',
        'Real-time data monitoring',
        'Professional reporting capabilities'
      ],
      technicalSpecs: {
        "Loop resistance": "0.01 Ω to 1.200 Ω",
        "Resolution": "1 mΩ to 50 Ω (range dependent)",
        "Accuracy": "±(1.5%R + 0.01 Ω) to ±(20%R + 2r)",
        "No-load voltage": "≤ 4.5 mV @ 2,083 Hz",
        "Current measurement": "0.5 mA to 20 A",
        "Resolution (current)": "50 μA to 100 mA (range dependent)",
        "Accuracy (current)": "±(2%R + resolution)",
        "Display": "OLED, 152 segments, 48 × 39 mm active area",
        "Storage": "300 time/date-stamped measurements",
        "Jaw opening": "Oblong clamp, suitable for rectangular bars Ø32 mm / 30 × 40 mm",
        "Functions": "Auto hold (when clamp opens), auto calibration, alarms (Ω & A)",
        "Power supply": "4 × 1.5 V LR6 AA or NiMH batteries",
        "Battery life": "~2,400 measurements (30 s each)",
        "Safety": "IEC 61010, 100 V CAT IV / 150 V CAT III",
        "Protection": "IP40",
        "Dimensions / Weight": "300 × 106 × 56 mm / ~1.2 kg (incl. batteries)"
      },
      applications: [
        'Ground system verification',
        'Industrial plant maintenance',
        'Lightning protection system testing',
        'Utility and substation testing',
        'Electrical installation verification',
        'Equipment grounding assessment',
        'Power quality analysis'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ca6417': {
      title: "KRYKARD CA 6417 | Earth Loop Testers",
      description: "KRYKARD CA 6417 clamp-on earth loop tester with Bluetooth connectivity, using non-invasive clamp technology for safe and accurate ground loop testing.",
      keywords: "CA 6417, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6417"
    },
    'ca6418': {
      title: "KRYKARD CA 6418 | Earth Loop Testers",
      description: "KRYKARD CA 6418 advanced clamp-on earth tester with oblong head design, delivering accurate 2-pole, 3-pole and 4-pole ground resistance testing.",
      keywords: "CA 6418, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6418"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/earth-loop-testers');
    }
  }, [product, navigate]);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
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
    title: `${product.model} - ${product.subtitle} | Earth Loop Testers`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "earth loop testers, electrical testing, ground resistance",
    slug: product.id.toLowerCase()
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

  // Feature icon logic similar to OscilloscopeProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data') || feature.toLowerCase().includes('logging')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('bluetooth')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power') && !feature.toLowerCase().includes('measurement')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal') || feature.toLowerCase().includes('weather')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('clamp')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('bandwidth') || feature.toLowerCase().includes('sample') || feature.toLowerCase().includes('range') || feature.toLowerCase().includes('calibration')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('isolated') || feature.toLowerCase().includes('alarm') || feature.toLowerCase().includes('protection')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('monitoring') || feature.toLowerCase().includes('reporting') || feature.toLowerCase().includes('software')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/earth-loop-testers/product/${product.id}`}
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
                  Earth Loop Testers
                </h2>
                <p className="typography-h4 text-black">
                  Professional Earth Loop Testing Solutions
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
                              navigate(`/measure/earth-loop-testers/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/earth-loop-testers')}
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
                        <h4 className="font-semibold text-black mb-1">Range</h4>
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
                      <button
                        onClick={() => window.open(productId === 'ca6417' ? '/CA6416-6417p.pdf' : '/CA6418p.pdf', '_blank')}
                        className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
                        style={{ backgroundColor: '#F5C842' }}
                      >
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
                        alt={`KRYKARD ${product.model} - ${product.subtitle} - for Non-Invasive Ground Resistance Test`}
                          width={800}
                          height={800}
                          loading="eager"
                          decoding="async"

                        className="w-full h-auto object-contain"
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
                  Our specialists provide comprehensive guidance on earth loop testing solutions
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

export default EarthLoopTesterProduct;