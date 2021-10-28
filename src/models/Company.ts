import Coupon from "./Coupon";

class Company {
    public id:number = 0;
    public name:string = "";
    public email:string = "";
    public password:string = "";
    public coupons:Coupon[] = [];
}

export default Company;