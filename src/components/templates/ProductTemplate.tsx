
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import EnhancedPageTitle from "@/components/ui/EnhancedPageTitle";
import { ShieldCheckIcon, GaugeIcon, ZapIcon } from "lucide-react";

interface ProductTemplateProps {
  title: string;
  subtitle: string;
  category: "measure" | "protect" | "conserve" | "about";
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({ title, subtitle, category }) => {
  return (
    <PageLayout
      hideHero={true}
      hideBreadcrumbs={true}
    >
      <EnhancedPageTitle
        title={title.toUpperCase()}
        subtitle={subtitle}
        category={category}
        features={[
          { icon: ZapIcon, text: "Advanced Technology" },
          { icon: ShieldCheckIcon, text: "Reliable Protection" },
          { icon: GaugeIcon, text: "Quality Performance" }
        ]}
      />

      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">About {title}</h2>
            <p className="text-muted-foreground mb-6">
              This page is under construction. We're working on bringing you detailed information about our {title.toLowerCase()}.
            </p>
            <p className="text-muted-foreground mb-6">
              Please check back soon for updates or contact our team for immediate assistance.
            </p>
            <Button asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src="https://via.placeholder.com/600x400" 
              alt={title} 
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>
      </div>
      
      <div className="mt-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Need More Information?</h2>
        <p className="text-center text-muted-foreground mb-8">
          Our team is ready to help you with product specifications, pricing, and any other details you need.
        </p>
        <div className="flex justify-center">
          <Button size="lg" asChild>
            <Link to="/contact">Contact Our Experts</Link>
          </Button>
        </div>
      </div>
    </PageLayout>
  );
};

export default ProductTemplate;
