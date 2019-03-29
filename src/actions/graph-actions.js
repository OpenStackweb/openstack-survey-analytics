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
export const REQUEST_RAW_DATA        = 'REQUEST_RAW_DATA';
export const RECEIVE_RAW_DATA        = 'RECEIVE_RAW_DATA';



const getCountData = (name, templateId, questionName, filters, order, accessToken) => (dispatch) => {


    dispatch(startLoading());

    let params = {
        name: name,
        access_token : accessToken,
        question: questionName,
        template: templateId,
        order: order,
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

const getPercentageData = (name, templateId, questionName, filters, order, accessToken) => (dispatch) => {


    dispatch(startLoading());

    let params = {
        name: name,
        access_token : accessToken,
        question: questionName,
        template: templateId,
        order: order,
        ...filters
    };

    getRequest(
        createAction(REQUEST_GRAPH),
        createAction(RECEIVE_GRAPH),
        `${graphApiBaseUrl}/answers/percentage`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}


export const getRawData = (name, templateId, questionName, filters=null, order='count') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;


    dispatch(startLoading());

    let params = {
        name: name,
        access_token : accessToken,
        question: questionName,
        template: templateId,
        order: order,
        ...filters
    };

    getRequest(
        createAction(REQUEST_RAW_DATA),
        createAction(RECEIVE_RAW_DATA),
        `${graphApiBaseUrl}/answers/list`,
        authErrorHandler,
        params
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
            history.push(`raw/${name}`);
        }
    );
}

const getGraphNPS = (name, templateId, questionName, filters, order, accessToken) => (dispatch) => {

    dispatch(startLoading());

    let params = {
        name: name,
        access_token : accessToken,
        question: questionName,
        template: templateId,
        order: order,
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

const getGraphMap = (name, templateId, questionName, filters, order, accessToken) => (dispatch) => {

    dispatch(startLoading());

    let params = {
        name: name,
        access_token : accessToken,
        question: questionName,
        template: templateId,
        order: order,
        ...filters
    };

    getRequest(
        createAction(REQUEST_GRAPH),
        createAction(RECEIVE_GRAPH),
        `${graphApiBaseUrl}/answers/deployment-by-continent`,
        authErrorHandler
    )(params)(dispatch).then(() => {
            dispatch(stopLoading());
        }
    );
}

export const getGraphData = (name, format, templateId, questionName, filters=null, order='count') => (dispatch, getState) => {
    let { loggedUserState } = getState();
    let { accessToken }     = loggedUserState;

    switch(format) {
        case 'count':
            dispatch(getCountData(name, templateId, questionName, filters, order, accessToken));
            break;
        case 'percentage':
            dispatch(getPercentageData(name, templateId, questionName, filters, order, accessToken));
            break;
        case 'nps':
            dispatch(getGraphNPS(name, templateId, questionName, filters, order, accessToken));
            break;
        case 'map':
            dispatch(getGraphMap(name, templateId, questionName, filters, order, accessToken));
            break;
    }
}

