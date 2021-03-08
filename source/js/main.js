import {
  makeFormsInactive,
  makeAddFormActive,
  configureAddForm,
  setAddressFieldValue,
  makeMapFiltersFormActive,
  configureFunctionalityResetButton,
  configureFunctionalitySubmitButton
} from './form.js';
import {initializeMap, createMainMarker, renderOffersMarkers, mainMarker} from './map.js';
import {getData, sendData} from './api.js';
import {createPopupElement} from './popup.js';
import {configureFiltering} from './map-filtering-form.js';
import {showAlert, debounce} from './util.js';

const RENDER_DELAY = 500; //задержка перед отрисовкой маркеров на карте
const ERROR_ALERT_DISPLAY_TIME = 2000; //время показа сообщения об ошибке получения данных
/**
 * Делает формы неактивными до инициализации карты.
 */
makeFormsInactive();

/**
 * Инициализирует карту и делает формы активными при успешной загрузке.
 */
initializeMap(makeAddFormActive);

/**
 * Добавляет главный маркер и синхронизирует поле 'Адрес' со значениями его позиции.
 */
createMainMarker(setAddressFieldValue);

/**
 * настраивает форму добавления нового объявления,
 */
configureAddForm();

/**
 * настраивает отправку данных с формы по сабмиту, сбрасывает форму и
 * главный маркер к значениям по умолчанию в случае успешной отправки
 */
configureFunctionalitySubmitButton((formData, functionOnSuccessSendFormData, functionOnErrorSendFormData) => {
  sendData(formData, functionOnSuccessSendFormData, functionOnErrorSendFormData)
}, mainMarker);

/**
 * Делает запрос на сервер, создает на карте метки объявлений со всплывающими попапами,активирует
 * форму с фильтрами и позволяет фильтровать объявления, обновляя результат с задержкой после последнего изменения
 */
getData(
  (data) => {
    renderOffersMarkers(data, createPopupElement);
    makeMapFiltersFormActive();

    configureFunctionalityResetButton(mainMarker,() => renderOffersMarkers(data, createPopupElement))
    configureFiltering(data, (filteredData) => {
      debounce(() => renderOffersMarkers(filteredData, createPopupElement), RENDER_DELAY)
    });
  },
  (error) => showAlert(ERROR_ALERT_DISPLAY_TIME, error),
);
