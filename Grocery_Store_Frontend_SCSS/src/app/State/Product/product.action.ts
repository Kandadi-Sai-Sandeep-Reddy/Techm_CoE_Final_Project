import { createAction, props } from "@ngrx/store";

export const findProductByCategoryRequest= createAction(
    '[Product] Find Products By Category Request'
)

export const findProductByCategorySuccess= createAction(
    '[Product] Find Products By Category Success',
    props<{payload:any}>()
)

export const findProductByCategoryFailure= createAction(
    '[Product] Find Products By Category Failure',
    props<{error:any}>()
)

export const findProductByIdRequest= createAction(
    '[Product] Find Products By Id Request'
)

export const findProductByIdSuccess= createAction(
    '[Product] Find Products By Id Success',
    props<{payload:any}>()
)

export const findProductByIdFailure= createAction(
    '[Product] Find Products By Id Failure',
    props<{error:any}>()
)


export const getAllProductsRequest= createAction(
    '[Product] Get All Products Request'
)

export const getAllProductsSuccess= createAction(
    '[Product]  Get All Products Success',
    props<{payload:any}>()
)

export const getAllProductsFailure= createAction(
    '[Product]  Get All Products Failure',
    props<{error:any}>()
)

export const createProductRequest= createAction(
    '[Product] Create Products Request'
    , props<{payload:any}>
)

export const createProductSuccess= createAction(
    '[Product]  Create Products Success',
    props<{payload:any}>()
)

export const createProductFailure= createAction(
    '[Product]  Create Products Failure',
    props<{error:any}>()
)

export const updateProductRequest= createAction(
    '[Product] Create Products Request'
    , props<{payload:any}>
)

export const updateProductSuccess= createAction(
    '[Product]  Create Products Success',
    props<{payload:any}>()
)

export const updateProductFailure= createAction(
    '[Product]  Create Products Failure',
    props<{error:any}>()
)



