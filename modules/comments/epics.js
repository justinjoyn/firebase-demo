import {map, switchMap, tap} from "rxjs/operators";
import {fromPromise} from "rxjs/observable/fromPromise";
import {fromEventPattern} from "rxjs/observable/fromEventPattern";
import {ofType} from "redux-observable";
import firebase from "react-native-firebase";

import {GET_COMMENTS, SAVE_COMMENT} from "./actionTypes";
import {onGetComments, onSaveComment} from "./actions";

export const getComments$ = action$ => {
    return action$.pipe(
        ofType(GET_COMMENTS),
        switchMap(({payload}) => {
            return fromEventPattern(
                handler => firebase.database().ref(`comments/${payload.rank}/`).on('value', handler)
            ).pipe(
                tap(console.log),
                map(snapshot => onGetComments(snapshot[0].val()))
            );
        })
    );
};

export const saveComments$ = action$ => {
    return action$.pipe(
        ofType(SAVE_COMMENT),
        switchMap(({payload}) => {
            return fromPromise(
                firebase.database().ref(`comments/${payload.rank}/`).push({...payload})
            ).pipe(
                tap(console.log),
                map(response => onSaveComment(response))
            );
        })
    );
};
