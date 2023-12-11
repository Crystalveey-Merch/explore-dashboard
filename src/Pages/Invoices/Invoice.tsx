/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, getDocs, db, } from '../../Config/firebase';
import { handleFormatDate } from "../../Hooks";

export const Invoice = () => {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [invoice, setInvoice] = useState<any>({});
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "transactions"));
                const invoices: any[] = [];
                querySnapshot.forEach((doc) => {
                    invoices.push({
                        id: doc.id,
                        ...doc.data(),
                    });
                });
                setInvoices(invoices);
            } catch (error) {
                console.log(error);
            }
        }
        fetchInvoices();
    }, []);

    useEffect(() => {
        const invoice = invoices.find((invoice) => invoice.id === id);
        setInvoice(invoice);
    }, [invoices, id]);


    return (
        <div className="w-full flex py-16 px-36">
            <div className="w-full flex flex-col gap-10">
                <div className="flex flex-col gap-2">
                    <h2 className="text-2xl font-semibold text-[#1C1C1C]">
                        Invoice
                    </h2>
                    <div className="flex gap-2.5 items-center">
                        <Link to="/" className="text-[rgb(33,43,54)] text-sm font-medium hover:underline">
                            Dashboard
                        </Link>
                        {/* a dot */}
                        <span className="h-1 w-1 rounded-full bg-[rgb(99,115,129)]">
                        </span>
                        <Link to="/invoices" className="text-[rgb(33,43,54)] text-sm font-medium hover:underline">
                            Invoices
                        </Link>
                        {/* a dot */}
                        <span className="h-1 w-1 rounded-full bg-[rgb(99,115,129)]">
                        </span>
                        <span className="text-[rgb(99,115,129)] text-sm font-medium">
                            {invoice?.id}
                        </span>
                    </div>
                </div>
                {/* Actions to edit, save send e.t.c */}
                <div className="flex gap-2">
                    {/* edit */}
                    {/* <Link to={`/invoices/${invoice?.id}/edit`} > */}
                    <button className="flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium h-9 w-9 rounded-full transition-colors duration-200 transform hover:bg-gray-200">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="16"
                            width="16"
                            viewBox="0 0 512 512"
                        >
                            <path
                                opacity="1"
                                fill="currentColor"
                                d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"
                            />
                        </svg>
                    </button>
                    {/* </Link> */}
                    {/* pdf download */}
                    <button className="flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium h-9 w-9 rounded-full transition-colors duration-200 transform hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--eva" width="20" height="20" viewBox="0 0 24 24"><defs><path id="iconifyReact316" fill="currentColor" d="M21.9 11c0-.11-.06-.22-.09-.33a4.17 4.17 0 0 0-.18-.57c-.05-.12-.12-.24-.18-.37s-.15-.3-.24-.44S21 9.08 21 9s-.2-.25-.31-.37s-.21-.2-.32-.3L20 8l-.36-.24a3.68 3.68 0 0 0-.44-.23l-.39-.18a4.13 4.13 0 0 0-.5-.15a3 3 0 0 0-.41-.09h-.18A6 6 0 0 0 6.33 7h-.18a3 3 0 0 0-.41.09a4.13 4.13 0 0 0-.5.15l-.39.18a3.68 3.68 0 0 0-.44.23L4.05 8l-.37.31c-.11.1-.22.19-.32.3s-.21.25-.31.37s-.18.23-.26.36s-.16.29-.24.44s-.13.25-.18.37a4.17 4.17 0 0 0-.18.57c0 .11-.07.22-.09.33A5.23 5.23 0 0 0 2 12a5.5 5.5 0 0 0 .09.91c0 .1.05.19.07.29a5.58 5.58 0 0 0 .18.58l.12.29a5 5 0 0 0 .3.56l.14.22a.56.56 0 0 0 .05.08L3 15a5 5 0 0 0 4 2a2 2 0 0 1 .59-1.41A2 2 0 0 1 9 15a1.92 1.92 0 0 1 1 .27V12a2 2 0 0 1 4 0v3.37a2 2 0 0 1 1-.27a2.05 2.05 0 0 1 1.44.61A2 2 0 0 1 17 17a5 5 0 0 0 4-2l.05-.05a.56.56 0 0 0 .05-.08l.14-.22a5 5 0 0 0 .3-.56l.12-.29a5.58 5.58 0 0 0 .18-.58c0-.1.05-.19.07-.29A5.5 5.5 0 0 0 22 12a5.23 5.23 0 0 0-.1-1Z"></path><path id="iconifyReact317" fill="currentColor" d="M14.31 16.38L13 17.64V12a1 1 0 0 0-2 0v5.59l-1.29-1.3a1 1 0 0 0-1.42 1.42l3 3A1 1 0 0 0 12 21a1 1 0 0 0 .69-.28l3-2.9a1 1 0 1 0-1.38-1.44Z"></path></defs><use href="#iconifyReact316"></use><use href="#iconifyReact317"></use><use href="#iconifyReact316"></use><use href="#iconifyReact317"></use></svg>
                    </button>
                    {/*print */}
                    <button className="flex items-center justify-center text-[rgb(99,115,129)] text-sm font-medium h-9 w-9 rounded-full transition-colors duration-200 transform hover:bg-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="component-iconify MuiBox-root css-1t9pz9x iconify iconify--solar" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.121 21.121C18 20.243 18 18.828 18 16v-3.34c-1.477-.502-3.458-.91-6-.91s-4.523.408-6 .91V16c0 2.828 0 4.243.879 5.121C7.757 22 9.172 22 12 22c2.828 0 4.243 0 5.121-.879Z"></path><path fill="currentColor" d="M16 6H8c-2.828 0-4.243 0-5.121.879C2 7.757 2 9.172 2 12c0 2.828 0 4.243.879 5.121c.492.493 1.153.71 2.136.804C5 17.366 5 16.748 5 16.071v-3.029l-.193.085a.75.75 0 0 1-.614-1.368c1.722-.773 4.288-1.51 7.807-1.51c3.52 0 6.085.737 7.807 1.51a.75.75 0 1 1-.614 1.368a12.138 12.138 0 0 0-.193-.085v3.029c0 .677 0 1.295-.015 1.854c.983-.095 1.644-.311 2.136-.804C22 16.243 22 14.828 22 12c0-2.828 0-4.243-.879-5.121C20.243 6 18.828 6 16 6Zm1.12-3.121C16.243 2 14.829 2 12 2s-4.243 0-5.122.879c-.492.492-.709 1.153-.804 2.136C6.634 5 7.252 5 7.93 5h8.141c.678 0 1.296 0 1.855.015c-.095-.983-.312-1.644-.804-2.136Z"></path></svg>
                    </button>
                </div>
                <div className="rounded-2xl p-10 w-full flex flex-col gap-8"
                    style={{
                        boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px",
                        border: "rgb(255, 255, 255)",
                    }}
                >
                    <div className="w-full flex justify-between">
                        <img src="../../../public/20231116_210104-removebg-preview.png" alt="logo" className="h-12 w-12" />
                        <div className="">
                            {invoice?.status === "paid" && (
                                <p className="h-6 bg-[rgba(34,197,94,0.16)] text-[rgb(17,141,87)] rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                    Paid
                                </p>
                            )}
                            {invoice?.status === "installment" && (
                                <p className="h-6 bg-purple-300 text-purple-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                    Installment
                                </p>
                            )}
                            {invoice?.status === "pending" && (
                                <p className="h-6 bg-orange-200 text-orange-900 rounded-md px-1.5 text-xs font-bold inline-flex items-center whitespace-nowrap">
                                    In Review
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="w-full flex">
                        <div className="w-1/2 flex flex-col gap-4">
                            <h5 className="text-black text-sm font-semibold">
                                Invoice From
                            </h5>
                            <div className="flex flex-col gap-1">
                                <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                    Explore Crystalveey
                                </p>
                                <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                    Email: explore@crystalveey.com
                                </p>
                                <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                    Phone: +254 812 609 1411
                                </p>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex flex-col gap-4">
                                <h5 className="text-black text-sm font-semibold">
                                    Invoice To
                                </h5>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                        {invoice?.name}
                                    </p>
                                    <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                        Email: {invoice?.email}
                                    </p>
                                    <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                        Phone: {invoice?.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-full flex">
                        {/* date */}
                        <div className="w-1/2 flex flex-col gap-4">
                            <h5 className="text-black text-sm font-semibold">
                                Date Created
                            </h5>
                            <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                {handleFormatDate(invoice?.dateCreated)}
                            </p>
                        </div>
                    </div>
                    <div className="relative sm:rounded-lg">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 bg-[rgb(244,246,248)]">
                                <tr>
                                    <th scope="col" className="p-4 w-20">
                                        #
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Item
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Duration
                                    </th>
                                    <th scope="col" className="px-6 py-3 flex gap-1 items-center">
                                        Price
                                    </th>
                                    <th scope="col" className="w-40 px-6 py-3 text-xs font-bold">
                                        Total
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-dashed border-[rgb(244,246,248)]">
                                    <td className="p-4">
                                        1
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <h4 className="text-sm font-semibold text-[rgb(33,43,54)]">
                                                {invoice?.title}{" "} {invoice?.type}
                                            </h4>
                                            {/* <p className="text-sm font-medium text-ellipsis">
                                                {invoice}
                                            </p> */}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {invoice?.moreData?.duration}
                                    </td>
                                    <td className="px-6 py-4 flex gap-1 items-center">
                                        {invoice?.overallPrice?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                    </td>
                                    <td className="px-6 py-4 text-xs font-bold">
                                        {invoice?.overallPrice?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end items-center gap-4">
                        <div className="flex flex-col gap-1">
                            <h5 className="text-black text-sm font-semibold">
                                Total
                            </h5>
                            <p className="text-[rgb(99,115,129)] text-sm font-medium">
                                {invoice?.overallPrice?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}