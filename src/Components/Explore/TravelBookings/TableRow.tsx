/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, SetStateAction } from "react";
import { Action } from "."
import { handleFormatDate2 } from "../../../Hooks"
import travelImage from "../../../assets/Images/Dashboard/travel-location.png"


export const TableRow = ({ booking }: any) => {
    const viewRoute = `/explore/travel-bookings/${booking.id}`;

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event: { currentTarget: SetStateAction<null> }) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <tr className="bg-white border-b hover:bg-gray-50">
            <td className="w-4 p-4 xl:p-2">
                <div className="flex items-center">
                    <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                    <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                </div>
            </td>
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                <div className="flex gap-2 items-center min-w-[max-content]">
                    <img
                        src={booking.moreData ? booking.moreData.images.imageOne : travelImage}
                        alt="travelPackage"
                        className="w-14 h-14 rounded-md object-cover"
                    />
                    <p >
                        {booking.title}
                    </p>
                </div>
            </th>
            <td scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap xl:px-3">
                <div className="flex flex-col gap-0.5">
                    <p className="text-sm font-medium text-ellipsis">
                        {booking.customer.name}
                    </p>
                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                        {booking.customer.email}
                    </p>
                </div>
            </td>
            <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm xl:px-3">
                {booking.travellers}
            </td>
            <td className="px-6 py-4 xl:px-3">
                <div className="flex flex-col gap-1 items-start">
                    <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                        {handleFormatDate2(booking.moreData.startDate)}
                    </p>
                </div>
            </td>
            {/* <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm xl:px-3">
                {booking.overallPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </td> */}
            <td className="px-6 py-4 xl:px-1">
                {booking.id}
            </td>
            <td className="px-6 py-4 xl:px-3">
                <div className="flex flex-col text-center">
                    {booking.status === "paid" && (
                        <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                            Paid
                        </p>
                    )}
                    {booking.status === "pending" && (
                        <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                            In Review
                        </p>
                    )}
                    {booking.installment && (
                        <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                            Installment
                        </p>
                    )}
                    {booking.isCancelled && (
                        <p className="h-6 bg-red-200 text-red-700 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                            Cancelled
                        </p>
                    )}
                    {booking.status === "refunded" && (
                        <p className="h-6 bg-[#276c79a8] text-white rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                            Refunded
                        </p>
                    )}
                </div>
            </td>
            <td className="px-6 py-4 space-x-3 xl:px-3"
            >
                <Action
                    viewRoute={viewRoute}
                    handleClick={handleClick}
                    handleClose={handleClose}
                    open={open}
                    id={id}
                    anchorEl={anchorEl}
                />
            </td>
        </tr>
    )
}