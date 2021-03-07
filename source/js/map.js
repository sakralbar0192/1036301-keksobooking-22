/* global  L:readonly */
/**
 * Основные переменые модуля
 */
const NUMBER_RENDERED_OFFERS_MARKERS = 10;
let map = {};
let mainMarker = {};
let mainMarkerPosition = {};
let offersMarkers = [];

/**
 * Иконки для разных маркеров
 */
const similarOffersMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

/**
 * Функция для создания карты с событием при успешной загрузке
 *
 * @param {function} onLoad - Функция, которая выполнится при успешной загрузке карты
 */
const initializeMap = (onLoad) => {
  map = L.map('map-canvas')
    .on('load',() => {
      onLoad();
    })
    .setView({
      lat:35.68170,
      lng:139.75388,
    }, 10)

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

/**
 * Функция, создающая маркер
 *
 * @param {number} lat - первая координата маркера
 * @param {number} lng - вторая координата маркера
 * @param {object} icoMarker - иконка маркера
 * @param {boolean} draggable - возможность передвигать маркер
 *
 * @return {object} маркер с заданными параметрами
 */
const makeMarker = ( lat, lng, icoMarker, draggable) => {
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: draggable,
      icon: icoMarker,
    },
  );
  return marker;
};

/**
 * Функция, создающая главный маркер
 *
 * @param {function} onMoveEnd - функция, которую необходимо выполнить при завершении передвижения маркера
 */
const createMainMarker = (onMoveEnd) => {
  mainMarker = makeMarker(35.68170, 139.75388, mainMarkerIcon, true)
    .on('moveend', (evt) => {
      mainMarkerPosition = evt.target.getLatLng();
      onMoveEnd(mainMarkerPosition);
    });
  mainMarker.addTo(map);
};

/**
 * Функция для создания нескольких обьявлений и добавления им попапов
 *
 * @param {object} data - данные для формирования маркеров объявлений и их попапов
 * @param {function} createPopupFunc - функция, создающая попап для маркера обьявления
 */
const renderOffersMarkers = (data, createPopupFunc) => {
  if (offersMarkers) {
    offersMarkers.forEach((marker) => {
      marker.remove();
    })
    offersMarkers =[];
  }
  const renderedData =  data.slice(0,NUMBER_RENDERED_OFFERS_MARKERS);
  renderedData.forEach((value) => {
    const marker = makeMarker(value.location.lat, value.location.lng, similarOffersMarkerIcon, false);
    const popup = createPopupFunc(value)
    marker.bindPopup(popup,
      {
        keepInView: true,
      },
    );
    offersMarkers.push(marker);
  });
  offersMarkers.forEach((marker) => {
    marker.addTo(map);
  })
}

export {initializeMap, createMainMarker, renderOffersMarkers, mainMarker}
