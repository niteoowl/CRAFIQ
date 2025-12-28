import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) {
        return document.createTextNode('Project not found');
    }

    const container = document.createElement('div');
    container.className = 'editor-layout';

    // Initial State
    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <div class="sidebar">
            <div class="sidebar-header">
                <a href="#/dashboard" style="color:white; text-decoration:none;">&larr; Back</a>
            </div>
            <div class="asset-list">
                <div style="padding:10px; font-weight:bold; color:var(--text-muted);">SCENES</div>
                <div id="scene-list-container"></div>
                <button id="add-scene-btn" class="btn btn-secondary" style="margin:10px; width:calc(100% - 20px);">+ Add Scene</button>
            </div>
        </div>

        <div class="main-stage">
            <div class="toolbar">
                <span class="project-title" contenteditable="true" id="project-title-edit">${project.title}</span>
                <div class="actions">
                    <button id="save-btn" class="btn btn-secondary">Save</button>
                    <a href="#/play?id=${projectId}" target="_blank" class="btn">Play</a>
                </div>
            </div>
            
            <div class="canvas-area">
                <div id="preview-container" class="preview-box" style="position:relative; overflow:hidden;">
                    <!-- Renderer Inject -->
                </div>
            </div>

            <div class="timeline-area" style="display:flex; flex-direction:row; gap:10px;">
                <div style="flex:1; border-right:1px solid #333; padding-right:10px; display:flex; flex-direction:column; gap:10px;">
                    <label style="font-size:0.8rem; color:#aaa;">Speaker</label>
                    <input type="text" id="input-speaker" style="width:100%; padding:8px; background:#222; border:1px solid #444; color:white; border-radius:4px;">
                    
                    <label style="font-size:0.8rem; color:#aaa;">Dialogue</label>
                    <textarea id="input-text" style="width:100%; height:80px; padding:8px; background:#222; border:1px solid #444; color:white; border-radius:4px; resize:none;"></textarea>
                </div>
                 <div style="flex:1; padding-left:10px; display:flex; flex-direction:column; gap:10px;">
                    <label style="font-size:0.8rem; color:#aaa;">Background Image URL</label>
                     <input type="text" id="input-bg" style="width:100%; padding:8px; background:#222; border:1px solid #444; color:white; border-radius:4px;">
                     
                     <div style="margin-top:auto; display:flex; justify-content:space-between;">
                        <button id="prev-step" class="btn btn-secondary">&larr; Prev</button>
                        <span id="step-indicator" style="line-height:40px;">1 / 1</span>
                        <button id="next-step" class="btn btn-secondary">Next &rarr;</button>
                        <button id="add-step" class="btn" style="margin-left:10px;">+ New Line</button>
                     </div>
                </div>
            </div>
        </div>
    `;

    // Initialize Renderer
    const renderer = new VNRenderer(container.querySelector('#preview-container'));

    // --- Helpers ---
    const updatePreview = () => {
        renderer.renderScene(currentScene, currentStepIndex);

        // Update Form Inputs to match current data
        const dialogue = currentScene.dialogues[currentStepIndex] || {};
        container.querySelector('#input-speaker').value = dialogue.speaker || '';
        container.querySelector('#input-text').value = dialogue.text || '';
        container.querySelector('#input-bg').value = currentScene.background || '';

        // Update Indicators
        container.querySelector('#step-indicator').innerText = `${currentStepIndex + 1} / ${currentScene.dialogues.length}`;

        // Highlight active scene in sidebar
        renderScenesList();
    };

    const saveCurrentStep = () => {
        if (!currentScene.dialogues[currentStepIndex]) return;

        const speaker = container.querySelector('#input-speaker').value;
        const text = container.querySelector('#input-text').value;
        const bg = container.querySelector('#input-bg').value;

        currentScene.dialogues[currentStepIndex].speaker = speaker;
        currentScene.dialogues[currentStepIndex].text = text;
        currentScene.background = bg; // Simplification: Scene-wide background implies it changes per scene, but could be per step. For MVP, let's keep it simple or make it reactive.
        // Actually, usually background changes per line. Let's stick to Scene-wide for MVP simplicity OR update model.
        // Let's make background global to the scene for now.

        appStore.updateProject(projectId, { scenes: project.scenes });
    };

    const renderScenesList = () => {
        const list = container.querySelector('#scene-list-container');
        list.innerHTML = '';
        project.scenes.forEach((scene, idx) => {
            const div = document.createElement('div');
            div.innerText = scene.name || `Scene ${idx + 1}`;
            div.style.padding = '8px 12px';
            div.style.cursor = 'pointer';
            div.style.background = scene.id === currentScene.id ? 'var(--color-primary)' : 'transparent';
            div.onclick = () => {
                currentScene = scene;
                currentStepIndex = 0;
                updatePreview();
            };
            list.appendChild(div);
        });
    };

    // --- Event Listeners ---
    container.querySelector('#input-speaker').oninput = (e) => {
        if (currentScene.dialogues[currentStepIndex]) {
            currentScene.dialogues[currentStepIndex].speaker = e.target.value;
            renderer.els.speaker.textContent = e.target.value;
        }
    };
    container.querySelector('#input-text').oninput = (e) => {
        if (currentScene.dialogues[currentStepIndex]) {
            currentScene.dialogues[currentStepIndex].text = e.target.value;
            renderer.els.text.textContent = e.target.value;
        }
    };
    container.querySelector('#input-bg').onchange = (e) => {
        currentScene.background = e.target.value;
        renderer.els.bg.style.backgroundImage = `url(${e.target.value})`;
    };

    container.querySelector('#add-step').onclick = () => {
        currentScene.dialogues.push({ speaker: '???', text: '...' });
        currentStepIndex = currentScene.dialogues.length - 1;
        updatePreview();
    };

    container.querySelector('#prev-step').onclick = () => {
        if (currentStepIndex > 0) {
            currentStepIndex--;
            updatePreview();
        }
    };
    container.querySelector('#next-step').onclick = () => {
        if (currentStepIndex < currentScene.dialogues.length - 1) {
            currentStepIndex++;
            updatePreview();
        }
    };

    container.querySelector('#save-btn').onclick = () => {
        appStore.updateProject(projectId, {
            title: container.querySelector('#project-title-edit').innerText,
            scenes: project.scenes
        });
        alert('Saved!');
    };

    container.querySelector('#add-scene-btn').onclick = () => {
        const newScene = {
            id: 'scene_' + Date.now(),
            name: 'New Scene',
            background: '',
            dialogues: [{ speaker: '', text: '' }]
        };
        project.scenes.push(newScene);
        currentScene = newScene;
        currentStepIndex = 0;
        renderScenesList();
        updatePreview();
    };

    // Init
    updatePreview();

    return container;
}
