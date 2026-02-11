import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Brain, Target, Settings, CheckCircle, TrendingUp, Award, Users, Monitor, Factory, Cpu, Eye, Network, GitBranch, Layers, Activity, ArrowRight } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';
import SeoHead from '@/seo/SeoHead';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// Add ShootingStars component for 3D/shooting star effect
const ShootingStars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = canvas.width = canvas.offsetWidth;
    let height = canvas.height = canvas.offsetHeight;

    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const stars = Array.from({ length: 8 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height * 0.5,
      len: 120 + Math.random() * 80,
      speed: 2 + Math.random() * 2,
      size: 1.5 + Math.random() * 1.5,
      opacity: 0.5 + Math.random() * 0.5,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2 // ~45deg
    }));

    function draw() {
      ctx.clearRect(0, 0, width, height);
      for (const star of stars) {
        ctx.save();
        ctx.globalAlpha = star.opacity;
        ctx.strokeStyle = '#a7f3d0';
        ctx.lineWidth = star.size;
        ctx.beginPath();
        ctx.moveTo(star.x, star.y);
        ctx.lineTo(
          star.x - Math.cos(star.angle) * star.len,
          star.y - Math.sin(star.angle) * star.len
        );
        ctx.shadowColor = '#6ee7b7';
        ctx.shadowBlur = 12;
        ctx.stroke();
        ctx.restore();

        // Move star
        star.x += Math.cos(star.angle) * star.speed;
        star.y += Math.sin(star.angle) * star.speed;

        // Reset if out of bounds
        if (star.x > width + 100 || star.y > height + 100) {
          star.x = Math.random() * width * 0.5;
          star.y = -20;
        }
      }
      animationFrameId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ display: 'block' }}
    />
  );
};

const SmartFactorySolutionPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [countsStarted, setCountsStarted] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'Manufacturing Efficiency', value: '99.9%', displayValue: '99.9%', icon: TrendingUp, color: 'from-green-500 to-green-600' },
    { label: 'Cost Reduction', value: '25-40%', displayValue: '25-40%', icon: Award, color: 'from-green-500 to-emerald-600' },
    { label: 'Global Factories', value: '500+', displayValue: '500+', countTo: 500, icon: Factory, color: 'from-emerald-500 to-green-600' },
    { label: 'Data Points', value: '50M+', displayValue: '50M+', countTo: 50, icon: Monitor, color: 'from-green-600 to-green-700' }
  ];

  // Count-up animation state
  const [usersCount, setUsersCount] = useState(0);
  const [dataPointsCount, setDataPointsCount] = useState(0);

  // Intersection Observer for triggering count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countsStarted) {
          setCountsStarted(true);

          // Animate users count
          const usersTarget = 500;
          const usersDuration = 2000;
          const usersStartTime = Date.now();

          const animateUsers = () => {
            const elapsed = Date.now() - usersStartTime;
            const progress = Math.min(elapsed / usersDuration, 1);
            const current = Math.floor(progress * usersTarget);
            setUsersCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateUsers);
            }
          };

          // Animate data points count
          const dataTarget = 50;
          const dataDuration = 2500;
          const dataStartTime = Date.now();

          const animateData = () => {
            const elapsed = Date.now() - dataStartTime;
            const progress = Math.min(elapsed / dataDuration, 1);
            const current = Math.floor(progress * dataTarget);
            setDataPointsCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateData);
            }
          };

          // Start animations
          requestAnimationFrame(animateUsers);
          requestAnimationFrame(animateData);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countsStarted]);

  const addOnModules = [
    {
      title: 'Create intelligent closed-loop operations',
      description: 'CANTIER MES X.0 can drive the new generation of closed-loop systems that are powered by real-time digital data and intelligent orchestration to streamline workflows from start to finish.',
      icon: Cpu,
      features: ['Real-time digital data analysis', 'Intelligent workflow orchestration', 'Closed-loop system automation', 'Manufacturing spatial awareness']
    },
    {
      title: 'Gain shopfloor control with predictive Edge-Based AIOT Platform',
      description: 'CANTIER MES X.0 is designed to close manufacturing technology gaps now and in the future. It leverages an intelligent AIOT design to analyse data, deliver predictive insights and enable early intervention.',
      icon: Eye,
      features: ['Predictive equipment failure analysis', 'Real-time pattern recognition', 'Early intervention capabilities', 'Manufacturing reliability optimization']
    },
    {
      title: 'Depth of traceability and genealogy',
      description: 'Embedded with Digital Twin technology, CANTIER MES X.0 offers your manufacturing controllers a high degree of spatial awareness across workflows.',
      icon: GitBranch,
      features: ['Digital Twin technology integration', 'Complete product lifecycle tracking', 'Deep genealogy tracing', 'Quality assurance transparency']
    },
    {
      title: 'Distributed location production orchestration',
      description: 'In an age of growing production location diversity, CANTIER MES X.0 provides a unique level of flexibility. The solution can drive production orchestration across multiple sites.',

      icon: Network,
      features: ['Multi-site production coordination', 'Distributed workflow management', 'Resource allocation optimization', 'Global production visibility']
    },
    {
      title: 'Catch production anomalies automatically!',
      description: 'Instead of time lags in reacting to production process dysfunction or failure, you can now catch anomalies long before they impact your production, quality or delivery schedules.',
      icon: Monitor,
      features: ['Real-time anomaly detection', 'Intelligent alerts and contextual data analysis', 'Instant response to production anomalies', 'Quality issue prevention']
    },
    {
      title: 'Synchronize digital factories automatically',
      description: 'MES X.0s execution-driven synchronization optimizes digital workflows, reducing wait times and eliminating unnecessary delays.',
      icon: Activity,
      features: ['Digital workflow optimization', 'Wait time reduction', 'Value-added activities focus', 'Shopfloor performance boost']
    },
    {
      title: 'Centralized Equipment Control Tower',
      description: 'If you are looking for ways to optimize maintenance for availability versus ever increasing costs, CANTIER MES X.0 gives you advanced capabilities.',
      icon: Brain,
      features: ['Generative AI for historical analysis', 'Predictive maintenance schedules', 'Cost and availability balance', 'Equipment lifespan extension']
    },
    {
      title: 'Digital Twin Integration',
      description: 'Complete digital representation of manufacturing processes for enhanced control and monitoring',
      icon: Layers,
      features: ['Virtual factory modeling', 'Real-time synchronization', 'Predictive simulation', 'Process optimization']
    }
  ];

  const coreFeatures = [
    'Flow-based and micro-service architecture',
    'Unprecedented flexibility and scalability',
    'Real-time factory-floor data streams',
    'Efficient execution of manufacturing operations',
    'Seamless customizable workflow integration',
    'Intelligence-first approach for adaptability',
    'High levels of efficiency and compliance',
    'Precision manufacturing control'
  ];

  const benefits = [
    {
      title: 'Intelligence-Driven Manufacturing',
      description: 'Leverage AI and machine learning for smarter manufacturing decisions and process optimization',
      icon: Brain
    },
    {
      title: 'Flexible Architecture',
      description: 'Flow-based and micro-service architecture offering unprecedented flexibility for manufacturing operations',
      icon: Settings
    },
    {
      title: 'Real-time Operations',
      description: 'Utilize real-time factory-floor data streams for efficient execution of manufacturing operations',
      icon: Activity
    },
    {
      title: 'Manufacturing Excellence',
      description: 'Achieve high levels of efficiency, compliance and precision in manufacturing processes',
      icon: Award
    }
  ];

  const manufacturingBenefits = [
    {
      title: 'Deliver productivity with optimal resources.',
      description: 'Achieve flawless deliveries for your manufacturing business by maximizing resource utilization and maintaining precise control over production right across the shopfloor.',
      icon: TrendingUp
    },
    {
      title: 'Enable quality in process and by design.',
      description: 'Integrate quality at every stage, ensuring consistency and compliance through proactive process management enabled by a responsive intelligence and insight driven system.',
      icon: CheckCircle
    },
    {
      title: 'Balance cost with adaptability to changes.',
      description: 'Optimize costs while maintaining the flexibility to adapt swiftly to shifting production demands without undue challenges.',
      icon: Award
    },
    {
      title: 'Elevate engineering for accelerated innovation',
      description: 'Drive faster innovation cycles by empowering engineering teams with advanced tools and real-time insights that enable quicker responses and decision making.',
      icon: Brain
    }
  ];

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Cantier Smart Factory Solution",
    "description": "Cantier Smart Factory Solution offers real-time visibility, predictive analytics, and intelligent automation. Achieve up to 99.9% efficiency, 25–40% cost reduction, Digital Twin integration, and AIoT-powered predictive maintenance.",
    "applicationCategory": "BusinessApplication",
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      // "priceCurrency": "INR",
      // "price": "0"
    },
    "provider": {
      "@type": "Organization",
      "name": "Atandra Energy Pvt Ltd"
    }
  };

  return (
    <>
      <SeoHead
        title="Smart Factory Solution – Cantier MES for Manufacturing"
        description="Smart Factory Solution delivers real-time visibility and automation with 99.9% efficiency, 25–40% cost reduction, Digital Twin and AIoT"
        keywords="smart factory, MES, manufacturing execution system, digital twin, AIOT, predictive analytics, manufacturing automation, Industry 4.0, smart manufacturing, factory optimization"
        canonical="https://atandra.in/conserve/smart-factory-solution"
        ogImage="/background_images/conserve.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/conserve.png"
      />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#e6f7f1]">
        <PageLayout hideHero={true} hideBreadcrumbs={true}>
          {/* Remove any extra top padding from PageLayout's content wrapper, like Company.tsx */}
          <style>{`
          .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
        `}</style>
          {/* Main Title Section with 3D/Blurred Background Elements */}
          <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
            {/* Hero Background Elements (matching OnPremiseSystems style) */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-green-50 rounded-bl-[100px] transform -skew-x-12"></div>
              <div className="absolute bottom-20 left-0 w-64 h-64 bg-green-400 rounded-full opacity-10"></div>
            </div>
            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-20">
              <h1 className="typography-h1 font-bold text-green-900 mb-4 leading-tight">
                Smart Factory Solution
              </h1>
              <p className="typography-h3 text-emerald-800 max-w-3xl mx-auto font-semibold mb-3">
                Empowering Digital Transformation with Cantier MES X.0
              </p>
              <p className="typography-body text-gray-800 font-semibold max-w-2xl mx-auto">
                Cantier Smart Factory Solution delivers real-time visibility, predictive analytics, and intelligent automation for next-generation manufacturing. Achieve seamless integration, closed-loop operations, and data-driven decision-making across your global production network.
              </p>
            </div>
          </div>
          {/* Hero Section (restored, as originally designed) */}
          <div className="relative overflow-hidden">
            {/* Backgrounds and floating elements */}
            <div className="absolute inset-0 bg-[#e6f7f1]"></div>
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-2 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-4 right-2 w-20 h-20 sm:w-32 sm:h-32 bg-gradient-to-br from-emerald-200/25 to-green-300/20 rounded-full blur-xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-br from-green-200/20 to-emerald-300/15 rounded-full blur-lg animate-pulse delay-500"></div>
            </div>
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
              <div className="absolute inset-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%2316a34a' stroke-width='1'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")` }}></div>
            </div>
            {/* Hero Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                {/* Left Content */}
                <div className="order-1 text-center lg:text-left space-y-6 sm:space-y-8">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Main Heading */}
                    <div className="space-y-3">
                      <h2 className="typography-h2 font-black leading-tight">
                        <span className="text-black block">Atandra is partnering with</span>
                        <span className="text-red-600 block">CANTIER MES X.0</span>
                        <span className="text-black block">for Smart Factory Solution</span>
                      </h2>
                    </div>
                    {/* Description */}
                    <p className="typography-body text-gray-800 font-semibold max-w-2xl mx-auto lg:mx-0">
                      Take a transformative leap in agile and resilient manufacturing ecosystems. Experience the next generation of
                      <span className="text-green-700 font-black"> intelligence-driven manufacturing automation</span> with CANTIER MES X.0.
                    </p>
                    <p className="typography-body text-gray-800 font-semibold max-w-2xl mx-auto lg:mx-0">
                      Integrating advanced digital MES technologies, CANTIER MES X.0 leverages
                      <span className="text-emerald-700 font-black"> Artificial Intelligence & Internet of Things</span> to analyse real-time factory-floor data streams for
                      <span className="text-green-700 font-black"> actionable insights</span> that enable generational change in manufacturing visibility, traceability, adaptability and control.
                    </p>
                    {/* Key Highlights */}
                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-md min-h-[40px]">
                        <CheckCircle className="w-5 h-5 text-green-700" />
                        <span className="typography-body text-black">Flow-based Architecture</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200 shadow-md min-h-[40px]">
                        <CheckCircle className="w-5 h-5 text-emerald-700" />
                        <span className="typography-body text-black">Digital Twin Technology</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-green-200 shadow-md min-h-[40px]">
                        <CheckCircle className="w-5 h-5 text-green-700" />
                        <span className="typography-body text-black">AI-Powered Intelligence</span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right Content - Image */}
                <div className="order-2 relative flex items-center justify-center mt-6 lg:mt-0">
                  <div className="relative group w-full max-w-[260px] sm:max-w-xs mx-auto lg:max-w-none">
                    <div className="relative overflow-hidden rounded-2xl shadow-xl">
                      <img
                        src="/VF1.png"
                        alt="Smart Factory Solution System"
                        className="w-full h-auto object-cover group-hover:scale-105 transition-all duration-700"
                        loading="lazy"
                        decoding="async"
                        width={320}
                        height={240}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Manufacturing Orchestration Diagram Section */}
          <div className="py-6 sm:py-8 relative overflow-hidden mb-8" style={{ backgroundColor: '#e6f7f1' }}>
            <div className="absolute inset-0" style={{ backgroundColor: '#e6f7f1' }}></div>
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="typography-h1 font-bold text-black mb-6">
                  Manufacturing Orchestration
                </h2>
                <p className="typography-h3 text-black max-w-3xl mx-auto">
                  CANTIER MES X.0 integrates advanced digital MES technologies with Digital Twin at the center
                </p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center min-h-[300px] sm:min-h-[400px]">
                {/* Left Side - Image Only */}
                <div className="flex justify-center items-center">
                  <div className="w-full max-w-[320px] sm:max-w-md md:max-w-lg">
                    <img
                      src="/Cantier-MES-X.0-Product-Circle.png"
                      alt="Manufacturing Orchestration Technology"
                      className="w-full h-auto object-contain"
                      loading="lazy"
                      width={320}
                      height={240}
                    />
                  </div>
                </div>
                {/* Right Side - Content Cards */}
                <div className="flex items-center justify-center lg:justify-start">
                  <div className="w-full max-w-md space-y-6">
                    {/* Execution Card */}
                    <div className="bg-gradient-to-r from-teal-700/90 to-teal-600/90 backdrop-blur-sm border border-teal-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:scale-105 transition-all duration-300">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="bg-teal-400/30 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-teal-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="typography-h3 font-semibold text-orange-400 mb-2 sm:mb-3">Execution</h3>
                          <p className="typography-body text-white">
                            Smart operations for complete production control
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* AIOT Card */}
                    <div className="bg-gradient-to-r from-teal-700/90 to-teal-600/90 backdrop-blur-sm border border-teal-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:scale-105 transition-all duration-300">
                      <div className="flex items-start space-x-3 sm:space-x-4">
                        <div className="bg-teal-400/30 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 mt-1">
                          <svg className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-teal-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="typography-h3 font-semibold text-orange-400 mb-2 sm:mb-3">AIOT</h3>
                          <p className="typography-body text-white">
                            Unified data intelligence for manufacturing optimization
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Digital Twin Card */}
                    <div className="bg-gradient-to-r from-teal-700/90 to-teal-600/90 backdrop-blur-sm border border-teal-400/30 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl hover:scale-105 transition-all duration-300">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="bg-teal-400/30 p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0">
                          <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-teal-200" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="typography-h4 font-semibold text-orange-400 mb-2 sm:mb-3">Digital Twin</h3>
                          <p className="typography-body text-white">
                            Immersive factory visualization through AI technologies
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drive Performance Section */}
          <div className="py-6 sm:py-8 relative overflow-hidden mb-8" style={{ backgroundColor: '#e6f7f1' }}>
            <div className="absolute inset-0" style={{ backgroundColor: '#e6f7f1' }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-4 rounded-lg">
                    <h2 className="typography-h3 font-black mb-4">
                      Drive performance and innovation with Immersive Digital Twin.
                    </h2>
                  </div>

                  <div className="backdrop-blur-sm rounded-xl p-6 text-gray-800" style={{ backgroundColor: 'rgba(230, 247, 241, 0.9)' }}>
                    <p className="typography-body font-medium">
                      Replicate your physical shopfloor assets and systems in a digital environment. Gain a whole new range of spatial awareness with the immersive Digital Twin capabilities of Cantier MES X.0. The augmented digital technology, enables enhanced digital visualisations that allows you to monitor, analyse, and optimize performance by modelling scenarios and predicting outcomes. You can simulate changes, foresee disruptions, and proactively adjust workflows, driving smarter actions and elevating factory performance.
                    </p>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&auto=format"
                      alt="Digital Twin Technology"
                      className="w-full h-auto object-cover"
                      loading="lazy"
                      width={1920}
                      height={1080}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits for Manufacturing Business Section */}
          <div className="py-6 sm:py-8 relative overflow-hidden mb-8" style={{ backgroundColor: '#e6f7f1' }}>
            <div className="absolute inset-0" style={{ backgroundColor: '#e6f7f1' }}></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-12">
                <h2 className="typography-h1 font-bold text-black mb-8">
                  Benefits for your manufacturing business
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                {manufacturingBenefits.map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <div key={index} className="group">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2">
                        <div className="flex items-start space-x-4 mb-4">
                          <div className="bg-gradient-to-br from-orange-500 to-red-500 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg flex-shrink-0">
                            <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="typography-h3 font-semibold text-black mb-4 font-['Open_Sans']">
                              {benefit.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-black leading-relaxed font-normal typography-body font-['Open_Sans']">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Stats Section - Responsive Box Layout */}
          <div ref={statsRef} className="py-6 sm:py-8 relative overflow-hidden w-full mb-10" style={{ backgroundColor: '#e6f7f1' }}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="typography-h1 font-bold text-black mb-4">
                  Manufacturing Performance
                </h2>
                <p className="typography-h3 text-black max-w-2xl mx-auto">
                  Experience unmatched reliability and efficiency with CANTIER MES X.0 platform
                </p>
              </div>

              {/* Desktop Table Layout (lg and above) */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-xl shadow-2xl border border-green-100 overflow-hidden">
                  {/* Table Header Row */}
                  <div className="grid grid-cols-4 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 text-center border-r border-green-100 last:border-r-0">
                        <h3 className="typography-h4 font-semibold text-black leading-tight font-['Open_Sans']">
                          {stat.label}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Table Values Row */}
                  <div className="grid grid-cols-4 bg-white">
                    {stats.map((stat, index) => {
                      const getDisplayValue = () => {
                        if (stat.countTo === 500) {
                          return countsStarted ? `${usersCount}+` : '0+';
                        } else if (stat.countTo === 50) {
                          return countsStarted ? `${dataPointsCount}M+` : '0M+';
                        }
                        return stat.displayValue;
                      };

                      return (
                        <div key={index} className="p-4 text-center border-r border-green-100 last:border-r-0 group hover:bg-green-50 transition-all duration-300">
                          <div className="typography-h2 font-bold text-black group-hover:text-black transition-colors font-['Open_Sans']">
                            {getDisplayValue()}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Mobile & Tablet Box Layout (below lg) */}
              <div className="lg:hidden">
                <div className="grid grid-cols-2 gap-4 sm:gap-6 max-w-2xl mx-auto">
                  {stats.map((stat, index) => {
                    const getDisplayValue = () => {
                      if (stat.countTo === 500) {
                        return countsStarted ? `${usersCount}+` : '0+';
                      } else if (stat.countTo === 50) {
                        return countsStarted ? `${dataPointsCount}M+` : '0M+';
                      }
                      return stat.displayValue;
                    };

                    return (
                      <div key={index} className="bg-white rounded-xl shadow-lg border border-green-100 p-4 sm:p-6 text-center group hover:shadow-xl transition-all duration-300 hover:scale-105">
                        {/* Label */}
                        <div className="mb-3 sm:mb-4">
                          <h3 className="typography-h4 font-semibold text-black leading-tight font-['Open_Sans'] px-1">
                            {stat.label}
                          </h3>
                        </div>

                        {/* Value */}
                        <div className="typography-h2 font-bold text-green-600 group-hover:text-green-700 transition-colors font-['Open_Sans']">
                          {getDisplayValue()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Section with Tabs */}
          <div className="py-6 sm:py-8 relative" style={{ backgroundColor: '#e6f7f1' }}>
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8 sm:mb-10">
                <h2 className="typography-h1 font-bold text-black mb-6 sm:mb-8 font-['Open_Sans']">
                  Why choose CANTIER MES X.0?
                </h2>
                <p className="typography-body text-black max-w-4xl mx-auto font-normal leading-relaxed font-['Open_Sans']">
                  Globally, CANTIER places the highest emphasis on MES implementation. Intelligence is placed where it matters most - at the heart of your workflow operations. The CANTIER MES X.0 solution is built on a
                  <span className="text-black font-bold"> flow-based and micro-service architecture</span> that offers unprecedented flexibility.
                </p>
              </div>

              {/* Tab Navigation */}
              <div className="flex flex-wrap justify-center mb-8 sm:mb-10 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-2xl max-w-4xl mx-auto border border-green-100/50">
                {[
                  { id: 'overview', label: 'Why choose CANTIER MES X.0?', icon: Target },
                  { id: 'features', label: 'Core Features', icon: Settings },
                  // { id: 'benefits', label: 'Benefits', icon: Award },
                  { id: 'modules', label: 'MES Modules', icon: Factory }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`group flex items-center px-3 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-semibold typography-body transition-all duration-300 font-['Open_Sans'] m-1 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg transform scale-105'
                        : 'text-black hover:bg-green-50 hover:text-black'
                        }`}
                    >
                      <TabIcon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:scale-110 transition-transform" />
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 xl:p-10 border border-green-100/50">
                {activeTab === 'overview' && (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="space-y-3">
                      <h3 className="typography-h2 font-semibold text-black font-['Open_Sans']">
                        Why Choose CANTIER MES X.0?
                      </h3>
                      <p className="typography-body text-black leading-relaxed font-normal font-['Open_Sans']">
                        By integrating CANTIER MES X.0 with shopfloor services, you can utilise data in the efficient execution of manufacturing operations across production, quality, inventory, and maintenance, in a seamless, customizable way. This
                        <span className="text-black font-black"> intelligence-first approach</span> ensures that you can quickly adapt your manufacturing to changing demands while maintaining
                        <span className="text-black font-black"> high levels of efficiency, compliance and precision</span>.
                      </p>
                    </div>
                    <div className="space-y-3 sm:space-y-4">
                      <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all">
                        <div className="bg-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-black typography-h4 mb-2 font-['Open_Sans']">Flow-based Architecture</h4>
                          <p className="text-black font-normal typography-body font-['Open_Sans']">Built on a flow-based and micro-service architecture that offers unprecedented flexibility.</p>
                        </div>
                      </div>
                      <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl border border-emerald-100 hover:shadow-lg transition-all">
                        <div className="bg-emerald-600 p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-black typography-h4 mb-2 font-['Open_Sans']">Intelligence-First Approach</h4>
                          <p className="text-black font-normal typography-body font-['Open_Sans']">Intelligence is placed where it matters most - at the heart of your workflow operations.</p>
                        </div>
                      </div>
                      <div className="group flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all">
                        <div className="bg-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                          <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-black typography-h4 mb-2 font-['Open_Sans']">Manufacturing Excellence</h4>
                          <p className="text-black font-normal typography-body font-['Open_Sans']">Achieve high levels of efficiency, compliance and precision in manufacturing processes.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="typography-h2 font-semibold text-black mb-6 sm:mb-8 font-['Open_Sans']">
                        Core MES Features
                      </h3>
                      <p className="typography-body text-black max-w-3xl mx-auto font-normal font-['Open_Sans']">
                        Comprehensive manufacturing execution system capabilities designed for intelligent factories
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {coreFeatures.map((feature, index) => (
                        <div key={index} className="group">
                          <div className="flex items-center space-x-3 sm:space-x-4 p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl border border-green-100 hover:border-green-300 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="bg-green-600 p-2 rounded-lg group-hover:scale-110 transition-transform flex-shrink-0">
                              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="typography-body text-black font-normal leading-relaxed group-hover:text-black transition-colors font-['Open_Sans']">
                                {feature}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'modules' && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="typography-h2 font-semibold text-black mb-6 sm:mb-8 font-['Open_Sans']">
                        MES Capabilities
                      </h3>
                      <p className="typography-body text-black max-w-3xl mx-auto font-normal font-['Open_Sans']">
                        Comprehensive manufacturing execution system capabilities for intelligent factory operations
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {addOnModules.map((module, index) => {
                        const IconComponent = module.icon;
                        return (
                          <div key={index} className="group">
                            <div
                              className="bg-white/90 backdrop-blur-sm border border-green-100 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:shadow-2xl hover:border-green-300 transition-all duration-500 cursor-pointer transform hover:-translate-y-2"
                              onClick={() => setSelectedModule(selectedModule === index ? null : index)}
                            >
                              <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                </div>
                                <div className="flex-1">
                                  <h4 className="typography-h3 font-semibold text-black group-hover:text-black transition-colors font-['Open_Sans']">
                                    {module.title}
                                  </h4>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${selectedModule === index ? 'rotate-180' : ''}`} />
                              </div>
                              <p className="text-black font-normal typography-body mb-4 sm:mb-6 font-['Open_Sans']">
                                {module.description}
                              </p>
                              {selectedModule === index && (
                                <div className="space-y-2 pt-3 sm:pt-4 border-t border-green-100">
                                  {module.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-center space-x-2">
                                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                      <span className="text-black font-normal typography-body font-['Open_Sans']">{feature}</span>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Elevate Performance Section */}
          <div className="py-6 sm:py-8 relative overflow-hidden" style={{ backgroundColor: '#e6f7f1' }}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/10 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                  <h2 className="typography-h1 font-bold text-black mb-8 font-['Open_Sans']">
                    Elevate your performance horizons with Cantier.
                  </h2>
                </div>

                <div className="space-y-6 sm:space-y-8 text-black">
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-green-100">
                    <p className="typography-body leading-relaxed font-medium font-['Open_Sans']">
                      Harness AI-powered, next-generation Manufacturing Execution Systems (MES), from an industry leader that
                      is redefining the landscape of intelligent factories. With a focus on creating closed-loop manufacturing
                      systems that leverage artificial intelligence, IOT, and sophisticated data analytics, Cantier is creating powerful
                      digital technology solutions that streamline production processes, improve control and enhance operational
                      efficiency. Our aim is to make factories smarter, faster and more productive beyond Industry 4.0.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100">
                    <p className="typography-body leading-relaxed font-medium font-['Open_Sans']">
                      Headquartered in Singapore, Cantier brings together over 200 years of technology leadership experience to
                      empower digitally driven industries in semiconductor, electronics, automotive, and aerospace.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-green-100">
                    <p className="typography-body leading-relaxed font-medium font-['Open_Sans']">
                      Our next generation Cantier MES X.0 solution has been designed to raise the bar on capabilities by seamlessly
                      integrating legacy and modern manufacturing environments to provide real-time operations visibility,
                      predictive decision support, and autonomous operations.
                    </p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-emerald-100">
                    <p className="typography-body leading-relaxed font-medium font-['Open_Sans']">
                      As a global digital manufacturing technology leader, Cantier is committed to accelerating digital
                      transformation through innovative, customer-centric technology solutions that drive operational excellence
                      and sustainable growth. We are forging a new future for advanced manufacturing where agility, precision,
                      and intelligence lead the way.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Section - Separate & Distinct */}
          <section className="py-6 md:py-8 mb-16 md:mb-24 bg-gradient-to-br from-green-50 to-emerald-50 border-t-2 border-green-200 mt-6">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="pb-4"
              >
                <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-4">
                  Need More Information?
                </h2>
                <p className="text-base md:text-lg text-green-800 mb-6 font-medium max-w-xl mx-auto">
                  Our team of experts is ready to help you with product specifications, custom solutions, and pricing.
                </p>
                <Link
                  to="/contact/sales"
                  className="inline-flex px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-lg transition-all duration-300 items-center justify-center space-x-2 text-base mx-auto"
                >
                  <span>Contact Our Experts</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </div>
          </section>

          {/* Custom Animations */}
          <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(3deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-12px) rotate(-2deg); }
          }
          .animate-float {
            animation: float 5s ease-in-out infinite;
          }
          .animate-float-delayed {
            animation: float-delayed 6s ease-in-out infinite;
          }
          html {
            font-size: 16px;
          }
          body, .font-['Open_Sans'] {
            font-size: 1rem;
          }
          h1, h2, h3, h4, h5, h6 {
            line-height: 1.2;
          }
          @media (max-width: 640px) {
            html { font-size: 15px; }
            h1, h2, h3, h4, h5, h6 { font-size: 1.1em; }
          }
        `}</style>
        </PageLayout>
      </div>
    </>
  );
};

export default SmartFactorySolutionPage;