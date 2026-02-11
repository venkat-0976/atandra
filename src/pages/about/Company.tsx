import React, { useState, useEffect } from 'react';
import {
  Award,
  Users,
  Shield,
  Building,
  Globe,
  CheckCircle,
  Star,
  Trophy,
  HandHeart,
  Target,
  Eye,
  MapPin,
  Zap,
  HardDrive,
  Network,
  Cloud,
  Wifi,
  Battery,
  TrendingUp,
  Monitor,
  Settings,
  BarChart3,
  Wrench
} from 'lucide-react';
import CountUp from 'react-countup';
import PageLayout from '../../components/layout/PageLayout';
import SeoHead from '@/seo/SeoHead';

// SSR-safe icon renderer helper
// Handles forward ref components from lucide-react during SSR
const renderIcon = (IconComponent: any, props: any = {}) => {
  if (!IconComponent) return null;

  // Type assertion to tell TypeScript/React that this is a valid component type
  // This works for both function components and forward ref components
  const Component = IconComponent as React.ComponentType<any>;
  return React.createElement(Component, props);
};

// CompanyStory Component
const CompanyStory = () => (
  <div className="py-12 sm:py-16 lg:py-20 bg-white w-full overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-10">
        <div className="relative inline-block mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black relative z-10 pb-3 font-['Open_Sans']">
            Network of Trust
          </h2>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-black rounded-full shadow-lg"></div>
        </div>

        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
          <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-gray-400"></div>
          <span className="text-sm sm:text-base md:text-lg text-black tracking-wider uppercase px-4 py-2 bg-gray-50 rounded-full border border-gray-300 font-['Open_Sans'] font-semibold">
            Nationwide Service Excellence
          </span>
          <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-gray-400"></div>
        </div>

        <p className="text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed font-medium font-['Open_Sans'] max-w-4xl mx-auto">
          We built this nationwide footprint so you can focus on running your business, not chasing service calls. Fast response times, genuine parts, and expert technicians are just a phone call away—no matter how spread out your operations might be.
        </p>
      </div>

      {/* New Layout - India Map Centered with Features on Left and Right */}
      <div className="relative">
        {/* Main Container with 3 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* Left Features */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">🚩</span>
                <div>
                  <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-['Open_Sans']">Nationwide Coverage</h4>
                  <p className="text-sm sm:text-base md:text-lg text-gray-700 font-['Open_Sans'] font-medium">100+ centers across every state and key industrial region.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">⚡</span>
                <div>
                  <h4 className="font-bold text-black text-lg font-['Open_Sans'] mb-2">24-Hour Response</h4>
                  <p className="text-sm text-gray-700 font-['Open_Sans'] leading-relaxed">Guaranteed on-site support within 24 hours, 365 days a year.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">👨‍🔧</span>
                <div>
                  <h4 className="font-bold text-black text-lg font-['Open_Sans'] mb-2">Certified Technicians</h4>
                  <p className="text-sm text-gray-700 font-['Open_Sans'] leading-relaxed">Local engineers trained on latest UPS technologies.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Center - India Map (Larger Size) */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full max-w-lg bg-gradient-to-br from-blue-50 via-white to-indigo-100 rounded-2xl shadow-2xl overflow-hidden border border-blue-200 transform transition-all duration-300 hover:scale-[1.02]">
              <div className="p-8">
                <img
                  src="/background_images/Service-Locations-India.jpeg"
                  alt="India Service Locations Map - Krykard Network Coverage"
                  className="w-full h-auto rounded-xl shadow-lg"
                  style={{
                    minHeight: '400px',
                    maxHeight: '500px',
                    aspectRatio: '4/3',
                    objectFit: 'contain'
                  }}
                  loading="eager"
                  onError={(e) => {
                    console.error('India map failed to load:', e);
                    const fallback = e.currentTarget.parentElement?.querySelector('.map-fallback');
                    if (fallback) {
                      fallback.classList.remove('hidden');
                      e.currentTarget.style.display = 'none';
                    }
                  }}
                />
                {/* Fallback content */}
                <div className="map-fallback hidden flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-600 rounded-xl" style={{ minHeight: '400px' }}>
                  <div className="text-center p-6">
                    {React.createElement(MapPin, { className: "h-20 w-20 mx-auto mb-4 text-blue-500" })}
                    <p className="text-2xl font-bold text-blue-800 font-['Open_Sans']">India Service Network</p>
                    <p className="text-lg font-medium text-blue-600 font-['Open_Sans']">100+ Centers Nationwide</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-3 space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">🛠️</span>
                <div>
                  <h4 className="font-bold text-black text-lg font-['Open_Sans'] mb-2">Stocked Inventory</h4>
                  <p className="text-sm text-gray-700 font-['Open_Sans'] leading-relaxed">Genuine replacement parts available at every center.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">📞</span>
                <div>
                  <h4 className="font-bold text-black text-lg font-['Open_Sans'] mb-2">24/7 Helpline</h4>
                  <p className="text-sm text-gray-700 font-['Open_Sans'] leading-relaxed">Toll-free support line for instant troubleshooting.</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
              <div className="flex items-start gap-3">
                <span className="text-black text-2xl flex-shrink-0">🔄</span>
                <div>
                  <h4 className="font-bold text-black text-lg font-['Open_Sans'] mb-2">Preventive Maintenance</h4>
                  <p className="text-sm text-gray-700 font-['Open_Sans'] leading-relaxed">Scheduled inspections to minimize downtime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats - Single Row Below Map */}
        <div className="flex justify-center gap-4 mt-8">
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 font-['Open_Sans']">24/7</div>
            <div className="text-xs sm:text-sm font-bold text-black font-['Open_Sans']">Support Available</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 font-['Open_Sans']">24hrs</div>
            <div className="text-xs sm:text-sm font-bold text-black font-['Open_Sans']">Response Time</div>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 text-center border border-gray-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
            <div className="text-2xl sm:text-3xl font-bold text-black mb-1 font-['Open_Sans']">100%</div>
            <div className="text-xs sm:text-sm font-bold text-black font-['Open_Sans']">Genuine Parts</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default function Company() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    content: false,
    achievements: false,
    facilities: false,
    resources: false,
    visionMission: false,
    companyStory: false,
  });

  useEffect(() => {
    // Skip during SSR
    if (typeof window === 'undefined' || typeof document === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({
              ...prev,
              [entry.target.id]: true
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-section]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const statsData = [
    {
      icon: Trophy,
      title: "#1 Position",
      subtitle: "India's No.1 Servo Stabilizer Manufacturer",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200"
    },
    {
      icon: Users,
      number: 100,
      title: "Service Centers Nationwide",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      icon: HandHeart,
      number: 40,
      title: "Years of Industry Experience",
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      icon: Shield,
      title: "Global Standards",
      subtitle: "CE Certified Products",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const achievements = [
    {
      number: 500000,
      suffix: "+",
      title: "Power Conditioner Installations",
      description: "Trusted by thousands of customers"
    },
    {
      number: 150000,
      suffix: "+",
      title: "Load Manager Installations",
      description: "Efficient energy management solutions"
    },
    {
      number: 450,
      suffix: "+",
      title: "Skilled Professionals",
      description: "Expert engineers and technicians"
    }
  ];

  const facilities = [
    {
      title: "R&D Department",
      description: "Advanced Power Electronics and Electro-magnetics research with cutting-edge innovation labs",
      icon: "🔬",
      gradient: "from-blue-500 to-indigo-600",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      iconBg: "bg-blue-500",
      features: ["Power Electronics Research", "Electro-magnetics Lab", "Innovation Center", "Patent Development"]
    },
    {
      title: "Software Development",
      description: "Energy management software and Industry 4.0 solutions with AI-powered analytics",
      icon: "💻",
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      borderColor: "border-green-200",
      iconBg: "bg-green-500",
      features: ["AI-Powered Analytics", "Industry 4.0 Solutions", "Cloud Integration", "Mobile Applications"]
    },
    {
      title: "Manufacturing Hub",
      description: "State-of-the-art production facilities with advanced testing laboratories",
      icon: "🏭",
      gradient: "from-purple-500 to-violet-600",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      borderColor: "border-purple-200",
      iconBg: "bg-purple-500",
      features: ["Automated Production", "Testing Laboratories", "Quality Assurance", "Lean Manufacturing"]
    },
    {
      title: "Quality Control",
      description: "Comprehensive quality assurance systems ensuring product excellence",
      icon: "✅",
      gradient: "from-orange-500 to-red-600",
      bgColor: "bg-gradient-to-br from-orange-50 to-red-50",
      borderColor: "border-orange-200",
      iconBg: "bg-orange-500",
      features: ["ISO Certification", "Global Standards", "Continuous Testing", "Performance Validation"]
    }
  ];

  const capabilities = [
    {
      icon: Building,
      title: "Manufacturing Excellence",
      subtitle: "World-Class Production Infrastructure",
      description: "Advanced manufacturing facilities with cutting-edge technology and automated production lines",
      features: [
        "State-of-the-art production facilities",
        "Advanced testing laboratories",
        "Quality control systems",
        "Automated assembly lines",
        "Lean manufacturing processes"
      ],
      stats: "40+ Years",
      color: "blue",
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      icon: Users,
      title: "Expert Team",
      subtitle: "Skilled Professionals & Specialists",
      description: "Highly qualified engineers and technicians with decades of combined experience",
      features: [
        "450+ skilled professionals",
        "Expert engineers & technicians",
        "Dedicated R&D specialists",
        "Certified service engineers",
        "Continuous training programs"
      ],
      stats: "450+ Experts",
      color: "green",
      gradient: "from-green-500 to-emerald-600"
    },
    {
      icon: Globe,
      title: "Service Network",
      subtitle: "Nationwide Coverage & Support",
      description: "Comprehensive service network ensuring rapid response and local expertise",
      features: [
        "100+ service centers",
        "24/7 technical support",
        "Pan-India coverage",
        "Local spare parts inventory",
        "Preventive maintenance programs"
      ],
      stats: "100+ Centers",
      color: "purple",
      gradient: "from-purple-500 to-violet-600"
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      subtitle: "Certified Excellence Standards",
      description: "Rigorous quality control processes ensuring product reliability and performance",
      features: [
        "ISO 9001:2015 certified",
        "CE marking compliance",
        "In-house testing facilities",
        "Third-party validation",
        "Continuous improvement"
      ],
      stats: "ISO Certified",
      color: "orange",
      gradient: "from-orange-500 to-red-600"
    },
    {
      icon: Award,
      title: "Innovation Hub",
      subtitle: "R&D & Technology Leadership",
      description: "Cutting-edge research and development driving industry innovation",
      features: [
        "Advanced R&D facilities",
        "Patent development",
        "Technology partnerships",
        "Industry 4.0 integration",
        "AI-powered solutions"
      ],
      stats: "50+ Patents",
      color: "indigo",
      gradient: "from-indigo-500 to-blue-600"
    },
    {
      icon: Star,
      title: "Customer Success",
      subtitle: "Proven Track Record",
      description: "Decades of successful implementations and satisfied customers across industries",
      features: [
        "500,000+ installations",
        "99.9% customer satisfaction",
        "Long-term partnerships",
        "Custom solutions",
        "After-sales support"
      ],
      stats: "500K+ Installations",
      color: "teal",
      gradient: "from-teal-500 to-cyan-600"
    }
  ];

  return (
    <>
      <SeoHead
        title="About Us | Atandra Energy"
        description="Atandra Energy - India's leading power management solutions company with 40+ years of excellence in servo stabilizers, UPS systems, and energy management. 100+ service centers nationwide."
        keywords="Atandra Energy, about us, company history, servo stabilizer manufacturer, UPS systems manufacturer, power management solutions, India power solutions"
        canonical="https://atandra.in/about/company"
      />
      <div className="font-['Open_Sans']">
        <PageLayout
          hideHero={true}
        >

          {/* Hide Breadcrumbs and Apply Open Sans Font */}
          <style>{`
          nav.mb-10 { display: none !important; }
          .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }

          /* Apply Open Sans font family consistently */
          * {
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }

          /* Ensure proper font weights and sizes */
          h1, h2, h3, h4, h5, h6 {
            font-family: 'Open Sans', sans-serif !important;
            font-weight: 700 !important;
          }

          p, span, div {
            font-family: 'Open Sans', sans-serif !important;
          }

          button {
            font-family: 'Open Sans', sans-serif !important;
            font-weight: 600 !important;
          }
        `}</style>

          {/* Simple Clean Title Section */}
          <div className="relative bg-blue-100 py-6 sm:py-8 lg:py-10 overflow-hidden">
            {/* Animated/Decorative Background Effects */}
            <div className="absolute inset-0 pointer-events-none z-0">
              {/* Blurred blobs */}
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-3xl animate-pulse-slow" />
              <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-200 opacity-20 rounded-full blur-2xl animate-pulse-slower" />
              <div className="absolute -bottom-10 right-0 w-48 h-48 bg-cyan-200 opacity-25 rounded-full blur-3xl animate-pulse-slow" />
              {/* Animated DNA SVG */}
              <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[120px] opacity-40" viewBox="0 0 420 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path>
                    <animate attributeName="d" dur="4s" repeatCount="indefinite"
                      values="M0,60 Q70,10 140,60 T280,60 T420,60;M0,60 Q70,110 140,60 T280,60 T420,60;M0,60 Q70,10 140,60 T280,60 T420,60" />
                  </path>
                  <circle r="7" fill="#2563eb">
                    <animate attributeName="cx" values="0;140;280;420" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="60;60;60;60" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle r="7" fill="#06b6d4">
                    <animate attributeName="cx" values="420;280;140;0" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="60;60;60;60" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle r="5" fill="#6366f1">
                    <animate attributeName="cx" values="70;210;350;70" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="35;85;35;35" dur="4s" repeatCount="indefinite" />
                  </circle>
                  <circle r="5" fill="#6366f1">
                    <animate attributeName="cx" values="350;210;70;350" dur="4s" repeatCount="indefinite" />
                    <animate attributeName="cy" values="85;35;85;85" dur="4s" repeatCount="indefinite" />
                  </circle>
                </g>
              </svg>
            </div>
            {/* Subtle overlay for depth */}
            <div className="absolute inset-0 bg-blue-100/80 z-10"></div>
            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-20">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-4 sm:mb-6 font-['Open_Sans']">
                About Us
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-black max-w-4xl mx-auto leading-relaxed font-['Open_Sans'] font-medium">
                Discover the power behind India's leading energy solutions
              </p>
            </div>
          </div>

          {/* Company Overview Section */}
          <section
            id="hero"
            data-section="hero"
            className={`py-16 px-4 sm:px-6 lg:px-8 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

                {/* Company Story */}
                <div className="space-y-8">
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 font-['Open_Sans']">Our Foundation</h2>
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                        {React.createElement(Building, { className: "w-6 h-6 text-white" })}
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="border-l-4 border-black pl-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-['Open_Sans']">Company Heritage</h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-['Open_Sans'] font-medium">
                          Atandra Energy Pvt. Ltd., headquartered in <strong className="text-black font-bold">Chennai</strong>,
                          draws upon a rich foundation of more than <strong className="text-black font-bold">40+ years of expertise </strong>
                          in the realm of Power & Energy Management.
                        </p>
                      </div>

                      <div className="border-l-4 border-black pl-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-['Open_Sans']">KRYKARD Brand Excellence</h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-['Open_Sans'] font-medium">
                          We offer solutions to industrial and commercial establishments under our prestigious brand
                          <strong className="text-black font-bold"> KRYKARD</strong>, serving customers across India with
                          innovative power management solutions.
                        </p>
                      </div>

                      <div className="border-l-4 border-black pl-6">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-black mb-2 font-['Open_Sans']">Quality Assurance</h3>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base md:text-lg font-['Open_Sans'] font-medium">
                          Our Servo Stabilizers and Transformers have obtained comprehensive certifications,
                          providing our customers with the assurance that these products adhere to rigorous global standards.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-bold">
                            CE Certification
                          </span>
                          <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-bold">
                            ISO Standards
                          </span>
                          <span className="bg-gray-100 text-black px-3 py-1 rounded-full text-sm font-bold">
                            Global Compliance
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="space-y-6">
                  {statsData.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                      <div key={index} className="bg-gray-50 border-gray-200 rounded-2xl p-6 border">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {stat.number ? (
                              <div className="text-3xl font-bold text-black mb-1">
                                <CountUp
                                  end={stat.number}
                                  duration={2.5}
                                  suffix="+"
                                  enableScrollSpy={typeof window !== 'undefined'}
                                  scrollSpyOnce
                                />
                              </div>
                            ) : (
                              <div className="text-2xl font-bold text-black mb-1">
                                {stat.title}
                              </div>
                            )}
                            <div className="text-gray-800 font-bold">
                              {stat.subtitle || stat.title}
                            </div>
                          </div>
                          <div className="w-14 h-14 rounded-xl flex items-center justify-center ml-4 bg-black">
                            {renderIcon(IconComponent, { className: "w-7 h-7 text-white" })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Vision & Mission Section */}
          <section
            id="visionMission"
            data-section="visionMission"
            className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden transition-all duration-1000 ${isVisible.visionMission ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Background Image */}
            <img
              src="/background_images/vision&mission.png"
              alt="Background"
              className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none z-0 transition-opacity duration-700"
            />

            {/* Animated gradient overlay */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="w-2/3 h-2/3 absolute top-0 left-1/4 bg-gradient-to-br from-blue-300/40 via-indigo-200/30 to-green-200/40 rounded-full blur-3xl animate-pulse-slow" />
              <div className="w-1/2 h-1/2 absolute bottom-0 right-0 bg-gradient-to-tr from-green-200/40 via-blue-100/30 to-indigo-200/40 rounded-full blur-2xl animate-pulse-slower" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Title Section */}
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-black drop-shadow-lg mb-4 font-['Open_Sans']">
                  Vision & Mission
                </h2>
                <span className="block mx-auto h-1 w-24 bg-black rounded-full" />
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto mt-4 font-['Open_Sans'] font-medium">
                  Our guiding principles that drive innovation and excellence in energy solutions
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Vision Card */}
                <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-gray-300/40 group overflow-hidden min-h-[340px]">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 border-4 border-transparent group-hover:border-gray-400/60" style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.08)' }}>
                    <div className="absolute inset-0 rounded-3xl border-2 border-gray-400/20" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 relative z-10">
                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icon with Glow */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gray-400/40 blur-xl opacity-70" />
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black shadow-lg">
                          {React.createElement(Eye, { className: "w-8 h-8 text-white drop-shadow-xl" })}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-wide font-['Open_Sans']">
                        Our Vision
                      </h3>
                    </div>

                    {/* Content */}
                    <ul className="text-slate-700 space-y-3 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed list-disc list-inside font-['Open_Sans'] font-medium">
                      <li><strong className="text-black font-bold">To achieve & sustain leadership positions</strong> and be the company of choice in all our areas of business</li>
                      <li><strong className="text-black font-bold">To be a great place to work</strong> where every employee values the environment & opportunity provided</li>
                      <li><strong className="text-black font-bold">To be the preferred partner</strong> for all our external stakeholders</li>
                    </ul>
                  </div>

                  {/* Subtle pattern */}
                  <div className="absolute right-2 bottom-2 w-24 h-24 bg-gray-100/30 rounded-full blur-2xl z-0" />
                </div>

                {/* Mission Card */}
                <div className="relative bg-white/50 backdrop-blur-xl rounded-3xl shadow-2xl border-0 transition-all duration-300 hover:scale-[1.02] hover:shadow-gray-300/40 group overflow-hidden min-h-[340px]">
                  {/* Animated Gradient Border */}
                  <div className="absolute inset-0 rounded-3xl pointer-events-none z-0 border-4 border-transparent group-hover:border-gray-400/60" style={{ boxShadow: '0 4px 32px 0 rgba(0,0,0,0.08)' }}>
                    <div className="absolute inset-0 rounded-3xl border-2 border-gray-400/20" />
                  </div>

                  {/* Content */}
                  <div className="p-8 lg:p-10 relative z-10">
                    {/* Header with Icon and Title */}
                    <div className="flex items-center gap-4 mb-6">
                      {/* Icon with Glow */}
                      <div className="relative flex-shrink-0">
                        <div className="absolute inset-0 w-full h-full rounded-2xl bg-gray-400/40 blur-xl opacity-70" />
                        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-black shadow-lg">
                          {React.createElement(Target, { className: "w-8 h-8 text-white drop-shadow-xl" })}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-black tracking-wide font-['Open_Sans']">
                        Our Mission
                      </h3>
                    </div>

                    {/* Content */}
                    <p className="text-slate-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-['Open_Sans'] font-medium">
                      To be a <strong className="text-black font-bold">respected Indian MNC</strong> offering <strong className="text-black font-bold">innovative solutions</strong> in the domain of power conditioning, measurement & conservation of energy and resources for a more sustainable world by offering <strong className="text-black font-bold">best-in-class Products and services</strong> with a committed & competent team ensuring <strong className="text-black font-bold">continual customer satisfaction</strong> with involved partners and Suppliers.
                    </p>
                  </div>

                  {/* Subtle pattern */}
                  <div className="absolute left-2 top-2 w-24 h-24 bg-gray-100/30 rounded-full blur-2xl z-0" />
                </div>
              </div>
            </div>
          </section>

          {/* Company Story - Network of Trust Section */}
          <section
            id="companyStory"
            data-section="companyStory"
            className={`transition-all duration-1000 ${isVisible.companyStory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <CompanyStory />
          </section>

          {/* Achievements Section with CountUp */}
          <section
            id="achievements"
            data-section="achievements"
            className={`py-16 px-4 sm:px-6 lg:px-8 bg-white transition-all duration-1000 ${isVisible.achievements ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Open_Sans']">Our Achievements</h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto font-['Open_Sans'] font-medium">
                  Numbers that speak for our commitment to excellence and customer satisfaction
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {achievements.map((achievement, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl p-8 text-center border border-gray-100">
                    <div className="text-4xl font-bold text-black mb-2">
                      {isVisible.achievements && (
                        <CountUp
                          end={achievement.number}
                          duration={2.5}
                          suffix={achievement.suffix}
                          separator=","
                          enableScrollSpy={typeof window !== 'undefined'}
                          scrollSpyOnce
                        />
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-black mb-2 font-['Open_Sans']">
                      {achievement.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600 font-['Open_Sans'] font-medium">
                      {achievement.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Enhanced Modern Facilities Section */}
          <section
            id="facilities"
            data-section="facilities"
            className={`py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden transition-all duration-1000 ${isVisible.facilities ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
              <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500 rounded-full blur-2xl"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
              {/* Enhanced Header */}
              <div className="text-center mb-16">
                <div className="relative inline-block mb-6">
                  <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black relative z-10 pb-3 font-['Open_Sans']">
                    Our Facilities
                  </h2>
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-black rounded-full shadow-lg"></div>
                </div>

                <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
                  <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-gray-400"></div>
                  <span className="text-base sm:text-lg font-bold text-black tracking-wider uppercase font-['Open_Sans'] px-4 py-2 bg-gray-50 rounded-full border border-gray-300">
                    World-Class Infrastructure
                  </span>
                  <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-gray-400"></div>
                </div>

                <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-['Open_Sans']">
                  State-of-the-art facilities equipped with cutting-edge technology, supporting innovation and excellence in every aspect of our operations
                </p>
              </div>

              {/* Enhanced Facilities Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
                {facilities.map((facility, index) => (
                  <div
                    key={index}
                    className={`group relative ${facility.bgColor} rounded-3xl p-8 lg:p-10 shadow-xl border ${facility.borderColor} transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl overflow-hidden`}
                  >
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${facility.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Header with Icon */}
                      <div className="flex items-start gap-6 mb-6">
                        {/* Remove the icon container here */}
                        <div className="flex-1">
                          <h3 className="text-2xl sm:text-3xl font-bold text-black mb-3 font-['Open_Sans'] group-hover:text-gray-800 transition-colors">
                            {facility.title}
                          </h3>
                          <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-['Open_Sans']">
                            {facility.description}
                          </p>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="space-y-3">
                        <h4 className="text-base sm:text-lg font-bold text-black uppercase tracking-wider font-['Open_Sans'] mb-4">Key Features</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {facility.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center gap-3 group/feature">
                              <div className="w-2 h-2 bg-black rounded-full flex-shrink-0 group-hover/feature:scale-125 transition-transform duration-200"></div>
                              <span className="text-base sm:text-lg text-gray-700 font-medium font-['Open_Sans'] group-hover/feature:text-gray-900 transition-colors">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Decorative Element */}
                      <div className="absolute top-4 right-4 w-20 h-20 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Krykard's Journey of Innovation and Growth Section */}
          <KrykardTimeline />
        </PageLayout>
      </div>
    </>
  );
}

// --- Krykard's Journey of Innovation and Growth Timeline Component ---
const KrykardTimeline = () => {
  const [activeEvent, setActiveEvent] = React.useState(null);
  const allEventsData = [
    { id: 0, year: "1985", icon: Zap, iconColor: "text-yellow-600", bgColor: "bg-yellow-50", title: "Launched KRYKARD brand", description: "", position: "top" },
    { id: 1, year: "1986", icon: Monitor, iconColor: "text-blue-600", bgColor: "bg-blue-50", title: "Launched Servo Stabiliser with Digital Display", description: "first in India", position: "bottom" },
    { id: 2, year: "1989", icon: HardDrive, iconColor: "text-indigo-600", bgColor: "bg-indigo-50", title: "Launched Portable Load Managers", description: "first in India", position: "top" },
    { id: 3, year: "1993", icon: Settings, iconColor: "text-green-600", bgColor: "bg-green-50", title: "Launched Panel Load Managers", description: "first in India", position: "bottom" },
    { id: 4, year: "1995", icon: Network, iconColor: "text-teal-600", bgColor: "bg-teal-50", title: "Installed first EMS Network", description: "", position: "top" },
    { id: 5, year: "2003", icon: BarChart3, iconColor: "text-purple-600", bgColor: "bg-purple-50", title: "Launched PQ Analyzers", description: "first in India", position: "bottom" },
    { id: 6, year: "2017", icon: Cloud, iconColor: "text-cyan-600", bgColor: "bg-cyan-50", title: "Launched Cloud Service portal & EFSR", description: "", position: "top" },
    { id: 7, year: "2018", icon: Building, iconColor: "text-orange-600", bgColor: "bg-orange-50", title: "Moved to new factory at Keezhkattalai", description: "", position: "bottom" },
    { id: 8, year: "2019", icon: Wifi, iconColor: "text-emerald-600", bgColor: "bg-emerald-50", title: "Launched Online UPS", description: "Installed 3.5MVA Servo Stabilizer", position: "top" },
    { id: 9, year: "2021", icon: Wrench, iconColor: "text-red-600", bgColor: "bg-red-50", title: "Launched Industry IOT 4.0 solutions", description: "", position: "bottom" },
    { id: 10, year: "2022", icon: Battery, iconColor: "text-violet-600", bgColor: "bg-violet-50", title: "Launched Static Voltage Regulators", description: "", position: "top" },
    { id: 12, year: "2024", icon: TrendingUp, iconColor: "text-rose-600", bgColor: "bg-rose-50", title: "Started the 100th Service Centre in India", description: "", position: "bottom" },
    { id: 11, year: "Now & Beyond", icon: Target, iconColor: "text-pink-600", bgColor: "bg-pink-50", title: "Our Journey of Growth continues...", description: "", position: "top" }
  ];
  const topEvents = allEventsData.filter(event => event.position === "top");
  const bottomEvents = allEventsData.filter(event => event.position === "bottom");
  const allEvents = allEventsData;
  const EventCard = ({ event, isTop = false, index }) => (
    <div
      className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${activeEvent === event.id ? 'scale-105' : 'hover:scale-102'
        } ${isTop ? 'mb-6 sm:mb-8 md:mb-12' : 'mt-6 sm:mt-8 md:mt-12'}`}
      onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
      style={{ minWidth: '100px', maxWidth: '120px' }}
    >
      <div className={`flex flex-col items-center ${isTop ? 'order-2' : ''}`}>
        <div className={`text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3 ${isTop ? 'order-3' : 'order-1'} text-black text-center font-['Open_Sans']`}>
          {event.year}
        </div>
        <div className={
          `w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg ${isTop ? 'order-2' : 'order-2'} ${event.bgColor} border-2 border-white`
        }>
          {renderIcon(event.icon, {
            size: 16,
            className: `sm:w-5 sm:h-5 md:w-6 md:h-6 ${event.iconColor}`
          })}
        </div>
        <div className={`mt-2 sm:mt-3 md:mt-4 text-center px-1 ${isTop ? 'order-1' : 'order-3'}`} style={{ maxWidth: '110px' }}>
          <h3 className="font-bold text-sm sm:text-base md:text-lg leading-tight mb-1 text-black font-['Open_Sans']">
            <strong>{event.title}</strong>
          </h3>
          {event.description && (
            <p className="text-xs sm:text-sm md:text-base leading-tight text-black hidden sm:block font-['Open_Sans'] font-medium">
              {event.description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2 font-['Open_Sans']">Krykard's Journey of Innovation and Growth</h2>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl mx-auto font-['Open_Sans'] font-medium">From humble beginnings to industry leadership - Four decades of relentless innovation, unwavering commitment, and transformative excellence</p>
      </div>
      <div className="max-w-full mx-auto overflow-x-auto">
        <div className="min-w-[1200px] px-4">
          <div className="flex justify-between items-end">
            {topEvents.map((event, index) => (
              <EventCard key={event.id} event={event} isTop={true} index={index} />
            ))}
          </div>
          <div className="relative">
            <div className="h-0.5 sm:h-1 bg-black relative">
              <div className="absolute inset-0 flex justify-between items-center">
                {allEvents.map((event, index) => (
                  <div
                    key={event.id}
                    className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-black transition-all duration-300 hover:bg-gray-700 cursor-pointer"
                    style={{ position: 'relative', marginTop: '-6px' }}
                    onClick={() => setActiveEvent(activeEvent === event.id ? null : event.id)}
                  />
                ))}
              </div>
              <div className="absolute -right-2 sm:-right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-l-4 sm:border-l-6 border-l-black border-t-2 sm:border-t-3 border-t-transparent border-b-2 sm:border-b-3 border-b-transparent"></div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-start">
            {bottomEvents.map((event, index) => (
              <EventCard key={event.id} event={event} isTop={false} index={index} />
            ))}
          </div>
        </div>
      </div>
      {activeEvent !== null && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-200 shadow-2xl p-3 sm:p-4 md:p-6 transform transition-transform duration-300 z-50 max-h-48 overflow-y-auto">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1">
              <div className={`w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${allEvents.find(e => e.id === activeEvent)?.bgColor || 'bg-blue-50'
                }`}>
                {renderIcon(
                  allEvents.find(e => e.id === activeEvent)?.icon || Zap,
                  {
                    size: 16,
                    className: `sm:w-5 sm:h-5 md:w-6 md:h-6 ${allEvents.find(e => e.id === activeEvent)?.iconColor || 'text-blue-600'}`
                  }
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-black truncate">
                  <strong>{allEvents.find(e => e.id === activeEvent)?.year} - {allEvents.find(e => e.id === activeEvent)?.title}</strong>
                </h3>
                <p className="text-xs sm:text-sm text-black">
                  {allEvents.find(e => e.id === activeEvent)?.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveEvent(null)}
              className="text-black hover:text-gray-700 text-xl sm:text-2xl font-bold ml-2 flex-shrink-0"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
