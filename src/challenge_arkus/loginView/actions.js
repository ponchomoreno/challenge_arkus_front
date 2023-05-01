import axios from "axios";
import * as types from './actionsTypes';
import * as Notification from '../../notications/toastNotificacion'

export const getTokenChallenge = (data) => {
    return async (dispatch) => {
        await axios.post('http://localhost:8000/api/token/', data)
            .then((response) => {
                dispatch({
                    type: types.GET_TOKEN,
                    payload: response.data.access
                })
                sessionStorage.setItem('token', response.data.access)
                sessionStorage.setItem('refreshToken', response.data.refresh)
            }).catch(() => {
                Notification.errorNotification('User name/password are incorrect')
            })
    }
}

export const clearToken = () => {
    return (dispatch) => {
        dispatch({
            type: types.CLEAR_TOKEN
        })
    }
}