import LoginHandler from "../loginComponents/loginHandler";
import { NavLink } from "react-router-dom";
import logo from "../../assets/img/logo.png"
import { myStore } from "../../redux/Store"
import CouponsCart from "../storeComponents/couponsCart";
import { useSelector } from "react-redux";




function MainHeader(): JSX.Element {

    useSelector(myStore().store.getState)
    

    function getMenu(): string {
        let clientType = myStore().store.getState().loggedState.client.clientType;
        switch (clientType) {
            case "ADMIN":
                return "/adminView"
            case "COMPANY":
                return "/companyView"
            case "CUSTOMER":
                return "/customerView"
            default:
                return ("/");
        }
    }


    return (
        <div className="mainHeader">

            {/* --- HEADER LOGO ---*/}

            <div className="headerLogo">
                <div className="siteLogoHolder centerBlock">
                    <img className="siteLogo" src={logo} />
                </div>
            </div>

            {/* --- HEADER Navigation ---*/}

            <div className="headerNavigation">
                <nav className="mainNavBar centerBlock">
                    <NavLink className="mainNavLink" exact to="/homePage">Home</NavLink>
                    <span className="linkSprator">|</span>
                    <NavLink className="mainNavLink" exact to="/storePage">Store</NavLink>
                    <span className="linkSprator">|</span>
                    <NavLink className="mainNavLink" exact to="/aboutPage">About</NavLink>
                    <span className="linkSprator">|</span>
                    <NavLink className="mainNavLink" exact to="/contactUsPage">Contact Us</NavLink>
                    <span className="linkSprator">{myStore().store.getState().loggedState.client.isLogged ? "|" : ""}</span>
                    <NavLink className="mainNavLink" exact to={getMenu}>{myStore().store.getState().loggedState.client.isLogged ? "Menu" : ""}</NavLink>
                </nav>
            </div>

            {/* --- HEADER CART ---*/}

            <div className="headerCart centerBlock">
                <CouponsCart/>
            </div>

            {/* --- HEADER CLIENT ---*/}

            <div className="headerClient centerBlock">
                <div className="RightBlock">
                    <div>
                        <LoginHandler />
                    </div>
                </div>
            </div>

        </div>
    );
}

export default MainHeader;
