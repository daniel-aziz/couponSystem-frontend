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
import Company from "../../../models/Company";
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { Dialog, DialogActions, DialogTitle, TextField } from "@mui/material";
import { SysErrs } from "../../../utils/SysErrs";
import validClient from "../../../utils/clientSecurity";



function AdminCompanies(): JSX.Element {

    const [companyData, setData] = useState<Company[]>([]);
    const [OneCompanyId, setId] = useState(0);
    const [open, setOpen] = useState(false);
    const [deleteId, setDeletedId] = useState("");

    const history = useHistory();

    const URLgetAll = globals.urls.administrator + "getAllCompanies/";
    const URLdeleteOne = globals.urls.administrator + "deleteCompany/";
    const PushGetOne = "adminOneCompany/";
    const PushUpdateOne = "adminUpdateCompany/"



    useEffect(() => {
        
        document.title = "Companies - FlashyCoupons";
        validClient("ADMIN")
        jwtAxios.post(URLgetAll)
            .then((response) => {
                setData(response.data)
                notify.success(SysErrs.DATA_RECIVED)
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error));
            })
    }, [Company]);

    function updateNumber(args: SyntheticEvent) {
        let companyId = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(companyId);
        if (parsed > 0) {
            setId(parsed)
        }
    }

    function searchCompany() {
        history.push(PushGetOne + OneCompanyId);
    }

    function getFullDetails(args: SyntheticEvent) {
        let companyId = (args.target as HTMLInputElement).value.toString();
        history.push(PushGetOne + companyId);
    }

    function updateCompany(args: SyntheticEvent) {
        let companyId = (args.target as HTMLInputElement).value.toString();
        history.push(PushUpdateOne + companyId);
    }

    function handleClickOpen(args: SyntheticEvent) {
        let companyId = (args.target as HTMLInputElement).value.toString();
        setDeletedId(companyId)
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
                notify.success(SysErrs.COMPANY_DELETED_SUCCESFULLY);
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error));
            });
    }

    return (
        <div className="adminCompanies">

            <div className="centerBlock">
                <h2 className="mainTitle">Browse All Companies</h2>
            </div>

            <br />

            <div>
                <div className="centerBlock">
                    <TextField label="Find company by ID" type="number" variant="outlined" onChange={updateNumber} />
                </div>
                <br />
                <div className="centerBlock">
                    <button className="formButton" onClick={searchCompany}>Search</button>
                </div>
            </div>
            <br />
            <br />
            <div className="centerBlock">
                <div style={{ width: "90%" }} className="">
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                            <TableHead>
                                <TableRow className="tableHead">
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">Full Details</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companyData.map((item) => (
                                    <TableRow
                                        hover role="checkbox" tabIndex={-1}
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.name}</TableCell>
                                        <TableCell align="left">{item.email}</TableCell>
                                        <TableCell align="left">{item.password}</TableCell>
                                        <TableCell align="left">
                                            <button onClick={getFullDetails} value={item.id}>Full Details</button>
                                        </TableCell>
                                        <TableCell align="left">
                                            <button onClick={updateCompany} value={item.id}>Update</button>
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
            <br /><br />
            <br /><br />

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

export default AdminCompanies;
