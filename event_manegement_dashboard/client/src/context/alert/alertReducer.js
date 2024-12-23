import { SET_ALERT , REMOVE_ALERT } from '../types';

export default (state ,action) => {

    switch (action.type) {
        case SET_ALERT:
            return [...state , action.payLoad];
        case REMOVE_ALERT:
            return state.filter(alert => alert.id !== action.payLoad);
        default:
            return state;
    }
}