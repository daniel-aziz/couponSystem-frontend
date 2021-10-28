import Coupon from "../models/Coupon";
import notify from "../utils/Notify";
import { SysErrs } from "../utils/SysErrs";

export class CartState {
    public coupons: Coupon[] = [];

}

export enum CartActionType {
    AddToCart = "AddToCart",
    RemoveFromCart = "RemoveFromCart",
    ResetCart = "ResetCart",
}

// Action declaration
export interface CartAction {
    type: CartActionType,
    payload?: any,
}

// Action functions


export function addToCart(coupon: Coupon): CartAction {
    return { type: CartActionType.AddToCart, payload: coupon }
}

export function removeFromCart(id: number): CartAction {
    return { type: CartActionType.RemoveFromCart, payload: id }
}

export function resetCart(): CartAction {
    return { type: CartActionType.ResetCart, payload: null }
}

// Reducer 
export function cartReducer(currentState: CartState = new CartState(), action: CartAction): CartState {
    const newState = { ...currentState };

    switch (action.type) {
        case CartActionType.AddToCart:
            if (newState.coupons.includes(action.payload)) {
                notify.error(SysErrs.ALREADY_IN_CART)
            } else {
                notify.success(SysErrs.ADDED_TO_CART)
            newState.coupons.push(action.payload)
            }
            break;
        case CartActionType.RemoveFromCart:
            let index = newState.coupons.findIndex( item=> item.id == action.payload)
            newState.coupons.splice(index, 1)
            break;
        case CartActionType.ResetCart:
            newState.coupons = [];
            break
    }
    return newState;
}




