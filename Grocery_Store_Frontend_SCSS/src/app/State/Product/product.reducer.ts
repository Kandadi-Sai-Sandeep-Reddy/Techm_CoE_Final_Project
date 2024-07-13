import { createReducer, on } from "@ngrx/store"
import { createProductFailure, createProductRequest, createProductSuccess, findProductByCategoryFailure, findProductByCategoryRequest, findProductByCategorySuccess, findProductByIdFailure, findProductByIdSuccess, getAllProductsFailure, getAllProductsSuccess, updateProductFailure, updateProductRequest, updateProductSuccess } from "./product.action"
import { getAllOrdersFailure, getAllOrdersRequest } from "../Order/order.action"

const initialState={
    products:[],
    loading:false,
    error:null,
    product:null,
}

export const productReducer=createReducer(
    initialState,
    on(findProductByCategoryRequest,
        getAllOrdersRequest,
        createProductRequest,
        updateProductRequest,
         (state)=>({
        ...state,
        loading:true,
        error:null,

    })),
    on(findProductByCategorySuccess,(state,{payload})=>({
        ...state,
        products: payload,
        content: payload.content,
        loading:false,
    })),
    on(findProductByIdSuccess,(state,{payload})=>({
        ...state,
        product: payload,
        loading:false,
    })),
    on(findProductByCategoryFailure,
        findProductByIdFailure,
        getAllProductsFailure,
        createProductFailure,
        updateProductFailure,
        (state,{error})=>({
        ...state,
       error:error,
        loading:false,
    })),

    on(getAllProductsSuccess,(state,{payload})=>({
        ...state,
        products: payload,
        product:payload,
        //content: payload.content,
        loading:false,
    })),

    on(createProductSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        payload,
      })),
      on(updateProductSuccess, (state, { payload }) => ({
        ...state,
        loading: false,
        error: null,
        payload,
      })),

)