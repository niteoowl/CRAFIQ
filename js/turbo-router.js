
/* 
    TURBO ROUTER v3 (Robust Script & Style Support)
    - Captures clicks on internal links
    - Fetches content via fetch()
    - Swaps body
    - Merges HEAD (New CSS/Title)
    - Re-executes Scripts (Both inline and src)
    - Dispatches 'turbo:load'
*/

document.addEventListener('DOMContentLoaded', () => {
    document.body.addEventListener('click', e => {
        const link = e.target.closest('a');
        if (link && link.href.startsWith(window.location.origin) && !link.getAttribute('target') && !link.getAttribute('download')) {
            e.preventDefault();
            navigateTo(link.href);
        }
    });

    // Handle Back/Forward
    window.addEventListener('popstate', () => {
        loadPage(window.location.href, false);
    });

    // Initial Load Event
    document.documentElement.setAttribute('data-turbo-loaded', 'true');
    window.dispatchEvent(new Event('turbo:load'));
});

async function navigateTo(url) {
    history.pushState(null, '', url);
    await loadPage(url);
}

async function loadPage(url, push = true) {
    try {
        console.log("Navigating to:", url);
        const res = await fetch(url);
        const text = await res.text();

        // Parse HTML
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');

        // 1. Swap Body
        document.body = doc.body;

        // 2. Update Title
        document.title = doc.title;

        // 3. Merge Head Styles (Preserve existing, add new)
        const newStyles = doc.head.querySelectorAll('link[rel="stylesheet"], style');
        const currentHead = document.head;

        newStyles.forEach(newStyle => {
            let exists = false;
            if (newStyle.tagName === 'LINK') {
                exists = !!currentHead.querySelector(`link[href="${newStyle.getAttribute('href')}"]`);
            }
            // We generally don't duplicate styles, but if it's a new one, append it.
            if (!exists) {
                const clone = newStyle.cloneNode(true);
                currentHead.appendChild(clone);
            }
        });

        // 4. Re-Execute Scripts
        // This is CRITICAL. innerHTML does not run scripts.
        // We must manually create script elements.
        const scripts = document.body.querySelectorAll('script');

        for (const script of scripts) {
            const newScript = document.createElement('script');

            // Copy attributes (src, type, etc)
            Array.from(script.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));

            // Log for debugging
            // console.log("Re-executing script:", script.src || "inline");

            // Copy content
            newScript.textContent = script.textContent;

            // Replace old with new to trigger execution
            script.parentNode.replaceChild(newScript, script);

            // If it's a module or src, we might need to wait? 
            // Browser executes them async usually.
        }

        // 5. Scroll to Top
        window.scrollTo(0, 0);

        // 6. Dispatch Event
        // Giving a small delay to allow DOM paint
        setTimeout(() => {
            document.documentElement.setAttribute('data-turbo-loaded', 'true');
            window.dispatchEvent(new Event('turbo:load'));
        }, 50);

    } catch (err) {
        console.error("Navigation Failed, falling back to reload", err);
        window.location.reload();
    }
}
