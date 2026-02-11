import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import PageLayout from "@/components/layout/PageLayout";
import SeoHead from '@/seo/SeoHead';
import { useNavigate, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useFAQsRealtime } from "@/hooks/useFAQsRealtime";
import { FAQCategory, FAQItem } from "@/types/faq";
import { Loader2, AlertCircle, ArrowRight, Mail } from "lucide-react";

// FAQ Style Configuration
const FAQ_STYLE_MAP: Record<string, any> = {
    "static-voltage-regulators": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "servo-stabilisers": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "isolation-transformers": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-50",
    },
    "alensoft-enms": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "ups": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "power-quality-analyzers": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "multifunction-power-quality-meters": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "thermal-imaging-cameras": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    },
    "installation-safety-testers": {
        color: "bg-purple-100",
        borderColor: "border-purple-300",
        badgeColor: "bg-purple-500",
        textColor: "text-purple-700",
        hoverColor: "hover:bg-purple-100",
    }
};

const DEFAULT_STYLE = {
    color: "bg-purple-100",
    borderColor: "border-purple-300",
    badgeColor: "bg-purple-600",
    textColor: "text-purple-700",
    hoverColor: "hover:bg-purple-100",
};

// Helper to merge data with style
const getStyledCategory = (cat: FAQCategory) => {
    const style = FAQ_STYLE_MAP[cat.id] || DEFAULT_STYLE;
    return { ...cat, ...style };
};

// FAQ Header Component - Shows all categories at the top
const FAQHeader: React.FC<{
    currentCategory: FAQCategory | null,
    categories: FAQCategory[]
}> = ({ currentCategory, categories }) => {
    const navigate = useNavigate();

    return (
        <div className="w-full bg-gradient-to-br from-purple-50 via-white to-purple-50 py-8 md:py-12 border-b-2 border-purple-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                    {categories.map((rawCat) => {
                        const category = getStyledCategory(rawCat);
                        const isActive = currentCategory?.id === category.id;

                        return (
                            <motion.button
                                key={category.id}
                                onClick={() => navigate(`/faqs/${category.id}`)}
                                whileHover={{ scale: 1.03, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                className={cn(
                                    "group relative p-4 md:p-5 rounded-xl border-2 transition-all duration-300 text-left",
                                    "hover:shadow-lg",
                                    isActive
                                        ? "bg-white border-purple-600 shadow-md"
                                        : "bg-white/70 border-purple-100 hover:border-purple-300"
                                )}
                            >
                                {/* Category Name with Indicator Dot */}
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full transition-colors",
                                        isActive ? "bg-purple-600" : "bg-gray-300 group-hover:bg-purple-400"
                                    )} />
                                    <h3 className={cn(
                                        "typography-small md:typography-h6 font-bold transition-colors font-['Montserrat'] uppercase tracking-wider",
                                        isActive
                                            ? "text-purple-900"
                                            : "text-gray-900 group-hover:text-purple-700"
                                    )}>
                                        {category.name}
                                    </h3>
                                </div>
                                {isActive && (
                                    <div className="absolute top-4 right-4 text-purple-600">
                                        <ArrowRight className="w-5 h-5" />
                                    </div>
                                )}
                            </motion.button>
                        );
                    })}
                </div>
            </div>
        </div >
    );
};

