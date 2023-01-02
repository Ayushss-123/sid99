import { fetchSymptoms, editSymptom, addSymptom } from "services/ApiService";

export const SYMPTOM_MODAL_TOGGLE = 'SYMPTOM_MODAL_TOGGLE';

export const SYMPTOM_REQUEST = 'SYMPTOM_REQUEST';
export const SYMPTOM_SUCCESS = 'SYMPTOM_SUCCESS';
export const SYMPTOM_FAILURE = 'SYMPTOM_FAILURE';

export const EDIT_SYMPTOM = 'EDIT_SYMPTOM';
export const EDIT_SYMPTOM_SUCCESS = 'EDIT_SYMPTOM_SUCCESS';
export const EDIT_SYMPTOM_FAILURE = 'EDIT_SYMPTOM_FAILURE';

export const ADD_SYMPTOM = 'ADD_SYMPTOM';
export const ADD_SYMPTOM_SUCCESS = 'ADD_SYMPTOM_SUCCESS';
export const ADD_SYMPTOM_FAILURE = 'ADD_SYMPTOM_FAILURE';

export function getAllSymptoms() {
    return async function (dispatch) {
        try {
            dispatch({ type: SYMPTOM_REQUEST });
            const symptoms = await fetchSymptoms();
            dispatch({ type: SYMPTOM_SUCCESS, payload: symptoms.data.data.symptom });
        } catch (err) {
            dispatch({ type: SYMPTOM_FAILURE, error: err });
        }
    };
}

export function editAppSymptom(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: EDIT_SYMPTOM });
            const symptoms = await editSymptom(body);
            dispatch({ type: EDIT_SYMPTOM_SUCCESS, payload: symptoms.data.data.symptom });
        } catch (err) {
            dispatch({ type: EDIT_SYMPTOM_FAILURE, error: err });
        }
    };
}

export function addAppSymptom(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: ADD_SYMPTOM });
            const data = await addSymptom(body);
            dispatch({ type: ADD_SYMPTOM_SUCCESS, payload: data });
        } catch (err) {
            dispatch({ type: ADD_SYMPTOM_FAILURE, error: err });
        }
    };
}



