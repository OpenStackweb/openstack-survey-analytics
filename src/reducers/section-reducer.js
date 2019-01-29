import { RECEIVE_GRAPHS } from '../actions/section-actions';
import{ LOGOUT_USER } from '../actions/auth-actions';

const DEFAULT_STATE = {
    graphs: []
}

const sectionReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case RECEIVE_GRAPHS: {
            return {...state, graphs: action.payload.response.data};
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

export default sectionReducer
