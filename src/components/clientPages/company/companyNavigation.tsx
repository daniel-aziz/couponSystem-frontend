import { NavLink } from "react-router-dom";

function CompanyNavigation(): JSX.Element {
    return (
        <div className="companyNavigation sideNavigation">

            <h3 className="clientNavTitle centerBlock">Panel</h3>
            <br />
            <nav className="clientNavBar">
                <NavLink className="clientNavLink centerInline" exact to="/companyDetails">Your Details</NavLink>
                <br />
                <NavLink className="clientNavLink centerInline" exact to="/addCoupon">Add Coupon</NavLink>
            </nav>
        </div>
    );
}

export default CompanyNavigation;
