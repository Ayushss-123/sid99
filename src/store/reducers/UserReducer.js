import { 
  SAVE_USER, SAVE_USER_SUCCESS, SAVE_USER_ERROR, 
  FETCH_ALL, FETCH_ALL_SUCCESS, FETCH_ALL_ERROR, 
  EDIT_USER, EDIT_USER_SUCCESS, EDIT_USER_ERROR,
  USER_CAMPAIGN, USER_CAMPAIGN_SUCCESS, USER_CAMPAIGN_ERROR
} from '../actions/UserActions';

const initialState = {
  loading: false,
  user: {},
  error: '',
  usersData: [],
  userCampData: {}
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case SAVE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    case SAVE_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.error,
      };
    case EDIT_USER:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        error: '',
      };
    case EDIT_USER_ERROR:
      return {
        ...state,
        loading: false,
        user: null,
        error: action.error,
      };
    case FETCH_ALL:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case FETCH_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        usersData: action.payload,
        error: '',
      };
    case FETCH_ALL_ERROR:
      return {
        ...state,
        loading: false,
        usersData: [],
        error: action.error,
      };
      case USER_CAMPAIGN:
        return {
          ...state,
          loading: true,
          error: '',
      };
      case USER_CAMPAIGN_SUCCESS:
        return {
          ...state,
          loading: false,
          userCampData: action.payload,
      };
      case USER_CAMPAIGN_ERROR:
        return {
          ...state,
          loading: false,
          error: action.error,
      };
    default:
      return state;
  }
};

export default user;