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
      } catch (err) {
        if (err) {
          setTimeout(() => {
            setLoad(true);
            setError(true);
          }, 2000);
        }
      }
    };
    fetchGuestList();
    return () => {
      setLoad(true);
      setError(false);
    };
  }, []);

  return (
    <div className="relative flex h-full w-full flex-col justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <div className="flex h-fit w-full flex-1 flex-col border-b-[1px] border-solid border-black text-center text-2xl max-sm:text-base">
          <p className="h-fit w-full border-[2px] border-solid border-black bg-slate-500 py-2 font-bold text-white">
            Admin Panel
          </p>
          <div className="relative right-0 flex size-full items-center py-5">
            <p className="w-full border-b-[1px] border-r-[1px] border-t-[1px] border-solid border-black bg-slate-500 py-2 text-white">
              <p>Total guest:</p>
              <p>{totalGuests?.guest}</p>
            </p>
            <p className="w-full border-b-[1px] border-t-[1px] border-solid border-black bg-slate-500 py-2 text-white">
              <p>Total companions:</p>
              <p>{totalGuests?.companions}</p>
            </p>
          </div>
        </div>
        <div className="] relative w-full border-[2px] border-solid border-black bg-slate-500 text-white">
          <Table>
            <TableHeader>
              <TableRow className="flex h-[50px] max-sm:text-[.7rem]">
                <TableHead className="size-full basis-[25%] place-content-center border-r-[1px] border-solid border-black text-center">
                  First name
                </TableHead>
                <TableHead className="size-full basis-[25%] place-content-center border-r-[1px] border-solid border-black text-center">
                  Last name
                </TableHead>
                <TableHead className="size-full basis-[25%] place-content-center border-r-[1px] border-solid border-black text-center">
                  Companion? Yes/No
                </TableHead>
                <TableHead className="size-full basis-[25%] place-content-center border-r-[1px] border-solid border-black text-center">
                  Name/s of companion
                </TableHead>
              </TableRow>
            </TableHeader>
          </Table>
        </div>
      </div>
      {!load ? (
        <Table className="w-full bg-slate-50">
          {/* <TableHeader>
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
          </TableHeader> */}
          <TableBody className="">
            {data?.map((details, index) => {
              return (
                <TableRow
                  className="items-center border-[1px] border-solid border-black text-center max-sm:text-[.7rem] sm:text-lg"
                  key={index}
                >
                  <TableCell className="w-[25%] border-[1px] border-solid border-black">
                    {details.firstName}
                  </TableCell>
                  <TableCell className="w-[25%] border-[1px] border-solid border-black">
                    {details.lastName}
                  </TableCell>
                  <TableCell
                    className={`w-[25%] place-items-center border-[1px] ${details.companion ? "bg-green-300" : "bg-red-300"} border-solid border-black p-0`}
                  >
                    <TableCell className="flex w-full p-0">
                      <TableCell
                        className={` ${details.numberOfAttendees > 7 ? "h-[240px]" : details.numberOfAttendees === 1 || details.numberOfAttendees === 0 ? "h-fit" : "h-[140px]"} basis-1/2 place-content-center border-r-[1px] border-solid border-black`}
                      >
                        {details.companion ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="w-full basis-1/2 place-content-center">
                        {details.companion ? details.numberOfAttendees : " - "}
                      </TableCell>
                    </TableCell>
                  </TableCell>
                  <TableCell className="w-[25%] border-b-[1px] border-r-[1px] border-solid border-black">
                    {details.companion
                      ? details.nameOfCompanions?.map((name, index) => (
                          <p key={index}>{name}</p>
                        ))
                      : " - "}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : error ? (
        <div>Error...</div>
      ) : (
        <div>Loading...</div>
      )}
      <div className="h-fit w-full place-content-center bg-slate-500 py-2 text-center text-2xl font-bold text-white max-sm:text-base">
        Master Guest List
      </div>
    </div>
  );
};

export default AdminPanel;
