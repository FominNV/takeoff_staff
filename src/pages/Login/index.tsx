import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTypedSelector } from "store";
import Form from "components/Form";
import { PATHS } from "routes/consts";

import "./styles.scss";

const Login: FC = () => {
  const { user } = useTypedSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate(PATHS.CONTACTS);
    }
  }, [user, navigate]);

  return (
    <div className="Login">
      <Form />
    </div>
  );
};

export default Login;
