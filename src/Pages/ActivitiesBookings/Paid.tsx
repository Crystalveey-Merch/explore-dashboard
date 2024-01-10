/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { collection, getDocs, db } from '../../Config/firebase';
import { TableRow } from "../../Components/ActivitiesBoking";
import { Sort } from "../../Hooks";
import noResultImg from "../../assets/Images/Dashboard/no-results.png"
import { SearchInput } from "../../Components";


export const PaidActivities = () => {
    const [activitiesBookings, setActivitiesBookings] = useState<any[]>([])
    const [displayedBookings, setDisplayedBookings] = useState<any[]>([])
    const [bookingsFiltered, setBookingsFiltered] = useState<any[]>([])
    // show filter
    const [activeFilter, setActiveFilter] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchTravelBookings = async () => {
            setLoading(true);
            const bookingsRef = collection(db, "transactions");
            const bookingsSnapshot = await getDocs(bookingsRef);
            const bookings: any[] = [];
            bookingsSnapshot.forEach((doc) => {
                bookings.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            // set bookings of type "Exciting Activities" to state
            setActivitiesBookings(bookings.filter((booking: { type: string, status: string }) => booking.type === "Exciting Activities" && booking.status === "paid"));
            setLoading(false);
        }
        fetchTravelBookings()
    }, [])

    const [status, setStatus] = useState<string>("all");

    // search filter, search by name, email, booking id
    const [search, setSearch] = useState<string>("");
    const [searchResults, setSearchResults] = useState<any[]>([]);
    const [searchActive, setSearchActive] = useState<boolean>(false);

    // display bookings based on status
    useEffect(() => {
        if (status === "all") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings);
                setBookingsFiltered(activitiesBookings);
            } else {
                setDisplayedBookings(searchResults);
            }
        } else if (status === "paid") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings.filter((booking) => booking.status === "paid"));
                setBookingsFiltered(activitiesBookings.filter((booking) => booking.status === "paid"));
            } else {
                setDisplayedBookings(searchResults.filter((booking) => booking.status === "paid"));
            }
        } else if (status === "installment") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings.filter((booking) => booking.installment === true));
                setBookingsFiltered(activitiesBookings.filter((booking) => booking.installment === true));
            } else {
                setDisplayedBookings(searchResults.filter((booking) => booking.installment === true));
            }
        } else if (status === "pending") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings.filter((booking) => booking.status === "pending"));
                setBookingsFiltered(activitiesBookings.filter((booking) => booking.status === "pending"));
            } else {
                setDisplayedBookings(searchResults.filter((booking) => booking.status === "pending"));
            }
        } else if (status === "cancelled") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings.filter((booking) => (booking.isCancelled === true)));
                setBookingsFiltered(activitiesBookings.filter((booking) => (booking.isCancelled === true)));
            } else {
                setDisplayedBookings(searchResults.filter((booking) => (booking.isCancelled === true)));
            }
        } else if (status === "refunded") {
            if (!searchActive) {
                setDisplayedBookings(activitiesBookings.filter((booking) => (booking.status === "refunded")));
                setBookingsFiltered(activitiesBookings.filter((booking) => (booking.status === "refunded")));
            } else {
                setDisplayedBookings(searchResults.filter((booking) => (booking.status === "refunded")));
            }
        } else {
            // setDisplayedBookings(activitiesBookings);
            // setBookingsFiltered(activitiesBookings);
        }
    }, [status, activitiesBookings, searchActive, searchResults]);


    // set active filter
    useEffect(() => {
        if (status === "all") {
            // clear only status filter from active filter
            setActiveFilter(activeFilter.filter((filter) => filter.type !== "status"));
        } else {
            // set active filter by adding to it's array of objects with type status and value based on status
            setActiveFilter([{ type: "status", value: status }, ...activeFilter.filter((filter) => filter.type !== "status")]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);


    useEffect(() => {
        if (searchActive) {
            setDisplayedBookings(searchResults);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchActive, searchResults]);

    // search filter
    useEffect(() => {
        if (search.length > 0) {
            setSearchResults(bookingsFiltered.filter((booking) => booking.name.toLowerCase().includes(search.toLowerCase()) || booking.email.toLowerCase().includes(search.toLowerCase()) || booking.id.toLowerCase().includes(search.toLowerCase())));
            setSearchActive(true);
            // set active filter by adding to it's array of objects with type keywords and value based on search
            setActiveFilter([{ type: "keywords", value: search }, ...activeFilter.filter((filter) => filter.type !== "keywords")]);
        } else {
            setSearchActive(false);
            setSearchResults([]);
            setActiveFilter(activeFilter.filter((filter) => filter.type !== "keywords"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

    // clear all filter
    const clearFilter = () => {
        setStatus("all");
        setSearch("");
        setSearchActive(false);
        setSearchResults([]);
        setActiveFilter([]);
    };

    // clear filter by type
    const clearFilterByType = (type: string) => {
        if (type === "status") {
            setStatus("all");
        } else if (type === "keywords") {
            setSearch("");
            setSearchActive(false);
            setSearchResults([]);
        }
    };


    // format date to string
    const formatDateToString = (dateString: string): number => new Date(dateString).getTime();

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "customer") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.name[0].localeCompare(b.name[0])));
        } else if (sort === "desc" && activeTab === "customer") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.name[0].localeCompare(a.name[0])));
        } else if (sort === "asc" && activeTab === "package") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.title.localeCompare(b.title)));
        } else if (sort === "desc" && activeTab === "package") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.title.localeCompare(a.title)));
        } else if (sort === "asc" && activeTab === "amount") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.overallPrice - b.overallPrice));
        } else if (sort === "desc" && activeTab === "amount") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.overallPrice - a.overallPrice));
        } else if (sort === "asc" && activeTab === "travellers") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.travellers - b.travellers));
        } else if (sort === "desc" && activeTab === "travellers") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.travellers - a.travellers));
        } else if (sort === "asc" && activeTab === "checkInDate") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => formatDateToString(a.date) - formatDateToString(b.date)));
        } else if (sort === "desc" && activeTab === "checkInDate") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => formatDateToString(b.date) - formatDateToString(a.date)));
        } else if (sort === "asc" && activeTab === "bookingId") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.id.localeCompare(b.id)));
        } else if (sort === "desc" && activeTab === "bookingId") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.id.localeCompare(a.id)));
        } else if (sort === "asc" && activeTab === "status") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => a.status.localeCompare(b.status)));
        } else if (sort === "desc" && activeTab === "status") {
            setDisplayedBookings([...displayedBookings].sort((a, b) => b.status.localeCompare(a.status)));
        } else {
            setDisplayedBookings(displayedBookings);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    // pagination 
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (_event: any, newPage: any) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="px-10 py-7 flex flex-col gap-10 xl:px-6 lg:gap-16 md:gap-12 sm:px-4 sm:gap-9">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl font-semibold text-[#1C1C1C]">
                    Paid Activities Bookings
                </h2>
                <div className="flex gap-2.5 items-center">
                    <Link to="/" className="text-[rgb(33,43,54)] text-sm font-medium hover:underline">
                        Dashboard
                    </Link>
                    {/* a dot */}
                    <span className="h-1 w-1 rounded-full bg-[rgb(99,115,129)]">
                    </span>
                    <Link to="/activities-bookings" className="text-[rgb(33,43,54)] text-sm font-medium hover:underline">
                        Activities Bookings
                    </Link>
                    {/* a dot */}
                    <span className="h-1 w-1 rounded-full bg-[rgb(99,115,129)]">
                    </span>
                    <span className="text-[rgb(99,115,129)] text-sm font-medium">
                        Paid
                    </span>
                </div>
            </div>
            <div
                className="w-full rounded-2xl flex flex-col mb-10 2xl:w-[calc(100vw-21rem)] xl:w-[calc(100vw-3rem)] sm:w-[calc(100vw-2rem)]"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="px-4 flex gap-10 overflow-y-hidden md overflow-xscrol md:gap-6"
                    // hide scrollbar
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset",
                        // scrollbar
                    }}
                >
                    <button
                        onClick={() => setStatus("all")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[48px] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "all" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold transition duration-300 ease-in-out ${status === "all" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            All
                        </p>
                        <p className={`h-6 w-6 bg-black text-white rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out`}>
                            {activitiesBookings.length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("pending")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "pending" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "pending" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            In Review
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "pending" ? "bg-orange-800 text-[#ffffff]" : "bg-orange-200 text-orange-800"}`}>
                            {activitiesBookings.filter((invoice) => invoice.status === "pending").length}
                        </p>
                    </button>
                    <button
                        onClick={() => setStatus("paid")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "paid" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "paid" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Paid
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "paid" ? "bg-[rgb(17,141,87)] text-[#ffffff]" : "bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)]"}`}>
                            {activitiesBookings.filter((invoice) => invoice.status === "paid").length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("installment")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "installment" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "installment" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Installment
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "installment" ? "bg-purple-800 text-[#ffffff]" : "bg-purple-200 text-purple-800"}`}>
                            {activitiesBookings.filter((invoice) => invoice.installment === true).length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("cancelled")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "cancelled" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "cancelled" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Cancelled
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "cancelled" ? "bg-red-700 text-[#ffffff]" : "bg-red-200 text-red-700"}`}>
                            {activitiesBookings.filter((invoice) => invoice.isCancelled === true).length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("refunded")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "refunded" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "refunded" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Refunded
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "refunded" ? "bg-stone-700 text-[#ffffff]" : "bg-stone-200 text-stone-700"}`}>
                            {activitiesBookings.filter((invoice) => invoice.status === "refunded").length}
                        </p>
                    </button>
                </div>
                {/* filter by search */}
                <div className="flex justify-end pt-5 px-4">
                    <SearchInput search={search} setSearch={setSearch} />
                </div>
                <div className="p-5 flex flex-col gap-3">
                    {activeFilter.length > 0 &&
                        <p className="text-sm font-bold text-[rgb(99,115,129)]">
                            {displayedBookings.length}
                            <span className="text-[rgb(145,158,171)] font-medium ml-0.5">
                                results found
                            </span>
                        </p>
                    }
                    {activeFilter.length > 0 && (
                        <div className="flex flex-wrap gap-2 items-center">
                            {activeFilter.map((filter) => (
                                <div className="p-1.5 flex gap-2 items-center border border-dotted border-gray-300 rounded-md">
                                    <p className="text-sm font-semibold text-[rgb(33,43,54)] capitalize">
                                        {filter.type}:
                                    </p>
                                    <div className="flex gap-1 items-center h-6 py-1 px-2 bg-[rgb(33,43,54)] rounded-lg">
                                        <p className="text-xs font-semibold text-[rgb(255,255,255)]">
                                            {filter.value}
                                        </p>
                                        <button
                                            onClick={() => clearFilterByType(filter.type)}
                                            className="text-[rgb(255,255,255)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => clearFilter()}
                                className="text-[rgb(255,86,48)] py-1.5 px-2 flex gap-2 items-center rounded-lg transition duration-300 ease-in-out hover:bg-red-50">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                <p className="text-sm font-bold">
                                    Clear
                                </p>
                            </button>
                        </div>
                    )}
                </div>
                <div className="relative overflow-y-hidden 2xl:overflow-x-scroll sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4 xl:p-2">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="package"
                                        label="Package"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="customer"
                                        label="Customer"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="travellers"
                                        label="Travellers"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="checkInDate"
                                        label="Check In Date"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-1">
                                    {/* Transaction ID */}
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="bookingId"
                                        label="Booking ID"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="status"
                                        label="Status"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-1">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {displayedBookings.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b">
                                    <td className="px-6 py-6" colSpan={8}>
                                        <div className="flex flex-col gap-1 items-center">
                                            <img
                                                src={noResultImg}
                                                alt="No result found"
                                                className="max-w-[145px]"
                                            />
                                            <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                No booking found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                <tbody>
                                    {displayedBookings.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((booking) => (
                                        <TableRow
                                            key={booking.id}
                                            booking={booking}
                                        />
                                    ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
                <div className="p-2">
                    <TablePagination
                        component="div"
                        count={displayedBookings.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="flex justify-end"
                    />
                </div>
            </div>
        </div>
    )
}