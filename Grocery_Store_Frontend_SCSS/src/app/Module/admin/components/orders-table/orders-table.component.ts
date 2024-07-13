import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { OrderService } from 'src/app/State/Order/order.service';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {

  orderItems:any;

  constructor(private orderService:OrderService, private store: Store<AppState>) { 
  }

  ngOnInit(): void {
    this.orderService.getAllOrders();

    this.store.pipe(select((store)=>store.order)).subscribe((orders)=>{
      console.log("Subscription triggered", orders);
         this.orderItems=orders.orders;
         console.log("cart store data",orders )
        });
  }

  changeOrderStatus(orderid:string, status: string){

    this.orderService.updateOrderStatus(orderid, status);
    
  }

}
