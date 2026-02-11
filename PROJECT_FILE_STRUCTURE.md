# Project File Structure

**Project:** Atandra Energy Website  
**Stack:** React 18 + Vite 5 + TypeScript + Firebase Hosting  
**Last Updated:** 2025-02-11

---

## Complete Directory Tree

```
Atandrawebsite 25/
│
├── 📄 Configuration Files (Root)
│   ├── .env                          # Environment variables (VITE_* only, not committed)
│   ├── .firebaserc                   # Firebase project: atandra
│   ├── .firebase/                    # Firebase deploy cache (auto-generated)
│   ├── .gitignore                    # Git ignore rules
│   ├── components.json               # Shadcn UI components config
│   ├── firebase.json                 # Firebase Hosting config (redirects, rewrites, headers)
│   ├── index.html                    # Single HTML shell (root entry point)
│   ├── package.json                  # Dependencies and npm scripts
│   ├── package-lock.json             # Locked dependency versions
│   ├── bun.lockb                     # Bun lockfile (if using Bun)
│   ├── postcss.config.js             # PostCSS configuration
│   ├── tailwind.config.ts            # Tailwind CSS configuration
│   ├── tsconfig.json                 # TypeScript base config
│   ├── tsconfig.app.json             # TypeScript app config
│   ├── tsconfig.node.json            # TypeScript Node config
│   ├── vite.config.ts                # Vite build configuration
│   ├── vite-plugin-react-ssg.ts      # Custom SSG plugin
│   └── vite-env.d.ts                 # Vite environment types
│
├── 📁 public/                        # Static assets (copied to dist as-is)
│   ├── robots.txt                    # Crawl rules and sitemap URL
│   ├── sitemap.xml                   # Generated sitemap (from seo/pages.json)
│   ├── 404.html                      # Custom 404 page
│   │
│   ├── 📁 background_images/        # Hero images, logos, favicon, default OG image
│   │   └── [PNG/JPEG files]
│   │
│   ├── 📁 clammeter/                 # Clamp meter product images
│   │   └── [Product images]
│   │
│   ├── 📁 3d_stabilizer/             # 3D model files
│   │   ├── *.mtl
│   │   └── *.obj
│   │
│   ├── 📁 3dimage/                   # 3D image assets
│   │   ├── *.mtl
│   │   └── *.obj
│   │
│   ├── 📁 thermalupdated/            # Thermal imager PDFs
│   │   └── [PDF files]
│   │
│   ├── 📁 public/                    # Duplicate public folder (legacy?)
│   │   └── [Some PDFs and assets]
│   │
│   └── [Other image/PDF folders]     # 1000+ PNG/JPEG/PDF files by category
│
├── 📁 seo/                           # SEO configuration (source of truth)
│   └── pages.json                    # Array of {loc, lastmod, changefreq, priority}
│
├── 📁 scripts/                       # Build and generation scripts
│   ├── generate-sitemap.cjs          # Generates public/sitemap.xml from seo/pages.json
│   └── generate-ssg.mjs              # Post-build: renders routes → static HTML files
│
├── 📁 chatbot/                       # Python chatbot backend (separate service)
│   └── [Python files - 10000+ files]
│
└── 📁 src/                           # Source code
    │
    ├── 📄 Entry Points
    │   ├── main.tsx                  # Client entry: React hydration
    │   ├── entry-server.tsx         # SSR entry: render(url) → {html, headTags}
    │   ├── App.tsx                   # Root component: Router + Routes
    │   ├── routes.ts                 # List of paths to prerender (SSG)
    │   ├── index.css                 # Global styles
    │   ├── App.css                   # App-specific styles
    │   └── vite-env.d.ts             # Vite client types
    │
    ├── 📁 components/                # Reusable React components
    │   │
    │   ├── 📁 layout/                # Layout components
    │   │   ├── Layout.tsx            # Main layout: Nav + Footer wrapper
    │   │   ├── PageLayout.tsx       # Page layout: Layout + Hero + Breadcrumbs
    │   │   ├── Navigation.tsx       # Main navigation bar
    │   │   ├── FooterComponents.tsx # Footer component
    │   │   └── SimpleLayout.tsx     # Minimal layout variant
    │   │
    │   ├── 📁 ui/                    # Shadcn UI primitives (60+ components)
    │   │   ├── button.tsx
    │   │   ├── card.tsx
    │   │   ├── dialog.tsx
    │   │   ├── input.tsx
    │   │   ├── form.tsx
    │   │   ├── tabs.tsx
    │   │   ├── accordion.tsx
    │   │   ├── alert.tsx
    │   │   ├── avatar.tsx
    │   │   ├── badge.tsx
    │   │   ├── breadcrumb.tsx
    │   │   ├── calendar.tsx
    │   │   ├── carousel.tsx
    │   │   ├── chart.tsx
    │   │   ├── checkbox.tsx
    │   │   ├── collapsible.tsx
    │   │   ├── command.tsx
    │   │   ├── context-menu.tsx
    │   │   ├── drawer.tsx
    │   │   ├── dropdown-menu.tsx
    │   │   ├── hover-card.tsx
    │   │   ├── input-otp.tsx
    │   │   ├── label.tsx
    │   │   ├── menubar.tsx
    │   │   ├── navigation-menu.tsx
    │   │   ├── pagination.tsx
    │   │   ├── popover.tsx
    │   │   ├── progress.tsx
    │   │   ├── radio-group.tsx
    │   │   ├── resizable.tsx
    │   │   ├── scroll-area.tsx
    │   │   ├── select.tsx
    │   │   ├── separator.tsx
    │   │   ├── sheet.tsx
    │   │   ├── sidebar.tsx
    │   │   ├── skeleton.tsx
    │   │   ├── slider.tsx
    │   │   ├── sonner.tsx
    │   │   ├── switch.tsx
    │   │   ├── table.tsx
    │   │   ├── TabsNoRefresh.tsx
    │   │   ├── textarea.tsx
    │   │   ├── toggle.tsx
    │   │   ├── toggle-group.tsx
    │   │   ├── tooltip.tsx
    │   │   ├── toaster.tsx
    │   │   ├── toast.tsx
    │   │   ├── use-toast.ts
    │   │   ├── 3d-card.tsx
    │   │   ├── AnimatedBackground.tsx
    │   │   ├── Colourfultext.tsx
    │   │   ├── EnhancedPageTitle.tsx
    │   │   ├── gradient-button.tsx
    │   │   ├── Timeline.tsx
    │   │   └── WorldMap.tsx
    │   │
    │   ├── 📁 templates/             # Page templates
    │   │   └── ProductTemplate.tsx   # Reusable product page template
    │   │
    │   ├── 📁 3d/                    # 3D components
    │   │   └── ThermalVisionModel.tsx
    │   │
    │   ├── Router.tsx                # Router wrapper (BrowserRouter/StaticRouter)
    │   ├── ScrollToTop.tsx           # Scroll to top on route change
    │   ├── ErrorBoundary.tsx         # React error boundary
    │   ├── EventPopup.tsx            # Event popup component
    │   ├── Chatbot.tsx               # Chatbot component
    │   ├── ChatBotProvider.tsx      # Chatbot context provider
    │   ├── ConversationInterface.tsx # Chat conversation UI
    │   ├── FloatingVoiceWidget.tsx   # Voice widget
    │   ├── VoiceVisualizer.tsx       # Voice visualization
    │   ├── HeroAtandra.tsx           # Hero section component
    │   ├── WaveHero.tsx              # Wave hero variant
    │   ├── AboutFixed.tsx            # About section
    │   ├── ServicesFixed.tsx         # Services section
    │   ├── TimelineFixed.tsx        # Timeline component
    │   ├── TimelineItem.tsx          # Timeline item
    │   ├── ClientLogosSection.tsx    # Client logos
    │   ├── ProductCategoryHeader.tsx # Category header
    │   ├── SubPageHeader.tsx         # Subpage header
    │   ├── SectionHeader.tsx         # Section header
    │   ├── Carousel.tsx              # Carousel component
    │   ├── ALMComparison.tsx         # Product comparison
    │   ├── AgentAvatar.tsx           # Agent avatar
    │   ├── DNABackground.tsx         # DNA background effect
    │   ├── Lightning.tsx             # Lightning effect
    │   ├── Lightning.css             # Lightning styles
    │   ├── WireframeWavesBackground.tsx # Wave background
    │   ├── TestPopupData.tsx         # Test popup component
    │   └── [Other feature components]
    │
    ├── 📁 pages/                     # Route-level page components
    │   │
    │   ├── Index.tsx                 # Legacy homepage
    │   ├── NewLandingPage.tsx        # Current homepage ("/")
    │   ├── MinimalIndex.tsx          # Minimal homepage variant
    │   ├── SimpleIndex.tsx           # Simple homepage variant
    │   ├── NotFound.tsx              # 404 page (catch-all route)
    │   ├── TestPage.tsx              # Test page
    │   ├── FAQs.tsx                  # FAQs page
    │   ├── Blogs.tsx                  # Blogs page
    │   │
    │   ├── 📁 admin/                 # Admin pages (protected routes)
    │   │   ├── Login.tsx             # Admin login
    │   │   ├── Dashboard.tsx         # Admin dashboard (layout)
    │   │   ├── PopupManager.tsx      # Popup management
    │   │   ├── UserSubmissions.tsx   # User submissions
    │   │   ├── ContactSubmissions.tsx # Contact form submissions
    │   │   ├── FAQManager.tsx        # FAQ management
    │   │   ├── ChatDetails.tsx       # Chat details (dynamic: /admin/chat/:id)
    │   │   ├── CreateAdmin.tsx       # Create admin user
    │   │   ├── TestFirestore.tsx     # Firestore testing
    │   │   └── DiagnosticPage.tsx    # Diagnostic page
    │   │
    │   ├── 📁 about/                  # About section pages
    │   │   ├── Company.tsx           # Company page
    │   │   ├── Certificates.tsx     # Certificates page
    │   │   ├── events.tsx            # Events page
    │   │   ├── OurLeadership.tsx    # Leadership page
    │   │   └── Careers.tsx           # Careers page
    │   │
    │   ├── 📁 contact/                # Contact pages
    │   │   ├── Sales.tsx             # Sales contact
    │   │   └── Service.tsx           # Service contact
    │   │
    │   ├── 📁 measure/               # Measurement products
    │   │   ├── clampmeters.tsx       # Clamp meters category
    │   │   ├── ThermalImagers.tsx    # Thermal imagers category
    │   │   ├── InsulationTesters.tsx # Insulation testers category
    │   │   ├── Multimeters.tsx       # Digital multimeters category
    │   │   ├── EarthLoopTester.tsx   # Earth loop testers category
    │   │   ├── EarthTesters.tsx      # Earth testers category
    │   │   ├── MicroOhmmeters.tsx    # Micro-ohmmeters category
    │   │   ├── MultiFunctionalMeters.tsx # Multi-functional meters
    │   │   ├── InstallationTesters.tsx   # Installation testers
    │   │   ├── Oscilloscopes.tsx     # Oscilloscopes category
    │   │   ├── powerquality.tsx      # Power quality analyzers category
    │   │   │
    │   │   └── 📁 productpages/      # Product detail pages
    │   │       ├── ClampMeterProduct.tsx        # Dynamic: /measure/clamp-meters/product/:id
    │       │   ├── ThermalImagerProduct.tsx     # Dynamic: /measure/thermal-imagers/product/:id
    │       │   ├── InsulationTesterProduct.tsx  # Dynamic: /measure/insulation-testers/product/:id
    │       │   ├── MultimeterProduct.tsx        # Dynamic: /measure/digital-multimeters/product/:id
    │       │   ├── EarthLoopTesterProduct.tsx    # Dynamic: /measure/earth-loop-testers/product/:id
    │       │   ├── EarthTesterProduct.tsx        # Dynamic: /measure/earth-testers/product/:id
    │       │   ├── MicroOhmMeterproduct.tsx     # Static: /measure/micro-ohmmeters/:id
    │       │   ├── MultiFunctionalMeterProduct.tsx # Dynamic: /measure/multi-functional-meters/product/:id
    │       │   ├── InstallationTesterProduct.tsx  # Dynamic: /measure/installation-testers/product/:id
    │       │   ├── OscilloscopeProduct.tsx        # Dynamic: /measure/oscilloscopes/product/:id
    │       │   ├── PowerQualityAnalyzerProduct.tsx # Dynamic: /measure/power-quality-analyzers/product/:id
    │       │   ├── ThermalImagersSpecification.tsx # Static: /measure/productpages/thermal-imagers/specification
    │       │   ├── CurrentTransformerProduct.tsx   # (if used)
    │       │   └── ClampMeterProduct.tsx.new      # (backup/legacy)
    │   │
    │   ├── 📁 protect/               # Protection products
    │   │   ├── UPS.tsx               # UPS category
    │   │   ├── ServoStabilizers.tsx  # Servo stabilizers category
    │   │   ├── StaticStabilizers.tsx # Static stabilizers category
    │   │   ├── IsolationTransformers.tsx # Isolation transformers category
    │   │   ├── PowerConditioners.tsx # Power conditioners (if used)
    │   │   ├── PowerLineFilters.tsx  # Power line filters (if used)
    │   │   └── SurgeProtectors.tsx   # Surge protectors (if used)
    │   │   │
    │   │   └── 📁 productpages/      # Protection product detail pages
    │   │       ├── EL/
    │   │       │   └── ELBSeriesUPS.tsx          # Static: /protect/ups/product/el-series
    │   │       ├── EH11SeriesUPS.tsx              # Static: /protect/ups/product/eh-11-series
    │   │       ├── EH31SeriesUPS.tsx              # Static: /protect/ups/product/eh-31-series
    │   │       ├── EH33SmallSeriesUPS.tsx         # Static: /protect/ups/product/eh-33-small-series
    │   │       ├── EH33LargeSeriesUPS.tsx         # Static: /protect/ups/product/eh-33-large-series
    │   │       ├── SXSeriesUPS.tsx                # Static: /protect/ups/product/sx-series
    │   │       ├── HXSeriesUPS.tsx                 # Static: /protect/ups/product/hx-series
    │   │       ├── Servostabilizersphase1.tsx     # Static: /protect/servo-stabilizers/product/single-phase-servo-stabilizer
    │   │       ├── Servostabilizers3phase.tsx     # Static: /protect/servo-stabilizers/product/three-phase-servo-stabilizer
    │   │       ├── Staticstabilizersproduct.tsx   # Static: /protect/static-stabilizers/product/static-voltage-stabilizer
    │   │       ├── isolationtransformersproduct.tsx # Static: /protect/isolation-transformers/product/auto-isolation-transformer
    │   │       ├── GalvanicIsolationTransformer.tsx # (if used)
    │   │       ├── UltraIsolationTransformer.tsx   # (if used)
    │   │       │
    │   │       └── 📁 productpages/  # Nested productpages (legacy/duplicate?)
    │   │           └── [Similar files]
    │   │
    │   ├── 📁 conserve/              # Energy conservation solutions
    │   │   ├── OnPremiseSystems.tsx  # On-premise energy systems
    │   │   ├── SmartFactorySolution.tsx # Smart factory solution
    │   │   ├── LightingEnergySaver.tsx # Lighting energy saver (tenant billing)
    │   │   └── EnergyAudits.tsx      # Energy audits (ESG reporting)
    │   │
    │   └── 📁 template/              # Page templates
    │       └── ProductTemplate.tsx   # Generic product template
    │
    ├── 📁 seo/                       # SEO utilities
    │   └── SeoHead.tsx               # Centralized SEO component (Helmet wrapper)
    │
    ├── 📁 contexts/                 # React contexts
    │   └── AuthContext.tsx           # Authentication context (admin)
    │
    ├── 📁 hooks/                     # Custom React hooks
    │   ├── use-mobile.tsx            # Mobile detection hook
    │   ├── use-toast.ts              # Toast notification hook
    │   └── useFAQsRealtime.ts        # Real-time FAQs hook
    │
    ├── 📁 lib/                       # Utility libraries
    │   ├── firebase.ts               # Firebase initialization and config
    │   └── utils.ts                  # General utilities
    │
    ├── 📁 utils/                     # Additional utilities
    │   ├── faqSeedData.ts            # FAQ seed data
    │   └── navigation.ts             # Navigation utilities
    │
    ├── 📁 types/                     # TypeScript type definitions
    │   └── faq.ts                    # FAQ types
    │
    └── 📁 styles/                    # Global styles
        └── animations.css            # Animation styles
```

