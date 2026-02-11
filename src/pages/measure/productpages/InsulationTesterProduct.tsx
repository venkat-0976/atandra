import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Download,
  Mail,
  Phone,
  Shield,
  Gauge,
  FileText,
  ChevronDown,
  Database,
  Zap,
  ChevronLeft,
  ChevronRight,
  Monitor,
  Wifi,
  Battery,
  Thermometer,
  BarChart
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

// --- Insulation Testers Data ---
export const insulationTesters = {
  'ca6522-ca6528': {
    id: 'ca6522-ca6528',
    model: 'CA 6522/CA 6528',
    title: '1kV Insulation Testers',
    subtitle: 'Professional 1kV Insulation Testers',
    image: '/ca6522_01-01.png',
    images: [
      '/ca6522_01-01.png',
      '/ca6528_01-01.png'
    ],
    voltage: 'CAT III 600V',
    measurement: '1kV Testing',
    accuracy: '50 kΩ to 40 GΩ',
    //price: 'Contact for pricing',
    description: 'Professional 1kV insulation testers designed for electrical maintenance and troubleshooting with visual alarms and high accuracy measurements.',
    features: [
      'Display : 4000 counts, double digital backlit LCD screen',
      'Logarithmic bargraph (CA 6522)',
      'Continuity at 200mA',
      'CA 6528 : 0.02Ω - 40Ω CA 6522 : 0.00Ω - 10.00Ω',
      'Visual alarm : Blue/Red backlighting (CA 6528)',
      'Timer (mins) : Upto 39:59',
      'Automatic shutdown, Hold,Manual / Lock / Duration modes',
      'IP 40 (CA 6528) , IP 54 (CA 6522)'
    ],
    technicalSpecs: {
      'CA 6522': {
        'INSULATION': '50 V, 100 V, 250 V, 500 V, 1000 V test voltage',
        'Measurement range': '200 GΩ',
        'Test mode': 'Manual, Lock, Timer, PI, DAR',
        'Continuity': '200 mA / 20 mA measurement current',
        'Voltage measurement': '700 V',
        'Frequency measurement': '15.3 Hz – 800 Hz',
        'Resistance measurement': '0 – 1,000 kΩ',
        'Display': 'Double display + logarithmic bargraph',
        'Storage': '300 measurements',
        'Magnetic mounting elements': 'Yes',
        'Alarms': 'Yes',
        'Power supply': '6 × LR6 / AA batteries',
        'Dimensions': '211 × 108 × 60 mm',
        'Weight': '850 g',
        'Protection rating': 'IP54, safety category: 600 V CAT IV'
      },
      'CA 6528': {
        'Voltage': '0 to 700 VAC/DC',
        'Insulation': 'Up to 11 GΩ',
        'Continuity': '0.02 Ω to 40 Ω',
        'Resistance': '1 Ω to 420 kΩ',
        'Automatic voltage detection': 'Yes',
        'Compliant with': 'IEC 61557-1-2-4-10',
        'Electrical safety': 'IEC 61010-1, 61010-2-030, 61010-2-034 - 600V CAT IV',
        'Protection rating': 'IP40'
      }
    },
    applications: [
      'Electrical maintenance',
      'Troubleshooting',
      'Industrial field use',
      'Equipment testing',
      'Safety inspections'
    ],
    advantages: [
      'High accuracy',
      'Visual alarms',
      'IP rated for durability',
      'Long battery life',
      'Dual model options'
    ],
    // No single brochure, handled in UI
  },
  'ca6524-ca6526': {
    id: 'ca6524-ca6526',
    model: 'CA 6524/CA 6526',
    title: '1kV Insulation Testers',
    subtitle: 'Advanced 1kV Insulation Testers',
    image: '/ca6524-01-01.png',
    images: [
      '/ca6524-01-01.png',
      '/ca6526-01-01.png'
    ],
    voltage: ' CAT IV 600 V',
    measurement: '1kV Testing',
    accuracy: '10 kΩ to 200 GΩ',
    price: 'Contact for pricing',
    description: 'Advanced 1kV insulation testers with Bluetooth connectivity, large memory storage, and configurable alarms for professional testing applications.',
    features: [
      'Display : 4000 counts, double + bargraph',
      'Continuity at 200mA (0.00Ω - 10.00Ω)/ 20mA (0.0Ω - 100.0Ω)',
      'PI & DAR',
      'Visual Pass/Fail : Red/Green (CA 6526)',
      'Timer (mins) : Upto 39:59',
      'Configurable alarms',
      'Memory : 300 measurements (CA 6524), 1300 measurements (CA 6526)',
      'Communication : Bluetooth (CA 6526)'
    ],
    technicalSpecs: {
      'INSULATION': '50-100-250-500-1000 V test voltage',
      'Measurement range': '200 GΩ',
      'Test mode': 'Manual, Lock, Timer, PI, DAR',
      'Continuity': '200mA / 20mA measurement current',
      'Voltage measurement': '700 V',
      'Frequency measurement': '15.3 - 800 Hz',
      'Resistance measurement': '0 - 1,000 kΩ',
      'Display': 'Double display + logarithmic bargraph',
      'Storage': '300 measurements',
      'Magnetic mounting elements': 'Yes',
      'Alarms': 'Yes',
      'Power supply': '6 × LR6 / AA batteries',
      'Dimensions': '211 × 108 × 60 mm',
      'Weight': '850 g',
      'Protection rating': 'IP54, safety category: 600 V CAT IV'
    },
    applications: [
      'Industrial testing',
      'Field testing',
      'Quality assurance',
      'Preventive maintenance',
      'R&D applications'
    ],
    advantages: [
      'Bluetooth connectivity',
      'Large memory',
      'Configurable alarms',
      'PI & DAR calculations',
      'Multiple test voltages'
    ],
    brochure: '/CA6524-6526p.pdf'
  },
  'ca6532-ca6534-ca6536': {
    id: 'ca6532-ca6534-ca6536',
    model: 'CA 6532/CA 6534/CA 6536',
    title: 'Insulation Testers Special Models',
    subtitle: 'Specialized Insulation Testers',
    image: '/ca6532-01-01.png',
    images: [
      '/ca6532-01-01.png',
      '/ca6534-01-01.png',
      '/ca6536-01-01.png'
    ],
    voltage: ' CAT IV 600 V',
    measurement: 'Specialized Testing',
    accuracy: '2 kΩ to 50 GΩ',
    price: 'Contact for pricing',
    description: 'Specialized insulation testers designed for telecommunications, electronics, and aerospace applications with customizable voltage steps and advanced features.',
    features: [
      'Display : 4000 counts, double + bargraph',
      'PI & DAR (CA 6532)',
      'Continuity at 200mA (0.00Ω - 10.00Ω)/ 20mA (0.0Ω - 100.0Ω)',
      'Timer (mins) : Upto 39:59',
      'Memory : 1300 records (CA 6532 & 6534)',
      'Communication : Bluetooth (CA 6532 & 6534)'
    ],
    technicalSpecs: {
      'INSULATION': '50 - 100 V test voltage',
      'Measurement range': '20 GΩ',
      'Test mode': 'Manual, Lock, Timer, PI, DAR',
      'Continuity': '200 mA / 20 mA measurement current',
      'Voltage measurement': '700 V',
      'Frequency measurement': '15.3 - 800 Hz',
      'Resistance measurement': '0 - 1,000 kΩ',
      'Capacitance measurement': '0.1 nF - 10 μF',
      'Cable length calculation': '0 - 100 km',
      'Display': 'Double display + logarithmic bargraph',
      'Storage': '1,300 measurements',
      'Magnetic mounting elements': 'Yes',
      'Alarms': 'Yes',
      'Communication': 'Bluetooth class 2',
      'Power supply': '6 × LR6 / AA batteries',
      'Dimensions': '211 × 108 × 60 mm',
      'Weight': '850 g',
      'Protection rating': 'IP54, safety category: 600 V CAT IV'
    },
    applications: [
      'Telecommunications',
      'Electronics',
      'Avionics, Space & Defense',
      'Low voltage systems',
      'Sensitive equipment testing'
    ],
    advantages: [
      'Specialized voltage steps',
      'Bluetooth connectivity',
      'Large memory',
      'Variable voltage control',
      'Industry-specific design'
    ],
    brochure: '/CA6522-6524-6526-6532-6534-6536p.pdf'
  },
  'ca6505-ca6545': {
    id: 'ca6505-ca6545',
    model: 'CA 6505/CA 6545',
    title: '5kV Insulation Testers',
    subtitle: '5kV High Voltage Insulation Testers',
    image: '/insulation testers/CA 6505.png',
    images: [
      '/insulation testers/CA 6505.png',
      '/insulation testers/CA 6545.png'
    ],
    voltage: 'CAT III 5100V',
    measurement: '5kV Testing',
    accuracy: '10 kΩ to 10 TΩ',
    price: 'Contact for pricing',
    description: 'High voltage 5kV insulation testers for power utilities and industrial plants with programmable test duration and advanced safety features.',
    features: [
      'Display : Backlit LCD graphic display with bargraph',
      'Programmable test duration',
      'Automatic calculation of the DAR/PI',
      'DD calculation (CA 6545)',
      'Locking test voltage',
      'Programmable Alarms (CA 6545)',
      'Smoothing of Display (CA 6545)',
      'Automatic detection of the presence of AC or DC external voltage on terminals',
      'Auto power save mode to save battery power'
    ],
    technicalSpecs: {
      'Test voltage': 'Fixed 500/1,000/2,500/5,000 V DC or programmable from 40 V to 5,100 V DC',
      'Measurement range': '10 kΩ to 10 TΩ',
      'Programmable test duration': 'Yes',
      'DAR & PI ratios': 'Calculation of DAR & PI quality ratios',
      'Measurements': 'Voltage, capacitance, leakage current',
      'Display': 'LCD screen with bargraph',
      'Power supply': 'NiMh rechargeable battery',
      'Compliance': 'IEC 61557',
      'Protection rating': 'IP53',
      'Safety category': 'IEC 61010 1,000 V CAT III',
      'Dimensions': '270 × 250 × 180 mm',
      'Weight': '4.3 kg'
    },
    applications: [
      'High voltage equipment',
      'Power utilities',
      'Industrial plants',
      'Transformer testing',
      'Cable testing'
    ],
    advantages: [
      'Programmable alarms',
      'Auto power save',
      'High voltage range',
      'Safety voltage detection',
      'Advanced calculations'
    ],
    brochure: '/CA-6505-6545.pdf'
  },
  'ca6547-ca6549': {
    id: 'ca6547-ca6549',
    model: 'CA 6547/CA 6549',
    title: '5kV Insulation Testers',
    subtitle: 'Advanced 5kV Insulation Testers',
    image: '/insulation testers/CA 6547.png',
    images: [
      '/insulation testers/CA 6547.png',
      '/insulation testers/CA 6549.png'
    ],
    voltage: 'CAT III 5100V',
    measurement: '5kV Testing',
    accuracy: '10 kΩ to 10 TΩ',
    price: 'Contact for pricing',
    description: 'Advanced 5kV insulation testers with USB connectivity, large memory storage, and direct R(t) curve plotting for comprehensive power system analysis.',
    features: [
      'Large backlit LCD screen, with digital display & bargraph',
      'Automatic calculation of the DAR/PI/DD ratios',
      'Programmable alarms',
      'Displays a error code in an anamoly condition (CA 6549)',
      'Direct plotting resistance over time (R(t)) curves in display (CA 6549)',
      'Calculation of R at Reference Temperature (T°) (CA 6549)',
      'Memory : 128KB storage capacity',
      'Communication : USB (Two-Way)',
      'PC interface'
    ],
    technicalSpecs: {
      "Measurement range": "10 kΩ to 10 TΩ",
      "4 fixed test voltages": "500 / 1,000 / 2,500 and 5,000 V",
      "Adjustable test voltage position": "40 to 5,100 V in 10 V or 100 V increments",
      "Large backlit LCD screen": "Digital display and bargraph",
      "Quantitative insulation analysis": "DAR, PI, and DD (dielectric discharge) quality ratios calculated automatically and R(t) curve plotted",
      "Large number of functions": "Programmable test duration, test voltage locking, smooth function, programmable alarms, etc.",
      "Storage": "Several thousand measurements",
      "USB connector": "For connection to PC (Megohmmeter data processing software)",
      "Power supply": "NiMH rechargeable battery for 30 days’ operation with 10 DAR measurements and 5 PI measurements per day",
      "Electrical safety": "IEC 61010-1 Cat.III 1000V or Cat.I 2500V and IEC 61557",
      "Dimensions": "270 × 250 × 180 mm",
      "Weight": "4.3 kg"
    },
    applications: [
      'Power system analysis',
      'Industrial maintenance',
      'Utility testing',
      'Research applications',
      'Advanced diagnostics'
    ],
    advantages: [
      'USB communication',
      'Advanced memory',
      'Direct plotting of R(t)',
      'Temperature compensation',
      'PC interface capability'
    ],
    brochure: '/CA6505-6545-6547-6549-Megohmmeters.pdf'
  },
  'ca6550-ca6555': {
    id: 'ca6550-ca6555',
    model: 'CA 6550/CA 6555',
    title: '10kV/15kV Insulation Testers',
    subtitle: 'Ultra High Voltage Insulation Testers',
    image: '/insulation testers/CA 6555.png',
    images: [
      '/insulation testers/CA 6555.png',
      '/insulation testers/CA 6555-2.png',
      '/insulation testers/CA 6555-3.png',
      '/insulation testers/CA 6550.png'
    ],
    voltage: 'CAT III 15000V',
    measurement: '10kV/15kV Testing',
    accuracy: '10 kΩ to 30 TΩ',
    price: 'Contact for pricing',
    description: 'Ultra high voltage insulation testers for utility and grid monitoring with advanced voltage ramp capabilities and comprehensive data logging.',
    features: [
      'Large graphical LCD display with backlight & bargraph',
      'Calculation of the DAR/PI/DD ratios',
      'Programmable test duration',
      'Timer (mins) : Upto 99:59',
      'Voltage ramp & step with " burn - in", "early break" & "I - limit" modes',
      'Memory : 80,000 points',
      'Communication :USB',
      'PC interface'
    ],
    technicalSpecs: {
      'CA 6550': {
        "Test voltage": "Fixed 500 / 1,000 / 2,500 / 5,000 V DC or programmable from 40 V to 5,100 V DC",
        "Measurement range": "10 kΩ to 10 TΩ",
        "Programmable test duration": "Yes",
        "DAR & PI ratios": "Calculation of DAR & PI quality ratios",
        "Measurements": "Voltage, capacitance, leakage current",
        "Display": "LCD screen with bargraph",
        "Power supply": "NiMh rechargeable battery",
        "Compliance": "IEC 61557",
        "Protection rating": "IP53",
        "Safety category": "IEC 61010 1,000 V CAT III",
        "Dimensions": "270 × 250 × 180 mm",
        "Weight": "4.3 kg"
      },
      'CA 6555': {
        "Measurement range": "10 kΩ to 25 TΩ",
        "Test voltage": "Fixed or programmable from 40 V to 15 kV",
        "Charging current": "5 mA max",
        "Display": "Large backlit LCD with digital display, bargraph, and R(t)+u(t), i(t), i(u) graphs",
        "Automatic ratio calculation": "DAR / PI / DD / DR (ppm/V)",
        "Test modes": "Voltage ramp and step with 'burning', 'early break', and 'I-limit' modes",
        "Filters": "3 filters to optimize measurement stability",
        "Calculation of R": "At a reference temperature",
        "Storage": "80,000-measurement storage capacity and real-time clock",
        "USB": "Optically-isolated USB for PC transfer and report generation with DataView® software",
        "Power supply": "NiMH rechargeable battery with external charger",
        "Compliance": "IEC 61557-1 -2",
        "Safety category": "IEC 61010 1000V CAT IV",
        "Dimensions": "406 × 330 × 174 mm",
        "Weight": "6 kg"
      }
    },

    applications: [
      'Utility and grid monitoring',
      'Research and development',
      'Critical facility testing',
      'High voltage cable testing',
      'Power generation equipment'
    ],
    advantages: [
      'Ultra high voltage',
      'Large memory',
      'USB interface',
      'Advanced voltage modes',
      'Comprehensive data logging'
    ],
    brochure: '/CA6505-6545-6547-6549-Megohmmeters.pdf'
  }
};

const InsulationTesterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [brochureDropdownOpen, setBrochureDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  const product = insulationTesters[productId as keyof typeof insulationTesters];
  const productList = Object.values(insulationTesters);

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ca6522-ca6528': {
      title: "KRYKARD CA 6522/CA 6528 | Insulation Testers",
      description: "KRYKARD CA 6522/CA 6528 - Professional 1kV Insulation Testers with Visual Alarms — insulation tester designed for reliable insulation resistance.",
      keywords: "CA 6522/CA 6528, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6522-ca6528"
    },
    'ca6524-ca6526': {
      title: "KRYKARD CA 6524/CA 6526 | Insulation Testers",
      description: "KRYKARD CA 6524/CA 6526 - Advanced 1kV Insulation Testers with Bluetooth Connectivity — insulation tester designed for reliable insulation resistance.",
      keywords: "CA 6524/CA 6526, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6524-ca6526"
    },
    'ca6532-ca6534-ca6536': {
      title: "KRYKARD CA 6532/CA 6534/CA 6536 | Insulation Testers",
      description: "KRYKARD CA 6532/CA 6534/CA 6536 insulation testers for telecommunications and electronics with reliable insulation testing.",
      keywords: "CA 6532/CA 6534/CA 6536, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6532-ca6534-ca6536"
    },
    'ca6505-ca6545': {
      title: "KRYKARD CA 6505/CA 6545 | Insulation Testers",
      description: "KRYKARD CA 6505/CA 6545 - 5kV High Voltage Insulation Testers for Power Utilities — insulation tester designed for reliable insulation resistance.",
      keywords: "CA 6505/CA 6545, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6505-ca6545"
    },
    'ca6547-ca6549': {
      title: "KRYKARD CA 6547/CA 6549 | Insulation Testers",
      description: "KRYKARD CA 6547/CA 6549 - Advanced 5kV Insulation Testers with USB Connectivity — insulation tester designed for reliable insulation resistance.",
      keywords: "CA 6547/CA 6549, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6547-ca6549"
    },
    'ca6550-ca6555': {
      title: "KRYKARD CA 6550/CA 6555 | Insulation Testers",
      description: "KRYKARD CA 6550/CA 6555 - Ultra High Voltage 10kV/15kV Insulation Testers for Utility Monitoring — insulation tester designed for reliable insulation.",
      keywords: "CA 6550/CA 6555, insulation testers, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca6550-ca6555"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/insulation-testers');
    }
  }, [product, navigate]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `${product.model} - ${product.subtitle} | Insulation Testers`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "insulation testers, electrical testing, insulation resistance measurement",
    slug: product.id
  };

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.model,
    "description": product.description,
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": product.model,
    "image": `https://atandra.in${product.image}`,
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
  };

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Get fallback image
  const getFallbackImage = () => {
    return 'https://via.placeholder.com/300x200/FFD700/000000?text=No+Image';
  };

  // Feature icon logic
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('logging')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('communication') || feature.toLowerCase().includes('bluetooth') || feature.toLowerCase().includes('usb')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('test')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('timer') || feature.toLowerCase().includes('alarm') || feature.toLowerCase().includes('programmable')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('ip') || feature.toLowerCase().includes('protection')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('calculation') || feature.toLowerCase().includes('dar') || feature.toLowerCase().includes('pi') || feature.toLowerCase().includes('plotting')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  // Brochure dropdown logic for CA 6522/CA 6528
  const renderBrochureButton = () => {
    if (product.id === 'ca6522-ca6528') {
      return (
        <div className="relative flex-1">
          <button
            onClick={() => setBrochureDropdownOpen((open) => !open)}
            className="w-full text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
            style={{ backgroundColor: '#F5C842' }}
            type="button"
          >
            <Download className="h-5 w-5" />
            <span>View Brochure</span>
            <ChevronDown className="h-4 w-4 ml-2" />
          </button>
          {brochureDropdownOpen && (
            <div className="absolute left-0 right-0 mt-2 bg-white border border-yellow-400 rounded-xl shadow-lg z-50">
              <button
                onClick={() => { window.open('/ca6522p.pdf', '_blank'); setBrochureDropdownOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors duration-200 border-b border-gray-100 rounded-t-xl"
              >
                CA6522 Brochure
              </button>
              <button
                onClick={() => { window.open('/ca6528p.pdf', '_blank'); setBrochureDropdownOpen(false); }}
                className="w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors duration-200 rounded-b-xl"
              >
                CA6528 Brochure
              </button>
            </div>
          )}
        </div>
      );
    } else {
      return (
        <button
          onClick={() => (product as any).brochure && window.open((product as any).brochure, '_blank')}
          className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
          style={{ backgroundColor: '#F5C842' }}
          type="button"
          disabled={!(product as any).brochure}
        >
          <Download className="h-5 w-5" />
          <span>View Brochure</span>
        </button>
      );
    }
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/insulation-testers/product/${product.id}`}
        ogImage={`https://atandra.in${product.image}`}
        jsonLd={jsonLd}
        preloadImage={product.image}
      />
      <PageLayout hideHero={true} hideBreadcrumbs={true}>
        {/* Hide Breadcrumbs and Remove Top Padding */}
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

        <div className="min-h-screen bg-yellow-50" style={{ fontFamily: 'Open Sans, sans-serif' }}>
          {/* Main Title Section */}
          <div className="py-8" style={{ background: '#F5C842' }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
              {/* Title always at top in mobile, center in desktop */}
              <div className="text-center mb-4 md:mb-0">
                <h2 className="text-4xl md:text-5xl font-bold text-black mb-2">
                  Insulation Testers
                </h2>
                <p className="text-xl text-black font-medium">
                  Professional Insulation Testing Solutions
                </p>
              </div>
              {/* Responsive flex container for dropdown and back button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
                <ProductDropdown
                  product={product}
                  productList={productList}
                  navigate={navigate}
                />
                {/* Back button second on mobile, left on desktop */}
                <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
                  <button
                    onClick={() => navigate('/measure/insulation-testers#products-section')}
                    className="bg-white border border-yellow-400 text-black font-bold py-2 px-4 rounded-xl shadow-md hover:bg-yellow-50 transition-all duration-200 flex items-center space-x-2 w-full md:w-auto justify-center text-center"
                  >
                    <span>&larr;</span>
                    <span>Back to Products</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Hero Section */}
          <div className="bg-gradient-to-br from-yellow-100 to-yellow-50 py-8 md:py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-center md:justify-between items-center md:items-stretch gap-6 md:gap-8">
                {/* Content Left (on desktop) */}
                <div className="w-full md:w-1/2 max-w-2xl order-2 md:order-1 flex flex-col justify-center">
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-4 order-1 lg:order-1"
                  >
                    <div className="inline-block px-3 py-1.5 rounded-full text-black font-bold text-xs mb-3" style={{ backgroundColor: '#F5C842' }}>
                      {product.measurement}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
                      {product.model}
                    </h1>
                    <p className="text-lg text-yellow-700 font-semibold mb-4">
                      {product.subtitle}
                    </p>
                    <p className="text-base text-black leading-relaxed mb-6">
                      {product.description}
                    </p>
                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Safety Rating</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.voltage}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Range</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.accuracy}</p>
                      </div>
                      {/* <div className="bg-white p-3 rounded-xl shadow-md col-span-2">
                      <h4 className="font-semibold text-black mb-1">Price</h4>
                      <p className="font-bold" style={{ color: '#B8860B' }}>{product.price}</p>
                    </div> */}
                    </div>
                    {/* Action Buttons at Bottom */}
                    <div className="flex flex-col sm:flex-row gap-3 pt-4">
                      <button onClick={() => navigate('/contact/sales')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
                        <Phone className="h-5 w-5" />
                        <span>Request Demo</span>
                      </button>
                      {renderBrochureButton()}
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full max-w-xs">
                    {product.images && product.images.length > 1 ? (
                      <Carousel
                        images={product.images}
                        className="w-full"
                        theme="yellow"
                      />
                    ) : (
                      <img
                        src={imageError ? getFallbackImage() : product.image}
                        alt={`KRYKARD ${product.model} Insulation Tester`}
                        className="w-full h-auto object-contain"
                        style={{
                          maxHeight: '200px',
                          maxWidth: '200px',
                          background: 'transparent',
                          mixBlendMode: imageError ? 'normal' : 'multiply',
                          filter: imageError ? 'none' : 'brightness(1.1) contrast(1.1)',
                          opacity: '0.95'
                        }}
                        onError={handleImageError}
                        onLoad={() => setImageError(false)}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Applications Section */}
          <div className="py-8 md:py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Features */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
                >
                  {/* Header */}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold text-gray-900">Key Features</h2>
                  </div>

                  {/* Content Area - Flex Grow */}
                  <div className="flex-1 flex flex-col">
                    {/* Preview Content - Always Visible */}
                    <div className="px-6 pb-6 space-y-4 flex-1">
                      {product.features.slice(0, 6).map((feature, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.05 }}
                          className="flex items-start gap-4 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                            <FeatureIcon feature={feature} />
                          </div>
                          <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Expandable Content - Additional Features */}
                    {product.features.length > 6 && (
                      <AnimatePresence>
                        {featuresExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-6 space-y-4 border-t border-gray-100 pt-4">
                              {product.features.slice(6).map((feature, index) => (
                                <motion.div
                                  key={index + 6}
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ duration: 0.4, delay: index * 0.05 }}
                                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                                >
                                  <div className="flex-shrink-0 w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                                    <FeatureIcon feature={feature} />
                                  </div>
                                  <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

                  {/* Show More/Less Button - Always at Bottom */}
                  {product.features.length > 6 && (
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4 mt-auto">
                      <button
                        onClick={() => setFeaturesExpanded(!featuresExpanded)}
                        className="w-full py-3 px-4 text-black hover:text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 rounded-lg hover:bg-yellow-50 border border-yellow-200 hover:border-yellow-300"
                      >
                        {featuresExpanded ? (
                          <>
                            <span>Show Less</span>
                            <ChevronDown className="h-4 w-4" />
                          </>
                        ) : (
                          <>
                            <span>Show {product.features.length - 6} More Features</span>
                            <ChevronRight className="h-4 w-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </motion.div>

                {/* Applications */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-8"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Applications</h2>
                  <div className="space-y-3">
                    {product.applications.map((application, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                      >
                        <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <span className="text-gray-700 font-medium">{application}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-8 md:py-12"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full">
                {/* Header */}
                <div className="p-6 text-center">
                  <h2 className="text-3xl font-bold text-gray-900">Technical Specifications</h2>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  {(product.id === 'ca6522-ca6528' || product.id === 'ca6550-ca6555') ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(product.technicalSpecs).map(([model, specs]: [string, any]) => (
                        <div key={model} className="bg-white rounded-xl shadow-md border border-yellow-100 p-6">
                          <h3 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b border-yellow-200 text-center">{model}</h3>
                          <div className="space-y-6">
                            {Object.entries(specs as Record<string, string>).map(([key, value], index) => (
                              <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="flex items-start space-x-3"
                              >
                                <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                                <div className="flex-1">
                                  <span className="font-semibold text-gray-800">{key}</span>
                                  <span className="mx-2">:</span>
                                  <span className="text-gray-700">{value}</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-4">
                        {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex items-start space-x-3"
                          >
                            <div className="flex-shrink-0 w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                            <div className="flex-1">
                              <span className="font-semibold text-gray-800">{key}</span>
                              <span className="mx-2">:</span>
                              <span className="text-gray-700">{value}</span>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <div className="py-12 md:py-16 mb-16 md:mb-24 bg-gradient-to-br from-yellow-50 to-yellow-100 border-t-2 border-yellow-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                  Need Expert Advice?
                </h2>
                <p className="text-base md:text-lg text-gray-700 mb-10 font-medium">
                  Our specialists provide comprehensive guidance on insulation testing solutions
                </p>
                <button
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-base mx-auto"
                  onClick={() => navigate('/contact/sales')}
                >
                  <Mail className="h-5 w-5" />
                  <span>Contact Sales</span>
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

// Dropdown component for product selection
function ProductDropdown({ product, productList, navigate }: { product: any, productList: any[], navigate: any }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:block dropdown-container">
      <div className="relative w-full md:w-auto group">
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="bg-white border border-yellow-400 text-black font-bold py-3 px-6 rounded-xl shadow-md flex items-center space-x-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200 focus:outline-none hover:bg-yellow-50"
          style={{ fontWeight: 700, fontSize: '1.25rem' }}
          type="button"
        >
          <span>{product.model}</span>
          <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`} />
        </button>
        {dropdownOpen && (
          <div className="absolute top-full left-0 right-0 md:right-auto md:w-80 mt-2 bg-white border border-yellow-400 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
            {productList.map((prod) => (
              <button
                key={prod.id}
                onClick={() => {
                  setDropdownOpen(false);
                  navigate(`/measure/insulation-testers/product/${prod.id}`);
                }}
                className={`w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors duration-200 border-b border-gray-100 last:border-b-0 ${prod.id === product.id ? 'bg-yellow-50 font-bold' : ''
                  }`}
              >
                <div className="font-bold text-black">{prod.model}</div>
                <div className="text-sm text-gray-600">{prod.subtitle}</div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default InsulationTesterProduct;