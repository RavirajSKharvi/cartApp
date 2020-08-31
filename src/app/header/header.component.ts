import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product.model'
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { FormGroup,FormArray,FormBuilder} from "@angular/forms";
import * as CartActions from '../actions/product.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  products: Product[] = [];
  public totalAmount:number=0;
  public cartForm: FormGroup;
  public isCartDetailOpen:boolean=false;
  constructor(private store: Store<AppState>, private formBuilder : FormBuilder) { 

    store.pipe(select('cartData')).subscribe((data:any)=> {
      this.products = data;
    });
   
  }

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      carts: new FormArray([])
    });
  }

  // To open the cart details
  openCartDetails(products){
    this.isCartDetailOpen = true;
    this.totalAmount=0;
    let control = <FormArray>this.cartForm.controls["carts"];
    control.controls = [];
    products.forEach((product,i) => {
      control.push(
        this.formBuilder.group({
        id:product.id,  
        name:product.name,
        description:product.description,
        price:product.price,
        quantity:product.quantity,
        image:product.image,
        subTotal:product.price * product.quantity
        })
      );
      this.totalAmount += parseFloat(product.price) * parseFloat(product.quantity);
    });
  }

  //To removing the cart item from UI and store
  removeCartItem(product,i){
    const control = <FormArray>this.cartForm.get('carts');
    control.removeAt(i);
    this.store.dispatch(new CartActions.RemoveFromCart(product.value));
    this.totalAmount=0;
    this.totalAmount = this.getTotalAmount(control.value);
  }


  //getting the form control
  getForm(cartForm) {
    return cartForm.controls.carts.controls;
  }

  //Calculating the price when quantity is added or removed
  addOrRemoveQuantity(i,item,event){
    const control1 = this.cartForm.get('carts')['controls'][i].get('subTotal');
    let mul = event.target.value * item.value.price
    control1.setValue(mul);
    const control = <FormArray>this.cartForm.get('carts');
    this.totalAmount = this.getTotalAmount(control.value)
  }

  //Getting total amount
  getTotalAmount(arr){
    return arr.reduce(function(prev, cur) {
      return prev + cur.subTotal;
    }, 0);
  }

}
