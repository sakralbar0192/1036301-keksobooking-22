const RANDOM_NUMBER = function (min = 0, max = 1000, precision = 5) {
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

alert(RANDOM_NUMBER())
