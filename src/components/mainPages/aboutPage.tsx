
import { styled } from '@mui/material/styles';
import { useEffect } from "react";
import Coupon from "../../models/Coupon";


function AboutPage(): JSX.Element {

    useEffect(() => {
        document.title = "About us - FlashyCoupons";

    })

    return (
        <div className="aboutPage">

            <div className="centerBlock">
                <h2 className="mainTitle">About us :)</h2>
            </div>
            <br />
            <div className="centerBlock">
                <h4 className="mainTitle">Coming soon...</h4>
            </div>

        </div>
    );
}

export default AboutPage;
