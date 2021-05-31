function getRandomInclusive(min, max) {
  if(min > 0 && max > min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return -1;
  }
}

getRandomInclusive(1,15);

function getRandomInclusivefloat(min, max, digits){
  let result;
  if(min > 0 && max > min){
    min = Math.ceil(min);
    max = Math.floor(max);
    result = +((Math.random() * (max - min + 1) + min).toFixed(digits));
  } else {
    result = -1;
  }
  return result>max ? Math.floor(result) : result;
}

getRandomInclusivefloat(2,5, 4);
