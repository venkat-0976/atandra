
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProductTemplateProps {
  title: string;
  subtitle: string;
  category: "measure" | "protect" | "conserve" | "about";
  introduction: {
    title: string;
    description: string[];
    image: string;
  };
  products: {
    id: string;
    name: string;
    description: string;
    features: string[];
    image: string;
  }[];
}

const ProductTemplate: React.FC<ProductTemplateProps> = ({
  title,
  subtitle,
  category,
  introduction,
  products
}) => {
  return (
    <PageLayout 
      title={title} 
      subtitle={subtitle}
      category={category}
    >
      <div className="mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <h2 className="text-3xl font-bold mb-6">{introduction.title}</h2>
            {introduction.description.map((paragraph, i) => (
              <p key={i} className="text-muted-foreground mb-6">{paragraph}</p>
            ))}
            <Button>Request a Demo</Button>
          </div>
          <div className="rounded-lg overflow-hidden shadow-lg">
            <img 
              src={introduction.image} 
              alt={title} 
              className="w-full h-auto object-cover"
              width={1920}
              height={1080}
              loading="eager"
            />
          </div>
        </motion.div>
      </div>
      
      <h2 className="text-3xl font-bold mb-8 text-center">Our Product Range</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  width={320}
                  height={240}
                  loading="lazy"
                />
              </div>
              <CardHeader>
                <CardTitle>{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <h4 className="font-medium mb-2">Key Features:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                  {product.features.slice(0, 4).map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" size="sm">Learn More</Button>
                {/* <Button size="sm">Get Quote</Button> */}
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-16 bg-muted/30 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Need Help Selecting the Right Product?</h2>
        <p className="text-center text-muted-foreground mb-8">
          Our team of experts can help you choose the right solution for your specific needs.
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
