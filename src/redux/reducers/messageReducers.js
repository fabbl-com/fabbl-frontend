import {
  GET_MESSAGES_REQUEST,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_FAIL
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
      return {
        ...state,
        ...action.payload.messages,
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
