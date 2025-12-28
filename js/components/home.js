export function renderHome() {
    const container = document.createElement('div');
    container.className = 'wrapper';

    const ico = {
        pen: `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>`,
        home: `<svg width="24" height="24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
        disc: `<svg width="24" height="24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10"/><path stroke-linecap="round" stroke-linejoin="round" d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>`,
        best: `<svg width="24" height="24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
        my: `<svg width="24" height="24" fill="none" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`
    };

    container.innerHTML = `
        <!-- Header -->
        <header class="header-wrap">
            <div class="flex items-center">
                <div class="brand">CRAFIQ</div>
                <nav class="nav-pc">
                    <a href="#/">홈</a>
                    <a href="#/">탐색</a>
                    <a href="#/">베스트</a>
                    <a href="#/">보관함</a>
                </nav>
            </div>
            <div class="flex items-center gap-20">
                <button class="flex items-center gap-10" onclick="location.hash='#/dashboard'">
                    ${ico.pen}
                    <span class="desktop-only" style="font-weight:700; font-size:13px;">스튜디오</span>
                </button>
                <div style="width:32px; height:32px; background:#ddd; border-radius:50%;"></div>
            </div>
        </header>

        <!-- Mobile Sub Tabs -->
        <div class="sub-tabs mobile-only">
            <div class="tab active">홈</div>
            <div class="tab">실시간</div>
            <div class="tab">이벤트</div>
        </div>

        <main style="padding:20px 16px;">
            <!-- Hero -->
            <div class="hero">
                <img src="https://via.placeholder.com/1200x500/1f8ce6/fff?text=CRAFIQ+ORIGINAL">
            </div>

            <!-- New Releases -->
            <div style="margin-bottom:40px;">
                <div class="section-head">
                    <div class="sec-title">🔥 화제의 신작</div>
                    <div class="sec-more">더보기</div>
                </div>
                <div class="book-grid">
                    ${renderCard("천재의 게임방송", "판타지", "https://via.placeholder.com/200x300/333/fff?text=Game")}
                    ${renderCard("황녀님의 정원", "로맨스", "https://via.placeholder.com/200x300/e91e63/fff?text=Garden")}
                    ${renderCard("마검사 아카데미", "학원물", "https://via.placeholder.com/200x300/212121/fff?text=Sword")}
                    ${renderCard("이세계 식당", "힐링", "https://via.placeholder.com/200x300/4caf50/fff?text=Cook")}
                    ${renderCard("재벌 3세 아이돌", "현판", "https://via.placeholder.com/200x300/03a9f4/fff?text=Idol")}
                    ${renderCard("SSS급 헌터", "판타지", "https://via.placeholder.com/200x300/ff9800/fff?text=Hunter")}
                    ${renderCard("내 여자친구는 AI", "SF", "https://via.placeholder.com/200x300/9c27b0/fff?text=AI")}
                     ${renderCard("서울 2077", "SF", "https://via.placeholder.com/200x300/607d8b/fff?text=2077")}
                </div>
            </div>

            <!-- Ranking -->
            <div>
                <div class="section-head">
                    <div class="sec-title">🏆 실시간 랭킹</div>
                </div>
                <div class="rank-grid">
                    ${renderRank(1, "전지적 독자 시점", "싱숑 • 판타지")}
                    ${renderRank(2, "화산귀환", "비가 • 무협")}
                    ${renderRank(3, "재벌집 막내아들", "산경 • 현대판타지")}
                    ${renderRank(4, "데뷔 못 하면 죽는 병", "백덕수 • 현판")}
                    ${renderRank(5, "나 혼자만 레벨업", "추공 • 판타지")}
                    ${renderRank(6, "검은 머리 미군 대원수", "띵군 • 대체역사")}
                </div>
            </div>
        </main>

        <!-- Bottom Nav -->
        <nav class="btm-nav mobile-only">
            <div class="nav-item active">${ico.home}<span>홈</span></div>
            <div class="nav-item">${ico.disc}<span>탐색</span></div>
            <div class="nav-item">${ico.best}<span>베스트</span></div>
            <div class="nav-item">${ico.my}<span>MY</span></div>
        </nav>
    `;
    return container;
}

function renderCard(title, genre, img) {
    return `
    <div class="book-card">
        <div class="cover"><img src="${img}" loading="lazy"></div>
        <div style="font-weight:700; font-size:14px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${title}</div>
        <div style="font-size:12px; color:#888;">${genre}</div>
    </div>`;
}

function renderRank(rank, title, meta) {
    return `
    <div class="rank-item">
        <div class="rank-num" style="color:${rank <= 3 ? '#00dc64' : '#333'}">${rank}</div>
        <div class="rank-thumb"><img src="https://via.placeholder.com/50x75/ccc/fff?text=${rank}" style="width:100%; height:100%;"></div>
        <div>
            <div style="font-weight:700; font-size:15px; margin-bottom:2px;">${title}</div>
            <div style="font-size:12px; color:#666;">${meta}</div>
        </div>
    </div>`;
}
