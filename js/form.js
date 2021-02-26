import {sendData} from './api.js';
import {mainMarker} from './map.js';

const addForm = document.querySelector('.ad-form');
const addressField = addForm.querySelector('#address');
const addFormResetButton = addForm.querySelector('.ad-form__reset');
const addFormFieldsets = addForm.querySelectorAll('.ad-form__element');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.children;

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
 * Отправка данных на сервер по сабмиту
 */
addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);
  sendData(formData);
});

export {resetForm, makeFormsInactive, makeFormsActive, addressField};
