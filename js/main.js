function getRandomInclusive(min, max) {
  let result;
  if(min>0&&max>min){
    min = Math.ceil(min);
    max = Math.floor(max);
    result = Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    result = -1;
  }
  return result;
};


getRandomIntInclusive(1,15);

function getRandomInclusivefloat(min, max, digits){
  let result;
  if(min>0&&max>min){
    min = Math.ceil(min);
    max = Math.floor(max);
    result = +((Math.floor(Math.random() * (max - min + 1)) + min).toFixed(digits));
  } else {
    result = -1;
  }
  return result>max ? Math.floor(result) : result;
}

getRandomInclusivefloat(2,5);
