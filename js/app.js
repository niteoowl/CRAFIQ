import { renderHome } from './components/home.js';
import { renderDashboard } from './components/dashboard.js';
import { renderEditor } from './components/editor.js';
import { renderPlayer } from './components/player.js';

const routes = {
    '/': renderHome,
    '/dashboard': renderDashboard,
    '/editor': renderEditor,
    '/play': renderPlayer
};

function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash.slice(1) || '/';
    
    // Handle params (e.g., /editor?id=123)
    const [path, query] = hash.split('?');
    const params = new URLSearchParams(query);

    const renderFn = routes[path] || routes['/'];
    
    // Clear app
    app.innerHTML = '';
    
    // Render new component
    app.appendChild(renderFn(params));
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Global navigation helper
window.navigateTo = (path) => {
    window.location.hash = path;
};
