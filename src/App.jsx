import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import AdminPanel from "./components/AdminPanel";
import Auth from "./components/Auth";
import SubmitData from "./data/SubmitData";

function App() {
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(true);
  const [admin, setAdmin] = useState(false);
  return (
    <div className="flex h-screen w-full items-center justify-center p-5 text-2xl">
      <div
        className={` ${!login ? "h-[95%] w-[90vw]" : "flex h-[40%] w-[65vw] justify-center sm:w-[55vw] lg:w-[40vw]"} `}
      >
        {/* {!form && (
        <UserForm
          setPanel={setLogin}
          statePanel={login}
          stateForm={form}
          setForm={setForm}
        />
      )} */}
        {admin && (
          <AdminPanel
            setPanel={setForm}
            statePanel={form}
            setAdmin={setAdmin}
            admin={admin}
          />
        )}
        {/* {login && ( */}
        {login && (
          <Auth
            setLogin={setLogin}
            statePanel={login}
            adminPanel={setAdmin}
            stateForm={setForm}
            form={form}
          />
        )}
        {/* )} */}
        {/* <SubmitData /> */}
      </div>
    </div>
  );
}

export default App;
