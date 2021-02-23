/* global  L:readonly */
import {makePageActive} from './page.js';
import {createOfferElement} from './offers.js';

//Создаю карту с событием по загрузке, делающим формы активными
const initializeMap = () => {
  const map = L.map('map-canvas')
    .on('load',() => {
      makePageActive();
    })
    .setView({
      lat:35.681700,
      lng:139.753882,
    }, 13)

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  return map;
};

//Добавляю иконки для разных маркеров
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

//Функция, создающая маркер. параметр isMainIcoMarker нужен для определения типа иконки
const makeMarker = (map, lat, lng, isMainIcoMarker, draggable) => {
  let ico = markerIco;
  if (isMainIcoMarker) {
    ico = mainMarkerIcon
  }
  const marker = L.marker(
    {
      lat: lat,
      lng: lng,
    },
    {
      draggable: draggable,
      icon: ico,
    },
  );
  marker.addTo(map);
  return marker;
};

//Функция для создания нескольких обьявлений и добавления им попапов
const addOffersMarkers = (massiveData, map) => {
  massiveData.forEach((value) => {
    const marker = makeMarker(map, value.location.x, value.location.y, false, false);
    const popup = createOfferElement(value)
    marker.bindPopup(popup,
      {
        keepInView: true,
      },
    );
    marker.addTo(map);
  });
}

export {initializeMap, makeMarker, addOffersMarkers}
