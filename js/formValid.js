const formInputs = document.querySelector('.ad-form');
const titleInput = formInputs.querySelector('#title');
const priceInput = formInputs.querySelector('#price');
const roomNumberInput = formInputs.querySelector('#room_number');
const guestsNumberInput = formInputs.querySelector('#capacity');
const typeInput = formInputs.querySelector('#type');
const timeInInput = formInputs.querySelector('#timein');
const timeOutInput = formInputs.querySelector('#timeout');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;
const MIN_PRICES = {
  bungalow : 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if(valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Введите еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  if(priceInput.value > MAX_PRICE_VALUE){
    priceInput.setCustomValidity('Укажите цену до 1 млн');
  } else if(priceInput.value < priceInput.min){
    priceInput.setCustomValidity('Укажите цену больше минимального значения');
  }
  else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

const getGuestNumber = function(){
  const roomsNumber = roomNumberInput.value;
  Array.from(guestsNumberInput.children).forEach((element) => {
    if (roomsNumber === '100') {
      if (element.value !== '0') {
        element.setAttribute('disabled', 'disabled');
        element.removeAttribute('selected');
      } else {
        element.removeAttribute('disabled');
        guestsNumberInput.value = element.value;
      }
      return;
    }

    if (roomsNumber < element.value || element.value === '0') {
      element.setAttribute('disabled', 'disabled');
      element.removeAttribute('selected');
    } else {
      element.removeAttribute('disabled');
      guestsNumberInput.value = element.value;
    }
  });
};

getGuestNumber();
roomNumberInput.addEventListener('change', getGuestNumber);

typeInput.addEventListener('change', (evt) => {
  priceInput.min = MIN_PRICES[evt.target.value];
  priceInput.placeholder = MIN_PRICES[evt.target.value];
});

timeInInput.addEventListener('change', () => {
  timeOutInput.value = timeInInput.value;
});

timeOutInput.addEventListener('change', () => {
  timeInInput.value = timeOutInput.value;
});
