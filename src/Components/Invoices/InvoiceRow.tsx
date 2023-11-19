/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { handleFormatDate, handleFormatTime } from "../../Hooks";
import { ActionComp } from "..";



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
            <td className="w-4 p-4 xl:p-2">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap xl:px-3">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                        {invoice.name[0]}
                    </div>
                    <p className="text-sm font-medium text-ellipsis">
                        {invoice.name}
                    </p>
                </div>
            </th>
            <td className="px-6 py-4 xl:px-3">
                <div className="flex flex-col gap-1 items-start">
                    <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                        {handleFormatDate(invoice.dateCreated)}
                    </p>
                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                        {handleFormatTime(invoice.timeCreated)}
                    </p>
                </div>
            </td>
            <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm xl:px-3">
                {invoice.overallPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </td>
            <td className="px-6 py-4 xl:px-1">
                {invoice.id}
            </td>
            <td className="px-6 py-4 xl:px-3">
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
            <td className="flex items-center px-6 py-4 space-x-3 xl:px-3"
            >
                <ActionComp
                    showActions={showActions}
                    handleDelete={handleDeleteInvoice}
                    id={invoice.id}
                    toggleActions={toggleActions}
                    showRef={showRef}
                />
            </td>
        </tr>
    );
};

