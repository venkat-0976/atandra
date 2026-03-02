import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SectionHeader from '@/components/SectionHeader';
import SeoHead from '@/seo/SeoHead';

// Static fallback certificates when WP data is unavailable
const FALLBACK_CERTIFICATES = [
  { id: 1, title: "ISO 9001:2015", subtitle: "Quality Management System", label: "CERTIFICATE 1", imageUrl: "/Certificates/ISO Certificate 9001-2015.png" },
  { id: 2, title: "ISO 14001:2015", subtitle: "Environmental Management System", label: "CERTIFICATE 2", imageUrl: "/Certificates/ISO Certificate 14001-2015 .png" },
  { id: 3, title: "ISO 45001:2018", subtitle: "Occupational Health and Safety", label: "CERTIFICATE 3", imageUrl: "/Certificates/ISO Certificate 45001-2018 .png" },
  { id: 4, title: "CE Certificate", subtitle: "Atandra Energy Pvt. Ltd.", label: "CERTIFICATE 4", imageUrl: "/Certificates/CE Certificate_Atandra Energy.png" },
  { id: 5, title: "EPR Certificate", subtitle: "E-Waste Management", label: "CERTIFICATE 5", imageUrl: "/Certificates/EPR Certificate - E Waste.png" },
  { id: 6, title: "BIS Certification", subtitle: "Bureau of Indian Standards", label: "CERTIFICATE 6", imageUrl: "/Certificates/BIS Certificate.png" }
];

