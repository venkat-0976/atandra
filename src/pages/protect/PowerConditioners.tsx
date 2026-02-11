import React, { useState } from 'react';
import { 
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
  Building,
  Wrench,
  Target
} from 'lucide-react';

const TimelineEvent = ({ icon: Icon, title, description, isAbove = false, isActive = false, onClick }) => (
  <div 
    className={`relative cursor-pointer transition-all duration-300 ${
      isActive ? 'scale-105' : 'hover:scale-102'
    }`}
    onClick={onClick}
  >
    <div className={`flex flex-col items-center ${isAbove ? 'mb-8' : 'mt-8'}`}>
      <div className={`
        w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300
        ${isActive 
          ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' 
          : 'bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600'
        }
      `}>
        <Icon size={24} />
      </div>
      <div className={`mt-4 text-center max-w-32 ${isAbove ? 'order-first mb-4 mt-0' : ''}`}>
        <h3 className={`font-semibold text-sm leading-tight ${
          isActive ? 'text-blue-600' : 'text-gray-800'
        }`}>
          {title}
        </h3>
        <p className="text-xs text-gray-600 mt-1 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  </div>
);

const KrykardTimeline = () => {
  const [activeEvent, setActiveEvent] = useState(0);

  const timelineEvents = [
    {
      id: 0,
      icon: Zap,
      title: "Launched KRYKARD brand",
      description: "Introduction of the brand to the market",
      isAbove: false
    },
    {
      id: 1,
      icon: Monitor,
      title: "Launched Servo Stabilizer with Digital Display",
      description: "Introduction of the first digital display stabilizer in India",
      isAbove: true
    },
    {
      id: 2,
      icon: HardDrive,
      title: "Launched Portable Load Managers",
      description: "Introduction of portable load management devices",
      isAbove: false
    },
    {
      id: 3,
      icon: Settings,
      title: "Launched Panel Load Managers",
      description: "Introduction of panel-mounted load management devices",
      isAbove: true
    },
    {
      id: 4,
      icon: Network,
      title: "Installed first EMS Network",
      description: "Installation of the first energy management system network",
      isAbove: false
    },
    {
      id: 5,
      icon: BarChart3,
      title: "Launched PQ Analyzers",
      description: "Introduction of power quality analyzers",
      isAbove: true
    },
    {
      id: 6,
      icon: Cloud,
      title: "Launched Cloud Service portal & EFSR",
      description: "Introduction of cloud-based services and mobile app",
      isAbove: false
    },
    {
      id: 7,
      icon: Building,
      title: "Moved to new factory at Keezhkattalai",
      description: "Relocation to a modern factory facility",
      isAbove: true
    },
    {
      id: 8,
      icon: Wifi,
      title: "Launched Online UPS",
      description: "Introduction of online UPS systems",
      isAbove: false
    },
    {
      id: 9,
      icon: Wrench,
      title: "Launched Industry IoT 4.0 solutions",
      description: "Introduction of IoT solutions for industrial applications",
      isAbove: true
    },
    {
      id: 10,
      icon: Battery,
      title: "Launched Static Voltage Regulators",
      description: "Introduction of static voltage regulators",
      isAbove: false
    },
    {
      id: 11,
      icon: Target,
      title: "Started the 100th Service Centre in India",
      description: "Expansion of service network across India",
      isAbove: true
    },
    {
      id: 12,
      icon: TrendingUp,
      title: "Our Journey of Growth continues...",
      description: "Ongoing commitment to growth and innovation",
      isAbove: false
    }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Krykard's Journey of Innovation and Growth
        </h1>
        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div className="relative">
        {/* Main timeline line */}
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600 transform -translate-y-1/2 z-0"></div>
        
        {/* Timeline dots */}
        <div className="absolute top-1/2 left-0 right-0 flex justify-between items-center transform -translate-y-1/2 z-10">
          {timelineEvents.map((event, index) => (
            <div 
              key={event.id}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeEvent === index 
                  ? 'bg-blue-600 scale-150 shadow-lg shadow-blue-200' 
                  : 'bg-blue-300 hover:bg-blue-400'
              }`}
            />
          ))}
        </div>

        {/* Timeline events */}
        <div className="flex justify-between items-center relative z-20">
          {timelineEvents.map((event, index) => (
            <TimelineEvent
              key={event.id}
              icon={event.icon}
              title={event.title}
              description={event.description}
              isAbove={event.isAbove}
              isActive={activeEvent === index}
              onClick={() => setActiveEvent(index)}
            />
          ))}
        </div>
      </div>

      {/* Active event details */}
      <div className="mt-16 text-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto border border-blue-100">
          <div className="flex items-center justify-center mb-4">
            {React.createElement(timelineEvents[activeEvent].icon, {
              size: 48,
              className: "text-blue-600"
            })}
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {timelineEvents[activeEvent].title}
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            {timelineEvents[activeEvent].description}
          </p>
          <div className="mt-6 flex justify-center space-x-2">
            {timelineEvents.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveEvent(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  activeEvent === index ? 'bg-blue-600' : 'bg-gray-300 hover:bg-blue-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex justify-center space-x-4 mt-8">
        <button
          onClick={() => setActiveEvent(Math.max(0, activeEvent - 1))}
          disabled={activeEvent === 0}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Previous
        </button>
        <button
          onClick={() => setActiveEvent(Math.min(timelineEvents.length - 1, activeEvent + 1))}
          disabled={activeEvent === timelineEvents.length - 1}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default KrykardTimeline;