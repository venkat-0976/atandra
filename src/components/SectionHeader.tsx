import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subtitle, className }) => (
  <div className={`relative bg-blue-100 py-6 sm:py-8 lg:py-10 overflow-hidden ${className || ''}`}>
    {/* Decorative background effect - more visible */}
    <div className="absolute -top-16 -left-16 w-72 h-72 bg-gradient-to-br from-blue-400 via-teal-300 to-white rounded-full blur-2xl opacity-90 z-0"></div>
    <div className="absolute top-8 right-0 w-56 h-56 bg-gradient-to-br from-teal-300 via-blue-200 to-white rounded-full blur-xl opacity-80 z-0"></div>
    <div className="absolute inset-0 bg-blue-100/80 z-0"></div>
    <div className="relative max-w-7xl mx-auto text-center px-4 sm:px-6 lg:px-8 z-10">
      <h1 className="typography-h2 text-blue-900 mb-4">
        {title}
      </h1>
      {subtitle && (
        <p className="typography-h5 text-black max-w-4xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  </div>
);

export default SectionHeader; 