export function renderHome() {
    const container = document.createElement('div');
    container.className = 'container';

    // Icons
    const ico = {
        home: '<svg width="24" height="24" fill="none" class="tab-icon" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>',
        search: '<svg width="24" height="24" fill="none" class="tab-icon" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>',
        star: '<svg width="24" height="24" fill="none" class="tab-icon" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>',
        user: '<svg width="24" height="24" fill="none" class="tab-icon" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
        write: '<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>'
    };

    container.innerHTML = `
        <!-- HEADER -->
        <header class="app-header">
            <div class="logo-area" style="color:#00dc64;">CRAFIQ</div>
            <div class="flex-center gap-8">
                <!-- Desktop Search -->
                <div class="desktop-only search-box" style="margin-right:12px;"></div> 
                
                <!-- Studio Button (Both Mobile/Desktop) -->
                <button onclick="location.hash='#/dashboard'" class="btn-studio flex-center gap-8">
                    ${ico.write} <span>스튜디오</span>
                </button>
            </div>
        </header>

        <!-- CONTENT -->
        <main style="padding-bottom: 20px;">
            <!-- Main Banner -->
            <div class="hero-banner">
                <img src="https://via.placeholder.com/800x400/111/fff?text=GRAND+OPEN" style="width:100%; height:100%;">
            </div>

            <!-- New Releases (Horizontal Scroll on Mobile) -->
            <section class="section">
                <div class="section-title">
                    <span>오늘의 신작</span>
                    <a class="more-link">전체보기</a>
                </div>
                <div class="scroll-row">
                    ${renderCard("나 혼자만 만렙", "판타지", "https://via.placeholder.com/150x225/333/fff?text=Solo")}
                    ${renderCard("황녀님의 티타임", "로맨스", "https://via.placeholder.com/150x225/e91e63/fff?text=Tea")}
                    ${renderCard("천재배우의 아우라", "현대물", "https://via.placeholder.com/150x225/2196f3/fff?text=Actor")}
                    ${renderCard("서울역 네크로맨서", "판타지", "https://via.placeholder.com/150x225/4caf50/fff?text=Necro")}
                    ${renderCard("전생했더니 슬라임", "이세계", "https://via.placeholder.com/150x225/ff9800/fff?text=Slime")}
                </div>
            </section>

            <!-- Ranking List (Vertical) -->
            <section class="section">
                <div class="section-title">
                    <span>실시간 랭킹</span>
                </div>
                <div class="ranking-list">
                    ${renderRankItem(1, "재벌집 막내아들", "산경 • 판타지")}
                    ${renderRankItem(2, "전지적 작가 시점", "싱숑 • 판타지")}
                    ${renderRankItem(3, "화산귀환", "비가 • 무협")}
                    ${renderRankItem(4, "데뷔 못 가면 죽는 병", "백덕수 • 현판")}
                    ${renderRankItem(5, "광마회귀", "유진성 • 무협")}
                </div>
            </section>
        </main>

        <!-- BOTTOM TAB BAR (Mobile Only via CSS) -->
        <nav class="tab-bar mobile-only">
            <div class="tab-item active">
                ${ico.home}
                <span class="tab-label">홈</span>
            </div>
            <div class="tab-item">
                ${ico.search}
                <span class="tab-label">탐색</span>
            </div>
            <div class="tab-item">
                ${ico.star}
                <span class="tab-label">베스트</span>
            </div>
            <div class="tab-item">
                ${ico.user}
                <span class="tab-label">MY</span>
            </div>
        </nav>
    `;

    return container;
}

function renderCard(title, genre, img) {
    return `
        <div class="scroll-item">
            <div class="cover-img">
                <img src="${img}" loading="lazy">
                <div style="position:absolute; bottom:0; left:0; width:100%; height:40px; background:linear-gradient(to top, rgba(0,0,0,0.5), transparent);"></div>
            </div>
            <div style="font-weight:700; font-size:13px; margin-bottom:2px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</div>
            <div style="font-size:11px; color:#999;">${genre}</div>
        </div>
    `;
}

function renderRankItem(rank, title, meta) {
    return `
        <div class="rank-row">
            <div class="rank-num ${rank <= 3 ? 'text-primary' : ''}" style="color:${rank <= 3 ? '#00dc64' : '#333'}">${rank}</div>
            <div style="width:50px; height:66px; margin-right:12px; background:#eee; border-radius:4px; overflow:hidden;">
                <img src="https://via.placeholder.com/50x66/ddd/fff?text=${rank}" style="width:100%; height:100%;">
            </div>
            <div class="rank-info">
                <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${title}</div>
                <div style="font-size:12px; color:#888;">${meta}</div>
            </div>
            <div style="font-size:12px; border:1px solid #eee; padding:4px 10px; border-radius:14px; color:#666;">첫화보기</div>
        </div>
    `;
}
