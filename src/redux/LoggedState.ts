import Client from "../models/Client";
import jwt_decode from 'jwt-decode';
import Token from "../models/Token";

export class LoggedState {
    public client: Client = new Client();

}

export enum LoggedActionType {
    LoginUser = "LoginUser",
    LogoutUser = "LogoutUser",

}

// Action declaration
export interface LoggedAction {
    type: LoggedActionType,
    payload?: any,
}

// Action functions
export function loginClient(client: Client): LoggedAction {
    return { type: LoggedActionType.LoginUser, payload: client }
}

export function logoutClient(): LoggedAction {
    return { type: LoggedActionType.LogoutUser, payload: null }
}

// Reducer 
export function loggedReducer(currentState: LoggedState = new LoggedState(), action: LoggedAction): LoggedState {
    const newState = { ...currentState };

    switch (action.type) {
        case LoggedActionType.LoginUser:
            action.payload.clientId = getIdByToken(action.payload.token)
            newState.client = action.payload;
            break;
        case LoggedActionType.LogoutUser:
            newState.client = new Client();
            
            break;
    }
    return newState;
}


function getIdByToken(token: string) {
    const resulte: Token = jwt_decode(token);
    return resulte["userId"];
}

