import CouponCompany from "./CouponCompany";



class Coupon {
    public id: number = 0; 
    public company:CouponCompany = new CouponCompany(); 
    public category:string = ""; 
    public title:string = ""; 
    public description: string = "";  
    public startDate: Date = new Date();  
    public endDate: Date = new Date(); 
    public amount:number = 0;
    public price:number = 0; 
    public image:string = ""; 
}

export default Coupon;