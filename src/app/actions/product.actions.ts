
import { Action } from '@ngrx/store';
import { Product } from '../models/product.model';

export const ADD_TO_CART       = '[CART] Add'
export const REMOVE_FROM_CART    = '[CART] Remove'

export class AddToCart implements Action {
    readonly type = ADD_TO_CART

    constructor(public payload: Product) {
        console.log(payload);
    }
}

export class RemoveFromCart implements Action {
    readonly type = REMOVE_FROM_CART

    constructor(public payload: Product) {
        console.log(payload);
    }
}

export type Actions = AddToCart | RemoveFromCart