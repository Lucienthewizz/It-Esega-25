import '../css/app.css';

import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Optimisasi navigasi
router.on('navigate', (event) => {
    // Preload halaman berikutnya
    const nextPage = event.detail.page.component;
    if (nextPage) {
        resolvePageComponent(`./pages/${nextPage}.tsx`, import.meta.glob('./pages/**/*.tsx'));
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: false,
    // Mengaktifkan cache untuk komponen yang sudah di-load
    cache: (page) => {
        // Cache semua halaman kecuali yang memiliki data dinamis
        if (page.startsWith('dashboard')) return false;
        return true;
    }
});

// This will set light / dark mode on load...
initializeTheme();
