import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Error: Project not found');

    const container = document.createElement('div');
    container.className = 'editor-shell';

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <header class="editor-head">
            <div class="flex items-center gap-10">
                <button id="back-btn" style="font-size:18px;">&larr;</button>
                <div style="font-weight:700; font-size:16px;">${project.title}</div>
            </div>
            <div class="flex gap-10">
                <button id="play-btn" style="border:1px solid #ddd; padding:6px 12px; border-radius:4px; font-weight:600;">미리보기</button>
                <button id="save-btn" style="background:#1f8ce6; color:white; padding:6px 12px; border-radius:4px; font-weight:700;">저장</button>
            </div>
        </header>

        <div class="editor-main">
            <!-- Scene List (PC Only) -->
            <div class="pane-scenes">
                <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700; font-size:13px; background:#f9f9f9;">SCENES</div>
                <div id="scene-list" style="flex:1; overflow-y:auto;"></div>
                <button id="add-scene" style="padding:12px; border-top:1px solid #ddd; font-weight:700; color:#1f8ce6;">+ 장면 추가</button>
            </div>

            <!-- Canvas -->
            <div class="pane-canvas">
                <div style="width:100%; max-width:1000px; aspect-ratio:16/9; background:#000; box-shadow:0 0 20px rgba(0,0,0,0.15); position:relative;">
                    <div id="preview-el" style="width:100%; height:100%;"></div>
                </div>
            </div>

            <!-- Properties -->
            <div class="pane-props">
                <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700;">속성 편집</div>
                <div style="padding:16px;">
                    <label style="display:block; font-size:12px; font-weight:700; color:#666; margin-bottom:4px;">화자</label>
                    <input id="inp-speaker" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:12px;">

                    <label style="display:block; font-size:12px; font-weight:700; color:#666; margin-bottom:4px;">대사</label>
                    <textarea id="inp-text" style="width:100%; height:80px; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:12px; resize:none;"></textarea>

                    <label style="display:block; font-size:12px; font-weight:700; color:#666; margin-bottom:4px;">배경 URL</label>
                    <input id="inp-bg" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; margin-bottom:12px;">

                    <div style="display:flex; gap:10px;">
                        <button id="btn-prev" style="flex:1; padding:8px; border:1px solid #ddd; border-radius:4px;">이전</button>
                        <button id="btn-next" style="flex:1; padding:8px; border:1px solid #ddd; border-radius:4px;">다음</button>
                    </div>

                    <button id="btn-add-line" style="width:100%; padding:10px; background:#1f8ce6; color:white; border-radius:4px; margin-top:20px; font-weight:700;">+ 대사 추가</button>
                </div>
            </div>
        </div>
    `;

    // Initialize Logic
    const renderer = new VNRenderer(container.querySelector('#preview-el'));

    function refresh() {
        renderer.renderScene(currentScene, currentStepIndex);

        // Sync Inputs
        const d = currentScene.dialogues[currentStepIndex] || {};
        container.querySelector('#inp-speaker').value = d.speaker || '';
        container.querySelector('#inp-text').value = d.text || '';
        container.querySelector('#inp-bg').value = currentScene.background || '';

        // Sync Scene List
        const list = container.querySelector('#scene-list');
        list.innerHTML = '';
        project.scenes.forEach((s, i) => {
            const div = document.createElement('div');
            div.style.padding = '12px 16px';
            div.style.borderBottom = '1px solid #f0f0f0';
            div.style.fontSize = '13px';
            div.style.cursor = 'pointer';
            if (s === currentScene) {
                div.style.background = '#e3f2fd';
                div.style.color = '#1f8ce6';
                div.style.fontWeight = '700';
            }
            div.innerText = `${i + 1}. ${s.name || 'Scene'}`;
            div.onclick = () => { currentScene = s; currentStepIndex = 0; refresh(); };
            list.appendChild(div);
        });
    }

    const q = (s) => container.querySelector(s);
    q('#inp-speaker').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].speaker = e.target.value; refresh(); } };
    q('#inp-text').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].text = e.target.value; refresh(); } };
    q('#inp-bg').oninput = (e) => { currentScene.background = e.target.value; refresh(); };
    q('#btn-prev').onclick = () => { if (currentStepIndex > 0) { currentStepIndex--; refresh(); } };
    q('#btn-next').onclick = () => { if (currentStepIndex < currentScene.dialogues.length - 1) { currentStepIndex++; refresh(); } };
    q('#btn-add-line').onclick = () => { currentScene.dialogues.push({ speaker: '', text: '' }); currentStepIndex++; refresh(); };
    q('#add-scene').onclick = () => { project.scenes.push({ id: Date.now(), dialogues: [{}] }); currentScene = project.scenes[project.scenes.length - 1]; currentStepIndex = 0; refresh(); };
    q('#save-btn').onclick = () => { appStore.updateProject(projectId, { scenes: project.scenes }); alert('저장됨'); };
    q('#back-btn').onclick = () => window.navigateTo('#/dashboard');
    q('#play-btn').onclick = () => window.open('#/play?id=' + projectId);

    refresh();
    return container;
}
