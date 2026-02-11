import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Settings,
  Award,
  CheckCircle,
  Star,
  Info,
  Mail,
  Zap,
  ArrowRight,
  FileText,
  BarChart3,
  Clock,
  Phone,
  Download,
  ExternalLink,
  ShieldCheckIcon,
  GaugeIcon,
  ZapIcon
} from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import EnhancedPageTitle from "@/components/ui/EnhancedPageTitle";
import SeoHead from '@/seo/SeoHead';

export default function TransformerProductPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(typeof window === 'undefined' ? false : true);
  const [error, setError] = useState<string | null>(null);
  // Extract type from URL path - SSR-safe using useLocation hook
  const pathSegments = location.pathname.split('/');
  const type = pathSegments[pathSegments.length - 1]; // Gets 'auto-isolation-transformer'

  const getTransformerTitle = (urlType: string | undefined) => {
    switch (urlType) {
      case 'ultra-isolation-transformer':
        return 'Ultra Isolation Transformer';
      case 'galvanic-isolation-transformer':
        return 'Galvanic Isolation Transformer';
      case 'auto-isolation-transformer':
        return 'Auto Isolation Transformer';
      default:
        return 'Isolation Transformer';
    }
  };

  const getTransformerDescription = (urlType: string | undefined) => {
    switch (urlType) {
      case 'ultra-isolation-transformer':
        return 'Advanced multiple shielding technology for medical and precision applications';
      case 'galvanic-isolation-transformer':
        return 'Complete electrical isolation with copper shielding for industrial applications';
      case 'auto-isolation-transformer':
        return 'Efficient voltage adaptation without isolation for cost-effective solutions';
      default:
        return 'Premium quality transformers for critical applications';
    }
  };

  const getTransformerImage = (urlType: string | undefined) => {
    switch (urlType) {
      case 'ultra-isolation-transformer':
        return '/isolation_transformers/X3_-__2-removebg-preview.png';
      case 'galvanic-isolation-transformer':
        return '/isolation_transformers/X2_-_3-removebg-preview.png';
      case 'auto-isolation-transformer':
        return '/isolation_transformers/X1_-_1-removebg-preview.png';
      default:
        return '/isolation_transformers/X1_-_1-removebg-preview.png';
    }
  };

  useEffect(() => {
    // Skip navigation during SSR - navigation only works client-side
    if (typeof window === 'undefined') {
      setIsLoading(false);
      return;
    }

    const init = async () => {
      try {
        setIsLoading(true);
        const validTypes = ['ultra-isolation-transformer', 'galvanic-isolation-transformer', 'auto-isolation-transformer'];
        if (!type || !validTypes.includes(type)) {
          setError('Invalid transformer type');
          navigate('/protect/isolation-transformers');
          return;
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [type, navigate]);

  const transformerTitle = getTransformerTitle(type);
  const transformerDescription = getTransformerDescription(type);
  const transformerImage = getTransformerImage(type);

  // Enhanced features with better descriptions
  const features = [
    {
      title: "Safety & Protection",
      subtitle: "Complete Electrical Safety",
      icon: <Shield size={28} />,
      color: "from-red-500 to-red-600",
      items: [
        "Galvanic isolation electrical safety",
        "Overload protection systems",
        "Temperature thermal protection",
        "Fault detection and isolation"
      ]
    },
    {
      title: "Performance Excellence",
      subtitle: "Optimal Power Quality",
      icon: <Zap size={28} />,
      color: "from-yellow-500 to-orange-500",
      items: [
        "High efficiency operation",
        "Low harmonic distortion < 3%",
        "Excellent load regulation ±3%",
        "Fast response time < 20ms"
      ]
    },
    {
      title: "Premium Build Quality",
      subtitle: "Industrial Grade Construction",
      icon: <Award size={28} />,
      color: "from-blue-500 to-blue-600",
      items: [
        "Grade materials and components",
        "Industrial construction standards",
        "Quality assurance testing",
        "Extended warranty and support"
      ]
    },
    {
      title: "Versatile Applications",
      subtitle: "Multi-Industry Solutions",
      icon: <Settings size={28} />,
      color: "from-green-500 to-green-600",
      items: [
        "Medical and hospital systems",
        "IT infrastructure and data centers",
        "Industrial control and automation",
        "Telecommunications"
      ]
    }
  ];

  // Specifications table for isolation transformers (restored, more complete)
  const specifications = [
    { parameter: 'Power Ratings', '3Phase': '3 kVA to 1000 kVA', '1Phase': '1 kVA to 25 kVA' },
    { parameter: 'Input Voltage Range', '3Phase': '415V ±10%', '1Phase': '230V ±10%' },
    { parameter: 'Output Voltage', '3Phase': '415V', '1Phase': '230V' },
    { parameter: 'Frequency Range', '3Phase': '50 Hz ±5%', '1Phase': '50 Hz ±5%' },
    { parameter: 'Efficiency Rating', '3Phase': 'Up to 97%', '1Phase': 'Up to 95%' },
    { parameter: 'Load Regulation', '3Phase': '±3%', '1Phase': '±3%' },
    { parameter: 'Insulation Class', '3Phase': 'Class F (155°C)', '1Phase': 'Class F (155°C)' },
    { parameter: 'Protection Rating', '3Phase': 'IP21/IP23', '1Phase': 'IP21/IP23' },
    { parameter: 'Operating Temperature', '3Phase': '-10°C to +45°C', '1Phase': '-10°C to +45°C' },
    { parameter: 'Humidity Range', '3Phase': '5% to 95% RH', '1Phase': '5% to 95% RH' },
    { parameter: 'Winding Material', '3Phase': 'Copper/Aluminum', '1Phase': 'Copper/Aluminum' },
    { parameter: 'Impedance', '3Phase': '3% to 6%', '1Phase': '3% to 6%' },
    { parameter: 'Dielectric Strength', '3Phase': '2.5 kV for 1 min', '1Phase': '2.5 kV for 1 min' },
    { parameter: 'Cooling', '3Phase': 'Air/Oil Cooled', '1Phase': 'Air/Oil Cooled' },
    { parameter: 'Mounting', '3Phase': 'Floor/Wall', '1Phase': 'Floor/Wall' },
    { parameter: 'Standards', '3Phase': 'IS 2026/11171', '1Phase': 'IS 2026/11171' }
  ];

  // Loading state with better UX
  if (isLoading) {
    // Determine SEO data even during loading (for SSR)
    const loadingSeoData = type === 'auto-isolation-transformer' ? {
      title: "Auto Isolation Transformer 1–200 kVA Voltage Adaptation",
      description: "Auto isolation transformers from 1–200 kVA with copper shielding, low capacitive coupling and safe voltage adaptation for industry.",
      keywords: "galvanic isolation transformer, copper shield transformer, industrial isolation transformer",
      canonical: "https://atandra.in/protect/isolation-transformers/product/auto-isolation-transformer",
      ogImage: "/isolation_transformers/X1_-_1-removebg-preview.png"
    } : {
      title: `${getTransformerTitle(type)} | KRYKARD`,
      description: getTransformerDescription(type),
      keywords: "isolation transformer, electrical isolation, transformer, KRYKARD",
      canonical: `https://atandra.in/protect/isolation-transformers/product/${type}`,
      ogImage: getTransformerImage(type)
    };

    return (
      <>
        <SeoHead
          title={loadingSeoData.title}
          description={loadingSeoData.description}
          keywords={loadingSeoData.keywords}
          canonical={loadingSeoData.canonical}
          ogImage={loadingSeoData.ogImage}
        />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div className="text-center space-y-6">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-ping"></div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-gray-900 font-['Open_Sans']">
                {getTransformerTitle(type)}
              </h1>
              <p className="text-base md:text-lg text-gray-700 font-medium font-['Open_Sans']">Please wait while we prepare your information...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state with better UX
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto shadow-lg">
            <svg className="w-8 h-8 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-gray-900 font-['Open_Sans']">Oops! Something went wrong</h2>
            <p className="text-base md:text-lg text-gray-700 font-medium font-['Open_Sans']">{error}</p>
            <button
              onClick={() => navigate('/protect/isolation-transformers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 font-['Open_Sans']"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Prepare JSON-LD structured data for Product (only for auto-isolation-transformer)
  const jsonLd = type === 'auto-isolation-transformer' ? {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Auto Isolation Transformer",
    "description": "Auto isolation transformers from 1–200 kVA with copper shielding, low capacitive coupling and safe voltage adaptation for industry.",
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": "Auto Isolation Transformer",
    "image": "https://atandra.in/isolation_transformers/X1_-_1-removebg-preview.png",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      // "priceCurrency": "INR",
      // "price": "0",
      // "priceValidUntil": "2025-12-31"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "KRYKARD"
    }
  } : null;

  // SEO data based on transformer type
  const seoData = type === 'auto-isolation-transformer' ? {
    title: "Auto Isolation Transformer 1–200 kVA Voltage Adaptation",
    description: "Auto isolation transformers from 1–200 kVA with copper shielding, low capacitive coupling and safe voltage adaptation for industry.",
    keywords: "galvanic isolation transformer, copper shield transformer, industrial isolation transformer, ground loop transformer, double wound transformer, industrial automation transformer, data center transformer, telecom transformer, surge protection transformer",
    canonical: "https://atandra.in/protect/isolation-transformers/product/auto-isolation-transformer",
    ogImage: "/isolation_transformers/X1_-_1-removebg-preview.png"
  } : {
    title: `${getTransformerTitle(type)} | KRYKARD`,
    description: getTransformerDescription(type),
    keywords: "isolation transformer, electrical isolation, transformer, KRYKARD",
    canonical: `https://atandra.in/protect/isolation-transformers/product/${type}`,
    ogImage: transformerImage
  };

  return (
    <>
      <SeoHead
        title={seoData.title}
        description={seoData.description}
        keywords={seoData.keywords}
        canonical={seoData.canonical}
        ogImage={seoData.ogImage}
        jsonLd={jsonLd}
        preloadImage={seoData.ogImage}
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >
        {/* Hero Section - Matching powerquality.tsx design */}
        <div className="relative py-6 md:py-8 overflow-hidden font-['Open_Sans']">
          {/* Hero Background Elements */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-3/4 h-full bg-blue-50 rounded-bl-[100px] transform -skew-x-12"></div>
            <div className="absolute bottom-20 left-0 w-64 h-64 bg-blue-400 rounded-full opacity-10"></div>
          </div>
          <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-[10%_90%] gap-0 items-center">
              {/* Left Spacer for 10% on large screens */}
              <div className="hidden lg:block"></div>
              {/* Content and Image Side by Side */}
              <div className="lg:flex lg:flex-row lg:items-center lg:gap-2">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 text-center lg:text-left lg:w-1/2"
                >
                  <div className="inline-block bg-blue-400 py-1 px-3 rounded-full mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Protection Solutions</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                    {transformerTitle}
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                    Advanced power conditioning technology with unparalleled electrical isolation for sensitive equipment and critical applications.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <button
                      className="px-4 py-2 md:px-6 md:py-3 bg-blue-400 hover:bg-blue-500 text-gray-900 font-semibold rounded-lg shadow-md transition duration-300 flex items-center space-x-2 font-['Open_Sans']"
                      onClick={() => {
                        if (typeof window !== 'undefined') {
                          navigate('/contact/sales')
                        }
                      }}
                    >
                      <span>Request Demo</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </button>
                    <a
                      href="/Krykard%20PCE%20January%202025.pdf"
                      target="_blank"
                      rel="noopener noreferrer  nofollow"
                      className="px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-blue-400 text-gray-900 font-semibold rounded-lg shadow-sm transition duration-300 hover:bg-blue-50 flex items-center space-x-2 font-['Open_Sans']"
                    >
                      <span>View Brochure</span>
                      <FileText className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </a>
                  </div>
                </motion.div>
                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center lg:justify-start lg:w-1/2 lg:pl-4 mt-4 lg:mt-0"
                >
                  <div className="relative">
                    <img
                      src={transformerImage}
                      alt={`${transformerTitle} - KRYKARD`}
                      className="w-full max-w-xs sm:max-w-sm h-auto object-contain drop-shadow-lg"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f8fafc'/%3E%3Ctext x='150' y='100' text-anchor='middle' dy='.3em' fill='%2364758b' font-family='Arial, sans-serif' font-size='14' font-weight='bold'%3EIsolation Transformer%3C/text%3E%3C/svg%3E";
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Key Statistics Section */}
        <section className="py-16 bg-white" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight font-['Open_Sans']">
                Key Performance Metrics
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium font-['Open_Sans']">
                Industry-leading specifications that ensure optimal performance and reliability
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {/* This section was removed as per the edit hint */}
            </div>
          </div>
        </section>

        {/* Enhanced Technical Specifications */}
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight font-['Open_Sans']">
                Technical Specifications
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium font-['Open_Sans']">
                Comprehensive specifications for our isolation transformers
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left font-bold text-gray-900 font-['Open_Sans']">Parameter</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-900 font-['Open_Sans']">3-Phase</th>
                      <th className="px-6 py-4 text-left font-bold text-gray-900 font-['Open_Sans']">1-Phase</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specifications.map((spec, index) => (
                      <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                        <td className="px-6 py-4 font-semibold text-gray-900 font-['Open_Sans']">{spec.parameter}</td>
                        <td className="px-6 py-4 font-medium text-gray-700 font-['Open_Sans']">{spec['3Phase']}</td>
                        <td className="px-6 py-4 font-medium text-gray-700 font-['Open_Sans']">{spec['1Phase']}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features & Benefits - Fully Responsive Modern Design */}
        <section className="py-10 bg-white" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-4 tracking-tight font-['Open_Sans']">
                Key Features & Benefits
              </h2>
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto font-medium font-['Open_Sans']">
                Advanced features designed for maximum performance and safety
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col bg-white rounded-2xl shadow-md border border-slate-200 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-200 min-h-[260px]"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                >
                  <div className="flex items-center gap-3 mb-2 flex-nowrap min-w-0">
                    <span className={`flex-shrink-0 bg-gradient-to-r ${feature.color} rounded-lg p-2 shadow-md flex items-center justify-center text-white`}>{feature.icon}</span>
                    <span className="text-base md:text-lg font-bold text-gray-900 truncate font-['Open_Sans']">{feature.title}</span>
                  </div>
                  <span className="text-sm md:text-base text-gray-700 mb-3 block font-medium font-['Open_Sans']">{feature.subtitle}</span>
                  <ul className="flex flex-col gap-2 mt-1">
                    {feature.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm md:text-base text-gray-700 font-medium leading-relaxed font-['Open_Sans']">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Enhanced Call to Action */}
        <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900 mb-32" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-['Open_Sans']">
                  Ready to Power Your Operations?
                </h2>
                <p className="text-base md:text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed font-medium font-['Open_Sans']">
                  Get in touch with our experts to find the perfect transformer solution for your specific needs.
                  We provide comprehensive support and customized solutions.
                </p>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={() => {
                    if (typeof window !== 'undefined') {
                      navigate('/contact/sales')
                    }
                  }}
                  className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3 font-['Open_Sans']"
                >
                  <Mail className="w-4 h-4" />
                  Contact Our Experts
                </button>
              </div>
            </div>
          </div>
        </section>
      </PageLayout>
    </>
  );
}
