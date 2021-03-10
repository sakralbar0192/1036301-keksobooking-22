/* global  L:readonly */
/**
 * Основные переменые модуля
 */
const SIMILAR_OFFERS_MARKER_ICON_WIDTH = 40;
const SIMILAR_OFFERS_MARKER_ICON_HEIGHT = 40;
const SIMILAR_OFFERS_MARKER_ICON_ANCHOR_X = 20;
const SIMILAR_OFFERS_MARKER_ICON_ANCHOR_Y = 40;
const MAIN_MARKER_ICON_WIDTH = 52;
const MAIN_MARKER_ICON_HEIGHT = 52;
const MAIN_MARKER_ICON_ANCHOR_X = 26;
const MAIN_MARKER_ICON_ANCHOR_Y = 52;
const DEFAUL_MAP_ZOOM = 10;

let map = {};
let mainMarker = {};
let mainMarkerPosition = {};
let offersMarkers = [];

/**
 * Иконки для разных маркеров
 */
const similarOffersMarkerIcon = L.icon({
  iconUrl: '../img/pin.svg',
  iconSize: [SIMILAR_OFFERS_MARKER_ICON_WIDTH, SIMILAR_OFFERS_MARKER_ICON_HEIGHT],
  iconAnchor: [SIMILAR_OFFERS_MARKER_ICON_ANCHOR_X, SIMILAR_OFFERS_MARKER_ICON_ANCHOR_Y],
});

const mainMarkerIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [MAIN_MARKER_ICON_WIDTH, MAIN_MARKER_ICON_HEIGHT],
  iconAnchor: [MAIN_MARKER_ICON_ANCHOR_X, MAIN_MARKER_ICON_ANCHOR_Y],
});

/**
 * Функция для создания карты с событием при успешной загрузке
 *
 * @param {function} onLoad - Функция, которая выполнится при успешной загрузке карты
 */
const initializeMap = (onLoad, mapCenterCoordinateLat, mapCenterCoordinateLng) => {
  map = L.map('map-canvas')
    .on('load',() => {
      onLoad();
    })
    .setView({
      lat: mapCenterCoordinateLat,
      lng: mapCenterCoordinateLng,
    }, DEFAUL_MAP_ZOOM)

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
 * @param {function} onMoveEndFunction - функция, которую необходимо выполнить при завершении передвижения маркера
 */
const createMainMarker = (onMoveEndFunction, mainMarkerCoordinateLat, mainMarkerCoordinateLng) => {
  mainMarker = makeMarker(mainMarkerCoordinateLat, mainMarkerCoordinateLng, mainMarkerIcon, true)
    .on('moveend', (evt) => {
      mainMarkerPosition = evt.target.getLatLng();
      onMoveEndFunction(mainMarkerPosition);
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
  const renderedData =  data.slice();
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
