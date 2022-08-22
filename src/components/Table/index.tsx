import {
  FC, MouseEvent, ReactNode, useCallback, useMemo, useState,
} from "react";
import { useDispatch } from "react-redux";
import ConfigPopup from "components/ConfigPopup";
import classNames from "classnames";
import { formatPhone } from "common";
import { ConfigPopupMode } from "components/ConfigPopup/types";
import { ReactComponent as Create } from "assets/icons/create.svg";
import { ReactComponent as Edit } from "assets/icons/edit.svg";
import { ReactComponent as Delete } from "assets/icons/delete.svg";

import "./styles.scss";
import { useTypedSelector } from "store";
import {
  createContact, deleteContact, getUserContacts, updateContact,
} from "store/users/actions";
import  { FetchContactType, ITableProps } from "./types";

const Table: FC<ITableProps> = ({ data, filter }) => {
  const { user, contacts } = useTypedSelector((state) => state.user);
  const [currentNumber, setCurrentNumber] = useState<Nullable<string>>(null);
  const [showCallPopup, setShowCallPopup] = useState<boolean>(false);
  const [showConfigPopup, setShowConfigPopup] = useState<boolean>(false);
  const [configPopupMode, setConfigPopupMode] = useState<ConfigPopupMode>(ConfigPopupMode.UPDATE);
  const [contactId, setContactId] = useState<number>(0);
  const [defaultName, setDefaultName] = useState<string>("");
  const [defaultPhone, setDefaultPhone] = useState<string>("");
  const dispatch = useDispatch<any>();

  const callNumber = useCallback<EventFunc<MouseEvent<HTMLTableRowElement>>>((e) => {
    setShowCallPopup(true);
    if (e.currentTarget.dataset.phone) {
      setCurrentNumber(e.currentTarget.dataset.phone);
    }
  }, []);

  const activateCreatingConfigPopup = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => {
    setDefaultName("");
    setDefaultPhone("");
    if (e.currentTarget.dataset.id) {
      setContactId(Number(e.currentTarget.dataset.id));
    }
    setConfigPopupMode(ConfigPopupMode.CREATE);
    setShowConfigPopup(true);
  }, []);

  const activateUpdatingConfigPopup = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => {
    e.stopPropagation();

    if (e.currentTarget.dataset.id && contacts) {
      setContactId(Number(e.currentTarget.dataset.id));
      contacts.map((elem) => {
        if (elem.id === Number(e.currentTarget.dataset.id)) {
          setDefaultName(elem.name);
          setDefaultPhone(elem.phone.toString());
        }
      });
    }

    setConfigPopupMode(ConfigPopupMode.UPDATE);
    setShowConfigPopup(true);
  }, [contacts]);

  const closeConfigPopup = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>((e) => {
    e.preventDefault();
    setShowConfigPopup(false);
  }, []);

  const createNewContact = useCallback<FetchContactType<string | number>>(async (name, phone) => {
    if (user) {
      await dispatch(
        createContact({ userId: user.id, name: name as string, phone: Number(phone) }),
      );
      await dispatch(getUserContacts(user.id));
      setShowConfigPopup(false);
    }
  }, [user, dispatch]);

  const updateCurrentContact = useCallback<FetchContactType<string | number>>(async (name, phone) => {
    if (user) {
      await dispatch(
        updateContact(contactId, { userId: user.id, name: name as string, phone: Number(phone) }),
      );
      await dispatch(getUserContacts(user.id));
      setShowConfigPopup(false);
    }
  }, [user, contactId, dispatch]);

  const removeContact = useCallback<EventFunc<MouseEvent<HTMLButtonElement>>>(async (e) => {
    e.stopPropagation();

    if (user && e.currentTarget.dataset.id) {
      await dispatch(deleteContact(Number(e.currentTarget.dataset.id)));
      await dispatch(getUserContacts(user.id));
    }
  }, [user, dispatch]);

  const tbody = useMemo<ReactNode>(() => {
    let sortData = data.sort((a, b) => a.name.localeCompare(b.name));

    if (filter) {
      sortData = sortData.filter((elem) => elem.name.toLowerCase().includes(filter.toLowerCase()));
    }

    return sortData.map((elem, i) => {
      const trClassName = classNames("Table__tr", {
        Table__tr_even: ((i + 1) % 2 === 0),
      });
      return (
        <tr
          key={`tr__${elem.id}`}
          className={trClassName}
          data-phone={elem.phone}
          onClick={callNumber}
        >
          <td className="Table__td Table__w-20">{i + 1}</td>
          <td className="Table__td Table__w-30">{elem.name}</td>
          <td className="Table__td Table__w-30">{formatPhone(elem.phone.toString())}</td>
          <td className="Table__td Table__td_config Table__w-20">
            <button
              className="Table__button-edit"
              data-id={elem.id}
              onClick={activateUpdatingConfigPopup}
            >
              <Edit
                width={16}
                height={16}
              />
            </button>
            <button
              className="Table__button-delete"
              data-id={elem.id}
              onClick={removeContact}
            >
              <Delete
                width={16}
                height={16}
              />
            </button>
          </td>
        </tr>
      );
    });
  }, [data, filter, callNumber, removeContact, activateUpdatingConfigPopup]);

  const popupClassName = classNames("Table__popup", {
    Table__popup_active: showCallPopup,
  });

  return (
    <div className="Table">
      <table className="Table__table">
        <thead>
          <tr>
            <th className="Table__th Table__w-20">No</th>
            <th className="Table__th Table__w-30">Name</th>
            <th className="Table__th Table__w-30">Phone</th>
            <th className="Table__th Table__w-20">
              <button
                className="Table__button-create"
                onClick={activateCreatingConfigPopup}
              >
                <Create
                  width={30}
                  height={30}
                />
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>

      <div className={popupClassName}>
        <a
          href={`tel: ${currentNumber}`}
          className="Table__link"
          onClick={() => { setShowCallPopup(false); }}
        >
          Позвонить:
          {" "}
          {currentNumber && formatPhone(currentNumber?.toString())}
        </a>
        <button
          className="Table__button"
          onClick={() => { setShowCallPopup(false); }}
        >
          Отмена
        </button>
      </div>

      <ConfigPopup
        mode={configPopupMode}
        show={showConfigPopup}
        name={defaultName}
        phone={defaultPhone}
        createContact={createNewContact}
        updateContact={updateCurrentContact}
        closeConfigPopup={closeConfigPopup}
      />
    </div>
  );
};

export default Table;
