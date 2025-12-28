import { appStore } from '../store.js';
import { VNRenderer } from '../engine/renderer.js';

export function renderEditor(params) {
    const projectId = params.get('id');
    const project = appStore.getProject(projectId);

    if (!project) return document.createTextNode('Error');

    const container = document.createElement('div');
    container.className = 'editor-shell';

    let currentScene = project.scenes[0];
    let currentStepIndex = 0;

    // Header
    const headerHTML = `
        <header style="height:50px; border-bottom:1px solid #ddd; display:flex; justify-content:space-between; align-items:center; padding:0 16px; background:white;">
            <div class="flex items-center gap-10">
                <button id="back-btn" style="font-size:20px; color:#555;">&larr;</button>
                <div style="font-weight:700; color:#111;">${project.title} <span style="font-weight:400; color:#888; font-size:12px;">(자동 저장됨)</span></div>
            </div>
            <div class="flex gap-10">
                <button id="play-btn" style="padding:6px 12px; background:#eee; font-weight:600; border-radius:4px; font-size:13px;">미리보기</button>
                <button id="save-btn" style="padding:6px 12px; background:var(--brand-primary); color:white; font-weight:600; border-radius:4px; font-size:13px;">전체 저장</button>
            </div>
        </header>
    `;

    // Main Body
    const bodyHTML = `
        <div class="flex" style="flex:1; overflow:hidden;">
            <!-- Scene List -->
            <aside style="width:240px; background:white; border-right:1px solid #ddd; display:flex; flex-direction:column;">
                <div style="padding:12px; font-size:11px; font-weight:800; color:#999; letter-spacing:1px; border-bottom:1px solid #eee;">SCENE LIST</div>
                <div id="scene-list-el" style="flex:1; overflow-y:auto;"></div>
                <button id="add-scene-btn" style="padding:15px; font-weight:700; color:var(--brand-primary); border-top:1px solid #eee; text-align:left;">+ 새로운 장면 추가</button>
            </aside>

            <!-- Canvas Section -->
            <section style="flex:1; background:#e0e0e0; display:flex; align-items:center; justify-content:center; padding:40px;">
                <div style="width:100%; max-width:1000px; aspect-ratio:16/9; background:black; box-shadow:0 10px 30px rgba(0,0,0,0.2); position:relative;">
                    <div id="preview-el" style="width:100%; height:100%;"></div>
                </div>
            </section>

            <!-- Inspector Section -->
            <aside style="width:320px; background:white; border-left:1px solid #ddd; display:flex; flex-direction:column; overflow-y:auto;">
                <div style="padding:16px; border-bottom:1px solid #eee;">
                    <h3 style="font-size:15px; font-weight:800; margin-bottom:5px;">스크립트 편집</h3>
                    <div style="font-size:12px; color:#666;">Step <span id="step-count">1</span> / <span id="step-total">1</span></div>
                </div>

                <div style="padding:20px; display:flex; flex-direction:column; gap:20px;">
                    <div>
                        <label style="font-size:12px; font-weight:700; color:#444; margin-bottom:6px; display:block;">화자 이름 (Speaker)</label>
                        <input id="inp-speaker" type="text" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;" placeholder="예: 주인공">
                    </div>
                    
                    <div>
                        <label style="font-size:12px; font-weight:700; color:#444; margin-bottom:6px; display:block;">대사 내용 (Text)</label>
                        <textarea id="inp-text" style="width:100%; height:120px; padding:10px; border:1px solid #ccc; border-radius:4px; resize:none;" placeholder="대사를 입력하세요..."></textarea>
                    </div>

                    <div>
                        <label style="font-size:12px; font-weight:700; color:#444; margin-bottom:6px; display:block;">배경 이미지 (URL)</label>
                        <input id="inp-bg" type="text" style="width:100%; padding:10px; border:1px solid #ccc; border-radius:4px;" placeholder="https://...">
                    </div>
                    
                    <div style="display:flex; gap:10px; margin-top:10px;">
                        <button id="btn-prev" style="flex:1; padding:10px; border:1px solid #ccc; border-radius:4px; font-weight:600;">이전</button>
                        <button id="btn-next" style="flex:1; padding:10px; border:1px solid #ccc; border-radius:4px; font-weight:600;">다음</button>
                    </div>

                    <button id="btn-add-line" style="width:100%; padding:12px; background:var(--brand-primary); color:white; border-radius:4px; font-weight:700;">+ 다음 대사 추가</button>
                </div>
            </aside>
        </div>
    `;

    container.innerHTML = headerHTML + bodyHTML;

    // Logic
    const renderer = new VNRenderer(container.querySelector('#preview-el'));

    function refresh() {
        renderer.renderScene(currentScene, currentStepIndex);

        // Form Sync
        const d = currentScene.dialogues[currentStepIndex] || {};
        container.querySelector('#inp-speaker').value = d.speaker || '';
        container.querySelector('#inp-text').value = d.text || '';
        container.querySelector('#inp-bg').value = currentScene.background || '';

        container.querySelector('#step-count').innerText = currentStepIndex + 1;
        container.querySelector('#step-total').innerText = currentScene.dialogues.length;

        // Scene List
        const listEl = container.querySelector('#scene-list-el');
        listEl.innerHTML = '';
        project.scenes.forEach((s, i) => {
            const item = document.createElement('div');
            item.innerText = `${i + 1}. ${s.name || 'Unnamed Scene'}`;
            item.style.padding = '12px 16px';
            item.style.fontSize = '13px';
            item.style.cursor = 'pointer';
            if (s === currentScene) {
                item.style.background = '#e3f2fd';
                item.style.color = 'var(--brand-primary)';
                item.style.fontWeight = '700';
            } else {
                item.style.color = '#333';
            }
            item.onclick = () => { currentScene = s; currentStepIndex = 0; refresh(); };
            listEl.appendChild(item);
        });
    }

    // Bindings
    const getEl = (id) => container.querySelector(id);

    getEl('#inp-speaker').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].speaker = e.target.value; refresh(); } };
    getEl('#inp-text').oninput = (e) => { if (currentScene.dialogues[currentStepIndex]) { currentScene.dialogues[currentStepIndex].text = e.target.value; refresh(); } };
    getEl('#inp-bg').oninput = (e) => { currentScene.background = e.target.value; refresh(); };

    getEl('#btn-prev').onclick = () => { if (currentStepIndex > 0) { currentStepIndex--; refresh(); } };
    getEl('#btn-next').onclick = () => { if (currentStepIndex < currentScene.dialogues.length - 1) { currentStepIndex++; refresh(); } };
    getEl('#btn-add-line').onclick = () => { currentScene.dialogues.push({ speaker: '???', text: '...' }); currentStepIndex = currentScene.dialogues.length - 1; refresh(); };
    getEl('#add-scene-btn').onclick = () => { project.scenes.push({ id: 's' + Date.now(), name: 'New Scene', dialogues: [{ speaker: '', text: '' }], background: '' }); currentScene = project.scenes[project.scenes.length - 1]; currentStepIndex = 0; refresh(); };

    getEl('#save-btn').onclick = () => { appStore.updateProject(projectId, { scenes: project.scenes }); alert('저장 완료'); };
    getEl('#back-btn').onclick = () => window.navigateTo('#/dashboard');
    getEl('#play-btn').onclick = () => window.open('#/play?id=' + projectId);

    refresh();
    return container;
}
