/**
 * API Configuration
 * Automatically resolves the correct API base URL for both
 * local development (localhost:3000) and production (same origin).
 */
(function () {
    const isLocalhost =
        window.location.hostname === 'localhost' ||
        window.location.hostname === '127.0.0.1';

    // In production the server serves the HTML files itself,
    // so API calls go to the same origin (no port needed).
    window.API_BASE_URL = isLocalhost
        ? 'http://localhost:3000/api'
        : window.location.origin + '/api';
})();
