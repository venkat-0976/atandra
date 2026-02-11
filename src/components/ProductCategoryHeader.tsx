import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProductTab {
  name: string;
  path: string;
}

interface ProductCategoryHeaderProps {
  title?: string;
  tabs: ProductTab[];
  showCompareButton?: boolean;
}

const ProductCategoryHeader: React.FC<ProductCategoryHeaderProps> = ({
  title,
  tabs,
  showCompareButton = false
}) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-full bg-background border-t border-b border-border">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          <nav className="flex">
            <Link 
              to={`/measure/class-a-analyzers`} 
              className={cn(
                "px-4 py-3 text-sm font-medium hover:text-foreground transition-colors border-b-2 border-transparent",
                (currentPath.endsWith("/measure/class-a-analyzers") || 
                 currentPath.includes("overview")) 
                  ? "border-blue-500 text-foreground" 
                  : "text-muted-foreground"
              )}
            >
              Overview
            </Link>
            
            {tabs.map((tab) => (
              <Link
                key={tab.path}
                to={tab.path}
                className={cn(
                  "px-4 py-3 text-sm font-medium hover:text-foreground transition-colors border-b-2 border-transparent",
                  currentPath.includes(tab.path.split('/').pop() || '')
                    ? "border-blue-500 text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {tab.name}
              </Link>
            ))}
          </nav>
          
          {showCompareButton && (
            <div className="flex items-center">
              <Button 
                variant="outline" 
                size="sm"
              >
                Compare
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCategoryHeader;