import React, { useState, useEffect } from "react";
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
  ChevronRight,
  Star,
  Settings,
  Database
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

// Feature Highlight Component
const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
  const getFeatureIcon = (title: string) => {
    const normalized = title.toLowerCase().trim();
    if (normalized.includes('precision') || normalized.includes('accuracy') || normalized.includes('methods')) return Gauge;
    if (normalized.includes('zap') || normalized.includes('high')) return Zap;
    if (normalized.includes('safety') || normalized.includes('compliance') || normalized.includes('features')) return Shield;
    if (normalized.includes('data') || normalized.includes('storage') || normalized.includes('logging') || normalized.includes('documentation')) return FileText;
    if (normalized.includes('management')) return Database;
    if (normalized.includes('interface')) return Menu;
    if (normalized.includes('advanced')) return Settings;
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

const earthTesters = [
  {
    id: 'ca-6424',
    title: '2P/3P Earth Tester',
    modelNumber: 'CA 6424',
    image: '/earth testers/CA 6424.png',
    displayInfo: '600 V',
    model: 'CA 6424',
    subtitle: '2P/3P Earth Tester',
    voltage: '600 V',
    measurement: '2P/3P',
    accuracy: '±2%',
    features: [
      'Backlit custom 206-segment LCD',
      'Auto Power off',
      'Noise indication',
      'Measurement Mode: V, I, R 2P (Ω), R 3P (Ω)'
    ],
    specs: [
      'Voltage: Upto 600 V',
      '2P earth resistance/accuracy: 0.05 Ω to 50 kΩ/± (2%R +1count)',
      '3P earth resistance/accuracy: 0.5 Ω-50.00 kΩ/± (2%R +1count)',
      'RH stake resistance: 0.05 Ω to 49.99 kΩ',
      'U₀ voltage measurement: Upto 600 VAC',
      'Leakage current: Upto 60.00 A'
    ],
    applications: [
      'Ground system verification',
      'Lightning protection system testing',
      'Utility and substation testing',
      'Construction site safety'
    ]
  },
  {
    id: 'ca-6460',
    title: '4P Earth Tester',
    modelNumber: 'CA 6460',
    image: '/earth testers/CA 6460.png',
    displayInfo: '2,000 Ω',
    model: 'CA 6460',
    subtitle: '4P Earth Tester',
    voltage: '2,000 Ω',
    measurement: '4P',
    accuracy: '±2%',
    features: [
      'Large backlit digital display with 2,000 counts',
      '3 fault presence indicators to validate measurement',
      'Battery',
      'Non Rechargeable/ Rechargeable Batteries'
    ],
    specs: [
      '3-in-1 tester',
      'Resistivity: ("Wenner method" (4-rod method))',
      'Ground Resistance: ("TAGG method" (62% method))',
      'Resistance Range: 0.01 to 2,000 Ω (3 automatic ranges)',
      'Test current: 10mA, 1mA, 0.1mA',
      'Accuracy: ±2% ±1point',
      'Frequency: 128Hz'
    ],
    applications: [
      'Ground system verification',
      'Industrial plant maintenance',
      'Lightning protection system testing',
      'Utility and substation testing'
    ]
  },
  {
    id: 'ca-6470n',
    title: '3P/4P Earth Tester',
    modelNumber: 'CA 6470N',
    image: '/earth testers/CA 6470N.png',
    displayInfo: '99.9 kΩ',
    model: 'CA 6470N',
    subtitle: '3P/4P Earth Tester',
    voltage: '99.9 kΩ',
    measurement: '3P/4P',
    accuracy: '±2%',
    features: [
      'Backlit LCD display featuring (3 simultaneous display levels)',
      'Noise interference detection',
      'Alarm function',
      'Memory: 512 memory locations',
      'Communication: USB'
    ],
    specs: [
      '4-in-1 tester (CA 6470N): Earth, Resistivity, Coupling, Continuity',
      '3-pole, 4-pole measurements Range: 0.01 Ω to 99.9 kΩ',
      'Frequency: 41 to 512 Hz',
      'Selective 4-pole measurements, 2 clamps (CA 6471)',
      'Range: 0.01 Ω to 500 Ω',
      'Frequency: 128 Hz, 1367 Hz, 1611 Hz, 1758 Hz',
      'Resistivity Range: 0.01 Ω to 99.9 kΩ',
      'Frequency: 128 Hz'
    ],
    applications: [
      'Ground system verification',
      'Industrial plant maintenance',
      'Lightning protection system testing',
      'Utility and substation testing'
    ]
  },
  {
    id: 'ca-6472',
    title: 'Advanced 3P/4P Earth Tester',
    modelNumber: 'CA 6472',
    image: '/earth testers/CA 6472.png',
    displayInfo: '99.9 kΩ',
    model: 'CA 6472',
    subtitle: 'Advanced 3P/4P Earth Tester',
    voltage: '99.9 kΩ',
    measurement: '3P/4P',
    accuracy: '±2%',
    features: [
      'Backlit LCD display featuring (3 simultaneous display levels)',
      'Automatic & Expert mode',
      'Earth measurement on Pylons with earth cable (with CA 6474 option)',
      'Alarm function',
      'Memory: 512-record memory',
      'Communication: USB',
      'Measurement with CA 6474 Range: 0.001 Ω to 99.9 kΩ',
      'Frequency: 41 to 5078 Hz'
    ],
    specs: [
      '3P, 4P/4P Selective Method: Range: 0.01 Ω to 99.9 kΩ',
      'Frequency: 41 to 5,078 Hz',
      'Earth Measurement (2 clamps) Range: 0.01 Ω to 500 Ω',
      'Frequency: 1,367 Hz (auto) & 1,367 Hz, 1,611 Hz, 1,758 Hz (manual)',
      'Resistivity: Range: 0.01 Ω to 99.9 kΩ',
      'Frequency: 41 to 128 Hz',
      'Earth Potential Range: 0.01 mV to 65.00 V',
      'Frequency: 41 to 128 Hz',
      'DC Resistance Range: 0.001 Ω to 99.9 kΩ'
    ],
    applications: [
      'Research and development',
      'Utility and substation testing',
      'Industrial plant maintenance',
      'Lightning protection system testing'
    ]
  }
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'comparison', label: 'Compare', icon: Star }
];

