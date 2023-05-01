import { configureStore } from '@reduxjs/toolkit'
import reducersChallenge from './combineReducers';

export const storeReduxChallenge = configureStore({ reducer: reducersChallenge });