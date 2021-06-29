const formInputs = document.querySelector('.ad-form');
const titleInput = formInputs.querySelector('#title');
const priceInput = formInputs.querySelector('#price');
const roomNumberInput = formInputs.querySelector('#room_number');
const guestsNumberInput = formInputs.querySelector('#capacity');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE_VALUE = 1000000;

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
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

roomNumberInput.addEventListener('change', () => {
  const roomsNumber = roomNumberInput.value;
  Array.from(guestsNumberInput.children).forEach((element) => {
    if (roomsNumber === '100') {
      if (element.value !== '0') {
        element.setAttribute('disabled', 'disabled');
      } else {
        element.removeAttribute('disabled');
      }

      return;
    }

    if (roomsNumber < element.value || element.value === '0') {
      element.setAttribute('disabled', 'disabled');
    } else {
      element.removeAttribute('disabled');
    }
  });
});
