import * as constants from '../constants/index';

export interface IncrementEnthusiasm {
    type: constants.INCREMENT_ENTHUSIASM;
}

export interface DecrementEnthusiasm {
    type: constants.DECREMENT_ENTHUSIASM;
}

export type EnthusiasmAction = IncrementEnthusiasm | DecrementEnthusiasm;

export function incrementEnthusiasm(): IncrementEnthusiasm {
    return {
        type: constants.INCREMENT_ENTHUSIASM
    };
}

export function decrementEnthusiasm(): DecrementEnthusiasm {
    return {
        type: constants.DECREMENT_ENTHUSIASM
    };
}

export interface Action<T extends string> {
    type: T
}

export interface ActionWithPayload<T extends string, P> extends Action <T> {
    payload: P
}

// export function createAction<T extends string>(type: T): Action<T>
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>
export function createAction<T extends string, P>(type: T, payload: P) {
    return payload === undefined ? {type} : {type, payload}
}

type ActionFn<T extends string>=()=> Action<T>
type ActionWithPayloadFn<T extends string, P> = (payload: P)=>ActionWithPayload<T,P>

export function action<T extends string>(type: T): ActionFn<T>
export function action<T extends string,P>(type: T): ActionWithPayloadFn<T,P>
export function action(type: string){
    return (payload?: any) => (payload?{type,payload}:{type})
}


