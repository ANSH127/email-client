import { TrashIcon,ArrowPathIcon } from "@heroicons/react/24/outline";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc ,updateDoc} from "firebase/firestore";
import { mailRef } from "../config/firebase";
import { formatDistance } from "date-fns";


export default function ViewMail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const useremail = JSON.parse(localStorage.getItem("user"))?.email;
  const fetchMail = async () => {
    try {
      const q = doc(mailRef, id);
      const querySnapshot = await getDoc(q);
      // console.log(querySnapshot.data());

      setData(querySnapshot.data());
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      const q = doc(mailRef, id);
      await updateDoc(q, {
        trash: true,
      });
      alert("Email deleted successfully");
      navigate("/inbox");
    } catch (error) {
      console.log("Error deleting email: ", error);
    }
  }

  const handleRestore = async () => {
    try {
      const q = doc(mailRef, id);
      await updateDoc(q, {
        trash: false,
      });
      alert("Email restored successfully");
      navigate("/trash");
    } catch (error) {
      console.log("Error deleting email: ", error);
    }
  }

  useEffect(() => {
    fetchMail();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      {
      data &&
        <div className="p-4  shadow-md  rounded-lg mt-14">
        <h1 className=" font-semibold text-xl">{data?.subject}</h1>

        <div className="flex justify-between mt-4 ">
          <div className="flex space-x-4 justify-between w-full">
            <div className="flex items-center space-x-2">
              <img
                src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                alt=""
                className="w-8 h-8 rounded-full"
              />
              <p className="text-gray-500">MongoDB Atlas</p>
              <p className="text-gray-500">
                &lt;
                {data?.recipient === useremail ? data?.sender : data?.recipient}
                &gt;
              </p>
            </div>
            <div className=" flex items-center space-x-2">
              {/* // time  */}
              <p className="text-gray-500">
                {formatDistance(new Date(data?.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </p>
              {/* // trash icon */}
              <TrashIcon className="h-6 w-6 text-red-500" onClick={handleDelete} />
              {
                data?.trash &&
                <ArrowPathIcon className="h-6 w-6 text-blue-500" onClick={handleRestore} />}
            </div>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 p-4 rounded-lg">
          <div className="text-gray-500">{parse(`${data?.message}`)}</div>
        </div>
      </div>}
    </div>
  );
}
