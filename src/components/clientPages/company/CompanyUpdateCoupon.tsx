import { Button, InputAdornment, MenuItem, Select, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import jwtAxios from "../../../utils/JwtInterceptor";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { SysErrs } from "../../../utils/SysErrs";
import Coupon from "../../../models/Coupon";
import CouponCompany from "../../../models/CouponCompany";
import { myStore } from "../../../redux/Store";
import { CategoriesList } from "../../../utils/CategoriesList";
import { styled } from '@mui/material/styles';
import FileURLModel from "../../../models/FileURLModel";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

// BackEndless Imports And Config
import Backendless from 'backendless';
const APP_ID = 'E4714048-7BC7-FEA1-FF1A-C2F2C6AC1800';
const API_KEY = '669CEE09-7760-41B5-986E-1B28944FD408';
Backendless.serverURL = 'https://eu-api.backendless.com';
Backendless.initApp(APP_ID, API_KEY);


const Input = styled('input')({
    display: 'none',
});



function CompanyUpdateCoupon(): JSX.Element {

    const companyId = myStore().store.getState().loggedState.client.clientId;

    const { couponId } = useParams<{ couponId?: string }>();

    const [couponData, setCoupon] = useState<Coupon>(new Coupon())

    const { register, handleSubmit, setError, formState: { errors },reset } = useForm<Coupon>();

    const URLaddCoupon = globals.urls.company + "addCoupon/"
    const URLgetOneCoupon = globals.urls.company + "getOneCoupon/" + couponId;

    const { v4: uuidv4 } = require('uuid');

    useEffect(() => {
        document.title = "Update Coupon - FlashyCoupons";
        jwtAxios.post(URLgetOneCoupon)
            .then((response) => {
                setCoupon(response.data)
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })

    }, [Coupon])


    const verify = async (coupon: Coupon) => {

        // upload image
        var FileObject: FileURLModel; // deifne the returned object
        var resulte = await Backendless.Files.upload(coupon.image[0],
            ("img" + "/" + "company_" + companyId + "/" + uuidv4()), false); // upload and gets a json with the URL
        FileObject = JSON.parse(JSON.stringify(resulte)) // JSON -> Object
        var returnURL = FileObject.fileURL; // Get the URL

        // build coupon
        coupon.id = parseInt(couponId);
        coupon.company = handleCompanyId();
        coupon.image = returnURL;

        // add coupon to db
        jwtAxios.post(URLaddCoupon, coupon)
            .then(response => {
                notify.success(SysErrs.COUPON_ADDED_SUCCESFULLY)
                reset({})
            })
            .catch(error => {
                notify.error(errorHelper.getMSG(error))
            })
    }

    function handleCompanyId(): any {
        let companyForCoupon = new CouponCompany()
        companyForCoupon.id = companyId;
        return companyForCoupon;
    }


    return (
        <div className="companyUpdateCoupon">

            <div className="centerBlock">
                <h2 className="mainTitle">Add Coupon</h2>
            </div>

            <div className="centerBlock">
                <div className="smallBox">
                    <form onSubmit={handleSubmit(verify)}>
                        {/*----- ID ------*/}
                        <TextField
                            value={couponData.id}
                            placeholder={couponData.id.toString()}
                            label="Id" type="number" variant="outlined" disabled {...register("id")} />
                        <br />
                        <br />

                        {/*----- TITLE ------*/}
                        <TextField
                            required
                            placeholder={couponData.title}
                            label="Title" type="text" variant="outlined"
                            {...register("title", {
                                minLength: { value: 4, message: "Min length must be 4 characters" }
                            })} />
                        <br />
                        <span> {errors.title && <span className="errorMSG">{errors.title.message}</span>} </span>
                        <br />

                        {/*----- CATEGORY ------*/}
                        <Select
                            required
                            style={{ width: "230px" }}
                            {...register("category", {
                            })}
                        >
                            <MenuItem value="" disabled selected hidden>Category</MenuItem>
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
                        <br />
                        <br />
                        {/*----- DESCRIPTION ------*/}
                        <TextField
                            required
                            placeholder={couponData.description}
                            style={{ width: "230px" }}
                            label="Description" type="text" multiline rows={3} variant="outlined"
                            {...register("description", {
                                maxLength: { value: 80, message: "Max length must be 50 characters" }
                            })} />
                        <br />
                        <span> {errors.description && <span className="errorMSG">{errors.description.message}</span>} </span>
                        <br />

                        {/*----- START DATE ------*/}
                        <TextField

                            required
                            label="Start Date"
                            type="date"

                            {...register("startDate", {
                                valueAsDate: true
                            })}
                            sx={{ width: 230 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <span> {errors.startDate && <span className="errorMSG">{errors.startDate.message}</span>} </span>
                        <br />

                        {/*----- END DATE ------*/}
                        <TextField
                            required
                            label="End Date"
                            type="date"
                            {...register("endDate", {
                                valueAsDate: true
                            })}
                            sx={{ width: 230 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <br />
                        <span> {errors.endDate && <span className="errorMSG">{errors.endDate.message}</span>} </span>
                        <br />

                        {/*----- IMAGE ------*/}
                        <label
                            htmlFor="contained-button-file">
                            <Input
                                required
                                {...register("image")}
                                accept="image/*" id="contained-button-file" multiple type="file" />
                            <Button
                                style={{ width: "230px" }}
                                variant="contained" component="span">
                                Upload Image
                            </Button>
                        </label>
                        <br />
                        <span className="errorMSG"> Must Be Uploaded Again</span>
                        <br />
                        <br />
                        {/*----- AMOUNT ------*/}
                        <TextField
                            required
                            placeholder={couponData.amount.toString()}
                            style={{ width: "110px" }} label="Amount" type="number" variant="outlined"
                            {...register("amount", {
                                min: { value: 1, message: "Min amount must be 1" }
                            })} />

                        {/*----- PRICE ------*/}
                        <TextField
                            required
                            placeholder={couponData.price.toString()}
                            InputProps={{
                                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                            }}
                            style={{ marginLeft: "10px", width: "110px" }} label="Price" type="number" variant="outlined"
                            {...register("price", {
                                min: { value: 1, message: "Min price must be 1$" }
                            })} />
                        <br />
                        <span> {errors.amount && <span className="errorMSG">{errors.amount.message}</span>} </span>
                        <br />
                        <br />
                        <span> {errors.price && <span className="errorMSG">{errors.price.message}</span>} </span>
                        <br />
                        <div className="centerBlock">
                            <button className="formButton" type="submit">Submit</button>
                            <button className="formButtonReset" type="reset">Reset</button>
                        </div>
                    </form>

                </div>
            </div>

            <br />
            <br />
            <br />
            <br />
        </div>
    );
}


export default CompanyUpdateCoupon;