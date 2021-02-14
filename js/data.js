import {getRandomNumber, getValues} from './util.js';

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const DESCRIPTIONS = [
  'мило',
  'уютно',
  'чисто',
  'комфортно',
  'красиво',
  'свежо',
  'красочно',
  'восхитительно',
  'обворожительно',
  'завораживающе',
]
const POSITIONS = [
  'в центре Токио',
  'на окраине деревни',
  'в часе езды от магазина',
  'у подножия гор',
  'на скалистом берегу',
]

//Функция, создающая массив данных с заданым(quantitiOffers) количеством элементов.
const getMassiveData = (quantitiOffers = 10) => {
  let author = {};
  let location = {};
  let offer = {};
  const massiveData = [];
  for (let i = 0; i < quantitiOffers; i++) {
    author = getAuthor(),
    location = getlocation(),
    offer = getOfferInfo(),
    offer.address = location.x + ', ' + location.y;
    massiveData.push({author, location, offer});
  }
  return massiveData;
};
//Функция, создающая обьект author элементов массива требуемых данных.
const getAuthor = () => {
  return {
    avatar : 'img/avatars/user0' + getRandomNumber(1,8,0) + '.png',
  };
};
//Функция, создающая второй обьект элементов массива требуемых данных с инфомацией о предложении
const getOfferInfo = () => {
  return {
    title : getTitle(),
    address : '',
    price : getRandomNumber(1000,50000,0),
    type : TYPES[getRandomNumber(0,3,0)],
    rooms : getRandomNumber(1,100,0),
    guests : getRandomNumber(0,3,0),
    checkin : CHECKINS[getRandomNumber(0,2,0)],
    checkout : CHECKINS[getRandomNumber(0,2,0)],
    features : getValues(FEATURES),
    description :'строка — описание помещения. Придумайте самостоятельно.',
    photos : getPhotos(),
  };
};
//Функция, случайным образом создающая заголовок обьявления для функции getOfferInfo
const getTitle = () => getValues(DESCRIPTIONS) + ',' + POSITIONS[getRandomNumber(0,4,0)];

//Функция, создающая массив с quantitiPhotos количеством типовых элементов.
const getPhotos = (quantitiPhotos = 3) => {
  const photos = [];
  for (let i = 0; i < getRandomNumber(1,quantitiPhotos,0); i++) {
    photos.push('http://o0.github.io/assets/images/tokyo/hotel' + (i+1) + '.jpg');
  }
  return photos;
}
//Функция, создающая обьект с двумя случайными свойствами.
const getlocation = () => {
  return {
    x : getRandomNumber(35.65000,35.70000),
    y : getRandomNumber(139.70000,139.80000),
  };
};

export {getMassiveData};