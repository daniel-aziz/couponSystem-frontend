import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Customer from "../../../models/Customer";
import jwtAxios from "../../../utils/JwtInterceptor";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { useParams } from "react-router-dom";
import { SysErrs } from "../../../utils/SysErrs";

function AdminUpdateCustomer(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors },reset } = useForm<Customer>();

    const [customerData, setData] = useState<Customer>(new Customer());

    const { customerId } = useParams<{ customerId?: string }>();

    const URLupdateCustomer = globals.urls.administrator + "updateCustomer/"
    const URLgetCustomer = globals.urls.administrator + "getOneCustomer/" + customerId;

    useEffect(() => {

        jwtAxios.post(URLgetCustomer)
            .then((response) => {
                setData(response.data)
                document.title = getName() + " Update - FlashyCoupons";
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }, [Customer]);

    function getName(): string {
        return customerData.firstName;
    }

    function verify(customer: Customer) {

        customer.id = customerData.id;

        jwtAxios.post(URLupdateCustomer, customer)
            .then(response => {
                notify.success(SysErrs.CUSTOMER_UPDATED_SUCCESFULLY)
                reset({})
            })
            .catch(error => {
                notify.error(errorHelper.getMSG(error))
            })
    }

    return (
        <div className="adminUpdateCustomer">
            <div className="centerBlock">
                <h2 className="mainTitle">Update {getName()}</h2>
            </div>
            <br />
            <div className="centerBlock">
                <div className="smallBox">
                    <form onSubmit={handleSubmit(verify)}>
                        <TextField label="Id" type="text" value={customerData.id.toString()} variant="outlined" disabled {...register("id")} />
                        <br />
                        <br />
                        <TextField label="First Name" type="text" variant="outlined" placeholder={customerData.firstName}
                            {...register("firstName", {
                                required: { value: true, message: "First Name is required" }
                                , minLength: { value: 2, message: "Min length must be 2 characters" }
                            })} />
                        <br />
                        <span> {errors.firstName && <span className="errorMSG">{errors.firstName.message}</span>} </span>
                        <br />
                        <TextField label="Last Name" type="text" variant="outlined" placeholder={customerData.lastName}
                            {...register("lastName", {
                                required: { value: true, message: "Last Name is required" }
                                , minLength: { value: 1, message: "Min length must be 1 characters" }
                            })} />
                        <br />
                        <span> {errors.firstName && <span className="errorMSG">{errors.firstName.message}</span>} </span>
                        <br />
                        <TextField label="Email" type="email" variant="outlined" placeholder={customerData.email}
                            {...register("email", {
                                required: { value: true, message: "Email is required" }
                                , minLength: { value: 5, message: "Min length must be 5 characters" }
                            })} />
                        <br />
                        <span> {errors.email && <span className="errorMSG">{errors.email.message}</span>} </span>
                        <br />
                        <TextField label="Password" type="text" variant="outlined" placeholder={customerData.password}
                            {...register("password", {
                                required: { value: true, message: "Password is required" }
                                , minLength: { value: 5, message: "Min length must be 5 characters" }
                                , maxLength: { value: 16, message: "Min length must be 16 characters" }
                            })} />
                        <br />
                        <span> {errors.password && <span className="errorMSG">{errors.password.message}</span>} </span>
                        <br />
                        <br />
                        <div className="centerBlock">
                            <button className="formButton" type="submit">Submit</button>
                            <button className="formButtonReset" type="reset">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );

}


export default AdminUpdateCustomer;