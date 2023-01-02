import { saveUser, fetchUsers, editUser } from 'services/ApiService';

export const SAVE_USER = 'SAVE_USER';
export const SAVE_USER_SUCCESS = 'SAVE_USER_SUCCESS';
export const SAVE_USER_ERROR = 'SAVE_USER_ERROR';

export const FETCH_ALL = 'FETCH_ALL';
export const FETCH_ALL_SUCCESS = 'FETCH_ALL_SUCCESS';
export const FETCH_ALL_ERROR = 'FETCH_ALL_ERROR';

export const EDIT_USER = 'EDIT_USER';
export const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
export const EDIT_USER_ERROR = 'EDIT_USER_ERROR';

export const USER_CAMPAIGN = 'USER_CAMPAIGN';
export const USER_CAMPAIGN_SUCCESS = 'USER_CAMPAIGN_SUCCESS';
export const USER_CAMPAIGN_ERROR = 'USER_CAMPAIGN_ERROR';

export function saveNewUser(user) {
    return async function (dispatch) {
        try {
            dispatch({ type: SAVE_USER });
            const usr = await saveUser(user);
            dispatch({ type: SAVE_USER_SUCCESS, payload: usr.data });
        } catch (err) {
            dispatch({ type: SAVE_USER_ERROR, error: err });
        }
    };
}

export function fetchAllUsers({ page, limit }) {
    return async function (dispatch) {
        try {
            dispatch({ type: FETCH_ALL });
            const usr = await fetchUsers({ page, limit });
            dispatch({ type: FETCH_ALL_SUCCESS, payload: usr.data.data });
        } catch (err) {
            dispatch({ type: FETCH_ALL_ERROR, error: err });
        }
    };
}

export function editSystemUser(user) {
    return async function (dispatch) {
        try {
            dispatch({ type: EDIT_USER });
            const usr = await editUser(user);
            dispatch({ type: EDIT_USER_SUCCESS, payload: usr.data });
        } catch (err) {
            dispatch({ type: EDIT_USER_ERROR, error: err });
        }
    };
}
