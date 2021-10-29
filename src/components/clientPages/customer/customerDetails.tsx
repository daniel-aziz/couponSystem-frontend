import { SyntheticEvent, useEffect, useState } from "react";
import errorHelper from "../../../utils/ErrorHelper";
import globals from "../../../utils/Globals";
import jwtAxios from "../../../utils/JwtInterceptor";
import notify from "../../../utils/Notify";
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, SelectChangeEvent, Table, TextField } from "@mui/material";
import Coupon from "../../../models/Coupon";
import { CategoriesList } from "../../../utils/CategoriesList";
import { myStore } from "../../../redux/Store";
import Customer from "../../../models/Customer";
import TagIcon from "../../../assets/img/tag-icon.png"




function CustomerDetails(): JSX.Element {

    const [customerData, setCustomerData] = useState<Customer>(new Customer())
    const [couponsData, setCouponsData] = useState<Coupon[]>([])

    const [minPriceState, setMinPrice] = useState(0);
    const [maxPriceState, setMaxPrice] = useState(0);
    const [categoryState, setCategory] = useState("");


    const URLgetCustomer = globals.urls.customer + "getCustomerDetails/";
    const URLgetAll = globals.urls.customer + "getAllCoupons/all/"
    const URLgetByCategory = globals.urls.customer + "getAllCoupons/category/" + categoryState;
    const URLgetByPrice = globals.urls.customer + "getAllCoupons/price/" + minPriceState + "/" + maxPriceState;


    function getName(): string {
        return myStore().store.getState().loggedState.client.name;
    }

    useEffect(() => {
        document.title = getName() + " Details - FlashyCoupons";
        jwtAxios.post(URLgetCustomer)
            .then((response) => {

                setCustomerData(response.data)

                jwtAxios.post(URLgetAll)
                    .then((response) => {
                        setCouponsData(response.data)
                    }).catch((error) => {

                    })

            }).catch((error) => {

            })

    }, [Customer])



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


    return (
        <div className="customerDetails">

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
                                    <TableCell align="left">First Name</TableCell>
                                    <TableCell align="left">Last Name</TableCell>
                                    <TableCell align="left">Email</TableCell>
                                    <TableCell align="left">Password</TableCell>
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
                                    <TableCell align="left">Company</TableCell>
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
                                        <TableCell align="left"><img className="TableCouponImg" src={item.image} onError={(args: SyntheticEvent) => {
                                            (args
                                                .target as HTMLImageElement).src = TagIcon
                                        }} /></TableCell>
                                        <TableCell align="left">{item.company.name}</TableCell>
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
        </div >
    );

}

export default CustomerDetails;