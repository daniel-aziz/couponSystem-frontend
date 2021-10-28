import { Redirect, Route, Switch } from "react-router-dom";
import AdminCompanies from "../clientPages/admin/adminCompanies";
import AdminCustomers from "../clientPages/admin/adminCustomers";
import AdminWelcome from "../clientPages/admin/adminWelcome";
import AdminOneCompany from "../clientPages/admin/adminOneCompany"
import AdminOneCustomer from "../clientPages/admin/adminOneCustomer"
import NotFoundPage from "../mainPages/notFoundPage"
import AdminUpdateCompany from "../clientPages/admin/adminUpdateComapny";
import AdminUpdateCustomer from "../clientPages/admin/adminUpdateCustomer";
import AdminAddCompany from "../clientPages/admin/adminAddComapny";
import AdminAddCutomer from "../clientPages/admin/adminAddCustomer";


function AdminRouting(): JSX.Element {
    return (
        <div className="adminRouting">
            <Switch>
                <Route path="/adminWelcome" component={AdminWelcome} exact />

                <Route path="/adminCompanies" component={AdminCompanies} exact />
                <Route path="/adminCustomers" component={AdminCustomers} exact />

                <Route path="/adminOneCompany/:companyId" component={AdminOneCompany} exact />
                <Route path="/adminOneCustomer/:customerId" component={AdminOneCustomer} exact />

                <Route path="/adminUpdateCompany/:companyId" component={AdminUpdateCompany} exact />
                <Route path="/adminUpdateCustomer/:customerId" component={AdminUpdateCustomer} exact />

                <Route path="/adminAddCompany" component={AdminAddCompany} exact />
                <Route path="/adminAddCustomer" component={AdminAddCutomer} exact />

                <Redirect path="/adminView" to="/adminWelcome" />
                
                <Route component={NotFoundPage}/>
                
            </Switch>
        </div>
    );
}

export default AdminRouting;
