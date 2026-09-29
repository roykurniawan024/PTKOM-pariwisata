import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const pages = import.meta.glob('./pages/**/*.jsx');

/**
 * Backend renders pages with mixed casing (e.g. "Auth/Login" vs "auth/RegisterUser"),
 * so match the page path case-insensitively against the actual files.
 */
const resolvePagePath = (name) => {
    const requestedPath = `./pages/${name}.jsx`;

    return (
        Object.keys(pages).find(
            (path) => path.toLowerCase() === requestedPath.toLowerCase(),
        ) ?? requestedPath
    );
};

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(resolvePagePath(name), pages),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
