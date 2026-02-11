import { useState, useEffect, useRef } from 'react';
import {
  CheckCircle,
  Building,
  TrendingUp,
  Monitor,
  Zap,
  Droplet,
  Flame,
  BarChart,
  Award,
  ArrowRight,
  Target,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import PageLayout from "@/components/layout/PageLayout";
import { motion } from 'framer-motion';
import SeoHead from '@/seo/SeoHead';

const TenantBillingSolutionPage = () => {
  const navigate = useNavigate();

  const [countsStarted, setCountsStarted] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  const stats = [
    { label: 'Billing Accuracy', value: '99.9%', displayValue: '99.9%', icon: TrendingUp, color: 'from-green-500 to-emerald-600' },
    { label: 'Cost Reduction', value: '25-40%', displayValue: '25-40%', icon: Award, color: 'from-emerald-500 to-teal-600' },
    { label: 'Active Tenants', value: '500+', displayValue: '500+', countTo: 500, icon: Monitor, color: 'from-teal-500 to-green-600' },
    { label: 'Monthly Reports', value: '1000+', displayValue: '1000+', countTo: 1000, icon: BarChart, color: 'from-green-600 to-emerald-700' }
  ];

  // Count-up animation state
  const [tenantsCount, setTenantsCount] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);

  // Intersection Observer for triggering count-up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !countsStarted) {
          setCountsStarted(true);

          // Animate tenants count
          const tenantsTarget = 500;
          const tenantsDuration = 2000;
          const tenantsStartTime = Date.now();

          const animateTenants = () => {
            const elapsed = Date.now() - tenantsStartTime;
            const progress = Math.min(elapsed / tenantsDuration, 1);
            const current = Math.floor(progress * tenantsTarget);
            setTenantsCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateTenants);
            }
          };

          // Animate reports count
          const reportsTarget = 1000;
          const reportsDuration = 2500;
          const reportsStartTime = Date.now();

          const animateReports = () => {
            const elapsed = Date.now() - reportsStartTime;
            const progress = Math.min(elapsed / reportsDuration, 1);
            const current = Math.floor(progress * reportsTarget);
            setReportsCount(current);

            if (progress < 1) {
              requestAnimationFrame(animateReports);
            }
          };

          // Start animations
          requestAnimationFrame(animateTenants);
          requestAnimationFrame(animateReports);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [countsStarted]);



  // Prepare JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ALENSOFT Tenant Billing Solution",
    "description": "ALENSOFT Tenant Billing Solution enables automated utility billing, precise cost allocation, and transparent reporting. Features 99.9% billing accuracy, multi-tenant support, prepaid & postpaid billing, and reduced operational costs.",
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
        title="Tenant Billing Solution – Automated Utility Billing"
        description="ALENSOFT Tenant Billing Solution enables automated utility billing with 99.9% accuracy, multi-tenant support, prepaid & postpaid billing."
        keywords="tenant billing, utility billing, property management, multi-tenant billing, automated billing, cost allocation, property billing software, utility management, tenant management, billing automation"
        canonical="https://atandra.in/conserve/tenant-billing-solution"
        ogImage="/background_images/conserve.png"
        jsonLd={jsonLd}
        preloadImage="/background_images/conserve.png"
      />
      <div className="min-h-screen w-full overflow-x-hidden bg-[#e6f7f1]">
        <PageLayout
          hideHero={true}
          hideBreadcrumbs={true}
        >
          <style>{`
          .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
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
                Tenant Billing Solution
              </h1>
              <p className="typography-h3 text-emerald-800 max-w-3xl mx-auto font-semibold mb-3">
                Automated, Transparent, and Accurate Utility Billing for Every Tenant
              </p>
              <p className="typography-body text-green-900 max-w-2xl mx-auto leading-relaxed font-medium">
                ALENSOFT Tenant Billing Solution empowers property managers with seamless utility billing automation, accurate cost allocation, and transparent reporting.
              </p>
            </div>
          </div>

          {/* Modern Blended Hero Section */}
          <div className="relative overflow-hidden">
            {/* Enhanced Seamless Background Blend */}
            <div className="absolute inset-0 bg-[#e6f7f1]"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-green-100/30 via-transparent to-emerald-100/20"></div>

            {/* Enhanced Organic Floating Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-20 left-2 w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-br from-green-200/30 to-emerald-300/20 rounded-full blur-2xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-br from-emerald-300/35 to-teal-400/25 rounded-full blur-2xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-gradient-to-br from-teal-300/30 to-green-400/20 rounded-full blur-xl animate-pulse delay-500"></div>
              <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-br from-green-200/25 to-emerald-300/15 rounded-full blur-2xl animate-pulse delay-2000"></div>
            </div>

            {/* Enhanced Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23059669' stroke-width='1.5'%3E%3Cpath d='M0 0h100v100H0z'/%3E%3Cpath d='M0 50h100M50 0v100'/%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
              <div className="max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
                  {/* Left Content - 7 columns */}
                  <div className="lg:col-span-7 text-center lg:text-left space-y-8">
                    {/* Main Heading - Vertical Layout */}
                    <div className="space-y-3 sm:space-y-4">
                      <h2 className="typography-h1 font-bold uppercase tracking-widest text-black">ALENSOFT</h2>
                      <h2 className="typography-h2 font-semibold text-black">Tenant Billing Solution</h2>
                    </div>
                    {/* Enhanced Description */}
                    <p className="typography-body text-gray-800 leading-relaxed font-semibold max-w-2xl mx-auto lg:mx-0 font-['Open_Sans']">
                      Effortlessly manage multi-tenant utility billing with the powerful ALENSOFT
                      application built for precision, automation, and clarity. Ensure accurate cost
                      allocation, streamline billing workflows, and deliver transparent reports to
                      tenants—every time.
                    </p>

                    {/* Enhanced Key Highlights */}
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                      <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full border border-green-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <CheckCircle className="w-5 h-5 text-green-700" />
                        <span className="typography-body font-normal text-black font-['Open_Sans']">Accurate Cost Allocation</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full border border-emerald-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <CheckCircle className="w-5 h-5 text-emerald-700" />
                        <span className="typography-body font-normal text-black font-['Open_Sans']">Multi-Site & Multi-Tenant Ready</span>
                      </div>
                      <div className="flex items-center space-x-2 bg-white/95 backdrop-blur-sm px-5 py-3 rounded-full border border-teal-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <CheckCircle className="w-5 h-5 text-teal-700" />
                        <span className="typography-body font-normal text-black font-['Open_Sans']">Automated Bills (Pre-paid & Post-Paid)</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Content - 5 columns */}
                  <div
                    className="lg:col-span-5 relative flex items-center justify-center h-full"
                    style={{
                      backgroundImage: "url('/Tenant Billing/1 Billing Dsb.png')",
                      backgroundSize: 'contain',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'center',
                      filter: 'brightness(1.18) contrast(1.08)',
                      minHeight: '18rem',
                      width: '100%',
                    }}
                  >
                    {/* Enhanced Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-green-900/10 via-emerald-900/5 to-transparent pointer-events-none rounded-3xl"></div>
                    {/* Floating Elements on Image */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md">
                      <Zap className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1 shadow-md">
                      <span className="typography-body font-normal text-black font-['Open_Sans']">Smart Billing</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Smart Tenant Billing Content Section */}
          <div className="py-8 sm:py-12 bg-[#e6f7f1] relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Main Heading */}
              <div className="text-center mb-8">
                <h2 className="typography-h1 font-bold text-black mb-6 font-['Open_Sans']">
                  Tenant Billing Made Simple
                </h2>
              </div>

              {/* Description Content */}
              <div className="space-y-6 mb-8">
                <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-green-300 transition-all duration-300">
                  <p className="typography-body text-black leading-relaxed font-semibold font-['Open_Sans']">
                    Scale effortlessly. Delight tenants. Automate utility billing with ease.
                  </p>
                </div>

                <div className="bg-white/90 backdrop-blur-sm border border-emerald-200 rounded-xl p-6 shadow-lg hover:shadow-xl hover:border-emerald-300 transition-all duration-300">
                  <p className="typography-body text-black leading-relaxed font-semibold font-['Open_Sans']">
                    Our ALENSOFT Smart Tenant Billing module is designed to simplify utility billing for
                    residential and commercial properties, offering a fully automated, stress-free
                    experience.
                  </p>
                </div>
              </div>

              {/* Utility Types Section */}
              <div className="text-center mb-6">
                <h3 className="typography-h2 font-semibold text-black mb-8 font-['Open_Sans']">
                  Utility Types: Electricity, Water, Gas or any other Utility with Smart Meters
                </h3>
              </div>

              {/* Utility Icons - Horizontal Layout */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {/* Electricity */}
                <div className="group">
                  <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="bg-gradient-to-br from-yellow-500 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Zap className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="typography-h4 font-semibold text-black mb-3 font-['Open_Sans']">Electricity</h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full mx-auto"></div>
                  </div>
                </div>

                {/* Water */}
                <div className="group">
                  <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Droplet className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="typography-h4 font-semibold text-black mb-3 font-['Open_Sans']">Water</h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full mx-auto"></div>
                  </div>
                </div>

                {/* Gas */}
                <div className="group">
                  <div className="bg-white/90 backdrop-blur-sm border border-green-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl hover:border-green-300 transition-all duration-300 transform hover:-translate-y-2">
                    <div className="bg-gradient-to-br from-red-500 to-orange-600 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg">
                      <Flame className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="typography-h4 font-semibold text-black mb-3 font-['Open_Sans']">Gas</h4>
                    <div className="w-12 h-1 bg-gradient-to-r from-red-500 to-orange-600 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section - Responsive Format */}
          <div ref={statsRef} className="py-8 sm:py-10 bg-white relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23059669' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-6 sm:mb-8">
                <h2 className="typography-h1 font-bold text-black mb-4 font-['Open_Sans']">
                  Billing Performance
                </h2>
                <p className="typography-h3 font-normal text-black max-w-2xl mx-auto font-['Open_Sans']">
                  Experience exceptional results with our smart tenant billing solutions
                </p>
              </div>

              {/* Desktop Table Layout (lg and above) */}
              <div className="hidden lg:block">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-green-200 overflow-hidden max-w-4xl mx-auto hover:shadow-3xl transition-all duration-500">
                  {/* Enhanced Table Header Row */}
                  <div className="grid grid-cols-4 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 border-b-2 border-green-200">
                    {stats.map((stat, index) => (
                      <div key={index} className="p-4 text-center border-r border-green-200 last:border-r-0 hover:bg-green-200/50 transition-all duration-300">
                        <h3 className="typography-h4 font-semibold text-black leading-tight font-['Open_Sans']">
                          {stat.label}
                        </h3>
                      </div>
                    ))}
                  </div>

                  {/* Enhanced Table Values Row */}
                  <div className="grid grid-cols-4 bg-white">
                    {stats.map((stat, index) => {
                      const getDisplayValue = () => {
                        if (stat.countTo === 500) {
                          return countsStarted ? `${tenantsCount}+` : '0+';
                        } else if (stat.countTo === 1000) {
                          return countsStarted ? `${reportsCount}+` : '0+';
                        }
                        return stat.displayValue;
                      };

                      return (
                        <div key={index} className="p-6 text-center border-r border-green-200 last:border-r-0 group hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300 transform hover:scale-105">
                          <div className="text-2xl sm:text-3xl font-bold text-green-700 group-hover:text-green-800 transition-all duration-300 font-['Open_Sans']">
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
                        return countsStarted ? `${tenantsCount}+` : '0+';
                      } else if (stat.countTo === 1000) {
                        return countsStarted ? `${reportsCount}+` : '0+';
                      }
                      return stat.displayValue;
                    };

                    return (
                      <div key={index} className="bg-white rounded-xl sm:rounded-2xl shadow-2xl border-2 border-green-200 p-4 sm:p-6 text-center group hover:shadow-3xl transition-all duration-500 transform hover:scale-105">
                        {/* Label */}
                        <div className="mb-3 sm:mb-4 bg-gradient-to-r from-green-100 via-emerald-100 to-teal-100 rounded-lg p-2 sm:p-3">
                          <h3 className="typography-h4 font-semibold text-black leading-tight font-['Open_Sans']">
                            {stat.label}
                          </h3>
                        </div>

                        {/* Value */}
                        <div className="text-lg sm:text-xl md:text-2xl font-bold text-green-700 group-hover:text-green-800 transition-all duration-300 font-['Open_Sans']">
                          {getDisplayValue()}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Section - Following ENMS Design */}
          <div className="py-12 sm:py-16 bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 relative">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-10 sm:mb-12">
                <h2 className="typography-h1 font-bold text-black mb-6 sm:mb-8">
                  Comprehensive Tenant Billing Solution
                </h2>
                <p className="typography-body text-gray-700 max-w-4xl mx-auto font-medium">
                  Transform how you manage multi-tenant utility billing with our
                  <span className="text-green-600 font-bold"> automated platform</span>
                </p>
              </div>

              {/* Enhanced Tab Navigation - Following ENMS Style */}
              <div className="flex flex-wrap justify-center mb-6 sm:mb-8 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-xl max-w-4xl mx-auto border border-green-100/50 overflow-x-auto">
                <div className="flex flex-nowrap md:flex-wrap w-full justify-start md:justify-center gap-2 sm:gap-3 px-2 py-2">
                  {[
                    { id: 'overview', label: 'Why Choose ALENSOFT Tenant Billing', icon: Target },
                    { id: 'features', label: 'Features', icon: Monitor },
                    { id: 'billing-process', label: 'Billing Process', icon: Award },
                    { id: 'benefits', label: 'Benefits', icon: Building }
                  ].map((tab) => {
                    const TabIcon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`group relative flex items-center px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl font-medium typography-body transition-all duration-300 whitespace-nowrap flex-shrink-0 min-w-[100px] sm:min-w-[120px] ${activeTab === tab.id
                          ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                          : 'text-black hover:text-green-600 hover:bg-green-50/80'
                          }`}
                      >
                        <TabIcon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-all ${activeTab === tab.id ? 'text-green-200' : 'text-gray-500 group-hover:text-green-500'
                          }`} />
                        <span className="relative z-10 typography-body">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Enhanced Tab Content */}
              <div className="bg-white/90 backdrop-blur-sm rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 border border-green-100/50 relative overflow-hidden">
                {activeTab === 'overview' && (
                  <div className="space-y-8 sm:space-y-10">
                    <div className="text-center mb-8">
                      <h3 className="typography-h2 font-bold text-black mb-6">
                        Why Choose ALENSOFT Tenant Billing?
                      </h3>
                    </div>

                    {/* Key Advantages */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                      {/* Flexible Architecture */}
                      <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-green-600 text-white rounded-lg p-3">
                            <Building className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Flexible Architecture
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Choose what works best for you — opt for a cloud-based multi-site SaaS model or deploy on your own server infrastructure with full control and flexibility.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Turnkey Implementation */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <Target className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Turnkey Implementation
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Let Atandra handle the heavy lifting — we seamlessly integrate your existing or new meters using SMART Gateways to ensure a rugged, reliable, and future-ready network.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-8 sm:space-y-10">
                    <div className="text-center mb-8">
                      <h3 className="typography-h2 font-bold text-black mb-6">
                        Smart Billing for Smarter Property Management
                      </h3>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">

                      {/* Tenant Self-Service Portal */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'portal' ? null : 'portal')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <Monitor className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Tenant Self-Service Portal
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Put your tenants in control with our intuitive self-service mobile app and web portal.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'portal' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'portal' && (
                          <div className="px-6 pb-6">
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Personalized Dashboards</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Full Bill History</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>24/7 AI Chatbot Support</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Customizable Insights</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Automated Meter Reading */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'meter' ? null : 'meter')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <Zap className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Automated Meter Reading
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Seamless, error-free data collection from smart meters, be it Water, Energy or Gas.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'meter' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'meter' && (
                          <div className="px-6 pb-6">
                            <p className="typography-body text-gray-600 leading-relaxed text-sm">
                              ALENSOFT automatically captures utility consumption data from tenant smart meters, eliminating manual errors and simplifying accurate, hassle-free invoicing.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Anomaly Detection */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'anomaly' ? null : 'anomaly')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Anomaly Detection
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Spot abnormal consumption instantly. Track usage patterns, detect deviations, and uncover hidden savings.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'anomaly' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'anomaly' && (
                          <div className="px-6 pb-6">
                            <p className="typography-body text-gray-600 leading-relaxed text-sm">
                              ALENSOFT continuously analyzes energy data, sending real-time alerts for anomalies—so you act fast, stay informed, and reduce waste.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Real-Time Visibility & Automated Invoicing */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'invoicing' ? null : 'invoicing')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <BarChart className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Real-Time Visibility & Automated Invoicing
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Get real-time insights into utility consumption and automate invoice generation based on configured billing cycles.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'invoicing' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'invoicing' && (
                          <div className="px-6 pb-6">
                            <ul className="space-y-2 text-sm text-gray-600">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Live Consumption Monitoring</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Auto-Generated Invoices with Property Branding</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Support for Multiple Formats – PDF or Excel</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Automated Email Delivery to individual tenants</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-emerald-600" />
                                <span>Full Invoice History – Paid & unpaid records maintained</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Additional Features Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mt-8">

                      {/* Payment Tracking */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'payment' ? null : 'payment')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <CheckCircle className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Payment Tracking
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Track all payments seamlessly—pre-paid or post-paid.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'payment' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'payment' && (
                          <div className="px-6 pb-6">
                            <p className="typography-body text-gray-600 leading-relaxed text-sm">
                              Monitor, record, upload and manage tenant payments across both pre-paid and post-paid billing models, with real-time status and history.
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Reporting & Analytics */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'reporting' ? null : 'reporting')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <BarChart className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Reporting & Analytics
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Unlock insights with real-time and historical billing data.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'reporting' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                        {expandedFeature === 'reporting' && (
                          <div className="px-6 pb-6">
                            <p className="typography-body text-gray-600 leading-relaxed text-sm mb-3">
                              Access detailed reports and interactive analytics on tenant billing, consumption patterns, and outstanding payments—anytime, anywhere.
                            </p>
                            <ul className="space-y-1 text-xs text-gray-600">
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Custom-Branded Bills</span>
                              </li>
                              <li className="flex items-center space-x-2">
                                <CheckCircle className="w-3 h-3 text-emerald-600" />
                                <span>Multi-Utility Support</span>
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Live Portal for Billing Managers */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div
                          className="flex items-start justify-between p-6 cursor-pointer"
                          onClick={() => setExpandedFeature(expandedFeature === 'portal-managers' ? null : 'portal-managers')}
                        >
                          <div className="flex items-start space-x-4 flex-1">
                            <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                              <Monitor className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                              <h4 className="typography-h4 font-bold text-black mb-3">
                                Live Portal for Billing Managers
                              </h4>
                              <p className="typography-body text-gray-700 leading-relaxed">
                                Monitor real-time utility consumption and billing progress to stay informed and in control at all times.
                              </p>
                            </div>
                          </div>
                          <div className="flex-shrink-0 ml-4">
                            {expandedFeature === 'portal-managers' ? (
                              <ChevronUp className="w-5 h-5 text-emerald-600" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-emerald-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'billing-process' && (
                  <div className="space-y-8 sm:space-y-10">
                    <div className="text-center mb-8">
                      <h3 className="typography-h2 font-bold text-black mb-6">
                        Billing Process
                      </h3>
                    </div>

                    {/* Billing Process Steps */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">

                      {/* Unit-Level Metering */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">1</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Unit-Level Metering
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Each flat or unit is equipped with individual utility meters (Electricity, Water, Gas), with support for multiple meters per unit.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Data Collection via SMART Gateways */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">2</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Data Collection via SMART Gateways
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Meters are connected to SMART Gateways using data cables. Each floor can house multiple gateways to handle high-density deployments.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Centralized Data Store */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">3</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Centralized Data Store
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              All gateway data is transmitted to the ALENSOFT server—either on-premise or cloud-hosted, based on your deployment preference.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Automated Billing & Analytics */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <div className="w-6 h-6 flex items-center justify-center font-bold text-sm">4</div>
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Automated Billing & Analytics
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              ALENSOFT aggregates, validates, and analyzes the incoming data to automatically generate accurate utility bills—ready for distribution.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="space-y-8 sm:space-y-10">
                    <div className="text-center mb-8">
                      <h3 className="typography-h2 font-bold text-black mb-6">
                        Benefits of ALENSOFT Tenant Billing Module
                      </h3>
                    </div>

                    {/* Benefits Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">

                      {/* Boost Efficiency */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Boost Efficiency
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Automate billing workflows to save time and simplify operations.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Minimize Errors */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <CheckCircle className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Minimize Errors
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Cut billing mistakes with precision automation and validation.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Optimize Cash Flow */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <BarChart className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Optimize Cash Flow
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Speed up payments and improve financial visibility effortlessly.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Enhance Tenant Satisfaction */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <Award className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Enhance Tenant Satisfaction
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Build trust with transparent, accurate, and timely billing.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Cut Operational Costs */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <Building className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Cut Operational Costs
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Lower expenses by streamlining processes and reducing manual work.
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Accelerate Dispute Resolution */}
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-200 hover:shadow-lg transition-all duration-300">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 bg-emerald-600 text-white rounded-lg p-3">
                            <Target className="w-6 h-6" />
                          </div>
                          <div className="flex-1">
                            <h4 className="typography-h4 font-bold text-black mb-3">
                              Accelerate Dispute Resolution
                            </h4>
                            <p className="typography-body text-gray-700 leading-relaxed">
                              Quickly address and resolve tenant billing queries with clear, accessible data and audit trails.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tenant Portal Section - Modern Horizontal Layout (expanded, image URL instead of image) */}
          <div className="py-12 sm:py-16 bg-white border-t border-green-100">
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

                {/* Image Section - Bottom on mobile/tablet, right on desktop */}
                <div className="flex justify-center lg:justify-end w-full order-2 lg:order-2">
                  <div className="w-full max-w-lg lg:max-w-none">
                    <img
                      src="/Tenant Billing/2 Dashboard.png"
                      alt="Tenant Portal Dashboard"
                      className="rounded-2xl shadow-2xl border-2 border-green-200 w-full object-cover bg-white"
                      style={{ background: 'linear-gradient(135deg, #e0f7ef 0%, #f0fdfa 100%)' }}
                      loading="lazy"
                      decoding="async" 
                      width={320}
                      height={240}
                    />
                  </div>
                </div>

                {/* Content Section - Top on mobile/tablet, left on desktop */}
                <div className="space-y-6 text-center lg:text-left order-1 lg:order-1">

                  {/* Badge */}
                  <div className="flex justify-center lg:justify-start">
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 border border-green-200">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      <span className="text-green-700 font-bold text-sm">AI-Powered Solution</span>
                    </div>
                  </div>

                  {/* Heading */}
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-black leading-tight">
                    AI Self-Care <span className="text-green-600">Tenant Portal</span>
                  </h2>

                  {/* Subheading */}
                  <p className="text-base lg:text-lg text-black font-bold">
                    Give tenants control over their costs and consumption with our comprehensive self-care portal solution.
                  </p>

                  {/* Features List */}
                  <ul className="space-y-4 mt-8">
                    <li className="flex items-start text-left">
                      <div className="flex-shrink-0 bg-green-500 text-white rounded-lg p-2 mr-4 mt-0.5">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-black mb-1">Mobile App & Web Portal</div>
                        <div className="text-black text-sm leading-relaxed">
                          Access consumption data, view bills, and manage payments from any device with our intuitive interface.
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start text-left">
                      <div className="flex-shrink-0 bg-green-500 text-white rounded-lg p-2 mr-4 mt-0.5">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-black mb-1">Customizable Dashboard</div>
                        <div className="text-black text-sm leading-relaxed">
                          Personalized insights dashboard showing consumption patterns, cost breakdowns, and savings opportunities.
                        </div>
                      </div>
                    </li>

                    <li className="flex items-start text-left">
                      <div className="flex-shrink-0 bg-green-500 text-white rounded-lg p-2 mr-4 mt-0.5">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-black mb-1">24/7 AI Chatbot Support</div>
                        <div className="text-black text-sm leading-relaxed">
                          Intelligent AI assistant to handle inquiries, explain billing details, and help with requests without human intervention.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Modern Contact Section */}
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

          {/* Typography and Styles */}
          <style>{`
          .typography-h1 {
            font-size: 2.5rem;
            line-height: 1.2;
            font-weight: 700;
          }
          .typography-h2 {
            font-size: 2rem;
            line-height: 1.3;
            font-weight: 600;
          }
          .typography-h3 {
            font-size: 1.75rem;
            line-height: 1.3;
            font-weight: 600;
          }
          .typography-h4 {
            font-size: 1.25rem;
            line-height: 1.4;
            font-weight: 600;
          }
          .typography-body {
            font-size: 1rem;
            line-height: 1.6;
          }
          @media (max-width: 768px) {
            .typography-h1 {
              font-size: 2rem;
            }
            .typography-h2 {
              font-size: 1.75rem;
            }
            .typography-h3 {
              font-size: 1.5rem;
            }
            .typography-h4 {
              font-size: 1.125rem;
            }
          }
          @media (max-width: 640px) {
            .typography-h1 {
              font-size: 1.75rem;
            }
            .typography-h2 {
              font-size: 1.5rem;
            }
            .typography-h3 {
              font-size: 1.25rem;
            }
            .typography-h4 {
              font-size: 1.125rem;
            }
            .typography-body {
              font-size: 0.875rem;
            }
          }
          * {
            font-family: 'Open Sans', sans-serif;
          }
          body {
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

export default TenantBillingSolutionPage;