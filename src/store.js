/**
 * Copyright 2019 OpenStack Foundation
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 **/

import { createStore, applyMiddleware, compose} from 'redux';
import loggedUserReducer from './reducers/auth-reducer'
import baseReducer from './reducers/base-reducer'
import graphReducer from './reducers/graph-reducer'
import rawDataReducer from './reducers/raw-data-reducer'
import surveyReducer from './reducers/survey-reducer'

import thunk from 'redux-thunk';
import { persistStore, persistCombineReducers } from 'redux-persist'
import storage from 'redux-persist/es/storage' // default: localStorage if web, AsyncStorage if react-native

const config = {
  key: 'root_openstack survey analytics',
  storage,
}

const reducers = persistCombineReducers(config, {
  loggedUserState: loggedUserReducer,
  baseState: baseReducer,
  graphState: graphReducer,
  rawDataState: rawDataReducer,
  surveyState: surveyReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

window.apiBaseUrl = process.env['API_BASE_URL'];
window.clientId = process.env['OAUTH2_CLIENT_ID'];
window.idpBaseUrl= process.env['IDP_BASE_URL'];

const onRehydrateComplete = () => {
    // repopulate access token on global access variable
    window.accessToken = store.getState().loggedUserState.accessToken;
    window.idToken = store.getState().loggedUserState.idToken;
    window.sessionState = store.getState().loggedUserState.sessionState;
}

export const persistor = persistStore(store, null, onRehydrateComplete);
export default store;

