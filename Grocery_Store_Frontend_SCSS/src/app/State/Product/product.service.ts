import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, of } from 'rxjs';
import { BASE_API_URL } from 'src/app/config/api';
import { createProductFailure, createProductSuccess, findProductByCategoryFailure, findProductByCategorySuccess, findProductByIdFailure, findProductByIdSuccess, getAllProductsFailure, getAllProductsSuccess, updateProductFailure, updateProductSuccess } from './product.action';
import { AppState } from 'src/app/Models/AppState';
import { getAllOrdersFailure } from '../Order/order.action';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;

  private getHeader(): HttpHeaders {
    const token = localStorage.getItem('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  findProductsByCategory(reqData: any) {
    const {
      colors,
      sizes,
      minPrice,
      maxPrice,
      minDiscount,
      category,
      stock,
      sort,
      pageNumber,
      pageSize,
    } = reqData;

    let params = new HttpParams()
      .set('color', colors)
      .set('size', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category)
      .set('stock', stock)
      .set('sort', sort)
      .set("pageNumber",pageNumber)
      .set("pageSize",pageSize);

      const headers=this.getHeader();

      return this.http.get(`${this.API_BASE_URL}/api/products`,{headers,params}).pipe(
        map((data:any)=>{
            console.log("products data",data)
            console.log("content in Service", data.content);
            return findProductByCategorySuccess({payload:data});
        }),
        catchError((error:any)=>{
            return of(findProductByCategoryFailure
                (
                    error.response && error.response.data.message? error.response.data.message: error.message
                )
            );
        })
      ).subscribe((action)=>this.store.dispatch(action));
  }


  findProductsById(productId: any) {

      const headers=this.getHeader();

      return this.http.get(`${this.API_BASE_URL}/api/products/id/${productId}`,{headers}).pipe(
        map((data:any)=>{
            console.log("products details",data)
            return findProductByIdSuccess({payload:data})
        }),
        catchError((error:any)=>{
            return of(findProductByIdFailure
                (
                    error.response && error.response.data.message? error.response.data.message: error.message
                )
            );
        })
      ).subscribe((action)=>this.store.dispatch(action));
  }


  getAllProducts(){

    const {
      colors='',
      sizes = '',
      minPrice = '',
      maxPrice = '',
      minDiscount = '',
      category = '',
      stock = '',
      sort = '',
      pageNumber = 0,
      pageSize = 10, // Default page size
    } = {};

    const colorsArray = ['red', 'blue', 'green'];
    // Initialize HttpParams
    let params = new HttpParams()
      .set('size', sizes)
      .set('minPrice', minPrice)
      .set('maxPrice', maxPrice)
      .set('minDiscount', minDiscount)
      .set('category', category)
      .set('stock', stock)
      .set('sort', sort)
      .set('pageNumber', pageNumber.toString()) // Convert to string
      .set('pageSize', pageSize.toString()); // Convert to string

      if (colorsArray.length > 0) {
        colorsArray.forEach(color => {
          params = params.append('colors', color);
        });
      }

    const headers=this.getHeader();

      return this.http.get(`${this.API_BASE_URL}/api/admin/products/all-products`,{headers,params}).pipe(
        map((data:any)=>{
            console.log("products details",data)
            return getAllProductsSuccess({payload:data})
        }),
        catchError((error:any)=>{
            return of(getAllProductsFailure
                (
                    error.response && error.response.data.message? error.response.data.message: error.message
                )
            );
        })
      ).subscribe((action)=>this.store.dispatch(action));
  }

  createProduct(reqData:any)
  {

    const headers=this.getHeader();
    console.log(reqData);

      return this.http.post(`${this.API_BASE_URL}/api/admin/products/`,reqData,{headers}).pipe(
        map((data:any)=>{
            console.log("products data",data)
            console.log("content in Service", data.content);
            return createProductSuccess({payload:data});
        }),
        catchError((error:any)=>{
            return of(createProductFailure
                (
                    error.response && error.response.data.message? error.response.data.message: error.message
                )
            );
        })
      ).subscribe((action)=>this.store.dispatch(action));
  }

  updateProduct(reqData:any)
  {

    const headers=this.getHeader();

      return this.http.post(`${this.API_BASE_URL}/api/admin/products/${reqData.productId}/update`,reqData,{headers}).pipe(
        map((data:any)=>{
            console.log("products data",data)
            console.log("content in Service", data.content);
            return updateProductSuccess({payload:data});
        }),
        catchError((error:any)=>{
            return of(updateProductFailure
                (
                    error.response && error.response.data.message? error.response.data.message: error.message
                )
            );
        })
      ).subscribe((action)=>this.store.dispatch(action));
  }
  




  

}
