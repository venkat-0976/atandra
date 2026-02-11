import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Download,
  Phone,
  Zap,
  Monitor,
  Database,
  Wifi,
  Battery,
  Thermometer,
  ChevronDown,
  ChevronLeft,
  Gauge,
  Shield,
  BarChart,
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

interface ProductView {
  title: string;
  subtitle: string;
  description: string;
  specs: Record<string, string>;
  features?: string[];
  specs_image?: string;
}

interface BaseProduct {
  id: string;
  model: string;
  subtitle: string;
  image: string;
  images: string[];
  voltage: string;
  measurement: string;
  accuracy: string;
  description: string;
  keyFeatures: string[];
  technicalSpecs: Record<string, string>;
  applications: string[];
}

interface StandardProduct extends BaseProduct {
  views?: never;
}

interface ProductWithViews extends BaseProduct {
  views: ProductView[];
}

type ProductData = StandardProduct | ProductWithViews;

// Type guard to check if a product has views
function hasViews(product: ProductData): product is ProductWithViews {
  return 'views' in product && Array.isArray((product as ProductWithViews).views);
}

const PowerQualityAnalyzerProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Debug during SSR - log immediately to see if component renders
  if (typeof window === 'undefined') {
    console.log(`[PowerQualityAnalyzerProduct SSR] Component rendered with productId: ${productId}`)
  }

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [currentView, setCurrentView] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'alm20', model: 'ALM 20', subtitle: '3 Channel Power Quality Analyzer' },
    { id: 'alm31', model: 'ALM 31', subtitle: '3 Channel Power Quality Analyzer' },
    { id: 'alm36', model: 'ALM 36', subtitle: '4 Channel Power Quality Analyzer' },
    { id: 'ca8345', model: 'CA 8345', subtitle: 'Class A Power Quality Analyzer' },
    { id: 'mn93a', model: 'Current Transformers', subtitle: 'Versatile range of current sensors' }
  ];


  const brochureMap: Record<string, string> = {
    alm20: '/alm20p.pdf',
    alm31: '/alm31p.pdf',
    alm36: '/alm36p.pdf',
    ca8345: '/ca8345p.pdf',
    mn93a: '/ct93ap.pdf'
  };

  // Complete product data with enhanced features and specs
  const productData = {
    alm20: {
      id: 'alm20',
      model: 'ALM 20',
      subtitle: '3 Channel Power Quality Analyzer',
      image: '/alm20_1.jpg',
      images: [
        '/ALM-20-inside-01.png',
        '/ALM-20-inside-02.png' // More images when available
      ],
      voltage: '10–1000 V (ph-N & ph-ph)',
      measurement: 'Power & Energy',
      accuracy: '±0.5%',
      description: 'The ALM 20 provides essential power quality analysis in a compact, self-powered package. Perfect for long-term monitoring and basic power quality assessment with reliable performance.',
      keyFeatures: [
        'Compact self-powered design',
        'Long-term monitoring capability',
        'AC/DC voltage measurement up to 1,000V Ph-N',
        'Power measurement: kW, kVAr, kVA, PF & DPF',
        'Energy measurement: kWh, kVArh, kVAh',
        'THD & Harmonics up to 50th order',
        'User-friendly interface',
        'Portable and rugged construction',
        'Battery-powered operation',
        'Real-time data logging',
        'Automatic measurement recording',
        'Environmental protection rating',
        'Easy setup and configuration',
        'Professional measurement accuracy'
      ],
      technicalSpecs: {
        'TRMS AC+DC Voltage': '10–1000 V (ph-N & ph-ph), up to 650 kV ratio',
        'TRMS AC+DC Current': '5 mA–12 kAac / 50 mA–1300 Adc, up to 25 kA ratio (probe dependent)',
        'Frequency': 'DC / 50 / 60 / 400 Hz',
        'Power values': 'P, P+, Punb, Qf, N, D, S; cos Φ, tan Φ, PF',
        'Energy values': 'up to 4 EWh, EVAh, EVarh',
        'Harmonics': 'THD for V & A, harmonics to 50th order',
        'Recording': '200 ms / 1 s trends, selectable 1–60 min intervals; several weeks to years (SD card up to 32 GB)',
        'Phasor diagram': 'Yes (via DataView® or Android App)',
        'Alarms': 'Up to 32; email alerts & reports via DataViewSync™',
        'Protection': 'IP54 (disconnected) / IP20 (connected), IEC 61010 CAT IV 600V / CAT III 1000V',
        'Interfaces': 'USB, Ethernet/Wi-Fi LAN, Ethernet/Wi-Fi Direct',
        'Mounting': 'Magnetic',
        'Dimensions / Weight': '256 × 125 × 37 mm / < 1 kg'
      },
      applications: [
        'Basic power quality monitoring',
        'Energy consumption analysis',
        'Electrical system troubleshooting',
        'Preventive maintenance programs',
        'Small to medium facility monitoring',
        'Educational and training purposes'
      ]
    },
    alm31: {
      id: 'alm31',
      model: 'ALM 31',
      subtitle: '3 Channel Power Quality Analyzer',
      image: '/alm31_10.jpg',
      images: [
        '/ALM-31-inside-01.png',
        '/ALM-31-inside-02.png'
        // Add more images when available
      ],
      voltage: '1,000V Ph-N',
      measurement: 'Power & Flicker',
      accuracy: '±0.5%',
      //price: 'Contact for pricing',
      description: 'The ALM 31 provides real-time visual analysis with its color display and enhanced measurement capabilities for professional power quality assessment with advanced features.',
      keyFeatures: [
        'Color display for enhanced visualization',
        'Real-time power quality analysis',
        'AC/DC voltage measurement up to 1,000V Ph-N',
        'Power measurement: kW, kVAr, kVA, PF & DPF',
        'Crest factor & K-factor measurement',
        'Short flicker measurement (Pst)',
        'Advanced data logging capabilities',
        'Professional-grade construction',
        'Enhanced user interface',
        'Comprehensive alarm system',
        'Multi-parameter display',
        'Trend analysis capability',
        'Export data functionality',
        'Real-time waveform display'
      ],
      technicalSpecs: {
        'Voltage and Current Measurement': 'TRMS AC+DC voltage and current, frequency',
        'Power values': 'W, VA, var, VAD, PF, DPF, cos φ, tan φ',
        'Energy values': 'Wh, varh, VAh, VADh, BTU, toe, Joule',
        'Harmonics': '0 to the 50th order, phase',
        'Flicker (Pst and Plt)': 'Pst',
        'Recording': 'Selection of parameters at maximum sampling rate over a period from 4 hrs to 2 weeks',
        'Peak detection': 'Yes',
        'Vectorial representation': 'Yes',
        'Protection rating': 'IP53 / IK08',
        'USB communication': 'Yes',
        'Dimensions / weight': '240 × 180 × 55 mm / 1.9 kg'
      },
      applications: [
        'Professional power quality assessment',
        'Industrial facility monitoring',
        'Power system analysis',
        'Flicker measurement studies',
        'Electrical installation verification',
        'Maintenance and troubleshooting'
      ]
    },
    alm36: {
      id: 'alm36',
      model: 'ALM 36',
      subtitle: '4 Channel Power Quality Analyzer',
      image: '/alm-36_1-1.jpg',
      images: [
        '/alm36.png',
        '/ALM_36_inside-02.png'
        // Add more images when available
      ],
      voltage: '1,000V Ph-N',
      measurement: 'Transients & Harmonics',
      accuracy: '±0.2%',
      //price: 'Contact for pricing',
      description: 'The ALM 36 provides professional-grade power analysis with IEC compliance, advanced alarms, and transient capture for comprehensive quality assessment in demanding applications.',
      keyFeatures: [
        'Transient capture up to 210 counts',
        'TrueInrush function for motor analysis',
        'THD & Harmonics up to 50th order',
        'Pst & Plt flicker measurements',
        'IEC compliance for professional use',
        'Advanced alarm system',
        'Comprehensive data analysis',
        'Rugged industrial design',
        'High-resolution measurement',
        'Multi-channel analysis',
        'Automatic event detection',
        'Professional reporting tools',
        'Network connectivity options',
        'Advanced triggering system'
      ],
      technicalSpecs: {
        'Inputs': '4 Voltage / 4 Current',
        'TRMS AC+DC Voltage': '2–1000 V (ph-N), 2–2000 V (ph-ph)',
        'TRMS AC+DC Current': '5 mA–10 kA (probe dependent)',
        'Frequency': '40–70 Hz',
        'Power values': 'W, VA, var, PF, DPF, cos φ',
        'Energy values': 'Wh, VAh, varh',
        'Harmonics': 'DC, 1st to 50th order; THD for V & A',
        'Flicker': 'Pst (10 min) & Plt (2 hrs)',
        'Other PQ parameters': 'Energy loss, Voltage & Current unbalance (%)',
        'Transient capture': 'Up to 210 events',
        'Alarms': 'Up to 40 types, 16,000 events max',
        'Recording': 'Trend data to SD card; snapshots up to 50 screens + channel data',
        'Display': 'Color TFT 320×240 with vectorial representation',
        'Protection': 'IP53; IEC/EN 61010-1 CAT III 1000V / CAT IV 600V',
        'Interfaces': 'Isolated USB, SD card, DataView® software',
        'Battery life': '>13 h (display ON), up to 25 h (recording, display OFF)',
        'Dimensions / Weight': '250 × 200 × 67 mm / 1.95 kg'
      },
      applications: [
        'Advanced power quality analysis',
        'Industrial equipment monitoring',
        'Motor and drive system analysis',
        'Power system commissioning',
        'Compliance testing and verification',
        'Critical facility monitoring'
      ]
    },
    ca8345: {
      id: 'ca8345',
      model: 'CA 8345',
      subtitle: 'Class A Power Quality Analyzer',
      image: '/ca8345_qualistar_f.jpg',
      images: [
        '/ca8345_qualistar_f.png',
        '/ca8345_qualistar_g.png' // Add more images when available
      ],
      voltage: '1,000V Ph-N',
      measurement: 'Class A Certified',
      accuracy: '±0.1%',
      //price: 'Contact for pricing',
      description: 'The flagship CA 8345 delivers industry-leading performance with Class A certification, advanced harmonic analysis, and superior storage capacity for the most demanding applications.',
      keyFeatures: [
        'Class A certified performance',
        'Harmonics up to 127th order',
        'Interharmonics up to 126th order',
        '2.5 μs transients capture',
        '16,362 alarms of 40 conditions',
        'Superior data storage capacity',
        'Advanced PC software included',
        'Professional certification compliance',
        'Ultra-high precision measurement',
        'Real-time spectrum analysis',
        'Advanced power quality reporting',
        'Multi-site monitoring capability',
        'Professional data export tools',
        'Industry-leading accuracy specifications'
      ],
      technicalSpecs: {
        'Inputs': '5 Voltage / 4 Current (isolated)',
        'TRMS AC+DC Voltage': '5–1000 V AC/DC',
        'Harmonics': 'DC to 127th order; Interharmonics to 126th order',
        'Frequency': '42.5–69 Hz',
        'Transient capture': 'No limit (SD card dependent), shockwave up to 12 kV at 500 ns sampling',
        'Flicker': 'Pst < 0.1',
        'Unbalance': 'Voltage unbalance 0.5–5% (±0.15% abs)',
        'Trend recording': '>900 parameters; 3 days @ 200 ms, 15 days @ 1 s, 45 days @ 3 s',
        'Sampling rate': 'Voltage 400 kS/s, Current 200 kS/s, Surge 2 MS/s',
        'Alarms': '52 types, up to 20,000; email notifications',
        'Power/Energy': 'Composite measurement modes',
        'Screenshots': 'Unlimited (SD card dependent)',
        'Power supply': '100–1000 V AC/DC phase powered (external block included)',
        'Battery': '5.8 Ah Li-ion; ≤6 h (display on), ≤10 h (display off)',
        'Display': '7" color LCD touchscreen, 800×480 (WVGA)',
        'Clock/GPS': 'Built-in',
        'Protection': 'IP54; IEC 61010 CAT IV 1000V',
        'Standards compliance': 'IEC 61000-4-30 Ed 3 Class A, IEC 61557-12, IEC 62586',
        'Interfaces': 'USB, Ethernet, Wi-Fi, Web server, DataViewSync™',
        'Dimensions / Weight': '200 × 285 × 55 mm / 1.9 kg'

      },
      applications: [
        'Premium power quality analysis',
        'Utility and grid monitoring',
        'Research and development',
        'High-precision measurements',
        'Certification and compliance testing',
        'Critical infrastructure monitoring'
      ]
    },
    mn93a: {
      id: 'mn93a',
      model: 'Current Transformers',
      //subtitle: 'Wide Measurement range current Transformers',
      image: '/ct93a_1.jpg',
      images: [
        '/MN93a-01.png',
        '/A193-450-01.png',
        '/A193-800.png',
        '/PAC-93-01.png',
        '/e27_g.png',
        '/c193-01.png',
      ],
      views: [
        {
          title: 'MN93-A',
          //subtitle: 'Professional Current Measurement',
          description: 'The MN93A Serie is a versatile transformer clamp for measuring alternating currents with a power analyser. This clamp has 2 sensitivities for better measurement resolution and accuracy, and can be used on current transformer (CT) 5A.',
          specs: {
            'AC Measurement Range': '0.005 A to 100 A',
            'Measurement Ranges': '5 A – 100 A',
            'Clamping Diameter': '20 mm',
            'Safety Standard': 'IEC 61010',
            'Measurement Category': '600 V CAT III / 300 V CAT IV'
          }
        },
        {
          title: 'A193(450mm)',
          //subtitle: 'Ergonomic Design',
          description: 'This flexible current transformer is ideal for AC current measurements on any conductor shape or in inaccessible places.',
          specs: {
            'Model': 'AmpFlex A193 450 mm',
            'Measurement Range': '100 mA-10000 A',
            'Clamping Diameter': '100 mm',
            'Cord length': '3 m'
          }
        },
        {
          title: 'A193(800mm)',
          //subtitle: '5A Secondary Current Measurement',
          description: 'This flexible current transformer is ideal for AC current measurements on any conductor shape or in inaccessible places.',
          specs: {
            'Model': 'AmpFlex A193 800 mm',
            'Measurement Range': '100 mA-10000 A',
            'Clamping Diameter': '190 mm',
            'Cord length': '3 m'
          }
        },
        {
          title: 'PAC 93',
          //subtitle: 'Advanced Measurement Technology',
          description: 'The PAC Series is a range of Hall-effect current clamps for measuring direct and alternating currents.',
          specs: {
            "Measurement Range (AC)": "1 A to 1,000 A",
            "Measurement Range (DC)": "1 A to 1,300 A",
            "Clamping Diameter / Length": "1 × Ø 39 mm / 2 × Ø 25 mm",
            "Safety Standard": "IEC 61010",
            "Measurement Category": "600 V CAT III / 300 V CAT IV"
          }
        },
        {
          title: 'E 27',
          //subtitle: 'Versatile Usage',
          description: 'The E series clamp-on current transformers from Chauvin Arnoux enable you to measure direct and alternating currents with a Hall-effect probe. Thanks to its elongated, narrow shape, the E27 clamp-on current transformer enables measurements in hard-to-reach places, for example when cables block the path.',
          specs: {
            "Measurement Range": "100 mA to 100 A peak",
            "Bandwidth": "100 kHz (−3 dB)",
            "Clamping Diameter": "11.8 mm"
          }
        },
        {
          title: 'C193',
          //subtitle: 'Professional Kit',
          description: 'The C Series is a range of high-performance 1,000 A transformer clamps. The round jaw shape and the uniformly-distributed winding guarantee accuracy and minimum phase difference.It is equipped with an oscillating magnetic element adjustment system and a patented system for gradual assisted jaw opening.',
          specs: {
            "Measurement Range (AC)": "1 A to 1,000 A",
            "Clamping Diameter / Length": "52 mm",
            "Safety Standard": "IEC 61010",
            "Measurement Category": "600 V CAT IV"
          }
        }
      ],
      voltage: '100Amps',
      measurement: '',
      accuracy: '±0.2%',
      description: 'The MN93A Serie is a versatile transformer clamp for measuring alternating currents with a power analyser. This clamp has 2 sensitivities for better measurement resolution and accuracy, and can be used on current transformer (CT) 5A.',
      keyFeatures: [
        'High-precision power measurements',
        'Advanced harmonic analysis up to 50th order',
        'Real-time power quality monitoring',
        'Comprehensive data logging and storage',
        'Professional-grade construction and safety',
        'Multi-channel voltage and current analysis',
        'Advanced triggering and event capture',
        'User-friendly interface with color display',
        'Extensive communication options',
        'Long-term monitoring capabilities',
        'Professional reporting tools',
        'IEC compliance for professional use',
        'Rugged industrial design',
        'Advanced alarm system'
      ],
      technicalSpecs: {
        'AC Measurement Range': '0.005 A to 100 A',
        'Measurement Ranges': '5 A – 100 A',
        'Clamping Diameter / Length': '20 mm',
        'Safety Standard': 'IEC 61010',
        'Measurement Category': '600 V CAT III / 300 V CAT IV'
      },
      applications: [
        'Professional power quality analysis',
        'Industrial facility monitoring',
        'Power system commissioning',
        'Electrical installation verification',
        'Compliance testing and verification',
        'Critical facility monitoring',
        'Research and development',
        'Utility and grid monitoring'
      ]
    },
  };

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string }> = {
    alm20: {
      title: 'KRYKARD ALM20 | Power Quality Analyzers',
      description: 'KRYKARD ALM 20 3-channel power quality analyzer provides accurate voltage, current, harmonic and energy measurement for electrical analysis.',
      keywords: 'ALM20, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance'
    },
    alm31: {
      title: 'KRYKARD ALM31 | Power Quality Analyzers',
      description: 'KRYKARD ALM 31 - 3 Channel Power Quality Analyzer with Power & Flicker Measurement — power quality analyzer providing voltage, current, harmonic.',
      keywords: 'ALM31, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance'
    },
    alm36: {
      title: 'KRYKARD ALM36 | Power Quality Analyzers',
      description: 'KRYKARD ALM 36 - 4 Channel Power Quality Analyzer with Transients & Harmonics Analysis — power quality analyzer providing voltage, current, harmonic.',
      keywords: 'alm36, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance'
    },
    ca8345: {
      title: 'KRYKARD CA8345 | Power Quality Analyzers',
      description: 'KRYKARD CA 8345 - Class A Power Quality Analyzer with Premium Certification — power quality analyzer providing voltage, current, harmonic and energy.',
      keywords: 'ca8345, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance'
    },
    mn93a: {
      title: 'KRYKARD MN93A | Power Quality Analyzers',
      description: 'KRYKARD MN93-A current transformers with wide measurement range for accurate power measurement and advanced power analysis',
      keywords: 'mn93a, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance'
    }
  };

  const product = productData[productId as keyof typeof productData] as ProductData;

  // Generate product-specific SEO content for selected products
  const getSeoContent = (productId: string | undefined) => {
    if (!productId || !productData[productId as keyof typeof productData]) {
      return null;
    }

    const product = productData[productId as keyof typeof productData] as ProductData;
    const model = product.model;
    const subtitle = ('subtitle' in product ? product.subtitle : 'Current Transformers') || 'Current Transformers';
    const accuracy = product.accuracy || '±0.2%';

    // Product-specific content based on model
    const contentMap: Record<string, { intro: string; features: string; technical: string; why: string }> = {
      'mn93a': {
        intro: `Current transformers, also known as current sensors or current clamps, are essential accessories for power quality analyzers and electrical measurement instruments, enabling safe and accurate current measurement without breaking the circuit. These professional-grade devices use electromagnetic induction or Hall-effect technology to measure alternating and direct currents, providing isolated measurement capabilities that protect both the operator and the measurement equipment. The KRYKARD ${model} series represents a versatile range of current transformers designed for comprehensive current measurement with power analyzers, offering multiple models with different clamping diameters, measurement ranges, and technologies to suit various industrial, commercial, and utility applications.`,
        features: `The KRYKARD ${model} series is specifically designed for professionals who require accurate current measurement in professional power quality analysis, industrial facility monitoring, power system commissioning, electrical installation verification, compliance testing and verification, critical facility monitoring, research and development, and utility and grid monitoring. Our comprehensive range includes MN93-A transformer clamps with 2 sensitivities for better measurement resolution, flexible AmpFlex A193 models (450mm and 800mm) for measurements on any conductor shape, PAC 93 Hall-effect clamps for AC and DC current measurement, E27 elongated clamps for hard-to-reach places, and C193 high-performance transformer clamps. These current transformers support measurement ranges from 0.005 A to 10,000 A depending on model, with clamping diameters from 11.8mm to 190mm, enabling measurement of various conductor sizes and configurations.`,
        technical: `The ${model} current transformer series offers exceptional performance with AC measurement ranges from 0.005 A to 100 A (MN93-A), 100 mA to 10,000 A (A193 flexible models), 1 A to 1,000 A (PAC 93 and C193), and 100 mA to 100 A peak (E27). DC measurement capability is available in PAC 93 and E27 models, supporting DC current measurement from 1 A to 1,300 A. Accuracy specifications of ${accuracy} ensure reliable current measurements for power quality analysis. The instruments feature various clamping diameters from 11.8mm (E27) to 190mm (A193 800mm), enabling measurement of different conductor sizes. Safety standards include IEC 61010 compliance, with measurement categories ranging from 600 V CAT III / 300 V CAT IV (MN93-A, PAC 93, E27) to 600 V CAT IV (C193), ensuring safe operation in various electrical environments.`,
        why: `KRYKARD ${model} current transformer series combines precision engineering with versatile design, delivering professional-grade current measurement accessories in reliable packages. With features like wide measurement ranges (0.005 A to 10,000 A), multiple clamping diameters (11.8mm to 190mm), AC and DC measurement capability, high accuracy (${accuracy}), flexible designs for difficult access, Hall-effect technology for DC measurement, IEC 61010 safety compliance, and comprehensive range of models for various applications, the ${model} series is trusted by professionals across India for professional power quality analysis, industrial facility monitoring, power system commissioning, electrical installation verification, compliance testing, critical facility monitoring, research and development, and utility and grid monitoring. Whether you need to measure small currents, large currents, DC currents, or access hard-to-reach conductors, the ${model} series provides the reliability and versatility required for professional current measurement applications.`
      }
    };

    return contentMap[productId] || null;
  };

  // Debug during SSR to verify product and SEO data
  if (typeof window === 'undefined') {
    console.log(`[SSR Product] ProductId from useParams: ${productId}`)
    console.log(`[SSR Product] Product lookup result: ${product ? 'FOUND' : 'NOT FOUND'}`)
    if (product) {
      const seo = seoData[product.id] || {
        title: `KRYKARD ${product.model} | Power Quality Analyzers`,
        description: product.description || `${product.model} - ${product.subtitle}. Professional power quality analyzer from KRYKARD.`,
        keywords: `${product.model}, power quality analyzer, KRYKARD, electrical testing equipment`
      }
      console.log(`[SSR Product] SEO Title: ${seo.title}`)
      console.log(`[SSR Product] SEO Description: ${seo.description?.substring(0, 50)}...`)
    } else {
      console.warn(`[SSR Product] ⚠️ Product not found for productId: ${productId}`)
      console.warn(`[SSR Product] Available product IDs: ${Object.keys(productData).join(', ')}`)
    }
  }

  // Only navigate on client-side, not during SSR
  useEffect(() => {
    if (typeof window !== 'undefined' && !product) {
      navigate('/measure/power-quality-analyzers');
    }
  }, [product, navigate]);

  // Ensure image state resets when switching products to avoid stale images until refresh
  useEffect(() => {
    setImageError(false);
  }, [product?.id]);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return; // Skip during SSR

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

  // Early return if product not found - but always render SeoHead for SEO
  // This ensures helmet tags are always extracted during SSR
  if (!product) {
    // During SSR, log this issue but still render SeoHead for SEO
    if (typeof window === 'undefined') {
      console.warn(`[SSR Product] ⚠️ Product not found for productId: ${productId}`)
      console.warn(`[SSR Product] ⚠️ Available product IDs: ${Object.keys(productData).join(', ')}`)
      console.warn(`[SSR Product] ⚠️ Will render SeoHead with fallback title for SEO`)
    }

    // Always render SeoHead to ensure helmet tags are extracted
    // Use a meaningful title even for not-found cases
    const fallbackTitle = productId
      ? `${productId.toUpperCase()} | KRYKARD Power Quality Analyzers`
      : 'Product | KRYKARD Power Quality Analyzers'

    return (
      <>
        <SeoHead
          title={fallbackTitle}
          description={`KRYKARD ${productId?.toUpperCase() || 'Product'} - Power Quality Analyzer. Professional electrical testing equipment from KRYKARD.`}
          canonical={`https://atandra.in/measure/power-quality-analyzers/product/${productId || 'unknown'}`}
        />
        <div>Product not found</div>
      </>
    );
  }

  // Handle image loading errors
  const handleImageError = () => {
    setImageError(true);
  };

  // Get fallback image
  const getFallbackImage = () => {
    return 'https://via.placeholder.com/300x200/FFD700/000000?text=No+Image';
  };

  // Feature icon logic similar to OscilloscopeProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('color') || feature.toLowerCase().includes('touchscreen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('logging') || feature.toLowerCase().includes('data')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('communication') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('connectivity')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('power') || feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('self-powered')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('environmental')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('transient') || feature.toLowerCase().includes('alarm')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('accuracy') || feature.toLowerCase().includes('harmonics') || feature.toLowerCase().includes('analysis')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('compliance') || feature.toLowerCase().includes('iec') || feature.toLowerCase().includes('certified')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('flicker') || feature.toLowerCase().includes('trend') || feature.toLowerCase().includes('spectrum') || feature.toLowerCase().includes('waveform')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  // Get the brochure URL for the current product, fallback to undefined if not found
  const brochureUrl = brochureMap[product.id];

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `KRYKARD ${product.model} | Power Quality Analyzers`,
    description: product.description || `${product.model} - ${product.subtitle}. Professional power quality analyzer from KRYKARD.`,
    keywords: `${product.model}, power quality analyzer, KRYKARD, electrical testing equipment`
  };

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${product.model} - ${product.subtitle}`,
    "description": seo.description,
    "brand": {
      "@type": "Brand",
      "name": "KRYKARD"
    },
    "model": product.model,
    "image": `https://atandra.in${product.image}`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "itemCondition": "https://schema.org/NewCondition"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Atandra Energy Pvt Ltd"
    },
    "category": "Power Quality Analyzers"
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/power-quality-analyzers/product/${product.id}`}
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
                <h2 className="typography-h1 text-black mb-2">
                  Power Quality Analyzers
                </h2>
                <p className="typography-h4 text-black">
                  Professional Power Analysis Solutions
                </p>
              </div>
              {/* Responsive flex container for dropdown and back button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
                {/* Dropdown first on mobile, right on desktop */}
                <div className="order-1 md:order-2 w-full md:w-auto flex justify-center md:block dropdown-container">
                  <div className="relative w-full md:w-auto group">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-white border border-yellow-400 text-black font-bold py-3 px-6 rounded-xl shadow-md flex items-center space-x-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200 focus:outline-none hover:bg-yellow-50"
                      style={{ fontWeight: 700, fontSize: '1.25rem' }}
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
                              navigate(`/measure/power-quality-analyzers/product/${prod.id}`);
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
                {/* Back button second on mobile, left on desktop */}
                <div className="order-2 md:order-1 w-full md:w-auto flex justify-center md:justify-start">
                  <button
                    onClick={() => navigate('/measure/power-quality-analyzers')}
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
                    {hasViews(product) ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentView}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          {product.views[currentView].subtitle && product.id !== 'mn93a' && (
                            <div className="inline-block px-3 py-1.5 rounded-full text-black font-bold text-xs mb-3" style={{ backgroundColor: '#F5C842' }}>
                              {product.views[currentView].subtitle}
                            </div>
                          )}
                          <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
                            {product.views[currentView].title}
                          </h1>
                          <p className="text-lg text-yellow-700 font-semibold mb-4">
                            {product.model} - {product.subtitle}
                          </p>
                          <p className="text-base text-black leading-relaxed mb-6">
                            {product.views[currentView].description}
                          </p>
                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      <>
                        {product.measurement && (
                          <div className="inline-block px-3 py-1.5 rounded-full text-black font-bold text-xs mb-3" style={{ backgroundColor: '#F5C842' }}>
                            {product.measurement}
                          </div>
                        )}
                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-3">
                          {product.model}
                        </h1>
                        <p className="text-lg text-yellow-700 font-semibold mb-4">
                          {product.subtitle}
                        </p>
                        <p className="text-base text-black leading-relaxed mb-6">
                          {product.description}
                        </p>
                      </>
                    )}
                    {/* Quick Specs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Voltage Range</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.voltage}</p>
                      </div>
                      {product.id !== 'mn93a' && (
                        <div className="bg-white p-3 rounded-xl shadow-md">
                          <h4 className="font-semibold text-black mb-1">Accuracy</h4>
                          <p className="font-bold" style={{ color: '#B8860B' }}>{product.accuracy}</p>
                        </div>
                      )}
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
                      {brochureUrl && (
                        <button
                          onClick={() => window.open(brochureUrl, '_blank')}
                          className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
                          style={{ backgroundColor: '#F5C842' }}
                        >
                          <Download className="h-5 w-5" />
                          <span>View Brochure</span>
                        </button>
                      )}
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full flex flex-col items-center">
                    {hasViews(product) ? (
                      <div className="relative w-full">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={currentView}
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -50 }}
                            transition={{ duration: 0.5 }}
                            className="w-full"
                          >
                            <div className="relative group">
                              <button
                                className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setCurrentView((prev) => (prev > 0 ? prev - 1 : product.views.length - 1))}
                              >
                                <ChevronLeft className="h-6 w-6 text-gray-800" />
                              </button>
                              <img
                                src={product.images[currentView]}
                                alt={`KRYKARD ${product.model} ${product.views[currentView].title} - Current Transformer for Power Quality Analysis`}
                                className="object-contain mx-auto"
                                style={{
                                  maxHeight: '400px',
                                  background: 'transparent',
                                }}
                              />
                              <button
                                className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-10 opacity-0 group-hover:opacity-100 transition-opacity"
                                onClick={() => setCurrentView((prev) => (prev < product.views.length - 1 ? prev + 1 : 0))}
                              >
                                <ChevronRight className="h-6 w-6 text-gray-800" />
                              </button>
                            </div>
                          </motion.div>
                        </AnimatePresence>

                        {/* Image Navigation Dots */}
                        <div className="flex justify-center gap-2 mt-4">
                          {product.views.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentView(index)}
                              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentView === index ? 'bg-yellow-400 scale-125' : 'bg-gray-300 hover:bg-yellow-200'
                                }`}
                              aria-label={`View ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`w-full flex justify-center items-center ${product.id === 'alm20' ? '' : 'max-w-md'}`}
                        style={product.id === 'alm20' ? { maxWidth: '450px' } : {}}
                      >
                        {product.images && product.images.length > 1 ? (
                          <Carousel
                            key={product.id}
                            images={product.images}
                            className="w-full flex justify-center items-center"
                            theme="yellow"
                          />
                        ) : (
                          <img
                            key={product.id}
                            src={imageError ? getFallbackImage() : product.image}
                            alt={`KRYKARD ${product.model} - ${product.subtitle} - Power Quality Analyzer for ${product.measurement} Measurement`}
                            className="object-contain mx-auto"
                            style={
                              product.id === 'alm20'
                                ? {
                                  width: '450px',
                                  height: '450px',
                                  background: 'transparent',
                                  mixBlendMode: imageError ? 'normal' : 'multiply',
                                  filter: imageError ? 'none' : 'brightness(1.1) contrast(1.1)',
                                  opacity: '0.95',
                                  display: 'block',
                                }
                                : {
                                  maxHeight: '900px',
                                  maxWidth: '900px',
                                  background: 'transparent',
                                  mixBlendMode: imageError ? 'normal' : 'multiply',
                                  filter: imageError ? 'none' : 'brightness(1.1) contrast(1.1)',
                                  opacity: '0.95',
                                  display: 'block',
                                }
                            }
                            onError={handleImageError}
                            onLoad={() => setImageError(false)}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>        {/* Features and Applications Section - Side by Side (hidden for products with views) */}
          {!hasViews(product) && (
            <div className="py-8 md:py-12">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Key Features Section */}
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

                    {/* Content Area */}
                    <div className="flex-1 flex flex-col">
                      <div className="px-6 pb-6 space-y-4 flex-1">
                        {product.keyFeatures.slice(0, 6).map((feature, index) => (
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
                            <span className="flex-1 min-w-0 text-gray-800 font-medium leading-relaxed">{feature}</span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Expandable Features */}
                      {product.keyFeatures.length > 6 && (
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
                                {product.keyFeatures.slice(6).map((feature, index) => (
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
                                    <span className="flex-1 min-w-0 text-gray-800 font-medium leading-relaxed">{feature}</span>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}

                      {/* Show More/Less Button */}
                      {product.keyFeatures.length > 6 && (
                        <div className="px-6 pb-6 border-t border-gray-100 pt-4 mt-auto">
                          <button
                            onClick={() => setFeaturesExpanded(!featuresExpanded)}
                            className="w-full py-3 px-4 text-black hover:text-black font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 rounded-lg hover:bg-yellow-50 border border-yellow-200 hover:border-yellow-300"
                            style={{ backgroundColor: '#F5C842' }}
                          >
                            {featuresExpanded ? (
                              <>
                                <span>Show Less</span>
                                <ChevronDown className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                <span>Show {product.keyFeatures.length - 6} More Features</span>
                                <ChevronRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>

                  {/* Applications Section */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col h-full"
                  >
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900">Applications</h2>
                    </div>
                    <div className="px-6 pb-6 flex-1">
                      <div className="space-y-4">
                        {product.applications.map((application, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="flex items-start gap-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                          >
                            <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                            <span className="flex-1 min-w-0text-gray-700 font-medium">{application}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          )}

          {/* Technical Specifications Section - Centered Below */}
          <div className="py-8 md:py-12 bg-gradient-to-br from-yellow-50 to-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                {/* Header */}
                <div className="p-6 text-center">
                  <h2 className="text-2xl font-bold text-gray-900">Technical Specifications</h2>
                </div>

                {/* Content */}
                <div className="px-6 pb-6">
                  <ul className="space-y-4">
                    {hasViews(product) ? (
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentView}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                        >
                          <div className="w-full">
                            <div className="space-y-4">
                              {Object.entries(product.views[currentView].specs).map(([key, value], index) => (
                                <motion.li
                                  key={key}
                                  initial={{ opacity: 0, y: 10 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ duration: 0.4, delay: index * 0.05 }}
                                  className="flex items-start gap-3 text-gray-700"
                                >
                                  <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
                                  <span className="flex-1">
                                    <strong className="font-semibold">{key}</strong>
                                    <span className="mx-2">:</span>
                                    <span>{value}</span>
                                  </span>
                                </motion.li>
                              ))}
                            </div>
                          </div>


                        </motion.div>
                      </AnimatePresence>
                    ) : (
                      Object.entries(product.technicalSpecs).map(([key, value], index) => {
                        const isDirectPoint = value === null || value === undefined || value === '';
                        return (
                          <motion.li
                            key={key}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.05 }}
                            className="flex items-start gap-3 text-gray-700"
                          >
                            <span className="w-2 h-2 mt-2 rounded-full bg-yellow-400 flex-shrink-0"></span>
                            <span className="flex-1">
                              {isDirectPoint ? (
                                <span className="font-text-gray-700">{key}</span>
                              ) : (
                                <>
                                  <strong className="font-semibold">{key}</strong>
                                  <span className="mx-2">:</span>
                                  {value}
                                </>
                              )}
                            </span>
                          </motion.li>
                        );
                      })
                    )}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          {getSeoContent(productId) && (
            <section className="py-4 md:py-6 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
                  .seo-details-pqa summary {
                    list-style: none;
                  }
                  .seo-details-pqa summary::-webkit-details-marker {
                    display: none;
                  }
                `}</style>

                <details className="seo-details-pqa group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>

                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      {(() => {
                        const content = getSeoContent(productId);
                        if (!content) return null;
                        const currentProduct = productData[productId as keyof typeof productData];
                        return (
                          <>
                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                              Understanding Current Transformers and Power Measurement
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.intro}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Applications and Benefits of the {currentProduct?.model} Current Transformers
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.features}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Technical Excellence and Professional Features
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.technical}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Why Choose KRYKARD {currentProduct?.model} Current Transformers?
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {content.why}
                            </p>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </details>
              </div>
            </section>
          )}

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
                  Our specialists provide comprehensive guidance on power quality analyzer solutions
                </p>
                <button
                  className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-3 text-base mx-auto"
                  onClick={() => navigate('/contact/sales')}
                >
                  <Phone className="h-5 w-5" />
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

export default PowerQualityAnalyzerProduct;