import {initializeMap, mainMarker} from './map.js';
import {setSimilarOffersMarkers} from './api.js';
import {makeFormsInactive, addressField} from './form.js';

/**
 * Делает формы неактивными до инициализации карты.
 */
makeFormsInactive();

/**
 * Инициализирует карту и делаю формы активными.
 */
const map = initializeMap();

/**
 * Добавляет главный маркер.
 */
mainMarker.addTo(map);

/**
 * Передает координаты главного маркера в поле 'Адрес' добавляет полю 'Адрес' аттрибут disabled.
 */
addressField.setAttribute('disabled', 'disabled');
addressField.value = mainMarker.getLatLng().lat.toFixed(5) + ', '  + mainMarker.getLatLng().lng.toFixed(5);

/**
 * Синхронизирует изменения координат главного маркера с данными в поле 'Адрес'ю
 */
mainMarker.on('moveend', (evt) => {
  const position = evt.target.getLatLng()
  addressField.value = position.lat.toFixed(5) + ', ' + position.lng.toFixed(5);
});

/**
 * Делает запрос на сервер и создает на карте метки объявлений со всплывающими попапамию
 */
setSimilarOffersMarkers(map);
