import { getDocs, where, query, orderBy } from "firebase/firestore";
import { mailRef } from "../config/firebase";
import { useEffect, useState } from "react";
import MailTable from "../components/MailTable";
export default function Inbox() {
  const [mails, setMails] = useState([]);

  const fetchMails = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const email = user?.email;

    try {
      const q = query(
        mailRef,
        where("recipient", "==", email),
        where("trash", "==", false),
        orderBy("createdAt", "desc")
      );
      const querySnapshot = await getDocs(q);
      let temp = [];
      querySnapshot.forEach((doc) => {
        temp.push({ ...doc.data(), id: doc.id });
      });

      // console.log(temp);
      setMails(temp);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  useEffect(() => {
    fetchMails();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 shadow-md border-gray-200  rounded-lg mt-14">
        <div
          className="overflow-x-auto  overflow-y-auto "
          style={{
            height: "100vh",
            paddingBottom: "100px",
          }}
        >
          {mails.map((mail) => (
            <MailTable mail={mail} key={mail.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
