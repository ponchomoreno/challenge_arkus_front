import * as types from '../loginView/actionsTypes';

const initialState = {
    token: ''
}

export const loginViewReducers = (state, action) => {
    if (state === undefined) {
        return initialState;
    }

    if (action.type === types.GET_TOKEN) {
        return Object.assign({}, state, {
            token: action.payload
        })
    } else if(action.type === types.CLEAR_TOKEN){
        return Object.assign({}, state, {
            token: ''
        })
    } 
    else {
        return state;
    }
}