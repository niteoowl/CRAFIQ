import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'dashboard-page';

    // UI Structure
    container.innerHTML = `
        <nav class="navbar">
            <div class="logo">CRAFIQ</div>
            <div class="user-profile">Maker</div>
        </nav>
        <div class="dashboard-content">
            <div class="header-row">
                <h2>My Projects</h2>
                <button id="create-btn" class="btn">+ New Project</button>
            </div>
            <div id="project-list" class="grid-layout"></div>
        </div>
    `;

    // Render List Function
    const renderList = () => {
        const listContainer = container.querySelector('#project-list');
        listContainer.innerHTML = '';

        if (appStore.projects.length === 0) {
            listContainer.innerHTML = `
                <div class="empty-state">
                    <p>No projects yet. Create your first one!</p>
                </div>
            `;
            return;
        }

        appStore.projects.forEach(project => {
            const card = document.createElement('div');
            card.className = 'feature-card'; // Reusing card style
            card.style.cursor = 'pointer';
            card.onclick = (e) => {
                // Prevent navigation if clicking buttons
                if (e.target.tagName === 'A') return;
                window.navigateTo('#/editor?id=' + project.id);
            }
            card.innerHTML = `
                <h3>${project.title}</h3>
                <p style="margin-bottom: 1rem">${project.scenes.length} Scenes</p>
                <div style="display:flex; justify-content:space-between; margin-top:1rem;">
                    <a href="#/editor?id=${project.id}" class="btn" style="padding:0.5rem 1rem; font-size:0.8rem">Edit</a>
                    <a href="#/play?id=${project.id}" target="_blank" class="btn btn-secondary" style="padding:0.5rem 1rem; font-size:0.8rem">Play</a>
                </div>
            `;
            listContainer.appendChild(card);
        });
    };

    // Initial Render
    renderList();

    // Interaction
    setTimeout(() => {
        container.querySelector('#create-btn').addEventListener('click', () => {
            const title = prompt("Project Title:");
            if (title) {
                appStore.createProject(title);
                renderList();
            }
        });
    }, 0);

    return container;
}
