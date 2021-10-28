import { useEffect } from "react";
import { myStore } from "../../../redux/Store";

function CompanyWelcome(): JSX.Element {

    function getName() {
        return myStore().store.getState().loggedState.client.name;
    }

    useEffect(()=>{
        document.title = getName() + " - FlashyCoupons";
    },[]);

    return (
        <div className="companyWelcome centerBlock">
            <br /><br />
            <h1>Welcome {getName()}</h1>
        </div>

    );
}

export default CompanyWelcome;
