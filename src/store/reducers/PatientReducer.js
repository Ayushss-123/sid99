import { FETCH_PATIENTS, FETCH_PATIENTS_SUCCESS, FETCH_PATIENTS_ERROR } from '../actions/PatientActions';
  
  const initialState = {
    loading: false,
    error: '',
    patients: [],
  };
  
  const patient = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PATIENTS:
        return {
          ...state,
          loading: true,
          error: '',
        };
      case FETCH_PATIENTS_SUCCESS:
        return {
          ...state,
          loading: false,
          patients: action.payload,
          error: '',
        };
      case FETCH_PATIENTS_ERROR:
        return {
          ...state,
          loading: false,
          patients: [],
          error: action.error,
        };
      default:
        return state;
    }
  };
  
  export default patient;