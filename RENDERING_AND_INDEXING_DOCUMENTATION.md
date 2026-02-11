# Complete Documentation: Indexing, Client-Side Rendering, and Server-Side Rendering

## Table of Contents
1. [Overview](#overview)
2. [Architecture Overview](#architecture-overview)
3. [Indexing Explained](#indexing-explained)
4. [Client-Side Rendering (CSR)](#client-side-rendering-csr)
5. [Server-Side Rendering (SSR) / Static Site Generation (SSG)](#server-side-rendering-ssr--static-site-generation-ssg)
6. [Data Flow and Fetching](#data-flow-and-fetching)
7. [File Structure and Responsibilities](#file-structure-and-responsibilities)
8. [Complete Workflow](#complete-workflow)
9. [Uses and Benefits](#uses-and-benefits)
10. [How Search Engines and Social Media Crawl](#how-search-engines-and-social-media-crawl)
11. [Example HTML File](#example-html-file)

---

## Overview

This website uses a **hybrid rendering approach** combining:
- **Static Site Generation (SSG)** - Pre-rendered HTML files for SEO and performance
- **Client-Side Rendering (CSR)** - Interactive React components for dynamic user experience
- **Hydration** - React takes over the pre-rendered HTML for interactivity

This architecture ensures:
- ✅ **SEO-friendly** - Search engines can read full HTML content
- ✅ **Fast initial load** - Pre-rendered HTML loads immediately
- ✅ **Interactive** - React adds interactivity after hydration
- ✅ **Social media ready** - Open Graph tags for rich previews

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    BUILD TIME (SSG)                          │
├─────────────────────────────────────────────────────────────┤
│  1. Vite builds React app                                    │
│  2. SSR bundle created (entry-server.tsx)                    │
│  3. generate-ssg.mjs renders each route                      │
│  4. Static HTML files generated in /dist                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  DEPLOYMENT (Firebase)                        │
├─────────────────────────────────────────────────────────────┤
│  Static HTML files served from CDN                           │
│  Each route has its own .html file                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│              USER REQUEST / CRAWLER REQUEST                   │
├─────────────────────────────────────────────────────────────┤
│  Browser/Crawler requests: /protect/ups/product/eh-11-series  │
│  Server returns: eh-11-series.html (pre-rendered)             │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    CLIENT-SIDE (Browser)                      │
├─────────────────────────────────────────────────────────────┤
│  1. HTML loads instantly (pre-rendered content)             │
│  2. React JavaScript loads                                    │
│  3. React hydrates the HTML (adds interactivity)             │
│  4. User can now interact with the page                      │
└─────────────────────────────────────────────────────────────┘
```

---

## Indexing Explained

### What is Indexing?

**Indexing** is the process by which search engines (Google, Bing, etc.) and social media platforms (Facebook, Twitter, LinkedIn) discover, read, and store information about your web pages in their databases.

### How Indexing Works

1. **Discovery**: Search engines find your pages through:
   - Sitemap (`sitemap.xml`)
   - Links from other pages
   - Manual submission

2. **Crawling**: Bots visit your pages and download the HTML

3. **Parsing**: They extract:
   - Title tags
   - Meta descriptions
   - Open Graph tags (for social media)
   - Structured data (JSON-LD)
   - Content (text, headings, links)

4. **Storage**: Information is stored in their index/database

5. **Ranking**: Pages are ranked based on relevance and quality

### Why Static HTML is Critical

**Search engines and social media bots DO NOT execute JavaScript** (or execute it very limitedly). They need:
- ✅ **Static HTML** with content already rendered
- ✅ **Meta tags** in the `<head>` section
- ✅ **Structured data** (JSON-LD) for rich results

**Without SSG**, crawlers would see:
```html
<div id="root"></div>  <!-- Empty! No content! -->
```

**With SSG**, crawlers see:
```html
<div id="root" data-server-rendered="true">
  <h1>EH-11 Series 6–10 kVA Online UPS</h1>
  <p>Complete product information...</p>
  <!-- Full content visible! -->
</div>
```

---

## Client-Side Rendering (CSR)

### What is CSR?

**Client-Side Rendering** means the browser downloads a minimal HTML file and JavaScript, then JavaScript runs in the browser to generate the page content.

### How CSR Works in This Project

1. **Initial Load**:
   ```html
   <div id="root"></div>
   <script src="/assets/index-xxx.js"></script>
   ```

2. **JavaScript Execution**:
   - React app loads
   - Router determines current route
   - Components render
   - Content appears on screen

3. **Navigation**:
   - User clicks a link
   - JavaScript intercepts (no page reload)
   - React Router updates the URL
   - New component renders
   - Content updates instantly

### CSR Files

- **`src/main.tsx`**: Entry point for client-side React
- **`src/App.tsx`**: Main app component with routes
- **`src/components/Router.tsx`**: Uses `BrowserRouter` for client-side routing
- **`dist/assets/index-xxx.js`**: Compiled React bundle

### CSR Flow

```
User Request → Empty HTML → JavaScript Loads → React Renders → Content Appears
```

**Pros:**
- ✅ Fast navigation (no page reloads)
- ✅ Smooth user experience
- ✅ Interactive immediately after load

**Cons:**
- ❌ Slow initial load (must wait for JS)
- ❌ SEO issues (crawlers see empty HTML)
- ❌ Social media previews don't work

---

## Server-Side Rendering (SSR) / Static Site Generation (SSG)

### What is SSG?

**Static Site Generation** is a form of SSR where pages are pre-rendered at **build time** (not request time). Each route becomes a static HTML file.

### How SSG Works in This Project

#### Build Process

1. **Vite Build** (`npm run build`):
   ```bash
   vite build                    # Builds client bundle
   vite build --ssr entry-server.tsx  # Builds SSR bundle
   ```

2. **SSG Generation** (`scripts/generate-ssg.mjs`):
   - Reads routes from `src/routes.ts` (101 routes)
   - For each route:
     - Calls `render()` from `entry-server.tsx`
     - Gets HTML + meta tags
     - Injects into template
     - Saves as `.html` file

3. **Output**:
   ```
   dist/
   ├── index.html
   ├── protect/
   │   └── ups/
   │       └── product/
   │           └── eh-11-series.html  ← Pre-rendered!
   └── ...
   ```

### SSG Files

- **`src/entry-server.tsx`**: Server-side render function
- **`scripts/generate-ssg.mjs`**: Post-build script that generates HTML files
- **`src/components/Router.tsx`**: Uses `StaticRouter` during SSR
- **`vite-plugin-react-ssg.ts`**: Vite plugin configuration

### SSG Flow

```
Build Time:
  Route List → render() → HTML + Meta Tags → Save as .html file

Request Time:
  User Request → Server returns pre-rendered .html → Instant content!
```

**Pros:**
- ✅ Instant content (HTML already rendered)
- ✅ Perfect SEO (crawlers see full HTML)
- ✅ Social media previews work
- ✅ Fast initial load

**Cons:**
- ❌ Build time increases (must render all pages)
- ❌ Not suitable for highly dynamic content

---

## Data Flow and Fetching

### Where Data Comes From

#### 1. **Static Data (Embedded in Components)**

Most product data is **hardcoded** in React components:

**Example**: `src/pages/protect/productpages/EH11SeriesUPS.tsx`
```typescript
const productData = {
  model: "EH-11 Series",
  description: "6 kVA & 10 kVA online UPS...",
  features: ["Double conversion", "LCD display", ...],
  // ... more static data
}
```

**Why?**
- Product information doesn't change frequently
- No API calls needed
- Fast rendering
- Works during SSR

#### 2. **Dynamic Data (Firebase)**

Some data is fetched from Firebase:

**Example**: `src/pages/admin/PopupManager.tsx`
```typescript
useEffect(() => {
  const fetchPopups = async () => {
    const popupsRef = dbRef(rtdb, 'popups');
    const snapshot = await get(popupsRef);
    // Process data...
  };
  fetchPopups();
}, []);
```

**Why?**
- Admin-managed content (popups, events)
- Changes frequently
- Only needed client-side

#### 3. **SEO Data (React Helmet)**

Meta tags are managed via `react-helmet-async`:

**Example**: `src/pages/protect/productpages/EH11SeriesUPS.tsx`
```typescript
<SeoHead
  title="EH-11 Series 6–10 kVA Online UPS"
  description="EH-11 Series 6 kVA & 10 kVA online UPS..."
  canonical="https://atandra.in/protect/ups/product/eh-11-series"
  ogImage="/UPS/SB4_-_2-removebg-preview.png"
  jsonLd={productSchema}
/>
```

**How it works:**
- During SSR: Helmet extracts tags → injected into HTML
- During CSR: Helmet updates `<head>` dynamically

### Data Flow Diagram

```
┌─────────────────────────────────────────────────┐
│           STATIC DATA (Build Time)               │
├─────────────────────────────────────────────────┤
│  Component Code → Embedded in JSX                │
│  Example: Product specs, features, descriptions │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│         SSR RENDERING (Build Time)               │
├─────────────────────────────────────────────────┤
│  Static Data → React Components → HTML String   │
│  Helmet extracts meta tags                       │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│         HTML FILE GENERATION                     │
├─────────────────────────────────────────────────┤
│  HTML + Meta Tags → Template Injection           │
│  → Saved as .html file                           │
└─────────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────────┐
│         DYNAMIC DATA (Runtime)                   │
├─────────────────────────────────────────────────┤
│  Firebase → useEffect → Component State          │
│  Example: Popups, events, user submissions      │
└─────────────────────────────────────────────────┘
```

---

## File Structure and Responsibilities

### Core Rendering Files

#### 1. **`src/main.tsx`**
**Purpose**: Client-side entry point
**Responsibilities**:
- Hydrates pre-rendered HTML
- Handles duplicate Layout component detection
- Manages React root mounting

**Key Code**:
```typescript
if (isPrerendered) {
  hydrateRoot(container, <Root location={location} />)
} else {
  createRoot(container).render(<Root location={location} />)
}
```

#### 2. **`src/entry-server.tsx`**
**Purpose**: Server-side rendering function
**Responsibilities**:
- Renders React components to HTML string
- Extracts meta tags from React Helmet
- Returns HTML + head tags

**Key Code**:
```typescript
export async function render(url: string) {
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <App location={normalizedUrl} />
    </HelmetProvider>
  );
  const headTags = helmet.title.toString() + helmet.meta.toString() + ...
  return { html, headTags };
}
```

#### 3. **`src/App.tsx`**
**Purpose**: Main application component
**Responsibilities**:
- Defines all routes
- Wraps app with providers (QueryClient, Auth, etc.)
- Handles routing logic

**Key Code**:
```typescript
<Routes>
  <Route path="/" element={<NewLandingPage />} />
  <Route path="/protect/ups/product/eh-11-series" element={<EH11SeriesUPS />} />
  {/* ... 100+ routes ... */}
</Routes>
```

#### 4. **`src/components/Router.tsx`**
**Purpose**: Router wrapper that switches between SSR and CSR
**Responsibilities**:
- Uses `StaticRouter` during SSR (build time)
- Uses `BrowserRouter` during CSR (runtime)

**Key Code**:
```typescript
if (typeof window !== 'undefined') {
  return <BrowserRouter>{children}</BrowserRouter>;
}
return <StaticRouter location={location}>{children}</StaticRouter>;
```

#### 5. **`scripts/generate-ssg.mjs`**
**Purpose**: Post-build script that generates static HTML files
**Responsibilities**:
- Reads routes from `src/routes.ts`
- Calls `render()` for each route
- Injects HTML and meta tags into template
- Saves as `.html` files

**Key Code**:
```javascript
for (const route of routes) {
  const result = await render(route);
  const html = result.html;
  const headTags = result.headTags;
  
  // Inject into template
  finalHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root" data-server-rendered="true">${html}</div>`
  );
  finalHtml = finalHtml.replace('</head>', `${headTags}\n</head>`);
  
  // Save file
  writeFileSync(filePath, finalHtml);
}
```

### SEO Files

#### 6. **`src/seo/SeoHead.tsx`**
**Purpose**: Component for managing SEO meta tags
**Responsibilities**:
- Sets title, description, keywords
- Adds Open Graph tags (Facebook, LinkedIn)
- Adds Twitter Card tags
- Adds canonical URL
- Adds JSON-LD structured data

**Key Code**:
```typescript
<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta property="og:title" content={title} />
  <meta property="og:image" content={absoluteOgImage} />
  <link rel="canonical" href={canonical} />
  <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
</Helmet>
```

#### 7. **`src/routes.ts`**
**Purpose**: List of all routes to pre-render
**Responsibilities**:
- Defines 101 routes for SSG
- Used by `generate-ssg.mjs` to generate HTML files

#### 8. **`seo/pages.json`**
**Purpose**: Sitemap data
**Responsibilities**:
- Contains all URLs with metadata
- Used to generate `sitemap.xml`
- Includes lastmod, changefreq, priority

### Configuration Files

#### 9. **`vite.config.ts`**
**Purpose**: Vite build configuration
**Responsibilities**:
- Configures React plugin
- Sets up SSG plugin
- Configures SSR settings

#### 10. **`firebase.json`**
**Purpose**: Firebase hosting configuration
**Responsibilities**:
- Sets public directory (`dist`)
- Configures redirects and rewrites
- Sets cache headers

---

## Complete Workflow

### Build Workflow

```
1. npm run build
   │
   ├─→ vite build
   │   ├─→ Bundles React app → dist/assets/index-xxx.js
   │   ├─→ Bundles CSS → dist/assets/index-xxx.css
   │   └─→ Creates dist/index.html template
   │
   ├─→ vite build --ssr src/entry-server.tsx
   │   └─→ Creates dist/ssr/entry-server.js (SSR bundle)
   │
   └─→ node scripts/generate-ssg.mjs
       ├─→ Reads routes from src/routes.ts (101 routes)
       ├─→ For each route:
       │   ├─→ Imports render() from SSR bundle
       │   ├─→ Calls render('/protect/ups/product/eh-11-series')
       │   ├─→ Gets HTML + meta tags
       │   ├─→ Injects into dist/index.html template
       │   └─→ Saves as dist/protect/ups/product/eh-11-series.html
       └─→ Generates 101 HTML files
```

### Request Workflow

#### User Visits: `/protect/ups/product/eh-11-series`

```
1. Browser Request
   GET /protect/ups/product/eh-11-series
   │
   ↓
2. Firebase Hosting
   Checks: Does eh-11-series.html exist? ✅
   Returns: Pre-rendered HTML file
   │
   ↓
3. Browser Receives HTML
   <html>
     <head>
       <title>EH-11 Series...</title>
       <meta name="description" content="..."/>
       <meta property="og:title" content="..."/>
       <!-- Full meta tags! -->
     </head>
     <body>
       <div id="root" data-server-rendered="true">
         <h1>EH-11 Series...</h1>
         <!-- Full content already rendered! -->
       </div>
       <script src="/assets/index-xxx.js"></script>
     </body>
   </html>
   │
   ↓
4. Browser Renders HTML
   ✅ User sees content immediately!
   │
   ↓
5. JavaScript Loads
   React app starts
   │
   ↓
6. React Hydration
   React reads pre-rendered HTML
   Attaches event listeners
   Makes page interactive
   │
   ↓
7. Dynamic Data Fetching (if needed)
   useEffect() → Firebase → Update state
   │
   ↓
8. Page Fully Interactive
   ✅ User can click buttons, navigate, etc.
```

#### Search Engine Crawls: `/protect/ups/product/eh-11-series`

```
1. Googlebot Request
   GET /protect/ups/product/eh-11-series
   │
   ↓
2. Firebase Hosting
   Returns: Pre-rendered HTML file
   │
   ↓
3. Googlebot Receives HTML
   <html>
     <head>
       <title>EH-11 Series...</title>
       <meta name="description" content="..."/>
       <!-- All meta tags present! -->
     </head>
     <body>
       <div id="root" data-server-rendered="true">
         <h1>EH-11 Series...</h1>
         <!-- Full content visible! -->
       </div>
   </html>
   │
   ↓
4. Googlebot Parses HTML
   ✅ Extracts title: "EH-11 Series..."
   ✅ Extracts description: "..."
   ✅ Extracts content: "Full product information..."
   ✅ Extracts structured data (JSON-LD)
   │
   ↓
5. Googlebot Indexes
   Stores in Google's database
   Page appears in search results!
```

---

## Uses and Benefits

### Client-Side Rendering (CSR) Uses

1. **Interactive Features**
   - Forms, buttons, dropdowns
   - Real-time updates
   - Smooth navigation (no page reloads)

2. **Dynamic Content**
   - User-specific data
   - Real-time notifications
   - Chat functionality

3. **Progressive Enhancement**
   - Works even if JavaScript fails
   - Can add features incrementally

### Server-Side Rendering (SSG) Uses

1. **SEO Optimization**
   - Search engines can read full content
   - Meta tags are present in HTML
   - Structured data is embedded

2. **Social Media Sharing**
   - Open Graph tags for rich previews
   - Twitter Cards for better appearance
   - LinkedIn previews work correctly

3. **Performance**
   - Instant content (no waiting for JS)
   - Better Core Web Vitals scores
   - Faster Time to First Byte (TTFB)

4. **Accessibility**
   - Content available without JavaScript
   - Screen readers can access content immediately

### Hybrid Approach Benefits

✅ **Best of Both Worlds**:
- SEO-friendly (SSG)
- Interactive (CSR)
- Fast initial load (SSG)
- Smooth navigation (CSR)

---

## How Search Engines and Social Media Crawl

### Google Crawling Process

#### 1. **Discovery**
Google finds your pages through:
- **Sitemap**: `https://atandra.in/sitemap.xml`
- **Internal links**: Following links from other pages
- **External links**: Links from other websites

#### 2. **Crawling**
Googlebot requests your pages:
```http
GET /protect/ups/product/eh-11-series HTTP/1.1
Host: atandra.in
User-Agent: Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)
```

#### 3. **Rendering**
Googlebot receives the HTML:
```html
<!doctype html>
<html lang="en">
<head>
    <title>EH-11 Series 6–10 kVA Online UPS for SMBs</title>
    <meta name="description" content="EH-11 Series 6 kVA & 10 kVA online UPS..."/>
    <!-- ✅ Full meta tags present! -->
</head>
<body>
    <div id="root" data-server-rendered="true">
        <h1>EH-11 Series...</h1>
        <!-- ✅ Full content visible! -->
    </div>
</body>
</html>
```

#### 4. **Parsing**
Googlebot extracts:
- **Title**: From `<title>` tag
- **Description**: From `<meta name="description">`
- **Content**: From `<body>` (headings, paragraphs, links)
- **Structured Data**: From `<script type="application/ld+json">`
- **Images**: From `<img>` tags

#### 5. **Indexing**
Stores in Google's database:
```
URL: https://atandra.in/protect/ups/product/eh-11-series
Title: EH-11 Series 6–10 kVA Online UPS for SMBs
Description: EH-11 Series 6 kVA & 10 kVA online UPS...
Content: [Full page content]
Structured Data: Product schema
```

#### 6. **Ranking**
Google ranks pages based on:
- Relevance to search queries
- Content quality
- User experience signals
- Backlinks

### Social Media Crawling Process

#### Facebook/LinkedIn (Open Graph)

1. **User Shares Link**
   ```
   User shares: https://atandra.in/protect/ups/product/eh-11-series
   ```

2. **Facebook Crawler Requests**
   ```http
   GET /protect/ups/product/eh-11-series HTTP/1.1
   User-Agent: facebookexternalhit/1.1
   ```

3. **Crawler Receives HTML**
   ```html
   <head>
       <meta property="og:title" content="EH-11 Series 6–10 kVA Online UPS"/>
       <meta property="og:description" content="EH-11 Series 6 kVA & 10 kVA..."/>
       <meta property="og:image" content="https://atandra.in/UPS/SB4_-_2-removebg-preview.png"/>
       <meta property="og:url" content="https://atandra.in/protect/ups/product/eh-11-series"/>
   </head>
   ```

4. **Rich Preview Generated**
   ```
   ┌─────────────────────────────────┐
   │ [Image] EH-11 Series 6–10 kVA... │
   │ EH-11 Series 6 kVA & 10 kVA...  │
   │ atandra.in                      │
   └─────────────────────────────────┘
   ```

#### Twitter (Twitter Cards)

1. **User Tweets Link**
   ```
   User tweets: Check out this UPS: https://atandra.in/protect/ups/product/eh-11-series
   ```

2. **Twitter Crawler Requests**
   ```http
   GET /protect/ups/product/eh-11-series HTTP/1.1
   User-Agent: Twitterbot/1.0
   ```

3. **Crawler Receives HTML**
   ```html
   <head>
       <meta name="twitter:card" content="summary_large_image"/>
       <meta name="twitter:title" content="EH-11 Series 6–10 kVA Online UPS"/>
       <meta name="twitter:description" content="EH-11 Series 6 kVA & 10 kVA..."/>
       <meta name="twitter:image" content="https://atandra.in/UPS/SB4_-_2-removebg-preview.png"/>
   </head>
   ```

4. **Twitter Card Generated**
   ```
   ┌─────────────────────────────────┐
   │ [Large Image]                   │
   │ EH-11 Series 6–10 kVA...        │
   │ EH-11 Series 6 kVA & 10 kVA...  │
   │ atandra.in                      │
   └─────────────────────────────────┘
   ```

### What HTML Files They Read

**All crawlers read the same HTML files** that are generated during build:

```
dist/
├── index.html                          ← Homepage
├── protect/
│   └── ups/
│       └── product/
│           └── eh-11-series.html      ← Product page
├── measure/
│   └── thermal-imagers.html           ← Category page
└── ... (101 HTML files total)
```

**Key Points:**
- ✅ Each route has its own `.html` file
- ✅ All HTML files contain full content (pre-rendered)
- ✅ All HTML files contain meta tags
- ✅ Crawlers don't need to execute JavaScript

---

## Example HTML File

Here's what a generated HTML file looks like (simplified version):

### File: `dist/protect/ups/product/eh-11-series.html`

```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- SEO Meta Tags -->
    <title>EH-11 Series 6–10 kVA Online UPS for SMBs</title>
    <meta name="description" content="EH-11 Series 6 kVA & 10 kVA online UPS with LCD display, smart battery management and energy-efficient performance for small and mid-size businesses."/>
    <meta name="keywords" content="EH-11 series UPS, 6 kVA UPS, 10 kVA UPS, small medium business UPS"/>
    
    <!-- Open Graph Tags (Facebook, LinkedIn) -->
    <meta property="og:type" content="website"/>
    <meta property="og:title" content="EH-11 Series 6–10 kVA Online UPS for SMBs"/>
    <meta property="og:description" content="EH-11 Series 6 kVA & 10 kVA online UPS..."/>
    <meta property="og:image" content="https://atandra.in/UPS/SB4_-_2-removebg-preview.png"/>
    <meta property="og:url" content="https://atandra.in/protect/ups/product/eh-11-series"/>
    
    <!-- Twitter Card Tags -->
    <meta name="twitter:card" content="summary_large_image"/>
    <meta name="twitter:title" content="EH-11 Series 6–10 kVA Online UPS for SMBs"/>
    <meta name="twitter:description" content="EH-11 Series 6 kVA & 10 kVA online UPS..."/>
    <meta name="twitter:image" content="https://atandra.in/UPS/SB4_-_2-removebg-preview.png"/>
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://atandra.in/protect/ups/product/eh-11-series"/>
    
    <!-- Structured Data (JSON-LD) -->
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "EH-11 Series Online UPS",
      "description": "EH-11 Series 6 kVA & 10 kVA online UPS...",
      "brand": {
        "@type": "Brand",
        "name": "KRYKARD"
      },
      "model": "EH-11 Series",
      "image": "https://atandra.in/UPS/SB4_-_2-removebg-preview.png",
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR"
      }
    }
    </script>
    
    <!-- CSS -->
    <link rel="stylesheet" href="/assets/index-B8ejWxnO.css">
</head>
<body>
    <!-- Pre-rendered Content -->
    <div id="root" data-server-rendered="true">
        <div class="relative bg-white text-gray-900 font-sans">
            <!-- Navigation -->
            <header>
                <nav>
                    <a href="/"><img src="/logo.png" alt="KRYKARD"/></a>
                    <!-- Navigation links -->
                </nav>
            </header>
            
            <!-- Main Content -->
            <main>
                <section class="hero-section">
                    <h1>KRYKARD EH 11 SERIES 1/1 UPS</h1>
                    <p>6 kVA & 10 kVA - Compact single-phase UPS solutions...</p>
                </section>
                
                <section>
                    <h2>Key Features & Advantages</h2>
                    <ul>
                        <li>Wide input voltage range (115-280 VAC)</li>
                        <li>Online double conversion with advanced DSP</li>
                        <li>Compact footprint design</li>
                        <!-- More features -->
                    </ul>
                </section>
                
                <section>
                    <h2>Technical Specifications</h2>
                    <!-- Specifications table -->
                </section>
                
                <!-- More sections -->
            </main>
            
            <!-- Footer -->
            <footer>
                <!-- Footer content -->
            </footer>
        </div>
    </div>
    
    <!-- JavaScript (for interactivity) -->
    <script type="module" src="/assets/index-xxx.js"></script>
</body>
</html>
```

### What Crawlers See

When Googlebot or Facebook crawler requests this page, they receive:

1. **Full HTML** with all content pre-rendered ✅
2. **Meta tags** in `<head>` ✅
3. **Structured data** (JSON-LD) ✅
4. **Images** with proper alt text ✅
5. **Links** to other pages ✅

**They don't need to:**
- ❌ Execute JavaScript
- ❌ Wait for API calls
- ❌ Render React components

Everything is already in the HTML!

---

## Summary

### Key Takeaways

1. **Indexing**: Search engines and social media bots read static HTML files, not JavaScript
2. **SSG**: Pages are pre-rendered at build time into static HTML files
3. **CSR**: React hydrates the HTML to add interactivity
4. **Data**: Mostly static (embedded in components), some dynamic (Firebase)
5. **SEO**: Meta tags are injected during SSG build process
6. **Workflow**: Build → Generate HTML → Deploy → Serve → Hydrate

### Files Summary

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client-side entry, hydration |
| `src/entry-server.tsx` | Server-side rendering function |
| `src/App.tsx` | Main app with routes |
| `src/components/Router.tsx` | Router (SSR/CSR switching) |
| `scripts/generate-ssg.mjs` | Generates static HTML files |
| `src/seo/SeoHead.tsx` | SEO meta tags component |
| `src/routes.ts` | List of routes to pre-render |
| `dist/*.html` | Generated static HTML files |

### Benefits

✅ **SEO**: Full HTML content for crawlers  
✅ **Performance**: Instant content, fast navigation  
✅ **Social Media**: Rich previews work  
✅ **User Experience**: Interactive and smooth  
✅ **Accessibility**: Content available without JS  

---

**This hybrid approach ensures your website is both SEO-friendly and highly interactive!**




