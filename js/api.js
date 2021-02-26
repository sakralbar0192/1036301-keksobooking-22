import {onSuccessSendFormMessage, onErrorSendFormMessage, showAlert} from './util.js'
import {resetForm} from './form.js';
import {addOffersMarkers} from './map.js';
/**
 * отправляет GET запрос на сервер при успехе из полученных данных генерирует маркеры предложений
 * и размещает их на карте
 *
 * @param {object} map - карта на которую будут размещены маркеры
 */
const setSimilarOffersMarkers = (map) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }else {
        showAlert('Извините, проблемы с сервером, данные не могут быть загружены', 2000);
      }
    })
    .then((json) => {
      addOffersMarkers(json, map);
    }).
    catch(() => {
      showAlert('Извините, проблемы с сервером, данные не могут быть загружены', 2000);
    });
}
/**
 * Отправляет данные полученные из формы методом POST на сервер
 *
 * @param {object} data - данные, отправляемые на сервер
 */
const sendData = (data) => {
  fetch('https://22.javascript.pages.academy/keksobooking ',
    {
      method: 'POST',
      headers:
      {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    },
  )
    .then((response) => {
      if( response.ok) {
        onSuccessSendFormMessage();
        resetForm();
      }else{
        onErrorSendFormMessage();
      }
    })
    .catch(() => {
      onErrorSendFormMessage();
    })
};

export {setSimilarOffersMarkers, sendData};
