import Contacts from "pages/Contacts";
import Login from "pages/Login";
import { Route, Routes } from "react-router-dom";

import "./styles.scss";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="*"
          element={<Login />}
        />
        <Route
          path="/takeoff_staff/contacts"
          element={<Contacts />}
        />
      </Routes>
    </div>
  );
}

export default App;
