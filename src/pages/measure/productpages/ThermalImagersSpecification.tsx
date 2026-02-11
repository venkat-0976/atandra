import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import SeoHead from "@/seo/SeoHead";
import {
  ChevronRight,
  ChevronLeft,
  Thermometer,
  FileText,
  Mail,
  ArrowRight,
  ArrowLeft,
  Download,
  Info,
  Check,
  Smartphone,
  Camera,
  Wifi,
  Bluetooth,
  Battery,
  Save,
  Layers,
  Grid,
  Table
} from "lucide-react";

// Import all thermal imager data from a shared file
// This is the same data structure as in ThermalImager.tsx
const thermalImagers = [
  // Entry-level and Pocket Series
  {
    id: "tc-s030",
    name: "TC S030",
    description: "Entry-level thermal imager with touch screen interface",
    features: [
      "IR Resolution: 96 × 96 (9,216 pixels)",
      "SuperIR Resolution: Yes, on captured images & live view",
      "Temperature Range: -20°C to 350°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 50° × 50°",
      "NETD: < 50 mK",
      "Focus: Fixed Focus & minimum focus of 0.1m",
      "Image Frequency: 25 Hz"
    ],
    specifications: {
      irResolution: "96 × 96",
      superIRResolution: "Yes, on captured images & live view",
      temperatureRange: "-20°C to 350°C",
      accuracy: "±2°C, ±2%",
      fov: "50° × 50°",
      netd: "< 50 mK",
      focus: "Fixed Focus & minimum focus of 0.1m",
      imageFrequency: "25 Hz"
    },
    image: "/assets/ThermalImagers/tcs030.png",
    battery: "4 hours (Built-in)",
    memory: "Built-in 4GB",
    imageMode: "Thermal/Visual/Fusion/PIP/Blending",
    visualCamera: "640 × 480 (0.3 MP)",
    display: "320 × 240 Resolution, 3.5\" LCD touch screen",
    category: "compact",
    series: "Compact Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 96 × 96 (9,216 pixels)",
        "SuperIR Resolution: Yes, on captured images & live view",
        "NETD (Thermal Sensitivity): < 50 mK",
        "Field of View: 50° × 50°",
        "Spatial Resolution (IFOV): 8.89 mrad",
        "Image Frequency: 25 Hz",
        "Focus: Fixed Focus & minimum focus of 0.1m",
        "Image Modes: Thermal/Visual/Fusion/PIP/Blending"
      ],
      measurement: [
        "Temperature Range: -20°C to 350°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot Spot Detection",
        "Color Palettes: Iron, Rainbow, Grey"
      ],
      storage: [
        "Storage Medium: Built-in 4GB",
        "Image Storage Capacity: up to 30,000 images",
        "Video Storage Capacity: up to 20 hours",
        "File Format: Standard JPEG with measurement data"
      ],
      general: [
        "Display: 320 × 240 Resolution, 3.5\" LCD touch screen",
        "Visual Camera: 640 × 480 (0.3 MP)",
        "Battery: Li-ion, 4 hours operation (Built-in)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54",
        "Interfaces: USB, WiFi"
      ]
    }
  },
  {
    id: "tc-e050",
    name: "TC E050",
    description: "Pocket-sized thermal imager with extended battery life",
    features: [
      "IR Resolution: 96 × 96 (9,216 pixels)",
      "SuperIR Resolution: 240 × 240",
      "Temperature Range: -20°C to 550°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 50° × 50°",
      "NETD: < 50 mK",
      "Focus: Fixed & minimum distance of 0.1m",
      "Image Frequency: 25 Hz"
    ],
    specifications: {
      irResolution: "96 × 96",
      superIRResolution: "240 × 240",
      temperatureRange: "-20°C to 550°C",
      accuracy: "±2°C, ±2%",
      fov: "50° × 50°",
      netd: "< 50 mK",
      focus: "Fixed & minimum distance of 0.1m",
      imageFrequency: "25 Hz",
      spatialResolution: "8.89 mrad"
    },
    image: "/assets/ThermalImagers/tce050.png",
    battery: "8 hours (Built-in)",
    memory: "Built-in 4GB flash memory",
    imageMode: "Thermal/Visual/Fusion",
    visualCamera: "640 × 480 (0.3 MP)",
    display: "240 × 320 Resolution, 2.4\" LCD Screen",
    category: "compact",
    series: "Pocket Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 96 × 96 (9,216 pixels)",
        "SuperIR Resolution: 240 × 240",
        "NETD (Thermal Sensitivity): < 50 mK",
        "Field of View: 50° × 50°",
        "Spatial Resolution (IFOV): 8.89 mrad",
        "Image Frequency: 25 Hz",
        "Focus: Fixed & minimum distance of 0.1m",
        "Image Modes: Thermal/Visual/Fusion"
      ],
      measurement: [
        "Temperature Range: -20°C to 550°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot Spot Detection",
        "Color Palettes: Iron, Rainbow, Grey, Hot Metal"
      ],
      storage: [
        "Storage Medium: Built-in 4GB flash memory",
        "Image Storage Capacity: up to 18,000 images",
        "File Format: Standard JPEG with measurement data"
      ],
      general: [
        "Display: 240 × 320 Resolution, 2.4\" LCD Screen",
        "Visual Camera: 640 × 480 (0.3 MP)",
        "Battery: Li-ion, 8 hours operation (Built-in)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54",
        "Interfaces: USB, Laser pointer"
      ]
    }
  },
  {
    id: "ma-250",
    name: "MA 250",
    description: "Smartphone attachment thermal imager for mobile applications",
    features: [
      "IR Resolution: 256 × 192 (49,152 pixels)",
      "SuperIR Resolution: Yes, on captured images & live view",
      "Temperature Range: -20°C to 400°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 50° × 37.2°",
      "NETD: < 40 mK",
      "Focus: Fixed & minimum distance 0.2m",
      "Image Frequency: 50 Hz"
    ],
    specifications: {
      irResolution: "256 × 192",
      superIRResolution: "Yes, on captured images & live view",
      temperatureRange: "-20°C to 400°C",
      accuracy: "±2°C, ±2%",
      fov: "50° × 37.2°",
      netd: "< 40 mK",
      focus: "Fixed & minimum distance 0.2m",
      imageFrequency: "50 Hz"
    },
    image: "/assets/ThermalImagers/ma250.png",
    imageMode: "Thermal/PIP",
    communication: "USB-C Android, USB-C iOS, Lightning iOS (Includes a Lightning to USB-C adapter)",
    category: "mobile",
    series: "Mobile Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 256 × 192 (49,152 pixels)",
        "SuperIR Resolution: Yes, on captured images & live view",
        "NETD (Thermal Sensitivity): < 40 mK",
        "Field of View: 50° × 37.2°",
        "Focus: Fixed & minimum distance 0.2m",
        "Image Frequency: 50 Hz",
        "Image Modes: Thermal/PIP"
      ],
      measurement: [
        "Temperature Range: -20°C to 400°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot/Cold Detection",
        "Color Palettes: Iron, Rainbow, Grey, Lava, Arctic"
      ],
      storage: [
        "Storage Medium: Uses smartphone storage",
        "File Format: Standard JPEG with measurement data"
      ],
      general: [
        "Display: Uses smartphone display",
        "Communication Interface: USB-C Android, USB-C iOS, Lightning iOS (Includes a Lightning to USB-C adapter)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54",
        "Power: Supplied by smartphone"
      ]
    }
  },
  // Compact Series - mid-range
  {
    id: "tc-2150",
    name: "TC 2150",
    description: "Compact thermal imager with 2MP visual camera",
    features: [
      "IR Resolution: 192 × 144 (27,648 pixels)",
      "SuperIR Resolution: Yes, on captured images & live view",
      "Temperature Range: -20°C to 550°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 27.8° × 37.2°",
      "NETD: < 40 mK",
      "Focus: Fixed & minimum distance 0.3m",
      "Image Frequency: 25 Hz"
    ],
    specifications: {
      irResolution: "192 × 144",
      superIRResolution: "Yes, on captured images & live view",
      temperatureRange: "-20°C to 550°C",
      accuracy: "±2°C, ±2%",
      fov: "27.8° × 37.2°",
      netd: "< 40 mK",
      focus: "Fixed & minimum distance 0.3m",
      imageFrequency: "25 Hz",
      spatialResolution: "3.0 mrad"
    },
    image: "/assets/ThermalImagers/tc2150.png",
    battery: "6 hours (Built-in)",
    memory: "Built-in 16 GB",
    imageMode: "Thermal/Visual/Fusion/PIP",
    visualCamera: "1600 x 1200 (2 MP)",
    display: "240 × 320 Resolution, 3.2\" LCD screen",
    category: "compact",
    series: "Compact Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 192 × 144 (27,648 pixels)",
        "SuperIR Resolution: Yes, on captured images & live view",
        "NETD (Thermal Sensitivity): < 40 mK",
        "Field of View: 27.8° × 37.2°",
        "Spatial Resolution (IFOV): 3.0 mrad",
        "Image Frequency: 25 Hz",
        "Focus: Fixed & minimum distance 0.3m",
        "Image Modes: Thermal/Visual/Fusion/PIP"
      ],
      measurement: [
        "Temperature Range: -20°C to 550°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot/Cold Auto Detection, Area Analysis",
        "Color Palettes: Iron, Rainbow, Grey, Grey Inverted"
      ],
      storage: [
        "Storage Medium: Built-in 16 GB",
        "Image Storage Capacity: up to 90,000 images",
        "File Format: Standard JPEG with measurement data"
      ],
      general: [
        "Display: 240 × 320 Resolution, 3.2\" LCD screen",
        "Visual Camera: 1600 x 1200 (2 MP)",
        "Battery: Li-ion, 6 hours operation (Built-in)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54",
        "Interfaces: USB, WiFi"
      ]
    }
  },
  {
    id: "tc-3660",
    name: "TC 3660",
    description: "Advanced thermal imager with high-resolution sensor",
    features: [
      "IR Resolution: 640 × 480 (307,200 pixels)",
      "SuperIR Resolution: 1280 × 960",
      "Temperature Range: -20°C to 650°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 41.9° × 33.3°",
      "NETD: < 35 mK",
      "Focus: Manual & minimum distance 0.3m",
      "Image Frequency: 30 Hz"
    ],
    specifications: {
      irResolution: "640 × 480",
      superIRResolution: "1280 × 960",
      temperatureRange: "-20°C to 650°C",
      accuracy: "±2°C, ±2%",
      fov: "41.9° × 33.3°",
      netd: "< 35 mK",
      focus: "Manual & minimum distance 0.3m",
      imageFrequency: "30 Hz",
      spatialResolution: "1.13 mrad",
      digitalZoom: "1.0x to 8.0 x continuous"
    },
    image: "/assets/ThermalImagers/tc3660.png",
    battery: "4 hours (Interchangeable Battery)",
    memory: "64 GB Micro SD card (100,000 Images & 300 hours Video)",
    imageMode: "Thermal/Visual/Fusion/PIP/Blending",
    visualCamera: "3264 × 2448 (8 MP)",
    display: "640 × 480 Resolution, 3.5\" LCD touch screen",
    category: "imager",
    series: "Professional Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 640 × 480 (307,200 pixels)",
        "SuperIR Resolution: 1280 × 960",
        "NETD (Thermal Sensitivity): < 35 mK",
        "Field of View: 41.9° × 33.3°",
        "Spatial Resolution (IFOV): 1.13 mrad",
        "Image Frequency: 30 Hz",
        "Focus: Manual & minimum distance 0.3m",
        "Image Modes: Thermal/Visual/Fusion/PIP/Blending",
        "Digital Zoom: 1.0x to 8.0 x continuous"
      ],
      measurement: [
        "Temperature Range: -20°C to 650°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot/Cold Auto Detection, Area Analysis, Isotherm",
        "Color Palettes: Iron, Rainbow, Rainbow HC, Grey, Grey Inverted, Hot Metal"
      ],
      storage: [
        "Storage Medium: 64 GB Micro SD card",
        "Image Storage Capacity: up to 100,000 images",
        "Video Storage Capacity: up to 300 hours",
        "File Format: Standard JPEG with measurement data, MP4 for video"
      ],
      general: [
        "Display: 640 × 480 Resolution, 3.5\" LCD touch screen",
        "Visual Camera: 3264 × 2448 (8 MP)",
        "Battery: Li-ion, 4 hours operation (Interchangeable)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54, 2m drop test",
        "Interfaces: USB-C, HDMI, WiFi, Bluetooth"
      ]
    }
  },
  {
    id: "tc-4360",
    name: "TC 4360",
    description: "High-resolution thermal imager for professional applications",
    features: [
      "IR Resolution: 384 × 288 (110,592 pixels)",
      "SuperIR Resolution: 768 x 576",
      "Temperature Range: -20°C to 650°C",
      "Accuracy: ±2°C, ±2%",
      "Field of View (FOV): 25° × 19°",
      "NETD: < 35 mK",
      "Focus: Manual & minimum distance 0.1m",
      "Image Frequency: 30 Hz"
    ],
    specifications: {
      irResolution: "384 × 288",
      superIRResolution: "768 × 576",
      temperatureRange: "-20°C to 650°C",
      accuracy: "±2°C, ±2%",
      fov: "25° × 19°",
      netd: "< 35 mK",
      focus: "Manual & minimum distance 0.1m",
      imageFrequency: "30 Hz",
      spatialResolution: "1.13 mrad",
      digitalZoom: "1.0x to 8.0 x continuous"
    },
    image: "/assets/ThermalImagers/tc4360.png",
    battery: "4 hours (Interchangeable Battery)",
    memory: "64 GB Micro SD card (100,000 images & 300 hours Video)",
    imageMode: "Thermal/Visual/Fusion/PIP/Blending",
    visualCamera: "3264 × 2448 (8 MP)",
    display: "640 × 480 Resolution, 3.5\" LCD touch screen",
    category: "imager",
    series: "Professional Series",
    detailedFeatures: {
      imaging: [
        "IR Resolution: 384 × 288 (110,592 pixels)",
        "SuperIR Resolution: 768 x 576",
        "NETD (Thermal Sensitivity): < 35 mK",
        "Field of View: 25° × 19° (Optional lens available)",
        "Spatial Resolution (IFOV): 1.13 mrad",
        "Image Frequency: 30 Hz",
        "Focus: Manual & minimum distance 0.1m",
        "Image Modes: Infrared/Visual/Fusion/PIP/Blending"
      ],
      measurement: [
        "Temperature Range: -20°C to 650°C",
        "Accuracy: ±2°C, ±2%",
        "Measurement Tools: Center Spot, Hot/Cold Auto Detection, Area Analysis",
        "Color Palettes: Iron, Rainbow, Rainbow HC, Grey, Grey Inverted"
      ],
      storage: [
        "Storage Medium: 64 GB Micro SD card",
        "Image Storage Capacity: up to 100,000 images",
        "Video Storage Capacity: up to 300 hours",
        "File Format: Standard JPEG with measurement data"
      ],
      general: [
        "Display: 640 × 480 Resolution, 3.5\" LCD touch screen",
        "Visual Camera: 3264 × 2448 (8 MP)",
        "Battery: Li-ion, 4 hours operation (Interchangeable)",
        "Operating Temperature: -15°C to 50°C",
        "Storage Temperature: -40°C to 70°C",
        "Encapsulation: IP54, 2m drop test",
        "Interfaces: USB-C, HDMI, WiFi, Bluetooth"
      ]
    }
  }
];

