import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../../models/product.model'
import { Store } from '@ngrx/store';
import { AppState } from '../../app.state';
import * as CartActions from '../../actions/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  constructor(private store: Store<Product>) { }
  ngOnInit(): void {
  }
  addToCart(cartObj:Product) {
    console.log(this.product);
    console.log(cartObj);
    this.store.dispatch(new CartActions.AddToCart(cartObj) )
  }


}
