import {
  ChangeEvent, FC, FormEvent, useCallback, useEffect, useState,
} from "react";
import classNames from "classnames";
import { ReactComponent as Close } from "assets/icons/close.svg";
import  { CheckType, ConfigPopupMode, IConfigPopupProps } from "./types";

import "./styles.scss";

const ConfigPopup: FC<IConfigPopupProps> = ({
  mode, show, name, phone, createContact, updateContact, closeConfigPopup,
}) => {
  const [innerName, setInnerName] = useState<string>("");
  const [innerPhone, setInnerPhone] = useState<string>("");
  const [nameError, setNameError] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<boolean>(false);

  const nameOnChangeHadler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    setInnerName(e.currentTarget.value);
  }, []);

  const phoneOnChangeHadler = useCallback<EventFunc<ChangeEvent<HTMLInputElement>>>((e) => {
    if (e.currentTarget.value === "" || Number(e.currentTarget.value)) {
      setInnerPhone(e.currentTarget.value);
    }
  }, []);

  const checkName = useCallback<CheckType>(() => {
    if (innerName.trim()) {
      setNameError(false);
      return true;
    }
    setNameError(true);
    return false;
  }, [innerName]);

  const checkPhone = useCallback<CheckType>(() => {
    if (innerPhone.trim()) {
      setPhoneError(false);
      return true;
    }
    setPhoneError(true);
    return false;
  }, [innerPhone]);

  const onSubmitHandler = useCallback<EventFunc<FormEvent>>((e) => {
    e.preventDefault();

    checkName();
    checkPhone();

    if (checkName() && checkPhone() && mode === ConfigPopupMode.CREATE) {
      createContact(innerName, Number(innerPhone));
      setInnerName("");
      setInnerPhone("");
    } else if (checkName() && checkPhone() && mode === ConfigPopupMode.UPDATE) {
      updateContact(innerName, Number(innerPhone));
      setInnerName("");
      setInnerPhone("");
    }
  }, [mode, innerName, innerPhone, checkName, checkPhone, createContact, updateContact]);

  useEffect(() => {
    if (name && phone) {
      setInnerName(name);
      setInnerPhone(phone);
    } else {
      setInnerName("");
      setInnerPhone("");
    }
  }, [name, phone]);

  useEffect(() => {
    if (nameError) {
      checkName();
    } else if (phoneError) {
      checkPhone();
    }
  }, [nameError, phoneError, checkName, checkPhone]);

  const buttonConfigName = mode === ConfigPopupMode.CREATE ? "Create" : "Edit";

  const configPopupClassName = classNames("ConfigPopup", {
    ConfigPopup_active: show,
  });

  const inputNameClassName = classNames("ConfigPopup__input", {
    ConfigPopup__input_error: nameError,
  });

  const inputPhoneClassName = classNames("ConfigPopup__input", {
    ConfigPopup__input_error: phoneError,
  });

  return (
    <div className={configPopupClassName}>
      <form
        className="ConfigPopup__form"
        onSubmit={onSubmitHandler}
      >
        <button
          className="ConfigPopup__button-close"
          onClick={closeConfigPopup}
        >
          <Close
            width={22}
            height={22}
          />
        </button>

        <label
          htmlFor="name"
          className="ConfigPopup__label"
        >
          Name
        </label>
        <input
          id="name"
          type="text"
          className={inputNameClassName}
          maxLength={25}
          value={innerName}
          onChange={nameOnChangeHadler}
        />

        <label
          htmlFor="phone"
          className="ConfigPopup__label"
        >
          Phone
        </label>
        <input
          id="phone"
          type="text"
          className={inputPhoneClassName}
          maxLength={15}
          value={innerPhone}
          onChange={phoneOnChangeHadler}
        />

        <button className="ConfigPopup__button">
          {buttonConfigName}
        </button>
      </form>
    </div>
  );
};

export default ConfigPopup;
