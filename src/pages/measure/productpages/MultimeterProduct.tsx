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
  ChevronRight
} from 'lucide-react';
import PageLayout from '@/components/layout/PageLayout';
import Carousel from '@/components/Carousel';
import SeoHead from '@/seo/SeoHead';

const MultimeterProduct = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [specsExpanded, setSpecsExpanded] = useState(false);

  // Product list for dropdown
  const productList = [
    { id: 'mtx203', model: 'MTX 203', subtitle: 'Basic Digital Multimeter' },
    { id: 'dmm210', model: 'DMM 210/220/230', subtitle: 'Standard Digital Multimeter' },
    //{ id: 'dmm220', model: 'DMM 220', subtitle: 'Enhanced Standard Digital Multimeter' },
    //{ id: 'dmm230', model: 'DMM 230', subtitle: 'TRMS Standard Digital Multimeter' },
    { id: 'dmm240', model: 'DMM 240', subtitle: 'Advanced Digital Multimeter' },
    { id: 'ca5273', model: 'CA 5273', subtitle: 'CA Advanced Series Multimeter' },
    { id: 'mtx3291', model: 'MTX 3291', subtitle: 'High Resolution Multimeter' },
    { id: 'ca5292', model: 'CA 5292', subtitle: 'Professional Digital Multimeter' },
    { id: 'f65', model: 'F65', subtitle: 'RMS Leakage Current Clamp' }
  ];

  // Brochure links for each product
  const brochureLinks: { [key: string]: string } = {
    mtx203: '/MTX-203.pdf',
    dmm210: '/DMM210.pdf',
    dmm220: '/DMM210.pdf',
    dmm230: '/DMM210.pdf',
    dmm240: '/DMM210.pdf',
    ca5273: '/CA-5273-5275-5277.pdf',
    mtx3291: '/MTX-3291.pdf',
    ca5292: '/CA-5292.pdf',
    f65: '/F-65.pdf'
  };

  // Complete product data with multiple images support
  const productData = {
    mtx203: {
      id: 'mtx203',
      model: 'MTX 203',
      subtitle: 'Basic Digital Multimeter',
      image: '/multimeter/MTX 203.png',
      images: [
        '/multimeter/MTX 203.png',
        '/MTX-203-02.jpg' // Add more images when available
      ],
      voltage: '1000V AC/DC',
      measurement: '6000 counts LCD',
      accuracy: '±0.5%',
      price: 'Contact for pricing',
      description: 'The MTX 203 provides essential electrical measurement capabilities in a compact, user-friendly package. Perfect for basic electrical testing and troubleshooting with reliable performance.',
      keyFeatures: [
        'Display: 6000 counts monochrome digital display with blue backlighting',
        'Audible continuity & Diode test',
        'VLowZ, HOLD, NCV',
        'Min, Max values',
        'IP 54 protection rating',
        'Auto power-off function',
        'Portable and rugged construction',
        'Easy-to-use interface',
        'Voltage measurement up to 1000V',
        'Current measurement capability',
        'Resistance measurement range',
        'Temperature measurement function'
      ],
      technicalSpecs: {
        "Type": "TRMS AC digital multimeter, 6,000 counts",
        "Voltage measurement": "AC 0.6 V to 750 V (±0.5% + 4D),DC 0.6 V to 1,000 V (±0.2% + 2D)",
        "Current measurement": "AC 10 μA to 10 A (±0.5% + 5D)",
        "Resistance": "1 Ω to 60 MΩ (±0.5% + 5D)",
        "Capacitance": "1 nF to 100 mF (±2% + 5D)",
        "Frequency/Duty cycle": "2 Hz to 1 kHz (±0.1% + 3D)",
        "Temperature": "-55 °C to +1,200 °C (K thermocouple)",
        "Functions": "Min/Max, ΔREL, VLowZ, HOLD, NCV (non-contact voltage), Continuity (beep < 50 Ω), Diode test",
        "Display": "Monochrome 6,000-count LCD, backlit, red warning at 230 V (NCV)",
        "Protection": "IP54, IEC 61010-2-033, 600 V CAT III",
        "Power supply": "2 × 1.5 V AA (LR6) batteries",
        "Dimensions / Weight": "170 × 80 × 50 mm / 320 g",
        "Other features": "Torch light, shockproof magnetized sheath, MultiFIX compatible"
      },
      applications: [
        'Basic electrical testing and troubleshooting',
        'Residential electrical work',
        'Educational and training purposes',
        'Field service and maintenance',
        'Electronics repair and diagnostics',
        'Automotive electrical testing'
      ],

    },
    dmm210: {
      id: 'dmm210',
      model: 'DMM 210/220/230',
      subtitle: 'Standard Digital Multimeter',
      image: '/multimeter/DMM 210.png',
      images: [
        '/multimeter/DMM 210.png',
        '/DMM210-220-230-01.png',
        '/DMM210-220-230-02-01.png',
        '/DMM210-220-230-03-01.png' // Add more images when available
      ],
      voltage: '1000V AC/DC',
      measurement: '6,000 counts LCD',
      accuracy: '±0.5%',
      price: 'Contact for pricing',
      description: 'The DMM 210/220/230 provides reliable electrical measurements with enhanced features including bargraph display and autorange functionality for professional electrical testing applications.',
      keyFeatures: [
        'Display: 6,000 counts backlit with bargraph',
        'Measurement Type: Average',
        'Calibre Selection: Autorange/Manual',
        'Audible continuity & Diode test',
        'Automatic shutdown (deactivatable)',
        'Relative mode – MIN, MAX',
        'IP 67 protection rating',
        'Professional-grade construction',
        'Enhanced voltage measurement',
        'Improved current sensing',
        'Advanced frequency measurement',
        'Temperature compensation'
      ],
      technicalSpecs: {
        'Display': 'DMM 210: 6,000 counts, backlit, bargraph,DMM 220/230: 40,000 counts, backlit, bargraph',
        'Measurement type': 'DMM 210: Average, DMM 220/230: TRMS',
        'Bandwidth': 'DMM 210: 40 Hz – 1 kHz,DMM 220/230: 50 Hz – 1 kHz',
        'DC Current': 'DMM 210: 600 µA → 10 A (best res. 0.1 µA, accuracy 1.0%+3c),DMM 220/230: 400 µA → 10 A (20 A max., best res. 0.01 µA,accuracy 1.0%+3c)4–20 mA scaling: only on 230 (–25% to +125%)',
        'AC Current': 'DMM 210: 600 µA → 10 A (20 A max., best res. 0.1 µA, acc.1.5%+3c),DMM 220/230: 400 µA → 10 A (20 A max., best res. 0.1 µA, acc.1.5%+3c)',
        'DC Voltage': 'DMM 210: 600 mV → 1000 V, res. 0.1 mV, accuracy 0.09%+2c,DMM 220/230: 400 mV → 1000 V, res. 0.01 mV, accuracy 0.06%+2c',
        'AC Voltage': 'DMM 210: 6 V → 1000 V, res. 1 mV, accuracy 1.0%+3c,DMM 220/230: 400 mV → 1000 V, res. 0.1 mV, accuracy 1.0%+3c',
        'Resistance': 'DMM 210: 600 Ω → 60 MΩ, res. 0.1 Ω,DMM 220/230: 400 Ω → 40 MΩ, res. 0.01 Ω,Accuracy: 0.3%+4c',
        'Continuity': 'Audible, <0.1 Ω',
        'Diode test': 'Yes',
        'Capacitance': 'DMM 220: 0.01 nF → 1000 µF,DMM 230: 0.001 nF → 40 mF',
        'Temperature (K thermocouple)': 'DMM 220: –45 °C → +750 °C,DMM 230: –50 °C → +1000 °C',
        'Frequency': 'DMM 210: Electrical 10 → 400 Hz, Electronic 0.001 Hz → 10 MHz,DMM 220/230: Electrical 40 → 400 Hz, Electronic 0.001 Hz → 100 MHz',
        'Duty cycle': '0.1% → 99.9% (230: 0.1% → 99.90%)',
        'Features': 'Autorange/manual, auto shutdown (disable option), relative mode,MIN/MAX (PEAK 1 ms on 230)',
        'Protection': 'IP67, shockproof sheath, 600 V CAT IV / 1000 V CAT III (IEC61010-1, -2-033)',
        'Power': '9 V battery',
        'Dimensions / Weight': '187 × 81 × 50 mm / ~342 g',
        'Accessories': 'DMM 210: Test leads,DMM 220/230: Test leads + K-type temperature probe'
      },
      applications: [
        'Professional electrical testing',
        'Industrial maintenance',
        'Electrical installation verification',
        'Power system diagnostics',
        'Equipment troubleshooting',
        'Quality control testing'
      ],

    },
    // dmm220: {
    //   id: 'dmm220',
    //   model: 'DMM 220',
    //   subtitle: 'Enhanced Standard Digital Multimeter',
    //   image: '/DMM210-220-230-02.jpg',
    //   images: [
    //     '/DMM210-220-230-02.jpg' // Add more images when available
    //   ],
    //   voltage: '1000V AC/DC',
    //   measurement: '6,000 counts LCD',
    //   accuracy: '±0.5%',
    //   price: 'Contact for pricing',
    //   description: 'The DMM 220 builds upon the DMM 210 with additional measurement capabilities including capacitance and temperature measurement for comprehensive electrical testing.',
    //   keyFeatures: [
    //     'Display: 6,000 counts backlit with bargraph',
    //     'Measurement Type: Average',
    //     'Calibre Selection: Autorange/Manual',
    //     'Audible continuity & Diode test',
    //     'Automatic shutdown (deactivatable)',
    //     'Relative mode – MIN, MAX',
    //     'Capacitance measurement up to 1000 μF',
    //     'Temperature measurement up to 750°C',
    //     'IP 67 protection rating',
    //     'Enhanced measurement accuracy',
    //     'Improved display visibility',
    //     'Advanced safety features'
    //   ],
    //   technicalSpecs: {
    //     'Voltage Range': 'V(AC): 6 V to 1000 V, V(DC): 600 mV to 1000 V',
    //     'AC Bandwidth': 'Up to 1 kHz',
    //     'Current Range': 'A (AC/DC): 600 μA to 10 A',
    //     'Resistance': '600 Ω to 60 MΩ',
    //     'Frequency': 'Up to 10 MHz',
    //     'Capacitance': 'Up to 1000 μF',
    //     'Temperature': 'Up to 750°C',
    //     'Display': '6,000 counts backlit with bargraph',
    //     'Measurement Type': 'Average',
    //     'Operating Temperature': '-10°C to +50°C',
    //     'Storage Temperature': '-20°C to +60°C',
    //     'IP Rating': 'IP 67',
    //     'Dimensions': '190 x 95 x 55 mm',
    //     'Weight': '0.5 kg',
    //     'Safety Rating': 'CAT III 1000V, CAT IV 600V',
    //     'Input Protection': 'Fused inputs for safety'
    //   },
    //   applications: [
    //     'Professional electrical testing',
    //     'HVAC system diagnostics',
    //     'Industrial maintenance',
    //     'Electrical installation verification',
    //     'Temperature monitoring',
    //     'Capacitor testing'
    //   ],

    // },
    // dmm230: {
    //   id: 'dmm230',
    //   model: 'DMM 230',
    //   subtitle: 'TRMS Standard Digital Multimeter',
    //   image: '/DMM210-220-230-03.jpg',
    //   images: [
    //     '/DMM210-220-230-03.jpg' // Add more images when available
    //   ],
    //   voltage: '1000V AC/DC',
    //   measurement: '6,000 counts LCD',
    //   accuracy: '±0.5%',
    //   price: 'Contact for pricing',
    //   description: 'The DMM 230 features True RMS measurement capability for accurate readings of non-sinusoidal waveforms, making it ideal for modern electrical systems with electronic loads.',
    //   keyFeatures: [
    //     'Display: 6,000 counts backlit with bargraph',
    //     'Measurement Type: TRMS (True RMS)',
    //     'Calibre Selection: Autorange/Manual',
    //     'Audible continuity & Diode test',
    //     'Automatic shutdown (deactivatable)',
    //     'Relative mode – MIN, MAX',
    //     'Capacitance measurement up to 1000 μF',
    //     'Temperature measurement up to 750°C',
    //     'IP 67 protection rating',
    //     'True RMS for accurate AC measurements',
    //     'Crest factor up to 3:1',
    //     'Advanced waveform analysis'
    //   ],
    //   technicalSpecs: {
    //     'Voltage Range': 'V(AC): 6 V to 1000 V, V(DC): 600 mV to 1000 V',
    //     'AC Bandwidth': 'Up to 1 kHz',
    //     'Current Range': 'A (AC/DC): 600 μA to 10 A',
    //     'Resistance': '600 Ω to 60 MΩ',
    //     'Frequency': 'Up to 10 MHz',
    //     'Capacitance': 'Up to 1000 μF',
    //     'Temperature': 'Up to 750°C',
    //     'Display': '6,000 counts backlit with bargraph',
    //     'Measurement Type': 'TRMS (True RMS)',
    //     'Operating Temperature': '-10°C to +50°C',
    //     'Storage Temperature': '-20°C to +60°C',
    //     'IP Rating': 'IP 67',
    //     'Dimensions': '190 x 95 x 55 mm',
    //     'Weight': '0.5 kg',
    //     'Crest Factor': 'Up to 3:1 at full scale',
    //     'TRMS Accuracy': '±(1.0% + 3 digits) 45-65 Hz'
    //   },
    //   applications: [
    //     'TRMS measurement applications',
    //     'Electronic load testing',
    //     'Variable frequency drive diagnostics',
    //     'Power quality assessment',
    //     'Industrial maintenance',
    //     'HVAC system analysis'
    //   ],

    // },
    dmm240: {
      id: 'dmm240',
      model: 'DMM 240',
      subtitle: 'Advanced Digital Multimeter',
      image: '/multimeter/DMM 240.png',
      images: [
        '/multimeter/DMM 240.png',
        '/DMM-240-01.png'// Add more images when available
      ],
      voltage: '1000V AC/DC',
      measurement: '40,000 counts LCD',
      accuracy: '±0.2%',
      price: 'Contact for pricing',
      description: 'The DMM 240 offers high-resolution measurements with 40,000 count display and advanced features including peak measurement for comprehensive electrical analysis.',
      keyFeatures: [
        'Display: 40,000 counts backlit with bargraph',
        'Measurement Type: TRMS',
        'Calibre Selection: Autorange/Manual',
        'Audible continuity & Diode test',
        'Automatic shutdown (deactivatable)',
        'Relative mode – MIN, MAX, PEAK (1 ms)',
        'High-resolution measurements',
        'IP 67 protection rating',
        'Peak hold function',
        'Advanced data logging',
        'Enhanced measurement speed',
        'Professional-grade accuracy'
      ],
      technicalSpecs: {
        'Display': '40,000 counts, backlit with bargraph',
        'Measurement type': 'TRMS',
        'Bandwidth': '50 Hz to 1 kHz',
        'DC current': '400 µA to 10 A (20 A max), best resolution 0.01 µA, accuracy ±1.0% + 3D',
        'AC current': '400 µA to 10 A (20 A max), resolution 0.1 µA, accuracy ±1.5% + 3D',
        'DC voltage': '400 mV to 1000 V, resolution 0.01 mV, accuracy ±0.06% + 2D',
        'AC voltage': '400 mV to 1000 V, resolution 0.1 mV, accuracy ±1.0% + 3D',
        'Resistance': '400 Ω to 40 MΩ, resolution 0.01 Ω, accuracy ±0.3% + 4D',
        'Continuity / Diode': 'Yes (0.1 Ω threshold) / Yes',
        'Capacitance': '0.001 nF to 40 mF',
        'Temperature (K type)': '-50 °C to +1000 °C',
        'Frequency': 'Electrical: 40.00 to 400.00 Hz, Electronic: 0.001 Hz to 100.00 MHz',
        'Duty cycle': '0.1% to 99.90%',
        'Functions': 'Autorange/manual, Min/Max, Relative mode, PEAK (1 ms), Auto power-off (disable option)',
        'Safety': '600 V CAT IV / 1000 V CAT III (IEC 61010-1 / -2-033)',
        'Ingress protection': 'IP67 (water & dust tight)',
        'Dimensions / Weight': '187 × 81 × 50 mm / ~342 g',
        'Accessories': '9 V battery, red/black test probes, K-type temp probe'
      },
      applications: [
        'Advanced electrical testing',
        'High-precision measurements',
        'Industrial equipment diagnostics',
        'Research and development',
        'Quality control testing',
        'Professional electrical work'
      ],

    },
    ca5273: {
      id: 'ca5273',
      model: 'CA 5273',
      subtitle: 'CA Advanced Series Multimeter',
      image: '/ca5273.png',
      images: [
        '/ca5273.png' // Add more images when available
      ],
      voltage: '1000V AC/DC',
      measurement: '2 x 6,000 counts LCD',
      accuracy: '±0.5%',
      price: 'Contact for pricing',
      description: 'The CA 5273 features dual display with automatic AC/DC detection for enhanced measurement efficiency and professional electrical testing applications.',
      keyFeatures: [
        'Display: 2 x 6,000 counts with backlighting & bargraph',
        'Autorange/Deactivatable',
        'Automatic AC/DC detection',
        'Audible continuity & Diode test',
        'Hold function',
        'Temperature measurement up to 1,200°C',
        'IP 54 protection rating',
        'Professional construction',
        'Dual measurement capability',
        'Enhanced user interface',
        'Advanced safety features',
        'Comprehensive measurement range'
      ],
      technicalSpecs: {
        'Type': 'TRMS AC/DC digital multimeter',
        'Display': 'Dual 6,000-count backlit LCD + bargraph (61+2 segments, central zero)',
        'Acquisition rate': '5 measurements/s',
        'Voltage DC': '600 mV to 1000 V, accuracy ±0.2% + 2 cts',
        'Voltage AC': '600 mV to 1000 V, bandwidth 40 Hz–3 kHz',
        'VLowZ': 'Low-impedance AC measurement with low-pass filter, up to 1000 V',
        'Current DC/AC': '6 A / 10 A (20 A for 30 s), resolution 0.001 A',
        'Resistance': '600 Ω to 60 MΩ',
        'Continuity / Diode': 'Yes / Yes',
        'Frequency': '600 Hz to 50 kHz',
        'Capacitance': '1 pF to 60 mF',
        'Temperature': '-59.6 °C to +1200 °C (K thermocouple)',
        'Functions': 'Auto AC/DC detection, Min/Max, Hold, Central Zero bargraph',
        'Safety': 'IEC 61010, CAT IV 600 V / CAT III 1000 V',
        'Protection': 'IP54',
        'Power supply': '1 × 9 V battery',
        'Dimensions / Weight': '190 × 90 × 45 mm / 400 g'
      },
      applications: [
        'Professional electrical testing',
        'Industrial facility monitoring',
        'Power system analysis',
        'Electrical installation verification',
        'Maintenance and troubleshooting',
        'Temperature monitoring'
      ],

    },
    mtx3291: {
      id: 'mtx3291',
      model: 'MTX 3291',
      subtitle: 'High Resolution Multimeter',
      image: '/multimeter/MTX 3291.png',
      images: [
        '/multimeter/MTX 3291.png',
        //'/multimeter/MTX 3291.png',
        '/mtx3291_2-01.png' // Add more images when available
      ],
      voltage: '1000V AC/DC/AC+DC',
      measurement: '60,000 counts LCD',
      accuracy: '±0.2%',
      //price: 'Contact for pricing',
      description: 'The MTX 3291 provides high-resolution measurements with USB communication and PC interface for advanced data logging and analysis applications.',
      keyFeatures: [
        'Display: 60,000 counts backlight digital monochrome',
        'TRMS value measurement',
        'Audible continuity detection (600 Ω SIGNAL 30 Ω ≤ 5 V)',
        'Diode test capability',
        'HOLD/Auto-HOLD functions',
        'Communication: USB interface',
        'PC interface software included',
        'IP 67 protection rating',
        'High-resolution display',
        'Advanced data logging',
        'Professional connectivity',
        'Enhanced measurement precision'
      ],
      technicalSpecs: {
        'Type': 'Handheld TRMS digital oscilloscope-multimeter',
        'Display': '3.5\' colour TFT LCD, 320 × 240 pixels',
        'Channels': '2 isolated',
        'Bandwidth': '20 MHz',
        'Sampling rate': '50 MS/s (one-shot), 2.5 GS/s (ETS)',
        'Memory depth': '50 kpoints',
        'Vertical sensitivity': '2.5 mV/div to 200 V/div',
        'Time base': '1 ns/div to 200 s/div',
        'Trigger modes': 'Edge, pulse width, delay, counting',
        'Math functions': 'Add, subtract, multiply, divide, FFT (2,500 points)',
        'Multimeter functions': 'TRMS AC/DC V & I, resistance, continuity, capacitance, frequency, temperature, diode test',
        'Recording': 'Trend plots, up to 27,000 points',
        'Safety': 'IEC 61010, CAT III 600 V, CAT II 1000 V',
        'Protection': 'IP51',
        'Power supply': 'Li-ion rechargeable battery, ~8 h autonomy',
        'Communication': 'USB interface, SCPI protocol, DataView software',
        'Dimensions / Weight': '210 × 115 × 45 mm / 1.2 kg'
      },
      applications: [
        'High-precision measurements',
        'Data logging applications',
        'Research and development',
        'Quality control testing',
        'Industrial maintenance',
        'Professional electrical work'
      ],

    },
    ca5292: {
      id: 'ca5292',
      model: 'CA 5292',
      subtitle: 'Professional Digital Multimeter',
      image: '/multimeter/CA 5292.png',
      images: [
        '/multimeter/CA 5292.png',
        '/ca5292-2-01.png' // Add more images when available
      ],
      voltage: '1000V AC/DC/AC+DC',
      measurement: '100,000 count color display',
      accuracy: '±0.03% (VDC)',
      price: 'Contact for pricing',
      description: 'The CA 5292 delivers industry-leading performance with color graphical display, trend analysis, and comprehensive data logging for the most demanding professional applications.',
      keyFeatures: [
        '4 x 100,000 count colour graphical display with backlighting',
        'TRMS value measurement',
        'Audible continuity detection (1000 Ω/SIGNAL < 20 Ω < 3.5 V) & Diode test',
        'Display of trends, multiple parameters & 600 Hz waveform',
        'HOLD/Auto-HOLD functions',
        'Memory: 10,000 measurements',
        'Communication: USB, Bluetooth (optional)',
        'PC interface software included',
        'IP 67 protection rating',
        'Advanced graphical interface',
        'Real-time waveform display',
        'Professional data analysis'
      ],
      technicalSpecs: {
        'Type': 'TRMS AC/DC/AC+DC recorder-multimeter',
        'Display': '100,000-count colour graphical LCD (70 × 52 mm), backlit',
        'Voltage': '100 mV to 1000 V DC/AC/AC+DC, resolution 1 µV, accuracy DC ±0.03%, AC ±0.3%, bandwidth 100 kHz',
        'LowZ mode': 'AC &amp; AC+DC measurements with low-pass filter',
        'Current': '1 µA to 10 A (20 A for 30 s), resolution 10 nA, accuracy DC ±0.08%,AC ±0.3%, bandwidth 50 kHz',
        'Current Accuracy': '0.08% (DC) & 0.3% (AC/AC+DC)',
        'Resistance': '100 Ω to 100 MΩ, accuracy ±0.07%',
        'Continuity / Diode': 'Audible continuity &lt;20 Ω / Diode &amp; LED test up to 2.6 V',
        'Capacitance': '1 nF to 10 mF, resolution 1 pF',
        'Frequency': '10 Hz to 5 MHz, resolution 0.0001 Hz',
        'Duty cycle / Pulse width / Counter': 'Yes',
        'Temperature': '–200 °C to +800 °C (Pt100/1000), –40 °C to +1200 °C (K thermocouple)',
        'Functions': 'Min/Max/Avg (time/date stamped), Peak+, Peak–, Crest Factor,Relative mode, SPEC tolerance display, Math function (Ax+B), 300 Hz low-pass filter (PWM drives), waveform display up to 600 Hz',
        'Recording': 'Up to 10,000 measurements, 30 sequences, file manager with time/date',
        'Communication': 'Optical USB (standard), Bluetooth (optional), SX-DMM software, Android app',
        'Power supply': '4 × AA batteries or NiMH rechargeable, USB charging, operation while charging',
        'Battery life': 'Up to 100 h',
        'Safety': 'IEC 61010-1 / -2-033, 1000 V CAT III / 600 V CAT IV',
        'Protection': 'IP54 (dustproof, watertight)',
        'Dimensions / Weight': '196 × 90 × 47 mm / 570 g'
      },
      applications: [
        'Premium electrical testing',
        'Research and development',
        'High-precision measurements',
        'Data logging and analysis',
        'Professional electrical work',
        'Quality control testing'
      ],

    },
    f65: {
      id: 'f65',
      model: 'F65',
      subtitle: 'RMS Leakage Current Clamp',
      image: '/multimeter/F65.png',
      images: [
        '/multimeter/F65.png',
        //'/multimeter/F65.png',
        '/F-65-2.png' // Add more images when available
      ],
      voltage: '600V AC/DC',
      measurement: '10,000 counts LCD',
      accuracy: '1.2% ± 5 cts',
      price: 'Contact for pricing',
      description: 'The F65 is a specialized RMS leakage current clamp meter designed for measuring small AC currents and leakage currents in electrical installations with IEC 61557-13 compliance.',
      keyFeatures: [
        'Clamping diameter: 28 mm',
        'Display: 10,000 counts backlit LCD',
        'Hold & Auto power off functions',
        'Audible Continuity (Buzzer 35 Ω)',
        'Complied IEC 61557-13 standard',
        'Leakage current measurement capability',
        'Compact and portable design',
        'Professional construction',
        'High sensitivity measurement',
        'Safety compliance testing',
        'Precision clamp design',
        'Enhanced measurement accuracy'
      ],
      technicalSpecs: {
        'Display': '10,000-count backlit display',
        'Current': '30 μA to 100 A AC',
        'Resolution': '10 μA',
        'Filter': '50/60 Hz anti-harmonic filter',
        'Immunity to eddy currents': '70 dB',
        'AC/DC voltage': '0.1 V to 600 V',
        'Frequency': '5 Hz to 1 kHz',
        'Resistance': '0.1 Ω to 1 kΩ',
        'Audible continuity': '< 35 Ω',
        'Functions': 'Max, Relative, display memorization',
        'Automatic power-off': 'Yes, with battery status indication',
        'Safety': '300 V CAT III'
      },
      applications: [
        'Leakage current measurement',
        'Electrical installation testing',
        'Safety compliance testing',
        'Preventive maintenance',
        'Electrical troubleshooting',
        'Ground fault detection'
      ],

    }
  };

  const product = productData[productId as keyof typeof productData];

  // SEO data mapping for each product
  const seoData: Record<string, { title: string; description: string; keywords: string; slug: string }> = {
    'mtx203': {
      title: "KRYKARD MTX203 | Digital Multimeters",
      description: "KRYKARD MTX 203 - Basic Digital Multimeter with 6000 Counts LCD Display — digital multimeter designed for accurate electrical measurement.",
      keywords: "mtx203, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "mtx203"
    },
    'dmm210': {
      title: "KRYKARD DMM210 | Digital Multimeters",
      description: "KRYKARD DMM 210/220/230 standard digital multimeters with True RMS measurement deliver accurate and reliable electrical measurement",
      keywords: "dmm210, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "dmm210"
    },
    'dmm240': {
      title: "KRYKARD DMM240 | Digital Multimeters",
      description: "KRYKARD DMM 240 - Advanced Digital Multimeter with 40,000 Counts LCD Display — digital multimeter designed for accurate electrical measurement.",
      keywords: "dmm240, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "dmm240"
    },
    'ca5273': {
      title: "KRYKARD CA5273 | Digital Multimeters",
      description: "KRYKARD CA 5273/5275/5277 - CA Advanced Series Multimeter with Dual Display — digital multimeter designed for accurate electrical measurement.",
      keywords: "ca5273, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca5273"
    },
    'mtx3291': {
      title: "KRYKARD MTX3291 | Digital Multimeters",
      description: "KRYKARD MTX 3291 - High Resolution Multimeter with 60,000 Counts LCD Display — digital multimeter designed for accurate electrical measurement.",
      keywords: "mtx3291, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "mtx3291"
    },
    'ca5292': {
      title: "KRYKARD CA5292 | Digital Multimeters",
      description: "KRYKARD CA 5292/CA 5293 professional digital multimeter with 100,000-count color display, designed for precise and reliable electrical measurements.",
      keywords: "ca5292, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "ca5292"
    },
    'f65': {
      title: "KRYKARD F65 | Digital Multimeters",
      description: "KRYKARD F65 - RMS Leakage Current Clamp for Safety Testing — professional‑grade electrical measurement for industrial applications.",
      keywords: "f65, power quality analyzer, energy monitoring, electrical diagnostics, harmonics measurement, industrial power audit, PQ compliance",
      slug: "f65"
    }
  };

  useEffect(() => {
    if (!product) {
      navigate('/measure/digital-multimeters');
    }
  }, [product, navigate]);

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

  if (!product) {
    return <div>Product not found</div>;
  }

  // Get SEO data for current product
  const seo = seoData[product.id] || {
    title: `${product.model} - ${product.subtitle} | Digital Multimeters`,
    description: product.description || `${product.model} - ${product.subtitle}`,
    keywords: "digital multimeters, electrical testing, measurement",
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

  // Feature icon logic similar to OscilloscopeProduct
  const FeatureIcon = ({ feature }: { feature: string }) => {
    if (feature.toLowerCase().includes('display') || feature.toLowerCase().includes('lcd') || feature.toLowerCase().includes('tft') || feature.toLowerCase().includes('screen')) return <Monitor className="h-5 w-5" />;
    if (feature.toLowerCase().includes('memory') || feature.toLowerCase().includes('storage') || feature.toLowerCase().includes('data')) return <Database className="h-5 w-5" />;
    if (feature.toLowerCase().includes('connectivity') || feature.toLowerCase().includes('usb') || feature.toLowerCase().includes('ethernet') || feature.toLowerCase().includes('wifi') || feature.toLowerCase().includes('bluetooth')) return <Wifi className="h-5 w-5" />;
    if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('power')) return <Battery className="h-5 w-5" />;
    if (feature.toLowerCase().includes('temperature') || feature.toLowerCase().includes('thermal')) return <Thermometer className="h-5 w-5" />;
    if (feature.toLowerCase().includes('voltage') || feature.toLowerCase().includes('current') || feature.toLowerCase().includes('channels')) return <Zap className="h-5 w-5" />;
    if (feature.toLowerCase().includes('measurement') || feature.toLowerCase().includes('accuracy') || feature.toLowerCase().includes('trms')) return <Gauge className="h-5 w-5" />;
    if (feature.toLowerCase().includes('safety') || feature.toLowerCase().includes('cat') || feature.toLowerCase().includes('ip') || feature.toLowerCase().includes('protection')) return <Shield className="h-5 w-5" />;
    if (feature.toLowerCase().includes('analysis') || feature.toLowerCase().includes('bargraph') || feature.toLowerCase().includes('trend')) return <BarChart className="h-5 w-5" />;
    return <Check className="h-5 w-5" />;
  };

  // Get the brochure link for the current product, do not fallback to T&M brochure
  const brochureLink = brochureLinks[product.id];

  return (
    <>
      <SeoHead
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={`https://atandra.in/measure/digital-multimeters/product/${product.id}`}
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
                  Digital Multimeters
                </h2>
                <p className="typography-h4 text-black">
                  Professional Electrical Measurement Solutions
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
                              navigate(`/measure/digital-multimeters/product/${prod.id}`);
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
                    onClick={() => navigate('/measure/digital-multimeters')}
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
                        <h4 className="font-semibold text-black mb-1">Voltage Range</h4>
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
                      {brochureLink && (
                        <button
                          onClick={() => window.open(brochureLink, '_blank')}
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
                          alt={`KRYKARD ${product.model} - ${product.subtitle} - for Accurate Electrical Measurement`}
                          className="w-full h-auto object-contain mx-auto"
                          width={320}
                          height={240}
                          loading="eager"
                          decoding="async"
                          style={{
                            maxHeight: '450px',
                            maxWidth: '100%',
                            background: 'transparent',
                            mixBlendMode: 'multiply',
                            filter: 'brightness(1.05) contrast(1.05)',
                            opacity: '0.95'
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
                  Our specialists provide comprehensive guidance on digital multimeter solutions
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

export default MultimeterProduct;