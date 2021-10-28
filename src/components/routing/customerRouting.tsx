import { Redirect, Route, Switch } from "react-router-dom";
import CustomerDetails from "../clientPages/customer/customerDetails";
import CustomerWelcome from "../clientPages/customer/customerWelcome";
import HomePage from "../mainPages/homePage";
import NotFoundPage from "../mainPages/notFoundPage";

function CustomerRouting(): JSX.Element {
    return (
        <div className="customerRouting">
			<Switch>

            <Route path="/customerWelcome" component={CustomerWelcome} exact />
            
            <Route path="/customerDetails" component={CustomerDetails} exact />
            <Route path="/homePage" component={HomePage} exact />
            <Redirect path="/customerView" to="/customerWelcome" />
            
            <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default CustomerRouting;
