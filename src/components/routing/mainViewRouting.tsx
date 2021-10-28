import { Redirect, Route, Switch } from "react-router-dom";
import AdminView from "../clientPages/admin/adminView";
import CompanyView from "../clientPages/company/companyView";
import CustomerView from "../clientPages/customer/customerView";
import RegisterPage from "../loginComponents/registerPage";
import AboutPage from "../mainPages/aboutPage";
import ContactUsPage from "../mainPages/contactUsPage";
import HomePage from "../mainPages/homePage";
import NotFoundPage from "../mainPages/notFoundPage";
import StorePage from "../mainPages/storePage";



function MainViewRouting(): JSX.Element {
    return (
        <div className="mainViewRouting">
			<Switch>
            <Route path="/homePage" component={HomePage} exact/>
            <Route path="/storePage" component={StorePage} exact/>
            <Route path="/contactUsPage" component={ContactUsPage} exact/>
            <Route path="/aboutPage" component={AboutPage} exact/>
            <Route path="/adminView" component={AdminView} exact/>
            <Route path="/CompanyView" component={CompanyView} exact/>
            <Route path="/customerView" component={CustomerView} exact/>
            <Route path="/registerPage" component={RegisterPage} exact/>
            <Redirect from="/" to="/homePage" exact />
            <Route component={NotFoundPage}/>
            </Switch>
        </div>
    );
}

export default MainViewRouting;
