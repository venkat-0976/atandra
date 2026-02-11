import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import SeoHead from '@/seo/SeoHead';
import {
  BoltIcon,
  ShieldCheckIcon,
  ZapIcon,
  BatteryChargingIcon,
  GaugeIcon,
  CloudIcon,
  ServerIcon,
  FileTextIcon,
  MailIcon,
  SettingsIcon,
  ArrowRight,
  FileText
} from "lucide-react";

// Simplified UPS series data for modern card design
const upsSeries = [
  {
    id: "el-series",
    name: "EL/ELB Series",
    powerCapacity: "1 kVA to 3 kVA",
    type: "1/1 Online UPS",
    image: "/UPS/SB_6-removebg-preview.png",
    path: "/protect/ups/product/el-series",
    overview: {
      description: "The EL/ELB Series provides essential power protection for small office environments, home offices, and individual workstations. Designed with true online double conversion technology, it ensures zero transfer time during power outages while delivering clean, stable power to sensitive electronic equipment.",
      detailedDescription: "Perfect for protecting desktop computers, networking equipment, point-of-sale systems, and small servers. This series is ideal for small businesses, home offices, retail outlets, and professional workstations where reliable power backup is essential but space and budget are considerations.",
      industries: ["Small Offices", "Home Offices", "Retail Stores", "Professional Workstations", "Small Clinics"],
      applications: ["Desktop Computers", "Networking Equipment", "POS Systems", "Small Servers", "Telecommunication Equipment"],
      benefits: ["Zero transfer time protection", "Pure sine wave output for sensitive equipment", "Compact design saves space", "Cost-effective solution", "Easy installation and maintenance"],
      features: ["Zero transfer time", "Pure sine wave output", "Wide input voltage range", "Automatic voltage regulation", "Battery management system"],
      useCases: [
        {
          title: "Small Business Protection",
          description: "Ideal for protecting critical business equipment in small offices, ensuring continuous operations during power outages."
        },
        {
          title: "Home Office Solutions",
          description: "Perfect for home-based professionals who need reliable power backup for their workstations and networking equipment."
        },
        {
          title: "Retail Point-of-Sale",
          description: "Essential for retail environments to prevent transaction data loss and maintain customer service continuity."
        }
      ]
    }
  },
  {
    id: "eh-11-series",
    name: "EH-11 Series",
    powerCapacity: "6 kVA & 10 kVA",
    type: "1/1 Online UPS",
    image: "/UPS/SB4_-_2-removebg-preview.png",
    path: "/protect/ups/product/eh-11-series",
    overview: {
      description: "The EH-11 Series combines compact design with robust power protection capabilities, making it ideal for small to medium-sized businesses requiring reliable backup power. Features advanced battery management and intelligent monitoring systems for optimal performance and longevity.",
      detailedDescription: "Engineered for businesses that need higher power capacity in a compact form factor. This series provides comprehensive protection for multiple workstations, small server rooms, and critical business equipment while maintaining energy efficiency and reducing operational costs.",
      industries: ["Small-Medium Businesses", "Retail Chains", "Medical Offices", "Educational Institutions", "Branch Offices"],
      applications: ["Multiple Workstations", "Small Server Rooms", "Network Infrastructure", "Medical Equipment", "Security Systems"],
      benefits: ["Compact footprint saves valuable space", "Advanced battery management extends battery life", "LCD display provides real-time monitoring", "Energy-efficient operation reduces costs", "Reliable protection for critical systems"],
      features: ["Advanced battery management", "LCD status display", "Smart self-diagnostics", "Energy-efficient design", "Remote monitoring capability"],
      useCases: [
        {
          title: "Medium Business Infrastructure",
          description: "Perfect for businesses requiring higher power capacity while maintaining a compact footprint for space-constrained environments."
        },
        {
          title: "Small Server Room Protection",
          description: "Ideal for protecting small server rooms and network infrastructure with advanced monitoring capabilities."
        },
        {
          title: "Medical Office Equipment",
          description: "Essential for medical offices requiring reliable power backup for critical medical equipment and patient data systems."
        }
      ]
    }
  },
  {
    id: "eh-31-series",
    name: "EH-31 Series",
    powerCapacity: "10 kVA & 20 kVA",
    type: "3/1 Online UPS",
    image: "/UPS/5-removebg-preview.png",
    path: "/protect/ups/product/eh-31-series",
    overview: {
      description: "The EH-31 Series delivers enterprise-grade power protection for medium-sized businesses with mission-critical applications. Features three-phase input with single-phase output, providing optimal power distribution and enhanced reliability for demanding environments.",
      detailedDescription: "Specifically designed for businesses requiring higher power capacity with three-phase input capability. This series excels in environments where power quality is paramount, offering superior protection against all types of power disturbances while maintaining high efficiency and reliability.",
      industries: ["Medium Enterprises", "Data Centers", "Manufacturing", "Healthcare Facilities", "Financial Services"],
      applications: ["Server Rooms", "Data Processing Equipment", "Manufacturing Control Systems", "Medical Devices", "Financial Trading Systems"],
      benefits: ["Three-phase input for better power distribution", "ECO mode reduces energy consumption", "Advanced LCD interface for easy monitoring", "High efficiency reduces operational costs", "Scalable architecture for future expansion"],
      features: ["Advanced LCD display", "ECO mode for efficiency", "Smart battery management", "Three-phase input capability", "Comprehensive protection algorithms"],
      useCases: [
        {
          title: "Enterprise Data Centers",
          description: "Designed for medium-sized data centers requiring three-phase input capability and superior power quality protection."
        },
        {
          title: "Manufacturing Control Systems",
          description: "Essential for manufacturing environments where power quality is critical for automated control systems and production equipment."
        },
        {
          title: "Healthcare Critical Systems",
          description: "Perfect for healthcare facilities requiring reliable power backup for life-critical medical equipment and patient monitoring systems."
        }
      ]
    }
  },
  {
    id: "eh-33-small-series",
    name: "EH-33 Series (Small)",
    powerCapacity: "10 kVA to 60 kVA",
    type: "3/3 Online UPS",
    image: "/UPS/6-removebg-preview.png",
    path: "/protect/ups/product/eh-33-small-series",
    overview: {
      description: "The EH-33 Small Series utilizes advanced high-frequency technology to deliver maximum efficiency and reliability for data centers and server rooms. Features parallel operation capability and comprehensive communication options for seamless integration into existing infrastructure.",
      detailedDescription: "Built for modern data centers and server environments requiring high-density power protection. This series offers exceptional efficiency, advanced parallel capabilities, and comprehensive monitoring features, making it ideal for mission-critical applications where downtime is not an option.",
      industries: ["Data Centers", "Server Rooms", "IT Infrastructure", "Telecommunications", "Cloud Service Providers"],
      applications: ["Server Farms", "Network Operations Centers", "Cloud Infrastructure", "Telecom Equipment", "Critical IT Systems"],
      benefits: ["High-frequency design for superior efficiency", "Parallel operation for redundancy and scalability", "SNMP communication for remote management", "Emergency power off for safety", "Modular design for easy maintenance"],
      features: ["Parallel operation capability", "Emergency power off", "SNMP communication", "High-frequency technology", "Advanced cooling system"],
      useCases: [
        {
          title: "Data Center Operations",
          description: "Ideal for modern data centers requiring high-density power protection with advanced parallel operation capabilities for maximum uptime."
        },
        {
          title: "Server Room Infrastructure",
          description: "Perfect for server rooms needing scalable power protection with comprehensive monitoring and remote management features."
        },
        {
          title: "Telecommunications Equipment",
          description: "Essential for telecom infrastructure requiring reliable power backup with SNMP communication for seamless network integration."
        }
      ]
    }
  },
  {
    id: "eh-33-large-series",
    name: "EH-33 Series (Large)",
    powerCapacity: "80 kVA to 200 kVA",
    type: "3/3 Online UPS",
    image: "/UPS/2__1_-removebg-preview.png",
    path: "/protect/ups/product/eh-33-large-series",
    overview: {
      description: "The EH-33 Large Series represents the pinnacle of UPS technology with transformer-less design and high-frequency conversion. Engineered for large-scale infrastructure requiring maximum efficiency, reliability, and advanced power management capabilities.",
      detailedDescription: "Designed for enterprise-level applications requiring the highest levels of power protection and efficiency. This series features advanced transformer-less technology, intelligent battery management, and N+X parallel redundancy, making it perfect for large data centers, industrial facilities, and critical infrastructure.",
      industries: ["Large Data Centers", "Industrial Manufacturing", "Hospitals", "Universities", "Government Facilities"],
      applications: ["Enterprise Data Centers", "Industrial Control Systems", "Hospital Critical Systems", "Campus Infrastructure", "Government Operations"],
      benefits: ["Transformer-less design for higher efficiency", "N+X parallel redundancy for maximum reliability", "Low THDi input reduces electrical stress", "Intelligent battery management optimizes performance", "Scalable architecture supports growth"],
      features: ["N+X parallel redundancy", "Intelligent battery management", "Low THDi input", "Transformer-less design", "Advanced power management"],
      useCases: [
        {
          title: "Enterprise Data Centers",
          description: "Perfect for large-scale data centers requiring maximum efficiency and N+X parallel redundancy for mission-critical operations."
        },
        {
          title: "Industrial Manufacturing",
          description: "Essential for large manufacturing facilities requiring robust power protection for automated systems and production lines."
        },
        {
          title: "Hospital Critical Infrastructure",
          description: "Vital for hospitals requiring the highest level of power protection for life-support systems and critical medical equipment."
        }
      ]
    }
  },
  {
    id: "sx-series",
    name: "SX Series",
    powerCapacity: "10 kVA to 120 kVA",
    type: "3/3 Online UPS",
    image: "/UPS/2-removebg-preview.png",
    path: "/protect/ups/product/sx-series",
    overview: {
      description: "The SX Series combines online double conversion technology with built-in isolation transformers, providing superior protection against electrical disturbances and ensuring clean, stable power for the most demanding applications. Features advanced DSP control and comprehensive monitoring capabilities.",
      detailedDescription: "Engineered for environments where electrical isolation and superior power quality are critical requirements. This series excels in industrial settings, medical facilities, and research institutions where sensitive equipment demands the highest level of power protection and electrical isolation.",
      industries: ["Industrial Manufacturing", "Medical Facilities", "Research Laboratories", "Pharmaceutical", "Precision Manufacturing"],
      applications: ["Industrial Automation", "Medical Imaging Equipment", "Laboratory Instruments", "Manufacturing Control", "Precision Machinery"],
      benefits: ["Built-in isolation transformer for electrical safety", "DSP control technology for precise regulation", "Advanced cooling system for reliability", "Full LCD touchscreen for intuitive operation", "Superior protection against electrical disturbances"],
      features: ["DSP control technology", "Advanced cooling system", "Full LCD touchscreen", "Built-in isolation transformer", "Comprehensive protection algorithms"],
      useCases: [
        {
          title: "Industrial Automation",
          description: "Perfect for industrial environments requiring electrical isolation and superior power quality for automated control systems."
        },
        {
          title: "Medical Imaging Equipment",
          description: "Essential for medical facilities with sensitive imaging equipment requiring the highest level of power protection and electrical isolation."
        },
        {
          title: "Research Laboratory Instruments",
          description: "Ideal for research institutions with precision instruments that demand clean, stable power and electrical isolation."
        }
      ]
    }
  },
  {
    id: "hx-series",
    name: "HX Series",
    powerCapacity: "40 kVA to 300 kVA",
    type: "3/3 Online UPS",
    image: "/UPS/1-removebg-preview.png",
    path: "/protect/ups/product/hx-series",
    overview: {
      description: "The HX Series is specifically engineered to handle the most challenging power requirements, including regenerative loads and harsh industrial environments. Features robust isolation transformers and advanced harmonic control for superior performance in demanding applications.",
      detailedDescription: "The ultimate solution for heavy industrial applications and challenging electrical environments. This series is designed to handle regenerative loads, provide electrical isolation, and maintain power quality in the most demanding conditions, making it ideal for large manufacturing facilities, mining operations, and heavy industry.",
      industries: ["Heavy Manufacturing", "Mining Operations", "Steel Production", "Chemical Processing", "Power Generation"],
      applications: ["Motor Drives", "Industrial Processes", "Mining Equipment", "Steel Mills", "Chemical Plants"],
      benefits: ["Handles regenerative loads effectively", "N+1 parallel redundancy for maximum uptime", "Isolation transformer for electrical safety", "Advanced harmonic control improves power quality", "Robust design for harsh environments"],
      features: ["N+1 parallel redundancy", "Isolation transformer", "Advanced harmonic control", "Regenerative load handling", "Industrial-grade construction"],
      useCases: [
        {
          title: "Heavy Industrial Manufacturing",
          description: "Designed for heavy manufacturing environments with regenerative loads and challenging electrical conditions requiring robust power protection."
        },
        {
          title: "Mining Operations",
          description: "Perfect for mining facilities requiring reliable power backup for critical equipment in harsh environmental conditions."
        },
        {
          title: "Steel Production Facilities",
          description: "Essential for steel mills and metal processing plants requiring power protection for high-power industrial equipment and motor drives."
        }
      ]
    }
  }
];

