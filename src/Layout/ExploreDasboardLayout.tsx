/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, useEffect, useState } from "react"
import { collection, db, onSnapshot } from '../Config/firebase';
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

    const [bookings, setBookings] = useState<any[]>([]);
    const [travelBookings, setTravelBookings] = useState<any[]>([])
    const [activityBookings, setActivityBookings] = useState<any[]>([])
    const [retreatBookings, setRetreatBookings] = useState<any[]>([])
    const [tourBookings, setTourBookings] = useState<any[]>([])
    const [waitList, setWaitList] = useState<any[]>([])

    // useEffect(() => {
    //     const fetchTravelBookings = async () => {
    //         const bookingsRef = collection(db, "transactions");
    //         const bookingsSnapshot = await getDocs(bookingsRef);
    //         const bookings: any[] = [];
    //         bookingsSnapshot.forEach((doc: { id: any; data: () => any; }) => {
    //             bookings.push({
    //                 id: doc.id,
    //                 ...doc.data(),
    //             });
    //         });
    //         // set bookings of type "Promoted Travel Package" to state
    //         setTravelBookings(bookings.filter((booking: { type: string }) => booking.type === "Promoted Travel Package"));
    //         // set bookings of type "Exciting Activities" to state
    //         setActivityBookings(bookings.filter((booking: { type: string }) => booking.type === "Exciting Activities"));
    //         // set bookings of type "Retreats Packages" to state
    //         setRetreatBookings(bookings.filter((booking: { type: string }) => booking.type === "Retreats Packages"));
    //     }
    //     fetchTravelBookings()
    //     fetchWaitlist();
    // }, [])

    // const fetchWaitlist = async () => {
    //     try {
    //         const waitlistRef = collection(db, 'waitlist');
    //         const waitlistSnapshot = await getDocs(waitlistRef);

    //         const waitlistData = [] as any[];

    //         waitlistSnapshot.forEach((doc) => {
    //             const waitlistEntry = {
    //                 id: doc.id,
    //                 ...doc.data(),
    //             };
    //             waitlistData.push(waitlistEntry);
    //         });

    //         // console.log(waitlistData);

    //         // Group by packageTitle using an object
    //         const groupedWaitlist = waitlistData.reduce((acc, entry) => {
    //             const { packageTitle, ...rest } = entry;
    //             if (!acc[packageTitle]) {
    //                 acc[packageTitle] = [];
    //             }
    //             acc[packageTitle].push(rest);
    //             return acc;
    //         }, {});

    //         // console.log('Grouped Waitlist:', groupedWaitlist);

    //         // Set the grouped data in your state or use it as needed
    //         setWaitList(groupedWaitlist);
    //     } catch (error) {
    //         console.error('Error fetching waitlist:', error);
    //         // Handle the error as needed
    //     }
    // };


    // console.log(waitList)

    useEffect(() => {
        const unsubscribeBookings = onSnapshot(collection(db, 'transactions'), (snapshot) => {
            const updatedBookings = [] as any;
            snapshot.forEach((doc) => {
                updatedBookings.push({ ...doc.data(), id: doc.id });
            });
            setBookings(updatedBookings);
        });

        const unsubscribeWaitlist = onSnapshot(collection(db, 'waitlist'), (snapshot) => {
            const updatedWaitlist = [] as any;
            snapshot.forEach((doc) => {
                updatedWaitlist.push({ ...doc.data(), id: doc.id });
            });

            // Group by packageTitle using an object
            const groupedWaitlist = updatedWaitlist.reduce((acc: any, entry: any) => {
                const { packageTitle, ...rest } = entry;
                if (!acc[packageTitle]) {
                    acc[packageTitle] = [];
                }
                acc[packageTitle].push(rest);
                return acc;
            }, {});

            setWaitList(groupedWaitlist);
        });

        // Cleanup function to unsubscribe from real-time updates
        return () => {
            unsubscribeBookings();
            unsubscribeWaitlist();
        };
    }, []);

    useEffect(() => {
        const travelBookings = bookings.filter((booking: { type: string }) => booking.type === "Promoted Travel Package");
        const activityBookings = bookings.filter((booking: { type: string }) => booking.type === "Exciting Activities");
        const retreatBookings = bookings.filter((booking: { type: string }) => booking.type === "Retreats Packages");
        const tourBookings = bookings.filter((booking: { type: string }) => booking.type === "Tour Packages");

        setTravelBookings(travelBookings);
        setActivityBookings(activityBookings);
        setRetreatBookings(retreatBookings);
        setTourBookings(tourBookings);
    }, [bookings]);

    return (
        <div className='flex h-screen overflow-hidden'>
            <div className='z-30'>
                <SideBar travelBookings={travelBookings} activityBookings={activityBookings} retreatBookings={retreatBookings} tourBookings={tourBookings} waitList={waitList}
                />
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