import { Component, OnInit, Input } from '@angular/core';
import { CartService } from 'src/app/State/Cart/cart.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss']
})

export class CartItemComponent implements OnInit {

  @Input() cartItem:any;
  @Input() showButton:any;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
  }

  updateCartItem(num:Number){

    console.log("num",num);
    this.cartService.updateCartItem({
      cartItemId:this.cartItem.id,
      data:{quantity:num+this.cartItem.quantity}
    })

  }

  removeCartItem()
  {
    console.log("Removed car Item");
    this.cartService.removeCartItem(this.cartItem.id);
  }

}
