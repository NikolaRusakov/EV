import {createAction} from "../actions";

export const INCREMENT_ENTHUSIASM = 'INCREMENT_ENTHUSIASM';
export type INCREMENT_ENTHUSIASM = typeof INCREMENT_ENTHUSIASM;

export const DECREMENT_ENTHUSIASM = 'DECREMENT_ENTHUSIASM';
export type DECREMENT_ENTHUSIASM = typeof DECREMENT_ENTHUSIASM;

export const SET_DATABASE = (name) => {
    return `[${name}_db] set database`;
};

export const Actions = {
    setDb: (db: object, name) => createAction(SET_DATABASE(name), db)
};