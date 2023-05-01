import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import { Provider } from "react-redux";
import MenuChallenge from './challenge_arkus/components/menuChallenge';
import LoginView from './challenge_arkus/components/loginView';
import { storeReduxChallenge } from "./storeReducers";
import AppBarChallenge from "./baseComponents/appBarChallenge";
import UsersView from "./challenge_arkus/components/usersView";
import AccountsView from "./challenge_arkus/components/accountsView";
import TeamsAccountsViews from "./challenge_arkus/components/teamsAccountsView";
import Container from '@mui/material/Container';

import * as routes from './routesChallenge/routes';

import "./App.css";

const App = () => {

  return (
    <BrowserRouter>
      <Container maxWidth={false} disableGutters={true} sx={{ height: '90vh', width: '100vw' }}>
        <Provider store={storeReduxChallenge}>
          <AppBarChallenge />
          <Routes>
            <Route path={routes.LOGIN_VIEW} element={<LoginView />} />
            <Route path={routes.MENU_CHALLENGE} element={<MenuChallenge />} />
            <Route path={routes.USERS_VIEW} element={<UsersView />} />
            <Route path={routes.ACCOUNTS_VIEW} element={<AccountsView />} />
            <Route path={routes.TEAMS_VIEW} element={<TeamsAccountsViews />} />
          </Routes>
        </Provider>
      </Container>
    </BrowserRouter>
  );
};

export default App;
