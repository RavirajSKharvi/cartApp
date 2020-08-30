import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product.model'
import { ProductServiceService } from '../product-service.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  constructor(private productService : ProductServiceService) { }

  //@Input() products: Product[] = [];
   products :Product[] = [];
  //products: Observable<Product[]>;
  ngOnInit(): void {
    this.getAllProducts()
  }

  getAllProducts(){
    this.productService.getProducts().subscribe((res:any)=>{
      console.log(res);
      this.products = res.data;
    },error=>{
      console.log('inside error',error)
    })
  }

}
