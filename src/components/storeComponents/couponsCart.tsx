import Drawer from "@mui/material/Drawer";
import CouponLine from "../storeComponents/couponLine";
import { Fragment, useState } from "react";
import jwtAxios from "../../utils/JwtInterceptor"
import { myStore } from "../../redux/Store";
import notify from "../../utils/Notify";
import errorHelper from "../../utils/ErrorHelper";
import globals from "../../utils/Globals";
import { SysErrs } from "../../utils/SysErrs";
import { resetCart } from "../../redux/cartState";
import { useSelector } from "react-redux";


function CouponsCart(): JSX.Element {

    useSelector(myStore().store.getState)

    var totalPrice = 0;

    const URLpurchaseCoupon = globals.urls.customer + "purchaseCoupon/"


    function getAmount() {
        return myStore().store.getState().cartState.coupons.length;
    }

    const [state, setState] = useState({
        right: false
    });

    const toggleDrawer = (open: boolean) => (
        event: React.KeyboardEvent | React.MouseEvent
    ) => {
        if (
            event.type === "keydown" &&
            ((event as React.KeyboardEvent).key === "Tab" ||
                (event as React.KeyboardEvent).key === "Shift")
        ) {
            return;
        }
        setState({ ...state, ["right"]: open });
    }

    function buyAll() {
        if (myStore().store.getState().loggedState.client.clientType === "CUSTOMER") {
            myStore().store.getState().cartState.coupons.forEach((item) => {
                jwtAxios.post((URLpurchaseCoupon + item.id))
                    .then((response) => {
                        notify.success(SysErrs.PURCHASE_SUCCESS)
                        myStore().store.dispatch(resetCart())
                    })
                    .catch((error) => {
                        notify.error("Issue with coupon '" + item.title + "'," + " Reason: " +
                            errorHelper.getMSG(error))
                    })
            })
        } else {
            notify.error(SysErrs.LOG_TO_PURCHASE)
        }
    }


    return (
        <div className="CouponsCart" >
            <Fragment>
                <button onClick={toggleDrawer(true)}
                    style={{ backgroundColor: "white", fontSize: "medium" }} className="genralLink" >
                    <span>
                        Total in Cart: &nbsp;
                        <span className="cartNumber"> {getAmount()}  </span>
                    </span>
                </button>

                {/*  Drawer  */}

                <Drawer
                    anchor={"right"}
                    open={state["right"]}
                    onClose={toggleDrawer(false)}
                >
                    <div className="cartDrawer" style={{ width: "450px" }}>

                        <div className="cartDrawerItems">
                            {myStore().store.getState().cartState.coupons.map(item =>
                                <CouponLine key={item.id} coupon={item} />

                            )}

                        </div>


                        <div className="cartDrawerTotal">
                            <div className="totalItems centerBlock">
                                <span>Total Price: {myStore().store.getState().cartState.coupons.forEach(item => {
                                    totalPrice += item.price
                                })}
                                    <span style={{ color: "green", fontWeight: "bolder" }}> {totalPrice}$ </span>
                                </span>
                            </div>
                            <div className="totalPrice centerBlock">
                                <span>
                                    Total Items:  {myStore().store.getState().cartState.coupons.length}
                                </span>
                            </div>
                        </div>

                        <div className="cartDrawerPurchase">
                            <button className="cartDrawerPurchaseButton" onClick={buyAll} >Purchase</button>
                        </div>

                    </div>
                </Drawer>
            </Fragment>

        </div>
    );

}

export default CouponsCart;