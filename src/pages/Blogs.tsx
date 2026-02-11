import PageLayout from "@/components/layout/PageLayout";
import SeoHead from "@/seo/SeoHead";

const Blogs = () => {
    return (
        <>
            <SeoHead
                title="Blogs | Atandra Energy"
                description="Technical blogs and insights from Atandra Energy. Coming soon."
                canonical="https://atandra.in/blogs"
            />

            <PageLayout hideHero={true} hideBreadcrumbs={true}>
                {/* Orange Header */}
                <section className="relative bg-orange-600 py-16 border-b border-orange-700">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white font-['Open_Sans']">
                            Blogs
                        </h1>
                        <p className="mt-4 text-lg sm:text-xl text-orange-50 font-['Open_Sans']">
                            Insights on Energy Innovation & Technology
                        </p>
                    </div>
                </section>

                {/* Under Progress Content */}
                <section className="py-32 bg-gray-50">
                    <div className="max-w-3xl mx-auto text-center px-4">
                        <p className="text-2xl sm:text-3xl font-semibold text-gray-800 font-['Open_Sans'] mb-4">
                            🚧 Under Development
                        </p>
                        <p className="text-lg sm:text-xl text-gray-600 font-['Open_Sans'] mb-3">
                            We're working on bringing you insightful technical blogs and industry perspectives.
                        </p>
                        <p className="text-base sm:text-lg text-gray-500 font-['Open_Sans']">
                            Check back soon for updates.
                        </p>
                    </div>
                </section>
            </PageLayout>
        </>
    );
};

export default Blogs;