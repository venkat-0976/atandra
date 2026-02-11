import React, { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const TimelineFixed = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [inView, controls]);

  return (
    <section id="timeline" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden font-['Open_Sans'] bg-white">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header Section - Same style as Services */}
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
              Our Story
            </h2>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-400 to-indigo-600 rounded-full"></div>
          </div>
          <h2 className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-['Open_Sans'] leading-relaxed">
            40+ Years of Power Excellence
          </h2>
        </motion.div>

        {/* Content Section */}
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 100 }}
          animate={inView ? {
            opacity: 1,
            y: 0,
            transition: {
              delay: 0.2,
              duration: 0.8,
              ease: "easeOut"
            }
          } : {}}
        >
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto font-['Open_Sans'] leading-relaxed text-justify">
            More than four decades ago, a handful of engineers huddled over humming transformers and half‑scribbled sketches, convinced that if power could be tamed, industry could dream bigger. That spark became KRYKARD. At KRYKARD, we've spent over 40 years helping power flow better—cleaner, steadier, and smarter—for industries across India. With over 5,00,000 Power Conditioners and 1,50,000 Load Managers installed, our journey is built on solving real problems, one voltage fluctuation at a time. From factory floors to control rooms, our 500+ strong team and nationwide service network ensure our customers aren't just powered—but empowered. We're not just about machines. We're about making power work for people. That's the Atandra way. From analog beginnings to digital precision, our stabilizers have evolved to meet the changing needs of modern industry, ensuring consistent power and equipment protection.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default TimelineFixed;