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

export interface IContact {
  id: number
  name: string
  phone: number
}

export interface IUserContacts {
  userId: number
  book: IContact[]
}

export interface IResponse {
  data: IUserResponseData[] | IUserContacts[]
}

export enum UserActionTypes {
  SET_USER = "SET_USER",
  SET_CONTACTS = "SET_CONTACTS",
  LOGOUT_USER = "LOGOUT_USER",
}

export type UserFetchType = (data: IUserFetchData) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type GetUserContactsType = (userId: number) =>
(dispatch: Dispatch<UserAction>) => Promise<void>;

export type UserLogoutType = () => void;

type SetUserAction = {
  type: UserActionTypes.SET_USER,
  payload: { user: Nullable<IUser>, error: boolean };
};

type SetContactsAction = {
  type: UserActionTypes.SET_CONTACTS,
  payload: { contacts: Nullable<IContact[]> };
};

type LogoutUserAction = {
  type: UserActionTypes.LOGOUT_USER,
  payload: { user: null, contacts: null };
};

export type UserAction = SetUserAction | SetContactsAction | LogoutUserAction;
