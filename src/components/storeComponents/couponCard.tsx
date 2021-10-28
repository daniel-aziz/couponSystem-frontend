import Coupon from "../../models/Coupon";
import { addToCart } from "../../redux/cartState";
import { myStore } from "../../redux/Store";
import notify from "../../utils/Notify";
import { SysErrs } from "../../utils/SysErrs";

interface CouponCardProps {
    coupon: Coupon;
}

function CouponCard(props: CouponCardProps): JSX.Element {

    const CART_ITEMS_LIMIT = 7;

    function addTo() {
        if (myStore().store.getState().loggedState.client.clientType === "CUSTOMER") {
            if (myStore().store.getState().cartState.coupons.length < CART_ITEMS_LIMIT) {
                myStore().store.dispatch(addToCart(props.coupon))
            }
            else {
                notify.error(SysErrs.CART_LIMIT + CART_ITEMS_LIMIT)
            }
        } else {
            notify.error(SysErrs.LOG_TO_PURCHASE)
        }
    }

    return (
        <div className="couponCard" >

            <div className="cardImg">
                <img className="couponImg" src={props.coupon.image} />
            </div>

            <div className="cardInfo">
                
                <span style={{ fontSize: "small", fontStyle: "italic" }}>{props.coupon.startDate} - {props.coupon.endDate}</span>
                <br /><br />
                <span style={{ fontSize: "large", color: "#464D77" }}>{props.coupon.title}</span>
                <br />
                <span style={{ fontSize: "x-small", color: "#464D77", fontWeight: "bolder" }}>{props.coupon.company.name}</span>
                <br /><br />
                <span >{props.coupon.description}</span>
                <br /><br /><br />
            </div>

            <div className="cardPrice">
                {props.coupon.amount <= 0 ?
                    <span style={{ color: "red", fontWeight: "bolder" }}>OUT OF STOCK</span> :
                    <span style={{ color: "green", fontWeight: "bolder" }}>{props.coupon.price}$</span>
                }

            </div>

            <div className="cardButton">
                {props.coupon.amount <= 0 ?
                    <button className="cardButtonButton" onClick={()=>{notify.error(SysErrs.OUT_OF_STOCK)}}>Add to Cart</button> :
                    <button className="cardButtonButton" onClick={addTo} >Add to Cart</button>
                }
            </div>
        </div>
    );
}

export default CouponCard;
