import {getMassiveData, makeRusType} from './data.js';
import {makeElement} from './util.js'

//Функция, создающая шаблонную разметку для заданого количества элементов.
const makeOffers = (quantityOffers=10) => {
  const offerTemplate = document.querySelector('#card').content.querySelector('.popup')
  const offersFragment = document.createDocumentFragment();
  getMassiveData(quantityOffers).forEach(({author,location, offer}) => {
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
    offersFragment.appendChild(offerElement);
  });
  return offersFragment
};

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

export {makeOffers};
