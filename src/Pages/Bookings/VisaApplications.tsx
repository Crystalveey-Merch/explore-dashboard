/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction, useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, db } from '../../Config/firebase';
import { toast } from "react-toastify";
import { VisaApplicationRow, VisaApplicationsOverview } from "../../Components";


export const VisaApplications = () => {
    const [visaApplications, setVisaApplications] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);


    useEffect(() => {
        const fetchVisaApplications = async () => {
            setLoading(true);
            const visaCountriesRef = collection(db, "visaApplications");
            const visaCountriesSnapshot = await getDocs(visaCountriesRef);

            const visaApplications: SetStateAction<any[]> = [];

            for (const countryDoc of visaCountriesSnapshot.docs) {
                const visaCountryRef = collection(db, "visaApplications", countryDoc.id, "visaApplications");
                const visaCountrySnapshot = await getDocs(visaCountryRef);

                visaCountrySnapshot.forEach((doc) => {
                    visaApplications.push({
                        id: doc.id,
                        visaCountry: countryDoc.id,
                        ...doc.data(),
                    });
                });
            }

            setVisaApplications(visaApplications);
            setLoading(false);
        };

        fetchVisaApplications();
    }, []);

    const deleteVisaApplication = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this visa application?")) {
            try {
                await deleteDoc(doc(db, "visaApplications", id));

                const updatedVisaApplications = visaApplications.filter((visaApplication) => visaApplication.id !== id);
                setVisaApplications(updatedVisaApplications);

                toast.success("Visa application deleted successfully");
            } catch (error) {
                console.log(error);
                toast.error("Error deleting visa application");
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


    console.log(visaApplications);

    return (
        <div className="px-10 py-14 flex flex-col gap-10 xl:px-6 xl:w-[calc(100vw-100px)] lg:gap-16 md:gap-12 sm:w-[100vw] sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-[28px] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                    Visa Applications
                </h1>
            </div>

            <VisaApplicationsOverview visaApplications={visaApplications} />

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
                            {visaApplications.length}
                        </p>
                    </button>
                    <button className="flex gap-2 items-center max-w-[360px] min-w-[48px] min-h-[48px] pb-1">
                        <p className="text-sm font-semibold text-[rgb(99,115,129)]">
                            In Review
                        </p>
                        <p className="h-6 w-6 bg-orange-200 text-orange-900 rounded-md px-1 text-xs font-bold inline-flex items-center justify-center">
                            {visaApplications.length}
                        </p>
                    </button>
                    <button></button>
                    <button></button>
                    <button></button>
                </div>
                <div className="p-5 text-blaclk">
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
                                        Visa Country
                                    </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="rgb(99,115,129)" className="w-5 h-5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                                    </svg>
                                </th>
                                {/* <th scope="col" className="px-6 py-3">
                                    Due
                                </th> */}
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {visaApplications.length === 0 ? (
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
                                <tbody>
                                    {visaApplications.map((application) => (
                                        <VisaApplicationRow
                                            key={application.id}
                                            application={application}
                                            // handleFormatDate={handleFormatDate}
                                            handleDeleteVisaApplication={deleteVisaApplication}
                                        />
                                    ))}
                                </tbody>
                            </>
                        )}
                    </table>
                </div>
                <div className="p-5">

                </div>
            </div>
        </div>
    )
}