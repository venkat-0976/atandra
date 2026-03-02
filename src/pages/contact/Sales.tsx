import React, { useRef, useState, } from "react";
import { motion, useInView } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Navigation,
  Send,
  Building,
  User,
  MessageSquare,
  Briefcase,
  Bookmark,
  MapPinned,
  CheckCircle,
  AlertCircle,
  Loader2
} from "lucide-react";
import { rtdb } from "../../lib/firebase"; // Adjust path as needed
import { ref, push, set } from "firebase/database";
import SeoHead from '@/seo/SeoHead';

const Sales = () => {
  const contactRef = useRef(null);
  const contactInView = useInView(contactRef, { amount: 0.1, once: true });

  // State for form inputs
  const [formInputs, setFormInputs] = useState({
    name: '',
    email: '',
    company: '',
    designation: '',
    city: '',
    mobile: '',
    pincode: '',
    products: '',
    remarks: ''
  });

  // State for checkboxes
  const [selectedServices, setSelectedServices] = useState({
    'request-demo': false,
    'request-callback': false,
    'send-details': false,
    'send-updates': false
  });

  // State for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: '', // 'success', 'error', 'partial'
    message: '',
    details: ''
  });

  // Your email service endpoint URL
  // const EMAIL_API_ENDPOINT = "https://atandraemail-590892650418.us-central1.run.app/api/email/send-contact-emails";
  const EMAIL_API_ENDPOINT = "http://localhost:8000/api/email/send-contact-emails";
  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormInputs(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear any previous error messages when user starts typing
    if (submitStatus.type === 'error') {
      setSubmitStatus({ type: '', message: '', details: '' });
    }
  };

  // Handle checkbox changes
  const handleCheckboxChange = (serviceId: string) => {
    setSelectedServices(prev => ({
      ...prev,
      [serviceId]: !prev[serviceId]
    }));
  };

  // Validate form data
  const validateForm = () => {
    const requiredFields = ['name', 'email', 'company', 'designation', 'city', 'mobile', 'pincode', 'products'];
    const missingFields = requiredFields.filter(field => !formInputs[field].trim());

    if (missingFields.length > 0) {
      setSubmitStatus({
        type: 'error',
        message: 'Please fill in all required fields',
        details: `Missing: ${missingFields.join(', ')}`
      });
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formInputs.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid email address',
        details: ''
      });
      return false;
    }

    // Phone number basic validation (adjust regex as needed)
    const phoneRegex = /^[\+]?[0-9\-\s\(\)]{10,}$/;
    if (!phoneRegex.test(formInputs.mobile)) {
      setSubmitStatus({
        type: 'error',
        message: 'Please enter a valid phone number',
        details: ''
      });
      return false;
    }

    return true;
  };

  // Save data to Firebase Realtime Database
  const saveToFirebase = async (formData: any) => {
    try {
      const contactsRef = ref(rtdb, 'contacts');
      const newContactRef = push(contactsRef);

      const dataToSave = {
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'new',
        source: 'website_contact_form'
      };

      await set(newContactRef, dataToSave);
      console.log('Data saved to Firebase successfully');
      return { success: true, id: newContactRef.key };
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      throw new Error(`Firebase save failed: ${error.message}`);
    }
  };

  // Send emails via backend API
  const sendEmails = async (formData: any) => {
    try {
      const response = await fetch(EMAIL_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Emails sent successfully:', result);
      return { success: true, data: result };
    } catch (error) {
      console.error('Error sending emails:', error);
      throw new Error(`Email service failed: ${error.message}`);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Clear previous status
    setSubmitStatus({ type: '', message: '', details: '' });

    // Validate form
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare form data
      const selectedServicesList = Object.keys(selectedServices).filter(
        service => selectedServices[service]
      );

      const formData = {
        ...formInputs,
        services: selectedServicesList,
        submitted_at: new Date().toISOString()
      };

      console.log('Starting form submission process...');

      // Step 1: Save to Firebase
      console.log('Saving to Firebase...');
      const firebaseResult = await saveToFirebase(formData);
      console.log('Firebase save successful:', firebaseResult);

      // Step 2: Send emails (only if Firebase save was successful)
      console.log('Sending emails...');
      try {
        const emailResult = await sendEmails(formData);
        console.log('Email send successful:', emailResult);

        // Both Firebase and email successful
        setSubmitStatus({
          type: 'success',
          message: 'Thank you for your inquiry!',
          details: 'Your information has been saved and confirmation emails have been sent. Our team will contact you shortly.'
        });

        // Clear form
        setFormInputs({
          name: '',
          email: '',
          company: '',
          designation: '',
          city: '',
          mobile: '',
          pincode: '',
          products: '',
          remarks: ''
        });
        setSelectedServices({
          'request-demo': false,
          'request-callback': false,
          'send-details': false,
          'send-updates': false
        });

      } catch (emailError) {
        // Firebase saved but email failed
        console.error('Email sending failed:', emailError);
        setSubmitStatus({
          type: 'partial',
          message: 'Information saved successfully!',
          details: 'Your inquiry has been recorded, but there was an issue sending confirmation emails. Our team will still contact you shortly.'
        });
      }

    } catch (error) {
      // Firebase save failed
      console.error('Form submission failed:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Submission failed',
        details: error.message || 'Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to handle map click
  const handleMapClick = () => {
    const address = "No.5, Kumaran St, Pazhvanthangal, Chennai, Tamil Nadu, India, 600114";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  // Status message component
  const StatusMessage = () => {
    if (!submitStatus.message) return null;

    const getStatusConfig = () => {
      switch (submitStatus.type) {
        case 'success':
          return {
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            textColor: 'text-green-800',
            icon: <CheckCircle className="h-5 w-5 text-green-600" />
          };
        case 'partial':
          return {
            bgColor: 'bg-yellow-50',
            borderColor: 'border-yellow-200',
            textColor: 'text-yellow-800',
            icon: <AlertCircle className="h-5 w-5 text-yellow-600" />
          };
        case 'error':
        default:
          return {
            bgColor: 'bg-red-50',
            borderColor: 'border-red-200',
            textColor: 'text-red-800',
            icon: <AlertCircle className="h-5 w-5 text-red-600" />
          };
      }
    };

    const config = getStatusConfig();

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-lg border ${config.bgColor} ${config.borderColor} mb-6`}
      >
        <div className="flex items-start gap-3">
          {config.icon}
          <div>
            <p className={`font-medium ${config.textColor}`}>
              {submitStatus.message}
            </p>
            {submitStatus.details && (
              <p className={`text-sm mt-1 ${config.textColor} opacity-90`}>
                {submitStatus.details}
              </p>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <>
      <SeoHead
        title="Contact Sales | Atandra Energy"
        description="Contact Atandra Energy sales team for quotes, product details and technical support for servo stabilizers, UPS systems and power quality analyzers."
        keywords="contact sales, servo stabilizer quote, UPS systems quote, power quality analyzer quote, Atandra Energy contact, Krykard sales"
        canonical="https://atandra.in/contact/sales"
      />
      <PageLayout
        hideHero
        hideBreadcrumbs
      >
        <div className="max-w-7xl mx-auto px-2 sm:px-4 mt-0 relative z-10">
          {/* Removed all background decorative elements */}

          <div
            id="contact"
            ref={contactRef}
            className="relative"
          >
            {/* Removed animated background elements */}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-8 sm:mb-10 mt-8"
            >
              {/* <span className="inline-block bg-blue-700 text-white px-3 sm:px-4 py-1 rounded-full text-xs sm:text-sm font-medium mb-2 sm:mb-3 border border-white/20 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-default">
              Get In Touch
            </span> */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-black drop-shadow-sm">
                Let's Discuss Your <span className="text-black">Energy Needs</span>
              </h1>
              <p className="text-base sm:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Our team of specialists is ready to help you find the perfect solution for your energy management challenges.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={contactInView ? "visible" : "hidden"}
              className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-start"
            >
              {/* Form Section - 7 columns on large screens */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-7 transition-all duration-700 hover:scale-[1.02]"
              >
                <div className="p-6 sm:p-8 bg-white rounded-2xl border border-gray-200 relative">
                  {/* Removed decorative elements */}

                  <div className="relative z-10">
                    <h3 className="text-3xl font-bold mb-8 text-black flex items-center gap-x-3">
                      <div className="p-2 bg-black rounded-lg">
                        <MessageSquare className="h-6 w-6 text-white" />
                      </div>
                      Get in Touch
                    </h3>

                    {/* Status Message */}
                    <StatusMessage />

                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-sm font-semibold text-black mb-2">
                            Full Name *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="text"
                              id="name"
                              value={formInputs.name}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your full name"
                              required
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-sm font-semibold text-black mb-2">
                            Email Address *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="email"
                              id="email"
                              value={formInputs.email}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your email address"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="company" className="block text-sm font-semibold text-black mb-2">
                            Company *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="text"
                              id="company"
                              value={formInputs.company}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your company name"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="designation" className="block text-sm font-semibold text-black mb-2">
                            Job Title *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="text"
                              id="designation"
                              value={formInputs.designation}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your job title"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="city" className="block text-sm font-semibold text-black mb-2">
                            City *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <MapPinned className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="text"
                              id="city"
                              value={formInputs.city}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your city"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="mobile" className="block text-sm font-semibold text-black mb-2">
                            Phone Number *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Phone className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="tel"
                              id="mobile"
                              value={formInputs.mobile}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter your phone number"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="pincode" className="block text-sm font-semibold text-black mb-2">
                            Postal Code *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <MapPin className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <input
                              type="text"
                              id="pincode"
                              value={formInputs.pincode}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              placeholder="Enter postal code"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="products" className="block text-sm font-semibold text-black mb-2">
                            Product Interest *
                          </label>
                          <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                              <Bookmark className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                            </div>
                            <select
                              id="products"
                              value={formInputs.products}
                              onChange={handleInputChange}
                              disabled={isSubmitting}
                              className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black focus:outline-none focus:ring-0 focus:border-black focus:bg-white appearance-none transition-all duration-200 hover:border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                              required
                            >
                              <option value="">Select a product</option>
                              <option value="measure">Measurement Solutions</option>
                              <option value="protect">Protection Systems</option>
                              <option value="conserve">Conservation Technologies</option>
                              <option value="consultation">Energy Consultation</option>
                            </select>
                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="remarks" className="block text-sm font-semibold text-black mb-2">
                          Additional Requirements
                        </label>
                        <div className="relative group">
                          <div className="absolute top-4 left-4 pointer-events-none">
                            <MessageSquare className="h-5 w-5 text-gray-400 group-focus-within:text-black transition-colors duration-200" />
                          </div>
                          <textarea
                            id="remarks"
                            rows={4}
                            value={formInputs.remarks}
                            onChange={handleInputChange}
                            disabled={isSubmitting}
                            className="w-full pl-12 pr-4 py-4 bg-gray-50 border-2 border-gray-200 rounded-xl text-black placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-black focus:bg-white transition-all duration-200 hover:border-gray-300 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                            placeholder="Tell us about your specific requirements or questions..."
                          ></textarea>
                        </div>
                      </div>



                      {/* Submit Button */}
                      <motion.div
                        className="pt-6 mb-8"
                        whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                        whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                      >
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className={`w-full flex items-center justify-center
                                   px-8 py-5
                                   text-lg
                                   font-bold
                                   text-white
                                   ${isSubmitting
                              ? 'bg-gray-400 cursor-not-allowed'
                              : 'bg-gradient-to-r from-black to-gray-800 hover:from-gray-800 hover:to-black'
                            }
                                   rounded-2xl
                                   transition-all duration-300
                                   shadow-2xl
                                   hover:shadow-3xl
                                   focus:outline-none
                                   focus:ring-4
                                   focus:ring-black/20
                                   focus:ring-offset-2
                                   ${!isSubmitting ? 'transform hover:-translate-y-1 active:translate-y-0' : ''}
                                   disabled:opacity-50`}
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="h-6 w-6 mr-3" />
                              Send Enquiry
                            </>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  </div>
                </div>
              </motion.div>

              {/* Contact Info Section - 5 columns on large screens */}
              <motion.div
                variants={itemVariants}
                className="lg:col-span-5 space-y-4 sm:space-y-6"
              >
                {/* Main Contact Info */}
                <div className="p-4 sm:p-8 bg-white rounded-xl border border-gray-200 relative">
                  {/* Removed decorative corner accents */}
                  <div>
                    {/* Header without shine effect */}
                    <div className="relative mb-6 rounded-lg bg-white">
                      <h3 className="text-xl font-bold text-black mb-4 py-3 px-2 sm:px-4 flex items-center gap-x-2">
                        <Mail className="h-5 w-5 text-black" />
                        Atandra Energy Pvt.Ltd.
                      </h3>
                      {/* Address/location block FIRST */}
                      <div className="flex flex-row items-center gap-x-2 mb-2 px-2 sm:px-4">
                        <MapPin className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div className="flex flex-col text-left">
                          <p className="text-black leading-tight">No.5, Kumaran St,</p>
                          <p className="text-black leading-tight">Pazhvanthangal, Tamil Nadu,</p>
                          <p className="text-black leading-tight">India, Chennai- 600 114.</p>
                        </div>
                        <motion.div
                          onClick={handleMapClick}
                          className="ml-2 flex flex-col items-center justify-center cursor-pointer transition-colors bg-gray-100 rounded-lg hover:bg-gray-200 px-3 py-2 w-fit"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          style={{ minWidth: '90px' }}
                        >
                          <Navigation className="h-6 w-6 text-green-600 mb-1" />
                          <span className="text-black text-xs font-medium">View Map</span>
                        </motion.div>
                      </div>
                      {/* Then contact details */}
                      <div className="flex flex-col gap-2 px-2 sm:px-4 mb-2">
                        <div className="flex items-center gap-2 text-black text-base">
                          <Phone className="h-5 w-5 text-green-700" />
                          <a href="tel:+919500097966" className="text-black">+91-95000 97966</a>
                        </div>
                        <div className="flex items-center gap-2 text-black text-base">
                          <Phone className="h-5 w-5 text-green-700" />
                          <a href="tel:+914442780700" className="text-black">044 4278 0700</a>
                        </div>
                        <div className="flex items-center gap-2 text-black text-base">
                          <Mail className="h-5 w-5 text-green-700" />
                          <a href="mailto:enquiry@atandra.in" className="text-black">enquiry@atandra.in</a>
                        </div>
                        {/* <div className="flex items-center gap-2 text-black text-base">
                        <span className="font-semibold">Time:</span>
                        <span>9:00 -- 18:00 (MON-SAT)</span>
                      </div> */}
                      </div>
                    </div>
                  </div>
                </div>

                {/* India Service Locations Map - Fully Responsive */}
                <motion.div
                  variants={itemVariants}
                  className="w-full"
                >
                  <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                    {/* Map Header */}
                    <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b border-gray-200">
                      <div className="text-center">
                        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 flex items-center justify-center gap-x-3">
                          <div className="p-2 bg-gray-800 rounded-lg">
                            <MapPin className="h-6 w-6 text-white" />
                          </div>
                          Our Service Locations Across India
                        </h3>
                        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
                          Comprehensive coverage nationwide with dedicated service centers and support teams
                        </p>
                      </div>
                    </div>

                    {/* India Map Image - Responsive */}
                    <div className="p-4 sm:p-6 lg:p-8">
                      <div className="relative w-full max-w-4xl mx-auto">
                        <div className="overflow-hidden rounded-xl border border-gray-200 relative group bg-white">
                          <img
                            src="/background_images/Service-Locations-India.jpeg"
                            alt="KRYKARD Service Locations Across India"
                            className="w-full h-auto object-contain"
                            style={{
                              minHeight: '250px',
                              maxHeight: '600px',
                              objectFit: 'contain'
                            }}
                          />
                        </div>

                        {/* Service Coverage Statistics */}
                        <div className="mt-6 sm:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">25+</div>
                            <div className="text-sm text-gray-600 font-medium">States Covered</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">100+</div>
                            <div className="text-sm text-gray-600 font-medium">Service Centers</div>
                          </div>
                          <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200 sm:col-span-2 lg:col-span-1">
                            <div className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">24/7</div>
                            <div className="text-sm text-gray-600 font-medium">Support Available</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* Google Maps Location - KRYKARD Headquarters */}
            <motion.div
              variants={itemVariants}
              className="w-full mt-10 sm:mt-16"
            >
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                {/* Location Header */}
                <div className="px-4 sm:px-6 lg:px-8 py-6 bg-gray-50 border-b border-gray-200">
                  <div className="text-center">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-black mb-2 flex items-center justify-center gap-x-3">
                      <div className="p-2 bg-gray-800 rounded-lg">
                        <Building className="h-6 w-6 text-white" />
                      </div>
                      Our Headquarters Location
                    </h3>
                    <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto flex items-center justify-center gap-x-2">
                      <MapPin className="h-4 w-4 text-blue-600" />
                      KRYKARD Headquarters - Chennai, India
                    </p>
                  </div>
                </div>

                {/* Google Maps Container */}
                <div className="p-4 sm:p-6 lg:p-8">
                  <motion.div
                    className="relative overflow-hidden cursor-pointer rounded-xl border border-gray-200 group"
                    onClick={() => window.open('https://www.google.com/maps/place/KRYKARD/@13.0963814,80.2622446,15z/data=!4m6!3m5!1s0x3a5260aa8721279f:0x44507a3129269ebe!8m2!3d13.0963814!4d80.2622446!16s%2Fg%2F11j7lq_v6h?entry=ttu', '_blank')}
                  >
                    <div className="relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22938.9286128844!2d80.2622445948994!3d13.096381397513284!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5260aa8721279f%3A0x44507a3129269ebe!2sKRYKARD!5e1!3m2!1sen!2sus!4v1744869740527!5m2!1sen!2sus"
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        // referrerPolicy="no-referrer-when-downgrade"
                        title="KRYKARD Location Map"
                        className="z-10 w-full max-w-full min-h-[250px] sm:min-h-[300px] lg:min-h-[350px] rounded-lg"
                      />
                    </div>

                    {/* Directions button */}
                    <div className="absolute bottom-4 right-4 z-30">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-white p-3 flex items-center rounded-full border border-gray-200 hover:bg-gray-50 transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open('https://www.google.com/maps/place/KRYKARD/@13.0963814,80.2622446,15z/data=!4m6!3m5!1s0x3a5260aa8721279f:0x44507a3129269ebe!8m2!3d13.0963814!4d80.2622446!16s%2Fg%2F11j7lq_v6h?entry=ttu', '_blank');
                        }}
                      >
                        <Navigation className="h-5 w-5 text-gray-700 mr-2" />
                        <span className="text-gray-800 font-medium">Get Directions</span>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* SEO Content Section - 250+ Words in Collapsible Details */}
          <section className="py-4 md:py-6 bg-white mt-10 sm:mt-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <style>{`
                .seo-details-sales summary {
                  list-style: none;
                }
                .seo-details-sales summary::-webkit-details-marker {
                  display: none;
                }
              `}</style>

              <div className="flex justify-center">
                <details className="seo-details-sales group w-full">
                  <summary className="cursor-pointer text-base font-semibold text-gray-900 py-2 px-4 bg-yellow-50 hover:bg-yellow-100 transition-all rounded-lg flex items-center gap-2 w-fit mx-auto">
                    <span>Learn More</span>
                    <span className="text-yellow-600 group-open:rotate-180 transition-transform duration-300 text-xl">▼</span>
                  </summary>

                  <div className="px-4 py-4 mt-2 border border-yellow-200 rounded-lg bg-white">
                    <div className="prose prose-sm max-w-none">
                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4 first:mt-0">
                        Why Contact Atandra Energy Sales Team?
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Atandra Energy (KRYKARD) has been India's leading manufacturer of power management solutions for over 40 years, serving industries across the nation with comprehensive power protection, measurement, and energy conservation technologies. Our dedicated sales team consists of experienced professionals who understand the unique energy challenges faced by businesses in manufacturing, IT, healthcare, commercial, and industrial sectors. When you contact our sales team, you gain access to expert consultation, customized solutions, competitive pricing, and comprehensive technical support tailored to your specific requirements.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Comprehensive Product Portfolio and Solutions
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Our sales team can help you navigate our extensive range of power management products, including servo voltage stabilizers, static voltage stabilizers, UPS systems, isolation transformers, power quality analyzers, thermal imagers, digital multimeters, clamp meters, and energy management solutions. Whether you need power protection for critical equipment, precision measurement tools for diagnostics, or smart energy conservation systems for sustainable operations, our sales specialists will guide you through product selection, technical specifications, installation requirements, and ongoing support services. With 100+ service centers across India, we ensure comprehensive coverage and rapid response times for all your power management needs.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Expert Consultation and Customized Solutions
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed mb-3">
                        Our sales team provides expert consultation to help you identify the most suitable power management solutions for your specific applications, budget constraints, and operational requirements. We offer detailed product demonstrations, technical documentation, site surveys, and customized quotations based on your unique needs. Our specialists work closely with you to understand your power quality challenges, voltage fluctuation issues, energy consumption patterns, and compliance requirements, ensuring that the recommended solutions deliver optimal performance, reliability, and return on investment for your business.
                      </p>

                      <h3 className="text-base font-bold text-gray-900 mb-2 mt-4">
                        Nationwide Support and Service Excellence
                      </h3>
                      <p className="text-gray-700 text-sm leading-relaxed">
                        Contacting Atandra Energy sales team connects you with India's most trusted power management partner, backed by four decades of industry expertise, ISO-certified manufacturing facilities, and a nationwide service network. Our sales professionals are committed to providing transparent communication, competitive pricing, flexible payment options, and seamless coordination with our technical and service teams. From initial inquiry to installation, commissioning, and ongoing maintenance, our sales team ensures a smooth experience throughout your journey with Atandra Energy, helping you achieve reliable power management and operational excellence.
                      </p>
                    </div>
                  </div>
                </details>
              </div>
            </div>
          </section>

          {/* Removed all shine and glow animations */}
        </div>
      </PageLayout>
    </>
  );
};

export default Sales