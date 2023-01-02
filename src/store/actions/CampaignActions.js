import { addCampaign, fetchCampaings, addUserCampaign } from 'services/ApiService';
export const ADD_NEW_CAMPAIGN = 'ADD_NEW_CAMPAIGN';
export const ADD_NEW_CAMPAIGN_SUCCESS = 'ADD_NEW_CAMPAIGN_SUCCESS';
export const ADD_NEW_CAMPAIGN_ERROR = 'ADD_NEW_CAMPAIGN_ERROR';

export const FETCH_CAMPAIGN = 'FETCH_CAMPAIGN';
export const FETCH_CAMPAIGN_SUCCESS = 'FETCH_CAMPAIGN_SUCCESS';
export const FETCH_CAMPAIGN_ERROR = 'FETCH_CAMPAIGN_ERROR';

export const ADD_USER_CAMPAIGN = 'ADD_USER_CAMPAIGN';
export const ADD_USER_CAMPAIGN_SUCCESS = 'ADD_USER_CAMPAIGN_SUCCESS';
export const ADD_USER_CAMPAIGN_ERROR = 'ADD_USER_CAMPAIGN_ERROR';

export function addNewCampaign(campaign) {
    return async function (dispatch) {
        try {
            dispatch({ type: ADD_NEW_CAMPAIGN });
            const camp = await addCampaign(campaign);
            dispatch({ type: ADD_NEW_CAMPAIGN_SUCCESS, payload: camp.data });
        } catch (err) {
            dispatch({ type: ADD_NEW_CAMPAIGN_ERROR, error: err });
        }
    };
}

export function fetchCampaigns() {
    return async function (dispatch) {
        try {
            dispatch({ type: FETCH_CAMPAIGN });
            const camp = await fetchCampaings();
            dispatch({ type: FETCH_CAMPAIGN_SUCCESS, payload: camp.data.data });
        } catch (err) {
            dispatch({ type: FETCH_CAMPAIGN_ERROR, error: err });
        }
    };
}

export function addUserToCampaign(body) {
    return async function (dispatch) {
        try {
            dispatch({ type: ADD_USER_CAMPAIGN });
            const camp = await addUserCampaign(body);
            dispatch({ type: ADD_USER_CAMPAIGN_SUCCESS, payload: camp.data });
        } catch (err) {
            dispatch({ type: ADD_USER_CAMPAIGN_ERROR, error: err });
        }
    };
}