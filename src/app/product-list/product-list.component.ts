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
   products :Product[] = [];
   isData:boolean=false;
    ngOnInit(): void {
      this.getAllProducts()
    }

  getAllProducts(){
    this.productService.getProducts().subscribe((res:any)=>{
      if(res.data && res.data.length>0){
        this.products = res.data;
        this.isData = true;
      }else{
        this.isData = true;
      }
      
    },error=>{
      console.log('inside error',error)
    })
  }

}
