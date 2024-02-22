/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { deleteDoc, doc, db } from '../../../Config/firebase';
import { toast } from "react-toastify";
import { BlueButton, SearchInput } from "../../../Components";
import PlusSVG from "../../../assets/SVG/Dashboard/plus.svg"
import { Sort } from "../../../Hooks";
import noResultImg from "../../../assets/Images/Dashboard/no-results.png"




export const TourPackages = ({ allTours }: { allTours: any }) => {
    const [tourPackages, setTourPackages] = useState<any[]>([]);
    const [displayedTours, setDisplayedTours] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        setLoading(true);
        setTourPackages(allTours);
        setDisplayedTours(allTours);
        setLoading(false);
    }, [allTours]);


    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                // Delete the document from Firestore
                await deleteDoc(doc(db, 'tourPackages', id));

                // Update the state after successful deletion
                const updatedActivities = tourPackages.filter((tour) => tour.id !== id);
                setTourPackages(updatedActivities);
                setDisplayedTours(updatedActivities);
                toast.success("Tour Package deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
    }


    // format date to string
    // const formatDateToString = (dateString: string): number => new Date(dateString).getTime();

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "activityName") {
            setDisplayedTours([...displayedTours].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (sort === "desc" && activeTab === "activityName") {
            setDisplayedTours([...displayedTours].sort((a, b) => b.name.localeCompare(a.name)));
        } else if (sort === "asc" && activeTab === "price") {
            setDisplayedTours([...displayedTours].sort((a, b) => a.price - b.price));
        } else if (sort === "desc" && activeTab === "price") {
            setDisplayedTours([...displayedTours].sort((a, b) => b.price - a.price));
        } else if (sort === "asc" && activeTab === "country") {
            setDisplayedTours([...displayedTours].sort((a, b) => a.country.localeCompare(b.country)));
        } else if (sort === "desc" && activeTab === "country") {
            setDisplayedTours([...displayedTours].sort((a, b) => b.country.localeCompare(a.country)));
        } else if (sort === "asc" && activeTab === "location") {
            setDisplayedTours([...displayedTours].sort((a, b) => a.location.localeCompare(b.location)));
        } else if (sort === "desc" && activeTab === "location") {
            setDisplayedTours([...displayedTours].sort((a, b) => b.location.localeCompare(a.location)));
        } else {
            setDisplayedTours(tourPackages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    // search
    const [search, setSearch] = useState<string>("");
    // search by name and country
    useEffect(() => {
        setDisplayedTours(tourPackages.filter((tour) => tour.name.toLowerCase().includes(search.toLowerCase()) || tour.country.toLowerCase().includes(search.toLowerCase()) || tour.location.toLowerCase().includes(search.toLowerCase())
        ));
    }, [search, tourPackages]);


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
        <div className="px-10 py-14 flex flex-col gap-20 xl:px-6 xl:w-[calc(100vw-10px)] lg:gap-16 md:gap-12 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-3xl font-bold text-gray-800 xl:text-2xl lg:text-xl">
                    Tour Packages
                </h1>
                <NavLink to="/explore/tour-packages/add">
                    <BlueButton
                        className="lg:py-1.5"
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                <p className="xl:text-sm xl:font-normal">
                                    Add New Tour Package
                                </p>
                            </div>
                        }
                        onClick={undefined} />
                </NavLink>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        {/* <h2 className="text-xl font-bold text-gray-800">
                            Activities
                        </h2> */}
                        <p className="text-sm text-gray-500">
                            List of all tour packages
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <div
                            className="w-full rounded-2xl flex flex-col gap-4"
                            style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
                        >
                            <div className="flex justify-end pt-5 px-4">
                                <SearchInput search={search} setSearch={setSearch} placeholder="Search by name or category" />
                            </div>
                            <div className="relative w-full lg:overflow-x-scroll xl:overflow-y-hidden xl:rounded-lg">
                                <table className="w-full text-sm text-left text-gray-500">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                        <tr>

                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="activityName"
                                                    label="Activity Name"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="price"
                                                    label="Price"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="category"
                                                    label="Category"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="available"
                                                    label="Available"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="location"
                                                    label="Location"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {displayedTours.length === 0 ? (
                                        <tbody className="bg-white border-b border-gray-200">
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-6" colSpan={6}>
                                                    <div className="flex flex-col gap-1 items-center">
                                                        <img
                                                            src={noResultImg}
                                                            alt="No result found"
                                                            className="max-w-[145px]"
                                                        />
                                                        <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                            No result found
                                                        </p>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <>
                                            {displayedTours.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((tour) => (
                                                <tbody key={tour.id}>
                                                    <tr className="bg-white border-b hover:bg-gray-50">

                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-5">
                                                            <img
                                                                src={tour.imageOne}
                                                                alt="activity"
                                                                className="w-14 h-14 rounded-md object-cover"
                                                            />
                                                            <p>
                                                                {tour.name}
                                                            </p>
                                                        </th>
                                                        <td className="px-6 py-4">
                                                            {tour.price ? tour.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' }) : "Free"}
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {tour.country}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            Yes
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {tour.location}
                                                        </td>
                                                        <td className="flex items-center px-6 py-4 space-x-3">
                                                            <NavLink
                                                                to={`/explore/tour-packages/edit/${tour.id}`}
                                                                className="font-medium my-auto text-blue-600 dark:text-blue-500 hover:underline">Edit</NavLink>
                                                            <button
                                                                onClick={() => handleDelete(tour.id, tour.name)}
                                                                className="font-medium my-auto text-red-600 dark:text-red-500 hover:underline">Remove</button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            ))}
                                        </>
                                    )}
                                </table>
                            </div>
                            <div className="p-2">
                                <TablePagination
                                    component="div"
                                    count={displayedTours.length}
                                    page={page}
                                    onPageChange={handleChangePage}
                                    rowsPerPage={rowsPerPage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                    rowsPerPageOptions={[5, 10, 25]}
                                    className="flex justify-end"
                                />
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}