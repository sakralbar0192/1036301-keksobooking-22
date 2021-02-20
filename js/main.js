import {makeOffers} from './offers.js';

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(makeOffers(1));
