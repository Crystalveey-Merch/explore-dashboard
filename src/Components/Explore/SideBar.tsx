/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { NavLink } from "react-router-dom"
import Collapsible from "react-collapsible";
import { useDispatch, } from 'react-redux';
import { toggleMenu } from '../../Config/rightBarToggleSlice';
//import firstPageIcon from '../assets/Images/Dashboard/first-page.png'
import LogoSmall from "../../../public/20231116_210104-removebg-preview.png"
import PlusSVG from "../../assets/SVG/Dashboard/plus.svg"
import barChartSVG from "../../assets/SVG/Dashboard/bar-chart-square.svg"
import invoiceSVG from "../../assets/SVG/Dashboard/invoice-dollar.svg"
import activitySVG from "../../assets/SVG/Dashboard/outdoor-trip.svg"
import travelPackageSVG from "../../assets/SVG/Dashboard/tour.svg"
import retreatPackageSVG from "../../assets/SVG/Dashboard/adventure-relaxation-shelter.svg"
import tourPackageSVG from "../../assets/SVG/Dashboard/compass-solid.svg"
import bookingsSVG from "../../assets/SVG/Dashboard/ticket.svg"
import activitiesSVG from "../../assets/SVG/Dashboard/square-person-confined-solid.svg"
import retreatsSVG from "../../assets/SVG/Dashboard/adventure-journey-location.svg"
import flightSVG from "../../assets/SVG/Dashboard/flight-takeoff.svg"
import hotelSVG from "../../assets/SVG/Dashboard/hotel.svg"
import visaSVG from "../../assets/SVG/Dashboard/passport.svg"
import privateSVG from "../../assets/SVG/Dashboard/business-travel.svg"
import routeSVG from "../../assets/SVG/Dashboard/route-solid.svg"
import mapSVG from "../../assets/SVG/Dashboard/map-location-dot-solid.svg"
import bellRingSVG from "../../assets/SVG/Dashboard/bell-ring.svg"
import piggySolidSVG from "../../assets/SVG/Dashboard/piggy-bank-solid.svg"
import userSVG from "../../assets/SVG/Dashboard/user-solid.svg"


