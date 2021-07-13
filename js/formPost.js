const adForm = document.querySelector('.ad-form');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const newError = errorTemplate.cloneNode(true);
const closeErrorButton = newError.querySelector('.error__button');
newError.classList.add('visually-hidden');
document.body.append(newError);

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const newSuccess = successTemplate.cloneNode(true);
newSuccess.classList.add('visually-hidden');
document.body.append(newSuccess);

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
    .then(() => {
      newSuccess.classList.remove('visually-hidden');
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
