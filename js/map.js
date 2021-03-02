/* global  L:readonly */
import {createPopupElement} from './popup.js';

let offersMarkers = [];
/**
 * Функция, создающая маркер
 *
 * @param {number} lat - координата маркера
 * @param {number} lng - координата маркера
 * @param {object} icoMarker - изображение маркера
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
 * Функция для создания нескольких обьявлений и добавления им попапов
 *
 * @param {object} massiveData - данные для формирования маркеров объявлений и их попапов
 * @param {object} map - карта, на которую будут размещены сформированные маркеры
 * @param {numder} numberRenderedOffers - количество отрисовываемых предложений
 */
const renderOffersMarkers = (massiveData, map, numberRenderedOffers) => {
  if (offersMarkers) {
    offersMarkers.forEach((marker) => {
      marker.remove();
    })
    offersMarkers =[];
  }
  const renderedData =  massiveData.slice(0,numberRenderedOffers);
  renderedData.forEach((value) => {
    const marker = makeMarker(value.location.lat, value.location.lng, markerIco, false);
    const popup = createPopupElement(value)
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
  return offersMarkers;
}

/**
 * Создание карты и добавление ей события по загрузке, которое делает формы активными
 *
 * @return {object}  карта с событием
 */
const initializeMap = (onLoad) => {
  const map = L.map('map-canvas')
    .on('load',() => {
      onLoad();
    })
    .setView({
      lat:35.681700,
      lng:139.753882,
    }, 10)

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

/**
 * Иконки для разных маркеров
 */
const markerIco = L.icon({
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
 * Создание главного маркера.
 */
const mainMarker = makeMarker(35.68170, 139.75388, mainMarkerIcon, true);

export {initializeMap, renderOffersMarkers, mainMarker}
