import { useEffect } from "react";
import { useHistory } from "react-router";

function NotFoundPage(): JSX.Element {
    const history = useHistory();

    useEffect(() => {
        document.title = "Not Found - FlashyCoupons";
    })

    return (
        <div className="notFoundPage">
            <br /><br />
            <h2 className="mainTitle centerBlock">404 Page Not Found...</h2>

            <br />
            <br />
            <br />
            <br />

            <div className="centerBlock">
                <button onClick={() => { history.push("/homePage") }} style={{ height: "50px" }}>Go to Home Page</button>
            </div>
        </div>
    );
}

export default NotFoundPage;
