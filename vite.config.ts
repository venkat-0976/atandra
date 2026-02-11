import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { routes } from "./src/routes";
import { reactSSG } from "./vite-plugin-react-ssg";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: '/', // Explicit base path for asset resolution
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    reactSSG({
      routes: [...routes],
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: [
      'three',
      'three/examples/jsm/loaders/OBJLoader',
      'three/examples/jsm/loaders/MTLLoader',
      'react-helmet-async'
    ]
  },
  ssr: {
    noExternal: ['react-helmet-async'],
  },
}));
