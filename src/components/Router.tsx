// src/components/Router.tsx
// Router component that switches between StaticRouter (SSR) and BrowserRouter (client)

import { BrowserRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { ReactNode } from 'react';

interface RouterProps {
    children: ReactNode;
    location?: string;
}

export const Router = ({ children, location }: RouterProps) => {
    // Check if we're in browser (client) or server (SSG)
    if (typeof window !== 'undefined') {
        // Client-side: use BrowserRouter (doesn't need location prop)
        return (
            <BrowserRouter
                future={{
                    v7_startTransition: true,
                    v7_relativeSplatPath: true,
                }}
            >
                {children}
            </BrowserRouter>
        );
    }

    // Server-side (SSG): use StaticRouter with the provided location
    // Ensure location is a string and properly formatted
    let staticLocation = typeof location === 'string' ? location : '/';

    // Normalize location for StaticRouter
    if (!staticLocation.startsWith('/')) {
        staticLocation = '/' + staticLocation;
    }

    console.log('[Router] SSR mode - using StaticRouter with location:', staticLocation);
    return (
        <StaticRouter
            location={staticLocation}
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            {children}
        </StaticRouter>
    );
};
