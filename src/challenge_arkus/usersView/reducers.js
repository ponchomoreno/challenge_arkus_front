import * as types from '../usersView/actionsTypes';

export const initialState = {
    usersInformationList: [],
    statusCodeSaveUser: 0
}

export const usersViewReducers = (state, action) => {
    if (state === undefined) {
        return initialState;
    }

    if (action.type === types.GET_USERS_LIST) {
        return Object.assign({}, state, {
            usersInformationList: action.payload
        })
    } else if (action.type === types.CLEAR_USERS_LIST) {
        return Object.assign({}, state, {
            usersInformationList: []
        })
    } else if (action.type === types.STATUS_SAVE_USER) {
        return Object.assign({}, state, {
            statusCodeSaveUser: action.statusCode
        })
    } else if (action.type === types.CLEAR_STATUS_SAVE_USER) {
        return Object.assign({}, state, {
            statusCodeSaveUser: 0
        })
    } else {
        return state;
    }
}