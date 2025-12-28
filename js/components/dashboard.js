import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'studio-layout';

    // SVG Icons
    const icons = {
        back: '<svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/></svg>'
    };

    container.innerHTML = `
        <div class="container" style="margin-top:20px;">
            <div class="flex-between" style="margin-bottom:20px;">
                <div class="flex-center" style="gap:10px;">
                    <a href="#/" class="hidden-desktop" style="color:#666;">${icons.back}</a>
                    <h2 class="section-title" style="font-size:20px;">스튜디오</h2>
                </div>
                <button id="create-btn" class="btn-primary" style="font-size:13px; padding:8px 16px;">+ 새 작품</button>
            </div>

            <div class="studio-card">
                <table class="responsive-table">
                    <thead>
                        <tr>
                            <th width="50">#</th>
                            <th align="left">작품 정보</th>
                            <th class="hide-on-mobile">상태</th>
                            <th align="right">관리</th>
                        </tr>
                    </thead>
                    <tbody id="project-list-tbody"></tbody>
                </table>
            </div>

            <div style="margin-top:20px; font-size:12px; color:#94a3b8; text-align:center;">
                모바일 환경에서는 일부 편집 기능이 제한될 수 있습니다.
            </div>
        </div>
        
        <!-- Bottom Nav (Mobile) -->
        <nav class="bottom-nav hidden-desktop">
            <a href="#/" class="nav-item"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg><span>홈</span></a>
            <a href="#/dashboard" class="nav-item active"><svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg><span>스튜디오</span></a>
        </nav>
    `;

    const renderTable = () => {
        const tbody = container.querySelector('#project-list-tbody');
        tbody.innerHTML = '';

        if (appStore.projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="padding:40px; text-align:center; color:#999;">작품이 없습니다.</td></tr>`;
            return;
        }

        appStore.projects.forEach((p, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td align="center" style="color:#94a3b8;">${idx + 1}</td>
                <td>
                    <div style="display:flex; gap:12px; align-items:center;">
                        <img src="${p.cover || `https://via.placeholder.com/40x50/eee/999?text=${p.title[0]}`}" style="width:40px; height:50px; border-radius:4px; object-fit:cover;">
                        <div>
                            <div style="font-weight:600; font-size:14px; margin-bottom:2px;">${p.title}</div>
                            <div style="font-size:11px; color:#94a3b8;">${p.scenes.length}화</div>
                        </div>
                    </div>
                </td>
                <td class="hide-on-mobile"><span style="font-size:11px; background:#eff6ff; color:#3b82f6; padding:2px 6px; border-radius:4px;">연재중</span></td>
                <td align="right">
                    <button class="btn-edit" data-id="${p.id}" style="color:#3b82f6; font-weight:600; font-size:12px; margin-right:10px;">편집</button>
                    <button class="btn-delete" data-id="${p.id}" style="color:#ef4444; font-size:12px;">삭제</button>
                </td>
             `;
            tbody.appendChild(tr);
        });

        // Binds
        tbody.querySelectorAll('.btn-edit').forEach(b => b.onclick = () => window.navigateTo('#/editor?id=' + b.dataset.id));
        tbody.querySelectorAll('.btn-delete').forEach(b => {
            b.onclick = () => { if (confirm('삭제하시겠습니까?')) { appStore.deleteProject(b.dataset.id); renderTable(); } };
        });
    };

    renderTable();
    setTimeout(() => {
        container.querySelector('#create-btn').onclick = () => {
            const t = prompt("새 작품 제목");
            if (t) { appStore.createProject(t); renderTable(); }
        }
    }, 0);

    return container;
}
