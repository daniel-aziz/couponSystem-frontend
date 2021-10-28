
import { myStore } from "../redux/Store";;

const validClient = (methodClientType: String) => {
    if (myStore().store.getState().loggedState.client.clientType === methodClientType) return true;
    else return false;
}

export default validClient;




