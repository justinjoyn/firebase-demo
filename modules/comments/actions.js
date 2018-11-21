import {actionCreator} from "../../common/utils";
import {GET_COMMENTS, ON_GET_COMMENTS, ON_SAVE_COMMENT, SAVE_COMMENT} from "./actionTypes";

export const getComments = actionCreator(GET_COMMENTS);
export const onGetComments = actionCreator(ON_GET_COMMENTS);

export const saveComment = actionCreator(SAVE_COMMENT);
export const onSaveComment = actionCreator(ON_SAVE_COMMENT);
