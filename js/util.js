const ALERT_SHOW_TIME = 2000 //Время показа сообщения об ошибке
/**
 * Функция, создающая случайное число в указанном интервале с указанной точностью
 *
 * @param {number} min -минимальное значение интервала
 * @param {number} max - максимальное значение интервала
 * @param {number} precision - число знаков после запятой
 *
 * @returns {number} возвращает случайное число
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
 * @returns возвращает созданный Html элемент
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
 * Функция показывает сообщение об ошибке
 *
 * * @param {number} alertShowTime  - время показа в милисекундах
 */
const showAlert = (message) => {
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
  }, ALERT_SHOW_TIME);
};



export {getRandomNumber, createElement, showAlert};
