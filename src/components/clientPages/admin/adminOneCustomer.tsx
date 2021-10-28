import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Customer from "../../../models/Customer";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JwtInterceptor"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { SysErrs } from "../../../utils/SysErrs";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";


function CustomerFullDetails(): JSX.Element {

    const [customerData, setCustomerData] = useState<Customer>(new Customer());
    const [open, setOpen] = useState(false);

    const { customerId } = useParams<{ customerId?: string }>();

    const history = useHistory();

    const URLdeleteOne = globals.urls.administrator + "deleteCustomer/" + customerId;
    const URLgetOneCustomer = globals.urls.administrator + "getOneCustomer/" + customerId;
    const PushUpdateOne = "adminUpdateCustomer/" + customerId


    useEffect(() => {
        jwtAxios.post(URLgetOneCustomer)
            .then((response) => {
                setCustomerData(response.data)
                document.title = getName() + " Customer - FlashyCoupons";
                notify.success(SysErrs.DATA_RECIVED)
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }, [Customer]);

    function updateCustomer() {
        history.push(PushUpdateOne);
    }


    function getName(): string {
        return customerData.firstName;
    }

    function handleClickOpen() {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function agreeToDelete() {
        jwtAxios.delete(URLdeleteOne)
            .then(() => {
                notify.success(SysErrs.COMPANY_DELETED_SUCCESFULLY);
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error));
            });
        setOpen(false);
    }


    return (
        <div className="customerFullDetails">

            <div className="centerBlock">
                <h2 className="mainTitle">{getName()}</h2>
            </div>
            <br />
            <br />
            <div className="leftBlock">
                <h3 className="subTitle">{getName()} Details </h3>
            </div>
            <div className="centerBlock">
                <div style={{ width: "90%" }}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                            <TableHead >
                                <TableRow className="tableHead">
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    hover role="checkbox" tabIndex={-1}
                                    key={customerData.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{customerData.id}</TableCell>
                                    <TableCell align="left">{customerData.firstName}</TableCell>
                                    <TableCell align="left">{customerData.lastName}</TableCell>
                                    <TableCell align="left">{customerData.email}</TableCell>
                                    <TableCell align="left">{customerData.password}</TableCell>
                                    <TableCell align="left">
                                        <button onClick={updateCustomer} >Update</button>
                                    </TableCell>
                                    <TableCell align="left">
                                        <button onClick={handleClickOpen} className="deleteButton">Delete</button>
                                    </TableCell>
                                </TableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <br />
            <br />
            <br />
            <br />

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Are you sure?"}
                </DialogTitle>
                <DialogActions>
                    <button className="formButtonReset" onClick={handleClose}>No</button>
                    <button className="formButton" onClick={agreeToDelete} autoFocus >Yes </button>
                </DialogActions>
            </Dialog>

        </div>

    );
}

export default CustomerFullDetails;
