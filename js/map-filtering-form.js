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
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingType = (data) => {
  const currentValue = housingTypeFilter.value;
  let filteredData = [];
  (currentValue != 'any')
    ? filteredData = data.filter((object) => {
      return object.offer.type === currentValue;
    })
    : filteredData = data;
  return filteredData;
};

/**
 * Функция фильтрует полученные данные по  цене за ночь
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingPrice = (data) => {
  const currentValue = housingPriceFilter.value;
  let filteredData = [];
  if (currentValue === 'low') {
    filteredData = data.filter((object) => {
      return object.offer.price <= 10000;
    });
  }else if (currentValue === 'middle') {
    filteredData = data.filter((object) => {
      return object.offer.price > 10000 && object.offer.price < 50000;
    });
  }else if (currentValue === 'high') {
    filteredData = data.filter((object) => {
      return object.offer.price >= 50000;
    });
  } else {
    filteredData = data;
  }
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
  (currentValue != 'any')
    ? filteredData = data.filter((object) => {
      return object.offer.rooms.toString() === currentValue;
    })
    : filteredData = data;
  return filteredData;
}

/**
 * Функция фильтрует полученные данные по колучеству гостей
 *
 * @param {object} data - данные для фильтрации
 *
 * @returns {bject} filtredData - отфильтрованные данные
 */
const filterByHousingGuests = (data) => {
  const currentValue = housingQuestsFilter.value;
  let filteredData = [];
  if (currentValue === 'any') {
    filteredData = data;
  }else if (currentValue === '0') {
    filteredData = data.filter((object) => {
      return object.offer.guests > 2;
    })
  }else if (currentValue === '1') {
    filteredData = data.filter((object) => {
      return object.offer.guests === 1;
    })
  }else if (currentValue === '2') {
    filteredData = data.filter((object) => {
      return object.offer.guests === 2;
    })
  }
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
        return object.offer.features.some((value) => {
          return value === checkbox.value;
        })
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
const setFiltering = (data, callback) => {
  const filters = Array.from(mapSelects).concat(Array.from(mapCheckboxes))
  filters.forEach((filter) => {
    filter.addEventListener('change', () => {
      let filteredData = filterOffers(data);
      callback(filteredData)
    })
  })
}


export {mapFiltersForm, setFiltering};