// Enhanced UPS benefits with light blue gradient backgrounds for better visibility and attractiveness
const upsBenefits = [
  {
    title: "Zero Downtime",
    description: "Maintain continuous operations with instantaneous switching to battery power when main power fails.",
    icon: <BoltIcon className="text-black" size={28} />, // Light blue gradient
    gradient: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300", // Light blue gradient
    shadowColor: "shadow-blue-300/40",
    textColor: "text-black",
    descColor: "text-black"
  },
  {
    title: "Surge Protection",
    description: "Advanced filtration technology shields sensitive equipment from damaging power surges and spikes.",
    icon: <ShieldCheckIcon className="text-black" size={28} />, // Light blue gradient
    gradient: "bg-gradient-to-br from-blue-50 via-blue-150 to-blue-250", // Light blue gradient
    shadowColor: "shadow-blue-300/40",
    textColor: "text-black",
    descColor: "text-black"
  },
  {
    title: "Power Conditioning",
    description: "Ensures clean, stable power with voltage regulation, frequency stabilization, and harmonic filtration.",
    icon: <ZapIcon className="text-black" size={28} />, // Light blue gradient
    gradient: "bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300", // Light blue gradient
    shadowColor: "shadow-blue-300/40",
    textColor: "text-black",
    descColor: "text-black"
  },
  {
    title: "Smart Monitoring",
    description: "Real-time monitoring and alerts enable proactive management of your power infrastructure.",
    icon: <GaugeIcon className="text-black" size={28} />, // Light blue gradient
    gradient: "bg-gradient-to-br from-blue-50 via-blue-150 to-blue-250", // Light blue gradient
    shadowColor: "shadow-blue-300/40",
    textColor: "text-black",
    descColor: "text-black"
  }
];

