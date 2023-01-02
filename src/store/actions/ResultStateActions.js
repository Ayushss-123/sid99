import { fetchResultStates, addResultState, editResultState } from 'services/ApiService';

export const RESULT_STATE = 'RESULT_STATE';
export const RESULT_STATE_SUCCESS = 'RESULT_STATE_SUCCESS';
export const RESULT_STATE_ERROR = 'RESULT_STATE_ERROR';

export const ADD_RESULT_STATE = 'ADD_RESULT_STATE';
export const ADD_RESULT_STATE_SUCCESS = 'ADD_RESULT_STATE_SUCCESS';
export const ADD_RESULT_STATE_ERROR = 'ADD_RESULT_STATE_ERROR';

export const EDIT_RESULT_STATE = 'EDIT_RESULT_STATE';
export const EDIT_RESULT_STATE_SUCCESS = 'EDIT_RESULT_STATE_SUCCESS';
export const EDIT_RESULT_STATE_ERROR = 'EDIT_RESULT_STATE_ERROR';

export function fetchAppResultStates() {
    return async function (dispatch) {
        try {
            dispatch({ type: RESULT_STATE });
            const states = await fetchResultStates();
            dispatch({ type: RESULT_STATE_SUCCESS, payload: states.data.data.testStates });
        } catch (err) {
            dispatch({ type: RESULT_STATE_ERROR, error: err });
        }
    };
}

export function addAppResultStates(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: RESULT_STATE });
            const state = await addResultState(body);
            dispatch({ type: ADD_RESULT_STATE_SUCCESS, payload: state.data.data });
        } catch (err) {
            dispatch({ type: ADD_RESULT_STATE_ERROR, error: err });
        }
    };
}

export function editAppResultStates(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: EDIT_RESULT_STATE });
            const state = await editResultState(body);
            dispatch({ type: EDIT_RESULT_STATE_SUCCESS, payload: state.data.data });
        } catch (err) {
            dispatch({ type: EDIT_RESULT_STATE_ERROR, error: err });
        }
    };
}
