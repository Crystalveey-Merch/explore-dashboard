/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { collection, getDocs, db } from '../../Config/firebase';
import noResultImg from "../../assets/Images/Dashboard/no-results.png"
import { handleFormatDate2 } from "../../Hooks";

export const ExploreVault = () => {
    const [accountOwners, setAccountOwners] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchAccountOwners = async () => {
            setLoading(true);
            const accountOwnersRef = collection(db, "save4LaterUsers");
            const accountOwnersSnapshot = await getDocs(accountOwnersRef);
            const accountOwners: any[] = [];
            accountOwnersSnapshot.forEach((doc) => {
                accountOwners.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setAccountOwners(accountOwners);
            setLoading(false);
        };
        fetchAccountOwners();
    }, []);


    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="mx-10 py-14 flex flex-col gap-10 xl:mx-6 xl:w-[calc(100vw-3rem)] lg:gap-16 md:gap-12  sm:mx-4 sm:gap-9">
            <div className="flex justify-between items-center sm:flex-col sm:items-start sm:gap-3">
                <h1 className="text-[28px] font-public-sans font-bold text-black xl:text-2xl lg:text-xl">
                    Explore Vault
                </h1>
            </div>

            <div
                className="w-full rounded-2xl flex flex-col lg:overflow-x-scroll xl:overflow-y-hidden xl:rounded-lg"
                style={{ boxShadow: "rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px" }}
            >
                <div className="relative sm:rounded-lg">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>

                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Customer
                                </th>
                                <th scope="col" className="px-6 py-3 flex gap-1 items-center 2xl:px-4 xl:px-3">
                                    Gender
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Joined
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Phone Number
                                </th>
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Savings
                                </th>
                                {/* <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Status
                                </th> */}
                                <th scope="col" className="px-6 py-3 2xl:px-4 xl:px-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        {accountOwners.length === 0 ? (
                            <tbody className="bg-white border-b border-gray-200">
                                <tr className="bg-white border-b hover:bg-gray-50">
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
                                {accountOwners.map((accountOwner) => (
                                    <tbody key={accountOwner.id} className="bg-white border-b border-gray-200">
                                        <tr className="bg-white border-b hover:bg-gray-50">
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <div className="flex gap-4 items-center">
                                                    <div className="w-10 h-10 rounded-full bg-[#276c79a8] text-white text-lg flex items-center justify-center">
                                                        {accountOwner?.displayName[0]}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <p className="text-sm font-medium text-ellipsis">
                                                            {accountOwner.displayName}
                                                        </p>
                                                        <p className="text-xs font-normal text-[rgb(33,43,54)]">
                                                            {accountOwner.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap xl:text-xs">
                                                    {accountOwner.gender ? accountOwner.gender : "N/A"}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap xl:text-xs">
                                                    {handleFormatDate2(accountOwner.createdAt)}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap xl:text-xs">
                                                    {accountOwner.phoneNumber ? ("+" + accountOwner.phoneNumber) : "N/A"}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <p className="text-[rgb(33,43,54)] text-sm font-normal whitespace-nowrap xl:text-xs">
                                                    {accountOwner.savings ? accountOwner.savings : "no savings yet"}
                                                </p>
                                            </td>
                                            <td className="px-6 py-4 2xl:px-4 xl:px-3">
                                                <button
                                                    className="text-blue-500 font-medium"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                ))}
                            </>
                        )}
                    </table>
                </div>
            </div>
        </div>
    )
}