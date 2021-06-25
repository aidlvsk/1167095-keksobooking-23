import {createAdvt} from './creators.js';

const advtTemplate = document.querySelector('#card').content.querySelector('.popup');
const userAdvt = document.querySelector('#map-canvas');

const typesName = {
  palace : 'Дворец',
  flat : 'Квартира',
  house : 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarAdvt = createAdvt();

function createCard(card) {
  const cardElement = advtTemplate.cloneNode(true);
  const allFeatures = cardElement.querySelector('.popup__features');
  const modifiers = card.offer.features.map((feature) => `popup__feature--${feature}`);
  const photosList = cardElement.querySelector('.popup__photos');
  const photoTemplate = photosList.querySelector('.popup__photo');
  const all = function(elements) {
    for(let element = 0; element < elements.length ; element++){
      const newPhoto = photoTemplate.cloneNode(true);
      newPhoto.src = elements[element];
      photosList.appendChild(newPhoto);
    }
    photoTemplate.remove();
    return photosList;
  };

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  if (card.offer.title === ''){
    cardElement.querySelector('.popup__title').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  if(card.offer.address === ''){
    cardElement.querySelector('.popup__text--address').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--price').textContent =  `${card.offer.price} ₽/ночь`;
  if(!card.offer.price === Number){
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  cardElement.querySelector('.popup__type').textContent = typesName[card.offer.type];
  if(typesName[card.offer.type] === ''){
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  if(!card.offer.rooms === Number || !card.offer.guests === Number){
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  if(!card.offer.checkin === Number || !card.offer.checkout === Number){
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  allFeatures.querySelectorAll('.popup__feature').forEach((item)=>{
    const modifier = item.classList[1];
    if(!modifiers.includes(modifier)){
      item.remove();
    }
  });
  if(card.offer.features.length === 0) {
    allFeatures.classList.add('hidden');
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  if(card.offer.description === ''){
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }
  all(card.offer.photos);
  if(card.offer.photos.length === 0){
    photosList.classList.add('hidden');
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  if(card.author.avatar === '') {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  return cardElement;
}

const newCard = createCard(similarAdvt);

userAdvt.appendChild(newCard);

