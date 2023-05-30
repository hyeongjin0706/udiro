const modal_big = document.querySelectorAll('.modal_big');
const modal_small = document.querySelectorAll('.modal_small');
console.log(modal_small)

// 각각 클래스 이름으로 태그 다큐먼트로 가져오기
const modals = document.querySelectorAll('.modal');
const btnOpenPopup = document.querySelector('.btn-open-popup');
const onClose = document.querySelectorAll('#map');
const seeMore = document.querySelectorAll('.see__more');

// 클릭했을때 반응하기 위해서 변수 선언해두기 
const weather_click = document.getElementById('weather_click')
const road_click = document.getElementById('road_click')
const person_click = document.getElementById('person_click')
const checkbox = document.getElementsByClassName('seecheckbox-container')

// 보여줄부분(display=block으로 바꿀부분) 간단한정보 작은 모달창 3개
const weather_More = document.querySelector('.modal2');
const road_More = document.querySelector('.modal4');
const person_More = document.querySelector('.modal3');


// 닫기
onClose.forEach(closeButton => {
    closeButton.addEventListener('click', () => {
        weather_More.classList.remove('show');
        road_More.classList.remove('show');
        person_More.classList.remove('show');
    });
});


// 토글로 모달창 html 클래스에 show css 클래스 를 추가하여  display block으로 만들어주기
function showModal(modal) {
    modal.classList.toggle('show');
}

// show 빼주기
function hideModal(modal) {
    modal.classList.toggle('show');
}


// 클릭했을때 modals에 저장되어있는 모든것들에 show 클래스 추가해주기
btnOpenPopup.addEventListener('click', () => {
    modals.forEach(modal => showModal(modal));
    modal_small.forEach(modal => {
        if (modal.classList.contains('show')) {
            modal.classList.remove('show')
            console.log(modal)
        } else {
            modal.classList.add('show')
        }
    });
});


// 날씨 모달창에 쇼 추가
weather_click.addEventListener('click', () => {
    showModal(weather_More)
});

// 도로 모달창에 쇼 추가
road_click.addEventListener('click', () => {
    showModal(road_More)
});

// 인구혼잡 모달창에 쇼 추가
person_click.addEventListener('click', () => {
    showModal(person_More)
});




var markers = [];

function toggleMarkerVisibility() {
    var checkbox = document.getElementById(type + 'Checkbox');
    var isVisible = checkbox.checked;

    markers.forEach(function (marker) {
        marker.setVisible(isVisible);
    });
}

function toggleMarkerVisibilityByType(type) {
    var isVisible = type.checked;

    markers.forEach(function (marker) {
        if (!restroomCheckbox.checked) {
            marker.setVisible();
        }
    });
}
async function MK() {
    try {
        const response = await fetch('https://port-0-udiroserver-7e6o2cli3ac97a.sel4.cloudtype.app/map/restroom', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            const extractedData = data.map(({ place, latitude, longitude }) => ({
                place,
                latitude,
                longitude
            }));

            extractedData.forEach(function (restroom) {
                var imageSrc = 'https://cdn4.iconfinder.com/data/icons/restaurant-glyph-3/64/restroom-furniture_and_household-sanitary-hygiene-toilet-bathroom-buildings-512.png',
                    imageSize = new kakao.maps.Size(32, 32);

                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(restroom.latitude, restroom.longitude),
                    map: map,
                    title: restroom.place,
                    type: 'restroom',
                    visible: false,
                    image: markerImage //이미지
                });

                // 인포윈도우 내용과 위치 설정
                var iwContent = '<div style="padding:15px; height:90px; font-size:14px;">' +
                    restroom.place + '<br><a href="https://map.kakao.com/link/map/' + restroom.place + ',' + restroom.latitude + ',' + restroom.longitude + '" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/' + restroom.place + ',' + restroom.latitude + ',' + restroom.longitude + '" style="color:blue" target="_blank">길찾기</a></div>';
                var iwPosition = new kakao.maps.LatLng(restroom.latitude, restroom.longitude);

                // 마커 클릭 이벤트 처리
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 인포윈도우가 열려있을 경우 닫기
                    if (infowindow.getMap()) {
                        infowindow.close();
                    } else {
                        // 인포윈도우 열기
                        infowindow.setContent(iwContent);
                        infowindow.open(map, marker);
                    }
                });
                markers.push(marker);
            });
        }
    } catch (error) {
        console.error('Error updating user', error);
    }
    // 인포윈도우를 생성합니다
    var infowindow = new kakao.maps.InfoWindow();
}

// async function MK() {
//     await fetch('http://openAPI.seoul.go.kr:8088/4550596c7365687731323346776b5a6f/xml/SearchPublicToiletPOIService/1/200/')
//         .then(response => response.text())
//         .then(data => {
//             var parser = new DOMParser();
//             var xmlDoc = parser.parseFromString(data, 'text/xml');
//             var rows = xmlDoc.getElementsByTagName('row');
//             var restrooms = [];
//             for (var i = 0; i < rows.length; i++) {
//                 var restroom = {
//                     name: rows[i].getElementsByTagName('FNAME')[0].textContent,
//                     lat: parseFloat(rows[i].getElementsByTagName('Y_WGS84')[0].textContent),
//                     lng: parseFloat(rows[i].getElementsByTagName('X_WGS84')[0].textContent)
//                 };
//                 restrooms.push(restroom);
//             }
//             restrooms.forEach(function (restroom) {
//                 var imageSrc = 'https://cdn4.iconfinder.com/data/icons/restaurant-glyph-3/64/restroom-furniture_and_household-sanitary-hygiene-toilet-bathroom-buildings-512.png',
//                     imageSize = new kakao.maps.Size(32, 32);

