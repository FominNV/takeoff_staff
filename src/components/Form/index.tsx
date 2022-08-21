import classNames from "classnames";
import {
  ChangeEvent, FC, FormEvent, useCallback, useState,
} from "react";
import { useDispatch } from "react-redux";
import { useTypedSelector } from "store";
import { loginUser } from "store/users/actions";

import "./styles.scss";

const Form: FC = () => {
  const { error } = useTypedSelector((state) => state.user);
  const [username, setUsername] = useState<string>("User");
  const [password, setPassword] = useState<string>("password");
  const dispatch = useDispatch<any>();

  const loginOnchangeHadler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    if (e.currentTarget.value) setUsername(e.currentTarget.value);
  }, []);

  const passwordOnchangeHadler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    if (e.currentTarget.value) setPassword(e.currentTarget.value);
  }, []);

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>((e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  }, [username, password, dispatch]);

  const errorClassName = classNames("Form__error", {
    Form__error_active: error,
  });

  return (
    <form
      className="Form"
      onSubmit={onSubmitHandler}
    >
      <div className={errorClassName}>Invalid data</div>
      <input
        type="text"
        value={username}
        onChange={loginOnchangeHadler}
      />
      <input
        type="password"
        value={password}
        onChange={passwordOnchangeHadler}
      />
      <button className="Form__button">Submit</button>
    </form>
  );
};

export default Form;
