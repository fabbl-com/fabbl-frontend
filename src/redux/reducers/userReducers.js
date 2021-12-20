const initialState = {
  users: "first"
};

export default (state = initialState, action) => {
  return {
    ...state,
    data: action.payload
  };
};
