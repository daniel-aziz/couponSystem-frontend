import { NavLink } from "react-router-dom";

function getYear():number {
    return new Date().getFullYear();
}

function MainFooter(): JSX.Element {
    return (
        <div className="mainFooter">

            <span className="centerInline" style={{paddingTop:"6px"}}>All Rights Reserved to &nbsp;
            <NavLink className="clientNavLink" exact to="/contactUsPage"> Daniel Aziz </NavLink>
            &nbsp; {getYear()} &copy; </span>
            
        </div>
    );
}

export default MainFooter;
