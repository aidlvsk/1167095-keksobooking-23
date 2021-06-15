import {createAuthor, createLocation, createOffer} from '../js/creators.js';

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
