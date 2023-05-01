import * as types from '../teamsAccounts/actionsTypes'
import axios from 'axios';
import * as Notification from '../../notications/toastNotificacion';

export const getTeamsLists = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:8000/api/challenge/teams')
            .then((response) => {
                dispatch({
                    type: types.GET_TEAMS_LIST,
                    payload: response.data
                })
            }).catch(() => {
                dispatch(clearTeamList());
            })
    }
}

export const saveNewTeam = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:8000/api/challenge/teams', data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_TEAM,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_TEAM,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    };
};

export const updateTeam = (id, data) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:8000/api/challenge/teams/${id}`, data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_TEAM,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_TEAM,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    }
}

export const deleteTeams = (teamsIds) => {
    return async () => {
        await axios.delete(`http://localhost:8000/api/challenge/teams?ids=${teamsIds}`)
            .then((response) => {
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                Notification.errorNotification(error.response.data.messageError)
            })
    }
}

export const getUserByTeam = (idTeam) => {
    return async (dispatch) => {
        await axios.get(`http://localhost:8000/api/challenge/teams/members/${idTeam}`)
            .then((response) => {
                dispatch({
                    type: types.GET_USERS_BY_TEAM,
                    payload: response.data
                })
            }).catch((error) => { 
                dispatch({
                    type: types.GET_USERS_BY_TEAM,
                    payload: []
                })
                Notification.warnNotification(error.response.data.messageError)
            })
    }
}

export const clearTeamList = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_TEAMS_LIST
        })
    };
};

export const clearStatusCodeTeam = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_STATUS_SAVE_TEAM
        })
    };
};

export const clearGetUserByTeam = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_USERS_BY_TEAM
        })
    };
};
