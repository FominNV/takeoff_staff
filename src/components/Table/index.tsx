import {
  FC, MouseEvent, ReactNode, useCallback, useMemo, useState,
} from "react";
import classNames from "classnames";
import { formatPhone } from "common";
import  { ITableProps } from "./types";

import "./styles.scss";

const Table: FC<ITableProps> = ({ data }) => {
  const [currentNumber, setCurrentNumber] = useState<Nullable<string>>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);

  const callNumber = useCallback<EventFunc<MouseEvent<HTMLTableRowElement>>>((e) => {
    setShowPopup(true);
    if (e.currentTarget.dataset.phone) {
      setCurrentNumber(e.currentTarget.dataset.phone);
    }
  }, []);

  const tbody = useMemo<ReactNode>(() => (
    data.map((elem, i) => {
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
          <td className="Table__td Table__w-40">{elem.name}</td>
          <td className="Table__td Table__w-40">{formatPhone(elem.phone.toString())}</td>
        </tr>
      );
    })
  ), [data, callNumber]);

  const popupClassName = classNames("Table__popup", {
    Table__popup_active: showPopup,
  });

  return (
    <div className="Table">
      <table className="Table__table">
        <thead>
          <tr>
            <th className="Table__th Table__w-20">No</th>
            <th className="Table__th Table__w-40">Name</th>
            <th className="Table__th Table__w-40">Phone</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </table>

      <div className={popupClassName}>
        <a
          href={`tel: ${currentNumber}`}
          className="Table__link"
          onClick={() => { setShowPopup(false); }}
        >
          Позвонить:
          {" "}
          {currentNumber && formatPhone(currentNumber?.toString())}
        </a>
        <button
          className="Table__button"
          onClick={() => { setShowPopup(false); }}
        >
          Отмена
        </button>
      </div>
    </div>
  );
};

export default Table;
