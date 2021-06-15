import {getRandomInclusive, getRandomInclusiveFloat, getRandomValue, getRandomLength} from '../js/utils.js';
import {types, checkin, checkout, featuresArray, photosArray} from '../js/constants.js';

function getZero() {
  const random = getRandomInclusive(1,10);
  return random<10 ? `0${random}` : random;
}

function createAuthor(){
  return { avatar: `img/avatars/user${getZero()}.png`};
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

export {getZero, createAuthor, createLocation, createOffer};
