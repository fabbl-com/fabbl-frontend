import Axios from "axios";
import { genKeys } from "../../lib/hashAlgorithm";

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
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  USER_UPLOAD_AVATAR_SUCCESS,
  USER_UPLOAD_AVATAR_FAIL,
  CHECK_AUTH_REQUEST,
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAIL,
  UPDATE_PROFILE_PREF,
  GET_USER_PROFILE,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  SET_NOTIFICATIONS,
  REOMVE_NOTIFICATIONS,
  SEND_RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  RESET_PASSWORD_REQUEST,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_KEYS
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

export const uploadAvatar =
  ({ userId, data }) =>
  async (dispatch) => {
    var formData = new FormData();
    formData.append("data", data);
    try {
      const res = await Axios.post(`/user/upload/image/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      console.log({ formData, data });
      dispatch({ type: USER_UPLOAD_AVATAR_SUCCESS, payload: res.data });
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

export const updateProfile =
  ({ data, userId }) =>
  async (dispatch) => {
    // dispatch({ type: USER_REGISTER_REQUEST });
    try {
      const res = await Axios.post(`/user/profile/personal/${userId}`, data);
      dispatch({
        type: UPDATE_PROFILE_SUCCESS,
        payload: res.data?.profile
      });
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: {
          code: error.response.status,
          message:
            error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
        }
      });
    }
  };
export const checkAuth = () => async (dispatch) => {
  dispatch({ type: CHECK_AUTH_REQUEST });
  try {
    const publicKey = localStorage.getItem("publicKey");

    const keys = await genKeys();

    const body = {
      publicKey: publicKey ? null : keys?.publicKey
    };

    const { data } = await Axios.post("/auth/check", body);
    console.log(data, keys);
    dispatch({ type: CHECK_AUTH_SUCCESS, payload: data });
    if (data?.isPublicKeyUpdated) {
      dispatch({ type: SET_KEYS, payload: keys });
    }
  } catch (error) {
    console.log(error.response);
    dispatch({
      type: CHECK_AUTH_FAIL,
      payload: {
        code: error.response?.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};

export const updateProfilePref =
  ({ data, userId }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      const res = await Axios.post(`/user/profile/${userId}`, data, config);
      dispatch({
        type: UPDATE_PROFILE_PREF,
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

export const getUserProfile = (userId) => async (dispatch) => {
  try {
    const res = await Axios.get(`/user/profile/${userId}`);
    dispatch({
      type: GET_USER_PROFILE,
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

export const updateEmail =
  ({ data, id }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      console.log(data);
      await Axios.post(`/user/send-update-email/${id}`, { email: data }, config);
      dispatch({
        type: UPDATE_EMAIL_SUCCESS
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

export const updatePassword =
  ({ data, id }) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      };
      console.log(data);
      await Axios.post(`/user/update-password/${id}`, data, config);
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS
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

export const setNotifications = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: SET_NOTIFICATIONS, payload: data });
};

export const removeNotifications = (data) => (dispatch) => {
  console.log(data);
  dispatch({ type: REOMVE_NOTIFICATIONS, payload: data });
};

export const sendResetPasswordEmail =
  ({ email }) =>
  async (dispatch) => {
    try {
      await Axios.post(`/user/send-reset-password-email`, { email });

      dispatch({ type: SEND_RESET_PASSWORD_SUCCESS });
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

export const resetPassword =
  ({ token, password }) =>
  async (dispatch) => {
    dispatch({ type: RESET_PASSWORD_REQUEST });
    try {
      const { data } = await Axios.post(`/user/change-password`, {
        newPassword: password,
        token
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

export const logout = () => async (dispatch) => {
  // dispatch({ type: LOGOUT_REQUEST });
  try {
    const { data } = await Axios.post("/auth/logout");
    console.log(data);
    dispatch({ type: LOGOUT_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: LOGOUT_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
  }
};
