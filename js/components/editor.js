import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Error');

    const container = document.createElement('div');
    container.className = 'editor-layout'; // Use new class from style.css

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <header class="editor-header">
            <div style="display:flex; align-items:center; gap:10px;">
                <button id="back-btn" style="font-weight:700;">&larr;</button>
                <div style="font-weight:700;">${project.title}</div>
            </div>
            <div style="display:flex; gap:8px;">
                <button id="play-btn" class="btn-outline">미리보기</button>
                <button id="save-btn" class="btn-primary">저장</button>
            </div>
        </header>

        <div class="editor-body">
            <!-- Left: Scene List (PC Only usually, but we handle in CSS) -->
            <div class="col-scenes">
                <div style="padding:12px; font-weight:700; background:#f5f5f5; border-bottom:1px solid #ddd; font-size:13px;">장면 목록</div>
                <div id="scene-list-el" style="flex:1; overflow-y:auto;"></div>
                <button id="add-scene" style="width:100%; padding:12px; border-top:1px solid #ddd; font-weight:700; color:var(--color-primary);">+ 장면 추가</button>
            </div>

            <!-- Center: Canvas -->
            <div class="col-canvas">
                <div style="width:100%; max-width:1000px; aspect-ratio:16/9; background:#000; box-shadow:0 0 20px rgba(0,0,0,0.2); position:relative;">
                    <div id="preview-el" style="width:100%; height:100%;"></div>
                </div>
            </div>

            <!-- Right: Properties -->
            <div class="col-props">
                <div style="padding:16px; border-bottom:1px solid #eee; font-weight:700;">속성 편집</div>
                <div style="padding:16px;">
                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:6px;">화자 (Speaker)</label>
                    <input id="inp-speaker" class="inp-field" placeholder="예: 주인공">

                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:6px;">대사 (Text)</label>
                    <textarea id="inp-text" class="inp-field" style="height:100px; resize:none;" placeholder="내용 입력"></textarea>

                    <label style="display:block; font-size:12px; font-weight:600; margin-bottom:6px;">배경 이미지 (URL)</label>
                    <input id="inp-bg" class="inp-field" placeholder="https://...">

                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button id="btn-prev" class="btn-outline" style="flex:1;">&larr; 이전</button>
                        <button id="btn-next" class="btn-outline" style="flex:1;">다음 &rarr;</button>
                    </div>

                    <button id="btn-add-line" class="btn-primary" style="width:100%; margin-top:20px;">+ 대사 추가</button>
                </div>
            </div>
        </div>
    `;

    // Logic
    const renderer = new VNRenderer(container.querySelector('#preview-el'));

    function refresh() {
        renderer.renderScene(currentScene, currentStepIndex);

        // Sync Inputs
        const d = currentScene.dialogues[currentStepIndex] || {};
        container.querySelector('#inp-speaker').value = d.speaker || '';
        container.querySelector('#inp-text').value = d.text || '';
        container.querySelector('#inp-bg').value = currentScene.background || '';

        // Sync List
        const list = container.querySelector('#scene-list-el');
        list.innerHTML = '';
        project.scenes.forEach((s, i) => {
            const div = document.createElement('div');
            div.className = 'scene-item' + (s === currentScene ? ' active' : '');
            div.innerText = `${i + 1}. ${s.name || 'Scene'}`;
            div.onclick = () => { currentScene = s; currentStepIndex = 0; refresh(); };
            list.appendChild(div);
        });
    }

    // Binds
    const q = (sel) => container.querySelector(sel);
    q('#inp-speaker').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].speaker = e.target.value; refresh(); } };
    q('#inp-text').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].text = e.target.value; refresh(); } };
    q('#inp-bg').oninput = (e) => { currentScene.background = e.target.value; refresh(); };
    q('#btn-prev').onclick = () => { if (currentStepIndex > 0) { currentStepIndex--; refresh(); } };
    q('#btn-next').onclick = () => { if (currentStepIndex < currentScene.dialogues.length - 1) { currentStepIndex++; refresh(); } };
    q('#btn-add-line').onclick = () => { currentScene.dialogues.push({ speaker: '', text: '' }); currentStepIndex++; refresh(); };
    q('#add-scene').onclick = () => { project.scenes.push({ id: Date.now(), dialogues: [{}], background: '' }); currentScene = project.scenes[project.scenes.length - 1]; currentStepIndex = 0; refresh(); };

    q('#save-btn').onclick = () => { appStore.updateProject(projectId, { scenes: project.scenes }); alert('저장됨'); };
    q('#back-btn').onclick = () => window.navigateTo('#/dashboard');
    q('#play-btn').onclick = () => window.open('#/play?id=' + projectId);

    refresh();
    return container;
}
