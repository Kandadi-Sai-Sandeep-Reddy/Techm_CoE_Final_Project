import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private baseUrl = 'http://localhost:5454/api/admin/dashboard';

  constructor(private http: HttpClient) { }

  getOrderCount(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/orders/count`);
  }

  getProductCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/products/count`);
  }

  getCustomerCount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/customers/count`);
  }
}
