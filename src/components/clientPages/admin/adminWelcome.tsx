import { useEffect } from "react";

function AdminWelcome(): JSX.Element {

    useEffect(()=>{
        document.title = "Welcome - FlashyCoupons";
    },[]);
    
    return (
        <div className="adminWelcome centerBlock">
            <br /><br />
            <h1>Welcome Admin</h1>
        </div>

    );
}

export default AdminWelcome;
