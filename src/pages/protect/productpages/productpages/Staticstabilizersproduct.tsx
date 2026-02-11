import { Shield, Zap, Settings, Award, CheckCircle, Star, Mail, Download, Info } from 'lucide-react';
import { useEffect } from 'react';
import PageLayout from '../../../components/layout/PageLayout';

const StaticStabilizersProduct = () => {
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
        color: #334155;
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
      icon: <Shield className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Wide Product Range",
      items: [
        "Ratings 15 - 200 kVA 3 Phase",
        "Multiple input ranges and operations",
        "LS Series: 15 - 100 kVA",
        "HS Series: 125 - 200 kVA"
      ]
    },
    {
      icon: <Zap className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Fast Voltage Correction",
      items: [
        "Input range is corrected within 20 ms",
        "Steady Output Voltage",
        "True RMS Sensing and Correction",
        "High Speed 20 kHz PWM"
      ]
    },
    {
      icon: <Settings className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "Complete Protection",
      items: [
        "Short Circuit, Under voltage",
        "Single Phasing & Phase Reversal trip",
        "Spike & Surge Protection",
        "Service & Manual Bypass provision"
      ]
    },
    {
      icon: <Award className="w-6 h-6 sm:w-8 sm:h-8" />,
      title: "IGBT Technology",
      items: [
        "Fully Solid State - IGBT Technology",
        "Lower output load supply impedance",
        "No Harmonic distortion",
        "Noise Free - Silent operation"
      ]
    }
  ];

  const specifications = [
    { parameter: "Ratings", "3Phase": "15 to 200 kVA", "1Phase": "3 Phase, 4 Wire" },
    { parameter: "Nature of Cooling", "3Phase": "Air Cooled", "1Phase": "Air Cooled" },
    { parameter: "Control Type", "3Phase": "True RMS Sensing and Correction", "1Phase": "20 kHz PWM switching using DSP" },
    { parameter: "Input Voltage Range", "3Phase": "360 V - 460 V @ 410 V", "1Phase": "320 V - 460 V @ 400 V" },
    { parameter: "Output Voltage", "3Phase": "410 V ±1%", "1Phase": "410 V ±1%" },
    { parameter: "Voltage Regulation", "3Phase": "±1%", "1Phase": "±1%" },
    { parameter: "Efficiency", "3Phase": ">98%", "1Phase": ">98%" },
    { parameter: "Input Frequency", "3Phase": "47 Hz to 53 Hz", "1Phase": "47 Hz to 53 Hz" },
    { parameter: "Wave Form", "3Phase": "Same as Input", "1Phase": "Same as Input" },
    { parameter: "Power Factor Effect", "3Phase": "Nil", "1Phase": "Nil" },
    { parameter: "Voltage Sensing Time", "3Phase": "< 10 ms", "1Phase": "< 10 ms" },
    { parameter: "Voltage Correction Time", "3Phase": "< 10 ms", "1Phase": "< 10 ms" },
    { parameter: "Under/Over Voltage Cutoff", "3Phase": "Electronic cutoff ±15%/10%", "1Phase": "Electronic cutoff ±15%/10%" },
    { parameter: "Overload Cutoff", "3Phase": "CT based @ 110%", "1Phase": "CT based @ 110%" },
    { parameter: "Short Circuit Protection", "3Phase": "MCB/MCCB provided", "1Phase": "MCB/MCCB provided" },
    { parameter: "Single Phasing Prevention", "3Phase": "Provided", "1Phase": "N/A" },
    { parameter: "Phase Reversal Trip", "3Phase": "Provided", "1Phase": "N/A" },
    { parameter: "Transient Protection", "3Phase": "Type 2 Surge Suppressor", "1Phase": "MOV at Output" },
    { parameter: "Manual Bypass", "3Phase": "Provided", "1Phase": "Provided" },
    { parameter: "Emergency Off-Switch", "3Phase": "Provided", "1Phase": "Provided" },
    { parameter: "Display Type", "3Phase": "7 Line LCD Panel", "1Phase": "7 Line LCD Panel" },
    { parameter: "Operating Temperature", "3Phase": "0 to 50°C", "1Phase": "0 to 50°C" },
    { parameter: "Duty Cycle", "3Phase": "Continuous", "1Phase": "Continuous" },
    { parameter: "IP Class", "3Phase": "IP-20, Indoor", "1Phase": "IP-20, Indoor" }
  ];

  return (
    <PageLayout
      title="Static Voltage Stabilizers"
      subtitle="Cutting-edge IGBT technology with DSP control delivering unparalleled voltage regulation and comprehensive power protection for industrial and commercial applications."
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
                  Static Voltage Stabilizers
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed max-w-4xl mx-auto px-2">
                  Cutting-edge IGBT technology with DSP control delivering unparalleled voltage regulation and comprehensive power protection for industrial and commercial applications.
                </p>
                <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 sm:ml-3 text-xs sm:text-sm text-blue-100 font-medium">Industry Leading Technology</span>
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
                  <a
                    href="/Krykard%20PCE%20January%202025.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm hover:bg-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center"
                  >
                    <Download className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2" />
                    Download Brochure
                  </a>
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
                  Advanced Power Protection Solutions
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-4xl mx-auto px-2">
                  Our Static Voltage Stabilizers combine cutting-edge IGBT technology with DSP control to deliver unparalleled voltage regulation and comprehensive power protection for industrial and commercial applications. Built to meet international standards with superior performance and reliability.
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

        {/* Technical Specifications Section - Blue Theme & Mobile Optimized */}
        <div className="w-full bg-gradient-to-b from-slate-50 to-blue-50">
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8 md:mb-10">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-3 md:mb-4">
                  Technical Specifications
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-3xl mx-auto px-2">
                  Detailed technical parameters and standards ensuring optimal performance and reliability across all applications.
                </p>
              </div>

              <div className="specs-table-container">
                <div className="specs-table-scroll">
                  <table className="specs-table">
                    <thead>
                      <tr>
                        <th>Parameter</th>
                        <th>3-Phase</th>
                        <th>1-Phase / 2-Phase</th>
                      </tr>
                    </thead>
                    <tbody>
                      {specifications.map((spec, index) => (
                        <tr key={index}>
                          <td>{spec.parameter}</td>
                          <td>{spec['3Phase']}</td>
                          <td>{spec['1Phase']}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="bg-blue-50 px-3 sm:px-4 py-3 border-t border-blue-200">
                  <p className="text-xs text-black font-medium flex items-center justify-center text-center">
                    <Info className="w-3 h-3 sm:w-4 sm:h-4 inline mr-2 text-blue-600 flex-shrink-0" />
                    All specifications are subject to standard tolerances and testing conditions as per international standards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Features Section - Blue Theme */}
        <div className="w-full bg-white">
          <div className="w-full px-4 sm:px-6 md:px-8 py-12 md:py-16">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-10 md:mb-12">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-4">
                  Key Features & Benefits
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-black leading-relaxed max-w-4xl mx-auto px-2">
                  Discover the advanced features that make our Static Voltage Stabilizers the preferred choice for critical power applications. Each feature is designed to deliver maximum performance, safety, and reliability.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                {features.map((feature, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-200 group">
                    <div className="flex items-center mb-4 sm:mb-6">
                      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-2 sm:p-3 shadow-lg group-hover:from-blue-700 group-hover:to-blue-800 transition-all duration-300">
                        <div className="text-white">{feature.icon}</div>
                      </div>
                      <h3 className="text-sm sm:text-lg font-bold text-blue-900 ml-3 sm:ml-4">{feature.title}</h3>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      {feature.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-start">
                          <div className="bg-blue-100 rounded-full p-1 mr-2 sm:mr-3 mt-0.5 flex-shrink-0">
                            <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600" />
                          </div>
                          <span className="text-xs sm:text-sm text-black leading-relaxed font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
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
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-black">
                Ready to Upgrade Your Power Protection?
              </h2>
              <p className="text-xs sm:text-sm md:text-base text-white mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-2">
                Get in touch with our experts to find the perfect Static Voltage Stabilizer solution for your needs. We provide comprehensive support from consultation to installation and maintenance.
              </p>
              <div className="flex justify-center px-4">
                <button
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

export default StaticStabilizersProduct; 