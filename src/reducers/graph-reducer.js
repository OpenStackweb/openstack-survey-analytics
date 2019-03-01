import {REQUEST_GRAPH, RECEIVE_GRAPH} from '../actions/graph-actions';
import{ LOGOUT_USER } from '../actions/auth-actions';

const DEFAULT_STATE = {
    graphData: {}
}

const graphReducer = (state = DEFAULT_STATE, action) => {
    const { type, payload } = action
    switch (type) {
        case REQUEST_GRAPH: {
            return state;
        }
        break;
        case RECEIVE_GRAPH: {
            let graphData = {...state.graphData};
            graphData[action.payload.response.name] = action.payload.response;

            return {...state, graphData: {...graphData}};
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
