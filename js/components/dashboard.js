import { appStore } from '../store.js';

export function renderDashboard() {
    const container = document.createElement('div');
    container.className = 'studio-layout';

    container.innerHTML = `
        <div class="studio-header">
            <div style="display:flex; align-items:center; gap:20px;">
                <a href="#/" style="font-weight:900; font-size:18px; color:#00dc64;">CRAFIQ Creators</a>
                <span style="font-size:14px; color:#999;">창작 스튜디오</span>
            </div>
            <div style="font-size:14px;"><strong>Author</strong>님</div>
        </div>

        <div class="studio-content">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px; border-bottom:1px solid #eee; padding-bottom:15px;">
                <h2 style="font-size:20px;">내 작품 목록</h2>
                <button id="create-btn" class="btn-primary">+ 새 작품 등록</button>
            </div>

            <div class="alert-box" style="background:#f0fcf5; border:1px solid #00dc64; padding:15px; border-radius:4px; font-size:13px; color:#333; margin-bottom:20px;">
                <strong>📢 공지</strong> 나만의 비주얼 노벨을 만들어 독자들에게 보여주세요! 작가님의 상상력을 응원합니다.
            </div>

            <table style="width:100%; border-collapse:collapse; font-size:14px;">
                <thead>
                    <tr style="background:#f9f9f9; border-top:1px solid #333; border-bottom:1px solid #ddd;">
                        <th style="padding:12px; text-align:left; width:60px;">번호</th>
                        <th style="padding:12px; text-align:left;">작품명</th>
                        <th style="padding:12px; text-align:center; width:100px;">회차수</th>
                        <th style="padding:12px; text-align:center; width:150px;">상태</th>
                        <th style="padding:12px; text-align:center; width:180px;">관리</th>
                    </tr>
                </thead>
                <tbody id="project-list-tbody">
                    <!-- Javascript Inject -->
                </tbody>
            </table>
        </div>
    `;

    const renderTable = () => {
        const tbody = container.querySelector('#project-list-tbody');
        tbody.innerHTML = '';

        if (appStore.projects.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" style="padding:40px; text-align:center; color:#999;">등록된 작품이 없습니다.</td></tr>`;
            return;
        }

        appStore.projects.forEach((p, idx) => {
            const tr = document.createElement('tr');
            tr.style.borderBottom = '1px solid #eee';
            tr.innerHTML = `
                <td style="padding:12px;">${idx + 1}</td>
                <td style="padding:12px;">
                    <div style="font-weight:bold;">${p.title}</div>
                    <div style="font-size:12px; color:#999;">ID: ${p.id}</div>
                </td>
                <td style="padding:12px; text-align:center;">${p.scenes.length}화</td>
                <td style="padding:12px; text-align:center;">
                    <span style="padding:2px 6px; border:1px solid #ddd; border-radius:3px; font-size:11px; color:#666;">연재중</span>
                </td>
                <td style="padding:12px; text-align:center;">
                    <button class="btn-outline btn-edit" data-id="${p.id}" style="padding:5px 10px; font-size:12px;">에디터 접속</button>
                    <button class="btn-outline btn-delete" data-id="${p.id}" style="padding:5px 10px; font-size:12px; color:red; border-color:#ffcccc;">삭제</button>
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
                if (confirm('정말 삭제하시겠습니까?')) {
                    appStore.deleteProject(b.dataset.id);
                    renderTable();
                }
            };
        });
    };

    renderTable();

    setTimeout(() => {
        container.querySelector('#create-btn').onclick = () => {
            const title = prompt("새 작품 제목을 입력해주세요.");
            if (title) {
                appStore.createProject(title);
                renderTable();
            }
        };
    }, 0);

    return container;
}
