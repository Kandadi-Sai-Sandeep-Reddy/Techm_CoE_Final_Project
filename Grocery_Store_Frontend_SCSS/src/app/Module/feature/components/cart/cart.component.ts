import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { CartService } from 'src/app/State/Cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart=[1,1,1];
  cartItems:any;
  constructor(private router:Router, private cartService:CartService, private store:Store<AppState>) { }

  ngOnInit(): void {

    this.cartService.getCart();

    this.store.pipe(select((store)=>store.cart)).subscribe((cart)=>{
      console.log("Subscription triggered", cart);
         this.cartItems=cart.cartItems;
         console.log("cart store data",cart.cartItems )
        });

  }

  navigateToCheckout()
  {
    this.router.navigate(['checkout']);
  }

}