const SpecificationSection = ({ title, items }) => {
  return (
    <div className="mb-10">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="w-2 h-6 bg-amber-500 rounded-full mr-3"></span>
        {title}
      </h3>
      <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-6 border border-amber-100/50 dark:border-amber-800/20">
        <ul className="space-y-3">
          {items.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
              className="flex items-start"
            >
              <Check className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
              <span className="text-gray-800 dark:text-gray-200">{item}</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// Product Images Showcase Component
const ProductImagesShowcase = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [
    { src: "/Untitled_design__1_-removebg-preview.png", label: "Front View" },
    { src: "/Untitled_design__1_-removebg-preview.png", label: "Side View" },
    { src: "/Untitled_design__1_-removebg-preview.png", label: "Back View" },
    { src: "/Untitled_design__1_-removebg-preview.png", label: "Sample Image" }
  ];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6 mb-8">
      <div className="relative h-72 sm:h-96 mb-6 bg-gradient-to-br from-amber-50/50 to-amber-50/30 dark:from-amber-900/10 dark:to-amber-900/5 rounded-xl flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center h-full"
          >
            <img
              src={images[currentIndex].src}
              alt={`${product.name} - ${images[currentIndex].label}`}
              className="max-h-full max-w-full object-contain"
            />
          </motion.div>
        </div>

        <motion.button
          onClick={handlePrev}
          className="absolute left-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md backdrop-blur-sm z-10"
          whileHover={{ scale: 1.1, x: -2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft className="h-6 w-6 text-amber-600" />
        </motion.button>

        <motion.button
          onClick={handleNext}
          className="absolute right-2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md backdrop-blur-sm z-10"
          whileHover={{ scale: 1.1, x: 2 }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight className="h-6 w-6 text-amber-600" />
        </motion.button>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {images[currentIndex].label}
        </div>
      </div>

      <div className="flex justify-center space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex
              ? "bg-amber-500 w-8"
              : "bg-gray-300 dark:bg-gray-600 hover:bg-amber-300 dark:hover:bg-amber-700"
              }`}
            aria-label={`View image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

// Main component
const ThermalImagersSpecification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    // Get product ID from URL parameters
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('product');

    if (productId) {
      const foundProduct = thermalImagers.find(p => p.id === productId);
      if (foundProduct) {
        setProduct(foundProduct);
      } else {
        // If product not found, navigate back to main page
        navigate('/measure/thermal-imagers');
      }
    } else {
      // If no product ID specified, navigate back to main page
      navigate('/measure/thermal-imagers');
    }
  }, [location.search, navigate]);

  const handleBack = () => {
    navigate('/measure/thermal-imagers');
  };

  if (!product) {
    return (
      <>
        <SeoHead
          title="Thermal Imager Specifications | KRYKARD"
          description="Detailed technical specifications for KRYKARD thermal imaging cameras and infrared cameras."
          keywords="thermal imager, thermal camera specifications, infrared camera, thermal imaging, temperature measurement"
          canonical="https://atandra.in/measure/productpages/thermal-imagers/specification"
        />
        <PageLayout
          title="Loading Specifications..."
          subtitle="Please wait while we load the product specifications."
          category="measure"
        >
          <div className="flex justify-center items-center h-64">
            <div className="animate-pulse bg-amber-100 dark:bg-amber-900/50 rounded-lg w-full max-w-3xl h-full"></div>
          </div>
        </PageLayout>
      </>
    );
  }

  // SEO data for the product specification page
  const seoTitle = `${product.name} Specifications | KRYKARD Thermal Imagers`;
  const seoDescription = `Detailed technical specifications for ${product.name}. ${product.description} Features include ${product.specifications.irResolution} IR resolution, ${product.specifications.temperatureRange} temperature range, and ${product.specifications.netd} thermal sensitivity.`;
  const seoKeywords = `thermal imager, ${product.name}, thermal camera specifications, infrared camera, thermal imaging, temperature measurement, ${product.series}`;
  const seoCanonical = `https://atandra.in/measure/productpages/thermal-imagers/specification?product=${product.id}`;

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        keywords={seoKeywords}
        canonical={seoCanonical}
        ogImage={product.image}
        preloadImage={product.image}
      />
      <PageLayout
        title={`${product.name} Specifications`}
        subtitle="Detailed technical specifications and features."
        category="measure"
      >
        {/* Back button */}
        <motion.button
          onClick={handleBack}
          className="inline-flex items-center mb-8 text-amber-600 hover:text-amber-500 transition-colors"
          whileHover={{ x: -3 }}
          whileTap={{ scale: 0.97 }}
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back to Thermal Imagers
        </motion.button>

        {/* Product overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-1">
            <ProductImagesShowcase product={product} />

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Information</h3>

              <div className="space-y-4">
                <div className="flex items-start">
                  <Thermometer className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Temperature Range</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.specifications.temperatureRange}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Grid className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">IR Resolution</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.specifications.irResolution} pixels</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Layers className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Thermal Sensitivity</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.specifications.netd}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Battery className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Battery Life</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.battery}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Save className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Storage</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.memory}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Camera className="h-5 w-5 text-amber-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visual Camera</p>
                    <p className="text-gray-900 dark:text-white font-medium">{product.visualCamera}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex flex-row gap-3 justify-center">
                {/* Download Brochure Button */}
                <motion.a
                  href="/KRYKARD-Comprehensive-Product-Catalogue.pdf"
                  className="inline-flex items-center justify-center bg-amber-400 hover:bg-amber-500 text-gray-900 font-semibold text-sm min-w-[200px] px-4 py-2 rounded-xl shadow transition-colors border-2 border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  rel="nofollow"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Brochure
                </motion.a>

                {/* Request Quote Button */}
                <motion.a
                  href={`/enquiry?product=${product.id}`}
                  className="inline-flex items-center justify-center bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold text-sm min-w-[200px] px-4 py-2 rounded-xl border-2 border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/10 transition-colors shadow focus:outline-none focus:ring-2 focus:ring-amber-300"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Request Quote
                </motion.a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{product.name}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">{product.description}</p>

              <div className="bg-amber-50/50 dark:bg-amber-900/10 rounded-xl p-4 border border-amber-100 dark:border-amber-700/30 mb-8">
                <h3 className="font-bold text-amber-800 dark:text-amber-300 mb-2">Product Overview</h3>
                <p className="text-gray-800 dark:text-gray-200">
                  The {product.name} is a professional-grade thermal imaging camera designed for industrial, electrical, and building applications. With its {product.specifications.irResolution} infrared resolution and thermal sensitivity of {product.specifications.netd}, it provides exceptional thermal imaging quality for identifying temperature anomalies and potential issues before they cause major problems.
                </p>
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Key Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {product.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="flex items-start bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg"
                  >
                    <Check className="h-5 w-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-800 dark:text-gray-200">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* Detailed specifications sections */}
              {product.detailedFeatures && (
                <>
                  <SpecificationSection title="Imaging & Optics" items={product.detailedFeatures.imaging} />
                  <SpecificationSection title="Measurement & Analysis" items={product.detailedFeatures.measurement} />
                  <SpecificationSection title="Image Storage" items={product.detailedFeatures.storage} />
                  <SpecificationSection title="General Specifications" items={product.detailedFeatures.general} />
                </>
              )}
            </div>

            {/* Recommended accessories */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Recommended Accessories</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  {
                    name: "Additional Battery Pack",
                    description: "Extend your field operation time with extra battery power",
                    icon: <Battery className="h-10 w-10 text-amber-500" />
                  },
                  {
                    name: "Carrying Case",
                    description: "Heavy-duty protective case for safe transport and storage",
                    icon: <Layers className="h-10 w-10 text-amber-500" />
                  },
                  {
                    name: "Telephoto Lens",
                    description: "For long-distance thermal imaging applications",
                    icon: <Camera className="h-10 w-10 text-amber-500" />
                  },
                  {
                    name: "Analysis Software",
                    description: "Advanced thermal image analysis and reporting tools",
                    icon: <Table className="h-10 w-10 text-amber-500" />
                  }
                ].map((accessory, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg flex"
                  >
                    <div className="mr-4 bg-amber-100 dark:bg-amber-900/40 rounded-lg p-3 flex items-center justify-center">
                      {accessory.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 dark:text-white">{accessory.name}</h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">{accessory.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ThermalImagersSpecification;