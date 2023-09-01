import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./AuthActions";

export const login = async (user, dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post("https://aamusted-api.onrender.com/login", user);
    dispatch(loginSuccess(res.data)); // res.data should include isAdmin property
    console.log(res.data);
    return res.data; // Return the response data
  } catch (err) {
    dispatch(loginFailure());
  }
};

