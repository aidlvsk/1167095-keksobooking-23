const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilters = document.querySelector('.map__filters');
const mapFiltersElements = mapFilters.querySelectorAll('.map__filter');


const noActiveForm = function(){
  adForm.classList.add('ad-form--disabled');
  adFormElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFiltersElements.forEach((item) => {
    item.setAttribute('disabled', 'disabled');
  });
};

const activeForm = function() {
  adForm.classList.remove('ad-form--disabled');
  adFormElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
  mapFilters.classList.remove('map__filters--disabled');
  mapFiltersElements.forEach((item) => {
    item.removeAttribute('disabled');
  });
};

export {noActiveForm, activeForm};
