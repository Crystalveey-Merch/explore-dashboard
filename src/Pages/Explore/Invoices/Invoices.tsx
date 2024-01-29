/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import TablePagination from '@mui/material/TablePagination';
import { collection, getDocs, deleteDoc, doc, db } from '../../../Config/firebase';
import { toast } from "react-toastify";
// import moment from "moment";
import { Sort } from "../../../Hooks";
import { InvoiceRow, InvoicesOverview } from "../../../Components";



export const Invoices = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [displayedInvoices, setDisplayedInvoices] = useState<any[]>([]);
    // show filter types
    const [activeFilter, setActiveFilter] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const [sort, setSort] = useState("");
    const [activeTab, setActiveTab] = useState("");

    const handleSortChange = (value: string, tab: string) => {
        setSort(value);
        setActiveTab(tab);
    };

    useEffect(() => {
        const fetchInvoices = async () => {
            setLoading(true);
            const invoicesRef = collection(db, "transactions");
            const invoicesSnapshot = await getDocs(invoicesRef);
            const invoices: any[] = [];
            invoicesSnapshot.forEach((doc) => {
                invoices.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setInvoices(invoices);
            setLoading(false);
        };
        fetchInvoices();
    }, []);

    const handleDeleteInvoice = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this invoice?")) {
            try {
                await deleteDoc(doc(db, "transactions", id));

                const updatedInvoices = invoices.filter((invoice) => invoice.id !== id);
                setInvoices(updatedInvoices);

                toast.success("Invoice deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error deleting invoice");
            }
        }
    }

    const [status, setStatus] = useState<string>("all");

    // displayed invoices based on their status
    useEffect(() => {
        if (status === "all") {
            setDisplayedInvoices(invoices);
            // clear only status filter from active filter
            setActiveFilter(activeFilter.filter((filter) => filter.type !== "status"));
        } else if (status === "paid") {
            setDisplayedInvoices(invoices.filter((invoice) => invoice.status === "paid"));
            // set active filter with type status and value paid
            setActiveFilter([{ type: "status", value: "paid" }]);
        } else if (status === "installment") {
            setDisplayedInvoices(invoices.filter((invoice) => invoice.installment === true));
            // set active filter with type status and value installment
            setActiveFilter([{ type: "status", value: "installment" }]);
        } else if (status === "pending") {
            setDisplayedInvoices(invoices.filter((invoice) => invoice.status === "pending"));
            // set active filter with type status and value pending
            setActiveFilter([{ type: "status", value: "pending" }]);
        } else if (status === "overdue") {
            setDisplayedInvoices(invoices.filter((invoice) => (invoice.installment === true && invoice.payDeadline < new Date() && invoice.isInstallmentCompleted === false && invoice.status === "pending")));
            // set active filter with type status and value overdue
            setActiveFilter([{ type: "status", value: "overdue" }]);
        } else {
            setDisplayedInvoices(invoices);
            // clear only status filter from active filter
            setActiveFilter(activeFilter.filter((filter) => filter.type !== "status"));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, invoices]);

    // sort 
    useEffect(() => {
        if (sort === "asc" && activeTab === "customer") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => a.customer.name[0].localeCompare(b.customer.name[0])));
        } else if (sort === "desc" && activeTab === "customer") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => b.customer.name[0].localeCompare(a.customer.name[0])));
        } else if (sort === "asc" && activeTab === "created") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => a.dateCreated - b.dateCreated));
        } else if (sort === "desc" && activeTab === "created") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => b.dateCreated - a.dateCreated));
        } else if (sort === "asc" && activeTab === "amount") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => a.overallPrice - b.overallPrice));
        } else if (sort === "desc" && activeTab === "amount") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => b.overallPrice - a.overallPrice));
        } else if (sort === "asc" && activeTab === "transactionId") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => a.id.localeCompare(b.id)));
        } else if (sort === "desc" && activeTab === "transactionId") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => b.id.localeCompare(a.id)));
        } else if (sort === "asc" && activeTab === "status") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => a.status.localeCompare(b.status)));
        } else if (sort === "desc" && activeTab === "status") {
            setDisplayedInvoices([...displayedInvoices].sort((a, b) => b.status.localeCompare(a.status)));
        } else {
            setDisplayedInvoices(displayedInvoices);
        }
    }, [sort, activeTab, displayedInvoices]);


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
        <div className="px-10 py-14 flex flex-col gap-10 xl:px-6 xl:w-[calc(100vw-100px)] lg:gap-16 md:gap-12 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-[28px] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                    Invoices List
                </h1>
            </div>

            <InvoicesOverview invoices={invoices} />

            <div
                className="w-full rounded-2xl flex flex-col mb-10"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="px-4 flex gap-10 md:overflow-y-hidden md:overflow-x-scroll md:gap-6"
                    style={{ boxShadow: "rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset" }}
                >
                    <button
                        onClick={() => setStatus("all")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[48px] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "all" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold transition duration-300 ease-in-out ${status === "all" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            All
                        </p>
                        <p className={`h-6 w-6 bg-black text-white rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out`}>
                            {invoices.length}
                        </p>
                    </button>
                    <button
                        onClick={() => setStatus("paid")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "paid" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "paid" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Paid
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "paid" ? "bg-[rgb(17,141,87)] text-[#ffffff]" : "bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)]"}`}>
                            {invoices.filter((invoice) => invoice.status === "paid").length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("installment")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "installment" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "installment" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Installment
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "installment" ? "bg-purple-800 text-[#ffffff]" : "bg-purple-200 text-purple-800"}`}>
                            {invoices.filter((invoice) => invoice.installment === true).length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("pending")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "pending" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "pending" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            In Review
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "pending" ? "bg-orange-800 text-[#ffffff]" : "bg-orange-200 text-orange-800"}`}>
                            {invoices.filter((invoice) => invoice.status === "pending").length}
                        </p>
                    </button>
                    <button onClick={() => setStatus("overdue")}
                        className={`flex gap-2 items-center max-w-[360px] min-w-[max-content] min-h-[48px] pb-1 border-b-2 transition duration-300 ease-in-out  ${status === "overdue" ? "border-black" : "border-transparent"}`}>
                        <p className={`text-sm font-semibold text-[rgb(99,115,129)] transition duration-300 ease-in-out ${status === "overdue" ? "text-black" : "text-[rgb(99,115,129)]"}`}>
                            Overdue
                        </p>
                        <p className={`h-6 w-6  rounded-md px-1 text-xs font-bold inline-flex items-center justify-center transition duration-300 ease-in-out ${status === "overdue" ? "bg-red-800 text-[#ffffff]" : "bg-red-200 text-red-800"}`}>
                            {invoices.filter((invoice) => (invoice.installment === true && invoice.payDeadline < new Date() && invoice.isInstallmentCompleted === false && invoice.status === "pending")).length}
                        </p>
                    </button>
                </div>
                <div className="p-5 flex flex-col gap-3">
                    <p className="text-sm font-bold text-[rgb(99,115,129)]">
                        {displayedInvoices.length}
                        <span className="text-[rgb(145,158,171)] font-medium ml-0.5">
                            results found
                        </span>
                    </p>
                    {activeFilter.length > 0 && (
                        <div className="flex gap-2 items-center">
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
                                            onClick={() => {
                                                if (filter.type === "status") {
                                                    setStatus("all");
                                                }
                                            }}
                                            className="text-[rgb(255,255,255)]">
                                            <svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"><path opacity="1" fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" /></svg>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <button
                                onClick={() => {
                                    setStatus("all");
                                    // clear active filter
                                    setActiveFilter([]);
                                }}
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
                <div className="relative xl:overflow-y-hidden xl:overflow-x-scroll sm:rounded-lg">
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
                                        tab="customer"
                                        label="Customer"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="created"
                                        label="Created"
                                    />
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Due
                                </th> */}
                                <th scope="col" className="px-6 py-3 xl:px-3">
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="amount"
                                        label="amount"
                                    />
                                </th>
                                <th scope="col" className="px-6 py-3 xl:px-1">
                                    {/* Transaction ID */}
                                    <Sort
                                        sort={sort}
                                        activeTab={activeTab}
                                        handleSortChange={handleSortChange}
                                        tab="transactionId"
                                        label="Transaction ID"
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
                        {displayedInvoices.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="w-4 p-4 xl:p-2">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4" colSpan={8}>
                                        <div className="flex flex-col gap-1 items-center">
                                            <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                No invoices found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                <tbody>
                                    {displayedInvoices.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((invoice) => (
                                        <InvoiceRow
                                            key={invoice.id}
                                            invoice={invoice}
                                            // handleFormatDate={handleFormatDate}
                                            handleDeleteInvoice={handleDeleteInvoice}
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
                        count={displayedInvoices.length}
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
    );
}