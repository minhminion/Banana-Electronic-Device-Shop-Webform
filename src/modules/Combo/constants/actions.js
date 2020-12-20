import { createAction } from "redux-actions";
import { MODULE_NAME } from "./models";

export const fetchCombosPending = createAction(`@${MODULE_NAME}/FETCH_COMBO_PENDING`);
export const setEmpty = createAction(`@${MODULE_NAME}/SET_EMPTY`);
export const fetchCombosSuccess  = createAction(`@${MODULE_NAME}/FETCH_COMBO_SUCCESS`);
export const fetchCombosFailure  = createAction(`@${MODULE_NAME}/FETCH_COMBO_FAILURE`);
