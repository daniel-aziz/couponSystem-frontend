import { NavLink } from "react-router-dom";

function CustomerNavigation(): JSX.Element {
    return (
        <div className="customerNavigation sideNavigation">
			<h3 className="clientNavTitle centerBlock">Panel</h3>

            <br />

            <nav className="clientNavBar">

                <NavLink className="clientNavLink centerInline" exact to="/customerDetails">Your Details &#38; Coupons</NavLink>
                <br />
                
            </nav>
        </div>
    );
}

export default CustomerNavigation;
