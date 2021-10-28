import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useForm, } from "react-hook-form";
import globals from "../../utils/Globals";
import notify from "../../utils/Notify";
import Customer from "../../models/Customer";
import { SysErrs } from "../../utils/SysErrs";
import axios from "axios";



function RegisterPage(): JSX.Element {
    
    const { register, handleSubmit, setError, formState: { errors },reset } = useForm<Customer>();
    const URLregister = globals.urls.guest + "register/"

    useEffect(() => {
        document.title = "Register - FlashyCoupons";
    })

    

    function verify(customer: Customer) {
        axios.post(URLregister, customer)
            .then(response => {
                notify.success(SysErrs.REGISTERD)
                reset({})
                
            })
            .catch(error => {
                notify.error(SysErrs.EMAIL_IN_USE)
            })
    }

    return (
        <div className="registerPage">

            <div className="centerBlock">
                <h2 className="mainTitle">Customer Register</h2>
            </div>
            <br />
            <div className="centerBlock">
                <div className="smallBox">
                    <form onSubmit={handleSubmit(verify)}>
                        <TextField required
                        label="First Name" type="text" variant="outlined"  {...register("firstName", {
                            required: { value: true, message: "First Name is required" }
                            , minLength: { value: 2, message: "Min length must be 2 characters" }
                        })} />
                        <br />
                        <span> {errors.firstName && <span className="errorMSG">{errors.firstName.message}</span>} </span>
                        <br />
                        <TextField label="Last Name" type="text" variant="outlined"  {...register("lastName", {
                            required: { value: true, message: "Last Name is required" }
                            , minLength: { value: 1, message: "Min length must be 1 characters" }
                        })} />
                        <br />
                        <span> {errors.firstName && <span className="errorMSG">{errors.firstName.message}</span>} </span>
                        <br />
                        <TextField label="Email" type="email" variant="outlined"  {...register("email", {
                            required: { value: true, message: "Email is required" }
                            , minLength: { value: 5, message: "Min length must be 5 characters" }
                        })} />
                        <br />
                        <span> {errors.email && <span className="errorMSG">{errors.email.message}</span>} </span>
                        <br />
                        <TextField label="Password" type="text" variant="outlined" {...register("password", {
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


export default RegisterPage;