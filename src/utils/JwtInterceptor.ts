import axios from "axios";
import { logoutClient } from "../redux/LoggedState";
import { myStore } from "../redux/Store";
import errorHelper from "./ErrorHelper";
import notify from "./Notify";
import { SysErrs } from "./SysErrs";


const jwtAxios = axios.create();


jwtAxios.interceptors.request.use(request => {
    request.headers = {
        "Authorization": myStore().store.getState().loggedState.client.token.toString()
    }
    return request;
});

jwtAxios.interceptors.response.use(

    (response) => {
        myStore().store.getState().loggedState.client.token = response.headers.authorization;
        return response;

    },

    (error) => {
        switch (error.response.status) {
            case 401: // Unauthorized
                notify.error(errorHelper.getMSG(error) + SysErrs.PLEASE_LOG_IN_AGAIN)
                myStore().store.dispatch(logoutClient())
                break;
            case 403: // Forbidden
                notify.error(errorHelper.getMSG(error))
                break;
            case 404: // Not Found
                notify.error(errorHelper.getMSG(error))
                break;
            case 500: // Internal Server Error 
                notify.error(errorHelper.getMSG(SysErrs.ISSUE_WITH_SERVER))
                break;
            default:
                notify.error(errorHelper.getMSG(SysErrs.GENERAL))
        }
    }

);



export default jwtAxios;