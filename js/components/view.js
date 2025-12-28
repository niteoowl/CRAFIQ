import { appStore } from '../store.js';

// --- ICONS ---
const icons = {
    home: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>`,
    disc: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16.24 7.76l-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z"/></svg>`,
    best: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>`,
    my: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    search: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="M21 21L16.65 16.65"/></svg>`,
    pen: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>`
};

// --- DATA (Mock but High Quality) ---
const DB = {
    hero: { title: "그녀가 공작저로 가야 했던 사정", desc: "의문의 죽음 이후 소설 속으로 빙의하게 된 재수생 박은하. 하지만 그녀가 빙의한 인물은 약혼자에게 독살당해 죽는 엑스트라였다!", bg: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80", genre: "로맨스판타지" },
    new: [
        { id: 1, title: "달빛 조각사", genre: "게임판타지", img: "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=400&q=80" },
        { id: 2, title: "전생했더니 슬라임", genre: "이세계", img: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80" },
        { id: 3, title: "나 혼자만 레벨업", genre: "현대판타지", img: "https://images.unsplash.com/photo-1614726365723-49cfa0950ecb?w=400&q=80" },
        { id: 4, title: "화산귀환", genre: "무협", img: "https://images.unsplash.com/photo-1514539079130-25950c84af65?w=400&q=80" },
        { id: 5, title: "전지적 독자 시점", genre: "판타지", img: "https://images.unsplash.com/photo-1463171379577-7f9923021716?w=400&q=80" },
        { id: 6, title: "재벌집 막내아들", genre: "드라마", img: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80" }
    ],
    rank: [
        { id: 7, title: "광마회귀", author: "유진성", img: "https://images.unsplash.com/photo-1516410541193-6dbf07918b8b?w=200" },
        { id: 8, title: "데뷔 못 하면 죽는 병", author: "백덕수", img: "https://images.unsplash.com/photo-1501250987900-1b8a1a2a4bcf?w=200" },
        { id: 9, title: "나노 마신", author: "한중월야", img: "https://images.unsplash.com/photo-1626544827763-d516dce335e2?w=200" },
        { id: 10, title: "비뢰도", author: "검류혼", img: "https://images.unsplash.com/photo-1513001900722-370f8deed956?w=200" }
    ]
};

// --- RENDER MAIN LAYOUT ---
export function renderMainLayout(activeTab = 'home') {
    const container = document.createElement('div');

    // Header Logic based on Tab? Always show Header
    const header = `
        <header class="app-header">
            <div style="display:flex; align-items:center;">
                <div class="brand" onclick="location.hash='#/'">CRAFIQ</div>
                <nav class="pc-nav hidden-mobile">
                    <div class="pc-nav-item ${activeTab === 'home' ? 'active' : ''}" onclick="location.hash='#/'">홈</div>
                    <div class="pc-nav-item ${activeTab === 'disc' ? 'active' : ''}" onclick="location.hash='#/discover'">탐색</div>
                    <div class="pc-nav-item ${activeTab === 'best' ? 'active' : ''}" onclick="location.hash='#/best'">베스트</div>
                    <div class="pc-nav-item ${activeTab === 'my' ? 'active' : ''}" onclick="location.hash='#/my'">MY</div>
                </nav>
            </div>
            
            <div class="search-wrap hidden-mobile">
                ${icons.search}
                <input class="search-input" placeholder="작품, 태그 검색">
            </div>

            <div class="header-right">
                <div class="hidden-pc">${icons.search}</div> <!-- Mobile Search Icon -->
                <button class="btn-pen" onclick="location.hash='#/dashboard'">
                    ${icons.pen} 
                    <span class="hidden-mobile">스튜디오</span>
                </button>
                <div style="width:32px; height:32px; background:#ddd; border-radius:50%;"></div>
            </div>
        </header>
    `;

    // Content based on ID
    let contentHTML = '';
    if (activeTab === 'home') contentHTML = renderPageHome();
    else if (activeTab === 'disc') contentHTML = renderPageDiscover();
    else if (activeTab === 'best') contentHTML = renderPageBest();
    else if (activeTab === 'my') contentHTML = renderPageMy();

    // Bottom Nav
    const bottomNav = `
        <nav class="bottom-bar hidden-pc">
            <div class="bar-item ${activeTab === 'home' ? 'active' : ''}" onclick="location.hash='#/'">${icons.home}<span class="bar-label">홈</span></div>
            <div class="bar-item ${activeTab === 'disc' ? 'active' : ''}" onclick="location.hash='#/discover'">${icons.disc}<span class="bar-label">탐색</span></div>
            <div class="bar-item ${activeTab === 'best' ? 'active' : ''}" onclick="location.hash='#/best'">${icons.best}<span class="bar-label">베스트</span></div>
            <div class="bar-item ${activeTab === 'my' ? 'active' : ''}" onclick="location.hash='#/my'">${icons.my}<span class="bar-label">MY</span></div>
        </nav>
    `;

    container.innerHTML = header + `<main class="container" style="padding-top:20px;">${contentHTML}</main>` + bottomNav;

    // Bind Search Logic
    setTimeout(() => {
        const inp = container.querySelector('.search-input');
        if (inp) {
            inp.onkeydown = (e) => {
                if (e.key === 'Enter') {
                    alert('검색 기능: "' + inp.value + '" (결과 페이지는 준비중입니다)');
                }
            };
        }
    }, 0);

    return container;
}

// --- SUB PAGES ---

function renderPageHome() {
    return `
        <!-- Hero -->
        <div class="hero-wrapper">
            <div class="hero-card">
                <img src="${DB.hero.bg}" class="hero-img">
                <div class="hero-content">
                    <div class="hero-tag">${DB.hero.genre}</div>
                    <div class="hero-title">${DB.hero.title}</div>
                    <div class="hero-desc">${DB.hero.desc}</div>
                </div>
            </div>
        </div>

        <!-- New Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-title">🔥 화제의 신작</div>
                <div class="section-more">더보기</div>
            </div>
            <div class="grid-responsive">
                ${DB.new.map(item => `
                    <div class="card-item">
                        <div class="card-img-wrap"><img src="${item.img}" class="card-img" loading="lazy"></div>
                        <div class="card-title">${item.title}</div>
                        <div class="card-meta">${item.genre}</div>
                    </div>
                `).join('')}
            </div>
        </section>

        <!-- Rank Section -->
        <section class="section">
            <div class="section-header">
                <div class="section-title">🏆 실시간 랭킹</div>
            </div>
            <div class="rank-list">
                ${DB.rank.map((item, idx) => `
                    <div class="rank-row">
                        <div class="rank-idx" style="color:${idx < 3 ? 'var(--primary)' : '#333'}">${idx + 1}</div>
                        <div class="rank-cover"><img src="${item.img}" style="width:100%; height:100%; object-fit:cover;"></div>
                        <div class="rank-info">
                            <div style="font-weight:700; font-size:15px; margin-bottom:4px;">${item.title}</div>
                            <div style="font-size:13px; color:#777;">${item.author}</div>
                        </div>
                    </div>
                `).join('')}
                 ${DB.new.slice(0, 3).map((item, idx) => `
                     <div class="rank-row">
                        <div class="rank-idx">${idx + 5}</div>
                        <div class="rank-cover"><img src="${item.img}" style="width:100%; height:100%; object-fit:cover;"></div>
                        <div class="rank-info">
                            <div style="font-weight:700; font-size:15px; margin-bottom:4px;">${item.title}</div>
                            <div style="font-size:13px; color:#777;">${item.genre}</div>
                        </div>
                     </div>
                 `).join('')}
            </div>
        </section>
    `;
}

function renderPageDiscover() {
    return `
        <div style="padding:20px 0;">
            <h2 class="section-title" style="margin-bottom:20px;">장르별 탐색</h2>
            <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:30px;">
                ${['판타지', '무협', '로맨스', '현대물', '스포츠', '미스터리', 'SF', '라이트노벨'].map(t =>
        `<button style="padding:8px 16px; border:1px solid #ddd; border-radius:20px; background:white; font-size:14px;">#${t}</button>`
    ).join('')}
            </div>
            
            <h3 class="section-title" style="margin-bottom:15px;">추천 작품</h3>
            <div class="grid-responsive" style="display:grid; grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));">
                 ${DB.new.concat(DB.rank).map(item => `
                    <div class="card-item" style="width:auto;">
                        <div class="card-img-wrap"><img src="${item.img}" class="card-img"></div>
                        <div class="card-title">${item.title}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderPageBest() {
    return `
        <h2 class="section-title" style="margin:20px 0;">베스트 100</h2>
        <div class="rank-list">
             ${DB.rank.concat(DB.new).concat(DB.rank).map((item, idx) => `
                <div class="rank-row">
                    <div class="rank-idx" style="width:40px; font-size:24px;">${idx + 1}</div>
                    <div class="rank-cover" style="width:60px; height:85px;"><img src="${item.img}" style="object-fit:cover; width:100%; height:100%;"></div>
                    <div class="rank-info">
                        <div style="font-weight:700; font-size:16px;">${item.title}</div>
                        <div style="font-size:13px; color:#888;">${item.genre || item.author} • 조회 1.2만</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderPageMy() {
    return `
        <div style="max-width:600px; margin:40px auto; text-align:center;">
            <div style="width:80px; height:80px; background:#eee; border-radius:50%; margin:0 auto 20px;"></div>
            <h2 style="margin-bottom:10px;">게스트 님</h2>
            <p style="color:#888; margin-bottom:30px;">로그인이 필요합니다.</p>
            <button style="background:var(--primary); color:white; padding:12px 0; width:100%; border-radius:8px; font-weight:700;">로그인 / 회원가입</button>
            
            <div style="margin-top:40px; text-align:left;">
                <h3 style="font-size:16px; margin-bottom:15px; font-weight:700;">최근 본 작품</h3>
                <div style="color:#999; font-size:14px; padding:20px 0; border-top:1px solid #eee;">
                    최근 본 작품이 없습니다.
                </div>
            </div>
        </div>
    `;
}
