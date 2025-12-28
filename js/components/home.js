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
                        <a href="#/">단행본</a>
                        <a href="#/">웹툰</a>
                    </nav>
                </div>
                <div class="gnb-right">
                    <div class="btn-search">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                    </div>
                    <button class="btn-upload" onclick="location.hash='#/dashboard'">작품 올리기</button>
                    <button class="btn-login">로그인</button>
                </div>
            </div>
        </header>

        <div class="container">
            <!-- Banner -->
            <div class="banner-wrap">
                <div class="main-banner">
                    <div class="banner-content">
                        <h2>내 안의 이야기를 세상 밖으로</h2>
                        <p>CRAFIQ 스튜디오에서 누구나 쉽게 연재를 시작할 수 있습니다.</p>
                         <button class="btn-secondary" style="border:none; background:rgba(255,255,255,0.2); color:white; backdrop-filter:blur(4px);" onclick="location.hash='#/dashboard'">스튜디오 바로가기 &rarr;</button>
                    </div>
                </div>
            </div>

            <!-- Best Sellers (Grid) -->
            <div class="section-head">
                <h3 class="section-title">실시간 베스트</h3>
                <a href="#" class="btn-more">더보기 ></a>
            </div>
            
            <div class="book-grid">
                ${renderBook(1, "재벌집 막내아들", "산경", "https://via.placeholder.com/150x225/111/fff?text=Rich")}
                ${renderBook(2, "전지적 작가 시점", "싱숑", "https://via.placeholder.com/150x225/222/fff?text=ORV")}
                ${renderBook(3, "화산귀환", "비가", "https://via.placeholder.com/150x225/333/fff?text=Mount")}
                ${renderBook(4, "나 혼자만 레벨업", "추공", "https://via.placeholder.com/150x225/444/fff?text=Solo")}
                ${renderBook(5, "데뷔 못 하면 죽는 병", "백덕수", "https://via.placeholder.com/150x225/555/fff?text=Idol")}
                ${renderBook(6, "전생했더니 슬라임", "후세", "https://via.placeholder.com/150x225/666/fff?text=Slime")}
            </div>

            <div class="section-head" style="margin-top:50px;">
                <h3 class="section-title">오늘의 신작 (New)</h3>
                <a href="#" class="btn-more">전체보기 ></a>
            </div>

             <div class="book-grid">
                ${renderBook(null, "이세계 식당", "이누즈카", "https://via.placeholder.com/150x225/777/fff?text=Food")}
                ${renderBook(null, "책벌레의 하극상", "카즈키", "https://via.placeholder.com/150x225/888/fff?text=Book")}
                ${renderBook(null, "오버로드", "마루야마", "https://via.placeholder.com/150x225/999/fff?text=Over")}
                ${renderBook(null, "코노스바", "아카츠키", "https://via.placeholder.com/150x225/aaa/fff?text=Kono")}
                ${renderBook(null, "리제로", "나가츠키", "https://via.placeholder.com/150x225/bbb/fff?text=ReZero")}
                ${renderBook(null, "노게임 노라이프", "카미야", "https://via.placeholder.com/150x225/ccc/fff?text=NoGame")}
            </div>
        </div>

        <footer style="margin-top:60px; padding:40px 0; border-top:1px solid #eee; text-align:center; color:#999; font-size:12px; background:#fbfbfb;">
            <p style="margin-bottom:8px;"><strong>(주)크라픽</strong></p>
            <p>사업자등록번호: 000-00-00000 | 대표: 인공지능</p>
            <p>이용약관 | 개인정보처리방침 | 청소년보호정책</p>
        </footer>
    `;

    return container;
}

function renderBook(rank, title, author, img) {
    return `
        <div class="book-item">
            <div class="cover">
                <img src="${img}" alt="${title}">
                ${rank ? `<div class="badge badge-rank-${rank}">${rank}</div>` : ''}
            </div>
            <div class="meta">
                <h3>${title}</h3>
                <div class="author">${author}</div>
                <div class="rating">★ 4.8 (320명)</div>
            </div>
        </div>
    `;
}
