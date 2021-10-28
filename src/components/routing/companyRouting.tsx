import { Redirect, Route, Switch } from "react-router-dom";
import CompanyAddCoupon from "../clientPages/company/CompanyAddCoupon";
import CompanyDetails from "../clientPages/company/companyDetails";
import CompanyUpdateCoupon from "../clientPages/company/CompanyUpdateCoupon";
import CompanyWelcome from "../clientPages/company/companyWelcome";
import NotFoundPage from "../mainPages/notFoundPage";

function CompanyRouting(): JSX.Element {
    return (
        <div className="companyRouting">
			<Switch>

            <Route path="/companyWelcome" component={CompanyWelcome} exact />

            <Route path="/addCoupon" component={CompanyAddCoupon} exact />

            <Route path="/companyDetails" component={CompanyDetails} exact />

            <Route path="/updateCoupon/:couponId" component={CompanyUpdateCoupon} exact />

            <Redirect path="/companyView" to="/CompanyWelcome" />
            
            <Route component={NotFoundPage}/>
            
            </Switch>
        </div>
    );
}

export default CompanyRouting;
