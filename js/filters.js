const formFilter = document.querySelector('.map__filters');
const houseTypeInput = formFilter.querySelector('#housing-type');
const housePriceInput = formFilter.querySelector('#housing-price');
const houseRoomsInput = formFilter.querySelector('#housing-rooms');
const houseGuestsInput = formFilter.querySelector('#housing-guests');
const houseFeatureField = formFilter.querySelector('#housing-features');
const checkboxWifi = formFilter.querySelector('#filter-wifi');
const checkboxDishwasher = formFilter.querySelector('#filter-dishwasher');
const checkboxParking = formFilter.querySelector('#filter-parking');
const checkboxWasher = formFilter.querySelector('#filter-washer');
const checkboxElevator = formFilter.querySelector('#filter-elevator');
const checkboxConditioner = formFilter.querySelector('#filter-conditioner');

const getPointRank = (point) => {
  let rank = 0;

  if(!point.offer.features) {
    return rank;
  }

  if(point.offer.features.includes(checkboxWifi.value)) {
    rank +=1;
  }
  if(point.offer.features.includes(checkboxDishwasher.value)) {
    rank +=1;
  }
  if(point.offer.features.includes(checkboxParking.value)) {
    rank +=1;
  }
  if(point.offer.features.includes(checkboxWasher.value)) {
    rank +=1;
  }
  if(point.offer.features.includes(checkboxElevator.value)) {
    rank +=1;
  }
  if(point.offer.features.includes(checkboxConditioner.value)) {
    rank +=1;
  }
  return rank;
};

const comparePoints = (pointA, pointB) => {
  const rankA = getPointRank(pointA);
  const rankB = getPointRank(pointB);

  return rankB - rankA;
};

const POINTS_COUNT = 10;
const PRICE_RANGES = {
  'low' : {min: 0, max: 10000},
  'middle' : {min: 10000, max: 50000},
  'high' : {min: 50000, max: Number.MAX_SAFE_INTEGER},
};

const checkPoint = (item) => {
  const isCorrectType = houseTypeInput.value === 'any' || item.offer.type === houseTypeInput.value;
  const isCorrectPrice = housePriceInput.value === 'any' ||
    PRICE_RANGES[housePriceInput.value].min <= item.offer.price && item.offer.price < PRICE_RANGES[housePriceInput.value].max;
  const isCorrectRooms = houseRoomsInput.value === 'any' || item.offer.rooms.toString() === houseRoomsInput.value;
  const isCorrectGuests = houseGuestsInput.value === 'any' || item.offer.guests.toString() === houseGuestsInput.value;
  const hasCorrectFeatures = Array.from(houseFeatureField.querySelectorAll('input:checked'))
    .map((element) => element.value)
    .every((feature) => item.offer.features && item.offer.features.includes(feature));

  return isCorrectType && isCorrectPrice && isCorrectRooms && isCorrectGuests && hasCorrectFeatures;
};

function filterAndSortPoints(points) {
  return points
    .filter(checkPoint)
    .sort(comparePoints)
    .slice(0, POINTS_COUNT);
}

export {filterAndSortPoints};
