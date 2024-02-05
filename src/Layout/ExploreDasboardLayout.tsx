/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react"
import { collection, getDocs, db } from '../Config/firebase';
// import { useNavigate } from "react-router-dom"
// import { getKey } from "../Components/KeyFunctions"
import { Header, SideBar } from "../Components"


export const ExploreDasboardLayout = ({ children }: { children: ReactNode }) => {
    // const navigate = useNavigate()

    // useEffect(() => {
    //     const key = getKey("brand")
    //     if (!key) {
    //         navigate("/choose-brand")
    //     }
    // }, [navigate])

    const [travelBookings, setTravelBookings] = useState<any[]>([])
    const [activityBookings, setActivityBookings] = useState<any[]>([])
    const [retreatBookings, setRetreatBookings] = useState<any[]>([])

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
            // set bookings of type "Exciting Activities" to state
            setActivityBookings(bookings.filter((booking: { type: string }) => booking.type === "Exciting Activities"));
            // set bookings of type "Retreats Packages" to state
            setRetreatBookings(bookings.filter((booking: { type: string }) => booking.type === "Retreats Packages"));
        }
        fetchTravelBookings()
    }, [])

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='z-30'>
                <SideBar travelBookings={travelBookings} activityBookings={activityBookings} retreatBookings={retreatBookings} />
            </div>
            <div className='flex flex-grow overflow-auto'>
                {/* flex-grow or flex-1 */}
                <div className='flex-grow border-r border-r-gray-300 min-h-screen h-max flex flex-col'>
                    <div className='sticky top-0 z-10'>
                        <Header />
                    </div>

                    <div className='flex-grow h-max font-public-sans'>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}