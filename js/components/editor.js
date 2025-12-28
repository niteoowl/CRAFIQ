import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Project not found');

    const container = document.createElement('div');
    container.className = 'editor-shell';

    // Use new style logic, simplified inline styles for speed but reliable
    // New Studio Style: White header, Grey bg

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    container.innerHTML = `
        <div style="height:100vh; display:flex; flex-direction:column; background:#f4f5f7;">
            <!-- Header -->
            <div style="height:50px; background:white; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center; padding:0 20px;">
                <div style="display:flex; align-items:center; gap:20px;">
                    <button id="back-btn" style="border:none; background:none; cursor:pointer; font-weight:bold; color:#666;">&larr;</button>
                    <span style="font-weight:bold; color:#333;">${project.title} - 에디터</span>
                </div>
                <div>
                     <button id="save-btn" class="btn-primary" style="font-size:13px; padding:6px 12px;">임시저장</button>
                     <button id="play-btn" class="btn-outline" style="font-size:13px; padding:6px 12px;">미리보기</button>
                </div>
            </div>

            <!-- Body -->
            <div style="flex:1; display:flex; overflow:hidden;">
                <!-- Left: Scene List -->
                <div style="width:240px; background:white; border-right:1px solid #ddd; display:flex; flex-direction:column;">
                    <div style="padding:15px; font-weight:bold; border-bottom:1px solid #eee; font-size:13px; color:#888;">SCENES</div>
                    <div id="scene-list" style="flex:1; overflow-y:auto;"></div>
                    <div style="padding:10px; border-top:1px solid #eee;">
                        <button id="add-scene" style="width:100%; border:1px dashed #ccc; background:#f9f9f9; padding:8px; border-radius:4px; font-size:12px; cursor:pointer;">+ 씬 추가</button>
                    </div>
                </div>

                <!-- Center: Canvas -->
                <div style="flex:1; display:flex; align-items:center; justify-content:center; padding:20px;">
                     <div style="width:100%; max-width:1000px; aspect-ratio:16/9; background:#000; position:relative; box-shadow:0 5px 20px rgba(0,0,0,0.1);">
                        <div id="preview" style="width:100%; height:100%;"></div>
                     </div>
                </div>

                <!-- Right: Properties -->
                <div style="width:300px; background:white; border-left:1px solid #ddd; padding:20px; display:flex; flex-direction:column; gap:15px; overflow-y:auto;">
                    <h3 style="font-size:14px; margin-bottom:10px;">대사 편집 (Step <span id="step-idx">1</span>)</h3>
                    
                    <div>
                        <label style="font-size:12px; color:#888; display:block; margin-bottom:4px;">화자 이름</label>
                        <input id="inp-speaker" type="text" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; font-size:13px;">
                    </div>

                    <div>
                        <label style="font-size:12px; color:#888; display:block; margin-bottom:4px;">대사 내용</label>
                        <textarea id="inp-text" style="width:100%; height:100px; padding:8px; border:1px solid #ddd; border-radius:4px; resize:none; font-size:13px;"></textarea>
                    </div>

                    <div>
                        <label style="font-size:12px; color:#888; display:block; margin-bottom:4px;">배경 이미지 링크</label>
                        <input id="inp-bg" type="text" style="width:100%; padding:8px; border:1px solid #ddd; border-radius:4px; font-size:13px;">
                    </div>

                    <div style="margin-top:20px; border-top:1px solid #eee; pt:20px; display:flex; gap:5px;">
                        <button id="btn-prev" class="btn-outline" style="flex:1;">&larr; 이전</button>
                        <button id="btn-next" class="btn-outline" style="flex:1;">다음 &rarr;</button>
                    </div>
                    <button id="btn-add-line" class="btn-primary" style="width:100%; margin-top:10px;">+ 다음 대사 추가</button>
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
            el.textContent = `${i + 1}. ${s.name || 'Scene'}`;
            el.style.padding = '10px';
            el.style.borderBottom = '1px solid #f0f0f0';
            el.style.fontSize = '13px';
            el.style.cursor = 'pointer';
            if (s === currentScene) {
                el.style.background = '#e8fbf0';
                el.style.color = '#00dc64';
                el.style.fontWeight = 'bold';
            }
            el.onclick = () => { currentScene = s; currentStepIndex = 0; updateUI(); };
            list.appendChild(el);
        });
    };

    // Binding
    container.querySelector('#inp-speaker').oninput = (e) => {
        if (currentScene.dialogues[currentStepIndex]) {
            currentScene.dialogues[currentStepIndex].speaker = e.target.value;
            updateUI(); // re-render canvas immediately
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
        alert('저장 완료');
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
