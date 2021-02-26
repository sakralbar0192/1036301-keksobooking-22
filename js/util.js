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

/**
 * Функция, создающая случайное число в указанном интервале с указанной точностью
 *
 * @param {number} min -минимальное значение интервала
 * @param {number} max - максимальное значение интервала
 * @param {number} precision - число знаков после запятой
 *
 * @returns {number} случайное число
 */
const getRandomNumber = function (min = 0, max = 1000, precision = 5) {
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

/**
 * Функция, создающая элемент с заданным классом и текстовым содержимым, при наличии
 *
 * @param {string} tagName - имя тэга
 * @param {string} className - класс элемента
 * @param {string} text - текстовое содержимое
 *
 * @returns Html элемент
 */
const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

/**
 * Функция, возвращающая значение типа жилья на русском языке.
 *
 * @param {string} currentValue - текущее значение жилья(на английском языке)
 *
 * @returns значение типа жилья на русском языке
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
 * Функция показывающая сообщение об ошибке при загрузке предложений
 *
 * @param {string} message - текстовое содержимое сообщения
 * @param {number} alertShowTime  - время показа в милисекундах
 */
const showAlert = (message, alertShowTime) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, alertShowTime);
};

/**
 * Функция, показывающая сообщение при успешной отправке формы
 */
const onSuccessSendFormMessage = () => {
  const message = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === 27){
      message.remove();
    }
  });
  document.addEventListener('click',() => {
    message.remove();
  });
  message.style.zIndex = 400;
  document.querySelector('main').appendChild(message);
};

/**
 * Функция, показывающая сообщение об ошибке при отправке формы
 */
const onErrorSendFormMessage = () => {
  const message = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  document.addEventListener('keydown',(evt) => {
    if (evt.keyCode === 27){
      message.remove();
    }
  });
  document.addEventListener('click',() => {
    message.remove();
  });
  message.style.zIndex = 400;
  document.querySelector('main').appendChild(message);
};

export {
  getRandomNumber,
  makeRusType,
  createElement,
  showAlert,
  onSuccessSendFormMessage,
  onErrorSendFormMessage
};
