import {makeRusType} from './data.js';
import {makeElement} from './util.js'

const offerTemplate = document.querySelector('#card').content.querySelector('.popup')

//Функция, создающая шаблонную разметку для одного элемента.
const createOfferElement = ({author,location, offer}) => {
  const offerFragment = document.createDocumentFragment();
  const offerElement = offerTemplate.cloneNode(true);
  offerElement.querySelector('.popup__title').textContent = offer.title;
  offerElement.querySelector('.popup__text--address').textContent = location.x + ', ' + location.y;
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
  offerFragment.appendChild(offerElement);
  return offerFragment;
};

//Функция, создающая шаблонную разметку для нескольких элементов.
const createOffersElements = (massive) => {
  const offersFragment = document.createDocumentFragment();
  massive.forEach((value) => {
    const offer = createOfferElement(value);
    offersFragment.appendChild(offer);
  });
  return offersFragment;
}

//функция, создающая наполнение для блоков-контейнеров popup__features и popup__photos
const fillElement = (valueMassive, elementTag, elementClass, isFeature, isOfferPhoto) => {
  const elementsContainer = document.createDocumentFragment();
  valueMassive.forEach((value) => {
    const elementsListItem = makeElement(elementTag, elementClass);
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

export {createOffersElements, createOfferElement};
