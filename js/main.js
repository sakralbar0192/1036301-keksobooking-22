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

//Функция, создающая quantitiOffers элементов массива с требуемыми данными.
let getMassiveData = (quantitiOffers = 10) => {
  let massiveData = [];
  let author = 0;
  let location = 0;
  let offer =  0;
  for (let i = 0; i < quantitiOffers; i++) {
    author = getAuthor();
    offer =  getOfferInfo();
    location = getlocation();
    offer.address = location.x + ', ' + location.y;
    massiveData[i] = {author,location,offer};
  }
  return massiveData;
};
//Функция, создающая первый обьект элементов массива требуемых данных.
let getAuthor = () => {
  return {
    avatar : 'img/avatars/user0' + getRandomNumber(1,8,0) + '.png',
  };
};
//Функция, создающая второй обьект элементов массива требуемых данных с инфомацией о предложении
let getOfferInfo = () => {
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
let getTitle = () => {
  return getValues(DESCRIPTIONS) + ',' + POSITIONS[getRandomNumber(0,4,0)];
}
//Функция, создающая массив со случайным колличеством случайных неповторяющихся элементов другого массива
let getValues = (massive) => {
  let Values = [];
  let counter = 0;
  let numberValue = 0;
  let isValueExist = true;
  let quantitiValues = getRandomNumber(1,massive.length,0);
  for (let i = 1; i <= quantitiValues; i++) {
    numberValue = getRandomNumber(0,5,0);
    isValueExist = Values.some((value) => value === massive[numberValue]);
    if (!isValueExist) {
      Values[counter] = massive[numberValue];
      counter ++;
    }
  }
  return Values;
}
//Функция, создающая случайное число в указанном интервале с указанной точностью
let getRandomNumber = function (min = 0, max = 1000, precision = 5) {
  if (min < 0 || max < 0 || precision < 0) {
    min = Math.sqrt(Math.pow(min));
    max = Math.sqrt(Math.pow(max));
    precision = Math.sqrt(Math.pow(precision));
  }
  if (min > max) {
    return (((Math.random()* (min-max))+ max).toFixed(precision));
  }else {
    return (((Math.random()* (max-min))+ min).toFixed(precision));
  }
}
//Функция, создающая массив с quantitiPhotos количеством типовых элементов.
let getPhotos = () => {
  let quantitiPhotos = 3;
  let photos =[];
  for (let i = 0; i < getRandomNumber(1,quantitiPhotos,0); i++) {
    photos[i] = 'http://o0.github.io/assets/images/tokyo/hotel' + (i+1) + '.jpg';
  }
  return photos;
}
//Функция, создающая обьект с двумя случайными свойствами.
let getlocation = () => {
  return {
    x : getRandomNumber(35.65000,35.70000),
    y : getRandomNumber(139.70000,139.80000),
  };
};

alert(getMassiveData())
