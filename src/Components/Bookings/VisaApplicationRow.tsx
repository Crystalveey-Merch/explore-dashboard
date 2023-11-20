/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect, useRef } from "react";
import { handleFormatTimestampToDateC } from "../../Hooks";
import { ActionComp } from "..";


export const VisaApplicationRow = ({ application, handleDeleteVisaApplication }: { application: any, handleDeleteVisaApplication: (id: string) => void }) => {
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
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap 2xl:px-4 xl:px-3">
                <div className="flex gap-4 items-center">
                    <div className="w-10 h-10 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                        {application.firstName[0]}
                    </div>
                    <p className="text-sm font-medium text-ellipsis">
                        {application.firstName} {application.lastName}
                    </p>
                </div>
            </th>
            <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm capitalize 2xl:px-4 xl:px-3">
                {application.visaCountry}
            </td>
            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                    {application.createdAt ? handleFormatTimestampToDateC(application.createdAt) : "N/A"}
                </p>
            </td>
            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                {application.email}
            </td>
            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                {application.status === "paid" && (
                    <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                        Paid
                    </p>
                )}
                {application.status === "installment" && (
                    <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                        Installment
                    </p>
                )}
                {application.status === "pending" && (
                    <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                        In Review
                    </p>
                )}
                <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                    In Review
                </p>
            </td>
            <td className="flex items-center px-6 py-4 space-x-3 2xl:px-4 xl:px-3"
            >
                <ActionComp
                    showActions={showActions}
                    handleDelete={handleDeleteVisaApplication}
                    id={application.id}
                    toggleActions={toggleActions}
                    showRef={showRef}
                />
            </td>
        </tr>
    )
}