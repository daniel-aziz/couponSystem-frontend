import { BrowserRouter } from "react-router-dom";
import MainHeader from "../mainHeader";
import MainViewRouting from "../../routing/mainViewRouting";
import MainFooter from "../mainFooter";
import "./layout.css";



function Layout(): JSX.Element {
    return (
        <div className="layout">
            <BrowserRouter>
                <MainHeader />
                <MainViewRouting />
                <MainFooter />
            </BrowserRouter>
        </div>
    );
}

export default Layout;
