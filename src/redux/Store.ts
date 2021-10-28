import { combineReducers, createStore } from "redux";
import { persistStore, persistReducer } from 'redux-persist'
import { loggedReducer } from "./LoggedState";
import { cartReducer } from "./cartState";
import { guestReducer } from "./guestState";
import storage from "redux-persist/lib/storage";
import {loadState} from './localStorage'

const persistConfig = {
    key: 'root',
    storage
}

const reducers = combineReducers({
    loggedState: loggedReducer,
    cartState: cartReducer,
    guestState: guestReducer,
})

const persistedState = loadState()

const persistedReducer = persistReducer(persistConfig, reducers)


let store = createStore(
    persistedReducer,
    persistedState
    );

let persistor = persistStore(store)


export const myStore = () => {
    return { store, persistor }
}

