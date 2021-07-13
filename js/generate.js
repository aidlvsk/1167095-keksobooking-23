import {createAdvt} from './creators.js';

const advtTemplate = document.querySelector('#card').content.querySelector('.popup');

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
  const modifiers = card.offer.features ?
    card.offer.features.map((feature) => `popup__feature--${feature}`) :
    [];
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
  if(typeof card.offer.price !== 'number'){
    cardElement.querySelector('.popup__text--price').classList.add('hidden');
  }
  cardElement.querySelector('.popup__type').textContent = typesName[card.offer.type];
  if(typesName[card.offer.type] === ''){
    cardElement.querySelector('.popup__type').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--capacity').textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  if(typeof card.offer.rooms !== 'number' || typeof card.offer.guests !== 'number'){
    cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
  }
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  if( typeof card.offer.checkin !== 'number' || typeof card.offer.checkout !== 'number'){
    cardElement.querySelector('.popup__text--time').classList.add('hidden');
  }
  allFeatures.querySelectorAll('.popup__feature').forEach((item)=>{
    const modifier = item.classList[1];
    if(!modifiers.includes(modifier)){
      item.remove();
    }
  });
  if(!card.offer.features || card.offer.features.length === 0) {
    allFeatures.classList.add('hidden');
  }
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  if(card.offer.description === ''){
    cardElement.querySelector('.popup__description').classList.add('hidden');
  }
  if(!card.offer.photos || card.offer.photos.length === 0){
    photosList.classList.add('hidden');
  }else {
    all(card.offer.photos);
  }
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;
  if(card.author.avatar === '') {
    cardElement.querySelector('.popup__avatar').classList.add('hidden');
  }
  return cardElement;
}

const newCard = createCard(similarAdvt);

export {newCard, createCard};


