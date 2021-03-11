import {createElement} from './util.js'

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
]; //типы жилья на английском языке

const RUSSIANTYPES = [
  'Дворец',
  'Квартира',
  'Дом',
  'Бунгало',
]; //типы жилья на русском языке

const PHOTO_WIDTH = 45; //ширина фотографий жилья
const PHOTO_HEIGHT = 40; //высота фотографий жилья

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');

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
 * @param {object} elementBlockToFill - блок в который будет добавлены новые элементы
 * @param {boolean} isFeature - проверка является ли формируемый список списком преимуществ
 * @param {boolean} isOfferPhoto - проаерка является ли формируемый список списком фотографий
 *
 * @return {DocumentFragment} возвращает фрагмент документа с разметкой для блоков контейнеров
 */
const fillElement = (valueMassive, elementTag, elementClass, elementBlockToFill, isFeature, isOfferPhoto) => {
  const elementsContainer = document.createDocumentFragment();
  valueMassive.forEach((value) => {
    const elementsListItem = createElement(elementTag, elementClass);
    if (isFeature) {
      elementsListItem.classList.add('popup__feature--'+ value);
    }
    if (isOfferPhoto) {
      elementsListItem.src = value;
      elementsListItem.width = PHOTO_WIDTH;
      elementsListItem.height = PHOTO_HEIGHT;
      elementsListItem.alt = 'Фотография жилья';
    }
    elementsContainer.appendChild(elementsListItem);
  });
  elementBlockToFill.innerHTML = '';
  elementBlockToFill.appendChild(elementsContainer);
};

/**
 * Функция создает разметку попапа для маркера предложения и заполняет его актуальными данными
 *
 * @param {object} {author, offer} - объект с данными, необходимыми для формирования попапа
 *
 * @returns возвращает сформированный элемент-попап предложения
 */
const createPopupElement = ({author, offer}) => {
  const popupElement = popupTemplate.cloneNode(true);
  const popupAvatar  = popupElement.querySelector('.popup__avatar');
  const popupTitle = popupElement.querySelector('.popup__title');
  const popupAddress = popupElement.querySelector('.popup__text--address');
  const popupPrice = popupElement.querySelector('.popup__text--price');
  const popupType = popupElement.querySelector('.popup__type');
  const popupCapacity = popupElement.querySelector('.popup__text--capacity');
  const popupTime = popupElement.querySelector('.popup__text--time');
  const popupFeatures = popupElement.querySelector('.popup__features');
  const popupDescription = popupElement.querySelector('.popup__description');
  const popupPhotos = popupElement.querySelector('.popup__photos');
  (author.avatar)
    ? popupAvatar.src = author.avatar
    : popupAvatar.remove();
  (offer.title)
    ? popupTitle.textContent = offer.title
    : popupTitle.remove();
  (offer.address)
    ? popupAddress.textContent = offer.address
    : popupAddress.remove();
  (offer.price)
    ? popupPrice.textContent = offer.price + ' ₽/ночь'
    : popupPrice.remove();
  (offer.type)
    ? popupType.textContent =  makeRusType(offer.type)
    : popupType.remove();
  (offer.rooms && offer.guests)
    ? popupCapacity.textContent = offer.rooms + ' комнаты для ' + offer.guests + ' гостей'
    : popupCapacity.remove();
  (offer.checkin && offer.checkout)
    ? popupTime.textContent = 'Заезд после ' + offer.checkin + ', выезд до ' + offer.checkout
    : popupTime.remove();
  (offer.description)
    ? popupDescription.textContent = offer.description
    : popupDescription.remove();
  (offer.features)
    ? fillElement(offer.features, 'li', 'popup__feature', popupFeatures, true)
    : popupFeatures.remove();
  (offer.photos)
    ? fillElement(offer.photos, 'img', 'popup__photo', popupPhotos, false, true)
    : popupPhotos.remove();
  return popupElement;
};

export {createPopupElement};
