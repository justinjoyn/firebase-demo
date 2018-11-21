import Comments from "./components/Comments";
import * as epics from "./epics";
import * as reducers from "./reducers";
import {combineReducers} from "redux";

export const commentsEpics = Object.values(epics);

export const comments = combineReducers({
    ...reducers
});

export {
    Comments
};
