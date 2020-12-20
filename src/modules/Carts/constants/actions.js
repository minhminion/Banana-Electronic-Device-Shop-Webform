import { createAction } from "redux-actions";
import { MODULE_NAME } from './models'

export const addToCart = createAction(`${MODULE_NAME}_ADD_TO_CART`);
export const addAllToCart = createAction(`${MODULE_NAME}_ADD_ALL_TO_CART`);
export const decreaseQuantity = createAction(`${MODULE_NAME}_DECREASE_QUANTITY`);
export const deleteFromCart = createAction(`${MODULE_NAME}_DELETE_FROM_CART`);
export const deleteAllFromCart = createAction(`${MODULE_NAME}_DELETE_ALL_FROM_CART`)