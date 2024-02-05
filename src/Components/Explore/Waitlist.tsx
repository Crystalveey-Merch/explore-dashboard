/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import TablePagination from '@mui/material/TablePagination';
import { collection, getDocs,  db } from '../../Config/firebase';
// import { toast } from "react-toastify";
import { handleFormatTimestampToDateC } from "../../Hooks";
import { SearchInput } from "../../Components"
import { Sort } from "../../Hooks";
import noResultImg from "../../assets/Images/Dashboard/no-results.png"


export const Waitlist = () => {
    const { packageTitle } = useParams<{ packageTitle: string }>();
    // const [allWaitlist, setAllWaitlist] = useState<any[]>([]);
    const [waitlist, setWaitlist] = useState<any[]>([]);
    const [displayedWaitlist, setDisplayedWaitlist] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    // const capitalizeFirstLetter = (word: string) => {
    //     return word.charAt(0).toUpperCase() + word.slice(1);
    // };

    // const convertToMatchCountry = (routeTitle: string) => {
    //     if (routeTitle.includes("-")) {
    //         return routeTitle
    //             .split("-")
    //             .map((word) => capitalizeFirstLetter(word))
    //             .join(" ");
    //     }
    //     return capitalizeFirstLetter(routeTitle);
    // };

    const convertedTitle = (title: string) => {
        return title.toLowerCase().split(" ").join("-");
    };

    useEffect(() => {
        const fetchWaitlist = async () => {
            setLoading(true);
            const waitlistRef = collection(db, "waitlist");
            const waitlistSnapshot = await getDocs(waitlistRef);

            const waitlistData: any[] = [];

            waitlistSnapshot.forEach((doc) => {
                const waitlistEntry = {
                    id: doc.id,
                    ...doc.data(),
                };
                waitlistData.push(waitlistEntry);
            });

            // return only waitlist that the packageTitle matches the route
            // setAllWaitlist(waitlistData);
            setWaitlist(waitlistData.filter((entry) => convertedTitle(entry.packageTitle) === packageTitle));
            setDisplayedWaitlist(waitlistData.filter((entry) => convertedTitle(entry.packageTitle) === packageTitle));
            setLoading(false);
        };

        fetchWaitlist();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [packageTitle]);


    // const handleDelete = async (id: string, title: string) => {
    //     if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
    //         try {
    //             await deleteDoc(doc(db, "waitlist", id));

    //             // Update the state after successful deletion
    //             const newWaitlist = allWaitlist.filter(
    //                 (waitlist) => waitlist.id !== id
    //             );
    //             setAllWaitlist(newWaitlist);
    //             toast.success("Travel Package deleted successfully");
    //         } catch (error) {
    //             console.log(error);
    //             toast.error("Something went wrong");
    //         }
    //     }
    // }

    // format date to string
    const formatDateToString = (dateString: string): number => new Date(dateString).getTime();

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "packageTitle") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => a.packageTitle.localeCompare(b.packageTitle)));
        } else if (sort === "desc" && activeTab === "packageTitle") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => b.packageTitle.localeCompare(a.packageTitle)));
        } else if (sort === "asc" && activeTab === "authorName") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => a.authorName.localeCompare(b.authorName)));
        } else if (sort === "desc" && activeTab === "authorName") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => b.authorName.localeCompare(a.authorName)));
        } else if (sort === "asc" && activeTab === "authorPhone") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => a.authorPhone.localeCompare(b.authorPhone)));
        } else if (sort === "desc" && activeTab === "authorPhone") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => b.authorPhone.localeCompare(a.authorPhone)));
        } else if (sort === "asc" && activeTab === "createdAt") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => formatDateToString(a.createdAt) - formatDateToString(b.createdAt)));
        } else if (sort === "desc" && activeTab === "createdAt") {
            setDisplayedWaitlist([...displayedWaitlist].sort((a, b) => formatDateToString(b.createdAt) - formatDateToString(a.createdAt)));
        } else {
            setDisplayedWaitlist(waitlist);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sort, activeTab]);

    // search
    const [search, setSearch] = useState<string>("");
    // search by authorName, packageTitle, authorPhone and authorEmail
    useEffect(() => {
        if (search) {
            const searchResult = waitlist.filter((entry) => {
                return (
                    entry.authorName.toLowerCase().includes(search.toLowerCase()) ||
                    entry.packageTitle.toLowerCase().includes(search.toLowerCase()) ||
                    entry.authorPhone.toLowerCase().includes(search.toLowerCase()) ||
                    entry.authorEmail.toLowerCase().includes(search.toLowerCase())
                );
            });
            setDisplayedWaitlist(searchResult);
        } else {
            setDisplayedWaitlist(waitlist);
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
                    Waitlist for {waitlist[0]?.packageTitle}
                </h1>
            </div>
            <div
                className="w-full rounded-2xl flex flex-col gap-4"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="flex justify-end pt-5 px-4">
                    <SearchInput search={search} setSearch={setSearch} placeholder="Search by name, phone, email, or package title" />
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
                                        tab="authorName"
                                        label="Customer Info"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="packageTitle"
                                        label="Package Title"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="authorPhone"
                                        label="Customer Phone"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="createdAt"
                                        label="Date"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {displayedWaitlist.length === 0 ? (
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
                                {displayedWaitlist.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, id) => (
                                    <tbody key={id} >
                                        <tr className="bg-white border-b hover:bg-gray-50 ">
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap flex gap-2 items-center mx-6">
                                                <div className="flex flex-col gap-0.5">
                                                    <p className="text-sm font-medium text-ellipsis">
                                                        {item.authorName}
                                                    </p>
                                                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                                                        {item.authorEmail}
                                                    </p>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.packageTitle}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.authorPhone}
                                            </td>
                                            <td className="px-6 py-4">
                                                {handleFormatTimestampToDateC(item.createdAt)}
                                            </td>
                                            <td className="flex items-center px-6 py-4 space-x-3">
                                                {/* <button
                                                    onClick={() => handleDelete(item.id, item.title)} className="font-medium my-auto text-red-600 dark:text-red-500 hover:underline">Remove</button> */}
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
                        count={displayedWaitlist.length}
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