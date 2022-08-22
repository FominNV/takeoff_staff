import Table from "components/Table";
import {
  ChangeEvent,
  FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo, useState,
} from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "routes/consts";
import { useTypedSelector } from "store";
import { getUserContacts, logoutUser } from "store/users/actions";

import "./styles.scss";

const Contacts: FC = () => {
  const { user, contacts } = useTypedSelector((state) => state.user);
  const [filterContacts, setFilterContacts] = useState<string>("");
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const filterOnChangeHandler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    setFilterContacts(e.currentTarget.value);
  }, []);

  const getContacts = useCallback<VoidFunc<number>>(async (userId) => {
    await dispatch(getUserContacts(userId));
  }, [dispatch]);

  const logoutCurrentUser = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user && location.pathname === "/takeoff_staff/contacts") {
      navigate(PATHS.LOGIN);
    } else if (!contacts && user && location.pathname === "/takeoff_staff/contacts") {
      getContacts(user.id);
    }
  }, [user, contacts, location.pathname, getContacts, navigate]);

  const contactsTable = useMemo<ReactNode>(() => (
    contacts && (
    <Table
      data={contacts}
      filter={filterContacts}
    />
    )
  ), [contacts, filterContacts]);

  return (
    <div className="Contacts">
      <input
        type="text"
        onChange={filterOnChangeHandler}
        value={filterContacts}
      />

      {contactsTable}
      <button
        className="Contacts__button-logout"
        onClick={logoutCurrentUser}
      >
        Logout
      </button>
    </div>
  );
};

export default Contacts;
