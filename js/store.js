import { storage, generateId } from './utils.js';

class Store {
    constructor() {
        this.projects = storage.get('projects') || [];
        // Determine the listeners map
        this.listeners = new Set();
    }

    subscribe(listener) {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener); // Unsubscribe
    }

    notify() {
        this.listeners.forEach(cb => cb(this));
        storage.set('projects', this.projects);
    }

    // Actions
    createProject(title) {
        const newProject = {
            id: generateId(),
            title: title || 'Untitled Project',
            created: Date.now(),
            scenes: [
                {
                    id: 'scene_start',
                    name: 'Start Scene',
                    background: null,
                    dialogues: [
                        { speaker: 'System', text: 'Welcome to your new Visual Novel!' }
                    ]
                }
            ],
            assets: {}
        };
        this.projects.push(newProject);
        this.notify();
        return newProject;
    }

    getProject(id) {
        return this.projects.find(p => p.id === id);
    }

    updateProject(id, updates) {
        const idx = this.projects.findIndex(p => p.id === id);
        if (idx !== -1) {
            this.projects[idx] = { ...this.projects[idx], ...updates };
            this.notify();
        }
    }

    deleteProject(id) {
        this.projects = this.projects.filter(p => p.id !== id);
        this.notify();
    }
}

export const appStore = new Store();
