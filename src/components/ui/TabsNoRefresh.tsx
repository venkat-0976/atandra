import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TabProps {
  id: string;
  label: string;
  icon?: React.ReactNode;
}

interface TabsNoRefreshProps {
  tabs: TabProps[];
  defaultTab: string;
  onChange?: (tabId: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabContentProps {
  tabId: string;
  activeTab: string;
  children: React.ReactNode;
}

const TabButton: React.FC<{
  tab: TabProps;
  isActive: boolean;
  onClick: (e: React.MouseEvent, tabId: string) => void;
}> = ({ tab, isActive, onClick }) => {
  return (
    <button
      type="button"
      onClick={(e) => onClick(e, tab.id)}
      className={`relative py-3 px-8 font-medium text-lg transition-colors duration-300 rounded-full ${
        isActive ? 'bg-blue-600 text-white shadow-md' : 'text-blue-700 hover:bg-blue-50'
      }`}
    >
      <div className="flex items-center gap-3">
        {tab.icon && (
          <div className="icon-container">
            {tab.icon}
          </div>
        )}
        <span>{tab.label}</span>
      </div>
      {isActive && (
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
      )}
    </button>
  );
};

const TabContent: React.FC<TabContentProps> = ({ tabId, activeTab, children }) => {
  return (
    <AnimatePresence mode="wait">
      {activeTab === tabId && (
        <motion.div
          key={tabId}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export const TabsNoRefresh: React.FC<TabsNoRefreshProps> = ({
  tabs,
  defaultTab,
  onChange,
  children,
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabChange = (e: React.MouseEvent, tabId: string) => {
    // Prevent default behavior
    e.preventDefault();
    e.stopPropagation();
    
    // Update active tab
    setActiveTab(tabId);
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(tabId);
    }
  };

  // Filter and clone children to pass activeTab prop
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { activeTab } as any);
    }
    return child;
  });

  return (
    <div className={className}>
      {/* Tab Buttons */}
      <div className="mb-8">
        <div className="bg-blue-100 rounded-full p-1 flex justify-center">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={handleTabChange}
            />
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-8 bg-white rounded-2xl shadow-lg border border-blue-100">
        {childrenWithProps}
      </div>
    </div>
  );
};

export const Tab: React.FC<TabContentProps> = ({ tabId, activeTab, children }) => {
  return (
    <TabContent tabId={tabId} activeTab={activeTab}>
      {children}
    </TabContent>
  );
};

export default TabsNoRefresh;
