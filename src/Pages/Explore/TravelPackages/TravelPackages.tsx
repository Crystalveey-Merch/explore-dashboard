/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { collection, getDocs, deleteDoc, doc, db } from '../../../Config/firebase';
import { toast } from "react-toastify";
import handleFormattedDateRange from "../../../Hooks/handleFormattedDateRange";
import { BlueButton, SearchInput } from "../../../Components"
import PlusSVG from "../../../assets/SVG/Dashboard/plus.svg"
import { Sort } from "../../../Hooks";
import noResultImg from "../../../assets/Images/Dashboard/no-results.png"



export const TravelPackages = () => {
    const [travelPackages, setTravelPackages] = useState<any[]>([]);
    const [displayedTravelPackages, setDisplayedTravelPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchTravelPackages = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'travelPackages'));
                const packagedata = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setTravelPackages(packagedata);
                setDisplayedTravelPackages(packagedata);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchTravelPackages();
    }, [])


    const handleDelete = async (id: string, title: string) => {
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            try {
                await deleteDoc(doc(db, "travelPackages", id));

                // Update the state after successful deletion
                const newTravelPackages = travelPackages.filter(
                    (travelPackage) => travelPackage.id !== id
                );
                setTravelPackages(newTravelPackages);

                toast.success("Travel Package deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
    }


    // format date to string
    const formatDateToString = (dateString: string): number => new Date(dateString).getTime();


    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "packageName") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => a.title.localeCompare(b.title)));
        } else if (sort === "desc" && activeTab === "packageName") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => b.title.localeCompare(a.title)));
        } else if (sort === "asc" && activeTab === "date") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => formatDateToString(a.startDate) - formatDateToString(b.startDate)));
        } else if (sort === "desc" && activeTab === "date") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => formatDateToString(b.startDate) - formatDateToString(a.startDate)));
        } else if (sort === "asc" && activeTab === "price") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => a.price - b.price));
        } else if (sort === "desc" && activeTab === "price") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => b.price - a.price));
        } else if (sort === "asc" && activeTab === "duration") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => a.duration - b.duration));
        } else if (sort === "desc" && activeTab === "duration") {
            setDisplayedTravelPackages([...displayedTravelPackages].sort((a, b) => b.duration - a.duration));
        } else {
            setDisplayedTravelPackages(travelPackages);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    // search
    const [search, setSearch] = useState<string>("");
    // search by name and category
    useEffect(() => {
        setDisplayedTravelPackages(travelPackages.filter((travelPackage) => travelPackage.title.toLowerCase().includes(search.toLowerCase())));
    }, [search, travelPackages]);

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
        <div className="px-10 py-14 flex flex-col gap-20 xl:px-6 xl:w-[calc(100vw-10px)] lg:gap-16 md:gap-12 md:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-3xl font-bold text-gray-800 xl:text-2xl lg:text-xl">
                    Travel Packages
                </h1>
                <NavLink to="/explore/travel-packages/add">
                    <BlueButton
                        className="lg:py-1.5"
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                <p className="xl:text-sm xl:font-normal">Add New Package</p>
                            </div>
                        }
                        onClick={undefined} />
                </NavLink>
            </div>

            {/* <div className="w-full min-h-[400px] flex flex-col gap-10 border border-gray-200 rounded-xl shadow">
                <table className="table-auto w-full text-left">
                    <thead>
                        <tr
                            className="border-b-gray-200 border-b font-medium text-xs text-gray-600"
                        >
                            <th className="py-3.5 pl-6">
                                Title
                            </th>
                            <th className="py-3.5 pl-6">
                                Amount
                            </th>
                            <th className="py-3.5 pl-6">
                                Date
                            </th>
                            <th className="py-3.5 pl-6">
                                Duration
                            </th>
                            <th className="py-3.5 pl-6">
                                Edit/Delete
                            </th>
                        </tr>
                    </thead>
                    {travelPackages.map((travelPackage, index) => (
                        <tbody key={index}>
                            <tr className="border-b-gray-200 border-b pb-0" >
                                <td className="py-4 pl-6 flex gap-3 items-center">
                                    <img
                                        src={travelPackage.images.imageOne}
                                        alt="travelPackage"
                                        className="w-14 h-14 rounded-md object-cover"
                                    />
                                    <p>
                                        {travelPackage.title}
                                    </p>
                                </td>
                                <td
                                    className="pl-6 font-normal text-sm"

                                >
                                    {travelPackage.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                </td>
                                <td className="pl-6 text-gray-600 text-sm font-normal">
                                    {handleFormattedDateRange(travelPackage.startDate, travelPackage.endDate)}
                                </td>
                                <td className="pl-6">
                                    {travelPackage.duration} days
                                </td>
                                <td className="pl-6">
                                    <div className="flex items-center gap-3">
                                        <NavLink to={`/travel-packages/edit/${travelPackage.id}`}>
                                            <WhiteButton
                                                label="Edit"
                                                onClick={undefined}
                                            />
                                        </NavLink>
                                        <BlueButton
                                            label="Delete"
                                            onClick={() => handleDelete(travelPackage.id, travelPackage.title)}
                                            className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                                        />
                                    </div>
                                </td>
                                <td>
                                </td>
                            </tr >
                        </tbody >
                    ))}
                </table >
            </div > */}
            <div
                className="w-full rounded-2xl flex flex-col gap-4"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="flex justify-end pt-5 px-4">
                    <SearchInput search={search} setSearch={setSearch} />
                </div>
                <div className="relative w-full lg:overflow-x-scroll xl:overflow-y-hidden xl:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="packageName"
                                        label="Package name"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="date"
                                        label="Date"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="available"
                                        label="Available"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="price"
                                        label="Price"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="duration"
                                        label="Duration"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {displayedTravelPackages.length === 0 ? (
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
                                {displayedTravelPackages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((travelPackage) => (
                                    <tbody key={travelPackage.id} >
                                        <tr className="bg-white border-b hover:bg-gray-50 ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-6">
                                                <img
                                                    src={travelPackage.images.imageOne}
                                                    alt="travelPackage"
                                                    className="w-14 h-14 rounded-md object-cover"
                                                />
                                                <p >
                                                    {travelPackage.title}
                                                </p>
                                            </th>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {handleFormattedDateRange(travelPackage.startDate, travelPackage.endDate)}
                                            </td>
                                            <td className="px-6 py-4">
                                                Yes
                                            </td>
                                            <td className="px-6 py-4">
                                                {travelPackage.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                {travelPackage.duration} days
                                            </td>
                                            <td className="flex items-center px-6 py-4 space-x-3">

                                                <NavLink to={`/travel-packages/edit/${travelPackage.id}`} className="font-medium my-auto text-blue-600 dark:text-blue-500 hover:underline">Edit</NavLink>
                                                <button
                                                    onClick={() => handleDelete(travelPackage.id, travelPackage.title)} className="font-medium my-auto text-red-600 dark:text-red-500 hover:underline">Remove</button>
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
                        count={displayedTravelPackages.length}
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="flex justify-end"
                    />
                </div>
            </div>
        </div >
    )
}