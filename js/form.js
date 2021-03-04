const AlowedTypes = [
  'JPEG',
  'JPG',
  'PNG',
];

const mapFiltersForm = document.querySelector('.map__filters');
const addForm = document.querySelector('.ad-form');
const addressField = addForm.querySelector('#address');
const avatarField = addForm.querySelector('#avatar');
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
 * Функция делает форму для фильтрации активной
 */
const makeMapFiltersFormActive = () => {
  makeFormActive(mapFiltersForm, '.map__filters');
};

/**
 * Функция устанавливает в поле Адрес значения по-умолчанию и добавляет ему атрибут readonly
 */
const setAddressFieldDefaultValue = () => {
  addressField.value = 35.68170 + ', ' + 139.75388;
  addressField.setAttribute('readonly', 'readonly');
};

/**
 * Функция устанавливает полю 'Адрес' значения параметра position
 */
const setAddressFieldValue = (position) => {
  addressField.value = position.lat.toFixed(5) + ', '  + position.lng.toFixed(5);
}



/**
 * Функция определяющая значения поля "Количество мест" в зависимости от поля  "Количество комнат"
 *
 * @returns {Array} значения, которые может принимать поле "Количество мест"
 */
const determineCapacity = () => {
  const addFormRoomNumberValue = addFormRoomNumber.value;
  switch (addFormRoomNumberValue) {
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
 * @returns {number} - минимальная цена за ночь
 */
const determineMinPrice = () => {
  const addFormTypeHousingValue = addFormTypeHousing.value;
  switch (addFormTypeHousingValue) {
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
 * Функция в зависимости от значений поля "Количество комнат" вводит ограничения на поле "Количество мест"
 */
const validationCapacity = () => {
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
 * Функция синхронизирующая два поля в разделе  'Время заезда и выезда'
 */
const synchronizeField = () => {
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
const titleValidation = () => {
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
}

/**
 * Функция для валидации поля 'Цена за ночь'
 */
const PricePerNightValidation = () => {
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
      const minPrice = parseInt(addFormPricePerNight.getAttribute('min'), 10);
      (addFormPricePerNight.value < minPrice)
        ? addFormPricePerNight.setCustomValidity('Цена за указанный тип жилья не может быть ниже ' + minPrice)
        : addFormPricePerNight.setCustomValidity('');
      addFormPricePerNight.reportValidity();
    }
  });
};

const addImageToPhotoBlock = (dataURL) => {
  const photo = document.createElement('img');
  photo.src = dataURL;
  photo.setAttribute('width', '40');
  photo.setAttribute('height', '44');
  photo.alt = 'Фотография жилья'
  photosBlock.appendChild(photo);
}
/**
 * Функция заменяет изображение аватара на загруженный файл в соответствующем блоке
 *  или вызывает функцию, которая добавляет фотографию в блок с фото.
 *
 * @param {object} file - файл изображение, которое необходимо отобразить на странице
 * @param {boolean} isThisAvatarField - результат проверки поля, необходимый для того, чтобы добавить файл в нужный блок
 * @param {function} createElementFunction - функция, которая может создать DOM элемент
 */
const displayUploadedImage = (file, isThisAvatarField) => {
  const reader = new FileReader;
  reader.addEventListener('load',() => {
    (isThisAvatarField)
      ? addForm.querySelector('#avatar-image').src = reader.result
      : addImageToPhotoBlock(reader.result)
  })
  reader.readAsDataURL(file);
}
/**
 * Функция проверяющая, что загруженный файл имеет допустимое расширение
 *
 * @param {function} onSuccessValidation - функция, которую необходимо выполнить при успешной валидации загруженного файла
 *
 */
const validationImageField = (onSuccessValidation) => {
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
          ? onSuccessValidation(file, isThisAvatarField)
          : field.setCustomValidity('Неверный формат изображения');
      })
      field.reportValidity();
    })
  })
}

/**
 * Функция сбрасывает поля форм, а так же возвращает маркер синхронизированный с полем 'Адрес' и
 * значение самого поля в значения по-умолчанию
 *
 * @param {object} marker - маркер, связанный с полем 'Адрес'
 */
const resetForm = (marker) => {
  addForm.reset();
  addFormCapacity.setCustomValidity('');
  addFormPricePerNight.setCustomValidity('');
  addFormTitle.setCustomValidity('');
  marker.setLatLng(
    [
      35.68170,
      139.75388,
    ]);
  setTimeout(
    () => {
      addressField.value = marker.getLatLng().lat.toFixed(5) + ', '  + marker.getLatLng().lng.toFixed(5);
    } , 0);
}

/**
 * Функция настраивающая работу кнопки 'очистить'
 */
const configureFunctionalityResetButton = (marker) => {
  addFormResetButton.addEventListener('click', () => resetForm(marker));
}

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
 * Функция создающая форме событие по submit, отправляющее данные с формы с помощью переданной функции
 *
 * @param {function} functionForSendData - Функция выполняющая отправку собранных данных
 */
const configureFunctionalitySubmitButton = (functionForSendData) => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    functionForSendData(
      formData,
      () => {
        onSuccessSendFormMessage(),
        resetForm()
      },
      onErrorSendFormMessage,
    );
  });
}

/**
 * Функция, конфигурирующая и валидирующая логику работы полей формы подачи объявления
 *
 * @param {object} marker - маркер, значения которого будут сбрасываться при очистке формы
 * @param {function} functionForSendData - Функция, которая отправит данные собранные в форме
 */
const configureAddForm = (marker, functionForSendData) => {
  titleValidation();
  PricePerNightValidation();
  validationCapacity();
  setAddressFieldDefaultValue();
  synchronizeField();
  configureFunctionalityResetButton(marker);
  configureFunctionalitySubmitButton(functionForSendData);
  validationImageField(displayUploadedImage, true);
};


export {
  resetForm,
  makeFormsInactive,
  makeAddFormActive,
  setAddressFieldValue,
  makeMapFiltersFormActive,
  configureAddForm
};
