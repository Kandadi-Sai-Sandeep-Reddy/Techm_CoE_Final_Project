import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";
import * as OrderActions from './order.action';

export interface OrderState{
    loading: boolean,
    error:any,
    order: any | null,
    orders: any[];
}

export const initialState: OrderState={
    loading: false,
    error:null,
    order: null,
    orders: [],
};

export const orderReducer= createReducer(
    initialState,

    on(OrderActions.createOrderRequest, (state)=>({
        ...state,
        loading:true,
        error:null,

    })),
    on(OrderActions.createOrderSuccess,(state, {order})=>({
        ...state,
        loading:false,
        order,
    })),
    on(OrderActions.createOrderFailure, (state, {error})=>({
        ...state,
        loading:false,
        error,

    })),

    
    on(OrderActions.getOrderByIdRequest,
        OrderActions.getOrderHistoryRequest,
        OrderActions.getAllOrdersRequest,
        OrderActions.updateOrderStatusRequest,
         (state)=>({
        ...state,
        loading:true,
        error:null,

    })),
    on(OrderActions.getOrderByIdSuccess,(state, {order})=>({
        ...state,
        loading:false,
        order,
    })),
    on(OrderActions.getOrderByIdFailure,
        OrderActions.getOrderHistoryFailure,
        OrderActions.getAllOrdersFailure,
        OrderActions.updateOrderStatusFailure,
          (state, {error})=>({
        ...state,
        loading:false,
        error,

    })),
    on(OrderActions.getOrderHistorySuccess,(state, {orders})=>({
        ...state,
        loading:false,
        orders,
    })),
    on(OrderActions.getAllOrdersSuccess,(state, {orders})=>({
        ...state,
        loading:false,
        orders,
    })),
    on(OrderActions.updateOrderStatusSuccess,(state, {order})=>({
        ...state,
        loading:false,
        order,
    })),




)