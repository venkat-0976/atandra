import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ButtonProps } from "@/components/ui/button";

interface GradientButtonProps extends ButtonProps {
  gradientType?: "primary" | "blue" | "green" | "yellow" | "outline";
}

export const GradientButton: React.FC<GradientButtonProps> = ({ 
  children, 
  className, 
  gradientType = "primary", 
  ...props 
}) => {
  const getButtonStyle = () => {
    switch (gradientType) {
      case "primary":
        return "bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 hover:from-blue-700 hover:via-green-700 hover:to-yellow-600";
      case "blue":
        return "bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900";
      case "green":
        return "bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900";
      case "yellow":
        return "bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700";
      case "outline":
        return "bg-transparent border border-white/30 hover:bg-white/10 text-white";
      default:
        return "bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 hover:from-blue-700 hover:via-green-700 hover:to-yellow-600";
    }
  };

  return (
    <Button
      className={`${getButtonStyle()} border-none shadow-lg relative overflow-hidden ${className}`}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <motion.div 
        className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-20 transition-opacity duration-300"
        whileHover={{ opacity: 0.2 }}
        transition={{ duration: 0.3 }}
      ></motion.div>
    </Button>
  );
};