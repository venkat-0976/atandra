import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence, circIn } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Shield,
  Gauge,
  FileText,
  Menu,
  X,
  ChevronRight,
  Star,
  BarChart,
  // Add this
  Monitor, // Add this
  // Remove BarChart and Star
  // other existing imports...
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { vector } from 'firebase/firestore';
import { FaVectorSquare } from 'react-icons/fa';
import { Svg } from '@react-three/drei';
import { svgEffect } from 'motion/react';
import { useGraph } from '@react-three/fiber';
import SeoHead from '@/seo/SeoHead';

const PowerQualityAnalyzersProducts = ({ data: initialData }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);
  // Slug Validation: Only use initialData if it belongs to this page
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'power-quality-analyzers') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    if (wpData) return;

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=power-quality-analyzers');
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
    // Skip during SSR
    if (typeof window === 'undefined' || typeof document === 'undefined') return;

    if (window.location.hash === '#products-section') {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  // Product data
  // Feature Highlight Component
  const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
    const getFeatureIcon = (title: string) => {
      const normalized = title.toLowerCase().trim();
      if (normalized.includes('safety') || normalized.includes('compliance')) return Shield;
      if (normalized.includes('power') || normalized.includes('load') || normalized.includes('zap')) return Zap;
      if (normalized.includes('harmonic') || normalized.includes('quality') || normalized.includes('measurement')) return Gauge;
      if (normalized.includes('data') || normalized.includes('storage') || normalized.includes('logging')) return FileText;
      if (normalized.includes('phasor') || normalized.includes('diagram')) return BarChart;
      if (normalized.includes('software') || normalized.includes('reporting') || normalized.includes('monitor')) return Monitor;
      return Zap; // Default
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

  const products = [
    {
      id: 'alm20',
      modelNumber: 'ALM 20',
      title: 'ALM 20 - 3 Channel Power Quality Analyzer',
      image: '/alm20_1.png',
      //displayInfo: '1,000V Ph-N',
      model: 'ALM 20',
      subtitle: 'Basic Power Quality Analyzer',
      voltage: '1,000V Ph-N',
      measurement: 'Power & Energy',
      accuracy: '±0.5%',
      features: [
        'Compact self-powered design',
        'Long-term monitoring capability',
        'AC/DC voltage measurement',
        'Power: kW, kVAr, kVA, PF & DPF',
        'Energy: kWh, kVArh, kVAh',
        'THD & Harmonics up to 50th order',
        'User-friendly interface',
        'Portable construction'
      ],
      specs: [
        'Voltage: Up to 1,000V Ph-N AC/DC',
        'Power: kW, kVAr, kVA, PF & DPF',
        'Energy: kWh, kVArh, kVAh',
        'Harmonics: THD & up to 50th order'
      ],
      applications: [
        'Basic power quality monitoring',
        'Energy consumption analysis',
        'Electrical system troubleshooting'
      ]
    },
    {
      id: 'alm31',
      title: 'ALM 31- 3 Channel Power Quality Analyzer',
      modelNumber: 'ALM 31',
      image: '/alm31_10.png',
      //displayInfo: '1,000V Ph-N',
      model: 'ALM 31',
      subtitle: 'Standard Power Quality Analyzer',
      voltage: '1,000V Ph-N',
      measurement: 'Power & Flicker',
      accuracy: '±0.5%',
      features: [
        'Color display for visualization',
        'Real-time power quality analysis',
        'AC/DC voltage measurement',
        'Power: kW, kVAr, kVA, PF & DPF',
        'Crest factor & K-factor',
        'Short flicker measurement (Pst)',
        'Advanced data logging',
        'Professional construction'
      ],
      specs: [
        'Voltage: Up to 1,000V Ph-N AC/DC',
        'Power: kW, kVAr, kVA, PF & DPF',
        'Crest Factor: Measurement capability',
        'Flicker: Short flicker (Pst)'
      ],
      applications: [
        'Professional power quality assessment',
        'Industrial facility monitoring',
        'Power system analysis'
      ]
    },
    {
      id: 'alm36',
      title: 'ALM 36 - 4 Channel Power Quality Analyzer',
      modelNumber: 'ALM 36',
      image: '/alm-36_1-1.png',
      //displayInfo: '1,000V Ph-N',
      model: 'ALM 36',
      subtitle: 'Advanced Power Quality Analyzer',
      voltage: '1,000V Ph-N',
      measurement: 'Transients & Harmonics',
      accuracy: '±0.2%',
      features: [
        'Transient capture up to 210 counts',
        'TrueInrush function',
        'THD & Harmonics up to 50th order',
        'Pst & Plt flicker measurements',
        'IEC compliance',
        'Advanced alarm system',
        'Comprehensive data analysis',
        'Industrial design'
      ],
      specs: [
        'Voltage: Up to 1,000V Ph-N AC/DC',
        'Transients: Up to 210 counts',
        'Harmonics: THD & up to 50th order',
        'Flicker: Pst & Plt measurements'
      ],
      applications: [
        'Advanced power quality analysis',
        'Industrial equipment monitoring',
        'Motor and drive system analysis'
      ]
    },
    {
      id: 'ca8345',
      title: 'CA 8345 - Class A Power Quality Analyzer',
      modelNumber: 'CA 8345',
      image: '/ca8345_qualistar_f.png',
      //displayInfo: '1,000V Ph-N',
      model: 'CA 8345',
      subtitle: 'Premium Power Quality Analyzer',
      voltage: '1,000V Ph-N',
      measurement: 'Class A Certified',
      accuracy: '±0.1%',
      features: [
        'Class A certified performance',
        'Harmonics up to 127th order',
        'Interharmonics up to 126th order',
        '2.5 μs transients capture',
        '16,362 alarms of 40 conditions',
        'Superior data storage',
        'Advanced PC software',
        'Professional certification'
      ],
      specs: [
        'Certification: Class A certified',
        'Harmonics: Up to 127th order',
        'Interharmonics: Up to 126th order',
        'Transients: 2.5 μs capture'
      ],
      applications: [
        'Premium power quality analysis',
        'Utility and grid monitoring',
        'Research and development'
      ]
    },
    {
      id: 'mn93a',
      title: 'Wide Measurement range current Transformers',
      modelNumber: 'MN93-A',
      image: '/CTs_FamilyImage.png',
      //displayInfo: '1,000V Ph-N',
      model: 'MN93-A',
      subtitle: 'Advanced Power Quality Analyzer',
      voltage: '1,000V Ph-N',
      measurement: 'Advanced Power Analysis',
      accuracy: '±0.2%',
      features: [
        'High-precision power measurements',
        'Advanced harmonic analysis up to 50th order',
        'Real-time power quality monitoring',
        'Comprehensive data logging and storage',
        'Professional-grade construction and safety',
        'Multi-channel voltage and current analysis',
        'Advanced triggering and event capture',
        'User-friendly interface with color display'
      ],
      specs: [
        'Voltage: Up to 1,000V Ph-N AC/DC',
        'Current: 5 mA to 10,000 Aac',
        'Harmonics: THD & up to 50th order',
        'Transients: 200+ capture capability'
      ],
      applications: [
        'Professional power quality analysis',
        'Industrial facility monitoring',
        'Power system commissioning',
        'Electrical installation verification'
      ]
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
      { title: "High Electrical Safety Standards", description: "All models comply with CAT III 1000V / CAT IV 600V safety norms in addition to IEC 61010 offering higher protection for safe operation." },
      { title: "Comprehensive Power Quality Measurement", description: "They measure voltage, current, frequency, power (kW, kVA, kVAr), power factor, energy values, harmonics, and flicker for detailed analysis." },
      { title: "Harmonic Analysis up to High Orders", description: "All units can capture harmonics (typically up to the 50th order or higher) on multiple parameters to identify waveform distortion." },
      { title: "Data Logging and Storage Flexibility", description: "They allow user-defined parameter selection, logging intervals, and durations, with storage via internal memory, SD cards, or direct PC connection." },
      { title: "Phasor Diagram Display", description: "All units can generate phasor diagrams with phase angles, aiding in network diagnosis and connection verification." },
      { title: "Software Integration for Reporting", description: "Supplied with DataView or similar software for configuration, data retrieval, and report generation (including EN50160 compliance reports)." }
    ];
  }, [wpData?.features_json]);

  // Hero Section (updated to match ThermalImagers style)
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
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">{wpData?.hero_badge || "KRYKARD Power Quality Solutions"}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  {wpData?.hero_title || "POWER QUALITY ANALYZERS"}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  {wpData?.hero_description || "Comprehensive power quality analysis solutions for professional electrical testing and monitoring."}
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
                    src={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/PQA_landing_image1.png")}
                    alt={wpData?.hero_title || "KRYKARD Power Quality Analyzers"}
                    className="w-21 max-w-xs h-21 object-contain"
                    width={1920}
                    height={1080}
                    loading="eager"
                    decoding="async"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };


  // Product Overview Card Component (following multimeter design pattern)
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
        {/* <span className="bg-yellow-100 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {product.modelNumber}
        </span> */}
      </div>
      {/* Product Image */}
      <div className="flex items-center justify-center h-36 md:h-44 bg-yellow-50">
        <img
          src={product.image}
          alt={`KRYKARD ${product.model} - ${product.subtitle}`}
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
          to={`/measure/power-quality-analyzers/product/${product.id}`}
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
    console.log('PowerQuality ComparisonTable rendering with products:', products.length);

    return (
      <div className="comparison-table bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full" style={{ fontFamily: 'Open Sans, sans-serif', display: 'block', visibility: 'visible', opacity: 1 }}>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">{wpData?.comparison_title || wpData?.comparison_table_title || "Model Comparison"}</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="border-b-2 border-yellow-400">
                <th className="text-left py-4 px-4 font-bold text-gray-900 bg-yellow-50 border border-gray-300">{wpData?.comparison_row_1?.feature || "Feature"}</th>
                {products.map(product => {
                  // Dynamic column title from WP if available
                  const colKey = product.id === 'alm20' ? 'product_1' :
                    product.id === 'alm31' ? 'product_2' :
                      product.id === 'alm36' ? 'product_3' :
                        product.id === 'ca8345' ? 'product_4' :
                          product.id === 'mn93a' ? 'product_5' : null;
                  const wpTitle = colKey ? wpData?.comparison_row_1?.[colKey] : null;

                  return (
                    <th key={product.id} className="text-center py-4 px-4 font-bold text-gray-900 bg-yellow-50 min-w-[200px] border border-gray-300">
                      {wpTitle || product.model}
                    </th>
                  );
                })}
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
    "name": "Power Quality Analyzers",
    "description": "KRYKARD power quality analyzers — power quality analyzer providing voltage, current, harmonic and energy analysis for industrial diagnostics.",
    "url": "https://atandra.in/measure/power-quality-analyzers",
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
          "url": `https://atandra.in/measure/power-quality-analyzers/product/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title={wpData?.hero_title ? `${wpData.hero_title} | Atandra` : "KRYKARD Power Quality Analyzers | Atandra"}
        description={wpData?.hero_description || "KRYKARD power quality analyzers providing voltage, current, harmonic and energy analysis for industrial diagnostics."}
        keywords="power quality analyzers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/power-quality-analyzers"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "https://atandra.in/PQA_landing_image1.png")}
        jsonLd={jsonLd}
        preloadImage="/PQA_landing_image1.png"
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
                  <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">
                    Power Quality Analyzers
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
                        {wpData?.products_badge || "PROFESSIONAL SERIES"}
                      </div>
                      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                        {wpData?.products_title || "Our Power Quality Analyzer Range"}
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                        {wpData?.products_description || "Solutions for advanced power quality monitoring and analysis"}
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
                              {wpData?.products_title || "Our Power Quality Analyzer Range"}
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                              {wpData?.products_description || "Solutions for advanced power quality monitoring and analysis"}
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
                              {wpData?.features_description || "Discover the standout features that make our analyzers the preferred choice for professionals."}
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
                              {wpData?.comparison_badge || "COMPARISON"}
                            </div>
                            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                              {wpData?.comparison_title || "Compare Our Models"}
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">
                              {wpData?.comparison_description || "Find the perfect analyzer for your specific requirements"}
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
                    {wpData?.bottom_cta_title || "Need More Information?"}
                  </h2>
                  <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">
                    {wpData?.bottom_cta_description || "Our team of experts is ready to help you with product specifications, custom solutions, and pricing."}
                  </p>
                  <Link
                    to="/contact/sales"
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
          </>
        )}
      </PageLayout >
    </>
  );
};

export default PowerQualityAnalyzersProducts;