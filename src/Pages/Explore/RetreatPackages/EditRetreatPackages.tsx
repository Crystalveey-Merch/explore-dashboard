/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    serverTimestamp,
    doc,
    updateDoc,
    collection,
    getDocs,
} from "firebase/firestore";
import { toast } from 'react-toastify'
import FormControlLabel from "@mui/material/FormControlLabel";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../../Config/firebase';
import Input from "../../../Components/Explore/Custom/Input"
import imagePictureSVG from "../../../assets/SVG/Dashboard/image-picture.svg"
import downloadCloudSVG from "../../../assets/SVG/Dashboard/download-cloud.svg"
import { BlueButton, IOSSwitch } from '../../../Components';




export const EditRetreatPackages = () => {
    const { id } = useParams<{ id: string }>()
    const [retreatPackages, setRetreatPackages] = useState<any[]>([]);
    const [retreatPackage, setRetreatPackage] = useState<any>({});
    const [retreatPackageLoading, setRetreatPackageLoading] = useState(false);

    useEffect(() => {
        const fetchTravelPackages = async () => {
            try {
                setRetreatPackageLoading(true);
                const querySnapshot = await getDocs(collection(db, 'retreatPackages'));
                const packagedata = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setRetreatPackages(packagedata);
                setRetreatPackageLoading(false);
            } catch (error) {
                console.log(error);
                setRetreatPackageLoading(false);
            }
        }
        fetchTravelPackages();
    }, [])

    const navigate = useNavigate()

    const [isImageOneChanged, setIsImageOneChanged] = useState(false)
    const [isImageTwoChanged, setIsImageTwoChanged] = useState(false)


    const [loading, setLoading] = useState(false)
    const [isActive, setIsActive] = useState<boolean>(true)
    const [waiting, setWaiting] = useState<boolean>(false)
    const [maxBookings, setMaxBookings] = useState<number | string>("")
    const [title, setTitle] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [reviews, setReviews] = useState<any[]>([])
    const [rating, setRating] = useState<number>(0)
    const [travelling, setTravelling] = useState<number | string>("")
    const [duration, setDuration] = useState<string>("")
    const [price, setPrice] = useState<number | string>("")
    //inclusion is array of string
    const [inclusion, setInclusion] = useState<string>("")
    const [inclusions, setInclusions] = useState<string[]>([])
    const [featureList, setFeatureList] = useState<string>("")
    const [featureLists, setFeatureLists] = useState<string[]>([])
    const [visitingCities, setVisitingCities] = useState([{ name: '', activities: [''] }]);

    const handleAddInclusion = () => {
        if (inclusion !== "") {
            setInclusions([...inclusions, inclusion])
            setInclusion("")
        }
    }

    const handleEditInclusion = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const newInclusions = [...inclusions]
        newInclusions[index] = value
        setInclusions(newInclusions)
    }

    const handleRemoveInclusion = (index: number) => {
        const newInclusions = [...inclusions]
        newInclusions.splice(index, 1)
        setInclusions(newInclusions)
    }

    const handleAddFeatureList = () => {
        if (featureList !== "") {
            setFeatureLists([...featureLists, featureList])
            setFeatureList("")
        }
    }

    const handleEditFeatureList = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const newFeatureLists = [...featureLists]
        newFeatureLists[index] = value
        setFeatureLists(newFeatureLists)
    }

    const handleRemoveFeatureList = (index: number) => {
        const newFeatureLists = [...featureLists]
        newFeatureLists.splice(index, 1)
        setFeatureLists(newFeatureLists)
    }

    const handleAddVisitingCityField = () => {
        setVisitingCities([...visitingCities, { name: '', activities: [''] }]);
    };

    const handleRemoveVisitingCityField = (index: number) => {
        const updatedCities = [...visitingCities];
        updatedCities.splice(index, 1);
        setVisitingCities(updatedCities);
    };

    const handleAddActivityField = (index: number) => {
        const updatedCities = [...visitingCities];
        updatedCities[index].activities.push('');
        setVisitingCities(updatedCities);
    };

    const handleRemoveActivityField = (cityIndex: number, activityIndex: number) => {
        const updatedCities = [...visitingCities];
        updatedCities[cityIndex].activities.splice(activityIndex, 1);
        setVisitingCities(updatedCities);
    };

    const handleMaxBookingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setMaxBookings(value)
        }
    }

    //add rules for handlePriceChange to accept only numbers and empty string
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setPrice(value)
        }
    }

    //add rules for handleDurationChange to accept max 2 digits  and only numbers and empty string
    const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            if (value.length <= 2) {
                setDuration(value)
            }
        }
    }


    const [imageOneFile, setImageOneFile] = useState<File | null>(null)
    const [imageTwoFile, setImageTwoFile] = useState<File | null>(null)
    const [imageOneUrl, setImageOneUrl] = useState<string>("")
    const [imageTwoUrl, setImageTwoUrl] = useState<string>("")

    const imageInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef2 = useRef<HTMLInputElement>(null)

    const OpenImageOnePicker = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click();
        }
    }

    const OpenImageTwoPicker = () => {
        if (imageInputRef2.current) {
            imageInputRef2.current.click();
        }
    }

    const handleImageOneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const file = e.target.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImageOneFile(file)
            setImageOneUrl(reader.result as string)
        }
    }

    const handleImageTwoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const file = e.target.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImageTwoFile(file)
            setImageTwoUrl(reader.result as string)
        }
    }

    const cancelImageOne = () => {
        setImageOneFile(null)
        setImageOneUrl("")
    }

    const cancelImageTwo = () => {
        setImageTwoFile(null)
        setImageTwoUrl("")
    }

    useEffect(() => {
        const retreatPackage = retreatPackages.find((retreatPackage) => retreatPackage.id === id)
        if (retreatPackage) {
            setIsActive(retreatPackage.isActive)
            setWaiting(retreatPackage.isWaitList)
            setMaxBookings(retreatPackage.maxBookings)
            setRetreatPackage(retreatPackage)
            setTitle(retreatPackage.title)
            setDescription(retreatPackage.description)
            setDuration(retreatPackage.duration)
            setReviews(retreatPackage.reviews)
            setRating(retreatPackage.rating)
            setTravelling(retreatPackage.travelling)
            setPrice(retreatPackage.price)
            setInclusions(retreatPackage.inclusions)
            setFeatureLists(retreatPackage.featureLists)
            setVisitingCities(retreatPackage.visitingCities)
            setImageOneUrl(retreatPackage.images.imageOne)
            setImageTwoUrl(retreatPackage.images.imageTwo)
        }
    }, [retreatPackages, id])

    useEffect(() => {
        // check is it is empty
        if (imageOneFile === null) {
            setIsImageOneChanged(false)
        } else {
            setIsImageOneChanged(true)
        }

        if (imageTwoFile === null) {
            setIsImageTwoChanged(false)
        } else {
            setIsImageTwoChanged(true)
        }

    }, [imageOneFile, imageTwoFile])

    const timestamp = serverTimestamp()

    const updateRetreatPackage = async () => {
        setLoading(true)
        // Upload media files and get their download URLs
        const imageDownloadURLs = await Promise.all(
            [imageOneFile, imageTwoFile].map(async (file) => {
                if (!file) return "";
                const storageRef = ref(storage, `retreatPackages/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
            })
        );

        if (title.trim() === "") {
            toast.error("Please add title");
            setLoading(false)
            return
        }

        if (maxBookings === "") {
            toast.error("Please add max bookings");
            setLoading(false)
            return
        }

        if (imageOneUrl === "") {
            toast.error("Please upload at least image one");
            setLoading(false)
            return
        }

        if (!waiting) {
            if (
                title.trim() === "" ||
                duration.trim() === "" ||
                price === "" ||
                inclusions.length === 0 ||
                visitingCities.length === 0 ||
                imageOneUrl.trim() === ""
                //imageTwoUrl.trim() === ""
            ) {
                toast.error("Please fill all fields");
                setLoading(false);
                return;
            }
        }


        const retreatPackageRef = doc(db, "retreatPackages", retreatPackage.id);


        try {
            await updateDoc(retreatPackageRef, {
                isActive,
                isWaitList: waiting,
                maxBookings: Number(maxBookings),
                title,
                description,
                duration,
                reviews,
                rating,
                travelling: Number(travelling),
                //convert price to number
                price: Number(price),
                inclusions,
                featureLists,
                visitingCities,
                images: {
                    imageOne: isImageOneChanged ? imageDownloadURLs[0] : imageOneUrl,
                    imageTwo: isImageTwoChanged ? imageDownloadURLs[1] : imageTwoUrl,
                },
                updatedAt: timestamp,
            });
            setIsActive(false)
            setWaiting(false)
            setMaxBookings("15")
            setTitle("")
            setDescription("")
            setDuration("")
            setReviews([]);
            setRating(0);
            setTravelling("0")
            setPrice("")
            setInclusions([])
            setFeatureLists([])
            setVisitingCities([{ name: '', activities: [''] }])
            setImageOneFile(null)
            setImageTwoFile(null)
            setImageOneUrl("")
            setImageTwoUrl("")
            toast.success("Retreat Package updated successfully")
            navigate('/explore/retreat-packages/')
            setLoading(false)
        } catch (error) {
            console.error("Error updating retreat package: ", error);
            toast.error("Error updating retreat package");
            setLoading(false)
        }
    }

    if (retreatPackageLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <p className="text-2xl font-semibold text-gray-800">Loading...</p>
            </div>
        )
    }

    return (
        <div className="px-10 py-11 pb-16 flex flex-col gap-12 xl:px-5 md:gap-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 md:text-xl">
                    Edit Retreat Package
                </h1>
            </div>

            <form className="w-full min-h-[400px] flex flex-col gap-10">
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                            Package  Settings
                        </h3>
                    </div>
                    <div className="p-4 flex gap-10 xl:gap-5 lg:flex-col">
                        <div className="w-full flex justify-between items-center border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 placeholder:text-gray-900 placeholder:opacity-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out">
                            <div className="flex gap-1 items-center">
                                <p>
                                    Set Active
                                </p>
                            </div>
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={isActive}
                                        onChange={() => setIsActive(!isActive)}
                                        name="isActive"
                                        className='w-max'
                                    />
                                }
                                label=""
                            />
                        </div>
                        <div className="w-full flex justify-between items-center border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 placeholder:text-gray-900 placeholder:opacity-60 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out">
                            <div className="flex gap-1 items-center">
                                <p>
                                    Enable Waitlist
                                </p>
                            </div>
                            <FormControlLabel
                                control={
                                    <IOSSwitch
                                        checked={waiting}
                                        onChange={() => setWaiting(!waiting)}
                                        name="waitlist"
                                        className='w-max'
                                    />
                                }
                                label=""
                            />
                        </div>
                        <label htmlFor="maxBookings" className="flex flex-col gap-1.5 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Max Bookings
                            </p>
                            <Input placeholder="e.g 15"
                                name={"maxBookings"} type={"text"} value={maxBookings}
                                onChange={handleMaxBookingChange} className={"w-full"} required />
                        </label>
                    </div>
                </div>
                <div className="flex gap-10 xl:gap-5 lg:flex-col">
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Retreat Package Info
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-8">
                            <label htmlFor="name" className="flex flex-col gap-1.5 w-full">
                                <p className="text-sm font-medium text-gray-700">
                                    Name
                                </p>
                                <Input placeholder="e.g Lagos weekend getaway" name={"title"} type={"text"} value={title} onChange={(e) => setTitle(e.target.value)} className={"w-full"} required />
                            </label>
                            <label htmlFor="description" className="flex flex-col gap-1.5 w-full">
                                <p className="text-sm font-medium text-gray-700">
                                    Description
                                </p>
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={3}
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="enter travel retreat description"
                                    className="border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out w-full"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Retreat Package Images
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <p className="text-sm font-medium text-gray-700">
                                Upload at least one image
                            </p>
                            <div className="p-4 flex gap-8">
                                <div
                                    className="flex flex-grow items-center flex-col gap-3 py-4 border border-dashed border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => OpenImageOnePicker()}
                                >
                                    <input type="file"
                                        accept="image/*"
                                        ref={imageInputRef}
                                        className='hidden'
                                        onChange={handleImageOneChange}
                                        name="imageOne"
                                    />
                                    <div
                                        className="w-12 h-12 bg-violet-100 rounded-full text-center flex justify-center items-center border-8 border-solid border-violet-50 p-2"
                                    >
                                        <img
                                            src={downloadCloudSVG}
                                            className="h-5 w-5 m-auto"
                                            alt="upload"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold text-purple-700 text-center"
                                        >
                                            Click to upload
                                        </p>
                                        <p className="text-xs font-normal text-gray-600 text-center">
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </p>
                                    </div>
                                </div>
                                <div className="w-32 h-32 bg-gray-100 rounded-xl flex justify-center items-center">
                                    {imageOneUrl !== "" ? (
                                        <div className="relative">
                                            <img
                                                src={imageOneUrl}
                                                className="h-32 w-32 object-cover rounded-xl"
                                                alt="upload"
                                            />
                                            <button
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                type="button"
                                                onClick={cancelImageOne}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-x"
                                                >
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <img
                                            src={imagePictureSVG}
                                            className="h-8 w-8 m-auto"
                                            alt="upload"
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="p-4 flex gap-8">
                                <div
                                    className="flex flex-grow items-center flex-col gap-3 py-4 border border-dashed border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => OpenImageTwoPicker()}
                                >
                                    <input type="file"
                                        accept="image/*"
                                        ref={imageInputRef2}
                                        className='hidden'
                                        onChange={handleImageTwoChange}
                                        name="imageTwo"
                                    />
                                    <div
                                        className="w-12 h-12 bg-violet-100 rounded-full text-center flex justify-center items-center border-8 border-solid border-violet-50 p-2"
                                    >
                                        <img
                                            src={downloadCloudSVG}
                                            className="h-5 w-5 m-auto"
                                            alt="upload"
                                        />
                                    </div>
                                    <div>
                                        <p
                                            className="text-sm font-semibold text-purple-700 text-center"
                                        >
                                            Click to upload
                                        </p>
                                        <p className="text-xs font-normal text-gray-600 text-center">
                                            SVG, PNG, JPG or GIF (max. 800x400px)
                                        </p>
                                    </div>
                                </div>
                                <div className="w-32 h-32 bg-gray-100 rounded-xl flex justify-center items-center">
                                    {imageTwoUrl !== "" ? (
                                        <div className="relative">
                                            <img
                                                src={imageTwoUrl}
                                                className="h-32 w-32 object-cover rounded-xl"
                                                alt="upload"
                                            />
                                            <button
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                type="button"
                                                onClick={cancelImageTwo}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="20"
                                                    height="20"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="lucide lucide-x"
                                                >
                                                    <path d="M18 6 6 18" />
                                                    <path d="m6 6 12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    ) : (
                                        <img
                                            src={imagePictureSVG}
                                            className="h-8 w-8 m-auto"
                                            alt="upload"
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                    <div className="p-3 border-b border-gray-200">
                        <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                            Retreat Package Details
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-row p-4 gap-8">
                        <label htmlFor="duration" className="flex flex-col gap-1.5 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Duration (Days)
                            </p>
                            <Input placeholder="e.g full day" name={"duration"} type={"text"} value={duration} onChange={handleDurationChange} className={"w-full"} required />
                        </label>
                        <label htmlFor="price" className="flex flex-col gap-1.5 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Price (₦)
                            </p>
                            <Input placeholder="e.g 1000" name={"price"} type={"text"} value={price}
                                onChange={handlePriceChange}
                                className={"w-full"} required />
                        </label>
                        <div className="flex flex-col gap-2  w-full sm:col-span-2">
                            <p className="text-sm font-medium text-gray-700">
                                Feature List (Add at least one)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {featureLists?.map((featureList, index) => (
                                    <label key={index} className="flex items-center gap-2 border border-[#3fc5e7] text-white px-3 py-2 rounded">
                                        <input type="text" value={featureList} onChange={(e) => handleEditFeatureList(index, e)}
                                            className="text-[#3fc5e7] py-2 px-1 font-semibold focus:outline-none" />
                                        <button className="bg-[#3fc5e7]"
                                            type="button" onClick={() => handleRemoveFeatureList(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="featureList" className="w-full">
                                    <Input placeholder="e.g Flight" name={"featureList"} type={"text"} value={featureList} onChange={(e) => setFeatureList(e.target.value)} className={"w-full flex-grow"} required />
                                </label>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                    type="button"
                                    onClick={handleAddFeatureList}>Add</button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-full sm:col-span-2">
                            <p className="text-sm font-medium text-gray-700">
                                Inclusions (Add at least one)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {inclusions?.map((inclusion, index) => (
                                    <label key={index} className="flex items-center gap-2 border border-[#3fc5e7] text-white px-3 py-0.5 rounded">
                                        <input type="text" value={inclusion} onChange={(e) => handleEditInclusion(index, e)}
                                            className="text-[#3fc5e7] py-2 px-1 font-semibold focus:outline-none" />
                                        <button className="bg-[#3fc5e7]"
                                            type="button" onClick={() => handleRemoveInclusion(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </label>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="inclusion" className="w-full">
                                    <Input placeholder="e.g Flight" name={"inclusion"} type={"text"} value={inclusion} onChange={(e) => setInclusion(e.target.value)} className={"w-full flex-grow"} required />
                                </label>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                    type="button"
                                    onClick={handleAddInclusion}>Add</button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col p-4 gap-2 w-full">
                        <div className="flex justify-between items-center">
                            <p className="text-sm font-medium text-gray-700">Visiting Cities</p>

                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                type="button"
                                onClick={handleAddVisitingCityField}
                            >
                                Add Visiting City Field
                            </button>
                        </div>
                        {visitingCities.map((city, cityIndex) => (
                            <div key={cityIndex} className="flex flex-col gap-4 p-3 border border-gray-100 rounded">
                                {cityIndex > 0 && (
                                    <BlueButton
                                        label={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>}
                                        onClick={() => handleRemoveVisitingCityField(cityIndex)}
                                        className="w-max place-self-end bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                                    />
                                )}
                                <div className='flex flex-col gap-4 w-full'>
                                    <label htmlFor="city" className="flex flex-col gap-1.5 w-full">
                                        <p className="text-sm font-medium text-gray-700">City</p>
                                        <Input
                                            placeholder="enter city"
                                            name="city"
                                            type="text"
                                            value={city.name}
                                            onChange={(e) => {
                                                const updatedCities = [...visitingCities];
                                                updatedCities[cityIndex].name = e.target.value;
                                                setVisitingCities(updatedCities);
                                            }}
                                            className="w-full"
                                            required
                                        />
                                    </label>
                                    <div className="flex flex-col gap-2 w-full">
                                        <label htmlFor="activity" className="flex flex-col gap-1.5 w-full">
                                            <p className="text-sm font-medium text-gray-700">Activity</p>
                                            <div className="flex flex-wrap gap-4">
                                                {city.activities.map((activity, activityIndex) => (
                                                    <div className='flex gap-2 items-center sm:w-full'>
                                                        <Input
                                                            key={activityIndex}
                                                            type="text"
                                                            name="activity"
                                                            placeholder="enter activity"
                                                            value={activity}
                                                            onChange={(e) => {
                                                                const updatedCities = [...visitingCities];
                                                                updatedCities[cityIndex].activities[activityIndex] = e.target.value;
                                                                setVisitingCities(updatedCities);
                                                            }}
                                                            className="sm:w-full"
                                                        />
                                                        {activityIndex > 0 && (
                                                            <BlueButton
                                                                label={<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>}
                                                                onClick={() => handleRemoveActivityField(cityIndex, activityIndex)}
                                                                className="w-max bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                                                            />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </label>
                                        <div className="flex gap-2">
                                            <button
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                                type="button"
                                                onClick={() => handleAddActivityField(cityIndex)}
                                            >
                                                Add New Activity Field
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button className={`bg-[rgba(0,109,156,0.86)] text-white text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-[#006d9c] ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        type="submit"
                        disabled={loading}
                        onClick={updateRetreatPackage}>
                        {loading ? "Updating..." : "Update"}
                    </button>
                    <button
                        className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-gray-200"
                        type="button">Cancel</button>
                </div>
            </form>
        </div>
    )
}