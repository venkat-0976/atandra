import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import {
  ArrowRight,
  Gauge,
  Zap,
  Shield,
  FileText,
  Star,
  Award,
  Database,
  BarChart,
  Menu
} from "lucide-react";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import SeoHead from '@/seo/SeoHead';

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

const tabs = [
  { id: 'overview', label: 'Overview', icon: Gauge },
  { id: 'comparison', label: 'Compare', icon: Star }
];

const ProductCard = ({ title, modelNumber, image, displayInfo, productId }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="bg-white border border-yellow-300 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full"
  >
    <div className="flex justify-end p-3">
      <span className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full">{modelNumber}</span>
    </div>
    <div className="flex items-center justify-center h-32 md:h-40 bg-yellow-50">
      <img src={image} alt={title} className="max-h-full max-w-full object-contain" />
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

const MultiFunctionalMeters = ({ data: initialData }: { data?: any }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [showOnlyProducts, setShowOnlyProducts] = useState(false);

  // Slug Validation: Only use initialData if it belongs to this page
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'multi-function-meters') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const productsOnly = searchParams.get('view') === 'products';
    setShowOnlyProducts(productsOnly);
    if (productsOnly) setActiveTab('overview');
  }, [location.search]);

  useEffect(() => {
    if (wpData) return;
    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=multi-function-meters');
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
      { title: "High Accuracy", description: "Precision measurements with accuracy classes from 0.2s to 1.0, ensuring reliable readings." },
      { title: "Advanced Monitoring", description: "Comprehensive energy monitoring with power quality analysis and harmonics measurement." },
      { title: "Robust Design", description: "Built for industrial environments with rugged construction and reliable performance." }
    ];
  }, [wpData?.features_json]);

  const HeroSection = () => {
    const heroTitle = wpData?.hero_title || "MULTI FUNCTION METERS";
    const heroDescription = wpData?.hero_description || "Advanced energy measurement solutions for comprehensive monitoring and analysis.";
    const heroBadge = wpData?.hero_badge || "KRYKARD Multi Function Meter Solutions";
    const heroImage = typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "/multifunctionmeter-09.png");
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

  const FeatureHighlight = ({ title, description }: { title: string, description: string }) => {
    const getFeatureIcon = (title: string) => {
      const normalized = title.toLowerCase().trim();
      if (normalized.includes('precision') || normalized.includes('accuracy') || normalized.includes('quality')) return Award;
      if (normalized.includes('energy') || normalized.includes('monitoring') || normalized.includes('power')) return Gauge;
      if (normalized.includes('safety') || normalized.includes('compliance') || normalized.includes('shield')) return Shield;
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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": wpData?.hero_title || "KRYKARD Multi Functional Meters",
    "description": wpData?.seo_description || "KRYKARD multi functional meters — professional‑grade electrical measurement for industrial applications.",
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
          "brand": { "@type": "Brand", "name": "KRYKARD" },
          "model": product.modelNumber,
          "url": `https://atandra.in/measure/multi-functional-meters/product/${product.id}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title={wpData?.seo_title || (wpData?.hero_title ? `${wpData.hero_title} | Atandra` : "KRYKARD Multi Functional Meters | Atandra")}
        description={wpData?.seo_description || "Energy measurement solutions for comprehensive monitoring and analysis."}
        canonical="https://atandra.in/measure/multi-functional-meters"
        ogImage={typeof wpData?.hero_image === 'string' ? wpData.hero_image : (wpData?.hero_image?.url || "https://atandra.in/multifunctionmeter-09.png")}
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
              <section id="products-section" className="py-12 md:py-16 text-center">
                <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                  {wpData?.products_badge || "PROFESSIONAL SERIES"}
                </div>
                <h1 className="text-4xl md:text-5xl font-extrabold text-black mb-8 border-b-4 border-yellow-400 inline-block pb-2">
                  {wpData?.products_title || "Multi Functional Meters"}
                </h1>
                <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-10">
                  {wpData?.products_description || "Explore our comprehensive lineup of professional multi-functional meters."}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4 max-w-7xl mx-auto">
                  {products.map(p => <ProductCard key={p.id} title={p.title} modelNumber={p.modelNumber} image={p.image} displayInfo={p.displayInfo} productId={p.id} />)}
                </div>
              </section>
            ) : (
              <AnimatePresence mode="wait">
                {activeTab === 'overview' && (
                  <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <section id="products-section" className="py-12 md:py-16 px-4">
                      <div className="max-w-7xl mx-auto text-center mb-10">
                        <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                          {wpData?.products_badge || "PRODUCTS"}
                        </div>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                          {wpData?.products_title || "Our Multi Function Meter Range"}
                        </h2>
                        <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-8">
                          {wpData?.products_description || "Explore our comprehensive lineup."}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                          {products.map(p => <ProductCard key={p.id} title={p.title} modelNumber={p.modelNumber} image={p.image} displayInfo={p.displayInfo} productId={p.id} />)}
                        </div>
                      </div>
                    </section>

                    <section className="py-8 md:py-12 bg-yellow-50">
                      <div className="max-w-7xl mx-auto px-4 text-center">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4">{wpData?.features_title || "Key Features"}</h2>
                        <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium mb-10">{wpData?.features_description || "Advanced energy measurement solutions."}</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                          {displayFeatures.map((f, i) => <FeatureHighlight key={i} title={f.title} description={f.description} />)}
                        </div>
                      </div>
                    </section>
                  </motion.div>
                )}
                {activeTab === 'comparison' && (
                  <motion.div
                    key="comparison"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <section className="py-12 md:py-16 bg-gray-50 px-4 text-center">

                      {/* Badge */}
                      <div className="inline-block bg-yellow-100 text-yellow-800 px-6 py-3 rounded-full text-lg font-bold mb-6">
                        {wpData?.comparison_badge || "COMPARISON"}
                      </div>

                      {/* Main Heading */}
                      <h2 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
                        {wpData?.comparison_title || "Compare Our Models"}
                      </h2>

                      {/* Description */}
                      <p className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto font-medium mb-12">
                        {wpData?.comparison_description ||
                          "Find the perfect multi functional meter for your specific requirements"}
                      </p>

                      {/* Yellow Model Comparison Header */}
                      <div className="max-w-7xl mx-auto bg-yellow-400 py-6 rounded-t-2xl">
                        <h3 className="text-2xl md:text-3xl font-extrabold text-black">
                          {wpData?.comparison_badge || "Model Comparison"}
                        </h3>
                      </div>

                      {/* Table */}
                      <div className="max-w-7xl mx-auto overflow-x-auto bg-white rounded-b-2xl shadow">
                        <table className="min-w-full border-collapse border border-gray-300">
                          <thead>
                            <tr className="bg-yellow-50 border-b-2 border-yellow-400">
                              <th className="p-4 border border-gray-300 text-left font-bold">
                                Feature
                              </th>
                              <th className="p-4 border border-gray-300 font-bold">DiGi 530</th>
                              <th className="p-4 border border-gray-300 font-bold">DiGi 630</th>
                              <th className="p-4 border border-gray-300 font-bold">DiGi 730</th>
                              <th className="p-4 border border-gray-300 font-bold">DiGi 730</th>
                            </tr>
                          </thead>

                          <tbody className="text-gray-800">
                            <tr>
                              <td className="p-4 border font-bold">Display Info</td>
                              <td className="p-4 border">Class 0.5s Accuracy</td>
                              <td className="p-4 border">Class 0.5s/0.2s Accuracy</td>
                              <td className="p-4 border">Class 0.5s/0.2s Accuracy</td>
                              <td className="p-4 border">Class 0.2s with TFT Display</td>
                            </tr>

                            <tr className="bg-gray-50">
                              <td className="p-4 border font-bold">Type</td>
                              <td className="p-4 border">Standard Multi Function Meter</td>
                              <td className="p-4 border">Advanced Multi Function Meter</td>
                              <td className="p-4 border">Premium Multi Function Meter</td>
                              <td className="p-4 border">High Precision Meter</td>
                            </tr>

                            <tr>
                              <td className="p-4 border font-bold">Application</td>
                              <td className="p-4 border">Energy Monitoring</td>
                              <td className="p-4 border">Energy Monitoring</td>
                              <td className="p-4 border">Energy Monitoring</td>
                              <td className="p-4 border">Energy Monitoring</td>
                            </tr>

                            <tr className="bg-gray-50">
                              <td className="p-4 border font-bold">Accuracy</td>
                              <td className="p-4 border">High</td>
                              <td className="p-4 border">Standard</td>
                              <td className="p-4 border">—</td>
                              <td className="p-4 border">—</td>
                            </tr>
                          </tbody>
                        </table>
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
      </PageLayout>
    </>
  );
};

export default MultiFunctionalMeters;