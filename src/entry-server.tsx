// src/entry-server.tsx
// Server-side entry point for SSG

import { renderToString } from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'

export async function render(url: string, data: any = null) {
    console.log(`[SSR] Rendering route: ${url}`)

    // Normalize the URL to ensure proper route matching
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
        const helmetContext: { helmet?: any } = {}

        // Render the app with HelmetProvider and pass the data
        let html = '';
        try {
            html = renderToString(
                <HelmetProvider context={helmetContext}>
                    <App location={normalizedUrl} data={data} />
                </HelmetProvider>
            );
        } catch (renderError: any) {
            console.error(`[SSR] ❌ Error during renderToString for ${normalizedUrl}:`, renderError);
            html = renderToString(
                <HelmetProvider context={helmetContext}>
                    <div>
                        <h1>SSR Error</h1>
                        <p>Route: {normalizedUrl}</p>
                        <p>Error: {renderError?.message || 'Unknown error'}</p>
                    </div>
                </HelmetProvider>
            );
        }

        // Extract head tags from helmet
        const helmet = helmetContext.helmet
        let headTags = ''
        if (helmet) {
            const parts: string[] = []
            try {
                if (helmet.title) parts.push(helmet.title.toString().replace(/\s+data-rh="[^"]*"/g, '').trim())
                if (helmet.meta) parts.push(helmet.meta.toString().replace(/\s+data-rh="[^"]*"/g, '').trim())
                if (helmet.link) parts.push(helmet.link.toString().replace(/\s+data-rh="[^"]*"/g, '').trim())
                if (helmet.script) parts.push(helmet.script.toString().replace(/\s+data-rh="[^"]*"/g, '').trim())
                if (helmet.style) parts.push(helmet.style.toString().replace(/\s+data-rh="[^"]*"/g, '').trim())
            } catch (error) {
                console.error(`[SSR] Error extracting helmet tags:`, error)
            }
            headTags = parts.join('\n    ').trim()
        }

        // Inject WordPress data into a script tag for client-side hydration
        let dataScript = '';
        if (data) {
            dataScript = `<script id="__WP_DATA__" type="application/json">${JSON.stringify(data)}</script>`;
        }

        // Return body HTML, head tags, and the data script
        return { html, headTags, dataScript }
    } catch (error) {
        console.error(`[SSR] Error rendering route ${normalizedUrl}:`, error)
        throw error
    }
}


