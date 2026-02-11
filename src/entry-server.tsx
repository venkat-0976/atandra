// src/entry-server.tsx
// Server-side entry point for SSG

import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'

export async function render(url: string) {
    console.log(`[SSR] Rendering route: ${url}`)

    // Normalize the URL to ensure proper route matching
    // Ensure we have a leading slash and no trailing slash (except for root)
    let normalizedUrl = url.trim()
    if (!normalizedUrl.startsWith('/')) {
        normalizedUrl = '/' + normalizedUrl
    }
    if (normalizedUrl !== '/' && normalizedUrl.endsWith('/')) {
        normalizedUrl = normalizedUrl.slice(0, -1)
    }

    console.log(`[SSR] Normalized URL: "${normalizedUrl}"`)

    try {
        // Create helmet context to extract meta tags
        // react-helmet-async requires an object that it will populate
        const helmetContext: { helmet?: any } = {}

        // Render the app with HelmetProvider
        let html = '';
        try {
            html = renderToString(
                <HelmetProvider context={helmetContext}>
                    <App location={normalizedUrl} />
                </HelmetProvider>
            );
        } catch (renderError: any) {
            console.error(`[SSR] ❌ Error during renderToString for ${normalizedUrl}:`, renderError);
            console.error(`[SSR] Error stack:`, renderError?.stack);
            console.error(`[SSR] Error message:`, renderError?.message);

            // Try to render error fallback
            try {
                html = renderToString(
                    <HelmetProvider context={helmetContext}>
                        <div>
                            <h1>SSR Error</h1>
                            <p>Route: {normalizedUrl}</p>
                            <p>Error: {renderError?.message || 'Unknown error'}</p>
                        </div>
                    </HelmetProvider>
                );
            } catch (fallbackError) {
                console.error(`[SSR] ❌ Fallback render also failed:`, fallbackError);
                html = '<div>SSR Error</div>';
            }
        }

        // Extract head tags from helmet
        // react-helmet-async v2 populates helmetContext.helmet after renderToString
        // The context object is mutated by HelmetProvider during render
        // Debug: Check what's actually in the context
        console.log(`[SSR] Context after render:`, Object.keys(helmetContext))
        console.log(`[SSR] Context.helmet exists:`, !!helmetContext.helmet)

        const helmet = helmetContext.helmet

        // Build head tags string with proper formatting
        let headTags = ''
        if (helmet) {
            console.log(`[SSR] ✅ Helmet object found with keys:`, Object.keys(helmet))
            const parts: string[] = []

            // Extract each type of tag - use toComponentArray() for more reliable extraction
            try {
                if (helmet.title) {
                    const titleStr = helmet.title.toString()
                    // Remove data-rh attribute if present (react-helmet internal attribute)
                    const cleanTitle = titleStr.replace(/\s+data-rh="[^"]*"/g, '').trim()
                    if (cleanTitle && cleanTitle !== '<title></title>') {
                        parts.push(cleanTitle)
                    }
                }
                if (helmet.meta) {
                    const metaStr = helmet.meta.toString()
                    // Remove data-rh attributes
                    const cleanMeta = metaStr.replace(/\s+data-rh="[^"]*"/g, '').trim()
                    if (cleanMeta && cleanMeta.trim()) {
                        parts.push(cleanMeta)
                    }
                }
                if (helmet.link) {
                    const linkStr = helmet.link.toString()
                    const cleanLink = linkStr.replace(/\s+data-rh="[^"]*"/g, '').trim()
                    if (cleanLink && cleanLink.trim()) {
                        parts.push(cleanLink)
                    }
                }
                if (helmet.script) {
                    const scriptStr = helmet.script.toString()
                    const cleanScript = scriptStr.replace(/\s+data-rh="[^"]*"/g, '').trim()
                    if (cleanScript && cleanScript.trim()) {
                        parts.push(cleanScript)
                    }
                }
                if (helmet.style) {
                    const styleStr = helmet.style.toString()
                    const cleanStyle = styleStr.replace(/\s+data-rh="[^"]*"/g, '').trim()
                    if (cleanStyle && cleanStyle.trim()) {
                        parts.push(cleanStyle)
                    }
                }
            } catch (error) {
                console.error(`[SSR] Error extracting helmet tags:`, error)
            }

            headTags = parts.join('\n    ').trim()
        } else {
            // Debug: log the entire context to see what's available
            console.warn(`[SSR] ⚠️ Helmet context structure:`, Object.keys(helmetContext))
            console.warn(`[SSR] ⚠️ Helmet context full:`, JSON.stringify(helmetContext, null, 2))
        }

        console.log(`[SSR] Rendered HTML length: ${html.length} characters`)
        console.log(`[SSR] Head tags length: ${headTags.length} characters`)

        // Debug helmet extraction with more details
        if (helmet) {
            const titleStr = helmet.title?.toString() || ''
            const metaStr = helmet.meta?.toString() || ''
            const linkStr = helmet.link?.toString() || ''

            console.log(`[SSR] Helmet found - Title: ${titleStr || 'MISSING'}`)
            console.log(`[SSR] Helmet meta tags: ${metaStr.match(/<meta/g)?.length || 0}`)
            console.log(`[SSR] Helmet link tags: ${linkStr.match(/<link/g)?.length || 0}`)

            // Log raw helmet data for debugging
            if (!titleStr || titleStr.includes('<title></title>') || titleStr.includes('data-rh="true"></title>')) {
                console.warn(`[SSR] ⚠️ Title is empty or invalid: "${titleStr}"`)
                console.warn(`[SSR] ⚠️ Helmet object keys:`, Object.keys(helmet))
            }
        } else {
            console.warn(`[SSR] ⚠️ Warning: Helmet context is empty! No meta tags will be extracted.`)
            console.warn(`[SSR] ⚠️ Context keys:`, Object.keys(helmetContext))
        }

        // Check if we got meaningful content
        if (html.length < 500) {
            console.warn(`[SSR] Warning: HTML output is very short (${html.length} chars). Route might not be matching.`)
            console.log(`[SSR] HTML preview (first 1000 chars): ${html.substring(0, 1000)}...`)
        } else {
            // Log a snippet to verify content is being rendered
            const preview = html.substring(0, 200).replace(/\s+/g, ' ')
            console.log(`[SSR] HTML preview: ${preview}...`)
        }

        // Return both body HTML and head tags
        return { html, headTags }
    } catch (error) {
        console.error(`[SSR] Error rendering route ${normalizedUrl}:`, error)
        throw error
    }
}

