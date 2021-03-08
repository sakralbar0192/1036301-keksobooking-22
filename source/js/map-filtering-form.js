const mapFiltersForm = document.querySelector('.map__filters');
const mapSelects =  mapFiltersForm.querySelectorAll('.map__filter');
const housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
const housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const housingQuestsFilter = mapFiltersForm.querySelector('#housing-guests');
const mapCheckboxes = mapFiltersForm.querySelectorAll('.map__checkbox');

/**
 * Функция фильтрует полученные данные по типу жилья
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {object} отфильтрованные данные
 */
const filterByHousingType = (data) => {
  const currentValue = housingTypeFilter.value;
  let filteredData = [];
  filteredData = data.filter((object) => {
    return object.offer.type === currentValue;
  })
  return filteredData;
};

/**
 * Функция определяет ценовой интервал по которому произойдет сортировка
 *
 * @param {number} value - значение которое будет проходить проверку на принадлежностиь интервалу при сортировке
 *
 * @returns выражение для проверки принадлежности значения интервалу
 */
const determinePriceInterval = (value) => {
  switch (housingPriceFilter.value) {
    case 'low':
      return value <= 10000;
    case 'middle':
      return value > 10000 && value <= 50000;
    case 'high':
      return value >= 50000;
  }
}

/**
 * Функция фильтрует полученные данные по  цене за ночь
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingPrice = (data) => {
  let filteredData = [];
  filteredData = data.filter((object) => {
    return determinePriceInterval(object.offer.price);
  });
  return filteredData;
};

/**
 * Функция фильтрует полученные данные по количеству комнат
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingRooms = (data) => {
  const currentValue = housingRoomsFilter.value;
  let filteredData = [];
  filteredData = data.filter((object) => {
    return object.offer.rooms.toString() === currentValue;
  })
  return filteredData;
};

/**
 * Функция определяет вместимость по которой произойдет сортировка
 *
 * @param {number} value - значение которое будет проходить проверку при сортировке
 *
 * @returns выражение для проверки принадлежности значения интервалу
 */
const determineCapacity = (value) => {
  switch (housingQuestsFilter.value) {
    case '0':
      return value > 2;
    case '1':
      return value === 1;
    case '2':
      return value === 2;
  }
};

/**
 * Функция фильтрует полученные данные по колучеству гостей
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingGuests = (data) => {
  let filteredData = [];
  filteredData = data.filter((object) => {
    return determineCapacity(object.offer.guests);
  })
  return filteredData;
}

/**
 * Функция фильтрует полученные данные по наличию дополнительных преимуществ
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByAdditionalFeatures = (data) => {
  mapCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      data = data.filter((object) => {
        const hasOfferFeature = object.offer.features.some(value => value === checkbox.value)
        return hasOfferFeature;
      })
    }
  });
  return data;
}

/**
 * Функция фильтрует полученные данные по всем выставленным фильтрам
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterOffers = (data) => {
  let filteredData = data.slice();
  if (housingTypeFilter.value != 'any') {
    filteredData = filterByHousingType(filteredData)
  }
  if (housingPriceFilter.value != 'any') {
    filteredData = filterByHousingPrice(filteredData);
  }
  if (housingRoomsFilter.value != 'any') {
    filteredData = filterByHousingRooms(filteredData);
  }
  if (housingQuestsFilter.value != 'any') {
    filteredData = filterByHousingGuests(filteredData);
  }
  filteredData = filterByAdditionalFeatures(filteredData)
  return filteredData;
};

/**
 * Функция фильтрует данные по событию change и передает их в другую функцию для дальнейшей обработки
 *
 * @param {object} data - данные для фильтрации
 * @param {function} callback - функция обрабатывающая отфильтрованные данные
 */
const configureFiltering = (data, callback) => {
  const filters = Array.from(mapSelects).concat(Array.from(mapCheckboxes))
  filters.forEach((filter) => {
    filter.addEventListener('change', () => {
      let filteredData = filterOffers(data);
      callback(filteredData)
    })
  })
}


export {configureFiltering};
