import React from "react";
import { motion } from "framer-motion";

interface SubpageHeaderProps {
  title: string;
  subtitle?: string;
}

const SubpageHeader: React.FC<SubpageHeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="w-full py-12 bg-background">
      <div className="container max-w-7xl mx-auto">
        <div className="text-center">
          <motion.h1
            className="typography-h1 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              className="typography-body text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubpageHeader;