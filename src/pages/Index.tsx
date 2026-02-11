import { useState, useEffect } from 'react';
import { X, MapPin, ArrowRight, Shield, Clock, Star, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import ClientLogosSection from "@/components/ClientLogosSection";


const Krykard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);

  const bannerImages = [
    '/background_images/Slide_1.png',
    '/background_images/Slide_2.png',
    '/background_images/Slide_3.png',
    '/background_images/Slide_4.png',
    '/background_images/Slide_5.png',
  ];

  const productCategories = [
    {
      title: 'Measure',
      icon: '📊',
      image: '/background_images/test and measurement.jpg',
      description: 'Advanced measurement tools and equipment for precise diagnostics',
      redirectUrl: '/measure'
    },
    {
      title: 'Online UPS',
      icon: '⚡',
      image: 'https://www.j-schneider.de/fileadmin/_processed_/4/8/csm_USV_1ad6803997.jpg',
      description: 'Reliable uninterrupted power supply solutions for critical applications',
      redirectUrl: '/protect/ups'
    },
    {
      title: 'Power Conditioners',
      icon: '🔧',
      image: '/StaticVoltageRegulator (1).jpg',
      description: 'Advanced servo stabilizers and voltage regulation systems',
      redirectUrl: '/protect/servo-stabilizers'
    },
    {
      title: 'Static Voltage Regulators',
      icon: '⚙️',
      image: 'https://spectronstabilizer.com/wp-content/uploads/2021/03/About-US-4.jpg',
      description: 'High-performance voltage regulation for critical applications',
      redirectUrl: '/protect/static-stabilizers'
    }
  ];

  /* -----------------------------------------------
     Hook to handle navbar spacing dynamically
  ------------------------------------------------- */
  const useNavbarSpacing = () => {
    useEffect(() => {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      const addNavbarSpacing = () => {
        // Find the navbar element using multiple selectors
        const navbar = document.querySelector('nav') ||
          document.querySelector('.navbar') ||
          document.querySelector('[class*="navbar"]') ||
          document.querySelector('header nav') ||
          document.querySelector('[role="navigation"]');

        if (navbar) {
          // Get the actual navbar height
          const navbarHeight = navbar.getBoundingClientRect().height;

          // Apply padding to body to push content below navbar
          document.body.style.paddingTop = `${navbarHeight}px`;

          console.log(`Navbar spacing applied: ${navbarHeight}px`);
        } else {
          // Fallback if navbar not found
          document.body.style.paddingTop = '80px';
          console.log('Navbar not found - applied default 80px spacing');
        }
      };

      // Run immediately
      addNavbarSpacing();

      // Also run after a short delay to ensure navbar is fully rendered
      const timer = setTimeout(addNavbarSpacing, 100);

      // Handle window resize
      const handleResize = () => {
        addNavbarSpacing();
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', handleResize);
        // Reset body padding when component unmounts
        document.body.style.paddingTop = '0px';
      };
    }, []);
  };

  useNavbarSpacing();

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerImages.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const HeroCarousel = () => (
    <div
      className="relative w-full overflow-hidden bg-gray-900 sm:aspect-[16/9] min-h-[180px] h-[40vw] max-h-[600px]"
      style={{ minHeight: '180px', height: '40vw', maxHeight: '600px', backgroundColor: '#111827' }}
    >
      <div
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((image, index) => (
          <div key={index} className="w-full h-full flex-shrink-0 relative">
            <img
              src={image}
              alt={`Atandra Energy Power Solutions Banner ${index + 1} - ${index === 0 ? 'Servo Stabilizers' : index === 1 ? 'UPS Systems' : index === 2 ? 'Power Conditioners' : index === 3 ? 'Voltage Regulators' : 'Energy Management Solutions'}`}
              className="w-full h-full object-cover object-center block min-h-[180px] max-h-[600px]"
              style={{ minHeight: '180px', maxHeight: '600px', objectFit: 'cover', objectPosition: 'center' }}
              loading={index === 0 ? "eager" : "lazy"}
              width={1920}
              height={1080}
              onError={(e) => {
                console.error(`Banner image ${index + 1} failed to load:`, e);
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)';
                }
              }}
            />
            {/* Overlay for better text contrast */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>

      {/* Navigation arrows - mobile friendly */}
      <button
        onClick={() => setCurrentSlide(prev => (prev - 1 + bannerImages.length) % bannerImages.length)}
        className="absolute left-1.5 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/60 text-white w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-all duration-300 z-20 flex items-center justify-center"
        aria-label="Previous slide"
        style={{ fontSize: '1.25rem' }}
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
      <button
        onClick={() => setCurrentSlide(prev => (prev + 1) % bannerImages.length)}
        className="absolute right-1.5 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/40 hover:bg-white/60 text-white w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-all duration-300 z-20 flex items-center justify-center"
        aria-label="Next slide"
        style={{ fontSize: '1.25rem' }}
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );

  const StatsSection = () => (
    <div id="stats-section" className="relative py-12 sm:py-16 lg:py-20 w-full overflow-hidden">
      {/* Background image with enhanced overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{ backgroundImage: 'url("https://cdn.pixabay.com/photo/2016/09/30/18/28/substation-1705950_1280.jpg")' }}
      ></div>

      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-blue-900/85 to-gray-800/90 z-0"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10 sm:mb-12 text-center">
          <div className="relative inline-block mb-6 sm:mb-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-gradient-to-r from-blue-400 via-blue-300 to-blue-500 bg-clip-text font-['Open_Sans'] relative z-10 pb-3">
              Our Legacy
            </h2>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-lg"></div>
          </div>

          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="h-px w-20 sm:w-24 bg-gradient-to-r from-transparent to-blue-300"></div>
            <span className="text-base sm:text-lg font-medium text-blue-200 tracking-wider uppercase font-['Open_Sans'] px-4 py-2 bg-white/10 rounded-full backdrop-blur-sm border border-white/20">
              40+ Years Excellence
            </span>
            <div className="h-px w-20 sm:w-24 bg-gradient-to-l from-transparent to-blue-300"></div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 sm:gap-10 lg:gap-12 w-full items-stretch">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="text-white space-y-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <p className="text-base sm:text-lg lg:text-xl font-medium text-white leading-relaxed font-['Open_Sans']">
                  Atandra Energy Pvt. Ltd., headquartered in Chennai, draws
                  upon a rich foundation of more than 40+ years of expertise in
                  the realm of Power & Energy Management.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 text-transparent bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text font-['Open_Sans']">
                  Sustainability Commitment
                </h3>
                <p className="text-base sm:text-lg lg:text-xl font-medium text-white/95 leading-relaxed font-['Open_Sans']">
                  State-of-the-art facilities empower us to address the
                  requirements of Indian industries comprehensively, effectively
                  & efficiently, ensuring they derive maximum benefits from the
                  power conditioning & energy management solutions we provide.
                </p>
              </div>
            </div>
          </div>

          {/* Right Content - Stats Grid */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {/* Stats Cards */}
              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-xl backdrop-blur-sm border border-yellow-400/40 min-h-[120px] hover:scale-105 hover:border-yellow-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🏆</div>
                <div className="text-yellow-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">INDIA'S NO.1</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">MANUFACTURER OF SERVO STABILISERS</h4>
              </div>

              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-blue-500/30 to-blue-600/30 rounded-xl backdrop-blur-sm border border-blue-400/40 min-h-[120px] hover:scale-105 hover:border-blue-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🏢</div>
                <div className="text-blue-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">100+</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">SERVICE CENTRES</h4>
              </div>

              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-green-500/30 to-green-600/30 rounded-xl backdrop-blur-sm border border-green-400/40 col-span-2 md:col-span-1 min-h-[120px] hover:scale-105 hover:border-green-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">👥</div>
                <div className="text-green-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">PREFERRED</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">SUPPLIER OF LARGE CORPORATES & OEM'S</h4>
              </div>

              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-purple-500/30 to-purple-600/30 rounded-xl backdrop-blur-sm border border-purple-400/40 min-h-[120px] hover:scale-105 hover:border-purple-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">👨‍🔧</div>
                <div className="text-purple-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">CE</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">CERTIFIED PRODUCTS</h4>
              </div>

              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-red-500/30 to-red-600/30 rounded-xl backdrop-blur-sm border border-red-400/40 min-h-[120px] hover:scale-105 hover:border-red-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">⭐</div>
                <div className="text-red-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">40+</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">YEARS EXPERIENCE</h4>
              </div>

              <div className="text-center p-4 sm:p-6 flex flex-col justify-center bg-gradient-to-br from-indigo-500/30 to-indigo-600/30 rounded-xl backdrop-blur-sm border border-indigo-400/40 min-h-[120px] hover:scale-105 hover:border-indigo-400/60 transition-all duration-300 group">
                <div className="text-2xl sm:text-3xl mb-2 transform group-hover:scale-110 transition-transform duration-300">🌍</div>
                <div className="text-indigo-300 text-sm sm:text-base font-bold font-['Open_Sans'] mb-2">ISO</div>
                <h4 className="text-white text-xs sm:text-sm font-semibold font-['Open_Sans'] leading-tight">CERTIFIED QUALITY STANDARDS</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ProductCategories = () => (
    <div className="py-8 sm:py-12 lg:py-16 bg-[#181b22] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 font-['Open_Sans']">Our Product Categories</h2>
          <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 mx-auto rounded-full shadow-lg"></div>
        </div>

        {/* Compact Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 w-full">
          {productCategories.map((category, index) => (
            <div key={index} className="group bg-[#232833] bg-opacity-90 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-[1.02] border border-gray-800 flex flex-col hover:border-blue-400">

              {/* Compact Image Container */}
              <div className="relative w-full bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden h-40 sm:h-48">
                <img
                  src={category.image}
                  alt={`${category.title} - Atandra Energy Solutions`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={320}
                  height={240}
                  onError={(e) => {
                    console.error(`Product category image failed to load:`, e);
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      parent.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                      e.currentTarget.style.display = 'none';
                    }
                  }}
                />

                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>

              {/* Compact Content Container */}
              <div className="p-4 sm:p-5 flex flex-col flex-grow bg-gradient-to-br from-white to-gray-50">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl sm:text-2xl">{category.icon}</span>
                  <h3 className="typography-h5 text-white group-hover:text-blue-400 transition-colors duration-300">
                    {category.title}
                  </h3>
                </div>
                <p className="typography-body text-blue-100 flex-grow mb-4">
                  {category.description}
                </p>

                {/* Compact CTA Button */}
                <div className="mt-auto">
                  <Link to={category.redirectUrl} className="inline-block w-full">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 w-full font-['Open_Sans'] shadow-md hover:shadow-lg transform hover:scale-[1.02] flex items-center justify-center gap-2 group">
                      Explore {category.title} Solutions
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const CompanyStory = () => (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#181b22] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="relative inline-block mb-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Open_Sans'] text-white relative z-10 pb-3">
              Network of Trust
            </h2>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-40 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full shadow-lg"></div>
          </div>

          <div className="flex items-center justify-center gap-4 sm:gap-6 mb-6">
            <div className="h-px w-16 sm:w-20 bg-gradient-to-r from-transparent to-blue-400"></div>
            <span className="text-sm sm:text-base font-medium text-blue-200 tracking-wider uppercase font-['Open_Sans'] px-4 py-2 bg-blue-900/60 rounded-full border border-blue-400">
              Nationwide Service Excellence
            </span>
            <div className="h-px w-16 sm:w-20 bg-gradient-to-l from-transparent to-blue-400"></div>
          </div>

          <p className="text-blue-100 text-base sm:text-lg lg:text-xl leading-relaxed font-medium font-['Open_Sans'] max-w-4xl mx-auto">
            We built this nationwide footprint so you can focus on running your business, not chasing service calls. Fast response times, genuine parts, and expert technicians are just a phone call away—no matter how spread out your operations might be.
          </p>
        </div>

        {/* New Layout - India Map Centered with Features on Left and Right */}
        <div className="relative">
          {/* Main Container with 3 columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

            {/* Left Features */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-red-900">
                <div className="flex items-start gap-3">
                  <span className="text-red-500 text-2xl flex-shrink-0">🚩</span>
                  <div>
                    <h4 className="font-bold text-red-400 text-lg font-['Open_Sans'] mb-2">Nationwide Coverage</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">100+ centers across every state and key industrial region.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-yellow-900">
                <div className="flex items-start gap-3">
                  <span className="text-yellow-500 text-2xl flex-shrink-0">⚡</span>
                  <div>
                    <h4 className="font-bold text-yellow-400 text-lg font-['Open_Sans'] mb-2">24-Hour Response</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">Guaranteed on-site support within 24 hours, 365 days a year.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-900">
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 text-2xl flex-shrink-0">👨‍🔧</span>
                  <div>
                    <h4 className="font-bold text-blue-400 text-lg font-['Open_Sans'] mb-2">Certified Technicians</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">Local engineers trained on latest UPS technologies.</p>
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
                      <MapPin className="h-20 w-20 mx-auto mb-4 text-blue-500" />
                      <p className="text-2xl font-bold text-blue-800 font-['Open_Sans']">India Service Network</p>
                      <p className="text-lg font-medium text-blue-600 font-['Open_Sans']">100+ Centers Nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Features */}
            <div className="lg:col-span-3 space-y-4">
              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-800">
                <div className="flex items-start gap-3">
                  <span className="text-gray-300 text-2xl flex-shrink-0">🛠️</span>
                  <div>
                    <h4 className="font-bold text-gray-300 text-lg font-['Open_Sans'] mb-2">Stocked Inventory</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">Genuine replacement parts available at every center.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-900">
                <div className="flex items-start gap-3">
                  <span className="text-green-600 text-2xl flex-shrink-0">📞</span>
                  <div>
                    <h4 className="font-bold text-green-400 text-lg font-['Open_Sans'] mb-2">24/7 Helpline</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">Toll-free support line for instant troubleshooting.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#232833] bg-opacity-90 rounded-xl p-4 shadow-lg hover:shadow-xl transition-all duration-300 border border-purple-900">
                <div className="flex items-start gap-3">
                  <span className="text-purple-600 text-2xl flex-shrink-0">🔄</span>
                  <div>
                    <h4 className="font-bold text-purple-400 text-lg font-['Open_Sans'] mb-2">Preventive Maintenance</h4>
                    <p className="text-sm text-blue-100 font-['Open_Sans'] leading-relaxed">Scheduled inspections to minimize downtime.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats - Single Row Below Map */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 text-center border border-blue-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-blue-600 mb-1 font-['Open_Sans']">100+</div>
              <div className="text-xs sm:text-sm font-semibold text-blue-800 font-['Open_Sans']">Service Centers</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 text-center border border-green-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-green-600 mb-1 font-['Open_Sans']">24/7</div>
              <div className="text-xs sm:text-sm font-semibold text-green-800 font-['Open_Sans']">Support Available</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 text-center border border-purple-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-1 font-['Open_Sans']">24hrs</div>
              <div className="text-xs sm:text-sm font-semibold text-purple-800 font-['Open_Sans']">Response Time</div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 text-center border border-orange-200 shadow-lg transform transition-all duration-300 hover:scale-105 group">
              <div className="text-2xl sm:text-3xl font-bold text-orange-600 mb-1 font-['Open_Sans']">100%</div>
              <div className="text-xs sm:text-sm font-semibold text-orange-800 font-['Open_Sans']">Genuine Parts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // World Presence Section
  const WorldPresenceSection = () => (
    <div className="py-12 sm:py-16 lg:py-20 bg-[#232833] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-['Open_Sans'] text-white pb-3">
            Global Footprint
          </h2>
        </div>
        {/* World Map Image Only */}
        <div className="flex justify-center items-center w-full">
          <img
            src="/background_images/world-map-dots.jpg"
            alt="Global Presence - Atandra Energy World Map"
            className="w-full max-w-6xl h-auto object-contain aspect-video rounded-xl shadow-lg"
            style={{ background: '#232833' }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );

  const ContactModal = () => (
    showContactModal && (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        <div className="bg-white rounded-2xl sm:rounded-3xl max-w-lg w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100 border border-gray-200">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold font-['Open_Sans'] text-gray-800">Quick Enquiry</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-all duration-200 transform hover:scale-110"
                aria-label="Close modal"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="space-y-4 sm:space-y-5">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-['Open_Sans'] transition-all duration-200 hover:border-gray-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-['Open_Sans'] transition-all duration-200 hover:border-gray-400"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base font-['Open_Sans'] transition-all duration-200 hover:border-gray-400"
              />
              <textarea
                placeholder="Your Message"
                rows={4}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-base resize-none font-['Open_Sans'] transition-all duration-200 hover:border-gray-400"
              />
              <button
                onClick={() => setShowContactModal(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 rounded-xl transition-all duration-300 text-base font-semibold font-['Open_Sans'] shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Send Enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );

  return (
    <Layout>
      <div className="min-h-screen pt-0 bg-[#181b22]">
        <div className="w-full" style={{ marginTop: '0', paddingTop: '0' }}>
          <HeroCarousel />
          {/* Main H1 heading for SEO */}
          <div className="sr-only">
            <h1>Atandra Energy - India's Leading Power & Energy Management Solutions</h1>
          </div>
          {/* Scroll down indicator */}
          <motion.div
            className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center z-20 mt-4"
            style={{ position: 'relative' }}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            onClick={() => {
              const nextSection = document.getElementById('product-categories-section');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
          >
            <span className="text-xs xs:text-sm text-white mb-1 xs:mb-2 cursor-pointer">Scroll Down</span>
            <svg width="24" height="24" fill="none" className="text-white opacity-70 cursor-pointer">
              <path d="M12 5v14M12 19l5-5M12 19l-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>

        {/* Product Categories Section with anchor for scroll */}
        <div id="product-categories-section">
          <ProductCategories />
        </div>
        <StatsSection />
        <CompanyStory />
        <WorldPresenceSection />
        <ClientLogosSection isInView={true} />

        {/* Additional Internal Links Section for SEO */}
        <div className="py-12 sm:py-16 bg-[#181b22] w-full overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 font-['Open_Sans']">Explore Our Solutions</h2>
              <div className="w-24 sm:w-32 md:w-40 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500 mx-auto rounded-full shadow-lg"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">Power Protection</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Comprehensive UPS systems and voltage stabilizers for critical applications.</p>
                <Link to="/protect/ups" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  View UPS Systems →
                </Link>
              </div>

              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">Measurement Tools</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Advanced testing and measurement equipment for power quality analysis.</p>
                <Link to="/measure" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  View Measurement Tools →
                </Link>
              </div>

              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">Energy Conservation</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Smart energy management and conservation solutions for industries.</p>
                <Link to="/conserve" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  View Energy Solutions →
                </Link>
              </div>

              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">About Atandra</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Learn about our 40+ years of excellence and company history.</p>
                <Link to="/about/company" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  Learn About Us →
                </Link>
              </div>

              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">Service Centers</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Find our 100+ service centers across India for support.</p>
                <Link to="/contact/service" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  Find Service Center →
                </Link>
              </div>

              <div className="bg-[#232833] rounded-xl p-6 hover:bg-[#2a2f3a] transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-3 font-['Open_Sans']">Contact Sales</h3>
                <p className="text-gray-300 mb-4 font-['Open_Sans']">Get in touch with our sales team for product inquiries.</p>
                <Link to="/contact/sales" className="text-blue-400 hover:text-blue-300 font-semibold font-['Open_Sans']">
                  Contact Sales Team →
                </Link>
              </div>
            </div>
          </div>
        </div>

        <ContactModal />
      </div>
    </Layout>
  );
};

export default Krykard;