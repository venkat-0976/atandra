import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';
// import ShootingStarsBackground from './ShootingStarsBackground';

import Lightning from './Lightning';
// import WireframeWavesBackground from './WireframeWavesBackground';


// Removed abstractIcons array

const Services = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();

  const services = [
    {
      title: "Measure",
      subtitle: "Precision in every measurement",
      // image removed
      description: "Advanced measurement tools and equipment for precise diagnostics and power quality analysis.",
      color: "from-yellow-400 to-orange-500",
      bgColor: "from-yellow-50 to-orange-50",
      borderColor: "border-yellow-400"
    },
    {
      title: "Protect",
      subtitle: "Safeguarding your power systems",
      // image removed
      description: "Power protection solutions including UPS systems, voltage stabilizers, and isolation transformers.",
      color: "from-green-400 to-emerald-500",
      bgColor: "from-green-50 to-emerald-50",
      borderColor: "border-green-400"
    },
    {
      title: "Conserve",
      subtitle: "Optimizing energy efficiency",
      // image removed
      description: "Energy management and conservation solutions for sustainable power consumption.",
      color: "from-blue-400 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      borderColor: "border-blue-400"
    }
  ];

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id="services" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden font-['Open_Sans'] bg-white">
      {/* Modern, clean white background, no image overlay */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section */}
        <motion.div
          ref={ref}
          className={`text-center mb-16 sm:mb-20 transition-all duration-1000 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          variants={{
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.8, ease: "easeOut" }
            }
          }}
        >
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl font-bold text-gray-900 mb-4 font-['Open_Sans'] leading-tight">
              What We Do
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"></div>
          </div>
          <h2 className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-['Open_Sans'] leading-relaxed">
            Comprehensive power solutions designed to measure, protect, and conserve energy with cutting-edge technology
          </h2>
        </motion.div>


        {/* Modern 3D Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {services.map((service, index) => {
            return (
              <motion.div
                key={service.title}
                className="group relative"
                initial={{ opacity: 0, y: 100, rotateX: -15 }}
                animate={inView ? {
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  transition: {
                    delay: index * 0.2,
                    duration: 0.8,
                    ease: "easeOut"
                  }
                } : {}}
                whileHover={{
                  y: -14,
                  scale: 1.04,
                  boxShadow: "0 12px 32px 0 rgba(0,0,0,0.12)",
                  transition: { duration: 0.2 }
                }}
                style={{ perspective: "1000px" }}
              >
                {/* Card Container with 3D/Glassmorphism/Neomorphism effect */}
                <div className={
                  `relative bg-white rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 transform-gpu border border-gray-100 group-hover:border-opacity-80 group-hover:border-2` +
                  ` before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:opacity-0 group-hover:before:opacity-10 before:pointer-events-none`
                }>
                  {/* Removed Abstract 3D Icon/Blob */}
                  {/* Content Section with Title and Description */}
                  <div className="p-6 sm:p-8 relative z-10 flex flex-col gap-2">
                    <h3 className="text-2xl sm:text-3xl lg:text-3xl font-bold font-['Open_Sans'] text-gray-900 mb-1 text-center">
                      {service.title}
                    </h3>
                    <h4 className="text-base sm:text-lg text-gray-800 mb-4 font-['Open_Sans'] leading-relaxed text-center">
                      {service.description}
                    </h4>
                  </div>
                  {/* Subtle gradient border accent at bottom */}
                  <div className={`absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r ${service.color} rounded-b-3xl`}></div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
