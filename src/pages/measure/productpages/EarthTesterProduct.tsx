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

const EarthTesterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'ca-6424', model: 'CA 6424', subtitle: '2P/3P Earth Tester' },
    { id: 'ca-6460', model: 'CA 6460', subtitle: '4P Earth Tester' },
    { id: 'ca-6470n', model: 'CA 6470N', subtitle: '3P/4P Earth Tester' },
    { id: 'ca-6472', model: 'CA 6472', subtitle: 'Advanced 3P/4P Earth Tester' }
  ];

  // Complete product data
  const productData = {
    'ca-6424': {
      id: 'ca-6424',
      model: 'CA 6424',
      subtitle: '2P/3P Earth Tester',
      image: '/earth testers/CA 6424.png',
      images: [
        '/earth testers/CA 6424.png'
      ],
      voltage: 'CAT III 600V',
      measurement: '2P/3P Earth Testing',
      accuracy: '±2% + 1 count',
      //price: 'Contact for pricing',
      brochureLink: '/CA6424p.pdf',
      description: 'Professional earth resistance tester with backlit LCD for 2-pole and 3-pole measurements. Ideal for ground system verification and safety testing.',
      keyFeatures: [
        'Backlit custom 206-segment LCD display',
        'Auto Power off for battery conservation',
        'Noise indication for interference detection',
        'Measurement Mode: V, I, R 2P (Ω), R 3P (Ω)',
        'Compact and portable design',
        'Easy to use interface',
        'Accurate measurements up to 50 kΩ',
        'Voltage measurement up to 600V AC',
        'Leakage current measurement',
        'Professional build quality'
      ],
      technicalSpecs: {
        "Voltage": "0 to 600 V",
        "2P resistance": "0.05 Ω to 50 kΩ",
        "3P earth": "0.5 Ω to 50 kΩ",
        "Measurement mode": "One-shot or permanent",
        "RH stake resistance measurement": "Yes",
        "USE voltage measurement": "Yes",
        "Current measurement (G72 clamp)": "0.5 mA to 60 A",
        "Automatic power-off": "Deactivatable",
        "Compliance": "IEC 61557-1 and IEC 61557-4",
        "Power supply": "NiMH batteries rechargeable via mains or USB socket"
      },
      applications: [
        'Ground system verification',
        'Lightning protection system testing',
        'Utility and substation testing',
        'Construction site safety',
        'Electrical installation verification',
        'Equipment grounding assessment'
      ],

    },
    'ca-6460': {
      id: 'ca-6460',
      model: 'CA 6460',
      subtitle: '4P Earth Tester',
      image: '/earth testers/CA 6460.png',
      images: [
        '/earth testers/CA 6460.png',
        '/earth testers/CA 6462.png'
      ],
      voltage: 'CAT III 600V',
      measurement: '4P Earth Testing',
      accuracy: '±2% ± 1 point',
      price: 'Contact for pricing',
      brochureLink: '/CA6460p.pdf',
      description: 'Advanced 4-pole earth resistance and resistivity tester with digital display for precise measurements. Features multiple test methods for comprehensive analysis.',
      keyFeatures: [
        'Large backlit digital display with 2,000 counts',
        '3 fault presence indicators to validate measurement',
        'Battery status indicator',
        'Non Rechargeable/Rechargeable Batteries option',
        'Professional grade accuracy',
        'Multiple test methods support',
        'Robust field case included',
        'Temperature compensation',
        'Data hold function',
        'Wenner method compatibility'
      ],
      technicalSpecs: {
        "Type": "3-in-1 tester: resistivity, earth, coupling between two earths",
        "Measurement range": "0.01 Ω to 2,000 Ω (3 automatic ranges)",
        "Measurement method": "Change from 4-wire to 3-wire method via removable captive bar between E and ES",
        "Fault indicators": "3 fault presence indicators to validate measurement",
        "Measurement frequency": "128 Hz",
        "Connections": "Easy stake connection via colour-coded terminals",
        "Display": "Large backlit digital display with 2,000 counts",
        "Power supply": "8 × 1.5 V batteries, average 4,500 measurements of 15 s each, constant battery check",
        "Protection": "IP53 leakproof case with folding cover and carrying handle",
        "Compliance": "IEC 61557-1 and -5",
        "Electrical safety": "EN 61010",
        "Dimensions": "273 × 247 × 127 mm",
        "Weight": "2.8 kg"
      },
      applications: [
        'Ground system verification',
        'Industrial plant maintenance',
        'Lightning protection system testing',
        'Utility and substation testing',
        'Soil resistivity measurement',
        'Equipment grounding verification'
      ],

    },
    'ca-6470n': {
      id: 'ca-6470n',
      model: 'CA 6470N',
      subtitle: '3P/4P Earth Tester',
      image: '/earth testers/CA 6470N.png',
      images: [
        '/earth testers/CA 6470N.png',
        '/earth testers/CA 6471.png'
      ],
      voltage: 'CAT III 600V',
      measurement: '3P/4P Earth Testing',
      accuracy: '±2% + 1 count',
      price: 'Contact for pricing',
      brochureLink: '/CA6470p.pdf',
      description: 'Multi-function earth and resistivity tester with advanced features for professional use. Features USB communication and extensive memory storage.',
      keyFeatures: [
        'Backlit LCD display featuring 3 simultaneous display levels',
        'Noise interference detection',
        'Alarm function for threshold monitoring',
        'Memory: 512 memory locations',
        'Communication: USB interface',
        'Advanced measurement modes',
        'Professional data logging',
        'Comprehensive analysis tools',
        'User-friendly interface',
        'Rugged construction'
      ],
      technicalSpecs: {
        "Measurement method": "Traditional stake-based methods",
        "Self-diagnosis": "Detects bad connections or disturbance signals before measurement",
        "Measurement range": "0.001 Ω to 100 kΩ",
        "Frequency adjustment": "41 Hz to 512 Hz (3P & 4P measurements)",
        "Power supply": "NiMH rechargeable battery with external charger",
        "Protection": "IP53",
        "Compliance": "IEC 61557-1 -4 -5",
        "Safety": "IEC 61010 50V CAT IV",
        "Dimensions": "272 × 250 × 128 mm",
        "Weight": "3 kg"
      },
      applications: [
        'Ground system verification',
        'Industrial plant maintenance',
        'Lightning protection system testing',
        'Utility and substation testing',
        'Research and development',
        'Quality control testing'
      ],

    },
    'ca-6472': {
      id: 'ca-6472',
      model: 'CA 6472',
      subtitle: 'Advanced 3P/4P Earth Tester',
      image: '/earth testers/CA 6472.png',
      images: [
        '/earth testers/CA 6472.png',
        '/earth testers/CA 6474 with CA 6472.png'
      ],
      voltage: 'CAT III 600V',
      measurement: 'Advanced 3P/4P Testing',
      accuracy: '±2% + 1 count',
      price: 'Contact for pricing',
      brochureLink: '/CA6472p.pdf',
      description: 'Professional earth tester with advanced features for pylons and comprehensive earth system analysis. The most advanced model in the series.',
      keyFeatures: [
        'Backlit LCD display featuring 3 simultaneous display levels',
        'Automatic & Expert mode operation',
        'Earth measurement on Pylons with earth cable (with CA 6474 option)',
        'Alarm function for safety monitoring',
        'Memory: 512-record memory storage',
        'Communication: USB interface',
        'Measurement with CA 6474 Range: 0.001 Ω to 99.9 kΩ',
        'Frequency: 41 to 5078 Hz',
        'Professional analysis software',
        'Advanced reporting capabilities'
      ],
      technicalSpecs: {
        "3P measurement": "Up to 10 kΩ and stray voltages up to 60 V RMS",
        "4P measurement": "Standard and selective",
        "Earth loop measurement": "With 2 clamps from 0.01 Ω to 500 Ω",
        "Storage": "512 test results",
        "USB": "Optical link",
        "Software": "Ground Tester Transfer PC software for data processing",
        "Power supply": "NiMH battery with external charger",
        "Protection": "IP53",
        "Compliance": "IEC 61557-1 -4 -5",
        "Safety": "IEC 61010 50V CAT IV",
        "Dimensions": "272 × 250 × 128 mm",
        "Weight": "3 kg"
      },
      applications: [
        'Research and development',
        'Utility and substation testing',
        'Industrial plant maintenance',
        'Lightning protection system testing',
        'Power transmission line testing',
        'Advanced earth system analysis'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // Generate product-specific SEO content for selected products
  const getSeoContent = (productId: string | undefined) => {
    if (!productId || !productData[productId as keyof typeof productData]) {
      return null;
    }

    const product = productData[productId as keyof typeof productData];
    const model = product.model;
    const subtitle = product.subtitle;
    const accuracy = product.accuracy;
    const voltage = product.voltage;

    // Product-specific content based on model
    const contentMap: Record<string, { intro: string; features: string; technical: string; why: string }> = {
      'ca-6470n': {
        intro: `Earth testers, also known as ground resistance testers or earth resistance meters, are essential instruments for measuring the electrical resistance of grounding systems and earth electrodes. These professional-grade tools are critical for ensuring electrical safety, compliance with safety standards, and proper functioning of electrical installations. The KRYKARD ${model} ${subtitle} represents advanced earth testing technology, combining multiple measurement methods with comprehensive data management capabilities for professional ground resistance testing applications requiring detailed analysis and documentation.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require advanced earth testing in ground system verification, industrial plant maintenance, lightning protection system testing, utility and substation testing, research and development, and quality control testing. With ${accuracy} accuracy and measurement range from 0.01 Ω to 99.9 kΩ, this earth tester delivers precise measurements for comprehensive ground system analysis. The advanced design with backlit LCD display featuring 3 simultaneous display levels, noise interference detection, alarm function for threshold monitoring, 512 memory locations for data storage, and USB interface for data transfer makes it ideal for professional applications requiring comprehensive testing and documentation. The instrument supports 3-pole and 4-pole measurements with frequency adjustment from 41 Hz to 512 Hz.`,
        technical: `The ${model} earth tester offers exceptional performance with measurement range from 0.01 Ω to 99.9 kΩ (3P & 4P measurements) and accuracy of ${accuracy}, ensuring reliable measurements for professional applications. The instrument features self-diagnosis capability that detects bad connections or disturbance signals before measurement, ensuring accurate and reliable results. Frequency adjustment from 41 Hz to 512 Hz enables accurate measurements in various environmental conditions. The instrument is powered by NiMH rechargeable battery with external charger, providing extended operation time. Protection rating of IP53 ensures durability in field environments, while compliance with IEC 61557-1, -4, -5 and safety standard IEC 61010 50V CAT IV ensures professional-grade safety and reliability.`,
        why: `KRYKARD ${model} earth tester combines precision engineering with advanced features, delivering professional-grade ground resistance measurement in a reliable package. With features like high accuracy (${accuracy}), wide measurement range (0.01 Ω to 99.9 kΩ), multiple measurement methods (3P, 4P), frequency adjustment capability, noise interference detection, alarm functions, extensive memory storage (512 locations), USB interface, self-diagnosis capability, and comprehensive data management, the ${model} is trusted by professionals across India for ground system verification, industrial plant maintenance, lightning protection system testing, utility and substation testing, research and development, and quality control testing. Whether you need to verify grounding systems, test lightning protection, maintain industrial facilities, or conduct research applications, the ${model} provides the reliability and advanced features required for professional earth testing applications.`
      }
    };

    return contentMap[productId] || null;
  };

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ca-6424': {
      title: "KRYKARD CA 6424 | Earth Resistance Tester",
      description: "KRYKARD CA 6424 2P/3P earth tester with backlit LCD display, delivering accurate 2-pole, 3-pole and 4-pole ground resistance measurements.",
      keywords: "ca 6424, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca-6424"
    },
    'ca-6460': {
      title: "KRYKARD CA 6460 | Earth Resistance Tester",
      description: "KRYKARD CA 6460 4P earth tester with resistivity measurement, delivering accurate 2-pole, 3-pole and 4-pole ground resistance testing.",
      keywords: "ca 6460, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca-6460"
    },
    'ca-6470n': {
      title: "KRYKARD CA 6470N | Earth Resistance Tester",
      description: "KRYKARD CA 6470N 3P/4P earth tester with USB connectivity, delivering accurate 2-pole, 3-pole and 4-pole ground measurements.",
      keywords: "ca 6470n, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca-6470n"
    },
    'ca-6472': {
      title: "KRYKARD CA 6472 | Earth Resistance Tester",
      description: "KRYKARD CA 6472 advanced 3P/4P earth tester with automatic and expert modes, delivering precise 2-pole, 3-pole and 4-pole ground testing.",
      keywords: "ca 6472, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca-6472"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/earth-testers');
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
    title: `${product.model} - ${product.subtitle} | Earth Resistance Tester`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "earth testers, electrical testing, ground resistance measurement",
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

  // Feature icon logic similar to OscilloscopeProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data') || feature.toLowerCase().includes('logging')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('communication')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power') && !feature.toLowerCase().includes('measurement')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal') || feature.toLowerCase().includes('compensation')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('resistance')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('frequency') || feature.toLowerCase().includes('range') || feature.toLowerCase().includes('calibration') || feature.toLowerCase().includes('accuracy')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('alarm') || feature.toLowerCase().includes('protection') || feature.toLowerCase().includes('fault')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('monitoring') || feature.toLowerCase().includes('reporting') || feature.toLowerCase().includes('software') || feature.toLowerCase().includes('expert') || feature.toLowerCase().includes('automatic')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/earth-testers/product/${product.id}`}
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
                  Earth Testers
                </h2>
                <p className="typography-h4 text-black">
                  Professional Earth Testing Solutions
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
                              navigate(`/measure/earth-testers/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/earth-testers')}
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
                      <button onClick={() => window.open(product.brochureLink, '_blank')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
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
                        alt={`KRYKARD ${product.model} - ${product.subtitle} - Earth Tester for ${product.measurement} Measurement`}
                        width={320}
                        height={240}
                        loading="lazy"
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

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          {getSeoContent(productId) && (
            <section className="py-4 md:py-6 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
                  .seo-details-earthproduct summary {
                    list-style: none;
                  }
                  .seo-details-earthproduct summary::-webkit-details-marker {
                    display: none;
                  }
                `}</style>

                <details className="seo-details-earthproduct group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>

                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      {(() => {
                        const content = getSeoContent(productId);
                        if (!content) return null;
                        const currentProduct = productData[productId as keyof typeof productData];
                        return (
                          <>
                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                              Understanding Earth Testing Technology
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.intro}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Applications and Benefits of the {currentProduct?.model} Earth Tester
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.features}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Technical Excellence and Professional Features
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.technical}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Why Choose KRYKARD {currentProduct?.model} Earth Tester?
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {content.why}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </details>
              </div>
            </section>
          )}

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
                  Our specialists provide comprehensive guidance on earth testing solutions
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

export default EarthTesterProduct;