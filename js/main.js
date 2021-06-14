const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const checkin = ['12:00', '13:00', '14:00'];
const checkout = ['12:00', '13:00', '14:00'];
const featuresArray = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const photosArray = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];


function getRandomInclusive(min, max) {
  if(min >= 0 && max > min){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    return -1;
  }
}

getRandomInclusive(1,15);

function getRandomInclusiveFloat(min, max, digits){
  let result;
  if(min > 0 && max > min && digits >= 0){
    result = +((Math.random() * (max - min) + min).toFixed(digits));
  } else {
    result = -1;
  }
  return result > max ? max : result;
}

getRandomInclusiveFloat(2,5, 4);

function getZero() {
  const random = getRandomInclusive(1,10);
  return random<10 ? `0${random}` : random;
}

getZero();

function createAuthor(){
  return { avatar: `img/avatars/user${getZero()}.png`};
}

function getRandomValue (array) {
  const index = getRandomInclusive(0, array.length - 1);
  return array[index];
}

function getRandomLength (array) {
  const length = getRandomInclusive(1, array.length);
  return new Array(length)
    .fill(null)
    .map(() => array[getRandomInclusive(0, array.length - 1)]);
}

function createLocation(){
  return {
    lat : getRandomInclusiveFloat(35.65000, 35.70000, 5),
    lng : getRandomInclusiveFloat(139.70000, 139.80000, 5),
  };
}

function createOffer(location){
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
    address: `${location.lat},${location.lng}`,
  };
}

const createAdvt = () => {
  const location = createLocation();

  return {
    author : createAuthor(),
    offer : createOffer(location),
    location: location,
  };
};

function allAdvt(count) {
  return new Array(count).fill(null).map(()=>createAdvt());
}

allAdvt(10);
