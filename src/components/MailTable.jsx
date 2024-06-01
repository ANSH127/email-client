import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

export default function MailTable({ mail}) {
  const isSent = mail?.sender === JSON.parse(localStorage.getItem("user"))?.email;
  return (
    <Link 
    to= {`/viewmail/${mail?.id}`}
    >
      <div
        className="bg-white border-b text-black  cursor-pointer  
        hover:bg-gray-100 px-6 py-4 grid grid-cols-10 gap-4"
      >
        <div className="font-bold text-sm text-gray-900 whitespace-nowrap col-span-4 sm:col-span-3">
            {
                isSent ? "To:"+mail?.recipient : "From:"+mail?.sender

            }
        </div>
        <div className="font-semibold col-span-4 sm:col-span-5">
            {
              mail?.subject?.length < 50 ? mail?.subject :
              mail?.subject?.slice(0, 50)+"..."
            }
        </div>
        <div className="font-semibold col-span-2">
            {formatDistance(new Date(mail?.createdAt), new Date(), { addSuffix: true })}

        </div>
      </div>
    </Link>
  );
}
