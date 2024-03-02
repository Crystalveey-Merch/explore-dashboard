/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import TablePagination from '@mui/material/TablePagination';
import { handleFormatDateB, handleFormatToDateAndTime } from "../Hooks";
import { SearchInput } from "../Components"
import { Sort } from "../Hooks";
import noResultImg from "../assets/Images/Dashboard/no-results.png"


export const Employees = ({ admins }: any) => {
    const [displayedAdmins, setDisplayedAdmins] = useState<any[]>([]);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    // format date to string
    const formatDateToString = (dateString: string): number => new Date(dateString).getTime();

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "displayName") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => a.displayName.localeCompare(b.displayName)));
        } else if (sort === "desc" && activeTab === "email") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => b.email.localeCompare(a.email)));
        } else if (sort === "asc" && activeTab === "lastLogin") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => a.lastLogin - b.lastLogin))
        } else if (sort === "desc" && activeTab === "lastLogin") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => b.lastLogin - a.lastLogin))
        } else if (sort === "asc" && activeTab === "lastActive") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => a.lastActive - b.lastActive))
        } else if (sort === "desc" && activeTab === "lastActive") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => b.lastActive - a.lastActive))
        } else if (sort === "asc" && activeTab === "createdAt") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => formatDateToString(a.createdAt) - formatDateToString(b.createdAt)));
        } else if (sort === "desc" && activeTab === "createdAt") {
            setDisplayedAdmins([...displayedAdmins].sort((a, b) => formatDateToString(b.createdAt) - formatDateToString(a.createdAt)));
        } else {
            setDisplayedAdmins(admins);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    // search
    const [search, setSearch] = useState<string>("");

    // search by name and email
    useEffect(() => {
        if (search) {
            const searchResult = admins.filter((entry: { displayName: string; email: string; }) => {
                return (
                    entry.displayName.toLowerCase().includes(search.toLowerCase()) ||
                    entry.email.toLowerCase().includes(search.toLowerCase())
                );
            });
            setDisplayedAdmins(searchResult);
        } else {
            setDisplayedAdmins(admins);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [search]);

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


    return (
        <div className="px-10 py-14 flex flex-col gap-20 xl:px-6 xl:w-[calc(100vw-10px)] lg:gap-16 md:gap-12 md:w-[100vw] sm:gap-9 sm:px-4">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-3xl font-bold text-gray-800 xl:text-2xl lg:text-xl">
                    Admins
                </h1>
            </div>
            <div
                className="w-full rounded-2xl flex flex-col gap-4"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="flex justify-end pt-5 px-4">
                    <SearchInput search={search} setSearch={setSearch} placeholder="Search by name and email" />
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
                                        tab="displayName"
                                        label="Admin Info"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="lastActive"
                                        label="Last Active"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="lastLogin"
                                        label="Last Login"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="createdAt"
                                        label="Date Created"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {displayedAdmins.length === 0 ? (
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
                                {displayedAdmins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((person, id) => (
                                    <tbody key={id} >
                                        <tr className="bg-white border-b hover:bg-gray-50 ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-sm font-medium text-ellipsis">
                                                        {person.displayName}
                                                    </p>
                                                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                                                        {person.email}
                                                    </p>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {handleFormatToDateAndTime(person.lastActive)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {handleFormatToDateAndTime(person.lastLogin)}
                                            </td>
                                            <td className="px-6 py-4">
                                                {handleFormatDateB(person.createdAt)}
                                            </td>
                                            <td className="flex items-center px-6 py-4 space-x-3">
                                                {/* <button
                                                    onClick={() => handleDelete(person.id} className="font-medium my-auto text-red-600 dark:text-red-500 hover:underline">Remove</button> */}
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
                        count={displayedAdmins.length}
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