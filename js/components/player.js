import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderPlayer(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    const container = document.createElement('div');
    container.className = 'player-wrapper';
    container.style.height = '100vh';
    container.style.background = '#111';
    container.style.display = 'flex';
    container.style.alignItems = 'center';
    container.style.justifyContent = 'center';

    if (!project) {
        container.innerHTML = '<div style="color:white;">Project Not Found</div>';
        return container;
    }

    container.innerHTML = `
        <div style="width:100%; max-width:1280px; aspect-ratio:16/9; position:relative; overflow:hidden; background:black; box-shadow:0 0 50px rgba(0,0,0,0.5);">
            <div id="vn-stage" style="width:100%; height:100%;"></div>
            
            <!-- Floating UI -->
            <div id="ui-overlay" style="position:absolute; top:0; left:0; right:0; padding:20px; display:flex; justify-content:space-between; opacity:0; transition:opacity 0.3s;">
                <button id="exit-btn" style="background:rgba(0,0,0,0.5); color:white; padding:8px 16px; border-radius:20px; font-size:13px; backdrop-filter:blur(4px);">나가기</button>
                <div style="color:rgba(255,255,255,0.7); font-size:12px;">${project.title}</div>
            </div>
        </div>
    `;

    const renderer = new VNRenderer(container.querySelector('#vn-stage'));

    let sceneIdx = 0;
    let stepIdx = 0;

    const run = () => {
        const s = project.scenes[sceneIdx];
        if (!s) {
            alert('작품이 끝났습니다.');
            window.close();
            return;
        }
        renderer.renderScene(s, stepIdx);
    };

    // Interaction
    const stage = container.querySelector('#vn-stage');
    stage.onclick = () => {
        const s = project.scenes[sceneIdx];
        if (!s) return;

        if (stepIdx < s.dialogues.length - 1) {
            stepIdx++;
            run();
        } else {
            if (sceneIdx < project.scenes.length - 1) {
                sceneIdx++;
                stepIdx = 0;
                run();
            } else {
                alert('End of Story');
                window.location.hash = '#/dashboard';
            }
        }
    };

    // Hover UI
    container.querySelector('#vn-stage').onmouseenter = () => container.querySelector('#ui-overlay').style.opacity = 1;
    container.querySelector('#vn-stage').onmouseleave = () => container.querySelector('#ui-overlay').style.opacity = 0;
    container.querySelector('#exit-btn').onclick = (e) => { e.stopPropagation(); window.close(); };

    run();
    return container;
}
