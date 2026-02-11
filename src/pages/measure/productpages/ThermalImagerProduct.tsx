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
  Gauge,
  Shield,
  BarChart,
  Camera,
  Eye,
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

const ThermalImagerProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);
  const [brochureDropdownOpen, setBrochureDropdownOpen] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'ma-250', model: 'MA 250', subtitle: 'Mobile Thermal Imager' },
    { id: 'tc-e050', model: 'TC E050', subtitle: 'Pocket Thermal Imager' },
    { id: 'tc-s030', model: 'TC S030', subtitle: 'Entry Level Thermal Imager' },
    { id: 'tc-s240', model: 'TC S240', subtitle: 'Touch Screen Imager' },
    { id: 'tc-2150', model: 'TC 2150', subtitle: 'Compact Thermal Imager' },
    { id: 'tc-2250', model: 'TC 2250', subtitle: 'Enhanced Compact Imager' },
    { id: 'tc-3151', model: 'TC 3151', subtitle: 'Professional Thermal Imager' },
    { id: 'tc-3250', model: 'TC 3250', subtitle: 'Manual Focus Imager' },
    { id: 'tc-3360', model: 'TC 3360', subtitle: 'Wide Field Imager' },
    { id: 'tc-3660', model: 'TC 3660', subtitle: 'Advanced Thermal Imager' },
    { id: 'tc-p360', model: 'TC P360', subtitle: 'Pistol Grip Imager' },
    { id: 'tc-4360', model: 'TC 4360', subtitle: 'High Resolution Imager' },
    { id: 'tc-4460', model: 'TC 4460 / TC 4460H', subtitle: 'Extended Range Imager' },
    { id: 'tc-4660', model: 'TC 4660 / TC 4660H', subtitle: 'High-End Thermal Imager' },
    { id: 'tcc-7460', model: 'TCC 7460 / TCC 742K', subtitle: 'Professional Camcorder' },
    { id: 'tcc-7660', model: 'TCC 7660 / TCC 762K', subtitle: 'High-Res Camcorder' },
    { id: 'tcc-812k', model: 'TCC 812K', subtitle: 'Ultra-High Res Camcorder' }
  ];

  // Complete product data with enhanced features and specs
  // Added brochure property for each product
  const productData = {
    'tc-s030': {
      id: 'tc-s030',
      model: 'TC S030',
      subtitle: 'Entry Level Thermal Imager',
      image: '/TC-S030-Overview-01.png',
      images: [
        '/TC-S030-Overview-01-01.png',
        '/TC-S030-Inside-01-01.png'
      ],
      irResolution: '240× 240',
      temperatureRange: '-20°C to 350°C',
      accuracy: '±2°C, ±2%',
      //price: 'Contact for pricing',
      description: 'Entry-level thermal imager with touch screen interface, perfect for basic thermal imaging applications with reliable performance and user-friendly operation.',
      keyFeatures: [
        'IR Resolution: 96 × 96 (9,216 pixels)',
        'SuperIR Resolution: Yes, on captured images & live view',
        'Temperature Range: -20°C to 350°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 50° × 50°',
        'NETD: < 50 mK',
        'Focus: Fixed Focus & minimum focus of 0.1m',
        'Image Frequency: 25 Hz',
        'Touch screen interface',
        'WiFi connectivity',
        'Built-in memory storage',
        'IP54 protection rating',
        'Portable design',
        'Easy operation'
      ],
      technicalSpecs: {
        'IR Resolution': '96 × 96',
        'SuperIR Resolution': 'Yes (captured & live view)',
        'Temperature Range': '-20°C to 350°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '50° × 50°',
        'NETD': '< 50 mK',
        'Focus': 'Fixed, minimum distance 0.1 m',
        'Image Frequency': '25 Hz',
        'Display': '320 × 240, 3.5" LCD touchscreen',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~4 hours (built-in)',
        'Memory': '4 GB (30,000 images, 20 hrs video)'

      },
      applications: [
        'Building inspection',
        'HVAC diagnostics',
        'Electrical maintenance',
        'Mechanical troubleshooting',
        'Energy audits',
        'Basic thermal analysis'
      ],

      brochure: '/thermalupdated/TCS030.pdf'
    },
    'tc-e050': {
      id: 'tc-e050',
      model: 'TC E050',
      subtitle: 'Pocket Thermal Imager',
      image: '/TCE050-overview-01-01.png',
      images: [
        '/TCE050-overview-01-01.png',
        '/TCE050-inside-01-01.png'
      ],
      irResolution: '96 × 96',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Pocket-sized thermal imager with extended battery life, designed for mobile professionals who need reliable thermal imaging in a compact form factor.',
      keyFeatures: [
        'IR Resolution: 96 × 96 (9,216 pixels)',
        'SuperIR Resolution: 240 × 240',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 50° × 50°',
        'NETD: < 50 mK',
        'Focus: Fixed & minimum distance of 0.1m',
        'Image Frequency: 25 Hz',
        'Extended battery life (8 hours)',
        'Laser pointer included',
        'Ultra-portable design',
        'Professional measurement accuracy',
        'Rugged construction',
        'Easy-to-use interface'
      ],
      technicalSpecs: {
        'IR Resolution': '96 × 96',
        'SuperIR Resolution': 'Yes (captured & live view)',
        'Temperature Range': '-20°C to 550°C',
        'Accuracy': '±2°C, ±2%',
        'Field of View (FOV)': '50° × 50°',
        'NETD': '< 50 mK',
        'Focus': 'Fixed, minimum distance 0.1 m',
        'Image Frequency': '25 Hz',
        'Display': '240 × 320, 2.4" LCD',
        'Image Modes': 'Thermal / Visual / Fusion',
        'Battery': '~8 hours (built-in)',
        'Memory': '4 GB (18,000 images)'

      },
      applications: [
        'Field service applications',
        'Electrical inspections',
        'Mechanical maintenance',
        'Building diagnostics',
        'Process monitoring',
        'Quality control'
      ],

      brochure: '/thermalupdated/TCE050.pdf'
    },
    'ma-250': {
      id: 'ma-250',
      model: 'MA 250',
      subtitle: 'Mobile Thermal Imager',
      image: '/MA250-01.png',
      images: [
        '/MA250-01.png'],
      irResolution: '256 × 192',
      temperatureRange: '-20°C to 400°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Smartphone attachment thermal imager for mobile applications, combining the power of thermal imaging with the convenience of your smartphone.',
      keyFeatures: [
        'IR Resolution: 256 × 192 (49,152 pixels)',
        'SuperIR Resolution: Yes, on captured images & live view',
        'Temperature Range: -20°C to 400°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 50° × 37.2°',
        'NETD: < 40 mK',
        'Focus: Fixed & minimum distance 0.2m',
        'Image Frequency: 50 Hz',
        'Smartphone integration',
        'Universal compatibility',
        'Instant sharing capabilities',
        'Cloud storage access',
        'Mobile app control',
        'Cost-effective solution'
      ],
      technicalSpecs: {
        'Focus': 'Fixed, minimum distance 0.2 m',
        'Image frequency': '50 Hz',
        'Image modes': 'Thermal / PIP',
        'Communication interface': 'USB-C (Android)'
      },
      applications: [
        'Mobile inspections',
        'Field service work',
        'Real estate inspections',
        'Home energy audits',
        'Educational applications',
        'Quick thermal checks'
      ],
      advantages: [
        'Smartphone integration',
        'Instant sharing capabilities',
        'Cost-effective solution',
        'High portability',
        'Easy data management',
        'Universal compatibility'
      ],
      brochure: '/thermalupdated/MA250.pdf'
    },
    'tc-s240': {
      id: 'tc-s240',
      model: 'TC S240',
      subtitle: 'Touch Screen Imager',
      image: '/TCS240-overview.png',
      images: [
        '/TCS240-overview-01-01.png',
        '/TCS240-inside-01-01.png'
      ],
      irResolution: '256 × 192',
      temperatureRange: '-20°C to 400°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Compact thermal imager with auto-rotation display and advanced touch screen interface for intuitive operation.',
      keyFeatures: [
        'IR Resolution: 256 × 192 (49,152 pixels)',
        'SuperIR Resolution: Yes, on captured images & live view',
        'Temperature Range: -20°C to 400°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 50° × 37.2°',
        'NETD: < 40 mK',
        'Focus: Fixed & minimum distance 0.3m',
        'Image Frequency: 25 Hz',
        'Auto-rotation display',
        'High-resolution visual camera',
        'Multiple connectivity options',
        'Professional reliability',
        'Extended memory storage',
        'Advanced measurement tools'
      ],
      technicalSpecs: {
        'IR Resolution': '256 × 192',
        'SuperIR Resolution': 'Yes (captured & live view)',
        'Temperature Range': '-20°C to 400°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '50° × 37.2°',
        'NETD': '< 40 mK',
        'Focus': 'Fixed, minimum distance 0.3 m',
        'Image Frequency': '25 Hz',
        'Display': '640 × 480, 3.5" LCD touchscreen (auto-rotation)',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~4 hours (built-in)',
        'Memory': '16 GB (60,000 images, 54 hrs video)'

      },
      applications: [
        'Professional inspections',
        'Building diagnostics',
        'Electrical maintenance',
        'Industrial applications',
        'Energy audits',
        'Quality assurance'
      ],

      brochure: '/thermalupdated/TCS240.pdf'
    },
    'tc-3151': {
      id: 'tc-3151',
      model: 'TC 3151',
      subtitle: 'Professional Thermal Imager',
      image: '/TCC-3150-overview-01.png',
      images: [
        '/TCC-3151-overview-01-01.png',
        '/TCC-3151-inside-01-01.png'
      ],
      irResolution: '192 × 144',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Professional thermal imager with micro SD storage and advanced measurement capabilities for demanding applications.',
      keyFeatures: [
        'IR Resolution: 192 × 144 (27,648 pixels)',
        'SuperIR Resolution: 384 × 288',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 37.2° × 27.8°',
        'NETD: < 40 mK',
        'Focus: Fixed & minimum distance 0.5m',
        'Image Frequency: 25 Hz',
        'Interchangeable battery system',
        'Professional durability (2m drop test)',
        'Comprehensive connectivity',
        'Advanced measurement tools',
        'High-resolution visual camera',
        'Professional reporting features'
      ],
      technicalSpecs: {
        'IR Resolution': '192 × 144',
        'SuperIR Resolution': '384 × 288',
        'Temperature Range': '-20°C to 550°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '37.2° × 27.8°',
        'NETD': '< 40 mK',
        'Focus': 'Fixed, minimum distance 0.5 m',
        'Image Frequency': '25 Hz',
        'Display': '640 × 480, 3.5" LCD touchscreen',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~6 hours (interchangeable)',
        'Memory': '32 GB Micro SD (60,000 images, 150 hrs video)'
      },
      applications: [
        'Industrial maintenance',
        'Professional inspections',
        'Research applications',
        'Quality control',
        'Predictive maintenance',
        'Advanced diagnostics'
      ],

      brochure: '/thermalupdated/TC3151.pdf'
    },
    'tc-3250': {
      id: 'tc-3250',
      model: 'TC 3250',
      subtitle: 'Manual Focus Imager',
      image: '/thermal-measurement/TC-3250.png',
      images: [
        '/thermal-measurement/TC-3250.png',
        '/thermal-measurement/TC-3250.png'
      ],
      irResolution: '256 × 192',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Professional thermal imager with manual focus capability, providing precise thermal imaging for detailed analysis.',
      keyFeatures: [
        'IR Resolution: 256 × 192 (49,152 pixels)',
        'SuperIR Resolution: 512 × 384',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 25° × 18.8°',
        'NETD: < 40 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 25 Hz',
        'Manual focus capability',
        'High SuperIR resolution',
        'Professional accuracy',
        'Rugged construction',
        'Advanced connectivity',
        'Precise measurements'
      ],
      technicalSpecs: {
        'IR Resolution': '256 × 192',
        'SuperIR Resolution': '512 × 384',
        'Temperature Range': '-20°C to 550°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '25° × 18.8°',
        'NETD': '< 40 mK',
        'Focus': 'Manual, minimum distance 0.1 m',
        'Image Frequency': '25 Hz',
        'Display': '640 × 480, 3.5" LCD touchscreen',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~6 hours (interchangeable)',
        'Memory': '32 GB Micro SD (60,000 images, 150 hrs video)'
      },
      applications: [
        'Precision measurements',
        'Detailed inspections',
        'Research and development',
        'Quality control',
        'Scientific applications',
        'Professional diagnostics'
      ],

      brochure: '/thermalupdated/TC3250.pdf'
    },
    'tc-3360': {
      id: 'tc-3360',
      model: 'TC 3360',
      subtitle: 'Wide Field Imager',
      image: '/TC-3360-overview-01.png',
      images: [
        '/TC-3360-overview-01-01.png',
        '/TC-3360-inside-01-01.png'
      ],
      irResolution: '384 × 288',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Wide field thermal imager with enhanced resolution, ideal for comprehensive thermal analysis and large area inspections.',
      keyFeatures: [
        'IR Resolution: 384 × 288 (110,592 pixels)',
        'SuperIR Resolution: 768 × 576',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): Wide angle coverage',
        'NETD: < 40 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 25 Hz',
        'High resolution imaging',
        'Wide field of view',
        'Professional features',
        'Durable construction',
        'Advanced analysis tools',
        'Comprehensive documentation'
      ],
      technicalSpecs: {
        'IR Resolution': '384 × 288',
        'SuperIR Resolution': '768 × 576',
        'Temperature Range': '-20°C to 650°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '41.1° × 30.5°',
        'NETD': '< 30 mK',
        'Focus': 'Manual, minimum distance 0.1 m',
        'Image Frequency': '30 Hz',
        'Display': '640 × 480, 3.5" LCD touchscreen',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '64 GB Micro SD (100,000 images, 300 hrs video)'
      },
      applications: [
        'Large area inspections',
        'Building surveys',
        'Industrial monitoring',
        'Solar panel inspections',
        'Electrical distribution',
        'Facility management'
      ],

      brochure: '/thermalupdated/TC3360.pdf'
    },
    'tc-2150': {
      id: 'tc-2150',
      model: 'TC 2150',
      subtitle: 'Compact Thermal Imager',
      image: '/TC2150-overview-01-01.png',
      images: [
        '/TC2150-overview-01-01.png',
        '/TC2150-inside-01-01.png'
      ],
      irResolution: '192 × 144',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Compact thermal imager with WiFi connectivity, offering excellent thermal imaging capabilities in a portable design.',
      keyFeatures: [
        'IR Resolution: 192 × 144 (27,648 pixels)',
        'SuperIR Resolution: Yes, on captured images & live view',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 27.8° × 37.2°',
        'NETD: < 40 mK',
        'Focus: Fixed & minimum distance 0.3m',
        'Image Frequency: 25 Hz',
        'Image Modes: Thermal/Visual/Fusion/PIP',
        'Visual Camera: 1600 x 1200 (2 MP)',
        'Display: 240 x 320 Resolution, 3.2" LCD screen',
        'Battery Backup: Approximately 6 hours (Built-in)',
        'Memory: Built-in 16 GB (90,000 Images)',
        'WiFi connectivity',
        'Compact and lightweight design'
      ],
      technicalSpecs: {
        'IR Resolution': '256 × 192',
        'SuperIR Resolution': 'Yes (captured & live view)',
        'Temperature Range': '-20°C to 550°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '37.2° × 50.0°',
        'NETD': '< 40 mK',
        'Focus': 'Fixed, minimum distance 0.3 m',
        'Image Frequency': '25 Hz',
        'Display': '240 × 320, 3.2" LCD',
        'Image Modes': 'Thermal / Visual / Fusion / PIP',
        'Battery': '~6 hours (built-in)',
        'Memory': '16 GB (90,000 images)'
      },
      applications: [
        'Building inspections',
        'Electrical maintenance',
        'HVAC diagnostics',
        'Mechanical troubleshooting',
        'Energy audits',
        'Preventive maintenance'
      ],

      brochure: '/thermalupdated/TC2150.pdf'
    },
    'tc-2250': {
      id: 'tc-2250',
      model: 'TC 2250',
      subtitle: 'Enhanced Compact Imager',
      image: '/TC-2250-01.png',
      images: [
        '/TC-2250-01.png',
        '/TC2250-inside-01-01.png'
      ],
      irResolution: '256 × 192',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Enhanced compact thermal imager with higher resolution and WiFi connectivity, providing professional-grade thermal imaging in a portable package.',
      keyFeatures: [
        'IR Resolution: 256 × 192 (49,152 pixels)',
        'SuperIR Resolution: Yes, on captured images & live view',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Field of View (FOV): 37.2° × 50.0°',
        'NETD: < 40 mK',
        'Focus: Fixed & minimum distance 0.3m',
        'Image Frequency: 25 Hz',
        'Image Modes: Thermal/Visual/Fusion/PIP',
        'Visual Camera: 1600 x 1200 (2 MP)',
        'Display: 480 x 640 Resolution, 3.2" LCD screen',
        'Battery Backup: Approximately 6 hours (Built-in)',
        'Memory: Built-in 16 GB (35,000 Images)',
        'WiFi connectivity',
        'Enhanced resolution for detailed imaging'
      ],
      technicalSpecs: {
        'IR Resolution': '192 × 144',
        'SuperIR Resolution': '384 × 288',
        'Temperature Range': '-20°C to 550°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '37.2° × 27.8°',
        'NETD': '< 40 mK',
        'Focus': 'Fixed, minimum distance 0.5 m',
        'Image Frequency': '25 Hz',
        'Display': '480 × 640, 3.2" LCD',
        'Image Modes': 'Thermal / Visual / Fusion / PIP',
        'Battery': '~6 hours (built-in)',
        'Memory': '16 GB (35,000 images)'
      },
      applications: [
        'Professional inspections',
        'Building diagnostics',
        'Electrical maintenance',
        'HVAC troubleshooting',
        'Energy audits',
        'Preventive maintenance'
      ],

      brochure: '/thermalupdated/TC2250.pdf'
    },
    'tc-p360': {
      id: 'tc-p360',
      model: 'TC P360',
      subtitle: 'Pistol Grip Imager',
      image: '/TCP-360-overview-01.png',
      images: [
        '/TCP-360-overview-01-01.png',
        '/TCP-360-inside-01-01.png'
      ],
      irResolution: '384 × 288',
      temperatureRange: '-20°C to 550°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Pistol grip thermal imager designed for comfortable operation during extended use, featuring high resolution and ergonomic design.',
      keyFeatures: [
        'IR Resolution: 384 × 288 (110,592 pixels)',
        'SuperIR Resolution: 768 × 576',
        'Temperature Range: -20°C to 550°C',
        'Accuracy: ±2°C, ±2%',
        'Ergonomic pistol grip design',
        'NETD: < 40 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 25 Hz',
        'Comfortable grip for extended use',
        'High resolution thermal imaging',
        'Professional durability',
        'User-friendly interface',
        'Extended operation capability',
        'Professional measurement tools'
      ],
      technicalSpecs: {
        'IR Resolution': '384 × 288',
        'SuperIR Resolution': '768 × 576',
        'Temperature Range': '-20°C to 650°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '24° × 18° (optional lens available)',
        'NETD': '≤ 50 mK',
        'Focus': 'Auto/Motorized, minimum distance 0.15 m',
        'Image Frequency': '50 Hz',
        'Display': '640 × 480, 3.5" capacitive touchscreen',
        'Image Modes': 'IR / CCD / Duo Vision / Duo Vision Plus',
        'Battery': '~8 hours (built-in)',
        'Memory': '16 GB TF card (65,000+ images)'
      },
      applications: [
        'Extended inspections',
        'Industrial maintenance',
        'Electrical troubleshooting',
        'Mechanical diagnostics',
        'Building inspections',
        'Field service work'
      ],
      brochure: '/thermalupdated/TCP360.pdf'
    },
    'tc-4360': {
      id: 'tc-4360',
      model: 'TC 4360',
      subtitle: 'High Resolution Imager',
      image: '/TC4360-overview-01.png',
      images: [
        '/TC4360-overview-01-01.png',
        '/TC4360-inside-01-01.png'
      ],
      irResolution: '384 × 288',
      temperatureRange: '-20°C to 650°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'High resolution thermal imager with advanced features for professional applications requiring superior image quality.',
      keyFeatures: [
        'IR Resolution: 384 × 288 (110,592 pixels)',
        'SuperIR Resolution: 768 × 576',
        'Temperature Range: -20°C to 650°C',
        'Accuracy: ±2°C, ±2%',
        'Advanced measurement tools',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 50 Hz',
        'High thermal sensitivity',
        'Professional accuracy',
        'Extended battery life',
        'Rugged construction',
        'Comprehensive connectivity',
        'Advanced analysis capabilities'
      ],
      technicalSpecs: {
        'IR Resolution': '384 × 288',
        'SuperIR Resolution': '768 × 576',
        'Temperature Range': '-20°C to 650°C',
        'Accuracy': '±1°C, ±1%',
        'FOV': '25° × 19° (optional lens available)',
        'NETD': '< 35 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF, min. 0.1 m',
        'Image Frequency': '50 Hz',
        'Display': '800 × 480, 4.3" LCD touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '64 GB Micro SD (60,000 images, 54 hrs video)'
      },
      applications: [
        'Professional inspections',
        'Industrial diagnostics',
        'Research applications',
        'Quality assurance',
        'Predictive maintenance',
        'Advanced thermal analysis'
      ],

      brochure: '/thermalupdated/TC4360.pdf'
    },
    'tc-4460': {
      id: 'tc-4460',
      model: 'TC 4460 / TC 4460H',
      subtitle: 'Extended Range Imager',
      image: '/TC4460-overview-01.png',
      images: [
        '/TC4460-overview-01-01.png',
        '/TC4460-insde-01-01-01.png'
      ],
      irResolution: '480 × 360',
      temperatureRange: '-20°C to 1200°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Extended range thermal imager with superior resolution and temperature range for demanding industrial applications.',
      keyFeatures: [
        'IR Resolution: 480 × 360 (172,800 pixels)',
        'SuperIR Resolution: 960 × 720',
        'Temperature Range: -20°C to 1200°C',
        'Accuracy: ±2°C, ±2%',
        'Extended temperature range',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 50 Hz',
        'High-temperature capability',
        'Superior thermal sensitivity',
        'Industrial-grade reliability',
        'Advanced analysis capabilities',
        'Professional durability',
        'Extended measurement range'
      ],
      technicalSpecs: {
        'IR Resolution': '480 × 360',
        'SuperIR Resolution': '960 × 720',
        'Temperature Range': '-20°C to 650°C (TC 4460), -20°C to 2000°C (TC 4460H)',
        'Accuracy': '±2°C, ±2%',
        'FOV': '18.7° × 14° (optional lens available)',
        'NETD': '< 35 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF, min. 0.25 m',
        'Image Frequency': '50 Hz',
        'Display': '800 × 480, 4.3" LCD touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '64 GB Micro SD (60,000 images, 54 hrs video)'
      },
      applications: [
        'High-temperature processes',
        'Industrial furnaces',
        'Metal processing',
        'Glass manufacturing',
        'Petrochemical industry',
        'Power generation'
      ],

      brochures: [
        { name: 'TC-4460 Brochure', url: '/thermalupdated/TC-4460.pdf' },
        { name: 'TC-4460H Brochure', url: '/thermalupdated/TC-4460H.pdf' }
      ]
    },
    'tc-3660': {
      id: 'tc-3660',
      model: 'TC 3660',
      subtitle: 'Advanced Thermal Imager',
      image: '/Overview-image-3660-01.png',
      images: [
        '/Overview-image-3660-01-01.png',
        '/TC3660-inside-01-01.png'
      ],
      irResolution: '640 × 480',
      temperatureRange: '-20°C to 650°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Advanced thermal imager with ultra-high resolution for the most demanding professional applications.',
      keyFeatures: [
        'IR Resolution: 640 × 480 (307,200 pixels)',
        'SuperIR Resolution: 1280 × 960',
        'Temperature Range: -20°C to 650°C',
        'Accuracy: ±2°C, ±2%',
        'Ultra-high resolution',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 50 Hz',
        'Superior image quality',
        'Professional accuracy',
        'Advanced features',
        'Exceptional detail',
        'Research-grade performance',
        'Premium thermal imaging'
      ],
      technicalSpecs: {
        'IR Resolution': '640 × 480',
        'SuperIR Resolution': '1280 × 960',
        'Temperature Range': '-20°C to 650°C',
        'Accuracy': '±2°C, ±2%',
        'FOV': '41.9° × 33.3°',
        'NETD': '< 35 mK',
        'Focus': 'Manual, minimum distance 0.3 m',
        'Image Frequency': '30 Hz',
        'Display': '640 × 480, 3.5" LCD touchscreen',
        'Image Modes': 'Thermal / Visual / Fusion / PIP / Blending',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '64 GB Micro SD (100,000 images, 300 hrs video)'
      },
      applications: [
        'Professional R&D',
        'Advanced diagnostics',
        'Precision measurements',
        'Quality control',
        'Scientific research',
        'High-end inspections'
      ],

      brochure: '/thermalupdated/TC3660.pdf'
    },
    'tc-4660': {
      id: 'tc-4660',
      model: 'TC 4660 / TC 4660H',
      subtitle: 'High-End Thermal Imager',
      image: '/TC-4660-overview-01.png',
      images: [
        '/TC-4660-overview-01-01.png',
        //'/TC-4660h-inside-01-01.png',
        '/TC-4660-inside-02-01-01.png'
      ],
      irResolution: '640 × 480',
      temperatureRange: '-20°C to 1200°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'High-end thermal imager with maximum resolution and extended temperature range for the most demanding professional applications.',
      keyFeatures: [
        'IR Resolution: 640 × 480 (307,200 pixels)',
        'SuperIR Resolution: 1280 × 960',
        'Temperature Range: -20°C to 1200°C',
        'Accuracy: ±2°C, ±2%',
        'Maximum performance',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Image Frequency: 50 Hz',
        'Maximum resolution capability',
        'Extended temperature range',
        'Professional-grade accuracy',
        'Advanced measurement tools',
        'Superior performance',
        'Industry-leading features'
      ],
      technicalSpecs: {
        'IR Resolution': '640 × 480',
        'SuperIR Resolution': '1280 × 960',
        'Temperature Range': '-20°C to 650°C (TC 4660), -20°C to 2000°C (TC 4660H)',
        'Accuracy': '±2°C, ±2%',
        'FOV': '25° × 19° (optional lens available)',
        'NETD': '< 35 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF, min. 0.25 m',
        'Image Frequency': '50 Hz',
        'Display': '800 × 480, 4.3" LCD touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '64 GB Micro SD (60,000 images, 54 hrs video)'
      },
      applications: [
        'High-temperature industrial processes',
        'Advanced research',
        'Precision diagnostics',
        'Quality control',
        'Scientific applications',
        'Professional inspections'
      ],

      brochures: [
        { name: 'TC-4660 Brochure', url: '/thermalupdated/TC4660.pdf' },
        { name: 'TC-4660H Brochure', url: '/thermalupdated/TC4660H.pdf' }
      ]
    },
    'tcc-7460': {
      id: 'tcc-7460',
      model: 'TCC 7460 / TCC 742K',
      subtitle: 'Professional Camcorder',
      image: '/TC-7460-overview-01.png',
      images: [
        '/TC-7460-overview-01-01.png',
        '/TC-742k-inside-01-01-01.png',
        '/TC-7460-inside-02-01-01.png'
      ],
      irResolution: '480 × 360',
      temperatureRange: '-20°C to 1200°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Professional thermal camcorder with video recording capabilities for comprehensive thermal documentation and analysis.',
      keyFeatures: [
        'IR Resolution: 480 × 360 (172,800 pixels)',
        'Video recording capability',
        'Temperature Range: -20°C to 1200°C',
        'Accuracy: ±2°C, ±2%',
        'Professional camcorder design',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Video Frame Rate: 50 Hz',
        'Full thermal video recording',
        'Professional documentation',
        'Extended storage capacity',
        'HDMI output capability',
        'Training applications',
        'Comprehensive analysis tools'
      ],
      technicalSpecs: {
        'IR Resolution': '480 × 360',
        'SuperIR Resolution': '960 × 720',
        'Temperature Range': '-20°C to 650°C (TCC 7460), -40°C to 2200°C (TCC 742K)',
        'Accuracy': '±1°C, ±1%',
        'FOV': 'Multiple lenses – L6: 6° × 4.5°, L9: 9° × 6.8°, L19: 18.7° × 14°, L37: 37.3° × 27.8°',
        'NETD': '< 30 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF',
        'Min Focus': 'L6 – 2 m, L9 – 1 m, L19 – 0.15 m, L37 – 0.15 m',
        'Image Frequency': '30 Hz',
        'Display': '1280 × 720, 5" LCD touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '128 GB SD card (120,000 images, 500 hrs video)'
      },
      applications: [
        'Process monitoring',
        'Training and education',
        'Documentation',
        'Research applications',
        'Quality assurance',
        'Professional reporting'
      ],

      brochures: [
        { name: 'TCC-7460 Brochure', url: '/thermalupdated/TCC-7460-(SP40).pdf' },
        { name: 'TCC-742K Brochure', url: '/thermalupdated/TCC-742K-(SP40H).pdf' }
      ]
    },
    'tcc-7660': {
      id: 'tcc-7660',
      model: 'TCC 7660 / TCC 762K',
      subtitle: 'High-Res Camcorder',
      image: '/TC-7660-overview-01.png',
      images: [
        //'/TC-7660-overview-01.png',
        '/TCC-762K-inside-01-01-01.png',
        '/TC-7660-inside-02-01-01.png'
      ],
      irResolution: '640 × 480',
      temperatureRange: '-20°C to 1200°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'High-resolution thermal camcorder with advanced video recording for professional thermal documentation and analysis.',
      keyFeatures: [
        'IR Resolution: 640 × 480 (307,200 pixels)',
        'High-resolution video recording',
        'Temperature Range: -20°C to 1200°C',
        'Accuracy: ±2°C, ±2%',
        'Professional camcorder features',
        'NETD: < 30 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Video Frame Rate: 50 Hz',
        'High-resolution video capability',
        'Professional features',
        'Advanced documentation',
        'Extended recording time',
        'Superior image quality',
        'Comprehensive connectivity'
      ],
      technicalSpecs: {
        'IR Resolution': '640 × 480',
        'SuperIR Resolution': '1280 × 960',
        'Temperature Range': '-20°C to 650°C (TCC 7660), -40°C to 2200°C (TCC 762K)',
        'Accuracy': '±1°C, ±2%',
        'FOV': 'Multiple lenses – L8: 8° × 6°, L12: 12° × 9°, L25: 24.8° × 18.7°, L50: 50° × 37.3°',
        'NETD': '< 30 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF',
        'Min Focus': 'L8 – 2 m, L12 – 1 m, L25 – 0.15 m, L50 – 0.15 m',
        'Image Frequency': '30 Hz',
        'Display': '1280 × 720, 5" LCD touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '128 GB SD card (120,000 images, 500 hrs video)'
      },
      applications: [
        'High-resolution documentation',
        'Professional training',
        'Research and development',
        'Quality control',
        'Process optimization',
        'Advanced analysis'
      ],

      brochures: [
        { name: 'TCC-7660 Brochure', url: '/thermalupdated/TCC-7660-(SP60).pdf' },
        { name: 'TCC-762K Brochure', url: '/thermalupdated/TCC-762K-(SP60H).pdf' }
      ]
    },
    'tcc-812k': {
      id: 'tcc-812k',
      model: 'TCC 812K',
      subtitle: 'Ultra-High Res Camcorder',
      image: '/TC-812k-overview-01-01.png',
      images: [
        '/TC-812k-overview-01-01.png',
        '/TC-812k-inside-01-01.png'
      ],
      irResolution: '1280 × 1024',
      temperatureRange: '-20°C to 1200°C',
      accuracy: '±2°C, ±2%',
      price: 'Contact for pricing',
      description: 'Ultra-high resolution thermal camcorder representing the pinnacle of thermal imaging technology for the most demanding applications.',
      keyFeatures: [
        'IR Resolution: 1280 × 1024 (1,310,720 pixels)',
        'Ultra-high resolution video',
        'Temperature Range: -20°C to 1200°C',
        'Accuracy: ±2°C, ±2%',
        'State-of-the-art technology',
        'NETD: < 20 mK',
        'Focus: Manual & minimum distance 0.1m',
        'Video Frame Rate: 50 Hz',
        'Ultra-high resolution capability',
        'Superior thermal sensitivity',
        'State-of-the-art technology',
        'Extended battery life',
        'Professional-grade features',
        'Industry-leading performance'
      ],
      technicalSpecs: {
        'IR Resolution': '1280 × 1024',
        'SuperIR Resolution': '2560 × 2048',
        'Temperature Range': '-40°C to 2200°C',
        'Accuracy': '±1°C, ±1%',
        'FOV': 'Multiple lenses – L8: 7.9° × 6.3°, L12: 12° × 9.6°, L25: 25° × 20°, L50: 50° × 40°',
        'NETD': '< 20 mK',
        'Focus': 'Laser AF / Continuous AF / Manual / Touch AF',
        'Min Focus': 'L8 – 5 m, L12 – 1.65 m, L25 – 0.3 m, L50 – 0.2 m',
        'Image Frequency': '30 Hz',
        'Display': '1920 × 1080, 5.1" OLED touchscreen',
        'Battery': '~4 hours (interchangeable)',
        'Memory': '128 GB SD card (30,000 images, 130 hrs video)'
      },
      applications: [
        'Research and development',
        'Scientific applications',
        'High-end industrial processes',
        'Quality assurance',
        'Advanced diagnostics',
        'Professional documentation'
      ],

      brochure: '/thermalupdated/TCC812K.pdf'
    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'ma-250': {
      title: "KRYKARD MA 250 | Thermal Imagers",
      description: "KRYKARD MA 250 - Mobile Thermal Imager with 256×192 IR Resolution — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "ma 250, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ma-250"
    },
    'tc-e050': {
      title: "KRYKARD TC E050 | Thermal Imagers",
      description: "KRYKARD TC E050 - Pocket Thermal Imager with 96×96 IR Resolution — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc e050, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-e050"
    },
    'tc-s030': {
      title: "KRYKARD TC S030 | Thermal Imagers",
      description: "KRYKARD TC S030 - Entry Level Thermal Imager with Touch Screen — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc s030, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-s030"
    },
    'tc-s240': {
      title: "KRYKARD TC S240 | Thermal Imagers",
      description: "KRYKARD TC S240 touch screen thermal imager with 256×192 IR resolution, delivering accurate temperature imaging for diagnostics and maintenance.",
      keywords: "tc s240, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-s240"
    },
    'tc-2150': {
      title: "KRYKARD TC 2150 | Thermal Imagers",
      description: "KRYKARD TC 2150 compact thermal imager with WiFi connectivity for reliable temperature imaging and diagnostics.",
      keywords: "tc 2150, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-2150"
    },
    'tc-2250': {
      title: "KRYKARD TC 2250 | Thermal Imagers",
      description: "KRYKARD TC 2250 compact thermal imager with 256×192 IR resolution for accurate temperature imaging and diagnostics",
      keywords: "tc 2250, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-2250"
    },
    'tc-3151': {
      title: "KRYKARD TC 3151 | Thermal Imagers",
      description: "KRYKARD TC 3151 - Professional Thermal Imager with Micro SD Storage — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc 3151, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-3151"
    },
    'tc-3250': {
      title: "KRYKARD TC 3250 | Thermal Imagers",
      description: "KRYKARD TC 3250 manual focus thermal imager with 256×192 IR resolution, delivering precise temperature imaging for diagnostics and maintenance.",
      keywords: "tc 3250, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-3250"
    },
    'tc-3360': {
      title: "KRYKARD TC 3360 | Thermal Imagers",
      description: "KRYKARD TC 3360 - Wide Field Thermal Imager with 384×288 IR Resolution — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc 3360, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-3360"
    },
    'tc-3660': {
      title: "KRYKARD TC 3660 | Thermal Imagers",
      description: "KRYKARD TC 3660 - Advanced Thermal Imager with 640×480 IR Resolution — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc 3660, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-3660"
    },
    'tc-p360': {
      title: "KRYKARD TC P360 | Thermal Imagers",
      description: "KRYKARD TC P360 - Pistol Grip Thermal Imager with 384×288 IR Resolution — thermal imager offering temperature imaging for diagnostics, maintenance.",
      keywords: "tc p360, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-p360"
    },
    'tc-4360': {
      title: "KRYKARD TC 4360 | Thermal Imagers",
      description: "KRYKARD TC 4360 high resolution thermal imager with 384×288 IR resolution, delivering accurate temperature imaging for diagnostics and maintenance.",
      keywords: "tc 4360, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-4360"
    },
    'tc-4460': {
      title: "KRYKARD TC 4460 | Thermal Imagers",
      description: "KRYKARD TC 4460 / TC 4460H extended range thermal imager with 640×480 IR resolution for accurate temperature imaging and diagnostics.",
      keywords: "tc 4460, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-4460"
    },
    'tc-4660': {
      title: "KRYKARD TC 4660 | Thermal Imagers",
      description: "KRYKARD TC 4660 / TC 4660H high-end thermal imager with 640×480 IR resolution for precise temperature imaging and diagnostics.",
      keywords: "tc 4660, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tc-4660"
    },
    'tcc-7460': {
      title: "KRYKARD TCC 7460 | Thermal Imagers",
      description: "KRYKARD TCC 7460 / TCC 742K professional thermal camcorders with video recording for professional-grade electrical measurement",
      keywords: "tcc 7460, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tcc-7460"
    },
    'tcc-7660': {
      title: "KRYKARD TCC 7660 | Thermal Imagers",
      description: "KRYKARD TCC 7660 / TCC 762K - High-Resolution Thermal Camcorder with 640×480 IR Resolution — professional‑grade electrical measurement.",
      keywords: "tcc 7660, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tcc-7660"
    },
    'tcc-812k': {
      title: "KRYKARD TCC 812K | Thermal Imagers",
      description: "KRYKARD TCC 812K - Ultra-High Resolution Thermal Camcorder with 1280×1024 IR Resolution — professional‑grade electrical measurement.",
      keywords: "tcc 812k, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "tcc-812k"
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
    const irRes = product.irResolution;
    const tempRange = product.temperatureRange;
    const accuracy = product.accuracy;
    const netd = (product.technicalSpecs && 'NETD' in product.technicalSpecs)
      ? (product.technicalSpecs as { NETD?: string }).NETD || '< 40 mK'
      : '< 40 mK';

    // Product-specific content based on model
    const contentMap: Record<string, { intro: string; features: string; technical: string; why: string }> = {
      'tc-3151': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents professional-grade thermal imaging technology, combining reliable resolution with advanced features in a durable, professional package designed for demanding industrial applications.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require accurate thermal imaging in industrial maintenance, professional inspections, research applications, quality control, predictive maintenance, and advanced diagnostics. With ${irRes} IR resolution and SuperIR technology that enhances resolution to 384×288, this thermal camera delivers detailed temperature imaging for precise diagnostics. The professional design with interchangeable battery system providing up to 6 hours of operation and 32 GB Micro SD storage capable of storing up to 60,000 thermal images and 150 hours of video makes it ideal for extended field inspections. Professional durability with 2m drop test certification ensures reliability in harsh industrial environments.`,
        technical: `The ${model} thermal imager offers exceptional performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring reliable measurements for industrial applications. The 3.5" LCD display with 640×480 resolution provides clear visualization of thermal patterns, while the high-resolution visual camera enables simultaneous visible and thermal image capture. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect even the smallest temperature differences, making it perfect for identifying potential issues in electrical systems, mechanical equipment, and building structures before they escalate into costly failures.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with professional durability, delivering reliable thermal imaging in a rugged package. With features like SuperIR resolution enhancement, interchangeable battery system, comprehensive connectivity options, advanced measurement tools, and professional reporting features, the ${model} is trusted by professionals across India for industrial maintenance, professional inspections, research applications, quality control, predictive maintenance, and advanced diagnostics. Whether you need to identify electrical hotspots, detect mechanical failures, monitor industrial processes, or conduct detailed thermal analysis, the ${model} provides the reliability and performance required for professional thermal imaging applications.`
      },
      'tc-2150': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents compact thermal imaging technology, combining reliable performance with WiFi connectivity in a portable, user-friendly package designed for building inspections and field diagnostics.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require accurate thermal imaging in building inspections, electrical maintenance, HVAC diagnostics, mechanical troubleshooting, energy audits, and preventive maintenance. With ${irRes} IR resolution and SuperIR technology that enhances resolution on captured images and live view, this thermal camera delivers detailed temperature imaging for precise diagnostics. The compact design with 6-hour battery backup and built-in 16 GB memory capable of storing up to 90,000 thermal images makes it ideal for extended field inspections. WiFi connectivity enables instant image sharing and remote analysis, while multiple image modes including Thermal, Visual, Fusion, and Picture-in-Picture (PIP) provide comprehensive analysis capabilities.`,
        technical: `The ${model} thermal imager offers reliable performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring accurate measurements for building and industrial applications. The 3.2" LCD display with 240×320 resolution provides clear visualization of thermal patterns, while the 2 MP visual camera (1600×1200) enables simultaneous visible and thermal image capture. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect temperature variations effectively, making it perfect for identifying potential issues in electrical systems, HVAC equipment, and building structures before they escalate into costly failures.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with compact design, delivering professional-grade thermal imaging in a portable package. With features like SuperIR resolution enhancement, WiFi connectivity, large memory storage, accurate temperature measurement, and multiple image modes, the ${model} is trusted by professionals across India for building inspections, electrical maintenance, HVAC diagnostics, mechanical troubleshooting, energy audits, and preventive maintenance. Whether you need to identify electrical hotspots, detect insulation problems, monitor HVAC systems, or conduct energy efficiency assessments, the ${model} provides the reliability and performance required for professional thermal imaging applications.`
      },
      'tc-4360': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents high-resolution thermal imaging technology, combining superior image quality with advanced features in a professional-grade package designed for demanding applications requiring exceptional detail and accuracy.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require superior thermal imaging in professional inspections, industrial diagnostics, research applications, quality assurance, predictive maintenance, and advanced thermal analysis. With ${irRes} IR resolution and SuperIR technology that enhances resolution to 768×576, this thermal camera delivers exceptional detail for precise diagnostics. The professional design with advanced measurement tools, high thermal sensitivity with NETD of ${netd}, and 64 GB Micro SD storage capable of storing up to 60,000 thermal images and 54 hours of video makes it ideal for comprehensive field inspections and detailed analysis. Multiple focus modes including Laser AF, Continuous AF, Manual, and Touch AF provide flexibility for various inspection scenarios.`,
        technical: `The ${model} thermal imager offers exceptional performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring reliable measurements for professional and industrial applications. The 4.3" LCD display with 800×480 resolution provides clear visualization of thermal patterns, while advanced focus capabilities enable precise imaging at distances as close as 0.1m. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect even the smallest temperature differences, making it perfect for identifying potential issues in electrical systems, mechanical equipment, and industrial processes before they escalate into costly failures. The 50 Hz image frequency ensures smooth real-time monitoring.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with high-resolution imaging, delivering professional-grade thermal imaging in a rugged package. With features like high-resolution SuperIR enhancement, advanced focus modes, high thermal sensitivity, comprehensive connectivity options, extended memory storage, and advanced analysis capabilities, the ${model} is trusted by professionals across India for professional inspections, industrial diagnostics, research applications, quality assurance, predictive maintenance, and advanced thermal analysis. Whether you need to identify electrical hotspots, detect mechanical failures, monitor industrial processes, or conduct detailed thermal research, the ${model} provides the reliability and superior image quality required for professional thermal imaging applications.`
      },
      'tc-3660': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents ultra-high resolution thermal imaging technology, combining exceptional detail with professional-grade features in a premium package designed for the most demanding applications requiring superior image quality and precision.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require ultra-high resolution thermal imaging in professional R&D, advanced diagnostics, precision measurements, quality control, scientific research, and high-end inspections. With ${irRes} IR resolution and SuperIR technology that enhances resolution to 1280×960, this thermal camera delivers exceptional detail for the most precise diagnostics. The advanced design with superior image quality, high thermal sensitivity with NETD of ${netd}, and 64 GB Micro SD storage capable of storing up to 100,000 thermal images and 300 hours of video makes it ideal for comprehensive field inspections and detailed analysis. The 30 Hz image frequency ensures smooth real-time monitoring of dynamic thermal processes.`,
        technical: `The ${model} thermal imager offers exceptional performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring reliable measurements for professional and research applications. The 3.5" LCD display with 640×480 resolution provides clear visualization of thermal patterns, while the ultra-high resolution sensor enables detection of the smallest temperature differences. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect even minute temperature variations, making it perfect for identifying potential issues in electrical systems, mechanical equipment, and industrial processes before they escalate into costly failures. The wide field of view (41.9° × 33.3°) enables comprehensive area coverage.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with ultra-high resolution imaging, delivering research-grade thermal imaging in a professional package. With features like ultra-high SuperIR resolution enhancement, superior thermal sensitivity, comprehensive connectivity options, extended memory storage, advanced analysis capabilities, and exceptional image quality, the ${model} is trusted by professionals across India for professional R&D, advanced diagnostics, precision measurements, quality control, scientific research, and high-end inspections. Whether you need to identify electrical hotspots, detect mechanical failures, monitor industrial processes, or conduct detailed thermal research, the ${model} provides the reliability and superior image quality required for the most demanding thermal imaging applications.`
      },
      'ma-250': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents innovative mobile thermal imaging technology, combining the power of thermal imaging with the convenience of smartphone integration, making professional thermal imaging accessible and portable for field service work and quick inspections.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require mobile thermal imaging in mobile inspections, field service work, real estate inspections, home energy audits, educational applications, and quick thermal checks. With ${irRes} IR resolution and SuperIR technology that enhances resolution on captured images and live view, this thermal camera delivers detailed temperature imaging for precise diagnostics. The smartphone attachment design enables instant sharing capabilities, cloud storage access, and mobile app control, making it ideal for on-the-go inspections. The universal USB-C compatibility ensures easy integration with Android devices, while the 50 Hz image frequency provides smooth real-time thermal imaging.`,
        technical: `The ${model} thermal imager offers reliable performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring accurate measurements for mobile and field applications. The smartphone integration provides access to high-resolution displays, while the thermal sensor delivers ${irRes} IR resolution for detailed thermal imaging. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect temperature variations effectively, making it perfect for identifying potential issues in electrical systems, HVAC equipment, and building structures during quick inspections. The fixed focus with minimum distance of 0.2m ensures easy operation without manual adjustments.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with smartphone convenience, delivering professional-grade thermal imaging in a cost-effective, portable package. With features like SuperIR resolution enhancement, smartphone integration, instant sharing capabilities, cloud storage access, mobile app control, universal compatibility, and high portability, the ${model} is trusted by professionals across India for mobile inspections, field service work, real estate inspections, home energy audits, educational applications, and quick thermal checks. Whether you need to identify electrical hotspots, detect insulation problems, monitor HVAC systems, or conduct quick thermal assessments, the ${model} provides the reliability and convenience required for mobile thermal imaging applications.`
      },
      'tc-2250': {
        intro: `Thermal imagers, also known as infrared cameras or thermographic cameras, are advanced diagnostic tools that detect and visualize heat patterns invisible to the naked eye. These sophisticated instruments capture infrared radiation emitted by objects and convert it into visible thermal images, enabling professionals to identify temperature variations, detect anomalies, and diagnose potential issues before they become critical problems. The KRYKARD ${model} ${subtitle} represents the latest advancement in portable thermal imaging technology, combining high resolution with professional-grade features in a compact, user-friendly package.`,
        features: `The KRYKARD ${model} is specifically designed for professionals who require accurate thermal imaging in building diagnostics, electrical maintenance, HVAC troubleshooting, and energy audits. With ${irRes} IR resolution and SuperIR technology that enhances resolution to 384×288, this thermal camera delivers detailed temperature imaging for precise diagnostics. The compact design with 6-hour battery backup and built-in 16 GB memory capable of storing up to 35,000 thermal images makes it ideal for extended field inspections. WiFi connectivity enables instant image sharing and remote analysis, while multiple image modes including Thermal, Visual, Fusion, and Picture-in-Picture (PIP) provide comprehensive analysis capabilities.`,
        technical: `The ${model} thermal imager offers exceptional performance with a temperature range from ${tempRange} and accuracy of ${accuracy}, ensuring reliable measurements for industrial applications. The 3.2" LCD display with 480×640 resolution provides clear visualization of thermal patterns, while the 2 MP visual camera (1600×1200) enables simultaneous visible and thermal image capture. With NETD (Noise Equivalent Temperature Difference) of ${netd}, the ${model} can detect even the smallest temperature differences, making it perfect for identifying potential issues in electrical systems, mechanical equipment, and building structures before they escalate into costly failures.`,
        why: `KRYKARD ${model} thermal imager combines precision engineering with user-friendly design, delivering professional-grade thermal imaging in a portable package. With features like enhanced resolution, WiFi connectivity, large memory storage, and accurate temperature measurement, the ${model} is trusted by professionals across India for building diagnostics, electrical maintenance, HVAC troubleshooting, energy audits, and preventive maintenance. Whether you need to identify electrical hotspots, detect insulation problems, monitor mechanical equipment, or conduct energy efficiency assessments, the ${model} provides the reliability and performance required for professional thermal imaging applications.`
      }
    };

    return contentMap[productId] || null;
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/thermal-imagers');
    }
  }, [product, navigate]);

  // Handle clicking outside dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (dropdownOpen && !target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
      if (brochureDropdownOpen && !target.closest('.brochure-dropdown-container')) {
        setBrochureDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen, brochureDropdownOpen]);

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `${product.model} - ${product.subtitle} | Thermal Imagers`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "thermal imagers, electrical testing, temperature measurement",
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
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('screen') || feature.toLowerCase().includes('touch')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('gb') || feature.toLowerCase().includes('sd')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('bluetooth') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('connectivity')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power') || feature.toLowerCase().includes('operation')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal') || feature.toLowerCase().includes('netd')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('laser') || feature.toLowerCase().includes('pointer')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('resolution') || feature.toLowerCase().includes('superir') || feature.toLowerCase().includes('frequency')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('ip54') || feature.toLowerCase().includes('drop') || feature.toLowerCase().includes('rugged') || feature.toLowerCase().includes('protection')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('focus') || feature.toLowerCase().includes('manual') || feature.toLowerCase().includes('fov')) return <Eye className="h-5 w-5" />;
    if (feature.toLowerCase().includes('camera') || feature.toLowerCase().includes('visual') || feature.toLowerCase().includes('mp')) return <Camera className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  // Brochure dropdown logic for products with multiple brochures
  const renderBrochureButton = () => {
    // Check if product has multiple brochures
    if ('brochures' in product && Array.isArray(product.brochures)) {
      return (
        <div className="relative flex-1 brochure-dropdown-container">
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
              {product.brochures.map((brochure, index) => (
                <button
                  key={index}
                  onClick={() => {
                    window.open(brochure.url, '_blank');
                    setBrochureDropdownOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 hover:bg-yellow-50 transition-colors duration-200 ${index === 0 ? 'rounded-t-xl' : ''
                    } ${index === product.brochures.length - 1 ? 'rounded-b-xl' : 'border-b border-gray-100'
                    }`}
                >
                  {brochure.name}
                </button>
              ))}
            </div>
          )}
        </div>
      );
    } else {
      return (
        <button
          onClick={() => {
            if ('brochure' in product && product.brochure) {
              window.open(product.brochure, '_blank');
            } else {
              window.open('/brochureatandra.pdf', '_blank');
            }
          }}
          className="flex-1 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center space-x-2 text-sm hover:opacity-90"
          style={{ backgroundColor: '#F5C842' }}
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
        canonical={`https://atandra.in/measure/thermal-imagers/product/${product.id}`}
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
                  Thermal Imagers
                </h2>
                <p className="typography-h4 text-black">
                  Professional Thermal Imaging Solutions
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
                              navigate(`/measure/thermal-imagers/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/thermal-imagers')}
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
                      {product.irResolution} IR Resolution
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
                        <h4 className="font-semibold text-black mb-1">IR Resolution</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.irResolution}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-md">
                        <h4 className="font-semibold text-black mb-1">Accuracy</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.accuracy}</p>
                      </div>
                      <div className="bg-white p-3 rounded-xl shadow-md col-span-2">
                        <h4 className="font-semibold text-black mb-1">Temperature Range</h4>
                        <p className="font-bold" style={{ color: '#B8860B' }}>{product.temperatureRange}</p>
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
                  <div className="w-full max-w-2xl"> {/* Increased from max-w-xs to max-w-2xl */}
                    {product.images && product.images.length > 1 ? (
                      <Carousel
                        images={product.images}
                        className="w-full"
                        theme="yellow"
                      />
                    ) : (
                      <img
                        src={imageError ? getFallbackImage() : product.image}
                        alt={`KRYKARD ${product.model} - ${product.subtitle} - for Temperature Imaging and Diagnostics`}
                        className="w-full h-auto object-contain"
                        style={{
                          maxHeight: '1000px', // Increased from 800px
                          maxWidth: '1000px', // Increased from 800px
                          background: 'transparent',
                          mixBlendMode: 'normal',
                          opacity: '1'
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

          {/* Technical Specifications Section - Simple Style */}
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
                <div className="px-8 py-6">
                  <div className="space-y-6">
                    {Object.entries(product.technicalSpecs).map(([key, value], index) => (
                      <div key={index} className="flex items-baseline gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-2 h-2 rounded-full bg-yellow-400 mt-2"></div>
                        </div>
                        <div className="flex-grow">
                          <span className="font-medium text-gray-900">{key}</span>
                          <span className="mx-2 text-gray-600">:</span>
                          <span className="text-gray-800">{value}</span>
                        </div>
                      </div>
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
                  .seo-details-thermal summary {
                    list-style: none;
                  }
                  .seo-details-thermal summary::-webkit-details-marker {
                    display: none;
                  }
                `}</style>

                <details className="seo-details-thermal group w-full">
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
                              Understanding Thermal Imaging Technology
                            </h3>
                            <p className="text-gray-700 text-sm leading-relaxed mb-3">
                              {content.intro}
                            </p>

                            <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                              Applications and Benefits of the {currentProduct?.model} Thermal Imager
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
                              Why Choose KRYKARD {currentProduct?.model} Thermal Imager?
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
                  Our specialists provide comprehensive guidance on thermal imaging solutions
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

export default ThermalImagerProduct;