// Advanced features showcased with blue gradient backgrounds
const advancedFeatures = [
  {
    title: "Advanced Battery Management",
    description: "Intelligent charging technology extends battery life by up to 30% while providing real-time health monitoring.",
    icon: <BatteryChargingIcon className="text-black" size={28} />,
    gradient: "bg-white dark:bg-gray-800",
    borderGradient: "from-blue-500 to-blue-700"
  },
  {
    title: "Cloud Monitoring",
    description: "Remote monitoring capabilities allow you to manage your UPS systems from anywhere, with instant alerts.",
    icon: <CloudIcon className="text-black" size={28} />,
    gradient: "bg-white dark:bg-gray-800",
    borderGradient: "from-blue-500 to-blue-700"
  },
  {
    title: "Scalable Architecture",
    description: "Parallel operation capability allows your UPS system to grow with your business needs up to 8 units.",
    icon: <ServerIcon className="text-black" size={28} />,
    gradient: "bg-white dark:bg-gray-800",
    borderGradient: "from-blue-500 to-blue-700"
  },
  {
    title: "Predictive Analytics",
    description: "AI-powered analytics predict potential failures enabling preventative maintenance.",
    icon: <SettingsIcon className="text-black" size={28} />,
    gradient: "bg-white dark:bg-gray-800",
    borderGradient: "from-blue-500 to-blue-700"
  }
];

