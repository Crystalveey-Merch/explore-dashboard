/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, getDocs, db, doc, updateDoc } from '../../../Config/firebase';
import { handleFormatDate, handleFormatTime, ConfirmModal, handleFormatDate2 } from "../../../Hooks"
import { StatusDropDown } from "../../../Components";
import printSVG from "../../../assets/SVG/Dashboard/Action/print.svg";
import travelImage from "../../../assets/Images/Dashboard/travel-location.png"



export const BookingActivities = () => {
    const [booking, setBooking] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


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


    // modal state
    const [open, setOpen] = useState(false);
    const [pickedStatus, setPickedStatus] = useState<any>("");
    const [text, setText] = useState("");
    const title = "Are you sure";

    // status change function
    const handleChangeStatus = async () => {
        // if pickedStatus is paid, pending, and refunded. set status to pickedStatus else if pickedStatus is cancelled set isCancelled to true  and set status to ""
        const bookingRef = doc(db, "transactions", booking.id);

        const status = ["paid", "pending", "refunded"].includes(pickedStatus) ? pickedStatus : "";
        const isCancelled = pickedStatus === "cancelled" ? true : false;


        await updateDoc(bookingRef, {
            status: status,
            isCancelled: isCancelled,
        });

        // update booking state
        setBooking({
            ...booking,
            status: status,
            isCancelled: isCancelled,
        });

        // close modal
        setOpen(false);
        // show toast
        toast.success(`Booking status changed to ${pickedStatus}`);
        console.log(pickedStatus);
    }

    const handleConfirm = ({ status }: any) => {
        if (booking?.status === status) {
            return
        }
        setOpen(true);
        setPickedStatus(status);
        // setText({`you want to change the status of this booking to ${status}?)`});
        setText(`you want to ${status} this booking ?`);
    }

    return (
        <div className="px-10 py-7 flex flex-col gap-10 xl:px-6 lg:gap-16 md:gap-6 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between md:flex-col md:gap-6">
                <div className="flex gap-4">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-9 h-9 flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium rounded-full transition-colors duration-200 ease-out hover:bg-gray-100">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>

                    </button>
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
                <div className="flex flex-row items-end gap-3 md:justify-end">
                    <div className="flex flex-col gap-1">
                        <p className="text-xs font-bold">
                            Change Status
                        </p>
                        <StatusDropDown
                            booking={booking}
                            setText={setText}
                            setOpen={setOpen}
                            setPickedStatus={setPickedStatus}
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
            <div className="grid grid-cols-3 grid-flow-row gap-8 lg:grid-cols-1">
                <div className="p-6 col-span-2 flex flex-col lg:col-span-1"
                    style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgb(33, 43, 54)",
                        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                        borderRadius: "16px",
                    }}
                >
                    <h4 className="text-[rgb(33,43,54)] text-lg font-bold">
                        Details
                    </h4>
                    <div className="flex justify-between py-6 border-b-2 border-dashed border-[rgb(244,246,248)]">
                        <div className="flex gap-2 items-center">
                            <img
                                src={booking?.moreData ? booking?.moreData.imageOne : travelImage}
                                alt="travelPackage"
                                className="w-14 h-14 rounded-md object-cover"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-[rgb(33,43,54)] text-base font-semibold">
                                    {booking?.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {handleFormatDate2(booking?.date)}
                                </p>
                            </div>
                        </div>
                        <h4 className="text-[rgb(33,43,54)] text-lg font-bold">
                            {booking?.moreData?.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                        </h4>
                    </div>
                    <div className="flex justify-between py-6 border-b-2 border-dashed border-[rgb(244,246,248)] sm:grid sm:grid-cols-2 sm:gap-4">
                        <h5 className="text-[rgb(33,43,54)] text-base font-semibold">
                            Travellers
                        </h5>
                        <p className="text-[rgb(99,115,129)] text-sm font-medium sm:order-3">
                            {booking?.travellers} x  {booking?.moreData?.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                        </p>
                        <h5 className="text-[rgb(33,43,54)] text-base font-semibold sm:order-2">
                            {(booking?.travellers * booking?.moreData?.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                        </h5>
                    </div>
                    <div className="flex flex-col gap-4 justify-end items-end py-6">
                        <div className="flex">
                            <h5 className="text-[rgb(99,115,129)] text-sm font-normal">
                                Subtotal
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold">
                                {(booking?.travellers * booking?.moreData?.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </h5>
                        </div>
                        <div className="flex">
                            <h5 className="text-[rgb(99,115,129)] text-sm font-normal">
                                Discount
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold">
                                ₦0
                            </h5>
                        </div>
                        {/* <div className="flex">
                            <h5 className="text-[rgb(99,115,129)] text-sm font-normal">
                                Tax
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold">
                                0
                            </h5>
                        </div> */}
                        <div className="flex">
                            <h5 className="text-[rgb(33,43,54)] text-base font-semibold">
                                Total
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-base font-semibold">
                                {(booking?.travellers * booking?.moreData?.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </h5>
                        </div>
                    </div>
                </div>
                <div className="p-6 h-max" style={{
                    backgroundColor: "rgb(255, 255, 255)",
                    color: "rgb(33, 43, 54)",
                    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                    boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                    borderRadius: "16px",
                }}>
                    <h4 className="text-[rgb(33,43,54)] text-lg font-bold">
                        Customer Info
                    </h4>
                    <div className="py-6 flex flex-col gap-4">
                        <div className="flex gap-4 items-center">
                            <div className="w-12 h-12 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                                {booking?.customer.name[0]}
                            </div>
                            <div className="flex flex-col gapp-1">
                                <p className="text-[rgb(33,43,54)] text-sm font-semibold text-ellipsis">
                                    {booking?.customer.name}
                                </p>
                                <a
                                    href={`mailto:${booking?.customer.email}`}
                                    className="text-[rgb(33,43,54)] text-sm font-semibold transition-colors duration-200 ease-out hover:text-[rgb(17,141,87)]">
                                    {booking?.customer.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex gap-2.5 justify-">
                            <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                Phone Number:
                            </p>
                            <a href={`tel:${booking?.customer.phoneNumber}`}
                                className="text-[rgb(33,43,54)] text-sm font-semibold transition-colors duration-200 ease-out hover:text-[rgb(17,141,87)] hover:underline">
                                {booking?.customer.phoneNumber}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <ConfirmModal
                open={open}
                setOpen={setOpen}
                title={title}
                text={text}
                handleClick={handleChangeStatus}
            />
        </div>
    )
}