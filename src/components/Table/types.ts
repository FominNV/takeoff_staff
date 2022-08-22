import { IContact } from "store/users/types";

export interface ITableProps {
  data: IContact[]
  filter: string
}

export type FetchContactType<T> = (...arg: T[]) => void;