---

## Key File Descriptions

### Root Configuration Files

| File | Purpose |
|------|---------|
| `index.html` | Single HTML shell; contains default meta, Organization JSON-LD, `<div id="root">` |
| `package.json` | Dependencies and npm scripts (dev, build, generate-sitemap, preview) |
| `vite.config.ts` | Vite configuration: base path, plugins, aliases, SSR settings |
| `firebase.json` | Firebase Hosting: public dir, cleanUrls, redirects, rewrites, headers |
| `.firebaserc` | Firebase project ID: `atandra` |
| `.env` | Environment variables (VITE_* only; not committed) |

### Source Entry Points

| File | Purpose |
|------|---------|
| `src/main.tsx` | Client entry: React hydration, duplicate Layout detection |
| `src/entry-server.tsx` | SSR entry: render(url) → {html, headTags} for SSG |
| `src/App.tsx` | Root component: Router wrapper, Routes definitions, redirects |
| `src/routes.ts` | Array of paths to prerender (must match seo/pages.json) |

### SEO & Build Scripts

| File | Purpose |
|------|---------|
| `seo/pages.json` | Source of truth: URLs for sitemap and SSG (loc, lastmod, changefreq, priority) |
| `scripts/generate-sitemap.cjs` | Reads seo/pages.json → writes public/sitemap.xml |
| `scripts/generate-ssg.mjs` | Post-build: renders each route → static HTML files in dist/ |
| `src/seo/SeoHead.tsx` | Centralized SEO component (Helmet wrapper) |

