import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from '../actionTypes';

const initialState = {
  user: null,
  loading: false,
  error: null,
};

export default function userReducer(state = initialState, action: any) {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { ...state, loading: true, error: null };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        error: null,
      };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}
