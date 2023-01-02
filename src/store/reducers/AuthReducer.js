import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
        LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAILURE } from 'store/actions/AuthActions';

const initialState = {
  loading: false,
  user: null,
  error: '',
  logout: false
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: false,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        user: null,
        error: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        user: null,
        error: '',
        logout: true
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
        logout: true
      };
    default:
      return state;
  }
};

export default auth;