### Public Assets

| Folder/File | Purpose |
|-------------|---------|
| `public/robots.txt` | Crawl rules, sitemap URL, Disallow admin/pdf |
| `public/sitemap.xml` | Generated sitemap (from seo/pages.json) |
| `public/background_images/` | Hero images, logos, favicon, default OG image |
| `public/clammeter/` | Clamp meter product images |
| `public/[other folders]/` | Product images organized by category |

---

## Route-to-File Mapping

### Homepage
- `/` → `src/pages/NewLandingPage.tsx`

### Admin (Protected)
- `/admin/login` → `src/pages/admin/Login.tsx`
- `/admin` → `src/pages/admin/Dashboard.tsx` (layout)
  - `/admin/dashboard` → `src/pages/admin/PopupManager.tsx`
  - `/admin/popups` → `src/pages/admin/PopupManager.tsx`
  - `/admin/users` → `src/pages/admin/UserSubmissions.tsx`
  - `/admin/contacts` → `src/pages/admin/ContactSubmissions.tsx`
  - `/admin/faqs` → `src/pages/admin/FAQManager.tsx`
  - `/admin/chat/:id` → `src/pages/admin/ChatDetails.tsx`

### Contact
- `/contact/sales` → `src/pages/contact/Sales.tsx`
- `/contact/service` → `src/pages/contact/Service.tsx`

