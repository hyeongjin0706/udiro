import { response } from 'express';

for (let i = 1; i <= 10; i++) {
  fetchDataFesta(i);
  fetchDataPlace(i);
}

export function search() {
  // 검색버튼 만들기
  const filter = document.getElementById('filter').value;
  const location = document.getElementById('location').value;
  const inputField = document.getElementById('inputField').value;
  const startDate = document.getElementById('startDate').value;
  const endDate = document.getElementById('endDate').value;

  fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filter: filter,
      location: location,
      inputField: inputField,
      startDate: startDate,
      endDate: endDate,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const results = data;
      // 결과창 새로 만들기
      // list로 표시하기
      const resultDiv = document.getElementById('resultDiv');
      resultDiv.innerHTML = '';

      results.forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = item.title;
        resultDiv.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function fetchDataFesta(festanum) {
  fetch(`http://localhost:8080/festa/${festanum}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      processDataAllf(data, festanum);
    })
    .catch((error) => {
      console.error('ERROR', error);
    });
}

function fetchDataPlace(placenum) {
  fetch(`http://localhost:8080/place/${placenum}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      processDataAll(data, placenum);
    })
    .catch((error) => {
      console.error('ERROR', error);
    });
}

// 함수-----------------------------------------
async function processDataAllf(data, festanum) {
  // 데이터 처리
  const festivalsContainer = document.querySelector('.festival__container');

  // festival 요소 생성
  const festivalElement = document.createElement('div');
  festivalElement.id = festanum;
  festivalElement.className = 'festival_image';
  festivalsContainer.appendChild(festivalElement);
  festivalElement.addEventListener('click', function (event) {
    const festivalId = event.target.id;
    console.log(festivalId);
    const url = './event/event.html?festivalId=' + festivalId;
    window.location.href = url;
  });

  // 장소 이미지 요소 생성
  const imgElement = document.createElement('img');
  imgElement.id = festanum;
  imgElement.src = data.MAIN_IMG;
  await festivalElement.appendChild(imgElement);

  // 텍스트 요소 생성
  const txtElement = document.createElement('div');
  txtElement.className = 'txt';
  await festivalElement.appendChild(txtElement);

  const titleElement = document.createElement('h2');
  titleElement.textContent = data.TITLE;
  await txtElement.appendChild(titleElement);

  const fplaceElement = document.createElement('span');
  fplaceElement.textContent = data.PLACE;
  await txtElement.appendChild(fplaceElement);

  const dateElement = document.createElement('div');
  dateElement.className = 'date';
  await txtElement.appendChild(dateElement);

  const startDate = new Date(data.STRTDATE);
  const formattedStartDate = startDate.toISOString().split('T')[0];
  const endDate = new Date(data.END_DATE);
  const formattedEndDate = endDate.toISOString().split('T')[0];

  const dateRange = `${formattedStartDate} ~ ${formattedEndDate}`;

  const dateRangeSpan = document.createElement('span');
  dateRangeSpan.textContent = dateRange;
  await dateElement.appendChild(dateRangeSpan);
}

async function processDataAll(data, placenum) {
  // 데이터 처리
  const placesContainer = document.querySelector('.place__container');

  // place 요소 생성
  const PlaceElement = document.createElement('div');
  PlaceElement.id = placenum;
  PlaceElement.className = 'place_image';
  placesContainer.appendChild(PlaceElement);
  PlaceElement.addEventListener('click', function (event) {
    const placeId = event.target.id;
    console.log(placeId);
    const url = './place/place.html?placeId=' + placeId;
    window.location.href = url;
  });

  // 장소 이미지 요소 생성
  const imgElement = document.createElement('img');
  imgElement.id = placenum;
  imgElement.src = data.MAIN_IMG;
  await PlaceElement.appendChild(imgElement);

  // 텍스트 요소 생성
  const txtElement = document.createElement('div');
  txtElement.className = 'txt';
  await PlaceElement.appendChild(txtElement);

  const titleElement = document.createElement('h2');
  titleElement.textContent = data.FAC_NAME;
  await txtElement.appendChild(titleElement);

  const addrElement = document.createElement('div');
  addrElement.className = 'addr';
  await txtElement.appendChild(addrElement);

  const addressElement = document.createElement('span');
  addressElement.textContent = data.ADDR;
  await txtElement.appendChild(addressElement);
}
