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
  if(min > 0 && max > min && digits >= 0){
    // min = Math.ceil(min);
    // max = Math.floor(max);
    result = +((Math.random() * (max - min + 1) + min).toFixed(digits));
  } else {
    result = -1;
  }
  return result > max ? max : result;
}

getRandomInclusivefloat(2,5, 4);

function getZero() {
let random = getRandomInclusive(1,10);
return random<10 ? '0'+random : random;
}

getZero();

const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];

function createAuthor(){
  return { avatar: 'img/avatars/user'+ getZero() + '.png'};
}

function getRandomValue (array) {
  let index = getRandomInclusive(1, array.length) - 1;
  return array[index];
}

function getRandomLength (types) {
  let length = getRandomInclusive(1, types.length);
  let newList = new Array(length)
                                .fill(null)
                                .map(() => {
                                  return types[getRandomInclusive(1, types.length)-1]
                                });
  return newList;
}

function createLocation(){
  return {
    lat : getRandomInclusivefloat(35.65000, 35.70000, 5),
    lng : getRandomInclusivefloat(139.70000, 139.80000, 5)
  }
}


function createOffer(){
  return {
    title: 'Уютные аппартаменты с котом',
    price: getRandomInclusive(1,Number.MAX_SAFE_INTEGER),
    rooms: getRandomInclusive(1,Number.MAX_SAFE_INTEGER),
    guests: getRandomInclusive(1,Number.MAX_SAFE_INTEGER),
    description: 'Светло и просторно. Что еще надо.',
    type: getRandomValue(types),
    checkin: getRandomValue(checkin),
    checkout: getRandomValue(checkout),
    features: getRandomLength(featuresArray),
    photos: getRandomLength(photosArray),
    adress: ''+createLocation().lat + ', '+ createLocation().lng
    }
}

const createAdvt = () => {
  return {
    author : createAuthor(),
    offer : createOffer(),
    location : createLocation()
  }
}

const allAdvt = new Array(10).fill(null).map(()=>createAdvt());

console.log(allAdvt);
