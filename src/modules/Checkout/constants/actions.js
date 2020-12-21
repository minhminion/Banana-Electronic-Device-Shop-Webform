import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const loadingOrder = createAction(`@${MODULE_NAME}/LOADING_ORDER`)
export const createOrderFailure = createAction(`@${MODULE_NAME}/CREATE_ORDER_FAILURE`)
export const createOrderSuccess = createAction(`@${MODULE_NAME}/CREATE_ORDER_SUCCESS`)