import React, { useState, useEffect } from 'react';
import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, BarChart3, ArrowRight, FileText } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from 'framer-motion';

const ProductSpecification = () => {
  const [activeTab, setActiveTab] = useState('features');
  const [hoveredModel, setHoveredModel] = useState(null);

  // Mobile CSS for table functionality with Open Sans font and blue theme
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      /* Universal font family */
      * {
        font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }

      /* Mobile Table CSS */
      .specs-table-container {
        width: 100%;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 12px -2px rgba(0, 0, 0, 0.08);
        background: white;
        border: 1px solid #e5e7eb;
      }

      .specs-table-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: #2563eb #f3f4f6;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 8px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #f3f4f6;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: #2563eb;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb:hover {
        background: #1d4ed8;
      }

      .specs-table {
        width: 100%;
        min-width: 800px;
        border-collapse: collapse;
        background: white;
        font-family: 'Open Sans', sans-serif;
      }

      .specs-table th {
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        color: white;
        font-weight: 700;
        text-align: left;
        padding: 12px 10px;
        font-size: 14px;
        border-bottom: 2px solid #1d4ed8;
        white-space: nowrap;
        position: relative;
        font-family: 'Open Sans', sans-serif;
      }

      .specs-table th:first-child {
        position: sticky;
        left: 0;
        z-index: 10;
        min-width: 200px;
        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
        box-shadow: 2px 0 4px rgba(37, 99, 235, 0.1);
      }

      .specs-table td {
        padding: 10px 8px;
        border-bottom: 1px solid #e5e7eb;
        font-size: 14px;
        color: #000000;
        white-space: nowrap;
        font-family: 'Open Sans', sans-serif;
      }

      .specs-table td:first-child {
        position: sticky;
        left: 0;
        z-index: 5;
        background: inherit;
        font-weight: 600;
        color: #000000;
        box-shadow: 2px 0 4px rgba(37, 99, 235, 0.05);
      }

      .specs-table tbody tr:nth-child(even) {
        background-color: #f9fafb;
      }

      .specs-table tbody tr:nth-child(even) td:first-child {
        background-color: #f9fafb;
      }

      .specs-table tbody tr:nth-child(odd) td:first-child {
        background-color: white;
      }

      .specs-table tbody tr:hover {
        background-color: #f3f4f6;
      }

      .specs-table tbody tr:hover td:first-child {
        background-color: #f3f4f6;
      }

      /* Header row styling */
      .specs-table tbody tr.header-row {
        background-color: #2563eb !important;
      }

      .specs-table tbody tr.header-row td {
        font-weight: 700;
        color: white;
        background-color: #2563eb !important;
        border-top: 2px solid #1d4ed8;
        border-bottom: 2px solid #1d4ed8;
      }

      .specs-table tbody tr.header-row td:first-child {
        background-color: #2563eb !important;
      }

      /* Mobile responsive navigation */
      .tab-navigation {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        justify-content: center;
        padding: 12px;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        margin-bottom: 16px;
      }

      .tab-button {
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: 500;
        transition: all 0.2s;
        border: none;
        cursor: pointer;
        font-size: 14px;
        white-space: nowrap;
      }

      @media (max-width: 768px) {
        .specs-table th {
          padding: 12px 8px;
          font-size: 12px;
        }

        .specs-table td {
          padding: 10px 8px;
          font-size: 12px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 150px;
        }

        .tab-navigation {
          flex-direction: column;
          align-items: stretch;
        }

        .tab-button {
          text-align: center;
          margin: 2px 0;
        }
      }

      @media (max-width: 480px) {
        .specs-table {
          min-width: 600px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 120px;
        }

        .specs-table th {
          padding: 10px 6px;
          font-size: 11px;
        }

        .specs-table td {
          padding: 8px 6px;
          font-size: 11px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Initialize component
  useEffect(() => {
    // Component initialization logic can be added here if needed
  }, []);

  const tabs = [
    { id: 'features', label: 'Features' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'benefits', label: 'Benefits' }
  ];

  const featuresList = [
    { title: 'Wide input voltage range (304 - 480 VAC)', desc: 'Protects against unstable input and extends battery life' },
    { title: 'Extreme low input power with ≥ 0.99 PF', desc: '' },
    { title: 'Industrial design', desc: 'Easy maintenance concept' },
    { title: 'Complete tool-free maintenance with zero functional downtime', desc: 'Easy installation and service' },
    { title: 'Frequency range (45 - 55 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Dual feed capability', desc: 'Provides redundant configuration' },
    { title: 'Parallel capability & high-tier load capacity', desc: '' },
    { title: 'Low MTTR (4.3)', desc: '' },
    { title: 'High MTBF > 250,000 hours', desc: '' },
    { title: 'Online Double conversion with Advanced dual-core DSP technology', desc: 'Full Digital control for highest performance' },
    { title: 'DSP technology with IGBT Rectifier', desc: 'Sinusoidal front-end current consumption' },
    { title: 'Advanced battery management', desc: 'Automatic battery test including deep discharge protection' },
    { title: 'Various software & connectivity options', desc: 'Complete solutions for industrial applications' },
    { title: 'CSA approved (upon requirements with temperature compensation)', desc: '' },
    { title: 'Parallel redundant operation functionality', desc: '' },
    { title: 'Low Operating Cost', desc: '' },
    { title: 'Greater performance with Output Unity Power Factor', desc: '' },
    { title: 'Zero Technical Load', desc: '' },
    { title: 'Compact internal layout', desc: '' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Current Generator Overload due to starting inrush currents', desc: 'Sensitive medical equipment' },
    { title: 'Phase Distortion for high THD options', desc: '' },
    { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Complete emergency coverage mode, Output stable frequency irrespective of input' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes' },
    { title: 'Adaptive frequency output functionality for critical applications', desc: '' },
    { title: 'Power protection concept (with regenerating capability for critical loads)', desc: 'Including wide power sensor under varying load conditions with adjustable response' },
    { title: 'Output frequency freely selectable', desc: 'For sensitive loads and industrial equipment' },
    { title: 'Built-in DC fuses', desc: 'Advance Battery based voltage and analyzer function' },
    { title: 'Built-in internal battery life extender and capacity for redundancy & load stability', desc: '' },
    { title: 'Enhanced bypass fix', desc: '' },
    { title: 'Protection against Short-Circuit, Overload, Over temperature, Surge protection, Voltage, Var control & Output for Safety', desc: '' },
    { title: 'High efficiency - Upto 96% in Offline mode, 95% in Online mode', desc: '' },
    { title: 'Reduction in carbon footprint', desc: '' },
    { title: 'Maximum utilization of UPS capacity', desc: '' },
    { title: 'Better efficiency related to lower heat, saving up to 40%', desc: '' },
    { title: 'Convenient floor space', desc: '' }
  ];

  const benefitsList = [
    {
      title: 'High Uptime / Availability',
      desc: 'Ensures your critical systems remain operational with minimal to zero interruption, delivering maximum operational continuity.'
    },
    {
      title: 'High Flexibility',
      desc: 'Adapts to various configurations and settings, supporting a wide range of devices and operational environments.'
    },
    {
      title: 'High Reliability',
      desc: 'Engineered with premium components and advanced protection systems to ensure consistent and dependable performance.'
    },
    {
      title: 'Low Total Cost of Ownership (TCO)',
      desc: 'Combines energy efficiency, extended lifespan, and reduced maintenance requirements to minimize long-term costs.'
    }
  ];

  const specifications = [
    { category: 'MODEL', model1: 'HX - 40', model2: 'HX - 60', model3: 'HX - 80', model4: 'HX - 100', model5: 'HX - 120', model6: 'HX - 160', model7: 'HX - 200', model8: 'HX - 250', model9: 'HX - 300' },
    { category: 'Rated Capacity', model1: '40 kVA / 40 kW', model2: '60 kVA / 60 kW', model3: '80 kVA / 80 kW', model4: '100 kVA / 100 kW', model5: '120 kVA / 120 kW', model6: '160 kVA / 160 kW', model7: '200 kVA / 200 kW', model8: '250 kVA / 250 kW', model9: '300 kVA / 300 kW' },
    { category: 'INPUT', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Input Wiring', model1: 'Three-phase four-wire (3Ph + N + PE)', model2: 'Three-phase four-wire (3Ph + N + PE)', model3: 'Three-phase four-wire (3Ph + N + PE)', model4: 'Three-phase four-wire (3Ph + N + PE)', model5: 'Three-phase four-wire (3Ph + N + PE)', model6: 'Three-phase four-wire (3Ph + N + PE)', model7: 'Three-phase four-wire (3Ph + N + PE)', model8: 'Three-phase four-wire (3Ph + N + PE)', model9: 'Three-phase four-wire (3Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model2: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model3: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model4: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model5: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model6: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model7: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model8: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)', model9: '380 / 400 / 415 VAC (providing 50% or 70% power if one phase is lost)' },
    { category: 'Voltage Range', model1: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model2: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model3: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model4: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model5: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model6: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model7: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model8: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load', model9: 'Single operating between -15% ~ +20% full load; -40% ~ +15% half-load' },
    { category: 'Rated Frequency', model1: '50 / 60 Hz', model2: '50 / 60 Hz', model3: '50 / 60 Hz', model4: '50 / 60 Hz', model5: '50 / 60 Hz', model6: '50 / 60 Hz', model7: '50 / 60 Hz', model8: '50 / 60 Hz', model9: '50 / 60 Hz' },
    { category: 'Frequency Range', model1: '40 - 70 Hz', model2: '40 - 70 Hz', model3: '40 - 70 Hz', model4: '40 - 70 Hz', model5: '40 - 70 Hz', model6: '40 - 70 Hz', model7: '40 - 70 Hz', model8: '40 - 70 Hz', model9: '40 - 70 Hz' },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99', model3: '≥ 0.99', model4: '≥ 0.99', model5: '≥ 0.99', model6: '≥ 0.99', model7: '≥ 0.99', model8: '≥ 0.99', model9: '≥ 0.99' },
    { category: 'Current start of Rectifier', model1: '≤ 3C rms', model2: '≤ 3C rms', model3: '≤ 3C rms', model4: '≤ 3C rms', model5: '≤ 3C rms', model6: '≤ 3C rms', model7: '≤ 3C rms', model8: '≤ 3C rms', model9: '≤ 3C rms' },
    { category: 'OUTPUT', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Output Wiring', model1: 'Three-phase four-wire (3Ph + N + PE)', model2: 'Three-phase four-wire (3Ph + N + PE)', model3: 'Three-phase four-wire (3Ph + N + PE)', model4: 'Three-phase four-wire (3Ph + N + PE)', model5: 'Three-phase four-wire (3Ph + N + PE)', model6: 'Three-phase four-wire (3Ph + N + PE)', model7: 'Three-phase four-wire (3Ph + N + PE)', model8: 'Three-phase four-wire (3Ph + N + PE)', model9: 'Three-phase four-wire (3Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC', model2: '380 / 400 / 415 VAC', model3: '380 / 400 / 415 VAC', model4: '380 / 400 / 415 VAC', model5: '380 / 400 / 415 VAC', model6: '380 / 400 / 415 VAC', model7: '380 / 400 / 415 VAC', model8: '380 / 400 / 415 VAC', model9: '380 / 400 / 415 VAC' },
    { category: 'Voltage Regulation', model1: '± 1%', model2: '± 1%', model3: '± 1%', model4: '± 1%', model5: '± 1%', model6: '± 1%', model7: '± 1%', model8: '± 1%', model9: '± 1%' },
    { category: 'Frequency', model1: '50 / 60 Hz (± 0.1% in battery mode)', model2: '50 / 60 Hz (± 0.1% in battery mode)', model3: '50 / 60 Hz (± 0.1% in battery mode)', model4: '50 / 60 Hz (± 0.1% in battery mode)', model5: '50 / 60 Hz (± 0.1% in battery mode)', model6: '50 / 60 Hz (± 0.1% in battery mode)', model7: '50 / 60 Hz (± 0.1% in battery mode)', model8: '50 / 60 Hz (± 0.1% in battery mode)', model9: '50 / 60 Hz (± 0.1% in battery mode)' },
    { category: 'Waveform', model1: 'Sinusoidal', model2: 'Sinusoidal', model3: 'Sinusoidal', model4: 'Sinusoidal', model5: 'Sinusoidal', model6: 'Sinusoidal', model7: 'Sinusoidal', model8: 'Sinusoidal', model9: 'Sinusoidal' },
    { category: 'Power Factor', model1: '1.0', model2: '1.0', model3: '1.0', model4: '1.0', model5: '1.0', model6: '1.0', model7: '1.0', model8: '1.0', model9: '1.0' },
    { category: 'Total Harmonic Distortion (THDv)', model1: '< 2% (linear load), < 5% (non-linear load)', model2: '< 2% (linear load), < 5% (non-linear load)', model3: '< 2% (linear load), < 5% (non-linear load)', model4: '< 2% (linear load), < 5% (non-linear load)', model5: '< 2% (linear load), < 5% (non-linear load)', model6: '< 2% (linear load), < 5% (non-linear load)', model7: '< 2% (linear load), < 5% (non-linear load)', model8: '< 2% (linear load), < 5% (non-linear load)', model9: '< 2% (linear load), < 5% (non-linear load)' },
    { category: 'Transfer Time', model1: '0 ms', model2: '0 ms', model3: '0 ms', model4: '0 ms', model5: '0 ms', model6: '0 ms', model7: '0 ms', model8: '0 ms', model9: '0 ms' },
    { category: 'Transient Overload Capability', model1: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model2: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model3: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model4: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model5: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model6: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model7: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model8: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms', model9: '110% for 60 min, 125% for 10 min, 150% for 1 min, 150% for 0.5 min, >200% for 200ms' },
    { category: 'BATTERIES', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'DC Voltage', model1: '±240 VDC', model2: '±240 VDC', model3: '±240 VDC', model4: '±240 VDC', model5: '±240 VDC', model6: '±240 VDC', model7: '±240 VDC', model8: '±240 VDC', model9: '±240 VDC' },
    { category: 'No. of Batteries', model1: '40 (20+20) 40 monoblocks', model2: '40 (20+20) 40 monoblocks', model3: '40 (20+20) 40 monoblocks', model4: '40 (20+20) 40 monoblocks', model5: '40 (20+20) 40 monoblocks', model6: '30 (10+10) 33 monoblocks', model7: '30 (10+10) 33 monoblocks', model8: '30 (10+10) 33 monoblocks', model9: '30 (10+10) 33 monoblocks' },
    { category: 'Charging Current', model1: 'Charging current controlled by battery capacity, max/min charging current adjustable', model2: 'Charging current controlled by battery capacity, max/min charging current adjustable', model3: 'Charging current controlled by battery capacity, max/min charging current adjustable', model4: 'Charging current controlled by battery capacity, max/min charging current adjustable', model5: 'Charging current controlled by battery capacity, max/min charging current adjustable', model6: 'Charging current controlled by battery capacity, max/min charging current adjustable', model7: 'Charging current controlled by battery capacity, max/min charging current adjustable', model8: 'Charging current controlled by battery capacity, max/min charging current adjustable', model9: 'Charging current controlled by battery capacity, max/min charging current adjustable' },
    { category: 'Battery Soft-Test', model1: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model2: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model3: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model4: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model5: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model6: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model7: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model8: 'Cyclic, periodic, self-test, manually configurable test time and voltage', model9: 'Cyclic, periodic, self-test, manually configurable test time and voltage' },
    { category: 'DISPLAY', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Efficiency', model1: '> 94% in Line mode, > 95% in ECO mode', model2: '> 94% in Line mode, > 95% in ECO mode', model3: '> 94% in Line mode, > 95% in ECO mode', model4: '> 94% in Line mode, > 95% in ECO mode', model5: '> 94% in Line mode, > 95% in ECO mode', model6: '> 96% in Line mode, > 98% in ECO mode', model7: '> 96% in Line mode, > 98% in ECO mode', model8: '> 96% in Line mode, > 98% in ECO mode', model9: '> 96% in Line mode, > 98% in ECO mode' },
    { category: 'Max. no. of Parallel Connections', model1: '8', model2: '8', model3: '8', model4: '8', model5: '8', model6: '8', model7: '8', model8: '8', model9: '8' },
    { category: 'Protection', model1: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model2: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model3: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model4: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model5: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model6: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model7: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model8: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure', model9: 'Short - circuit, Over load, Over temperature, Battery low voltage, Over voltage, Under voltage, Fan failure' },
    { category: 'Communications', model1: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model2: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model3: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model4: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model5: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model6: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model7: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model8: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.', model9: 'Standard configuration: RS232, RS485, Dry contact, Modbus and Intelligent configuration: SNMP/USB/AS400/Dry contact/ModBus RTU etc.' },
    { category: 'IP rating', model1: 'IP 20', model2: 'IP 20', model3: 'IP 20', model4: 'IP 20', model5: 'IP 20', model6: 'IP 20', model7: 'IP 20', model8: 'IP 20', model9: 'IP 20' },
    { category: 'Display', model1: '7 inches LCD touch screen', model2: '7 inches LCD touch screen', model3: '7 inches LCD touch screen', model4: '7 inches LCD touch screen', model5: '7 inches LCD touch screen', model6: '7 inches LCD touch screen', model7: '7 inches LCD touch screen', model8: '7 inches LCD touch screen', model9: '7 inches LCD touch screen' },
    { category: 'OTHERS', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C', model3: '0°C ~ 40°C', model4: '0°C ~ 40°C', model5: '0°C ~ 40°C', model6: '0°C ~ 40°C', model7: '0°C ~ 40°C', model8: '0°C ~ 40°C', model9: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)', model3: '-25°C ~ 55°C (without battery)', model4: '-25°C ~ 55°C (without battery)', model5: '-25°C ~ 55°C (without battery)', model6: '-25°C ~ 55°C (without battery)', model7: '-25°C ~ 55°C (without battery)', model8: '-25°C ~ 55°C (without battery)', model9: '-25°C ~ 55°C (without battery)' },
    { category: 'Relative Humidity', model1: '0% ~ 95% (non-condensing)', model2: '0% ~ 95% (non-condensing)', model3: '0% ~ 95% (non-condensing)', model4: '0% ~ 95% (non-condensing)', model5: '0% ~ 95% (non-condensing)', model6: '0% ~ 95% (non-condensing)', model7: '0% ~ 95% (non-condensing)', model8: '0% ~ 95% (non-condensing)', model9: '0% ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000 m, derating 1% for each additional 100 m', model2: '< 1000 m, derating 1% for each additional 100 m', model3: '< 1000 m, derating 1% for each additional 100 m', model4: '< 1000 m, derating 1% for each additional 100 m', model5: '< 1000 m, derating 1% for each additional 100 m', model6: '< 2000 m, above 1000 m derating 1% for each additional 100 m', model7: '< 2000 m, above 1000 m derating 1% for each additional 100 m', model8: '< 2000 m, above 1000 m derating 1% for each additional 100 m', model9: '< 2000 m, above 1000 m derating 1% for each additional 100 m' },
    { category: 'PHYSICAL', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Dimension (W × D × H) (mm)', model1: '600 × 900 × 1660', model2: '600 × 900 × 1660', model3: '600 × 900 × 1660', model4: '800 × 850 × 1800', model5: '800 × 850 × 1800', model6: '800 × 880 × 1960', model7: '1200 × 850 × 1960', model8: '1200 × 850 × 1960', model9: '1200 × 850 × 1960' },
    { category: 'Net Weight (kg)', model1: '270', model2: '320', model3: '370', model4: '520', model5: '550', model6: '720', model7: '1000', model8: '1100', model9: '1250' }
  ];

  // Memoize the renderContent function to prevent unnecessary re-renders
  const renderContent = React.useCallback(() => {
    switch (activeTab) {
      case 'features':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {featuresList.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 md:p-3 rounded-full flex-shrink-0">
                    <Check size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-blue-600 mb-2 md:mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h4>
                    {feature.desc && <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'advantages':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {advantagesList.map((advantage, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                {/* Decorative gradient accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-blue-600"></div>

                <div className="flex items-start gap-3 md:gap-4">
                  <div className="mt-1 text-blue-600 bg-blue-50 p-2 md:p-3 rounded-full flex-shrink-0">
                    <ArrowUpRight size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-base md:text-lg text-blue-600 mb-2 md:mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.title}</h4>
                    {advantage.desc && <p className="text-black text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>{advantage.desc}</p>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        );
      case 'benefits':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
            {benefitsList.map((benefit, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[200px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 15px 25px -5px rgba(37, 99, 235, 0.1)"
                }}
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4 md:mb-6">
                    <div className="text-blue-600 bg-blue-50 p-3 md:p-4 rounded-lg w-fit">
                      <Award size={24} className="text-blue-600" />
                    </div>
                    <h3 className="font-bold text-xl md:text-2xl text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.title}</h3>
                  </div>

                  <p className="text-black text-sm md:text-base mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        );
      default:
        return null;
    }
  }, [activeTab]); // Only re-create this function when activeTab changes

  // Stats for Key Features Section
  const keyStats = [
    { value: "98", suffix: "%", title: "Efficiency", icon: <Zap size={24} /> },
    { value: "8", suffix: "", title: "Parallel Units", icon: <Clock size={24} /> },
    { value: "1.0", suffix: "", title: "Power Factor", icon: <BarChart3 size={24} /> },
    { value: "300", suffix: "kVA", title: "Maximum Capacity", icon: <Shield size={24} /> }
  ];

  // PDF URL is directly used in the links

  const ProductSpecContent = () => (
    <div className="w-full mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Hero Section with Proper Spacing */}
      <section className="py-8 md:py-12 relative overflow-hidden">
        {/* Background elements - removed for clean design */}
        <div className="absolute inset-0 bg-white z-0"></div>

        <div className="relative z-10 px-4 max-w-7xl mx-auto">
          <motion.div
            className="text-center p-6 md:p-8 overflow-hidden relative mb-10 md:mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative z-10">
              <motion.h1
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 md:mb-6 text-blue-600"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                KRYKARD HX SERIES <span className="text-blue-600">3/3 UPS</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-black"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                40 kVA to 300 kVA - Industrial-grade three-phase power protection
              </motion.p>

              <motion.div
                className="bg-blue-600 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg inline-block shadow-lg text-sm md:text-base"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                whileHover={{
                  y: -5,
                  boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.5)",
                  scale: 1.05
                }}
                whileTap={{ scale: 0.98 }}
              >
                ONLINE DOUBLE CONVERSION WITH INBUILT ISOLATION TRANSFORMER
              </motion.div>
            </div>
          </motion.div>

          {/* Hero Content Area with Better Spacing */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16">
            {/* Left side: Enhanced Content */}
            <motion.div
              className="space-y-6 md:space-y-8 px-4 md:px-0"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Industrial-Grade Power Protection</h2>
                <div className="h-1 w-24 bg-blue-600 rounded-full mb-4 md:mb-6"></div>
                <p className="text-base md:text-lg text-black leading-relaxed" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  The KRYKARD HX Series is engineered for the most demanding industrial environments, delivering uncompromising three-phase power protection with inbuilt isolation transformer to handle challenging and regenerative loads.
                </p>
              </motion.div>

              <motion.div
                className="mt-4 md:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ideal for:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Heavy Manufacturing & Industrial Environments",
                    "Oil & Gas Facilities",
                    "Research & Testing Laboratories",
                    "Infrastructure & Processing Plants",
                    "Defense & Security Applications"
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center group"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <span className="text-black font-medium text-sm md:text-base" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                        • {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 mt-6 md:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.a
                  href="/contact/sales"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 sm:w-1/2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Request Quote</span>
                  <ArrowRight size={18} />
                </motion.a>

                <motion.a
                  href="/Krykard Online UPS January 2025. (1).pdf"
                  target="_blank"
                  rel="noopener noreferrer  nofollow"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-1/2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <FileText size={18} />
                  <span>UPS Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>
            {/* Right side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean UPS image */}
                <motion.img
                  src="/UPS/1-removebg-preview.png"
                  alt="HX Series UPS"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Key Performance Metrics Section with Proper Spacing */}
          <div className="mb-16 md:mb-20 relative">
            <motion.div
              className="text-center mb-12 md:mb-16 relative z-10"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
              >
                Key Performance Metrics
              </motion.h2>
              <motion.div
                className="h-1 w-32 bg-blue-600 mx-auto rounded-full mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-base md:text-lg text-black max-w-3xl mx-auto"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Exceptional specifications that define the HX Series as the premium choice for mission-critical power protection
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 relative z-10 px-4 md:px-0">
              {keyStats.map((stat, index) => {
                const descriptions = [
                  "Maximum power output capacity with unity power factor for full rated power",
                  "Connect up to 8 units in parallel for increased capacity or redundancy",
                  "Reduces operational costs and environmental impact",
                  "Industry-leading reliability for mission-critical applications"
                ];

                return (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-lg overflow-hidden relative group min-h-[200px] md:min-h-[240px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -8,
                      boxShadow: "0 15px 30px -5px rgba(37, 99, 235, 0.15)"
                    }}
                  >
                    {/* Top gradient bar */}
                    <div className="h-2 w-full bg-blue-600"></div>

                    <div className="p-6 md:p-8 h-full flex flex-col">
                      <div className="flex flex-col items-center text-center relative z-10 h-full">
                        {/* Icon with proper spacing */}
                        <motion.div
                          className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 md:mb-6 shadow-sm"
                          whileHover={{ scale: 1.1 }}
                          transition={{ type: "spring", stiffness: 300, damping: 10 }}
                        >
                          {React.cloneElement(stat.icon, { size: 28 })}
                        </motion.div>

                        {/* Feature value */}
                        <motion.div
                          className="mb-3 md:mb-4 text-center"
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <div className="flex items-center justify-center">
                            <motion.span
                              className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600"
                              style={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                              {stat.value}
                            </motion.span>
                            <motion.span
                              className="text-xl md:text-2xl font-bold text-blue-600 ml-1"
                              style={{ fontFamily: 'Open Sans, sans-serif' }}
                            >
                              {stat.suffix}
                            </motion.span>
                          </div>
                        </motion.div>

                        <h3 className="text-base md:text-lg font-bold text-blue-600 mb-3 md:mb-4" style={{ fontFamily: 'Open Sans, sans-serif' }}>{stat.title}</h3>

                        {/* Description */}
                        <p className="text-black text-sm mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                          {descriptions[index]}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>


          </div>
        </div>
      </section>

      {/* Tabs Section with Proper Spacing */}
      <section className="max-w-7xl mx-auto px-4 mb-16 md:mb-20">
        {/* Tab Buttons with Better Spacing */}
        <div className="flex flex-wrap justify-center mb-10 md:mb-12">
          {tabs.map(tab => {
            // Simple click handler without useCallback
            const handleClick = () => {
              setActiveTab(tab.id);
            };

            return (
              <motion.button
                key={tab.id}
                className={`relative py-3 md:py-4 px-6 md:px-8 font-medium text-base md:text-lg transition-all duration-300 mx-1 md:mx-2 mb-3 md:mb-4 ${activeTab === tab.id
                    ? 'text-blue-600 font-bold'
                    : 'text-gray-700 hover:text-blue-600'
                  }`}
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                onClick={handleClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 rounded-full"
                    layoutId="underline"
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>

        {/* Tab Content Container with Better Spacing */}
        <div className="p-8 md:p-12 bg-white rounded-lg shadow-lg border border-blue-100">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="min-h-[400px]"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Technical Specifications Section with Proper Spacing */}
      <section className="max-w-full mx-auto px-2 mb-20 md:mb-24">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Technical Specifications</h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Comprehensive technical details for the HX Series UPS line
          </p>
        </motion.div>

        {/* Interactive Table with Mobile-Optimized Design */}
        <motion.div
          className="specs-table-container mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Mobile Table Instruction */}
          <div className="md:hidden bg-gray-50 p-3 text-black text-sm font-medium flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Swipe horizontally to view all specifications
          </div>

          <div className="specs-table-scroll">
            <table className="specs-table">
              <thead>
                <tr>
                  <th>SPECIFICATIONS</th>
                  {specifications[0].model1 && (
                    <th
                      className={hoveredModel === 'model1' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model1')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model1}
                    </th>
                  )}
                  {specifications[0].model2 && (
                    <th
                      className={hoveredModel === 'model2' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model2')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model2}
                    </th>
                  )}
                  {specifications[0].model3 && (
                    <th
                      className={hoveredModel === 'model3' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model3')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model3}
                    </th>
                  )}
                  {specifications[0].model4 && (
                    <th
                      className={hoveredModel === 'model4' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model4')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model4}
                    </th>
                  )}
                  {specifications[0].model5 && (
                    <th
                      className={hoveredModel === 'model5' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model5')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model5}
                    </th>
                  )}
                  {specifications[0].model6 && (
                    <th
                      className={hoveredModel === 'model6' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model6')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model6}
                    </th>
                  )}
                  {specifications[0].model7 && (
                    <th
                      className={hoveredModel === 'model7' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model7')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model7}
                    </th>
                  )}
                  {specifications[0].model8 && (
                    <th
                      className={hoveredModel === 'model8' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model8')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model8}
                    </th>
                  )}
                  {specifications[0].model9 && (
                    <th
                      className={hoveredModel === 'model9' ? 'opacity-75' : ''}
                      onMouseEnter={() => setHoveredModel('model9')}
                      onMouseLeave={() => setHoveredModel(null)}
                    >
                      {specifications[0].model9}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {specifications.slice(1).map((spec, index) => {
                  const isHeaderRow = spec.category.includes('INPUT') ||
                    spec.category.includes('OUTPUT') ||
                    spec.category.includes('BATTERIES') ||
                    spec.category.includes('DISPLAY') ||
                    spec.category.includes('OTHERS') ||
                    spec.category.includes('PHYSICAL');

                  return (
                    <tr key={index} className={isHeaderRow ? 'header-row' : ''}>
                      <td>{spec.category}</td>
                      {spec.model1 !== undefined && (
                        <td className={hoveredModel === 'model1' ? 'bg-gray-100' : ''}>
                          {spec.model1}
                        </td>
                      )}
                      {spec.model2 !== undefined && (
                        <td className={hoveredModel === 'model2' ? 'bg-gray-100' : ''}>
                          {spec.model2}
                        </td>
                      )}
                      {spec.model3 !== undefined && (
                        <td className={hoveredModel === 'model3' ? 'bg-gray-100' : ''}>
                          {spec.model3}
                        </td>
                      )}
                      {spec.model4 !== undefined && (
                        <td className={hoveredModel === 'model4' ? 'bg-gray-100' : ''}>
                          {spec.model4}
                        </td>
                      )}
                      {spec.model5 !== undefined && (
                        <td className={hoveredModel === 'model5' ? 'bg-gray-100' : ''}>
                          {spec.model5}
                        </td>
                      )}
                      {spec.model6 !== undefined && (
                        <td className={hoveredModel === 'model6' ? 'bg-gray-100' : ''}>
                          {spec.model6}
                        </td>
                      )}
                      {spec.model7 !== undefined && (
                        <td className={hoveredModel === 'model7' ? 'bg-gray-100' : ''}>
                          {spec.model7}
                        </td>
                      )}
                      {spec.model8 !== undefined && (
                        <td className={hoveredModel === 'model8' ? 'bg-gray-100' : ''}>
                          {spec.model8}
                        </td>
                      )}
                      {spec.model9 !== undefined && (
                        <td className={hoveredModel === 'model9' ? 'bg-gray-100' : ''}>
                          {spec.model9}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>

      {/* Key Features Highlight Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Key Highlights</h2>
          <div className="h-1.5 w-40 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-blue-800 max-w-3xl mx-auto">
            Advanced features that make the HX Series the ultimate choice for industrial power protection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 px-4 md:px-0">
          {[
            {
              title: "Inbuilt Isolation Transformer",
              description: "Provides galvanic isolation between input and output, ensuring complete protection against electrical noise, transients, and voltage fluctuations.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              ),
              details: [
                { label: "Protection Level", value: "Galvanic isolation" },
                { label: "Benefit", value: "Enhanced protection for sensitive equipment" }
              ],
              gradient: "from-blue-600 to-blue-700"
            },
            {
              title: "Regenerative Load Handling",
              description: "Designed to handle regenerative loads that feed energy back into the power system, ideal for industrial applications with motor braking or energy recovery systems.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              ),
              details: [
                { label: "Application Types", value: "Motor drives, CNC machines" },
                { label: "Compatibility", value: "Elevator systems, industrial equipment" }
              ],
              gradient: "from-blue-500 to-blue-600"
            },
            {
              title: "Advanced Parallel Operation",
              description: "Connect up to 8 units in parallel for increased capacity or redundancy, with seamless load sharing and synchronized operation for mission-critical applications.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              ),
              details: [
                { label: "Parallel Capacity", value: "Up to 8 units" },
                { label: "Configuration", value: "N+X redundancy support" }
              ],
              gradient: "from-blue-600 to-blue-700"
            },
            {
              title: "Industrial-Grade Design",
              description: "Engineered specifically for harsh industrial environments with tool-free maintenance, front access design, and robust construction for durability and reliability.",
              icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              ),
              details: [
                { label: "Design Features", value: "Tool-free maintenance" },
                { label: "Reliability", value: "High MTBF 250,000 hours" }
              ],
              gradient: "from-blue-500 to-blue-600"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="group relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            >
              {/* Card with gradient header and white body */}
              <div className="flex flex-col h-full">
                {/* Header with icon */}
                <div className={`bg-gradient-to-r ${feature.gradient} p-6 flex items-center`}>
                  <div className="bg-white/20 p-3 rounded-lg mr-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white">{feature.title}</h3>
                </div>

                {/* Body with description and details */}
                <div className="bg-white p-6 flex-grow">
                  <p className="text-blue-800 mb-6 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Details section */}
                  <div className="bg-blue-50 rounded-lg p-4">
                    {feature.details.map((detail, idx) => (
                      <div key={idx} className="flex justify-between items-center mb-2 last:mb-0">
                        <span className="font-medium text-blue-700">{detail.label}:</span>
                        <span className="text-blue-600">{detail.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </motion.div>
          ))}
        </div>

        {/* Additional features in smaller cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-10 px-4 md:px-0">
          {[
            { title: "Unity Power Factor", value: "1.0", description: "Full rated power capacity" },
            { title: "Wide Input Range", value: "304-480V", description: "Handles unstable power conditions" },
            { title: "High Efficiency", value: "Up to 96%", description: "Lower heat and energy costs" },
            { title: "Advanced DSP Control", value: "Dual-core", description: "Superior performance and reliability" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl shadow-md overflow-hidden border border-blue-100"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 15px 30px -5px rgba(59, 130, 246, 0.3)" }}
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-bold text-blue-800">{item.title}</h4>
                  <div className="bg-blue-100 text-blue-600 font-bold px-3 py-1 rounded-full text-sm">
                    {item.value}
                  </div>
                </div>
                <p className="text-blue-700 text-sm">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Areas */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Ideal Applications</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-blue-800 max-w-2xl mx-auto">
            Engineered for mission-critical environments where power reliability is essential
          </p>
        </motion.div>

        {/* Application cards with enhanced design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 px-4 md:px-0">
          {[
            {
              icon: "🏭",
              title: "Heavy Manufacturing",
              description: "Reliable protection for industrial environments with motors, CNC machines, and variable frequency drives"
            },
            {
              icon: "🔧",
              title: "Oil & Gas Facilities",
              description: "Ensures continuous power for control systems, pumping stations, refineries, and offshore platforms"
            },
            {
              icon: "🔐",
              title: "Defense & Security",
              description: "Uninterrupted power for command centers and critical infrastructure with isolation from the grid"
            },
            {
              icon: "🔬",
              title: "Research Labs",
              description: "Clean, stable power for sensitive equipment and experiments requiring precise conditions"
            },
            {
              icon: "🏥",
              title: "Healthcare Facilities",
              description: "Life-saving power protection for critical medical equipment and hospital systems"
            },
            {
              icon: "🖥️",
              title: "Data Centers",
              description: "Ensures zero downtime for mission-critical servers and networking infrastructure"
            },
            {
              icon: "⚡",
              title: "Power Utilities",
              description: "Reliable backup for control systems and critical infrastructure in power generation"
            },
            {
              icon: "🏗️",
              title: "Infrastructure",
              description: "Dependable power for transportation systems, water treatment, and public utilities"
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -5 }}
            >
              {/* Gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/80 to-blue-800/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>

              {/* White background with subtle pattern */}
              <div className="absolute inset-0 bg-white">
                <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]"></div>
              </div>

              <div className="relative z-20 p-6 h-full flex flex-col">
                {/* Icon with animation */}
                <motion.div
                  className="text-4xl mb-4 text-blue-600 group-hover:text-white transition-colors duration-300"
                  animate={{
                    y: [0, -5, 0],
                    rotate: [-3, 3, -3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: idx * 0.2
                  }}
                >
                  {item.icon}
                </motion.div>

                {/* Title and description */}
                <h3 className="text-lg font-bold text-blue-800 mb-2 group-hover:text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-blue-700 text-sm group-hover:text-blue-100 transition-colors duration-300">
                  {item.description}
                </p>

                {/* Subtle arrow that appears on hover */}
                <div className="mt-auto pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                  <ArrowRight size={16} className="ml-auto transform translate-x-0 group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>


      </section>

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left side - Content */}
              <div className="p-8 md:p-12 lg:p-16 bg-blue-50">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Ready for Industrial-Grade Power Protection?
                </h2>

                <p className="text-black mb-8 md:mb-10 text-base md:text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Our HX Series UPS solutions provide reliable three-phase power protection with inbuilt isolation transformer for your mission-critical systems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <motion.a
                    href="/contact/sales"
                    className="bg-blue-600 text-white shadow-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium flex items-center justify-center gap-2 group text-sm md:text-base sm:w-1/2"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span>Contact Our Experts</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>

                  <motion.a
                    href="/Krykard Online UPS January 2025. (1).pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium flex items-center justify-center gap-2 text-sm md:text-base sm:w-1/2"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <FileText size={18} />
                    <span>UPS Brochure</span>
                  </motion.a>
                </div>
              </div>

              {/* Right side - Blue section with icon */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 lg:p-16 flex flex-col items-center justify-center text-white">
                <motion.div
                  className="text-6xl mb-8"
                  animate={{
                    y: [0, -10, 0],
                    rotate: [-5, 5, -5]
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  ⚡
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Premium Power Protection</h3>
                <p className="text-blue-100 text-center text-base md:text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Engineered for mission-critical applications requiring the highest level of power reliability
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </section>


    </div>
  );

  // Return PageLayout component with the product specification content inside
  return (
    <PageLayout
      title="KRYKARD HX Series Industrial UPS"
      subtitle="Three-phase power protection with isolation transformer for demanding environments"
      category="protect"
      image="/background_images/ups_layout.png"
    >
      <ProductSpecContent />
    </PageLayout>
  );
};

export default ProductSpecification;