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
  [actions.fetchCombosPending]: (state, action) => ({
    ...state,
    isLoading: true,
  }),
  [actions.fetchCombosSuccess]: (state, action) => ({
    ...state,
    isLoading: false,
    data: action.payload,
  }),
  [actions.fetchCombosFailure]: (state, action) => ({
    ...state,
    isLoading: false,
    error: action.payload,
  }),

};

export default handleActions(handler, initialState);
