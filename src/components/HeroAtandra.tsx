import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import WaveHero from "@/components/WaveHero";

import { useTheme } from 'next-themes';

const HeroAtandra = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  // Track if component is mounted (client-side only)
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const slides = [
    {
      // title: "Discover Our Power Solutions",
      // subtitle: "Watch Our Story",
      // description: "Experience the innovation and quality that drives our success in power management",
      video: "/KRYKARD - Atandra Energy (720p, h264) (online-video-cutter.com).mp4"
    },
    {
      // title: "Powering India's Future with Advanced Energy Solutions",
      // subtitle: "Power & Energy Management",
      // description: "40+ years of excellence in UPS systems, voltage stabilizers, and power quality solutions",
      image: "/KRYKARD - Atandra Energy (720p, h264) (online-video-cutter.com) (1).mp4"
    },
    {
      title: "India's No.1 Manufacturer of Servo Stabilizers",
      subtitle: "Voltage Regulation Excellence",
      description: "Trusted by large corporates and OEMs across 100+ service centers nationwide",
      // image: "/background_images/servo stabilizers.png"
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"  // ✅ Add this
    },
    {
      title: "Comprehensive Power Protection & Energy Conservation",
      subtitle: "Complete Power Solutions",
      description: "From measurement to protection to conservation - your complete power partner",
      // image: "/background_images/Protect.png"
      gradient: "linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)"  // ✅ Add this
    },
    {
      title: "Nationwide Service Excellence",
      subtitle: "100+ Service Centers",
      description: "24/7 support with certified technicians and genuine parts across India",
      image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=1920&q=80"
    }
  ];

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // SSR-safe theme handling
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === 'system' ? systemTheme : theme;
  const isDark = typeof window !== 'undefined' && currentTheme === 'dark';

  return (
    <section className="relative min-h-screen h-screen overflow-hidden">
      {/* Background Images/Videos */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10"></div>
          {slide.video || (slide.image && slide.image.match(/\.(mp4|webm|ogg)$/i)) ? (
            <video
              src={slide.video || slide.image}
              className="w-full h-full object-cover object-center"
              autoPlay
              loop
              muted
              playsInline
            />
          ) : slide.gradient ? (
            // Use gradient directly - no image loading, no 404 errors
            <div
              className="w-full h-full"
              style={{ background: slide.gradient }}
            />
          ) : slide.image ? (
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center"
              width={1920}
              height={1080}
              onError={(e) => {
                // Fallback to a gradient background if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const parent = target.parentElement;
                if (parent) {
                  parent.style.background = 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #60a5fa 100%)';
                }
              }}
            />
          ) : null}
        </div>
      ))}

      {/* Content */}
      <div className="absolute inset-0 z-20 flex items-center justify-start">
        <div className="text-left text-white max-w-3xl pl-6 pr-4 sm:pl-12 sm:pr-8 lg:pl-24 lg:pr-16 py-8">
          <div className="mb-3 sm:mb-4">
            <span className="typography-small text-blue-200 uppercase tracking-wider">
              {slides[currentSlide].subtitle}
            </span>
          </div>
          <h2 className="typography-h1 mb-4 sm:mb-6 text-white pl-0">
            {slides[currentSlide].title}
          </h2>
          <p className="typography-h5 mb-6 sm:mb-8 text-gray-200 pl-0 max-w-2xl">
            {slides[currentSlide].description}
          </p>
        </div>
      </div>

      {/* Animated Background Integration with Theme Adaptation - Only render on client */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
            <ambientLight intensity={isDark ? 0.5 : 1} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
              speed={1}
            />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
          </Canvas>
        </div>
      )}

      {/* Controls - Centered on all devices */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-2 md:space-x-4">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 touch-manipulation"
          aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
        >
          {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5" />}
        </button>
        <button
          onClick={prevSlide}
          className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 touch-manipulation"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="p-2 sm:p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-colors duration-200 touch-manipulation"
          aria-label="Next slide"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      {/* Waves at Bottom */}
      <WaveHero />
    </section>
  );
};

export default HeroAtandra;
