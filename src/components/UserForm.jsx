import { Fragment, useState, React } from "react";
import SubmitData from "../data/SubmitData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const Inputs = ({ index, name, placeholder, type, value, handleChange }) => {
  return (
    <Input
      className="bg-slate-200"
      key={index}
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => handleChange(e)}
    />
  );
};

const UserForm = ({ statePanel, setPanel, stateForm, setForm }) => {
  //===============STATES===============//

  //=====Guest details=====//
  const [guest, setGuest] = useState({
    firstName: "",
    lastName: "",
    companion: false,
    numberOfAttendees: 0,
    nameOfCompanions: [],
  });

  const [updateStatus, setUpdateStatus] = useState({
    success: false,
    error: false,
  });

  //=====Check Errors=====//
  const [errors, setErrors] = useState();

  //=====Accept Invite=====//
  const [invite, setInvite] = useState(2);

  //=====Confirm companion=====//
  const [plusOne, setPlusOne] = useState(false);

  //=====Verify form=====//
  const [verify, setVerify] = useState(false);

  //=====State Details=====//
  const [details, setDetails] = useState({
    home: false,
    verify: false,
    submit: false,
    load: false,
  });

  //=====Handle checkbox=====//
  const handleCheckbox = () => {
    setGuest((guest) => ({
      ...guest,
      companion: !guest.companion,
      nameOfCompanions: [],
      numberOfAttendees: 0,
    }));
    setCompanion("");
    setErrors((errors) => ({ ...errors, companion: "" }));
    setPlusOne(!plusOne);
  };

  //=====Handle Name Details=====//
  const handleChange = (e) => {
    setGuest(() => ({ ...guest, [e.target.name]: e.target.value }));
  };

  //=====Add Companion=====//
  const [companion, setCompanion] = useState("");

  //=====Handle Companion=====//
  const handleCompanion = (e) => {
    setCompanion(() => e.target.value);
  };

  //=====Handle add companion=====//
  const handleAddCompanion = () => {
    const error = {};
    const validate = /^\s*$/;

    if (validate.test(companion) || companion.length < 3) {
      error.companion = "Must have at least 3 characters";
      setErrors((errors) => ({ ...errors, ...error }));
      return;
    }

    if (Object.keys(error).length === 0) {
      setErrors((errors) => ({ ...errors, companion: "" }));
      setGuest((guest) => ({
        ...guest,
        nameOfCompanions: [...guest.nameOfCompanions, companion],
        numberOfAttendees: guest.numberOfAttendees + 1,
      }));
      setCompanion("");
    }
  };

  //=====Handle submit form=====//
  const handleSubmit = () => {
    const newErrors = {};
    const validateName = /^[A-Za-z0-9 ]{3,}$/;

    if (!validateName.test(guest.firstName)) {
      newErrors.firstName =
        "Enter a valid first name. Must have at least 3 characters and no special characters";
    }
    if (!validateName.test(guest.lastName)) {
      newErrors.lastName =
        "Enter a valid last name. Must have at least 3 characters and no special characters";
    }
    setErrors((errors) => ({ ...errors, ...newErrors }));

    if (Object.keys(newErrors).length === 0) {
      console.log("Submit");
      setErrors((errors) => ({ ...errors, firstName: "", lastName: "" }));
      setDetails((details) => ({ ...details, submit: true }));
      return;
    }
  };

  //=====Handle verify form=====//
  const handleVerifyForm = () => {
    setDetails((details) => ({ ...details, load: true }));
    setTimeout(() => {
      setDetails((details) => ({ ...details, verify: true }));
    }, 3000);
  };

  //=====Handle home=====//
  const handleHomePage = () => {
    setInvite(2);
    setGuest({
      firstName: "",
      lastName: "",
      companion: false,
      numberOfAttendees: 0,
      nameOfCompanions: [],
    });
    setDetails({ home: false, verify: false, submit: false, load: false });
    setPlusOne(false);
    // setDetails((details)=>({}))
  };

  return (
    <div className="relative flex h-full w-[50rem] flex-col justify-center gap-5">
      <div>
        <div className="relative z-10 flex w-full justify-evenly">
          <Button onClick={() => setInvite(1)}>Accept</Button>
          <Button onClick={() => setInvite(0)}>Decline</Button>
          <Button
            onClick={() => {
              setForm(!stateForm);
              setPanel(!statePanel);
            }}
          >
            Admin Panel
          </Button>
        </div>
        {/* Accept invitation */}
        <form
          className="flex size-full flex-col gap-2 bg-red-500/0 py-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <Label htmlFor="firstName" className="pl-2 text-left">
            Firstname
          </Label>
          <Inputs
            id="firstName"
            name="firstName"
            placeholder="First name"
            type="text"
            value={guest.firstName}
            handleChange={handleChange}
          />
          {errors?.firstName && (
            <p className="text-base">{errors?.firstName}</p>
          )}
          <Label htmlFor="lastName" className="pl-2 text-left">
            Lastname
          </Label>
          <Inputs
            id="lastName"
            name="lastName"
            placeholder="Last name"
            type="text"
            value={guest.lastName}
            handleChange={handleChange}
          />
          {errors?.lastName && <p className="text-base">{errors?.lastName}</p>}
          {/* Verify Plus One */}
          <div className="flex w-full items-center justify-center gap-5">
            <label htmlFor="companion">Any companions?</label>
            <input
              type="checkbox"
              className="size-[2rem]"
              checked={plusOne}
              onChange={() => handleCheckbox()}
            />
          </div>
          {/* Add full name of companion */}
          <div
            className={` ${plusOne ? "block" : "hidden"} flex w-full justify-center gap-5 py-2`}
          >
            <Inputs
              placeholder="Full name"
              value={companion}
              handleChange={handleCompanion}
            />
            <Button
              type="submit"
              onClick={() => handleAddCompanion()}
              className="w-fit text-base"
            >
              Add
            </Button>
            {errors?.companion && (
              <p className="text-base">{errors?.companion}</p>
            )}
          </div>
          {/* Display companion */}

          {guest.nameOfCompanions?.map((name, index) => {
            return (
              // <Fragment>
              <p key={index}>{name}</p>
              // </Fragment>
            );
          })}

          <Button onClick={() => handleSubmit()}>Submit</Button>
        </form>

        {/* Decline invitation */}
        {invite === 0 && (
          <div className="absolute top-1/2 grid size-full -translate-y-1/2 place-items-center bg-slate-500">
            <p className="py-5">
              Sorry to hear that, we wish you could be there with us
            </p>
          </div>
        )}
      </div>
      <div
        className={` ${details.submit ? "block" : "hidden"} absolute z-10 flex size-full flex-col items-center justify-center gap-5 bg-slate-300`}
      >
        <p>Verify details</p>
        <p>
          {guest.firstName} {guest.lastName}
        </p>
        <p>{`Total number of companion/s: ${guest.numberOfAttendees}`}</p>
        {guest.nameOfCompanions.map((name, index) => (
          <p key={index}>{name}</p>
        ))}
        <div className="flex gap-5">
          {/* <button
            onClick={() => handleVerifyForm()}
            className="w-fit bg-emerald-500"
          >
            Submit
          </button> */}
          <SubmitData
            guestName={guest}
            setUpdateStatus={setUpdateStatus}
            setDetails={setDetails}
          />
          <Button
            onClick={() =>
              setDetails((details) => ({ ...details, submit: false }))
            }
            className="w-fit bg-slate-500"
          >
            Return
          </Button>
        </div>
      </div>
      <div
        className={` ${details.load ? "block" : "hidden"} absolute z-10 flex size-full flex-col items-center justify-center gap-5 bg-slate-300`}
      >
        {!details.verify && <p>Submitting Details...</p>}
        {details.verify && (
          <div>
            <p>Success!</p>{" "}
            <Button onClick={() => handleHomePage()} className="bg-emerald-500">
              Home
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserForm;
