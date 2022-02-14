import Axios from "axios";

import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNOUT,
  SET_USER,
  EMAIL_VERIFY_REQUEST,
  EMAIL_VERIFY_SUCCESS,
  EMAIL_VERIFY_FAIL,
  SET_LIKES_REQUEST,
  SET_LIKES_SUCCESS,
  SET_LIKES_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_UPLOAD_AVATAR_SUCCESS,
  USER_UPLOAD_AVATAR_FAIL,
  UPDATE_PROFILE
} from "../constants/userActionTypes";

export const register = (userId) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post("/auth/register", userId);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const login = (userId) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: userId });
  try {
    const { data } = await Axios.post("/auth/login", userId);
    console.log(data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const signout = () => async (dispatch) => {
  localStorage.removeItem("userId");
  dispatch({ type: USER_SIGNOUT });
  document.location.href = "/signin";
};

export const setUser = (userId) => async (dispatch) => {
  dispatch({ type: SET_USER, payload: userId });
  localStorage.setItem("userId", userId);
};

export const verifyEmail = (token) => async (dispatch) => {
  dispatch({ type: EMAIL_VERIFY_REQUEST });
  try {
    const { data } = await Axios.get(`/user/verify-email/${token}`);
    console.log(data);
    dispatch({ type: EMAIL_VERIFY_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: EMAIL_VERIFY_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const setLikes = (data) => async (dispatch) => {
  console.log(data);
  dispatch({ type: SET_LIKES_REQUEST });
  try {
    dispatch({ type: SET_LIKES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SET_LIKES_FAIL, payload: error.message });
  }
};

export const resetPassword =
  ({ userId, password }) =>
  async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      const { data } = await Axios.post(`/user/update-password/${userId}`, {
        newPassword: password
      });
      dispatch({ type: RESET_PASSWORD_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
      dispatch({
        type: RESET_PASSWORD_FAIL,
        payload: {
          code: error.response.status,
          message:
            error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
        }
      });
    }
  };

export const uploadAvatar = (image) => async (dispatch) => {
  const userId = "6200f0a715496207e5a84a75";
  var formData = new FormData();
  formData.append("data", image);
  try {
    const { data } = await Axios.post(`/user/upload/image/${userId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    console.log(data);
    dispatch({ type: USER_UPLOAD_AVATAR_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_UPLOAD_AVATAR_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const updateProfile = (formData) => async (dispatch) => {
  const userId = "6200f0a715496207e5a84a75";
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };

    const res = await Axios.put(`/user/profile/${userId}`, formData, config);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_UPLOAD_AVATAR_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};
