import { MODULE_NAME as MODULE_AUTH } from "./Author/constants/models";
import authorReducer from "./Author/constants/reducer";

import { MODULE_NAME as MODULE_PRODUCT } from "./Products/constants/models";
import productReducer from "./Products/constants/reducer";

import { MODULE_NAME as MODULE_CART } from "./Carts/constants/models";
import cartReducer from "./Carts/constants/reducer";

export const rootReducer = {
  [MODULE_AUTH]: authorReducer,
  [MODULE_PRODUCT]: productReducer,
  [MODULE_CART]: cartReducer,
};

export const rootModules = [MODULE_AUTH, MODULE_PRODUCT, MODULE_CART];
