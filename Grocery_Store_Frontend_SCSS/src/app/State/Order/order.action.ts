import { createAction, props } from "@ngrx/store";

export const createOrderRequest= createAction(
    '[Order] Create Order  Request',
    props<{reqData:any}>()
);

export const createOrderSuccess= createAction(
    '[Order] Create Order Success',
    props<{order:any}>()
);


export const createOrderFailure= createAction(
    '[Order] Create Order Failure',
    props<{error:any}>()
);

export const getOrderByIdRequest= createAction(
    '[Order] Get Order By Id Request',
    props<{orderId: string}>()
);

export const getOrderByIdSuccess= createAction(
    '[Order] Get Order By Id Success',
    props<{order : any}>()
);

export const getOrderByIdFailure= createAction(
    '[Order] Get Order By Id Failure',
    props<{error : any}>()
);


export const getOrderHistoryRequest= createAction(
    '[Order] Get Order History Request',
    
);

export const getOrderHistorySuccess= createAction(
    '[Order] Get Order History Success',
    props<{orders : any}>()
);

export const getOrderHistoryFailure= createAction(
    '[Order] Get Order History Failure',
    props<{error : any}>()
);

export const getAllOrdersRequest= createAction(
    '[Order] Get All Orders Request',
);

export const getAllOrdersSuccess= createAction(
    '[Order] Get All Orders Success',
    props<{orders : any}>()
);

export const getAllOrdersFailure= createAction(
    '[Order] Get All Orders Failure',
    props<{error : any}>()
);



export const updateOrderStatusRequest= createAction(
    '[Order] Update Order Status Request',
    props<{orderId: string}>()
);

export const updateOrderStatusSuccess= createAction(
    '[Order] Update Order Status Success',
    props<{order : any}>()
);

export const updateOrderStatusFailure= createAction(
    '[Order] Update Order Status Failure',
    props<{error : any}>()
);


