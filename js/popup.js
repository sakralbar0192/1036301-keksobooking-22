import {createElement} from './util.js'

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
]

const RUSSIANTYPES = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
]
const offerTemplate = document.querySelector('#card').content.querySelector('.popup')

/**
 * Функция, возвращающая значение типа жилья на русском языке.
 *
 * @param {string} currentValue - текущее значение жилья(на английском языке)
 *
 * @returns возвращает значение типа жилья на русском языке
 */
const makeRusType = (currentValue) => {
  let currentIndex = 0;
  let russianType = '';
  TYPES.forEach((value, index) => {
    if (value === currentValue) {
      currentIndex = index;
    }
  });
  russianType = RUSSIANTYPES[currentIndex];
  return russianType;
};

/**
 * Функция, создающая наполнение для блоков-контейнеров popup__features и popup__photos
 *
 * @param {Array} valueMassive - массив данных для генерации элементов
 * @param {string} elementTag - тэг формируемых элементов
 * @param {string} elementClass - класс формируемых элементов
 * @param {boolean} isFeature - проверка является ли формируемый список списком преимуществ
 * @param {boolean} isOfferPhoto - проаерка является ли формируемый список списком фотографий
 *
 * @return {DocumentFragment} возвращает фрагмент документа с разметкой для блоков контейнеров
 */
const fillElement = (valueMassive, elementTag, elementClass, isFeature, isOfferPhoto) => {
  const elementsContainer = document.createDocumentFragment();
  valueMassive.forEach((value) => {
    const elementsListItem = createElement(elementTag, elementClass);
    if (isFeature) {
      elementsListItem.classList.add('popup__feature--'+ value);
    }
    if (isOfferPhoto) {
      elementsListItem.src = value;
      elementsListItem.width = 45;
      elementsListItem.height = 40;
      elementsListItem.alt = 'Фотография жилья';
    }
    elementsContainer.appendChild(elementsListItem);
  });
  return elementsContainer;
};

/**
 * Функция создает разметку попапа для маркера предложения и заполняет его актуальными данными
 *
 * @param {object} param0 - объект с данными, необходимыми для формирования попапа
 *
 * @returns возвращает сформированный элемент-попап предложения
 */
const createPopupElement = ({author, offer}) => {
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = offer.address;
  offerElement.querySelector('.popup__text--price').textContent = offer.price + ' ₽/ночь';
  offerElement.querySelector('.popup__type').textContent = makeRusType(offer.type)
  offerElement.querySelector('.popup__text--capacity').textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей'
  offerElement.querySelector('.popup__text--time').textContent = offer.checkin + ' выезд до ' + offer.checkout;
  offerElement.querySelector('.popup__features').innerHTML = '';
  offerElement.querySelector('.popup__features').appendChild(fillElement(offer.features, 'li', 'popup__feature', true));
  offerElement.querySelector('.popup__description').textContent = offer.description;
  offerElement.querySelector('.popup__photos').innerHTML = '';
  offerElement.querySelector('.popup__photos').appendChild(fillElement(offer.photos, 'img', 'popup__photo', false, true));
  offerElement.querySelector('.popup__avatar').src = author.avatar;
  return offerElement;
};

export {createPopupElement, makeRusType};
