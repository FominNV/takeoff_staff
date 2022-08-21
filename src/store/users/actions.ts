import Axios from "api/Axios";
import { URLS } from "api/Axios/data";
import {
  GetUserContactsType,
  IContact,
  IResponse,
  IUser,
  IUserContacts,
  IUserResponseData,
  UserActionTypes,
  UserFetchType,
  UserLogoutType,
} from "./types";

export const loginUser: UserFetchType = (data) => async (dispatch) => {
  const response = await Axios.get<IResponse, IResponse>(URLS.USER_LOGIN_URL);
  const users = response.data as IUserResponseData[];
  let result: Nullable<IUser> = null;

  users.map((elem) => {
    if (
      elem.username.toLocaleLowerCase() === data.username.toLocaleLowerCase()
      && elem.password === data.password
    ) {
      result = { id: elem.id, username: elem.username };
    }
    return result;
  });

  if (result !== null) {
    return dispatch({
      type: UserActionTypes.SET_USER,
      payload: { user: result, error: false },
    });
  }
  return dispatch({
    type: UserActionTypes.SET_USER,
    payload: { user: null, error: true },
  });
};

export const getUserContacts: GetUserContactsType = (userId) => async (dispatch) => {
  const response = await Axios.get<IResponse, IResponse>(URLS.USER_CONTACTS_URL);
  const contactsData = response.data as IUserContacts[];
  let contacts: IContact[] = [];

  contactsData.map((elem) => {
    if (elem.userId === userId) {
      contacts = elem.book;
    }
    return contacts;
  });

  return dispatch({
    type: UserActionTypes.SET_CONTACTS,
    payload: { contacts },
  });
};

export const logoutUser: UserLogoutType = () => ({
  type: UserActionTypes.LOGOUT_USER,
  payload: { user: null, contacts: null },
});
