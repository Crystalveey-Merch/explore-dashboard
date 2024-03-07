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


export const AddCategory = () => {
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")

    const [imageFile, setImageFile] = useState<File | null>(null)
    const [imageURL, setImageURL] = useState<string>("")
    const imageInputRef = useRef<HTMLInputElement>(null)

    const OpenImagePicker = () => {
        if (imageInputRef.current) {
            imageInputRef.current.click()
        }
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const file = e.target.files![0]
        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onloadend = () => {
            setImageFile(file)
            setImageURL(reader.result as string)
        }
    }

    const cancelImage = () => {
        setImageFile(null)
        setImageURL("")
    }

    const timestamp = serverTimestamp()

    const handleAddCategory = async () => {
        if (!category || !description || !imageURL || !imageFile) {
            toast.error("Please fill all the fields")
            return
        }
        setLoading(true)
        try {
            const storageRef = ref(storage, `categoryImages/${imageFile.name}`)
            await uploadBytes(storageRef, imageFile)
            const downloadURL = await getDownloadURL(storageRef)
            const categoryData = {
                name: category,
                description,
                image: downloadURL,
                createdAt: timestamp,
                updatedAt: timestamp,
                type: "activity"
            }
            const docRef = collection(db, "categories")
            await addDoc(docRef, categoryData)
            toast.success("Category added successfully")
            navigate("/explore/activities/categories")
        } catch (error: any) {
            console.error("Error adding document: ", error)
            toast.error(error.message)
        }
        setLoading(false)
    }

    return (
        <div className="px-10 py-11 pb-16 flex flex-col gap-12 xl:px-5 md:gap-8">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 md:text-xl">
                    Add Category
                </h1>
            </div>
            <form className="w-full min-h-[400px] flex flex-col gap-10">
                <div className="flex gap-10 xl:gap-5 lg:flex-col">
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Category Info
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-8">
                            <label htmlFor="name" className="flex flex-col gap-1.5 w-full">
                                <p className="text-sm font-medium text-gray-700">
                                    Category Name
                                </p>
                                <Input placeholder="enter category name" name={"name"} type={"text"}
                                    value={category} onChange={(e) => setCategory(e.target.value)} className={"w-full"} required />
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
                                    placeholder="enter activity description"
                                    className="border border-solid bg-white border-gray-300 font-normal text-base text-gray-900 rounded-lg px-3.5 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent disabled:background-gray-50 disabled:border-gray-300 disabled:text-gray-500 after:bg-white transition duration-300 ease-in-out w-full"
                                />
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-1 flex-col gap-2 border border-gray-200 rounded-xl shadow-md">
                        <div className="p-3 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-700 md:text-lg">
                                Category Image
                            </h3>
                        </div>
                        <div className="p-4 flex flex-col gap-4">
                            <p className="text-sm font-medium text-gray-700">
                                Upload Category Image
                            </p>
                            <div className="p-4 flex gap-8">
                                <div
                                    className="flex flex-grow items-center flex-col gap-3 py-4 border border-dashed border-gray-200 rounded-xl hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
                                    onClick={() => OpenImagePicker()}
                                >
                                    <input type="file"
                                        accept="image/*"
                                        ref={imageInputRef}
                                        className='hidden'
                                        onChange={handleImageChange}
                                        name="image"
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
                                    {imageURL !== "" ? (
                                        <div className="relative">
                                            <img
                                                src={imageURL}
                                                className="h-32 w-32 object-cover rounded-xl"
                                                alt="upload"
                                            />
                                            <button
                                                className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                                type="button"
                                                onClick={cancelImage}
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
                <div className="flex justify-end gap-4">
                    <button className="bg-[rgba(0,109,156,0.86)] text-white text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-[#006d9c]"
                        type="button"
                        onClick={handleAddCategory}
                        disabled={loading}
                    >
                        {loading ? "Adding..." : "Add Category"}
                    </button>
                    <button
                        className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-gray-200"
                        type="button"
                        onClick={() => navigate("/explore/activities/categories")}
                    >
                        Cancel
                    </button>
                </div>
            </form >
        </div >
    )
}