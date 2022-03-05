import { genKeys } from "../../lib/hashAlgorithm";
import Axios from "../api";

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
  UPDATE_PROFILE_PREF_SUCCESS,
  GET_USER_PROFILE,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  SET_NOTIFICATIONS,
  REOMVE_NOTIFICATIONS,
  SEND_RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  RESET_PASSWORD_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_KEYS,
  SET_KEYS_1,
  GENDER_UPDATE_REQUEST,
  GENDER_UPDATE_SUCCESS,
  GENDER_UPDATE_FAIL
} from "../constants/userActionTypes";
import { setAlert } from "./alert";
export const register = (user) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST });
  try {
    const { data } = await Axios.post("/auth/register", user);
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    // dispatch(setAlert("Successfully registered. Please verify your email..", "success"));
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
    dispatch(
      setAlert(
        error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
        "error"
      )
    );
  }
};

export const login = (user) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await Axios.post("/auth/login", user);
    console.log(data);
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    dispatch({
      type: SET_KEYS_1,
      payload: { privateKey: data?.profile?.privateKey, publicKey: data?.profile?.publicKey }
    });
    dispatch(setAlert("User successfully Logged in", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
    dispatch(
      setAlert(
        error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
        "error"
      )
    );
  }
};

export const googleLogin = () => async (dispatch) => {
  try {
    const { data } = await Axios.get("/auth/google");
    console.log(data);
  } catch (error) {
    console.log(error, error.response);
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
      dispatch(setAlert("Profile successfully updated", "success"));
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
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
    }
  };
export const checkAuth = () => async (dispatch) => {
  dispatch({ type: CHECK_AUTH_REQUEST });
  try {
    const publicKey = localStorage.getItem("publicKey");
    const privateKey = localStorage.getItem("privateKey");

    const keys = await genKeys();

    const body = {
      publicKey: publicKey ? null : keys?.publicKey,
      privateKey: privateKey ? null : keys?.privateKey
    };

    const { data } = await Axios.post("/auth/check", body);
    console.log(data, keys);
    dispatch({ type: CHECK_AUTH_SUCCESS, payload: data });
    if (data?.isKeysUpdated) {
      dispatch({ type: SET_KEYS, payload: keys });
    } else {
      dispatch({
        type: SET_KEYS_1,
        payload: { privateKey: data?.profile?.privateKey, publicKey: data?.profile?.publicKey }
      });
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
      const res = await Axios.post(`/user/profile/${userId}`, data);
      console.log(res.data);
      dispatch({
        type: UPDATE_PROFILE_PREF_SUCCESS,
        payload: res.data
      });
      dispatch(setAlert("Profile Pref successfully registered", "success"));
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
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
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
      console.log(data);
      await Axios.post(`/user/send-update-email/${id}`, { email: data });
      dispatch({
        type: UPDATE_EMAIL_SUCCESS
      });
      dispatch(setAlert("Email successfully Updated", "success"));
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
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
    }
  };

export const updatePassword =
  ({ data, id }) =>
  async (dispatch) => {
    try {
      console.log(data);
      await Axios.post(`/user/update-password/${id}`, data);
      dispatch({
        type: UPDATE_PASSWORD_SUCCESS
      });
      dispatch(setAlert("Password successfully Updated", "success"));
    } catch (error) {
      console.log(error);
      dispatch({
        type: UPDATE_PASSWORD_FAIL,
        payload: {
          code: error.response.status,
          message:
            error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
        }
      });
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
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
      dispatch(setAlert("Email successfully sent", "success"));
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
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
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
      dispatch(setAlert("Password successfully Updated", "success"));
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
      dispatch(
        setAlert(
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
          "error"
        )
      );
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

export const verifyGender = (gender) => async (dispatch) => {
  dispatch({ type: GENDER_UPDATE_REQUEST });
  try {
    const { data } = await Axios.post("/user/verify-gender", { gender });
    console.log(data);
    dispatch({ type: GENDER_UPDATE_SUCCESS, payload: data });
    dispatch(setAlert("Gender successfully updated", "success"));
  } catch (error) {
    console.log(error);
    dispatch({
      type: GENDER_UPDATE_FAIL,
      payload: {
        code: error.response.status,
        message:
          error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message
      }
    });
    dispatch(
      setAlert(
        error.reponse && error.reponse.data.message ? error.reponse.data.message : error.message,
        "error"
      )
    );
  }
};
