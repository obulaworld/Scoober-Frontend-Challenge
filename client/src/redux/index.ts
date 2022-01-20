import { combineReducers } from 'redux';
import userReducer from './reducer/user';
import roomsReducer from './reducer/room';
import activeRoomReducer from './reducer/activeRoom';

const rootReducers = combineReducers({
  user: userReducer,
  rooms: roomsReducer,
  activeRoom: activeRoomReducer,
});

export default rootReducers;
