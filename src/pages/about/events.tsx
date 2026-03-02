import React, { useState, useEffect } from 'react';
import PageLayout from '@/components/layout/PageLayout';
import SectionHeader from '@/components/SectionHeader';
import SeoHead from '@/seo/SeoHead';
import { motion } from 'framer-motion';

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

interface PageData {
  hero_badge_text: string;
  intro_title: string;
  intro_description: string;
  latest_events_title?: string;
  latest_events_description?: string;
}

// Static fallback when WP data unavailable
const FALLBACK_PAGE_DATA: PageData = {
  hero_badge_text: 'Events',
  intro_title: 'Capturing Moments That Matter',
  intro_description: 'Discover the highlights from our most impactful gatherings and preview upcoming opportunities to connect.',
  latest_events_title: 'Latest Events',
  latest_events_description: 'Explore our past and upcoming events designed to connect, inspire, and transform your professional journey.',
};

const EventsPage: React.FC<{ data?: any }> = ({ data: initialData }) => {
  // Use SSR data when slug matches; otherwise null (will client-fetch)
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'events') {
      return initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  // State for gallery modal
  const [activeEventId, setActiveEventId] = useState<number | null>(null);
  const [isGalleryOpen, setIsGalleryOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // State for carousel
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  // Client-side fallback fetch
  useEffect(() => {
    if (wpData) return;

    const fetchData = async () => {
      try {
        const API_BASE = 'https://cms.atandra.in';

        const [pageResponse, eventsResponse] = await Promise.all([
          fetch(`${API_BASE}/wp-json/wp/v2/pages?slug=events&acf_format=standard`),
          fetch(`${API_BASE}/wp-json/wp/v2/events?per_page=100&acf_format=standard`),
        ]);

        const pageJson = await pageResponse.json();
        const eventsJson = await eventsResponse.json();

        const page = Array.isArray(pageJson) && pageJson.length > 0 ? pageJson[0] : null;
        const acf = page?.acf || {};

        const mappedEvents: Event[] = Array.isArray(eventsJson)
          ? eventsJson
              .map((item: any) => ({
                id: item.id,
                title: item.title?.rendered || '',
                description: item.acf?.event_description || '',
                images: Array.isArray(item.acf?.event_gallery)
                  ? item.acf.event_gallery.map((img: any) => ({ url: img.url || img.guid }))
                  : [],
                category: item.slug,
              }))
              .filter((e: Event) => e.images.length > 0)
          : [];

        setWpData({
          slug: 'events',
          acf,
          events: mappedEvents,
        });
      } catch (error) {
        console.error('Error fetching events data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [wpData]);

  // Derived data from wpData
  const pageData: PageData = wpData?.acf
    ? {
        hero_badge_text: wpData.acf.hero_badge_text || FALLBACK_PAGE_DATA.hero_badge_text,
        intro_title: wpData.acf.intro_title || FALLBACK_PAGE_DATA.intro_title,
        intro_description: wpData.acf.intro_description || FALLBACK_PAGE_DATA.intro_description,
        latest_events_title: wpData.acf.latest_events_title || FALLBACK_PAGE_DATA.latest_events_title,
        latest_events_description: wpData.acf.latest_events_description || FALLBACK_PAGE_DATA.latest_events_description,
      }
    : FALLBACK_PAGE_DATA;

  const events: Event[] = wpData?.events || [];
  const carouselImages = events.map((e) => e.images[0]).filter(Boolean);

  // Auto-advance carousel
  useEffect(() => {
    if (carouselImages.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length);
  };
  const prevSlide = () => {
    if (carouselImages.length === 0) return;
    setCurrentSlide((prev) => (prev === 0 ? carouselImages.length - 1 : prev - 1));
  };

  // Gallery handlers
  const handleOpenGallery = (eventId: number) => {
    setActiveEventId(eventId);
    setCurrentImageIndex(0);
    setIsGalleryOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseGallery = () => {
    setIsGalleryOpen(false);
    document.body.style.overflow = 'auto';
  };

  const activeEvent = events.find((e) => e.id === activeEventId);

  const nextImage = () => {
    if (!activeEvent) return;
    setCurrentImageIndex((prev) => (prev === activeEvent.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    if (!activeEvent) return;
    setCurrentImageIndex((prev) => (prev === 0 ? activeEvent.images.length - 1 : prev - 1));
  };

  const goToImage = (index: number) => setCurrentImageIndex(index);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isGalleryOpen) return;
      if (e.key === 'ArrowRight') nextImage();
      else if (e.key === 'ArrowLeft') prevImage();
      else if (e.key === 'Escape') handleCloseGallery();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isGalleryOpen]);

  // Event card component
  const EventCard = ({ event }: { event: Event }) => (
    <div className="flex flex-col md:flex-row group w-full gap-2 sm:gap-3 md:gap-4 lg:gap-6 font-['Open_Sans']">
      <div className="w-full md:w-64 lg:w-72 xl:w-80 h-32 sm:h-40 md:h-48 lg:h-56 flex-shrink-0 rounded-lg overflow-hidden relative shadow-lg group-hover:shadow-xl transition-all duration-300">
        <img
          src={event.images[0]?.url || '/placeholder-image.jpg'}
          alt={`${event.title} event image`}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          width={320}
          height={240}
        />
      </div>
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

  // Gallery modal component
  const GalleryModal = () => {
    if (!activeEvent || !isGalleryOpen) return null;
    return (
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-1 sm:p-2 md:p-3 font-['Open_Sans']" style={{ paddingTop: '100px' }}>
        <div className="absolute inset-0 bg-black bg-opacity-70 backdrop-blur-sm" onClick={handleCloseGallery} />
        <div className="relative bg-white rounded-lg p-2 sm:p-3 md:p-4 lg:p-6 w-full max-w-[98vw] sm:max-w-4xl md:max-w-5xl lg:max-w-6xl max-h-[85vh] sm:max-h-[88vh] overflow-hidden flex flex-col mt-4 sm:mt-6 md:mt-8">
          <button
            className="absolute top-1 right-1 sm:top-2 sm:right-2 md:top-3 md:right-3 text-white bg-black hover:bg-gray-900 p-1 rounded-full hover:bg-gray-800 transition-all duration-200 z-10"
            onClick={handleCloseGallery}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="mb-1 sm:mb-2 md:mb-3 border-b border-gray-200 pb-1 sm:pb-2 md:pb-3">
            <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 leading-tight font-['Open_Sans']">
              {activeEvent.title} - Gallery
            </h3>
          </div>
          <div className="w-full h-[50vh] sm:h-[55vh] md:h-[60vh] lg:h-[65vh] overflow-y-auto">
            <div className="flex flex-col items-center w-full">
              <div className="relative mb-2 sm:mb-3 md:mb-4 w-full max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-6xl mx-auto">
                <img
                  src={activeEvent.images[currentImageIndex]?.url}
                  alt={`${activeEvent.title} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-contain rounded-lg shadow-md max-h-[30vh] sm:max-h-[35vh] md:max-h-[40vh] lg:max-h-[45vh] bg-gray-50"
                  loading="lazy"
                  decoding="async"
                  width={1920}
                  height={1080}
                />
                <div className="mt-1 text-center">
                  <p className="text-gray-700 text-sm sm:text-base md:text-lg font-['Open_Sans'] font-medium">{activeEvent.title}</p>
                </div>
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between px-1 sm:px-2 md:px-3">
                  <button onClick={prevImage} className="bg-black text-white hover:bg-gray-900 p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]" aria-label="Previous image">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <button onClick={nextImage} className="bg-black text-white hover:bg-gray-900 p-1 sm:p-1.5 md:p-2 rounded-full shadow-md transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]" aria-label="Next image">
                    <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>
              </div>
              <div className="mb-1 sm:mb-2 md:mb-3 text-center">
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-500 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-sm sm:text-base font-semibold text-white shadow-sm font-['Open_Sans']">
                  {currentImageIndex + 1} of {activeEvent.images.length}
                </span>
              </div>
              <div className="flex justify-center flex-wrap gap-1 sm:gap-1.5 md:gap-2 w-full max-w-full sm:max-w-3xl md:max-w-4xl mx-auto px-1 sm:px-2">
                {activeEvent.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => goToImage(index)}
                    className={`cursor-pointer transition-all rounded-md overflow-hidden hover:scale-105 ${index === currentImageIndex ? 'ring-2 ring-black shadow-md' : 'ring-1 ring-gray-200 hover:ring-black'}`}
                    aria-label={`View image ${index + 1}`}
                  >
                    <img src={image.url} alt={`${activeEvent.title} thumbnail ${index + 1}`} className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const seoTitle = wpData?.acf?.seo_title || 'Events & Exhibitions | Atandra Energy';
  const seoDescription = wpData?.acf?.seo_description || "View Atandra Energy's participation in industry events, trade shows, and exhibitions showcasing our power management solutions and innovations.";

  if (isLoading) {
    return (
      <>
        <SeoHead title={seoTitle} description={seoDescription} keywords="Atandra Energy events, trade shows, exhibitions, Elecrama, EPS Expo, power management events, industry events, Krykard exhibitions" canonical="https://atandra.in/about/events" />
        <PageLayout hideHero={true} hideBreadcrumbs={true}>
          <style>{`nav.mb-10 { display: none !important; } .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }`}</style>
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }} className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full" />
          </div>
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead title={seoTitle} description={seoDescription} keywords="Atandra Energy events, trade shows, exhibitions, Elecrama, EPS Expo, power management events, industry events, Krykard exhibitions" canonical="https://atandra.in/about/events" />
      <PageLayout hideHero={true}>
        <style dangerouslySetInnerHTML={{ __html: `
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
        * { font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important; }
        h1, h2, h3, h4, h5, h6 { font-family: 'Open Sans', sans-serif !important; font-weight: 700 !important; }
        p, span, div { font-family: 'Open Sans', sans-serif !important; }
        button { font-family: 'Open Sans', sans-serif !important; font-weight: 600 !important; }
      `}} />

        <SectionHeader title={pageData.hero_badge_text} subtitle="Discover our journey through industry events, expos, and summits." />
        <div className="relative font-['Open_Sans']">
          <div className="w-full max-w-none px-4 sm:px-6 lg:px-8 mb-4 sm:mb-6 md:mb-8 lg:mb-10 text-center pt-2 sm:pt-3 lg:pt-4">
            <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold relative leading-tight mb-2 sm:mb-3 lg:mb-4 text-gray-900 font-['Open_Sans']">
              <span className="tracking-wide">{pageData.intro_title}</span>
            </h2>
            <p className="mt-3 sm:mt-4 md:mt-5 text-gray-700 text-base sm:text-lg md:text-xl lg:text-2xl max-w-full sm:max-w-3xl md:max-w-4xl lg:max-w-5xl mx-auto text-center leading-relaxed font-['Open_Sans'] font-medium">
              {pageData.intro_description}
            </p>
          </div>

          {carouselImages.length > 0 && (
            <div className="mb-4 sm:mb-6 md:mb-8 lg:mb-10 relative w-full">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-5 sm:-top-8 -left-5 sm:-left-8 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 rounded-full bg-blue-500/10 blur-2xl"></div>
                <div className="absolute top-1/4 -right-5 sm:-right-8 w-24 h-24 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full bg-green-500/10 blur-2xl"></div>
                <div className="absolute bottom-0 left-1/4 w-20 h-20 sm:w-30 sm:h-30 md:w-40 md:h-40 rounded-full bg-yellow-500/10 blur-2xl"></div>
              </div>
              <div className="w-full max-w-none px-0">
                <div className="relative w-full h-[180px] xs:h-[220px] sm:h-[300px] md:h-[350px] lg:h-[450px] xl:h-[500px] overflow-hidden">
                  <img
                    src={carouselImages[currentSlide]?.url}
                    alt={`Event carousel image ${currentSlide + 1}`}
                    className="w-full h-full object-contain object-center bg-white"
                    loading={currentSlide === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    width={1920}
                    height={1080}
                    style={{ maxWidth: '100vw', maxHeight: '100%' }}
                  />
                  <button onClick={prevSlide} className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md p-1 xs:p-1.5 sm:p-1.5 md:p-2 rounded-full hover:bg-gray-900 z-10 transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] xs:min-w-[26px] xs:min-h-[26px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]" aria-label="Previous slide">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <button onClick={nextSlide} className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-black text-white shadow-md p-1 xs:p-1.5 sm:p-1.5 md:p-2 rounded-full hover:bg-gray-900 z-10 transition-all duration-300 hover:scale-110 min-w-[24px] min-h-[24px] xs:min-w-[26px] xs:min-h-[26px] sm:min-w-[28px] sm:min-h-[28px] md:min-w-[32px] md:min-h-[32px]" aria-label="Next slide">
                    <svg className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                </div>
                <div className="hidden sm:flex justify-center mt-2 sm:mt-3 md:mt-4">
                  <div className="flex items-center space-x-1 xs:space-x-1.5 sm:space-x-1.5 md:space-x-2 bg-white px-2 xs:px-2.5 sm:px-3 md:px-4 py-1 xs:py-1.5 sm:py-2 md:py-2.5 rounded-full shadow-md">
                    {carouselImages.map((_, index) => (
                      <button key={index} onClick={() => goToSlide(index)} className={`w-1.5 h-1.5 xs:w-2 xs:h-2 sm:w-2 sm:h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-black' : 'bg-gray-200 hover:bg-gray-400'}`} aria-label={`Go to slide ${index + 1}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="w-full max-w-none px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 mb-3 xs:mb-4 sm:mb-6 md:mb-8 lg:mb-10">
            <div className="text-center w-full max-w-none sm:max-w-3xl md:max-w-4xl mx-auto">
              <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 mb-2 relative leading-tight font-['Open_Sans']">
                  {pageData.latest_events_title}
                </h2>
              </div>
              <p className="text-gray-700 text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-center font-['Open_Sans'] font-medium">
                {pageData.latest_events_description}
              </p>
            </div>
          </div>

          <div className="w-full max-w-none px-1 xs:px-2 sm:px-3 md:px-4 lg:px-6 mb-10 md:mb-16 lg:mb-24">
            {events.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-xl text-gray-500">No events found.</p>
              </div>
            ) : (
              <div className="flex flex-col space-y-4 xs:space-y-5 sm:space-y-7 md:space-y-9 lg:space-y-12">
                {events.map((event) => (
                  <div key={event.id} className="w-full max-w-full xs:max-w-2xl sm:max-w-5xl md:max-w-6xl mx-auto">
                    <EventCard event={event} />
                  </div>
                ))}
              </div>
            )}
          </div>

          <section className="py-4 md:py-6 bg-white mt-10 md:mt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <style>{`.seo-details-events summary { list-style: none; } .seo-details-events summary::-webkit-details-marker { display: none; }`}</style>
              <div className="flex justify-center">
                <details className="seo-details-events group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>
                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">Atandra Energy's Industry Presence and Event Participation</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Atandra Energy (KRYKARD) actively participates in premier industry events, trade shows, and exhibitions across India, showcasing our comprehensive range of power management solutions, measurement equipment, and energy conservation technologies.
                      </p>
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">Showcasing Innovation and Industry Leadership</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        At industry events, Atandra Energy showcases cutting-edge technologies that address critical power management challenges faced by businesses across manufacturing, IT, healthcare, commercial, and industrial sectors.
                      </p>
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">Building Relationships and Industry Connections</h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Our participation in industry events enables us to build strong relationships with customers, distributors, partners, and industry professionals.
                      </p>
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">Commitment to Industry Excellence and Customer Engagement</h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Atandra Energy's consistent presence at major industry events reflects our commitment to industry excellence, customer engagement, and continuous innovation in power management solutions.
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>
        </div>

        <GalleryModal />
      </PageLayout>
    </>
  );
};

export default EventsPage;
