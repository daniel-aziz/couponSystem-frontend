import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import notify from "../../utils/Notify";
import axios from "axios";
import globals from "../../utils/Globals";
import { SysErrs } from "../../utils/SysErrs";

interface EmailForm {
    name: string,
    subject: string,
    email: string,
    message: string,
}


function ContactUsPage(): JSX.Element {
    const { register, handleSubmit, setError, formState: { errors }, reset } = useForm<EmailForm>();
    const URLsendEmail = globals.urls.guest + "contactUs/"

    useEffect(() => {
        document.title = "Contact us - FlashyCoupons"; 
    })

     
    function sendMail(emailMsg:EmailForm) {
        axios.post(URLsendEmail, emailMsg).then((response)=>{
            reset({})
            notify.success(SysErrs.SEND_EMAIL_SUCCESSED)
        }).catch((error)=>{
            notify.error(SysErrs.SEND_EMAIL_FAILED)
        })
        
    }
      
    
    return (
        <div className="contactUsPage">
            <div className="centerBlock">
                <h2 className="mainTitle">Contact us</h2>
            </div>
            <br />
            <div className="centerBlock">
                <div className="smallBox">
                    <form onSubmit={handleSubmit(sendMail)}>
                        <TextField label="Full Name" type="text" variant="outlined"  {...register("name", {
                            required: { value: true, message: "Name is required" }
                            , minLength: { value: 3, message: "Min length must be 3 characters" }
                        })} />
                        <br />
                        <span> {errors.name && <span className="errorMSG">{errors.name.message}</span>} </span>
                        <br />
                        <TextField label="Email" type="email" variant="outlined"  {...register("email", {
                            required: { value: true, message: "Email is required" }
                        })} />
                        <br />
                        <span> {errors.email && <span className="errorMSG">{errors.email.message}</span>} </span>
                        <br />
                        <TextField label="Subject" type="text" variant="outlined"  {...register("subject", {
                            required: { value: true, message: "Subject is required" }
                        })} />
                        <br />
                        <span> {errors.subject && <span className="errorMSG">{errors.subject.message}</span>} </span>
                        <br />
                        <TextField
                            style={{ width: "230px" }}
                            label="Message" type="text" multiline rows={5} variant="outlined"
                            {...register("message", {
                                required: { value: true, message: "Nessage is required" }
                            })} />
                        <br />
                        <span> {errors.message && <span className="errorMSG">{errors.message.message}</span>} </span>
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

export default ContactUsPage;
