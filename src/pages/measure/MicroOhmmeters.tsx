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
  Star,
  Database,
  Award
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

const products = [
  {
    id: 'ca6240',
    title: '10A Micro-Ohmmeter',
    modelNumber: 'CA 6240',
    image: '/Ohm meters/CA 6240.png',
    displayInfo: '10A',
    model: 'CA 6240',
    subtitle: '10A Micro-Ohmmeter',
    voltage: '5μΩ to 399.9Ω',
    measurement: 'Low Resistance',
    accuracy: '±0.25% ± 2 counts',
    current: '10A',
    resistanceRange: '5μΩ to 399.9Ω',
    features: [
      'Large backlit LCD display',
      'Auto measurement mode',
      'Automatic recording mode',
      'Auto power-off function',
      'Memory: 100 measurements',
      'Optical/USB communication',
      'PC interface included',
      'Portable design'
    ],
    specs: [
      'Resistance: 5μΩ to 399.9Ω',
      'Accuracy: ±0.25% ±2 counts',
      'Test current: Up to 10A',
      'Display: Backlit LCD'
    ],
    applications: [
      'Circuit breaker testing',
      'Transformer winding resistance',
      'Motor connection testing'
    ]
  },
  {
    id: 'ca6255',
    title: '10A Advanced Micro-Ohmmeter',
    modelNumber: 'CA 6255',
    image: '/Ohm meters/CA 6255.png',
    displayInfo: '10A',
    model: 'CA 6255',
    subtitle: '10A Advanced Micro-Ohmmeter',
    voltage: '5mΩ to 2,500Ω',
    measurement: 'Advanced Resistance',
    accuracy: '±0.25% ± 2 counts',
    current: '10A',
    resistanceRange: '5mΩ to 2,500Ω',
    features: [
      'Large backlit LCD display',
      'Auto measurement mode',
      'Automatic discharge system',
      'Auto power-off function',
      'Memory: 1,500 measurements',
      'RS 232 communication',
      'PC interface included',
      'Advanced safety features'
    ],
    specs: [
      'Resistance: 5mΩ to 2,500Ω',
      'Accuracy: ±0.25% ±2 counts',
      'Test current: Up to 10A',
      'Memory: 1,500 measurements'
    ],
    applications: [
      'Power system maintenance',
      'Industrial equipment testing',
      'Quality control applications'
    ]
  },
  {
    id: 'ca6292',
    title: '200A High-Current Micro-Ohmmeter',
    modelNumber: 'CA 6292',
    image: '/Ohm meters/CA 6292.png',
    displayInfo: '200A',
    model: 'CA 6292',
    subtitle: '200A High-Current Micro-Ohmmeter',
    voltage: '0.1μΩ to 1Ω',
    measurement: 'High Current',
    accuracy: '±1%',
    current: '200A',
    resistanceRange: '0.1μΩ to 1Ω',
    features: [
      'Backlit LCD (4 lines x 20 characters)',
      'Internal cooling system',
      'Normal/BSG test modes',
      'Advanced protection systems',
      'Memory: 8,000 measurements',
      'USB communication',
      'PC interface included',
      'High-current capability'
    ],
    specs: [
      'Resistance: 0.1μΩ to 1Ω',
      'Accuracy: ±1%',
      'Test current: Up to 200A',
      'Memory: 8,000 measurements'
    ],
    applications: [
      'Heavy industrial testing',
      'Power plant maintenance',
      'High-current applications'
    ]
  }
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'comparison', label: 'Compare', icon: Star }
];

