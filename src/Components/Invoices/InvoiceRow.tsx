/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { handleFormatDate, handleFormatTime } from "../../Hooks";
import eyeSVG from "../../assets/SVG/Invoice/eye.svg";
import editSVG from "../../assets/SVG/Invoice/pencil-ui.svg";
import trashSVG from "../../assets/SVG/Invoice/trash-bin.svg";



export const InvoiceRow = ({ invoice, handleDeleteInvoice }: { invoice: any, handleDeleteInvoice: (id: string) => void }) => {
    const [showActions, setShowActions] = useState(false);
    const showRef = useRef(null as any);

    const toggleActions = () => {
        setShowActions(!showActions);
    };

    useEffect(() => {
        // Add event listener to close dropdown when clicking outside
        function handleClickOutside(event: { target: any; }) {
            if (showRef.current && !showRef.current.contains(event.target)) {
                setShowActions(false);
            }
        }

        // Bind the event listener
        window.addEventListener("click", handleClickOutside);

        return () => {
            // Unbind the event listener on cleanup
            window.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-4">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                        {invoice.name[0]}
                    </div>
                    <p className="text-sm font-medium text-ellipsis">
                        {invoice.name}
                    </p>
                </div>
            </th>
            <td className="px-6 py-4">
                <div className="flex flex-col gap-1 items-start">
                    <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                        {handleFormatDate(invoice.dateCreated)}
                    </p>
                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                        {handleFormatTime(invoice.timeCreated)}
                    </p>
                </div>
            </td>
            <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm">
                {invoice.overallPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </td>
            <td className="px-6 py-4">
                {invoice.id}
            </td>
            <td className="px-6 py-4">
                {invoice.status === "paid" && (
                    <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                        Paid
                    </p>
                )}
                {invoice.status === "installment" && (
                    <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                        Installment
                    </p>
                )}
                {invoice.status === "pending" && (
                    <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                        In Review
                    </p>
                )}
            </td>
            <td className="flex items-center px-6 py-4 space-x-3"
            >
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
                            className={` ${showActions ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 delay-200"} absolute top-0 right-7 z-10 w-36 p-2 bg-white rounded-md flex flex-col gap-1 bg-gradient-to-bl from-purple-50 via-white to-green-50 transform transition-transform duration-500 ease-out`}
                            style={{ boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px" }}
                        >
                            <button className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                                <img src={eyeSVG} alt="View Invoice" className="w-5 h-5" />
                                <span className="text-sm font-medium text-[rgb(99,115,129)]">
                                    View
                                </span>
                            </button>
                            <button className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                                <img src={editSVG} alt="Edit Invoice" className="w-5 h-5" />
                                <span className="text-sm font-medium text-[rgb(99,115,129)]">
                                    Edit
                                </span>
                            </button>
                            <button
                                className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left"
                                onClick={() => handleDeleteInvoice(invoice.id)}
                            >
                                <img src={trashSVG} alt="Delete Invoice" className="w-5 h-5" />
                                <span className="text-sm font-medium text-[#ff5630]">
                                    Delete
                                </span>
                            </button>
                        </div>
                    )}

                </div>
            </td>
        </tr>
    );
};

