import { fireEvent, render, screen } from '@testing-library/react';
import AccountsView from '../challenge_arkus/components/accountsView';
import { accountsViewReducers } from '../challenge_arkus/accountsView/reducers';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { BrowserRouter } from 'react-router-dom';

const renderWithProvider = (ui, { customState } = {}) => {
    const rootReducer = combineReducers({
        accountsViewReducers
    })
    rootReducer().accountsViewReducers.accountsInformationList = { data: [{ id: 1, account_name: 'Coca cola services', customer_name: 'Alfonso', account_manager_name: 'Poncho' }] };
    rootReducer().accountsViewReducers.statusCodeAccount = 200;
    const store = configureStore({ reducer: rootReducer, customState })
    return render(<Provider store={store}>{ui}</Provider>)
}


describe('Testing component account view', () => {
    test('Mounted component account', () => {
        renderWithProvider(
            <BrowserRouter>
                <AccountsView />
            </BrowserRouter>
        )
    })
})