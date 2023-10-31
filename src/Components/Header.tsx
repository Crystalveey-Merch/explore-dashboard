import { NavLink } from 'react-router-dom'
import notificationImg from '../assets/SVG/Dashboard/notification.svg'
import { ProfileDropdown } from '.';
import { useDispatch, useSelector } from 'react-redux';
import { selectToggle, toggleMenu } from '../Config/rightBarToggleSlice';

export const Header = () => {
    const dispatch = useDispatch();
    const state = useSelector(selectToggle)
    //console.log(state)

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
        <div className="bg-white z-40 h-20 px-6 border-b border-gray-300  justify-between flex items-center md:px-3 sm:px-2">
            <div className="flex items-center gap-3 sm:gap-1">
                <button
                    id="menu-btn"
                    onClick={handleMenu}
                    className={`hamburger  ${state ? "open" : ""
                        } hidden sm:flex focus:outline-none z-30 `}
                >
                    <svg fill="none" stroke="currentColor" 
                    className='h-7 w-7'
                    strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"></path>
                    </svg>
                </button>
                <div>Switch</div>
            </div>
            {/* <div className='relative'>
                <div
                    className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Chatter"
                    className="border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-[400px] pl-10 p-2.5 transition duration-500 ease-in-out focus:outline-none focus:ring-2 focus:ring-opacity-50 md:w-[300px] sm:w-[185px]"
                />
            </div> */}
            <div className='flex gap-3.5 items-center sm:gap-1'>
                <NavLink to='/' className='bar-item'>
                    <img src={notificationImg} alt="bell" className='h-6 w-6' />
                </NavLink>
                <ProfileDropdown />
            </div>
        </div>
    )
}