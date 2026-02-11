import React, { useState, useEffect, useRef } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import SeoHead from '@/seo/SeoHead';

// Type definitions
interface EventImage {
  url: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  images: EventImage[];
  category: string;
}

/**
 * Events Page Component - Completely rebuilt for stability
 */
const EventsPage: React.FC = () => {
  // State for gallery modal
  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Carousel images - group photos from each event
  const carouselImages = [
    { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.59 PM.jpeg" }, // Group photo from Elecrama
    { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.02 PM.jpeg" }, // Group photo from EPS expo
    { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.18 PM.jpeg" }, // Group photo from IMS Expo
    { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.00 PM.jpeg" }, // Group photo from IMTOF
    { url: "/DUM Expo/WhatsApp Image 2025-04-18 at 5.53.57 PM.jpeg" }, // Group photo from DUM Expo
    { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.52 PM.jpeg" }, // Group photo from Toplast
    { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.49 PM.jpeg" }, // Group photo from Renewable energy
    { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.56 PM.jpeg" } // Group photo from Printexpo
  ];

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Carousel navigation
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Sample events data
  const events: Event[] = [
    {
      id: 1,
      title: "Elecrama",
      description: "A showcase of the latest innovations in electrical equipment and technology, bringing together industry leaders and innovators.",
      images: [
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.34 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.36 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.37 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.38 PM (1).jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.38 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.39 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.40 PM (1).jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.40 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.41 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.42 PM (1).jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.42 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.43 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.44 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.45 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.46 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.47 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.48 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.49 PM.jpeg" },
        { url: "/Elecrama/WhatsApp Image 2025-04-05 at 2.29.50 PM.jpeg" }
      ],
      category: "Elecrama"
    },
    {
      id: 2,
      title: "EPS Expo",
      description: "Showcasing the latest developments in energy power systems with industry-leading innovations and technologies.",
      images: [
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.55 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.56 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.57 PM (1).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.57 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.58 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.59 PM (1).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.16.59 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.00 PM (1).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.00 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.01 PM (1).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.01 PM.jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.02 PM (1).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.02 PM (2).jpeg" },
        { url: "/EPS expo/WhatsApp Image 2025-04-18 at 5.17.02 PM.jpeg" }
      ],
      category: "EPS Expo"
    },
    {
      id: 3,
      title: "IMS expo",
      description: "Showcasing innovative measurement solutions and instrumentation technology for various industries and applications.",
      images: [
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.13 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.14 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.15 PM (1).jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.15 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.16 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.17 PM (1).jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.17 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.18 PM (1).jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.18 PM (2).jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.18 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.19 PM (1).jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.19 PM.jpeg" },
        { url: "/IMS Expo/WhatsApp Image 2025-04-18 at 5.50.20 PM.jpeg" }
      ],
      category: "IMS Expo"
    },
    {
      id: 4,
      title: "IMTOF",
      description: "A premier trade fair for industrial measurement technology, offering insights into the latest innovations for precision measurement.",
      images: [
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.47 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.47 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.48 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.49 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.49 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.50 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.50 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.51 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.51 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.52 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.52 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.53 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.53 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.54 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.54 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.55 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.56 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.56 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.56 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.57 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.58 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.59 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.28.59 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.00 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.00 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.01 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.01 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.02 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.03 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.03 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.03 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.04 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.04 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.05 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.05 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.06 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.06 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.07 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.07 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.08 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.08 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.09 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.09 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.10 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.10 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.10 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.12 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.12 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.13 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.13 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.14 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.14 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.14 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.16 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.17 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.17 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.17 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.19 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.22 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.23 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.23 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.23 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.24 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.24 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.24 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.25 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.25 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.26 PM (1).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.26 PM (2).jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.26 PM.jpeg" },
        { url: "/IMTOF/WhatsApp Image 2025-04-18 at 5.29.27 PM.jpeg" }
      ],
      category: "IMTOF"
    },
    {
      id: 5,
      title: "DUM Expo",
      description: "Visitors witnessing cutting-edge Power Conditioning,T&M,Energy Managemenet,and industry 4.0 Solutions at DUM Expo Exhibition.",
      images: [
        { url: "/DUM Expo/WhatsApp Image 2025-04-18 at 5.53.55 PM.jpeg" },
        { url: "/DUM Expo/WhatsApp Image 2025-04-18 at 5.53.56 PM.jpeg" },
        { url: "/DUM Expo/WhatsApp Image 2025-04-18 at 5.53.57 PM (1).jpeg" },
        { url: "/DUM Expo/WhatsApp Image 2025-04-18 at 5.53.57 PM.jpeg" }
      ],
      category: "DUM Expo"
    },
    {
      id: 6,
      title: "Toplast",
      description: "A showcase of the latest innovations in electrical equipment and technology, bringing together industry leaders and innovators.",
      images: [
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.30 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.32 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.35 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.36 PM (1).jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.36 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.39 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.41 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.43 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.46 PM (1).jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.46 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.48 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.49 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.50 PM (1).jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.50 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.51 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.52 PM (1).jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.52 PM.jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.53 PM (1).jpeg" },
        { url: "/Toplast/WhatsApp Image 2025-04-18 at 5.46.53 PM.jpeg" }
      ],
      category: "showcase"
    },
    {
      id: 7,
      title: "Renewable Energy Summit",
      description: "Exploring sustainable energy solutions and green technologies for a better future with industry experts and thought leaders.",
      images: [
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.21.00 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.35 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.36 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.36 PM (2).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.36 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.37 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.59 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.59 PM (2).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.22.59 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.00 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.00 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.01 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.01 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.02 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.02 PM (2).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.02 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.03 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.48 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.48 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.49 PM (1).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.49 PM (2).jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.49 PM.jpeg" },
        { url: "/Renewable energy/WhatsApp Image 2025-04-18 at 5.23.50 PM.jpeg" }
      ],
      category: "education"
    },
    {
      id: 8,
      title: "PrintExpo Conference",
      description: "The premier event for printing technology innovations, featuring demonstrations of cutting-edge equipment and networking opportunities.",
      images: [
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.42 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.44 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.48 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.51 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.51 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.52 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.53 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.53 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.54 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.54 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.55 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.55 PM (2).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.55 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.56 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.56 PM (2).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.56 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.57 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.57 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.58 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.58 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.59 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.59 PM (2).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.14.59 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.00 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.00 PM (2).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.00 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.01 PM (1).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.01 PM (2).jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.01 PM.jpeg" },
        { url: "/Printexpo/WhatsApp Image 2025-04-05 at 1.15.02 PM.jpeg" }
      ],
      category: "promotion"
    },
    {
      id: 9,
      title: "Engimach Expo",
      description: "Showcasing advanced power conditioning and energy management solutions designed to support Industry 4.0 and smart manufacturing initiatives, featuring cutting-edge technologies for optimized industrial operations.",
      images: [
        { url: "/Engimach expo/engimach-expo1.jpeg" },
        { url: "/Engimach expo/engimach-expo2.jpeg" },
        { url: "/Engimach expo/engimach-expo3.jpeg" },
        { url: "/Engimach expo/engimach-expo4.jpeg" },
        { url: "/Engimach expo/engimach-expo5.jpeg" },
        { url: "/Engimach expo/engimach-expo6.jpeg" },
        { url: "/Engimach expo/engimach-expo7.jpeg" },
        { url: "/Engimach expo/engimach-expo8.jpeg" },
        { url: "/Engimach expo/engimach-expo9.jpeg" },
        { url: "/Engimach expo/engimach-expo10.jpeg" },
        { url: "/Engimach expo/engimach-expo11.jpeg" },
        { url: "/Engimach expo/engimach-expo12.jpeg" },
        { url: "/Engimach expo/engimach-expo13.jpeg" },
        { url: "/Engimach expo/engimach-expo14.jpeg" },
        { url: "/Engimach expo/engimach-expo15.jpeg" },
        { url: "/Engimach expo/engimach-expo16.jpeg" },
        { url: "/Engimach expo/engimach-expo17.jpeg" },
        { url: "/Engimach expo/engimach-expo18.jpeg" },
        { url: "/Engimach expo/engimach-expo19.jpeg" },
        { url: "/Engimach expo/engimach-expo20.jpeg" },
        { url: "/Engimach expo/engimach-expo21.jpeg" },
        { url: "/Engimach expo/engimach-expo22.jpeg" },
        { url: "/Engimach expo/engimach-expo23.jpeg" },
        { url: "/Engimach expo/engimach-expo24.jpeg" },
        { url: "/Engimach expo/engimach-expo25.jpeg" },
        { url: "/Engimach expo/engimach-expo26.jpeg" },
        { url: "/Engimach expo/engimach-expo27.jpeg" },
        { url: "/Engimach expo/engimach-expo28.jpeg" },
        { url: "/Engimach expo/engimach-expo29.jpeg" },
        { url: "/Engimach expo/engimach-expo30.jpeg" },
        { url: "/Engimach expo/engimach-expo31.jpeg" },
        { url: "/Engimach expo/engimach-expo32.jpeg" },
        { url: "/Engimach expo/engimach-expo33.jpeg" },
        { url: "/Engimach expo/engimach-expo34.jpeg" },
        { url: "/Engimach expo/engimach-expo35.jpeg" },
        { url: "/Engimach expo/engimach-expo36.jpeg" },
        { url: "/Engimach expo/engimach-expo37.jpeg" },
        { url: "/Engimach expo/engimach-expo38.jpeg" },
        { url: "/Engimach expo/engimach-expo39.jpeg" },
      ],
      category: "showcase"
    }




  ];

  // Gallery handlers
  const handleOpenGallery = (eventId: number) => {
    setActiveEventId(eventId);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto'; // Restore scrolling
  };

  // Find the active event
  const activeEvent = events.find(event => event.id === activeEventId);

  // Gallery navigation
  const nextImage = () => {
    if (!activeEvent) return;
    setCurrentImageIndex((prev) =>
      prev === activeEvent.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!activeEvent) return;
    setCurrentImageIndex((prev) =>
      prev === 0 ? activeEvent.images.length - 1 : prev - 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  // Handle key presses for gallery navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;

      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') handleCloseGallery();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGalleryOpen]);

  // Event card component with Open Sans font matching powerquality.tsx styling
  const EventCard = ({ event }: { event: Event }) => {
    return (
      <div className="flex flex-col md:flex-row group w-full gap-2 sm:gap-3 md:gap-4 lg:gap-6 font-['Open_Sans']">
        {/* Event image */}
        <div className="w-full md:w-64 lg:w-72 xl:w-80 h-32 sm:h-40 md:h-48 lg:h-56 flex-shrink-0 rounded-lg overflow-hidden relative shadow-lg group-hover:shadow-xl transition-all duration-300">
          <img
            src={event.images[0].url}
            alt={`${event.title} event image`}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            width={320}
            height={240}
          />
        </div>

        {/* Event details */}
        <div className="p-2 sm:p-3 md:p-4 lg:p-6 flex-grow flex flex-col md:pl-6 lg:pl-8 justify-center w-full">
          <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 lg:mb-6 text-gray-900 leading-tight font-['Open_Sans']">
            {event.title}
          </h3>

          <p className="text-gray-700 mb-3 sm:mb-4 md:mb-5 lg:mb-6 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-justify font-['Open_Sans'] font-medium">
            {event.description}
          </p>

          <div>
            <button
              onClick={() => handleOpenGallery(event.id)}
              className="px-3 py-2 text-sm sm:px-4 sm:py-2 sm:text-base md:px-5 md:py-3 md:text-lg lg:px-6 lg:py-3 lg:text-lg rounded-lg transition-all duration-300 font-semibold shadow-md hover:shadow-lg transform hover:scale-105 w-full sm:w-auto bg-black text-white hover:bg-gray-900 font-['Open_Sans']"
            >
              VIEW GALLERY
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Gallery modal component with Open Sans font matching powerquality.tsx styling
  const GalleryModal = () => {
    if (!activeEvent || !isGalleryOpen) return null;

    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-1 sm:p-2 md:p-3 font-['Open_Sans']" style={{ paddingTop: '100px' }}>
        {/* Backdrop overlay */}
        <div
          className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm"
          onClick={handleCloseGallery}
        ></div>

        {/* Modal content with proper spacing from navigation */}
        <div className="relative bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 w-full max-w-[98vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[85vh] sm:max-h-[88vh] overflow-hidden flex flex-col mt-4 sm:mt-6 md:mt-8">
          {/* Close button */}
          <button
            className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3 text-white bg-black hover:bg-gray-900 p-1 rounded-full hover:bg-gray-800 transition-all duration-200 z-10"
            onClick={handleCloseGallery}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Title */}
          <div className="mb-1 sm:mb-2 md:mb-3 border-b border-gray-200 pb-1 sm:pb-2 md:pb-3">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 leading-tight font-['Open_Sans']">
              {activeEvent.title} - Gallery
            </h3>
          </div>

          {/* Enhanced Gallery content for better image visibility with navigation spacing */}
          <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] overflow-y-auto">
            <div className="flex flex-col items-center w-full">
              {/* Enhanced Main image for full visibility */}
              <div className="relative mb-2 sm:mb-3 md:mb-4 w-full max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
                <img
                  src={activeEvent.images[currentImageIndex].url}
                  alt={`${activeEvent.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg shadow-md max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] lg:max-h-[45vh] bg-gray-50"
                  loading="lazy"
                  decoding="async"     // ✅ ADD
                  width={1920}         // ✅ ADD
                  height={1080}        // ✅ ADD
                />

                {/* Image caption */}
                <div className="mt-1 text-center">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Open_Sans'] font-medium">
                    {activeEvent.title}
                  </p>
                </div>

                {/* Navigation controls */}
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-1 sm:px-2 md:px-3">
                  <button
                    onClick={prevImage}
                    className="bg-black text-white hover:bg-gray-900 p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]"
                    aria-label="Previous image"
                  >
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="bg-black text-white hover:bg-gray-900 p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]"
                    aria-label="Next image"
                  >
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Image counter */}
              <div className="mb-1 sm:mb-2 md:mb-3 text-center">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold text-white shadow-sm font-['Open_Sans']">
                  {currentImageIndex + 1} of {activeEvent.images.length}
                </span>
              </div>

              {/* Compact Thumbnails */}
              <div className="flex justify-center flex-wrap gap-1 sm:gap-1.5 md:gap-2 w-full max-w-full sm:max-w-3xl md:max-w-4xl mx-auto px-1 sm:px-2">
                {activeEvent.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`cursor-pointer transition-all rounded-md overflow-hidden hover:scale-105 ${index === currentImageIndex
                      ? 'ring-2 ring-black shadow-md'
                      : 'ring-1 ring-gray-200 hover:ring-black'
                      }`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img
                      src={image.url}
                      alt={`${activeEvent.title} thumbnail ${index + 1}`}
                      className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <SeoHead
        title="Events & Exhibitions | Atandra Energy"
        description="View Atandra Energy's participation in industry events and exhibitions showcasing power management solutions at Elecrama, EPS Expo and more."
        keywords="Atandra Energy events, trade shows, exhibitions, Elecrama, EPS Expo, power management events, industry events, Krykard exhibitions"
        canonical="https://atandra.in/about/events"
      />
      <PageLayout hideHero={true}>
        {/* Hide Breadcrumbs and Apply Open Sans Font */}
        <style dangerouslySetInnerHTML={{
          __html: `
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }

        /* Apply Open Sans font family consistently */
        * {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }

        /* Ensure proper font weights and sizes */
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 700 !important;
        }

        p, span, div {
          font-family: 'Open Sans', sans-serif !important;
        }

        button {
          font-family: 'Open Sans', sans-serif !important;
          font-weight: 600 !important;
        }
      `}} />

        {/* Simple Clean Title Section */}
        <SectionHeader title="Events" subtitle="Discover our journey through industry events, expos, and summits." />
        {/* Page design with Open Sans font matching powerquality.tsx styling */}
        <div className="relative font-['Open_Sans']">
          {/* Enhanced Title Above Carousel with Better Spacing */}
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center pt-2 sm:pt-3 lg:pt-4">
            <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative leading-tight mb-2 sm:mb-3 lg:mb-4 text-gray-900 font-['Open_Sans']">
              <span className="tracking-wide">Capturing Moments That Matter</span>
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-5 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-center leading-relaxed font-['Open_Sans'] font-medium">
              Discover the highlights from our most impactful gatherings and preview upcoming opportunities to connect.
            </p>
          </div>

          {/* Compact Hero Carousel */}
          <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 relative w-full">
            {/* Smaller background decorative elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-5 sm:-top-8 -left-5 sm:-left-8 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
              <div className="absolute top-1/4 -right-5 sm:-right-8 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-green-500/10 blur-2xl"></div>
              <div className="absolute bottom-0 left-1/4 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 rounded-full bg-yellow-500/10 blur-2xl"></div>
            </div>

            <div className="w-full max-w-none px-0">
              <div className="relative w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[500px] overflow-hidden">
                {/* Full width image with complete visibility and no spacing */}
                <img
                  src={carouselImages[currentSlide].url}
                  alt={`Event carousel image ${currentSlide + 1}`}
                  className="w-full h-full object-contain object-center bg-white"
                  loading={currentSlide === 0 ? "eager" : "lazy"}   // ✅ ADD
                  decoding="async"                                 // ✅ ADD
                  width={1920}                                     // ✅ ADD
                  height={1080}                                    // ✅ ADD
                  style={{ maxWidth: '100vw', maxHeight: '100%' }}

                />

                {/* Navigation buttons at edges - No spacing */}
                <button
                  onClick={prevSlide}
                  className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md p-1 xs:p-1.5 sm:p-1.5 md:p-2 rounded-full hover:bg-gray-900 z-10 transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] xs:min-w-[26px] xs:min-h-[26px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]"
                  aria-label="Previous slide"
                >
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md p-1 xs:p-1.5 sm:p-1.5 md:p-2 rounded-full hover:bg-gray-900 z-10 transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] xs:min-w-[26px] xs:min-h-[26px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]"
                  aria-label="Next slide"
                >
                  <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>

              {/* Compact indicators */}
              <div className="hidden sm:flex justify-center mt-2 sm:mt-3 md:mt-4">
                <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-1.5 md:space-x-2 bg-white px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-md">
                  {carouselImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide
                        ? 'bg-black'
                        : 'bg-gray-200 hover:bg-gray-400'
                        }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Page Header */}
          <div className="w-full max-w-none px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="text-center w-full max-w-none sm:max-w-3xl md:max-w-4xl mx-auto">
              <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 relative leading-tight font-['Open_Sans']">
                  Latest Events
                </h2>
              </div>
              <p className="text-gray-700 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center font-['Open_Sans'] font-medium">
                Explore our past and upcoming events designed to connect, inspire, and transform your professional journey.
              </p>
            </div>
          </div>

          {/* Events List */}
          <div className="w-full max-w-none px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 mb-10 md:mb-16 lg:mb-24">
            <div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7 md:space-y-9 lg:space-y-12">
              {events.map((event) => (
                <div key={event.id} className="w-full max-w-full xs:max-w-2xl sm:max-w-5xl md:max-w-6xl mx-auto">
                  <EventCard event={event} />
                </div>
              ))}
            </div>
          </div>

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          <section className="py-4 md:py-6 bg-white mt-10 md:mt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <style>{`
                .seo-details-events summary {
                  list-style: none;
                }
                .seo-details-events summary::-webkit-details-marker {
                  display: none;
                }
              `}</style>

              <div className="flex justify-center">
                <details className="seo-details-events group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>

                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                        Atandra Energy's Industry Presence and Event Participation
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Atandra Energy (KRYKARD) actively participates in premier industry events, trade shows, and exhibitions across India, showcasing our comprehensive range of power management solutions, measurement equipment, and energy conservation technologies. Our event participation includes major exhibitions like Elecrama, EPS Expo, IMS Expo, IMTOF, DUM Expo, Toplast, Renewable Energy Summit, and PrintExpo Conference, where we demonstrate our latest innovations in servo stabilizers, UPS systems, power quality analyzers, thermal imagers, digital multimeters, and smart energy management systems. These events provide valuable opportunities to connect with industry professionals, understand market trends, showcase product capabilities, and build lasting relationships with customers, partners, and stakeholders.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Showcasing Innovation and Industry Leadership
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        At industry events, Atandra Energy showcases cutting-edge technologies that address critical power management challenges faced by businesses across manufacturing, IT, healthcare, commercial, and industrial sectors. Our exhibition booths feature live demonstrations of servo voltage stabilizers, static voltage stabilizers, UPS systems, power quality analyzers, thermal imaging cameras, and energy management solutions, allowing visitors to experience firsthand the performance, reliability, and advanced features of our products. Our technical experts provide detailed consultations, technical specifications, application guidance, and customized solutions based on visitors' specific requirements, helping them identify the most suitable power management technologies for their operations.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Building Relationships and Industry Connections
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Our participation in industry events enables us to build strong relationships with customers, distributors, partners, and industry professionals while staying abreast of emerging trends, technological advancements, and market opportunities. Through networking sessions, technical presentations, product launches, and interactive demonstrations, we engage with decision-makers, engineers, facility managers, and business owners who are seeking reliable power management solutions. These events also provide platforms for knowledge sharing, thought leadership, and collaboration with industry associations, research institutions, and technology partners, contributing to the overall growth and development of India's power management sector.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Commitment to Industry Excellence and Customer Engagement
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Atandra Energy's consistent presence at major industry events reflects our commitment to industry excellence, customer engagement, and continuous innovation in power management solutions. Our event participation allows us to gather valuable customer feedback, understand evolving market needs, showcase our 40+ years of industry expertise, and demonstrate our nationwide service network capabilities. Whether you're attending Elecrama, EPS Expo, IMS Expo, or other industry gatherings, visit our exhibition booths to explore our comprehensive product range, meet our technical experts, and discover how Atandra Energy can help you achieve reliable power management, energy efficiency, and operational excellence for your business.
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>

        {/* Gallery Modal */}
        <GalleryModal />
      </PageLayout>
    </>
  );
};

export default EventsPage;
