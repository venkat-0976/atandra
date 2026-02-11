import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Shield, 
  Settings, 
  Award, 
  CheckCircle, 
  Star, 
  Info, 
  Mail, 
  Zap, 
  ArrowRight, 
  FileText, 
  BarChart3, 
  Clock,
  Phone,
  Download,
  ExternalLink
} from 'lucide-react';
import PageLayout from "@/components/layout/PageLayout";

export default function TransformerProductPage() {
  const { type } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTransformerTitle = (urlType: string | undefined) => {
    switch(urlType) {
      case 'ultra-isolation-transformer':
        return 'Ultra Isolation Transformer';
      case 'galvanic-isolation-transformer':
        return 'Galvanic Isolation Transformer';
      case 'auto-transformer':
        return 'Auto Isolation Transformer';
      default:
        return 'Isolation Transformer';
    }
  };

  const getTransformerDescription = (urlType: string | undefined) => {
    switch(urlType) {
      case 'ultra-isolation-transformer':
        return 'Advanced multiple shielding technology for medical and precision applications';
      case 'galvanic-isolation-transformer':
        return 'Complete electrical isolation with copper shielding for industrial applications';
      case 'auto-transformer':
        return 'Efficient voltage adaptation without isolation for cost-effective solutions';
      default:
        return 'Premium quality transformers for critical applications';
    }
  };

  const getTransformerImage = (urlType: string | undefined) => {
    switch(urlType) {
      case 'ultra-isolation-transformer':
        return '/isolation_transformers/X3_-__2-removebg-preview.png';
      case 'galvanic-isolation-transformer':
        return '/isolation_transformers/X2_-_3-removebg-preview.png';
      case 'auto-transformer':
        return '/isolation_transformers/X1_-_1-removebg-preview.png';
      default:
        return '/isolation_transformers/X1_-_1-removebg-preview.png';
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const validTypes = ['ultra-isolation-transformer', 'galvanic-isolation-transformer', 'auto-transformer'];
        if (!type || !validTypes.includes(type)) {
          setError('Invalid transformer type');
          navigate('/protect/isolation-transformers');
          return;
        }
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, [type, navigate]);

  const transformerTitle = getTransformerTitle(type);
  const transformerDescription = getTransformerDescription(type);
  const transformerImage = getTransformerImage(type);

  // Enhanced key statistics with better visual hierarchy
  const keyStats = [
    { 
      value: "97", 
      suffix: "%", 
      title: "Efficiency", 
      subtitle: "High Performance",
      icon: <Zap size={24} />,
      color: "from-yellow-500 to-orange-500"
    },
    { 
      value: "±3", 
      suffix: "%", 
      title: "Load Regulation", 
      subtitle: "Precision Control",
      icon: <BarChart3 size={24} />,
      color: "from-blue-500 to-blue-600"
    },
    { 
      value: "1000", 
      suffix: "kVA", 
      title: "Max Capacity", 
      subtitle: "Industrial Scale",
      icon: <Shield size={24} />,
      color: "from-green-500 to-green-600"
    },
    { 
      value: "24/7", 
      suffix: "", 
      title: "Protection", 
      subtitle: "Continuous Operation",
      icon: <Clock size={24} />,
      color: "from-purple-500 to-purple-600"
    }
  ];

  // Enhanced features with better descriptions
  const features = [
    {
      title: "Safety & Protection",
      subtitle: "Complete Electrical Safety",
      icon: <Shield size={28} />,
      color: "from-red-500 to-red-600",
      items: [
        "Galvanic isolation electrical safety",
        "Overload protection systems",
        "Temperature thermal protection",
        "Fault detection and isolation"
      ]
    },
    {
      title: "Performance Excellence",
      subtitle: "Optimal Power Quality",
      icon: <Zap size={28} />,
      color: "from-yellow-500 to-orange-500",
      items: [
        "High efficiency operation",
        "Low harmonic distortion < 3%",
        "Excellent load regulation ±3%",
        "Fast response time < 20ms"
      ]
    },
    {
      title: "Premium Build Quality",
      subtitle: "Industrial Grade Construction",
      icon: <Award size={28} />,
      color: "from-blue-500 to-blue-600",
      items: [
        "Grade materials and components",
        "Industrial construction standards",
        "Quality assurance testing",
        "Extended warranty and support"
      ]
    },
    {
      title: "Versatile Applications",
      subtitle: "Multi-Industry Solutions",
      icon: <Settings size={28} />,
      color: "from-green-500 to-green-600",
      items: [
        "Medical and hospital systems",
        "IT infrastructure and data centers",
        "Industrial control and automation",
        "Telecommunications"
      ]
    }
  ];

  // Specifications table for isolation transformers (restored, more complete)
  const specifications = [
    { parameter: 'Power Ratings', '3Phase': '3 kVA to 1000 kVA', '1Phase': '1 kVA to 25 kVA' },
    { parameter: 'Input Voltage Range', '3Phase': '415V ±10%', '1Phase': '230V ±10%' },
    { parameter: 'Output Voltage', '3Phase': '415V', '1Phase': '230V' },
    { parameter: 'Frequency Range', '3Phase': '50 Hz ±5%', '1Phase': '50 Hz ±5%' },
    { parameter: 'Efficiency Rating', '3Phase': 'Up to 97%', '1Phase': 'Up to 95%' },
    { parameter: 'Load Regulation', '3Phase': '±3%', '1Phase': '±3%' },
    { parameter: 'Insulation Class', '3Phase': 'Class F (155°C)', '1Phase': 'Class F (155°C)' },
    { parameter: 'Protection Rating', '3Phase': 'IP21/IP23', '1Phase': 'IP21/IP23' },
    { parameter: 'Operating Temperature', '3Phase': '-10°C to +45°C', '1Phase': '-10°C to +45°C' },
    { parameter: 'Humidity Range', '3Phase': '5% to 95% RH', '1Phase': '5% to 95% RH' },
    { parameter: 'Winding Material', '3Phase': 'Copper/Aluminum', '1Phase': 'Copper/Aluminum' },
    { parameter: 'Impedance', '3Phase': '3% to 6%', '1Phase': '3% to 6%' },
    { parameter: 'Dielectric Strength', '3Phase': '2.5 kV for 1 min', '1Phase': '2.5 kV for 1 min' },
    { parameter: 'Cooling', '3Phase': 'Air/Oil Cooled', '1Phase': 'Air/Oil Cooled' },
    { parameter: 'Mounting', '3Phase': 'Floor/Wall', '1Phase': 'Floor/Wall' },
    { parameter: 'Standards', '3Phase': 'IS 2026/11171', '1Phase': 'IS 2026/11171' }
  ];

  // Loading state with better UX
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-400 animate-ping"></div>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-800">Loading Product Details</h2>
            <p className="text-lg text-slate-600">Please wait while we prepare your information...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state with better UX
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center space-y-6 max-w-md mx-auto px-4">
          <div className="bg-white rounded-full p-6 w-20 h-20 mx-auto shadow-lg">
            <svg className="w-8 h-8 text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-slate-800">Oops! Something went wrong</h2>
            <p className="text-lg text-slate-600">{error}</p>
            <button
              onClick={() => navigate('/protect/isolation-transformers')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
            >
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <PageLayout
      title={`${transformerTitle} - KRYKARD`}
      category="protect"
    >
      {/* Compact Hero Section */}
      <section className="w-full bg-white py-6 md:py-8">
        <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-6 px-4 md:px-6">
          {/* Left: Content */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left gap-2">
            {/* Badge */}
            <span className="inline-block mb-2 px-5 py-1.5 rounded-full bg-blue-600 text-white font-semibold text-sm shadow">KRYKARD Innovations</span>
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-black leading-tight mb-1">
              ULTRAISOLATION<span className="text-blue-600">TRANSFORMERS</span>
            </h1>
            <div className="h-0.5 w-16 bg-blue-600 rounded-full mb-2"></div>
            {/* Subtitle */}
            <h2 className="uppercase font-bold text-black text-base md:text-lg mb-2 tracking-wide">Electrical Separation for Noise Reduction and Safety</h2>
            {/* Description */}
            <p className="text-base md:text-lg text-black mb-0 max-w-xl">
              Advanced power conditioning technology with <span className="text-blue-600 font-semibold underline underline-offset-2 cursor-pointer">unparalleled electrical isolation</span>
            </p>
            <p className="text-base md:text-lg text-black mb-3 max-w-xl">
              for sensitive equipment and critical applications.
            </p>
            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xl mt-1">
              <button
                onClick={() => window.location.href = '/contact/sales'}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow flex items-center justify-center gap-2 text-base font-bold transition-all duration-300"
              >
                <Mail className="w-5 h-5" />
                GET A QUOTE
              </button>
              <button
                onClick={() => window.open('/Krykard PCE January 2025.pdf', '_blank')}
                className="flex-1 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg shadow flex items-center justify-center gap-2 text-base font-bold transition-all duration-300"
              >
                <FileText className="w-5 h-5" />
                VIEW BROCHURE
              </button>
            </div>
          </div>
          {/* Right: Image */}
          <div className="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0">
            <img
              src={transformerImage}
              alt={`${transformerTitle} - KRYKARD`}
              className="w-full max-w-xs sm:max-w-sm md:max-w-md object-contain drop-shadow-2xl"
              onError={(e) => {
                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f8fafc'/%3E%3Ctext x='200' y='150' text-anchor='middle' dy='.3em' fill='%2364758b' font-family='Arial, sans-serif' font-size='18' font-weight='bold'%3E%3C/tspan%3E%3Ctext x='200' y='170' text-anchor='middle' dy='.3em' fill='%2364758b' font-family='Arial, sans-serif' font-size='14'%3EIsolation Transformer%3C/text%3E%3C/svg%3E";
              }}
            />
          </div>
        </div>
      </section>

      {/* Enhanced Key Statistics Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Key Performance Metrics
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Industry-leading specifications that ensure optimal performance and reliability
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {keyStats.map((stat, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-slate-200">
                <div className={`bg-gradient-to-r ${stat.color} rounded-xl p-3 w-14 h-14 flex items-center justify-center text-white mb-4 mx-auto shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center">
                    <span className="text-3xl font-bold text-slate-900">{stat.value}</span>
                    <span className="text-xl font-semibold text-slate-700 ml-1">{stat.suffix}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-800">{stat.title}</h3>
                  <p className="text-sm text-slate-600">{stat.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Technical Specifications */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Comprehensive specifications for our isolation transformers
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-lg font-bold">Parameter</th>
                    <th className="px-6 py-4 text-left text-lg font-bold">3-Phase</th>
                    <th className="px-6 py-4 text-left text-lg font-bold">1-Phase</th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="px-6 py-4 text-lg font-semibold text-slate-900">{spec.parameter}</td>
                      <td className="px-6 py-4 text-lg text-slate-800">{spec['3Phase']}</td>
                      <td className="px-6 py-4 text-lg text-slate-800">{spec['1Phase']}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features & Benefits - Fully Responsive Modern Design */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              Key Features & Benefits
            </h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto">
              Advanced features designed for maximum performance and safety
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col bg-white rounded-2xl shadow-md border border-slate-200 p-5 sm:p-6 hover:shadow-lg transition-shadow duration-200 min-h-[260px]"
              >
                <div className="flex items-center gap-3 mb-2 flex-nowrap min-w-0">
                  <span className={`flex-shrink-0 bg-gradient-to-r ${feature.color} rounded-lg p-2 shadow-md flex items-center justify-center text-white`}>{feature.icon}</span>
                  <span className="text-lg sm:text-xl font-bold text-slate-900 truncate">{feature.title}</span>
                </div>
                <span className="text-sm text-slate-600 mb-3 block">{feature.subtitle}</span>
                <ul className="flex flex-col gap-2 mt-1">
                  {feature.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-slate-800 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-900 via-indigo-900 to-purple-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Power Your Operations?
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
                Get in touch with our experts to find the perfect transformer solution for your specific needs. 
                We provide comprehensive support and customized solutions.
              </p>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={() => window.location.href = '/contact/sales'}
                className="bg-white text-blue-900 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-3"
              >
                <Mail className="w-6 h-6" />
                Contact Our Experts
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
