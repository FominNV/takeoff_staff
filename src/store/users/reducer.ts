import { IUserState, UserAction, UserActionTypes } from "./types";

const initialState: IUserState = {
  user: null,
  contacts: null,
  error: false,
};

export function userReducer(
  state: IUserState = initialState,
  action: UserAction,
): IUserState {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        error: action.payload.error,
      };

    case UserActionTypes.SET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
      };

    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: action.payload.user,
        contacts: action.payload.contacts,
      };

    default:
      return state;
  }
}
