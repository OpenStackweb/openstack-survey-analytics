import {REQUEST_RAW_DATA, RECEIVE_RAW_DATA} from '../actions/graph-actions';
import { LOGOUT_USER  } from "openstack-uicore-foundation/lib/actions";

const DEFAULT_STATE = {
    name: null,
    questionName: null,
    format: null,
    templateId: null,
    filters: {},
    data: []
}

const rawDataReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case REQUEST_RAW_DATA: {
            let {name, questionName, format, templateId, filters} = action.payload
            return {name, questionName, format, templateId, filters, data: []};
        }
        break;
        case RECEIVE_RAW_DATA: {
            let {items} = action.payload.response;

            return {...state, data: [...items]};
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

export default rawDataReducer