// Modern Product Card with Direct Navigation
const SimpleProductCard = ({ series, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: "easeOut" }}
      className="relative w-full font-['Open_Sans'] group"
    >
      {/* Card Container matching uploaded design */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transform hover:-translate-y-1">

        {/* Compact Image Section - Top Part with White Background */}
        <div className="relative h-56 bg-white dark:bg-white overflow-hidden">
          {/* Product Image */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="relative w-full h-full max-w-xs">
              <img
                src={series.image}
                alt={`KRYKARD ${series.name} ${series.powerCapacity} Online UPS System`}
                loading="lazy"
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-105 filter drop-shadow-xl"
                width={320}
                height={240}
              />
            </div>
          </div>


        </div>

        {/* Clean White Bottom Section */}
        <div className="relative bg-white p-4">
          {/* Product Title */}
          <div className="mb-4">
            <h3 className="text-base md:text-lg font-bold text-gray-900 mb-1 font-['Open_Sans'] leading-tight break-words">
              {series.name}
            </h3>
            <p className="text-gray-700 text-sm font-medium font-['Open_Sans'] break-words">
              {series.type}
            </p>
          </div>

          {/* Brief Description */}
          <div className="mb-4 pb-4 border-b border-gray-100">
            <p className="text-gray-700 text-sm font-['Open_Sans'] leading-relaxed line-clamp-2">
              {series.overview.description}
            </p>
          </div>

          {/* Only View Details Button (removed second button) */}
          <div className="flex gap-3">
            <Link to={series.path} className="flex-1">
              <motion.button
                className="w-full bg-gray-50 hover:bg-gray-100 text-black border border-gray-200 hover:border-gray-300 py-2.5 px-4 rounded-md transition-all duration-300 flex items-center justify-center gap-2 text-sm font-bold font-['Open_Sans'] shadow-sm hover:shadow-md transform hover:scale-[1.02]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <SettingsIcon className="h-4 w-4 text-black" />
                <span>View Details</span>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Define tab structure and filtering logic - Product Wise UPS Groups
const productTabs = [
  { value: "all", label: "All Products" },
  { value: "single-phase", label: "Single Phase" },
  { value: "three-phase-lf", label: "Three Phase - Low Frequency" },
  { value: "three-phase-hf", label: "Three Phase - High Frequency" }
];

// Helper to filter products by tab - Product Wise UPS Groups
const filterProductsByTab = (tab: string) => {
  if (tab === "all") return upsSeries;

  // Single Phase: EL/ELB Series, EH-11 Series, EH-31 Series
  if (tab === "single-phase") {
    return upsSeries.filter(s =>
      s.id === "el-series" ||
      s.id === "eh-11-series" ||
      s.id === "eh-31-series"
    );
  }

  // Three Phase - Low Frequency: SX Series, HX Series
  if (tab === "three-phase-lf") {
    return upsSeries.filter(s =>
      s.id === "sx-series" ||
      s.id === "hx-series"
    );
  }

  // Three Phase - High Frequency: EH-33 Series (Large), EH-33 Series (Small)
  if (tab === "three-phase-hf") {
    return upsSeries.filter(s =>
      s.id === "eh-33-large-series" ||
      s.id === "eh-33-small-series"
    );
  }

  return [];
};

// Main UPS component - wrapped with PageLayout with added title
const UPS = () => {
  const navigate = useNavigate();
  // Set default activeTab to 'all'
  const [activeTab, setActiveTab] = useState("all");

  // Function to open brochure PDF
  const openBrochure = () => {
    // URL to your PDF file - using the specific UPS brochure
    const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

    // Open PDF directly in a new tab
    window.open(pdfUrl, '_blank');
  };

  // Prepare JSON-LD structured data for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "KRYKARD Online UPS Systems",
    "description": "Enterprise-grade online UPS systems delivering zero downtime, surge protection, power conditioning and smart monitoring for mission-critical applications.",
    "url": "https://atandra.in/protect/ups",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": upsSeries.map((series, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "name": series.name,
          "description": series.overview?.description || `${series.name} - ${series.type} for ${series.powerCapacity} power protection`,
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
        title="Online UPS Systems for Enterprise Power Protection"
        description="Enterprise-grade online UPS systems delivering zero downtime, surge protection, power conditioning and smart monitoring for mission-critical applications."
        keywords="online UPS, uninterruptible power supply, UPS systems, enterprise UPS, battery backup, power protection, mission-critical power, data center UPS, server UPS, industrial UPS, power conditioning, surge protection"
        canonical="https://atandra.in/protect/ups"
        ogImage="/background_images/ups.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/ups.png"
      />
      <PageLayout
        hideHero={true}
        hideBreadcrumbs={true}
      >

        {/* Hero Section - Updated to match powerquality.tsx structure and spacing */}
        <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
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
              <div className="lg:flex lg:flex-row lg:items-center lg:gap-4">
                {/* Text Content */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-4 text-center lg:text-left lg:w-1/2"
                >
                  <div className="inline-block bg-blue-400 py-1 px-3 rounded-full mb-2">
                    <span className="text-sm md:text-base font-semibold text-gray-900 font-['Open_Sans']">KRYKARD UPS Solutions</span>
                  </div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-gray-900 leading-tight font-['Open_Sans']">
                    ONLINE UPS SYSTEMS
                  </h1>
                  <p className="text-base md:text-lg lg:text-xl text-gray-900 leading-relaxed font-medium text-justify lg:text-left font-['Open_Sans']">
                    Enterprise-Grade Power Protection for Mission-Critical Applications. KRYKARD UPS systems provide critical power protection with instantaneous battery backup, ensuring continuous operation of essential equipment.
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
                ><div className="relative w-full flex items-center justify-center h-[260px] sm:h-[300px] md:h-[340px] lg:h-[380px] xl:h-[420px]">

                    <img
                      src="/background_images/ups.png"
                      alt="KRYKARD online UPS systems for enterprise-grade power protection and zero downtime"
                      className="w-full max-w-[320px] sm:max-w-[420px] md:max-w-[520px] lg:max-w-[620px] xl:max-w-[720px]
                                  max-h-[260px] md:max-h-[340px] lg:max-h-[420px] xl:max-h-[480px]
                                h-auto object-contain"
                      width={800}
                      height={600}
                      loading="eager"
                      decoding="async"
                      onError={e => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = 'https://via.placeholder.com/400x300/3B82F6/FFFFFF?text=UPS+Systems';
                      }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced styling for animation and visual effects */}
        <style>
          {`
            @keyframes float-slow {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(2deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }

            @keyframes float-slow-reverse {
              0% { transform: translateY(0px) rotate(0deg); }
              50% { transform: translateY(-10px) rotate(-2deg); }
              100% { transform: translateY(0px) rotate(0deg); }
            }

            @keyframes pulse-glow {
              0% { opacity: 0.3; filter: blur(8px); }
              50% { opacity: 0.8; filter: blur(12px); }
              100% { opacity: 0.3; filter: blur(8px); }
            }

            @keyframes pulse-glow-reverse {
              0% { opacity: 0.6; filter: blur(10px); }
              50% { opacity: 0.2; filter: blur(15px); }
              100% { opacity: 0.6; filter: blur(10px); }
            }

            @keyframes shimmer {
              0% { background-position: -100% 0; }
              100% { background-position: 200% 0; }
            }

            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes text-clip {
              from { clip-path: polygon(0 0, 0 0, 0 100%, 0 100%); }
              to { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%); }
            }

            @keyframes text-fade-in {
              from { opacity: 0; filter: blur(4px); }
              to { opacity: 1; filter: blur(0); }
            }

            @keyframes text-fade-in-up {
              from { opacity: 0; transform: translateY(20px); filter: blur(4px); }
              to { opacity: 1; transform: translateY(0); filter: blur(0); }
            }

            @keyframes rotate-slow {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            .animate-float-slow {
              animation: float-slow 6s ease-in-out infinite;
            }

            .animate-float-slow-reverse {
              animation: float-slow-reverse 7s ease-in-out infinite;
            }

            .animate-pulse-glow {
              animation: pulse-glow 8s ease-in-out infinite;
            }

            .animate-pulse-glow-reverse {
              animation: pulse-glow-reverse 9s ease-in-out infinite;
            }

            .animate-shimmer {
              animation: shimmer 8s linear infinite;
              background: linear-gradient(90deg, transparent, rgba(0, 123, 255, 0.15), transparent);
              background-size: 200% 100%;
            }

            .animate-gradient-shift {
              animation: gradient-shift 15s ease infinite;
              background-size: 200% 200%;
            }

            .animate-text-clip {
              animation: text-clip 1s ease forwards 0.2s;
            }

            .animate-text-fade-in {
              animation: text-fade-in 1s ease forwards;
            }

            .animate-text-fade-in-up {
              animation: text-fade-in-up 1s ease forwards;
            }

            .animate-rotate-slow {
              animation: rotate-slow 30s linear infinite;
            }

            .perspective-1000 {
              perspective: 1000px;
            }

            .glass-effect {
              background: rgba(0, 123, 255, 0.05);
              backdrop-filter: blur(10px);
              -webkit-backdrop-filter: blur(10px);
              border: 1px solid rgba(0, 123, 255, 0.1);
            }

            .text-shadow-blue {
              text-shadow: 0 0 10px rgba(0, 123, 255, 0.5);
            }

            .shadow-blue {
              box-shadow: 0 0 30px rgba(0, 123, 255, 0.3);
            }

            .watermark {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-weight='bold' font-size='24' fill='rgba(0, 123, 255, 0.08)' transform='rotate(-45, 100, 100)'%3EKRYKARD%3C/text%3E%3C/svg%3E");
              background-repeat: repeat;
              background-size: 200px 200px;
              pointer-events: none;
              z-index: -1;
            }

            /* Text truncation utility */
            .line-clamp-2 {
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
              overflow: hidden;
            }

            /* Mobile scrolling utilities */
            .scrollbar-hide {
              -ms-overflow-style: none;
              scrollbar-width: none;
            }
            .scrollbar-hide::-webkit-scrollbar {
              display: none;
            }

            @media (max-width: 640px) {
              .mobile-scroll {
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
              }
              .mobile-scroll > * {
                scroll-snap-align: start;
                flex-shrink: 0;
              }
            }
          `}
        </style>

        {/* Global watermark */}
        <div className="watermark"></div>

        {/* Clean White Background with Subtle Blue Accents */}
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-white dark:bg-gray-900">
          {/* Subtle blue accent shapes */}
          <div className="absolute top-0 right-0 w-1/4 h-1/4 bg-blue-50 dark:bg-blue-900/10 rounded-bl-full opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-blue-50 dark:bg-blue-900/10 rounded-tr-full opacity-30"></div>
        </div>

        {/* Hero section removed for now */}


        {/* --- PRODUCT TABS & GRID SECTION (Redesigned) --- */}
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
                  UPS Product Range
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
                From small office setups to enterprise data centers, we offer a comprehensive range of UPS solutions designed for reliability and performance across all industries
              </motion.p>
            </motion.div>

            {/* Redesigned Tab Navigation - Perfectly Centered */}
            <div className="flex justify-center items-center mb-8 font-['Open_Sans'] px-2 sm:px-0">
              <div className="bg-gray-100 p-1.5 rounded-lg shadow-sm border border-gray-200 w-full max-w-4xl overflow-hidden">
                <div className="flex justify-center items-center overflow-x-auto scrollbar-hide gap-1 pb-1 mobile-scroll">
                  {productTabs.map((tab) => (
                    <button
                      key={tab.value}
                      className={`px-4 py-2.5 rounded-md transition-all duration-300 text-sm font-bold whitespace-nowrap relative min-w-0 flex-shrink-0
                      ${activeTab === tab.value
                          ? 'bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-md scale-105 border border-blue-600 z-10'
                          : 'bg-white text-black hover:bg-gray-50 hover:text-blue-600 border border-gray-200'}`}
                      onClick={() => setActiveTab(tab.value)}
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <span className={activeTab === tab.value ? 'font-bold' : ''}>{tab.label}</span>
                      {activeTab === tab.value && (
                        <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-2/3 h-1 bg-blue-400 rounded-full blur-sm opacity-80" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Product Cards Grid - Only show filtered products */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 max-w-7xl mx-auto w-full px-2 sm:px-0">
              {filterProductsByTab(activeTab).map((series, index) => (
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
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                  className="group w-full"
                >
                  <SimpleProductCard series={series} index={index} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Top UPS Applications Section with Images - Mobile Responsive */}
        <div className="relative py-12 md:py-16 bg-white">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Enhanced Section Header - Mobile Responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 font-['Open_Sans']"
            >


              {/* Main Title with Enhanced Animation */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 font-['Open_Sans'] leading-tight"
              >
                Top <span className="text-gray-900">UPS Applications</span>
                <br className="hidden sm:block" />
                <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium text-gray-900">Across Industries</span>
              </motion.h2>

              {/* Enhanced Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-base md:text-lg text-gray-700 max-w-5xl mx-auto leading-relaxed font-['Open_Sans'] font-medium"
              >
                Discover how KRYKARD UPS systems provide mission-critical power protection across diverse industries,
                ensuring business continuity and protecting valuable equipment from power disturbances.
              </motion.p>
            </motion.div>

            {/* Enhanced Applications Grid - Mobile Responsive */}
            <div className="space-y-12 md:space-y-16">
              {([
                {
                  title: "Industrial Manufacturing",
                  subtitle: "Automated Production Line Protection",
                  description: "Safeguard automated production lines, PLCs, robotic systems, and sensitive manufacturing equipment from power disturbances. Our industrial-grade UPS systems ensure consistent output, prevent production losses, and protect expensive machinery from electrical damage, maintaining operational efficiency and product quality.",
                  image: "/UPS_usecases/2.png",
                  features: ["Industrial Grade Design", "Harmonic Filtering", "Wide Input Range", "Robust Construction"],
                  stats: { efficiency: "96%", protection: "Industrial", response: "Instant" },
                  industries: ["Automotive", "Electronics", "Pharmaceuticals", "Food Processing"]
                },
                {
                  title: "Healthcare & Medical Facilities",
                  subtitle: "Life-Critical Equipment Protection",
                  description: "Provide reliable backup power for life-saving medical devices, diagnostic equipment, patient monitoring systems, and critical healthcare infrastructure. Our medical-grade UPS systems ensure patient safety, regulatory compliance, and continuous operation of essential medical equipment in hospitals, clinics, and healthcare facilities.",
                  image: "/UPS_usecases/3.png",
                  features: ["Medical Grade Certification", "Ultra-Low Noise", "Emergency Backup", "Regulatory Compliant"],
                  stats: { reliability: "99.9%", noise: "<40dB", backup: "Extended" },
                  industries: ["Hospitals", "Clinics", "Diagnostic Centers", "Research Labs"]
                },
                {
                  title: "Retail & Point-of-Sale",
                  subtitle: "Transaction Continuity Assurance",
                  description: "Maintain transaction continuity and protect POS terminals, billing systems, inventory management devices, and customer data from sudden power loss. Our retail-focused UPS solutions ensure seamless customer experience, prevent revenue loss, and protect sensitive payment information during power disturbances.",
                  image: "/UPS_usecases/4.png",
                  features: ["Compact Design", "Silent Operation", "Quick Installation", "Cost Effective"],
                  stats: { size: "Compact", operation: "Silent", install: "Quick" },
                  industries: ["Retail Chains", "Restaurants", "Supermarkets", "Shopping Malls"]
                },
                {
                  title: "Telecommunications & Networking",
                  subtitle: "Communication Infrastructure Protection",
                  description: "Keep communication networks, routers, switches, telecom towers, and networking equipment operational during grid failures and power surges. Our telecom-grade UPS systems ensure continuous connectivity, prevent service interruptions, and maintain critical communication services for businesses and communities.",
                  image: "/UPS_usecases/5.png",
                  features: ["High Efficiency", "Remote Management", "Parallel Operation", "Telecom Grade"],
                  stats: { efficiency: "95%", management: "Remote", operation: "Parallel" },
                  industries: ["ISPs", "Telecom Operators", "Data Centers", "Network Providers"]
                },
                {
                  title: "Offices & Workstations",
                  subtitle: "Business Productivity Protection",
                  description: "Protect computers, workstations, servers, and business-critical electronics in offices and home offices. Our office-grade UPS systems ensure productivity continuity, prevent data loss, protect against file corruption, and maintain business operations during power outages and electrical disturbances.",
                  image: "/UPS_usecases/6.png",
                  features: ["User Friendly", "Energy Efficient", "Automatic Shutdown", "Surge Protection"],
                  stats: { efficiency: "90%", protection: "Complete", shutdown: "Auto" },
                  industries: ["Corporate Offices", "SMEs", "Home Offices", "Co-working Spaces"]
                }
              ]).map((application, index) => (
                <motion.div
                  key={`application-${index}`}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`relative ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} flex flex-col lg:flex gap-6 lg:gap-8 xl:gap-12 items-center`}
                >
                  {/* Image Section - Mobile Responsive */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, scale: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex-1 relative group w-full"
                  >
                    <div className="relative overflow-hidden rounded-xl shadow-xl">
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-transparent to-blue-800/30 z-10"></div>

                      {/* Image - Mobile Responsive */}
                      <img
                        src={application.image}
                        alt={`${application.title} - ${application.subtitle} | KRYKARD Online UPS`}
                        className="w-full h-48 sm:h-56 md:h-64 lg:h-72 object-cover transition-all duration-700 group-hover:scale-105"
                        loading="lazy"
                      />


                    </div>
                  </motion.div>

                  {/* Content Section - Mobile Responsive */}
                  <div className="flex-1 space-y-4 font-['Open_Sans'] w-full">


                    {/* Title and Subtitle */}
                    <div className="space-y-3">
                      <motion.h3
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 font-['Open_Sans'] leading-tight"
                      >
                        {application.title}
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                        className="text-base sm:text-lg font-semibold text-blue-600 font-['Open_Sans']"
                      >
                        {application.subtitle}
                      </motion.p>
                    </div>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="text-sm sm:text-base text-gray-700 leading-relaxed font-['Open_Sans'] text-justify"
                    >
                      {application.description}
                    </motion.p>





                    {/* Industries */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.9 }}
                      className="space-y-2"
                    >
                      <h4 className="text-base font-bold text-gray-900 font-['Open_Sans']">Target Industries:</h4>
                      <div className="flex flex-wrap gap-1">
                        {application.industries.map((industry, idx) => (
                          <span key={idx} className="text-gray-700 text-sm font-medium font-['Open_Sans']">
                            {industry}{idx < application.industries.length - 1 ? ', ' : ''}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Advanced UPS Technology Section - Mobile Responsive */}
        <div className="relative py-12 md:py-16 overflow-hidden bg-gray-50">
          {/* Subtle background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px'
            }}></div>
          </div>

          <div className="container mx-auto px-3 sm:px-4 lg:px-8 relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12 md:mb-16 font-['Open_Sans']"
            >
              {/* Main Heading */}
              <motion.h2
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-gray-900 font-['Open_Sans']"
              >
                <span className="text-gray-900">
                  Advanced UPS Technology
                </span>
              </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg max-w-4xl mx-auto text-gray-700 leading-relaxed font-['Open_Sans'] font-medium"
              >
                Our UPS systems incorporate cutting-edge technology to provide superior power protection
                and intelligent management capabilities for mission-critical applications
              </motion.p>
            </motion.div>

            {/* Redesigned Feature Cards - Icon and Title on Same Line */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 perspective-1000 font-['Open_Sans'] px-2 sm:px-0">
              {advancedFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, rotateX: 10 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.7,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.4 }
                  }}
                  className="relative group w-full"
                >
                  {/* Redesigned Card with Icon and Title on Same Line */}
                  <div className="relative p-4 md:p-5 rounded-lg h-full flex flex-col bg-white border border-blue-200 shadow-lg group-hover:shadow-xl transition-all duration-500">
                    {/* Glowing background on hover */}
                    <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 to-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Icon and Title on Same Line */}
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon container */}
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 shadow-md border border-blue-300 group-hover:border-blue-400 group-hover:bg-blue-200 transition-all duration-300">
                        <div className="text-blue-700 group-hover:text-blue-800 transition-all duration-300">
                          {feature.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900 group-hover:text-gray-900 transition-all duration-300 font-['Open_Sans'] leading-tight flex-1 min-w-0 tracking-wide">
                        {feature.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-gray-900 transition-all duration-300 font-['Open_Sans'] text-justify leading-relaxed break-words flex-1">
                      {feature.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Key UPS Benefits Section - Mobile Responsive */}
        <div className="relative py-12 md:py-16 bg-white">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            <div className="text-center mb-12 font-['Open_Sans']">
              <motion.h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 text-gray-900 font-['Open_Sans']"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                Key Benefits of Our <span className="text-gray-900">UPS Systems</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-base md:text-lg max-w-4xl mx-auto text-gray-700 leading-relaxed font-['Open_Sans'] font-medium"
              >
                Experience unparalleled power protection with our advanced UPS technology
              </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 font-['Open_Sans'] px-2 sm:px-0">
              {upsBenefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="relative group w-full"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="relative flex flex-col p-4 md:p-5 rounded-lg shadow-lg bg-white border border-blue-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 h-full">
                    {/* Icon and Title on Same Line */}
                    <div className="flex items-center gap-3 mb-4">
                      {/* Icon container */}
                      <div className="flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 shadow-md border border-blue-300 group-hover:border-blue-400 group-hover:bg-blue-200 transition-all duration-300">
                        <div className="text-blue-700 group-hover:text-blue-800 transition-all duration-300">
                          {benefit.icon}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-sm sm:text-base md:text-lg font-extrabold text-gray-900 group-hover:text-gray-900 transition-all duration-300 font-['Open_Sans'] leading-tight flex-1 min-w-0 tracking-wide">
                        {benefit.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm md:text-base text-gray-800 group-hover:text-gray-900 transition-all duration-300 font-['Open_Sans'] leading-relaxed break-words flex-1">
                      {benefit.description}
                    </p>

                    {/* Hover Effect Line */}
                    <div className="mt-4 h-1 w-full bg-gradient-to-r from-blue-500 to-blue-700 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>



        {/* Call-to-Action Section - Mobile Responsive */}
        <div className="relative py-12 md:py-16 bg-gray-50 z-10">
          <div className="container mx-auto px-3 sm:px-4 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-xl overflow-visible border border-gray-200 max-w-3xl mx-auto z-10"
              style={{ position: 'relative' }}
            >
              <div className="py-8 px-4 sm:px-6 text-center relative font-['Open_Sans'] z-10 flex flex-col items-center gap-6">
                {/* Subtle background pattern */}
                <div className="absolute inset-0 opacity-5 pointer-events-none z-0">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `url('data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%233B82F6\' fill-opacity=\'0.1\'%3E%3Ccircle cx=\'10\' cy=\'10\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E')`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 relative z-10 font-['Open_Sans'] break-words"
                >
                  Need More <span className="text-gray-900">Information?</span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gray-700 max-w-3xl mx-auto text-base relative z-10 font-['Open_Sans'] font-medium leading-relaxed px-2"
                >
                  Our team of experts is ready to help you with product specifications, custom solutions, pricing, and any other details you need about the KRYKARD UPS systems.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="w-full flex justify-center"
                >
                  <Link to="/contact/sales" className="w-full flex justify-center">
                    <Button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg flex items-center justify-center gap-3 transition-all duration-300 font-bold text-sm sm:text-base shadow-lg hover:shadow-xl font-['Open_Sans'] transform hover:scale-105 w-full max-w-xs sm:w-auto"
                      style={{ minWidth: 0, zIndex: 20, position: 'relative' }}
                    >
                      <MailIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                      <span>Get Expert Consultation</span>
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>


      </PageLayout>
    </>
  );
}

export default UPS;