// 헤더메뉴 바꿔주기
const login2 = document.querySelector('#login')
const mypage2 = document.querySelector('#mypage')
const signUp2 = document.querySelector('#signUp')
const logout2 = document.querySelector('#logout')




const token2 = localStorage.getItem('token');
// 토큰이 있다면 바꿔주기
if (token2) {
    login2.classList.add('noshow')
    signUp2.classList.add('noshow')
    mypage2.classList.remove('noshow')
    logout2.classList.remove('noshow')
}

// 로그아웃
logout2.addEventListener('click', () => {
    localStorage.clear('token');
    window.location.href = '/'
})

// 헤더 메뉴 페이징처리
login2.addEventListener('click', () => {
    window.location.href = '/login'
})

signUp2.addEventListener('click', () => {
    window.location.href = '/signUp'
})

mypage2.addEventListener('click', () => {
    window.location.href = '/mypage'
})