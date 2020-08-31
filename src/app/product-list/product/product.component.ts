import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model'
import { Store,select } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as CartActions from '../../actions/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  products: Product[] = [];

  constructor(private store: Store<AppState>) { 
    this.store.pipe(select('cartData')).subscribe((data:any)=> {
      this.products = data;
    });
  }

  ngOnInit(): void {
  }

  //Item adding to the cart
  addToCart(cartObj:Product) {
    let isItemExist = this.isItemExistInCart(this.products,cartObj.id);
    if(isItemExist){
      alert('This item already exist in cart')
    }else{
      this.store.dispatch(new CartActions.AddToCart(cartObj) )
    }
  }

 // To check item exist in the cart 
  isItemExistInCart(productArr, productId) {
    for(var i = 0; i < productArr.length; i++) {
      if (productArr[i].id === productId) {
        return true;
      }
    }
    return false;
  }

}
