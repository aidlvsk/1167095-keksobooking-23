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
let minPrice = 0;

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
  } else if(priceInput.value < minPrice){
    priceInput.setCustomValidity('Укажите цену больше минимального значения');
  }
  else {
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

typeInput.addEventListener('change', (evt) => {
  if(evt.target.value === 'bungalow') {
    minPrice = 0;
    priceInput.placeholder = '0';
  } else if(evt.target.value === 'flat') {
    minPrice = 1000;
    priceInput.placeholder = '1000';
  } else if(evt.target.value === 'hotel') {
    minPrice = 3000;
    priceInput.placeholder = '3000';
  } else if(evt.target.value === 'house') {
    minPrice = 5000;
    priceInput.placeholder = '5000';
  } else if(evt.target.value === 'palace') {
    minPrice = 10000;
    priceInput.placeholder = '10000';
  } else {
    minPrice = 0;
    priceInput.placeholder = '';
  }
});

// timeInInput.addEventListener('change', () => {
//   const time = timeInInput.value;
//   Array.from(timeOutInput.children).forEach((element) => {
//     if(time === element.value) {
//       element.setAttribute('selected', 'selected');
//     } else {
//       element.setAttribute('disabled', 'disabled');
//     }
//   });
// });

timeInInput.addEventListener('change', () => {
  const time = timeInInput.value;
  Array.from(timeOutInput.children).forEach((element) => {
    if(time === element.value) {
      timeOutInput.value = element.value;
    }
  });
});
