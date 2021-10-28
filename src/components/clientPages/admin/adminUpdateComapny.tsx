import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import Company from "../../../models/Company";
import jwtAxios from "../../../utils/JwtInterceptor";
import globals from "../../../utils/Globals";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { useParams } from "react-router-dom";
import { SysErrs } from "../../../utils/SysErrs";



function AdminUpdateCompany(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors } ,reset } = useForm<Company>();

    const [companyData, setData] = useState<Company>(new Company());

    const { companyId } = useParams<{ companyId?: string }>();

    const URLupdateCompany = globals.urls.administrator + "updateCompany/"
    const URLgetCompany = globals.urls.administrator + "getOneCompany/" + companyId;

    useEffect(() => {

        jwtAxios.post(URLgetCompany)
            .then((response) => {
                setData(response.data)
                document.title = getName() + " Update - FlashyCoupons";
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }, [Company]);

    function getName(): string {
        return companyData.name;
    }

    function verify(company: Company) {

        company.id = companyData.id;
        company.name = companyData.name;

        jwtAxios.post(URLupdateCompany, company)
            .then(response => {
                notify.success(SysErrs.COMPANY_UPDATED_SUCCESFULLY)
                reset({})
            })
            .catch(error => {
                notify.error(errorHelper.getMSG(error))
            })
    }

    return (
        <div className="adminUpdateCompany">

            <div className="centerBlock">
                <h2 className="mainTitle">Update {getName()}</h2>
            </div>


            <div className="centerBlock">
                <div className="smallBox">
                    <br />
                    <form onSubmit={handleSubmit(verify)}>
                        <TextField label="Id" type="text" value={companyData.id.toString()} variant="outlined" disabled {...register("id")} />
                        <br />
                        <br />
                        <TextField label="Name" type="text" value={companyData.name} variant="outlined" disabled {...register("name")} />
                        <br />
                        <br />
                        <TextField label="Email" placeholder={companyData.email} type="email" variant="outlined"  {...register("email", {
                            required: { value: true, message: "Email is required" }
                            , minLength: { value: 5, message: "Min length must be 5 characters" }
                        })} />
                        <br />
                        <span> {errors.email && <span className="errorMSG">{errors.email.message}</span>} </span>
                        <br />
                        <TextField label="Password" placeholder={companyData.password} type="text" variant="outlined" {...register("password", {
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


export default AdminUpdateCompany;