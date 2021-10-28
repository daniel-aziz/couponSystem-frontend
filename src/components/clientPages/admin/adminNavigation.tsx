import { NavLink } from "react-router-dom";

function AdminNavigation(): JSX.Element {
    return (
        <div className="adminNavigation sideNavigation">
            <h3 className="clientNavTitle centerBlock">Panel</h3><br />
            <nav className="clientNavBar">
                <NavLink className="clientNavLink centerInline" exact to="/adminCompanies">Browse All Companies</NavLink><br />
                <NavLink className="clientNavLink centerInline" exact to="/adminCustomers">Browse All Customers</NavLink><br />

                <NavLink className="clientNavLink centerInline" exact to="/adminAddCompany">Add Company</NavLink><br />
                <NavLink className="clientNavLink centerInline" exact to="/adminAddCustomer">Add Customer</NavLink><br />
            </nav>
        </div>
    );
}

export default AdminNavigation;
