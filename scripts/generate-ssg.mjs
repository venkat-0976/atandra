// scripts/generate-ssg.mjs
// Post-build script to generate static HTML pages

import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync } from 'fs'
import { dirname, join, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const distDir = join(root, 'dist')

// Import routes from the JSON file (since we can't import TypeScript directly)
const pagesData = JSON.parse(readFileSync(join(root, 'seo', 'pages.json'), 'utf-8'))
const routes = pagesData.map(page => page.loc.replace('https://atandra.in', ''))

// Import the SSR bundle (built by vite build --ssr)
const ssrBundlePath = join(distDir, 'ssr', 'entry-server.js')
if (!existsSync(ssrBundlePath)) {
    console.error('[react-ssg] SSR bundle not found. Make sure vite build --ssr completed successfully.')
    process.exit(1)
}

const { render } = await import(`file://${ssrBundlePath}`)

// Use the built index.html as template (it has correct asset paths)
const builtIndexPath = join(distDir, 'index.html')
if (!existsSync(builtIndexPath)) {
    console.error('[react-ssg] Built index.html not found. Make sure vite build completed successfully.')
    process.exit(1)
}
let template = readFileSync(builtIndexPath, 'utf-8')

// Find the built JS and CSS files
const assetsDir = join(distDir, 'assets')
const assetFiles = existsSync(assetsDir) ? readdirSync(assetsDir) : []
const jsFile = assetFiles.find(f => f.endsWith('.js') && f.startsWith('index-'))
const cssFile = assetFiles.find(f => f.endsWith('.css') && f.startsWith('index-'))

// Replace the dev script with production scripts
// Remove any existing script tags (both dev and production) from anywhere in the template
template = template.replace(/<script[^>]*src="\/src\/main\.tsx"[^>]*><\/script>/g, '')
template = template.replace(/<script[^>]*type="module"[^>]*src="\/assets\/[^"]*\.js"[^>]*><\/script>/g, '')

// Add CSS in head if not present
if (cssFile && !template.includes(cssFile)) {
    template = template.replace(
        '</head>',
        `  <link rel="stylesheet" crossorigin href="/assets/${cssFile}"></head>`
    )
}

// Add JS script at the end of body (before closing body tag)
if (jsFile) {
    template = template.replace(
        '</body>',
        `  <script type="module" crossorigin src="/assets/${jsFile}"></script>\n</body>`
    )
}

// ============================================================================
// UPDATED: Canonical tag function - Fixed to ensure correct canonical is always present
// ============================================================================
// Function to add canonical tag (ensures correct canonical is always present and early in head)
function addCanonicalTag(html, route) {
    const baseUrl = 'https://atandra.in'
    // Normalize route - remove trailing slash (except for root) to prevent URL variations
    const cleanRoute = route === '/' ? '' : route.replace(/\/$/, '')
    const canonicalUrl = route === '/' ? baseUrl : `${baseUrl}${cleanRoute}`

    // ✅ FIX: Check if Helmet already added a canonical tag (from SeoHead component)
    const existingCanonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)

    if (existingCanonicalMatch) {
        // Helmet already added a canonical - USE IT (developer's explicit choice)
        const helmetCanonical = existingCanonicalMatch[1]

        // ✅ VALIDATION: Warn if Helmet's canonical doesn't match route-based (potential bug)
        if (helmetCanonical !== canonicalUrl) {
            console.warn(`[react-ssg] ⚠️ WARNING: Canonical mismatch for ${route}:`)
            console.warn(`[react-ssg]    Helmet: ${helmetCanonical}`)
            console.warn(`[react-ssg]    Route-based: ${canonicalUrl}`)
            console.warn(`[react-ssg]    → Using Helmet's canonical (developer's choice)`)
        } else {
            console.log(`[react-ssg] ✅ Canonical match for ${route}: ${helmetCanonical}`)
        }

        // Remove the existing canonical (we'll place it early in head)
        html = html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')

        // Place Helmet's canonical early in <head> (right after viewport meta tag)
        const viewportPattern = /(<meta[^>]*name=["']viewport["'][^>]*>)/i
        if (viewportPattern.test(html)) {
            // Insert Helmet's canonical right after viewport for optimal SEO
            html = html.replace(
                viewportPattern,
                `$1\n    <link rel="canonical" href="${helmetCanonical}" />`
            )
        } else {
            // Fallback: add before closing </head> if viewport not found
            html = html.replace(
                '</head>',
                `  <link rel="canonical" href="${helmetCanonical}" />\n</head>`
            )
        }

        return html
    }

    // ✅ FALLBACK: No Helmet canonical found - use route-based one
    console.log(`[react-ssg] ℹ️ No Helmet canonical for ${route}, using route-based: ${canonicalUrl}`)

    // Remove any existing canonical tags first (shouldn't be any, but safety check)
    html = html.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')

    // Place canonical tag early in <head> (right after viewport meta tag)
    const viewportPattern = /(<meta[^>]*name=["']viewport["'][^>]*>)/i
    if (viewportPattern.test(html)) {
        // Insert canonical right after viewport for optimal SEO
        html = html.replace(
            viewportPattern,
            `$1\n    <link rel="canonical" href="${canonicalUrl}" />`
        )
    } else {
        // Fallback: add before closing </head> if viewport not found
        html = html.replace(
            '</head>',
            `  <link rel="canonical" href="${canonicalUrl}" />\n</head>`
        )
    }

    return html
}

// mapping of routes to WordPress slugs
const routeToSlug = {
    '/measure/insulation-testers': 'insulation-testers',
    '/measure/power-quality-analyzers': 'power-quality-analyzers',
    '/measure/thermal-imagers': 'thermal-imagers',
    '/measure/micro-ohmmeters': 'micro-ohmmeters',
    '/measure/digital-multimeters': 'digital-multimeters',
    '/measure/earth-testers': 'earth-testers',
    '/measure/oscilloscopes': 'oscilloscopes',
    '/measure/clamp-meters': 'clamp-meters',
    '/measure/earth-loop-testers': 'earth-loop-testers',
    '/measure/installation-testers': 'installation-testers',
    '/measure/multi-functional-meters': 'multi-function-meters',
    '/about/certificates': 'certificates',
    '/about/events': 'events',
    '/about/our-leadership': 'leadership',
    '/blogs': 'blogs',
};

async function fetchWpData(route) {
    const slug = routeToSlug[route];
    if (!slug) return null;

    const baseUrl = 'https://cms.atandra.in/wp-json/wp/v2';
    try {
        console.log(`[react-ssg] Fetching WP data for ${route} (slug: ${slug})...`);
        const pageResponse = await fetch(`${baseUrl}/pages?slug=${slug}&acf_format=standard`);
        if (!pageResponse.ok) return null;
        const pages = await pageResponse.json();
        const pageData = (pages && pages.length > 0) ? pages[0] : null;

        // Events route: also fetch events CPT
        if (route === '/about/events') {
            const eventsResponse = await fetch(`${baseUrl}/events?per_page=100&acf_format=standard`);
            const eventsJson = eventsResponse.ok ? await eventsResponse.json() : [];
            const mappedEvents = Array.isArray(eventsJson)
                ? eventsJson
                    .map((item) => ({
                        id: item.id,
                        title: item.title?.rendered || '',
                        description: item.acf?.event_description || '',
                        images: Array.isArray(item.acf?.event_gallery)
                            ? item.acf.event_gallery.map((img) => ({ url: img.url || img.guid, }))
                            : [],
                        category: item.slug,
                    }))
                    .filter((e) => e.images.length > 0)
                : [];
            return pageData ? { ...pageData, events: mappedEvents } : { slug: 'events', acf: {}, events: mappedEvents };
        }

        // Blogs route: also fetch blogs CPT with _embed for featured images
        if (route === '/blogs') {
            const blogsResponse = await fetch(`${baseUrl}/blogs?_embed&per_page=100`);
            const blogsJson = blogsResponse.ok ? await blogsResponse.json() : [];
            const mappedBlogs = Array.isArray(blogsJson)
                ? blogsJson.map((item) => ({
                    id: item.id,
                    title: item.title?.rendered || '',
                    excerpt: item.excerpt?.rendered || '',
                    content: item.content?.rendered || '',
                    image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
                }))
                : [];
            return pageData ? { ...pageData, blogs: mappedBlogs } : { slug: 'blogs', acf: {}, blogs: mappedBlogs };
        }

        return pageData;
    } catch (e) {
        console.error(`[react-ssg] Error fetching WP data for ${route}:`, e);
        return null;
    }
}

console.log(`[react-ssg] Generating ${routes.length} static pages...`)

for (const route of routes) {
    try {
        console.log(`[react-ssg] Rendering route: ${route}`)

        // Fetch WP data before rendering
        const wpData = await fetchWpData(route);

        const result = await render(route, wpData)

        // Handle both old format (string) and new format (object)
        const html = typeof result === 'string' ? result : result.html
        const headTags = typeof result === 'object' && result.headTags ? result.headTags : ''
        const dataScript = typeof result === 'object' && result.dataScript ? result.dataScript : ''

        // Validate that we got actual content
        if (!html || html.trim().length < 100) {
            console.warn(`[react-ssg] Warning: Route ${route} produced very little HTML (${html?.length || 0} chars).`)
        }

        const routePath = route === '/' ? 'index.html' : `${route.slice(1)}.html`
        const filePath = join(distDir, routePath)

        // Ensure directory exists
        mkdirSync(dirname(filePath), { recursive: true })

        // Start with a fresh copy of the template
        let finalHtml = template

        // Inject data script for hydration
        if (dataScript) {
            finalHtml = finalHtml.replace('</head>', `${dataScript}\n</head>`);
        }

        // Inject head tags from react-helmet
        if (headTags && headTags.trim()) {
            // Remove default title and metas
            finalHtml = finalHtml.replace(/<title[^>]*>.*?<\/title>/gi, '')
            finalHtml = finalHtml.replace(/<meta[^>]*name=["']description["'][^>]*>/gi, '')
            finalHtml = finalHtml.replace(/<meta[^>]*property=["']og:[^"']*["'][^>]*>/gi, '')
            finalHtml = finalHtml.replace(/<meta[^>]*name=["']twitter:[^"']*["'][^>]*>/gi, '')
            finalHtml = finalHtml.replace(/<link[^>]*rel=["']canonical["'][^>]*>/gi, '')

            if (finalHtml.includes('</head>')) {
                const indentedHeadTags = headTags.split('\n').map(line => `    ${line.trim()}`).join('\n')
                finalHtml = finalHtml.replace('</head>', `${indentedHeadTags}\n</head>`)
            }
        }

        // ✅ FIX: Remove duplicate Layout components from SSG output
        // This prevents social media crawlers from seeing duplicate content
        let processedHtml = html;

        // Look for duplicate Layout wrapper divs (div.relative.bg-white.text-gray-900)
        // Count occurrences of the Layout wrapper pattern
        const layoutWrapperPattern = /<div[^>]*class="[^"]*relative[^"]*bg-white[^"]*text-gray-900[^"]*"[^>]*>/gi;
        const layoutMatches = processedHtml.match(layoutWrapperPattern);

        if (layoutMatches && layoutMatches.length > 1) {
            console.warn(`[react-ssg] ⚠️ Found ${layoutMatches.length} duplicate Layout components in ${route}, cleaning up...`);

            // Strategy: Find the root container and ensure only one Layout wrapper exists
            // The Layout component wraps everything, so we should only have one at the root level
            // If we find multiple, keep only the first one and remove nested duplicates

            // Find the first Layout wrapper and its closing tag
            const firstLayoutIndex = processedHtml.search(layoutWrapperPattern);
            if (firstLayoutIndex !== -1) {
                // Extract the part before the first Layout
                const beforeFirst = processedHtml.substring(0, firstLayoutIndex);

                // Find the matching closing div for the first Layout
                // We need to track div depth to find the correct closing tag
                let afterFirst = processedHtml.substring(firstLayoutIndex);
                let depth = 0;
                let firstLayoutEnd = -1;
                let inFirstLayout = false;

                for (let i = 0; i < afterFirst.length; i++) {
                    const remaining = afterFirst.substring(i);
                    if (remaining.match(/^<div[^>]*>/)) {
                        depth++;
                        if (!inFirstLayout) inFirstLayout = true;
                    } else if (remaining.match(/^<\/div>/)) {
                        depth--;
                        if (depth === 0 && inFirstLayout) {
                            firstLayoutEnd = i + 6; // +6 for '</div>'
                            break;
                        }
                    }
                }

                if (firstLayoutEnd !== -1) {
                    // Extract the first Layout component (keep it)
                    const firstLayout = afterFirst.substring(0, firstLayoutEnd);
                    // Get everything after the first Layout
                    const afterFirstLayout = afterFirst.substring(firstLayoutEnd);

                    // Remove any remaining Layout wrappers from the content after the first Layout
                    // This handles nested duplicates
                    const cleanedAfter = afterFirstLayout.replace(layoutWrapperPattern, '');

                    // Reconstruct HTML with only one Layout
                    processedHtml = beforeFirst + firstLayout + cleanedAfter;

                    console.log(`[react-ssg] ✅ Cleaned up duplicate Layout components from ${route}`);
                } else {
                    console.warn(`[react-ssg] ⚠️ Could not find closing tag for first Layout in ${route}, skipping cleanup`);
                }
            }
        }

        // Replace the root div with processed content
        // Handle both empty root div and root div with existing content
        // First, try to match empty root div (most common case)
        if (finalHtml.includes('<div id="root"></div>')) {
            finalHtml = finalHtml.replace(
                '<div id="root"></div>',
                `<div id="root" data-server-rendered="true">${processedHtml}</div>`
            )
        } else {
            // If root div has content, replace it entirely
            // Match: <div id="root"[^>]*>[\s\S]*?</div> (non-greedy to match first closing tag)
            const rootDivRegex = /<div id="root"[^>]*>[\s\S]*?<\/div>/
            if (rootDivRegex.test(finalHtml)) {
                finalHtml = finalHtml.replace(
                    rootDivRegex,
                    `<div id="root" data-server-rendered="true">${processedHtml}</div>`
                )
            } else {
                // Fallback: try to find root div with any attributes
                finalHtml = finalHtml.replace(
                    /<div[^>]*id=["']root["'][^>]*>[\s\S]*?<\/div>/,
                    `<div id="root" data-server-rendered="true">${processedHtml}</div>`
                )
            }
        }

        // Remove the seo-content div (hidden SEO content - no longer needed with SSR)
        const finalHtmlWithoutSeoContent = finalHtml.replace(
            /<div id="seo-content"[^>]*>[\s\S]*?<\/div>/gi,
            ''
        )

        // Remove empty CSS rulesets (fixes linter warnings)
        // Process <style> tags to remove empty rulesets like: selector { }
        const finalHtmlWithoutEmptyCSS = finalHtmlWithoutSeoContent.replace(
            /(<style[^>]*>)([\s\S]*?)(<\/style>)/gi,
            (match, openTag, cssContent, closeTag) => {
                // Remove empty CSS rulesets: selector { } or { }
                const cleanedCSS = cssContent.replace(/[^{}\n]*\{\s*\}/g, '').replace(/\n{3,}/g, '\n\n')
                return openTag + cleanedCSS + closeTag
            }
        )

        // Add canonical tag
        const finalHtmlWithCanonical = addCanonicalTag(finalHtmlWithoutEmptyCSS, route)
        writeFileSync(filePath, finalHtmlWithCanonical, 'utf-8')
        console.log(`[react-ssg] Generated: ${routePath}`)
    } catch (error) {
        console.error(`[react-ssg] Error generating ${route}:`, error)
    }
}

console.log('[react-ssg] Static site generation complete!')

// Add canonical tag to 404.html (static file, not in routes)
const error404Path = join(distDir, '404.html')
if (existsSync(error404Path)) {
    let error404Html = readFileSync(error404Path, 'utf-8')

    // Check if canonical tag already exists
    if (!error404Html.includes('rel="canonical"')) {
        // For 404 pages, canonical should point to homepage (404s shouldn't be indexed)
        error404Html = error404Html.replace(
            '</head>',
            `  <link rel="canonical" href="https://atandra.in/" />\n</head>`
        )
        writeFileSync(error404Path, error404Html, 'utf-8')
        console.log('[react-ssg] Added canonical tag to 404.html')
    }
}

// Also fix ssr/404.html (optional - not deployed but for consistency)
const ssr404Path = join(distDir, 'ssr', '404.html')
if (existsSync(ssr404Path)) {
    let ssr404Html = readFileSync(ssr404Path, 'utf-8')
    if (!ssr404Html.includes('rel="canonical"')) {
        ssr404Html = ssr404Html.replace(
            '</head>',
            `  <link rel="canonical" href="https://atandra.in/" />\n</head>`
        )
        writeFileSync(ssr404Path, ssr404Html, 'utf-8')
        console.log('[react-ssg] Added canonical tag to ssr/404.html')
    }
}

