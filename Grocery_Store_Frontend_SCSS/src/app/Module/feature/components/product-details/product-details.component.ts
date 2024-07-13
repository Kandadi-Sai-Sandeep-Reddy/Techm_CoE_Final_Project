import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { CartService } from 'src/app/State/Cart/cart.service';
import { ProductService } from 'src/app/State/Product/product.service';
import { vegPage1 } from 'src/Data/veg';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  selectedSize:any
  reviews=[1,1,1];
  relatedProducts:any;
  product:any
  productId:any
  constructor(private router :Router, private productService:ProductService,
    private activatedRoute:ActivatedRoute, private store:Store<AppState>,
    private cartService:CartService
  ) { }

  ngOnInit(): void {
    this.relatedProducts=vegPage1;
    const id= this.activatedRoute.snapshot.paramMap.get("id");

    this.productService.findProductsById(id);
    this.productId=id;

    this.store.pipe(select((store)=>store.product)).subscribe((product)=>{
      console.log("Subscription triggered", product);
         this.product=product?.product;
         console.log("store data",product.products )
        });


  }

  handleAddToCart(){
    console.log("selected size", this.selectedSize);

    const data={size:this.selectedSize, productId: this.productId}
    this.cartService.addItemToCart(data);

    this.router.navigate(['cart']);
    this.cartService.getCart();
  }

}
