function SplashScreen(): JSX.Element {
    return (
        <div className="splashScreen centerBlock" >
            <div>
                <h1 className="mainTitle centerBlock">LOADING....</h1>
                <br />
                <div className="centerBlock">
                    <div className="loader">
                    </div>
                </div>
            </div>
        </div >
    );
}

export default SplashScreen;