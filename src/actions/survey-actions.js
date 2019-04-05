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

import T from "i18n-react/dist/i18n-react";
import history from '../history'
import {
    getRequest,
    createAction,
    stopLoading,
    startLoading,
    showMessage,
    showSuccessMessage,
    authErrorHandler
} from 'openstack-uicore-foundation/lib/methods';

export const REQUEST_SURVEY_DATA            = 'REQUEST_SURVEY_DATA';
export const RECEIVE_SURVEY_DATA            = 'RECEIVE_SURVEY_DATA';
export const REQUEST_TEMPLATES_META_DATA    = 'REQUEST_TEMPLATES_META_DATA';
export const RECEIVE_TEMPLATES_META_DATA    = 'RECEIVE_TEMPLATES_META_DATA';


export const getSurveyTemplatesMetaData = () => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;


    dispatch(startLoading());

    let params = {
        access_token : accessToken
    };

    getRequest(
        createAction(REQUEST_TEMPLATES_META_DATA),
        createAction(RECEIVE_TEMPLATES_META_DATA),
        `${window.GRAPH_API_BASE_URL}/survey-templates`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}



export const getSurveyData = (surveyId) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;


    dispatch(startLoading());

    let params = {
        access_token : accessToken
    };

    getRequest(
        createAction(REQUEST_SURVEY_DATA),
        createAction(RECEIVE_SURVEY_DATA),
        `${window.GRAPH_API_BASE_URL}/survey/${surveyId}`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}