### Measure (Category Pages)
- `/measure/power-quality-analyzers` → `src/pages/measure/powerquality.tsx`
- `/measure/thermal-imagers` → `src/pages/measure/ThermalImagers.tsx`
- `/measure/insulation-testers` → `src/pages/measure/InsulationTesters.tsx`
- `/measure/digital-multimeters` → `src/pages/measure/Multimeters.tsx`
- `/measure/clamp-meters` → `src/pages/measure/clampmeters.tsx`
- `/measure/earth-loop-testers` → `src/pages/measure/EarthLoopTester.tsx`
- `/measure/earth-testers` → `src/pages/measure/EarthTesters.tsx`
- `/measure/micro-ohmmeters` → `src/pages/measure/MicroOhmmeters.tsx`
- `/measure/multi-functional-meters` → `src/pages/measure/MultiFunctionalMeters.tsx`
- `/measure/installation-testers` → `src/pages/measure/InstallationTesters.tsx`
- `/measure/oscilloscopes` → `src/pages/measure/Oscilloscopes.tsx`

### Measure (Product Pages - Dynamic)
- `/measure/[category]/product/:productId` → `src/pages/measure/productpages/[Category]Product.tsx`
- `/measure/micro-ohmmeters/:productId` → `src/pages/measure/productpages/MicroOhmMeterproduct.tsx` (no /product/)

