import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { ProductService } from 'src/app/State/Product/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.scss']
})
export class AdminProductsComponent implements OnInit {

  products:any;

  constructor(private productService:ProductService, private store:Store<AppState>) { }

  ngOnInit(): void {
    this.productService.getAllProducts();

    this.store.pipe(select((store)=>store.product)).subscribe((products)=>{
      console.log("Subscription triggered", products);
         //this.orderItems=orders.orders;
         this.products=products.products;
         console.log("cart store data",this.products)
        });
  }

}
