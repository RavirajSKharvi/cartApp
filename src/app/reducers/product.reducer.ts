import { Action } from '@ngrx/store'
import { Product } from '../models/product.model'
import * as CartActions from './../actions/product.actions'

// Section 1
const initialState: Product[] = [{
    id:1,
    name:'string',
    description:'string',
    price:'any',
    quantity:1,
    image:'string'
}]

// Section 2
export function reducer(state: Product[] = [], action: CartActions.Actions) {

    // Section 3
    
    console.log(state);
    console.log(action);
    console.log(action.payload);
    debugger;
    switch(action.type) {
        case CartActions.ADD_TO_CART : return [...state, action.payload];
        case CartActions.REMOVE_FROM_CART :return state.filter((item,i) => item.id !== action.payload.id)
  
        default : return state;
    }
}