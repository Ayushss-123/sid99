import {
  ADD_NEW_CAMPAIGN, ADD_NEW_CAMPAIGN_SUCCESS, ADD_NEW_CAMPAIGN_ERROR,
  FETCH_CAMPAIGN, FETCH_CAMPAIGN_SUCCESS, FETCH_CAMPAIGN_ERROR,
  ADD_USER_CAMPAIGN, ADD_USER_CAMPAIGN_SUCCESS, ADD_USER_CAMPAIGN_ERROR
} from '../actions/CampaignActions';

const initialState = {
  loading: false,
  data: {},
  campaigns: [],
  error: '',
};

const campaign = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_CAMPAIGN:
      return {
        ...state,
        loading: true,
        error: '',
      };
    case ADD_NEW_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: '',
      };
    case ADD_NEW_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case FETCH_CAMPAIGN:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case FETCH_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        campaigns: action.payload,
        error: ''
      };
    case FETCH_CAMPAIGN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case ADD_USER_CAMPAIGN:
      return {
        ...state,
        loading: true,
        error: ''
      };
    case ADD_USER_CAMPAIGN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload
      };
    case ADD_USER_CAMPAIGN_ERROR:
      return {
        ...state,
        loading:false,
        error: action.error
      };
    default:
      return state;
  }
};

export default campaign;