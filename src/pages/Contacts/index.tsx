import Table from "components/Table";
import {
  FC, MouseEvent, ReactNode, useCallback, useEffect, useMemo,
} from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { PATHS } from "routes/consts";
import { useTypedSelector } from "store";
import { getUserContacts, logoutUser } from "store/users/actions";

import "./styles.scss";

const Contacts: FC = () => {
  const { user, contacts } = useTypedSelector((state) => state.user);
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();

  const getContacts = useCallback<VoidFunc<number>>((userId) => {
    dispatch(getUserContacts(userId));
  }, [dispatch]);

  const logoutCurrentUser = useCallback<EventFunc<MouseEvent>>(() => {
    dispatch(logoutUser());
  }, [dispatch]);

  useEffect(() => {
    if (user === null && location.pathname === "/takeoff_staff/contacts") {
      navigate(PATHS.LOGIN);
    } else if (user && location.pathname === "/takeoff_staff/contacts") {
      getContacts(user.id);
    }
  }, [user, location.pathname, getContacts, navigate]);

  const contactsTable = useMemo<ReactNode>(() => (
    contacts && <Table data={contacts} />
  ), [contacts]);

  return (
    <div className="Contacts">
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
