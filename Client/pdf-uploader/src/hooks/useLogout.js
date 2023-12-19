import React from "react";
import { useDispatch } from "react-redux";

import { removeData } from "../functions/localStorage";
import { logoutSucess, logoutFauilre } from "../redux/userLogin";

const useLogout = () => {
  const dispatch = useDispatch();
  return async () => {
    try {
      removeData();
      dispatch(logoutSucess());
    } catch (error) {
      console.log(error.message);
      dispatch(logoutFauilre(error.message));
    }
  };
};

export default useLogout;
