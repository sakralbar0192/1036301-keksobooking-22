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
const addFormRoomNumber = addForm.querySelector('#room_number');
const addFormCapacity = addForm.querySelector('#capacity');
const addFormTitle = addForm.querySelector('#title');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersFormSelects = mapFiltersForm.children;

/**
 * Функция определяющая значения поля "Количество мест" в зависимости от поля  "Количество комнат"
 *
 * @param {object} value - значение, которое принимает поле "Количество комнат"
 *
 * @returns {Array} значения, которые может принимать поле "Количество мест"
 */
const checkCapacity = (value) => {
  switch (value) {
    case '100':
      return [
        '0',
      ];
    case '3':
      return [
        '3',
        '2',
        '1',
      ];
    case '2':
      return [
        '2',
        '1',
      ];
    case '1':
      return [
        '1',
      ];
  }
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
 * Функция реализующая логику валидации и взаимодействия полей "Количество комнат" и "Количество мест"
 *
 * @param {object} fieldOne  - поле, от которого зависят значения поля 2
 * @param {object} fieldTwo  - поле, значения которого зависят от поля 1
 */
const validationCompliance = (fieldOne, fieldTwo) => {
  const fields = [fieldOne, fieldTwo];
  fields.forEach((field) => {
    field.addEventListener('change', () => {
      const allowedValues = checkCapacity(fieldOne.value);
      if (allowedValues.some((value) => {
        return value === fieldTwo.value
      })) {
        fieldTwo.setCustomValidity('')
      }else {
        fieldTwo.setCustomValidity('Неподходящее значение')
      }
      fieldTwo.reportValidity();
    })
  })
};

/**
 * Функция синхронизирующая два поля и делающая их значения одинаковыми при изменении одного из них
 *
 * @param {object} fieldOne - первое поле
 * @param {object} fieldTwo - второе поле
 */
const synchronizeField = (fieldOne, fieldTwo) => {
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
  setTimeout(() => {addressField.value = mainMarker.getLatLng().lat.toFixed(5) + ', '  + mainMarker.getLatLng().lng.toFixed(5);} , 0);
}

/**
 * Настройка кнопки сброса формы
 */
addFormResetButton.addEventListener('click', () => resetForm());

/**
 * синхронизация полей из блока 'Время заезда и выезда'
 */
synchronizeField(addFormTimeIn, addFormTimeOut);

/**
 * Реализация логики валидации и взаимодействия полей "Количество комнат" и "Количество мест"
 */
validationCompliance(addFormRoomNumber, addFormCapacity);

/**
 * Валидация "на лету" поля "Заголовок объявления"
 */
addFormTitle.addEventListener('input', () => {
  const valueLength = addFormTitle.value.length;
  const minLength = addFormTitle.getAttribute('minlength');
  const maxLength = addFormTitle.getAttribute('maxlength');
  if (valueLength < minLength) {
    addFormTitle.setCustomValidity('Еще ' + (minLength - valueLength) + ' символов');
  }else if (valueLength > maxLength) {
    addFormTitle.setCustomValidity('Удалите ' + (valueLength - maxLength) + ' символов');
  }else {
    addFormTitle.setCustomValidity('');
  }
  addFormTitle.reportValidity();
});

/**
 * Валидатор и обработчик событий поля 'Цена за ночь', проверяющий введенные данные на соответствие ожидаемым
 */
addFormPricePerNight.addEventListener('input', () => {
  const minPrice = detrmineMinPrice(addFormTypeHousing.value);
  addFormPricePerNight.setAttribute('min', minPrice);
  if (addFormPricePerNight.value) {
    (addFormPricePerNight.value < minPrice)
      ? addFormPricePerNight.setCustomValidity('Цена за указанный тип жилья не может быть ниже ' + minPrice)
      : addFormPricePerNight.setCustomValidity('');
    addFormPricePerNight.reportValidity();
  }
});

/**
 * Обработчик событий поля 'Тип жилья' меняющий минимальное значение и плэйсхолдер поля 'Цена за ночь'
 * в соответствии с выбраным типом жилья, а так же валидирующий поле 'Цена за ночь'
 */
addFormTypeHousing.addEventListener('change', () => {
  const minPrice = detrmineMinPrice(addFormTypeHousing.value);
  addFormPricePerNight.setAttribute('min', minPrice);
  addFormPricePerNight.setAttribute('placeholder', minPrice);
  if (addFormPricePerNight.value) {
    (addFormPricePerNight.value < minPrice)
      ? addFormPricePerNight.setCustomValidity('Цена за указанный тип жилья не может быть ниже ' + minPrice)
      : addFormPricePerNight.setCustomValidity('');
    addFormPricePerNight.reportValidity();
  }
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
