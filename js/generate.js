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

function createCard(oneCard) {
  const cardElement = advtTemplate.cloneNode(true);
  const allFeatures = cardElement.querySelector('.popup__features');
  const modifiers = oneCard.offer.features.map((feature) => `popup__feature--${feature}`);
  const actualFeatures = allFeatures.querySelectorAll('.popup__feature').forEach((item)=>{
    const modifier = item.classList[1];
    if(!modifiers.includes(modifier)){
      item.remove();
    }
  });
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

  cardElement.querySelector('.popup__title').textContent = oneCard.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = oneCard.offer.addres;
  cardElement.querySelector('.popup__avatar').src = oneCard.author.avatar;
  cardElement.querySelector('.popup__text--price').textContent = oneCard.offer.price;
  cardElement.querySelector('.popup__type').textContent = typesName[oneCard.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = `${oneCard.offer.rooms} комнаты для ${oneCard.offer.guests} гостей`;
  cardElement.querySelector('.popup__text--time').textContent = `Заезд после ${oneCard.offer.checkin}, выезд до ${oneCard.offer.checkout}`;
  actualFeatures;
  all(oneCard.offer.photos);
  cardElement.querySelector('.popup__description').textContent = oneCard.offer.description;
  return cardElement;
}

const newCard = createCard(similarAdvt);

userAdvt.appendChild(newCard);

