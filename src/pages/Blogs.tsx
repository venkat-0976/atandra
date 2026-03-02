import React, { useEffect, useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import SeoHead from "@/seo/SeoHead";
import { motion } from "framer-motion";

interface Blog {
    id: number;
    title: string;
    excerpt: string;
    content: string;
    image?: string;
}

interface PageData {
    hero_badge_text: string;
    intro_title: string;
    intro_description: string;
}

const API_BASE = "https://cms.atandra.in/wp-json/wp/v2";

const FALLBACK_PAGE_DATA: PageData = {
    hero_badge_text: "Blogs",
    intro_title: "Insights on Energy Innovation & Technology",
    intro_description:
        "Explore expert perspectives, technical deep-dives, and industry updates on power quality, energy management, and electrical innovation. Stay informed with practical insights designed for engineers, consultants, and industry leaders.",
};

const Blogs = ({ data: initialData }: { data?: any }) => {
    const [wpData, setWpData] = useState<any>(() => {
        if (initialData?.slug === "blogs") {
            return initialData;
        }
        return null;
    });
    const [isLoading, setIsLoading] = useState(!wpData);
    const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

    useEffect(() => {
        if (wpData) return;

        const fetchData = async () => {
            try {
                const [pageRes, blogRes] = await Promise.all([
                    fetch(`${API_BASE}/pages?slug=blogs&acf_format=standard`),
                    fetch(`${API_BASE}/blogs?_embed&per_page=100`),
                ]);

                const pageJson = await pageRes.json();
                const blogJson = await blogRes.json();

                const page = Array.isArray(pageJson) && pageJson.length > 0 ? pageJson[0] : null;
                const acf = page?.acf || {};

                const mappedBlogs: Blog[] = Array.isArray(blogJson)
                    ? blogJson.map((item: any) => ({
                        id: item.id,
                        title: item.title?.rendered || "",
                        excerpt: item.excerpt?.rendered || "",
                        content: item.content?.rendered || "",
                        image: item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "",
                    }))
                    : [];

                setWpData({
                    slug: "blogs",
                    acf,
                    blogs: mappedBlogs,
                });
            } catch (err) {
                console.error("Blog fetch error:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [wpData]);

    const pageData: PageData = wpData?.acf
        ? {
            hero_badge_text: wpData.acf.hero_badge_text || FALLBACK_PAGE_DATA.hero_badge_text,
            intro_title: wpData.acf.intro_title || FALLBACK_PAGE_DATA.intro_title,
            intro_description: wpData.acf.intro_description || FALLBACK_PAGE_DATA.intro_description,
        }
        : FALLBACK_PAGE_DATA;

    const blogs: Blog[] = wpData?.blogs || [];

    const seoTitle = wpData?.acf?.seo_title || `${pageData.hero_badge_text} | Atandra Energy`;

    if (isLoading) {
        return (
            <>
                <SeoHead
                    title={seoTitle}
                    description={FALLBACK_PAGE_DATA.intro_description}
                    canonical="https://atandra.in/blogs"
                />
                <PageLayout hideHero hideBreadcrumbs>
                    <div className="min-h-[60vh] flex items-center justify-center">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full"
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
                description={pageData.intro_description}
                canonical="https://atandra.in/blogs"
            />

            <PageLayout hideHero hideBreadcrumbs>
                {/* Header */}
                <div className="relative bg-blue-100 py-6 sm:py-8 lg:py-10 overflow-hidden font-['Open_Sans']">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-300 opacity-30 rounded-full blur-3xl" />
                        <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-indigo-200 opacity-20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-10 right-0 w-48 h-48 bg-cyan-200 opacity-25 rounded-full blur-3xl" />
                    </div>
                    <div className="absolute inset-0 bg-blue-100/80 z-10" />
                    <div className="relative max-w-7xl mx-auto text-center px-4 z-20">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-blue-900 mb-1">
                            {pageData.hero_badge_text}
                        </h1>
                        <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl text-black font-semibold leading-snug">
                            {pageData.intro_title}
                        </h2>
                    </div>
                </div>

                {/* Description */}
                <section className="bg-white py-6 sm:py-8 font-['Open_Sans']">
                    <p className="max-w-4xl mx-auto text-center text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-medium px-4">
                        {pageData.intro_description}
                    </p>
                </section>

                {/* Blog Grid */}
                <section className="py-16 bg-gray-50 font-['Open_Sans']">
                    <div className="max-w-7xl mx-auto px-6">
                        {blogs.length === 0 ? (
                            <div className="flex justify-center py-24">
                                {/* <p className="text-gray-600 text-lg">No blogs found.</p> */}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        onClick={() => setSelectedBlog(blog)}
                                        className="cursor-pointer bg-white rounded-xl shadow hover:shadow-xl transition overflow-hidden"
                                    >
                                        {blog.image && (
                                            <div className="h-48 bg-gray-100 flex items-center justify-center">
                                                <img
                                                    src={blog.image}
                                                    alt={blog.title}
                                                    className="h-full w-auto object-contain"
                                                    loading="lazy"
                                                    width={320}
                                                    height={240}
                                                />
                                            </div>
                                        )}

                                        <div className="p-5">
                                            <h3
                                                className="text-lg font-bold mb-2 text-gray-900"
                                                dangerouslySetInnerHTML={{ __html: blog.title }}
                                            />
                                            <div
                                                className="text-gray-600 text-sm leading-relaxed"
                                                dangerouslySetInnerHTML={{ __html: blog.excerpt }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </PageLayout>

            {/* Modal */}
            {selectedBlog && (
                <div className="fixed inset-0 z-[110] bg-black/70 flex justify-center">
                    <div className="relative mt-[110px] w-full max-w-5xl mx-4 bg-white rounded-xl flex flex-col max-h-[calc(100vh-140px)] overflow-hidden">
                        <button
                            onClick={() => setSelectedBlog(null)}
                            className="absolute top-4 right-4 z-20 text-2xl font-bold text-gray-700 hover:text-black"
                        >
                            ×
                        </button>

                        {selectedBlog.image && (
                            <div className="h-[42vh] max-h-[420px] bg-gray-100 flex items-center justify-center shrink-0">
                                <img
                                    src={selectedBlog.image}
                                    alt={selectedBlog.title}
                                    className="h-full w-auto object-contain"
                                    width={1920}
                                    height={1080}
                                />
                            </div>
                        )}

                        <div className="flex-1 overflow-y-auto p-6 sm:p-8">
                            <h2
                                className="text-2xl font-bold mb-4 text-gray-900"
                                dangerouslySetInnerHTML={{ __html: selectedBlog.title }}
                            />
                            <div
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Blogs;
