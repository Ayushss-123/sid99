import { 
    RESULT_STATE, RESULT_STATE_SUCCESS, RESULT_STATE_ERROR,
    ADD_RESULT_STATE, ADD_RESULT_STATE_SUCCESS, ADD_RESULT_STATE_ERROR,
    EDIT_RESULT_STATE, EDIT_RESULT_STATE_SUCCESS, EDIT_RESULT_STATE_ERROR
} from '../actions/ResultStateActions';
  
  const initialState = {
    loading: false,
    message: {},
    error: false,
    states: [],
  };
  
  const resultStates = (state = initialState, action) => {
    switch (action.type) {
      case RESULT_STATE:
        return {
          ...state,
          loading: true,
          error: false,
          states: []
        };
      case RESULT_STATE_SUCCESS:
        return {
          ...state,
          loading: false,
          states: action.payload,
          error: false,
        };
      case RESULT_STATE_ERROR:
        return {
          ...state,
          loading: false,
          states: [],
          error: true,
        };
      case ADD_RESULT_STATE:
          return {
            ...state,
            loading: true,
            error: false
          } 
      case ADD_RESULT_STATE_SUCCESS:
          return {
            ...state,
            loading: true,
            message: action.payload,
            error: false
          }
      case ADD_RESULT_STATE_ERROR:
          return {
            ...state,
            loading: false,
            error: false
          }
      case EDIT_RESULT_STATE:
          return {
            ...state,
            loading: true,
            error: false
          }
      case EDIT_RESULT_STATE_SUCCESS:
          return {
            ...state,
            loading: true,
            message: action.payload,
            error: false
          }
      case EDIT_RESULT_STATE_ERROR:
          return {
            ...state,
            loading: false,
            error: false
          }
      default:
        return state;
    }
  };
  
  export default resultStates;