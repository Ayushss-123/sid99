import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
// import auth from './reducers/AuthReducer';
import user from './reducers/UserReducer';
import campaign from './reducers/CampaignReducer';
import auth from './reducers/AuthReducer';
import symptom from './reducers/SymptomReducer';
import patient from './reducers/PatientReducer';
import resultStates from './reducers/ResultStateReducer';

const reducers = combineReducers({
  user,
  campaign,
  auth,
  symptom,
  patient,
  resultStates
});

function configureStoreProd(initialState) {
  const middlewares = [thunk];

  return createStore(
    reducers,
    initialState,
    compose(applyMiddleware(...middlewares)),
  );
}

function configureStoreDev(initialState) {
  const middlewares = [thunk];
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

  return createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlewares)),
  );
}

const configureStore =
  process.env.NODE_ENV === 'production'
    ? configureStoreProd
    : configureStoreDev;

export default configureStore;