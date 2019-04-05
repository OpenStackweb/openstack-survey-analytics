import {REQUEST_SURVEY_DATA, RECEIVE_SURVEY_DATA, REQUEST_TEMPLATES_META_DATA, RECEIVE_TEMPLATES_META_DATA} from '../actions/survey-actions';
import { LOGOUT_USER  } from "openstack-uicore-foundation/lib/actions";


const DEFAULT_STATE = {
    survey: {},
    templates: []
}

const surveyReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case REQUEST_SURVEY_DATA: {
            return state;
        }
        break;
        case RECEIVE_SURVEY_DATA: {
            let data = action.payload.response;

            return {...state, survey: data};
        }
        break;
        case RECEIVE_TEMPLATES_META_DATA: {
            let data = action.payload.response;

            return {...state, templates: data};
        }
        break;
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        break;
        default:
            return state;
    }
}

export default surveyReducer
