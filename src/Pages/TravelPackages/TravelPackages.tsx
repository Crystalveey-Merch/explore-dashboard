/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc, db } from '../../Config/firebase';
import { toast } from "react-toastify";
import handleFormattedDateRange from "../../Hooks/handleFormattedDateRange";
import { BlueButton } from "../../Components"
import { WhiteButton } from "../../Components";
import PlusSVG from "../../assets/SVG/Dashboard/plus.svg"



export const TravelPackages = () => {
    const [travelPackages, setTravelPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

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

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center w-full h-screen">
                <h2 className="text-2xl font-bold">Loading...</h2>
            </div>
        );
    }

    return (
        <div className="px-10 py-14 flex flex-col gap-20">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                    Travel Packages
                </h1>
                <NavLink to="/travel-packages/add">
                    <BlueButton
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                <p className="">Add New Package</p>
                            </div>
                        }
                        onClick={undefined} />
                </NavLink>
            </div>
            <div className="w-full min-h-[400px] flex flex-col gap-10 border border-gray-200 rounded-xl shadow">
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
            </div >
        </div >
    )
}