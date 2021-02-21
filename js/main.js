import {getMassiveData} from './data.js';
import {createOffersElements} from './offers.js';

const mapCanvas = document.querySelector('.map__canvas');
mapCanvas.appendChild(createOffersElements(getMassiveData(1)));
