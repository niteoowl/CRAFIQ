import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderPlayer(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) {
        return document.createTextNode('Project not found or loaded.');
    }

    const container = document.createElement('div');
    container.className = 'player-container';

    // UI Wrapper
    container.innerHTML = `
        <div id="game-stage" class="vn-stage"></div>
        <div style="position:absolute; top:10px; right:10px; z-index:100;">
            <button id="close-btn" class="btn btn-secondary" style="background:rgba(0,0,0,0.5)">Exit</button>
        </div>
    `;

    const renderer = new VNRenderer(container.querySelector('#game-stage'));

    // State
    let currentSceneIdx = 0;
    let currentStepIdx = 0;

    const playScene = () => {
        const scene = project.scenes[currentSceneIdx];
        if (!scene) {
            alert("End of the story.");
            return;
        }

        renderer.renderScene(scene, currentStepIdx);
    };

    // Interaction
    container.querySelector('#game-stage').onclick = () => {
        const scene = project.scenes[currentSceneIdx];
        if (!scene) return;

        if (currentStepIdx < scene.dialogues.length - 1) {
            currentStepIdx++;
            playScene();
        } else {
            // End of scene, go to next
            if (currentSceneIdx < project.scenes.length - 1) {
                currentSceneIdx++;
                currentStepIdx = 0;
                playScene();
            } else {
                alert("The End");
                window.location.hash = '#/dashboard';
            }
        }
    };

    container.querySelector('#close-btn').onclick = (e) => {
        e.stopPropagation(); // Prevent advancing text
        window.close(); // If opened in new tab
        window.location.hash = '#/dashboard'; // If same tab
    };

    // Init
    playScene();

    return container;
}
