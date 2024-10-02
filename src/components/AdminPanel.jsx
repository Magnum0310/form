import { useState, useEffect } from "react";
import { db } from "../config/firebase";
import { getDocs, collection } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const AdminPanel = ({ statePanel, setPanel, setAdmin, admin }) => {
  const [data, setData] = useState();
  const [totalGuests, setTotalGuests] = useState();
  const guestListRef = collection(db, "guest");
  const [load, setLoad] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGuestList = async () => {
      try {
        const list = await getDocs(guestListRef);
        if (list) {
          setLoad(false);
        }
        const guestList = list.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        console.log(guestList);

        const total = guestList?.reduce(
          function (acc, arr) {
            if (arr.companion) {
              acc.companions += arr.numberOfAttendees;
            }
            acc.guest += 1;
            return acc;
          },
          {
            guest: 0,
            companions: 0,
          },
        );
        setData(guestList);
        setTotalGuests(total);

        // console.log(guestList);
      } catch (err) {
        if (err) {
          setTimeout(() => {
            setLoad(true);
            setError(true);
          }, 2000);
        }
        // console.log(err);
      }
    };
    fetchGuestList();
    return () => {
      setLoad(true);
      setError(false);
    };
  }, []);

  return (
    <div className="relative flex h-full w-[50rem] flex-col justify-center gap-5">
      <div className="relative flex items-center justify-center">
        <p>Admin Panel</p>
        <div className="absolute right-0 flex flex-col">
          <p className="pr-10 text-left text-base">
            Total guest {totalGuests?.guest}
          </p>
          <p className="pr-10 text-left text-base">
            Total companions {totalGuests?.companions}
          </p>
        </div>
      </div>
      <div className="relative z-10 flex w-full justify-evenly">
        <Button
          onClick={() => {
            setPanel(!statePanel);
            setAdmin(!admin);
          }}
        >
          Form Panel
        </Button>
      </div>
      {!load ? (
        // <div>
        //   {data?.map((details, index) => {
        //     return <div key={index}>{details.firstName}</div>;
        //   })}
        // </div>
        <Table>
          <TableCaption className="text-black">Master Guest List.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center text-black">
                First name
              </TableHead>
              <TableHead className="text-center text-black">
                Last name
              </TableHead>
              <TableHead className="text-center text-black">
                Companion? Yes/No
              </TableHead>
              <TableHead className="text-center text-black">
                Number of companion/s
              </TableHead>
              <TableHead className="text-center text-black">
                Name/s of companion
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* {data?.map((details, index) => { */}
            {/* return <div key={index}>{details.firstName}</div>; */}
            {data?.map((details, index) => {
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {details.firstName}
                  </TableCell>
                  <TableCell>{details.lastName}</TableCell>
                  <TableCell>{details.companion ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {details.companion ? details.numberOfAttendees : " - "}
                  </TableCell>
                  <TableCell>
                    {details.companion
                      ? details.nameOfCompanions?.map((name, index) => (
                          <p key={index}>{name}</p>
                        ))
                      : " - "}
                  </TableCell>
                </TableRow>
              );
            })}
            {/* })} */}
          </TableBody>
        </Table>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default AdminPanel;
