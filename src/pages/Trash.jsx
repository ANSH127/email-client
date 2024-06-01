import { useEffect, useState } from "react";

import { getDocs, where, query, orderBy } from "firebase/firestore";
import { mailRef } from "../config/firebase";
import MailTable from "../components/MailTable";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
export default function Trash() {
  const [mails, setMails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTrashMails = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    try {
      const q = query(
        mailRef,
        where("recipient", "==", email),
        where("trash", "==", true),
        orderBy("createdAt", "desc")
      );

      const q2 = query(
        mailRef,
        where("sender", "==", email),
        where("trash", "==", true),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      const querySnapshot2 = await getDocs(q2);
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });
      querySnapshot2.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      // console.log(temp);
      setMails(temp);
    } catch (error) {
      console.log("Error getting documents: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrashMails();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 shadow-md border-gray-200  rounded-lg mt-14">
        {loading ? (
          <Skeleton count={11} height={40} />
        ) : (
          <div
            className="overflow-x-auto  overflow-y-auto "
            style={{
              height: "100vh",
              paddingBottom: "100px",
            }}
          >
            {mails.length === 0 ? (
              <h1 className="text-center text-2xl">No mails in trash</h1>
            ) : (
              mails.map((mail) => <MailTable mail={mail} key={mail.id} />)
            )}
          </div>
        )}
      </div>
    </div>
  );
}
