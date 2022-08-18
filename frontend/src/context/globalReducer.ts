export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const globalReducer = (state: any, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.user, checkedAuth: true };
    case LOGOUT:
      return { ...state, user: null, checkedAuth: true };
    default:
      return state;
  }
};
