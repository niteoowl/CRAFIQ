import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Load Error');

    const container = document.createElement('div');
    container.className = 'editor-wrap';

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <header class="editor-header">
            <div style="display:flex; align-items:center; gap:16px;">
                 <button id="back-btn" style="color:var(--gray-700); font-weight:600;">&larr; 나가기</button>
                 <span class="editor-title">${project.title}</span>
            </div>
            <div style="display:flex; gap:8px;">
                <button id="play-btn" class="btn-secondary">미리보기</button>
                <button id="save-btn" class="btn-primary">저장하기</button>
            </div>
        </header>

        <div class="editor-body">
            <!-- Scene List Panel -->
            <div class="panel-left">
                <div style="padding:12px 16px; border-bottom:1px solid var(--gray-200); font-size:12px; font-weight:700; color:var(--gray-500);">SCENES</div>
                <div id="scene-list" style="flex:1; overflow-y:auto;"></div>
                <div style="padding:12px; border-top:1px solid var(--gray-200);">
                    <button id="add-scene" class="btn-secondary" style="width:100%; border-style:dashed;">+ 장면 추가</button>
                </div>
            </div>

            <!-- Canvas Area -->
            <div class="canvas-wrap">
                 <!-- 16:9 Aspect Ratio Container -->
                 <div style="width:100%; max-width:1024px; aspect-ratio:16/9; background:#000; box-shadow: 0 4px 20px rgba(0,0,0,0.15); border-radius:4px; overflow:hidden;">
                    <div id="preview" style="width:100%; height:100%;"></div>
                 </div>
            </div>

            <!-- Properties Panel -->
            <div class="panel-right">
                <div style="padding:16px; border-bottom:1px solid var(--gray-200);">
                    <h3 style="font-size:14px; margin-bottom:4px;">대사 편집</h3>
                    <div style="font-size:12px; color:var(--gray-500);">Step <span id="step-idx">1</span></div>
                </div>

                <div class="form-group">
                    <label class="form-label">화자 (Speaker)</label>
                    <input id="inp-speaker" class="form-input" placeholder="이름을 입력하세요">
                </div>
                
                <div class="form-group">
                    <label class="form-label">대사 (Text)</label>
                    <textarea id="inp-text" class="form-input form-textarea" placeholder="대사를 입력하세요"></textarea>
                </div>

                <div class="form-group">
                    <label class="form-label">배경 이미지 (URL)</label>
                    <input id="inp-bg" class="form-input" placeholder="URL 입력">
                </div>

                <div style="padding:16px; display:flex; gap:8px;">
                    <button id="btn-prev" class="btn-secondary" style="flex:1;">&larr; 이전</button>
                    <button id="btn-next" class="btn-secondary" style="flex:1;">다음 &rarr;</button>
                </div>

                 <div style="padding:0 16px 16px 16px;">
                    <button id="btn-add-line" class="btn-primary" style="width:100%;">+ 다음 대사장 추가</button>
                </div>
            </div>
        </div>
    `;

    const renderer = new VNRenderer(container.querySelector('#preview'));

    // --- Logic ---
    const updateUI = () => {
        renderer.renderScene(currentScene, currentStepIndex);
        const d = currentScene.dialogues[currentStepIndex] || {};

        container.querySelector('#inp-speaker').value = d.speaker || '';
        container.querySelector('#inp-text').value = d.text || '';
        container.querySelector('#inp-bg').value = currentScene.background || '';
        container.querySelector('#step-idx').textContent = currentStepIndex + 1;

        renderSceneList();
    };

    const renderSceneList = () => {
        const list = container.querySelector('#scene-list');
        list.innerHTML = '';
        project.scenes.forEach((s, i) => {
            const el = document.createElement('div');
            el.className = 'scene-item' + (s === currentScene ? ' active' : '');
            el.textContent = `${i + 1}. ${s.name || 'Scene'}`;
            el.onclick = () => { currentScene = s; currentStepIndex = 0; updateUI(); };
            list.appendChild(el);
        });
    };

    // Binding
    container.querySelector('#inp-speaker').oninput = (e) => {
        if (currentScene.dialogues[currentStepIndex]) {
            currentScene.dialogues[currentStepIndex].speaker = e.target.value;
            updateUI();
        }
    };
    container.querySelector('#inp-text').oninput = (e) => {
        if (currentScene.dialogues[currentStepIndex]) {
            currentScene.dialogues[currentStepIndex].text = e.target.value;
            updateUI();
        }
    };
    container.querySelector('#inp-bg').onchange = (e) => {
        currentScene.background = e.target.value;
        updateUI();
    };

    container.querySelector('#back-btn').onclick = () => window.navigateTo('#/dashboard');
    container.querySelector('#save-btn').onclick = () => {
        appStore.updateProject(projectId, { scenes: project.scenes });
        alert('저장되었습니다.');
    };
    container.querySelector('#play-btn').onclick = () => window.open('#/play?id=' + projectId, '_blank');

    container.querySelector('#btn-prev').onclick = () => { if (currentStepIndex > 0) { currentStepIndex--; updateUI(); } };
    container.querySelector('#btn-next').onclick = () => { if (currentStepIndex < currentScene.dialogues.length - 1) { currentStepIndex++; updateUI(); } };
    container.querySelector('#btn-add-line').onclick = () => {
        currentScene.dialogues.push({ speaker: '???', text: '...' });
        currentStepIndex++;
        updateUI();
    };

    container.querySelector('#add-scene').onclick = () => {
        project.scenes.push({ id: 'sc' + Date.now(), name: 'New Scene', dialogues: [{ speaker: '', text: '' }], background: '' });
        currentScene = project.scenes[project.scenes.length - 1];
        currentStepIndex = 0;
        updateUI();
    };

    updateUI();
    return container;
}
