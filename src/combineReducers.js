import { combineReducers } from "redux";
import { loginViewReducers } from "./challenge_arkus/loginView/reducers";
import { usersViewReducers } from "./challenge_arkus/usersView/reducers";
import { accountsViewReducers } from "./challenge_arkus/accountsView/reducers";
import { teamsAccountsReducers } from "./challenge_arkus/teamsAccounts/reducers";

const reducersChallenge = combineReducers({
    loginViewReducers,
    usersViewReducers,
    accountsViewReducers,
    teamsAccountsReducers
})

export default reducersChallenge;