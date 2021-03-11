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

const MAP_CENTER_COORDINATE_LAT = 35.68170; //lat координата центра карты
const MAP_CENTER_COORDINATE_LNG = 139.75388; //lng координата центра карты
const DEFAUL_MAP_ZOOM = 10; //дефолтное приближение карты
const NUMBER_RENDERING_MARKERS = 10; //количество отрисовываемых маркеров
const RENDER_DELAY = 500; //задержка перед отрисовкой маркеров на карте
const ERROR_ALERT_DISPLAY_TIME = 2000; //время показа сообщения об ошибке получения данных

makeFormsInactive();

initializeMap(makeAddFormActive, MAP_CENTER_COORDINATE_LAT, MAP_CENTER_COORDINATE_LNG, DEFAUL_MAP_ZOOM);

createMainMarker(setAddressFieldValue, MAP_CENTER_COORDINATE_LAT, MAP_CENTER_COORDINATE_LNG);

configureAddForm(MAP_CENTER_COORDINATE_LAT, MAP_CENTER_COORDINATE_LNG);

configureFunctionalitySubmitButton((formData, functionOnSuccessSendFormData, functionOnErrorSendFormData) => {
  sendData(formData, functionOnSuccessSendFormData, functionOnErrorSendFormData)
}, mainMarker, MAP_CENTER_COORDINATE_LAT, MAP_CENTER_COORDINATE_LNG);

getData(
  (data) => {
    renderOffersMarkers(data.slice(0,NUMBER_RENDERING_MARKERS), createPopupElement);
    makeMapFiltersFormActive();
    configureFunctionalityResetButton(
      mainMarker,
      MAP_CENTER_COORDINATE_LAT,
      MAP_CENTER_COORDINATE_LNG,
      () => renderOffersMarkers(data, createPopupElement),
    )
    configureFiltering(
      data,
      (filteredData) => {
        debounce(
          () => {renderOffersMarkers(filteredData, createPopupElement)},
          RENDER_DELAY,
        )
      },
      NUMBER_RENDERING_MARKERS,
    );
  },
  (error) => showAlert(ERROR_ALERT_DISPLAY_TIME, error),
);
