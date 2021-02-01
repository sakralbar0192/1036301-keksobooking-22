let RANDOM_NUMBER = function getRandomNumber(min = 0, max = 1000, precision = 5) {
  if (min < 0 || max < 0 || precision < 0) {
    min = Math.sqrt(Math.pow(min));
    max = Math.sqrt(Math.pow(max));
    precision = Math.sqrt(Math.pow(precision))
  }

  if (min > max) {
    return (((Math.random()* (min-max))+ max).toFixed(precision))
  }else {
    return (((Math.random()* (max-min))+ min).toFixed(precision))
  }
}

//Линтер ругается на консоль и на функцию/переменную, которые обьявлены, но не используются - поэтому использую алерт

alert(RANDOM_NUMBER())
