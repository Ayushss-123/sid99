import { fetchPatients } from 'services/ApiService';

export const FETCH_PATIENTS = 'FETCH_PATIENTS';
export const FETCH_PATIENTS_SUCCESS = 'FETCH_PATIENTS_SUCCESS';
export const FETCH_PATIENTS_ERROR = 'FETCH_PATIENTS_ERROR';

export function fetchAppPatients({ page, limit }) {
    return async function (dispatch) {
        try {
            dispatch({ type: FETCH_PATIENTS });
            const pat = await fetchPatients({ page, limit });
            dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: pat.data.data });
        } catch (err) {
            dispatch({ type: FETCH_PATIENTS_ERROR, error: err });
        }
    };
}
