export function renderHome() {
    const container = document.createElement('div');

    container.innerHTML = `
        <!-- GNB -->
        <header class="gnb">
            <div class="container gnb-inner flex items-center justify-between">
                <div class="flex items-center">
                    <a href="#/" class="logo">CRAFIQ</a>
                    <nav class="gnb-nav">
                        <a href="#/" class="active">홈</a>
                        <a href="#/">랭킹</a>
                        <a href="#/">판타지</a>
                        <a href="#/">로맨스</a>
                        <a href="#/">무협</a>
                    </nav>
                </div>
                <div class="gnb-utils">
                    <div class="search-box">
                        <input type="text" placeholder="작품명, 작가 검색">
                        <svg width="18" height="18" fill="none" stroke="#999" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <button class="btn-new-work" onclick="location.hash='#/dashboard'">작품 만들기</button>
                    <button style="font-weight:600; font-size:13px; color:#555;">로그인</button>
                </div>
            </div>
        </header>

        <!-- Hero Slider (Static Mock) -->
        <div class="hero-wrapper">
            <div class="hero-slider">
                <div class="hero-slide" style="background-image: url('https://via.placeholder.com/1200x500/121212/333?text=Cover+Art');">
                    <div class="hero-overlay">
                        <div class="hero-tag">독점 연재</div>
                        <div class="hero-title">상상 그 이상의 세계,<br>CRAFIQ 오리지널 런칭!</div>
                        <div class="hero-desc">비주얼 노벨로 다시 태어난 전설의 명작들을 지금 바로 만나보세요.<br>코딩 없이 누구나 작가가 될 수 있는 기회.</div>
                        <div class="flex gap-10">
                            <button style="padding:12px 24px; background:white; color:black; font-weight:800; border-radius:4px;">작품 보러가기</button>
                            <button style="padding:12px 24px; border:1px solid rgba(255,255,255,0.3); color:white; font-weight:800; border-radius:4px;">자세히 보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- Section 1: Real-time Ranking -->
            <section class="section">
                <div class="section-header">
                    <h3 class="section-title">실시간 종합 랭킹 TOP 6</h3>
                    <a href="#" class="section-more">더보기 &rsaquo;</a>
                </div>
                <div class="grid-6">
                    ${renderBookCard(1, "재벌집 막내아들은 코딩천재", "판타지 | 산경", 9.9, "https://via.placeholder.com/200x290/1a237e/fff?text=Rich")}
                    ${renderBookCard(2, "나 혼자만 인터페이스", "현판 | 추공", 9.8, "https://via.placeholder.com/200x290/212121/fff?text=Solo")}
                    ${renderBookCard(3, "화산귀환 Visual Remake", "무협 | 비가", 9.8, "https://via.placeholder.com/200x290/b71c1c/fff?text=Volcano")}
                    ${renderBookCard(4, "전지적 작가 시점", "판타지 | 싱숑", 9.7, "https://via.placeholder.com/200x290/37474f/fff?text=ORV")}
                    ${renderBookCard(5, "데뷔 못 하면 죽는 병", "현대물 | 백덕수", 9.6, "https://via.placeholder.com/200x290/f06292/fff?text=Idol")}
                    ${renderBookCard(6, "검은 머리 미군 대원수", "대체역사 | 띵군", 9.5, "https://via.placeholder.com/200x290/4a148c/fff?text=USA")}
                </div>
            </section>

            <!-- Section 2: Recommended (List Grid) -->
            <section class="section">
                <div class="section-header">
                    <h3 class="section-title">편집자 추천 작품!</h3>
                    <a href="#" class="section-more">전체보기 &rsaquo;</a>
                </div>
                <div class="list-grid">
                    ${renderListItem("황제와 여기사", "로판 | 안경숭이", "가슴 뛰는 전장 로맨스", "https://via.placeholder.com/100x140/e91e63/fff?text=Knight")}
                    ${renderListItem("달빛조각사 위드 전", "게임 | 남희성", "전설의 귀환, 노가다의 신", "https://via.placeholder.com/100x140/3f51b5/fff?text=Moon")}
                    ${renderListItem("픽미업!", "게임판타지 | 헤르모드", "모바일 게임 속으로 떨어졌다", "https://via.placeholder.com/100x140/ff9800/fff?text=PickMe")}
                    ${renderListItem("킬 더 히어로", "현대판타지 | 디다트", "배신당한 영웅의 복수극", "https://via.placeholder.com/100x140/000000/fff?text=Kill")}
                    ${renderListItem("천재의 게임방송", "BJ물 | 하이엔드", "트롤링 없는 클린 방송", "https://via.placeholder.com/100x140/009688/fff?text=Game")}
                    ${renderListItem("탐식의 재림", "퓨전 | 로유진", "낙원을 향한 최후의 돌격", "https://via.placeholder.com/100x140/795548/fff?text=Eat")}
                </div>
            </section>
            
            <!-- Section 3: New Arrivals -->
            <section class="section">
                <div class="section-header">
                    <h3 class="section-title">따끈따끈한 신작 (New)</h3>
                </div>
                <div class="grid-6">
                    ${renderBookCard(null, "이세계 식당", "이누즈카", "New", "https://via.placeholder.com/200x290/558b2f/fff?text=Food")}
                    ${renderBookCard(null, "책벌레의 하극상", "카즈키", "New", "https://via.placeholder.com/200x290/fdd835/fff?text=Book")}
                    ${renderBookCard(null, "오버로드", "마루야마", "New", "https://via.placeholder.com/200x290/6d4c41/fff?text=Over")}
                    ${renderBookCard(null, "코노스바", "아카츠키", "New", "https://via.placeholder.com/200x290/039be5/fff?text=Kono")}
                    ${renderBookCard(null, "리제로", "나가츠키", "New", "https://via.placeholder.com/200x290/5c6bc0/fff?text=ReZero")}
                    ${renderBookCard(null, "노게임 노라이프", "카미야", "New", "https://via.placeholder.com/200x290/ec407a/fff?text=NoGame")}
                </div>
            </section>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="container">
                <div class="footer-link">
                    <a href="#">회사소개</a>
                    <a href="#">이용약관</a>
                    <a href="#" style="font-weight:800; color:black;">개인정보처리방침</a>
                    <a href="#">청소년보호정책</a>
                    <a href="#">고객센터</a>
                </div>
                <div class="footer-info">
                    <p>상호명: (주)크라픽 | 대표이사: 인공지능 | 사업자등록번호: 120-88-12345</p>
                    <p>주소: 서울특별시 강남구 테헤란로 123, 45층 (역삼동, 크라픽타워)</p>
                    <p>통신판매업신고번호: 제2025-서울강남-0000호 | 고객센터: 1588-0000 (평일 09:00~18:00)</p>
                    <p style="margin-top:12px; font-weight:700;">Copyright © CRAFIQ Corp. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    `;

    return container;
}

function renderBookCard(rank, title, author, rating, img) {
    return `
        <div class="book-card">
            <div class="book-cover">
                <img src="${img}" alt="${title}">
                ${rank ? `<div class="book-badge ${rank <= 3 ? 'rank-' + rank : ''}">${rank}</div>` : ''}
            </div>
            <div class="book-title">${title}</div>
            <div class="book-author">${author}</div>
            <div class="book-meta">
                <span class="rating">★ ${rating}</span>
                <span>• 32.5만명</span>
            </div>
        </div>
    `;
}

function renderListItem(title, author, desc, img) {
    return `
        <div class="list-item">
            <div class="list-thumb"><img src="${img}"></div>
            <div class="list-info">
                <div style="font-size:14px; font-weight:700; margin-bottom:4px; color:#333;">${title}</div>
                <div style="font-size:12px; color:#666; margin-bottom:4px;">${author}</div>
                <div style="font-size:12px; color:#999; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${desc}</div>
            </div>
        </div>
    `;
}
