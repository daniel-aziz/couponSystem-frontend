import axios from "axios";
import Coupon from "../models/Coupon";
import globals from "../utils/Globals";

export class GuestState {
    public coupons: Coupon[] = [];
    public allcoupons: Coupon[] = [];
    

}

export enum GuestActionType {
    GetAllFromDB = "GetAllFromDB",
    GetAllByCategory = "GetAllByCategory",
    GetAllByPrice = "GetAllByPrice",
    SetAllAgain = "SetAllAgain",
}

// Action declaration
export interface GuestAction {
    type: GuestActionType,
    payload?: any,
}

// Action functions


export function getAllCouponsFromDB(): GuestAction {
    return { type: GuestActionType.GetAllFromDB, payload: null }
}

export function getAllCouponsByCategory(category: string): GuestAction {
    return { type: GuestActionType.GetAllByCategory, payload: category }
}

export function getAllCouponsByPrice(priceMin: number, priceMax: number): GuestAction {
    return { type: GuestActionType.GetAllByPrice, payload: { priceMin, priceMax } }
}

export function setAllCouponsAgain(): GuestAction {
    return { type: GuestActionType.SetAllAgain, payload: null }
}

// Reducer 
export function guestReducer(currentState: GuestState = new GuestState(), action: GuestAction): GuestState {
    const newState = { ...currentState };

    const URLAll = globals.urls.guest + "getAllCoupons/all"
    

    switch (action.type) {
        case GuestActionType.GetAllFromDB:
            axios.get(URLAll)
                .then(response => {
                    newState.coupons = response.data;
                    newState.allcoupons = response.data;;
                }).catch(error => {
            });
            break;
        case GuestActionType.GetAllByCategory:
            var resulte = newState.allcoupons.filter(item=> item.category == action.payload)
            newState.coupons = resulte;
        break;
        case GuestActionType.GetAllByPrice:
            var resulte = newState.allcoupons.filter
            (item => (item.price >= action.payload["priceMin"] && item.price <= action.payload["priceMax"]))
            newState.coupons = resulte;
        break;
        case GuestActionType.SetAllAgain:
            newState.coupons = newState.allcoupons;
        break;
    }
    return newState;
}




