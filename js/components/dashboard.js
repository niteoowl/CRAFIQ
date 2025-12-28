import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'studio-container';

    container.innerHTML = `
        <div class="studio-head">
            <div class="studio-title">작품 보관함</div>
            <button id="create-btn" class="btn-primary">+ 새 작품 만들기</button>
        </div>

        <div>
            <table class="project-table">
                <thead>
                    <tr>
                        <th width="60">No</th>
                        <th>작품명</th>
                        <th width="100">회차</th>
                        <th width="120">상태</th>
                        <th width="180">관리</th>
                    </tr>
                </thead>
                <tbody id="project-list-tbody">
                    <!-- Inject -->
                </tbody>
            </table>
        </div>
        
        <div style="margin-top:20px; text-align:center; color:#999; font-size:13px;">
            작품을 생성하고 자유롭게 연재해보세요.
        </div>
    `;

    const renderTable = () => {
        const tbody = container.querySelector('#project-list-tbody');
        tbody.innerHTML = '';

        if (appStore.projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="padding:60px 0; text-align:center; color:#999;">보관된 작품이 없습니다.</td></tr>`;
            return;
        }

        appStore.projects.forEach((p, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td class="title-cell">${p.title}</td>
                <td>${p.scenes.length}</td>
                <td><span style="font-size:12px; color:var(--brand-primary); background:#ebf6ff; padding:2px 6px; border-radius:3px;">연재중</span></td>
                <td>
                    <button class="btn-secondary btn-edit" data-id="${p.id}" style="padding:4px 10px; font-size:12px;">편집</button>
                    <button class="btn-secondary btn-delete" data-id="${p.id}" style="padding:4px 10px; font-size:12px; color:#d32f2f; border-color:#ffcdd2;">삭제</button>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Events
        tbody.querySelectorAll('.btn-edit').forEach(b => {
            b.onclick = () => window.navigateTo('#/editor?id=' + b.dataset.id);
        });
        tbody.querySelectorAll('.btn-delete').forEach(b => {
            b.onclick = () => {
                if (confirm('삭제하시겠습니까?')) {
                    appStore.deleteProject(b.dataset.id);
                    renderTable();
                }
            };
        });
    };

    renderTable();

    setTimeout(() => {
        container.querySelector('#create-btn').onclick = () => {
            const title = prompt("작품 제목을 입력하세요");
            if (title) {
                appStore.createProject(title);
                renderTable();
            }
        };
    }, 0);

    return container;
}
