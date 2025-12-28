export function renderHome() {
    const container = document.createElement('div');
    container.className = 'app-container'; // Mobile-width compliant container

    // SVGs (Refined)
    const icons = {
        search: `<svg class="btn-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/></svg>`,
        write: `<svg class="btn-icon" style="color:var(--color-primary);" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`,
        home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg>`, // Filled for active
        homeOut: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
        disc: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>`,
        my: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    };

    container.innerHTML = `
        <!-- HEADER (Sticky) -->
        <header class="header-main">
            <div class="header-logo">CRAFIQ</div>
            <div class="header-actions">
                ${icons.search}
                <div style="cursor:pointer;" onclick="location.hash='#/dashboard'">${icons.write}</div>
            </div>
        </header>

        <!-- SUB NAV (Tabs) -->
        <div class="sub-nav">
            <div class="sub-nav-item active">홈</div>
            <div class="sub-nav-item">실시간</div>
            <div class="sub-nav-item">이벤트</div>
            <div class="sub-nav-item">무료</div>
        </div>

        <main>
            <!-- HERO -->
            <div class="hero-slider-wrap">
                <img src="https://via.placeholder.com/800x450/1f8ce6/fff?text=CRAFIQ+Original" class="hero-img">
                <div class="hero-gradient">
                    <div class="hero-badge">독점 연재</div>
                    <div class="hero-title">당신의 상상이<br>현실이 되는 순간</div>
                </div>
            </div>

            <!-- SECTION: New Arrivals (Horizontal) -->
            <section class="section">
                <div class="section-head">
                    <div class="txt-title-lg">오늘의 신작 발견</div>
                    <div class="more-btn">더보기</div>
                </div>
                <div class="h-scroll-view">
                    ${renderCard("천재의 일상", "현판", "https://via.placeholder.com/200x300/333/fff?text=Genius")}
                    ${renderCard("황녀님의 티타임", "로맨스", "https://via.placeholder.com/200x300/e91e63/fff?text=Princess")}
                    ${renderCard("던전 호텔", "판타지", "https://via.placeholder.com/200x300/4caf50/fff?text=Hotel")}
                    ${renderCard("검은 기사", "무협", "https://via.placeholder.com/200x300/212121/fff?text=Knight")}
                    ${renderCard("레벨업 닥터", "전문직", "https://via.placeholder.com/200x300/0288d1/fff?text=Doctor")}
                </div>
            </section>

             <!-- SECTION: Ranking (Vertical) -->
            <section class="section" style="padding-bottom:40px;">
                <div class="section-head">
                    <div class="txt-title-lg">실시간 랭킹 Top 10</div>
                    <div class="more-btn">전체</div>
                </div>
                <div class="ranking-wrap">
                    ${renderRank(1, "재벌집 막내아들", "산경", ["드라마", "경영"], "https://via.placeholder.com/120x180/1a237e/fff?text=1")}
                    ${renderRank(2, "전지적 작가 시점", "싱숑", ["성좌", "아포칼립스"], "https://via.placeholder.com/120x180/263238/fff?text=2")}
                    ${renderRank(3, "화산귀환", "비가", ["무협", "먼치킨"], "https://via.placeholder.com/120x180/b71c1c/fff?text=3")}
                    ${renderRank(4, "나 혼자만 레벨업", "추공", ["헌터", "액션"], "https://via.placeholder.com/120x180/000/fff?text=4")}
                    ${renderRank(5, "데뷔 못 하면 죽는 병", "백덕수", ["아이돌", "빙의"], "https://via.placeholder.com/120x180/880e4f/fff?text=5")}
                </div>
            </section>
        </main>

        <!-- BOTTOM NAV (Mobile Only) -->
        <nav class="bottom-nav">
            <div class="tab-btn active">
                ${icons.home}
                <span>홈</span>
            </div>
            <div class="tab-btn">
                ${icons.disc}
                <span>탐색</span>
            </div>
            <div class="tab-btn">
                ${icons.my}
                <span>보관함</span>
            </div>
        </nav>
    `;

    return container;
}

function renderCard(title, genre, img) {
    return `
        <div class="book-card-sm">
            <div class="cover-sm"><img src="${img}" loading="lazy"></div>
            <div style="font-weight:700; font-size:14px; margin-bottom:2px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${title}</div>
            <div class="txt-hint">${genre}</div>
        </div>
    `;
}

function renderRank(rank, title, author, tags, img) {
    const tagHTML = tags.map(t => `<span class="tag">#${t}</span>`).join('');
    return `
        <div class="rank-item">
            <div class="rank-num">${rank}</div>
            <div class="rank-cover"><img src="${img}"></div>
            <div class="rank-info">
                <div class="rank-title">${title}</div>
                <div class="rank-meta">${author}</div>
                <div class="rank-tags">${tagHTML}</div>
            </div>
            ${rank <= 3 ? '<div class="badge-up">UP</div>' : ''}
        </div>
    `;
}
