import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  isLoading: false,
  isEmpty: false,
  error: null,
  data: {},
  categories: [],
};

const handler = {
  [clearAll]: (state, action) => ({ ...initialState }),
  // FETCH MEMBER
  [actions.fetchProductsPending]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [actions.fetchProductsSuccess]: (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload,
  }),
  [actions.fetchProductsFailure]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),

  [actions.setCategories]: (state, action) => ({
    ...state,
    categories: action.payload
  })

};

export default handleActions(handler, initialState);
