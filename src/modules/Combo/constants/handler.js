import {
  fetchCombosSuccess,
  fetchCombosFailure,
  fetchCombosPending,
} from "./actions";
import { fetch } from "../../../common/effects";
import { ENDPOINTS } from "./models";

const handler = (dispatch, props) => ({
  fetchCombo: async (params) => {
    try {
      dispatch(fetchCombosPending());
      const response = await fetch({
        url: ENDPOINTS.getCombos,
        method: "GET",
        params: {
          ...params,
        },
      });
      if (response.data && response.status === 200) {
        dispatch(fetchCombosSuccess(response.data.data));
        return response.data.data
      } else {
        dispatch(fetchCombosFailure("Lỗi không xác định !"));
      }
    } catch (error) {
      dispatch(fetchCombosFailure(error?.response?.data?.ApiErr));
    }
  },
  fetchSingleCombo: async (ComboId) => {
    try {
      const response = await fetch({
        url: ENDPOINTS.getSingleCombo(ComboId),
        method: "GET",
      });
      if (response.data && response.status === 200) {
        return response.data.data;
      } else {
        return false
      }
    } catch (error) {
      return false
    }
  },
});

export default handler