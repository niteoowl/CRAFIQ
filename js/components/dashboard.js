import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'container'; // Reuses the centered/shadowed container from standard style

    // Header
    const headerHTML = `
        <header class="app-header">
            <div class="flex-center gap-8">
                <a href="#/" style="font-weight:700; font-size:16px;">&larr;</a>
                <span class="logo-area" style="font-size:16px; color:#333;">크리에이터 스튜디오</span>
            </div>
        </header>
    `;

    container.innerHTML = headerHTML + `
        <div style="padding:20px;">
            <div class="flex-between" style="margin-bottom:20px;">
                <h2 style="font-size:20px; font-weight:800;">작품 관리</h2>
                <button id="create-btn" style="background:#333; color:white; padding:8px 16px; border-radius:4px; font-weight:700; font-size:13px;">+ 새 작품</button>
            </div>

            <div style="border:1px solid #eee; border-radius:8px; overflow:hidden;">
                <table style="width:100%; border-collapse:collapse;">
                    <thead style="background:#f9f9f9; border-bottom:1px solid #eee;">
                        <tr>
                            <th style="padding:12px; text-align:left; font-size:12px; color:#888;">작품명</th>
                            <th style="padding:12px; text-align:right; font-size:12px; color:#888;">관리</th>
                        </tr>
                    </thead>
                    <tbody id="list-body"></tbody>
                </table>
            </div>
        </div>
    `;

    const renderList = () => {
        const tbody = container.querySelector('#list-body');
        tbody.innerHTML = '';
        if (appStore.projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="2" style="padding:30px; text-align:center; color:#999;">작품이 없습니다.</td></tr>`;
            return;
        }
        appStore.projects.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td style="padding:16px; border-bottom:1px solid #f5f5f5;">
                    <div style="font-weight:700; font-size:14px;">${p.title}</div>
                    <div style="font-size:11px; color:#999;">${p.scenes.length} Scenes</div>
                </td>
                <td style="padding:16px; text-align:right; border-bottom:1px solid #f5f5f5;">
                    <button class="edit-btn" data-id="${p.id}" style="color:#00dc64; font-weight:700; font-size:13px; margin-right:8px;">편집</button>
                    <button class="del-btn" data-id="${p.id}" style="color:#ff5252; font-size:13px;">삭제</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        tbody.querySelectorAll('.edit-btn').forEach(b => b.onclick = () => window.navigateTo('#/editor?id=' + b.dataset.id));
        tbody.querySelectorAll('.del-btn').forEach(b => {
            b.onclick = () => { if (confirm('삭제?')) { appStore.deleteProject(b.dataset.id); renderList(); } };
        });
    };

    renderList();
    setTimeout(() => {
        container.querySelector('#create-btn').onclick = () => {
            const t = prompt('제목 입력');
            if (t) { appStore.createProject(t); renderList(); }
        };
    }, 0);

    return container;
}
