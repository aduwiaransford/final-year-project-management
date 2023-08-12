const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: {
          ...action.payload,
          isAdmin: action.payload.isAdmin, // Make sure this property is set correctly
        },
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGOUT":
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
