import {createCard} from './generate.js';
import {noActiveForm, activeForm} from './formActivation.js';
import {getData} from './data.js';
import {comparePoints} from './filters.js';
import {debounce} from './utils/debounce.js';

const POINT_DEFAULT = {
  lat: 35.71462,
  lng: 139.81776,
};

const address = document.querySelector('#address');
const errorMap = document.querySelector('.error__message--map');


noActiveForm();

const map = L.map('map-canvas')
  .on('load', () => {
    activeForm();
  })
  .setView(POINT_DEFAULT, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainMarkerIcon = L.icon({
  iconUrl : './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: 35.71462,
    lng: 139.81776,
  },
  {
    draggable: true,
    icon : mainMarkerIcon,
  },
);

mainMarker.addTo(map);

const mainDot = mainMarker.getLatLng();
address.value = `${mainDot.lat.toFixed(5)} , ${mainDot.lng.toFixed(5)}`;


mainMarker.on('moveend', (evt) => {
  const dot = evt.target.getLatLng();
  address.value = `${dot.lat.toFixed(5)} , ${dot.lng.toFixed(5)}`;
});

const pointsGroup = L.layerGroup().addTo(map);
const pointsIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const createMarker = (point) => {
  const marker = L.marker({
    lat : point.location.lat,
    lng: point.location.lng,
  },
  {
    icon : pointsIcon,
  });
  marker
    .addTo(pointsGroup)
    .bindPopup(
      createCard(point), {keepInView: true},
    );
  return marker;
};

let rawPoints = [];
let markers  = [];


const formFilter = document.querySelector('.map__filters');
const houseTypeInput = formFilter.querySelector('#housing-type');
const housePriceInput = formFilter.querySelector('#housing-price');
const houseRoomsInput = formFilter.querySelector('#housing-rooms');
const houseGuestsInput = formFilter.querySelector('#housing-guests');

const POINTS_COUNT = 10;
const PRICE_RANGES = {
  'low' : {min: 0, max: 10000},
  'middle' : {min: 10000, max: 50000},
  'high' : {min: 50000, max: Number.MAX_SAFE_INTEGER},
};

function filterAndSortPoints() {
  markers.forEach((marker) => marker.remove());
  markers =  rawPoints
    .filter((item) => {
      const isCorrectType = houseTypeInput.value === 'any' || item.offer.type === houseTypeInput.value;
      const isCorrectPrice = housePriceInput.value === 'any' ||
        PRICE_RANGES[housePriceInput.value].min <= item.offer.price && item.offer.price < PRICE_RANGES[housePriceInput.value].max;
      const isCorrectRooms = item.offer.rooms.toString() === houseRoomsInput.value || houseRoomsInput.value === 'any';
      const isCorrectGuests = item.offer.guests.toString() === houseGuestsInput.value || houseGuestsInput.value === 'any';
      return isCorrectType && isCorrectPrice && isCorrectRooms && isCorrectGuests;
    })
    .sort(comparePoints)
    .slice(0, POINTS_COUNT)
    .map((point) => createMarker(point));
}

const FILTER_DELAY = 500;
const debouncedFilterAndSortPoints = debounce(filterAndSortPoints, FILTER_DELAY);

formFilter.addEventListener('change', debouncedFilterAndSortPoints);

getData()
  .then((points) => {
    rawPoints = points;

    debouncedFilterAndSortPoints(123);
  })
  .catch(() => {
    errorMap.classList.remove('visually-hidden');
  });

export {POINT_DEFAULT, mainMarker};

