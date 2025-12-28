export function renderHome() {
    const container = document.createElement('div');

    // SVG Icons
    const icons = {
        home: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>',
        search: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>',
        studio: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>',
        user: '<svg fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>'
    };

    container.innerHTML = `
        <!-- Desktop Header -->
        <header class="gnb hidden-mobile">
            <div class="container gnb-inner flex-between">
                <div class="flex-center" style="gap:40px;">
                    <a href="#/" class="logo">CRAFIQ</a>
                    <nav class="nav-links">
                        <a href="#/" class="active">홈</a>
                        <a href="#/">웹소설</a>
                        <a href="#/">비주얼노벨</a>
                    </nav>
                </div>
                <div class="flex-center" style="gap:16px;">
                    <button onclick="location.hash='#/dashboard'" class="btn-primary">작품 만들기</button>
                    <div style="width:32px; height:32px; background:#ddd; border-radius:50%;"></div>
                </div>
            </div>
        </header>

        <!-- Mobile Header (Logo Only) -->
        <header class="hidden-desktop" style="height:50px; padding:0 20px; align-items:center; border-bottom:1px solid #eee; background:rgba(255,255,255,0.9); backdrop-filter:blur(10px); position:sticky; top:0; z-index:50;">
            <a href="#/" class="logo" style="font-size:18px;">CRAFIQ</a>
        </header>

        <main class="container">
            <!-- Hero Banner -->
            <section style="margin-top:24px; margin-bottom:40px;">
                <div class="hero-card">
                    <img src="https://via.placeholder.com/1200x500/111/333?text=Cinematic+Cover" style="width:100%; height:100%; object-fit:cover;">
                    <div class="hero-content">
                        <div class="hero-badge">Original</div>
                        <h2 style="font-size:28px; font-weight:800; margin-bottom:8px; line-height:1.2;">나의 상상이<br>현실이 되는 곳</h2>
                        <p style="opacity:0.9; margin-bottom:16px; font-size:14px;">지금 바로 비주얼 노벨 작가에 도전하세요.</p>
                        <button onclick="location.hash='#/dashboard'" class="btn-primary" style="width:fit-content;">연재 시작하기</button>
                    </div>
                </div>
            </section>

            <!-- Real-time Ranking -->
            <section>
                <div class="section-head">
                    <h3 class="section-title">실시간 인기 랭킹</h3>
                    <a href="#" class="section-link">더보기</a>
                </div>
                <div class="rank-list">
                    ${renderRankItem(1, "회귀한 천재 플레이어", "판타지 | 김작가", "https://via.placeholder.com/100x140/3b82f6/fff?text=1")}
                    ${renderRankItem(2, "마법학원 최강자", "학원물 | 이작가", "https://via.placeholder.com/100x140/ef4444/fff?text=2")}
                    ${renderRankItem(3, "황녀님의 이중생활", "로판 | 박작가", "https://via.placeholder.com/100x140/ec4899/fff?text=3")}
                </div>
            </section>

            <!-- New Grid -->
            <section style="margin-bottom:80px;">
                <div class="section-head">
                    <h3 class="section-title">오늘의 신작 비주얼 노벨</h3>
                </div>
                <div class="grid-responsive">
                    ${renderCard("던전에서 요리하기", "판타지", "https://via.placeholder.com/200x280/10b981/fff?text=Cook")}
                    ${renderCard("내 여자친구는 AI", "SF/로맨스", "https://via.placeholder.com/200x280/8b5cf6/fff?text=AI")}
                    ${renderCard("서울 2077", "사이버펑크", "https://via.placeholder.com/200x280/06b6d4/fff?text=2077")}
                    ${renderCard("슬라임 육성일기", "힐링", "https://via.placeholder.com/200x280/84cc16/fff?text=Slime")}
                    ${renderCard("학교 괴담 실록", "공포", "https://via.placeholder.com/200x280/71717a/fff?text=Ghost")}
                </div>
            </section>
        </main>

        <!-- Bottom Navigation (Mobile Only) -->
        <nav class="bottom-nav hidden-desktop">
            <a href="#/" class="nav-item active">
                ${icons.home}
                <span>홈</span>
            </a>
            <a href="#" class="nav-item">
                ${icons.search}
                <span>검색</span>
            </a>
            <a href="#/dashboard" class="nav-item">
                ${icons.studio}
                <span>스튜디오</span>
            </a>
            <a href="#" class="nav-item">
                ${icons.user}
                <span>MY</span>
            </a>
        </nav>
    `;

    return container;
}

function renderRankItem(rank, title, meta, img) {
    return `
        <div class="rank-item">
            <div class="rank-num">${rank}</div>
            <div class="rank-thumb"><img src="${img}"></div>
            <div style="flex:1;">
                <div style="font-weight:700; font-size:14px; margin-bottom:4px;">${title}</div>
                <div style="font-size:12px; color:#64748b;">${meta}</div>
            </div>
            <div style="font-size:11px; color:#ef4444; background:#fee2e2; padding:2px 6px; border-radius:4px;">UP</div>
        </div>
    `;
}

function renderCard(title, genre, img) {
    return `
        <div class="card-item">
            <div class="card-thumb">
                <img src="${img}">
                <div style="position:absolute; top:6px; left:6px; background:rgba(0,0,0,0.6); color:white; font-size:10px; padding:2px 6px; border-radius:4px; backdrop-filter:blur(4px);">VN</div>
            </div>
            <div class="card-info">
                <h3>${title}</h3>
                <p>${genre}</p>
            </div>
        </div>
    `;
}
