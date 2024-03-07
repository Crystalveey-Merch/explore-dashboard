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

export const AllCategory = ({ AllCategories }: { AllCategories: any[], }) => {
    const [categories, setCategories] = useState<any[]>([]);
    const [displayedCategories, setDisplayedCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        setLoading(true);
        setCategories(AllCategories);
        setDisplayedCategories(AllCategories);
        setLoading(false);
    }, [AllCategories]);

    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                // Delete the document from Firestore
                await deleteDoc(doc(db, 'categories', id));

                // Update the state after successful deletion
                const updatedCategories = categories.filter((category) => category.id !== id);
                setCategories(updatedCategories);
                setDisplayedCategories(updatedCategories);
                toast.success("Category deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Something went wrong");
            }
        }
    }

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "name") {
            setDisplayedCategories([...displayedCategories].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (sort === "desc" && activeTab === "name") {
            setDisplayedCategories([...displayedCategories].sort((a, b) => b.name.localeCompare(a.name)));
        } else if (sort === "asc" && activeTab === "description") {
            setDisplayedCategories([...displayedCategories].sort((a, b) => a.description.localeCompare(b.description)));
        } else if (sort === "desc" && activeTab === "description") {
            setDisplayedCategories([...displayedCategories].sort((a, b) => b.description.localeCompare(a.description)));
        } else {
            setDisplayedCategories(categories);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    const [search, setSearch] = useState<string>("");
    // search by name and description
    useEffect(() => {
        setDisplayedCategories(categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase()) || category.description.toLowerCase().includes(search.toLowerCase())));
    }, [search, categories]);

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
                    All Categories
                </h1>
                <NavLink to="/explore/activities/categories/add">
                    <BlueButton
                        className="lg:py-1.5"
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                                <p className="xl:text-sm xl:font-normal">Add New Category</p>
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
                            List of all categories
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
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
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="name"
                                                    label="Name"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="description"
                                                    label="Description"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="createdAt"
                                                    label="Created At"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                < Sort
                                                    sort={sort}
                                                    activeTab={activeTab}
                                                    handleSortChange={handleSortChange}
                                                    tab="updatedAt"
                                                    label="Updated At"
                                                />
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Action
                                            </th>
                                        </tr>
                                    </thead>
                                    {displayedCategories.length === 0 ? (
                                        <tbody className="bg-white border-b border-gray-200">
                                            <tr className="bg-white border-b">
                                                <td className="px-6 py-6" colSpan={5}>
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
                                            {displayedCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                                                <tbody key={category.id}>
                                                    <tr className="bg-white border-b hover:bg-gray-50">

                                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-5">
                                                            <img
                                                                src={category.image}
                                                                alt="activity"
                                                                className="w-14 h-14 rounded-md object-cover"
                                                            />
                                                            <p>
                                                                {category.name}
                                                            </p>
                                                        </th>
                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                            {/* must not be more than 10 words */}
                                                            {category.description.split(" ").slice(0, 10).join(" ")}...
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {new Date(category.createdAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {new Date(category.updatedAt).toLocaleDateString()}
                                                        </td>
                                                        <td className="flex items-center px-6 py-4 space-x-3">
                                                            <NavLink
                                                                to={`/explore/activities/categories/edit/${category.id}`}
                                                                className="font-medium my-auto text-blue-600 dark:text-blue-500 hover:underline">Edit</NavLink>
                                                            <button
                                                                onClick={() => handleDelete(category.id, category.name)}
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
                                    count={displayedCategories.length}
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