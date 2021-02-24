import {getMassiveData} from './data.js';
//import {createOffersElements} from './offers.js';
import {makePageInactive} from './page.js';
import {initializeMap, makeMarker, addOffersMarkers} from './map.js';

//Делаю формы неактивными до инициализации карты
makePageInactive();

//Инициализирую карту и делаю формы активными
const map = initializeMap();

//Создаю главный маркер
const mainMarker = makeMarker(map, 35.681700, 139.753882, true, true);

//Передаю координаты главного маркера в поле 'Адрес' и делаю его недоступным для ручного редактирования
const addressField = document.querySelector('#address');
addressField.setAttribute('disabled', 'disabled');
addressField.value = mainMarker.getLatLng().lat.toFixed(5) + ', '  + mainMarker.getLatLng().lng.toFixed(5);

//Синхронизирую изменения координат главного маркера с данными в поле 'Адрес'
mainMarker.on('moveend', (evt) => {
  const position = evt.target.getLatLng()
  addressField.value = position.lat.toFixed(5) + ', ' + position.lng.toFixed(5);
});

//Создаю на карте метки объявлений со всплывающими попапами
addOffersMarkers(getMassiveData(), map);
