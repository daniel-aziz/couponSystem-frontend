import Coupon from "../../models/Coupon";
import { removeFromCart } from "../../redux/cartState";
import { myStore } from "../../redux/Store";

interface CouponCardProps {
    coupon: Coupon;
}

function CouponLine(props: CouponCardProps): JSX.Element {

    function removeFrom() {
        myStore().store.dispatch(removeFromCart(props.coupon.id))
    }

    return (
        <div className="cardLine">

            <div className="lineImg">
                <img className="cartImg" src={props.coupon.image} />
            </div>

            <div className="lineTitle">

                <div className="linetitletitle">
                    <span style={{ fontStyle: "italic", fontWeight: "bolder", paddingTop: "15px" }}> {props.coupon.title}</span>

                </div>

                <div className="linetitledesc">
                    <span className="seeDesc"> See Description.. </span>
                    <div className="dropdownContent">
                        {props.coupon.description}
                    </div>
                </div>

                <div className="linetitleprice">
                    <span style={{ color: "green", fontWeight: "bolder" }}>Price: {props.coupon.price}$ </span>
                </div>

            </div>

            <div className="lineRemove">
                <button className="lineRemoveButton" onClick={removeFrom} > X </button>
            </div>


        </div>

    );
}

export default CouponLine;
