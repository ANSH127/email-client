import { TrashIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import parse from "html-react-parser";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDoc, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { mailRef } from "../config/firebase";
import { formatDistance } from "date-fns";
import Skeleton from "react-loading-skeleton";
import Loadar from "../components/Loadar";
import "react-loading-skeleton/dist/skeleton.css";

export default function ViewMail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const useremail = JSON.parse(localStorage.getItem("user"))?.email;
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const fetchMail = async () => {
    try {
      const q = doc(mailRef, id);
      const querySnapshot = await getDoc(q);
      // console.log(querySnapshot.data());

      setData(querySnapshot.data());

      updateRead( querySnapshot.data().recipient,querySnapshot.data().read);
    } catch (error) {
      console.log("Error getting documents: ", error);
    }
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      const q = doc(mailRef, id);
      if (data?.trash) {
        await deleteDoc(q);
        alert("Email deleted  successfully");
        navigate("/trash");
        return;
      }

      await updateDoc(q, {
        trash: true,
      });
      alert("Email moved to trash successfully");
      navigate("/");
    } catch (error) {
      console.log("Error deleting email: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    try {
      setLoading2(true);
      const q = doc(mailRef, id);
      await updateDoc(q, {
        trash: false,
      });
      alert("Email restored successfully");
      navigate("/trash");
    } catch (error) {
      console.log("Error deleting email: ", error);
    } finally {
      setLoading2(false);
    }
  };

  const updateRead = async (recipient,read) => {


    if (read) return;
    if(recipient !== useremail) return;
    try {
      const q = doc(mailRef, id);
      await updateDoc(q, {
        read: true,
      });
    } catch (error) {
      console.log("Error updating read status: ", error);
    }
  }

  useEffect(() => {
    fetchMail();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      {
        // data &&
        <div className="p-4  shadow-md  rounded-lg mt-14">
          <h1 className=" font-semibold text-xl">
            {data?.subject || <Skeleton />}
          </h1>

          <div className="flex justify-between mt-4 ">
            <div className="flex space-x-4 justify-between w-full">
              <div className="flex items-center space-x-2">
                <img
                  src="https://e7.pngegg.com/pngimages/84/165/png-clipart-united-states-avatar-organization-information-user-avatar-service-computer-wallpaper-thumbnail.png"
                  alt=""
                  className="w-8 h-8 rounded-full"
                />
                <p className="text-gray-500">
                  &lt;
                  {data?.recipient === useremail
                    ? data?.sender || <Skeleton width={100} />
                    : data?.recipient || <Skeleton width={100} />}
                  &gt;
                </p>
              </div>
              <div className=" flex items-center space-x-2">
                {/* // time  */}
                <p className="text-gray-500">
                  {data?.createdAt ? (
                    formatDistance(new Date(data?.createdAt), new Date(), {
                      addSuffix: true,
                    })
                  ) : (
                    <Skeleton width={100} />
                  )}
                </p>
                {
                  loading ? <Loadar /> :
                  <TrashIcon
                  className="h-6 w-6 text-red-500 cursor-pointer"
                  onClick={handleDelete}
                />}
                {data?.trash && (
                  
                  loading2 ? <Loadar /> :
                  <ArrowPathIcon
                    className="h-6 w-6 text-blue-500  cursor-pointer"
                    onClick={handleRestore}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 p-4 rounded-lg">
            <div className="text-gray-500">
              {data?.message ? (
                parse(`${data?.message}`)
              ) : (
                <Skeleton count={6} />
              )}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
