/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom"
import { collection, getDocs, deleteDoc, doc, db } from '../../Config/firebase';
import { toast } from "react-toastify";
import { BlueButton } from "../../Components"
import { WhiteButton } from "../../Components";
import PlusSVG from "../../assets/SVG/Dashboard/plus.svg"



export const Activities = () => {
    const [activities, setActivities] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                setLoading(true);
                const querySnapshot = await getDocs(collection(db, 'activities'));
                const activitydata = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setActivities(activitydata);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        }
        fetchActivities();
    }, [])


    const handleDelete = async (id: string, name: string) => {
        if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                // Delete the document from Firestore
                await deleteDoc(doc(db, 'activities', id));

                // Update the state after successful deletion
                const updatedActivities = activities.filter((activity) => activity.id !== id);
                setActivities(updatedActivities);

                toast.success("Activity deleted successfully");
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
                    Activities
                </h1>
                <NavLink to="/activities/add">
                    <BlueButton
                        label={
                            <div className="flex items-center gap-2">
                                <img src={PlusSVG} alt="plus" className="w-4 h-4" />
                                <p className="">Add New Activity</p>
                            </div>
                        }
                        onClick={undefined} />
                </NavLink>
            </div>
            <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-xl font-bold text-gray-800">
                            Activities
                        </h2>
                        <p className="text-sm text-gray-500">
                            List of all activities
                        </p>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        {/* <div className="flex justify-between items-center">
                            <div className="flex flex-col gap-2">
                                <p className="text-sm text-gray-500">
                                    Showing 1 to 10 of 100 entries
                                </p>
                            </div>
                            <div className="flex gap-4">
                                <div className="flex gap-2">
                                    <p className="text-sm text-gray-500">
                                        Search:
                                    </p>
                                    <input type="text" placeholder="Search" className="border border-gray-300 rounded-md px-2 py-1 text-sm" />
                                </div>
                                <div className="flex gap-2">
                                    <p className="text-sm text-gray-500">
                                        Show:
                                    </p>
                                    <select name="show" id="show" className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">30</option>
                                        <option value="100">100</option>
                                    </select>
                                </div>
                            </div>
                        </div> */}
                        <div className="flex flex-col gap-4 w-full">
                            {/* <div className="flex justify-between items-center">
                                <div className="flex gap-4">
                                    <div className="flex gap-2">
                                        <p className="text-sm text-gray-500">
                                            Filter:
                                        </p>
                                        <select name="filter" id="filter" className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                                            <option value="all">All</option>
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex gap-2">
                                        <p className="text-sm text-gray-500">
                                            Sort:
                                        </p>
                                        <select name="sort" id="sort" className="border border-gray-300 rounded-md px-2 py-1 text-sm">
                                            <option value="newest">Newest</option>
                                            <option value="oldest">Oldest</option>
                                        </select>
                                    </div>
                                </div>
                            </div> */}
                            <div className="w-full min-h-[400px] flex flex-col gap-10 border border-gray-200 rounded-xl shadow ">
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
                                                Category
                                            </th>
                                            <th className="py-3.5 pl-6">
                                                Location
                                            </th>
                                            <th className="py-3.5 pl-6">
                                                Edit/Delete
                                            </th>
                                        </tr>
                                    </thead>
                                    {activities.map((activity, index) => (
                                        <tbody key={index}>
                                            <tr className="border-b-gray-200 border-b pb-0" >
                                                <td className="py-4 pl-6 flex gap-3 items-center">
                                                    <img
                                                        src={activity.imageOne}
                                                        alt="activity"
                                                        className="w-14 h-14 rounded-md object-cover"
                                                    />
                                                    <p>
                                                        {activity.name}
                                                    </p>
                                                </td>
                                                <td
                                                    className="pl-6 font-normal text-sm"
                                                >
                                                    {activity.price.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
                                                </td>
                                                <td
                                                    className="pl-6 font-normal text-sm"
                                                >
                                                    {activity.category}
                                                </td>
                                                <td
                                                    className="pl-6 font-normal text-sm"
                                                >
                                                    {activity.location}
                                                </td>
                                                <td className="pl-6 font-normal text-sm">
                                                    <div className="flex gap-4">
                                                        <NavLink to={`/activities/edit/${activity.id}`}>
                                                            <WhiteButton
                                                                label="Edit"
                                                                onClick={undefined}
                                                            />
                                                        </NavLink>
                                                        <BlueButton
                                                            label="Delete"
                                                            onClick={() => handleDelete(activity.id, activity.name)}
                                                            className="bg-red-600 hover:bg-red-700 border-red-600 hover:border-red-700"
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ))}
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}