const MicroOhmmeters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);

  // useEffect(() => {
  //   const searchParams = new URLSearchParams(location.search);
  //   const productsOnly = searchParams.get('view') === 'products';
  //   setShowOnlyProducts(productsOnly);
  //   if (productsOnly) {
  //     setActiveTab('overview');
  //   }
  // }, [location.search]);

  // // Reset showOnlyProducts when navigating back to main view
  // useEffect(() => {
  //   if (!location.search.includes('view=products')) {
  //     setShowOnlyProducts(false);
  //   }
  // }, [location.search]);

  useEffect(() => {
    if (window.location.hash === '#products-section') {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

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
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Precision Instruments</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  MICRO OHMMETERS
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  Micro-ohm meters are high-precision instruments designed to measure extremely low resistances with exceptional accuracy and stability.
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
                    src="/Micro-Meter-family.png"
                    alt="KRYKARD Micro Ohmmeters for Low-Resistance Measurement in Equipment Testing"
                    className="w-full max-w-md h-auto object-contain"
                    width={1920}
                    height={1080}
                    loading="eager"
                    decoding="async"
                  // onError={e => {
                  //   e.currentTarget.onerror = null;
                  //   e.currentTarget.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Micro+Ohmmeter';
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

  // Product Overview Card Component (following the power quality design pattern)
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
          alt={`${product.title} - KRYKARD ${product.model} Micro-Ohmmeter for ${product.measurement || 'Low Resistance Testing'}`}
          className="max-h-full max-w-full object-contain"
          width={320}
          height={240}
          loading="lazy"
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
          to={`/measure/micro-ohmmeters/${product.id}`}
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
    console.log('MicroOhmmeters ComparisonTable rendering with products:', products.length);

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
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Resistance Range</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.resistanceRange}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Accuracy</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.accuracy}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Test Current</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    Up to {product.current}
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
    "name": "Micro Ohmmeters",
    "description": "KRYKARD micro ohmmeters — micro‑ohmmeter designed for precise low‑resistance measurement in industrial equipment testing.",
    "url": "https://atandra.in/measure/micro-ohmmeters",
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
          "url": `https://atandra.in/measure/micro-ohmmeters/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="KRYKARD Micro Ohmmeters | Atandra"
        description="KRYKARD micro ohmmeters — micro‑ohmmeter designed for precise low‑resistance measurement in industrial equipment testing."
        keywords="micro ohmmeters, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/micro-ohmmeters"
        ogImage="https://atandra.in/Micro-Meter-family.png"
        jsonLd={jsonLd}
        preloadImage="/Micro-Meter-family.png"
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
              <div className="flex justify-center mb-4">
                <button
                  onClick={() => navigate('/measure/micro-ohmmeters')}
                  className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                  <span>Back to Overview</span>
                </button>
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">
                Micro-Ohmmeters
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
                    Our Micro-Ohmmeter Range
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                    Precision instruments designed for accurate low resistance measurements.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
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
                          Our Micro-Ohmmeter Range
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                          Precision instruments designed for accurate low resistance measurements.
                        </p>
                        {/* <div className="mt-6">
                          <button
                            onClick={() => navigate('/measure/micro-ohmmeters?view=products')}
                            className="inline-flex items-center px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                          >
                            <span>View All Products</span>
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                        </div> */}
                      </motion.div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center max-w-6xl mx-auto">
                        {products.map((product) => (
                          <div key={product.id} className="w-full max-w-sm">
                            <ProductOverviewCard key={product.id} product={product} />
                          </div>
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
                          Discover the standout features that make our micro-ohmmeters the preferred choice for professionals.
                        </p>
                      </motion.div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                        <FeatureHighlight
                          icon={Zap}
                          title="High Precision"
                          description="Industry-leading measurement accuracy with ranges down to 0.1μΩ for the most demanding applications."
                        />
                        <FeatureHighlight
                          icon={Shield}
                          title="Robust Design"
                          description="Built for reliability in field and laboratory environments with advanced protection features."
                        />
                        <FeatureHighlight
                          icon={Gauge}
                          title="Advanced Features"
                          description="Temperature compensation, data storage capabilities, and versatile connectivity options."
                        />
                        <FeatureHighlight
                          icon={Database}
                          title="Data Management"
                          description="Comprehensive data storage and PC interface capabilities for analysis and documentation."
                        />
                        <FeatureHighlight
                          icon={Award}
                          title="Professional Grade"
                          description="Designed for professional applications with industrial-grade construction and reliability."
                        />
                        <FeatureHighlight
                          icon={FileText}
                          title="Comprehensive Testing"
                          description="Essential for testing transformer windings, circuit breakers, cables, and welded joints."
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
                          Find the perfect micro-ohmmeter for your specific requirements
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
              .seo-details-microohm summary {
                list-style: none;
              }
              .seo-details-microohm summary::-webkit-details-marker {
                display: none;
              }
            `}</style>

            <details className="seo-details-microohm group w-full">
              <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                <span>Learn More</span>
                <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
              </summary>

              <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                <div className="prose prose-sm max-w-none">
                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                    Understanding Micro-Ohmmeters and Low Resistance Measurement
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    Micro-ohmmeters, also known as low resistance ohmmeters or micro-ohm meters, are specialized instruments designed to measure very low electrical resistance values with high precision, typically in the micro-ohm to milliohm range. These professional-grade tools are essential for testing electrical connections, circuit breaker contacts, transformer windings, motor windings, busbar joints, and other components where low resistance values are critical for proper operation. Low resistance measurement is fundamental to electrical maintenance, as it identifies poor connections, loose joints, and degraded contacts that can lead to equipment failure, overheating, and safety hazards. KRYKARD micro-ohmmeters provide high-current test capabilities from 10A to 200A, enabling accurate measurement of low resistance values in various industrial and power system applications.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Applications and Benefits of Professional Micro-Ohmmeters
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    KRYKARD micro-ohmmeters are specifically designed for professionals who require accurate low resistance measurement in circuit breaker testing, transformer winding resistance measurement, motor connection testing, power system maintenance, industrial equipment testing, and quality control applications. Our comprehensive range includes 10A models for standard applications with resistance ranges from 5μΩ to 2,500Ω, and 200A high-current models for demanding applications with resistance ranges from 0.1μΩ to 1Ω. These instruments provide high test currents to overcome contact resistance and ensure accurate measurements, with accuracy up to ±0.25% ±2 counts. With features like large backlit LCD displays, automatic measurement modes, automatic discharge systems, extensive memory storage up to 1,500 measurements, and communication interfaces including RS232, optical, and USB, KRYKARD micro-ohmmeters deliver reliable and accurate testing solutions for professional applications.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Technical Excellence and Advanced Features
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-3">
                    KRYKARD micro-ohmmeters offer exceptional performance with test currents from 10A to 200A, resistance measurement ranges from 0.1μΩ to 2,500Ω depending on model, and accuracy specifications of ±0.25% ±2 counts ensuring precise low resistance measurements. The instruments feature large, backlit LCD displays for clear visualization of measurement results, automatic measurement modes for simplified operation, automatic discharge systems for safe testing of inductive loads, and automatic power-off functions for battery conservation. Advanced models include extensive memory storage for test data management, multiple communication interfaces for data transfer, PC interface software for comprehensive data analysis, and advanced safety features for protection during high-current testing. With features like automatic recording modes, measurement averaging, and comprehensive data logging, KRYKARD micro-ohmmeters provide the functionality required for professional low resistance measurement applications.
                  </p>

                  <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                    Why Choose KRYKARD Micro-Ohmmeters?
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    KRYKARD micro-ohmmeters combine precision engineering with high-current testing capability, delivering professional-grade low resistance measurement in reliable packages. With features like high test currents (10A to 200A), high accuracy (±0.25%), wide resistance ranges, automatic measurement modes, automatic discharge systems, extensive memory storage, multiple communication interfaces, PC interface support, and advanced safety features, KRYKARD micro-ohmmeters are trusted by professionals across India for circuit breaker testing, transformer winding resistance measurement, motor connection testing, power system maintenance, industrial equipment testing, and quality control applications. Whether you need to test circuit breaker contacts, measure transformer windings, verify motor connections, or perform power system maintenance, KRYKARD micro-ohmmeters provide the reliability and accuracy required for professional low resistance measurement applications.
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
                Need Expert Advice?
              </h2>
              <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">
                Our specialists provide comprehensive guidance on electrical measurement solutions and micro-ohmmeter applications.
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
          border: 2px solid #d1d5db !important;
        }

        .comparison-table table th,
        .comparison-table table td {
          border: 1px solid #d1d5db !important;
          border-collapse: collapse !important;
        }

        .comparison-table table thead tr {
          border-bottom: 3px solid #fbbf24 !important;
        }

        .comparison-table table tbody tr {
          border-bottom: 1px solid #d1d5db !important;
        }
      `}</style>
      </PageLayout>
    </>
  );
};

export default MicroOhmmeters;