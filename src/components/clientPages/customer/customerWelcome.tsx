import { useEffect } from "react";
import { myStore } from "../../../redux/Store";

function CustomerWelcome(): JSX.Element {

    function getName() {
        return myStore().store.getState().loggedState.client.name;
    }

    useEffect(()=>{
        document.title = getName() + " - FlashyCoupons";
    },[]);

    return (
        <div className="customerWelcome centerBlock">
            <h1>Welcome {getName()}</h1>
        </div>

    );
}

export default CustomerWelcome;
