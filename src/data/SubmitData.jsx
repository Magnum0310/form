import React from "react";
import { db } from "../config/firebase";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";

const SubmitData = ({ guestName, setUpdateStatus, setDetails }) => {
  console.log(guestName);
  const guestList = doc(collection(db, "guest"));
  // const testData = {
  //   firstName: "Dummy first name",
  //   lastName: "Dummy last name",
  //   attend: false,
  //   numberOfAttendees: 2,
  //   nameOfCompanions: ["First Companion", "Second Companion"],
  // };

  const addGuest = async () => {
    console.log("click");
    try {
      const newGuest = await setDoc(guestList, guestName);
      console.log(newGuest);
      console.log("done");
      setUpdateStatus((status) => ({ ...status, success: true }));
      setDetails((details) => ({ ...details, load: true }));
      setTimeout(() => {
        setDetails((details) => ({ ...details, verify: true }));
      }, 3000);
    } catch (err) {
      if (err) {
        setTimeout(() => {
          setUpdateStatus((status) => ({ ...status, error: true }));
        }, 2000);
      }
      console.log(err);
    }
  };

  return (
    <div>
      <Button className="bg-emerald-500" onClick={() => addGuest()}>
        Submit
      </Button>
    </div>
  );
};

export default SubmitData;
