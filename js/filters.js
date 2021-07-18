const formFilter = document.querySelector('.map__filters');

const getPointRank = (point) => {
  const checkboxWifi = formFilter.querySelector('#filter-wifi');
  const checkboxDishwasher = formFilter.querySelector('#filter-dishwasher');
  const checkboxParking = formFilter.querySelector('#filter-parking');
  const checkboxWasher = formFilter.querySelector('#filter-washer');
  const checkboxElevator = formFilter.querySelector('#filter-elevator');
  const checkboxConditioner = formFilter.querySelector('#filter-conditioner');

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

export {comparePoints, getPointRank};
