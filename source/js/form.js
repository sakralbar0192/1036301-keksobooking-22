const AlowedTypes = [
  'JPEG',
  'JPG',
  'PNG',
]; //разрешенные форматы изображений

const AddFormRoomNumberFieldValues = [
  '100',
  '1',
  '2',
  '3',
]; //значения выпадающего списка "Количество комнат"

const AddFormCapacityFieldValues = [
  '3',
  '2',
  '1',
  '0',
]; //значения выпадающего списка "Количество мест"

const AddFormTypeHousingValues = [
  'BUNGALOW',
  'FLAT',
  'HOUSE',
  'PALACE',
]; //значения выпадающего списка "Тип жилья"

const AddFormPricePerNightMinValues = [
  0,
  1000,
  5000,
  10000,
]; //значения минимальных цен поля "Цена за ночь"

const PRECISION_COORDINATE = 5; //количество знаков после запятой для координат в поле "Адрес"
const PHOTO_WIDTH = '40'; //ширина фотографии, загруженной в форму
const PHOTO_HEIGHT = '44'; //высота фотографии, загруженной в форму
const MESSAGE_Z_INDEX = 400; //значение z-индекса для сообщении о результате отправки формы
const FOUNDATION_OF_CALCULUS_SYSTEM = 10; //основание системы исчисления для приведения строки к числовому типу данных
const ESCAPE_KEY_CODE = 27; //код клавиши escape

const mapFiltersForm = document.querySelector('.map__filters');
const mapFilterHousingFeatures = mapFiltersForm.querySelector('#housing-features');
const mapFilterHousingFeaturesInputs = mapFilterHousingFeatures.querySelectorAll('.map__checkbox');
const addForm = document.querySelector('.ad-form');
const addressField = addForm.querySelector('#address');
const avatarField = addForm.querySelector('#avatar');
const avatarImage = addForm.querySelector('#avatar-image')
const offerPhotosField = addForm.querySelector('#images');
const photosBlock = addForm.querySelector('.ad-form__photo');
const addFormResetButton = addForm.querySelector('.ad-form__reset');
const addFormTypeHousing = addForm.querySelector('#type');
const addFormPricePerNight = addForm.querySelector('#price');
const addFormTimeIn = addForm.querySelector('#timein');
const addFormTimeOut = addForm.querySelector('#timeout');
const addFormRoomNumber = addForm.querySelector('#room_number');
const addFormCapacity = addForm.querySelector('#capacity');
const addFormTitle = addForm.querySelector('#title');

/**
 * Функция делает переданную форму неактивной и добавляет атрибут disabled внутренним полям
 *
 * @param {object} form - форма, которую необходимо сделать неактивной
 * @param {string} - класс формы
 */
const makeFormInactive = (form, formClass) => {
  form.classList.add(formClass + '--disabled');
  Array.from(form.children).forEach((value) => {
    value.setAttribute('disabled', 'disabled');
  });
};

/**
 * Функция делает переданную форму активной и удаляет атрибут disabled у внутренних полей
 *
 * @param {object} form - форма, которую необходимо сделать активной
 * @param {string} - класс формы
 */
const makeFormActive = (form, formClass) => {
  form.classList.remove(formClass + '--disabled');
  Array.from(form.children).forEach((value) => {
    value.removeAttribute('disabled');
  });
};

/**
 * Функция делает формы фильтрации и подачи объявлений на странице неактивными
 */
const makeFormsInactive = () => {
  makeFormInactive(mapFiltersForm, '.map__filters');
  makeFormInactive(addForm, '.ad-form');
};

/**
 * Функция делает форму для добавления нового объявления активной
 */
const makeAddFormActive = () => {
  makeFormActive(addForm, '.ad-form');
};

/**
 * Функция делает форму для фильтрации предложений активной
 */
const makeMapFiltersFormActive = () => {
  makeFormActive(mapFiltersForm, '.map__filters');
};

/**
 * Функция устанавливает в поле Адрес значения по-умолчанию и делает его неактивным для ручного редактирования
 *
 * @param {number} - defaultLat - значение lat по-умолчанию
 * @param {number} - defaultLng - значение lng по-умолчанию
 */
