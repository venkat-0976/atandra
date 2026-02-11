import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Shield,
  Gauge,
  FileText,
  Menu,
  X,
  BarChart,
  Star
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

const ClampMeters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productsOnly = searchParams.get('view') === 'products';
    setShowOnlyProducts(productsOnly);
    if (productsOnly) {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    if (window.location.hash === '#products-section') {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Product data
  const products = [
    {
      id: 'f205-f404-f604',
      title: 'Power Clamp Meter',
      modelNumber: 'F205/F404/F604',
      image: '/clammeter/F205.png',
      displayInfo: 'Up to 1,200V AC/1,700V DC',
      model: 'F205/F404/F604',
      subtitle: 'Power Clamp Meter',
      voltage: 'Up to 1,200V AC/1,700V DC',
      measurement: 'Power & Energy',
      accuracy: '1% + 3 counts',
      features: [
        'True RMS reading on AC and AC+DC',
        'AC and DC voltage up to 1,000 V',
        'Current: up to 2,000 A AC / 3,000 A DC',
        'Measures kW, kVAr, kVA & PF',
        'Auto range, Hold & Auto power off',
        'IP 40 (F205), IP 54 (F404 & F604)'
      ],
      specs: [
        'Clamping diameter: F205: 34 mm, F404: 48 mm, F604: 60 mm',
        'Display: F205: 6000 counts, F404/F604: 10,000 counts',
        'Temperature: Up to 1000°C (F404 & F604)',
        '1 phase & 3 phase power: Up to 600 KW (F205)'
      ],
      applications: [
        'Electrical installation testing',
        'Industrial maintenance',
        'Power quality analysis'
      ]
    },
    {
      id: 'f406-f606',
      title: 'Solar Clamp Meter',
      modelNumber: 'F406/F606',
      image: '/clammeter/F406.png',
      displayInfo: 'Up to 1,200V AC/1,700V DC',
      model: 'F406/F606',
      subtitle: 'Solar Clamp Meter',
      voltage: 'Up to 1,200V AC/1,700V DC',
      measurement: 'Power & Energy',
      accuracy: '1% + 3 counts',
      features: [
        'Specially designed for Photo voltaic applications',
        'True RMS reading on AC and AC+DC',
        'AC and DC voltage up to 1,700 V DC',
        'Current: up to 2,000 A AC / 3,000 A DC',
        'Measures kW, kVAr, kVA & PF',
        'PV specific features'
      ],
      specs: [
        'Clamping diameter: F406: 48 mm, F606: 60 mm',
        'Display: 10,000 counts',
        '1 phase & 3 phase Power: F406: Up to 1,200 kW, F606: Up to 2,400 kW',
        'Voltage & Current THDf/THDr: Available'
      ],
      applications: [
        'Solar power system monitoring',
        'Renewable energy troubleshooting',
        'PV installation verification'
      ]
    },
    {
      id: 'f407-f607',
      title: 'Power & Harmonics Clamp Meter',
      modelNumber: 'F407/F607',
      image: '/clammeter/F407.png',
      displayInfo: 'Up to 1,000V',
      model: 'F407/F607',
      subtitle: 'Power & Harmonics Clamp Meter',
      voltage: 'Up to 1,000V',
      measurement: 'Power & Harmonics',
      accuracy: '1% + 3 counts',
      features: [
        'True RMS reading on AC and AC+DC',
        'Harmonics up to 25th order',
        'Bluetooth Communication',
        'Data recording & PC interface',
        'Measures kW, kVAr, kVA, PF & DPF',
        'Auto range, Hold & Auto power off'
      ],
      specs: [
        'Clamping diameter: F407: 48 mm, F607: 60 mm',
        'Display: 10,000 counts',
        'Harmonic Analysis: Voltage & Current THDf/THDr, Individual Harmonics up to 25° order',
        '1 phase & 3 phase Power: F407: Up to 1,000 kW, F607: Up to 2,000 kW'
      ],
      applications: [
        'Power quality analysis',
        'Industrial equipment monitoring',
        'Harmonic troubleshooting'
      ]
    }
  ];

  // Navigation tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'comparison', label: 'Compare', icon: Star }
  ];

  // Hero Section (updated to match PowerQuality style)
  const HeroSection = () => {
    const handleViewBrochure = () => window.open('/public/T&M%20April%202025.pdf', '_blank');
    return (
      <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
        {/* Hero Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-3/4 h-full bg-yellow-50 rounded-bl-[100px] transform -skew-x-12"></div>
          <div className="absolute bottom-20 left-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10"></div>
        </div>
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-[10%_90%] gap-0 items-center">
            {/* Left Spacer for 10% on large screens */}
            <div className="hidden lg:block"></div>
            {/* Content and Image Side by Side */}
            <div className="lg:flex lg:flex-row lg:items-center lg:gap-4">
              {/* Text Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-4 text-center lg:text-left lg:w-1/2"
              >
                <div className="inline-block bg-yellow-400 py-1 px-3 rounded-full mb-2">
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Clamp Meter Solutions</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  CLAMP METERS
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  Professional-grade clamp meters for accurate, non-intrusive electrical measurements and advanced power analysis.
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link to="/contact/sales">
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md transition duration-300 flex items-center space-x-2 font-['Open_Sans']"
                    >
                      <span>Request Demo</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </Link>
                  {/* <Button
                    className="px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-yellow-400 text-gray-900 font-semibold rounded-lg shadow-sm transition duration-300 hover:bg-yellow-50 flex items-center space-x-2 font-['Open_Sans']"
                    onClick={handleViewBrochure}
                  >
                    <span>View Brochure</span>
                    <FileText className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                  </Button> */}
                </div>
              </motion.div>
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex justify-center lg:justify-center lg:w-1/2 lg:pl-8"
              >
                <div className="relative">
                  <img
                    src="/clamp-meter-group.jpg"
                    alt="KRYKARD Clamp Meters for Non-Intrusive Current Measurement"
                    className="w-full max-w-md h-auto object-contain"
                    width={1920}
                    height={1080}
                    loading="eager"
                    decoding="async"
                  // onError={e => {
                  //   e.currentTarget.onerror = null;
                  //   e.currentTarget.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Clamp+Meter';
                  // }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Feature Highlight Component
  const FeatureHighlight = ({ icon: Icon, title, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300 p-4 h-full bg-transparent flex flex-col items-center text-center"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      <div className="flex flex-row items-center gap-3 mb-2 justify-center w-full">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-10 h-10 rounded-2xl flex items-center justify-center">
          <Icon className="h-6 w-6 text-gray-900" />
        </div>
        <h3 className="text-base md:text-lg font-bold text-gray-900 m-0 p-0">{title}</h3>
      </div>
      <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed">{description}</p>
    </motion.div>
  );

  // Product Overview Card Component (following power quality design pattern)
  const ProductOverviewCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      {/* Model Number Badge */}
      <div className="flex justify-end p-3">
        <span className="bg-yellow-100 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {product.modelNumber}
        </span>
      </div>
      {/* Product Image */}
      <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
        <img
          src={product.image}
          alt={`${product.title} - KRYKARD ${product.model} Clamp Meter for ${product.measurement || 'Electrical Testing'}`}
          className="max-h-full max-w-full object-contain"
          width={320}
          height={240}
          loading="lazy"
          decoding="async"
        // onError={e => {
        //   e.currentTarget.onerror = null;
        //   e.currentTarget.src = 'https://via.placeholder.com/200x150/FFD700/000000?text=No+Image';
        // }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="text-center mb-2">
          <h3 className="text-base font-bold text-gray-900">{product.title}</h3>
          <div className="text-xs text-gray-600 mt-1">{product.displayInfo}</div>
        </div>
        <Link
          to={`/measure/clamp-meters/product/${product.id}`}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="inline h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );

  // Navigation Component
  const Navigation = () => (
    <nav className="w-full mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex justify-center py-4">
        <div className="flex space-x-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 font-bold rounded transition-all duration-200 flex items-center space-x-2 border-none outline-none focus:ring-2 focus:ring-yellow-400 ${activeTab === tab.id
                ? 'bg-yellow-400 text-gray-900'
                : 'bg-transparent text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
                }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-base font-bold">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden flex justify-center py-2 gap-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded font-bold flex items-center space-x-2 border-none outline-none focus:ring-2 focus:ring-yellow-400 ${activeTab === tab.id
              ? 'bg-yellow-400 text-gray-900'
              : 'bg-transparent text-gray-700 hover:bg-yellow-50 hover:text-yellow-700'
              }`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-base">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  // Comparison Table Component
  const ComparisonTable = () => {
    console.log('ClampMeters ComparisonTable rendering with products:', products.length);

    return (
      <div className="comparison-table bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full" style={{ fontFamily: 'Open Sans, sans-serif', display: 'block', visibility: 'visible', opacity: 1 }}>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">Model Comparison</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="border-b-2 border-yellow-400">
                <th className="text-left py-4 px-4 font-bold text-gray-900 bg-yellow-50 border border-gray-300">Feature</th>
                {products.map(product => (
                  <th key={product.id} className="text-center py-4 px-4 font-bold text-gray-900 bg-yellow-50 min-w-[200px] border border-gray-300">
                    {product.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Voltage Range</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.voltage}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Measurement</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.measurement}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Accuracy</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.accuracy}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Clamp Meters",
    "description": "KRYKARD clamp meters — clamp meter delivering accurate non‑intrusive current measurement and advanced power diagnostics.",
    "url": "https://atandra.in/measure/clamp-meters",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "description": product.subtitle,
          "brand": {
            "@type": "Brand",
            "name": "KRYKARD"
          },
          "model": product.model,
          "url": `https://atandra.in/measure/clamp-meters/product/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="KRYKARD Clamp Meters | Atandra"
        description="KRYKARD clamp meters — clamp meter delivering accurate non‑intrusive current measurement and advanced power diagnostics."
        keywords="clamp meters, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/clamp-meters"
        ogImage="https://atandra.in/clamp-meter-group.jpg"
        jsonLd={jsonLd}
        preloadImage="/clamp-meter-group.jpg"
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {/* Hide Breadcrumbs and Remove Top Padding */}
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        {/* Show Hero Section only when not in products-only view AND on overview tab */}
        {!showOnlyProducts && activeTab === 'overview' && <HeroSection />}

        {/* Navigation - Always show after hero section for normal view */}
        {!showOnlyProducts && <Navigation />}

        {/* Show only products view */}
        {showOnlyProducts ? (
          <>
            {/* Navigation for products-only view */}
            <Navigation />
            {/* Main Title */}
            <div className="w-full py-6 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">
                Clamp Meters
              </h1>
            </div>
            {/* Product Cards Section */}
            <section id="products-section" className="py-12 md:py-16">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-center mb-10"
                >
                  <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                    PROFESSIONAL SERIES
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                    Our Clamp Meter Range
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                    Professional solutions for accurate, non-intrusive electrical measurements
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                  {products.map((product) => (
                    <ProductOverviewCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          <>
            {/* Content based on active tab */}
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Product Overview Section */}
                  <section id="products-section" className="py-12 md:py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                      >
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                          PRODUCTS
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          Our Clamp Meter Range
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                          Professional solutions for accurate, non-intrusive electrical measurements
                        </p>
                      </motion.div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                        {products.map((product) => (
                          <ProductOverviewCard key={product.id} product={product} />
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Key Features Section */}
                  <section className="py-8 md:py-12 bg-yellow-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-center mb-14"
                      >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight">
                          Key Features
                        </h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-2">
                          Discover the standout features that make our clamp meters the preferred choice for professionals.
                        </p>
                      </motion.div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        <FeatureHighlight
                          icon={Zap}
                          title="True RMS Accuracy"
                          description="Accurate measurement of AC and DC currents and voltages for reliable diagnostics."
                        />
                        <FeatureHighlight
                          icon={Shield}
                          title="Non-Intrusive Measurement"
                          description="Measure current without breaking the circuit, with large clamping diameters."
                        />
                        <FeatureHighlight
                          icon={Gauge}
                          title="Advanced Power Analysis"
                          description="Analyze power, harmonics, and more for comprehensive electrical assessment."
                        />
                        <FeatureHighlight
                          icon={FileText}
                          title="Data Logging & Bluetooth"
                          description="Select models offer data recording and wireless communication for easy analysis."
                        />
                        <FeatureHighlight
                          icon={Zap}
                          title="Solar & PV Ready"
                          description="Special models for high-voltage DC and solar applications."
                        />
                        <FeatureHighlight
                          icon={BarChart}
                          title="Harmonics & Power Quality"
                          description="Harmonic analysis up to 25th order for power quality troubleshooting."
                        />
                      </div>
                    </div>
                  </section>
                </motion.div>
              )}

              {activeTab === 'comparison' && (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Comparison Section */}
                  <section className="py-12 md:py-16 min-h-screen bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-10"
                      >
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                          COMPARISON
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          Compare Our Models
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">
                          Find the perfect clamp meter for your specific requirements
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                      >
                        <ComparisonTable />
                      </motion.div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* SEO Content Section - 250+ Words in Collapsible Details */}
        <section className="py-4 md:py-6 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <style>{`
              .seo-details-clamp summary {
                list-style: none;
              }
              .seo-details-clamp summary::-webkit-details-marker {
                display: none;
              }
            `}</style>

            <details className="seo-details-clamp group w-full">
              <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit  mx-auto">
                <span>Learn More</span>
                <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
              </summary>

              <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                    What Are Clamp Meters and How Do They Work?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Clamp meters, also known as current clamps or clamp-on ammeters, are essential electrical measurement tools that enable professionals to measure current without breaking the circuit. These versatile instruments utilize the principle of electromagnetic induction to detect and measure alternating current (AC) and direct current (DC) flowing through a conductor. Unlike traditional multimeters that require direct contact with the circuit, clamp meters provide non-intrusive measurement capabilities, making them ideal for troubleshooting, maintenance, and safety applications across various industries.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Applications and Use Cases for Professional Clamp Meters
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    KRYKARD clamp meters are designed for professionals who need accurate, non-intrusive electrical measurements in industrial, commercial, and residential applications. Our power clamp meters provide comprehensive power analysis capabilities, measuring voltage, current, power, energy, and power factor in both single-phase and three-phase systems. These instruments are essential for electrical installation testing, industrial maintenance, and power quality analysis. Solar clamp meters are specifically engineered for photovoltaic applications, offering DC voltage measurement up to 1,700V and specialized features for solar panel diagnostics and renewable energy system monitoring.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Advanced Features: Harmonics Analysis and Power Quality
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Our harmonics clamp meters deliver advanced power quality analysis, detecting harmonic distortion up to the 25th order and helping identify electrical issues that can affect equipment performance and energy efficiency. These professional-grade instruments feature True RMS measurement for accurate readings of non-sinusoidal waveforms, Bluetooth connectivity for wireless data transfer, and comprehensive data logging capabilities. With large clamping diameters ranging from 34mm to 60mm, IP-rated protection for harsh environments, and extended measurement ranges up to 3,000A, KRYKARD clamp meters are trusted by professionals across India for accurate electrical diagnostics and troubleshooting.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Why Choose KRYKARD Clamp Meters?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    KRYKARD clamp meters combine precision engineering with user-friendly design, delivering reliable measurements for electrical installation testing, industrial maintenance, and power quality analysis. With features like True RMS measurement, large displays with up to 10,000 counts, IP-rated protection, and extended measurement ranges, our clamp meters are trusted by professionals across India for accurate electrical diagnostics and troubleshooting. Whether you need basic current measurement, comprehensive power analysis, solar system monitoring, or advanced harmonics detection, KRYKARD offers a complete range of clamp meters to meet your specific requirements.
                  </p>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* Contact Section - Always show at bottom */}
        <section className="py-6 md:py-8 mb-16 md:mb-24 bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-2 border-yellow-200 mt-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="pb-4"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                Need More Information?
              </h2>
              <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">
                Our team of experts is ready to help you with product specifications, custom solutions, and pricing.
              </p>
              <Link
                to="/contact/sales"
                className="inline-flex px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 items-center justify-center space-x-2 text-base mx-auto"
              >
                <span>Contact Our Experts</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* CSS Override for table borders visibility */}
        <style>{`
        .comparison-table {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        .comparison-table table {
          border-collapse: collapse !important;
          border: 2px dotted #d1d5db !important;
        }

        .comparison-table table th,
        .comparison-table table td {
          border: 1px dotted #d1d5db !important;
          border-collapse: collapse !important;
        }

        .comparison-table table thead tr {
          border-bottom: 3px dotted #fbbf24 !important;
        }

        .comparison-table table tbody tr {
          border-bottom: 1px dotted #d1d5db !important;
        }
      `}</style>
      </PageLayout>
    </>
  );
};

export default ClampMeters;