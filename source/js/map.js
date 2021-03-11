/* global  L:readonly */
/**
 * Основные переменые модуля
 */
const SIMILAR_OFFERS_MARKER_ICON_WIDTH = 40; //ширина иконки маркера для похожих объявлений
const SIMILAR_OFFERS_MARKER_ICON_HEIGHT = 40; //высота иконки маркера для похожих объявлений
const SIMILAR_OFFERS_MARKER_ICON_ANCHOR_X = 20; //координата Х точки на маркере указывающей на объект объявления
const SIMILAR_OFFERS_MARKER_ICON_ANCHOR_Y = 40; //координата Y точки на маркере указывающей на объект объявления
const MAIN_MARKER_ICON_WIDTH = 52; //ширина иконки главного маркера
const MAIN_MARKER_ICON_HEIGHT = 52; //ширина иконки главного маркера
const MAIN_MARKER_ICON_ANCHOR_X = 26; //координата Х точки на маркере указывающей на позицию маркера
const MAIN_MARKER_ICON_ANCHOR_Y = 52; //координата Y точки на маркере указывающей на позицию маркера


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
 * Функция инициализирует карту и делает форму для подачи объявления активной
 *
 * @param {function} makeAddFormActiveFunction - Функция, которая сделает форму подачи объявления активной
 * при успешной инициализации карты
 * @param {number} mapCenterCoordinateLat - lat координата центра карты
 * @param {number} mapCenterCoordinateLat - lng координата центра карты
 * @param {number} mapZoom - значение увеличения карты по-умолчанию
 */
const initializeMap = (makeAddFormActiveFunction, mapCenterCoordinateLat, mapCenterCoordinateLng, mapZoom) => {
  map = L.map('map-canvas')
    .on('load',() => {
      makeAddFormActiveFunction();
    })
    .setView({
      lat: mapCenterCoordinateLat,
      lng: mapCenterCoordinateLng,
    }, mapZoom)

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
 * Функция, создающая маркер, который можно передвигать по карте, меняя тем самым значение поля "Адрес"
 *
 * @param {function} onMoveEndFunction - функция, в которую передаются координаты маркера,
 * при окончании его передвижения, для отображения их в поле "Адрес"
 * @param {number} mainMarkerCoordinateLat - lat координата маркера по-умолчанию
 * @param {number} mainMarkerCoordinateLng - lng координата маркера по-умолчанию
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
 * Функция для отрисовки маркеров предложений и добавления им попапов
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
