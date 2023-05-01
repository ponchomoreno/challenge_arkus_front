import * as types from '../teamsAccounts/actionsTypes'

const initialState = {
    teamsInformationList: [],
    statusCodeTeamsAccount: 0,
    usersByTeam: []
}

export const teamsAccountsReducers = (state, action) => {
    if (state === undefined) {
        return initialState;
    }

    if (action.type === types.GET_TEAMS_LIST) {
        return Object.assign({}, state, {
            teamsInformationList: action.payload
        })
    } else if (action.type === types.CLEAR_TEAMS_LIST) {
        return Object.assign({}, state, {
            teamsInformationList: []
        })
    } else if (action.type === types.STATUS_SAVE_TEAM) {
        return Object.assign({}, state, {
            statusCodeTeamsAccount: action.statusCode
        })
    } else if (action.type === types.CLEAR_STATUS_SAVE_TEAM) {
        return Object.assign({}, state, {
            statusCodeTeamsAccount: 0
        })
    } else if (action.type === types.GET_USERS_BY_TEAM) {
        return Object.assign({}, state, {
            usersByTeam: action.payload
        })
    } else if (action.type === types.CLEAR_USERS_BY_TEAM) {
        return Object.assign({}, state, {
            usersByTeam: []
        })
    }
    else {
        return state;
    }
};