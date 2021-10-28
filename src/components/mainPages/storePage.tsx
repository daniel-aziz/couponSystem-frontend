import { MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import axios from "axios";
import { SyntheticEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Coupon from "../../models/Coupon";
import { setAllCouponsAgain, getAllCouponsFromDB, getAllCouponsByCategory, getAllCouponsByPrice } from "../../redux/guestState";
import { myStore } from "../../redux/Store";
import { CategoriesList } from "../../utils/CategoriesList";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import CouponCard from "../storeComponents/couponCard";
function StorePage(): JSX.Element {

    const [minPriceState, setMinPrice] = useState(0);
    const [maxPriceState, setMaxPrice] = useState(0);
    const [categoryState, setCategory] = useState("");
    const [couponsData, setCoupons] = useState<Coupon[]>([]);

    var allCouponsHolder: Coupon[] = [];

    const URLAll = globals.urls.guest + "getAllCoupons/all"
    const URLbyCategory = globals.urls.guest + "getAllCoupons/category/" + categoryState;
    const URLbyPrice = globals.urls.guest + "getAllCoupons/priceBetween/" + minPriceState + "/" + maxPriceState;


    useEffect(() => {
        document.title = "Store - FlashyCoupons";
        axios.get(URLAll)
            .then(response => {
                setCoupons(response.data)
                allCouponsHolder = response.data;
            }).catch(error => {
                notify.error("No Coupons in Stock")
            });
    }, [Coupon]);


    function updateCategory(event: SelectChangeEvent) {
        let category = (event.target.value as string).toString();
        setCategory(category)

    }

    function getByCategory() {
        /*
        if (categoryState === "ALL") {
            setCoupons(allCouponsHolder);
        } else {
            console.log(categoryState)
            var resulte = allCouponsHolder.filter(item => item.category == categoryState)
            setCoupons(resulte);
        }
        */

        if (categoryState === "ALL") {
            axios.get(URLAll)
                .then(response => {
                    setCoupons(response.data)
                }).catch(error => {
                });
        } else {
            axios.get(URLbyCategory)
                .then(response => {
                    setCoupons(response.data)
                }).catch(error => {
                });
        }


    }

    function getByPrice() {

        /*
        if (minPriceState === 0 && maxPriceState === 0) {
            setCoupons(allCouponsHolder)
            console.log("set 0")
        } else {
            var resulte = allCouponsHolder.filter(item =>
                (item.price >= minPriceState && item.price <= maxPriceState))
            setCoupons(resulte)
            console.log("set price")
        }
        */

        if (minPriceState === 0 && maxPriceState === 0) {
            axios.get(URLAll)
                .then(response => {
                    setCoupons(response.data)
                }).catch(error => {
                });
        } else {
            axios.get(URLbyPrice)
                .then(response => {
                    setCoupons(response.data)
                }).catch(error => {
                });
        }
    }

    function updateNumberMin(args: SyntheticEvent) {
        let minPrice = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(minPrice);
        if (parsed >= 0) {
            setMinPrice(parsed)
        }
    }

    function updateNumberMax(args: SyntheticEvent) {
        let maxPrice = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(maxPrice);
        if (parsed >= 0) {
            setMaxPrice(parsed)
        }
    }


    return (
        <div className="storePage">
            <h2 className="mainTitle centerBlock">Our Selction of Coupons</h2>
            <div>
                <div style={{ display: 'inline-block' }} >
                    <h5 className="subTitle" style={{ marginLeft: "20px" }}> Sort By Category </h5>

                    {/*----- CATEGORY ------*/}

                    <Select
                        onChange={updateCategory}
                        style={{ marginLeft: "20px", width: "250px" }}
                    >
                        <MenuItem value={"ALL"} >All</MenuItem>
                        <MenuItem value={CategoriesList.Automotive}>Automotive</MenuItem>
                        <MenuItem value={CategoriesList.Beauty}>Beauty</MenuItem>
                        <MenuItem value={CategoriesList.Clothing}>Clothing</MenuItem>
                        <MenuItem value={CategoriesList.Electronics}>Electronics</MenuItem>
                        <MenuItem value={CategoriesList.Entertainment}>Entertainment</MenuItem>
                        <MenuItem value={CategoriesList.Financial}>Financial</MenuItem>
                        <MenuItem value={CategoriesList.Fitness}>Fitness</MenuItem>
                        <MenuItem value={CategoriesList.Food}>Food</MenuItem>
                        <MenuItem value={CategoriesList.Garden}>Garden</MenuItem>
                        <MenuItem value={CategoriesList.General}>General</MenuItem>
                        <MenuItem value={CategoriesList.Gifts}>Gifts</MenuItem>
                        <MenuItem value={CategoriesList.Health}>Health</MenuItem>
                        <MenuItem value={CategoriesList.Home}>Home</MenuItem>
                        <MenuItem value={CategoriesList.Jewelry}>Jewelry</MenuItem>
                        <MenuItem value={CategoriesList.Travel}>Travel</MenuItem>
                    </Select>
                    <button style={{ marginLeft: "10px", width: "80px", height: "55px" }} className="formButton" onClick={getByCategory}>Send</button>
                </div>
                <div style={{ marginLeft: "20px", display: "inline-block" }}>
                    <h5 className="subTitle"> Sort By Price </h5>
                    <TextField style={{ width: "120px" }} label="Min" type="number" variant="outlined" onChange={updateNumberMin} />
                    <TextField style={{ marginLeft: "10px", width: "100px" }} label="Max" type="number" variant="outlined" onChange={updateNumberMax} />
                    <button style={{ marginLeft: "10px", width: "80px", height: "55px" }} className="formButton" onClick={getByPrice}>Send</button>
                </div>
            </div>


            <br />
            <div className="cardsHolderGrid">
                <div className="cardsHolder">
                    {couponsData.map((item) => <CouponCard key={item.id} coupon={item} />)}
                    <br /><br /><br />

                </div>
            </div>
        </div>

    );
}

export default StorePage;

