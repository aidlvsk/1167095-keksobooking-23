import {createAdvt} from './creators.js';
import './generate.js';
import {activeForm, noActiveForm} from './formActivation.js';
import './formValid.js';

function allAdvt(count) {
  return new Array(count).fill(null).map(()=>createAdvt());
}

allAdvt(10);
noActiveForm();
activeForm();
