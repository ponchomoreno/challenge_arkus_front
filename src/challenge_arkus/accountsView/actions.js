import * as types from '../accountsView/actionsTypes';
import axios from 'axios';
import * as Notification from '../../notications/toastNotificacion'

export const getAccountsList = () => {
    return async (dispatch) => {
        await axios.get('http://localhost:8000/api/challenge/accounts')
            .then((response) => {
                dispatch({
                    type: types.GET_ACCOUNTS_LIST,
                    payload: response.data
                })
            }).catch((error) => {
                if (error.response && error.response.data) {
                    Notification.errorNotification(error.response.data.messageError)
                }
            })
    }
}

export const saveNewAccount = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:8000/api/challenge/accounts', data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_ACCOUNT,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_ACCOUNT,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    };
};

export const updateAccount = (id, data) => {
    return async (dispatch) => {
        await axios.put(`http://localhost:8000/api/challenge/accounts/${id}`, data)
            .then((response) => {
                dispatch({
                    type: types.STATUS_SAVE_ACCOUNT,
                    statusCode: response.status
                })
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                dispatch({
                    type: types.STATUS_SAVE_ACCOUNT,
                    statusCode: error.response.status
                })
                Notification.errorNotification(error.response.data.messageError)
            })
    }
}

export const deleteAccounts = (accountsIds) => {
    return async () => {
        await axios.delete(`http://localhost:8000/api/challenge/accounts?ids=${accountsIds}`)
            .then((response) => {
                Notification.successNotification(response.data.message)
            }).catch((error) => {
                Notification.errorNotification(error.response.data.messageError)
            })
    }
}

export const clearAccountList = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_ACCOUNTS_LIST
        })
    };
};

export const clearStatusCodeAccount = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_STATUS_SAVE_ACCOUNT
        })
    };
};