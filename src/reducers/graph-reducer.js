import { RECEIVE_GRAPH } from '../actions/graph-actions';
import{ LOGOUT_USER } from '../actions/auth-actions';

const DEFAULT_STATE = {
    graphData: { items: [], total: 0}
}

const graphReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case RECEIVE_GRAPH: {
            return {...state, graphData: action.payload.response};
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

export default graphReducer
