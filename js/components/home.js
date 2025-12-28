export function renderHome() {
    const container = document.createElement('div');
    container.className = 'home-page';
    container.innerHTML = `
        <div class="hero">
            <h1 class="animate-in">Create Your Story <br> with <span class="text-gradient">CRAFIQ</span></h1>
            <p class="animate-in delay-1">The easiest way to build and publish Visual Novels directly in your browser.</p>
            <div class="cta-group animate-in delay-2">
                <a href="#/dashboard" class="btn">Start Creating &rarr;</a>
                <a href="https://github.com" target="_blank" class="btn btn-secondary">Learn More</a>
            </div>
        </div>
        <div class="features">
            <div class="feature-card">
                <h3>🚫 No Coding</h3>
                <p>Drag & drop interface to build scenes easily.</p>
            </div>
             <div class="feature-card">
                <h3>⚡ Zero Setup</h3>
                <p>Runs purely in the browser. No installation needed.</p>
            </div>
             <div class="feature-card">
                <h3>🎨 Premium Assets</h3>
                <p>Use built-in assets or upload your own.</p>
            </div>
        </div>
    `;
    return container;
}
