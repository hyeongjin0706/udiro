

//  마이페이지에 db에서 정보 가져오기
const get2Id = document.querySelector('#my__Acount__id__text').children[1]
const get2Email = document.querySelector('#my__Acount__email__text').children[1]
const get2Phone = document.querySelector('#my__Acount__phone__text').children[1]
const get2Area = document.querySelector('#my__Acount__favorite__area__text').children[1]

const token = localStorage.getItem('token');
async function getAccount() {
    if (token === null) {
        return console.log('token 없음');
    }
    try {
        const response = await fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/mypage/account', {
            // const response = await fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/mypage/account', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            // body: JSON.stringify({
            //     user_id: user_id,
            //     user_phone: user_phone,
            //     user_email: user_email,
            //     user_area: user_area
            // }) // 업데이트할 사용자 정보
        });
        if (response.ok) {
            const data = await response.json();
            get2Id.innerHTML = data.user_id;
            get2Phone.innerHTML = data.user_phone;
            get2Email.innerHTML = data.user_email;
            get2Area.innerHTML = data.user_area;
        } else {

            alert('잘못된 접근입니다.')
        }
    } catch (error) {
        console.error('Error updating user', error);
    }
};

getAccount()