import React, { useState, useEffect, useMemo } from 'react';
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
  Award,
  Database,
  BarChart
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import SeoHead from '@/seo/SeoHead';

const products = [
  {
    id: 'ca6117',
    title: 'Advanced Installation Tester',
    modelNumber: 'CA 6117',
    image: '/installation testers/CA 6117.png',
    displayInfo: '5.7" backlit color LCD',
    model: 'CA 6117',
    subtitle: 'Advanced Installation Tester',
    voltage: '550 VAC/DC',
    measurement: 'Comprehensive',
    accuracy: 'High',
    features: [
      'All-in-one installation tester',
      'All neutral systems (TT, TN, IT)',
      '1000 memory locations',
      '5.7" backlit color LCD'
    ],
    specs: [
      'Voltage: 550 VAC/DC',
      'All-in-one installation tester',
      'Memory: 1000 locations',
      'Display: 5.7" backlit color LCD'
    ],
    applications: [
      'Professional installation testing',
      'Electrical safety compliance',
      'Industrial maintenance'
    ]
  },
  {
    id: 'ca6133',
    title: 'Standard Installation Tester',
    modelNumber: 'CA 6133',
    image: '/installation testers/CA 6133-1.png',
    displayInfo: '231-segment LCD with backlighting',
    model: 'CA 6133',
    subtitle: 'Standard Installation Tester',
    voltage: 'Up to 550 VAC & 800.0 VDC',
    measurement: 'Standard',
    accuracy: 'Standard',
    features: [
      'Android app for report generation',
      'Automatic test sequences',
      'Multiple power supply options',
      '231-segment LCD with backlighting'
    ],
    specs: [
      'Voltage: Up to 550 VAC & 800.0 VDC',
      'Android app compatibility',
      'Automatic test sequences',
      'Display: 231-segment LCD'
    ],
    applications: [
      'Standard installation testing',
      'Electrical compliance testing',
      'Field measurements'
    ]
  }
];

const tabs = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'comparison', label: 'Compare', icon: Star }
];

