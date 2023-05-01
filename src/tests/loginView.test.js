import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import LoginView from '../challenge_arkus/components/loginView';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { loginViewReducers } from '../challenge_arkus/loginView/reducers';
import { combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const renderWithProvider = (ui, { customState } = {}) => {
    const rootReducer = combineReducers({
        loginViewReducers
    })
    rootReducer().loginViewReducers.token = 'token';
    const store = configureStore({ reducer: rootReducer, customState })
    return render(<Provider store={store}>{ui}</Provider>)
}

describe('Tests of component Login', () => {
    test('Mount Login view', () => {
        renderWithProvider(
            <BrowserRouter>
                <LoginView />
            </BrowserRouter>
        )
    })

    test('Testing components of Login view', () => {
        renderWithProvider(
            <BrowserRouter>
                <LoginView />
            </BrowserRouter>
        )
        fireEvent.change(screen.getByTestId('usernameTestLogin'), { target: { name: 'username', value: 'Alfonso' } })
        fireEvent.change(screen.getByTestId('passwordLoginTest'), { target: { name: 'password', value: 'buba2100' } })
        fireEvent.click(screen.getByTestId('iconShowPasswordLogin'))
        fireEvent.click(screen.getByTestId('buttonLogInView'))
    })

})