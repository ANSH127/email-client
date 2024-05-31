import { TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
export default function Inbox() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4 border-2 shadow-md border-gray-200  rounded-lg mt-14">
        <div className="overflow-x-auto  ">
          <Link to="/viewmail/345">
            <div
              className="bg-white border-b text-black  cursor-pointer  
                hover:bg-gray-100 px-6 py-4 grid grid-cols-10 gap-4"
            >
              <div className="font-bold text-gray-900 whitespace-nowrap col-span-4 sm:col-span-2">
                MongoDB Atlas
              </div>
              <div className="font-semibold col-span-4 sm:col-span-6">
                Your MangoDB Atlas cluster is now available on the free tier..
              </div>
              <div className="font-semibold">21:44</div>
              <div>
                <TrashIcon
                  data-tooltip-target="tooltip-dark"
                  className="h-6 w-6 text-red-500 trashIcon"
                />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
