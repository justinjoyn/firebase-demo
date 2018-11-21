import {GET_COMMENTS, ON_GET_COMMENTS, ON_SAVE_COMMENT, SAVE_COMMENT} from "./actionTypes";
import _ from 'lodash';

export const comments = (state = {comments: [], isLoading: false}, {type, payload}) => {
    switch (type) {
        case GET_COMMENTS:
        case SAVE_COMMENT:
            return {
                ...state,
                isLoading: true
            };
        case ON_GET_COMMENTS:
            let comments = payload && Object.keys(payload).length > 0 ? Array.from(Object.keys(payload), k => payload[k]) : [];
            comments = _.sortBy(comments, [function (o) {
                return o.timestamp;
            }]);
            return {
                ...state,
                isLoading: false,
                comments: comments
            };
        case ON_SAVE_COMMENT:
            return {
                ...state,
                isLoading: false
            };
        default:
            return state;
    }
};
