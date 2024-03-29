/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import {
    serverTimestamp,
    // setDoc,
    // doc,
    addDoc,
    collection,
} from "firebase/firestore";
import { toast } from 'react-toastify'
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { db, storage } from '../../../Config/firebase';
import Input from "../../../Components/Explore/Custom/Input"
import imagePictureSVG from "../../../assets/SVG/Dashboard/image-picture.svg"
import downloadCloudSVG from "../../../assets/SVG/Dashboard/download-cloud.svg"
import { BlueButton } from '../../../Components';
import { countries } from '../../../data/data'



export const AddTourPackage = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [country, setCountry] = useState<string>('Nigeria')
    const [reviews, setReviews] = useState<any[]>([])
    const [rating, setRating] = useState<number>(0)
    const [price, setPrice] = useState<number | string>("")
    const [ticketRedemptionPoint, setTicketRedemptionPoint] = useState<string>("")
    const [inclusion, setInclusion] = useState<string>("")
    const [inclusions, setInclusions] = useState<string[]>([])
    const [exclusion, setExclusion] = useState<string>("")
    const [exclusions, setExclusions] = useState<string[]>([])
    const [featureList, setFeatureList] = useState<string>("")
    const [featureLists, setFeatureLists] = useState<string[]>([])
    const [whatToExpect, setWhatToExpect] = useState([{ name: "", duration: "", description: "" }])

    const handleAddInclusion = () => {
        if (inclusion !== "") {
            setInclusions([...inclusions, inclusion])
            setInclusion("")
        }
    }

    const handleRemoveInclusion = (index: number) => {
        const newInclusions = [...inclusions]
        newInclusions.splice(index, 1)
        setInclusions(newInclusions)
    }


    const handleAddExclusion = () => {
        if (exclusion !== "") {
            setExclusions([...exclusions, exclusion])
            setExclusion("")
        }
    }

    const handleRemoveExclusion = (index: number) => {
        const newExclusions = [...exclusions]
        newExclusions.splice(index, 1)
        setExclusions(newExclusions)
    }


    const handleAddFeatureList = () => {
        if (featureList !== "") {
            setFeatureLists([...featureLists, featureList])
            setFeatureList("")
        }
    }

    const handleRemoveFeatureList = (index: number) => {
        const newFeatureLists = [...featureLists]
        newFeatureLists.splice(index, 1)
        setFeatureLists(newFeatureLists)
    }

    const handleAddWhatToExpectField = () => {
        setWhatToExpect([...whatToExpect, { name: "", duration: "", description: "" }])
    }

    const handleRemoveWhatToExpectField = (index: number) => {
        const newWhatToExpect = [...whatToExpect]
        newWhatToExpect.splice(index, 1)
        setWhatToExpect(newWhatToExpect)
    }

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            setPrice(value)
        }
    }

    //add rules for whatToExpect duration to accept only numbers
    const handleWhatToExpectDurationChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        if (value === "" || /^[0-9\b]+$/.test(value)) {
            const newWhatToExpect = [...whatToExpect]
            newWhatToExpect[index].duration = value
            setWhatToExpect(newWhatToExpect)
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

    const timestamp = serverTimestamp()

    const addTourPackage = async () => {
        setLoading(true);

        // Upload media files and get their download URLs
        const imageDownloadURLs = await Promise.all(
            [imageOneFile, imageTwoFile].map(async (file) => {
                if (!file) return "";
                const storageRef = ref(storage, `tourPackages/${file.name}`);
                const snapshot = await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(snapshot.ref);
                return downloadURL;
            })
        );

        if (
            name.trim() === "" ||
            description.trim() === "" ||
            location.trim() === "" ||
            country === "" ||
            price === "" ||
            ticketRedemptionPoint === "" ||
            inclusions.length === 0 ||
            featureLists.length === 0 ||
            whatToExpect.length === 0 ||
            imageOneUrl.trim() === ""
            // imageTwoUrl.trim() === ""
        ) {
            toast.error("Please fill all fields");
            setLoading(false);
            return;
        }

        if (imageDownloadURLs[0] === "") {
            toast.error("Please upload image one");
            setLoading(false);
            return;
        }

        const tourPackagesRef = collection(db, "tourPackages");

        try {
            await addDoc(tourPackagesRef, {
                name,
                description,
                country,
                location,
                reviews,
                rating,
                price: Number(price),
                ticketRedemptionPoint,
                inclusions,
                exclusions,
                featureLists,
                whatToExpect,
                imageOne: imageDownloadURLs[0],
                imageTwo: imageDownloadURLs[1],
                createdAt: timestamp,
                updatedAt: timestamp,
            });

            // Reset form fields and display success message
            setName("");
            setDescription("");
            setLocation("");
            setCountry("");
            setReviews([]);
            setRating(0);
            setPrice("");
            setTicketRedemptionPoint("");
            setInclusions([]);
            setExclusions([]);
            setFeatureLists([]);
            setWhatToExpect([{ name: "", duration: "", description: "" }]);
            setImageOneFile(null);
            setImageTwoFile(null);
            setImageOneUrl("");
            setImageTwoUrl("");
            setLoading(false);
            toast.success("Tour package added successfully");
            navigate("/explore/tour-packages");
        } catch (error) {
            console.error("Error adding tour package: ", error);
            toast.error("An error occurred while adding the tour package. Please try again.");
            setLoading(false);
        }
    };





    return (
        <div className="px-10 py-11 pb-16 flex flex-col gap-12 xl:px-5 md:gap-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 md:text-xl">
                    Add Tour Package
                </h1>
            </div>
            <form className="w-full min-h-[400px] flex flex-col gap-10">
                <div className="flex gap-10 xl:gap-5 lg:flex-col">
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Tour Info
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-8">
                            <label htmlFor="name" className="flex flex-col gap-1.5 w-full">
                                <p className="text-sm font-medium text-gray-700">
                                    Name
                                </p>
                                <Input placeholder="enter tour name" name={"name"} type={"text"} value={name} onChange={(e) => setName(e.target.value)} className={"w-full"} required />
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
                                    placeholder="enter tour description"
                                    className="border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out w-full"
                                />
                            </label>
                            <label htmlFor="country" className="flex flex-col gap-1.5">
                                <p className="text-sm font-medium text-gray-700">
                                    Country
                                </p>
                                <select
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className="border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out"
                                >
                                    <option value="">--Select Country--</option>
                                    {countries.map((country) => (
                                        <option key={country} value={country}>{country}</option>
                                    ))}
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Tour Images
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <p className="text-sm font-medium text-gray-700">
                                Upload at least one image for your package.
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
                            Tour Details
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-row p-4 gap-8 lg:flex lg:flex-col">


                        <label htmlFor="location" className="flex flex-col gap-1.5">
                            <p className="text-sm font-medium text-gray-700">
                                Location
                            </p>
                            <Input placeholder="enter location" name={"location"} type={"text"} value={location} onChange={(e) => setLocation(e.target.value)} className={"w-full"} required />
                        </label>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Inclusions (Add at least one)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {inclusions.map((inclusion, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-[#3fc5e7] text-white px-3 py-2 rounded">
                                        <p className="text-sm font-semibold">{inclusion}</p>
                                        <button className=""
                                            type="button" onClick={() => handleRemoveInclusion(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
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
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Exclusions (Add at least one)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {exclusions.map((exclusion, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-[#3fc5e7] text-white px-3 py-2 rounded">
                                        <p className="text-sm font-semibold">{exclusion}</p>
                                        <button className=""
                                            type="button" onClick={() => handleRemoveExclusion(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                            <div className="flex gap-2">
                                <label htmlFor="exclusion" className="w-full">
                                    <Input placeholder="e.g Flight" name={"exclusion"} type={"text"} value={exclusion} onChange={(e) => setExclusion(e.target.value)} className={"w-full flex-grow"} required />
                                </label>
                                <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                    type="button"
                                    onClick={handleAddExclusion}>Add</button>
                            </div>
                        </div>
                        <label htmlFor="price" className="flex flex-col gap-1.5 place-self-end w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Price (₦) <span className='text-xs text-gray-500 font-normal'>
                                    Set to 0 if price is free or flexible
                                </span>
                            </p>
                            <Input placeholder="enter price" name={"price"} type={"text"} value={price} onChange={handlePriceChange} className={"w-full"} required />
                        </label>
                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Feature List (Add at least one)
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {featureLists.map((featureList, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-[#3fc5e7] text-white px-3 py-2 rounded">
                                        <p className="text-sm font-semibold">{featureList}</p>
                                        <button className=""
                                            type="button" onClick={() => handleRemoveFeatureList(index)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                        </button>
                                    </div>
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
                        <label htmlFor="ticketRedemptionPoint" className="flex place-self-end w-full flex-col gap-1.5">
                            <p className="text-sm font-medium text-gray-700">
                                Ticket Redemption Point
                            </p>
                            <Input placeholder="enter ticket redemption point" name={"ticketRedemptionPoint"} type={"text"} value={ticketRedemptionPoint} onChange={(e) => setTicketRedemptionPoint(e.target.value)} className={"w-full"} required />
                        </label>
                    </div>
                    <div className="flex flex-col p-4 gap-4 w-full">
                        <div className="flex justify-between items-center sm:flex-wrap sm:gap-2">
                            <p className="text-sm font-medium text-gray-700">
                                What To Expect
                            </p>
                            <div className="sticky top-32 bg-white z-10 p-2">


                                <button
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md w-max"
                                    type="button"
                                    onClick={handleAddWhatToExpectField}
                                >
                                    Add What To Expect Field
                                </button>
                            </div>
                        </div>
                        {whatToExpect.map((item, index) => (
                            <div key={index} className="flex flex-col gap-4 p-3 border border-gray-100 rounded">
                                {index > 0 && (
                                    <BlueButton
                                        label={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>}
                                        onClick={() => handleRemoveWhatToExpectField(index)}
                                        className="w-max place-self-end bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
                                    />
                                )}
                                <div className='flex flex-col gap-4 w-full'>
                                    <div className="flex gap-2 lg:flex-col lg:gap-3">
                                        <label htmlFor="name" className="flex flex-col gap-1.5 w-full">
                                            <p className="text-sm font-medium text-gray-700">
                                                Name
                                            </p>
                                            <Input placeholder="enter name" name={"name"} type={"text"} value={item.name} onChange={(e) => {
                                                const newWhatToExpect = [...whatToExpect]
                                                newWhatToExpect[index].name = e.target.value
                                                setWhatToExpect(newWhatToExpect)
                                            }} className={"w-full"} required />
                                        </label>
                                        <label htmlFor="duration" className="flex flex-col gap-1.5 w-full">
                                            <p className="text-sm font-medium text-gray-700">
                                                Duration (in minutes) {" "}
                                                <span className='text-xs text-gray-500 font-normal'>
                                                    Set to 0 if duration is flexible
                                                </span>
                                            </p>
                                            <Input placeholder="enter duration" name={"duration"} type={"text"} value={item.duration}
                                                onChange={(e) => handleWhatToExpectDurationChange(e, index)}
                                                className={"w-full"} required />
                                        </label>
                                    </div>
                                    <label htmlFor="description" className="flex flex-col gap-1.5 w-full">
                                        <p className="text-sm font-medium text-gray-700">
                                            Description
                                        </p>
                                        <textarea
                                            id="description"
                                            name="description"
                                            rows={3}
                                            value={item.description}
                                            onChange={(e) => {
                                                const newWhatToExpect = [...whatToExpect]
                                                newWhatToExpect[index].description = e.target.value
                                                setWhatToExpect(newWhatToExpect)
                                            }}
                                            placeholder="enter description"
                                            className="border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out w-full"
                                        />
                                    </label>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button className="bg-[rgba(0,109,156,0.86)] text-white text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-[#006d9c]"
                        type="button"
                        onClick={addTourPackage}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Tour Package"}
                    </button>
                    <button className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-gray-200" type="button">Cancel</button>
                </div>
            </form>

        </div>
    )
}