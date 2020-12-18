import { MODULE_NAME as MODULE_AUTH } from "./Author/constants/models";
import authorReducer from "./Author/constants/reducer";

import { MODULE_NAME as MODULE_PRODUCT } from "./Products/constants/models";
import productReducer from "./Products/constants/reducer";

export const rootReducer = {
  [MODULE_AUTH]: authorReducer,
  [MODULE_PRODUCT]: productReducer,
}

export const rootModules = [
  MODULE_AUTH,
  MODULE_PRODUCT,
];
