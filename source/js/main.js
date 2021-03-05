import {makeFormsInactive, makeAddFormActive, configureAddForm, setAddressFieldValue, makeMapFiltersFormActive} from './form.js';
import {initializeMap, createMainMarker, renderOffersMarkers, mainMarker} from './map.js';
import {getData, sendData} from './api.js';
import {createPopupElement} from './popup.js';
import {setFiltering} from './map-filtering-form.js';
import {showAlert, debounce} from './util.js';

const RENDER_DELAY = 500; //задержка перед отрисовкой маркеров на карте
/**
 * Делает формы неактивными до инициализации карты.
 */
makeFormsInactive();

/**
 * Инициализирует карту и делает формы активными при успешной загрузке.
 */
initializeMap(makeAddFormActive);

/**
 * Добавляет главный маркер и синхронизирует поле 'Адрес' со значениями позиции главного маркера.
 */
createMainMarker(setAddressFieldValue);

/**
 * Настраивает форму добавления нового объявления
 */
configureAddForm(mainMarker, sendData);

/**
 * Делает запрос на сервер, создает на карте метки объявлений со всплывающими попапами,
 * активирует форму с фильтрами и позволяет фильтровать объявления, обновляя результат с задержкой после последнего изменения
 */
getData(
  (data) => {
    renderOffersMarkers(data, createPopupElement);
    makeMapFiltersFormActive();
    setFiltering(data, (filteredData) => {
      debounce(() => renderOffersMarkers(filteredData, createPopupElement), RENDER_DELAY)
    });
  },
  showAlert,
);
