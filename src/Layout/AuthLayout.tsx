import { ReactNode } from 'react';
import authBgImg from '../assets/Images/Auth/vacation.jpg';
import { useNavigate } from "react-router-dom";
import backImg from "../assets/SVG/Auth/arrowcircleleft.svg"

export const AuthLayout = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    return (
        <div className='flex flex-row w-full gap-40 overflow-hidden h-screen 2xl:gap-16 xl:gap-0'>
            <div className='w-[43.19%] relative flex lg:hidden'>
                <div className='z-10 px-9 bg-black bg-opacity-50 w-full h-full flex flex-col gap-6 justify-center items-center'>
                    <h3 className='text-white text-center text-5xl font-bold'
                    style={{lineHeight: '3.5rem'}}
                    >
                        Explore Crystalveey
                    </h3>
                    <p className='text-white text-center text-2xl font-medium leading-normal xl:text-xl'>
                    Your Gateway to Unforgettable Experiences
                    </p>
                </div>
                <img src={authBgImg} alt="a woman writing" className='z-0 absolute top-0 left-0 w-full h-full' />
            </div>
            <div className='flex-grow overflow-auto pl-8 pr-28 relative z-20 xl:pr-16 lg:px-20 lg:py-5 sm:px-6'>
                {children}
                <div className="absolute right-10 top-10 xl:right-5">
                    <button onClick={() => navigate(-1)} className="bg-white rounded-full flex gap-1 items-center">
                        <img src={backImg} alt="back" className="w-8 h-8 xl:h-6 xl:w-6" />
                        <p className="text-sm text-black">Back</p>
                    </button>
                </div>
            </div>
        </div>
    )
}