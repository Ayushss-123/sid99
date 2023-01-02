import {
    SYMPTOM_REQUEST, SYMPTOM_SUCCESS, SYMPTOM_FAILURE,
    EDIT_SYMPTOM, EDIT_SYMPTOM_SUCCESS, EDIT_SYMPTOM_FAILURE,
    ADD_SYMPTOM, ADD_SYMPTOM_SUCCESS, ADD_SYMPTOM_FAILURE
} from 'store/actions/SymptomActions';

const initialState = {
    symptoms: [],
    loading: false,
    error: false,
    message: {}
};

const symptom = (state = initialState, action) => {
    switch (action.type) {
        case SYMPTOM_REQUEST:
            return {
                ...state,
                loading: true,
                symptoms: [],
                error: false,
            };
        case SYMPTOM_SUCCESS:
            return {
                ...state,
                loading: false,
                symptoms: action.payload,
                error: false,
            };
        case SYMPTOM_FAILURE:
            return {
                ...state,
                loading: false,
                symptoms: [],
                error: true,
            };
        case EDIT_SYMPTOM:
            return {
                ...state,
                loading: true,
                message: {},
                error: false
            };
        case EDIT_SYMPTOM_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload.data,
                error: false
            };
        case EDIT_SYMPTOM_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.error,
                error: true
            };
        case ADD_SYMPTOM:
            return {
                ...state,
                loading: true,
                message: {},
                error: false
            };
        case ADD_SYMPTOM_SUCCESS:
            return {
                ...state,
                loading: true,
                message: action.payload.data,
                error: false
            };
        case ADD_SYMPTOM_FAILURE:
            return {
                ...state,
                loading: false,
                message: action.error,
                error: true
            };
        default:
            return state;
    }
};

export default symptom;