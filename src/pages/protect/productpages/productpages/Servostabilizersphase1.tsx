import { CheckCircle, Zap, Shield, Wrench, Mail, Star, Download, Settings } from 'lucide-react';
import { useEffect } from 'react';
import PageLayout from '../../../components/layout/PageLayout';

const ServoStabilizersPhase1 = () => {
  // Mobile table CSS injection with blue theme
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .specs-table-container {
        width: 100%;
        margin: 0;
        padding: 0;
        background: white;
        border-radius: 12px;
        box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.1);
        overflow: hidden;
        border: 1px solid #dbeafe;
      }

      .specs-table-scroll {
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
        scrollbar-color: #3b82f6 #f3f4f6;
      }

      .specs-table-scroll::-webkit-scrollbar {
        height: 8px;
      }

      .specs-table-scroll::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb {
        background: #3b82f6;
        border-radius: 4px;
      }

      .specs-table-scroll::-webkit-scrollbar-thumb:hover {
        background: #2563eb;
      }

      .specs-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
        min-width: 600px;
      }

      .specs-table th {
        background: linear-gradient(135deg, #1e40af, #3b82f6);
        color: white;
        padding: 12px 16px;
        text-align: left;
        font-weight: 600;
        font-size: 14px;
        border-bottom: 2px solid #2563eb;
        white-space: nowrap;
        position: sticky;
        top: 0;
        z-index: 10;
      }

      .specs-table th:first-child {
        position: sticky;
        left: 0;
        z-index: 11;
        min-width: 200px;
      }

      .specs-table td {
        padding: 10px 16px;
        border-bottom: 1px solid #e2e8f0;
        font-size: 13px;
        line-height: 1.4;
        color: #000000;
      }

      .specs-table td:first-child {
        background: #f8fafc;
        font-weight: 600;
        color: #1e40af;
        position: sticky;
        left: 0;
        z-index: 9;
        border-right: 1px solid #cbd5e1;
        min-width: 200px;
      }

      .specs-table tbody tr:hover {
        background-color: #eff6ff;
      }

      .specs-table tbody tr:hover td:first-child {
        background-color: #dbeafe;
      }

      @media (max-width: 768px) {
        .specs-table {
          font-size: 12px;
          min-width: 500px;
        }

        .specs-table th {
          padding: 8px 12px;
          font-size: 12px;
        }

        .specs-table td {
          padding: 8px 12px;
          font-size: 11px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 150px;
        }
      }

      @media (max-width: 480px) {
        .specs-table {
          font-size: 11px;
          min-width: 450px;
        }

        .specs-table th {
          padding: 6px 10px;
          font-size: 11px;
        }

        .specs-table td {
          padding: 6px 10px;
          font-size: 10px;
        }

        .specs-table th:first-child,
        .specs-table td:first-child {
          min-width: 130px;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const features = [
    {
      icon: <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "True RMS Correction",
      items: [
        "Microprocessor based control system.",
        "Digital Voltage, Current.",
        "MCU sensing and correction technology",
        "High precision voltage regulation"
      ]
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "High Efficiency Design",
      items: [
        "Stabilizers designed to rated capacity",
        "Efficiency > 98%",
        "Optimal performance all load conditions",
        "Energy saving operation"
      ]
    },
    {
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Complete Protection",
      items: [
        "Short Circuit,Over voltage protection",
        "Electronic CT based Overload trip",
        "High/Low voltage cutoff with time delay",
        "Built-in Spike Suppressor"
      ]
    },
    {
      icon: <Wrench className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "After Sales Support",
      items: [
        "'No Questions-Asked' guarantee",
        "Service network covering 100+ locations",
        "Service response within 6-24 hours",
        "Comprehensive maintenance support"
      ]
    }
  ];

  const specifications = [
    { parameter: "Rating (kVA)", "1kVA": "1 kVA", "2-3kVA": "2-3 kVA", "4-5kVA": "4-5 kVA", "7.5-10kVA": "7.5-10 kVA", "15-20kVA": "15-20 kVA" },
    { parameter: "Input Voltage Range", "1kVA": "190-250V", "2-3kVA": "190-250V", "4-5kVA": "190-250V", "7.5-10kVA": "190-250V", "15-20kVA": "190-250V" },
    { parameter: "Output Voltage", "1kVA": "220V ±1%", "2-3kVA": "220V ±1%", "4-5kVA": "220V ±1%", "7.5-10kVA": "220V ±1%", "15-20kVA": "220V ±1%" },
    { parameter: "Input Frequency", "1kVA": "47-53 Hz", "2-3kVA": "47-53 Hz", "4-5kVA": "47-53 Hz", "7.5-10kVA": "47-53 Hz", "15-20kVA": "47-53 Hz" },
    { parameter: "Digital Display", "1kVA": "3 digit, 7 segment", "2-3kVA": "3 digit, 7 segment", "4-5kVA": "3 digit, 7 segment", "7.5-10kVA": "3 digit, 7 segment", "15-20kVA": "3 digit, 7 segment" },
    { parameter: "Voltage Accuracy", "1kVA": "1% ±2 digit", "2-3kVA": "1% ±2 digit", "4-5kVA": "1% ±2 digit", "7.5-10kVA": "1% ±2 digit", "15-20kVA": "1% ±2 digit" },
    { parameter: "Under/Over Voltage Trip", "1kVA": "-5% / +10%", "2-3kVA": "-5% / +10%", "4-5kVA": "-5% / +10%", "7.5-10kVA": "-5% / +10%", "15-20kVA": "-5% / +10%" },
    { parameter: "Response Time", "1kVA": "< 20 ms", "2-3kVA": "< 20 ms", "4-5kVA": "< 20 ms", "7.5-10kVA": "< 20 ms", "15-20kVA": "< 20 ms" },
    { parameter: "Efficiency", "1kVA": "> 98%", "2-3kVA": "> 98%", "4-5kVA": "> 98%", "7.5-10kVA": "> 98%", "15-20kVA": "> 98%" },
    { parameter: "Transient Protection", "1kVA": "MOV Spike Suppressor", "2-3kVA": "MOV Spike Suppressor", "4-5kVA": "MOV Spike Suppressor", "7.5-10kVA": "MOV Spike Suppressor", "15-20kVA": "MOV Spike Suppressor" },
    { parameter: "Input Termination", "1kVA": "1.5m cable with 5A plug", "2-3kVA": "1.5m cable with 5A plug", "4-5kVA": "1.5m cable with 5A plug", "7.5-10kVA": "6A terminal block", "15-20kVA": "100A terminal block" },
    { parameter: "Output Termination", "1kVA": "1x5/15A socket", "2-3kVA": "1x5/15A socket", "4-5kVA": "2x5/15A socket", "7.5-10kVA": "Terminal block", "15-20kVA": "Terminal block" },
    { parameter: "Protection Features", "1kVA": "Complete Protection", "2-3kVA": "Complete Protection", "4-5kVA": "Complete Protection", "7.5-10kVA": "Complete Protection", "15-20kVA": "Complete Protection" },
    { parameter: "Manual Bypass", "1kVA": "Provided", "2-3kVA": "Provided", "4-5kVA": "Provided", "7.5-10kVA": "Provided", "15-20kVA": "Provided" },
    { parameter: "Operating Temperature", "1kVA": "0-50°C", "2-3kVA": "0-50°C", "4-5kVA": "0-50°C", "7.5-10kVA": "0-50°C", "15-20kVA": "0-50°C" },
    { parameter: "Warranty", "1kVA": "1 Year Comprehensive", "2-3kVA": "1 Year Comprehensive", "4-5kVA": "1 Year Comprehensive", "7.5-10kVA": "1 Year Comprehensive", "15-20kVA": "1 Year Comprehensive" }
  ];

  const productRanges = [
    {
      title: "Regular Range: 190 - 250V",
      description: "for factories, offices & urban locations"
    },
    {
      title: "Wide Range: 170 - 270V",
      description: "for semi-urban locations with wide fluctuations"
    },
    {
      title: "Custom Range",
      description: "Can be provided for specific needs"
    }
  ];

  return (
    <PageLayout
      title="Servo Stabilizers - 1 Phase"
      subtitle="Advanced voltage protection solutions for your needs"
      category="protect"
    >
      <div className="bg-white font-sans min-h-screen font-open-sans">
        {/* Hero Content Section - Blue Theme */}
        <div className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 lg:py-20 relative z-10">
            <div className="max-w-6xl mx-auto text-center">
              <div className="space-y-6 md:space-y-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Servo Stabilizers - 1 Phase
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed max-w-4xl mx-auto px-2">
                  Compact single-phase voltage protection solution designed to safeguard your valuable appliances from voltage fluctuations with True RMS correction and complete protection features.
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-blue-100 font-medium">Guardian of Your Appliances</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center pt-2 px-4">
                  <button
                    className="bg-white text-blue-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                    onClick={() => window.location.href = '/contact/sales'}
                  >
                    <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                    Get Quote
                  </button>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = '/brochures/servo-stabilizers-1phase-brochure.pdf';
                      link.download = 'Servo-Stabilizers-1Phase-Brochure.pdf';
                      link.click();
                    }}
                    className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                    Download Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Overview Section - Blue Theme */}
        <div className="w-full bg-gradient-to-b from-blue-50 to-white">
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                  Advanced Single-Phase Power Protection
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-4xl mx-auto px-2">
                  Our Servo Controlled Voltage Stabilizers provide superior single-phase voltage regulation with microprocessor-based control systems, ensuring stable power quality for residential and commercial applications. Built with True RMS correction and comprehensive protection features.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 group">
                    <div className="flex items-center text-center mb-4">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2 sm:p-3 shadow-lg group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300 flex-shrink-0">
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-blue-900 ml-3">{feature.title}</h3>
                    </div>
                    <ul className="space-y-2 sm:space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-xs sm:text-sm text-black leading-relaxed font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Product Range Section - Blue Theme */}
        <div className="w-full bg-white">
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                  Product Range for Your Needs
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-4xl mx-auto px-2">
                  Choose from our comprehensive range of voltage stabilizers designed to meet different operating environments and voltage fluctuation patterns.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                {productRanges.map((range, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 group">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2 sm:p-3 shadow-lg group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
                        <Settings className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-blue-900 ml-3 sm:ml-4">{range.title}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-black leading-relaxed font-medium">{range.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Technical Specifications Section - Blue Theme & Mobile Optimized */}
        <div className="w-full bg-gradient-to-b from-slate-50 to-blue-50">
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-3 md:mb-4">
                  Technical Specifications
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-3xl mx-auto px-2">
                  Detailed technical parameters and standards ensuring optimal performance and reliability across all rating ranges.
                </p>
              </div>

              <div className="specs-table-container">
                <div className="specs-table-scroll">
                  <table className="specs-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>1 kVA</th>
                        <th>2-3 kVA</th>
                        <th>4-5 kVA</th>
                        <th>7.5-10 kVA</th>
                        <th>15-20 kVA</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr key={index}>
                          <td>{spec.parameter}</td>
                          <td>{spec['1kVA']}</td>
                          <td>{spec['2-3kVA']}</td>
                          <td>{spec['4-5kVA']}</td>
                          <td>{spec['7.5-10kVA']}</td>
                          <td>{spec['15-20kVA']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action Section - Blue Theme */}
        <div className="w-full bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent"></div>
          </div>

          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-white">
                Ready for Reliable Power Protection?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Get in touch with our experts to find the perfect single-phase servo stabilizer solution for your residential or commercial needs. We provide comprehensive support from consultation to installation and maintenance.
              </p>
              <div className="flex justify-center px-4">
                <button
                  onClick={() => {
                    window.location.href = '/contact/sales';
                  }}
                  className="bg-white text-blue-900 px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                  Contact Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ServoStabilizersPhase1;