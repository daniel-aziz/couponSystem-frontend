import { useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { myStore } from "../../../redux/Store";
import notify from "../../../utils/Notify";
import { SysErrs } from "../../../utils/SysErrs";
import CustomerRouting from "../../routing/customerRouting";
import CustomerNavigation from "./customerNavigation";


function CustomerView(): JSX.Element {
    const history = useHistory();

    useEffect(()=>{
        if (!(myStore().store.getState().loggedState.client.clientType === "CUSTOMER")) {
            notify.error(SysErrs.FORBBIDEN)
            history.push("/")
        }
    })
    
    return (
        <div className="customerView">
			 <BrowserRouter>
                <CustomerNavigation/>
                <CustomerRouting/>
            </BrowserRouter>
        </div>
    );
}

export default CustomerView;
