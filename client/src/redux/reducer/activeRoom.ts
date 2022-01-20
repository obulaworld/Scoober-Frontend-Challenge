import { Message, ActiveRoom } from '../../utils/types';
import {
  ACTIVE_ROOM_REQUEST,
  ACTIVE_ROOM_SUCCESS,
  ACTIVE_ROOM_FAILURE,
  TOGGLE_ROOM_STATE,
  ACTIVATE_TURN,
  ADD_NEW_OUTPUT,
  GAME_OVER,
} from '../actionTypes';

const initialState = {
  room: null,
  messages: [],
  winner: null,
  isOver: false,
  turn: null,
  currentNumber: null,
  previousNumber: null,
  ready: false,
  loading: false,
  error: null,
};

type Action = {
  type: string;
  payload?: any;
  error?: any;
};

const processMessage = (message: Message, state: ActiveRoom) => {
  const { number }: any = message;

  if (!state.previousNumber) {
    message.previousNumber = number;
    return {
      messages: [...state.messages, message],
      previousNumber: number,
    };
  } else {
    message.previousNumber = state.messages[state.messages.length - 1].number;
    return {
      messages: [...state.messages, message],
      previousNumber: message.isCorrectResult
        ? number
        : state.messages[state.messages.length - 1].number,
    };
  }
};

export default function activeRoomReducer(
  state = initialState,
  action: Action,
) {
  switch (action.type) {
    case ACTIVE_ROOM_REQUEST:
      return { ...state, loading: true, error: null };
    case TOGGLE_ROOM_STATE:
      return { ...state, ready: action.payload };
    case GAME_OVER:
      return {
        ...state,
        isOver: action.payload.isOver,
        winner: action.payload.user,
        currentNumber: null,
        previousNumber: null,
        turn: null,
        ready: false,
      };
    case ACTIVATE_TURN:
      return { ...state, turn: action.payload };
    case ACTIVE_ROOM_SUCCESS:
      return {
        ...state,
        room: action.payload.room,
        currentNumber: null,
        previousNumber: null,
        turn: null,
        messages: [],
        loading: false,
        isOver: false,
        error: null,
      };
    case ADD_NEW_OUTPUT:
      const messageObject = processMessage(action.payload.message, state);
      return {
        ...state,
        ...messageObject,
        currentNumber: action.payload.currentNumber,
        loading: false,
        isOver: false,
        error: null,
      };
    case ACTIVE_ROOM_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
