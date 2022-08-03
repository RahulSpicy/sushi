export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const globalReducer = (state: any, action: { type: any }) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, authenticated: true, checkedAuth: true };
    case LOGOUT:
      return { ...state, authenticated: false, checkedAuth: true };
    default:
      return state;
  }
};
