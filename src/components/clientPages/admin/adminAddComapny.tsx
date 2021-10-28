import { useEffect } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Company from "../../../models/Company";
import jwtAxios from "../../../utils/JwtInterceptor";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { SysErrs } from "../../../utils/SysErrs";



function AdminAddCompany(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors } , reset } = useForm<Company>();
    const URLaddCompany = globals.urls.administrator + "addCompany/"
    

    useEffect(() => {
        document.title = "Add Company - FlashyCoupons";
    })

    function verify(company: Company) {
        
        jwtAxios.post(URLaddCompany, company)
            .then(response => {
                notify.success(SysErrs.COMPANY_ADDED_SUCCESFULLY)
                reset({})
            })
            .catch(error => {
                notify.error(errorHelper.getMSG(error))
            })
       
    }

    return (
        <div className="adminAddCompany">

            <div className="centerBlock">
                <h2 className="mainTitle">Add Company</h2>
            </div>

            <div className="centerBlock">
                <div className="smallBox">
                    <br />
                    <form onSubmit={handleSubmit(verify)}>
                        <TextField label="Name" type="text" variant="outlined"  {...register("name", {
                            required: { value: true, message: "Name is required" }
                            , minLength: { value: 2, message: "Min length must be 2 characters" }
                        })} />
                        <br />
                        <span> {errors.name && <span className="errorMSG">{errors.name.message}</span>} </span>
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


export default AdminAddCompany;