const InstallationTesters = ({ data: initialData }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);

  // Slug Validation: Only use initialData if it belongs to this page
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'installation-testers') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productsOnly = searchParams.get('view') === 'products';
    setShowOnlyProducts(productsOnly);
    if (productsOnly) {
      setActiveTab('overview');
    }
  }, [location.search]);

  useEffect(() => {
    if (wpData) return; // Skip if data already provided via props (hydration/SSR)
    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=installation-testers');
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

  const displayFeatures = useMemo(() => {
    try {
      if (wpData?.features_json) {
        const trimmed = wpData.features_json.trim();
        if (trimmed.startsWith('[') || trimmed.startsWith('{')) {
          return JSON.parse(trimmed);
        } else {
          const blocks = trimmed.split(/\r?\n\s*\r?\n/);
          return blocks.map(block => {
            const lines = block.split(/\r?\n/).filter(l => l.trim());
            if (lines.length === 0) return null;
            let title = lines[0]?.trim() || "";
            let description = lines.slice(1).join(" ").trim() || "";

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
      { title: "Superior Accuracy", description: "High-precision testing with accuracy class compliance for all essential electrical safety tests." },
      { title: "All-in-One Testing", description: "Comprehensive testing for all neutral systems (TT, TN, IT) in a single portable instrument." },
      { title: "Advanced Data Logging", description: "Extensive memory storage and PC interfaces for efficient test data management and reporting." },
      { title: "Professional Quality", description: "Robust construction and reliability for demanding industrial and field testing applications." },
      { title: "Compliance Ready", description: "Designed to meet international safety standards and regulatory requirements for installation testing." }
    ];
  }, [wpData?.features_json]);

  useEffect(() => {
    if (window.location.hash === '#products-section') {
      const el = document.getElementById('products-section');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const HeroSection = () => {
    const heroTitle = wpData?.hero_title || "INSTALLATION TESTERS";
    const heroDescription = wpData?.hero_description || "Professional electrical test and measurement equipment compliant with international standards.";
    const heroBadge = wpData?.hero_badge || "KRYKARD Installation Testing Solutions";
    const heroImage = typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/Tester-02.png");
    const heroCtaText = wpData?.hero_cta_text || wpData?.hero_button_text || "Request Demo";
    const heroCtaLink = wpData?.hero_cta_link || "/contact/sales";

    return (
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
                  <span className="text-sm md:text-base font-semibold text-gray-900">{heroBadge}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                  {heroTitle}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left">
                  {heroDescription}
                </p>
                <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                  <Link to={heroCtaLink}>
                    <Button className="px-4 py-2 md:px-6 md:py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-lg shadow-md transition duration-300 flex items-center space-x-2">
                      <span>{heroCtaText}</span>
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
                    src={heroImage}
                    alt={heroTitle}
                    className="w-full max-w-md h-auto object-contain"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
    const getFeatureIcon = (title: string) => {
      const normalized = title.toLowerCase().trim();
      if (normalized.includes('precision') || normalized.includes('accuracy') || normalized.includes('quality')) return Award;
      if (normalized.includes('all-in-one') || normalized.includes('testing') || normalized.includes('tester')) return Gauge;
      if (normalized.includes('safety') || normalized.includes('compliance') || normalized.includes('standard')) return Shield;
      if (normalized.includes('data') || normalized.includes('logging') || normalized.includes('reporting')) return FileText;
      if (normalized.includes('memory') || normalized.includes('storage')) return Database;
      if (normalized.includes('interface') || normalized.includes('display')) return Menu;
      if (normalized.includes('versatile') || normalized.includes('methods')) return BarChart;
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

  const ProductOverviewCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-end p-3">
        <span className="bg-yellow-100 text-black text-xs font-semibold px-3 py-1 rounded-full">
          {product.modelNumber}
        </span>
      </div>
      <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" />
      </div>
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div className="text-center mb-2">
          <h3 className="text-base font-bold text-gray-900">{product.title}</h3>
          <div className="text-xs text-gray-600 mt-1">{product.displayInfo}</div>
        </div>
        <Link
          to={`/measure/installation-testers/product/${product.id}`}
          className="w-full bg-yellow-300 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-lg transition-all duration-200 mt-4 flex items-center justify-center space-x-2"
        >
          <span>View Details</span>
          <ArrowRight className="inline h-4 w-4 ml-1" />
        </Link>
      </div>
    </motion.div>
  );

  const Navigation = () => (
    <nav className="w-full mb-4">
      <div className="flex justify-center py-4 space-x-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-2 font-bold rounded transition-all duration-200 flex items-center space-x-2 ${activeTab === tab.id ? 'bg-yellow-400 text-gray-900' : 'bg-transparent text-gray-700 hover:bg-yellow-50'}`}
          >
            <tab.icon className="h-5 w-5" />
            <span className="text-base font-bold">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );

  const ComparisonTable = () => {
    const comparisonTableTitle = wpData?.comparison_table_title || "Model Comparison";
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden w-full">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-6">
          <h3 className="text-xl md:text-2xl font-bold text-center text-gray-900">{comparisonTableTitle}</h3>
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
              <tr>
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Display</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">{product.displayInfo}</td>
                ))}
              </tr>
              <tr>
                <td className="py-4 px-4 font-semibold text-gray-900 bg-gray-50 border border-gray-300">Voltage</td>
                {products.map(product => (
                  <td key={product.id} className="py-4 px-4 text-center font-medium text-gray-700 border border-gray-300">{product.voltage}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": wpData?.seo_title || "KRYKARD Installation Testers",
    "description": wpData?.seo_description || "KRYKARD Installation Testers - Professional Electrical Testing Equipment — advanced installation tester compliant with international electrical testing.",
    "url": "https://atandra.in/measure/installation-testers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": products.map((product, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": product.title,
          "url": `https://atandra.in/measure/installation-testers/product/${product.id}`,
          "image": `https://atandra.in${product.image}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title={wpData?.seo_title || (wpData?.hero_title ? `${wpData.hero_title} | Atandra` : "KRYKARD Installation Testers | Atandra")}
        description={wpData?.seo_description || "KRYKARD Installation Testers - Professional Electrical Testing Equipment"}
        canonical="https://atandra.in/measure/installation-testers"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "https://atandra.in/Tester-02.png")}
        jsonLd={jsonLd}
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        <style>{`nav.mb-10 { display: none !important; } .py-16 { padding-top: 0 !important; }`}</style>

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
            {!showOnlyProducts && activeTab === 'overview' && <HeroSection />}
            {!showOnlyProducts && <Navigation />}

            {showOnlyProducts ? (
              <section id="products-section" className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 text-center">
                  <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                    {wpData?.products_badge || "PROFESSIONAL SERIES"}
                  </div>
                  <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-8 border-b-4 border-yellow-400 inline-block pb-2">
                    {wpData?.products_title || "Installation Testers"}
                  </h1>
                  <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-10">
                    {wpData?.products_description || "Explore our comprehensive lineup of professional installation testers."}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(p => <ProductOverviewCard key={p.id} product={p} />)}
                  </div>
                </div>
              </section>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <section id="products-section" className="py-12 md:py-16">
                      <div className="max-w-7xl mx-auto px-4 text-center mb-10">
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                          {wpData?.products_badge || "PRODUCTS"}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          {wpData?.products_title || "Our Installation Tester Range"}
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">
                          {wpData?.products_description || "Explore our comprehensive lineup."}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                          {products.map(p => <ProductOverviewCard key={p.id} product={p} />)}
                        </div>
                      </div>
                    </section>

                    <section className="py-8 md:py-12 bg-yellow-50">
                      <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4">{wpData?.features_title || "Key Features"}</h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-10">{wpData?.features_description || "Discover the standout features."}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {displayFeatures.map((f, i) => <FeatureHighlight key={i} title={f.title} description={f.description} />)}
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}
                {activeTab === 'comparison' && (
                  <motion.div key="comparison" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <section className="py-12 md:py-16 bg-gray-50 px-4">
                      <div className="max-w-7xl mx-auto text-center">
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                          {wpData?.comparison_badge || "COMPARISON"}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          {wpData?.comparison_title || "Compare Our Models"}
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">
                          {wpData?.comparison_description || "Find the perfect installation tester for your specific requirements"}
                        </p>
                        <ComparisonTable />
                      </div>
                    </section>
                  </motion.div>
                )}
              </AnimatePresence>
            )}

            <section className="py-12 md:py-16 mb-16 md:mb-24 bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-2 border-yellow-200 mt-12 text-center">
              <div className="max-w-4xl mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{wpData?.bottom_cta_title || "Need Expert Advice?"}</h2>
                <p className="text-base md:text-lg text-gray-800 mb-8 font-medium max-w-xl mx-auto">{wpData?.bottom_cta_description || "Our specialists provide comprehensive guidance."}</p>
                <Link to="/contact/sales" className="inline-flex px-8 py-4 bg-yellow-400 hover:bg-yellow-500 font-bold rounded-xl shadow-lg items-center space-x-2">
                  <span>{wpData?.bottom_cta_button_text || "Contact Our Experts"}</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </section>
          </>
        )}

        <style>{`
          .comparison-table table { border-collapse: collapse; width: 100%; border: 1px solid #ddd; }
          .comparison-table th, .comparison-table td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          .comparison-table th { background: #fefce8; }
        `}</style>
      </PageLayout>
    </>
  );
};

export default InstallationTesters;