import { userLogin, userLogout } from "services/ApiService";

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export function login(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: LOGIN_REQUEST });
            const camp = await userLogin(body);
            if (camp.data.data.isloggedIn) {
                localStorage.setItem("user_token", camp.data.data.token);
                dispatch({ type: LOGIN_SUCCESS, payload: camp.data });
            } else {
                dispatch({ type: LOGIN_FAILURE });
            }
        } catch (err) {
            dispatch({ type: LOGIN_FAILURE, error: err });
        }
    };
}

export function logout() {
    return async function (dispatch) {
        try {
            dispatch({ type: LOGOUT_REQUEST });
            const camp = await userLogout();
            dispatch({ type: LOGOUT_SUCCESS });
            localStorage.removeItem("user_token");
        } catch (err) {
            dispatch({ type: LOGOUT_FAILURE, error: err });
        }
    };
}

