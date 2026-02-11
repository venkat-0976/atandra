import React, { useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  FileText,
  Mail,
  ShieldCheckIcon,
  GaugeIcon,
  ZapIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import PageLayout from "@/components/layout/PageLayout";
import EnhancedPageTitle from "@/components/ui/EnhancedPageTitle";
import { useNavigate } from "react-router-dom";
import SeoHead from '@/seo/SeoHead';

// Main component
const IsolationTransformers = () => {
  const heroRef = useRef(null);
  const advantagesRef = useRef(null);
  const navigate = useNavigate();

  // Function to handle View Details click
  const handleViewDetails = (transformerId: string) => {
    // Navigate to product page with /product/ segment
    navigate(`/protect/isolation-transformers/product/${transformerId}`);
  };

  // Function to open brochure PDF
  const openBrochure = () => {
    // URL to your PDF file - using user's preferred path
    const pdfUrl = "/Krykard PCE January 2025.pdf";

    // Open PDF directly in a new tab
    window.open(pdfUrl, '_blank');
  };

  // Simple Product Card Component following UPS design pattern
  const SimpleProductCard = ({ series, index }: { series: any; index: number }) => (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700 overflow-hidden transition-all duration-300">
      {/* Product Image Section */}
      <div className="bg-white dark:bg-slate-800 p-10 flex items-center justify-center min-h-[350px]">
        <img
          src={series.image}
          alt={`KRYKARD ${series.name} ${series.powerCapacity} Isolation Transformer`}
          className="max-h-[300px] w-auto object-contain drop-shadow-lg"
          width={320}
          height={240}
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* Product Info Section */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-black dark:text-white mb-2 font-['Open_Sans']">
            {series.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 font-['Open_Sans']">
            {series.type}
          </p>
          <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 font-['Open_Sans']">
            {series.powerCapacity}
          </p>
        </div>

        {/* Action Button - Only show for auto-isolation-transformer */}
        {series.id === "auto-isolation-transformer" && (
          <div>
            <Button
              className="w-full bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 font-['Open_Sans']"
              onClick={() => handleViewDetails(series.id)}
            >
              View Details
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  const advantageItems = [
    {
      title: "Better Heat Transfer",
      description: "Improved thermal management for longer transformer life",
      icon: "🔄"
    },
    {
      title: "Lower Temperature Rise",
      description: "Reduced operating temperatures for enhanced reliability",
      icon: "🌡️"
    },
    {
      title: "Lower Weight",
      description: "Lightweight design for easier installation and handling",
      icon: "⚖️"
    },
    {
      title: "Better Standing Capacity",
      description: "Enhanced protection against power surges",
      icon: "⚡"
    },
    {
      title: "Better Suited Harmonics",
      description: "Optimized performance with harmonic-rich loads",
      icon: "〰️"
    },
    {
      title: "No Hot-spots",
      description: "Even thermal distribution prevents damaging hot spots",
      icon: "🎯"
    },
    {
      title: "More Efficient",
      description: "Higher energy efficiency saving operational costs",
      icon: "📈"
    }
  ];

  // Simplified transformer series data following UPS design pattern
  const transformerSeries = [
    {
      id: "ultra-isolation-transformer",
      name: "Ultra Isolation Transformer",
      powerCapacity: "1 kVA to 50 kVA",
      type: "Double Wound with Multiple Shielding",
      image: "/isolation_transformers/X3_-__2-removebg-preview.png",
      path: "/protect/isolation-transformers/ultra-isolation-transformer",
      overview: {
        description: "A double wound transformer with multiple shielding for superior noise rejection, making it ideal for sensitive equipment requiring the highest level of electrical isolation.",
        detailedDescription: "Perfect for protecting sensitive medical equipment, precision laboratory instruments, and high-end audio systems. This series provides exceptional noise rejection and electrical isolation for applications where power quality is critical.",
        industries: ["Medical Facilities", "Research Laboratories", "Audio/Video Studios", "Precision Manufacturing", "Semiconductor Facilities"],
        applications: ["Medical Imaging Equipment", "Laboratory Instruments", "Audio Recording Equipment", "Precision Machinery", "Semiconductor Testing"],
        benefits: ["Low inter-winding capacitance", "Special RF galvanic isolation", "High attenuation (>80 dB) of common mode up to 10 MHz", "Optimum transformer design ensures good load regulation", "Superior noise rejection capabilities"],
        features: ["Multiple shielding layers", "Low inter-winding capacitance", "RF galvanic isolation", "High common mode attenuation", "Precision load regulation"],
        useCases: [
          {
            title: "Medical Equipment Protection",
            description: "Essential for medical facilities requiring the highest level of power quality for sensitive diagnostic and life-support equipment."
          },
          {
            title: "Laboratory Precision Instruments",
            description: "Perfect for research laboratories with sensitive analytical instruments requiring clean, stable power with minimal electrical noise."
          },
          {
            title: "Audio/Video Production",
            description: "Ideal for professional audio/video studios where electrical noise can compromise recording quality and equipment performance."
          }
        ]
      }
    },
    {
      id: "galvanic-isolation-transformer",
      name: "Galvanic Isolation Transformer",
      powerCapacity: "1 kVA to 100 kVA",
      type: "Double Wound with Copper Shield",
      image: "/isolation_transformers/X2_-_3-removebg-preview.png",
      path: "/protect/isolation-transformers/galvanic-isolation-transformer",
      overview: {
        description: "A double wound transformer with KRYKARD Advantage, providing complete galvanic isolation to address problems related to input neutral and ground loops.",
        detailedDescription: "Engineered for industrial and commercial applications requiring reliable electrical isolation. This series excels in environments with ground loop issues, neutral problems, and where electrical safety is paramount.",
        industries: ["Industrial Automation", "Data Centers", "Telecommunications", "Commercial Buildings", "Manufacturing Facilities"],
        applications: ["Industrial Control Systems", "Server Rooms", "Telecom Equipment", "Building Management Systems", "Manufacturing Equipment"],
        benefits: ["Complete galvanic isolation between input & output", "Copper shield between primary & secondary windings", "Low capacitive coupling between windings", "Custom voltage configurations available", "High surge immunity protection"],
        features: ["Complete galvanic isolation", "Copper shielding", "Low capacitive coupling", "Custom configurations", "Surge protection"],
        useCases: [
          {
            title: "Industrial Automation Systems",
            description: "Critical for industrial environments with sensitive control systems requiring isolation from electrical noise and ground loops."
          },
          {
            title: "Data Center Infrastructure",
            description: "Essential for data centers requiring clean power distribution and protection from electrical disturbances in server and networking equipment."
          },
          {
            title: "Telecommunications Equipment",
            description: "Perfect for telecom facilities requiring reliable power isolation for communication equipment and network infrastructure."
          }
        ]
      }
    },
    {
      id: "auto-isolation-transformer",
      name: "Auto Isolation Transformer",
      powerCapacity: "1 kVA to 200 kVA",
      type: "Single Wound Voltage Adaptation",
      image: "/isolation_transformers/X1_-_1-removebg-preview.png",
      path: "/protect/isolation-transformers/product/auto-isolation-transformer",
      overview: {
        description: "A single wound transformer with KRYKARD Advantage, designed to change output voltage (step-up or step-down) without isolation to suit different machine requirements.",
        detailedDescription: "Specifically designed for applications requiring voltage adaptation without electrical isolation. This series offers high efficiency and cost-effective solutions for voltage matching in various industrial and commercial applications.",
        industries: ["Manufacturing", "Power Distribution", "Industrial Equipment", "Commercial Buildings", "Export/Import Applications"],
        applications: ["Voltage Adaptation", "Equipment Matching", "Power Distribution", "Export Equipment", "Industrial Machinery"],
        benefits: ["Compact and lightweight design", "Excellent voltage regulation", "High efficiency (>98%)", "Step-up or step-down functionality", "Cost-effective solution for voltage adaptation"],
        features: ["High efficiency design", "Voltage regulation", "Compact footprint", "Step-up/step-down capability", "Cost-effective solution"],
        useCases: [
          {
            title: "Manufacturing Equipment Adaptation",
            description: "Ideal for manufacturing facilities requiring voltage adaptation for imported equipment or machinery with different voltage requirements."
          },
          {
            title: "Power Distribution Systems",
            description: "Perfect for commercial and industrial buildings requiring efficient voltage transformation for different equipment needs."
          },
          {
            title: "Export/Import Equipment Matching",
            description: "Essential for businesses dealing with international equipment requiring voltage adaptation for different regional power standards."
          }
        ]
      }
    }
  ];

  const specifications = [
    {
      category: "Input",
      items: [
        { label: "Voltage", value: "150-270V AC" },
        { label: "Frequency", value: "50Hz ±5%" },
        { label: "Phase", value: "Single Phase" }
      ]
    },
    {
      category: "Output",
      items: [
        { label: "Voltage Range", value: "Programmable 160-240V AC" },
        { label: "Regulation", value: "±1%" },
        { label: "Protection", value: "Overload, Short Circuit" }
      ]
    },
    {
      category: "Mechanical",
      items: [
        { label: "Enclosure", value: "CRCA Powder Coated" },
        { label: "Protection Class", value: "IP54" },
        { label: "Operating Temperature", value: "0-45°C" }
      ]
    }
  ];

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KRYKARD Ultra Isolation Transformers",
    "description": "Ultra isolation transformers with double-wound design, RF shielding and >80 dB attenuation for medical & precision applications.",
    "url": "https://atandra.in/protect/isolation-transformers",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": transformerSeries.map((series, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": series.name,
          "description": series.overview?.description || `${series.name} - ${series.type} for ${series.powerCapacity}`,
          "brand": {
            "@type": "Brand",
            "name": "KRYKARD"
          },
          "model": series.name,
          "url": `https://atandra.in${series.path}`,
          "image": `https://atandra.in${series.image}`
        }
      }))
    }
  };

  return (
    <>
      <SeoHead
        title="Ultra Isolation Transformers for Medical & Industrial Use"
        description="Ultra isolation transformers with double-wound design, RF shielding and >80 dB attenuation for medical & precision applications."
        keywords="ultra isolation transformer, multiple shielding transformer, medical transformer, precision transformer, RF galvanic isolation, high attenuation transformer, medical equipment transformer, laboratory transformer, audio video transformer"
        canonical="https://atandra.in/protect/isolation-transformers"
        ogImage="/isolation_transformers/X3_-__2-removebg-preview.png"
        jsonLd={jsonLd}
        preloadImage="/isolation_transformers/X3_-__2-removebg-preview.png"
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >

        {/* Hero Section - Updated to match UPS page structure and spacing */}
        <div className="relative py-4 md:py-6 overflow-hidden font-['Open_Sans']">
          {/* Hero Background Elements removed for a clean look */}
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
                  <div className="inline-block bg-blue-400 py-1 px-3 rounded-full mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD Isolation Transformers</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                    ISOLATION TRANSFORMERS
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                    Advanced Electrical Isolation for Critical Equipment Protection. KRYKARD Isolation Transformers provide complete galvanic isolation with superior noise rejection, ensuring optimal performance and safety for sensitive electronic equipment.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-3 justify-center lg:justify-start">
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition duration-300 flex items-center space-x-2 font-['Open_Sans']"
                      onClick={() => navigate('/contact/sales')}
                    >
                      <span>Get a Quote</span>
                      <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                    <Button
                      className="px-4 py-2 md:px-6 md:py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-lg shadow-sm transition duration-300 hover:bg-blue-50 flex items-center space-x-2 font-['Open_Sans']"
                      onClick={openBrochure}
                    >
                      <span>View Brochure</span>
                      <FileText className="ml-2 h-4 w-4 md:h-5 md:w-5" />
                    </Button>
                  </div>
                </motion.div>
                {/* Product Image */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center lg:justify-center lg:w-1/2 lg:pl-8"
                >
                  <div className="relative w-full flex items-center justify-center h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px]">
                    <img
                      src="/isolation_transformers/isolation_trasformers.png"
                      alt="KRYKARD Ultra Isolation Transformers for Medical & Precision Applications"
                      className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[720px]
                                  max-h-[260px] md:max-h-[340px] lg:max-h-[420px] xl:max-h-[480px]
                                h-auto object-contain"
                      // style={{ aspectRatio: '3/4', minHeight: 0 }}
                      width={720}
                      height={520}
                      loading="eager"
                      decoding="async"
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/180x240/3B82F6/FFFFFF?text=Isolation+Transformers';
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Section - Updated to match UPS page structure */}
        <div className="relative py-8 md:py-12 overflow-hidden bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 font-['Open_Sans']"
            >
              {/* Main Heading */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
              >
                Our <span className="text-gray-900 relative">
                  Isolation Transformer Range
                </span>
              </motion.h2>
              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                From medical equipment to industrial automation, we offer specialized isolation solutions designed for complete galvanic isolation and superior noise rejection across all industries
              </motion.p>
            </motion.div>

            {/* Clean Product Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
              {transformerSeries.map((series, index) => (
                <motion.div
                  key={series.id}
                  initial={{ opacity: 0, y: 30, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group"
                >
                  <SimpleProductCard series={series} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section - Updated to match UPS page structure */}
        <div id="features" className="relative py-8 md:py-12 overflow-hidden bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 md:mb-12 font-['Open_Sans']"
            >
              {/* Main Heading */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
              >
                Advanced <span className="text-gray-900 relative">
                  Features & Benefits
                </span>
              </motion.h2>
              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Advanced technology that sets KRYKARD Isolation Transformers apart from conventional designs, delivering unmatched electrical isolation and superior noise rejection for critical equipment protection
              </motion.p>
            </motion.div>

            {/* Feature cards - Mobile optimized with icon and title on same line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
              {advantageItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{
                    y: -5,
                    transition: { type: "spring", stiffness: 300, damping: 20 }
                  }}
                  className="group relative"
                >
                  {/* Card shadow/glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                  {/* Main card - Mobile optimized with icon and title on same line */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-4 md:p-6 border border-blue-100/80 dark:border-blue-900/30 relative z-10 h-full transform transition-all duration-300 group-hover:shadow-xl">
                    {/* Icon and Title on same line */}
                    <div className="flex items-center mb-3">
                      <motion.div
                        className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-md text-white transform transition-transform duration-300 group-hover:scale-105 flex-shrink-0 mr-3"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      >
                        <span className="text-lg md:text-xl">{item.icon}</span>
                      </motion.div>
                      <h3 className="text-base md:text-lg lg:text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 font-['Open_Sans'] leading-tight">
                        {item.title}
                      </h3>
                    </div>

                    {/* Description text below */}
                    <p className="text-gray-800 dark:text-gray-300 text-sm md:text-base font-['Open_Sans'] leading-relaxed">
                      {item.description}
                    </p>

                    {/* Subtle corner accent */}
                    <div className="absolute -bottom-1 -right-1 w-12 h-12 border-r-2 border-b-2 border-blue-400/20 rounded-br-xl opacity-30"></div>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>

        {/* Use Cases Overview Section - Updated to match UPS page structure */}
        <div className="relative py-12 md:py-16 bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 font-['Open_Sans']"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-['Open_Sans'] leading-tight"
              >
                Top <span className="text-gray-900">Isolation Transformer Applications</span>
                <br className="hidden sm:block" />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Across Industries</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Discover how KRYKARD Isolation Transformers provide critical electrical isolation across diverse industries,
                ensuring equipment protection and operational safety in the most demanding environments.
              </motion.p>
            </motion.div>

            {/* Use Cases Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {transformerSeries.map((series, index) => (
                <div key={series.id} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-slate-700"
                  >
                    <h3 className="text-xl font-bold text-black dark:text-white mb-4 font-['Open_Sans']">
                      {series.name}
                    </h3>
                    <div className="space-y-4">
                      {series.overview.useCases.map((useCase: any, ucIndex: number) => (
                        <div key={ucIndex} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2 font-['Open_Sans']">
                            {useCase.title}
                          </h4>
                          <p className="text-sm text-black dark:text-gray-300 font-['Open_Sans']">
                            {useCase.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>
        </div>


        {/* Technical Specifications Section - Mobile Optimized */}
        <section id="specifications" className="relative py-12 md:py-16 overflow-hidden bg-white dark:bg-slate-900">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '60px 60px'
            }}></div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 font-['Open_Sans']"
            >
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans'] break-words"
              >
                Technical <span className="text-gray-900 relative">
                  Specifications
                </span>
              </motion.h2>

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Engineered for optimal performance across all applications with industry-leading precision and complete electrical isolation
              </motion.p>
            </motion.div>

            {/* Specification Cards - Mobile Optimized */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
              {specifications.map((spec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className="group relative"
                >
                  {/* Main card */}
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-gray-100 dark:border-slate-700 relative z-10 h-full transition-all duration-300 flex flex-col">
                    {/* Decorative top bar */}
                    <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-600"></div>

                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                      {/* Category heading - Mobile optimized */}
                      <div className="flex items-center mb-4 sm:mb-6">
                        <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 sm:p-3 rounded-lg mr-3 shadow-md flex-shrink-0">
                          {index === 0 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          ) : index === 1 ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                          ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-black dark:text-white font-['Open_Sans'] leading-tight">
                          {spec.category}
                        </h3>
                      </div>

                      {/* Specifications list - Mobile optimized */}
                      <div className="space-y-3 flex-1">
                        {spec.items.map((item, itemIndex) => (
                          <motion.div
                            key={itemIndex}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 + (itemIndex * 0.1) }}
                            className="relative"
                          >
                            {/* Mobile-optimized specification item */}
                            <div className="bg-gradient-to-r from-blue-50/80 to-blue-50/80 dark:from-blue-900/20 dark:to-blue-900/20 border border-blue-100/60 dark:border-blue-800/30 rounded-lg p-3 sm:p-4">
                              {/* Label and dot */}
                              <div className="flex items-start mb-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 mr-3 flex-shrink-0 mt-2"></div>
                                <span className="text-black dark:text-gray-200 font-semibold text-sm sm:text-base font-['Open_Sans'] leading-tight">
                                  {item.label}
                                </span>
                              </div>

                              {/* Value - Full width for mobile */}
                              <div className="ml-5">
                                <span className="font-bold text-blue-600 dark:text-blue-400 bg-white dark:bg-slate-700 px-3 py-2 rounded-md text-sm sm:text-base shadow-sm border border-blue-100 dark:border-blue-800 font-['Open_Sans'] inline-block break-words">
                                  {item.value}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Information Section following UPS design pattern */}
        <section className="py-12 md:py-16 relative overflow-hidden bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-2 sm:px-6 lg:px-8 max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-xl bg-white dark:bg-slate-800 shadow-lg p-4 sm:p-8 md:p-12 relative overflow-hidden border border-gray-100 dark:border-slate-700"
            >
              <div className="text-center relative z-10 flex flex-col items-center gap-4 sm:gap-0">
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black dark:text-white mb-2 sm:mb-4 font-['Open_Sans']"
                >
                  Need a Custom Isolation Transformer?
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-black dark:text-gray-200 max-w-xs sm:max-w-3xl mx-auto mb-4 sm:mb-8 text-base sm:text-lg font-['Open_Sans']"
                >
                  Our engineers can design transformers to your specific requirements with industry-leading performance and reliability.
                  Get in touch today to discuss your needs.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <Button
                    className="w-full sm:w-auto bg-blue-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:gap-3 mx-auto text-base sm:text-lg font-bold font-['Open_Sans']"
                    onClick={() => navigate('/contact/sales')}
                  >
                    <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                    <span>Get a Quote</span>
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </PageLayout>
    </>
  );
};

export default IsolationTransformers;