// Static commitment points (not editable via WP per requirement)
const COMMITMENT_POINTS = [
  { icon: "🏆", title: "Quality Assurance", description: "Consistent delivery of high-quality products meeting customer expectations through rigorous testing and continuous improvement processes.", color: "from-blue-500 to-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  { icon: "🌱", title: "Environmental Care", description: "Commitment to minimizing environmental impact through sustainable practices, waste reduction, and eco-friendly manufacturing processes.", color: "from-green-500 to-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
  { icon: "🛡️", title: "Safety Standards", description: "Maintaining highest levels of workplace safety and health protection through comprehensive safety protocols and regular training programs.", color: "from-red-500 to-red-600", bgColor: "bg-red-50", borderColor: "border-red-200" },
  { icon: "🌍", title: "Global Compliance", description: "Meeting diverse regulatory requirements across international markets while maintaining consistency in quality and service delivery.", color: "from-purple-500 to-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
  { icon: "⚡", title: "Innovation Excellence", description: "Driving technological advancement in renewable energy solutions through continuous research and development initiatives.", color: "from-orange-500 to-orange-600", bgColor: "bg-orange-50", borderColor: "border-orange-200" },
  { icon: "🤝", title: "Customer Satisfaction", description: "Building long-term partnerships through exceptional service, reliable products, and responsive customer support across all touchpoints.", color: "from-teal-500 to-teal-600", bgColor: "bg-teal-50", borderColor: "border-teal-200" }
];

const Certificates = ({ data: initialData }: { data?: any }) => {
  // Use SSR data when slug matches; otherwise null (will client-fetch)
  const [wpData, setWpData] = useState<any>(() => {
    if (initialData?.slug === 'certificates') {
      return initialData.acf || initialData;
    }
    return null;
  });
  const [isLoading, setIsLoading] = useState(!wpData);

  useEffect(() => {
    if (wpData) return;

    const fetchWpData = async () => {
      try {
        const response = await fetch('https://cms.atandra.in/wp-json/wp/v2/pages?slug=certificates');
        if (!response.ok) throw new Error('Response not ok');
        const data = await response.json();
        if (data && data.length > 0) {
          setWpData(data[0].acf || data[0]);
        }
      } catch (error) {
        console.error('Error fetching WordPress data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWpData();
  }, [wpData]);

  // Process certificates from WP ACF (certificate_1 through certificate_12)
  const getCertificates = () => {
    if (!wpData) return FALLBACK_CERTIFICATES;

    const certs: Array<{ id: number; title: string; subtitle: string; label: string; imageUrl: string }> = [];
    for (let i = 1; i <= 12; i++) {
      const fieldName = `certificate_${i}`;
      const certData = wpData[fieldName];

      if (certData && (certData.title || certData.image)) {
        const imageUrl = typeof certData.image === 'string'
          ? certData.image
          : (certData.image?.url || "");

        certs.push({
          id: i,
          title: certData.title || "",
          subtitle: certData.description || "",
          label: certData.label || `CERTIFICATE ${i}`,
          imageUrl: imageUrl
        });
      }
    }
    return certs.length > 0 ? certs : FALLBACK_CERTIFICATES;
  };

  const certificates = getCertificates();

  // WP ACF fields with fallbacks
  const pageTitle = wpData?.page_title || "Certifications & Accreditations";
  const pageSubtitle = wpData?.page_subtitle || "Demonstrating Our Commitment to Quality, Safety, and Global Standards";
  const commitmentTitle = wpData?.commitment_title || "Our Commitment to Excellence";
  const commitmentDescription = wpData?.commitment_description || "At Atandra Energy Pvt. Ltd., we maintain the highest standards of quality, safety, and environmental responsibility through internationally recognized certifications. These certifications demonstrate our unwavering commitment to delivering exceptional products and services while ensuring compliance with global standards.";
  const bottomCtaTitle = wpData?.bottom_cta_title || "Certified Excellence Since Our Inception";
  const bottomCtaDescription = wpData?.bottom_cta_description || "Our comprehensive certification portfolio reflects our dedication to maintaining world-class standards in every aspect of our operations, from product development to customer service.";
  const seoTitle = wpData?.seo_title || "Certificates & Quality Standards | Atandra Energy";
  const seoDescription = wpData?.seo_description || "Atandra Energy is ISO 9001:2015, ISO 14001:2015 and ISO 45001:2018 certified, ensuring quality, environmental and safety standards with CE, EPR and BIS";

  if (isLoading) {
    return (
      <>
        <SeoHead
          title={seoTitle}
          description={seoDescription}
          keywords="ISO certification, ISO 9001, ISO 14001, ISO 45001, CE certificate, EPR certificate, BIS certification, quality standards, Atandra Energy certificates"
          canonical="https://atandra.in/about/certificates"
        />
        <PageLayout hideHero={true}>
          <style>{`
            nav.mb-10 { display: none !important; }
            .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
          `}</style>
          <div className="min-h-[60vh] flex items-center justify-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full"
            />
          </div>
        </PageLayout>
      </>
    );
  }

  return (
    <>
      <SeoHead
        title={seoTitle}
        description={seoDescription}
        keywords="ISO certification, ISO 9001, ISO 14001, ISO 45001, CE certificate, EPR certificate, BIS certification, quality standards, Atandra Energy certificates"
        canonical="https://atandra.in/about/certificates"
      />
      <PageLayout hideHero={true}>
        <style>{`
        nav.mb-10 { display: none !important; }
        .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }

        * {
          font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
        }
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
      `}</style>

        <SectionHeader title={pageTitle} subtitle={pageSubtitle} />
        <div className="w-full min-h-screen bg-white px-2 sm:px-4 lg:px-8 py-4 sm:py-6 font-['Open_Sans']">
          {/* Header Section */}
          <div className="w-full text-center mb-8 sm:mb-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 font-['Open_Sans']">
                {pageTitle}
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 font-['Open_Sans'] font-medium">
                {pageSubtitle}
              </p>
            </motion.div>
          </div>

          {/* Certificates Grid */}
          <div className="w-full max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {certificates.map((certificate, index) => (
                <motion.div
                  key={certificate.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="group cursor-pointer"
                >
                  <div className="relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-teal-200 overflow-hidden transform hover:-translate-y-2">
                    <div className="relative h-56 sm:h-72 md:h-96 bg-gradient-to-br from-gray-50 to-gray-100 p-2 sm:p-4">
                      <img
                        src={certificate.imageUrl}
                        alt={certificate.title}
                        className="w-full h-full object-contain rounded-lg shadow-md"
                        width={320}
                        height={240}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                    <div className="h-1 bg-gradient-to-r from-teal-400 via-blue-500 to-teal-600"></div>
                  </div>

                  <div className="mt-4 sm:mt-5 text-center px-1 sm:px-2">
                    <div className="flex items-center justify-center mb-2 sm:mb-3">
                      <div className="w-6 sm:w-8 h-0.5 bg-teal-400 mr-2 sm:mr-3"></div>
                      <span className="text-teal-600 font-bold text-sm sm:text-base font-['Open_Sans']">{certificate.label}</span>
                      <div className="w-6 sm:w-8 h-0.5 bg-teal-400 ml-2 sm:ml-3"></div>
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 leading-tight mb-2 font-['Open_Sans']">
                      {certificate.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium font-['Open_Sans']">
                      {certificate.subtitle}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Our Commitment to Excellence Section */}
          <div className="w-full max-w-7xl mx-auto mt-12 sm:mt-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl"></div>

              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
                <div className="text-center mb-8 sm:mb-12">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent mb-6 sm:mb-8 font-['Open_Sans']">
                      {commitmentTitle}
                    </h2>
                    <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full mx-auto mb-6 sm:mb-8"></div>
                    <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto font-['Open_Sans'] font-medium">
                      {commitmentDescription}
                    </p>
                  </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {COMMITMENT_POINTS.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                      className="group"
                    >
                      <div className={`relative ${point.bgColor} rounded-xl p-6 border-2 ${point.borderColor} hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 h-full`}>
                        <div className="flex items-center mb-4 gap-3">
                          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${point.color} flex items-center justify-center text-white text-xl shadow-md shrink-0`}>
                            {point.icon}
                          </div>
                          <h4 className="font-bold text-gray-900 text-lg sm:text-xl md:text-2xl leading-tight flex-1 min-w-0 font-['Open_Sans']">
                            {point.title}
                          </h4>
                        </div>
                        <p className="text-gray-700 text-sm sm:text-base md:text-lg leading-relaxed font-['Open_Sans'] font-medium">
                          {point.description}
                        </p>
                        <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${point.color} rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300`}></div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 2.0 }}
                  className="mt-10 sm:mt-12 text-center"
                >
                  <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-xl p-6 sm:p-8 text-white">
                    <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 sm:mb-5 font-['Open_Sans']">
                      {bottomCtaTitle}
                    </h3>
                    <p className="text-blue-100 text-base sm:text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto font-['Open_Sans'] font-medium">
                      {bottomCtaDescription}
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mt-8">
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Open_Sans']">20+</div>
                        <div className="text-blue-100 text-sm sm:text-base md:text-lg font-['Open_Sans']">Certifications</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Open_Sans']">100%</div>
                        <div className="text-blue-100 text-sm sm:text-base md:text-lg font-['Open_Sans']">Compliance</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl sm:text-4xl md:text-5xl font-bold font-['Open_Sans']">24/7</div>
                        <div className="text-blue-100 text-sm sm:text-base md:text-lg font-['Open_Sans']">Quality Monitoring</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default Certificates;
