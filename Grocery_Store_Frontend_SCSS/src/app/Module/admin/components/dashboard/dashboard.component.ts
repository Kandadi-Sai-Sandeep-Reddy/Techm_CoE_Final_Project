import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './adminDashboardService';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {


  orderCount: number=0;
  productCount: number=0;
  customerCount: number=0;

  constructor(private dashboardService: AdminDashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getOrderCount().subscribe(count => this.orderCount = count);
    this.dashboardService.getProductCount().subscribe(count => this.productCount = count);
    this.dashboardService.getCustomerCount().subscribe(count => this.customerCount = count);
  }
}
