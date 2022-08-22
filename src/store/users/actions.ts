import Axios from "api/Axios";
import { URLS } from "api/Axios/data";
import {
  CreateContactType,
  DeleteContactType,
  GetUserContactsType,
  IContact,
  IResponse,
  IUserResponseData,
  UpdateContactType,
  UserActionTypes,
  UserFetchType,
  UserLogoutType,
} from "./types";

export const loginUser: UserFetchType = (data) => async (dispatch) => {
  const url = `${URLS.USER_LOGIN_URL}?username=${data.username}&password=${data.password}`;
  await Axios.get<IResponse, IResponse>(url)
    .then((response) => {
      const dataUser = response.data as IUserResponseData[];
      return dispatch({
        type: UserActionTypes.SET_USER,
        payload: { user: dataUser[0], error: false },
      });
    }).catch(() => dispatch({
      type: UserActionTypes.SET_USER,
      payload: { user: null, error: true },
    }));
};

export const logoutUser: UserLogoutType = () => ({
  type: UserActionTypes.LOGOUT_USER,
  payload: { user: null, contacts: null },
});

export const getUserContacts: GetUserContactsType = (userId) => (dispatch) => {
  const url = `${URLS.USER_CONTACTS_URL}?userId=${userId}`;

  return Axios.get<IResponse, IResponse>(url)
    .then((response) => {
      dispatch({
        type: UserActionTypes.GET_CONTACTS,
        payload: { contacts: response.data as IContact[], error: false },
      });
    }).catch(() => dispatch({
      type: UserActionTypes.GET_CONTACTS,
      payload: { contacts: null, error: true },
    }));
};

export const createContact: CreateContactType = (data) => (dispatch) => Axios.post<IResponse, IResponse>(
  URLS.USER_CONTACTS_URL,
  {
    userId: data.userId,
    name: data.name,
    phone: data.phone,
  },
)
  .then(() => dispatch({
    type: UserActionTypes.CREATE_CONTACT,
    payload: { error: false },
  })).catch(() => dispatch({
    type: UserActionTypes.CREATE_CONTACT,
    payload: { error: true },
  }));

export const updateContact: UpdateContactType = (contactId, data) => (dispatch) => {
  const url = `${URLS.USER_CONTACTS_URL}/${contactId}`;

  return Axios.put<IResponse, IResponse>(
    url,
    {
      userId: data.userId,
      name: data.name,
      phone: data.phone,
    },
  )
    .then((response) => {
      console.log(response);
      dispatch({
        type: UserActionTypes.UPDATE_CONTACT,
        payload: { error: false },
      });
    }).catch(() => dispatch({
      type: UserActionTypes.UPDATE_CONTACT,
      payload: { error: true },
    }));
};

export const deleteContact: DeleteContactType = (contactId) => (dispatch) => {
  const url = `${URLS.USER_CONTACTS_URL}/${contactId}`;

  return Axios.delete<IResponse, IResponse>(url)
    .then(() => dispatch({
      type: UserActionTypes.DELETE_CONTACT,
      payload: { error: false },
    })).catch(() => dispatch({
      type: UserActionTypes.DELETE_CONTACT,
      payload: { error: true },
    }));
};
