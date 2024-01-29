/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, db } from '../../../Config/firebase';
import { toast } from "react-toastify";
import { FlightBookingRow } from "../../../Components";


export const FlightBookings = () => {
    const [flightBookings, setFlightBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchFlightBookings = async () => {
            setLoading(true);
            const flightBookingsRef = collection(db, "flight-bookings");
            const flightBookingsSnapshot = await getDocs(flightBookingsRef);
            const flightBookings: any[] = [];
            flightBookingsSnapshot.forEach((doc) => {
                flightBookings.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setFlightBookings(flightBookings);
            setLoading(false);
        };
        fetchFlightBookings();
    }, []);

    const handleDeleteFlightBooking = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this flight booking?")) {
            try {
                await deleteDoc(doc(db, "flight-bookings", id));

                const updatedFlightBookings = flightBookings.filter((flightBooking) => flightBooking.id !== id);
                setFlightBookings(updatedFlightBookings);

                toast.success("Flight booking deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error deleting flight booking");
            }
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }


    return (
        <div className="mx-10 py-14 flex flex-col gap-10 xl:mx-6 xl:w-[calc(100vw-3rem)] lg:gap-16 md:gap-12  sm:mx-4 sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-[28px] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                    Flight Bookings
                </h1>
            </div>

            <div
                className="w-full rounded-2xl flex flex-col lg:overflow-x-scroll xl:overflow-y-hidden xl:rounded-lg"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="relative sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                {/* <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th> */}
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 flex gap-1 items-center 2xl:px-4 xl:px-3">
                                    Departure Location
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Destination Location
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Departure Date
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Return Date
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {flightBookings.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    {/* <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td> */}
                                    <td className="px-6 py-4" colSpan={8}>
                                        <div className="flex flex-col gap-1 items-start">
                                            <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                No flight bookings found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                <tbody>
                                    {flightBookings.map((flightBooking) => (
                                        <FlightBookingRow
                                            key={flightBooking.id}
                                            flightBooking={flightBooking}
                                            handleDeleteFlightBooking={handleDeleteFlightBooking}
                                        />
                                    ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}