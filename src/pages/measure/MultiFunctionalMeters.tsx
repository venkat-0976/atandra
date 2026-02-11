import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
  Gauge,
  Zap,
  Shield,
  FileText,
  Star
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import SeoHead from '@/seo/SeoHead';

// Modern Background Component
const ModernBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Abstract shapes */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-yellow-100 rounded-bl-full opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-yellow-200 rounded-tr-full opacity-20"></div>
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  );
};

const PDF_URL = "/T&M April 2025.pdf";

const tabs = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'comparison', label: 'Compare', icon: Star }
];

// Product Overview Card Component
const ProductCard = ({
  title,
  modelNumber,
  image,
  displayInfo,
  productId
}: {
  title: string;
  modelNumber: string;
  image: string;
  displayInfo: string;
  productId: string;
}) => {
  return (
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
        <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">
          {modelNumber}
        </span>
      </div>
      {/* Product Image */}
      <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
        <img
          src={image}
          alt={`${title} - KRYKARD ${modelNumber} Multi Functional Meter`}
          className="max-h-full max-w-full object-contain"
        // onError={e => {
        //   e.currentTarget.onerror = null;
        //   e.currentTarget.src = 'https://via.placeholder.com/200x150/FFD700/000000?text=No+Image';
        // }}
        />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="text-center mb-2">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <div className="text-xs text-gray-600 mt-1">{displayInfo}</div>
        </div>
        <Link
          to={`/measure/multi-functional-meters/product/${productId}`}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="inline h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );
};

// Hero Section (updated to match PowerQuality style)
const HeroSection = ({ onViewBrochure }) => (
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
              <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Multi Function Meter Solutions</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
              MULTI FUNCTION METERS
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
              Advanced energy measurement solutions for comprehensive monitoring and analysis in every professional application.
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
                onClick={onViewBrochure}
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
                src="/multifunctionmeter-09.png"
                alt="KRYKARD Multi Functional Meters for Industrial Applications"
                className="w-full max-w-xl h-auto object-contain"
              // onError={e => {
              //   e.currentTarget.onerror = null;
              //   e.currentTarget.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Multi+Functional+Meter';
              // }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
);

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

// Navigation Component
const Navigation = ({ activeTab, setActiveTab }) => (
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
const ComparisonTable = ({ products }) => {
  console.log('MultiFunctionalMeters ComparisonTable rendering with products:', products.length);

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
              {products.slice(0, 4).map(product => (
                <th key={product.id} className="text-center py-4 px-4 font-bold text-gray-900 bg-yellow-50 min-w-[200px] border border-gray-300">
                  {product.modelNumber}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
              <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Display Info</td>
              {products.slice(0, 4).map(product => (
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                  {product.displayInfo}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
              <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Type</td>
              {products.slice(0, 4).map(product => (
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                  {product.title}
                </td>
              ))}
            </tr>
            <tr className="hover:bg-yellow-50 transition-colors">
              <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Application</td>
              {products.slice(0, 4).map(product => (
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                  Energy Monitoring
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Main Multi Functional Meters Component
const MultiFunctionalMeters = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
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

  const handleViewBrochure = () => {
    window.open(PDF_URL, '_blank');
  };

  // Product Data
  const products = [
    {
      id: "digi530",
      title: "Standard Multi Function Meter",
      modelNumber: "DiGi 530",
      image: "/DiGi530S-H-01.png",
      displayInfo: "Class 0.5s Accuracy"
    },
    {
      id: "digi630",
      title: "Advanced Multi Function Meter",
      modelNumber: "DiGi 630",
      image: "/DiGi630-01.png",
      displayInfo: "Class 0.5s/0.2s Accuracy"
    },
    {
      id: "digi730",
      title: "Premium Multi Function Meter",
      modelNumber: "DiGi 730",
      image: "/DiGi730S-D-01.png",
      displayInfo: "Class 0.5s/0.2s Accuracy"
    },
    {
      id: "digi760",
      title: "High Precision Meter",
      modelNumber: "DiGi 760",
      image: "/DiGi760-01.png",
      displayInfo: "Class 0.2s with TFT Display"
    },
    {
      id: "digi820",
      title: "Power Quality Analyzer",
      modelNumber: "DiGi 820",
      image: "/DiGi820-01-01.png",
      displayInfo: "Class A Power Quality"
    },
    {
      id: "multy4",
      title: "Multi-Channel Meter",
      modelNumber: "Multy4",
      image: "/Multifunctional meters/Multy_4-removebg-preview.png",
      displayInfo: "4 Channel Monitoring"
    },
    {
      id: "plmr90",
      title: "DC Energy Meter",
      modelNumber: "PLM R90",
      image: "/PLm_R90-removebg-preview-01.png",
      displayInfo: "1Φ DC Energy Meter"
    },
    {
      id: "plmr91",
      title: "AC Energy Meter",
      modelNumber: "PLM R91",
      image: "/R_91-removebg-preview-01-01.png",
      displayInfo: "1Φ AC Energy Meter"
    },
    {
      id: "plmr93",
      title: "3-Phase Energy Meter",
      modelNumber: "PLM R93",
      image: "/PLM93-01-01-01.png",
      displayInfo: "3Φ AC Energy Meter"
    },
    {
      id: "eon40",
      title: "Advanced Energy Meter",
      modelNumber: "EON 4.0",
      image: "/EON-meter-01.png",
      displayInfo: "Class 0.5 with IoT"
    }
  ];

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Multi Functional Meters",
    "description": "KRYKARD multi functional meters — professional‑grade electrical measurement for industrial applications.",
    "url": "https://atandra.in/measure/multi-functional-meters",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "description": product.displayInfo,
          "brand": {
            "@type": "Brand",
            "name": "KRYKARD"
          },
          "model": product.modelNumber,
          "url": `https://atandra.in/measure/multi-functional-meters/product/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="KRYKARD Multi Functional Meters | Atandra"
        description="KRYKARD multi functional meters — professional‑grade electrical measurement for industrial applications."
        keywords="multi functional meters, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/multi-functional-meters"
        ogImage="https://atandra.in/multifunctionmeter-09.png"
        jsonLd={jsonLd}
        preloadImage="/multifunctionmeter-09.png"
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        {/* Show Hero Section only when not in products-only view AND on overview tab */}
        {!showOnlyProducts && activeTab === 'overview' && (
          <HeroSection onViewBrochure={handleViewBrochure} />
        )}

        {/* Navigation - Always show after hero section for normal view */}
        {!showOnlyProducts && <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />}

        {/* Show only products view */}
        {showOnlyProducts ? (
          <>
            {/* Navigation for products-only view */}
            <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* Main Title */}
            <div className="w-full py-6 text-center">
              <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">
                Multi Functional Meters
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
                    Our Multi Function Meter Range
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                    Advanced energy measurement solutions for monitoring and analyzing electrical parameters with precision.
                  </p>
                </motion.div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {products.map(product => (
                    <ProductCard
                      key={product.id}
                      title={product.title}
                      modelNumber={product.modelNumber}
                      image={product.image}
                      displayInfo={product.displayInfo}
                      productId={product.id}
                    />
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
                  {/* Product Cards Section */}
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
                          Our Multi Function Meter Range
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                          Advanced energy measurement solutions for monitoring and analyzing electrical parameters with precision.
                        </p>
                      </motion.div>
                      {/* Responsive Product Card Grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                        {products.map(product => (
                          <ProductCard
                            key={product.id}
                            title={product.title}
                            modelNumber={product.modelNumber}
                            image={product.image}
                            displayInfo={product.displayInfo}
                            productId={product.id}
                          />
                        ))}
                      </div>
                    </div>
                  </section>

                  {/* Key Features Section */}
                  <KeyFeaturesSection />
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
                          Find the perfect multi functional meter for your specific requirements
                        </p>
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full"
                      >
                        <ComparisonTable products={products} />
                      </motion.div>
                    </div>
                  </section>
                </motion.div>
              )}
            </AnimatePresence>
          </>
        )}

        {/* Contact Section - Always show at bottom */}
        <ContactSection />

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

// Key Features Section (updated to match PowerQuality style)
const KeyFeaturesSection = () => {
  const features = [
    {
      icon: Gauge,
      title: "High Accuracy",
      description: "Precision measurements with accuracy classes from 0.2s to 1.0, ensuring reliable readings for critical applications."
    },
    {
      icon: Zap,
      title: "Advanced Monitoring",
      description: "Comprehensive energy monitoring with power quality analysis, harmonics measurement, and real-time data logging."
    },
    {
      icon: Shield,
      title: "Robust Design",
      description: "Built for industrial environments with rugged construction, wide operating temperature range, and reliable performance."
    }
  ];

  return (
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
            Discover the standout features that make our multi functional meters the preferred choice for professionals.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {features.map((feature, index) => (
            <FeatureHighlight
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Section Component (updated to match PowerQuality style)
const ContactSection = () => {
  return (
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
            Our team of experts is ready to help you with product specifications, custom solutions, pricing, and any other details you need about KRYKARD Multi Functional Meters.
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
  );
};

export default MultiFunctionalMeters;