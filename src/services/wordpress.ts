// src/services/wordpress.ts
// Utility for fetching WordPress data
// This is used primarily at build time for SSG, but can also be used for client-side fetches if needed.

export interface WpPageData {
    id: number;
    title: { rendered: string };
    content: { rendered: string };
    acf: Record<string, any>;
    yoast_head_json?: any;
}

export async function fetchPageBySlug(slug: string): Promise<WpPageData | null> {
    const baseUrl = 'https://cms.atandra.in/wp-json/wp/v2/pages';
    try {
        console.log(`[WP] Fetching page with slug: ${slug}`);
        const response = await fetch(`${baseUrl}?slug=${slug}`);
        if (!response.ok) {
            console.error(`[WP] Failed to fetch page ${slug}: ${response.statusText}`);
            return null;
        }
        const pages = await response.json();
        if (Array.isArray(pages) && pages.length > 0) {
            return pages[0] as WpPageData;
        }
        return null;
    } catch (error) {
        console.error(`[WP] Error fetching page ${slug}:`, error);
        return null;
    }
}
