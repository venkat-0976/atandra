import React, { useState, useEffect } from 'react';
import { ChevronRight, Info, Check, ArrowUpRight, Award, Zap, Shield, Clock, BarChart3, ArrowRight, FileText } from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TabsNoRefresh, Tab } from '@/components/ui/TabsNoRefresh';


const ProductSpecification = () => {
  const [hoveredModel, setHoveredModel] = useState(null);
  const [showPdfViewer, setShowPdfViewer] = useState(false);

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

  // Custom model selection handler
  const handleModelChange = (modelKey: string | null) => {
    setHoveredModel(modelKey);
  };

  const featuresList = [
    { title: 'Wide input voltage range (304 - 478 VAC)', desc: 'Protects against unstable input and extends battery life' },
    { title: 'Industrial design and & function that can withstand harsh conditions', desc: '' },
    { title: 'Complete tool-free maintenance', desc: 'Easy installation and service' },
    { title: 'Frequency range (45 - 55 Hz / 55 - 65 Hz)', desc: 'Immune to unstable sources' },
    { title: 'Scalable system module', desc: 'Provides redundant configuration' },
    { title: 'Parallel capability', desc: 'Ideal for high-tier load applications' },
    { title: 'High MTBF > 300000 hours', desc: '' },
    { title: 'Online Double conversion with Advanced dual core DSP control', desc: 'Full Digital control for highest performance' },
    { title: 'Modular controlling through IGBT', desc: 'Built-in electronic protection' },
    { title: 'Advanced battery management', desc: 'Automatic battery test including deep discharge protection' },
    { title: 'Various software & connectivity options', desc: 'Complete solutions for industrial applications' },
    { title: 'Universal communications interface', desc: '' },
    { title: 'Low Operating Cost', desc: '' },
    { title: 'Greater performance with Output Unity Power Factor', desc: '' },
    { title: 'Zero Technical Load', desc: '' }
  ];

  const advantagesList = [
    { title: 'Maintenance Bypass Switch (optional)', desc: 'Inbuilt Battery Cabinet' },
    { title: 'Current Generator Overload due to starting inrush currents', desc: 'Sensitive medical equipment' },
    { title: 'Phase Isolation for high THD', desc: '' },
    { title: 'On-line double conversion & full Digital Frequency Converter', desc: 'Complete emergency coverage mode. Output stable frequency irrespective of input' },
    { title: 'Built-in system protection diagnostic', desc: 'SNMP / USB Option compatibility' },
    { title: 'Advance backfeed protection circuit design', desc: 'Various operating modes' },
    { title: 'Separate isolation transformer access', desc: '' },
    { title: 'Power protection concept (with regenerating capability for critical loads)', desc: 'Including wide power sensor under varying load conditions with adjustable response' },
    { title: 'Output frequency freely selectable', desc: 'For sensitive loads and industrial equipment' },
    { title: 'Built-in DC fuses', desc: 'Advance Battery monitoring in graphic display' },
    { title: 'Built-in internal battery life expander and capability for redundancy & load stability', desc: '' },
    { title: 'Short circuit limitation', desc: '' },
    { title: 'Comprehensive protective devices', desc: 'Protection against Input-output, Overvoltage/ Undervoltage, Surge/Spikes, Lightning protection' },
    { title: 'Highest possible efficiency', desc: 'Higher efficiency - Up to 96% in ECO mode & Online 95% Safety' },
    { title: 'High efficiency - Upto 96% in Offline mode, 95% in Online mode', desc: '' },
    { title: 'Reduction in carbon footprint', desc: '' },
    { title: 'Maximum utilization of UPS capacity', desc: '' },
    { title: 'Better efficiency related to lower heat, saving up to 40%', desc: '' },
    { title: 'Reduction floor space', desc: '' }
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
    { category: 'MODEL', model1: 'SX - 10', model2: 'SX - 15', model3: 'SX - 20', model4: 'SX - 30', model5: 'SX - 40', model6: 'SX - 60', model7: 'SX - 80', model8: 'SX - 100', model9: 'SX - 120' },
    { category: 'Rated Capacity', model1: '10 kVA / 9 kW', model2: '15 kVA / 13.5 kW', model3: '20 kVA / 18 kW', model4: '30 kVA / 27 kW', model5: '40 kVA / 36 kW', model6: '60 kVA / 54 kW', model7: '80 kVA / 72 kW', model8: '100 kVA / 90 kW', model9: '120 kVA / 108 kW' },
    { category: 'INPUT', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Phase', model1: 'Three phase (three-wire) (3Ph + PE)', model2: 'Three phase (three-wire) (3Ph + PE)', model3: 'Three phase (three-wire) (3Ph + PE)', model4: 'Three phase (three-wire) (3Ph + PE)', model5: 'Three phase (three-wire) (3Ph + PE)', model6: 'Three phase (three-wire) (3Ph + PE)', model7: 'Three phase (three-wire) (3Ph + PE)', model8: 'Three phase (three-wire) (3Ph + PE)', model9: 'Three phase (three-wire) (3Ph + PE)' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC', model2: '380 / 400 / 415 VAC', model3: '380 / 400 / 415 VAC', model4: '380 / 400 / 415 VAC', model5: '380 / 400 / 415 VAC', model6: '380 / 400 / 415 VAC', model7: '380 / 400 / 415 VAC', model8: '380 / 400 / 415 VAC', model9: '380 / 400 / 415 VAC' },
    { category: 'Voltage Range', model1: '304 ~ 478 VAC', model2: '304 ~ 478 VAC', model3: '304 ~ 478 VAC', model4: '304 ~ 478 VAC', model5: '304 ~ 478 VAC', model6: '304 ~ 478 VAC', model7: '304 ~ 478 VAC', model8: '304 ~ 478 VAC', model9: '304 ~ 478 VAC' },
    { category: 'Frequency Range', model1: '50 / 60 Hz (±5%)', model2: '50 / 60 Hz (±5%)', model3: '50 / 60 Hz (±5%)', model4: '50 / 60 Hz (±5%)', model5: '50 / 60 Hz (±5%)', model6: '50 / 60 Hz (±5%)', model7: '50 / 60 Hz (±5%)', model8: '50 / 60 Hz (±5%)', model9: '50 / 60 Hz (±5%)'  },
    { category: 'Power Factor', model1: '≥ 0.99', model2: '≥ 0.99', model3: '≥ 0.99', model4: '≥ 0.99', model5: '≥ 0.99', model6: '≥ 0.99', model7: '≥ 0.99', model8: '≥ 0.99', model9: '≥ 0.99' },
    { category: 'Bypass Voltage Range', model1: '±10% (adjustable ±5%,±10%,±15%)', model2: '±10% (adjustable ±5%,±10%,±15%)', model3: '±10% (adjustable ±5%,±10%,±15%)', model4: '±10% (adjustable ±5%,±10%,±15%)', model5: '±10% (adjustable ±5%,±10%,±15%)', model6: '±10% (adjustable ±5%,±10%,±15%)', model7: '±10% (adjustable ±5%,±10%,±15%)', model8: '±10% (adjustable ±5%,±10%,±15%)', model9: '±10% (adjustable ±5%,±10%,±15%)' },
    { category: 'Current start of rectifier', model1: '< 30A (Gradual not starting in one)', model2: '< 30A (Gradual not starting in one)', model3: '< 30A (Gradual not starting in one)', model4: '< 30A (Gradual not starting in one)', model5: '< 30A (Gradual not starting in one)', model6: '< 30A (Gradual not starting in one)', model7: '< 30A (Gradual not starting in one)', model8: '< 30A (Gradual not starting in one)', model9: '< 30A (Gradual not starting in one)' },
    { category: 'OUTPUT', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Output Wiring', model1: 'Three phase five-wire (3Ph + N + PE)', model2: 'Three phase five-wire (3Ph + N + PE)', model3: 'Three phase five-wire (3Ph + N + PE)', model4: 'Three phase five-wire (3Ph + N + PE)', model5: 'Three phase five-wire (3Ph + N + PE)', model6: 'Three phase five-wire (3Ph + N + PE)', model7: 'Three phase five-wire (3Ph + N + PE)', model8: 'Three phase five-wire (3Ph + N + PE)', model9: 'Three phase five-wire (3Ph + N + PE)' },
    { category: 'Rated Voltage', model1: '380 / 400 / 415 VAC', model2: '380 / 400 / 415 VAC', model3: '380 / 400 / 415 VAC', model4: '380 / 400 / 415 VAC', model5: '380 / 400 / 415 VAC', model6: '380 / 400 / 415 VAC', model7: '380 / 400 / 415 VAC', model8: '380 / 400 / 415 VAC', model9: '380 / 400 / 415 VAC' },
    { category: 'Frequency', model1: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model2: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model3: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model4: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model5: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model6: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model7: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model8: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode', model9: 'Synchronized with utility in mains mode; 50/60 Hz ±0.1% in battery mode' },
    { category: 'Waveform', model1: 'Sinusoidal', model2: 'Sinusoidal', model3: 'Sinusoidal', model4: 'Sinusoidal', model5: 'Sinusoidal', model6: 'Sinusoidal', model7: 'Sinusoidal', model8: 'Sinusoidal', model9: 'Sinusoidal' },
    { category: 'Power Factor', model1: '0.9', model2: '0.9', model3: '0.9', model4: '0.9', model5: '0.9', model6: '0.9', model7: '0.9', model8: '0.9', model9: '0.9' },
    { category: 'Total Harmonic Distortion (THDv)', model1: '< 2% (linear load), < 5% (non-linear load)', model2: '< 2% (linear load), < 5% (non-linear load)', model3: '< 2% (linear load), < 5% (non-linear load)', model4: '< 2% (linear load), < 5% (non-linear load)', model5: '< 2% (linear load), < 5% (non-linear load)', model6: '< 2% (linear load), < 5% (non-linear load)', model7: '< 2% (linear load), < 5% (non-linear load)', model8: '< 2% (linear load), < 5% (non-linear load)', model9: '< 2% (linear load), < 5% (non-linear load)' },
    { category: 'Transfer Time', model1: '0 ms', model2: '0 ms', model3: '0 ms', model4: '0 ms', model5: '0 ms', model6: '0 ms', model7: '0 ms', model8: '0 ms', model9: '0 ms' },
    { category: 'Overload Capability', model1: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model2: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model3: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model4: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model5: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model6: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model7: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model8: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms', model9: '110% for 60 mins, 125% for 10 mins, 150% for 1 min, >150% for 200ms' },
    { category: 'BATTERIES', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'DC Voltage', model1: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model2: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model3: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model4: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model5: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model6: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model7: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model8: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate', model9: '±192V (configurable battery number (20-22pcs per arm), VRLA, Lithium and Sulphate' },
    { category: 'No. of Batteries', model1: '32 pcs (±16, 16.2Ah/Battery)', model2: '32 pcs (±16, 16.2Ah/Battery)', model3: '32 pcs (±16, 16.2Ah/Battery)', model4: '32 pcs (±16, 16.2Ah/Battery)', model5: '32 pcs (±16, 16.2Ah/Battery)', model6: '32 pcs (±16, 16.2Ah/Battery)', model7: '32 pcs (±16, 16.2Ah/Battery)', model8: '32 pcs (±16, 16.2Ah/Battery)', model9: '32 pcs (±16, 16.2Ah/Battery)' },
    { category: 'Charging Current', model1: 'Depends on battery capacity', model2: 'Depends on battery capacity', model3: 'Depends on battery capacity', model4: 'Depends on battery capacity', model5: 'Depends on battery capacity', model6: 'Depends on battery capacity', model7: 'Depends on battery capacity', model8: 'Depends on battery capacity', model9: 'Depends on battery capacity' },
    { category: 'Battery Soft-test', model1: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model2: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model3: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model4: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model5: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model6: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model7: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model8: 'Cyclic, periodic, self-test, manully configurable test time and voltage', model9: 'Cyclic, periodic, self-test, manully configurable test time and voltage' },
    { category: 'DISPLAY', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Efficiency', model1: 'Up to 92% in Online mode, > 98% in ECO mode', model2: 'Up to 92% in Online mode, > 98% in ECO mode', model3: 'Up to 92% in Online mode, > 98% in ECO mode', model4: 'Up to 92% in Online mode, > 98% in ECO mode', model5: 'Up to 92% in Online mode, > 98% in ECO mode', model6: 'Up to 92% in Online mode, > 98% in ECO mode', model7: 'Up to 92% in Online mode, > 98% in ECO mode', model8: 'Up to 92% in Online mode, > 98% in ECO mode', model9: 'Up to 92% in Online mode, > 98% in ECO mode' },
    { category: 'Max. no. of Parallel Connections', model1: '4', model2: '4', model3: '4', model4: '4', model5: '4', model6: '4', model7: '4', model8: '4', model9: '4' },
    { category: 'Protection', model1: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model2: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model3: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model4: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model5: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model6: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model7: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model8: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure', model9: 'Short-circuit, Over load, Over Temp, Battery low voltage, Over voltage, Under voltage, Fan failure' },
    { category: 'Communications', model1: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model2: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model3: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model4: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model5: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model6: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model7: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model8: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus', model9: 'Standard configuration: RS232, RS485, Dry relay contact/Intelligent configurations: SNMP/ModBus' },
    { category: 'IP rating', model1: 'IP 20', model2: 'IP 20', model3: 'IP 20', model4: 'IP 20', model5: 'IP 20', model6: 'IP 20', model7: 'IP 20', model8: 'IP 20', model9: 'IP 20' },
    { category: 'Display', model1: '7 inches LCD touch screen', model2: '7 inches LCD touch screen', model3: '7 inches LCD touch screen', model4: '7 inches LCD touch screen', model5: '7 inches LCD touch screen', model6: '7 inches LCD touch screen', model7: '7 inches LCD touch screen', model8: '7 inches LCD touch screen', model9: '7 inches LCD touch screen' },
    { category: 'OTHERS', model1: '', model2: '', model3: '', model4: '', model5: '', model6: '', model7: '', model8: '', model9: '' },
    { category: 'Operating Temperature', model1: '0°C ~ 40°C', model2: '0°C ~ 40°C', model3: '0°C ~ 40°C', model4: '0°C ~ 40°C', model5: '0°C ~ 40°C', model6: '0°C ~ 40°C', model7: '0°C ~ 40°C', model8: '0°C ~ 40°C', model9: '0°C ~ 40°C' },
    { category: 'Storage Temperature', model1: '-25°C ~ 55°C (without battery)', model2: '-25°C ~ 55°C (without battery)', model3: '-25°C ~ 55°C (without battery)', model4: '-25°C ~ 55°C (without battery)', model5: '-25°C ~ 55°C (without battery)', model6: '-25°C ~ 55°C (without battery)', model7: '-25°C ~ 55°C (without battery)', model8: '-25°C ~ 55°C (without battery)', model9: '-25°C ~ 55°C (without battery)' },
    { category: 'Relative Humidity', model1: '0% ~ 95% (non-condensing)', model2: '0% ~ 95% (non-condensing)', model3: '0% ~ 95% (non-condensing)', model4: '0% ~ 95% (non-condensing)', model5: '0% ~ 95% (non-condensing)', model6: '0% ~ 95% (non-condensing)', model7: '0% ~ 95% (non-condensing)', model8: '0% ~ 95% (non-condensing)', model9: '0% ~ 95% (non-condensing)' },
    { category: 'Altitude', model1: '< 1000m', model2: '< 1000m', model3: '< 1000m', model4: '< 1000m', model5: '< 1000m', model6: '< 1000m', model7: '< 1000m', model8: '< 1000m', model9: '< 1000m' },
    { category: 'Dimension (W × D × H) (mm)', model1: '600 × 800 × 1180', model2: '600 × 800 × 1180', model3: '600 × 800 × 1180', model4: '800 × 800 × 1180', model5: '800 × 800 × 1180', model6: '800 × 800 × 1180', model7: '1200 × 800 × 1180', model8: '1200 × 800 × 1180', model9: '1200 × 800 × 1180' },
    { category: 'Net Weight (kg)', model1: '150', model2: '170', model3: '210', model4: '230', model5: '250', model6: '300', model7: '520', model8: '530', model9: '590' }
  ];

  // PDF URL for brochure
  const pdfUrl = "/Krykard Online UPS January 2025. (1).pdf";

  const ProductSpecContent = () => (
    <div className="w-full mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
      {/* Hero Section with Proper Spacing */}
      <section className="py-8 md:py-12 relative overflow-hidden">
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
                KRYKARD SX SERIES <span className="text-blue-600">3/3 UPS</span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl font-medium mb-6 md:mb-8 text-black"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
              >
                10 kVA to 120 kVA - Enterprise-grade three-phase power protection
              </motion.p>

              <motion.div
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold py-3 md:py-4 px-6 md:px-8 rounded-lg inline-block shadow-lg transform hover:scale-105 transition-transform duration-300"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
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
                  The KRYKARD SX Series is designed for critical applications requiring robust three-phase input and output power protection. Its industrial-grade design with inbuilt isolation transformer delivers superior protection for your mission-critical equipment.
                </p>
              </motion.div>

              <motion.div
                className="mt-4 md:mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Perfect for:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {[
                    "Industrial Control Systems",
                    "Medical Facilities & Equipment",
                    "Data Centers & Server Rooms",
                    "Critical IT Infrastructure",
                    "Manufacturing & Automation Systems"
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
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="sm:w-1/2">
                  <Link
                    to="/contact/sales"
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 transition-all duration-300 w-full text-sm md:text-base font-medium"
                    style={{ fontFamily: 'Open Sans, sans-serif' }}
                  >
                    <span>Request Quote</span>
                    <ArrowRight size={18} />
                  </Link>
                </motion.div>

                <motion.a
                  href={pdfUrl}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-6 md:px-8 py-3 md:py-4 rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center gap-2 sm:w-1/2 text-sm md:text-base font-medium"
                  style={{ fontFamily: 'Open Sans, sans-serif' }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px -5px rgba(37, 99, 235, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FileText size={18} />
                  <span>UPS Brochure</span>
                </motion.a>
              </motion.div>
            </motion.div>
            {/* Right side: UPS Image with Proper Height */}
            <motion.div
              className="relative flex justify-center px-4 md:px-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="w-full max-w-lg h-auto md:h-[400px] lg:h-[450px] flex items-center justify-center py-4 md:py-8">
                {/* Clean UPS image */}
                <motion.img
                  src="/UPS/2-removebg-preview.png"
                  alt="SX Series UPS"
                  className="max-w-full max-h-full object-contain"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </motion.div>
          </div>

          {/* Key Features Section with Proper Spacing */}
          <div className="mb-16 md:mb-20">
            <motion.div
              className="text-center mb-12 md:mb-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                Key Features
              </motion.h2>
              <motion.div
                className="h-1 w-24 bg-blue-600 mx-auto rounded-full mb-6"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              />
              <motion.p
                className="text-base md:text-lg text-black max-w-3xl mx-auto"
                style={{ fontFamily: 'Open Sans, sans-serif' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Core capabilities that define our SX Series UPS solutions
              </motion.p>
            </motion.div>

            {/* Professional Feature Cards with Better Spacing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 px-4 md:px-0">
              {[
                {
                  icon: <Zap size={28} />,
                  value: "98",
                  suffix: "%",
                  title: "Max Efficiency",
                  description: "Achieves up to 98% efficiency in ECO mode, reducing operational costs and environmental impact"
                },
                {
                  icon: <Shield size={28} />,
                  value: "478",
                  suffix: "V",
                  title: "Input Voltage Range",
                  description: "Wide input voltage range (304-478 VAC) handles unstable power conditions without switching to battery mode"
                },
                {
                  icon: <BarChart3 size={28} />,
                  value: "0.9",
                  suffix: "",
                  title: "Output Power Factor",
                  description: "0.9 power factor ensures efficient power delivery to connected equipment with minimal wasted capacity"
                },
                {
                  icon: <Clock size={28} />,
                  value: "4",
                  suffix: "",
                  title: "Parallel Units",
                  description: "Connect up to 4 units in parallel for increased capacity or redundancy, providing scalable power solutions"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-lg shadow-lg relative overflow-hidden group min-h-[200px] md:min-h-[240px]"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  viewport={{ once: true, margin: "-100px" }}
                  whileHover={{
                    y: -8,
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Top accent line */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-blue-600"></div>

                  {/* Content */}
                  <div className="p-6 md:p-8 relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <motion.div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 md:mb-6 shadow-sm mx-auto"
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      {React.cloneElement(feature.icon, { size: 28 })}
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
                          {feature.value}
                        </motion.span>
                        <motion.span
                          className="text-xl md:text-2xl font-bold text-blue-600 ml-1"
                          style={{ fontFamily: 'Open Sans, sans-serif' }}
                        >
                          {feature.suffix}
                        </motion.span>
                      </div>
                      <h3 className="text-base md:text-lg font-bold text-blue-600 mt-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>{feature.title}</h3>
                    </motion.div>

                    <p className="text-black text-sm text-center mt-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tabs Section with Enhanced Design - Using TabsNoRefresh Component */}
      <section className="container mx-auto px-4 mb-16">
        <TabsNoRefresh
          tabs={[
            { id: 'features', label: 'Features', icon: <Check size={18} className="text-blue-500" /> },
            { id: 'advantages', label: 'Advantages', icon: <ArrowUpRight size={18} className="text-blue-500" /> },
            { id: 'benefits', label: 'Benefits', icon: <Award size={18} className="text-blue-500" /> }
          ]}
          defaultTab="features"
        >
          <Tab tabId="features" activeTab="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {featuresList.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
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
          </Tab>

          <Tab tabId="advantages" activeTab="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
              {advantagesList.map((advantage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden min-h-[160px]"
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
          </Tab>

          <Tab tabId="benefits" activeTab="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {benefitsList.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="bg-white p-6 md:p-8 rounded-lg border border-blue-100 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden min-h-[200px]"
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
          </Tab>
        </TabsNoRefresh>
      </section>

      {/* Technical Specifications Section with Proper Spacing */}
      <section className="w-full mb-20 md:mb-24 px-0">
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
            Comprehensive technical details for the SX Series UPS line
          </p>
        </motion.div>

        {/* Interactive Table with Mobile-Optimized Design */}
        <div className="specs-table-container w-full">
          {/* Mobile Table Instruction */}
          <div className="md:hidden bg-gray-50 p-3 text-black text-sm font-medium flex items-center justify-center" style={{ fontFamily: 'Open Sans, sans-serif' }}>
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
                      onMouseEnter={() => handleModelChange('model1')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model1}
                    </th>
                  )}
                  {specifications[0].model2 && (
                    <th
                      className={hoveredModel === 'model2' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model2')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model2}
                    </th>
                  )}
                  {specifications[0].model3 && (
                    <th
                      className={hoveredModel === 'model3' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model3')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model3}
                    </th>
                  )}
                  {specifications[0].model4 && (
                    <th
                      className={hoveredModel === 'model4' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model4')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model4}
                    </th>
                  )}
                  {specifications[0].model5 && (
                    <th
                      className={hoveredModel === 'model5' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model5')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model5}
                    </th>
                  )}
                  {specifications[0].model6 && (
                    <th
                      className={hoveredModel === 'model6' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model6')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model6}
                    </th>
                  )}
                  {specifications[0].model7 && (
                    <th
                      className={hoveredModel === 'model7' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model7')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model7}
                    </th>
                  )}
                  {specifications[0].model8 && (
                    <th
                      className={hoveredModel === 'model8' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model8')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model8}
                    </th>
                  )}
                  {specifications[0].model9 && (
                    <th
                      className={hoveredModel === 'model9' ? 'opacity-75' : ''}
                      onMouseEnter={() => handleModelChange('model9')}
                      onMouseLeave={() => handleModelChange(null)}
                    >
                      {specifications[0].model9}
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {specifications.slice(1).map((spec, index) => {
                  const isHeader = spec.category.includes('INPUT') ||
                    spec.category.includes('OUTPUT') ||
                    spec.category.includes('BATTERIES') ||
                    spec.category.includes('DISPLAY') ||
                    spec.category.includes('OTHERS');

                  return (
                    <tr
                      key={index}
                      className={isHeader ? 'header-row' : ''}
                    >
                      <td>{spec.category}</td>
                      {spec.model1 !== undefined && (
                        <td className={hoveredModel === 'model1' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model1}
                        </td>
                      )}
                      {spec.model2 !== undefined && (
                        <td className={hoveredModel === 'model2' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model2}
                        </td>
                      )}
                      {spec.model3 !== undefined && (
                        <td className={hoveredModel === 'model3' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model3}
                        </td>
                      )}
                      {spec.model4 !== undefined && (
                        <td className={hoveredModel === 'model4' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model4}
                        </td>
                      )}
                      {spec.model5 !== undefined && (
                        <td className={hoveredModel === 'model5' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model5}
                        </td>
                      )}
                      {spec.model6 !== undefined && (
                        <td className={hoveredModel === 'model6' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model6}
                        </td>
                      )}
                      {spec.model7 !== undefined && (
                        <td className={hoveredModel === 'model7' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model7}
                        </td>
                      )}
                      {spec.model8 !== undefined && (
                        <td className={hoveredModel === 'model8' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model8}
                        </td>
                      )}
                      {spec.model9 !== undefined && (
                        <td className={hoveredModel === 'model9' ? 'bg-gray-100 font-medium' : ''}>
                          {spec.model9}
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Key Features Highlight Section */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-3">Key Highlights</h2>
          <div className="h-1.5 w-32 bg-gradient-to-r from-blue-400 to-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-lg text-blue-700 max-w-2xl mx-auto">
            Standout features that make the SX Series exceptional
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-800 mb-4">Inbuilt Isolation Transformer</h3>
            <p className="text-blue-700 mb-4">
              The SX Series includes an inbuilt isolation transformer that provides complete electrical isolation between input and output circuits, enhancing protection against electrical noise and power disturbances.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600">
                <div className="font-bold">Superior Protection</div>
                <div>Eliminates common-mode noise</div>
                <div>Enhanced electrical isolation</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-800 mb-4">Industrial-Grade Design</h3>
            <p className="text-blue-700 mb-4">
              Built to withstand harsh industrial environments, the SX Series delivers reliable performance in challenging conditions with robust construction and comprehensive protection features.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600">
                <div className="font-bold">Durability</div>
                <div>High MTBF 300,000 hours</div>
                <div>Tool-free maintenance</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-800 mb-4">Advanced Parallel Capability</h3>
            <p className="text-blue-700 mb-4">
              Connect up to 4 units in parallel for increased capacity or redundancy, providing flexible power solutions that can scale with your needs while ensuring operational continuity.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600">
                <div className="font-bold">Scalable Power</div>
                <div>Up to 4 parallel units</div>
                <div>N+X redundancy configuration</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                </svg>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="bg-white p-4 sm:p-6 md:p-8 rounded-xl shadow-lg border border-blue-100 relative overflow-hidden"
            whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-400 to-blue-600"></div>

            <h3 className="text-xl font-bold text-blue-800 mb-4">Advanced Battery Management</h3>
            <p className="text-blue-700 mb-4">
              Features sophisticated battery management with cyclic, periodic, and configurable testing capabilities that maximize battery life and ensure optimal performance when needed most.
            </p>

            <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg">
              <div className="text-sm text-blue-600">
                <div className="font-bold">Battery Protection</div>
                <div>Automatic deep discharge protection</div>
                <div>Configurable testing parameters</div>
              </div>
              <div className="bg-blue-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Isolation Transformer Section - Clean Modern Design */}
      <section className="container mx-auto px-4 mb-16">
        {/* Section header with animated elements */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Inbuilt Isolation Transformer Advantages
          </h2>
          <div className="h-1 w-32 bg-blue-600 mx-auto rounded-full"></div>

          <motion.p
            className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto"
            style={{ fontFamily: 'Open Sans, sans-serif' }}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Enhanced protection for your critical equipment with superior electrical isolation
          </motion.p>
        </motion.div>

        {/* Advantages cards with modern design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-8 px-4 md:px-0">
          {/* Card 1 - Electrical Isolation */}
          <motion.div
            className="group p-4 sm:p-6 md:p-8 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-700 transition-colors">Electrical Isolation</h3>
                <p className="text-blue-700 group-hover:text-blue-600 transition-colors">
                  Complete electrical isolation between input and output circuits, eliminating common mode noise and improving overall system reliability.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Enhanced Protection */}
          <motion.div
            className="group p-4 sm:p-6 md:p-8 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-blue-600"></div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-800 mb-3 group-hover:text-indigo-700 transition-colors">Enhanced Protection</h3>
                <p className="text-indigo-700 group-hover:text-indigo-600 transition-colors">
                  Superior protection against voltage spikes, surges, and electrical noise, making it ideal for sensitive industrial equipment and critical applications.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 - Phase Shift Protection */}
          <motion.div
            className="group p-4 sm:p-6 md:p-8 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400"></div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-3 group-hover:text-blue-700 transition-colors">Phase Shift Protection</h3>
                <p className="text-blue-700 group-hover:text-blue-600 transition-colors">
                  Eliminates common-mode noise and provides protection against phase shifts, ensuring consistent power quality for your critical systems.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 4 - Ground Isolation */}
          <motion.div
            className="group p-4 sm:p-6 md:p-8 rounded-xl hover:shadow-lg transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -5 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Decorative accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-blue-500"></div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-indigo-800 mb-3 group-hover:text-indigo-700 transition-colors">Ground Isolation</h3>
                <p className="text-indigo-700 group-hover:text-indigo-600 transition-colors">
                  Provides galvanic isolation between primary and secondary windings, eliminating ground loop problems and enhancing safety in industrial environments.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Application Areas */}
      <section className="container mx-auto px-4 mb-16">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-4 md:mb-6" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ideal Applications</h2>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
          <p className="mt-6 text-base md:text-lg text-black max-w-3xl mx-auto" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Perfect solutions for these critical environments
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 px-4 md:px-0">
          {[
            { icon: "🏢", text: "Financial Services" },
            { icon: "🏥", text: "Medical Facilities" },
            { icon: "💻", text: "Network Infrastructure" },
            { icon: "🏭", text: "Industrial Control" },
            { icon: "🔬", text: "Research Labs" },
            { icon: "🏗️", text: "Manufacturing" },
            { icon: "🖥️", text: "Data Centers" },
            { icon: "⚡", text: "Power Utilities" }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-blue-50/50 border border-blue-100"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
            >
              <motion.div
                className="text-3xl mb-3"
                animate={{
                  y: [0, -5, 0],
                  rotate: [-2, 2, -2]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              >
                {item.icon}
              </motion.div>
              <h3 className="font-bold text-blue-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>{item.text}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PDF Viewer Modal */}
      {showPdfViewer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-70" onClick={() => setShowPdfViewer(false)}></div>
          <div className="relative bg-white rounded-xl p-6 w-full max-w-5xl max-h-[90vh] overflow-hidden">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setShowPdfViewer(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex items-center justify-between mb-4 pb-4 border-b">
              <h3 className="text-xl font-bold text-blue-800">KSX4080 SX Series UPS Brochure</h3>
              <a
                href={pdfUrl}
                download="KRYKARD-UPS-Brochure.pdf"
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF
              </a>
            </div>

            <div className="w-full h-[70vh]">
              {/* Direct PDF embedding */}
              <object
                data={pdfUrl}
                type="application/pdf"
                className="w-full h-full"
              >
                <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-8 text-center">
                  <p className="text-gray-600 mb-4">
                    PDF preview is not available in your browser.
                  </p>
                  <a
                    href={pdfUrl}
                    download="KRYKARD-UPS-Brochure.pdf"
                    className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-2 px-4 rounded-md transition-colors shadow-md"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download UPS Brochure
                  </a>
                </div>
              </object>
            </div>
          </div>
        </div>
      )}

      {/* Call-to-Action Section */}
      <section className="container mx-auto px-4 mb-20">
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-white rounded-3xl shadow-xl overflow-hidden border border-blue-100"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
            {/* Left side: Content */}
            <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-600 mb-6 md:mb-8" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Ready for Industrial-Grade Power Protection?
                </h2>

                <p className="text-base md:text-lg text-black mb-8 md:mb-10" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Our SX Series UPS solutions provide reliable three-phase power protection with inbuilt isolation transformer for your mission-critical systems.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="sm:w-1/2"
                  >
                    <Link
                      to="/contact/sales"
                      className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium flex items-center justify-center gap-2 group w-full text-sm md:text-base"
                      style={{ fontFamily: 'Open Sans, sans-serif' }}
                    >
                      <span>Contact Our Experts</span>
                      <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>

                  <motion.a
                    href={pdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg transition-all duration-300 px-6 md:px-8 py-3 md:py-4 rounded-lg font-medium flex items-center justify-center gap-2 sm:w-1/2 text-sm md:text-base"
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
              </motion.div>
            </div>

            {/* Right side: Image */}
            <motion.div
              className="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 text-center text-white">
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
                <p className="text-blue-100 text-base md:text-lg" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  Engineered for mission-critical applications requiring the highest level of power reliability
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );

  // Return PageLayout component with the product specification content inside
  return (
    <PageLayout
      title="KRYKARD SX Series UPS"
      subtitle="Online double conversion with inbuilt isolation transformer"
      category="protect"
      image="/background_images/ups_layout.png"
    >
      <ProductSpecContent />
    </PageLayout>
  );
};

export default ProductSpecification;