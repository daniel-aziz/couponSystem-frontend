
import { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { logoutClient } from "../../redux/LoggedState";
import { myStore } from "../../redux/Store"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import notify from "../../utils/Notify";
import { SysErrs } from "../../utils/SysErrs";
import { DialogTitle, MenuItem, Select, TextField } from "@mui/material";
import axios from "axios";
import { useForm } from "react-hook-form";
import UserDetails from "../../models/UserDetails";
import Client from "../../models/Client";
import { loginClient } from "../../redux/LoggedState"
import globals from "../../utils/Globals";
import { useSelector } from "react-redux";



function LoginHandler(): JSX.Element {

    useSelector(myStore().store.getState)

    const [open, setOpen] = useState(false);

    const history = useHistory();

    const { register, handleSubmit, setError, formState: { errors },reset } = useForm<UserDetails>();

    const URLlogin: string = globals.urls.guest + "login/"

    function getMenu(): string {
        let clientType = myStore().store.getState().loggedState.client.clientType;
        switch (clientType) {
            case "ADMIN":
                return "/adminView"
            case "COMPANY":
                return "/companyView"
            case "CUSTOMER":
                return "/customerView"
            default:
                return ("/");
        }
    }

    function verify(userDetails: UserDetails) {
        axios.post(URLlogin, userDetails)
            .then(response => {
                let client = new Client();
                client.isLogged = true;
                client.token = response.headers.authorization;
                client.name = getFixedName(userDetails.email);
                client.clientType = userDetails.clientType;


                myStore().store.dispatch(loginClient(client));

                notify.success(SysErrs.LOGIN_SUCCESFULL)
                handleClose()
                history.push(getMenu())
                reset({})
            })
            .catch(error => {
                notify.error(SysErrs.BAD_LOGIN)
            })
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function logout() {
        myStore().store.dispatch(logoutClient());
        notify.error(SysErrs.LOGGED_OUT)
    }

    function getFixedName(email: string): string {
        let userName = email.split("@")[0];
        let firstChar = userName.charAt(0).toUpperCase();
        let otherChars = userName.substr(1);
        return firstChar + otherChars;

    }

    function getUserName(): string {
        return myStore().store.getState().loggedState.client.name + " !";
    }

    function returnLogger(): JSX.Element {

        if (myStore().store.getState().loggedState.client.isLogged) {

            return (
                <div className="centerBlock">
                    <div>
                        <button onClick={logout} className="loggerButton">Logout</button>
                        <span className="" style={{ margin: "0px 0px 0px 10px" }}> Hello <NavLink className="genralLink" exact to={getMenu()}> {getUserName()}</NavLink></span>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="centerBlock">
                    <div>
                        <button onClick={handleClickOpen} className="loggerButton">Login</button>
                        <button onClick={() => { history.push("/registerPage") }} className="signUpButton">Register</button>
                    </div>
                </div>
            )
        }
    }

    return (
        <div className="loginHandler centerBlock">
            <div className="RightBlock">
                <div>
                    {returnLogger()}


                    {/* ------------------------------------------ */}

                    <Dialog open={open} onClose={handleClose}>
                        <DialogActions>
                            <Button onClick={handleClose}>X</Button>
                        </DialogActions>
                        <DialogTitle>Login</DialogTitle>
                        <br />
                        <DialogContent>

                            <div className="loginPage">
                                <div className="centerBlock">
                                    <div className="smallBox">
                                        <form onSubmit={handleSubmit(verify)}>
                                            <TextField label="Email" type="email" variant="outlined"  {...register("email", {
                                                required: { value: true, message: "Email is required" }
                                                , minLength: { value: 5, message: "Min length must be 5 characters" }
                                            })} />
                                            <br />
                                            <span> {errors.email && <span className="errorMSG">{errors.email.message}</span>} </span>
                                            <br /><br />

                                            <TextField
                                                label="Password"
                                                type="password"

                                                variant="outlined" {...register("password", {
                                                    required: { value: true, message: "Password is required" }
                                                    , minLength: { value: 5, message: "Min length must be 5 characters" }
                                                    , maxLength: { value: 16, message: "Min length must be 16 characters" }
                                                })} />

                                            <br />
                                            <span> {errors.password && <span className="errorMSG">{errors.password.message}</span>} </span>

                                            <br /><br />
                                            <Select
                                                defaultValue="CUSTOMER"
                                                style={{
                                                    width: 230,
                                                }}
                                                {...register("clientType", {
                                                    required: { value: true, message: "Client Type is required" }
                                                })}>
                                                <MenuItem value="" disabled selected hidden>Client Type</MenuItem>
                                                <MenuItem value="CUSTOMER">Customer</MenuItem>
                                                <MenuItem value="COMPANY">Company</MenuItem>
                                                <MenuItem value="ADMIN">Admin</MenuItem>
                                            </Select>
                                            <br />
                                            <span> {errors.clientType && <span className="errorMSG">{errors.clientType.message}</span>} </span>
                                            <br /><br />
                                            <div className="centerBlock">
                                                <button className="formButton" type="submit">Login</button>
                                                <button className="formButtonReset" type="reset">Reset</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </DialogContent>
                    </Dialog>

                </div>
            </div>
        </div>
    );
}

export default LoginHandler;




