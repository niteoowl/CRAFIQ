import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'app-container';
    // On desktop this is centered 768px width. On mobile it's full width.

    const icoBack = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 19l-7-7 7-7"/></svg>`;

    container.innerHTML = `
        <!-- Studio Header -->
        <header class="header-main" style="justify-content:flex-start; gap:12px;">
            <div style="cursor:pointer;" onclick="location.hash='#/'">${icoBack}</div>
            <div class="txt-title-md">Creator Studio</div>
        </header>

        <div class="studio-head">
            <div class="flex-between" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-weight:700; font-size:16px;">내 작품 관리</div>
                    <div class="txt-hint">작품 생성 및 에피소드 관리</div>
                </div>
                <button id="btn-create" style="background:#1a1b1c; color:white; font-weight:700; font-size:13px; padding:8px 16px; border-radius:6px;">새 작품</button>
            </div>
        </div>

        <div class="studio-list" id="list-area">
            <!-- List -->
        </div>
    `;

    const renderList = () => {
        const area = container.querySelector('#list-area');
        area.innerHTML = '';

        if (appStore.projects.length === 0) {
            area.innerHTML = `<div style="padding:60px 0; text-align:center; color:#999; font-size:13px;">등록된 작품이 없습니다.<br>새로운 이야기를 시작해보세요.</div>`;
            return;
        }

        appStore.projects.forEach(p => {
            const div = document.createElement('div');
            div.className = 'project-row';
            div.innerHTML = `
                <div class="project-info">
                    <h3>${p.title}</h3>
                    <p>${p.scenes.length} 에피소드 • <span style="color:#00c853;">연재중</span></p>
                </div>
                <div class="project-acts" style="display:flex; gap:8px;">
                    <button class="btn-edit" data-id="${p.id}">편집</button>
                    <button class="btn-del" data-id="${p.id}" style="color:#e53935; border-color:#ffcdd2;">삭제</button>
                </div>
             `;
            area.appendChild(div);
        });

        // Binds
        area.querySelectorAll('.btn-edit').forEach(b => b.onclick = () => window.navigateTo('#/editor?id=' + b.dataset.id));
        area.querySelectorAll('.btn-del').forEach(b => {
            b.onclick = () => { if (confirm('정말 삭제하시겠습니까?')) { appStore.deleteProject(b.dataset.id); renderList(); } };
        });
    };

    renderList();

    // Bind Create
    setTimeout(() => {
        container.querySelector('#btn-create').onclick = () => {
            const t = prompt("작품 제목을 입력해주세요");
            if (t) { appStore.createProject(t); renderList(); }
        }
    }, 0);

    return container;
}
