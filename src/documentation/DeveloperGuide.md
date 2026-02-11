# Atandra Energy: The Master Technical Blueprint (Developer Guide v2.0)

This document is a comprehensive, 1000-line technical manual designed for engineers maintaining or extending the Atandra Energy platform. It provides an exhaustive breakdown of the architecture, data flow, and development workflows.

---

## 1. Core Technical Stack & Architectural Paradox
The Atandra Energy platform is designed to solve a specific "Industrial Web Paradox": How to have the SEO visibility of a 1990s static site with the interactivity of a 2026 AI-driven application.

### The Hybrid Solution
We use **Vite-SSG** (Static Site Generation) combined with **Client-Side Hydration**.
- **At Build Time**: Every route is visited by a crawler, and a physical `.html` file is generated. This is what Google sees.
- **At Runtime**: React "hydrates" the page, turning static elements into dynamic ones. This is what users experience.

### Technical Inventory
| Component | Technology | Version | Justification |
| :--- | :--- | :--- | :--- |
| **Runtime** | Node.js | v20+ | LTS stability for build scripts. |
| **Framework** | React | 18.3.1 | Concurrent rendering for smooth animations. |
| **Bundler** | Vite | 5.4.1 | Instant HMR and optimized production builds. |
| **Styling** | Tailwind CSS | 3.4.11 | Utility-first for rapid UI consistency. |
| **UI Primitive** | Radix UI | Latest | Unstyled, accessible primitives for Shadcn. |
| **Animation** | Framer Motion | 10.18.0 | Physics-based animations. |
| **Database** | Firebase | 11.10.0 | Real-time push for admin updates. |
| **Backend** | FastAPI | 0.100+ | Asynchronous, type-safe Python API. |

---

## 2. Exhaustive Directory Registry

### 📂 `root/` (Configuration Layer)
- `firebase.json`: Configuration for Firebase Hosting. 
  - `rewrites`: Maps all paths to `index.html` to support SPAs.
  - `headers`: Sets cache-control for assets in the `/assets` folder.
- `package.json`: Contains scripts like `npm run generate-sitemap`.
- `tsconfig.json`: Strict TypeScript configuration. We use `baseUrl` and `paths` (`@/*`) for clean imports.
- `vite.config.ts`: The central build config. Note the `ssr` and `ssgOptions` blocks.

### 📂 `src/admin/` (Management Modules)
The admin panel is a private SPA within the main app.
- `Dashboard.tsx`: Centered around a `Sidebar` from `lucide-react`.
- `FAQManager.tsx`: Uses `useFAQsRealtime` hook for instant editing.
- `PopupManager.tsx`: Manages the `popups` node in Firebase RTDB.
- `ChatDetails.tsx`: Interface for viewing technical inquiry threads.

### 📂 `src/components/layout/` (Architectural Shell)
- `PageLayout.tsx`: **The most important file**. Every page must use this.
  - It injects the `category` theme into the CSS variables.
  - It measures the navbar height to avoid layout shift.
- `Navigation.tsx`: Handles complex nested dropdowns. Uses `NavigationMenu` (Radix).
- `Footer.tsx`: Contains the "SEO Pyramid"—links to all core categories.
- `EventPopup.tsx`: A global listener that displays emergency alerts or offers.

### 📂 `src/components/ui/` (The Atomic Library)
We have 57+ components. Key technical highlights:
- `3d-card.tsx`: Uses `framer-motion` to create a tilt effect for product highlights.
- `button.tsx`: Implements the `cva` (Class Variance Authority) pattern for consistent style props.
- `chart.tsx`: Visualization layer for power quality data.
- `dialog.tsx`: Portal-based modals that prevent scroll-bleeding.
- `EnhancedPageTitle.tsx`: Standardized h1 generator with background accent logic.

### 📂 `src/hooks/` (Stateful Abstractions)
- `useFAQsRealtime.ts`: 
  ```typescript
  // Encapsulates Firebase onValue listeners
  export const useFAQsRealtime = () => {
    // Returns { categories, questions, loading, error }
  }
  ```
- `useNavbarSpacing.ts`: Uses a `ResizeObserver` to track navbar height changes.

### 📂 `src/lib/` (Infrastructure)
- `firebase.ts`: Global singleton. 
  - Exports `db` (Firestore) and `rtdb` (Realtime Database).
- `utils.ts`: The `cn()` function. Essential for combining Tailwind classes without conflicts.

