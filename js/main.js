import {createAdvt} from './creators.js';
import './generate.js';

function allAdvt(count) {
  return new Array(count).fill(null).map(()=>createAdvt());
}

allAdvt(10);
