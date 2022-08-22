import { FetchContactType } from "components/Table/types";
import { MouseEvent } from "react";

export enum ConfigPopupMode {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
}

export interface IConfigPopupProps {
  mode: ConfigPopupMode
  show: boolean
  createContact: FetchContactType<string | number>
  updateContact: FetchContactType<string | number>
  closeConfigPopup: EventFunc<MouseEvent<HTMLButtonElement>>
  phone?: string
  name?: string
}

export type CheckType = () => boolean;
