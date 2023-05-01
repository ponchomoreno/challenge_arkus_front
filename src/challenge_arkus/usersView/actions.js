import axios from "axios";
import * as Notification from '../../notications/toastNotificacion'
import * as types from './actionsTypes';

export const getUsersList = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:8000/api/challenge/users')
            .then((response) => {
                dispatch({
                    type: types.GET_USERS_LIST,
                    payload: response.data
                })
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    Notification.errorNotification(error.response.data.messageError)
                }
            })
    };
};

export const saveUser = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:8000/api/challenge/users', data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_USER,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_USER,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    };
};

export const updateUser = (id, data) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:8000/api/challenge/users/${id}`, data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_USER,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_USER,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    }
}

export const deleteUsers = (usersIds) => {
    return async () => {
        await axios.delete(`http://localhost:8000/api/challenge/users?ids=${usersIds}`)
            .then((response) => {
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                if (error && error.response && error.response.data) {
                    Notification.errorNotification(error.response.data.messageError)
                }
            })
    }
}

export const clearUserList = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_USERS_LIST
        })
    };
};

export const clearStatusSaveUser = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_STATUS_SAVE_USER
        })
    };
};