const setAddressFieldDefaultValue = (defaultLat, defaultLng) => {
  addressField.value = defaultLat + ', ' + defaultLng;
  addressField.setAttribute('readonly', 'readonly');
};

/**
 * Функция устанавливает полю 'Адрес' значения параметра position
 *
 * @param {object} position - параметр, изменение которого отражается в поле "Адрес"
 */
const setAddressFieldValue = (position) => {
  addressField.value = position.lat.toFixed(PRECISION_COORDINATE) + ', '  + position.lng.toFixed(PRECISION_COORDINATE);
};

/**
 * Функция определяющая значения поля "Количество мест" в зависимости от поля  "Количество комнат"
 *
 * @returns {Array} значения, которые может принимать поле "Количество мест"
 */
const determineCapacity = () => {
  const addFormRoomNumberValue = addFormRoomNumber.value;
  switch (addFormRoomNumberValue) {
    case AddFormRoomNumberFieldValues[0]:
      return [
        AddFormCapacityFieldValues[3],
      ];
    case AddFormRoomNumberFieldValues[3]:
      return [
        AddFormCapacityFieldValues[0],
        AddFormCapacityFieldValues[1],
        AddFormCapacityFieldValues[2],
      ];
    case AddFormRoomNumberFieldValues[2]:
      return [
        AddFormCapacityFieldValues[1],
        AddFormCapacityFieldValues[2],
      ];
    case AddFormRoomNumberFieldValues[1]:
      return [
        AddFormCapacityFieldValues[2],
      ];
  }
};

/**
 * Функция определяющая минимальную цену за ночь в соответствии с типом жилья
 *
 * @returns {number} - минимальная цена за ночь
 */
const determineMinPrice = () => {
  const addFormTypeHousingValue = addFormTypeHousing.value;
  switch (addFormTypeHousingValue) {
    case AddFormTypeHousingValues[1].toLowerCase():
      return AddFormPricePerNightMinValues[1];
    case AddFormTypeHousingValues[2].toLowerCase():
      return AddFormPricePerNightMinValues[2];
    case AddFormTypeHousingValues[3].toLowerCase():
      return AddFormPricePerNightMinValues[3];
    case AddFormTypeHousingValues[4].toLowerCase():
      return AddFormPricePerNightMinValues[4];
  }
};

/**
 * Функция в зависимости от значений поля "Количество комнат" вводит ограничения на поле "Количество мест"
 */
const validateCapacity = () => {
  const fields = [addFormRoomNumber, addFormCapacity];
  fields.forEach((field) => {
    field.addEventListener('change', () => {
      const allowedValues = determineCapacity();
      const isValueContains = allowedValues.some(value => value === addFormCapacity.value);
      (isValueContains)
        ? addFormCapacity.setCustomValidity('')
        : addFormCapacity.setCustomValidity('Неподходящее значение')
      addFormCapacity.reportValidity();
    })
  })
};

/**
 * Функция синхронизирующая значения полей в разделе 'Время заезда и выезда'
 */
const synchronizeTimeField = () => {
  const fields = [addFormTimeIn, addFormTimeOut]
  fields.forEach((field) => {
    field.addEventListener('change', (evt) =>{
      (evt.target === addFormTimeOut)
        ? addFormTimeIn.value = addFormTimeOut.value
        : addFormTimeOut.value = addFormTimeIn.value;
    });
  });
};

/**
 * Функция для валидации количества символов поля "Заголовок объявления"
 */
const validateTitle = () => {
  const minLength = addFormTitle.getAttribute('minlength');
  const maxLength = addFormTitle.getAttribute('maxlength');
  addFormTitle.addEventListener('input', () => {
    const valueLength = addFormTitle.value.length;
    if (valueLength < minLength) {
      addFormTitle.setCustomValidity('Еще ' + (minLength - valueLength) + ' символов');
    }else if (valueLength > maxLength) {
      addFormTitle.setCustomValidity('Удалите ' + (valueLength - maxLength) + ' символов');
    }else {
      addFormTitle.setCustomValidity('');
    }
    addFormTitle.reportValidity();
  });
};

