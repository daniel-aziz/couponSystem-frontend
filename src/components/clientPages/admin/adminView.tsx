import { useEffect } from "react";
import { BrowserRouter, useHistory } from "react-router-dom";
import { myStore } from "../../../redux/Store";
import notify from "../../../utils/Notify";
import { SysErrs } from "../../../utils/SysErrs";
import AdminRouting from "../../routing/adminRouting";
import AdminNavigation from "./adminNavigation";



function AdminView(): JSX.Element {

    const history = useHistory();

    useEffect(()=>{
        if (!(myStore().store.getState().loggedState.client.clientType === "ADMIN")) {
            notify.error(SysErrs.FORBBIDEN)
            history.push("/")
        }
    })

    return (
        <div className="adminView">
            <BrowserRouter >
                <AdminNavigation/>
                <AdminRouting />
            </BrowserRouter>
        </div>
    );
}

export default AdminView;
