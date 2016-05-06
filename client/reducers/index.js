import { combineReducers } from 'redux';
import user from './user';
import places from './places';
import game from './game';

const cityScavenge = combineReducers({
  user,
  places,
  game,
});

export default cityScavenge;
