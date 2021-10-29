import { SyntheticEvent, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import Company from "../../../models/Company";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JwtInterceptor"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import notify from "../../../utils/Notify";
import errorHelper from "../../../utils/ErrorHelper";
import { SysErrs } from "../../../utils/SysErrs";
import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import TagIcon from "../../../assets/img/tag-icon.png"

function CompanyFullDetails(): JSX.Element {

    const [companyData, setCompanyData] = useState<Company>(new Company());
    const [open, setOpen] = useState(false);

    const { companyId } = useParams<{ companyId?: string }>();

    const history = useHistory();

    const URLdeleteOne = globals.urls.administrator + "deleteCompany/" + companyId;
    const URLgetOneCustomer = globals.urls.administrator + "getOneCompany/" + companyId;
    const PushUpdateOne = "adminUpdateCompany/" + companyId

    useEffect(() => {
        jwtAxios.post(URLgetOneCustomer)
            .then((response) => {
                setCompanyData(response.data)
                document.title = getName() + " Company - FlashyCoupons";
                notify.success(SysErrs.DATA_RECIVED)
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }, [Company]);

    function updateCompany() {
        history.push(PushUpdateOne);
    }

    function getName(): string {
        return companyData.name;
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
        <div className="companyFullDetails">
            <div className="centerBlock">
                <h2 className="mainTitle">{getName()}</h2>
            </div>

            <br />
            <br />

            <div className="leftBlock">
                <h3 className="subTitle">{getName()} Details </h3>
            </div>

            <div className="centerBlock">
                <div style={{ width: "90%" }} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                            <TableHead >
                                <TableRow className="tableHead">
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Password</TableCell>
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow
                                    hover role="checkbox" tabIndex={-1}
                                    key={companyData.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">{companyData.id}</TableCell>
                                    <TableCell align="left">{companyData.name}</TableCell>
                                    <TableCell align="left">{companyData.email}</TableCell>
                                    <TableCell align="left">{companyData.password}</TableCell>
                                    <TableCell align="left">
                                        <button onClick={updateCompany} >Update</button>
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

            <div className="leftBlock">
                <h3 className="subTitle">{getName()} Coupons </h3>
            </div>
            <div className="centerBlock">
                <div style={{ width: "90%" }} >
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 250 }} aria-label="simple table">
                            <TableHead >
                                <TableRow className="tableHead">
                                    <TableCell align="left">ID</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Title</TableCell>
                                    <TableCell align="left">Description</TableCell>
                                    <TableCell align="left">Start Date</TableCell>
                                    <TableCell align="left">End Date</TableCell>
                                    <TableCell align="left">Amout</TableCell>
                                    <TableCell align="left">Price</TableCell>
                                    <TableCell align="left">Image</TableCell>
                                    <TableCell align="left">Company</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {companyData.coupons.map((item) => (
                                    <TableRow
                                        hover role="checkbox" tabIndex={-1}
                                        key={item.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{item.id}</TableCell>
                                        <TableCell align="left">{item.category}</TableCell>
                                        <TableCell align="left">{item.title}</TableCell>
                                        <TableCell align="left">{item.description}</TableCell>
                                        <TableCell align="left">{item.startDate}</TableCell>
                                        <TableCell align="left">{item.endDate}</TableCell>
                                        <TableCell align="left">{item.amount} units</TableCell>
                                        <TableCell align="left">{item.price}$</TableCell>
                                        <TableCell align="left"><img className="TableCouponImg" src={item.image} onError={(args: SyntheticEvent) => {(args.target as HTMLImageElement).src = TagIcon}} /></TableCell>
                                        <TableCell align="left">{companyData.name}</TableCell>
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

export default CompanyFullDetails;
