import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

type JsonLd = Record<string, any> | null;

type Props = {
    title: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogImage?: string;
    twitterHandle?: string;
    jsonLd?: JsonLd;
    preloadImage?: string;
};

// Helper function to convert relative URLs to absolute URLs
function toAbsoluteUrl(url: string | undefined): string | undefined {
    if (!url) return undefined;

    // If already absolute (starts with http:// or https://), return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
        return url;
    }

    // Convert relative path to absolute URL
    const baseUrl = 'https://atandra.in';
    // Ensure path starts with /
    const path = url.startsWith('/') ? url : `/${url}`;
    return `${baseUrl}${path}`;
}

export default function SeoHead({
    title,
    description,
    keywords,
    canonical,
    ogImage,
    twitterHandle,
    jsonLd,
    preloadImage
}: Props) {
    // Convert relative OG image to absolute URL for social media crawlers
    const absoluteOgImage = toAbsoluteUrl(ogImage);
    // Ensure canonical tag is correctly set and remove duplicates
    useEffect(() => {
        if (!canonical) return;

        // Use requestAnimationFrame to ensure React Helmet has processed first
        requestAnimationFrame(() => {
            const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');

            // If multiple canonical tags exist, keep only the correct one
            if (canonicalLinks.length > 1) {
                let foundCorrect = false;
                canonicalLinks.forEach((link) => {
                    const href = link.getAttribute('href');
                    if (href === canonical && !foundCorrect) {
                        foundCorrect = true;
                    } else {
                        link.remove();
                    }
                });
            }

            // If no canonical tag exists or the existing one is wrong, add/update it
            const existingCanonical = document.querySelector('link[rel="canonical"]');
            if (!existingCanonical) {
                const link = document.createElement('link');
                link.rel = 'canonical';
                link.href = canonical;
                document.head.appendChild(link);
            } else if (existingCanonical.getAttribute('href') !== canonical) {
                existingCanonical.setAttribute('href', canonical);
            }
        });
    }, [canonical]);

    // Prevent duplicate JSON-LD scripts (remove client-side duplicates)
    useEffect(() => {
        if (!jsonLd || typeof window === 'undefined') return;

        // Wait for Helmet to process, then clean up duplicates
        requestAnimationFrame(() => {
            const jsonLdScripts = document.querySelectorAll('script[type="application/ld+json"]');

            // Count Product schemas specifically (don't remove Organization schema)
            const productSchemas: Element[] = [];
            jsonLdScripts.forEach((script) => {
                const content = script.textContent || '';
                // Check if this is a Product schema (not Organization)
                if (content.includes('"@type":"Product"')) {
                    productSchemas.push(script);
                }
            });

            // If we have multiple Product schemas, keep only the first one (in head)
            if (productSchemas.length > 1) {
                // Keep the first one, remove the rest
                for (let i = productSchemas.length - 1; i > 0; i--) {
                    productSchemas[i].remove();
                    console.log('[SeoHead] Removed duplicate Product schema');
                }
            }
        });
    }, [jsonLd]);

    return (
        <Helmet>
            <title>{title}</title>
            {description && <meta name="description" content={description} />}
            {keywords && <meta name="keywords" content={keywords} />}
            {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
            {canonical && <link rel="canonical" href={canonical} />}

            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            {description && <meta property="og:description" content={description} />}
            {absoluteOgImage && <meta property="og:image" content={absoluteOgImage} />}
            {canonical && <meta property="og:url" content={canonical} />}

            <meta name="twitter:card" content={absoluteOgImage ? 'summary_large_image' : 'summary'} />
            {twitterHandle && <meta name="twitter:site" content={twitterHandle} />}
            <meta name="twitter:title" content={title} />
            {description && <meta name="twitter:description" content={description} />}
            {absoluteOgImage && <meta name="twitter:image" content={absoluteOgImage} />}

            {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
            {/* {preloadImage && <link rel="preload" as="image" href={preloadImage} />} */}
        </Helmet>
    );
}