// FAQ Accordion Component with Clean Card Design
const FAQAccordion = ({ questions, category }: { questions: FAQItem[], category: any }) => {
    const [expandedIndices, setExpandedIndices] = useState<Set<string>>(new Set());

    const toggleSingleFAQ = (id: string) => {
        const newSet = new Set(expandedIndices);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setExpandedIndices(newSet);
    };

    if (questions.length === 0) {
        return (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-gray-500">No questions found in this category yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {questions.map((faq, index) => (
                <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    whileHover={{ y: -2 }}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200 overflow-hidden"
                >
                    <button
                        onClick={() => toggleSingleFAQ(faq.id)}
                        className="w-full px-4 md:px-6 py-4 md:py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400"
                    >
                        {/* Left: Badge + Question */}
                        <div className="flex items-center gap-4 flex-1 pr-4">
                            <div className={`flex-shrink-0 ${category.badgeColor || DEFAULT_STYLE.badgeColor} text-white rounded-lg p-2`}>
                                <span className="text-sm font-bold">Q{String(index + 1).padStart(2, '0')}</span>
                            </div>
                            <h3 className="text-base md:text-lg font-semibold text-gray-700 font-['Open_Sans'] leading-snug">
                                {faq.question}
                            </h3>
                        </div>

                        {/* Right: Chevron */}
                        <div className="flex-shrink-0 mt-1">
                            <motion.svg
                                animate={{ rotate: expandedIndices.has(faq.id) ? 180 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </motion.svg>
                        </div>
                    </button>

                    {/* Answer Section */}
                    <motion.div
                        initial={false}
                        animate={{
                            height: expandedIndices.has(faq.id) ? "auto" : 0,
                            opacity: expandedIndices.has(faq.id) ? 1 : 0
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        <div className="px-4 md:px-6 py-4 md:py-5 border-t border-gray-200 bg-gray-50">
                            <p className="text-gray-700 leading-relaxed font-['Open_Sans'] text-base whitespace-pre-wrap">
                                {faq.answer}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>
            ))}
        </div>
    );
};

// Main FAQ Page Component
const FAQs = () => {
    const { category } = useParams<{ category?: string }>();
    const navigate = useNavigate();
    const { categories, questions, loading, error } = useFAQsRealtime();
    const [selectedCategory, setSelectedCategory] = useState<FAQCategory | null>(null);

    // Effect to handle URL params and initial selection
    useEffect(() => {
        if (!loading && categories.length > 0) {
            if (category) {
                const found = categories.find(cat => cat.id === category);
                if (found) {
                    setSelectedCategory(found);
                } else {
                    // If category in URL not found, default to first one
                    setSelectedCategory(categories[0]);
                    navigate(`/faqs/${categories[0].id}`, { replace: true });
                }
            } else {
                // No category provided, default to first one
                setSelectedCategory(categories[0]);
                navigate(`/faqs/${categories[0].id}`, { replace: true });
            }
        }
    }, [category, categories, loading, navigate]);

    const isInitialMount = useRef(true);

    // Scroll into view when category changes (but not on initial load)
    useEffect(() => {
        if (!loading && category) {
            if (isInitialMount.current) {
                isInitialMount.current = false;
                return;
            }

            const resultsSection = document.getElementById('faq-results');
            if (resultsSection) {
                const headerOffset = 100; // Account for sticky header if any
                const elementPosition = resultsSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        }
    }, [category, loading]);

    // Structured Data (JSON-LD)
    const jsonLd = selectedCategory ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": questions
            .filter(q => q.categoryId === selectedCategory.id)
            .map(q => ({
                "@type": "Question",
                "name": q.question,
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": q.answer
                }
            }))
    } : null;

    const currentQuestions = selectedCategory
        ? questions.filter(q => q.categoryId === selectedCategory.id)
        : [];

    const styledCategory = selectedCategory ? getStyledCategory(selectedCategory) : null;

    return (
        <div className="font-['Open_Sans']">
            <PageLayout hideHero={true}>
                <SeoHead
                    title={selectedCategory ? `${selectedCategory.name} FAQs - Atandra` : "Frequently Asked Questions - Atandra"}
                    description="Find answers to common questions about our products and services."
                    jsonLd={jsonLd}
                />

                {/* Hide Breadcrumbs and Custom Padding Overrides to match Company Page */}
                <style>{`
                    nav.mb-10 { display: none !important; }
                    .py-16.xs\\:py-20.sm\\:py-24 { padding-top: 0 !important; }
                `}</style>

                <div className="min-h-screen bg-gray-50">
                    {/* Hero Section */}
                    <div className="bg-purple-500 text-white py-8 md:py-12 relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10" />
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="typography-h1 mb-4 font-['Montserrat']"
                            >
                                Frequently Asked Questions
                            </motion.h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                                className="text-purple-100 text-lg max-w-2xl mx-auto font-['Open_Sans']"
                            >
                                Get detailed answers about our products, technology, and support services.
                            </motion.p>
                        </div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
                        </div>
                    ) : error ? (
                        <div className="flex justify-center items-center py-20 text-red-600 gap-2">
                            <AlertCircle className="w-6 h-6" />
                            <span>Failed to load FAQs: {error}</span>
                        </div>
                    ) : (
                        <>
                            <FAQHeader currentCategory={styledCategory} categories={categories} />

                            <div id="faq-results" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
                                {styledCategory && (
                                    <motion.div
                                        key={styledCategory.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className="mb-8 flex items-center justify-center sm:justify-start gap-4 border-b border-gray-200 pb-6">
                                            <h2 className="text-3xl md:text-4xl font-black text-gray-900 font-['Montserrat'] uppercase tracking-tight">
                                                {styledCategory.name}
                                            </h2>
                                        </div>
                                        <FAQAccordion questions={currentQuestions} category={styledCategory} />
                                    </motion.div>
                                )}
                            </div>

                            {/* Expert Consultation Section - Matched to Smart Factory Solution */}
                            <section className="py-12 md:py-16 bg-gradient-to-br from-purple-100 via-white to-purple-100 border-t-2 border-purple-200 mt-12">
                                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6 }}
                                        viewport={{ once: true }}
                                    >
                                        <h2 className="text-3xl md:text-4xl font-black text-purple-900 mb-6 font-['Montserrat'] uppercase tracking-tight">
                                            Need More Information?
                                        </h2>
                                        <p className="text-lg md:text-xl text-purple-800 mb-8 font-medium max-w-2xl mx-auto font-['Open_Sans']">
                                            Our team of experts is ready to help you with product specifications, custom solutions, and technical guidance.
                                        </p>
                                        <button
                                            onClick={() => navigate('/contact/sales')}
                                            className="inline-flex px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-black rounded-xl shadow-xl transition-all duration-300 items-center justify-center space-x-3 text-lg mx-auto transform hover:-translate-y-1"
                                        >
                                            <span>Contact Our Experts</span>
                                            <ArrowRight className="h-5 w-5" />
                                        </button>
                                    </motion.div>
                                </div>
                            </section>

                        </>
                    )}
                </div>
            </PageLayout>
        </div>
    );
};

export default FAQs;