import {POINT_DEFAULT, mainMarker, drawMarkers} from './map.js';

const adForm = document.querySelector('.ad-form');
const filter = document.querySelector('.map__filters');
const clearFormButton = adForm.querySelector('.ad-form__reset');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);
const closeErrorButton = newError.querySelector('.error__button');
newError.classList.add('visually-hidden');
document.body.append(newError);

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccess = successTemplate.cloneNode(true);
newSuccess.classList.add('visually-hidden');
document.body.append(newSuccess);

const priceInput = document.querySelector('#price');
const address = document.querySelector('#address');

const resetForm = () => {
  adForm.reset();
  filter.reset();
  priceInput.placeholder = 1000;
  priceInput.min = 1000;
  address.value = `${POINT_DEFAULT.lat}, ${POINT_DEFAULT.lng}`;

  drawMarkers();
  mainMarker
    .setLatLng({
      lat: POINT_DEFAULT.lat,
      lng: POINT_DEFAULT.lng,
    });
};

clearFormButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const formData = new FormData(evt.target);

  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  )
    .then((response) => {
      if(response.ok) {
        newSuccess.classList.remove('visually-hidden');
        resetForm();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .catch(() => {
      newError.classList.remove('visually-hidden');
    });
});

closeErrorButton.addEventListener('click', () => {
  newError.classList.add('visually-hidden');
});

window.addEventListener('keydown', (el) => {
  if(el.keyCode === 27) {
    newError.classList.add('visually-hidden');
    newSuccess.classList.add('visually-hidden');
  }
});

newError.addEventListener('click', () => {
  newError.classList.add('visually-hidden');
});

newSuccess.addEventListener('click', () => {
  newSuccess.classList.add('visually-hidden');
});

