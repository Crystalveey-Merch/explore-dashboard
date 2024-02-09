/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db, doc, updateDoc } from '../../../Config/firebase';
import { handleFormatDate, handleFormatTime, ConfirmPassKeyModal, ConfirmModal, handleFormatDate2 } from "../../../Hooks"
import { StatusDropDown } from "../../../Components";
import printSVG from "../../../assets/SVG/Dashboard/Action/print.svg";
import travelImage from "../../../assets/Images/Dashboard/travel-location.png"
import { ConfirmationBookingGeneralConfirmed, ConfirmedBookingForPayments } from "../../../Components/Explore/Emails";


export const BookingRetreats = ({ bookings }: { bookings: any }) => {
    const [booking, setBooking] = useState<any>(null);
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();


    useEffect(() => {
        if (bookings.length > 0) {
            const booking = bookings.find((booking: { id: string | undefined; }) => booking.id === id);
            setBooking(booking);
        }
    }, [bookings, id]);

    // 
    const [passKey, setPassKey] = useState("")
    const [isPassKeyOpen, setIsPassKeyOpen] = useState(false)

    // modal state
    const [open, setOpen] = useState(false);
    const [pickedStatus, setPickedStatus] = useState<any>("");
    const [text, setText] = useState("");
    const title = "Are you sure";
    const [changeStatusLoading, setChangeStatusLoading] = useState(false);



    const initialPrice = booking?.moreData?.price
    const priceWithTravelers = booking?.travellers * initialPrice
    const discoutedAmount = (priceWithTravelers * booking?.discount) / 100
    const totalAmount = priceWithTravelers - discoutedAmount

    const bookingDate = handleFormatDate(booking?.dateCreated) + " " + handleFormatTime(booking?.timeCreated)

    const checkInDate = handleFormatDate2(booking?.date)

    // status change function
    const handleChangeStatus = async () => {
        setChangeStatusLoading(true);
        // if pickedStatus is paid, pending, and refunded. set status to pickedStatus else if pickedStatus is cancelled set isCancelled to true  and set status to ""
        const bookingRef = doc(db, "transactions", booking.id);


        const status = ["confirmed", "pending", "cancelled"].includes(pickedStatus) ? pickedStatus : pickedStatus === "refunded" ? "cancelled" : "";


        // const paymentStatus = ["paid", "pending", "refunded"].includes(pickedStatus) ? pickedStatus : pickedStatus === "cancelled" ? booking?.paymentStatus : "";
        const paymentStatus = (pickedStatus === "pending" && booking?.paymentMethod === "bank") ? "pending" : (pickedStatus === "pending" && booking?.paymentMethod === "paystack") ? booking?.paymentStatus : pickedStatus === "confirmed" ? "paid" : pickedStatus === "refunded" ? "refunded" : pickedStatus === "cancelled" ? booking?.paymentStatus : ""

        await updateDoc(bookingRef, {
            status: status === "refunded" ? "cancelled" : status,
            paymentStatus: paymentStatus
        });

        // update booking state
        setBooking({
            ...booking,
            status: status === "refunded" ? "cancelled" : status,
            paymentStatus: paymentStatus
        });

        // close modal
        setOpen(false);
        if (pickedStatus === "confirmed" && booking?.paymentMethod === "bank") {
            ConfirmedBookingForPayments(booking?.customer.email, booking?.customer.name.split(" ")[0], totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }), booking?.id, booking?.travellers, bookingDate, checkInDate, booking?.title)
        }
        else if (pickedStatus === "confirmed" && booking?.paymentMethod === "paystack") {
            ConfirmationBookingGeneralConfirmed(booking?.customer.email, booking?.customer.name.split(" ")[0], totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }), booking?.id, booking?.travellers, bookingDate, checkInDate, booking?.title)
        }

        setChangeStatusLoading(false);
        // show toast
        toast.success(`Booking status changed to ${pickedStatus}`);
        // console.log(pickedStatus);
    }

    const handleConfirm = ({ status }: any) => {
        if (booking?.status === status) {
            return
        }
        setOpen(true);
        setPickedStatus(status);
        // setText({`you want to change the status of this booking to ${status}?)`});
        setText(`you want to change the status of this booking to "${status}" ?`);
    }

    return (
        <div className="px-10 py-7 flex flex-col gap-10 xl:px-6 lg:gap-16 md:gap-6 sm:w-[100vw] sm:gap-9">
            <div className="flex gap-5 sm:flex-col sm:gap-3">
                <button
                    onClick={() => navigate(-1)}
                    className="w-9 h-9 flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium rounded-full transition-colors duration-200 ease-out hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <div className="w-full flex justify-between md:flex-col md:gap-6">
                    <div className="flex gap-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2 items-center">
                                <h2 className="text-[rgb(33,43,54)] text-2xl font-bold">
                                    Booking {" "} <span className="text-[rgb(99,115,129)] text-base font-medium">#{booking?.id}</span>
                                </h2>
                                <div className="flex text-center">
                                    {booking?.status === "confirmed" && (
                                        <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                            Confirmed
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
                                    {booking?.status === "cancelled" && (
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
                                Force Change Status
                            </p>
                            <StatusDropDown
                                booking={booking}
                                setText={setText}
                                setIsPassKeyOpen={setIsPassKeyOpen}
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
            </div>
            <div className="grid grid-cols-3 grid-flow-row gap-8 lg:grid-cols-1">
                <div className="p-6 col-span-2 flex flex-col lg:col-span-1 sm:p-4"
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
                    <div className="w-full flex flex-col gap-4 justify-end items-end py-6 border-y-2 border-dashed border-[rgb(244,246,248)] sm:gap-4">
                        <div className="flex sm:w-full">
                            <h5 className="text-[rgb(99,115,129)] text-sm font-normal sm:w-full">
                                Payment Method:
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold capitalize sm:w-full">
                                {booking?.paymentMethod}
                            </h5>
                        </div>
                        <div className="flex sm:w-full">
                            <h5 className="text-[rgb(99,115,129)] text-sm font-normal sm:w-full">
                                Payment Status:
                            </h5>
                            <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold capitalize sm:w-full">
                                {booking?.paymentStatus === "paid" && (
                                    <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Paid
                                    </p>
                                )}
                                {booking?.paymentStatus === "pending" && (
                                    <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        In Review
                                    </p>
                                )}
                                {booking?.paymentStatus === "refunded" && (
                                    <p className="h-6 bg-[#276c79a8] text-white rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                        Refunded
                                    </p>
                                )}
                            </h5>
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <div className="flex justify-between py-6 border-b-2 border-dashed border-[rgb(244,246,248)]">
                            <div className="flex gap-2 items-center sm:flex-col">
                                <img
                                    src={booking?.moreData ? booking.moreData.images.imageOne : travelImage}
                                    alt="travelPackage"
                                    className="w-14 h-14 rounded-md object-cover sm:place-self-start"
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
                                {booking?.travellers} x  {initialPrice?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </p>
                            <h5 className="text-[rgb(33,43,54)] text-base font-semibold sm:order-2 sm:text-right">
                                {(booking?.travellers * booking?.moreData?.price).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </h5>
                        </div>
                        <div className="flex flex-col gap-4 justify-end items-end py-6">
                            <div className="flex sm:w-full">
                                <h5 className="text-[rgb(99,115,129)] text-sm font-normal sm:w-full">
                                    Subtotal
                                </h5>
                                <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold sm:w-full">
                                    {priceWithTravelers.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </h5>
                            </div>
                            <div className="flex sm:w-full">
                                <h5 className="text-[rgb(99,115,129)] text-sm font-normal sm:w-full">
                                    Discount
                                </h5>
                                <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-sm font-semibold sm:w-full">   {" - "}
                                    {discoutedAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
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
                            <div className="flex sm:w-full">
                                <h5 className="text-[rgb(33,43,54)] text-base font-semibold sm:w-full">
                                    Total
                                </h5>
                                <h5 className="w-[200px] text-right text-[rgb(33,43,54)] text-base font-semibold sm:w-full">
                                    {totalAmount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-8">
                    <div className="w-full p-6 h-max sm:p-4" style={{
                        backgroundColor: "rgb(255, 255, 255)",
                        color: "rgb(33, 43, 54)",
                        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                        borderRadius: "16px",
                    }}>
                        <h4 className="text-[rgb(33,43,54)] text-lg font-bold">
                            Booking Setup
                        </h4>
                        <div className="py-6">
                            {booking?.status === "pending" ?
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleConfirm({ status: "confirmed" })}
                                        className="w-full px-6 py-3 rounded-lg bg-white text-black border border-gray-300 text-sm font-semibold text-center transition duration-300 ease-in-out hover:bg-gray-100 sm:px-3 sm:py-2.5"
                                    > Confirm Booking
                                    </button>
                                    <button
                                        onClick={() => handleConfirm({ status: "cancelled" })}
                                        className="w-full px-6 py-3 rounded-lg bg-red-600 text-white text-sm font-semibold text-center transition duration-300 ease-in-out hover:bg-red-700 sm:px-3 sm:py-2.5"
                                    >
                                        Cancel Booking
                                    </button>
                                </div> : (booking?.status === "cancelled" && (booking?.paymentStatus === "paid" || booking?.paymentStatus === "pending")) ?
                                    <div className="w-full">
                                        <button
                                            onClick={() => handleConfirm({ status: "refunded" })}
                                            className="w-full px-6 py-3 rounded-lg bg-[#276c79a8] text-white text-sm font-semibold text-center transition duration-300 ease-in-out hover:bg-[#276c79] sm:px-3 sm:py-2.5"
                                        >
                                            Refund Booking
                                        </button>
                                    </div> : booking?.status === "confirmed" && booking?.paymentStatus === "paid" ?
                                        <div className="w-full  bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-center">
                                            <p className="h-6 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                                Confirmed
                                            </p>
                                        </div> : booking?.status === "cancelled" && booking?.paymentStatus === "refunded" ?
                                            <div className="w-full bg-red-200 text-red-700 rounded-md px-1.5 text-center">
                                                <p className="h-6 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                                    Cancelled
                                                </p>
                                            </ div>
                                            : <h4 className="text-[rgb(33,43,54)] text-lg font-bold">
                                                Payment Details
                                            </h4>
                            }
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
            </div>
            <ConfirmModal
                open={open}
                setOpen={setOpen}
                title={title}
                text={text}
                handleClick={handleChangeStatus}
                loading={changeStatusLoading}
            />
            <ConfirmPassKeyModal
                passkey={passKey}
                setPassKey={setPassKey}
                openPassKey={isPassKeyOpen}
                setOpenPasskey={setIsPassKeyOpen}
                setOpenConfirmModal={setOpen}
            />
        </div>
    )
}