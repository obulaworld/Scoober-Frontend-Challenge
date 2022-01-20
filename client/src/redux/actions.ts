import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  ROOMS_REQUEST,
  ROOMS_SUCCESS,
  ROOMS_FAILURE,
  ACTIVE_ROOM_REQUEST,
  ACTIVE_ROOM_FAILURE,
  ACTIVE_ROOM_SUCCESS,
  TOGGLE_ROOM_STATE,
  ACTIVATE_TURN,
  ADD_NEW_OUTPUT,
  GAME_OVER
} from './actionTypes';

export const loginUser = () => {
  return {
    type: LOGIN_USER_REQUEST,
  };
};

export const loginUserSuccess = (user: any) => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: user,
  };
};

export const getRoomsRequest = () => {
  return {
    type: ROOMS_REQUEST,
  };
};

export const getRoomsSuccess = (rooms: any) => {
  return {
    type: ROOMS_SUCCESS,
    payload: rooms,
  };
};

export const getRoomsFailure = (error: any) => {
  return {
    type: ROOMS_FAILURE,
    payload: error,
  };
};

export const activeRoomRequest = () => {
  return {
    type: ACTIVE_ROOM_REQUEST,
  };
};

export const activeRoomSuccess = (room: any) => {
  return {
    type: ACTIVE_ROOM_SUCCESS,
    payload: room,
  };
};

export const activeRoomFailure = (error: any) => {
  return {
    type: ACTIVE_ROOM_FAILURE,
    payload: error,
  };
};

export const toggleRoomState = (state: boolean) => {
  return {
    type: TOGGLE_ROOM_STATE,
    payload: state,
  };
};

export const toggleGameOver = (gameObject: any) => {
  return {
    type: GAME_OVER,
    payload: gameObject,
  };
};

export const activateTurn = (turnObject: any) => {
  return {
    type: ACTIVATE_TURN,
    payload: turnObject,
  };
};

export const addNewOutput = (outputObject: any) => {
  return {
    type: ADD_NEW_OUTPUT,
    payload: outputObject,
  };
};
