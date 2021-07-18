import {createCard} from './generate.js';
import {noActiveForm, activeForm} from './formActivation.js';
import {getData} from './data.js';
import {debounce} from './utils/debounce.js';
import {filterAndSortPoints} from './filters.js';

const POINT_DEFAULT = {
  lat: 35.71462,
  lng: 139.81776,
};

const formFilter = document.querySelector('.map__filters');
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

let markers  = [];
let rawPoints = [];

const FILTER_DELAY = 500;
const drawMarkers = debounce(() => {
  markers.forEach((marker) => marker.remove());

  markers = filterAndSortPoints(rawPoints)
    .map((point) => createMarker(point));
}, FILTER_DELAY);

formFilter.addEventListener('change', drawMarkers);

getData()
  .then((points) => {
    rawPoints = points;

    drawMarkers();
  })
  .catch(() => {
    errorMap.classList.remove('visually-hidden');
  });

export {POINT_DEFAULT, mainMarker, createMarker};
