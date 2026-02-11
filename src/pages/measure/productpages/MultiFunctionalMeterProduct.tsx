import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Check,
  Download,
  Mail,
  Phone,
  Zap,
  Monitor,
  Database,
  Wifi,
  Battery,
  Thermometer,
  ChevronDown,
  ChevronRight,
  Gauge,
  Shield,
  BarChart
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

// TypeScript interfaces for better type safety
interface ProductData {
  id: string;
  model: string;
  subtitle: string;
  image: string;
  images: string[];
  voltage: string;
  measurement: string;
  accuracy: string;
  price: string;
  brochureUrl: string; // Individual brochure URL
  description: string;
  keyFeatures: string[];
  technicalSpecs: Record<string, string>;
  applications: string[];

}

interface ProductList {
  id: string;
  model: string;
  subtitle: string;
}

const PDF_URL = '/T&M April 2025.pdf';

const MultiFunctionalMeterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList: ProductList[] = [
    { id: 'digi530', model: 'DiGi 530', subtitle: 'Standard Multi Function Meter' },
    { id: 'digi630', model: 'DiGi 630', subtitle: 'Advanced Multi Function Meter' },
    { id: 'digi730', model: 'DiGi 730', subtitle: 'Premium Multi Function Meter' },
    { id: 'digi760', model: 'DiGi 760', subtitle: 'High Precision Meter' },
    { id: 'digi820', model: 'DiGi 820', subtitle: 'Class A Power Quality Analyzer' },
    { id: 'multy4', model: 'Multy4', subtitle: 'Multi-Channel Meter' },
    { id: 'plmr90', model: 'PLM R90', subtitle: 'DC Energy Meter' },
    { id: 'plmr91', model: 'PLM R91', subtitle: 'AC Energy Meter' },
    { id: 'plmr93', model: 'PLM R93', subtitle: '3-Phase Energy Meter' },
    { id: 'eon40', model: 'EON 4.0', subtitle: 'Advanced Energy Meter' }
  ];

  // Complete product data
  const productData: Record<string, ProductData> = {
    digi530: {
      id: 'digi530',
      model: 'DiGi 530',
      subtitle: 'Standard Multi Function Meter',
      image: '/DiGi530S-H-01.png',
      images: [
        '/DiGi530S-H-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'Energy & Power',
      accuracy: 'Class 0.5s',
      price: 'Contact for pricing',
      brochureUrl: '/DiGi530S-530H.pdf',
      description: 'The DiGi 530 offers reliable energy and power measurement for industrial and panel applications, with advanced features and high accuracy for comprehensive monitoring solutions.',
      keyFeatures: [
        'Accuracy Class 0.5s as per IEC 62053-22',
        '3-line bright LCD display',
        'PT & CT programmable',
        'Password protection for setup page',
        'RS485 port with Modbus RTU protocol',
        'THD & Harmonics up to 31st order',
        'Load management feature',
        'Bi-directional energy measurement',
        'Compact 96mm x 96mm panel mount design',
        'Wide operating temperature range'
      ],
      technicalSpecs: {
        'Voltage': '110/400 V LL',
        'Current': '5 A / 1 A programmable',
        'Accuracy': 'V/I 0.2%, power 0.5%, kWh/kVARh Class 0.5s',
        'Harmonics': 'Up to 31st order',
        'Communication': 'RS485 Modbus RTU',
        'Pulse output': '1 channel'

      },
      applications: [
        'Industrial energy monitoring',
        'Panel metering',
        'Load management',
        'Energy billing',
        'Power quality monitoring',
        'Building automation'
      ],

    },
    digi630: {
      id: 'digi630',
      model: 'DiGi 630',
      subtitle: 'Advanced Multi Function Meter',
      image: '/DiGi630-01.png',
      images: [
        '/DiGi630-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'Energy & Power',
      accuracy: 'Class 0.5s/0.2s',
      price: 'Contact for pricing',
      brochureUrl: '/DiGi630S-630D.pdf',
      description: 'The DiGi 630 provides advanced energy measurement with digital I/O capabilities and enhanced communication features for comprehensive monitoring and control applications.',
      keyFeatures: [
        'Accuracy Class 0.5s / Class 0.2s as per IEC 62053-22',
        '3-line bright LCD display',
        'PT & CT programmable',
        '4 DI, 2 DO (DiGi 630D)',
        'Screen shot recording for energy accounting',
        'RS485 port with Modbus RTU protocol',
        'Modbus custom table',
        'Bi-directional energy measurement',
        'Advanced alarm and control functions',
        'Data logging capabilities'
      ],
      technicalSpecs: {
        'Voltage': '110/400 V LL',
        'Current': '5 A / 1 A programmable',
        'Accuracy': 'V/I 0.2%, power 0.5%, kWh/kVARh Class 0.5s',
        'Harmonics': 'Up to 31st order, THD',
        'I/O': '4 DI, 2 relay outputs, 1 analog output',
        'Communication': 'RS485 Modbus RTU'
      },
      applications: [
        'Advanced energy monitoring',
        'Industrial automation',
        'Load control and management',
        'Energy billing and accounting',
        'Power quality analysis',
        'Building management systems'
      ],

    },
    digi730: {
      id: 'digi730',
      model: 'DiGi 730',
      subtitle: 'Premium Multi Function Meter',
      image: '/DiGi730S-D-01.png',
      images: [
        '/DiGi730S-D-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'Energy & Power',
      accuracy: 'Class 0.5s/0.2s',
      price: 'Contact for pricing',
      brochureUrl: '/DiGi730-S730-D.pdf',
      description: 'The DiGi 730 offers premium energy measurement with extended harmonics analysis and advanced I/O capabilities for demanding industrial and commercial applications.',
      keyFeatures: [
        'Accuracy Class 0.5s /class 0.2s as per IEC 62053-22',
        '3-line bright LCD display',
        'PT & CT programmable',
        '6 Digital inputs, 3DO & 1AO (730D)',
        'Tariff Energy Recording (6 rates)',
        'RS485 port with Modbus RTU protocol',
        'Baud rate up to 115,200 bps',
        'Individual Harmonics up to 51st order',
        'Advanced power quality analysis',
        'Comprehensive data logging'
      ],
      technicalSpecs: {
        'Voltage': '110/400 V LL',
        'Current': '5 A / 1 A programmable',
        'Accuracy': 'V/I 0.2%, power 0.5%, kWh Class 0.5s',
        'Harmonics': 'Up to 51st order, THD',
        'I/O': '6 DI, 1 pulse output, 3 relay outputs, 1 analog output',
        'Communication': 'RS485 Modbus RTU'

      },
      applications: [
        'Premium energy monitoring',
        'Industrial process control',
        'Multi-tariff energy billing',
        'Advanced power quality analysis',
        'Building automation systems',
        'Renewable energy monitoring'
      ],

    },
    digi760: {
      id: 'digi760',
      model: 'DiGi 760',
      subtitle: 'High Precision Meter',
      image: '/DiGi760-01.png',
      images: [
        '/DiGi760-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'Energy & Power Quality',
      accuracy: 'Class 0.2s',
      price: 'Contact for pricing',
      brochureUrl: '/DiGi760.pdf',
      description: 'The DiGi 760 features a TFT color display with real-time waveform visualization and advanced power quality monitoring capabilities for critical applications.',
      keyFeatures: [
        'Accuracy Class 0.2s as per IEC 62053-22',
        'TFT colorful LCD display with 320 x 240 resolution',
        'Real Time waveform Display',
        'Voltage swell/sag event recording with waveform',
        'Ethernet Port with Modbus TCP/IP protocol',
        'Individual harmonics on V & I up to 63rd order',
        'K-Factor, Crest Factor measurements',
        '4AO, 8DI (Optional)',
        'Advanced power quality analysis',
        'Event recording with timestamps'
      ],
      technicalSpecs: {
        'Voltage': 'Up to 480 V LL; PT primary programmable to 6900 V',
        'Current': '5 A nominal; CT primary programmable to 10,000 A',
        'Accuracy': 'Voltage/current 0.1%, power 0.2%, PF 0.2%, kWh Class 0.2s',
        'Harmonics': 'Up to 63rd order, THD',
        'Communication': 'RS485 & Ethernet Modbus TCP/IP',
        'Display': 'TFT color LCD',
        'Protection': 'IP52 front, IP30 case'

      },
      applications: [
        'High-precision energy monitoring',
        'Power quality analysis',
        'Industrial automation',
        'Critical facility monitoring',
        'Data center monitoring',
        'Laboratory applications'
      ],

    },
    digi820: {
      id: 'digi820',
      model: 'DiGi 820',
      subtitle: 'Class A Power Quality Analyzer',
      image: '/DiGi820-01-01.png',
      images: [
        '/DiGi820-01-01.png',
        '/DiGi820-02-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'Power Quality & Energy',
      accuracy: 'Class A/0.2s',
      price: 'Contact for pricing',
      brochureUrl: '/Digi820.pdf',
      description: 'The DiGi 820 is an IEC 61000-4-30 Class A power quality monitoring meter with advanced analysis capabilities and extensive data storage for professional applications.',
      keyFeatures: [
        'IEC 61000-4-30 Class A power quality monitoring meter',
        'Class 0.2s high accuracy energy measurement',
        'Sampling rate: 1024 samples/cycle',
        'Color LCD Display with resolution of 640 x 480',
        '8GB memory for data and event recording',
        'Records 256 PQ events along with waveform',
        'Captures 20μs Voltage transients',
        'Harmonics & Inter-harmonics up to 63rd order',
        'Advanced statistical analysis',
        'Comprehensive reporting capabilities'
      ],
      technicalSpecs: {
        'Voltage': '400 V LL nominal (L–N 230 V); PT primary programmable up to 110 kV',
        'Current': '5 A / 1 A programmable',
        'Accuracy': 'V/I ±0.1%, kW/kVA ±0.2%, kWh Class 0.2s',
        'Harmonics': 'Up to 63rd order, interharmonics, flicker',
        'Transient capture': '20 µs, 1024 samples/cycle',
        'Memory': '8 GB, 1024 events',
        'Communication': 'RS485 (2 ports) Modbus RTU, Ethernet Modbus TCP/IP (IEC61850 optional)',
        'I/O': '8 DI, 4 relay outputs, 2 DO',
        'Protection': 'IP52 front, IP30 case'


      },
      applications: [
        'Power quality monitoring',
        'Utility grid analysis',
        'Industrial power systems',
        'Critical infrastructure monitoring',
        'Renewable energy integration',
        'Compliance monitoring'
      ],

    },
    multy4: {
      id: 'multy4',
      model: 'Multy4',
      subtitle: 'Multi-Channel Meter',
      image: '/Multy4-01.JPG',
      images: [
        '/Multy4-01.JPG',
        '/Multy4-02.JPG'
      ],
      voltage: 'CAT III 500V',
      measurement: '4 Channel Monitoring',
      accuracy: 'Class 1.0',
      price: 'Contact for pricing',
      brochureUrl: '/Multy4.pdf',
      description: 'The Multy4 provides multi-channel energy monitoring with special high-accuracy CT for comprehensive monitoring of multiple circuits in a single compact unit.',
      keyFeatures: [
        'Backlit custom LCD display',
        'Accuracy Class 1.0 as per IEC 62053-21',
        'CT primary programmable with 2kV isolation',
        'Special high-accuracy CT supplied',
        'RS485-modbus RTU Protocol',
        'Load management module',
        'Password protection',
        'Compact design',
        'Multi-circuit capability',
        'Cost-effective monitoring solution'
      ],
      technicalSpecs: {
        'Voltage': 'Up to 500 V',
        'Current': 'Via special high-accuracy CTs (100 A / 200 A / 400 A)',
        'Accuracy': 'Voltage & current 0.5%, kW/kVA 1%, kVAr 2%, PF 1%, kWh Class 1.0',
        'Frequency': '0.01% accuracy',
        'Features': 'Per-channel measurement, load management module, RS485 Modbus RTU',
        'Protection': 'IP52 front, IP20 case'

      },
      applications: [
        'Multi-circuit monitoring',
        'Industrial energy management',
        'Building automation',
        'Load distribution monitoring',
        'Energy billing',
        'Power management systems'
      ],

    },
    plmr90: {
      id: 'plmr90',
      model: 'PLM R90',
      subtitle: 'DC Energy Meter',
      image: '/PLm_R90-removebg-preview-01.png',
      images: [
        '/PLm_R90-removebg-preview-01.png'
      ],
      voltage: 'DC Applications',
      measurement: '1Φ DC Energy',
      accuracy: 'Class 0.5',
      price: 'Contact for pricing',
      brochureUrl: '/PLMR90.pdf',
      description: 'The PLM R90 is designed for DC energy measurement with DIN rail mounting for easy installation in DC power systems and renewable energy applications.',
      keyFeatures: [
        '35mm DIN rail installing',
        'Accuracy: Class 0.5',
        'LED indicates pulse output',
        'RS485 port (Optional)',
        '2 module size',
        'Shunt options: 100A, 200A, 300A',
        'Compact design',
        'Easy installation',
        'DC measurement capability',
        'Solar application ready'
      ],
      technicalSpecs: {
        'Voltage': '0–1000 VDC',
        'Current': '100 A / 200 A / 300 A via 75 mV shunt',
        'Accuracy': 'Class 0.2',
        'Communication': 'RS485, Modbus RTU or DL/T645',
        'Pulse output': '100 impulse/kWh',
        'Display': 'LED with pulse indication',
        'Protection': 'IP20'

      },
      applications: [
        'DC power systems',
        'Solar energy monitoring',
        'Battery monitoring',
        'DC motor applications',
        'Renewable energy systems',
        'Industrial DC applications'
      ],

    },
    plmr91: {
      id: 'plmr91',
      model: 'PLM R91',
      subtitle: 'AC Energy Meter',
      image: '/R_91-removebg-preview-01-01.png',
      images: [
        '/R_91-removebg-preview-01-01.png'
      ],
      voltage: 'Single Phase AC',
      measurement: '1Φ AC Energy',
      accuracy: 'Class 1.0',
      price: 'Contact for pricing',
      brochureUrl: '/PLM-R91-01.pdf',
      description: 'The PLM R91 provides single-phase AC energy measurement with DIN rail mounting for residential and light commercial applications with reliable performance.',
      keyFeatures: [
        '35mm DIN rail installation',
        'Active energy accuracy Class 1.0',
        '6+1 digit LCD display',
        'Passive pulse output',
        'RS485 port (optional)',
        'LED pulse indicator',
        'Max current 63A',
        'Compact design',
        'Easy installation',
        'Cost-effective solution'
      ],
      technicalSpecs: {
        'Voltage': '110–240 V ph-N',
        'Current': 'Direct 5(63) A',
        'Accuracy': 'kWh Class 1.0',
        'Frequency': '50/60 Hz',
        'Display': '6+1 digit LCD',
        'Communication': 'RS485, Modbus RTU or DL/T645',
        'Features': 'Pulse output, password protection'

      },
      applications: [
        'Residential energy monitoring',
        'Small commercial applications',
        'Sub-metering',
        'Energy billing',
        'Load monitoring',
        'Building management'
      ],

    },
    plmr93: {
      id: 'plmr93',
      model: 'PLM R93',
      subtitle: '3-Phase Energy Meter',
      image: '/PLM93-01-01-01.png',
      images: [
        '/PLM93-01-01-01.png'
      ],
      voltage: 'Three Phase AC',
      measurement: '3Φ AC Energy',
      accuracy: 'Class 1.0',
      price: 'Contact for pricing',
      brochureUrl: '/PLM-R93.pdf',
      description: 'The PLM R93 offers comprehensive three-phase energy measurement with advanced features and historical data recording for industrial and commercial applications.',
      keyFeatures: [
        '35mm DIN rail installation',
        'kWh Class 1.0 as per IEC 62053-21',
        '7+1 digit LCD display',
        'Phase sequence error indication',
        'RS485 port with Modbus-RTU protocol',
        '2 LED Pulse indicators',
        'Multi-tariff capability',
        'Historical data storage',
        'Bidirectional measurement',
        'Comprehensive three-phase monitoring'
      ],
      technicalSpecs: {
        'Voltage': '184–276 V (L–N), AC 230 V ph-N / 400 V ph-ph',
        'Current': 'Direct 5(63) A',
        'Accuracy': 'Voltage & active power 0.2%, PF 0.5%, Class 1 kWh (IEC 62053-21)',
        'Frequency': '47–65 Hz',
        'Energy': 'Active class 1, reactive class 2',
        'Display': '7+1 digit LCD',
        'Comms': 'RS485 Modbus RTU',
        'Features': 'Historical daily/monthly/annual energy data storage'

      },
      applications: [
        'Three-phase energy monitoring',
        'Industrial applications',
        'Commercial buildings',
        'Multi-tariff billing',
        'Load management',
        'Energy analysis'
      ],

    },
    eon40: {
      id: 'eon40',
      model: 'EON 4.0',
      subtitle: 'Advanced Energy Meter',
      image: '/EON-meter-02-01.png',
      images: [
        '/EON-meter-02-01.png',
        '/EON-meter-03-01.png'
      ],
      voltage: 'CAT III 480V',
      measurement: 'IoT Energy Monitoring',
      accuracy: 'Class 0.5',
      price: 'Contact for pricing',
      brochureUrl: '/EON.pdf',
      description: 'The EON 4.0 series provides advanced energy measurement with IoT connectivity options for modern energy management systems and smart grid applications.',
      keyFeatures: [
        'Active energy accuracy up to Class 0.5',
        'PT/CT programmable',
        'Auto Phase sequence adjustment',
        '2 DI Standard, 2 DO (optional)',
        'Multiple communication options',
        'Gateway function (4.0G & 4.0E)',
        'Built-in memory for data storage',
        'Remote configuration capability',
        'IoT connectivity',
        'Cloud integration ready'
      ],
      technicalSpecs: {
        'TRMS AC Voltage': '10–500 V, 0.2% accuracy; up to 1000 kV primary ratio',
        'TRMS AC Current': '5 mA–6.5 A, 0.2% accuracy; up to 100,000 A primary ratio',
        'Frequency': '40–70 Hz, 0.1%',
        'Power values': 'kW, kVAr, kVA, PF, phase angle',
        'Energy': 'kWh, kVArh, kVAh (active class 0.5%, reactive class 2%)',
        'Harmonics': 'Up to 63rd order',
        'Residual current': '0–8000 mA',
        'Temperature': '0–150°C',
        'Communication': '4G / RS485 / LAN, Modbus RTU & TCP'

      },
      applications: [
        'IoT energy monitoring',
        'Smart grid applications',
        'Remote monitoring',
        'Building automation',
        'Industrial IoT',
        'Energy management systems'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'digi530': {
      title: "KRYKARD DiGi530 | Multi-Functional Meters",
      description: "KRYKARD DiGi 530 - Standard Multi Function Meter with Class 0.5s Accuracy — multi‑function energy meter providing accurate electrical parameter.",
      keywords: "digi530, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "digi530"
    },
    'digi630': {
      title: "KRYKARD DiGi630 | Multi-Functional Meters",
      description: "KRYKARD DiGi 630 - Advanced Multi Function Meter with Class 0.5s/0.2s Accuracy — multi‑function energy meter providing accurate electrical parameter.",
      keywords: "digi630, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "digi630"
    },
    'digi730': {
      title: "KRYKARD DiGi730 | Multi-Functional Meters",
      description: "KRYKARD DiGi 730 - Premium Multi Function Meter with Class 0.5s/0.2s Accuracy — multi‑function energy meter providing accurate electrical parameter.",
      keywords: "digi730, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "digi730"
    },
    'digi760': {
      title: "KRYKARD DiGi760 | Multi-Functional Meters",
      description: "KRYKARD DiGi 760 - High Precision Meter with Class 0.2s and TFT Display — professional‑grade electrical measurement for industrial applications.",
      keywords: "digi760, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "digi760"
    },
    'digi820': {
      title: "KRYKARD DiGi820 | Multi-Functional Meters",
      description: "KRYKARD DiGi 820 - Class A Power Quality Analyzer for Advanced Monitoring — power quality analyzer providing voltage, current, harmonic and energy.",
      keywords: "digi820, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "digi820"
    },
    'multy4': {
      title: "KRYKARD MULTY4 | Multi-Functional Meters",
      description: "KRYKARD Multy4 - Multi-Channel Meter for 4 Channel Monitoring — professional‑grade electrical measurement for industrial applications.",
      keywords: "multy4, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "multy4"
    },
    'plmr90': {
      title: "KRYKARD PLMR90 | Multi-Functional Meters",
      description: "KRYKARD PLM R90 - DC Energy Meter for Single Phase DC Applications — energy meter designed for accurate AC/DC electrical energy measurement.",
      keywords: "plmr90, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "plmr90"
    },
    'plmr91': {
      title: "KRYKARD PLMR91 | Multi-Functional Meters",
      description: "KRYKARD PLM R91 - AC Energy Meter for Single Phase AC Applications — energy meter designed for accurate AC/DC electrical energy measurement.",
      keywords: "plmr91, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "plmr91"
    },
    'plmr93': {
      title: "KRYKARD PLMR93 | Multi-Functional Meters",
      description: "KRYKARD PLM R93 - 3-Phase Energy Meter for Three Phase AC Applications — energy meter designed for accurate AC/DC electrical energy measurement.",
      keywords: "plmr93, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "plmr93"
    },
    'eon40': {
      title: "KRYKARD EON40 | Multi-Functional Meters",
      description: "KRYKARD EON 4.0 advanced energy meter with Class 0.5 accuracy and IoT connectivity delivers precise AC/DC electrical energy measurement.",
      keywords: "eon40, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "eon40"
    }
  };

  // Generate product-specific SEO content for selected products
  const getSeoContent = (productId: string | undefined) => {
    if (!productId || !productData[productId as keyof typeof productData]) {
      return null;
    }

    const product = productData[productId as keyof typeof productData];
    const model = product.model;
    const subtitle = product.subtitle;
    const accuracy = product.accuracy;
    const measurement = product.measurement;
    const voltage = product.voltage;

    // Product-specific content based on model
    const contentMap: Record<string, { intro: string; features: string; technical: string; why: string }> = {
      'eon40': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents advanced IoT-enabled energy measurement technology, combining high accuracy with modern connectivity options for smart grid applications and comprehensive energy management systems.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require advanced energy measurement with IoT connectivity in IoT energy monitoring, smart grid applications, remote monitoring, building automation, industrial IoT, and energy management systems. With active energy accuracy up to ${accuracy}, PT/CT programmable capability, and auto phase sequence adjustment, this energy meter delivers precise measurements for comprehensive monitoring. The advanced design with multiple communication options including 4G, RS485, and LAN, gateway function for 4.0G and 4.0E models, built-in memory for data storage, and remote configuration capability makes it ideal for modern energy management applications. IoT connectivity and cloud integration readiness enable seamless integration with smart energy management platforms.`,
        technical: `The ${model} energy meter offers exceptional performance with TRMS AC voltage measurement from 10–500 V with 0.2% accuracy (up to 1000 kV primary ratio) and TRMS AC current measurement from 5 mA–6.5 A with 0.2% accuracy (up to 100,000 A primary ratio). Frequency measurement from 40–70 Hz with 0.1% accuracy ensures reliable monitoring across various power systems. The meter provides comprehensive power values including kW, kVAr, kVA, PF, and phase angle, with energy measurement offering kWh, kVArh, and kVAh (active class 0.5%, reactive class 2%). Harmonics analysis up to 63rd order, residual current measurement from 0–8000 mA, and temperature monitoring from 0–150°C provide comprehensive system analysis capabilities.`,
        why: `KRYKARD ${model} energy meter combines precision engineering with IoT connectivity, delivering advanced energy measurement in a modern package. With features like high accuracy (Class 0.5), PT/CT programmability, auto phase sequence adjustment, multiple communication options, gateway functionality, built-in memory, remote configuration, IoT connectivity, and cloud integration readiness, the ${model} is trusted by professionals across India for IoT energy monitoring, smart grid applications, remote monitoring, building automation, industrial IoT, and energy management systems. Whether you need to monitor energy consumption, analyze power quality, integrate with smart grids, or manage energy remotely, the ${model} provides the reliability and connectivity required for modern energy management applications.`
      },
      'digi760': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents high-precision energy measurement technology, combining exceptional accuracy with advanced visualization capabilities including TFT color display and real-time waveform analysis for critical applications requiring detailed power quality monitoring.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require high-precision energy monitoring in high-precision energy monitoring, power quality analysis, industrial automation, critical facility monitoring, data center monitoring, and laboratory applications. With ${accuracy} accuracy as per IEC 62053-22, TFT colorful LCD display with 320 x 240 resolution, and real-time waveform display, this meter delivers exceptional detail for precise diagnostics. The advanced design with voltage swell/sag event recording with waveform, Ethernet port with Modbus TCP/IP protocol, individual harmonics on voltage and current up to 63rd order, K-Factor and Crest Factor measurements, and advanced power quality analysis makes it ideal for comprehensive monitoring. Optional 4AO and 8DI capabilities provide enhanced control and monitoring functions.`,
        technical: `The ${model} meter offers exceptional performance with voltage measurement up to 480 V LL (PT primary programmable to 6900 V) and current measurement with 5 A nominal (CT primary programmable to 10,000 A). Accuracy specifications include voltage/current 0.1%, power 0.2%, PF 0.2%, and kWh Class 0.2s, ensuring reliable measurements for critical applications. Harmonics analysis up to 63rd order with THD measurement provides comprehensive power quality analysis. Communication options include RS485 and Ethernet Modbus TCP/IP, while the TFT color LCD display provides clear visualization. Protection rating of IP52 front and IP30 case ensures durability in industrial environments.`,
        why: `KRYKARD ${model} meter combines precision engineering with advanced visualization, delivering high-precision energy measurement in a professional package. With features like Class 0.2s accuracy, TFT color display, real-time waveform visualization, voltage swell/sag event recording, Ethernet connectivity, comprehensive harmonics analysis, K-Factor and Crest Factor measurements, and advanced power quality analysis, the ${model} is trusted by professionals across India for high-precision energy monitoring, power quality analysis, industrial automation, critical facility monitoring, data center monitoring, and laboratory applications. Whether you need to monitor energy consumption, analyze power quality events, visualize waveforms, or ensure compliance with power quality standards, the ${model} provides the reliability and precision required for critical applications.`
      },
      'digi730': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents premium energy measurement technology, combining high accuracy with extended harmonics analysis and advanced I/O capabilities for demanding industrial and commercial applications requiring comprehensive monitoring and control.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require premium energy monitoring in premium energy monitoring, industrial process control, multi-tariff energy billing, advanced power quality analysis, building automation systems, and renewable energy monitoring. With ${accuracy} accuracy as per IEC 62053-22, 3-line bright LCD display, PT & CT programmable capability, and 6 digital inputs with 3 DO and 1 AO (730D model), this meter delivers comprehensive monitoring and control. The advanced design with tariff energy recording for 6 rates, RS485 port with Modbus RTU protocol supporting baud rates up to 115,200 bps, individual harmonics up to 51st order, advanced power quality analysis, and comprehensive data logging makes it ideal for sophisticated energy management applications.`,
        technical: `The ${model} meter offers exceptional performance with voltage measurement of 110/400 V LL and current measurement with 5 A / 1 A programmable capability. Accuracy specifications include V/I 0.2%, power 0.5%, and kWh Class 0.5s, ensuring reliable measurements for industrial applications. Harmonics analysis up to 51st order with THD measurement provides comprehensive power quality analysis. I/O capabilities include 6 DI, 1 pulse output, 3 relay outputs, and 1 analog output, enabling comprehensive control and monitoring. Communication via RS485 Modbus RTU ensures seamless integration with building automation and energy management systems.`,
        why: `KRYKARD ${model} meter combines precision engineering with advanced features, delivering premium energy measurement in a professional package. With features like Class 0.5s/0.2s accuracy, extended harmonics analysis up to 51st order, tariff energy recording for 6 rates, advanced I/O capabilities, high-speed communication, comprehensive data logging, and advanced power quality analysis, the ${model} is trusted by professionals across India for premium energy monitoring, industrial process control, multi-tariff energy billing, advanced power quality analysis, building automation systems, and renewable energy monitoring. Whether you need to monitor energy consumption, implement multi-tariff billing, analyze power quality, or integrate with automation systems, the ${model} provides the reliability and features required for demanding applications.`
      },
      'plmr93': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents comprehensive three-phase energy measurement technology, combining reliable accuracy with advanced features including historical data recording and multi-tariff capability for industrial and commercial applications requiring detailed three-phase monitoring.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require three-phase energy monitoring in three-phase energy monitoring, industrial applications, commercial buildings, multi-tariff billing, load management, and energy analysis. With ${accuracy} as per IEC 62053-21, 35mm DIN rail installation, 7+1 digit LCD display, and phase sequence error indication, this meter delivers reliable three-phase measurement. The advanced design with RS485 port with Modbus-RTU protocol, 2 LED pulse indicators, multi-tariff capability, historical data storage, bidirectional measurement, and comprehensive three-phase monitoring makes it ideal for industrial and commercial energy management applications.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement from 184–276 V (L–N), AC 230 V ph-N / 400 V ph-ph and current measurement with direct 5(63) A capability. Accuracy specifications include voltage & active power 0.2%, PF 0.5%, and Class 1 kWh (IEC 62053-21), ensuring reliable measurements for three-phase applications. Frequency measurement from 47–65 Hz covers standard power system frequencies. Energy measurement provides active class 1 and reactive class 2 accuracy. The 7+1 digit LCD display provides clear visualization, while RS485 Modbus RTU communication ensures seamless integration. Historical daily/monthly/annual energy data storage capability enables comprehensive energy analysis.`,
        why: `KRYKARD ${model} meter combines precision engineering with three-phase capability, delivering comprehensive energy measurement in a compact package. With features like Class 1.0 accuracy, DIN rail installation, large LCD display, phase sequence error indication, Modbus RTU communication, multi-tariff capability, historical data storage, bidirectional measurement, and comprehensive three-phase monitoring, the ${model} is trusted by professionals across India for three-phase energy monitoring, industrial applications, commercial buildings, multi-tariff billing, load management, and energy analysis. Whether you need to monitor three-phase energy consumption, implement multi-tariff billing, analyze historical energy data, or manage industrial loads, the ${model} provides the reliability and features required for three-phase energy management applications.`
      },
      'digi630': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents advanced energy measurement technology, combining high accuracy with digital I/O capabilities and enhanced communication features for comprehensive monitoring and control applications requiring advanced functionality.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require advanced energy monitoring in advanced energy monitoring, industrial automation, load control and management, energy billing and accounting, power quality analysis, and building management systems. With ${accuracy} accuracy as per IEC 62053-22, 3-line bright LCD display, PT & CT programmable capability, and 4 DI with 2 DO (DiGi 630D model), this meter delivers comprehensive monitoring and control. The advanced design with screen shot recording for energy accounting, RS485 port with Modbus RTU protocol, Modbus custom table support, bi-directional energy measurement, advanced alarm and control functions, and data logging capabilities makes it ideal for sophisticated energy management applications.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement of 110/400 V LL and current measurement with 5 A / 1 A programmable capability. Accuracy specifications include V/I 0.2%, power 0.5%, and kWh/kVARh Class 0.5s, ensuring reliable measurements for industrial applications. Harmonics analysis up to 31st order with THD measurement provides comprehensive power quality analysis. I/O capabilities include 4 DI, 2 relay outputs, and 1 analog output, enabling comprehensive control and monitoring. Communication via RS485 Modbus RTU ensures seamless integration with automation and energy management systems.`,
        why: `KRYKARD ${model} meter combines precision engineering with advanced I/O capabilities, delivering reliable energy measurement in a professional package. With features like Class 0.5s/0.2s accuracy, digital I/O capabilities, screen shot recording, Modbus custom table support, bi-directional energy measurement, advanced alarm and control functions, and data logging capabilities, the ${model} is trusted by professionals across India for advanced energy monitoring, industrial automation, load control and management, energy billing and accounting, power quality analysis, and building management systems. Whether you need to monitor energy consumption, control loads, implement energy accounting, or integrate with automation systems, the ${model} provides the reliability and features required for advanced energy management applications.`
      },
      'multy4': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents innovative multi-channel energy monitoring technology, combining cost-effective design with special high-accuracy CTs for comprehensive monitoring of multiple circuits in a single compact unit, ideal for applications requiring multi-circuit energy management.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require multi-circuit monitoring in multi-circuit monitoring, industrial energy management, building automation, load distribution monitoring, energy billing, and power management systems. With backlit custom LCD display, ${accuracy} as per IEC 62053-21, CT primary programmable with 2kV isolation, and special high-accuracy CT supplied, this meter delivers reliable multi-channel measurement. The advanced design with RS485-modbus RTU protocol, load management module, password protection, compact design, multi-circuit capability, and cost-effective monitoring solution makes it ideal for applications requiring simultaneous monitoring of multiple circuits.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement up to 500 V and current measurement via special high-accuracy CTs (100 A / 200 A / 400 A options). Accuracy specifications include voltage & current 0.5%, kW/kVA 1%, kVAr 2%, PF 1%, and kWh Class 1.0, ensuring reliable measurements for multi-circuit applications. Frequency measurement with 0.01% accuracy ensures precise monitoring. Features include per-channel measurement capability, load management module, and RS485 Modbus RTU communication. Protection rating of IP52 front and IP20 case ensures durability in industrial environments.`,
        why: `KRYKARD ${model} meter combines precision engineering with multi-channel capability, delivering cost-effective energy measurement in a compact package. With features like Class 1.0 accuracy, special high-accuracy CTs, multi-circuit monitoring capability, load management module, Modbus RTU communication, password protection, compact design, and cost-effective solution, the ${model} is trusted by professionals across India for multi-circuit monitoring, industrial energy management, building automation, load distribution monitoring, energy billing, and power management systems. Whether you need to monitor multiple circuits simultaneously, manage load distribution, implement energy billing, or optimize power consumption across circuits, the ${model} provides the reliability and multi-channel capability required for comprehensive energy management applications.`
      },
      'digi530': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents reliable energy measurement technology, combining standard accuracy with essential features for industrial and panel applications requiring comprehensive monitoring solutions with cost-effective design.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require reliable energy monitoring in industrial energy monitoring, panel metering, load management, energy billing, power quality monitoring, and building automation. With ${accuracy} as per IEC 62053-22, 3-line bright LCD display, PT & CT programmable capability, and password protection for setup page, this meter delivers reliable measurement. The standard design with RS485 port with Modbus RTU protocol, THD & harmonics up to 31st order, load management feature, bi-directional energy measurement, compact 96mm x 96mm panel mount design, and wide operating temperature range makes it ideal for standard energy management applications.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement of 110/400 V LL and current measurement with 5 A / 1 A programmable capability. Accuracy specifications include V/I 0.2%, power 0.5%, and kWh/kVARh Class 0.5s, ensuring reliable measurements for industrial applications. Harmonics analysis up to 31st order provides basic power quality analysis. Communication via RS485 Modbus RTU ensures seamless integration with energy management systems. Pulse output with 1 channel provides standard energy pulse functionality.`,
        why: `KRYKARD ${model} meter combines precision engineering with standard features, delivering reliable energy measurement in a compact package. With features like Class 0.5s accuracy, PT & CT programmability, password protection, Modbus RTU communication, harmonics analysis, load management, bi-directional measurement, compact panel mount design, and wide operating temperature range, the ${model} is trusted by professionals across India for industrial energy monitoring, panel metering, load management, energy billing, power quality monitoring, and building automation. Whether you need to monitor energy consumption, implement load management, analyze basic power quality, or integrate with automation systems, the ${model} provides the reliability and essential features required for standard energy management applications.`
      },
      'plmr90': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents specialized DC energy measurement technology, combining reliable accuracy with DIN rail mounting for easy installation in DC power systems and renewable energy applications requiring precise DC energy monitoring.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require DC energy measurement in DC power systems, solar energy monitoring, battery monitoring, DC motor applications, renewable energy systems, and industrial DC applications. With 35mm DIN rail installing, ${accuracy} accuracy, LED pulse output indication, and optional RS485 port, this meter delivers reliable DC measurement. The specialized design with 2 module size, shunt options of 100A, 200A, and 300A, compact design, easy installation, DC measurement capability, and solar application readiness makes it ideal for DC power system monitoring and renewable energy applications.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement from 0–1000 VDC and current measurement via 75 mV shunt with options of 100 A / 200 A / 300 A. Accuracy specification of Class 0.2 ensures precise DC energy measurement. Communication options include RS485 with Modbus RTU or DL/T645 protocol, enabling seamless integration with energy management systems. Pulse output of 100 impulse/kWh provides standard energy pulse functionality. LED display with pulse indication provides clear visualization. Protection rating of IP20 ensures basic environmental protection.`,
        why: `KRYKARD ${model} meter combines precision engineering with DC measurement capability, delivering reliable DC energy measurement in a compact package. With features like Class 0.5 accuracy, DIN rail installation, multiple shunt options, LED pulse indication, optional RS485 communication, compact 2-module design, easy installation, DC measurement capability, and solar application readiness, the ${model} is trusted by professionals across India for DC power systems, solar energy monitoring, battery monitoring, DC motor applications, renewable energy systems, and industrial DC applications. Whether you need to monitor DC energy consumption, track solar generation, monitor battery systems, or measure DC motor energy, the ${model} provides the reliability and DC measurement capability required for DC energy management applications.`
      },
      'plmr91': {
        intro: `Multi-functional meters, also known as energy meters or power quality analyzers, are essential instruments for comprehensive electrical parameter measurement and energy monitoring in modern industrial and commercial applications. These sophisticated devices provide accurate measurement of voltage, current, power, energy, harmonics, and power quality parameters, enabling professionals to monitor, analyze, and optimize electrical systems effectively. The KRYKARD ${model} ${subtitle} represents reliable single-phase AC energy measurement technology, combining standard accuracy with DIN rail mounting for residential and light commercial applications requiring reliable single-phase energy monitoring.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require single-phase AC energy measurement in residential energy monitoring, small commercial applications, sub-metering, energy billing, load monitoring, and building management. With 35mm DIN rail installation, active energy accuracy ${accuracy}, 6+1 digit LCD display, and passive pulse output, this meter delivers reliable single-phase measurement. The standard design with optional RS485 port, LED pulse indicator, max current 63A, compact design, easy installation, and cost-effective solution makes it ideal for residential and light commercial energy management applications.`,
        technical: `The ${model} meter offers reliable performance with voltage measurement from 110–240 V ph-N and current measurement with direct 5(63) A capability. Accuracy specification of kWh Class 1.0 ensures reliable single-phase energy measurement. Frequency measurement supports both 50/60 Hz standard power system frequencies. The 6+1 digit LCD display provides clear visualization. Communication options include RS485 with Modbus RTU or DL/T645 protocol, enabling seamless integration with energy management systems. Features include pulse output and password protection for secure operation.`,
        why: `KRYKARD ${model} meter combines precision engineering with single-phase capability, delivering reliable energy measurement in a compact package. With features like Class 1.0 accuracy, DIN rail installation, large LCD display, pulse output, optional RS485 communication, LED pulse indicator, max current 63A, compact design, easy installation, and cost-effective solution, the ${model} is trusted by professionals across India for residential energy monitoring, small commercial applications, sub-metering, energy billing, load monitoring, and building management. Whether you need to monitor residential energy consumption, implement sub-metering, track energy billing, or manage building loads, the ${model} provides the reliability and single-phase measurement capability required for residential and light commercial energy management applications.`
      }
    };

    return contentMap[productId] || null;
  };

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const dropdown = document.getElementById('product-dropdown');
      if (dropdown && !dropdown.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!product) {
      navigate('/measure/multi-functional-meters');
    }
  }, [product, navigate]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `${product.model} - ${product.subtitle} | Multi-Functional Meters`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "multi functional meters, electrical testing, energy measurement",
    slug: product.id
  };

  // Prepare JSON-LD structured data for Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.model,
    "description": product.description || product.subtitle,
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

  // Feature icon logic
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data') || feature.toLowerCase().includes('recording')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('communication') || feature.toLowerCase().includes('rs485') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('modbus')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('power') || feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('supply')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('energy') || feature.toLowerCase().includes('bi-directional')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('accuracy') || feature.toLowerCase().includes('harmonics') || feature.toLowerCase().includes('tariff')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('protection') || feature.toLowerCase().includes('password') || feature.toLowerCase().includes('isolation')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('quality') || feature.toLowerCase().includes('monitoring') || feature.toLowerCase().includes('waveform')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/multi-functional-meters/product/${product.id}`}
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
                  Multi Function Meters
                </h2>
                <p className="text-xl text-black font-medium">
                  Advanced Energy Measurement Solutions
                </p>
              </div>
              {/* Responsive flex container for dropdown and back button */}
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-4 md:gap-0">
                {/* Dropdown first on mobile, right on desktop */}
                <div
                  className="order-1 md:order-2 w-full md:w-auto flex justify-center md:block"
                >
                  <div id="product-dropdown" className="relative w-full md:w-auto group">
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="bg-white border border-yellow-400 text-black font-bold py-3 px-6 rounded-xl shadow-md flex items-center space-x-2 w-full md:w-auto justify-center md:justify-start transition-colors duration-200 focus:outline-none hover:bg-yellow-50"
                      style={{ fontWeight: 700, fontSize: '1.25rem' }}
                      aria-expanded={dropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>{product.model}</span>
                      <ChevronDown className={`h-4 w-4 ml-2 transition-transform duration-200 ${dropdownOpen ? 'transform rotate-180' : ''}`} />
                    </button>
                    {dropdownOpen && (
                      <div className="absolute top-full left-0 right-0 md:right-auto md:w-80 mt-2 bg-white border border-yellow-400 rounded-xl shadow-lg z-50 max-h-80 overflow-y-auto">
                        {productList.map((prod) => (
                          <button
                            key={prod.id}
                            onClick={(e) => {
                              e.stopPropagation();
                              setDropdownOpen(false);
                              navigate(`/measure/multi-functional-meters/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/multi-functional-meters')}
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
                        <h4 className="font-semibold text-black mb-1">Accuracy</h4>
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
                      <button onClick={() => window.open(product.brochureUrl, '_blank')} className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90" style={{ backgroundColor: '#F5C842' }}>
                        <Download className="h-5 w-5" />
                        <span>View Brochure</span>
                      </button>
                    </div>
                  </motion.div>
                </div>
                {/* Image Carousel Right (on desktop) */}
                <div className="w-full md:w-1/2 flex items-center justify-center order-1 md:order-2 mb-6 md:mb-0">
                  <div className="w-full mx-auto flex items-center justify-center" style={{ minHeight: '400px', maxWidth: '500px' }}>
                    {product.images && product.images.length > 1 ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <Carousel
                          images={product.images}
                          className="w-full"
                          theme="yellow"
                        />
                      </div>
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={`KRYKARD ${product.model} - ${product.subtitle} Multi Function Meter`}
                          className="w-full h-auto object-contain mx-auto"
                          width={320}
                          height={240}
                          loading="eager"
                          decoding="async"
                          style={{
                            maxHeight: product.id.startsWith('plm') ? '400px' : '350px',
                            maxWidth: product.id.startsWith('plm') ? '400px' : '300px',
                            background: 'transparent'
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features and Applications Section - Side by Side */}
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
                          <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
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
                                  <span className="text-gray-800 font-medium leading-relaxed">{feature}</span>
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>

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
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-yellow-50 transition-colors duration-200"
                        >
                          <div className="w-2 h-2 bg-yellow-400 rounded-full flex-shrink-0"></div>
                          <span className="text-gray-700 font-medium">{application}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>

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
                <div className="px-8 pb-8">
                  <div className="space-y-7">
                    {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="flex items-start gap-4"
                      >
                        <div className="w-2 h-2 mt-2.5 bg-yellow-400 rounded-full flex-shrink-0"></div>
                        <div className="text-[16px] leading-relaxed">
                          <span className="font-semibold text-gray-800">{key}</span>
                          <span className="mx-2 text-gray-800">:</span>
                          <span className="text-gray-600" style={{ fontFamily: "'Open Sans', sans-serif" }}>{value}</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          {getSeoContent(productId) && (
            <section className="py-4 md:py-6 bg-white">
              <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <style>{`
                  .seo-details-multifunctional summary {
                    list-style: none;
                  }
                  .seo-details-multifunctional summary::-webkit-details-marker {
                    display: none;
                  }
                `}</style>

                <details className="seo-details-multifunctional group w-full">
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
                              Understanding Multi-Functional Meters
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.intro}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Applications and Benefits of the {currentProduct?.model} Multi-Functional Meter
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
                              Why Choose KRYKARD {currentProduct?.model} Multi-Functional Meter?
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
                  Our specialists provide comprehensive guidance on multi functional meter solutions
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

export default MultiFunctionalMeterProduct;