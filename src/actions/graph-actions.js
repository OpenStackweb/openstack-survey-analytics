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


export const REQUEST_GRAPH           = 'REQUEST_GRAPH';
export const RECEIVE_GRAPH           = 'RECEIVE_GRAPH';



const getCountData = (templateId, questionName, filters, accessToken) => (dispatch) => {


    dispatch(startLoading());
    dispatch(stopLoading());

    let params = {
        access_token : accessToken,
        question: questionName,
        template: templateId,
        ...filters
    };

    getRequest(
        createAction(REQUEST_GRAPH),
        createAction(RECEIVE_GRAPH),
        `${graphApiBaseUrl}/answers/count`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

const getRawData = (templateId, questionName, filters, accessToken) => (dispatch) => {

    dispatch(startLoading());
    dispatch(stopLoading());

    let params = {
        access_token : accessToken,
        question: questionName,
        template: templateId,
        ...filters
    };

    getRequest(
        createAction(REQUEST_GRAPH),
        createAction(RECEIVE_GRAPH),
        `${graphApiBaseUrl}/answers/list`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

const getGraphNPS = (templateId, filters, accessToken) => (dispatch) => {

    dispatch(startLoading());
    dispatch(stopLoading());

    let params = {
        access_token : accessToken,
        question: 'NetPromoter',
        template: templateId,
        order: 'value_order',
        ...filters
    };

    getRequest(
        createAction(REQUEST_GRAPH),
        createAction(RECEIVE_GRAPH),
        `${graphApiBaseUrl}/answers/nps`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

export const getGraphData = (format, templateId, questionName, filters=null) => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;

    switch(format) {
        case 'count':
            dispatch(getCountData(templateId, questionName, filters, accessToken));
            break;
        case 'raw':
            dispatch(getRawData(templateId, questionName, filters, accessToken));
            break;
        case 'nps':
            dispatch(getGraphNPS(templateId, questionName, filters, accessToken));
            break;
    }
}

