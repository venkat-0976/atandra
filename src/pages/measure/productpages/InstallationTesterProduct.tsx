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

const brochureLinks: { [key: string]: string } = {
  ca6117: '/Ca6117.pdf',
  ca6133: '/Ca6133.pdf'
};

const InstallationTesterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'ca6117', model: 'CA 6117', subtitle: 'Advanced Installation Tester' },
    { id: 'ca6133', model: 'CA 6133', subtitle: 'Standard Installation Tester' }
  ];

  // Complete product data
  const productData = {
    ca6117: {
      id: 'ca6117',
      model: 'CA 6117',
      subtitle: 'Advanced Installation Tester',
      image: '/installation testers/CA 6117.png',
      images: [
        '/installation testers/CA 6117.png',
        '/installation testers/hero_image.png',
        //'/CA6177-03.png'
      ],
      voltage: 'CAT III 550V AC/DC',
      measurement: 'Comprehensive Installation Testing',
      accuracy: 'High Precision ±1%',
      price: 'Contact for pricing',
      description: 'All-in-one installation tester for all neutral systems (TT, TN, IT), ideal for industries, tertiary and residential. Compliant with international standards with advanced measurement capabilities.',
      keyFeatures: [
        'Large 5.7" backlit graphic colour LCD screen',
        'All-in-one instrument for testing electrical installations',
        'Suitable for all neutral systems (TT, TN, IT)',
        'Integrated fuse table for quick reading of results',
        'Li-Ion battery for longer battery life',
        'Measurement of voltage drop for correct sizing of conductor diameters',
        'Loop measurement with 1 mΩ resolution',
        'Continuity measurements at 12 mA or 200 mA',
        'Memory: 3-level storage, 1000 locations',
        'PC interface for data management',
        'Advanced harmonic analysis up to 50th order',
        'Phase rotation detection',
        'Active power measurement up to 330 kW'
      ],
      technicalSpecs: {
        'Electrical Safety': 'IEC 61010-1, 600 V CAT III / 300 V CAT IV, compliant with IEC 61557',
        'Continuity / Resistance': 'Test current: >200 mA, Range: up to 39.99 Ω, Resolution: 0.01 Ω, Accuracy: ±(1.5% of reading + 2 counts)',
        'Insulation Measurement': 'Test voltages: 50 / 100 / 250 / 500 / 1000 V DC, Range: 0.01 MΩ to 2 GΩ, Accuracy: ±(5% of reading + 3 counts), Short-circuit current: ≤ 3 mA',
        'Earth Resistance': '3P & 1P selective, Range: 0.20 Ω to 40 kΩ, Resolution: 0.01 Ω to 10 Ω (depending on range), Accuracy: ±(2–10% depending on range)',
        'Loop Impedance (Zs & Zi)': 'Range: 0.05 Ω to 3999 Ω, Resolution: 0.001 Ω to 1 Ω, Accuracy: ±(5–15% depending on mode)',
        'Short-circuit current calculation': 'Up to 20 kA',
        'RCD Testing': 'Supports AC, A, F, B, B+, and EV types. Ramp and pulse test modes. Test current range: 6 mA to 1000 mA (depending on type and voltage). Trip time measurement: 0 to 500 ms with 0.1 ms resolution',
        'Voltage & Frequency Measurement': 'Voltage: 0 to 550 V AC/DC, Frequency: 10 to 500 Hz',
        'Current Measurement (via clamp)': 'Range: 5 mA to 200 A (depending on clamp model)',
        'Harmonics': 'Up to the 50th order',
        'Display & Storage': '5.7” backlit graphic colour LCD, 320 x 240 pixels, 3-level data storage, USB communication for report generation',
        'Power Supply': 'Rechargeable Li-ion battery 10.8 V / 5.8 Ah, Battery life: up to 30 hours continuous operation',
        'Mechanical & Environmental': 'Dimensions: 280 × 190 × 128 mm, Weight: 2.2 kg, Protection: IP53 / IK04, EMC compliance: IEC 61326-1'
      },
      applications: [
        'Electrical installation testing and verification',
        'Industrial maintenance and troubleshooting',
        'Earthing system verification and compliance',
        'Safety compliance testing',
        'Power quality analysis and monitoring',
        'RCD testing and validation'
      ],

    },
    ca6133: {
      id: 'ca6133',
      model: 'CA 6133',
      subtitle: 'Standard Installation Tester',
      image: '/installation testers/CA 6133-1.png',
      images: [
        '/installation testers/CA 6133-1.png',
        '/installation testers/CA 6133-2.png',
        '/installation testers/ca6133-03.png'
      ],
      voltage: 'CAT III 550V AC/800V DC',
      measurement: 'Standard Installation Testing',
      accuracy: 'Standard Precision ±2%',
      price: 'Contact for pricing',
      description: 'Standard installation tester with Android app for report generation, automatic test sequences, and multiple power supply options. Ideal for routine installation testing.',
      keyFeatures: [
        'Custom 231-segment LCD with blue backlighting',
        'Continuity measurement at 0.2A (200mA)',
        'Android application for Report generation',
        'Earth measurement by stake and loop methods',
        'Insulation testing up to 1000V',
        'RCD testing: current and trip time',
        'Automatic test sequences for efficiency',
        'Power supply by mains-rechargeable batteries, USB socket or vehicle cigarette lighter',
        'Memory: 30 sites x 99 tests',
        'Multiple power supply options',
        'Portable and lightweight design',
        'User-friendly interface'
      ],
      technicalSpecs: {
        'Voltage measurement': '550 VAC / 800 VDC',
        'Continuity': '200 mA',
        'Resistance': '1 to 99.99 kΩ',
        'Insulation': '250V, 500V or 1,000 V test voltage - Zs (Z L-PE) loop without tripping: 1 to 2,000 Ω, calculation of Ik',
        'High-current loop': 'Zs (Z L-PE) with tripping and Zi (Z L-N or Z L-L), from 0.1 to 400 Ω, calculation of Ik',
        'Type AC & A RCDs': '30mA, 100mA, 300 mA, 500 mA, 650 mA',
        'RCD in pulse mode': 'Tripping time',
        'RCD in ramp mode': 'Tripping current (30 mA)',
        'Phase rotation': '45 to 550V; 45 to 65 Hz',
        'Frequency measurement': '30 Hz to 999.9 Hz',
        'Insulation additional': '1,000 V test voltage',
        '3P earth (stakes)': 'Up to 2,000 Ω',
        'Automatic RCD test sequence': 'No trip-pulse-ramp',
        'Automatic test sequence': 'Loop-RCD-MΩ',
        'Data storage': '30 sites with 99 tests each by pressing the MEM key or using the optional remote-control probe',
        'Power supply': 'Rechargeable batteries with built-in charger',
        'Recharging': 'Via mains, USB socket or vehicle cigarette lighter socket',
        'Bluetooth communication': 'Yes',
        'Automatic recognition': 'Optional MN73A external clamp'
      },
      applications: [
        'Electrical installation testing',
        'Industrial maintenance',
        'Earthing system verification',
        'Safety compliance testing',
        'RCD testing and validation',
        'Routine electrical inspections'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ca6117': {
      title: "KRYKARD CA6117 | Installation Testers",
      description: "KRYKARD CA 6117 - Advanced Installation Tester with 5.7\" Color Display — advanced installation tester compliant with international electrical testing.",
      keywords: "ca6117, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6117"
    },
    'ca6133': {
      title: "KRYKARD CA6133 | Installation Testers",
      description: "KRYKARD CA 6133 standard installation tester with Android app compatibility, designed for advanced electrical testing and international compliance.",
      keywords: "ca6133, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6133"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/installation-testers');
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
    title: `${product.model} - ${product.subtitle} | Installation Testers`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "installation testers, electrical testing, compliance testing",
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
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen') || feature.toLowerCase().includes('color')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data') || feature.toLowerCase().includes('logging')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('interface') || feature.toLowerCase().includes('android') || feature.toLowerCase().includes('app')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power') && !feature.toLowerCase().includes('measurement')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('continuity') || feature.toLowerCase().includes('rcd')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('resolution') || feature.toLowerCase().includes('range') || feature.toLowerCase().includes('sequence') || feature.toLowerCase().includes('harmonic') || feature.toLowerCase().includes('phase')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('earth') || feature.toLowerCase().includes('insulation') || feature.toLowerCase().includes('loop')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('testing') || feature.toLowerCase().includes('fuse') || feature.toLowerCase().includes('table') || feature.toLowerCase().includes('automatic')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/installation-testers/product/${product.id}`}
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
                  Installation Testers
                </h2>
                <p className="typography-h4 text-black">
                  Professional Installation Testing Solutions
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
                              navigate(`/measure/installation-testers/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/installation-testers')}
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
                      {brochureLinks[product.id] && (
                        <button
                          onClick={() => window.open(brochureLinks[product.id], '_blank')}
                          className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
                          style={{ backgroundColor: '#F5C842' }}
                        >
                          <Download className="h-5 w-5" />
                          <span>View Brochure</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full mx-auto flex items-center justify-center" style={{ minHeight: '400px', maxWidth: '500px' }}>
                    {product.images && product.images.length > 1 ? (
                      <div className="w-full flex items-center justify-center">
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
                          alt={`KRYKARD ${product.model} - ${product.subtitle} - Installation Tester for Professional Electrical Testing and Compliance`}
                          width={800}
                          height={800}
                          loading="eager"
                          decoding="async"
                          className="w-full h-auto object-contain mx-auto"
                          
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
                  Our specialists provide comprehensive guidance on installation testing solutions
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

export default InstallationTesterProduct;