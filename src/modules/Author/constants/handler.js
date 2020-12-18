import { loadingUser, fetchUserSuccess, setError } from "./actions";
import { fetch } from "../../../common/effects";
import { ENDPOINTS } from "./models";

const handler = (dispatch, props) => ({
  login: async (data) => {
    try {
      dispatch(loadingUser());
      const response = await fetch({
        url: ENDPOINTS.loginUser,
        method: "POST",
        data,
      });
      if (response.data && response.status === 200) {
        dispatch(fetchUserSuccess(response.data.data));
      } else {
        dispatch(
          setError({
            ApiErr: "Lỗi không xác định",
          })
        );
      }
    } catch (error) {
      if (error.response?.data) {
        dispatch(setError(error.response.data));
      } else {
        setError({
          ApiErr: "Lỗi không xác định",
        });
      }
    }
  },
  register: async (data) => {
    try {
      const response = await fetch({
        url: ENDPOINTS.registerUser,
        method: "POST",
        data,
      });
      if (response.data && response.status === 200) {
        return true;
      } else {
        return {
          ApiErr: "Lỗi không xác định",
        };
      }
    } catch (error) {
      if (error.response?.data) {
        return error.response.data;
      } else {
        return {
          ApiErr: "Lỗi không xác định",
        };
      }
    }
  },
});

export default handler;
