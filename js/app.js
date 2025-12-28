// Global Search Logic for CRAFIQ
// Handles the search input in the header on all pages.

document.addEventListener('DOMContentLoaded', () => {
    // Select all search inputs (Desktop & Mobile Overlay)
    const searchInputs = document.querySelectorAll('input[placeholder="작품 검색"], .search-overlay-input');

    searchInputs.forEach(input => {
        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const query = e.target.value.trim();
                if (query) {
                    // Redirect to discover.html with query param
                    window.location.href = `discover.html?q=${encodeURIComponent(query)}`;
                }
            }
        });
    });
});
