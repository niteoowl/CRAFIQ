// PJAX Router (Hybrid SPA/MPA)
// 1. Intercepts clicks on <a href>
// 2. Fetches the static HTML file
// 3. Swaps the <main> content and title
// 4. Updates URL without reload

document.body.addEventListener('click', e => {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    // Ignore external links, anchors, or new tab
    if (!href || href.startsWith('http') || href.startsWith('#') || link.target === '_blank') return;

    // Check if it's a known page
    if (href.endsWith('.html') || href === '/') {
        e.preventDefault();
        navigateTo(href);
    }
});

window.addEventListener('popstate', () => {
    loadContent(location.pathname);
});

async function navigateTo(url) {
    history.pushState(null, null, url);
    await loadContent(url);
}

async function loadContent(url) {
    try {
        // Show lightweight loading state if needed (optional)
        // document.querySelector('main').style.opacity = '0.5';

        const response = await fetch(url);
        const html = await response.text();

        // Parse new DOM
        const parser = new DOMParser();
        const newDoc = parser.parseFromString(html, 'text/html');

        // Swap Core Content
        const newMain = newDoc.querySelector('main');
        const currentMain = document.querySelector('main');
        if (newMain && currentMain) {
            currentMain.innerHTML = newMain.innerHTML;
            currentMain.className = newMain.className; // Maintain container classes
            // Re-run any scripts in main if necessary (usually static content doesn't need this)
        }

        // Update active states in Nav
        updateNavState(url);

        // Update Title
        document.title = newDoc.title;

        // Reset scroll
        window.scrollTo(0, 0);

        // document.querySelector('main').style.opacity = '1';

    } catch (err) {
        console.error('Nav Error:', err);
        window.location.href = url; // Fallback to hard reload
    }
}

function updateNavState(url) {
    // Normalize URL
    const cleanUrl = url.split('/').pop() || 'index.html';

    document.querySelectorAll('.nav-pc a, .btm-nav a').forEach(a => {
        a.classList.remove('active', 'current');
        const href = a.getAttribute('href');
        if (href === cleanUrl || (cleanUrl === 'index.html' && href === 'index.html')) {
            a.classList.add('active', 'current');
        }
    });
}