export const SideBar = ({ travelBookings, activityBookings, retreatBookings, tourBookings, waitList }: { travelBookings: any[], activityBookings: any[], retreatBookings: any[], tourBookings: any[], waitList: any[] }) => {

    const dispatch = useDispatch();
    const [activityDropdown, setActivityDropdown] = useState<boolean>(false);
    const [travelPackageDropdown, setTravelPackageDropdown] = useState<boolean>(false);
    const [retreatPackageDropdown, setRetreatPackageDropdown] = useState<boolean>(false);
    const [tourPackageDropdown, setTourPackageDropdown] = useState<boolean>(false);
    const [travelBookingDropdown, setTravelBookingDropdown] = useState<boolean>(false);
    const [activitiesBookingDropdown, setActivitiesBookingDropdown] = useState<boolean>(false);
    const [retreatsBookingDropdown, setRetreatsBookingDropdown] = useState<boolean>(false)
    const [tourBookingDropdown, setTourBookingDropdown] = useState<boolean>(false);
    const [bookingDropdown, setBookingDropdown] = useState<boolean>(false);
    const [waitlistDropdown, setWaitlistDropdown] = useState<boolean>(false);


    const handleMenu = () => {
        const barLinks = document.querySelector(".bar-links");
        barLinks?.classList.toggle("open");

        const barItems = document.querySelectorAll(".bar-item");
        barItems.forEach((item) => {
            item.addEventListener("click", () => {
                barLinks?.classList.remove("open");
                dispatch(toggleMenu())
            });
        });
        dispatch(toggleMenu())
    }

    const convertedTitle = (title: string) => {
        return title.toLowerCase().split(" ").join("-");
    };

    return (
        <div className="bar-links xl:z-10" onClick={handleMenu}>
            <div className="h-screen font-public-sans bg[#00afef] w-[268px] flex flex-col justify-between border-r border-gray-300 2xl:w-[250px] md:px2 xl:absolute xl:bg-white sm:w-[240px]" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap10 h-full">
                    <div className="py-[5px] px-3.5 flex justify-between items-center">
                        <NavLink to="/explore">
                            <h2 className="">
                                {/* <div className=" p-2">
                                <img src={Logo} alt="logo" className="w-full h-[63px]" />
                            </div> */}
                                <div className="inline-flex">
                                    <img src={LogoSmall} alt="logo" className="w[60px] h-[63px]" />
                                </div>
                            </h2>
                        </NavLink>
                        <button
                            className="hidden xl:block"
                            onClick={() => handleMenu()}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                                className="w-5 h-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="h-full bg-[rgb(0,108,156)] pt-10 p-2 py-5 flex flex-col gap-5 overflow-y-scroll scrollbarhide sm:py-3 sm:p-1">
                        {/* Overview */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                Overview
                            </h4>
                            <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                                <NavLink to="/explore"
                                    // className={(isActive ? "flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 bg-gray-500" : "flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 ")}
                                    className={`flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 ${location.pathname === "/explore" ? "bg-gray-500" : ""}`}
                                >
                                    <img src={barChartSVG} alt="bar-chart" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/" ? "text-white" : "text-white"}`}>
                                        Dashboard
                                    </h4>
                                </NavLink>
                            </div>
                        </div>
                        {/* Overview End */}
                        {/* Bookings */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="">
                                    Bookings
                                </span>
                            </h4>
                            {/* Travel Booking */}
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setTravelBookingDropdown(!travelBookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={routeSVG} alt="route" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname.includes("/explore/travel-bookings") ? "text-white" : "text-white"}`}>
                                                    Travel Bookings
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${travelBookingDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={travelBookingDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        {/* All Travel Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings" ? "text-white" : "text-white"}`}>
                                                    <span className=""> All </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* All Travel Bookings End */}
                                        {/* Pending Travel Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings/pending" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings/pending" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings/pending" ? "text-white" : "text-white"}`}>
                                                    <span className=""> In Review </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-semibold">
                                                        {travelBookings.filter((booking: { status: string }) => booking.status === "pending").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Pending Travel Bookings End */}
                                        {/* Confirmed Travel Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings/confirmed" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings/confirmed" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings/confirmed" ? "text-white" : "text-white"}`}>
                                                    <span className="">
                                                        Confirmed
                                                    </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.filter((booking: { status: string }) => booking.status === "confirmed").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Paid Travel Bookings End */}
                                        {/* Cancelled Travel Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings/cancelled" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings/cancelled" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings/cancelled" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Cancelled </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.filter((booking: { status: string }) => booking?.status === "cancelled").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Cancelled Travel Bookings End */}
                                        {/* Refunded Travel Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings/refunded" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings/refunded" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings/refunded" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Refunded </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.filter((booking: { paymentStatus: string }) => booking.paymentStatus === "refunded").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Refunded Travel Bookings End */}
                                        {/* Installment Travel Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-bookings/installment" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-bookings/installment" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/travel-bookings/installment" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Installment </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.filter((booking: { installment: boolean }) => booking.installment === true).length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Installment Travel Bookings End */}
                                    </ul>
                                </Collapsible>
                            </div>
                            {/* Travel Booking End */}
                            {/* Activities Booking */}
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setActivitiesBookingDropdown(!activitiesBookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={activitiesSVG} alt="activities" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname.includes("/explore/activities-bookings") ? "text-white" : "text-white"}`}>
                                                    Activities Bookings
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${activitiesBookingDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={activitiesBookingDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        {/* All Activities Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings" ? "text-white" : "text-white"}`}>
                                                    <span className=""> All </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {activityBookings.length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* All Activities Bookings End */}
                                        {/* Pending Activities Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings/pending" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings/pending" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings/pending" ? "text-white" : "text-white"}`}>
                                                    <span className=""> In Review </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-semibold">
                                                        {activityBookings.filter((booking: { status: string }) => booking.status === "pending").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Pending Activities Bookings End */}
                                        {/* Confirmed Activities Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings/confirmed" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings/confirmed" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings/confirmed" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Confirmed </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {activityBookings.filter((booking: { status: string }) => booking.status === "confirmed").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Confirmed Activities Bookings End */}
                                        {/* Cancelled Activities Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings/cancelled" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings/cancelled" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings/cancelled" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Cancelled </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {activityBookings.filter((booking: { status: string }) => booking?.status === "cancelled").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Cancelled Activities Bookings End */}
                                        {/* Refunded Activities Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings/refunded" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings/refunded" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings/refunded" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Refunded </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {activityBookings.filter((booking: { paymentStatus: string }) => booking.paymentStatus === "refunded").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Refunded Activities Bookings End */}
                                        {/* Installment Activities Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities-bookings/installment" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities-bookings/installment" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/activities-bookings/installment" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Installment </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {activityBookings.filter((booking: { installment: boolean }) => booking.installment === true).length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Installment Activities Bookings End */}
                                    </ul>
                                </Collapsible>
                            </div>
                            {/* Activities Booking End */}
                            {/* Retreats Booking */}
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setRetreatsBookingDropdown(!retreatsBookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={retreatsSVG} alt="retreats" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname.includes("/explore/retreat-bookings") ? "text-white" : "text-white"}`}>
                                                    Retreats Bookings
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${retreatsBookingDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={retreatsBookingDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        {/* All Retreats Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings" ? "text-white" : "text-white"}`}>
                                                    <span className=""> All </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {retreatBookings.length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* All Retreats Bookings End */}
                                        {/* Pending Retreats Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings/pending" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings/pending" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings/pending" ? "text-white" : "text-white"}`}>
                                                    <span className=""> In Review </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-semibold">
                                                        {retreatBookings.filter((booking: { status: string }) => booking.status === "pending").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Pending Retreats Bookings End */}
                                        {/* Confirmed Retreats Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings/confirmed" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings/confirmed" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings/confirmed" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Confirmed </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {retreatBookings.filter((booking: { status: string }) => booking.status === "confirmed").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Confirmed Retreats Bookings End */}
                                        {/* Cancelled Retreats Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings/cancelled" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings/cancelled" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings/cancelled" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Cancelled </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {retreatBookings.filter((booking: { status: string }) => booking?.status === "cancelled").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Cancelled Retreats Bookings End */}
                                        {/* Refunded Retreats Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings/refunded" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings/refunded" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings/refunded" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Refunded </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {retreatBookings.filter((booking: { paymentStatus: string }) => booking.paymentStatus === "refunded").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Refunded Retreats Bookings End */}
                                        {/* Installment Retreats Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-bookings/installment" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-bookings/installment" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/retreat-bookings/installment" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Installment </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {retreatBookings.filter((booking: { installment: boolean }) => booking.installment === true).length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Installment Retreats Bookings End */}
                                    </ul>
                                </Collapsible>
                            </div>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setTourBookingDropdown(!tourBookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={mapSVG} alt="tour" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname.includes("/explore/tour-bookings") ? "text-white" : "text-white"}`}>
                                                    Tour Bookings
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${tourBookingDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={tourBookingDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        {/* All Tour Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings" ? "text-white" : "text-white"}`}>
                                                    <span className=""> All </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {tourBookings.length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* All Tour Bookings End */}
                                        {/* Pending Tour Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings/pending" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings/pending" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings/pending" ? "text-white" : "text-white"}`}>
                                                    <span className=""> In Review </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-semibold">
                                                        {tourBookings.filter((booking: { status: string }) => booking.status === "pending").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Pending Tour Bookings End */}
                                        {/* Confirmed Tour Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings/confirmed" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings/confirmed" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings/confirmed" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Confirmed </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {tourBookings.filter((booking: { status: string }) => booking.status === "confirmed").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Confirmed Tour Bookings End */}
                                        {/* Cancelled Tour Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings/cancelled" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings/cancelled" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings/cancelled" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Cancelled </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {tourBookings.filter((booking: { status: string }) => booking?.status === "cancelled").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Cancelled Tour Bookings End */}
                                        {/* Refunded Tour Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings/refunded" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings/refunded" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings/refunded" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Refunded </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {tourBookings.filter((booking: { paymentStatus: string }) => booking.paymentStatus === "refunded").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Refunded Tour Bookings End */}
                                        {/* Installment Tour Bookings*/}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-bookings/installment" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-bookings/installment" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-sm ${location.pathname === "/explore/tour-bookings/installment" ? "text-white" : "text-white"}`}>
                                                    <span className=""> Installment </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {tourBookings.filter((booking: { installment: boolean }) => booking.installment === true).length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* Installment Tour Bookings End */}
                                    </ul>
                                </Collapsible>
                            </div>

                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setBookingDropdown(!bookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={bookingsSVG} alt="bookings svg" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/bookings" ? "text-white" : "text-white"}`}>
                                                    Bookings
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${bookingDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={bookingDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out`}
                                    >
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/flight-bookings" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/flight-bookings" ? "bg-gray-500" : ""}`}>
                                                <img src={flightSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/flight-bookings" ? "text-white" : "text-white"}`}>
                                                    Flight Bookings
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/hotel-reservations" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/hotel-reservations" ? "bg-gray-500" : ""}`}>
                                                <img src={hotelSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/hotel-reservations" ? "text-white" : "text-white"}`}>
                                                    Hotel Reservations
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/visa-applications" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/visa-applications" ? "bg-gray-500" : ""}`}>
                                                <img src={visaSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/visa-applications" ? "text-white" : "text-white"}`}>
                                                    Visa Applications
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/private-trips" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/private-trips" ? "bg-gray-500" : ""}`}>
                                                <img src={privateSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/private-trips" ? "text-white" : "text-white"}`}>
                                                    Private Trips
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                        </div>
                        {/* Bookings End */}
                        {/* Management */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="">
                                    Management
                                </span>
                            </h4>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setActivityDropdown(!activityDropdown),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={activitySVG} alt="activity" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/activities" ? "text-white" : "text-white"}`}>
                                                    Activities
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${activityDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={activityDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/explore/activities" ? "text-white" : "text-white"}`}>
                                                    <span className="sm:block"> All Activities</span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/activities/add" ? "text-white" : "text-white"}`}>
                                                    Add Activity
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities/categories" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities/categories" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/explore/activities/categories" ? "text-white" : "text-white"}`}>
                                                    <span className="sm:block"> Categories</span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/activities/categories/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/activities/categories/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/activities/categories/add" ? "text-white" : "text-white"}`}>
                                                    Add Category
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setTravelPackageDropdown(!travelPackageDropdown),
                                                setActivityDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={travelPackageSVG} alt="travel-package" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/travel-packages" ? "text-white" : "text-white"}`}>
                                                    Travel Packages
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${travelPackageDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={travelPackageDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out`}
                                    >
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-packages" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-packages" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/explore/travel-packages" ? "text-white" : "text-white"}`}>
                                                    <span className="">
                                                        All Travel Packages
                                                    </span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/travel-packages/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/travel-packages/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/travel-packages/add" ? "text-white" : "text-white"}`}>
                                                    Add Travel Package
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setRetreatPackageDropdown(!retreatPackageDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={retreatPackageSVG} alt="retreat-package" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/retreat-packages" ? "text-white" : "text-white"}`}>
                                                    Retreat Packages
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${retreatPackageDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={retreatPackageDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out`}
                                    >
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-packages" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-packages" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/explore/retreat-packages" ? "text-white" : "text-white"}`}>
                                                    <span className="">
                                                        All Retreat Packages
                                                    </span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/retreat-packages/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/retreat-packages/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/retreat-packages/add" ? "text-white" : "text-white"}`}>
                                                    Add Retreat Package
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setTourPackageDropdown(!tourPackageDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setWaitlistDropdown(false),
                                                setTourBookingDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={tourPackageSVG} alt="tour-package" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/tour-packages" ? "text-white" : "text-white"}`}>
                                                    Tour Packages
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${tourPackageDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={tourPackageDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out`}
                                    >
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-packages" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-packages" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/explore/tour-packages" ? "text-white" : "text-white"}`}>
                                                    <span className="">
                                                        All Tour Packages
                                                    </span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/explore/tour-packages/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/explore/tour-packages/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/tour-packages/add" ? "text-white" : "text-white"}`}>
                                                    Add Tour Package
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                        </div>
                        {/* Management End */}
                        {/* Marketing */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="">
                                    Marketing
                                </span>
                            </h4>
                            {/* wailist */}
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setWaitlistDropdown(!waitlistDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setRetreatPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setRetreatsBookingDropdown(false),
                                                setBookingDropdown(false),
                                                setTourBookingDropdown(false),
                                                setTourPackageDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={bellRingSVG} alt="bell" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/explore/waitlist" ? "text-white" : "text-white"}`}>
                                                    Waitlist
                                                </h4>
                                            </div>
                                            <svg
                                                className={`w-4 h-4 transform transition-transform duration-500 ${waitlistDropdown ? "rotate-180" : ""}`}
                                                aria-hidden="true"
                                                fill="none"
                                                stroke="#ffffff"
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M19 9l-7 7-7-7"
                                                ></path>
                                            </svg>
                                        </button>
                                    }
                                    open={waitlistDropdown}
                                    transitionTime={300}
                                    easing="ease-in-out"
                                >
                                    <ul
                                        className={`pl-1 flex flex-col gap-1.5 w-full transition-all duration-500 ease-in-out `}
                                    >
                                        {Object.entries(waitList).map(([packageTitle, entries]) => (
                                            <li key={packageTitle} className="bar-item hover:text-gray-400">
                                                <NavLink to={`/explore/waitlist/${convertedTitle(packageTitle)}`}
                                                    className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === `/explore/waitlist/${convertedTitle(packageTitle)}` ? "bg-gray-500" : ""}`}
                                                >
                                                    <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === `/explore/waitlist/${convertedTitle(packageTitle)}` ? "text-white" : "text-white"}`}>
                                                        <span className="sm:block">
                                                            {packageTitle.length > 15 ? `${packageTitle.substring(0, 15)}...` : packageTitle}
                                                        </span>
                                                    </p>
                                                    <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                        <p className="text-xs text-[#FFFFFF] font-bold">
                                                            {entries.length}
                                                        </p>
                                                    </div>
                                                </NavLink>
                                            </li>
                                        ))}
                                    </ul>
                                </Collapsible>
                            </div>
                            {/* wailist End */}
                            {/* Explore Vault */}
                            <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                                <NavLink
                                    to="/explore/explore-vault"
                                    className={`flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer ${location.pathname === "/explore/explore-vault" ? "bg-gray-500" : ""}`}
                                >
                                    <img src={piggySolidSVG} alt="activity" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/explore-vault" ? "text-white" : "text-white"}`}>
                                        Explore  Vault
                                    </h4>
                                </NavLink>
                            </div>
                        </div>
                        {/* Marketing End */}
                        {/* Finance */}
                        <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                            <NavLink
                                to="/explore/invoices"
                                className={`flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer ${location.pathname === "/explore/invoices" ? "bg-gray-500" : ""}`}
                            >
                                <img src={invoiceSVG} alt="activity" className="w-6 h-6" />
                                <h4 className={`font-semibold text-base  sm:text-[15px] sm:block ${location.pathname === "/explore/invoices" ? "text-white" : "text-white"}`}>
                                    Invoices
                                </h4>
                            </NavLink>
                        </div>
                        {/* Finance End */}
                        {/* Employees */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="">
                                    Employees
                                </span>
                            </h4>
                            <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                                <NavLink
                                    to="/employees"
                                    className={`flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer ${location.pathname === "/employees" ? "bg-gray-500" : ""}`}
                                >
                                    <img src={userSVG} alt="employees" className="w-5 h-5" />
                                    <h4 className={`font-semibold text-base sm:text-[15px] sm:block ${location.pathname === "/employees" ? "text-white" : "text-white"}`}>
                                        Employees
                                    </h4>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}