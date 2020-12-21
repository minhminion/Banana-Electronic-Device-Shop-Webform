import { clearAll } from "../../../common/redux/actions/uiActions";
import { handleActions } from "redux-actions";
import * as actions from "./actions";

const initialState = {
  isLoading: false,
  errors: [],
  isSuccess: false,
};

const handler = {
  [clearAll]: (state, action) => initialState,
  [actions.loadingOrder]: (state, action) => ({
    isLoading: true,
    errors: [],
    isSuccess: false,
  }),
  [actions.createOrderSuccess]: (state, action) => ({
    isLoading: false,
    errors: [],
    isSuccess: true,
  }),
  [actions.createOrderFailure]: (state, action) => ({
    isLoading: false,
    errors: action.payload,
    isSuccess: false,
  }),
};

export default handleActions(handler, initialState);
