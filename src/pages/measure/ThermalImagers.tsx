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

// Feature Highlight Component
const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
  const getFeatureIcon = (title: string) => {
    const normalized = title.toLowerCase().trim();
    if (normalized.includes('temperature') || normalized.includes('thermal') || normalized.includes('thermometer')) return Thermometer;
    if (normalized.includes('resolution') || normalized.includes('imaging') || normalized.includes('camera')) return Camera;
    if (normalized.includes('battery') || normalized.includes('power')) return Battery;
    if (normalized.includes('rugged') || normalized.includes('design') || normalized.includes('shield') || normalized.includes('durable')) return Shield;
    if (normalized.includes('user-friendly') || normalized.includes('interface') || normalized.includes('menu')) return Menu;
    if (normalized.includes('versatile') || normalized.includes('applications') || normalized.includes('star')) return Star;
    return Camera; // Default
  };

  const Icon = getFeatureIcon(title);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300 p-6 h-full bg-yellow-50/50 flex flex-col items-center text-center"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      <div className="flex flex-row items-center gap-3 mb-4 justify-center w-full">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
          <Icon className="h-6 w-6 text-gray-900" />
        </div>
        <h3 className="text-base md:text-lg font-extrabold text-gray-900 m-0 p-0">{title}</h3>
      </div>
      <p className="text-gray-700 font-medium text-sm md:text-base leading-relaxed px-2">{description}</p>
    </motion.div>
  );
};

