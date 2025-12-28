// TURBO ROUTER (Vanilla SPA Linker)
// Intercepts clicks, fetches HTML, replaces body, and EXECUTES SCRIPTS.

document.addEventListener('DOMContentLoaded', () => {
    // Handle initial navigation (if back/forward button is used)
    window.addEventListener('popstate', (e) => loadPage(window.location.href, false));

    // Intercept clicks
    document.body.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.host === window.location.host) {
            // Ignore hash links or special targets
            if (link.getAttribute('target') === '_blank' || link.href.includes('#')) return;

            e.preventDefault();
            loadPage(link.href, true);
        }
    });
});

async function loadPage(url, pushState = true) {
    try {
        // Fetch the new page
        const response = await fetch(url);
        const html = await response.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Update Head (Title, Meta) - Optional but good for SEO/Context
        document.title = doc.title;

        // Update Body
        const newBody = doc.body;
        document.body.className = newBody.className; // Keep body classes (e.g. reader theme)
        document.body.innerHTML = newBody.innerHTML;

        // EXECUTE SCRIPTS (Crucial fix)
        // Browsers do not execute <script> tags in innerHTML. We must manually recreate them.
        const scripts = document.body.querySelectorAll('script');
        scripts.forEach(oldScript => {
            const newScript = document.createElement('script');

            // Copy attributes
            Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));

            // Copy content
            newScript.textContent = oldScript.textContent;

            // Replace
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });

        // Update URL
        if (pushState) window.history.pushState({}, '', url);

        // Re-trigger DOMContentLoaded listeners manually (since the event already fired once)
        // We can't dispatch the real event again easily, so we rely on the scripts running immediately.
        // However, if scripts rely on 'DOMContentLoaded', they might miss it.
        // Quick fix: Dispatch a custom 'turbo:load' event or just rely on immediate execution.
        window.dispatchEvent(new Event('DOMContentLoaded'));

    } catch (err) {
        console.error("Turbo Nav Error:", err);
        window.location.href = url; // Fallback to full reload
    }
}
