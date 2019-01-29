/**
 * Copyright 2018 OpenStack Foundation
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

import {graphApiBaseUrl, authErrorHandler } from "./base-actions";
import T from "i18n-react/dist/i18n-react";
import history from '../history'
import {
    getRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
} from 'openstack-uicore-foundation/lib/methods';


export const REQUEST_GRAPHS           = 'REQUEST_GRAPHS';
export const RECEIVE_GRAPHS           = 'RECEIVE_GRAPHS';


export const loadGraphs = () => (dispatch, getState) => {

    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;

    dispatch(startLoading());
    //dispatch(stopLoading());

    let params = {
        access_token : accessToken,
    };

    getRequest(
        createAction(REQUEST_GRAPHS),
        createAction(RECEIVE_GRAPHS),
        `${graphApiBaseUrl}/reports`,
        authErrorHandler
    )(params)(dispatch, getState).then(() => {
            dispatch(stopLoading());
        }
    );
}

