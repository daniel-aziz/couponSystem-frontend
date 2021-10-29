import { NavLink } from "react-router-dom";
import { AiFillGithub, AiFillLinkedin,  } from 'react-icons/ai';
import { TiBusinessCard  } from 'react-icons/ti';

function getYear():number {
    return new Date().getFullYear();
}



function MainFooter(): JSX.Element {
    return (
        <div className="mainFooter">

            <span className="centerInline" style={{paddingTop:"6px"}}>All Rights Reserved to &nbsp;
            <NavLink className="clientNavLink" exact to="/contactUsPage"> Daniel Aziz </NavLink>
            &nbsp; {getYear()} &copy;  &nbsp;
            <span>
             <a href="https://www.linkedin.com/in/daniel-az/"><AiFillLinkedin className="socialLink" size="1em"/> </a>
            </span>
            <span>
             <a href="https://github.com/daniel-aziz/"><AiFillGithub className="socialLink" size="1em"/> </a>
            </span>
            <span>
             <a href="https://daniel-aziz.github.io/"><TiBusinessCard className="socialLink" size="1em"/> </a>
            </span>
            </span>
           
            
           </div>
    );
}

export default MainFooter;
