import * as types from '../accountsView/actionsTypes';

const initialState = {
    accountsInformationList: [],
    statusCodeAccount: 0
};

export const accountsViewReducers = (state, action) => {
    if (state === undefined) {
        return initialState;
    }

    if(action.type === types.GET_ACCOUNTS_LIST){
        return Object.assign({}, state, {
            accountsInformationList: action.payload
        })
    } else if(action.type === types.CLEAR_ACCOUNTS_LIST){
        return Object.assign({}, state, {
            accountsInformationList: []
        })
    } else if (action.type === types.STATUS_SAVE_ACCOUNT){
        return Object.assign({}, state, {
            statusCodeAccount: action.statusCode
        })
    } else if (action.type === types.CLEAR_STATUS_SAVE_ACCOUNT){
        return Object.assign({}, state, {
            statusCodeAccount: 0
        })
    } else {
        return state;
    }
};