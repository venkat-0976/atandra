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

const OscilloscopeProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'ox5022-ox5042', model: 'OX 5022/OX 5042', subtitle: 'Handheld Digital Oscilloscope' },
    { id: 'ox9062-ox9102-ox9104-ox9304', model: 'OX 9062/OX 9102/OX 9104/OX 9304', subtitle: 'Portable Digital Oscilloscope' }
  ];

  // Complete product data
  const productData = {
    'ox5022-ox5042': {
      id: 'ox5022-ox5042',
      model: 'OX 5022/OX 5042',
      subtitle: 'Handheld Digital Oscilloscope',
      image: '/oscillosacopes old/OX 5042 , OX 5022.png',
      images: [
        '/ox5022-01.png',
        '/oscillosacopes old/OX 5042 , OX 5022.png'

      ],
      voltage: 'CAT III 600V',
      measurement: 'Oscilloscope + Multimeter',
      accuracy: '20-40 MHz Bandwidth',
      //price: 'Contact for pricing',
      brochureUrl: '/OX5022Bp.pdf',
      description: 'Compact handheld oscilloscope with multimeter functions, designed for field measurements and troubleshooting applications with isolated channels for safety.',
      keyFeatures: [
        '3.5" colour TFT - Resolution 320 x 240',
        'LED backlighting',
        'Screen shot - Upto 100 files',
        'PC interface',
        '2 isolated channels',
        'Input impedance: 1 MΩ ±0.5%',
        '2 MB for file storage',
        '2,500 real acquisition points on screen'
      ],
      technicalSpecs: {
        'Oscilloscope bandwidth': '20 MHz (OX5022B) / 40 MHz (OX5042B)',
        'Channels': '2 isolated, 600 V CAT III',
        'Sampling rate': '2 GS/s (ETS), 50 MS/s (one-shot)',
        'Vertical sensitivity': '5 mV/div to 200 V/div',
        'Sweep speed': '25 ns/div to 200 s/div',
        'Memory depth': '2,500 points per channel',
        'Math functions': '+, -, ×, ÷, inversion; auto scaling',

        'Multimeter mode': '2 × 8,000-count, AC/DC/AC+DC V & I, resistance, continuity, capacitance, frequency, temperature, diode, power',
        'Harmonic analysis': 'Up to 31st order, 40–450 Hz fundamental',
        'Display': '3.5" TFT colour LCD (320×240), LED backlight',
        'Recording': '2,700 measurements (5 min–1 month)',
        'Communication': 'Optically-isolated USB, SCPI protocol, SX-Metro software',
        'Power supply': '6×AA NiMH / LR6 batteries, up to 8.5 h runtime',
        'Protection': 'IEC 61010-1, 600 V CAT III, EMC compliant',
        'Dimensions / Weight': '214 × 110 × 57 mm / 1.2 kg',
        'Accessories': 'Probes, leads, clips, USB charger, optical cable, carrying bag'
      },
      applications: [
        'Field service and maintenance',
        'Automotive diagnostics',
        'Industrial troubleshooting',
        'Educational applications',
        'Power electronics testing',
        'Electrical installation testing'
      ],

    },
    'ox9062-ox9102-ox9104-ox9304': {
      id: 'ox9062-ox9102-ox9104-ox9304',
      model: 'OX 9062/OX 9102/OX 9104/OX 9304',
      subtitle: 'Portable Digital Oscilloscope',
      image: '/oscilloscpoes ox 9104,9304/9J9A3371.JPG',
      images: [
        '/oscillosacopes old/OX 9062-2.png',
        '/ox9102-01.png',
        '/ox9102-03.png'
      ],
      voltage: 'CAT II 300V',
      measurement: 'Advanced Oscilloscope',
      accuracy: '60-300 MHz Bandwidth',
      price: 'Contact for pricing',
      brochureUrl: '/OX9062p.pdf',
      description: 'High-performance portable oscilloscope with advanced triggering, analysis capabilities and comprehensive measurement functions including harmonic analysis.',
      keyFeatures: [
        '7" WVGA colour TFT LCD touch screen, 800 x 480',
        'LED backlighting',
        '2,500 real acquisition points on screen',
        'PC interface',
        '2 or 4 isolated channels',
        'Input impedance: 1 MΩ ± 0.5%',
        '20 automatic measurements per channel',
        'Memory 2GB'
      ],
      technicalSpecs: {
        'Display': '7" WVGA TFT colour touchscreen (800 × 480), LED backlit',
        'Channels': '2 isolated, 600 V CAT III (Probix connectors)',
        'Bandwidth': '60 MHz',
        'Sampling rate': '2.5 GS/s (one-shot), 100 GS/s (ETS)',
        'Vertical sensitivity': '2.5 mV/div to 200 V/div (16 ranges, 12-bit resolution)',
        'Sweep speed': '1 ns/div to 200 s/div, Roll mode 100 ms–200 s/div',
        'Memory depth': '100 kpts/channel',
        'Triggering': 'Edge, pulse width, delay, counting; auto, normal, single',
        'Math/FFT': '+, -, ×, ÷, advanced math editor, 2,500-point FFT (linear/log, up to 80 dB dynamic)',

        'Automatic measurements': '20 per channel, with cursors & reference deviation',
        'Multimeter mode': '2-channel TRMS, 8,000 counts, AC/DC/AC+DC V & I, resistance, continuity, capacitance, frequency, diode, temperature (K, Pt100)',
        'Power analysis': 'Single & 3-phase power (active, reactive, apparent, PF)',
        'Harmonic analysis': '2 channels, up to 63rd order, 40–450 Hz, THD & phase',
        'Logger mode': '100,000 measurements, interval from 0.2 s to 20,000 s',
        'Storage': '1 GB internal + microSD (up to 32 GB SDHC / >32 GB SDXC)',
        'Connectivity': 'USB (device), Ethernet (100BaseT), Wi-Fi, ScopeNet software',
        'Safety': 'IEC 61010-2-30, 600 V CAT III / 1000 V CAT II, IP54, EMC EN61326-1',

        'Power supply': 'Li-ion rechargeable 6,900 mAh, ~8 h operation, fast charge 2 h',
        'Dimensions / Weight': '292.5 × 210.6 × 66.2 mm / 2.1 kg'
      },
      applications: [
        'R&D and design verification',
        'Production testing',
        'Quality control',
        'Educational laboratories',
        'Service and repair',
        'Power quality analysis',
        'Harmonic analysis'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ox5022-ox5042': {
      title: "KRYKARD OX 5022/OX 5042 | Oscilloscopes",
      description: "KRYKARD OX 5022/OX 5042 - Handheld Digital Oscilloscope with Multimeter Functions — digital oscilloscope providing advanced waveform analysis.",
      keywords: "handheld, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ox5022-ox5042"
    },
    'ox9062-ox9102-ox9104-ox9304': {
      title: "KRYKARD OX 9062/OX 9102/OX 9104/OX 9304 | Oscilloscopes",
      description: "KRYKARD OX 9062/OX 9102/OX 9104/OX 9304 portable digital oscilloscopes provide advanced features for accurate waveform analysis and diagnostics..",
      keywords: "portable, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ox9062-ox9102-ox9104-ox9304"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/oscilloscopes');
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
    title: `${product.model} - ${product.subtitle} | Oscilloscopes`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "oscilloscopes, electrical testing, signal measurement",
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

  // Feature icon logic similar to MultimeterProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('channels')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('bandwidth') || feature.toLowerCase().includes('sample') || feature.toLowerCase().includes('harmonics')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('isolated')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('triggering') || feature.toLowerCase().includes('waveform')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/oscilloscopes/product/${product.id}`}
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
                  Oscilloscopes
                </h2>
                <p className="typography-h4 text-black">
                  Professional Signal Measurement Solutions
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
                              navigate(`/measure/oscilloscopes/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/oscilloscopes')}
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
              <div className="flex flex-col md:flex-row justify-center items-center md:items-center gap-6 md:gap-8">
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
                        <h4 className="font-semibold text-black mb-1">Bandwidth</h4>
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
                  <div className="w-full mx-auto flex items-center justify-center" style={{ minHeight: '400px', maxWidth: '500px' }}>
                    {product.images && product.images.length > 1 ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Carousel
                          images={product.images}
                          className="w-full"
                          theme="yellow"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={`KRYKARD ${product.model} - ${product.subtitle}`}
                          className="w-full h-auto object-contain mx-auto"
                          width={320}
                          height={240}
                           loading="eager"
                           decoding="async"
                          style={{
                            maxHeight: '450px',
                            maxWidth: '100%',
                            background: 'transparent',
                            mixBlendMode: 'multiply',
                            filter: 'brightness(1.05) contrast(1.05)',
                            opacity: '0.95'
                          }}
                        />
                      </div>
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

          {/* Technical Specifications Section - Simple Style */}
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
                <div className="px-8 py-6">
                  <div className="space-y-6">
                    {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className="flex items-baseline gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                        </div>
                        <div className="flex-grow">
                          <span className="font-medium text-gray-900">{key}</span>
                          <span className="mx-2 text-gray-600">:</span>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      </div>
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
                  Our specialists provide comprehensive guidance on oscilloscope solutions
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

export default OscilloscopeProduct;
