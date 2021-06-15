function getRandomInclusive(min, max) {
  if(min >= 0 && max > min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return -1;
  }
}

function getRandomInclusiveFloat(min, max, digits){
  let result;
  if(min > 0 && max > min && digits >= 0){
    result = +((Math.random() * (max - min) + min).toFixed(digits));
  } else {
    result = -1;
  }
  return result > max ? max : result;
}

function getRandomValue(array) {
  const index = getRandomInclusive(0, array.length - 1);
  return array[index];
}

function getRandomLength(array) {
  const length = getRandomInclusive(1, array.length);
  return new Array(length)
    .fill(null)
    .map(() => array[getRandomInclusive(0, array.length - 1)]);
}

export {getRandomInclusive, getRandomInclusiveFloat, getRandomValue, getRandomLength};
