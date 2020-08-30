import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model'
import { select, Store } from '@ngrx/store';
import { AppState } from '../app.state';
import {FormControl,FormGroup,FormArray,FormBuilder} from "@angular/forms";
import * as CartActions from '../actions/product.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  //products: Observable<Product[]>;
  products: Product[] = [];
  public cartForm: FormGroup;
  public isCartDetailOpen:boolean=false;
  constructor(private store: Store<AppState>, private formBuilder : FormBuilder) { 
    // this.products = store.select('cartData');
     console.log(this.products);debugger
    store.pipe(select('cartData')).subscribe(data => {
      debugger
      console.log(data)
      this.products = data;
    });
   
  }

  ngOnInit(): void {
    this.cartForm = this.formBuilder.group({
      carts: new FormArray([
        // this.initItems()
      ])
    });
    // console.log(this.products);
    // this.store.pipe(select('cartData')).subscribe(data =>{debugger
    //   this.products = data;
    // } );
  }

  openCartDetails(products){
    this.isCartDetailOpen = true;
    console.log(products);debugger
    let control = <FormArray>this.cartForm.controls["carts"];
    //control.controls = []
    products.forEach((x, i) => {
      console.log(this.products[i]);
      control.push(
        this.formBuilder.group({
        id:products[i].id,  
        name:products[i].name,
        description:products[i].description,
        price:products[i].price,
        quantity:products[i].quantity,
        image:products[i].image,
        subTotal:products[i].price * products[i].quantity
        })
      );
      console.log(control);
    });

  }

  removeCartItem(product,i){
    console.log(product);
    const control = <FormArray>this.cartForm.get('carts');
    control.removeAt(i);
    this.store.dispatch(new CartActions.RemoveFromCart(product.value) )
  }

  getForm(cartForm) {
    //console.log(cartForm);
    return cartForm.controls.carts.controls;
  }
  addQuantity(i,item,event){
    console.log(i);
    console.log(event.target.value)
    console.log(item.value);
    const control = <FormArray>this.cartForm.get('carts');
    console.log(control);
    //control[i].controls.subTotal.setValue(event.target.value * item.value.price);
    const control1 = this.cartForm.get('carts')['controls'][i].get('subTotal');
    console.log(control1);
    let mul = event.target.value * item.value.price
    control1.setValue(mul)
    //this.myForm.controls["subcategory6"].setValue(event.target.value);
  }

}
