import { Dispatch } from "react";

export interface IUserState {
  user: Nullable<IUser>;
  contacts:Nullable<IContact[]>
  error: boolean;
}

export interface IUser {
  id: number;
  username: string;
}

export interface IUserFetchData {
  username: string,
  password: string,
}

export interface IUserResponseData {
  id: number;
  username: string;
  password: string;
}

export interface IContactFetchData {
  userId: number;
  name: string;
  phone: number;
}

export interface IContact extends IContactFetchData {
  id: number
}

export interface IResponse {
  data: IUserResponseData[] | IContact[]
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  LOGOUT_USER = "LOGOUT_USER",
  GET_CONTACTS = "GET_CONTACTS",
  CREATE_CONTACT = "CREATE_CONTACT",
  UPDATE_CONTACT = "UPDATE_CONTACT",
  DELETE_CONTACT = "DELETE_CONTACT",
}

export type UserFetchType = (data: IUserFetchData) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type GetUserContactsType = (userId: number) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type CreateContactType = (data: IContactFetchData) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type UpdateContactType = (contactId: number, data: IContactFetchData) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type DeleteContactType = (contactId: number) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type UserLogoutType = () => void;

type SetUserAction = {
  type: UserActionTypes.SET_USER,
  payload: { user: Nullable<IUser>, error: boolean };
};

type LogoutUserAction = {
  type: UserActionTypes.LOGOUT_USER,
  payload: { user: null, contacts: null };
};

type GetContactsAction = {
  type: UserActionTypes.GET_CONTACTS,
  payload: { contacts: Nullable<IContact[]>, error: boolean };
};

type CreateContactAction = {
  type: UserActionTypes.CREATE_CONTACT,
  payload: { error: boolean; };
};

type UpdateContactAction = {
  type: UserActionTypes.UPDATE_CONTACT,
  payload: { error: boolean; };
};

type DeleteContactAction = {
  type: UserActionTypes.DELETE_CONTACT,
  payload: { error: boolean; };
};

export type UserAction =
  SetUserAction |
  GetContactsAction |
  LogoutUserAction |
  CreateContactAction |
  UpdateContactAction |
  DeleteContactAction;
