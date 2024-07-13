import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { catchError, map, Observable, of } from "rxjs";
import { BASE_API_URL } from "src/app/config/api";
import { createOrderFailure, createOrderSuccess, getAllOrdersFailure, getAllOrdersSuccess, getOrderByIdFailure, getOrderByIdSuccess, getOrderHistoryFailure, getOrderHistoryRequest, getOrderHistorySuccess, updateOrderStatusFailure, updateOrderStatusRequest, updateOrderStatusSuccess } from "./order.action";
import { Order } from "src/app/Models/order.model";

@Injectable({
    providedIn:'root',
})

export class OrderService{

    private API_BASE_URL=BASE_API_URL;
    private headers;

    constructor(
        private store: Store,
        private http:HttpClient,
        private router: Router,
        private route:ActivatedRoute
    ){
        this.headers=new HttpHeaders({
            'Content-Type' : 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwt')}`,
        });
    }

    createOrder(reqData:any){
        console.log('create Order', reqData);
        const url = `${this.API_BASE_URL}/api/orders/`;
        return this.http.post(url, reqData, {headers : this.headers})
        .pipe(
            map((data:any)=>{
                console.log('created order',data.id);
                if(data.id){
                    this.router.navigate([`/checkout/payment/${data.id}`],{
                        queryParams:{ step: '3', order_id: data.id},
                    });
                }
                console.log('created order', data);
                return createOrderSuccess({order: data});
            }),
            catchError((error:any)=>{
                console.log('catch error', error);
                return of(
                    createOrderFailure(
                        error.response && error.response.data.message?
                    error.response.data.message: error.message
                    )
                );
            })
        ).subscribe((action) => this.store.dispatch(action));
    }

    getOrderById(orderId:string){
        console.log('create Order', orderId);
        const url = `${this.API_BASE_URL}/api/orders/${orderId}`;
        return this.http.get(url, {headers : this.headers})
        .pipe(
            map((data:any)=>{
                console.log('order By id',data);
                //console.log('created order', data);
                return getOrderByIdSuccess({order: data});
            }),
            catchError((error:any)=>{
                console.log('catch error', error);
                return of(
                    getOrderByIdFailure(
                        error.response && error.response.data.message?
                    error.response.data.message: error.message
                    )
                );
            })
        ).subscribe((action) => this.store.dispatch(action));
    }

    getOrderHistory(){
        const url = `${this.API_BASE_URL}/api/orders/user`;
        //this.store.dispatch(getOrderHistoryRequest());
        return this.http.get(url, {headers : this.headers})
        .pipe(
            map((data:any)=>{
                console.log('order history',data);
                //console.log('created order', data);
                return getOrderHistorySuccess({orders: data});
            }),
            catchError((error:any)=>{
                console.log('catch error', error);
                return of(
                    getOrderHistoryFailure(
                        error.response && error.response.data.message?
                    error.response.data.message: error.message
                    )
                );
            })
        ).subscribe((action) => this.store.dispatch(action));
    }


    getAllOrders(){
        const url = `${this.API_BASE_URL}/api/admin/orders/`;
        //this.store.dispatch(getOrderHistoryRequest());
        return this.http.get(url, {headers : this.headers})
        .pipe(
            map((data:any)=>{
                console.log('all orders',data);
                //console.log('created order', data);
                return getAllOrdersSuccess({orders: data});
            }),
            catchError((error:any)=>{
                console.log('catch error', error);
                return of(
                    getAllOrdersFailure(
                        error.response && error.response.data.message?
                    error.response.data.message: error.message
                    )
                );
            })
        ).subscribe((action) => this.store.dispatch(action));
    }



    updateOrderStatus(orderId: string, status: string): void {
        const url = `${this.API_BASE_URL}/api/admin/orders/${orderId}/${status}`;
        this.store.dispatch(updateOrderStatusRequest({ orderId }));
    
        this.http.put(url, {orderId, status}, { headers: this.headers })
            .pipe(
                map((data: any) => {
                    console.log(`Order ${orderId} status updated to ${status}`, data);
                    return updateOrderStatusSuccess({ order: data });
                }),
                catchError((error: any) => {
                    console.error(`Failed to update order ${orderId} status to ${status}`, error);
                    return of(updateOrderStatusFailure({ error: error.message }));
                })
            ).subscribe((action) => this.store.dispatch(action));
    }
    
    
    }
    