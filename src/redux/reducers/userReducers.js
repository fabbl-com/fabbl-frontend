/* eslint-disable no-case-declarations */
import {
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  SET_USER,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
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
  CHECK_AUTH_SUCCESS,
  CHECK_AUTH_FAIL,
  CHECK_AUTH_REQUEST,
  UPDATE_PROFILE_PREF_SUCCESS,
  UPDATE_PROFILE_PREF_FAIL,
  GET_USER_PROFILE,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_EMAIL_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  SET_NOTIFICATIONS,
  REOMVE_NOTIFICATIONS,
  SEND_RESET_PASSWORD_SUCCESS,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  SET_KEYS,
  SET_KEYS_1,
  GENDER_UPDATE_SUCCESS,
  GENDER_UPDATE_REQUEST,
  GENDER_UPDATE_FAIL,
  USER_UPLOAD_AVATAR_REQUEST
} from "../constants/userActionTypes";
const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const notifications = JSON.parse(localStorage.getItem("notifications"));

const initialState = {
  error: null,
  isAuth: userInfo?.isAuth || false,
  loading: false,
  authChecking: true,
  likes: [],
  profile: userInfo?.profile || {},
  notifications: notifications?.notifications || [],
  isEmailVerified: userInfo?.profile?.isEmailVerified || false,
  userId: localStorage.getItem("userId") || "",
  isFriends: false,
  privateKey: localStorage.getItem("privateKey")
    ? JSON.parse(localStorage.getItem("privateKey"))
    : null,
  publicKey: localStorage.getItem("publicKey")
    ? JSON.parse(localStorage.getItem("publicKey"))
    : null,
  accessToken: localStorage.getItem("accessToken") || null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GENDER_UPDATE_REQUEST:
    case USER_REGISTER_REQUEST:
    case USER_SIGNIN_REQUEST:
    case GET_ALL_USERS_REQUEST:
    case EMAIL_VERIFY_REQUEST:
    case SET_LIKES_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case CHECK_AUTH_REQUEST:
    case UPDATE_PROFILE_REQUEST:
    case USER_UPLOAD_AVATAR_REQUEST:
      return { ...state, loading: true };
    case USER_REGISTER_SUCCESS:
      localStorage.setItem("userId", action.payload.userId);
      localStorage.setItem("userInfo", JSON.stringify({ isAuth: true }));
      return {
        ...state,
        ...action.payload,
        userId: action.payload.userId,
        isAuth: true,
        isEmailSent: true,
        loading: false,
        error: null,
        isLoggedOut: false
      };
    case EMAIL_VERIFY_SUCCESS:
      localStorage.removeItem("userInfo");
      return {
        ...state,
        loading: false,
        isEmailVerified: true,
        error: null
      };
    case RESET_PASSWORD_SUCCESS:
    case SET_LIKES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        ...action.payload
      };
    case UPDATE_PROFILE_SUCCESS:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuth: true,
          profile: action.payload.profile
        })
      );
      return {
        ...state,
        loading: false,
        isAuth: true,
        authChecking: false,
        isProfileUpdated: true,
        ...action.payload
      };
    case CHECK_AUTH_SUCCESS:
    case USER_SIGNIN_SUCCESS:
      localStorage.setItem("theme", action.payload?.profile?.settings?.theme === 1);
      localStorage.setItem("userId", action.payload?.profile?._id);
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuth: true,
          profile: action.payload.profile
        })
      );
      localStorage.setItem(
        "notifications",
        JSON.stringify({ notifications: action.payload.notifications || [] })
      );
      localStorage.setItem("accessToken", action.payload.accessToken);
      localStorage.setItem("privateKey", action.payload.profile?.privateKey || "");
      localStorage.setItem("publicKey", action.payload.profile?.publicKey || "");
      return {
        ...state,
        loading: false,
        isAuth: true,
        authChecking: false,
        accessToken: action.payload.accessToken,
        userId: action.payload.profile._id,
        ...action.payload
      };
    case GENDER_UPDATE_SUCCESS:
      localStorage.setItem(
        "userInfo",
        JSON.stringify({
          isAuth: true,
          profile: action.payload.profile
        })
      );
      return {
        ...state,
        loading: false,
        profile: action.payload.profile
      };
    case USER_SIGNIN_FAIL:
    case USER_REGISTER_FAIL:
      localStorage.removeItem("userId");
      return {
        ...state,
        userInfo: null,
        isAuth: false,
        loading: false,
        error: action.payload
      };
    case EMAIL_VERIFY_FAIL:
      return {
        ...state,
        isEmailVerified: false,
        loading: false,
        error: action.payload
      };
    case RESET_PASSWORD_FAIL:
    case GET_ALL_USERS_FAIL:
    case SET_LIKES_FAIL:
    case USER_UPLOAD_AVATAR_FAIL:
    case GENDER_UPDATE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case UPDATE_PROFILE_FAIL:
    case CHECK_AUTH_FAIL:
      localStorage.removeItem("userId");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("notifications");
      localStorage.removeItem("accessToken");
      return {
        ...state,
        isAuth: false,
        loading: false,
        authChecking: false
      };
    case SET_USER:
      return {
        ...state,
        loading: false,
        userId: action.payload
      };
    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        messagedUsers: [...action.payload]
      };
    case USER_UPLOAD_AVATAR_SUCCESS:
      window.href = "/verify-voice";
      return {
        ...state,
        loading: false,
        isImageUploaded: true,
        userInfo: { ...state.userInfo, ...action.payload }
      };
    // case GET_USER_PROFILE:
    case UPDATE_PROFILE_PREF_SUCCESS:
      localStorage.setItem("theme", action.payload?.profile?.settings?.theme === 1);
      return {
        ...state,
        loading: false,
        isPrefUpdated: true,
        profile: action.payload.profile
      };
    case UPDATE_PROFILE_PREF_FAIL:
      return {
        ...state,
        loading: false,
        isPrefUpdated: false,
        error: action.payload
      };
    case UPDATE_PASSWORD_SUCCESS:
      return {
        ...state,
        isEmailSent: false,
        isPasswordUpdated: true,
        loading: false
      };

    case UPDATE_EMAIL_SUCCESS:
    case SEND_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        isEmailSent: true,
        isPasswordUpdated: false,
        loading: false
      };
    case UPDATE_PASSWORD_FAIL:
      return {
        ...state,
        isEmailSent: false,
        error: action.payload
      };
    case SET_NOTIFICATIONS:
      return {
        ...state,
        notifications: [action.payload, ...state.notifications]
      };
    case REOMVE_NOTIFICATIONS:
      const notif = state.notifications;
      const index = notif.findIndex((el) => el.notificationId === action.payload.notificationId);
      if (index !== -1) notif.splice(index, 1);
      return {
        ...state,
        notifications: notif
      };
    case LOGOUT_SUCCESS:
    case LOGOUT_FAIL:
      localStorage.removeItem("userInfo");
      localStorage.removeItem("notifications");
      localStorage.removeItem("userId");
      localStorage.removeItem("theme");
      localStorage.removeItem("privateKey");
      localStorage.removeItem("publicKey");
      localStorage.removeItem("accessToken");
      return {
        isAuth: false,
        loading: false,
        profile: {},
        notifications: [],
        isEmailVerified: false,
        userId: "",
        authChecking: false,
        ...action.payload
      };
    case SET_KEYS:
      localStorage.setItem("privateKey", JSON.stringify(action.payload.privateKey));
      localStorage.setItem("publicKey", JSON.stringify(action.payload.publicKey));
      return {
        ...state,
        ...action.payload
      };
    case SET_KEYS_1:
      localStorage.setItem("privateKey", action.payload.privateKey);
      localStorage.setItem("publicKey", action.payload.publicKey);
      return {
        ...state,
        privateKey: action.payload?.privateKey ? JSON.parse(action.payload?.privateKey) : null,
        publicKey: action.payload?.publicKey ? JSON.parse(action.payload?.publicKey) : null
      };
    default:
      return state;
  }
};
