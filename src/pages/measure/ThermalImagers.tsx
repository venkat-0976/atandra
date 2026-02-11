import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Thermometer,
  Camera,
  Battery,
  Shield,
  FileText,
  Menu,
  Star,
  Gauge
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

// PDF URL for brochure
const PDF_URL = "/T&M April 2025.pdf";

// Product Overview Card Component (following powerquality design pattern)
const ProductOverviewCard = ({ product }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    style={{ fontFamily: 'Open Sans, sans-serif' }}
  >
    {/* Removed Model Number Badge top right edge */}
    <div className="flex justify-end p-3" style={{ visibility: 'hidden', height: '0.5rem' }}>
      {/* Intentionally left empty to preserve alignment */}
    </div>
    {/* Product Image */}
    <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
      <img
        src={product.image}
        alt={`KRYKARD ${product.title} Thermal Imager for Temperature Measurement`}
        className="max-h-full max-w-full object-contain"
         width={1200}
         height={800}
         loading="eager"
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
        to={`/measure/thermal-imagers/product/${product.id}`}
        className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 flex items-center justify-center space-x-2"
      >
        <span>View Details</span>
        <ArrowRight className="inline h-4 w-4 ml-1" />
      </Link>
    </div>
  </motion.div>
);

const ThermalImagers = () => {
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

  // Product data
  const products = [
    {
      id: "ma-250",
      title: "MA 250",
      //odelNumber: "MA 250",
      image: "/MA250-01.png",
      displayInfo: "256 × 192 IR Resolution"

    },
    {
      id: "tc-e050",
      title: "TC E050",
      //delNumber: "TC E050",
      image: "/TCE050-overview-01-01.png",
      displayInfo: "96 × 96 IR Resolution"
    },
    {
      id: "tc-s030",
      title: "TC S030",
      //delNumber: "TC S030",
      image: "/TC-S030-Overview-01.png",
      displayInfo: "96 × 96 IR Resolution"
    },
    {
      id: "tc-s240",
      title: "TC S240",
      //odelNumber: "TC S240",
      image: "/TCS240-overview-01.png",
      displayInfo: "256 × 192 IR Resolution"

    },
    {
      id: "tc-2150",
      title: "TC 2150",
      //odelNumber: "TC 2150",
      image: "/TC2150-overview-01-01.png",
      displayInfo: "192 × 144 IR Resolution"
    },
    {
      id: "tc-2250",
      title: "TC 2250",
      //odelNumber: "TC 2250",
      image: "/TC-2250-01.png",
      displayInfo: "256 × 192 IR Resolution"
    },

    {
      id: "tc-3151",
      title: "TC 3151",
      //odelNumber: "TC 3151",
      image: "/TCC-3151-overview-01.png",
      displayInfo: "192 × 144 IR Resolution"
    },
    {
      id: "tc-3250",
      title: "TC 3250",
      //odelNumber: "TC 3250",
      image: "/thermal-measurement/TC-3250.png",
      displayInfo: "256 × 192 IR Resolution"
    },
    {
      id: "tc-3360",
      title: "TC 3360",
      //odelNumber: "TC 3360",
      image: "/TC-3360-overview-01.png",
      displayInfo: "384 × 288 IR Resolution"
    },
    {
      id: "tc-3660",
      title: "TC 3660",
      //odelNumber: "TC 3660",
      image: "/Overview-image-3660-01.png",
      displayInfo: "640 × 480 IR Resolution"
    },
    {
      id: "tc-p360",
      title: "TC P360",
      //odelNumber: "TC P360",
      image: "/TCP-360-overview-01.png",
      displayInfo: "384 × 288 IR Resolution"
    },
    {
      id: "tc-4360",
      title: "TC 4360",
      //odelNumber: "TC 4360",
      image: "/TC4360-overview-01.png",
      displayInfo: "384 × 288 IR Resolution"
    },
    {
      id: "tc-4460",
      title: "TC 4460 / TC 4460H",
      //odelNumber: "TC 4460 / TC 4460H",
      image: "/TC4460-overview-01.png",
      displayInfo: "640 × 480 IR Resolution"
    },

    {
      id: "tc-4660",
      title: "TC 4660 / TC 4660H",
      //odelNumber: "TC 4660 / TC 4660H",
      image: "/TC-4660-overview-01.png",
      displayInfo: "640 × 480 IR Resolution"
    },
    {
      id: "tcc-7460",
      title: "TCC 7460 / TCC 742K",
      //odelNumber: "TCC 7460 / TCC 742K",
      image: "/TC-7460-overview-01.png",
      displayInfo: "480 × 360 IR Resolution"
    },
    {
      id: "tcc-7660",
      title: "TCC 7660 / TCC 762K",
      //delNumber: "TCC 7660 / TCC 762K",
      image: "/TC-7660-overview-01.png",
      displayInfo: "640 × 480 IR Resolution"
    },
    {
      id: "tcc-812k",
      title: "TCC 812K",
      //odelNumber: "TCC 812K",
      image: "/TC-812k-overview-01-01.png",
      displayInfo: "1280 × 1024 IR Resolution"
    }
  ];

  // Navigation tabs
  const tabs = [
    { id: 'overview', label: 'Overview', icon: Gauge },
    { id: 'comparison', label: 'Compare', icon: Star }
  ];

  // Hero Section (updated to match powerquality style)
  const HeroSection = () => {
    const handleViewBrochure = () => window.open(PDF_URL, '_blank');
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
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Thermal Solutions</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  THERMAL IMAGERS
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  Professional-grade thermal imaging solutions for accurate temperature measurement and visualization across various applications.
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
                    src="/thermalimager-09.png"
                    alt="KRYKARD Thermal Imagers for Power System Diagnostics and Electrical Inspection"
                    className="w-full max-w-xl h-auto object-contain"
                  // onError={e => {
                  //   e.currentTarget.onerror = null;
                  //   e.currentTarget.src = 'https://via.placeholder.com/400x300/FFD700/000000?text=Thermal+Imager';
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

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KRYKARD Thermal Imagers",
    "description": "KRYKARD Thermal Imagers - Power System Diagnostics — thermal imager offering temperature imaging for diagnostics, maintenance and electrical inspection.",
    "url": "https://atandra.in/measure/thermal-imagers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "url": `https://atandra.in/measure/thermal-imagers/product/${product.id}`,
          "image": `https://atandra.in${product.image}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="KRYKARD Thermal Imagers | Atandra"
        description="KRYKARD thermal imagers for power system diagnostics deliver accurate temperature imaging for preventive maintenance and electrical inspections."
        keywords="thermal imagers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/thermal-imagers"
        ogImage="/thermalimager-09.png"
        jsonLd={jsonLd}
        preloadImage="/thermalimager-09.png"
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {/* Hide Breadcrumbs and Remove Top Padding */}
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        {/* Show Hero Section only when not in products-only view */}
        {!showOnlyProducts && <HeroSection />}
        {/* Show only products view */}
        {showOnlyProducts ? (
          <>
            {/* Navigation - Move here, just above the main title */}
            <Navigation />
            {/* Main Title */}
            <div className="w-full py-6 text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">
                Thermal Imagers
              </h2>
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
                    Our Thermal Imager Range
                  </h2>
                  <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                    Solutions for advanced thermal imaging and temperature measurement
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
            {/* Product Overview Section */}
            {activeTab === 'overview' && (
              <section id="products-section" className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Navigation - Move here, just above the product section heading */}
                  <Navigation />
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
                      Our Thermal Imager Range
                    </h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                      Solutions for advanced thermal imaging and temperature measurement
                    </p>
                  </motion.div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                    {products.map((product) => (
                      <ProductOverviewCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>
              </section>
            )}
          </>
        )}
        {/* Key Features Section */}
        {activeTab === 'overview' && (
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
                  Discover the standout features that make our thermal imagers the preferred choice for professionals.
                </p>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                <FeatureHighlight
                  icon={Thermometer}
                  title="Precise Temperature Measurement"
                  description="Accurate thermal imaging with professional-grade sensors for reliable temperature readings."
                />
                <FeatureHighlight
                  icon={Camera}
                  title="High Resolution Imaging"
                  description="Crystal clear thermal images with various resolution options from 96×96 to 1280×1024."
                />
                <FeatureHighlight
                  icon={Battery}
                  title="Long Battery Life"
                  description="Extended operation time for field applications with efficient power management."
                />
                <FeatureHighlight
                  icon={Shield}
                  title="Rugged Design"
                  description="Built to withstand harsh industrial environments with durable construction."
                />
                <FeatureHighlight
                  icon={Menu}
                  title="User-Friendly Interface"
                  description="Intuitive controls and displays for quick setup and easy operation in the field."
                />
                <FeatureHighlight
                  icon={Star}
                  title="Versatile Applications"
                  description="Suitable for electrical, mechanical, building inspection, and HVAC applications."
                />
              </div>
            </div>
          </section>
        )}
        {/* Contact Section - Reduced size */}
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
      </PageLayout>
    </>
  );
};

export default ThermalImagers;
