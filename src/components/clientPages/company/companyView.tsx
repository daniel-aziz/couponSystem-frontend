import { useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { myStore } from "../../../redux/Store";
import notify from "../../../utils/Notify";
import { SysErrs } from "../../../utils/SysErrs";
import CompanyRouting from "../../routing/companyRouting";
import CompanyNavigation from "./companyNavigation";



function CompanyView(): JSX.Element {

    const history = useHistory();
    useEffect(()=>{
        if (!(myStore().store.getState().loggedState.client.clientType === "COMPANY")) {
            notify.error(SysErrs.FORBBIDEN)
            history.push("/")
        }
    })

    return (
        <div className="companyView">
			 <BrowserRouter>
                <CompanyNavigation/>
                <CompanyRouting/>
            </BrowserRouter>
        </div>
    );
}

export default CompanyView;
