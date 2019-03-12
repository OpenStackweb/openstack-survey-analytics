import {REQUEST_SURVEY_DATA, RECEIVE_SURVEY_DATA} from '../actions/graph-actions';
import{ LOGOUT_USER } from '../actions/auth-actions';

const DEFAULT_STATE = {
    survey: {}
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
        case LOGOUT_USER: {
            return DEFAULT_STATE;
        }
        break;
        default:
            return state;
    }
}

export default surveyReducer
