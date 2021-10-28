import { useEffect } from "react";
import { useHistory } from "react-router-dom";

function HomePage(): JSX.Element {
    const history = useHistory();

    useEffect(() => {
        document.title = "Home - FlashyCoupons";
    })

    return (
        <div className="homePage">
            <br />
            <div className="centerBlock">
                <h1
                style={{
                    padding:"0px",
                    margin:"0px",
                    fontSize:"80px",
                    color:"#16425B",
                    letterSpacing:"10px"
                }}
                >FLASHY COUPONS</h1>
            </div>
            <br />
            <div className="">
                <p className="" style={{ textAlign: "center",fontSize: "large" }}>
                    <span style={{ fontSize: "x-large" }}>Welcome </span>
                    to our site,
                    <br /><br />
                    Here you can buy the best coupons and deals on the web
                </p>
            </div>
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="centerBlock">
                <button onClick={()=>{history.push("/storePage")}} style={{ height: "50px", width: "100px" }}>Go to Store</button>
            </div>

        </div>
    );
}

export default HomePage;