### Protect (Category Pages)
- `/protect/ups` → `src/pages/protect/UPS.tsx`
- `/protect/servo-stabilizers` → `src/pages/protect/ServoStabilizers.tsx`
- `/protect/static-stabilizers` → `src/pages/protect/StaticStabilizers.tsx`
- `/protect/isolation-transformers` → `src/pages/protect/IsolationTransformers.tsx`

### Protect (Product Pages - Static)
- `/protect/ups/product/el-series` → `src/pages/protect/productpages/EL/ELBSeriesUPS.tsx`
- `/protect/ups/product/eh-11-series` → `src/pages/protect/productpages/EH11SeriesUPS.tsx`
- `/protect/ups/product/eh-31-series` → `src/pages/protect/productpages/EH31SeriesUPS.tsx`
- `/protect/ups/product/eh-33-small-series` → `src/pages/protect/productpages/EH33SmallSeriesUPS.tsx`
- `/protect/ups/product/eh-33-large-series` → `src/pages/protect/productpages/EH33LargeSeriesUPS.tsx`
- `/protect/ups/product/sx-series` → `src/pages/protect/productpages/SXSeriesUPS.tsx`
- `/protect/ups/product/hx-series` → `src/pages/protect/productpages/HXSeriesUPS.tsx`
- `/protect/servo-stabilizers/product/single-phase-servo-stabilizer` → `src/pages/protect/productpages/Servostabilizersphase1.tsx`
- `/protect/servo-stabilizers/product/three-phase-servo-stabilizer` → `src/pages/protect/productpages/Servostabilizers3phase.tsx`
- `/protect/static-stabilizers/product/static-voltage-stabilizer` → `src/pages/protect/productpages/Staticstabilizersproduct.tsx`
- `/protect/isolation-transformers/product/auto-isolation-transformer` → `src/pages/protect/productpages/isolationtransformersproduct.tsx`