const EarthTesters = ({ data: initialData }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);

  // Slug Validation: Only use initialData if it belongs to this page
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'earth-testers') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

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
      { title: "High Precision", description: "Advanced technology for precise resistance measurements with industry-leading accuracy up to ±2% of reading." },
      { title: "Multiple Methods", description: "Support for 2-pole, 3-pole, 4-pole, and selective testing techniques for comprehensive earth system analysis." },
      { title: "Data Management", description: "Built-in memory and connectivity options for storing measurements and transferring data to computers for documentation." },
      { title: "Safety & Compliance", description: "Test and verify grounding systems for compliance with safety standards and regulatory requirements." },
      { title: "Advanced Features", description: "Automatic modes, expert settings, and noise interference detection for reliable measurements in all conditions." },
      { title: "Documentation", description: "Comprehensive measurement logging with time/date stamps and USB connectivity for easy report generation." }
    ];
  }, [wpData?.features_json]);

  useEffect(() => {
    if (wpData) return;

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=earth-testers');
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
                  <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">{wpData?.hero_badge || "KRYKARD Earth Testing Solutions"}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                  {wpData?.hero_title || "EARTH TESTERS"}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                  {wpData?.hero_description || "Professional-grade instruments for accurate ground resistance measurements and comprehensive earth system analysis."}
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
                    src={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/earth_tester-01.png")}
                    alt={wpData?.hero_title || "KRYKARD Earth Testers for 2-Pole, 3-Pole and 4-Pole Ground Resistance Measurement"}
                    className="w-full lg:w-[600px] h-auto lg:h-[500px] object-contain"
                    width={600}
                    height={500}
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

  // Feature Highlight Component

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
          alt={`${product.title} - KRYKARD ${product.model} Earth Tester for ${product.measurement || 'Ground Resistance Testing'}`}
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
          to={`/measure/earth-testers/product/${product.id}`}
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
    console.log('EarthTesters ComparisonTable rendering with products:', earthTesters.length);

    return (
      <div className="comparison-table bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full" style={{ fontFamily: 'Open Sans, sans-serif', display: 'block', visibility: 'visible', opacity: 1 }}>
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">{wpData?.comparison_title || wpData?.comparison_table_title || "Model Comparison"}</h3>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="border-b-2 border-yellow-400">
                <th className="text-left py-4 px-4 font-bold text-gray-900 bg-yellow-50 border border-gray-300">Feature</th>
                {earthTesters.map(product => (
                  <th key={product.id} className="text-center py-4 px-4 font-bold text-gray-900 bg-yellow-50 min-w-[200px] border border-gray-300">
                    {product.model}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Voltage Range</td>
                {earthTesters.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.voltage}
                  </td>
                ))}
              </tr>
              <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Measurement</td>
                {earthTesters.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">
                    {product.measurement}
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-yellow-50 transition-colors">
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Accuracy</td>
                {earthTesters.map(product => (
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
    "name": "Earth Testers",
    "description": "KRYKARD earth testers — earth resistance tester providing accurate 2‑pole, 3‑pole and 4‑pole ground measurement for electrical systems.",
    "url": "https://atandra.in/measure/earth-testers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": earthTesters.map((product, index) => ({
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
          "url": `https://atandra.in/measure/earth-testers/product/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title={wpData?.hero_title ? `${wpData.hero_title} | Atandra` : "KRYKARD Earth Testers | Atandra"}
        description={wpData?.hero_description || "KRYKARD earth testers — earth resistance tester providing accurate 2‑pole, 3‑pole and 4‑pole ground measurement for electrical systems."}
        keywords="earth testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance"
        canonical="https://atandra.in/measure/earth-testers"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/earth_tester-01.png")}
        jsonLd={jsonLd}
        preloadImage="/earth_tester-01.png"
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
                    Earth Testers
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
                        {wpData?.products_title || "Our Earth Tester Range"}
                      </h2>
                      <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                        {wpData?.products_description || "Choose the perfect earth tester for your ground resistance measurement needs."}
                      </p>
                    </motion.div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                      {earthTesters.map((product) => (
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
                              {wpData?.products_title || "Our Earth Tester Range"}
                            </h2>
                            <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">
                              {wpData?.products_description || "Choose the perfect earth tester for your ground resistance measurement needs."}
                            </p>
                          </motion.div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8">
                            {earthTesters.map((product) => (
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
                              {wpData?.features_description || "Discover the standout features that make our earth testers the preferred choice for professionals."}
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
                              {wpData?.comparison_description || "Find the perfect earth tester for your specific requirements"}
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
              .seo-details-earth summary {
                list-style: none;
              }
              .seo-details-earth summary::-webkit-details-marker {
                display: none;
              }
            `}</style>

                <details className="seo-details-earth group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>

                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                        Understanding Earth Testing and Ground Resistance Measurement
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Earth testers, also known as ground resistance testers or earth resistance meters, are essential instruments for measuring the electrical resistance of grounding systems and earth electrodes. These professional-grade tools are critical for ensuring electrical safety, compliance with safety standards, and proper functioning of electrical installations. Ground resistance measurement is fundamental to electrical safety, as it verifies that grounding systems can effectively dissipate fault currents and protect personnel and equipment from electrical hazards. KRYKARD earth testers provide accurate 2-pole, 3-pole, and 4-pole measurement methods for comprehensive ground system analysis across various industrial, commercial, and utility applications.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Applications and Benefits of Professional Earth Testers
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        KRYKARD earth testers are specifically designed for professionals who require accurate ground resistance measurement in ground system verification, lightning protection system testing, utility and substation testing, construction site safety, industrial plant maintenance, and electrical safety compliance. Our comprehensive range includes 2P/3P earth testers for standard measurements, 4P earth testers for resistivity analysis using the Wenner method, and advanced 3P/4P testers with selective measurement capabilities. These instruments support multiple measurement techniques including 2-pole, 3-pole, 4-pole, and selective methods, enabling professionals to choose the most appropriate technique for their specific application. With accuracy up to ±2% and measurement ranges from 0.01 Ω to 99.9 kΩ, KRYKARD earth testers deliver reliable results for all ground resistance testing requirements.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Technical Excellence and Advanced Features
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        KRYKARD earth testers offer exceptional performance with advanced features including backlit LCD displays, automatic and expert measurement modes, noise interference detection, alarm functions, and comprehensive data management capabilities. Our advanced models feature memory storage for up to 512 measurements, USB connectivity for data transfer, automatic phase sequence adjustment, and selective measurement capabilities for complex grounding systems. The instruments support multiple test frequencies from 41 Hz to 5,078 Hz, enabling accurate measurements in various environmental conditions. With features like automatic power-off, HOLD and PRE-HOLD functions, and comprehensive measurement logging with time/date stamps, KRYKARD earth testers provide the reliability and functionality required for professional ground resistance testing applications.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Why Choose KRYKARD Earth Testers?
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        KRYKARD earth testers combine precision engineering with user-friendly design, delivering professional-grade ground resistance measurement in reliable packages. With features like high accuracy (±2%), multiple measurement methods (2P, 3P, 4P, selective), comprehensive data management, USB connectivity, noise interference detection, and advanced measurement capabilities, KRYKARD earth testers are trusted by professionals across India for ground system verification, lightning protection system testing, utility and substation testing, construction site safety, industrial plant maintenance, and electrical safety compliance. Whether you need to verify grounding systems, test lightning protection, ensure construction site safety, or maintain industrial facilities, KRYKARD earth testers provide the reliability and accuracy required for professional ground resistance measurement applications.
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
                    {wpData?.bottom_cta_title || "Need Expert Advice?"}
                  </h2>
                  <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">
                    {wpData?.bottom_cta_description || "Our specialists provide comprehensive guidance on earth testing solutions"}
                  </p>
                  <Link
                    to={wpData?.bottom_cta_button_link || "/contact/sales"}
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

export default EarthTesters;