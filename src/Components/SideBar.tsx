/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react"
import { NavLink } from "react-router-dom"
import Collapsible from "react-collapsible";
import { collection, getDocs, db } from '../Config/firebase';
import { useDispatch, } from 'react-redux';
import { toggleMenu } from '../Config/rightBarToggleSlice';
import Logo from "../../public/modified-logo-removebg-preview.png"
import LogoSmall from "../../public/20231116_210104-removebg-preview.png"
import PlusSVG from "../assets/SVG/Dashboard/plus.svg"
import barChartSVG from "../assets/SVG/Dashboard/bar-chart-square.svg"
import invoiceSVG from "../assets/SVG/Dashboard/invoice-dollar.svg"
import activitySVG from "../assets/SVG/Dashboard/outdoor-trip.svg"
import travelPackageSVG from "../assets/SVG/Dashboard/tour.svg"
import bookingsSVG from "../assets/SVG/Dashboard/ticket.svg"
import flightSVG from "../assets/SVG/Dashboard/flight-takeoff.svg"
import hotelSVG from "../assets/SVG/Dashboard/hotel.svg"
import visaSVG from "../assets/SVG/Dashboard/passport.svg"
import routeSVG from "../assets/SVG/Dashboard/route-solid.svg"


export const SideBar = () => {
    const dispatch = useDispatch();
    const [activityDropdown, setActivityDropdown] = useState<boolean>(false);
    const [travelPackageDropdown, setTravelPackageDropdown] = useState<boolean>(false);
    const [travelBookingDropdown, setTravelBookingDropdown] = useState<boolean>(false);
    const [activitiesBookingDropdown, setActivitiesBookingDropdown] = useState<boolean>(false);
    const [bookingDropdown, setBookingDropdown] = useState<boolean>(false);


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

    const [travelBookings, setTravelBookings] = useState<any[]>([])
    const [activityBookings, setActivityBookings] = useState<any[]>([])

    useEffect(() => {
        const fetchTravelBookings = async () => {
            const bookingsRef = collection(db, "transactions");
            const bookingsSnapshot = await getDocs(bookingsRef);
            const bookings: any[] = [];
            bookingsSnapshot.forEach((doc: { id: any; data: () => any; }) => {
                bookings.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            // set bookings of type "Promoted Travel Package" to state
            setTravelBookings(bookings.filter((booking: { type: string }) => booking.type === "Promoted Travel Package"));
            // set bookings of type "Activity" to state
            setActivityBookings(bookings.filter((booking: { type: string }) => booking.type === "Exciting Activities"));
        }
        fetchTravelBookings()
    }, [])

    return (
        <div className="bar-links sm:z-2" onClick={handleMenu}>
            <div className="h-screen font-public-sans bg[#00afef] w-[268px] flex flex-col justify-between border-r border-gray-300 2xl:w-[250px] xl:w-max md:px2 sm:absolute sm:bg-white sm:pt-20 sm:w-[230px]" onClick={(e) => e.stopPropagation()}>
                <div className="flex flex-col gap10 h-full">
                    <NavLink to="/">
                        <h2 className=" px-0.5 uppercase font-bold text-4xl text-blue-700 xl:text-center xl:py-1 sm:py-0 sm:text-left sm:pl-2 sm:text-3xl">
                            <div className="xl:hidden p-2">
                                <img src={Logo} alt="logo" className="w-full h-[63px]" />
                            </div>
                            <div className="hidden xl:inline-flex justify-center sm:hidden">
                                <img src={LogoSmall} alt="logo" className="w-[60px] h-[63px]" />
                            </div>
                        </h2>

                    </NavLink>
                    <div className="h-full bg-[rgb(0,108,156)] pt-10 p-2 flex flex-col gap-5 sm:py-3 sm:p-1">
                        {/* Overview */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                Overview
                            </h4>
                            <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                                <NavLink to="/"
                                    className={({ isActive }) => (isActive ? "flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 bg-gray-500" : "flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 ")}
                                >
                                    <img src={barChartSVG} alt="bar-chart" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/" ? "text-white" : "text-white"}`}>
                                        Dashboard
                                    </h4>
                                </NavLink>
                            </div>
                        </div>
                        {/* Overview End */}
                        {/* Bookings */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="hidden xl:block sm:hidden">
                                    Bookings
                                </span>
                                <span className="xl:hidden sm:block">
                                    Bookings
                                </span>
                            </h4>
                            {/* Activity Booking */}
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setTravelBookingDropdown(!travelBookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={routeSVG} alt="route" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname.includes("/travel-bookings") ? "text-white" : "text-white"}`}>
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
                                            <NavLink to="/travel-bookings" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/travel-bookings" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/travel-bookings" ? "text-white" : "text-white"}`}>
                                                    <span className="xl:hidden sm:block"> All </span>
                                                    <span className="hidden xl:block sm:hidden">
                                                        All
                                                    </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                        {/* All Travel Bookings End */}
                                        {/* Paid Travel Bookings */}
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/travel-bookings/paid" className={`flex gap-3 w-full h-10 items-center justify-between bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/travel-bookings/paid" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/travel-bookings/paid" ? "text-white" : "text-white"}`}>
                                                    <span className="xl:hidden sm:block"> Paid </span>
                                                    <span className="hidden xl:block sm:hidden">
                                                        Paid
                                                    </span>
                                                </p>
                                                <div className="bg-gray-800 rounded-full p-1  w-[25px] flex items-center justify-center">
                                                    <p className="text-xs text-[#FFFFFF] font-bold">
                                                        {travelBookings.filter((booking: { status: string }) => booking.status === "Paid").length}
                                                    </p>
                                                </div>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                        </div>
                        {/* Bookings End */}
                        {/* Managementg */}
                        <div className="flex flex-col gap-2.5">
                            <h4 className="pl-2 uppercase font-extrabold text-[0.75rem] text-gray-100">
                                <span className="hidden xl:block sm:hidden">
                                    Manage
                                </span>
                                <span className="xl:hidden sm:block">
                                    Management
                                </span>
                            </h4>
                            <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                                <NavLink
                                    to="/invoices"
                                    className={`flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 cursor-pointer ${location.pathname === "/invoices" ? "bg-gray-500" : ""}`}
                                >
                                    <img src={invoiceSVG} alt="activity" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/invoices" ? "text-white" : "text-white"}`}>
                                        Invoices
                                    </h4>
                                </NavLink>
                            </div>
                            <div className="xl:px-1">
                                <Collapsible
                                    trigger={
                                        <button
                                            className={`flex justify-between w-full h-10 mb-1 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer`}
                                            onClick={() => (
                                                setActivityDropdown(!activityDropdown),
                                                setTravelPackageDropdown(false),
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={activitySVG} alt="activity" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/activities" ? "text-white" : "text-white"}`}>
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
                                            <NavLink to="/activities" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/activities" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/activities" ? "text-white" : "text-white"}`}>
                                                    <span className="xl:hidden sm:block"> All Activities</span>
                                                    <span className="hidden xl:block sm:hidden">
                                                        All
                                                    </span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/activities/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/activities/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/activities/add" ? "text-white" : "text-white"}`}>
                                                    Add Activity
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
                                                setTravelBookingDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setBookingDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={travelPackageSVG} alt="travel-package" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/travel-packages" ? "text-white" : "text-white"}`}>
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
                                            <NavLink to="/travel-packages" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/travel-packages" ? "bg-gray-500" : ""}`}>
                                                <p className={`font-semibold text-base sm:text-[15px] ${location.pathname === "/travel-packages" ? "text-white" : "text-white"}`}>
                                                    <span className="xl:hidden sm:block">
                                                        All Travel Packages
                                                    </span>
                                                    <span className="hidden xl:block sm:hidden">
                                                        All
                                                    </span>
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/travel-packages/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/travel-packages/add" ? "bg-gray-500" : ""}`}>
                                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/travel-packages/add" ? "text-white" : "text-white"}`}>
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
                                                setBookingDropdown(!bookingDropdown),
                                                setActivityDropdown(false),
                                                setTravelPackageDropdown(false),
                                                setActivitiesBookingDropdown(false),
                                                setTravelBookingDropdown(false)
                                            )}
                                        >
                                            <div className="flex gap-3.5 items-center">
                                                <img src={bookingsSVG} alt="bookings svg" className="w-6 h-6" />
                                                <h4 className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/bookings" ? "text-white" : "text-white"}`}>
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
                                            <NavLink to="/flight-bookings" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/flight-bookings" ? "bg-gray-500" : ""}`}>
                                                <img src={flightSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/flight-bookings" ? "text-white" : "text-white"}`}>
                                                    Flight Bookings
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/hotel-reservations" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/hotel-reservations" ? "bg-gray-500" : ""}`}>
                                                <img src={hotelSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/hotel-reservations" ? "text-white" : "text-white"}`}>
                                                    Hotel Reservations
                                                </p>
                                            </NavLink>
                                        </li>
                                        <li className="bar-item hover:text-gray-400">
                                            <NavLink to="/visa-applications" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 cursor-pointer ${location.pathname === "/visa-applications" ? "bg-gray-500" : ""}`}>
                                                <img src={visaSVG} alt="plus" className="w-4 h-4" />
                                                <p className={`font-semibold text-base xl:hidden sm:text-[15px] sm:block ${location.pathname === "/visa-applications" ? "text-white" : "text-white"}`}>
                                                    Visa Applications
                                                </p>
                                            </NavLink>
                                        </li>
                                    </ul>
                                </Collapsible>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}