/**
 * Функция для валидации поля 'Цена за ночь'
 */
const validatePricePerNightField = () => {
  addFormTypeHousing.addEventListener('change', () => {
    const minPrice = determineMinPrice();
    addFormPricePerNight.setAttribute('min', minPrice);
    addFormPricePerNight.setAttribute('placeholder', minPrice);
    if (addFormPricePerNight.value) {
      (addFormPricePerNight.value < minPrice)
        ? addFormPricePerNight.setCustomValidity('Цена за указанный тип жилья не может быть ниже ' + minPrice)
        : addFormPricePerNight.setCustomValidity('');
      addFormPricePerNight.reportValidity();
    }
  });
  addFormPricePerNight.addEventListener('input', () => {
    if (addFormPricePerNight.value) {
      const minPrice = parseInt(addFormPricePerNight.getAttribute('min'), FOUNDATION_OF_CALCULUS_SYSTEM);
      (addFormPricePerNight.value < minPrice)
        ? addFormPricePerNight.setCustomValidity('Цена за указанный тип жилья не может быть ниже ' + minPrice)
        : addFormPricePerNight.setCustomValidity('');
      addFormPricePerNight.reportValidity();
    }
  });
};

/**
 * Функция добавляет изображение в формате DataURL В блок с фотографиями
 *
 * @param {object} dataURL - изображение в формате DataURL
 */
const addImageToPhotoBlock = (dataURL) => {
  const photo = document.createElement('img');
  photo.src = dataURL;
  photo.setAttribute('width', PHOTO_WIDTH);
  photo.setAttribute('height', PHOTO_HEIGHT);
  photo.alt = 'Фотография жилья'
  photosBlock.appendChild(photo);
};

/**
 * Функция заменяет изображение аватара на загруженный файл в соответствующем блоке
 * или вызывает функцию, которая добавляет фотографию в блок с фото.
 *
 * @param {object} file - файл изображение, которое необходимо отобразить на странице
 * @param {boolean} isThisAvatarField - результат проверки поля, необходимый для того, чтобы определить
 * в какой блок добавить загруженный файл - значение true означает, что изображение будет добавлено в блок аватара
 */
const displayUploadedImage = (file, isThisAvatarField) => {
  const reader = new FileReader;
  reader.addEventListener('load',() => {
    (isThisAvatarField)
      ? avatarImage.src = reader.result
      : addImageToPhotoBlock(reader.result)
  })
  reader.readAsDataURL(file);
};

/**
 * Функция проверяющая, что загруженный файл имеет допустимое расширение
 */
const validateImageField = () => {
  const imageFields = [offerPhotosField,avatarField];
  imageFields.forEach((field) => {
    const isThisAvatarField = (field === avatarField);
    field.addEventListener('change', () => {
      field.setCustomValidity('');
      const files = Array.from(field.files);
      files.forEach((file) => {
        const fileName = file.name.toUpperCase();
        const isFileAllowed = AlowedTypes.some((it) => {
          return fileName.endsWith(it);
        });
        return (isFileAllowed)
          ? displayUploadedImage(file, isThisAvatarField)
          : field.setCustomValidity('Неверный формат изображения');
      })
      field.reportValidity();
    })
  })
};

/**
 * Функция возвращает поля в форме с фильтрами карты к значениям по умолчанию
 */
const resetMapFiltersForm = () => {
  Array.from(mapFiltersForm.children).forEach((filterField) => {
    (filterField === mapFilterHousingFeatures)
      ? Array.from(mapFilterHousingFeaturesInputs).forEach((input) => {
        input.checked = false;
      })
      : filterField.value = 'any';
  })
};

/**
 * Функция сбрасывает поля формы для добавления нового объявления, а так же возвращает маркер синхронизированный
 * с полем 'Адрес' и значение самого поля в значения по-умолчанию
 *
 * @param {object} marker - маркер, связанный с полем 'Адрес'
 * @param {number} markerCoordinateLat - значение lat координаты маркера по-умолчанию
 * @param {number} markerCoordinateLng - значение lng координаты маркера по-умолчанию
 */
