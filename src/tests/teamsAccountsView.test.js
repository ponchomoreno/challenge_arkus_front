import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';
import TeamsAccountsViews from '../challenge_arkus/components/teamsAccountsView';
import { teamsAccountsReducers } from '../challenge_arkus/teamsAccounts/reducers';
import { accountsViewReducers } from '../challenge_arkus/accountsView/reducers';
import { usersViewReducers } from '../challenge_arkus/usersView/reducers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const renderWithProvider = (ui, { customState } = {}) => {
    const rootReducer = combineReducers({
        usersViewReducers,
        teamsAccountsReducers,
        accountsViewReducers
    })
    rootReducer().usersViewReducers.usersInformationList = { data: [{ id: 1, username: 'alfonso', email: 'poncho@poncho.com' }] };
    rootReducer().teamsAccountsReducers.teamsInformationList = {
        data: [
            {
                id: 1,
                account: { id: 1, account_name: 'Prueba' },
                team_name: 'Testing',
                date_start: '2023-02-02',
                date_end: '2023-02-03'
            }]
    }
    rootReducer().accountsViewReducers.accountsInformationList = { data: [{ id: 2, account_name: 'account testing' }] }
    rootReducer().usersViewReducers.usersInformationList = { data: [{ user: { id: 2, username: 'poncho' } }] }
    const store = configureStore({ reducer: rootReducer, customState })
    return render(<Provider store={store}>{ui}</Provider>)
}

describe('Testing component team account view', () => {
    test('Mounted component teams view', () => {
        renderWithProvider(
            <BrowserRouter>
                <TeamsAccountsViews />
            </BrowserRouter>
        )
    })
})
