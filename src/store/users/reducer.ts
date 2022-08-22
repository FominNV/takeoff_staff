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

    case UserActionTypes.LOGOUT_USER:
      return {
        ...state,
        user: action.payload.user,
        contacts: action.payload.contacts,
      };

    case UserActionTypes.GET_CONTACTS:
      return {
        ...state,
        contacts: action.payload.contacts,
        error: action.payload.error,
      };

    case UserActionTypes.CREATE_CONTACT:
      return {
        ...state,
        error: action.payload.error,
      };

    case UserActionTypes.UPDATE_CONTACT:
      return {
        ...state,
        error: action.payload.error,
      };

    case UserActionTypes.DELETE_CONTACT:
      return {
        ...state,
        error: action.payload.error,
      };

    default:
      return state;
  }
}
