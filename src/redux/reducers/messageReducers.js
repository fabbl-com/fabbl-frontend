import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL,
  SET_USER_MESSAGES
} from "../constants/messageActionTypes";

const initialState = {
  messages: [],
  error: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES_REQUEST:
      return { ...state, loading: true };
    case GET_MESSAGES_SUCCESS:
    case SET_USER_MESSAGES:
      return {
        ...state,
        ...action.payload,
        loading: false,
        error: null
      };
    case GET_MESSAGES_FAIL:
      return {
        ...state,
        messages: [],
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};