const ThermalImagers = ({ data: initialData }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);
  // Slug Validation: Only use initialData if it belongs to this page
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'thermal-imagers') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    if (wpData) return;

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=thermal-imagers');
        const data = await response.json();
        if (data && data.length > 0) {
          setWpData(data[0].acf || data[0]);
        }
      } catch (error) {
        console.error('Error fetching WP data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWpData();
  }, [wpData]);

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

  // Parse features from WP or use defaults
  const displayFeatures = React.useMemo(() => {
    try {
      if (wpData?.features_json) {
        const trimmed = wpData.features_json.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          return JSON.parse(trimmed);
        } else {
          // Handle plain text format (blocks separated by double newlines)
          const blocks = trimmed.split(/\r?\n\s*\r?\n/);
          return blocks.map(block => {
            const lines = block.split(/\r?\n/).filter(l => l.trim());
            if (lines.length === 0) return null;

            let title = lines[0]?.trim() || "";
            let description = lines.slice(1).join(" ").trim() || "";

            // Check for Title - Description or Title : Description
            const separators = [" – ", " - ", " : ", " :"];
            for (const sep of separators) {
              if (title.includes(sep)) {
                const parts = title.split(sep);
                title = parts[0]?.trim();
                description = parts.slice(1).join(sep).trim() + (description ? " " + description : "");
                break;
              }
            }

            return { title, description };
          }).filter(f => f && f.title);
        }
      }
    } catch (e) {
      console.error("Error parsing features_json:", e);
    }
    return [
      { title: "Precise Temperature Measurement", description: "Accurate thermal imaging with professional-grade sensors to deliver reliable and consistent temperature readings." },
      { title: "High Resolution Imaging", description: "Crystal clear thermal images with multiple resolution options ranging from 96×96 to 1280×1024 for detailed analysis." },
      { title: "Long Battery Life", description: "Extended operational time designed for field applications with efficient power management for uninterrupted inspections." },
      { title: "Rugged Design", description: "Durable construction built to withstand harsh industrial environments and demanding working conditions." },
      { title: "User-Friendly Interface", description: "Intuitive controls and clear display interfaces enable quick setup and effortless operation in the field." },
      { title: "Versatile Applications", description: "Suitable for electrical systems, mechanical equipment, building inspections, and HVAC applications across various industries." }
    ];
  }, [wpData?.features_json]);

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
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">{wpData?.hero_badge || "KRYKARD Thermal Solutions"}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  {wpData?.hero_title || "THERMAL IMAGERS"}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  {wpData?.hero_description || "Professional-grade thermal imaging solutions for accurate temperature measurement and visualization across various applications."}
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link to={wpData?.hero_cta_link || "/contact/sales"}>
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold rounded-lg shadow-md transition duration-300 flex items-center space-x-2 font-['Open_Sans']"
                    >
                      <span>{wpData?.hero_cta_text || wpData?.hero_button_text || "Request Demo"}</span>
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
                    src={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/thermalimager-09.png")}
                    alt={wpData?.hero_title || "KRYKARD Thermal Imagers"}
                    className="w-full max-w-xl h-auto object-contain"
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
  // const ComparisonTable = () => {
  //   return (
  //     <div className="comparison-table bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full" style={{ fontFamily: 'Open Sans, sans-serif' }}>
  //       <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
  //         <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">{wpData?.comparison_table_title || "Model Comparison"}</h3>
  //       </div>
  //       <div className="p-12 text-center">
  //         <p className="text-lg text-gray-600 italic">
  //           {wpData?.comparison_description || "Detailed comparison data is being updated. Please check back soon or contact our experts for a personalized recommendation."}
  //         </p>
  //         {wpData?.bottom_cta_button_text && (
  //           <Link
  //             to="/contact/sales"
  //             className="mt-6 inline-flex px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-md transition-all duration-300 items-center space-x-2"
  //           >
  //             <span>{wpData.bottom_cta_button_text}</span>
  //             <ArrowRight className="h-4 w-4" />
  //           </Link>
  //         )}
  //       </div>
  //     </div>
  //   );
  // };

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
        title={wpData?.seo_title || (wpData?.hero_title ? `${wpData.hero_title} | Atandra` : "KRYKARD Thermal Imagers | Atandra")}
        description={wpData?.seo_description || wpData?.hero_description || "KRYKARD thermal imagers for power system diagnostics deliver accurate temperature imaging for preventive maintenance and electrical inspections."}
        keywords="thermal imagers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/thermal-imagers"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/thermalimager-09.png")}
        jsonLd={jsonLd}
        preloadImage="/thermalimager-09.png"
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {/* Hide Breadcrumbs and Remove Top Padding */}
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        {isLoading ? (
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full"
            />
          </div>
        ) : (
          <>
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
                    Thermal Imagers
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
                        {wpData?.products_badge || "PROFESSIONAL SERIES"}
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {wpData?.products_title || "Our Thermal Imager Range"}
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                        {wpData?.products_description || "Solutions for advanced thermal imaging and temperature measurement"}
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
                              {wpData?.products_badge || "PRODUCTS"}
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                              {wpData?.products_title || "Our Thermal Imager Range"}
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                              {wpData?.products_description || "Solutions for advanced thermal imaging and temperature measurement"}
                            </p>
                          </motion.div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
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
                              {wpData?.features_title || "Key Features"}
                            </h2>
                            <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-2">
                              {wpData?.features_description || "Discover the standout features that make our thermal imagers the preferred choice for professionals."}
                            </p>
                          </motion.div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
                            {displayFeatures.map((feature, index) => (
                              <FeatureHighlight
                                key={index}
                                title={feature.title}
                                description={feature.description}
                              />
                            ))}
                          </div>
                        </div>
                      </section>
                    </motion.div>
                  )}


                </AnimatePresence>
              </>
            )}

            {/* Contact / CTA Section - Always show at bottom */}
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
                    {wpData?.bottom_cta_title || "Need More Information?"}
                  </h2>
                  <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">
                    {wpData?.bottom_cta_description || "Our team of experts is ready to help you with product specifications, custom solutions, and pricing."}
                  </p>
                  <Link
                    to={wpData?.bottom_cta_link || "/contact/sales"}
                    className="inline-flex px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 items-center justify-center space-x-2 text-base mx-auto"
                  >
                    <span>{wpData?.bottom_cta_button_text || "Contact Our Experts"}</span>
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
          </>
        )}
      </PageLayout>
    </>
  );
};

export default ThermalImagers;

