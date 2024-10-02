import { useState } from "react";
import "./App.css";
import UserForm from "./components/UserForm";
import AdminPanel from "./components/AdminPanel";
import Auth from "./components/Auth";
import SubmitData from "./data/SubmitData";

function App() {
  const [form, setForm] = useState(false);
  const [login, setLogin] = useState(false);
  const [admin, setAdmin] = useState(false);
  return (
    <div className="bg-slate-500 p-5 text-2xl">
      {!form && (
        <UserForm
          setPanel={setLogin}
          statePanel={login}
          stateForm={form}
          setForm={setForm}
        />
      )}
      {admin && (
        <AdminPanel
          setPanel={setForm}
          statePanel={form}
          setAdmin={setAdmin}
          admin={admin}
        />
      )}
      {login && (
        <Auth
          setPanel={setLogin}
          statePanel={login}
          adminPanel={setAdmin}
          stateForm={setForm}
          form={form}
        />
      )}
      {/* <SubmitData /> */}
    </div>
  );
}

export default App;
