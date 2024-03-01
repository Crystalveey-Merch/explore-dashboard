/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import eyeSVG from "../../../assets/SVG/Invoice/eye.svg";
import editSVG from "../../../assets/SVG/Invoice/pencil-ui.svg";
import trashSVG from "../../../assets/SVG/Invoice/trash-bin.svg";


export const ActionComp = ({ showActions, handleDelete, viewRoute, id, toggleActions, showRef }: { showActions: boolean, handleDelete: any, viewRoute: any, id: string, toggleActions: any, showRef: any }) => {

    return (
        <div className="relative" ref={showRef}>
            <button
                onClick={toggleActions}
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 focus:outline-none"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button>

            {showActions && (
                <div
                    className={` ${showActions ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 delay-200"} absolute top-0 right-7 z-50 w-36 p-2 rounded-md flex flex-col gap-1 bg-gradient-to-bl from-purple-50 via-white to-green-50 transform transition-transform duration-500 ease-out`}
                    style={{ boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px" }}
                >
                    <Link
                        to={viewRoute}
                        className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                        <img src={eyeSVG} alt="View flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-medium text-[rgb(99,115,129)]">
                            View
                        </span>
                    </Link>
                    <button className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                        <img src={editSVG} alt="Edit flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-medium text-[rgb(99,115,129)]">
                            Edit
                        </span>
                    </button>
                    <button
                        className="inline-flex hidden p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left"
                        onClick={() => handleDelete(id)}
                    >
                        <img src={trashSVG} alt="Delete flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-medium text-[#ff5630]">
                            Delete
                        </span>
                    </button>
                </div>
            )}

        </div>
    )
}