const resetAddForm = (marker, markerCoordinateLat, markerCoordinateLng) => {
  addForm.reset();
  addFormCapacity.setCustomValidity('');
  addFormPricePerNight.setCustomValidity('');
  addFormTitle.setCustomValidity('');
  addFormPricePerNight.setAttribute('min',determineMinPrice());
  addFormPricePerNight.setAttribute('placeholder', determineMinPrice());
  avatarImage.src = 'img/muffin-grey.svg';
  photosBlock.innerHTML = '';
  marker.setLatLng(
    [
      markerCoordinateLat,
      markerCoordinateLng,
    ]);
  setTimeout(
    () => {
      addressField.value = marker.getLatLng().lat.toFixed(PRECISION_COORDINATE) + ', '  + marker.getLatLng().lng.toFixed(PRECISION_COORDINATE);
    } , 0);
};

/**
 * Функция настраивающая работу кнопки 'очистить' формы для подачи объявлений
 *
 * @param {object} marker - главный маркер позиция, которого сбрасывается до изначальной
 * @param {number} markerCoordinateLat - значение lat координаты маркера по-умолчанию
 * @param {number} markerCoordinateLng - значение lng координаты маркера по-умолчанию
 * @param {function} renderMarkersFunction - функция для отрисовки нефильтрованных предложений
 */
const configureFunctionalityResetButton = (marker, markerCoordinateLat, markerCoordinateLng, renderMarkersFunction) => {
  addFormResetButton.addEventListener('click', () => {
    resetAddForm(marker, markerCoordinateLat, markerCoordinateLng)
    resetMapFiltersForm();
    renderMarkersFunction();
  });
};

/**
 * Функция, показывающая сообщение об успешной отправке формы
 */
const displayOnSuccessSendFormDataMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE){
      message.remove();
    }
  }, {once: true});
  document.addEventListener('click',() => {
    message.remove();
  }, {once: true});
  message.style.zIndex = MESSAGE_Z_INDEX;
  document.querySelector('main').appendChild(message);
};

/**
 * Функция, показывающая сообщение об ошибке при отправке формы
 */
const displayOnErrorSendFormDataMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === ESCAPE_KEY_CODE){
      message.remove();
    }
  }, {once: true});
  document.addEventListener('click',() => {
    message.remove();
  }, {once: true});
  message.style.zIndex = MESSAGE_Z_INDEX;
  document.querySelector('main').appendChild(message);
};

/**
 * Функция, которая настраивает отправку данных формы подачи объявления,
 * а также сброс формы и возврат значений к дефолтным
 *
 * @param {function} functionForSendData - Функция выполняющая отправку данных формы
 * @param {object} marker - маркер, значения которого нужно сбросить к изначальным при успешной отправке данных
 * @param {number} markerCoordinateLat - значение lat координаты маркера по-умолчанию
 * @param {number} markerCoordinateLng - значение lng координаты маркера по-умолчанию
 */
const configureFunctionalitySubmitButton = (functionForSendData, marker, markerCoordinateLat, markerCoordinateLng) => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    functionForSendData(
      formData,
      () => {
        displayOnSuccessSendFormDataMessage();
        resetAddForm(marker, markerCoordinateLat, markerCoordinateLng)
      },
      displayOnErrorSendFormDataMessage);
  });
};

/**
 * Функция, настраивающая логику работы полей формы подачи объявления и их валидацию
 *
 * @param {number} addressDefaultLat - lat значение поля "Адрес" по-умолчанию
 * @param {number} addressDefaultLng - lng значение поля "Адрес" по-умолчанию
 */
const configureAddForm = (addressDefaultLat, addressDefaultLng) => {
  validateTitle();
  validatePricePerNightField();
  validateCapacity();
  setAddressFieldDefaultValue(addressDefaultLat, addressDefaultLng);
  synchronizeTimeField();
  validateImageField();
};

export {
  resetAddForm,
  makeFormsInactive,
  makeAddFormActive,
  setAddressFieldValue,
  makeMapFiltersFormActive,
  configureAddForm,
  configureFunctionalityResetButton,
  configureFunctionalitySubmitButton
};
