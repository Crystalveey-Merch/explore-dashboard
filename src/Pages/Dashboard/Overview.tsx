import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectUser } from "../../Config/userSlice"
import totalSvg from "../../assets/SVG/Dashboard/Overview/total.svg"
import canceledSvg from "../../assets/SVG/Dashboard/Overview/cancelled.svg"
import soldSvg from "../../assets/SVG/Dashboard/Overview/sold.svg"

export const Overview = () => {
    const navigate = useNavigate()
    const user = useSelector(selectUser)

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user, navigate])

    return (
        <div className="px-10 py-14 flex flex-col gap-20 xl:px-6 xl:w-[calc(100vw-100px)] lg:gap-16 md:gap-12 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center gap-5 lg:flex-col sm:gap-4">
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            200
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Total Bookings
                        </p>
                    </div>
                    <img src={totalSvg} alt="totalSvg" className="w-[120px] h-[120px]" />
                </div>
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            200
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Sold 
                        </p>
                    </div>
                    <img src={soldSvg} alt="soldSvg" className="w-[120px] h-[120px]" />
                </div>
                <div className="rounded-2xl bg-white w-full py-4 pr-6 pl-4 flex gap-6 justify-between"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px"
                    }}
                >
                    <div className="flex flex-col gap-2">
                        <h4 className="text-[2rem] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                            0
                        </h4>
                        <p className="text-sm font-medium text-[rgb(99,115,129)]">
                            Cancelled 
                        </p>
                    </div>
                    <img src={canceledSvg} alt="canceledSvg" className="w-[120px] h-[120px]" />
                </div>
            </div>
        </div>

    )
}