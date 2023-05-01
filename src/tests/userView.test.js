import React, {useState} from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import UsersView from '../challenge_arkus/components/usersView';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { usersViewReducers } from '../challenge_arkus/usersView/reducers';
import { combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const renderWithProvider = (ui, { customState } = {}, statusCode) => {
    const rootReducer = combineReducers({
        usersViewReducers
    })
    rootReducer().usersViewReducers.usersInformationList = { data: [{ id: 1, username: 'alfonso', email: 'poncho@poncho.com' }] };
    rootReducer().usersViewReducers.statusCodeSaveUser = statusCode;
    const store = configureStore({ reducer: rootReducer, customState })
    return render(<Provider store={store}>{ui}</Provider>)
}

describe('Unit tests of userView component', () => {

    test('Testing component userView', () => {
        renderWithProvider(
            <BrowserRouter>
                <UsersView />
            </BrowserRouter>, {}, 200
        )
        let openDialogButton = screen.getByTestId('userOpenDialogNew')
        fireEvent.click(openDialogButton)
        let iconButtonShowPassword = screen.getByTestId('iconShowPassword')
        fireEvent.click(iconButtonShowPassword)
        let usernameInput = screen.getByTestId('usernameTest')
        let inputPasswordUser = screen.getByTestId('inputPasswordUser')
        let inputEmailUser = screen.getByTestId('emailUserTest')
        fireEvent.change(usernameInput, { target: { name: 'username', value: 'Alfonso' } })
        fireEvent.change(inputPasswordUser, { target: { name: 'password', value: 'moreno' } })
        fireEvent.change(inputEmailUser, { target: { name: 'email', value: 'moreno@moreno.com' } })
        // eslint-disable-next-line testing-library/no-node-access
        let saveUser = document.querySelector('#buttonSaveDialogUser');
        fireEvent.click(saveUser)
    });
    test('Testing functions componente user view', () => {
        renderWithProvider(
            <BrowserRouter>
                <UsersView />
            </BrowserRouter>, {}, 400
        )
        let buttonActions = screen.getByTestId('usertActionsButtons')
        fireEvent.click(buttonActions)
        let menuUpdateUser = screen.getByTestId('menuUpdateUser')
        fireEvent.click(menuUpdateUser)
        let menuDeleteUser = screen.getByTestId('menuDeleteUser')
        fireEvent.click(menuDeleteUser);
    })

    test('Generic table', () => {
        renderWithProvider(
            <BrowserRouter>
                <UsersView />
            </BrowserRouter>, {}, 400
        )
    })
})


