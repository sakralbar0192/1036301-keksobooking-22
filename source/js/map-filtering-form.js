const ANY_VALUE = 'any'; //дефолтное значение выпадающих списков в форме фильтрации объявлений

const HousingPriceFilterValues = [
  'LOW',
  'MIDDLE',
  'HIGH',
]; //значения выпадающего списка фильтрующего объявления по цене

const HousingPricePoints = [
  10000,
  50000,
]; //ценовые точки для создания интервалов цены при фильтрации объявлений

const HousingQuestsFilterValues = [
  '0',
  '1',
  '2',
]; //значения выпадающего списка фильтрующего объявления по количеству гостей

const HousingQuestsPoints = [
  1,
  2,
]; //точки для создания интервалов при фильтрации по количеству гостей

const mapFiltersForm = document.querySelector('.map__filters');
const mapSelects =  mapFiltersForm.querySelectorAll('.map__filter');
const housingTypeFilter = mapFiltersForm.querySelector('#housing-type');
const housingPriceFilter = mapFiltersForm.querySelector('#housing-price');
const housingRoomsFilter = mapFiltersForm.querySelector('#housing-rooms');
const housingQuestsFilter = mapFiltersForm.querySelector('#housing-guests');
const mapCheckboxes = mapFiltersForm.querySelectorAll('.map__checkbox');

/**
 * Функция определяет ценовой интервал по которому произойдет сортировка
 *
 * @param {number} value - значение которое будет проходить проверку на принадлежностиь интервалу при сортировке
 *
 * @returns {boolean} результатпроверки принадлежности переданного значения интервалу
 */
const determinePriceInterval = (value) => {
  switch (housingPriceFilter.value) {
    case HousingPriceFilterValues[0].toLowerCase():
      return value <= HousingPricePoints[0];
    case HousingPriceFilterValues[1].toLowerCase():
      return value > HousingPricePoints[0] && value <= HousingPricePoints[1];
    case HousingPriceFilterValues[2].toLowerCase():
      return value >= HousingPricePoints[1];
  }
}

/**
 * Функция определяет вместимость по которой произойдет сортировка
 *
 * @param {number} value - значение которое будет проходить проверку при сортировке
 *
 * @returns {boolean} результат проверки на принадлежность переданного значения интервалу
 */
const determineCapacity = (value) => {
  switch (housingQuestsFilter.value) {
    case HousingQuestsFilterValues[0]:
      return value > HousingQuestsPoints[1];
    case HousingQuestsFilterValues[1]:
      return value === HousingQuestsPoints[0];
    case HousingQuestsFilterValues[2]:
      return value === HousingQuestsPoints[1];
  }
};

/**
 * Функция, проверяющая соответствие переданного элемента фильтру по вместимости
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 */
const checkValidityDataElementByHousingQuests = (dataElement) => {
  return housingQuestsFilter.value === ANY_VALUE ||  determineCapacity(dataElement.offer.guests);
};

/**
 * Функция, проверяющая соответствие переданного элемента фильтру по количеству комнат
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 */
const checkValidityDataElementByHousingRooms = (dataElement) => {
  return housingRoomsFilter.value === ANY_VALUE || dataElement.offer.rooms.toString() === housingRoomsFilter.value;
};

/**
 * Функция, проверяющая соответствие переданного элемента фильтру по цене жилья
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 */
const checkValidityDataElementByHousingPrice = (dataElement) => {
  return housingPriceFilter.value === ANY_VALUE || determinePriceInterval(dataElement.offer.price);
};

/**
 * Функция, проверяющая соответствие переданного элемента фильтру по типу жилья
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 */
const checkValidityDataElementByHousingType = (dataElement) => {
  return housingTypeFilter.value === ANY_VALUE || dataElement.offer.type === housingTypeFilter.value;
};

/**
 * Функция, проверяющая соответствие переданного элемента фильтру по дополнительным преимуществам
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 */
const checkValidityByAdditionalFeatures = (dataElement) => {
  const checkedCheckboxesValues = [];
  mapCheckboxes.forEach((checkbox) => {
    if (checkbox.checked) {
      checkedCheckboxesValues.push(checkbox.value)
    }
  })
  let isDataElementValidByAdditionalFeatures = true;
  checkedCheckboxesValues.forEach((checkboxValue) => {
    const hasOfferValue = dataElement.offer.features.some((feature) => feature === checkboxValue);
    isDataElementValidByAdditionalFeatures = isDataElementValidByAdditionalFeatures && hasOfferValue
    return isDataElementValidByAdditionalFeatures
  })
  return isDataElementValidByAdditionalFeatures;
}

/**
 * Функция, проверяющая соответствие переданного элемента данных выставленным фильтрам
 *
 * @param {object} dataElement - элемент данных проходящий проверку на соответствие выставленным фильтрам
 *
 * @returns {boolean} - соответствует ли элемент фильтрам
 */
const checkDataElementValidity = (dataElement) => {
  return checkValidityDataElementByHousingType(dataElement)
  && checkValidityDataElementByHousingPrice(dataElement)
  && checkValidityDataElementByHousingRooms(dataElement)
  && checkValidityDataElementByHousingQuests(dataElement)
  && checkValidityByAdditionalFeatures(dataElement);
};

/**
 * Функция, фильтрующая входящие данные
 *
 * @param {object} data - данные для фильтрации
 * @param {number} numberOfRenderingMarkers - количество отрисовываемых элементов
 */
const filterOffers = (data, numberOfRenderingMarkers) => {
  const filteredData = [];
  for (let i = 0; i < data.length; i++) {
    if (filteredData.length === numberOfRenderingMarkers){
      break;
    }
    if (checkDataElementValidity(data[i])){
      filteredData.push(data[i])
    }
  }
  return filteredData;
};

/**
 * Функция настраивает работу формы для фильтрации объявлений
 * и передает отфильтрованные данные другой функции, которая их отрисует
 *
 * @param {object} data - данные для фильтрации
 * @param {function} renderFunction - функция, которая отрисует отфильтрованные данные
 * @param {number} numberOfRenderingMarkers - количество отрисовываемых элементов
 */
const configureFiltering = (data, renderFunction, numberOfRenderingMarkers) => {
  const filters = Array.from(mapSelects).concat(Array.from(mapCheckboxes))
  filters.forEach((filter) => {
    filter.addEventListener('change', () => {
      let filteredData = filterOffers(data, numberOfRenderingMarkers);
      renderFunction(filteredData)
    })
  })
}

export {configureFiltering};
