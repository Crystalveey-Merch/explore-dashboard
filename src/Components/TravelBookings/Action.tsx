/* eslint-disable @typescript-eslint/no-explicit-any */
import Popover from '@mui/material/Popover';
import eyeSVG from "../../assets/SVG/Invoice/eye.svg";
// import editSVG from "../../assets/SVG/Invoice/pencil-ui.svg";
import downloadSVG from "../../assets/SVG/Dashboard/Action/download.svg";
import printSVG from "../../assets/SVG/Dashboard/Action/print.svg";
import shareSVG from "../../assets/SVG/Dashboard/Action/share.svg";
import { Link } from 'react-router-dom';



export const Action = ({ viewRoute, handleClick, handleClose, open, id, anchorEl }: { viewRoute: string, handleClick: any, handleClose: any, open: boolean, id: string | undefined, anchorEl: any }) => {
    return (
        <div className='flex items-center'>
            <button aria-describedby={id} onClick={handleClick} className=''>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                </svg>
            </button>
            {/* <div className='right-20 relative'> */}
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                <div
                    className={`w-36 p-2 bg-white rounded-md flex flex-col gap-1 bg-gradient-to-bl from-purple-50 via-white to-green-50 transform transition-transform duration-500 ease-out`}
                    style={{ boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px" }}
                >
                    <Link
                        to={viewRoute}
                        className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                        <img src={eyeSVG} alt="View flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-semibold text-[rgb(33,43,54)]">
                            View
                        </span>
                    </Link>
                    <button className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left">
                        <img src={downloadSVG} alt="Edit flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-semibold text-[rgb(33,43,54)]">
                            Download
                        </span>
                    </button>
                    <button
                        className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left"
                    >
                        <img src={printSVG} alt="Delete flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-semibold text-[rgb(33,43,54)]">
                            Print
                        </span>
                    </button>
                    <button
                        className="inline-flex p-2 gap-2.5 hover:bg-gray-100 rounded-md items-center w-full text-left"
                    >
                        <img src={shareSVG} alt="Delete flightBooking" className="w-5 h-5" />
                        <span className="text-sm font-semibold text-[rgb(33,43,54)]">
                            Share
                        </span>
                    </button>
                </div>
            </Popover>
            {/* </div> */}
        </div>
    )
}