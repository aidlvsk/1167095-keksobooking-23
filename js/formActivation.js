const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelector('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElement = mapFilters.querySelector('.map__filter');


const noActiveForm = function(){
  adForm.classList.add('ad-form--disabled');
  adFormElement.setAttribute('disabled', 'disabled');
  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElement.setAttribute('disabled', 'disabled');
};

noActiveForm();

const activeForm = function() {
  adForm.classList.remove('ad-form--disabled');
  adFormElement.removeAttribute('disabled', 'disabled');
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElement.removeAttribute('disabled', 'disabled');
};

activeForm();

export {noActiveForm, activeForm};

