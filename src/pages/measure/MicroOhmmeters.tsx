import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Zap,
  Shield,
  Gauge,
  FileText,
  Star,
  Database,
  Award
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

// Feature Highlight Component
const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
  const getFeatureIcon = (title: string) => {
    const normalized = title.toLowerCase().trim();
    if (normalized.includes('rms') || normalized.includes('accuracy') || normalized.includes('gauge')) return Gauge;
    if (normalized.includes('design') || normalized.includes('clamp') || normalized.includes('zap') || normalized.includes('robust')) return Zap;
    if (normalized.includes('safe') || normalized.includes('shield') || normalized.includes('protect')) return Shield;
    if (normalized.includes('data') || normalized.includes('memory') || normalized.includes('log') || normalized.includes('database')) return Database;
    if (normalized.includes('award') || normalized.includes('professional') || normalized.includes('quality')) return Award;
    if (normalized.includes('test') || normalized.includes('document') || normalized.includes('file')) return FileText;
    return Zap;
  };

  const Icon = getFeatureIcon(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-yellow-200 hover:border-yellow-400 transition-all duration-300 p-6 h-full bg-yellow-50/50 flex flex-col items-center text-center group"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      <div className="flex flex-row items-center gap-3 mb-4 justify-center w-full">
        <div className="bg-gradient-to-br from-yellow-400 to-yellow-500 w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-300 group-hover:scale-110">
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

const MicroOhmmeters = ({ data }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);
  const [wpData, setWpData] = useState<any>(data?.acf || data);
  const [isLoading, setIsLoading] = useState(!data);

  // Robust features parsing (JSON or Text Block)
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

            // User requirement: Split by '-' button (hyphen) and other common separators
            const separators = [" – ", " — ", " - ", " : ", "-", ":"];
            for (const sep of separators) {
              if (title.includes(sep)) {
                const parts = title.split(sep);
                title = parts[0]?.trim();
                const rest = parts.slice(1).join(sep).trim();
                description = rest + (description ? " " + description : "");
                break;
              }
            }
            return { title, description };
          }).filter(Boolean);
        }
      }
    } catch (e) {
      console.error("Error parsing features_json:", e);
    }
    return [
      { title: "High Precision", description: "Industry-leading measurement accuracy with ranges down to 0.1μΩ for the most demanding applications." },
      { title: "Robust Design", description: "Built for reliability in field and laboratory environments with advanced protection features." },
      { title: "Advanced Features", description: "Temperature compensation, data storage capabilities, and versatile connectivity options." },
      { title: "Data Management", description: "Comprehensive data storage and PC interface capabilities for analysis and documentation." },
      { title: "Professional Grade", description: "Designed for professional applications with industrial-grade construction and reliability." },
      { title: "Comprehensive Testing", description: "Essential for testing transformer windings, circuit breakers, cables, and welded joints." }
    ];
  }, [wpData?.features_json]);

  useEffect(() => {
    if (data && data.slug === 'micro-ohmmeters') {
      setWpData(data.acf || data);
      setIsLoading(false);
      return;
    }

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=micro-ohmmeters');
        const d = await response.json();
        if (d && d.length > 0) {
          setWpData(d[0].acf || d[0]);
        }
      } catch (error) {
        console.error('Error fetching WP data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWpData();
  }, [data]);

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

  const HeroSection = () => (
    <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 right-0 w-3/4 h-full bg-yellow-50 rounded-bl-[100px] transform -skew-x-12"></div>
        <div className="absolute bottom-20 left-0 w-64 h-64 bg-yellow-400 rounded-full opacity-10"></div>
      </div>
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[10%_90%] gap-0 items-center">
          <div className="hidden lg:block"></div>
          <div className="lg:flex lg:flex-row lg:items-center lg:gap-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-4 text-center lg:text-left lg:w-1/2"
            >
              <div className="inline-block bg-yellow-400 py-1 px-3 rounded-full mb-2">
                <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">{wpData?.hero_badge || "KRYKARD Precision Instruments"}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                {wpData?.hero_title || "MICRO OHMMETERS"}
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                {wpData?.hero_description || "Micro-ohm meters are high-precision instruments designed to measure extremely low resistances with exceptional accuracy and stability."}
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
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex justify-center lg:justify-center lg:w-1/2 lg:pl-8"
            >
              <div className="relative">
                <img
                  src={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/Micro-Meter-family.png")}
                  alt={wpData?.hero_title || "KRYKARD Micro Ohmmeters for Low-Resistance Measurement"}
                  className="w-full max-w-md h-auto object-contain"
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

  const ProductOverviewCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
      style={{ fontFamily: 'Open Sans, sans-serif' }}
    >
      <div className="flex justify-end p-3">
        <span className="bg-yellow-100 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {product.modelNumber}
        </span>
      </div>
      <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
        <img
          src={product.image}
          alt={`${product.title} - KRYKARD ${product.model} Micro-Ohmmeter`}
          className="max-h-full max-w-full object-contain"
          width={320}
          height={240}
          loading="lazy"
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

  const Navigation = () => (
    <nav className="w-full mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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

  const ComparisonTable = () => (
    <div className="comparison-table bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
        <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">{wpData?.comparison_title || wpData?.comparison_table_title || "Model Comparison"}</h3>
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
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">{product.resistanceRange}</td>
              ))}
            </tr>
            <tr className="border-b border-gray-300 hover:bg-yellow-50 transition-colors">
              <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Accuracy</td>
              {products.map(product => (
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">{product.accuracy}</td>
              ))}
            </tr>
            <tr className="hover:bg-yellow-50 transition-colors">
              <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Test Current</td>
              {products.map(product => (
                <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">Up to {product.current}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Micro Ohmmeters",
    "description": "KRYKARD micro ohmmeters — micro‑ohmmeter designed for precise low‑resistance measurement.",
    "url": "https://atandra.in/measure/micro-ohmmeters",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "Product",
          "name": p.title,
          "description": p.subtitle,
          "brand": { "@type": "Brand", "name": "KRYKARD" },
          "model": p.model,
          "url": `https://atandra.in/measure/micro-ohmmeters/${p.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title={wpData?.seo_title || "KRYKARD Micro Ohmmeters | Atandra"}
        description={wpData?.seo_description || "KRYKARD micro ohmmeters for precise low-resistance measurement in industrial equipment testing."}
        keywords="micro ohmmeters, electrical diagnostics, industrial power audit"
        canonical="https://atandra.in/measure/micro-ohmmeters"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/Micro-Meter-family.png")}
        jsonLd={jsonLd}
        preloadImage="/Micro-Meter-family.png"
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {isLoading ? (
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <>
            <style>{`
              nav.mb-10 { display: none !important; }
              .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
            `}</style>

            {!showOnlyProducts && activeTab === 'overview' && <HeroSection />}
            {!showOnlyProducts && <Navigation />}

            {showOnlyProducts ? (
              <>
                <Navigation />
                <div className="w-full py-6 text-center">
                  <div className="flex justify-center mb-4">
                    <button onClick={() => navigate('/measure/micro-ohmmeters')} className="inline-flex items-center px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg transition-all duration-200 shadow-md">
                      <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
                      <span>Back to Overview</span>
                    </button>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-black tracking-tight inline-block border-b-4 border-yellow-400 pb-2">Micro-Ohmmeters</h1>
                </div>
                <section id="products-section" className="py-12 md:py-16">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                    <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">{wpData?.products_badge || "PROFESSIONAL SERIES"}</div>
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{wpData?.products_title || "Our Micro-Ohmmeter Range"}</h2>
                    <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">{wpData?.products_description || "Precision instruments designed for accurate low resistance measurements."}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
                      {products.map(p => <ProductOverviewCard key={p.id} product={p} />)}
                    </div>
                  </div>
                </section>
              </>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                    <section id="products-section" className="py-12 md:py-16">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">{wpData?.products_badge || "PRODUCTS"}</div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{wpData?.products_title || "Our Micro-Ohmmeter Range"}</h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-2">{wpData?.products_description || "Precision instruments designed for accurate low resistance measurements."}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center mt-10">
                          {products.map(p => <div key={p.id} className="w-full max-w-sm"><ProductOverviewCard product={p} /></div>)}
                        </div>
                      </div>
                    </section>
                    <section className="py-8 md:py-12 bg-yellow-50">
                      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 text-center mb-14">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4">{wpData?.features_title || "Key Features"}</h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-2">{wpData?.features_description || "Discover the standout features that make our micro-ohmmeters the preferred choice."}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                          {displayFeatures.map((f, i) => <FeatureHighlight key={i} title={f.title} description={f.description} />)}
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}
                {activeTab === 'comparison' && (
                  <motion.div key="comparison" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
                    <section className="py-12 md:py-16 min-h-screen bg-gray-50">
                      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">{wpData?.comparison_badge || "COMPARISON"}</div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{wpData?.comparison_title || wpData?.comparison_table_title || "Compare Our Models"}</h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">{wpData?.comparison_description || "Find the perfect micro-ohmmeter for your specific requirements"}</p>
                        <ComparisonTable />
                      </div>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <section className="py-6 md:py-8 mb-16 md:mb-24 bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-2 border-yellow-200 mt-6">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{wpData?.bottom_cta_title || "Need Expert Advice?"}</h2>
                <p className="text-base md:text-lg text-gray-800 mb-6 font-medium max-w-xl mx-auto">{wpData?.bottom_cta_description || "Our specialists provide comprehensive guidance."}</p>
                <Link to={wpData?.bottom_cta_link || "/contact/sales"} className="inline-flex px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg items-center justify-center space-x-2">
                  <span>{wpData?.bottom_cta_button_text || "Contact Our Experts"}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <style>{`
              .comparison-table table { border-collapse: collapse !important; border: 2px solid #d1d5db !important; }
              .comparison-table table th, .comparison-table table td { border: 1px solid #d1d5db !important; }
              .comparison-table table thead tr { border-bottom: 3px solid #fbbf24 !important; }
              .comparison-table table tbody tr { border-bottom: 1px solid #d1d5db !important; }
            `}</style>
          </>
        )}
      </PageLayout>
    </>
  );
};

export default MicroOhmmeters;