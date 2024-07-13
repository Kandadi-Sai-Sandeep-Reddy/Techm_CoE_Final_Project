import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { Order } from 'src/app/Models/order.model';
import { OrderService } from 'src/app/State/Order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {

  orderFilter=[
    {value:'on-the_way', label:'On the Way'},
    {value:'delivered', label:'Delivered'},
    {value:'cancelled', label:'Cancelled'},
    {value:'returned', label:"Returned"},
  ];
  orders:any;
  orderItems:Order[]=[];
  constructor(private router:Router, private orderService: OrderService, private store:Store<AppState>) { }

  ngOnInit(): void {
    //this.orderService.getOrderById();
    this.orderService.getOrderHistory();
    this.store.pipe(select((store)=>store.order)).subscribe((orders)=>{
      console.log("Subscription triggered", orders);
      this.orders=orders;
         this.orderItems=orders;
         console.log("cart store data",orders )
        });
  }

  navigateToOrderDetails=(id:Number)=>{

    this.router.navigate(['order/${id}']);
  }

}
