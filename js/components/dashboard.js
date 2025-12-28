import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'studio-layout';

    // Header + Sidebar Layout
    container.innerHTML = `
        <header style="height:60px; background:white; border-bottom:1px solid #ddd; position:fixed; width:100%; top:0; z-index:1001; display:flex; align-items:center; padding:0 20px; justify-content:space-between;">
             <div class="flex items-center gap-20">
                <a href="#/" style="font-size:18px; font-weight:900; color:var(--brand-primary);">CRAFIQ Creators</a>
                <span style="font-size:12px; color:#666; border-left:1px solid #ddd; padding-left:20px;">작가 스튜디오</span>
             </div>
             <div class="flex items-center gap-10">
                 <span style="font-size:13px; font-weight:600;">Guest 작가님</span>
                 <button style="font-size:12px; border:1px solid #ddd; padding:4px 8px; border-radius:4px;">로그아웃</button>
             </div>
        </header>

        <nav class="studio-nav">
            <a href="#/dashboard" class="nav-item active">작품 관리</a>
            <a href="#" class="nav-item">통계/리포트</a>
            <a href="#" class="nav-item">정산 관리</a>
            <a href="#" class="nav-item">작품 설정</a>
            <a href="#" class="nav-item">공지사항</a>
        </nav>

        <main class="studio-main">
            <div class="flex justify-between items-center" style="margin-bottom:24px;">
                <h2 style="font-size:24px; font-weight:800;">내 작품 관리</h2>
                <button id="create-btn" style="background:var(--brand-primary); color:white; padding:10px 20px; border-radius:4px; font-weight:700; font-size:14px;">+ 새 작품 등록</button>
            </div>

            <div style="background:white; border:1px solid #ddd; border-radius:8px; overflow:hidden;">
                <table style="width:100%; border-collapse:collapse; font-size:14px;">
                    <thead style="background:#f9fafb; border-bottom:1px solid #eee;">
                        <tr>
                            <th style="padding:16px; text-align:left; color:#555; font-weight:600; width:50%;">작품명</th>
                            <th style="padding:16px; text-align:center; color:#555; font-weight:600;">업데이트</th>
                            <th style="padding:16px; text-align:center; color:#555; font-weight:600;">상태</th>
                            <th style="padding:16px; text-align:center; color:#555; font-weight:600;">관리</th>
                        </tr>
                    </thead>
                    <tbody id="project-list-tbody"></tbody>
                </table>
            </div>
        </main>
    `;

    const renderTable = () => {
        const tbody = container.querySelector('#project-list-tbody');
        tbody.innerHTML = '';

        if (appStore.projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="padding:60px; text-align:center; color:#999;">등록된 작품이 없습니다.<br>새 작품을 등록하여 연재를 시작해보세요.</td></tr>`;
            return;
        }

        appStore.projects.forEach(p => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #f0f0f0';
            const date = new Date(p.created || Date.now()).toISOString().split('T')[0];

            tr.innerHTML = `
                <td style="padding:20px;">
                    <div class="flex gap-20">
                        <div style="width:60px; height:80px; background:#eee; border-radius:4px; overflow:hidden;">
                             <img src="${p.cover || `https://via.placeholder.com/60x80/ccc/fff?text=${p.title[0]}`}" style="width:100%; height:100%; object-fit:cover;">
                        </div>
                        <div class="flex flex-col justify-center">
                            <div style="font-size:16px; font-weight:700; margin-bottom:4px;">${p.title}</div>
                            <div style="font-size:12px; color:#888;">ID: ${p.id}</div>
                        </div>
                    </div>
                </td>
                <td style="text-align:center; color:#666;">${date}</td>
                <td style="text-align:center;"><span style="color:#00c853; font-weight:700; background:#e8f5e9; padding:4px 8px; border-radius:4px; font-size:12px;">연재중</span></td>
                <td style="text-align:center;">
                    <button class="btn-edit text-brand font-bold" data-id="${p.id}" style="margin-right:10px;">작품 편집</button>
                    <button class="btn-delete" data-id="${p.id}" style="color:#e53935; text-decoration:underline;">삭제</button>
                </td>
             `;
            tbody.appendChild(tr);
        });

        // Binds
        tbody.querySelectorAll('.btn-edit').forEach(b => b.onclick = () => window.navigateTo('#/editor?id=' + b.dataset.id));
        tbody.querySelectorAll('.btn-delete').forEach(b => {
            b.onclick = () => { if (confirm('정말 삭제하시겠습니까?')) { appStore.deleteProject(b.dataset.id); renderTable(); } };
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