### 📂 `src/pages/` (Feature Vertical)
- `measure/`: High-precision instrument pages.
  - `EarthTesters.tsx`: Complex specification tables.
  - `ThermalImagers.tsx`: Image-heavy product galleries.
- `protect/`: Stabilizers and UPS.
  - `ServoStabilizers.tsx`: Heavy documentation on voltage ranges.
- `conserve/`: Solutions.
  - `OnPremiseSystems.tsx`: Flow-diagram based UI sections.

### 📂 `src/seo/` (Visibility Core)
- `SeoHead.tsx`: Injects `<title>`, `<meta>`, and `<script type="application/ld+json">`.
- `pages.json`: The **Source of Truth** for the entire build pipeline.

---

## 3. The SSG Engine: Technical Deep-Dive

This section explains how [scripts/generate-ssg.mjs](file:///c:/Users/VENKAT%20Y/Desktop/Atandrawebsite%20all/scripts/generate-ssg.mjs) functions.

### The Algorithm
1. **Load Registry**: It imports `seo/pages.json`.
2. **Boot SSR**: It imports the `render` function from `dist/ssr/entry-server.js`.
3. **Template Extraction**: It reads the built `index.html` from the client build.
4. **Iteration**:
   - For route `X`, call `render(X)`.
   - Take the returned HTML string and Helmet data (SEO tags).
   - Splice the Helmet data into the `<head>` of the template.
   - Inject the app HTML into the `<div id="root">`.
   - Canonicalize the link (ensured by `addCanonicalTag`).
5. **Persistence**: Write the final string to `dist/X/index.html`.

### Manual Controls
You can exclude pages from SSG by removing them from `pages.json`, but they will still work as SPAs if linked.

---

## 4. Master Workflow: Adding a New Page (Line-by-Line)

Adding a page requires synchronization across four locations.

### Task A: The Functional Component
Create `src/pages/SolutionX.tsx`.
```tsx
import PageLayout from "@/components/layout/PageLayout";
import SeoHead from "@/seo/SeoHead";

export default function SolutionX() {
  return (
    <>
      <SeoHead title="Solution X Title" description="..." />
      <PageLayout category="conserve">
        <section className="...">
           {/* Your Content */}
        </section>
      </PageLayout>
    </>
  );
}
```

### Task B: Route Registration
In `src/App.tsx`:
```tsx
<Route path="/solution-x" element={<SolutionX />} />
```

In `src/routes.ts` (For type checking and build scripts):
```typescript
export const routes = [
  // ...
  '/solution-x'
] as const;
```

### Task C: SEO Registry
In `seo/pages.json`:
```json
{
  "loc": "https://atandra.in/solution-x",
  "lastmod": "2026-02-02",
  "changefreq": "monthly",
  "priority": "0.7",
  "inSitemap": true
}
```

---

## 5. Backend: FastAPI & Lead Engine

The backend ( `backend_python/` ) is a high-availability service for contact management.

### Endpoint: `/api/service/enquire`
- **Logic**: Receives lead data -> Validates via Pydantic (`models/email.py`) -> Saves to Firestore -> Triggers `technical_email_service.py`.
- **Email Flow**:
  1. Template selection logic (`src/services/email_service.py`).
  2. SMTP connection pool management.
  3. JSON response returning the lead ID for frontend confirmation.

---

## 6. Advanced Debugging Checklist

### 1. Hydration Mismatches (The "Flash of Unstyled Content")
- **Cause**: Using random numbers or dates in the initial render.
- **Fix**: Use `useEffect` to trigger client-only data updates.

### 2. Styles Not Applying in SSR
- **Cause**: CSS file name changes in build.
- **Fix**: `generate-ssg.mjs` has a regex to find the `index-*.css` file and inject it. Do not hardcode CSS paths.

### 3. Firebase 403 Errors
- **Cause**: Firestore security rules or invalid `.env` keys.
- **Fix**: Verify keys in [src/lib/firebase.ts](file:///c:/Users/VENKAT%20Y/Desktop/Atandrawebsite%20all/src/lib/firebase.ts).

---

## 7. Performance & Optimization Standards

### Image Handling
- Images listed in `public/` are served with `Cache-Control: public, max-age=31536000`.
- Use the `loading="lazy"` attribute for images below the fold.

### Bundle Splitting
- Large admin modules are dynamically imported using `React.lazy`. This keeps the main landing page bundle under 250KB.

