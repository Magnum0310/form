import { useState } from "react";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Auth = ({ statePanel, setLogin, adminPanel, stateForm, form }) => {
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password,
      );
      setError("");
      adminPanel(true);
      setLogin(false);
      console.log(result);
    } catch (error) {
      setError(error.code);
      console.error(error.message);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 rounded-2xl bg-slate-500 md:w-3/4 xl:w-1/2">
      <p>Admin Panel Login</p>
      <form
        className="flex w-3/4 flex-col gap-5"
        onSubmit={(e) => e.preventDefault()}
      >
        <Input
          className="bg-slate-200"
          name="email"
          placeholder="email"
          type="text"
          value={userDetails.email}
          onChange={(e) =>
            setUserDetails((details) => ({
              ...details,
              email: e.target.value,
            }))
          }
        />
        <Input
          className="bg-slate-200"
          name="password"
          placeholder="Passwprd"
          type="password"
          value={userDetails.password}
          onChange={(e) =>
            setUserDetails((details) => ({
              ...details,
              password: e.target.value,
            }))
          }
        />
        {error && <p className="text-red-500">{error}</p>}
        <Button
          className="rounded-xl border-2 border-solid text-white hover:border-black hover:bg-white hover:text-black"
          onClick={() => handleLogin()}
        >
          Login
        </Button>

        {/* <Button
          onClick={() => {
            stateForm(!form);
            setLogin(!statePanel);
          }}
        >
          Form Panel
        </Button> */}
      </form>
    </div>
  );
};

export default Auth;
