import { renderToString } from 'react-dom/server'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'

// Store route during SSG build process
if (import.meta.env.SSR) {
  (globalThis as any).__SSG_ROUTE__ = (globalThis as any).__SSG_ROUTE__ || '/';
}

// Root component wrapper
const Root = ({ location }: { location?: string }) => (
  <HelmetProvider>
    <App location={location} />
  </HelmetProvider>
)

// SSR render function for vite-ssg
export async function render(url: string) {
  const html = renderToString(<Root location={url} />)
  return html
}

// Client-side hydration
if (typeof window !== 'undefined') {
  // Prevent double execution
  if (!(window as any).__REACT_ROOT_MOUNTED) {
    const container = document.getElementById('root')
    if (container) {
      const location = (globalThis as any).__SSG_ROUTE__ || window.location.pathname
      const isPrerendered = container.hasAttribute('data-server-rendered')

        // Mark as mounted immediately to prevent double execution
        ; (window as any).__REACT_ROOT_MOUNTED = true

      // Check for duplicate Layout components (hydration mismatch fix)
      if (isPrerendered) {
        // Look for duplicate Layout wrapper divs - check multiple possible selectors
        const layoutDivs = container.querySelectorAll('div.relative.bg-white.text-gray-900.font-sans, div.relative.bg-white.text-gray-900, div.relative.bg-white')

        console.log(`[main.tsx] Pre-hydration check - found ${layoutDivs.length} Layout divs in container`)
        console.log(`[main.tsx] Container children count: ${container.children.length}`)

        if (layoutDivs.length > 1) {
          // Clear ALL content and re-render to prevent duplicates
          console.warn(`[main.tsx] ⚠️ Found ${layoutDivs.length} duplicate Layout components, clearing container and re-rendering...`)
          container.innerHTML = ''
          container.setAttribute('data-server-rendered', 'true')
          // Use createRoot instead of hydrateRoot since we cleared the content
          const root = createRoot(container)
          root.render(<Root location={location} />)
        } else {
          // Normal hydration
          try {
            hydrateRoot(container, <Root location={location} />)

            // Check again after hydration in case duplicates were created during hydration
            setTimeout(() => {
              const postHydrationLayouts = container.querySelectorAll('div.relative.bg-white.text-gray-900.font-sans, div.relative.bg-white.text-gray-900, div.relative.bg-white')
              console.log(`[main.tsx] Post-hydration check - found ${postHydrationLayouts.length} Layout divs`)
              if (postHydrationLayouts.length > 1) {
                console.warn(`[main.tsx] ⚠️ Found ${postHydrationLayouts.length} Layout components AFTER hydration, removing duplicates...`)
                // Remove all but the first one
                for (let i = postHydrationLayouts.length - 1; i > 0; i--) {
                  console.log(`[main.tsx] Removing duplicate Layout #${i + 1}`)
                  postHydrationLayouts[i].remove()
                }
              }
            }, 100)
          } catch (error) {
            // If hydration fails, clear and re-render
            console.warn('[main.tsx] Hydration failed, clearing and re-rendering:', error)
            container.innerHTML = ''
            const root = createRoot(container)
            root.render(<Root location={location} />)
          }
        }
      } else {
        const root = createRoot(container)
        root.render(<Root location={location} />)
      }
    }
  } else {
    console.warn('[main.tsx] React root already mounted, skipping...')
  }
}