### Conserve
- `/conserve/on-premise-systems` → `src/pages/conserve/OnPremiseSystems.tsx`
- `/conserve/smart-factory-solution` → `src/pages/conserve/SmartFactorySolution.tsx`
- `/conserve/tenant-billing-solution` → `src/pages/conserve/LightingEnergySaver.tsx`
- `/conserve/enterprise-esg-reporting` → `src/pages/conserve/EnergyAudits.tsx`

### About
- `/about/company` → `src/pages/about/Company.tsx`
- `/about/certificates` → `src/pages/about/Certificates.tsx`
- `/about/events` → `src/pages/about/events.tsx`
- `/about/our-leadership` → `src/pages/about/OurLeadership.tsx`
- `/about/careers` → `src/pages/about/Careers.tsx`

### Other
- `/faqs` → `src/pages/FAQs.tsx`
- `/blogs` → `src/pages/Blogs.tsx`
- `*` (catch-all) → `src/pages/NotFound.tsx`

---

## Build Output Structure (dist/)

After `npm run build`, the `dist/` folder contains:

```
dist/
├── index.html                    # SPA shell (fallback for non-prerendered routes)
├── 404.html                      # Custom 404 (if present)
├── robots.txt                    # Copied from public/
├── sitemap.xml                   # Generated from seo/pages.json
│
├── assets/                       # Hashed client assets
│   ├── index-[hash].js           # Main JavaScript bundle
│   ├── index-[hash].css          # Main CSS bundle
│   └── [other chunked assets]    # Code-split chunks (if any)
│
├── ssr/                          # SSR build output (used only at build time)
│   └── entry-server.js           # SSR entry bundle
│
├── measure/                      # Prerendered HTML files
│   ├── clamp-meters.html
│   ├── clamp-meters/
│   │   └── product/
│   │       └── [product-id].html
│   └── [other category pages]
│
├── protect/                      # Prerendered HTML files
│   ├── ups.html
│   ├── ups/
│   │   └── product/
│   │       └── [series].html
│   └── [other category pages]
│
├── about/                        # Prerendered HTML files
│   ├── company.html
│   ├── certificates.html
│   └── [other pages]
│
├── contact/                      # Prerendered HTML files
│   ├── sales.html
│   └── service.html
│
├── conserve/                     # Prerendered HTML files
│   └── [solution pages].html
│
└── [background_images, clammeter, etc.]/  # Copied from public/
```

---

## File Naming Conventions

- **Page components:** PascalCase (e.g. `ClampMeters.tsx`, `NewLandingPage.tsx`)
- **Component files:** PascalCase (e.g. `SeoHead.tsx`, `ErrorBoundary.tsx`)
- **Route paths:** kebab-case (e.g. `/measure/clamp-meters`, `/protect/ups`)
- **Image files:** lowercase with hyphens or camelCase (e.g. `F205.png`, `background-design.avif`)
- **Config files:** lowercase (e.g. `vite.config.ts`, `firebase.json`)
- **Type files:** kebab-case or camelCase (e.g. `faq.ts`, `vite-env.d.ts`)

---

## Important Notes

1. **SSG Routes:** Only paths listed in `seo/pages.json` and `src/routes.ts` are prerendered. Other routes work as SPA-only.

2. **Public vs Src:** 
   - `public/` files are copied as-is (no hashing)
   - `src/` files are processed by Vite (imported assets get hashed)

3. **Component Organization:**
   - `components/layout/` → Layout shell components
   - `components/ui/` → Shadcn UI primitives
   - `components/` → Feature components
   - `pages/` → Route-level components (one per route)

4. **SEO:** Each indexable page should render `<SeoHead />` with page-specific props.

5. **Routes:** All route definitions are in `src/App.tsx`; order matters (redirects before catch-all).

---

**Last Updated:** 2025-02-11  
**For detailed procedures, see:** `SOP_DEVELOPER_HANDOVER.md`
