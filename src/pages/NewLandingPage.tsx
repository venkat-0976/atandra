import React from 'react';
import { Link } from 'react-router-dom';
import Layout from "@/components/layout/Layout";
import HeroAtandra from "@/components/HeroAtandra";
import ServicesFixed from "@/components/ServicesFixed";
import TimelineFixed from "@/components/TimelineFixed";
import ClientLogosSection from "@/components/ClientLogosSection";
// import FloatingVoiceWidget from '@/components/FloatingVoiceWidget';
import SeoHead from '@/seo/SeoHead';

const NewLandingPage = () => {
  return (
    <>
      <SeoHead
        title="Atandra Energy - India's Leading Power & Energy Solutions"
        description="India's #1 servo stabilizer manufacturer with 40+ years of expertise. Premium UPS systems, voltage regulators,power quality solutions"
        keywords="servo stabilizers, UPS systems, power conditioners, voltage regulators, energy management, power quality analyzers, thermal imagers, India manufacturer, Atandra Energy, Krykard"
        canonical="https://atandra.in/"
      />
      <Layout>
        <div className="overflow-x-hidden">
          {/* Main heading for SEO - visible to search engines */}
          <div className="text-center py-4 bg-blue-50">
            <h1 className="text-2xl font-bold text-gray-900">  Atandra Energy - India's Leading Power </h1>
          </div>

          {/* Hero Section */}
          <HeroAtandra />

          {/* Services Section */}
          <ServicesFixed />

          {/* Timeline Section */}
          <TimelineFixed />

          {/* Client Logos Section */}
          <ClientLogosSection isInView={true} />

          {/* Company Description Section for SEO */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">India's Leading Power & Energy Management Company</h2>
                <p className="text-lg text-gray-600 max-w-4xl mx-auto">
                  Atandra Energy (Krykard) has been India's premier manufacturer of servo stabilizers, UPS systems, and power conditioning equipment for over 40 years.
                  With 100+ service centers across India and a reputation for excellence, we provide comprehensive power protection, measurement, and energy conservation solutions
                  to industries, corporates, and OEMs nationwide. Our ISO-certified manufacturing facilities and cutting-edge technology ensure reliable,
                  high-performance power management solutions that keep your operations running smoothly.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Years of Excellence</div>
                  <div className="text-gray-600">Four decades of innovation and reliability in power management</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Service Centers</div>
                  <div className="text-gray-600">Nationwide network for comprehensive support and maintenance</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">#1</div>
                  <div className="text-lg font-semibold text-gray-900 mb-2">Servo Stabilizer Manufacturer</div>
                  <div className="text-gray-600">India's leading manufacturer of servo voltage stabilizers</div>
                </div>
              </div>
            </div>
          </section>

          {/* Internal Links Section for SEO */}
          <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Explore Our Solutions</h2>
                <p className="text-lg text-gray-600">Comprehensive power and energy management solutions for every industry</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Power Protection</h3>
                  <p className="text-gray-600 mb-4">Advanced UPS systems and voltage stabilizers for critical applications</p>
                  <div className="space-y-2">
                    <Link to="/protect/ups" className="block text-blue-600 hover:text-blue-800 font-medium">UPS Systems →</Link>
                    <Link to="/protect/servo-stabilizers" className="block text-blue-600 hover:text-blue-800 font-medium">Servo Stabilizers →</Link>
                    <Link to="/protect/static-stabilizers" className="block text-blue-600 hover:text-blue-800 font-medium">Static Stabilizers →</Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Measurement Tools</h3>
                  <p className="text-gray-600 mb-4">Precision testing and measurement equipment for power quality analysis</p>
                  <div className="space-y-2">
                    <Link to="/measure/thermal-imagers" className="block text-blue-600 hover:text-blue-800 font-medium">Thermal Imagers →</Link>
                    <Link to="/measure/power-quality-analyzers" className="block text-blue-600 hover:text-blue-800 font-medium">Power Quality Analyzers →</Link>
                    <Link to="/measure/digital-multimeters" className="block text-blue-600 hover:text-blue-800 font-medium">Digital Multimeters →</Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Energy Conservation</h3>
                  <p className="text-gray-600 mb-4">Smart energy management solutions for sustainable operations</p>
                  <div className="space-y-2">
                    <Link to="/conserve/on-premise-systems" className="block text-blue-600 hover:text-blue-800 font-medium">On-Premise Systems →</Link>
                    <Link to="/conserve/smart-factory-solution" className="block text-blue-600 hover:text-blue-800 font-medium">Smart Factory Solutions →</Link>
                    <Link to="/conserve/enterprise-esg-reporting" className="block text-blue-600 hover:text-blue-800 font-medium">ESG Reporting →</Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">About Atandra</h3>
                  <p className="text-gray-600 mb-4">Learn about our 40+ years of excellence and company heritage</p>
                  <div className="space-y-2">
                    <Link to="/about/our-leadership" className="block text-blue-600 hover:text-blue-800 font-medium">Leadership Team →</Link>
                    <Link to="/about/certificates" className="block text-blue-600 hover:text-blue-800 font-medium">Certifications →</Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Service & Support</h3>
                  <p className="text-gray-600 mb-4">Comprehensive service network across India with expert support</p>
                  <div className="space-y-2">
                    <Link to="/contact/service" className="block text-blue-600 hover:text-blue-800 font-medium">Service Centers →</Link>
                    <Link to="/contact/sales" className="block text-blue-600 hover:text-blue-800 font-medium">Sales Team →</Link>
                    <Link to="/about/careers" className="block text-blue-600 hover:text-blue-800 font-medium">Career Opportunities →</Link>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Product Categories</h3>
                  <p className="text-gray-600 mb-4">Complete range of power and energy management products</p>
                  <div className="space-y-2">
                    <Link to="/measure/power-quality-analyzers" className="block text-blue-600 hover:text-blue-800 font-medium">Measurement Equipment →</Link>
                    <Link to="/protect/ups" className="block text-blue-600 hover:text-blue-800 font-medium">Protection Systems →</Link>
                    <Link to="/conserve/on-premise-systems" className="block text-blue-600 hover:text-blue-800 font-medium">Energy Solutions →</Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Floating Voice Widget */}
          {/* <FloatingVoiceWidget /> */}
        </div>
      </Layout>
    </>
  );
};

export default NewLandingPage;
