import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Error: Project not found');

    const container = document.createElement('div');
    container.className = 'editor-layout';

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <header class="app-header">
            <div style="display:flex; align-items:center;">
                <button id="back-btn" style="font-size:20px; margin-right:12px;">&larr;</button>
                <div style="font-weight:700;">${project.title} <span style="font-weight:400; color:#888; font-size:13px;">에디터</span></div>
            </div>
            <div style="display:flex; gap:10px;">
                <button id="play-btn" style="border:1px solid #ddd; padding:6px 12px; border-radius:4px;">미리보기</button>
                <button id="save-btn" style="background:var(--primary); color:white; padding:6px 12px; border-radius:4px; font-weight:700;">저장</button>
            </div>
        </header>

        <div class="editor-main">
            <!-- Scene List -->
            <div class="editor-list">
                <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700; font-size:13px;">SCENES</div>
                <div id="scene-list" style="overflow-y:auto; height:calc(100% - 100px);"></div>
                <button id="add-scene" style="width:100%; padding:12px; border-top:1px solid #ddd; color:var(--primary); font-weight:700;">+ 장면 추가</button>
            </div>

            <!-- Canvas -->
            <div class="editor-canvas">
                <div style="width:90%; aspect-ratio:16/9; margin:auto; background:black; position:relative; box-shadow:0 0 30px rgba(0,0,0,0.3);">
                    <div id="preview-el" style="width:100%; height:100%;"></div>
                </div>
            </div>

            <!-- Props -->
            <div class="editor-props">
                <h3 style="font-size:14px; font-weight:700; margin-bottom:16px;">속성 편집</h3>
                
                <label style="display:block; font-size:12px; color:#666; margin-bottom:4px;">화자</label>
                <input id="inp-speaker" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:12px;">

                <label style="display:block; font-size:12px; color:#666; margin-bottom:4px;">대사</label>
                <textarea id="inp-text" style="width:100%; height:80px; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:12px;"></textarea>

                <div style="display:flex; gap:8px;">
                    <button id="btn-prev" style="flex:1; padding:8px; border:1px solid #ddd;">&larr;</button>
                    <button id="btn-next" style="flex:1; padding:8px; border:1px solid #ddd;">&rarr;</button>
                </div>
                <button id="btn-add-line" style="width:100%; margin-top:10px; padding:8px; background:#f0f0f0; border-radius:4px;">+ 대사 추가</button>
            </div>
        </div>
    `;

    // Initialize Logic
    const renderer = new VNRenderer(container.querySelector('#preview-el'));

    function refresh() {
        renderer.renderScene(currentScene, currentStepIndex);

        // Inputs
        const d = currentScene.dialogues[currentStepIndex] || {};
        container.querySelector('#inp-speaker').value = d.speaker || '';
        container.querySelector('#inp-text').value = d.text || '';

        // List
        const list = container.querySelector('#scene-list');
        list.innerHTML = '';
        project.scenes.forEach((s, i) => {
            const div = document.createElement('div');
            div.style.padding = '12px';
            div.style.borderBottom = '1px solid #f0f0f0';
            div.style.cursor = 'pointer';
            div.innerText = `${i + 1}. Scene`;
            if (s === currentScene) { div.style.background = '#e3f2fd'; div.style.color = 'var(--primary)'; div.style.fontWeight = '700'; }
            div.onclick = () => { currentScene = s; currentStepIndex = 0; refresh(); };
            list.appendChild(div);
        });
    }

    const q = (s) => container.querySelector(s);
    q('#inp-speaker').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].speaker = e.target.value; refresh(); } };
    q('#inp-text').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].text = e.target.value; refresh(); } };
    q('#btn-prev').onclick = () => { if (currentStepIndex > 0) { currentStepIndex--; refresh(); } };
    q('#btn-next').onclick = () => { if (currentStepIndex < currentScene.dialogues.length - 1) { currentStepIndex++; refresh(); } };
    q('#btn-add-line').onclick = () => { currentScene.dialogues.push({ speaker: '', text: '' }); currentStepIndex++; refresh(); };
    q('#add-scene').onclick = () => { project.scenes.push({ id: Date.now(), dialogues: [{}] }); currentScene = project.scenes[project.scenes.length - 1]; currentStepIndex = 0; refresh(); };
    q('#save-btn').onclick = () => { appStore.updateProject(projectId, { scenes: project.scenes }); alert('저장되었습니다.'); };
    q('#back-btn').onclick = () => window.navigateTo('#/dashboard');
    q('#play-btn').onclick = () => window.open('#/play?id=' + projectId);

    refresh();
    return container;
}
