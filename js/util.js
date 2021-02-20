//Функция, создающая случайное число в указанном интервале с указанной точностью
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

//Функция, создающая массив со случайным колличеством случайных неповторяющихся элементов другого массива
const getRandomValuesMassive = (massive) => {
  const values = [];
  const quantitiValues = getRandomNumber(1,massive.length,0);
  let isValueExist = true;
  let numberValue = 0;
  for (let i = 1; i <= quantitiValues; i++) {
    numberValue = getRandomNumber(0,5,0);
    isValueExist = values.some((value) => value === massive[numberValue]);
    if (!isValueExist) {
      values.push(massive[numberValue]);
    }
  }
  return values;
}

//Функция, создающая элемент с заданным классом и текстовым содержимым, при наличии
const makeElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (text) {
    element.textContent = text;
  }
  return element;
};

export {getRandomNumber, getRandomValuesMassive, makeElement};
