import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheckIcon, GaugeIcon, ZapIcon } from 'lucide-react';

interface EnhancedPageTitleProps {
  title: string;
  subtitle: string;
  category?: 'protect' | 'measure' | 'conserve';
  features?: Array<{
    icon: React.ComponentType<any>;
    text: string;
  }>;
}

const EnhancedPageTitle: React.FC<EnhancedPageTitleProps> = ({
  title,
  subtitle,
  category = 'protect',
  features
}) => {
  // Enhanced blue color scheme for all categories
  const colors = {
    primary: "blue",
    gradient: "from-blue-500 via-blue-600 to-blue-700",
    bgGradient: "from-blue-50/40 via-blue-100/20 to-transparent",
    accent: "blue-100/30",
    textColor: "blue-700",
    titleColor: "blue-900",
    iconColor: "blue-600"
  };

  // Default features if none provided
  const defaultFeatures = [
    { icon: ZapIcon, text: "Advanced Technology" },
    { icon: ShieldCheckIcon, text: "Reliable Protection" },
    { icon: GaugeIcon, text: "Quality Performance" }
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <>
      {/* Hide Breadcrumbs and Add Custom Title */}
      <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
      `}</style>

      {/* Enhanced Custom Title Section with Attractive Blue Background */}
      <div className="relative bg-gradient-to-br from-white via-blue-50/30 to-blue-100/20 py-12 md:py-16 border-b border-blue-100/50 overflow-hidden">
        {/* Enhanced Background Design */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Main gradient overlays */}
          <div className={`absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l ${colors.bgGradient}`}></div>
          <div className={`absolute bottom-0 left-0 w-1/2 h-full bg-gradient-to-r ${colors.bgGradient}`}></div>

          {/* Floating geometric elements */}
          <div className="absolute top-8 right-12 w-20 h-20 bg-blue-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-16 right-32 w-12 h-12 bg-blue-300/40 rounded-full blur-xl"></div>
          <div className="absolute bottom-8 left-12 w-16 h-16 bg-blue-100/40 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-32 w-8 h-8 bg-blue-200/50 rounded-full blur-lg"></div>

          {/* Geometric patterns */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-200/30 rounded-full animate-spin-slow opacity-20"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-blue-300/20 rounded-full animate-spin-slow-reverse opacity-15"></div>

          {/* Grid pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B82F6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}></div>

          {/* Subtle light rays */}
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-blue-200/20 via-transparent to-transparent transform -translate-x-1/2"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200/20 to-transparent transform -translate-y-1/2"></div>
        </div>

        {/* Add custom animations */}
        <style>{`
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes spin-slow-reverse {
            from { transform: rotate(360deg); }
            to { transform: rotate(0deg); }
          }
          .animate-spin-slow {
            animation: spin-slow 20s linear infinite;
          }
          .animate-spin-slow-reverse {
            animation: spin-slow-reverse 25s linear infinite;
          }
        `}</style>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Enhanced Main Title with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6"
          >
            <h1 className="typography-h1 text-blue-900 mb-6 tracking-tight drop-shadow-sm">
              {title.split(' ').map((word, index, array) => (
                <span key={index}>
                  {index === array.length - 1 ? (
                    <span className="relative inline-block">
                      <span className="relative z-10 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                        {word}
                      </span>
                      <motion.div
                        className="absolute -bottom-2 left-0 h-1.5 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 rounded-full shadow-lg"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
                      />
                      <motion.div
                        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-300 to-blue-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
                      />
                    </span>
                  ) : (
                    <span className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 bg-clip-text text-transparent">
                      {word + ' '}
                    </span>
                  )}
                </span>
              ))}
            </h1>
            
            {/* Enhanced Decorative Elements */}
            <div className="flex justify-center items-center gap-4 mb-6">
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "60px", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-transparent via-blue-500 to-blue-600 rounded-full"
              />
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg"
              />
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "60px", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-1 bg-gradient-to-r from-blue-600 via-blue-500 to-transparent rounded-full"
              />
            </div>
          </motion.div>

          {/* Enhanced Subtitle with Better Typography */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-8"
          >
            <p className="typography-h4 text-gray-700 max-w-5xl mx-auto">
              {subtitle.split(' ').map((word, index) => {
                // Highlight key words in the subtitle
                const keyWords = ['mission-critical', 'enterprise-grade', 'advanced', 'robust', 'reliable', 'quality', 'professional', 'industrial', 'protection', 'solutions', 'technology'];
                const isKeyWord = keyWords.some(key => word.toLowerCase().includes(key.toLowerCase()));

                return (
                  <span key={index} className={isKeyWord ? 'text-blue-700 font-semibold bg-blue-50/50 px-1 rounded' : ''}>
                    {word}{index < subtitle.split(' ').length - 1 ? ' ' : ''}
                  </span>
                );
              })}
            </p>
          </motion.div>

          {/* Enhanced Feature Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex justify-center items-center gap-6 flex-wrap"
          >
            {displayFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                className="flex items-center gap-3 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-blue-100/50 hover:shadow-xl hover:scale-105 transition-all duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-semibold text-blue-900 whitespace-nowrap">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default EnhancedPageTitle;
