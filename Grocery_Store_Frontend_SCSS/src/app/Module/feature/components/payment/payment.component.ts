import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/Models/AppState';
import { OrderService } from 'src/app/State/Order/order.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  products=[1,1,1];
  order:any
  constructor( private activatedRoute:ActivatedRoute,
    private router:Router,
    private orderService: OrderService,
  private store: Store<AppState>) { }

  ngOnInit(): void {
    let id=this.activatedRoute.snapshot.paramMap.get("id")
    if(id){
      this.orderService.getOrderById(id);
    }

    this.store.pipe(select(store=>store.order)).subscribe((order)=>{
      this.order=order.order
    })

  }

  navigateTo()
  {
    this.router.navigate([""]);
  }

}
