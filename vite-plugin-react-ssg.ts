// vite-plugin-react-ssg.ts
// Custom Vite plugin for React SSG

import type { Plugin, ViteDevServer } from 'vite'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import { dirname, join, resolve } from 'path'

interface ReactSSGOptions {
    routes: readonly string[] | string[]
    entryServer?: string
}

// This plugin is now a placeholder - actual SSG is done via post-build script
// Keeping it for configuration purposes
export function reactSSG(options: ReactSSGOptions): Plugin {
    return {
        name: 'react-ssg',
        apply: 'build',
        // Plugin does nothing - SSG is handled by scripts/generate-ssg.mjs
        // This is kept for configuration and future enhancements
    }
}

