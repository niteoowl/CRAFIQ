export function renderHome() {
    const container = document.createElement('div');

    container.innerHTML = `
        <header class="gnb">
            <div class="gnb-inner">
                <div class="gnb-left">
                    <a href="#/" class="logo">CRAFIQ</a>
                    <nav class="gnb-menu">
                        <a href="#/" class="active">홈</a>
                        <a href="#/">웹소설</a>
                        <a href="#/">비주얼노벨</a>
                        <a href="#/">베스트</a>
                    </nav>
                </div>
                <div class="gnb-right">
                    <button class="btn-write" onclick="location.hash='#/dashboard'">작품 올리기</button>
                    <button class="btn-login">로그인</button>
                </div>
            </div>
        </header>

        <!-- Main Banner -->
        <div class="main-banner">
            <div class="banner-slide">
                <h2>누구나 작가가 되는 세상</h2>
                <p>CRAFIQ에서 당신의 상상력을 펼쳐보세요.</p>
                <div style="margin-top:20px;">
                    <button style="padding:10px 20px; background:white; color:#000; border:none; font-weight:bold; cursor:pointer;" onclick="location.hash='#/dashboard'">연재 시작하기 &rarr;</button>
                </div>
            </div>
        </div>

        <div class="container">
            <!-- Weekly/Daily Tabs -->
            <nav class="tab-nav">
                <div class="tab-item active">실시간 랭킹</div>
                <div class="tab-item">신작</div>
                <div class="tab-item">완결</div>
                <div class="tab-item">로맨스</div>
                <div class="tab-item">판타지</div>
                <div class="tab-item">무협</div>
            </nav>

            <!-- Ranking Grid (Compact) -->
            <div class="section-header">
                <h3>실시간 인기 Top 9</h3>
                <a href="#" class="more">더보기 ></a>
            </div>
            
            <div class="ranking-list">
                ${renderRankingItem(1, "재벌집 막내아들은 코딩천재", "판타지 | 산경", "Visual Novel", true)}
                ${renderRankingItem(2, "나 혼자만 인터페이스", "현판 | 추공", "Web Novel")}
                ${renderRankingItem(3, "화산귀환 Visual Remake", "무협 | 비가", "Visual Novel")}
                ${renderRankingItem(4, "전지적 작가 시점", "판타지 | 싱숑", "Visual Novel")}
                ${renderRankingItem(5, "데뷔 못 하면 죽는 병 걸림", "아이돌 | 백덕수", "Web Novel")}
                ${renderRankingItem(6, "검은 머리 미군 대원수", "대체역사 | 띵군", "Web Novel")}
                ${renderRankingItem(7, "황제와 여기사", "로판 | 안경숭이", "Visual Novel")}
                ${renderRankingItem(8, "악역의 엔딩은 죽음뿐", "로판 | 권겨을", "Interactive")}
                ${renderRankingItem(9, "달빛조각사 리메이크", "게임 | 남희성", "Visual Novel")}
            </div>

            <!-- Card Grid -->
            <div class="section-header">
                <h3>오늘의 신작 비주얼 노벨</h3>
                <a href="#" class="more">더보기 ></a>
            </div>
            <div class="card-grid">
                 ${renderCard("학교에서 살아남기", "학원물", "https://via.placeholder.com/200x280/111/fff?text=School")}
                 ${renderCard("던전 레스토랑 경영", "경영", "https://via.placeholder.com/200x280/222/fff?text=Cook")}
                 ${renderCard("슬라임의 복수", "판타지", "https://via.placeholder.com/200x280/333/fff?text=Slime")}
                 ${renderCard("회귀한 천재 아이돌", "연예계", "https://via.placeholder.com/200x280/444/fff?text=Idol")}
                 ${renderCard("마법학원 1학년", "학원", "https://via.placeholder.com/200x280/555/fff?text=Magic")}
            </div>
        </div>
        
        <footer style="border-top:1px solid #eee; padding:40px 0; margin-top:60px; text-align:center; color:#999; font-size:12px;">
            <p>(주)CRAFIQ | 대표: AI | 사업자등록번호: 000-00-00000</p>
            <p>Copyright © CRAFIQ Corp. All Rights Reserved.</p>
        </footer>
    `;

    return container;
}

function renderRankingItem(rank, title, meta, type, isNew = false) {
    return `
        <div class="ranking-item">
            <div class="ranking-num">${rank}</div>
            <div class="ranking-image" style="width:60px; height:80px; background:#eee; border-radius:4px; overflow:hidden;">
                 <img src="https://via.placeholder.com/60x80/999/fff?text=${rank}" style="width:100%;height:100%;object-fit:cover;">
            </div>
            <div class="ranking-content" style="flex:1;">
                <h4>${title}</h4>
                <p>${meta}</p>
                <div class="tags">
                    <span style="color:#00dc64; font-weight:bold;">${type}</span> 
                    ${isNew ? '<span style="color:red; margin-left:4px;">UP</span>' : ''}
                </div>
            </div>
        </div>
    `;
}

function renderCard(title, genre, img) {
    return `
        <div class="webtoon-card">
            <div class="thumb-wrap">
                <img src="${img}" alt="${title}">
                <div style="position:absolute; top:0; left:0; background:rgba(0,0,0,0.6); color:white; font-size:10px; padding:2px 6px; border-bottom-right-radius:4px;">
                   Visual
                </div>
            </div>
            <div class="info">
                <h4>${title}</h4>
                <div class="meta">
                    <span>${genre}</span>
                    <span>★ 9.8</span>
                </div>
            </div>
        </div>
    `;
}
