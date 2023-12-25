/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, db, } from '../../Config/firebase';
import { handleFormatDate, handleFormatTime } from "../../Hooks"
import { StatusDropDown } from "../../Components";
import printSVG from "../../assets/SVG/Dashboard/Action/print.svg";



export const Booking = () => {
    const [booking, setBooking] = useState<any>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchBooking = async () => {
            const bookingRef = collection(db, "transactions");
            const bookingSnapshot = await getDocs(bookingRef);
            const bookings: any[] = [];
            bookingSnapshot.forEach((doc) => {
                bookings.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            const booking = bookings.find((booking) => booking.id === id);
            setBooking(booking);
        };
        fetchBooking();
    }, [id]);

    return (
        <div className="px-10 py-7 flex flex-col gap-10 xl:px-6 xl:w-[calc(100vw-100px)] lg:gap-16 md:gap-12 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between">
                <div className="flex gap-4">
                    <Link to="/travel-bookings" className="w-9 h-9 flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium rounded-full transition-colors duration-200 ease-out hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>

                    </Link>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-2 items-center">
                            <h2 className="text-[rgb(33,43,54)] text-2xl font-bold">
                                Booking {" "} <span className="text-[rgb(99,115,129)] text-base font-medium">#{booking?.id}</span>
                            </h2>
                            <div className="flex text-center">
                                {booking?.status === "paid" && (
                                    <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Paid
                                    </p>
                                )}
                                {booking?.status === "pending" && (
                                    <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        In Review
                                    </p>
                                )}
                                {booking?.installment && (
                                    <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Installment
                                    </p>
                                )}
                                {booking?.isCancelled && (
                                    <p className="h-6 bg-red-200 text-red-700 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Cancelled
                                    </p>
                                )}
                                {booking?.status === "refunded" && (
                                    <p className="h-6 bg-[#276c79a8] text-white rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Refunded
                                    </p>
                                )}
                            </div>
                        </div>
                        <h5 className="text-[rgb(145,158,171)] text-sm font-normal">
                            <span>
                                {handleFormatDate(booking?.dateCreated)}
                            </span>
                            {" "}
                            <span>
                                {handleFormatTime(booking?.timeCreated)}
                            </span>
                        </h5>
                    </div>
                </div>
                <div className="flex flex-row items-end gap-3">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold">
                            Change Status
                        </p>
                        <StatusDropDown
                            booking={booking}
                        />
                    </div>

                    <button className="min-w-[64px] h-max py-2 px-3 flex items-center gap-2.5 text-sm font-bold border border-[rgba(145,158,171,0.32)] rounded-lg transition duration-200 ease-out hover:bg-[rgba(145,158,171,0.08)] hover:border-[#000000]">
                        <img src={printSVG} alt="print" className="w-5 h-5" />
                        <p>
                            Print
                        </p>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-3 grid-flow-row gap-12">
                <div className="p-6 col-span-2"
                    style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgb(33, 43, 54)",
                        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                        borderRadius: "16px",
                    }}
                ></div>
                <div className="p-6" style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    color: "rgb(33, 43, 54)",
                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                    borderRadius: "16px",
                }}></div>
            </div>
        </div>
    )
}