import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle, Shield, Zap, Database, Eye, TrendingUp, Award, Monitor, BarChart3, Users, Target, Settings, ChevronDown, FileText, Brain, Clock, Search, Circle, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import PageLayout from '@/components/layout/PageLayout';
import SeoHead from '@/seo/SeoHead';

// Animated Particle Background Component
const AnimatedParticles = ({ count = 30, color = "green" }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full bg-${color}-400/30`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, -200],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Floating Geometric Shapes Component
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`shape-${i}`}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 15 + Math.random() * 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        >
          <Circle className="w-6 h-6 text-green-300/20" />
        </motion.div>
      ))}
    </div>
  );
};

// Mobile-Responsive Card Component
const MobileCard = ({ children, className = "" }) => (
  <motion.div
    className={`bg-white rounded-2xl shadow-lg border border-green-100 p-4 sm:p-6 lg:p-8 mb-4 ${className}`}
    whileHover={{ scale: 1.02 }}
    transition={{ duration: 0.2 }}
  >
    {children}
  </motion.div>
);

// Animated Counter Component
const AnimatedCounter = ({ value, label, icon: Icon, delay = 0 }) => {
  const [count, setCount] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
          const target = typeof value === 'number' ? value : parseInt(value);
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = Math.floor(progress * target);
            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          setTimeout(() => requestAnimationFrame(animate), delay);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, isInView, delay]);

  return (
    <motion.div
      ref={ref}
      className="text-center p-4"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mb-3">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <div className="typography-h2 font-bold text-green-700 mb-2">
        {typeof value === 'number' ? count : value}
      </div>
      <div className="typography-body text-black">{label}</div>
    </motion.div>
  );
};

const EnterpriseESGReporting = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModule, setSelectedModule] = useState(null);

  const stats = [
    { label: 'Data Accuracy', value: '99.9%', icon: TrendingUp },
    { label: 'Report Generation', value: '90% Faster', icon: Award },
    { label: 'Compliance Rate', value: 100, icon: Shield },
    { label: 'Data Trail Verification', value: 100, icon: Monitor }
  ];

  const keyBenefits = [
    {
      title: 'Seamless Data Collection',
      description: 'Ease of collection and aggregation of ESG data from across internal and external systems',
      icon: Database,
      features: ['ERP integration', 'Finance system sync', 'e-Procurement data', 'Supply chain tracking', 'Smart meters integration', 'IOT devices connectivity']
    },
    {
      title: 'AI-Powered Anomaly Detection',
      description: 'AI detects anomalies in data real-time, flagging potential errors before reports are finalized',
      icon: Brain,
      features: ['Real-time monitoring', 'Error detection', 'Automated flagging', 'Report validation', 'Data quality checks', 'Anomaly alerts']
    },
    {
      title: 'Pre-built Regulatory Templates',
      description: 'Pre-built templates aligned with regulatory standards like BRSR, GRI and CSRD',
      icon: FileText,
      features: ['BRSR templates', 'GRI standards', 'CSRD compliance', 'Regulatory updates', 'Standardized formats', 'Compliance tracking']
    },
    {
      title: 'Faster Reporting & Reduced Dependency',
      description: 'It cuts reporting time drastically and lowers consultant dependency',
      icon: Clock,
      features: ['Automated reports', 'Time reduction', 'Consultant independence', 'Quick generation', 'Self-service capabilities', 'Streamlined workflows']
    },
    {
      title: '100% Data Trail',
      description: 'Ensure 100% data trail of data making it verifiable and audit friendly',
      icon: Search,
      features: ['Full traceability', 'Audit-friendly', 'Data verification', 'Complete trail', 'Compliance documentation', 'Audit readiness']
    },
    {
      title: 'Real-time Insights & Dashboards',
      description: 'Enable real-time insights through Dashboards and alerts and facilitate quick identification of improvement opportunities',
      icon: TrendingUp,
      features: ['Live dashboards', 'Real-time alerts', 'Quick insights', 'Improvement tracking', 'Performance monitoring', 'Actionable analytics']
    }
  ];

  const coreFeatures = [
    'Centralized digital platform ensuring compliance & audit friendliness',
    'Eliminate inefficiencies in manual, people-driven, error-prone ESG Reporting',
    'Well-structured approach to replace manual processes',
    'Seamless data collection from multiple internal and external systems',
    'AI-powered anomaly detection and real-time validation',
    'Pre-built regulatory compliance templates (BRSR, GRI, CSRD)',
    'Automated reporting and documentation generation',
    'Complete audit trail and data verification',
    'Real-time insights through dashboards and alerts',
    'Drastic reduction in reporting time and consultant dependency'
  ];

  const businessBenefits = [
    {
      title: 'Digital Transformation',
      description: 'Transform from Manual to Digital ESG Compliance with a centralized platform',
      icon: Monitor
    },
    {
      title: 'Compliance Assurance',
      description: 'Ensure 100% compliance with regulatory standards and audit-friendly processes',
      icon: Shield
    },
    {
      title: 'Efficiency Gains',
      description: 'Eliminate inefficiencies and drastically reduce reporting time',
      icon: Zap
    },
    {
      title: 'Data Integrity',
      description: 'AI-powered validation ensures data accuracy and real-time error detection',
      icon: Database
    }
  ];

  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ALENSOFT ESG Reporting Platform",
    "description": "ALENSOFT ESG Reporting Platform simplifies digital compliance with centralized ESG data management, automated reporting, AI-powered anomaly detection, and regulatory templates for BRSR, GRI & CSRD with 90% faster reporting.",
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
        title="Enterprise ESG Reporting – Digital ESG Compliance Platform"
        description="ALENSOFT ESG Reporting Platform simplifies compliance with ESG data, AI anomaly detection and BRSR, GRI & CSRD templates for 90% faster reporting."
        keywords="ESG reporting, ESG compliance, BRSR reporting, GRI reporting, CSRD reporting, sustainability reporting, ESG data management, ESG analytics, corporate sustainability, ESG platform"
        canonical="https://atandra.in/conserve/enterprise-esg-reporting"
        ogImage="/background_images/conserve.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/conserve.png"
      />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#e6f7f1]">
        <PageLayout hideHero={true} hideBreadcrumbs={true}>
          <style>{`
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }

        /* Apply Open Sans font family consistently */
        * {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* Ensure proper font weights and sizes */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 700 !important;
          line-height: 1.2;
        }

        p, span, div {
          font-family: 'Open Sans', sans-serif !important;
        }

        button {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 600 !important;
        }

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
      `}</style>
          {/* Main Title Section with 3D/Blurred Background Elements */}
          <div className="relative py-8 md:py-12 overflow-hidden font-['Open_Sans']">
            {/* Hero Background Elements (matching other enhanced pages) */}
            <div className="absolute inset-0 z-0">
              <div className="absolute top-0 right-0 w-3/4 h-full bg-green-50 rounded-bl-[100px] transform -skew-x-12"></div>
              <div className="absolute bottom-20 left-0 w-64 h-64 bg-green-400 rounded-full opacity-10"></div>
            </div>
            {/* Main Content */}
            <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-20">
              <h1 className="typography-h1 font-bold text-green-900 mb-4 leading-tight">
                Enterprise ESG Reporting
              </h1>
              <p className="typography-h3 text-emerald-800 max-w-3xl mx-auto font-semibold mb-3">
                Empowering organizations to seamlessly track, analyze, and report ESG (Environmental, Social, and Governance) performance
              </p>
              <p className="typography-body text-green-900 max-w-2xl mx-auto leading-relaxed font-medium">
                ALENSOFT ESG Reporting Platform enables digital transformation for compliance, transparency, and audit-friendliness. Centralize your ESG data, automate reporting, and gain real-time insights to meet regulatory requirements and drive sustainable growth.
              </p>
            </div>
          </div>
          {/* Sticky Header for Mobile */}
          <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-green-200 shadow-sm">
            <div className="px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-center">
                {/* <h1 className="text-lg sm:text-xl font-bold text-green-700">ALENSOFT</h1>
              <h2 className="text-sm sm:text-base font-semibold text-gray-800">Enterprise ESG Reporting</h2> */}
              </div>
            </div>
          </div>

          {/* Hero Section with Mobile-First Design */}
          <motion.div
            className="relative overflow-hidden px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50"
              animate={{
                background: [
                  "linear-gradient(135deg, rgb(240 253 244) 0%, rgb(236 253 245) 50%, rgb(240 253 250) 100%)",
                  "linear-gradient(135deg, rgb(236 253 245) 0%, rgb(240 253 250) 50%, rgb(240 253 244) 100%)",
                  "linear-gradient(135deg, rgb(240 253 250) 0%, rgb(240 253 244) 50%, rgb(236 253 245) 100%)",
                ]
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            <FloatingShapes />
            <AnimatedParticles count={20} color="green" />

            <div className="relative max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                {/* Left Content */}
                <motion.div
                  className="text-center lg:text-left space-y-6"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  {/* Animated Badge */}
                  <motion.div
                    className="inline-flex items-center px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-green-200 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.div
                      className="w-2 h-2 bg-green-500 rounded-full mr-2"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [1, 0.5, 1]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="typography-body text-black font-semibold">Digital ESG Compliance</span>
                  </motion.div>

                  {/* Main Heading */}
                  <div className="space-y-4">
                    <motion.h2
                      className="typography-h1 text-black"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      <span className="block">ALENSOFT</span>
                      <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent typography-h2">
                        Enterprise ESG Reporting
                      </span>
                    </motion.h2>
                  </div>

                  {/* Description */}
                  <motion.p
                    className="typography-body text-gray-800 font-semibold max-w-2xl mx-auto lg:mx-0"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    Helping industries to transition from Manual to Digital ESG Compliance with a comprehensive platform that ensures accuracy, compliance, and audit-friendliness.
                  </motion.p>

                  {/* Key Highlights */}
                  <motion.div
                    className="flex flex-wrap gap-2 justify-center lg:justify-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                  >
                    {['Digital Transformation', 'Audit Friendly', 'Compliance Assured'].map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full border border-green-200 shadow-sm"
                      >
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="typography-body text-black">{highlight}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                {/* Right Content - Image */}
                <motion.div
                  className="relative max-w-md mx-auto lg:max-w-lg"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop&auto=format"
                      alt="Enterprise ESG Reporting Platform"
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover rounded-2xl"
                      loading="lazy"
                      width={1920}
                      height={1080}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Stats Section - Mobile Responsive */}
          <motion.div
            className="px-4 py-8 sm:px-6 sm:py-12 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="typography-h1 text-black mb-6">
                  Platform Performance
                </h2>
                <p className="typography-h4 text-black max-w-2xl mx-auto">
                  Proven results with ALENSOFT ESG Reporting Platform
                </p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {stats.map((stat, index) => (
                  <AnimatedCounter
                    key={index}
                    value={stat.value}
                    label={stat.label}
                    icon={stat.icon}
                    delay={index * 0.2}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Challenges & Services Section */}
          <motion.div
            className="px-4 py-8 sm:px-6 sm:py-12 bg-gradient-to-r from-green-50 to-emerald-50"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <MobileCard className="mb-8">
                <h2 className="typography-h1 text-black mb-8">
                  Key Challenges We Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
                  {[
                    'Understanding the regulatory requirements',
                    'Conducting value chain assessment and determining the applicable scope & boundaries',
                    'Hand-holding for data collection and reporting'
                  ].map((challenge, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 sm:p-5 bg-gradient-to-br from-green-100 to-emerald-50 rounded-xl">
                      <div className="bg-green-600 p-2 rounded-full mt-0.5 flex-shrink-0">
                        <CheckCircle className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="typography-body text-black font-medium">{challenge}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </MobileCard>

              <div className="space-y-6">
                <MobileCard>
                  <h3 className="typography-h2 text-black mb-6 flex items-start">
                    <div className="bg-green-600 p-2 rounded-lg mr-3 flex-shrink-0 mt-0.5">
                      <Settings className="w-4 h-4 text-white" />
                    </div>
                    <span>ESG Consulting</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      'ESG diagnostics & baseline creation',
                      'Creation of ESG Strategy & Transformation Roadmap',
                      'Identification of sustainability related risks and opportunities & ESG Program Management',
                      'Emission reduction Targets / APIs & Status Monitoring'
                    ].map((service, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="bg-green-500 p-1.5 rounded-full mt-1 flex-shrink-0">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className="typography-body text-black font-medium">{service}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </MobileCard>

                <MobileCard>
                  <h3 className="typography-h3 text-black mb-4">AI powered integrated digitization platform for ESG Management & Reporting
                  </h3>
                  <p className="typography-medium text-black font-medium">(BRSR, CSRD, GRI - Integrated Reports & Dashboards)</p>
                </MobileCard>
              </div>
            </div>
          </motion.div>

          {/* Tabbed Content Section */}
          <motion.div
            className="px-4 py-8 sm:px-6 sm:py-12 bg-white"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="typography-h1 text-black mb-6">
                  ALENSOFT ESG Platform
                </h2>
              </div>
              {/* Mobile-Friendly Tab Navigation */}
              <div className="flex flex-wrap justify-center mb-8 bg-white rounded-xl p-2 shadow-lg border border-green-200 gap-2">
                {[
                  { id: 'overview', label: 'Platform Overview', icon: Target },
                  { id: 'features', label: 'Core Features', icon: Settings },
                  { id: 'benefits', label: 'Benefits', icon: Award }
                ].map((tab) => {
                  const TabIcon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center px-4 py-3 rounded-lg font-semibold typography-body transition-all duration-300 ${activeTab === tab.id
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'text-green-700 hover:bg-green-50'
                        }`}
                    >
                      <TabIcon className="w-4 h-4 mr-2" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Tab Content */}
              <div className="bg-white rounded-xl shadow-lg p-6 border border-green-200">
                {activeTab === 'overview' && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="typography-h2 text-black mb-4">
                        Platform Overview
                      </h3>
                      <p className="typography-h4 text-black max-w-3xl mx-auto">
                        A comprehensive digital solution that transforms manual ESG reporting into an efficient, accurate, and compliant process.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {businessBenefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                          <MobileCard key={index} className="relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-600" />
                            <div className="flex items-start space-x-4">
                              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-lg flex-shrink-0 mt-0.5">
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="typography-h3 text-black mb-3">
                                  {benefit.title}
                                </h4>
                                <p className="typography-body text-black font-medium">
                                  {benefit.description}
                                </p>
                              </div>
                            </div>
                          </MobileCard>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'benefits' && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="typography-h2 text-black mb-4">
                        Key Benefits
                      </h3>
                      <p className="typography-h4 text-black max-w-3xl mx-auto">
                        Unlock the advantages of a digital ESG platform: efficiency, compliance, and actionable insights for your organization.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                      {keyBenefits.map((benefit, index) => {
                        const IconComponent = benefit.icon;
                        return (
                          <MobileCard
                            key={index}
                          // className="cursor-pointer"
                          // onClick={() => setSelectedModule(selectedModule === index ? null : index)}
                          >
                            <div className="flex items-start space-x-3 mb-3">
                              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-1.5 sm:p-2 rounded-lg flex-shrink-0">
                                <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="typography-h3 text-black">
                                  {benefit.title}
                                </h4>
                              </div>
                            </div>
                            <p className="typography-body text-black font-medium mb-4">
                              {benefit.description}
                            </p>
                            {selectedModule === index && (
                              <motion.div
                                className="space-y-2 pt-3 border-t border-green-200"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                              >
                                {benefit.features.map((feature, featureIndex) => (
                                  <div key={featureIndex} className="flex items-center space-x-2">
                                    <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                                    <span className="text-gray-700 typography-small">{feature}</span>
                                  </div>
                                ))}
                              </motion.div>
                            )}
                          </MobileCard>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'features' && (
                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="text-center mb-6">
                      <h3 className="typography-h2 text-black mb-4">
                        Core Platform Features
                      </h3>
                      <p className="typography-h4 text-black max-w-3xl mx-auto">
                        Comprehensive ESG reporting capabilities designed for modern enterprises.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {coreFeatures.map((feature, index) => (
                        <MobileCard key={index}>
                          <div className="flex items-start space-x-4">
                            <div className="bg-green-600 p-2 rounded-lg flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="typography-h4 text-black font-medium">
                                {feature}
                              </p>
                            </div>
                          </div>
                        </MobileCard>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
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
        </PageLayout>
      </div>
    </>
  );
};

export default EnterpriseESGReporting;