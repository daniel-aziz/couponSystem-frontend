import { SyntheticEvent, useEffect, useState } from "react";
import Company from "../../../models/Company";
import errorHelper from "../../../utils/ErrorHelper";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JwtInterceptor";
import notify from "../../../utils/Notify";
import { useHistory } from "react-router";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Dialog, DialogActions, DialogTitle, MenuItem, Select, SelectChangeEvent, Table, TextField } from "@mui/material";
import { SysErrs } from "../../../utils/SysErrs";
import Coupon from "../../../models/Coupon";
import { CategoriesList } from "../../../utils/CategoriesList";
import { myStore } from "../../../redux/Store";



function CompanyDetails(): JSX.Element {

    const [companyData, setCompanyData] = useState<Company>(new Company())
    const [couponsData, setCouponsData] = useState<Coupon[]>([])
    const [open, setOpen] = useState(false);
    const [deleteIdState, setDeletedId] = useState("");
    const [minPriceState, setMinPrice] = useState(0);
    const [maxPriceState, setMaxPrice] = useState(0);
    const [categoryState, setCategory] = useState("");

    const URLdeleteOne = globals.urls.company + "deleteCoupon/" + deleteIdState;
    const URLgetCompany = globals.urls.company + "getCompanyDetails/";
    const URLgetByCategory = globals.urls.company + "getAllCoupons/category/" + categoryState;
    const URLgetByPrice = globals.urls.company + "getAllCoupons/price/" + minPriceState + "/" + maxPriceState;
    const PushUpdateOne = "updateCoupon/";

    const history = useHistory();

    function getName(): string {
        return myStore().store.getState().loggedState.client.name;
    }

    useEffect(() => {
        document.title = getName() + " Details - FlashyCoupons";
        jwtAxios.post(URLgetCompany)
            .then((response) => {
                setCompanyData(response.data)
                setCouponsData(response.data["coupons"])
            }).catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }, [Company])

    

    function getByCategory() {
        jwtAxios.post(URLgetByCategory)
            .then((response) => {
                setCouponsData(response.data)
            }).catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }

    function getByPrice() {
        jwtAxios.post(URLgetByPrice)
            .then((response) => {
                setCouponsData(response.data)
            }).catch((error) => {
                notify.error(errorHelper.getMSG(error))
            })
    }


    function updateCouponId(args: SyntheticEvent) {
        let couponId = (args.target as HTMLInputElement).value.toString();
        history.push(PushUpdateOne + couponId);
    }

    function updateNumberMin(args: SyntheticEvent) {
        let minPrice = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(minPrice);
        if (parsed >= 0) {
            setMinPrice(parsed)
        }
    }

    function updateNumberMax(args: SyntheticEvent) {
        let maxPrice = (args.target as HTMLInputElement).value.toString();
        let parsed = parseInt(maxPrice);
        if (parsed >= 0) {
            setMaxPrice(parsed)
        }
    }

    function updateCategory(event: SelectChangeEvent) {
        let category = (event.target.value as string).toString();
        setCategory(category)

    }

    function agreeToDelete() {
        jwtAxios.delete(URLdeleteOne)
            .then(() => {
                notify.success(SysErrs.COUPON_DELETED_SUCCESFULLY);
            })
            .catch((error) => {
                notify.error(errorHelper.getMSG(error));
            });
        setOpen(false);
    }

    function handleClickOpen(args: SyntheticEvent) {
        let couponId = (args.target as HTMLInputElement).value.toString();
        setDeletedId(couponId)
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div className="companyDetails">

            <div className="centerBlock">
                <h2 className="mainTitle">{getName()} Panel</h2>
            </div>
            <br />
            <div className="leftBlock">
                <h3 className="subTitle">{getName()} Details: </h3>
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
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>

            <br />

            <div className="leftBlock">
                <h3 className="subTitle">{getName()} Coupons: </h3>
            </div>

            <div>
                <div className="leftBlock">
                    <h5 className="subTitle"> Sort By Category </h5>

                    {/*----- CATEGORY ------*/}

                    <Select
                        onChange={updateCategory}
                        style={{ width: "250px" }}
                    >
                        <MenuItem value="" disabled selected hidden>Category</MenuItem>
                        <MenuItem value={CategoriesList.Automotive}>Automotive</MenuItem>
                        <MenuItem value={CategoriesList.Beauty}>Beauty</MenuItem>
                        <MenuItem value={CategoriesList.Clothing}>Clothing</MenuItem>
                        <MenuItem value={CategoriesList.Electronics}>Electronics</MenuItem>
                        <MenuItem value={CategoriesList.Entertainment}>Entertainment</MenuItem>
                        <MenuItem value={CategoriesList.Financial}>Financial</MenuItem>
                        <MenuItem value={CategoriesList.Fitness}>Fitness</MenuItem>
                        <MenuItem value={CategoriesList.Food}>Food</MenuItem>
                        <MenuItem value={CategoriesList.Garden}>Garden</MenuItem>
                        <MenuItem value={CategoriesList.General}>General</MenuItem>
                        <MenuItem value={CategoriesList.Gifts}>Gifts</MenuItem>
                        <MenuItem value={CategoriesList.Health}>Health</MenuItem>
                        <MenuItem value={CategoriesList.Home}>Home</MenuItem>
                        <MenuItem value={CategoriesList.Jewelry}>Jewelry</MenuItem>
                        <MenuItem value={CategoriesList.Travel}>Travel</MenuItem>
                    </Select>
                    <button style={{ marginLeft: "10px", width: "80px", height: "55px" }} className="formButton" onClick={getByCategory}>Send</button>
                </div>
            </div>
            <div >
                <div className="leftBlock">
                    <h5 className="subTitle"> Sort By Price </h5>
                    <TextField style={{ width: "120px" }} label="Min" type="number" variant="outlined" onChange={updateNumberMin} />
                    <TextField style={{ marginLeft: "10px", width: "120px" }} label="Max" type="number" variant="outlined" onChange={updateNumberMax} />
                    <button style={{ marginLeft: "10px", width: "80px", height: "55px" }} className="formButton" onClick={getByPrice}>Send</button>
                </div>
            </div>
            <br />
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
                                    <TableCell align="left">Update</TableCell>
                                    <TableCell align="left">Delete</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {couponsData.map((item) => (
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
                                        <TableCell align="left"><img className="TableCouponImg" src={item.image} /></TableCell>
                                        <TableCell align="left">
                                            <button onClick={updateCouponId} value={item.id} >Update</button>
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


            <br />
            <br />
            <br />
        </div >
    );

}

export default CompanyDetails;