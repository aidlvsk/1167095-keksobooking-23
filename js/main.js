import {createAdvt} from './creators.js';
import './generate.js';
import {noActiveForm} from './formActivation.js';

function allAdvt(count) {
  return new Array(count).fill(null).map(()=>createAdvt());
}

allAdvt(10);
noActiveForm();
