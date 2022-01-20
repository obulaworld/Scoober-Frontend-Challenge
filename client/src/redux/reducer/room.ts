import { ROOMS_REQUEST, ROOMS_SUCCESS, ROOMS_FAILURE } from '../actionTypes';

const initialState = {
  rooms: [],
  activeRoom: null,
  loading: false,
  error: null,
};

export default function roomsReducer(state = initialState, action: any) {
  switch (action.type) {
    case ROOMS_REQUEST:
      return { ...state, loading: true, error: null };
    case ROOMS_SUCCESS:
      return {
        ...state,
        rooms: action.payload,
        loading: false,
        error: null,
      };
    case ROOMS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
