/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc, db } from '../../Config/firebase';
import { toast } from "react-toastify";
import moment from "moment";
import { BlueButton, InvoicesOverview } from "../../Components";
import { handleFormatDate, handleFormatTime } from "../../Hooks";



export const Invoices = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    const [showActions, setshowActions] = useState({});
    const actionRefs = useRef([]);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (actionRefs.current.length > 0) {
                let closeActions = true;

                // Check if the click occurred inside any of the actionRefs
                actionRefs.current.forEach((ref, index) => {
                    if (ref.current && ref.current.contains(event.target)) {
                        closeActions = false;
                    }
                });

                if (closeActions) {
                    setshowActions({});
                }
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const toggleAction = (id: string | number) => {
        setshowActions((prevState) => ({
            ...prevState,
            [id]: !prevState[id]
        }));
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
                className="w-full rounded-2xl flex flex-col"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="px-4 flex gap-10"
                    style={{ boxShadow: "rgba(145, 158, 171, 0.08) 0px -2px 0px 0px inset" }}
                >
                    <button className="flex gap-2 items-center max-w-[360px] min-w-[48px] min-h-[48px] pb-1 border-b-2 border-black">
                        <p className="text-sm font-semibold">
                            All
                        </p>
                        <p className="h-6 w-6 bg-black text-white rounded-md px-1 text-xs font-bold inline-flex items-center justify-center">
                            {invoices.length}
                        </p>
                    </button>
                    <button className="flex gap-2 items-center max-w-[360px] min-w-[48px] min-h-[48px] pb-1">
                        <p className="text-sm font-semibold text-[rgb(99,115,129)]">
                            Paid
                        </p>
                        <p className="h-6 w-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1 text-xs font-bold inline-flex items-center">
                            20
                        </p>
                    </button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                <div className="p-5">

                </div>


                <div className="relative sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="p-4">
                                    <div className="flex items-center">
                                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                    </div>
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 flex gap-1 items-center">
                                    <p>
                                        Create
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="rgb(99,115,129)" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg>
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Due
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    amount
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Transaction ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {invoices.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b hover:bg-gray-50">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2" />
                                            <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4" colSpan={8}>
                                        <div className="flex flex-col gap-1 items-start">
                                            <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                No invoices found
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        ) : (
                            <>
                                {invoices.map((invoice) => {

                                    return (
                                        <tbody key={invoice.id}>
                                            <tr className="bg-white border-b hover:bg-gray-50">
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 hover:cursor-pointer" />
                                                        <label htmlFor="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                    </div>
                                                </td>
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                                    <div className="flex gap-4 items-center">
                                                        <div className="w-10 h-10 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                                                            {invoice.name[0]}
                                                        </div>
                                                        <p className="text-sm font-medium text-ellipsis">
                                                            {invoice.name}
                                                        </p>
                                                    </div>
                                                </th>
                                                <td className="px-6 py-4">
                                                    <div className="flex flex-col gap-1 items-start">
                                                        <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                            {handleFormatDate(invoice.dateCreated)}
                                                        </p>
                                                        <p className="text-[rgb(99,115,129)] text-xs font-normal">
                                                            {handleFormatTime(invoice.timeCreated)}
                                                        </p>
                                                    </div>
                                                </td>
                                                {/* <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1 items-start">
                                                    <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap">
                                                        22 Nov 2023
                                                    </p>
                                                    <p className="text-[rgb(99,115,129)] text-xs font-normal">
                                                        12:00 PM
                                                    </p>
                                                </div>
                                            </td> */}
                                                <td className="px-6 py-4 text-[rgb(33,43,54)] text-sm">
                                                    {invoice.overallPrice.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {invoice.id}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                                                    Paid
                                                </p> */}
                                                    {invoice.status === "paid" && (
                                                        <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                                                            Paid
                                                        </p>
                                                    )}
                                                    {invoice.status === "installment" && (
                                                        <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                                                            Installment
                                                        </p>
                                                    )}
                                                    {invoice.status === "pending" && (
                                                        <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center">
                                                            In Review
                                                        </p>
                                                    )}
                                                </td>
                                                <td className="flex items-center px-6 py-4 space-x-3"
                                                >
                                                    <div className="relative"
                                                        ref={actionRefs.current[invoice.id]}
                                                    >
                                                        <button
                                                            onClick={() => toggleAction(invoice.id)}
                                                            className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 focus:outline-none"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                            </svg>
                                                        </button>
                                                        {showActions[invoice.id] && (
                                                            <div className="absolute top-0 right-6 z-10 w-32 py-2 bg-white rounded-md flex flex-col bg-gradient-to-bl from-purple-50 via-white to-green-50"
                                                                style={{ boxShadow: "rgba(145, 158, 171, 0.24) 0px 0px 2px 0px, rgba(145, 158, 171, 0.24) -20px 20px 40px -4px" }}
                                                            >
                                                                <button>
                                                                    view
                                                                </button>
                                                                <button>
                                                                    Edit
                                                                </button>
                                                                <button
                                                                    onClick={() => handleDeleteInvoice(invoice.id)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            </div>
                                                        )}
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                })}
                            </>
                        )}
                    </table>
                </div>
                <div className="p-5">

                </div>
            </div>
        </div>
    );
}