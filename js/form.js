import {sendData} from './api.js';
import {mainMarker} from './map.js';

const addForm = document.querySelector('.ad-form');
const addressField = addForm.querySelector('#address');
const addFormResetButton = addForm.querySelector('.ad-form__reset');
const addFormFieldsets = addForm.querySelectorAll('.ad-form__element');
const addFormTypeHousing = addForm.querySelector('#type');
const addFormPricePerNight = addForm.querySelector('#price');
const addFormTimeIn = addForm.querySelector('#timein');
const addFormTimeOut = addForm.querySelector('#timeout');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.children;

/**
 * Функция синхронизирующая значение двух полей
 *
 * @param {object} fieldOne - первое поле
 * @param {object} fieldTwo - второе поле
 */
const synchronizeItems = (fieldOne, fieldTwo) => {
  const massive = [fieldOne, fieldTwo]
  massive.forEach((field) => {
    field.addEventListener('change', (evt) =>{
      (evt.target === fieldTwo)
        ? fieldOne.value = fieldTwo.value
        : fieldTwo.value = fieldOne.value;
    });
  });
};

/**
 * Функция определяющая минимальную цену за ночь в соответствии с типом жилья
 *
 * @param {string} value - значение поля 'тип жилья'
 *
 * @returns {number} - минимальная цена за ночь
 */
const detrmineMinPrice = (value) => {
  switch (value) {
    case 'bungalow':
      return 0;
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
  }
};

/**
 * Функция, показывающая сообщение об успешной отправке формы
 */
const onSuccessSendFormMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === 27){
      message.remove();
    }
  });
  document.addEventListener('click',() => {
    message.remove();
  });
  message.style.zIndex = 400;
  document.querySelector('main').appendChild(message);
};

/**
 * Функция, показывающая сообщение об ошибке при отправке формы
 */
const onErrorSendFormMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === 27){
      message.remove();
    }
  });
  document.addEventListener('click',() => {
    message.remove();
  });
  message.style.zIndex = 400;
  document.querySelector('main').appendChild(message);
};

/**
 * Функция делает формы addForm и mapFiltersForm неактивными и добавляет атрибут disabled внутренним полям
 */
const makeFormsInactive = () => {
  addForm.classList.add('ad-form--disabled');
  addFormFieldsets.forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
  mapFiltersForm.classList.add('.map__filters--disabled');
  Array.from(mapFiltersFormSelects).forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция делает формы addForm и mapFiltersForm активными и убирает атрибут disabled у внутренних полей
 */
const makeFormsActive = () => {
  addForm.classList.remove('ad-form--disabled');
  addFormFieldsets.forEach((value) => {
    value.removeAttribute('disabled');
  });
  mapFiltersForm.classList.remove('.map__filters--disabled');
  Array.from(mapFiltersFormSelects).forEach((value) => {
    value.removeAttribute('disabled');
  });
}

/**
 * Функция сбрасывает поля форм и возвращает маркер и значение поля Адрес в значение по-умолчанию
 */
const resetForm = () => {
  addForm.reset();
  mainMarker.setLatLng(
    [
      35.68170,
      139.75388,
    ]);
  //Сет таймаут применен для того, чтобы присвоение значений маркера происходило в самую последнюю очередь,
  //странным образом, если его убрать - то поле остается пустым, в отладчике видно, что после выполнения строки
  //с присвоением значений снова выполняется строка со сбросом формы
  setTimeout(() => {addressField.value = mainMarker.getLatLng().lat.toFixed(5) + ', '  + mainMarker.getLatLng().lng.toFixed(5);} , 0);
}

/**
 * Настройка кнопки сброса формы
 */
addFormResetButton.addEventListener('click', () => resetForm());

/**
 * синхронизация полей из блока 'Время заезда и выезда'
 */
synchronizeItems(addFormTimeIn, addFormTimeOut);

/**
 * Обработчик событий поля 'Тип жилья' меняющий значение поля 'Цена за ночь'  в соответствии с выбраным типом жилья
 */
addFormTypeHousing.addEventListener('change', () => {
  const minPrice = detrmineMinPrice(addFormTypeHousing.value);
  addFormPricePerNight.setAttribute('min', minPrice);
  addFormPricePerNight.setAttribute('placeholder', minPrice);
});

/**
 * Отправка данных на сервер по сабмиту
 */
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(
    formData,
    () => {
      onSuccessSendFormMessage(),
      resetForm()
    },
    onErrorSendFormMessage,
  );
});

export {resetForm, makeFormsInactive, makeFormsActive, addressField};
