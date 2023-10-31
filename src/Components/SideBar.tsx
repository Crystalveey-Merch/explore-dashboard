import { useState } from "react"
import { NavLink } from "react-router-dom"
import { useDispatch, } from 'react-redux';
import { toggleMenu } from '../Config/rightBarToggleSlice';
import Logo from "../../public/logo-black.png"
import PlusSVG from "../assets/SVG/Dashboard/plus.svg"
import barChartSVG from "../assets/SVG/Dashboard/bar-chart-square.svg"
import activitySVG from "../assets/SVG/Dashboard/outdoor-trip.svg"
import travelPackageSVG from "../assets/SVG/Dashboard/tour.svg"


export const SideBar = () => {
    const dispatch = useDispatch();
    const [activityDropdown, setActivityDropdown] = useState<boolean>(false);
    const [travelPackageDropdown, setTravelPackageDropdown] = useState<boolean>(false);

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


    return (
        <div className="bar-links sm:z-2"  onClick={handleMenu}>
            <div className="h-screen bg[#00afef] w-[268px] flex flex-col justify-between border-r border-gray-300 2xl:w-[240px] xl:w-max md:px2 sm:absolute sm:bg-white sm:pt-20 sm:w-[230px]">
                <div className="flex flex-col gap10 h-full">
                    <NavLink to="/">
                        <h2 className="bar-item px-0.5 uppercase font-bold text-4xl text-blue-700 xl:text-center xl:py-4 sm:py-0 sm:text-left sm:pl-2 sm:text-3xl">
                            <span className="xl:hidden">
                                <img src={Logo} alt="logo" className="w-full h-20" />
                            </span>
                            <span className="hidden xl:inline text-center text-5xl font-extrabold sm:hidden">
                                EC
                            </span>
                        </h2>

                    </NavLink>
                    <div className="h-full bg-[#00afef] pt-10 p-4 flex flex-col gap-2 sm:py-3 sm:p-1">
                        <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                            <NavLink to="/"
                                className={({ isActive }) => (isActive ? "bar-item flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 sm:h-8 bg-gray-800" : "bar-item flex gap-3.5 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 pl-3.5 xl:px-3 sm:h-8")}
                            >
                                <img src={barChartSVG} alt="bar-chart" className="w-6 h-6" />
                                <h4 className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/" ? "text-white" : "text-white"}`}>
                                    Dashboard
                                </h4>
                            </NavLink>
                        </div>
                        <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                            <div
                                className={`flex justify-between w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer`}
                                onClick={() => setActivityDropdown(!activityDropdown)}
                            >
                                <div className="flex gap-3.5 items-center">
                                    <img src={activitySVG} alt="activity" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/activities" ? "text-white" : "text-white"}`}>
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
                            </div>
                            <ul
                                className={`pl-5 flex flex-col gap-1.5 w-full h-0 overflow-hidden transition-all duration-500 ease-in-out ${activityDropdown ? "h-[90px]" : ""}`}
                            >
                                <li className="hover:text-gray-400">
                                    <NavLink to="/activities" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer ${location.pathname === "/activities" ? "bg-gray-800" : ""}`}>
                                        <p className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/activities" ? "text-white" : "text-white"}`}>
                                            All Activities
                                        </p>
                                    </NavLink>
                                </li>
                                <li className="hover:text-gray-400">
                                    <NavLink to="/activities/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer ${location.pathname === "/activities/add" ? "bg-gray-800" : ""}`}>
                                        <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                        <p className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/activities/add" ? "text-white" : "text-white"}`}>
                                            Add Activity
                                        </p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="bar-item flex flex-col items-center gap-1 xl:px-1">
                            <div
                                className={`flex justify-between w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer`}
                                onClick={() => setTravelPackageDropdown(!travelPackageDropdown)}
                            >
                                <div className="flex gap-3.5 items-center">
                                    <img src={travelPackageSVG} alt="travel-package" className="w-6 h-6" />
                                    <h4 className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/travel-packages" ? "text-white" : "text-white"}`}>
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
                            </div>
                            <ul
                                className={`pl-5 flex flex-col gap-1.5 w-full h-0 overflow-hidden transition-all duration-500 ease-in-out ${travelPackageDropdown ? "h-[90px]" : ""}`}
                            >
                                <li className="hover:text-gray-400">
                                    <NavLink to="/travel-packages" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer ${location.pathname === "/travel-packages" ? "bg-gray-800" : ""}`}>
                                        <p className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/travel-packages" ? "text-white" : "text-white"}`}>
                                            All Travel Packages
                                        </p>
                                    </NavLink>
                                </li>
                                <li className="hover:text-gray-400">
                                    <NavLink to="/travel-packages/add" className={`flex gap-3 w-full h-10 items-center bgwhite hover:bg-gray-400 rounded-md transition duration-500 ease-in-out py-3 px-3.5 xl:px-3 sm:h-8 cursor-pointer ${location.pathname === "/travel-packages/add" ? "bg-gray-800" : ""}`}>
                                        <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                        <p className={`font-semibold text-base xl:hidden sm:text-sm sm:block ${location.pathname === "/travel-packages/add" ? "text-white" : "text-white"}`}>
                                            Add Travel Package
                                        </p>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}