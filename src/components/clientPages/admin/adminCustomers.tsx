import { SyntheticEvent, useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useHistory } from "react-router";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JwtInterceptor";
import Customer from "../../../models/Customer";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { SysErrs } from "../../../utils/SysErrs";



function AdminCustomers(): JSX.Element {

    const [customerData, setData] = useState<Customer[]>([]);
    const [OneCustomerId, setId] = useState(0)
    const [open, setOpen] = useState(false);
    const [deleteId, setDeletedId] = useState("");

    const history = useHistory();

    const URLgetAll = globals.urls.administrator + "getAllCustomers/";
    const URLdeleteOne = globals.urls.administrator + "deleteCustomer/";
    const PushGetOne = "adminOneCustomer/";
    const PushUpdateOne = "adminUpdateCustomer/"



    useEffect(() => {

        document.title = "Customers - FlashyCoupons";

        jwtAxios.post(URLgetAll)
            .then((response) => {
                setData(response.data)
                notify.success(SysErrs.DATA_RECIVED)
            })
            .catch((error) => {
                
            })
    }, [Customer]);


    function updateCustomerId(args: SyntheticEvent) {
        let customerId = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(customerId);
        if (parsed > 0) {
            setId(parsed)
        }
    }

    function searchCustomer() {
        history.push(PushGetOne + OneCustomerId);
    }

    function getFullDetails(args: SyntheticEvent) {
        let customerId = (args.target as HTMLInputElement).value.toString();
        history.push(PushGetOne + customerId);
    }

    function updateCustomer(args: SyntheticEvent) {
        let customerId = (args.target as HTMLInputElement).value.toString();
        history.push(PushUpdateOne + customerId);
    }

    function handleClickOpen(args: SyntheticEvent) {
        let customerId = (args.target as HTMLInputElement).value.toString();
        setDeletedId(customerId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function agreeToDelete() {
        let URLdeleteOneFixed = URLdeleteOne + deleteId;
        setOpen(false);
        jwtAxios.delete(URLdeleteOneFixed)
            .then(() => {
                notify.success(SysErrs.CUSTOMER_DELETED_SUCCESFULLY);
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error));
            });
    }


    return (
        <div className="adminCustomers">

            <div className="centerBlock">
                <h2 className="mainTitle">Browse All Customers</h2>
            </div>

            <br />

            <div>
                <div className="centerBlock">
                    <TextField label="Find customer by ID" type="number" variant="outlined" onChange={updateCustomerId} />
                </div>
                <br />
                <div className="centerBlock">
                    <button className="formButton" onClick={searchCustomer}>Search</button>
                </div>
            </div>
            <br />
            <br />
            <div className="centerBlock">
                <div style={{ width: "90%" }} className="">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simpe table">
                            <TableHead>
                                <TableRow className="tableHead">
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Fitst Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">Full Details</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {customerData.map((item) => (
                                    <TableRow hover role="checkbox" tabIndex={-1}
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.firstName}</TableCell>
                                        <TableCell align="left">{item.lastName}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.password}</TableCell>
                                        <TableCell align="left">
                                            <button onClick={getFullDetails} value={item.id}>Full Details</button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <button onClick={updateCustomer} value={item.id} >Update</button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <button onClick={handleClickOpen} value={item.id} className="deleteButton">Delete</button>
                                        </TableCell>
                                    </TableRow>
                                ))}
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

export default AdminCustomers;
