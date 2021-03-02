import {initializeMap, renderOffersMarkers, mainMarker} from './map.js';
import {getData} from './api.js';
import {addressField, addForm} from './form.js';
import {mapFiltersForm, setFiltering} from './map-filtering-form.js';
import {makeFormInactive, makeFormActive, showAlert} from './util.js';

const NUMBERS_OF_RENDERED_OFFERS = 10;

/**
 * Делает формы неактивными до инициализации карты.
 */
makeFormInactive(mapFiltersForm, '.map__filters');
makeFormInactive(addForm, '.ad-form');


/**
 * Инициализирует карту и делает формы активными при успешной загрузке.
 */
const map = initializeMap(()=>{
  makeFormActive(addForm, '.ad-form')
});

/**
 * Добавляет главный маркер.
 */
mainMarker.addTo(map);

/**
 * Передает координаты главного маркера в поле 'Адрес'.
 */
addressField.value = mainMarker.getLatLng().lat.toFixed(5) + ', '  + mainMarker.getLatLng().lng.toFixed(5);
addressField.setAttribute('readonly', 'readonly');

/**
 * Синхронизирует изменения координат главного маркера с данными в поле 'Адрес'
 */
mainMarker.on('moveend', (evt) => {
  const position = evt.target.getLatLng()
  addressField.value = position.lat.toFixed(5) + ', ' + position.lng.toFixed(5);
});

/**
 * Делает запрос на сервер, создает на карте метки объявлений со всплывающими попапами, фильтрует попапы
 */
getData(
  (data) => {
    renderOffersMarkers(data, map, NUMBERS_OF_RENDERED_OFFERS);
    makeFormActive(mapFiltersForm, '.map__filters');
    setFiltering(data, (filteredData)=> {
      renderOffersMarkers(filteredData, map, NUMBERS_OF_RENDERED_OFFERS)
    });
  },
  showAlert,
)
