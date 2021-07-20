import {createCard} from './generate.js';
import {getNoActiveForm, getActiveForm, getActiveFiltersForm} from './form-activation.js';
import {getData} from './data.js';
import {debounce} from './utils/debounce.js';
import {filterAndSortPoints} from './filters.js';

const DRAW_DELAY = 500;

const POINT_DEFAULT = {
  lat: 35.71462,
  lng: 139.81776,
};

const formFilter = document.querySelector('.map__filters');
const address = document.querySelector('#address');
const dataError = document.querySelector('.error__message--map');

const map = L.map('map-canvas');
const pointsGroup = L.layerGroup().addTo(map);
const pointsIcon = L.icon ({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

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

const drawMarkers = debounce(() => {
  markers.forEach((marker) => marker.remove());

  markers = filterAndSortPoints(rawPoints)
    .map((point) => createMarker(point));
}, DRAW_DELAY);

getNoActiveForm();

map
  .on('load', () => {
    getActiveForm();

    getData()
      .then((points) => {
        rawPoints = points;

        drawMarkers();
        getActiveFiltersForm();
        formFilter.addEventListener('change', drawMarkers);
      })
      .catch(() => {
        dataError.classList.remove('visually-hidden');
      });
  })
  .setView(POINT_DEFAULT, 10);

export {POINT_DEFAULT, mainMarker, createMarker, drawMarkers};