//                 var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

//                 var marker = new kakao.maps.Marker({
//                     position: new kakao.maps.LatLng(restroom.lat, restroom.lng),
//                     map: map,
//                     title: restroom.name,
//                     type: 'restroom',
//                     visible: false,
//                     image: markerImage //이미지
//                 });

//                 // 인포윈도우 내용과 위치 설정
//                 var iwContent = '<div style="padding:15px; height:90px; font-size:14px;">' +
//                     restroom.name + '<br><a href="https://map.kakao.com/link/map/' + restroom.name + ',' + restroom.lat + ',' + restroom.lng + '" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/' + restroom.name + ',' + restroom.lat + ',' + restroom.lng + '" style="color:blue" target="_blank">길찾기</a></div>';
//                 var iwPosition = new kakao.maps.LatLng(restroom.lat, restroom.lng);

//                 // 마커 클릭 이벤트 처리
//                 kakao.maps.event.addListener(marker, 'click', function () {
//                     // 인포윈도우가 열려있을 경우 닫기
//                     if (infowindow.getMap()) {
//                         infowindow.close();
//                     } else {
//                         // 인포윈도우 열기
//                         infowindow.setContent(iwContent);
//                         infowindow.open(map, marker);
//                     }
//                 });
//                 markers.push(marker);
//             });
//         })
//         .catch(error => {
//             console.error('API 데이터를 가져오는 중 오류 발생:', error);
//         });

//     // 인포윈도우를 생성합니다
//     var infowindow = new kakao.maps.InfoWindow();
// }


async function MK2() {
    await fetch('http://openapi.seoul.go.kr:8088/4550596c7365687731323346776b5a6f/xml/GetParkInfo/1/100')
        .then(response => response.text())
        .then(data => {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(data, 'text/xml');
            var rows = xmlDoc.getElementsByTagName('row');
            var parkingLots = [];
            for (var i = 0; i < rows.length; i++) {
                var parkingLot = {
                    name: rows[i].getElementsByTagName('PARKING_NAME')[0].textContent,
                    lat: parseFloat(rows[i].getElementsByTagName('LAT')[0].textContent),
                    lng: parseFloat(rows[i].getElementsByTagName('LNG')[0].textContent)
                };
                parkingLots.push(parkingLot);
            }
            parkingLots.forEach(function (parkingLot) {
                var imageSrc = 'https://cdn3.iconfinder.com/data/icons/solid-amenities-icon-set/64/Parking_2-512.png',
                    imageSize = new kakao.maps.Size(32, 32);
                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

                var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
                var marker = new kakao.maps.Marker({
                    position: new kakao.maps.LatLng(parkingLot.lat, parkingLot.lng),
                    map: map,
                    title: parkingLot.name,
                    type: 'parking',
                    image: markerImage,
                    visible: false
                });
                // 인포윈도우 내용과 위치 설정
                var iwContent = '<div style="padding:15px; height:90px; font-size:14px;">' +
                    parkingLot.name + '<br><a href="https://map.kakao.com/link/map/' + parkingLot.name + ',' + parkingLot.lat + ',' + parkingLot.lng + '" style="color:blue" target="_blank">큰지도보기</a> <a href="https://map.kakao.com/link/to/' + parkingLot.name + ',' + parkingLot.lat + ',' + parkingLot.lng + '" style="color:blue" target="_blank">길찾기</a></div>';
                var iwPosition = new kakao.maps.LatLng(parkingLot.lat, parkingLot.lng);
                // 마커 클릭 이벤트 처리
                kakao.maps.event.addListener(marker, 'click', function () {
                    // 인포윈도우가 열려있을 경우 닫기
                    if (infowindow.getMap()) {
                        infowindow.close();
                    } else {
                        // 인포윈도우 열기
                        infowindow.setContent(iwContent);
                        infowindow.open(map, marker);
                    }
                });

                markers.push(marker);
            });
        })
        .catch(error => {
            console.error('지하주차장 데이터를 가져오는 중 오류 발생:', error);
        });

    // 인포윈도우생성
    var infowindow = new kakao.maps.InfoWindow();
}





// Add event listeners to the specific checkboxes
var restroomCheckbox = document.getElementById('restroomCheckbox');
restroomCheckbox.addEventListener('change', function () {
    if (restroomCheckbox.checked) {
        MK()
    }
    toggleMarkerVisibilityByType('checkbox');
});

var parkingCheckbox = document.getElementById('parkingCheckbox');
parkingCheckbox.addEventListener('change', function () {
    if (parkingCheckbox.checked) {
        MK2()
    }
    toggleMarkerVisibilityByType('checkbox');
});