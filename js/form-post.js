import {POINT_DEFAULT, mainMarker, drawMarkers} from './map.js';
import { setGuestNumber } from './form-valid.js';

const ESC_CODE = 27;
const PRICE_PLACEHOLDER = 1000;
const PRICE_MIN_VALUE = 1000;

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
  setGuestNumber();
  priceInput.placeholder = PRICE_PLACEHOLDER;
  priceInput.min = PRICE_MIN_VALUE;
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

const handleEsc = (event) => {
  if(event.keyCode === ESC_CODE) {
    newError.classList.add('visually-hidden');
    newSuccess.classList.add('visually-hidden');

    window.removeEventListener('keydown', handleEsc);
  }
};

const showError = () => {
  newError.classList.remove('visually-hidden');
  window.addEventListener('keydown', handleEsc);

  newError.addEventListener('click', () => {
    newError.classList.add('visually-hidden');
    window.removeEventListener('keydown', handleEsc);
  });

  closeErrorButton.addEventListener('click', () => {
    newError.classList.add('visually-hidden');
    window.removeEventListener('keydown', handleEsc);
  });
};

const showSuccess = () => {
  newSuccess.classList.remove('visually-hidden');
  window.addEventListener('keydown', handleEsc);

  newSuccess.addEventListener('click', () => {
    newSuccess.classList.add('visually-hidden');
    window.removeEventListener('keydown', handleEsc);
  });
};

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
        showSuccess();
        resetForm();
      } else {
        throw new Error(`${response.status} — ${response.statusText}`);
      }
    })
    .catch(() => {
      showError();
    });
});
