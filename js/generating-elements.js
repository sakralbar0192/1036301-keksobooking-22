import {getMassiveData, RUSSIANTYPES, TYPES} from './data.js';
import {makeElement} from './util.js';

let massiveData = getMassiveData();

const makeRusType = (currentValue) => {
  let currentIndex = 0;
  TYPES.forEach((value, index) => {
    if (value === currentValue) {
      currentIndex = index;
    }
  });
  return currentIndex;
};

const fillElement = (elementsMassive, elementTag, elementClass, elementsContainer, isFeature, isOfferPhoto) => {
  for (let i=0;i<elementsMassive.length;i++) {
    const elementsListItem = makeElement(elementTag, elementClass);
    if (isFeature) {
      elementsListItem.classList.add('popup__feature--'+ elementsMassive[i]);
    }
    if (isOfferPhoto) {
      elementsListItem.src = elementsMassive[i];
      elementsListItem.width = 45;
      elementsListItem.height = 40;
      elementsListItem.alt = 'Фотография жилья';
    }
    elementsContainer.appendChild(elementsListItem);
  }
  return elementsContainer;
}

const makeOffers = (quantityOffers=massiveData.length) => {
  if ( quantityOffers > massiveData.length){
    massiveData = getMassiveData(quantityOffers);
  }
  const offersContainer = makeElement('div','popup__container');
  for (let i=0;i<quantityOffers;i++) {
    const offer = makeElement('article','popup');
    const offerAvatar = makeElement('img','popup__avatar');
    offerAvatar.src = massiveData[i].author.avatar;
    offerAvatar.alt = 'Аватар пользователя';
    offerAvatar.width = 70;
    offerAvatar.height = 70;
    offer.appendChild(offerAvatar);
    const offerTitle = makeElement('h3','popup__title',massiveData[i].offer.title);
    offer.appendChild(offerTitle);
    const offerAdress = makeElement('p','popup__text',massiveData[i].offer.address);
    offerAdress.classList.add('popup__text--address');
    offer.appendChild(offerAdress);
    const offerPrice = makeElement('p','popup__text',massiveData[i].offer.price + ' ₽/ночь');
    offerPrice.classList.add('popup__text--price');
    offer.appendChild(offerPrice);
    const offerType = makeElement('h4','popup__type',RUSSIANTYPES[makeRusType(massiveData[i].offer.type)]);
    offer.appendChild(offerType);
    const offerCapacity = makeElement('p','popup__text',massiveData[i].offer.rooms + ' комнаты для ' + massiveData[i].offer.guests + ' гостей');
    offerCapacity.classList.add('popup__text--capacity');
    offer.appendChild(offerCapacity);
    const offerTime = makeElement('p','popup__text','Заезд после ' + massiveData[i].offer.checkin + ' выезд до ' + massiveData[i].offer.checkout);
    offerTime.classList.add('popup__text--time');
    offer.appendChild(offerTime);
    const offerFeatureList = makeElement('ul','popup__features');
    fillElement(massiveData[i].offer.features,'li','popup__feature',offerFeatureList,true);
    offer.appendChild(offerFeatureList);
    const offerDescription = makeElement('p','popup__description',massiveData[i].offer.description);
    offer.appendChild(offerDescription);
    const offerPhotosContainer = makeElement('div','popup__photos');
    fillElement(massiveData[i].offer.photos,'img','popup__photo',offerPhotosContainer,false,true);
    offer.appendChild(offerPhotosContainer);
    offersContainer.appendChild(offer);
  }
  return offersContainer;
}


const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(makeOffers(1));
