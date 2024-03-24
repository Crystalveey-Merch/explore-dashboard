/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useRef, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import {
    db,
    serverTimestamp,
    doc,
    updateDoc,
    storage,
} from '../../../Config/firebase';
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { toast } from 'react-toastify'
import Editor from "react-markdown-editor-lite";
import ReactMarkdown from "react-markdown";
import "react-markdown-editor-lite/lib/index.css";
import Input from "../../../Components/Explore/Custom/Input";
import { useAutosizeTextArea } from "../../../Hooks";



export const EditBlog = ({ blogs, setBlogs }: any) => {
    const { id }: any = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<any>(null);

    const [imageChanged, setImageChanged] = useState(false)

    const [loading, setLoading] = useState(false);
    const mdEditor = useRef<Editor>(null);
    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("")
    const [content, setContent] = useState("")
    const [category, setCategory] = useState("")

    const handleEditorChange = ({ text }: { html: string; text: string }) => {
        setContent(text);
    };

    const titleRef = useRef<HTMLTextAreaElement>(null)
    useAutosizeTextArea(titleRef.current, title)

    const subTitleRef = useRef<HTMLTextAreaElement>(null)
    useAutosizeTextArea(subTitleRef.current, subTitle)

    const [photoURL, setPhotoURL] = useState<string | null>(null);
    const [photo, setPhoto] = useState(null);

    const createImagePreview = (file: Blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            // Ensure reader.result is a string or provide a default value (empty string)
            const resultString = reader.result;
            setPhotoURL(resultString as string);
        };
        reader.readAsDataURL(file);
    };


    const handleImageChange = (e: any) => {
        const file = e.target.files[0];
        if (file) {
            // if (file.size > 1048487) {
            //     alert("File size must be less than 1.5MB");
            //     return;
            // }
            setPhoto(file);
            createImagePreview(file);
        } else {
            setPhoto(null);
        }
    };

    const handleClose = () => {
        setPhotoURL(null);
        setPhoto(null);
    };

    useEffect(() => {
        if (blogs) {
            const blog = blogs.find((blog: any) => blog.id === id);
            if (blog) {
                setBlog(blog);
                setTitle(blog.title);
                setSubTitle(blog.subTitle);
                setContent(blog.content.replace(/&nbsp;/g, ' '));
                setCategory(blog.category);
                setPhotoURL(blog.image);
            }
        }
    }, [blogs, id]);

    useEffect(() => {
        if (photo === null) {
            setImageChanged(false);
        } else {
            setImageChanged(true);
        }
    }, [photo])

    const timestamp = serverTimestamp()

    const handleUpdate = async () => {
        setLoading(true);


        if (title.trim() === "" || content.trim() === "" || category.trim() === "") {
            toast.error("Title, Content and Category are required");
            setLoading(false);
            return;
        }

        if (title.trim().length < 6) {
            toast.error("Title must be at least 6 characters long");
            setLoading(false);
            return;
        }

        if (content.trim().length < 90) {
            toast.error("Content must be at least 90 characters long");
            setLoading(false);
            return;
        }

        const preservedContent = content.replace(/  +/g, '&nbsp; ');

        const blogRef = doc(db, "blogs", id);


        try {
            if (photo) {
                const storageRef = ref(storage, `blogs/${(photo as File).name}`);
                const snapshot = await uploadBytes(storageRef, photo);
                const downloadURL = await getDownloadURL(snapshot.ref);

                const updatedBlog = {
                    title: title,
                    subTitle: subTitle,
                    content: preservedContent,
                    category: category,
                    image: imageChanged ? downloadURL : blog.image,
                    updatedAt: timestamp,
                };
                await updateDoc(blogRef, {
                    title: title,
                    subTitle: subTitle,
                    content: preservedContent,
                    category: category,
                    image: imageChanged ? downloadURL : blog.image,
                    updatedAt: timestamp,
                });
                await setBlogs((prevBlogs: any) => {
                    return prevBlogs.map((blog: any) => {
                        if (blog.id === id) {
                            return {
                                ...blog,
                                ...updatedBlog,
                            };
                        }
                        return blog;
                    });
                });
            } else {
                const updatedBlog = {
                    title: title,
                    subTitle: subTitle,
                    content: preservedContent,
                    category: category,
                    image: photoURL,
                    updatedAt: timestamp,
                };
                await updateDoc(blogRef, {
                    ...updatedBlog,
                });
                await setBlogs((prevBlogs: any) => {
                    return prevBlogs.map((blog: any) => {
                        if (blog.id === id) {
                            return {
                                ...blog,
                                ...updatedBlog,
                            };
                        }
                        return blog;
                    });
                });

            }

            setLoading(false);
            toast.success("Blog updated successfully");
            navigate(`/explore/blogs/`);
        } catch (error: any) {
            setLoading(false);
            toast.error(error.message);
        }
    }

    return (
        <div className="px-10 py-11 pb-16 flex flex-col gap-12 xl:px-5 md:gap-8" >
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800 md:text-xl">
                    Edit Blog
                </h1>
            </div>
            <form className="w-full min-h-[400px] flex flex-col gap-10">
                <div className="flex gap-8 flex-col">
                    <div className="p-4 flex flex-col gap-5 w-full">
                        <label htmlFor="title" className="w-full">
                            <textarea
                                rows={1}
                                maxLength={100}
                                minLength={6}
                                required
                                placeholder="Title"
                                value={title}
                                ref={titleRef}
                                onChange={(e) => setTitle(e.target.value)}
                                className="w-full border-none mb-3 px-1 text-[40px] font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out overflow-hiden resize-none xl:text-4xl xl:px-2 md:text-[30px] md:mb-2 sm:text-[25px] sm:mb-1"
                            />
                        </label>
                        <label htmlFor="subTitle" className="w-full">
                            <textarea
                                rows={1}
                                maxLength={100}
                                minLength={6}
                                placeholder="Enter Subtitle"
                                value={subTitle}
                                ref={subTitleRef}
                                onChange={(e) => setSubTitle(e.target.value)}
                                className="w-full border-none mb-3 px-1 text-3xl font-bold focus:outline-none placeholder-gray-300 transition duration-500 ease-in-out overflow-hiden resize-none xl:text-[26px] xl:px-2 md:text-2xl md:mb-2 sm:text-lg sm:mb-1"
                            />
                        </label>
                        <label htmlFor="category" className="flex flex-col gap-1.5 w-full">
                            <p className="text-sm font-medium text-gray-700">
                                Category
                            </p>
                            <Input placeholder="e.g Technology, Health, Fashion" name={"category"} type={"text"} value={category} onChange={(e) => setCategory(e.target.value)} className={"w-full max-w-lg"} required />
                        </label>
                    </div>

                    <div className="w-max h[340px] bg-gray-50 p-5 rounded-xl flex justify-center items-center place-self-center sm:p-2 sm:w-full">
                        {photoURL ? (
                            <div className="relative">
                                <img
                                    src={photoURL}
                                    className="h-96 w32 object-cover rounded-xl max-w-a sm:max-w-full"
                                    alt="blog image"
                                />
                                <button
                                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                                    type="button"
                                    onClick={handleClose}
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
                            <>
                                <label htmlFor="upload" className="flex flex-col gap-1.5 relative">
                                    <input
                                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline cursor-pointer"
                                        id="photoURL"
                                        type="file"
                                        placeholder="Profile Picture"
                                        required
                                        name="photoURL"
                                        onChange={handleImageChange}
                                        accept="image/*"
                                    />
                                </label>
                                {/* <img
                                    src={imagePictureSVG}
                                    className="h-8 w-8 m-auto"
                                    alt="upload"
                                /> */}
                            </>
                        )}
                    </div>
                    <div>
                        <Editor
                            ref={mdEditor}
                            value={content}
                            onChange={handleEditorChange}
                            renderHTML={(text: any) => <ReactMarkdown children={text} />}
                            style={{ minHeight: "700px" }}
                            //hide preview by default
                            loggerMaxSize={0}
                        />
                    </div>
                </div>
                <div className="flex justify-end gap-4">
                    <button className={`bg-[rgba(0,109,156,0.86)] text-white text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-[#006d9c] ${loading ? "opacity-50 cursor-default" : ""}`}
                        type="submit"
                        disabled={loading}
                        onClick={handleUpdate}
                    >
                        {loading ? "Updating..." : "Update Blog"}
                    </button>
                    <button
                        className="bg-gray-100 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md w-max transition duration-300 ease-in-out hover:bg-gray-200"
                        type="button">Cancel</button>
                </div>
            </form>
        </div>
    );
}